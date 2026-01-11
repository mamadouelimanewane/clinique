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
                actes: {
                    include: { acte: true }
                },
                facture: true // Vérifier si déjà facturée
            }
        })

        if (!consultation) return new NextResponse("Consultation introuvable", { status: 404 })
        if (consultation.facture) return new NextResponse("Déjà facturée", { status: 400 })
        if (consultation.actes.length === 0) return new NextResponse("Aucun acte à facturer", { status: 400 })

        // 2. Calculs
        let totalBrut = 0
        consultation.actes.forEach(a => {
            totalBrut += Number(a.prixApplique) // Prisma Decimal to Number
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
                    numero,
                    patientId: consultation.patientId,
                    consultationId: consultation.id,
                    motif: `Consultation du ${new Date(consultation.dateConsultation).toLocaleDateString()}`,
                    montantTotal: totalBrut,
                    partAssurance: partAssurance,
                    partPatient: partPatient,
                    statut: "EN_ATTENTE", // ou GRATUIT si 0
                    dateEmission: new Date(),
                    createdById: session.user.id,
                    lignes: {
                        create: consultation.actes.map(acteRealise => ({
                            designation: acteRealise.acte.libelle,
                            quantite: 1,
                            prixUnitaire: acteRealise.prixApplique,
                            montantTotal: acteRealise.prixApplique
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
