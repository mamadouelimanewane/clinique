import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const tickets = await prisma.ticketMaintenance.findMany({
            include: {
                equipement: { select: { nom: true, code: true } }
            },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(tickets)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const ticket = await prisma.ticketMaintenance.create({
            data: body
        })
        return NextResponse.json(ticket)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
