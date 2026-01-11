import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const { searchParams } = new URL(req.url)
        const status = searchParams.get("status") // 'pending' or 'done'

        const demands = await prisma.acteRealise.findMany({
            where: {
                acte: {
                    specialite: 'LABORATOIRE'
                },
                resultat: status === 'done' ? { isNot: null } : { is: null }
            },
            include: {
                acte: true,
                consultation: {
                    include: {
                        patient: {
                            select: { id: true, nom: true, prenom: true, numeroPatient: true }
                        },
                        medecin: {
                            select: { nom: true, prenom: true }
                        }
                    }
                },
                resultat: true
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(demands)
    } catch (error) {
        console.error("[LABO_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const { acteRealiseId, valeurs, conclusion } = body

        const resultat = await prisma.resultatExamen.upsert({
            where: { acteRealiseId },
            update: {
                valeurs,
                conclusion,
                validePar: session.user.id,
                dateValidation: new Date()
            },
            create: {
                acteRealiseId,
                valeurs,
                conclusion,
                validePar: session.user.id,
                dateValidation: new Date()
            }
        })

        return NextResponse.json(resultat)
    } catch (error) {
        console.error("[LABO_POST]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
