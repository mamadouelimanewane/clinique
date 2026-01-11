import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const consultationSchema = z.object({
    patientId: z.string(),
    dateConsultation: z.string().optional(), // ISO string
    motif: z.string().min(1, "Le motif est requis"),
    interrogatoire: z.string().optional(),
    examenPhysique: z.string().optional(),
    diagnostic: z.string().optional(),
    constantes: z.object({
        tension: z.string().optional(),
        temperature: z.number().optional(),
        poids: z.number().optional(),
        pouls: z.number().optional(),
        frequenceRespiratoire: z.number().optional(),
        saturationO2: z.number().optional(),
    }).optional(),
    actesIds: z.array(z.string()).optional(),
})

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const body = await req.json()
        const data = consultationSchema.parse(body)

        // Création de la consultation transactionnelle (avec les actes)
        const consultation = await prisma.$transaction(async (tx) => {
            // Parse tension if present
            let sys: number | undefined;
            let dia: number | undefined;
            if (data.constantes?.tension) {
                const parts = data.constantes.tension.split('/');
                if (parts.length === 2) {
                    sys = parseInt(parts[0]);
                    dia = parseInt(parts[1]);
                }
            }

            // 1. Créer la consultation
            const cons = await tx.consultation.create({
                data: {
                    patientId: data.patientId,
                    medecinId: session.user.id,
                    dateConsultation: data.dateConsultation ? new Date(data.dateConsultation) : new Date(),
                    motifConsultation: data.motif,
                    anamnese: data.interrogatoire,
                    examenClinique: data.examenPhysique,
                    diagnostic: data.diagnostic,

                    // Constantes mapping
                    poids: data.constantes?.poids,
                    temperature: data.constantes?.temperature,
                    frequenceCardiaque: data.constantes?.pouls,
                    saturationOxygene: data.constantes?.saturationO2,
                    tensionSystolique: sys,
                    tensionDiastolique: dia,
                    // Note: 'constantes' field and 'statut' field do not exist in schema and act as virtual/derived/ignored here
                }
            })

            // 2. Ajouter les actes réalisés si présents
            if (data.actesIds && data.actesIds.length > 0) {
                // Récupérer les infos des actes pour le prix
                const actesDetails = await tx.nomenclatureActe.findMany({
                    where: { id: { in: data.actesIds } }
                })

                for (const acteRef of actesDetails) {
                    await tx.acteRealise.create({
                        data: {
                            consultationId: cons.id,
                            acteId: acteRef.id,
                            quantite: 1,
                            tarif: acteRef.tarif,
                            montant: acteRef.tarif,
                        }
                    })
                }
            }

            return cons
        })

        return NextResponse.json(consultation)
    } catch (error) {
        console.error("[CONSULTATION_POST]", error)
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
        const consultations = await prisma.consultation.findMany({
            take: limit,
            orderBy: { dateConsultation: 'desc' },
            include: {
                patient: {
                    select: { nom: true, prenom: true, id: true, numeroPatient: true }
                },
                medecin: {
                    select: { nom: true, prenom: true }
                }
            },
        })

        return NextResponse.json(consultations)
    } catch (error) {
        console.error("[CONSULTATIONS_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
