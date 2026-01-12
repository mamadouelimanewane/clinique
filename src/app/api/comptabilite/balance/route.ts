import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const comptes = await prisma.compteComptable.findMany({
            include: {
                ecritures: true,
            },
            orderBy: { numero: 'asc' },
        })

        const balance = comptes.map((compte) => {
            const totalDebit = compte.ecritures.reduce((acc, ec) => acc + Number(ec.debit), 0)
            const totalCredit = compte.ecritures.reduce((acc, ec) => acc + Number(ec.credit), 0)

            return {
                id: compte.id,
                numero: compte.numero,
                libelle: compte.libelle,
                totalDebit,
                totalCredit,
            }
        }).filter(item => item.totalDebit !== 0 || item.totalCredit !== 0)

        // On peut aussi inclure les comptes sans mouvements si nécessaire
        // Mais pour une balance, on n'affiche généralement que les comptes mouvementés

        return NextResponse.json(balance)
    } catch (error) {
        console.error("[COMPTA_BALANCE_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
