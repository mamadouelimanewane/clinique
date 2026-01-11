import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const facture = await prisma.facture.findUnique({
            where: { id },
            include: {
                patient: true,
                lignes: true,
                paiements: true,
                consultations: {
                    include: {
                        medecin: { select: { nom: true, prenom: true } }
                    }
                }
            }
        })

        if (!facture) return new NextResponse("Facture introuvable", { status: 404 })

        return NextResponse.json(facture)
    } catch (error) {
        console.error("[FACTURE_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
