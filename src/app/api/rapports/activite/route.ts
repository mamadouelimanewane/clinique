import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        // 1. Statistiques Consultations
        const totalConsultations = await prisma.consultation.count()
        const consultationsBySpecialty = await prisma.nomenclatureActe.groupBy({
            by: ['specialite'],
            _count: { _all: true }
        })

        // 2. Chiffre d'Affaires (Facturation)
        const revenue = await prisma.facture.aggregate({
            _sum: {
                montantTTC: true
            }
        })

        // 3. Occupation Hospitalière
        const litsOccuper = await prisma.lit.count({ where: { occupe: true } })
        const totalLits = await prisma.lit.count()

        // 4. Pharmacie (Rotation Stocks)
        const totalMedicaments = await prisma.medicament.count()
        const stocksAlerte = await prisma.medicament.count({
            where: { stocks: { some: { quantite: { lte: 10 } } } }
        })

        return NextResponse.json({
            consultations: {
                total: totalConsultations,
                bySpecialty: consultationsBySpecialty
            },
            finances: {
                caTotal: revenue._sum.montantTTC || 0
            },
            hospitalisation: {
                litsOccuper,
                totalLits,
                tauxOccupation: totalLits > 0 ? (litsOccuper / totalLits) * 100 : 0
            },
            pharmacie: {
                totalMedicaments,
                stocksAlerte
            }
        })
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
