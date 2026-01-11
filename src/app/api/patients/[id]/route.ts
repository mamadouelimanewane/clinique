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
        const patient = await prisma.patient.findUnique({
            where: { id },
            include: {
                antecedents: true,
                allergies: true,
                vaccinations: true,
                consultations: {
                    take: 5,
                    orderBy: { dateConsultation: 'desc' },
                    include: {
                        medecin: {
                            select: { nom: true, prenom: true }
                        },
                        actesRealises: {
                            include: {
                                acte: true,
                                resultat: true
                            }
                        }
                    }
                },
                rendezVous: {
                    where: { dateHeure: { gte: new Date() } },
                    orderBy: { dateHeure: 'asc' },
                    take: 3
                }
            },
        })

        if (!patient) {
            return new NextResponse("Patient non trouvé", { status: 404 })
        }

        return NextResponse.json(patient)
    } catch (error) {
        console.error("[PATIENT_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
