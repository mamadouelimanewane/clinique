import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const { patientId, litId, motif, diagnosticEntree } = body

        // 1. Démarrer une transaction
        const hospitalisation = await prisma.$transaction(async (tx) => {
            // Créer l'hospitalisation
            const hosp = await tx.hospitalisation.create({
                data: {
                    patientId,
                    litId,
                    motif,
                    diagnosticEntree,
                    statut: "EN_COURS"
                }
            })

            // Mettre à jour le lit
            await tx.lit.update({
                where: { id: litId },
                data: { occupe: true }
            })

            return hosp
        })

        return NextResponse.json(hospitalisation)
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
