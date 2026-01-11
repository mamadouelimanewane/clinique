"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, Droplet, TrendingUp, AlertCircle, Calculator } from "lucide-react"

export function EndoModule() {
    const [hba1c, setHba1c] = useState(7.2)
    const [glycemie, setGlycemie] = useState(1.45)

    const getDiabeteStatus = (val: number) => {
        if (val < 7) return { label: "Objectif atteint", color: "bg-emerald-100 text-emerald-700" }
        if (val < 8) return { label: "À surveiller", color: "bg-orange-100 text-orange-700" }
        return { label: "Déséquilibre sévère", color: "bg-red-100 text-red-700" }
    }

    const status = getDiabeteStatus(hba1c)

    return (
        <Card className="border-emerald-200">
            <CardHeader className="bg-emerald-50/50">
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                    <Droplet className="h-5 w-5" /> Endocrinologie & Diabète
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" /> Suivi Glycémique A1C
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>HbA1c (%)</Label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={hba1c}
                                    onChange={(e) => setHba1c(parseFloat(e.target.value))}
                                    className="text-lg font-bold text-indigo-600"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Glycémie à jeun (g/L)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={glycemie}
                                    onChange={(e) => setGlycemie(parseFloat(e.target.value))}
                                    className="text-lg font-bold"
                                />
                            </div>
                        </div>
                        <div className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 ${status.color}`}>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Interprétation IA</p>
                            <h4 className="text-xl font-black">{status.label}</h4>
                            <p className="text-xs font-medium opacity-80 italic">"Ajuster le traitement si l'HbA1c reste {'>'} 7% pendant 3 mois."</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <Calculator className="h-4 w-4" /> Calculateur de dose Insuline
                        </h4>
                        <div className="p-4 bg-slate-50 border border-dashed rounded-xl space-y-4">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                <span>Ratio Glucides/Insuline</span>
                                <span className="text-slate-900">1:10</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                <span>Sensibilité Insuline</span>
                                <span className="text-slate-900">1 UI pour 0.5 g/L</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg border flex justify-between items-center shadow-sm">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-orange-500" />
                                    <span className="text-xs font-bold">Dose Suggérée (IA)</span>
                                </div>
                                <span className="text-xl font-black text-emerald-600">4 UI Rapid</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 italic font-medium leading-relaxed">
                            Le calculateur IA utilise les ratios historiques du patient pour suggérer une dose de correction optimale.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
