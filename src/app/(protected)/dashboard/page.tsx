export const dynamic = "force-dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, Users, DollarSign, Calendar } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { startOfDay, endOfDay, subDays, format } from "date-fns"
import { Overview } from "@/components/dashboard/overview"

async function getDashboardData() {
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

    // 2. Chiffre d'Affaires
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

    return {
        stats: {
            consultationsCount,
            chiffreAffaires,
            patientsCount,
            unpaidFacturesCount,
        },
        recentRDVs,
        graphData,
    }
}

export default async function DashboardPage() {
    const data = await getDashboardData()

    return (
        <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Tableau de Bord</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Consultations (Jour)
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.consultationsCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Aujourd'hui
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Chiffre d'Affaires
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.chiffreAffaires.toLocaleString()} CFA</div>
                        <p className="text-xs text-muted-foreground">
                            Cumul total (facturé)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Patients Actifs
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.patientsCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Dossiers ouverts
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Factures Impayées
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.unpaidFacturesCount}</div>
                        <p className="text-xs text-muted-foreground">
                            En attente de paiement
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Activités (7 derniers jours)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={data.graphData} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Rendez-vous Récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {data.recentRDVs.map((rdv) => (
                                <div key={rdv.id} className="flex items-center">
                                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                                    <div className="ml-2 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {rdv.patient.prenom} {rdv.patient.nom}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {rdv.medecin.nom} - {format(rdv.dateHeure, "HH:mm")}
                                        </p>
                                    </div>
                                    <div className={`ml-auto font-medium text-sm ${rdv.statut === "PLANIFIE" ? "text-blue-500" :
                                        rdv.statut === "TERMINE" ? "text-green-500" :
                                            rdv.statut === "ANNULE" ? "text-red-500" : "text-amber-500"
                                        }`}>
                                        {rdv.statut}
                                    </div>
                                </div>
                            ))}
                            {data.recentRDVs.length === 0 && (
                                <div className="text-sm text-muted-foreground text-center py-4">
                                    Aucun rendez-vous récent
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
