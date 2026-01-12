import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const pendingExams = await prisma.acteRealise.findMany({
            where: {
                acte: {
                    specialite: {
                        in: ["LABORATOIRE", "BIOLOGIE", "BIOCHIMIE"]
                    }
                },
                resultat: null
            },
            include: {
                consultation: {
                    include: {
                        patient: true,
                        medecin: { select: { nom: true, prenom: true } }
                    }
                },
                acte: true
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(pendingExams)
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
