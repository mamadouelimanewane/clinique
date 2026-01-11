import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { startOfDay, endOfDay } from "date-fns"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const today = new Date()

        // Récupérer les RDV du jour
        const rendezVous = await prisma.rendezVous.findMany({
            where: {
                dateHeure: {
                    gte: startOfDay(today),
                    lte: endOfDay(today)
                }
            },
            include: {
                patient: {
                    select: { id: true, nom: true, prenom: true, numeroPatient: true, telephone: true }
                },
                medecin: {
                    select: { nom: true, prenom: true }
                }
            },
            orderBy: { dateHeure: 'asc' }
        })

        return NextResponse.json(rendezVous)
    } catch (error) {
        console.error("[ACCUEIL_RDV_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
