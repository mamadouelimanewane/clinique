import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const { searchParams } = new URL(req.url)
        const employeId = searchParams.get("employeId")

        const bulletins = await prisma.bulletinPaie.findMany({
            where: employeId ? { employeId } : {},
            include: {
                employe: { select: { nom: true, prenom: true, matricule: true } },
                lignes: true
            },
            orderBy: { dateEmission: 'desc' }
        })

        return NextResponse.json(bulletins)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const { employeId, periode } = await req.json()

        // 1. Récupérer l'employé
        const employe = await prisma.employe.findUnique({ where: { id: employeId } })
        if (!employe) return new NextResponse("Employé non trouvé", { status: 404 })

        const salaireBase = Number(employe.salaireBrut)

        // 2. Calculs simplifiés (Simulation moteur de paie Sénégal)
        const primeTransport = 20800 // Montant légal standard au Sénégal
        const retenueIPRES = salaireBase * 0.056

        const totalPrimes = primeTransport
        const totalRetenues = retenueIPRES
        const salaireNet = salaireBase + totalPrimes - totalRetenues

        // 3. Créer le bulletin avec ses lignes
        const bulletin = await prisma.bulletinPaie.create({
            data: {
                employeId,
                periode,
                salaireBase,
                totalPrimes,
                totalRetenues,
                salaireNet,
                statut: "BROUILLON",
                lignes: {
                    create: [
                        { libelle: "Salaire de base", type: "GAIN", montant: salaireBase },
                        { libelle: "Indemnité de transport", type: "GAIN", montant: primeTransport },
                        { libelle: "Retenue IPRES (RG)", type: "RETENUE", montant: retenueIPRES },
                    ]
                }
            }
        })

        return NextResponse.json(bulletin)
    } catch (error) {
        console.error(error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
