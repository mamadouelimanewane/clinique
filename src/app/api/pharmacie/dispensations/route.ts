import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET dispensations
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const patientId = searchParams.get('patientId')

        const where: any = {}
        if (patientId) where.patientId = patientId

        const dispensations = await prisma.dispensation.findMany({
            where,
            include: {
                medicament: true,
                patient: true
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        })

        return NextResponse.json(dispensations)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch dispensations" }, { status: 500 })
    }
}

// POST create dispensation
export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Create dispensation
        const dispensation = await prisma.dispensation.create({
            data: {
                medicamentId: body.medicamentId,
                patientId: body.patientId,
                quantite: body.quantite,
                prescription: body.prescription,
                pharmacien: body.pharmacien
            },
            include: {
                medicament: true,
                patient: true
            }
        })

        // Create stock movement (SORTIE)
        await prisma.mouvementStock.create({
            data: {
                medicamentId: body.medicamentId,
                type: "SORTIE",
                quantite: body.quantite,
                motif: `Dispensation Patient ${body.patientId}`,
                reference: body.prescription,
                utilisateur: body.pharmacien
            }
        })

        // Update stock quantities (deduct from oldest lots first - FIFO)
        const stocks = await prisma.stock.findMany({
            where: {
                medicamentId: body.medicamentId,
                quantite: { gt: 0 }
            },
            orderBy: { datePeremption: 'asc' }
        })

        let remainingQty = body.quantite
        for (const stock of stocks) {
            if (remainingQty <= 0) break

            const deduction = Math.min(stock.quantite, remainingQty)
            await prisma.stock.update({
                where: { id: stock.id },
                data: { quantite: stock.quantite - deduction }
            })
            remainingQty -= deduction
        }

        return NextResponse.json(dispensation)
    } catch (error) {
        console.error("Error creating dispensation:", error)
        return NextResponse.json({ error: "Failed to create dispensation" }, { status: 500 })
    }
}
