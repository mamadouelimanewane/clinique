import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const generationSchema = z.object({
    consultationId: z.string(),
})

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const body = await req.json()
        const { consultationId } = generationSchema.parse(body)

        // 1. Récupérer consultation + patients + actes
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            include: {
                patient: true,
                actesRealises: {
                    include: { acte: true }
                },
                facture: true // Vérifier si déjà facturée
            }
        })

        if (!consultation) return new NextResponse("Consultation introuvable", { status: 404 })
        if (consultation.facture) return new NextResponse("Déjà facturée", { status: 400 })
        if (consultation.actesRealises.length === 0) return new NextResponse("Aucun acte à facturer", { status: 400 })

        // 2. Calculs
        let totalBrut = 0
        consultation.actesRealises.forEach(a => {
            totalBrut += Number(a.montant) // Prisma Decimal to Number, using montant instead of prixApplique as per schema
        })

        // Gestion part assurance
        const tauxCouverture = consultation.patient.tauxCouverture || 0
        const partAssurance = Math.round(totalBrut * (tauxCouverture / 100))
        const partPatient = totalBrut - partAssurance

        // 3. Création Facture (Transaction)
        const facture = await prisma.$transaction(async (tx) => {
            // Numéro facture
            const year = new Date().getFullYear()
            const count = await tx.facture.count()
            const numSequence = (count + 1).toString().padStart(5, '0')
            const numero = `FAC-${year}-${numSequence}`

            // Création Facture
            const newFacture = await tx.facture.create({
                data: {
                    numeroFacture: numero,
                    patientId: consultation.patientId,
                    consultations: { connect: { id: consultation.id } }, // Connect plural relation
                    // motif: `Consultation du ...` not in schema directly, maybe skip or add note
                    montantHT: totalBrut,
                    montantTTC: totalBrut,
                    montantTVA: 0,
                    partAssurance: partAssurance,
                    partPatient: partPatient,
                    statut: "PARTIELLE", // EN_ATTENTE not in enum? Schema says IMPAYEE, PARTIELLE, PAYEE, ANNULEE.
                    dateEcheance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    // createdById: session.user.id, // Not in schema for Facture? Check schema.
                    lignes: {
                        create: consultation.actesRealises.map(acteRealise => ({
                            designation: acteRealise.acte.libelle,
                            quantite: 1,
                            prixUnitaire: acteRealise.montant,
                            montant: acteRealise.montant
                        }))
                    }
                }
            })

            return newFacture
        })

        return NextResponse.json(facture)

    } catch (error) {
        console.error("[FACTURE_GEN_POST]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
