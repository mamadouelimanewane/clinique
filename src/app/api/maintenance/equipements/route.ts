import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const equipements = await prisma.equipement.findMany({
            include: {
                tickets: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                }
            },
            orderBy: { nom: 'asc' }
        })
        return NextResponse.json(equipements)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const equipement = await prisma.equipement.create({
            data: body
        })
        return NextResponse.json(equipement)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
