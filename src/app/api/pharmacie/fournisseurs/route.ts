import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const fournisseurs = await prisma.fournisseur.findMany({
            include: {
                _count: {
                    select: { commandes: true }
                }
            },
            orderBy: { nom: 'asc' }
        })
        return NextResponse.json(fournisseurs)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const fournisseur = await prisma.fournisseur.create({
            data: {
                nom: body.nom,
                contact: body.contact,
                email: body.email,
                telephone: body.telephone,
                adresse: body.adresse
            }
        })
        return NextResponse.json(fournisseur)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
