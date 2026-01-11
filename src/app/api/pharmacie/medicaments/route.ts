import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const medicaments = await prisma.medicament.findMany({
            include: {
                stocks: true,
                mouvements: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                }
            }
        })
        return NextResponse.json(medicaments)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch medicaments" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const medicament = await prisma.medicament.create({
            data: body
        })
        return NextResponse.json(medicament)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create medicament" }, { status: 500 })
    }
}
