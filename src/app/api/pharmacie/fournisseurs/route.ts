import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all suppliers
export async function GET() {
    try {
        const fournisseurs = await prisma.fournisseur.findMany({
            include: {
                commandes: {
                    orderBy: { dateCommande: 'desc' },
                    take: 5
                }
            }
        })
        return NextResponse.json(fournisseurs)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch suppliers" }, { status: 500 })
    }
}

// POST create new supplier
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const fournisseur = await prisma.fournisseur.create({
            data: body
        })
        return NextResponse.json(fournisseur)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create supplier" }, { status: 500 })
    }
}
