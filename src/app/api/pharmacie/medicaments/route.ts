import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const medicaments = await prisma.medicament.findMany({
            where: { actif: true },
            select: {
                id: true,
                nomCommercial: true,
                dci: true,
                forme: true,
                dosage: true,
                prixAchat: true
            },
            orderBy: { nomCommercial: 'asc' }
        })
        return NextResponse.json(medicaments)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
