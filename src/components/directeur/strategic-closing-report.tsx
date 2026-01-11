"use client"

import {
    CheckCircle2,
    ArrowRight,
    ShieldCheck,
    Zap,
    School,
    BrainCircuit,
    History,
    TrendingUp,
    Download
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function StrategicClosingReport() {
    const modules = [
        {
            title: "Cyber Fortress & Géo-Redondance",
            status: "Déployé",
            impact: "Continuité de service 99.99%",
            icon: ShieldCheck,
            color: "text-rose-500"
        },
        {
            title: "Santé Prédictive & IA Clinique",
            status: "Actif",
            impact: "Précision diagnostique +45%",
            icon: BrainCircuit,
            color: "text-indigo-600"
        },
        {
            title: "E-Learning CHU & Academy",
            status: "Certifié",
            impact: "Formation staff & internes live",
            icon: School,
            color: "text-slate-900"
        },
        {
            title: "Passerelle Comms & WhatsApp",
            status: "Automatisé",
            impact: "Engagement patient optimisé",
            icon: Zap,
            color: "text-emerald-500"
        }
    ]

    return (
        <div className="flex flex-col gap-10 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-6xl mx-auto">
            {/* Executive Header */}
            <div className="text-center space-y-4 mb-10">
                <Badge className="bg-indigo-600 text-white font-black px-6 py-2 rounded-full uppercase tracking-widest text-[10px]">Bilan de Clôture Stratégique v2026</Badge>
                <h1 className="text-6xl font-black italic tracking-tighter text-slate-900 uppercase">Projet <span className="text-indigo-600">SIGHI Master</span></h1>
                <p className="text-sm font-medium text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
                    Ce rapport synthétise la transformation digitale de la Clinique Aéré Lao en un pôle d'excellence médicale, académique et technologique indétrônable.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {modules.map((m, i) => (
                    <Card key={i} className="border-none shadow-2xl rounded-[40px] p-10 bg-white group hover:scale-[1.02] transition-all duration-500">
                        <div className="flex items-center gap-6 mb-8">
                            <div className={`h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center ${m.color} shadow-inner group-hover:rotate-6 transition-transform`}>
                                <m.icon className="h-8 w-8" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-black italic tracking-tighter uppercase text-slate-900 leading-tight">{m.title}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">{m.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Business & Clinique</p>
                            <p className="text-sm font-bold text-slate-900 italic">{m.impact}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Strategic Conclusion */}
            <Card className="border-none shadow-3xl rounded-[50px] bg-slate-900 text-white p-12 mt-10 relative overflow-hidden group">
                <History className="absolute -bottom-20 -right-20 h-80 w-80 text-white opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight italic">Positionnement <br /><span className="text-indigo-400">Leader de Marché</span></h2>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Score d'Innovation</p>
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-black">9.8/10</span>
                                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Index de Sécurité</p>
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-black">MIL-SPEC</span>
                                    <ShieldCheck className="h-6 w-6 text-indigo-500" />
                                </div>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-400 leading-relaxed italic border-l-4 border-indigo-600 pl-6">
                            "Le système SIGHI 2026 ne se contente pas de gérer une clinique ; il orchestre un écosystème de santé intelligent, résilient et apprenant, plaçant la Clinique Aéré Lao 5 ans devant ses concurrents directs."
                        </p>
                    </div>
                    <div className="space-y-6">
                        <Button className="w-full h-16 bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-slate-100 gap-3">
                            <Download className="h-5 w-5" /> Télécharger Rapports PDF
                        </Button>
                        <Button variant="outline" className="w-full h-16 border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Valider Déploiement
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="flex justify-center gap-10 opacity-30">
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Propulsé par SIGHI KERNEL v2026.1</span>
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Dakar, Sénégal</span>
            </div>
        </div>
    )
}
