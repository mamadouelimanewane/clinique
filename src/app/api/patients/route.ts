import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const patientSchema = z.object({
    nom: z.string().min(2),
    prenom: z.string().min(2),
    dateNaissance: z.string(), // ISO date
    sexe: z.enum(["M", "F"]),
    telephone: z.string().min(5),
    email: z.string().email().optional().or(z.literal('')),
    adresse: z.string().optional(),
    ville: z.string().optional(),
    profession: z.string().optional(),
    situationMatrimoniale: z.enum(["CELIBATAIRE", "MARIE", "DIVORCE", "VEUF"]).optional(),
    assureur: z.string().optional(),
    numeroAssure: z.string().optional(),
    tauxCouverture: z.number().min(0).max(100).optional(),
})

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const body = await req.json()
        const data = patientSchema.parse(body)

        // Génération automatique du numéro de patient (PAT-ANNEE-XXXX)
        const year = new Date().getFullYear()
        const count = await prisma.patient.count()
        const sequence = (count + 1).toString().padStart(4, '0')
        const numeroPatient = `PAT-${year}-${sequence}`

        const patient = await prisma.patient.create({
            data: {
                ...data,
                numeroPatient,
                dateNaissance: new Date(data.dateNaissance),
                email: data.email || null, // Handle empty string as null
            },
        })

        return NextResponse.json(patient)
    } catch (error) {
        console.error("[PATIENTS_POST]", error)
        if (error instanceof z.ZodError) {
            return new NextResponse("Données invalides", { status: 400 })
        }
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")
    const limit = parseInt(searchParams.get("limit") || "50")

    if (!session) {
        return new NextResponse("Non autorisé", { status: 401 })
    }

    try {
        const whereClause = query ? {
            OR: [
                { nom: { contains: query, mode: 'insensitive' as const } },
                { prenom: { contains: query, mode: 'insensitive' as const } },
                { telephone: { contains: query } },
                { numeroPatient: { contains: query, mode: 'insensitive' as const } }
            ]
        } : {}

        const patients = await prisma.patient.findMany({
            where: whereClause,
            take: limit,
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(patients)
    } catch (error) {
        console.error("[PATIENTS_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
