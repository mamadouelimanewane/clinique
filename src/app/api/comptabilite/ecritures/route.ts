import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const ecritureSchema = z.object({
    journalId: z.string(),
    compteId: z.string(),
    exerciceId: z.string(),
    dateEcriture: z.string(), // ISO date
    libelle: z.string().min(3),
    montant: z.number().positive(),
    sens: z.enum(["DEBIT", "CREDIT"]),
    pieceRef: z.string().optional(),
})

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const body = await req.json()
        const { journalId, compteId, exerciceId, dateEcriture, libelle, montant, sens, pieceRef } = ecritureSchema.parse(body)

        const debit = sens === 'DEBIT' ? montant : 0
        const credit = sens === 'CREDIT' ? montant : 0

        const ecriture = await prisma.ecritureComptable.create({
            data: {
                journalId,
                compteId,
                exerciceId,
                dateEcriture: new Date(dateEcriture),
                libelle,
                debit,
                credit,
                pieceRef,
                valide: true, // Auto-validé pour simplifier pour l'instant
                createdById: session.user.id,
            },
        })

        return NextResponse.json(ecriture)
    } catch (error) {
        console.error("[ECRITURE_POST]", error)
        if (error instanceof z.ZodError) {
            return new NextResponse("Données invalides", { status: 400 })
        }
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "20")

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const ecritures = await prisma.ecritureComptable.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                compte: true,
                journal: true,
                createdBy: {
                    select: { nom: true, prenom: true }
                }
            },
        })

        return NextResponse.json(ecritures)
    } catch (error) {
        console.error("[ECRITURES_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
