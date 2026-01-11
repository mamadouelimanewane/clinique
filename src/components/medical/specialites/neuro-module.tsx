"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Brain, Activity, Zap, AlertTriangle, CheckCircle2 } from "lucide-react"

export function NeuroModule() {
    const [gcs, setGcs] = useState({ eyes: 4, verbal: 5, motor: 6 })

    const totalGcs = gcs.eyes + gcs.verbal + gcs.motor

    const getGcsLevel = (score: number) => {
        if (score >= 13) return { label: "Léger / Normal", color: "bg-emerald-100 text-emerald-700" }
        if (score >= 9) return { label: "Modéré", color: "bg-orange-100 text-orange-700" }
        return { label: "Grave / Coma", color: "bg-red-100 text-red-700" }
    }

    const level = getGcsLevel(totalGcs)

    return (
        <Card className="border-indigo-200">
            <CardHeader className="bg-indigo-50/50">
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                    <Brain className="h-5 w-5" /> Neurologie Digital Advance
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <Activity className="h-4 w-4" /> Score de Glasgow (GCS)
                        </h4>
                        <div className="space-y-4 bg-slate-50 p-6 rounded-2xl">
                            <div className="flex justify-between items-center">
                                <Label className="text-xs font-bold">Ouverture des Yeux</Label>
                                <select
                                    className="p-1 border rounded text-xs"
                                    value={gcs.eyes}
                                    onChange={(e) => setGcs({ ...gcs, eyes: parseInt(e.target.value) })}
                                >
                                    <option value={4}>4 - Spontanée</option>
                                    <option value={3}>3 - Au bruit</option>
                                    <option value={2}>2 - À la douleur</option>
                                    <option value={1}>1 - Absente</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center">
                                <Label className="text-xs font-bold">Réponse Verbale</Label>
                                <select
                                    className="p-1 border rounded text-xs"
                                    value={gcs.verbal}
                                    onChange={(e) => setGcs({ ...gcs, verbal: parseInt(e.target.value) })}
                                >
                                    <option value={5}>5 - Orientée</option>
                                    <option value={4}>4 - Confuse</option>
                                    <option value={3}>3 - Inappropriée</option>
                                    <option value={2}>2 - Incompréhensible</option>
                                    <option value={1}>1 - Absente</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center">
                                <Label className="text-xs font-bold">Réponse Motrice</Label>
                                <select
                                    className="p-1 border rounded text-xs"
                                    value={gcs.motor}
                                    onChange={(e) => setGcs({ ...gcs, motor: parseInt(e.target.value) })}
                                >
                                    <option value={6}>6 - Obéit à l'ordre</option>
                                    <option value={5}>5 - Orientée à la douleur</option>
                                    <option value={4}>4 - Évitement</option>
                                    <option value={3}>3 - Flexion stéréotypée</option>
                                    <option value={2}>2 - Extension stéréotypée</option>
                                    <option value={1}>1 - Absente</option>
                                </select>
                            </div>
                            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                <p className="text-sm font-black">Score Total : <span className="text-xl text-indigo-600">{totalGcs}/15</span></p>
                                <Badge className={`${level.color} border-none`}>{level.label}</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-orange-500" /> Screening AVC / NIHSS Simplifié
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                    <span className="text-xs font-bold">Asymétrie faciale</span>
                                </div>
                                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                    <span className="text-xs font-bold">Déficit moteur (bras/jambe)</span>
                                </div>
                                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                    <span className="text-xs font-bold">Trouble du langage (Aphasie)</span>
                                </div>
                                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                            </div>
                        </div>

                        <div className="p-4 bg-red-50 rounded-xl border-2 border-red-100 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-black animate-pulse">!</div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-red-600">Alerte IA Neutro</p>
                                <p className="text-xs text-red-700 font-bold">Si l'un des signes est positif, déclenchez l'alerte AVC immédiatement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
