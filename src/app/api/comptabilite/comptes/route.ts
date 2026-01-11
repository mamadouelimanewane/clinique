import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const comptes = await prisma.compteComptable.findMany({
            where: { actif: true },
            orderBy: { numero: 'asc' }
        })
        return NextResponse.json(comptes)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
