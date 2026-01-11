import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET stock movements
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const medicamentId = searchParams.get('medicamentId')
        const type = searchParams.get('type')

        const where: any = {}
        if (medicamentId) where.medicamentId = medicamentId
        if (type) where.type = type

        const mouvements = await prisma.mouvementStock.findMany({
            where,
            include: {
                medicament: true
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        })

        return NextResponse.json(mouvements)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch movements" }, { status: 500 })
    }
}

// POST create stock movement
export async function POST(req: Request) {
    try {
        const body = await req.json()

        const mouvement = await prisma.mouvementStock.create({
            data: {
                medicamentId: body.medicamentId,
                type: body.type, // ENTREE, SORTIE, AJUSTEMENT, PEREMPTION
                quantite: body.quantite,
                motif: body.motif,
                reference: body.reference,
                utilisateur: body.utilisateur
            },
            include: {
                medicament: true
            }
        })

        // If it's an entry, update or create stock
        if (body.type === "ENTREE" && body.lot && body.datePeremption) {
            await prisma.stock.create({
                data: {
                    medicamentId: body.medicamentId,
                    lot: body.lot,
                    datePeremption: new Date(body.datePeremption),
                    quantite: body.quantite,
                    emplacement: body.emplacement
                }
            })
        }

        return NextResponse.json(mouvement)
    } catch (error) {
        console.error("Error creating movement:", error)
        return NextResponse.json({ error: "Failed to create movement" }, { status: 500 })
    }
}
