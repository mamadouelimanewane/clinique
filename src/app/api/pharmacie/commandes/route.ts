import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all purchase orders
export async function GET() {
    try {
        const commandes = await prisma.commandePharmacie.findMany({
            include: {
                fournisseur: true,
                lignes: {
                    include: {
                        medicament: true
                    }
                }
            },
            orderBy: { dateCommande: 'desc' }
        })
        return NextResponse.json(commandes)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }
}

// POST create new purchase order
export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Generate order number
        const count = await prisma.commandePharmacie.count()
        const numeroCommande = `BC-PH-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`

        const commande = await prisma.commandePharmacie.create({
            data: {
                numeroCommande,
                fournisseurId: body.fournisseurId,
                dateLivraison: body.dateLivraison ? new Date(body.dateLivraison) : null,
                montantTotal: body.montantTotal,
                statut: body.statut || "BROUILLON",
                lignes: {
                    create: body.lignes || []
                }
            },
            include: {
                fournisseur: true,
                lignes: {
                    include: {
                        medicament: true
                    }
                }
            }
        })

        return NextResponse.json(commande)
    } catch (error) {
        console.error("Error creating order:", error)
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }
}
