"use client"

import { useState } from "react"
import {
    BrainCircuit,
    Scan,
    Activity,
    Sparkles,
    TrendingUp,
    AlertCircle,
    Microscope,
    Dna,
    Layers,
    Crosshair,
    Zap,
    Download,
    Share2,
    Eye
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function PredictiveAIClinical() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisProgress, setAnalysisProgress] = useState(0)
    const [showResults, setShowResults] = useState(false)

    const runAnalysis = () => {
        setIsAnalyzing(true)
        setShowResults(false)
        setAnalysisProgress(0)

        let progress = 0
        const interval = setInterval(() => {
            progress += 5
            setAnalysisProgress(progress)
            if (progress >= 100) {
                clearInterval(interval)
                setIsAnalyzing(false)
                setShowResults(true)
                toast.success("Analyse Prédictive terminée par l'IA.")
            }
        }, 150)
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Innovation Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 rotate-3">
                            <BrainCircuit className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Santé <span className="text-indigo-600">Prédictive</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Intelligence Clinique v2026 • Diagnostic Assisté • Computer Vision
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex gap-2">
                        <Layers className="h-4 w-4" /> Historique Analyse
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2" onClick={runAnalysis} disabled={isAnalyzing}>
                        <Zap className={cn("h-5 w-5", isAnalyzing && "animate-pulse text-amber-400")} /> {isAnalyzing ? "Calcul en cours..." : "Lancer Analyse IA"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visualizer Area */}
                <Card className="lg:col-span-7 border-none shadow-3xl rounded-[50px] bg-slate-950 overflow-hidden relative group h-[600px] border-4 border-slate-900">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {isAnalyzing ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-20">
                            <div className="relative h-48 w-48">
                                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                <div className="absolute inset-4 rounded-full border-4 border-violet-500/20 border-b-violet-500 animate-spin-slow" />
                                <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-indigo-400 animate-pulse" />
                            </div>
                            <div className="text-center space-y-4">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Scanning Neural Bridge...</h3>
                                <div className="w-64 space-y-2 mx-auto">
                                    <Progress value={analysisProgress} className="h-2 bg-white/10" />
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{analysisProgress}% - Analyse de texture tissulaire</p>
                                </div>
                            </div>
                        </div>
                    ) : showResults ? (
                        <div className="absolute inset-0 z-20 animate-in fade-in duration-1000">
                            <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Scan result" />

                            {/* AI Markers */}
                            <div className="absolute top-1/3 left-1/4 h-32 w-32 border-2 border-rose-500/50 rounded-full animate-pulse flex items-center justify-center">
                                <div className="h-2 w-2 bg-rose-500 rounded-full" />
                                <Badge className="absolute -top-8 bg-rose-600 text-[8px]">ANOMALIE DÉTECTÉE (94%)</Badge>
                            </div>

                            <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/60 backdrop-blur-2xl rounded-[35px] border border-white/10 grid grid-cols-3 gap-8">
                                {[
                                    { label: "Risque Complication", val: "Lo-Risk", sub: "2.4%", color: "text-emerald-400" },
                                    { label: "Cicatrisation Prédite", val: "Optimal", sub: "8-10 jours", color: "text-indigo-400" },
                                    { label: "Score Bio-Intégrité", val: "8.9/10", sub: "Excellente", color: "text-violet-400" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</p>
                                        <p className={cn("text-xl font-black mt-1", stat.color)}>{stat.val}</p>
                                        <p className="text-[10px] font-bold text-white/40 mt-1 uppercase italic">{stat.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 z-20">
                            <Scan className="h-20 w-20 text-slate-700 mb-6" />
                            <h4 className="text-2xl font-black text-slate-400 uppercase tracking-tighter italic">Veuillez charger une imagerie ou un bilan pour analyse.</h4>
                            <p className="text-xs font-bold text-slate-600 uppercase mt-4 tracking-widest max-w-sm">Le moteur IA traitera les données pour identifier les signaux faibles et opportunités thérapeutiques.</p>
                            <Button variant="outline" className="mt-10 border-slate-800 text-slate-500 hover:bg-slate-900 rounded-2xl h-14 px-10 gap-2">
                                <Share2 className="h-4 w-4" /> Importer DICOM/Biologie
                            </Button>
                        </div>
                    )}

                    {/* Scanning Line Animation */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-scan-y z-30" />
                </Card>

                {/* AI Insights & Recommendations */}
                <div className="lg:col-span-5 space-y-6">
                    <Card className="border-none shadow-2xl rounded-[40px] bg-white p-8 relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 italic">Insights IA Stratégiques</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocoles d'Outils Décisionnels</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: "Optimisation du Traitement", desc: "Suggère une approche mini-invasive basée sur la densité osseuse détectée.", icon: Microscope, color: "text-indigo-600" },
                                { title: "Alerte Précoce", desc: "Détection d'une légère inflammation péridentaire non visible à l'oeil nu.", icon: AlertCircle, color: "text-rose-600" },
                                { title: "Pharmacologie Personnalisée", desc: "Ajustement automatique du dosage antalgique selon le métabolisme prédit.", icon: Dna, color: "text-violet-600" },
                            ].map((insight, i) => (
                                <div key={i} className="flex gap-6 p-4 rounded-3xl bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer border border-transparent hover:border-slate-100">
                                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", insight.color, "bg-white shadow-sm border border-slate-100")}>
                                        <insight.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-900">{insight.title}</p>
                                        <p className="text-[11px] font-medium text-slate-500 leading-relaxed mt-1 italic">{insight.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full mt-10 h-16 bg-gradient-to-tr from-indigo-700 to-violet-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl gap-3">
                            <Download className="h-5 w-5" /> Exporter Rapport Clinique IA
                        </Button>
                    </Card>

                    <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 p-8 text-white group overflow-hidden relative">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Précision Diagnostique</span>
                            </div>
                            <span className="text-2xl font-black italic">99.2%</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[99.2%]" />
                            </div>
                            <p className="text-[9px] font-bold text-slate-500 uppercase italic">Benchmarked against WHO Standard Datasets</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
