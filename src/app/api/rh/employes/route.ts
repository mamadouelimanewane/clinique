import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const employes = await prisma.employe.findMany({
            include: {
                user: { select: { email: true, actif: true } }
            },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(employes)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const employe = await prisma.employe.create({
            data: {
                ...body,
                dateNaissance: new Date(body.dateNaissance),
                dateEmbauche: new Date(body.dateEmbauche),
            }
        })
        return NextResponse.json(employe)
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
