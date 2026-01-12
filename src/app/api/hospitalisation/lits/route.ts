import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const lits = await prisma.lit.findMany({
            include: {
                hospitalisations: {
                    where: { statut: "EN_COURS" },
                    include: { patient: { select: { nom: true, prenom: true, numeroPatient: true } } }
                }
            },
            orderBy: { numero: 'asc' }
        })

        return NextResponse.json(lits)
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
