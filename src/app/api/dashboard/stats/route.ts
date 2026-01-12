import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { startOfDay, endOfDay, subDays, format } from "date-fns"

export async function GET() {
    try {
        const today = new Date()
        const startOfToday = startOfDay(today)
        const endOfToday = endOfDay(today)

        // 1. Consultations (Jour)
        const consultationsCount = await prisma.consultation.count({
            where: {
                dateConsultation: {
                    gte: startOfToday,
                    lte: endOfToday,
                },
            },
        })

        // 2. Chiffre d'Affaires (Total payé ou total facturé au Sénégal on regarde souvent le facturé)
        const aggregateFactures = await prisma.facture.aggregate({
            _sum: {
                montantTTC: true,
            },
            where: {
                statut: {
                    not: "ANNULEE",
                },
            },
        })
        const chiffreAffaires = Number(aggregateFactures._sum.montantTTC || 0)

        // 3. Patients Actifs
        const patientsCount = await prisma.patient.count({
            where: {
                actif: true,
            },
        })

        // 4. Factures Impayées
        const unpaidFacturesCount = await prisma.facture.count({
            where: {
                statut: "IMPAYEE",
            },
        })

        // 5. Rendez-vous Récents
        const recentRDVs = await prisma.rendezVous.findMany({
            take: 5,
            orderBy: {
                dateHeure: "desc",
            },
            include: {
                patient: true,
                medecin: true,
            },
        })

        // 6. Données pour le graphique (7 derniers jours)
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const date = subDays(today, i)
            return {
                start: startOfDay(date),
                end: endOfDay(date),
                label: format(date, "dd/MM"),
            }
        }).reverse()

        const graphData = await Promise.all(
            last7Days.map(async (day) => {
                const count = await prisma.consultation.count({
                    where: {
                        dateConsultation: {
                            gte: day.start,
                            lte: day.end,
                        },
                    },
                })
                return {
                    name: day.label,
                    total: count,
                }
            })
        )

        return NextResponse.json({
            stats: {
                consultationsCount,
                chiffreAffaires,
                patientsCount,
                unpaidFacturesCount,
            },
            recentRDVs: recentRDVs.map((rdv) => ({
                id: rdv.id,
                patientName: `${rdv.patient.prenom} ${rdv.patient.nom}`,
                medecinName: rdv.medecin.nom,
                heure: format(rdv.dateHeure, "HH:mm"),
                statut: rdv.statut,
            })),
            graphData,
        })
    } catch (error) {
        console.error("Dashboard Stats Error:", error)
        return NextResponse.json({ error: "Erreur lors de la récupération des statistiques" }, { status: 500 })
    }
}
