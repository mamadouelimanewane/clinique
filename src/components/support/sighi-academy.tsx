"use client"

import { useState } from "react"
import {
    GraduationCap,
    Play,
    ShieldAlert,
    BrainCircuit,
    CheckCircle2,
    Activity,
    Timer,
    Trophy,
    Award,
    BookOpen,
    Zap,
    Users,
    ChevronRight,
    Lock,
    RefreshCcw,
    Sparkles
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function SIGHIAcademy() {
    const [activeLevel, setActiveLevel] = useState(1)
    const [isSimulating, setIsSimulating] = useState(false)
    const [simProgress, setSimProgress] = useState(0)
    const [simTitle, setSimTitle] = useState("")

    const handleStartSimulation = (title: string) => {
        setIsSimulating(true)
        setSimProgress(0)
        setSimTitle(title)

        let progress = 0
        const interval = setInterval(() => {
            progress += 1
            setSimProgress(progress)
            if (progress >= 100) {
                clearInterval(interval)
                setIsSimulating(false)
                toast.success(`Simulation "${title}" terminée. Score : 100% - Certifié !`)
            }
        }, 50)
    }

    const trainingModules = [
        {
            id: 1,
            title: "Maîtrise du Cyber Fortress",
            icon: ShieldAlert,
            duration: "15 min",
            difficulty: "Intermédiaire",
            desc: "Apprenez à déclencher un failover manuel et à isoler une intrusion suspecte.",
            skills: ["Cyber-Security", "Business Continuity"]
        },
        {
            id: 2,
            title: "Interprétation de la Santé Prédictive",
            icon: BrainCircuit,
            duration: "20 min",
            difficulty: "Avancé (Médical)",
            desc: "Comprendre les scores de risque complication et l'analyse de vision IA.",
            skills: ["IA Clinique", "Diagnostic Augmenté"]
        },
        {
            id: 3,
            title: "Protocoles de Sauvegarde Blockchain",
            icon: Lock,
            duration: "10 min",
            difficulty: "Technique",
            desc: "Vérifier l'intégrité WORM des dossiers patients et archives GED.",
            skills: ["Data Integrity", "Audit Control"]
        }
    ]

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Academy Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 rotate-3">
                            <GraduationCap className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">SIGHI <span className="text-indigo-600">Academy</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Certification Professional 2026 • Training Live • Simulations d'Urgence
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end mr-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ma Progression</p>
                        <p className="text-xl font-black text-indigo-600">NIVEAU 4 <span className="text-[10px] text-slate-400 font-bold uppercase">/ EXPERT</span></p>
                    </div>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <Award className="h-5 w-5" /> Mes Certificats
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Active Simulation View */}
                <Card className="lg:col-span-8 border-none shadow-3xl rounded-[50px] bg-slate-900 text-white overflow-hidden p-0 border border-slate-800 relative">
                    {isSimulating ? (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 bg-black/80 backdrop-blur-3xl animate-in zoom-in-95 duration-500">
                            <div className="mb-10 text-center space-y-4">
                                <Zap className="h-16 w-16 text-indigo-400 mx-auto animate-pulse" />
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase underline decoration-indigo-500">Simulation en cours</h3>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{simTitle}</p>
                            </div>

                            <div className="w-full max-w-lg space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">Progression du Module</span>
                                    <span className="text-3xl font-black text-indigo-400 italic">{simProgress}%</span>
                                </div>
                                <Progress value={simProgress} className="h-3 bg-white/10" />
                                <div className="grid grid-cols-3 gap-4 pt-10">
                                    {[
                                        { label: "Précision", val: "99%", color: "text-emerald-400" },
                                        { label: "Rapidité", val: "Optimal", color: "text-indigo-400" },
                                        { label: "Stress", val: "Faible", color: "text-rose-400" },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white/5 p-4 rounded-3xl text-center">
                                            <p className="text-[8px] font-black uppercase text-slate-500 mb-1">{s.label}</p>
                                            <p className={cn("text-sm font-black italic", s.color)}>{s.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-12 h-full flex flex-col justify-center items-center text-center">
                            <div className="h-32 w-32 rounded-[40px] bg-white/5 flex items-center justify-center mb-10 border border-white/10">
                                <Play className="h-12 w-12 text-indigo-500 fill-current" />
                            </div>
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight mb-4">Cockpit de Formation <br /><span className="text-indigo-500">Interactive</span></h3>
                            <p className="text-sm font-medium text-slate-400 max-w-md leading-relaxed italic">
                                Sélectionnez un module à droite pour lancer une simulation immersive. Testez vos réflexes sur le failover ou affinez vos diagnostics assistés par l'IA.
                            </p>
                            <div className="mt-12 flex gap-4">
                                <Badge className="bg-indigo-500/20 text-indigo-400 border-none px-4 py-2 rounded-xl text-[9px] font-black tracking-widest">SÉCURISÉ</Badge>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none px-4 py-2 rounded-xl text-[9px] font-black tracking-widest">HL7 CERTIFIED</Badge>
                            </div>
                        </div>
                    )}
                    {/* Background decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
                </Card>

                {/* Right: Module Selection */}
                <div className="lg:col-span-4 space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4">Modules Disponibles</h4>
                    <div className="space-y-4">
                        {trainingModules.map((m) => (
                            <Card key={m.id} className="border-none shadow-xl rounded-[35px] hover:shadow-2xl hover:translate-x-2 transition-all duration-500 group overflow-hidden border border-slate-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-5 mb-4">
                                        <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                            <m.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-black uppercase tracking-tight text-slate-900 leading-none">{m.title}</h5>
                                            <p className="text-[9px] font-bold text-slate-400 mt-1">{m.duration} • {m.difficulty}</p>
                                        </div>
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-500 italic leading-relaxed mb-6 px-1">
                                        {m.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {m.skills.map((s, i) => (
                                            <Badge key={i} variant="outline" className="text-[8px] font-black uppercase border-slate-100 text-slate-400 tracking-widest">{s}</Badge>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => handleStartSimulation(m.title)}
                                        className="w-full h-12 bg-white border border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-900 font-extrabold text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-sm"
                                    >
                                        Lancer Simulation <ChevronRight className="h-3 w-3 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Stats Widget */}
                    <Card className="bg-indigo-50 border-indigo-100 rounded-[35px] p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="h-5 w-5 text-indigo-600" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 italic">Engagement Staff</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-2xl font-black text-slate-900 tracking-tighter italic">82%</span>
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">+12% cette semaine</span>
                            </div>
                            <Progress value={82} className="h-1.5 bg-indigo-200" />
                            <p className="text-[9px] font-bold text-slate-400 uppercase italic">Taux de certification complétée</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
