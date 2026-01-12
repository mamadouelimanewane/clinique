"use client"

import {
    BarChart3,
    PieChart,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    DollarSign,
    Activity,
    Stethoscope,
    FlaskConical,
    Pill,
    Calendar,
    ChevronRight,
    Loader2,
    Briefcase
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"

export function PerformanceDashboard() {
    const { data: reportData, isLoading } = useQuery({
        queryKey: ['global-reports'],
        queryFn: async () => {
            const res = await fetch('/api/rapports/activite')
            if (!res.ok) throw new Error("Erreur chargement rapports")
            return res.json()
        }
    })

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in duration-1000">
            {/* High-End Analytics Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-2xl">
                            <BarChart3 className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Business <span className="text-teal-600">Intelligence</span></h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Performance Clinique & Pilotage Stratégique SIGHI</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50">
                        Exporter Données
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all">
                        Nouvelle Analyse
                    </Button>
                </div>
            </div>

            {/* Top Cards - Global Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Chiffre d'Affaire", value: `${reportData?.finances?.caTotal?.toLocaleString()} F`, sub: "+12.5% vs mois dernier", icon: DollarSign, color: "emerald" },
                    { label: "Consultations", value: reportData?.consultations?.total || 0, sub: "Activité globale", icon: Stethoscope, color: "indigo" },
                    { label: "Passage Patient", value: "1,240", sub: "+5% de fidélité", icon: Users, color: "orange" },
                    { label: "Taux de Conversion", value: "88%", sub: "Validation devis", icon: TrendingUp, color: "purple" },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn(
                                    "p-4 rounded-2xl",
                                    stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                                        stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                                            stat.color === 'orange' ? "bg-orange-50 text-orange-600" : "bg-purple-50 text-purple-600"
                                )}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                            </div>
                            <h4 className="text-2xl font-black tracking-tight text-slate-900 group-hover:translate-x-1 transition-transform">{stat.value}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{stat.label}</p>
                            <div className="mt-4 pt-4 border-t border-slate-50">
                                <span className="text-[9px] font-bold text-emerald-600 uppercase">{stat.sub}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Strategic Dashboards Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Hospitalisation Performance */}
                <Card className="lg:col-span-1 border-none shadow-xl rounded-[40px] bg-indigo-900 text-white p-10 relative overflow-hidden group">
                    <Activity className="absolute -bottom-10 -right-10 h-64 w-64 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                    <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8">Performance <span className="text-indigo-400">Hospitalisation</span></h3>

                    <div className="space-y-10 relative z-10">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Occupation des Lits</p>
                                <p className="text-2xl font-black italic">{Math.round(reportData?.hospitalisation?.tauxOccupation || 0)}%</p>
                            </div>
                            <Progress value={reportData?.hospitalisation?.tauxOccupation} className="h-2 bg-white/20" />
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-4 bg-white/5 rounded-[24px] border border-white/10">
                                <p className="text-3xl font-black">{reportData?.hospitalisation?.litsOccuper}</p>
                                <p className="text-[9px] font-bold uppercase opacity-60">Lits Occupés</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-[24px] border border-white/10">
                                <p className="text-3xl font-black">{reportData?.hospitalisation?.totalLits}</p>
                                <p className="text-[9px] font-bold uppercase opacity-60">Total Lits</p>
                            </div>
                        </div>

                        <Button className="w-full h-12 rounded-2xl bg-white text-indigo-900 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100">
                            Planning Prévisionnel
                        </Button>
                    </div>
                </Card>

                {/* Growth & Distribution Charts */}
                <Card className="lg:col-span-2 border-none shadow-xl rounded-[40px] bg-white p-10">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tighter italic text-slate-900">Distribution par <span className="text-teal-600">Spécialité</span></h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume d'Actes Médicaux réalisés</p>
                        </div>
                        <Badge variant="outline" className="border-slate-100 text-[10px] font-black uppercase tracking-widest h-8 px-4">Cette Année</Badge>
                    </div>

                    <div className="space-y-6">
                        {reportData?.consultations?.bySpecialty?.map((item: any, i: number) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-black uppercase tracking-tight text-slate-700">{item.specialite}</span>
                                    <span className="text-xs font-mono font-black text-slate-900">{item._count._all} Actes</span>
                                </div>
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-1000 group-hover:brightness-110",
                                            i % 2 === 0 ? "bg-teal-500" : "bg-indigo-500"
                                        )}
                                        style={{ width: `${(item._count._all / reportData.consultations.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Croissance Globale</p>
                                <p className="text-lg font-black text-slate-900">+18% Y/Y</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="h-12 w-12 rounded-full hover:bg-white text-slate-400">
                            <ChevronRight />
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Miscellaneous & Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-none shadow-xl rounded-[32px] bg-white p-8 border-l-4 border-l-rose-500">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                        <Pill className="h-4 w-4 text-rose-500" /> Alertes Stock
                    </h4>
                    <div className="flex items-center justify-between ring-offset-rose-50 p-4 bg-rose-50/50 rounded-2xl border border-rose-100/50">
                        <p className="text-xs font-bold text-rose-900 uppercase">{reportData?.pharmacie?.stocksAlerte} Articles en rupture</p>
                        <Button size="sm" className="bg-rose-600 hover:bg-rose-700 rounded-lg h-8 text-[9px] font-black uppercase tracking-widest">Réapprovisionner</Button>
                    </div>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white p-8 border-l-4 border-l-emerald-500">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                        <FlaskConical className="h-4 w-4 text-emerald-500" /> Statut Labo
                    </h4>
                    <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 text-emerald-900">
                        <p className="text-xs font-bold uppercase tracking-tight">Efficacité Résultats</p>
                        <span className="text-lg font-black">94%</span>
                    </div>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white p-8 border-l-4 border-l-indigo-500">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                        <Users className="h-4 w-4 text-indigo-500" /> Climat RH
                    </h4>
                    <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 text-indigo-900">
                        <p className="text-xs font-bold uppercase tracking-tight">Index Turnover</p>
                        <span className="text-lg font-black">2.1%</span>
                    </div>
                </Card>
            </div>
        </div>
    )
}
