"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Mic, Lightbulb, TrendingUp, ShieldAlert, MessageSquare, BrainCircuit, Activity } from "lucide-react"
import { toast } from "sonner"

export function SmartAiAssistant() {
    const [isRecording, setIsRecording] = useState(false)

    const startVoiceDictation = () => {
        setIsRecording(true)
        toast.info("Microphone activé. Parlez pour dicter votre compte-rendu...")
        setTimeout(() => {
            setIsRecording(false)
            toast.success("Transcription terminée et structurée par l'IA.")
        }, 4000)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-indigo-600 animate-pulse" /> SIGHI Smart IA Console
                    </h2>
                    <p className="text-slate-500 font-medium text-sm">Propositions d'améliorations et outils prédictifs.</p>
                </div>
                <Badge className="bg-indigo-600 text-[10px] uppercase font-bold tracking-widest">Version Lab v1.0</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Dictée Vocale */}
                <Card className="border-none shadow-sm hover:shadow-md transition-all">
                    <CardHeader>
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                            <Mic className={`h-5 w-5 ${isRecording ? 'animate-bounce text-red-500' : ''}`} />
                        </div>
                        <CardTitle className="text-md">Transcription Vocale IA</CardTitle>
                        <CardDescription className="text-xs">Dictez vos comptes-rendus. L'IA extrait automatiquement les symptômes et le diagnostic.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant={isRecording ? "destructive" : "default"}
                            className="w-full font-bold gap-2"
                            onClick={startVoiceDictation}
                        >
                            {isRecording ? "Enregistrement en cours..." : "Lancer la Dictée"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Aide à la Prescription */}
                <Card className="border-none shadow-sm hover:shadow-md transition-all">
                    <CardHeader>
                        <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-2">
                            <ShieldAlert className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-md">Vigilance Thérapeutique</CardTitle>
                        <CardDescription className="text-xs">Détection automatique des interactions médicamenteuses et contre-indications cliniques.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-100">
                            <span className="h-2 w-2 bg-red-500 rounded-full" />
                            <p className="text-[10px] text-red-700 font-black">Alerte : Aspirine + Anticoagulant détecté</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full text-xs font-bold">Vérifier Ordonnance</Button>
                    </CardContent>
                </Card>

                {/* Analyse Prédictive Finance */}
                <Card className="border-none shadow-sm hover:shadow-md transition-all bg-slate-900 text-white">
                    <CardHeader>
                        <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 mb-2">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-md">Prédictions Financières</CardTitle>
                        <CardDescription className="text-xs text-slate-400 text-slate-400">Estimation du CA N+1 basée sur les tendances saisonnières et le flux patient.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <h4 className="text-2xl font-black text-emerald-400">+18%</h4>
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Prévu pour Fév.</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="pt-8">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-orange-500" /> Futur : Le "Copilot" du Praticien
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <BrainCircuit className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <h4 className="font-bold">IA Multimodale (Imagerie)</h4>
                                <p className="text-xs text-slate-500">Scan automatique des IRM/Scanners pour détection de tumeurs/anomalies.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                <MessageSquare className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="font-bold">Conciergerie Patient IA</h4>
                                <p className="text-xs text-slate-500">Agent conversationnel 24h/7 pour trier les urgences et planifier les RDV.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
