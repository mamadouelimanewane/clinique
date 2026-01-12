import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const commandes = await prisma.commandePharmacie.findMany({
            include: {
                fournisseur: true,
                _count: {
                    select: { lignes: true }
                }
            },
            orderBy: { dateCommande: 'desc' }
        })

        // Format for frontend
        const formatted = commandes.map(c => ({
            id: c.numeroCommande,
            dbId: c.id,
            fournisseur: c.fournisseur.nom,
            date: c.dateCommande,
            montant: Number(c.montantTotal),
            statut: c.statut,
            articles: c._count.lignes
        }))

        return NextResponse.json(formatted)
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const { fournisseurId, lignes, dateLivraison } = body

        // Generate ID like BC-PH-2026-0001
        const count = await prisma.commandePharmacie.count()
        const numeroCommande = `BC-PH-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`

        let montantTotal = 0
        lignes.forEach((l: any) => {
            montantTotal += (l.quantite * l.prixUnitaire)
        })

        const commande = await prisma.commandePharmacie.create({
            data: {
                numeroCommande,
                fournisseurId,
                dateLivraison: dateLivraison ? new Date(dateLivraison) : null,
                montantTotal,
                statut: "EN_ATTENTE",
                lignes: {
                    create: lignes.map((l: any) => ({
                        medicamentId: l.medicamentId,
                        quantiteCommandee: Number(l.quantite),
                        prixUnitaire: Number(l.prixUnitaire)
                    }))
                }
            }
        })

        return NextResponse.json(commande)
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
