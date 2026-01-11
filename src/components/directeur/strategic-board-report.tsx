"use client"

import {
    FileText,
    ArrowUpRight,
    CheckCircle2,
    Zap,
    ShieldCheck,
    TrendingUp,
    Target,
    Sparkles,
    Globe,
    Cpu,
    Activity,
    Users,
    Stethoscope,
    Boxes,
    Building2,
    Lock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function StrategicBoardReport() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Report Header - Ultra Formal & Premium */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 rounded-[40px] p-12 text-white overflow-hidden relative border border-slate-700">
                <div className="relative z-10 space-y-6 max-w-2xl">
                    <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl rotate-3">
                            <FileText className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">Rapport de Synthèse Stratégique</p>
                            <h1 className="text-4xl font-black tracking-tighter italic">TRANSFORMATION <span className="text-indigo-400">SIGHI 2026</span></h1>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed italic">
                        Ce document présente les résultats de la phase de modernisation technologique et financière. La Clinique Aéré Lao se positionne désormais comme leader de l'intelligence médicale au Sénégal.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Button className="bg-white text-slate-900 font-black text-xs h-12 px-10 rounded-2xl shadow-xl hover:bg-slate-100 italic uppercase">
                            Imprimer Bordereau PDF
                        </Button>
                        <Button variant="outline" className="border-indigo-500/50 hover:bg-indigo-500/10 text-white font-black text-xs h-12 px-10 rounded-2xl uppercase">
                            Archiver au Conseil
                        </Button>
                    </div>
                </div>
                <div className="relative z-10 hidden lg:block">
                    <div className="h-64 w-64 rounded-full border-2 border-indigo-500/20 flex items-center justify-center p-8 bg-black/40 backdrop-blur-3xl shadow-3xl">
                        <div className="text-center">
                            <h2 className="text-6xl font-black text-indigo-400">92%</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Maturité Digitale</p>
                        </div>
                    </div>
                    <Activity className="absolute -top-10 -right-10 h-32 w-32 text-indigo-600 opacity-20 animate-pulse" />
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            </div>

            {/* Strategic Pillars Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: "Intelligence Médicale", impact: "+22%", desc: "IA Diagnostic & Smart Prescription", icon: Sparkles, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { title: "Efficience Finance", impact: "14.2M", desc: "Yield Mgmt & Tarification IA", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { title: "Sécurité Patient", impact: "AES-256", desc: "Comms Cryptées & Cloud GED", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
                    { title: "HSE & GMAO", impact: "98.5%", desc: "Uptime Assets & Contrôle Qualité", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((p, i) => (
                    <Card key={i} className="border-none shadow-2xl rounded-[35px] overflow-hidden group hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                        <CardContent className="p-8">
                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl", p.bg, p.color)}>
                                <p.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 leading-tight mb-2 italic uppercase">{p.title}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{p.desc}</p>
                            <div className="flex justify-between items-end border-t border-slate-50 pt-6">
                                <span className={cn("text-2xl font-black italic", p.color)}>{p.impact}</span>
                                <Badge className="bg-slate-100 text-slate-400 border-none text-[8px] font-black">ROI CERTIFIÉ</Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Detailed Performance Charts */}
                <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] bg-white overflow-hidden flex flex-col">
                    <CardHeader className="p-10 border-b border-slate-50 flex flex-row justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-black italic tracking-tighter uppercase">Impact Opérationnel Décalé</CardTitle>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Comparatif Phase Pre-IA (2025) vs Phase SIGHI (2026)</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-slate-200" /><span className="text-[8px] font-black uppercase text-slate-400">2025</span></div>
                            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-indigo-600" /><span className="text-[8px] font-black uppercase text-slate-900">2026</span></div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 flex-1">
                        <div className="space-y-10">
                            {[
                                { label: "Temps Détection Pathologies", value25: 45, value26: 92, unit: "Précision %" },
                                { label: "Optimisation de la Marge Finance", value25: 28, value26: 85, unit: "Yield Idx" },
                                { label: "Délai Moy. de Facturation Tiers", value25: 60, value26: 15, unit: "Jours" },
                                { label: "Expérience Patient (NPS)", value25: 68, value26: 96, unit: "Satisfaction %" },
                            ].map((row, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                        <span className="text-slate-900 italic underline decoration-indigo-200 decoration-4 underline-offset-4">{row.label}</span>
                                        <span className="text-indigo-600">{row.value26} {row.unit}</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-50 rounded-full relative overflow-hidden group">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-slate-200 transition-all duration-1000"
                                            style={{ width: `${row.value25}%` }}
                                        />
                                        <div
                                            className="absolute top-0 left-0 h-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all duration-1000 delay-300"
                                            style={{ width: `${row.value26}%` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* AI Executive Recommendations */}
                <div className="space-y-8">
                    <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-500">
                            <Target className="h-48 w-48" />
                        </div>
                        <h3 className="text-xl font-black italic mb-8 uppercase tracking-tighter border-b border-white/10 pb-6 flex items-center justify-between">
                            Prévisions CO/CA
                            <ArrowUpRight className="h-6 w-6 text-emerald-400" />
                        </h3>
                        <div className="space-y-8 relative z-10">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">Chiffre d'Affaires T3 Projected</p>
                                <h4 className="text-4xl font-black tracking-tighter italic">154 <span className="text-sm font-bold opacity-40">M FCFA / Mois</span></h4>
                                <p className="text-[8px] text-emerald-400 font-bold mt-2 uppercase">↑ +32% Vs An dernier</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Axe de croissance prioritized</p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                        <p className="text-xs font-bold italic">Télémédecine & Suivi Post-Op.</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                        <p className="text-xs font-bold italic">Check-up Préventif VIP (Yield++).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full mt-10 bg-indigo-600 text-white font-black text-xs h-14 rounded-2xl shadow-2xl hover:bg-indigo-700 transition-all">
                            Valider Business Plan Q3
                        </Button>
                    </Card>

                    <Card className="border-none shadow-2xl rounded-[40px] p-8 bg-white border border-slate-100 flex items-center gap-6">
                        <div className="h-20 w-20 rounded-full border-4 border-indigo-600 flex items-center justify-center font-black text-2xl text-slate-900 italic shadow-xl">
                            A+
                        </div>
                        <div>
                            <h4 className="font-black text-sm italic tracking-tighter uppercase">Notation Risque Audit</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sytème Hautement Résilient</p>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Verification Checklist */}
            <Card className="border-none shadow-2xl rounded-[50px] bg-gradient-to-br from-slate-50 to-indigo-50/30 p-12 border border-white overflow-hidden relative">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <h4 className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-indigo-600" /> Compliance 2026
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Vérification de la conformité aux standards internationaux de santé et cybersécurité.</p>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { label: "RGPD & Protection des Données", status: "Certifié" },
                            { label: "Hébergement Données de Santé", status: "Redondant" },
                            { label: "Ségrégation des Tâches Finance", status: "Activé" },
                            { label: "Archivage Légal 10 Ans", status: "Actif" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-white">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-tight text-slate-700">{item.label}</span>
                                <Badge className="ml-auto bg-emerald-50 text-emerald-600 border-none text-[8px] font-black">{item.status}</Badge>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-indigo-200/20 rounded-full blur-3xl" />
            </Card>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    )
}
