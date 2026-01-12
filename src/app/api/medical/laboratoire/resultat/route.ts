import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const { acteRealiseId, valeurs, conclusion } = body

        const result = await prisma.resultatExamen.create({
            data: {
                acteRealiseId,
                valeurs,
                conclusion,
                validePar: `${session.user.name}`,
                dateValidation: new Date()
            }
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
