import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "20")
    const statut = searchParams.get("statut")

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const whereClause = statut ? { statut: statut as any } : {}

        const factures = await prisma.facture.findMany({
            where: whereClause,
            take: limit,
            orderBy: { dateFacture: 'desc' },
            include: {
                patient: {
                    select: { nom: true, prenom: true, numeroPatient: true }
                }
            }
        })

        return NextResponse.json(factures)
    } catch (error) {
        console.error("[FACTURES_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
