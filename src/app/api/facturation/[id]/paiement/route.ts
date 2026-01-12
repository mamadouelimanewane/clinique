import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const paymentSchema = z.object({
    montant: z.number().positive(),
    modePaiement: z.enum(["ESPECES", "CARTE", "VIREMENT", "CHEQUE", "MOBILE_MONEY"]),
    reference: z.string().optional(),
    notes: z.string().optional(),
})

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    const { id: factureId } = await params

    try {
        const body = await req.json()
        const { montant, modePaiement, reference, notes } = paymentSchema.parse(body)

        // 1. Démarrer une transaction
        const result = await prisma.$transaction(async (tx) => {
            // Rechercher la facture
            const facture = await tx.facture.findUnique({
                where: { id: factureId },
                include: { patient: true }
            })

            if (!facture) throw new Error("Facture introuvable")

            // Créer le paiement
            const paiement = await tx.paiement.create({
                data: {
                    factureId,
                    montant,
                    modePaiement,
                    reference,
                    notes,
                    createdById: session.user.id,
                }
            })

            // Mettre à jour le statut de la facture
            // Calculer le total payé
            const allPaiements = await tx.paiement.findMany({ where: { factureId } })
            const totalPaye = allPaiements.reduce((acc, p) => acc + Number(p.montant), 0)

            let nouveauStatut = "PARTIELLE"
            if (totalPaye >= Number(facture.montantTTC)) {
                nouveauStatut = "PAYEE"
            }

            await tx.facture.update({
                where: { id: factureId },
                data: { statut: nouveauStatut }
            })

            // 2. Génération automatique de l'écriture comptable
            // On cherche l'exercice en cours
            const exercice = await tx.exerciceComptable.findFirst({
                where: { cloture: false },
                orderBy: { annee: 'desc' }
            })

            if (exercice) {
                // Déterminer les comptes
                // 571 pour ESPECES, 521 pour les autres
                const compteTresorerieNumero = modePaiement === "ESPECES" ? "571" : "521"
                const compteTresorerie = await tx.compteComptable.findUnique({ where: { numero: compteTresorerieNumero } })

                // Compte Client 4111 (Patients)
                const compteClient = await tx.compteComptable.findUnique({ where: { numero: "4111" } })

                // Journal: BQ pour banque, CA pour caisse
                const journalCode = modePaiement === "ESPECES" ? "CA" : "BQ"
                const journal = await tx.journal.findUnique({ where: { code: journalCode } })

                if (compteTresorerie && compteClient && journal) {
                    const libelle = `Règlement Facture ${facture.numeroFacture} - ${facture.patient.prenom} ${facture.patient.nom}`

                    // Ligne 1: Trésorerie (Débit)
                    await tx.ecritureComptable.create({
                        data: {
                            journalId: journal.id,
                            compteId: compteTresorerie.id,
                            exerciceId: exercice.id,
                            dateEcriture: new Date(),
                            libelle,
                            debit: montant,
                            credit: 0,
                            pieceRef: facture.numeroFacture,
                            valide: true,
                            createdById: session.user.id
                        }
                    })

                    // Ligne 2: Client (Crédit)
                    await tx.ecritureComptable.create({
                        data: {
                            journalId: journal.id,
                            compteId: compteClient.id,
                            exerciceId: exercice.id,
                            dateEcriture: new Date(),
                            libelle,
                            debit: 0,
                            credit: montant,
                            pieceRef: facture.numeroFacture,
                            valide: true,
                            createdById: session.user.id
                        }
                    })
                }
            }

            return { paiement, nouveauStatut }
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error("[FACTURE_PAIEMENT_POST]", error)
        if (error instanceof z.ZodError) {
            return new NextResponse("Données invalides", { status: 400 })
        }
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
