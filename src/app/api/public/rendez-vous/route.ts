import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Public API for online booking
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { nom, prenom, telephone, email, date, medecinId, motif } = body

        // 1. Check if patient exists by phone
        let patient = await prisma.patient.findFirst({
            where: { telephone }
        })

        // 2. If not, create new patient
        if (!patient) {
            patient = await prisma.patient.create({
                data: {
                    nom,
                    prenom,
                    telephone,
                    email,
                    dateNaissance: new Date(), // Placeholder, to be updated at reception
                    sexe: "M", // Default, to be updated
                    adresse: "A compléter",
                    numeroPatient: `P-${Date.now().toString().slice(-6)}` // Temporary 
                }
            })
        }

        // 3. Create Appointment
        const rdv = await prisma.rendezVous.create({
            data: {
                patientId: patient.id,
                medecinId: medecinId, // Assuming ID is valid or selected from a list
                dateHeure: new Date(date),
                motif: motif || "Rendez-vous en ligne",
                statut: "EN_ATTENTE_CONFIRMATION"
            }
        })

        return NextResponse.json({ success: true, rdvId: rdv.id })

    } catch (error) {
        console.error("Booking Error:", error)
        return new NextResponse("Erreur lors de la réservation", { status: 500 })
    }
}

export async function GET() {
    // Return list of doctors and specialties for the form
    try {
        const doctors = await prisma.user.findMany({
            where: { role: { nom: 'MEDECIN' } },
            include: {
                employe: {
                    select: { specialite: true }
                }
            }
        })

        const formattedDoctors = doctors.map(d => ({
            id: d.id,
            nom: d.nom,
            prenom: d.prenom,
            specialite: d.employe?.specialite || "MÉDECINE GÉNÉRALE"
        }))

        return NextResponse.json(formattedDoctors)
    } catch (error) {
        return NextResponse.json([])
    }
}
