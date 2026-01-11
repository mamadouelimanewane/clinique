"use client"

import { useState } from "react"
import {
    FlaskConical,
    Box,
    Wind,
    Leaf,
    Layers,
    Eye,
    Cpu,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    TrendingUp,
    Zap,
    Binoculars,
    GlassWater
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function InnovationLab() {
    const [activeTech, setActiveTech] = useState<string | null>(null)
    const [isSimulating, setIsSimulating] = useState(false)

    const technologies = [
        {
            id: 'biotwin',
            title: "Holographic Bio-Twin",
            desc: "Clone numérique 3D du patient prédisant l'évolution dentaire sur 10 ans.",
            icon: Eye,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            status: "Expérimental"
        },
        {
            id: 'eco',
            title: "Eco-Sustains Monitor",
            desc: "Optimisation de l'empreinte carbone et gestion intelligente des déchets médicaux.",
            icon: Leaf,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            status: "Beta"
        },
        {
            id: 'neural',
            title: "Neural Clinic Network",
            desc: "Partage décentralisé de modèles IA entre cliniques sans transfert de données patient.",
            icon: Cpu,
            color: "text-amber-600",
            bg: "bg-amber-50",
            status: "Protocole"
        }
    ]

    const handleSimulate = (tech: string) => {
        setIsSimulating(true)
        toast.loading(`Initialisation du moteur ${tech}...`)
        setTimeout(() => {
            setIsSimulating(false)
            toast.dismiss()
            toast.success(`Simulation ${tech} réussie. Paramètres optimisés.`)
        }, 2000)
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Innovation Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/20 rotate-3">
                            <FlaskConical className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Innovation <span className="text-rose-600">Lab</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Future Tech R&D • Eco-Responsabilité • Web 3.0 Health
                    </p>
                </div>
                <div className="flex gap-4">
                    <Badge className="h-10 px-6 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest border-none flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> R&D ACTIF
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Tech Cards */}
                <div className="lg:col-span-4 space-y-4">
                    {technologies.map((tech) => (
                        <Card
                            key={tech.id}
                            onClick={() => setActiveTech(tech.id)}
                            className={cn(
                                "border-none shadow-xl rounded-[40px] p-8 cursor-pointer transition-all duration-500 group",
                                activeTech === tech.id ? "bg-slate-900 text-white scale-[1.02]" : "bg-white hover:bg-slate-50"
                            )}
                        >
                            <div className="flex gap-6">
                                <div className={cn("h-16 w-16 rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform", activeTech === tech.id ? "bg-white/10 text-white" : tech.bg + " " + tech.color)}>
                                    <tech.icon className="h-8 w-8" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xs font-black uppercase tracking-tighter italic">{tech.title}</h3>
                                        <Badge variant="outline" className={cn("text-[8px] font-black border-none px-2", activeTech === tech.id ? "bg-white/10 text-white" : "bg-slate-100 text-slate-400")}>{tech.status}</Badge>
                                    </div>
                                    <p className={cn("text-[10px] font-medium leading-relaxed italic opacity-70", activeTech === tech.id ? "text-slate-300" : "text-slate-500")}>
                                        {tech.desc}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Right: Dynamic Visualizer */}
                <Card className="lg:col-span-8 border-none shadow-3xl rounded-[50px] bg-slate-50 overflow-hidden relative group border border-slate-100 min-h-[500px] flex flex-col items-center justify-center p-12">
                    {!activeTech ? (
                        <div className="text-center space-y-6">
                            <Binoculars className="h-20 w-20 text-slate-200 mx-auto" />
                            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-slate-300">Sélectionnez une innovation pour explorer l'avenir.</h2>
                        </div>
                    ) : (
                        <div className="w-full animate-in zoom-in-95 duration-700">
                            {activeTech === 'biotwin' && (
                                <div className="space-y-10 text-center">
                                    <div className="relative h-64 w-64 mx-auto">
                                        <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600" className="h-full w-full object-cover rounded-[50px] opacity-40 mix-blend-multiply" alt="3D Twin" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles className="h-24 w-24 text-indigo-600 animate-pulse" />
                                        </div>
                                        {/* 3D Wireframe Overlay Simulation */}
                                        <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-[50px] animate-ping" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Moteur de Prédiction <span className="text-indigo-600">3D</span></h3>
                                        <p className="text-sm font-medium text-slate-400 italic max-w-lg mx-auto leading-relaxed">
                                            L'IA projette l'usure prévisible de l'émail et la migration dentaire basée sur le schéma occlusal actuel. Un outil de vente et de prévention révolutionnaire.
                                        </p>
                                        <Button onClick={() => handleSimulate('Bio-Twin')} className="h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest gap-3 transition-all">
                                            <Zap className="h-5 w-5" /> Générer Holo-Twin
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTech === 'eco' && (
                                <div className="space-y-10 text-center">
                                    <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                                        <div className="p-8 bg-emerald-50 rounded-[40px] text-emerald-600 space-y-4">
                                            <p className="text-[10px] font-black uppercase">Énergie Solaire</p>
                                            <h4 className="text-4xl font-black">84%</h4>
                                            <Badge className="bg-emerald-600 text-white border-none text-[8px]">OPTIMAL</Badge>
                                        </div>
                                        <div className="p-8 bg-slate-900 rounded-[40px] text-white space-y-4">
                                            <p className="text-[10px] font-black uppercase text-slate-500">Déchets Bio</p>
                                            <h4 className="text-4xl font-black">2.4kg</h4>
                                            <Badge className="bg-white/10 text-white border-none text-[8px] uppercase tracking-widest">Recyclage IA</Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Clinique <span className="text-emerald-600">Zéro-Carbone</span></h3>
                                        <p className="text-sm font-medium text-slate-400 italic max-w-lg mx-auto leading-relaxed">
                                            Le module ECO traque chaque ressource et automatise la gestion des déchets à risque infectieux pour devenir la première clinique certifiée LEED Platinum de la région.
                                        </p>
                                        <Button onClick={() => handleSimulate('Eco-Audit')} className="h-14 px-10 rounded-2xl bg-emerald-600 hover:bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest gap-3 transition-all">
                                            <Leaf className="h-5 w-5" /> Optimiser Empreinte
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTech === 'neural' && (
                                <div className="space-y-10 text-center">
                                    <div className="relative h-64 w-full flex items-center justify-center overflow-hidden rounded-[50px] bg-slate-900">
                                        <Globe className="h-40 w-40 text-indigo-500/20 animate-spin-slow" />
                                        <div className="absolute inset-0 flex items-center justify-center gap-6">
                                            <div className="h-12 w-12 bg-white rounded-xl shadow-xl flex items-center justify-center text-rose-500"><FlaskConical className="h-6 w-6" /></div>
                                            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" />
                                            <div className="h-12 w-12 bg-white rounded-xl shadow-xl flex items-center justify-center text-indigo-500"><Box className="h-6 w-6" /></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Intelligence <span className="text-amber-600">Collective</span></h3>
                                        <p className="text-sm font-medium text-slate-400 italic max-w-lg mx-auto leading-relaxed">
                                            En utilisant le Federated Learning, SIGHI apprend des cas cliniques mondiaux sans jamais compromettre la confidentialité. Plus de données, plus de précision, zéro fuite.
                                        </p>
                                        <Button onClick={() => handleSimulate('Neural-Link')} className="h-14 px-10 rounded-2xl bg-amber-600 hover:bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest gap-3 transition-all">
                                            <Cpu className="h-5 w-5" /> Synchroniser Modèles
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
