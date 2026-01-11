import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const { searchParams } = new URL(req.url)
        const litId = searchParams.get("litId")

        const lits = await prisma.lit.findMany({
            include: {
                hospitalisations: {
                    where: { statut: 'EN_COURS' },
                    include: {
                        patient: { select: { nom: true, prenom: true, numeroPatient: true } }
                    }
                }
            },
            orderBy: { numero: 'asc' }
        })

        return NextResponse.json(lits)
    } catch (error) {
        console.error("[HOSPITALISATION_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const { patientId, litId, motif } = body

        // 1. Marquer le lit comme occupé
        // 2. Créer l'hospitalisation
        const result = await prisma.$transaction([
            prisma.lit.update({
                where: { id: litId },
                data: { occupe: true }
            }),
            prisma.hospitalisation.create({
                data: {
                    patientId,
                    litId,
                    motif,
                    statut: "EN_COURS"
                }
            })
        ])

        return NextResponse.json(result[1])
    } catch (error) {
        console.error("[HOSPITALISATION_POST]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const { hospitalisationId } = body

        if (!hospitalisationId) {
            return new NextResponse("ID Hospitalisation manquant", { status: 400 })
        }

        // Récupérer l'hospitalisation pour avoir l'ID du lit
        const hosp = await prisma.hospitalisation.findUnique({
            where: { id: hospitalisationId },
            include: { lit: true }
        })

        if (!hosp) return new NextResponse("Hospitalisation introuvable", { status: 404 })

        const result = await prisma.$transaction([
            // 1. Clôturer l'hospitalisation
            prisma.hospitalisation.update({
                where: { id: hospitalisationId },
                data: {
                    statut: "TERMINE",
                    dateFin: new Date()
                }
            }),
            // 2. Libérer le lit
            prisma.lit.update({
                where: { id: hosp.litId },
                data: { occupe: false }
            })
        ])

        return NextResponse.json({ success: true, message: "Sortie validée et lit libéré" })
    } catch (error) {
        console.error("[HOSPITALISATION_PUT]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
