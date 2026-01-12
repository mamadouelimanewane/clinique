import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q") || ""

    try {
        const medicaments = await prisma.medicament.findMany({
            where: {
                OR: [
                    { nomCommercial: { contains: query, mode: "insensitive" } },
                    { dci: { contains: query, mode: "insensitive" } },
                ],
            },
            include: {
                stocks: true,
            },
            orderBy: { nomCommercial: "asc" },
        })

        const inventory = medicaments.map((med) => {
            const stockTotal = med.stocks.reduce((acc, s) => acc + s.quantite, 0)
            let statut = "OK"
            if (stockTotal === 0) statut = "RUPTURE"
            else if (stockTotal <= med.stockMinimum) statut = "CRITIQUE"
            else if (stockTotal <= med.stockMinimum * 2) statut = "BAS"

            return {
                id: med.id,
                nom: med.nomCommercial,
                dci: med.dci,
                forme: med.forme,
                dosage: med.dosage,
                stockTotal,
                min: med.stockMinimum,
                prix: Number(med.prixVente),
                statut,
                lots: med.stocks.map(s => ({
                    lot: s.lot,
                    exp: s.datePeremption,
                    quantite: s.quantite
                }))
            }
        })

        return NextResponse.json(inventory)
    } catch (error) {
        console.error("[PHARMACY_INVENTORY_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
