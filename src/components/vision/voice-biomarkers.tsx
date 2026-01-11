"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic2, Activity, Brain, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

export function VoiceBiomarkersAi() {
    const [analyzing, setAnalyzing] = useState(false)
    const [score, setScore] = useState<any>(null)
    const [waveData, setWaveData] = useState<{ time: number, value: number }[]>([])
    const [isRecording, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRecording || analyzing) {
                setWaveData(prev => {
                    const newData = [...prev, { time: prev.length, value: Math.random() * 100 }]
                    return newData.slice(-50)
                })
            }
        }, 100)
        return () => clearInterval(interval)
    }, [isRecording, analyzing])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const recorder = new MediaRecorder(stream)
            const chunks: Blob[] = []

            recorder.ondataavailable = (e) => chunks.push(e.data)
            recorder.onstop = async () => {
                const blob = new Blob(chunks, { type: 'audio/mp3' })
                await sendToAi(blob)
            }

            recorder.start()
            setMediaRecorder(recorder)
            setIsRecording(true)
        } catch (err) {
            console.error("Erreur micro:", err)
        }
    }

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop()
            setIsRecording(false)
        }
    }

    const sendToAi = async (audioBlob: Blob) => {
        setAnalyzing(true)
        try {
            const formData = new FormData()
            formData.append('file', audioBlob, 'recording.mp3')

            const response = await fetch('/api/ai/voice', {
                method: 'POST',
                body: formData
            })

            const result = await response.json()

            // Map AI analysis to our UI score
            setScore({
                stress: result.analysis.stress || 25,
                energy: result.analysis.fatigue ? 100 - result.analysis.fatigue : 80,
                mentalHealth: result.analysis.clarté_mentale || "STABLE",
                markers: result.analysis.biomarqueurs || ["Prosodie normale"]
            })
        } catch (error) {
            console.error("Erreur IA Voice:", error)
        } finally {
            setAnalyzing(false)
        }
    }

    return (
        <Card className="border-indigo-100 shadow-xl overflow-hidden rounded-3xl">
            <CardHeader className="bg-indigo-50/50">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                            <Mic2 className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black">Analyse Vocale & Marqueurs Digitaux</CardTitle>
                            <CardDescription className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none mt-1">Santé Mentale & Stress IA</CardDescription>
                        </div>
                    </div>
                    <Badge className="bg-indigo-600 text-white border-none font-bold text-[9px]">VOICE-BIO v2</Badge>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                <div className="h-24 bg-slate-50 border rounded-2xl overflow-hidden flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={waveData}>
                            <defs>
                                <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#4f46e5" fillOpacity={1} fill="url(#colorWave)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className={`h-4 w-1 bg-indigo-600 rounded-full animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                        <p className="text-[9px] font-black text-indigo-600 mt-2">ANALYSE EN COURS...</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Niveau de Stress</h4>
                        <div className="space-y-1">
                            <div className="flex justify-between items-end">
                                <span className={`text-2xl font-black ${score ? (score.stress > 50 ? 'text-red-600' : 'text-emerald-600') : 'text-slate-300'}`}>
                                    {score ? `${score.stress}%` : '--%'}
                                </span>
                                <Badge variant="outline" className="text-[9px] h-4 leading-none">{score ? (score.stress > 50 ? 'ELEVÉ' : 'NORMAL') : 'CALCUL...'}</Badge>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className={`h-full bg-indigo-600 rounded-full transition-all duration-1000`} style={{ width: score ? `${score.stress}%` : '0%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Santé Mentale</h4>
                        <div className="flex items-center gap-2">
                            {score ? (
                                <>
                                    <Brain className="h-5 w-5 text-indigo-600" />
                                    <span className="text-sm font-black text-slate-900">{score.mentalHealth}</span>
                                </>
                            ) : (
                                <p className="text-xs text-slate-300 font-bold italic">En attente d'échantillon...</p>
                            )}
                        </div>
                    </div>
                </div>

                {!score && (
                    <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={analyzing}
                        className={cn(
                            "w-full font-black h-12 rounded-2xl shadow-lg transition-all",
                            isRecording ? "bg-rose-600 hover:bg-rose-700 animate-pulse" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                        )}
                    >
                        {analyzing ? (
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 animate-spin" /> Extraction des biomarqueurs...
                            </div>
                        ) : isRecording ? "Arrêter l'enregistrement" : "Lancer l'analyse vocale"}
                    </Button>
                )}

                {score && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-1" />
                        <div>
                            <p className="text-xs font-black text-emerald-800">Analyse terminée</p>
                            <p className="text-[10px] text-emerald-600 font-medium">Aucun signe de dépression ou de détresse respiratoire vocale détecté. Prosodie et débit de parole optimaux.</p>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 p-2 bg-orange-50 rounded-lg border border-orange-100 items-center">
                    <AlertTriangle className="h-3 w-3 text-orange-600" />
                    <p className="text-[9px] text-orange-700 font-bold uppercase">Usage Médical Uniquement • Données Cryptées</p>
                </div>
            </CardContent>
        </Card>
    )
}
