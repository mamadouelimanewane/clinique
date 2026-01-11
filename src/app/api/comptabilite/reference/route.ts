import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const comptes = await prisma.compteComptable.findMany({
            where: { actif: true },
            orderBy: { numero: 'asc' },
        })

        const journaux = await prisma.journal.findMany({
            where: { actif: true },
            orderBy: { code: 'asc' },
        })

        const exercice = await prisma.exerciceComptable.findFirst({
            where: { cloture: false },
            orderBy: { annee: 'desc' }, // Prend le dernier exercice ouvert
        })

        return NextResponse.json({
            comptes,
            journaux,
            exercice
        })
    } catch (error) {
        console.error("[COMPTA_REF_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
