"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Activity, Coffee, Droplets, Microscope, AlertTriangle } from "lucide-react"

export function GastroModule() {
    const [bristolScale, setBristolScale] = useState(3)

    const BRISTOL_TYPES = [
        { type: 1, label: "Constipation Sévère", desc: "Noisettes dures", color: "text-red-600 bg-red-100" },
        { type: 2, label: "Constipation légère", desc: "Saucisse bosselée", color: "text-orange-600 bg-orange-100" },
        { type: 3, label: "Normal / Idéal", desc: "Saucisse avec craquelures", color: "text-emerald-600 bg-emerald-100" },
        { type: 4, label: "Normal", desc: "Saucisse lisse et souple", color: "text-emerald-700 bg-emerald-200" },
        { type: 5, label: "Tendance Diarrhée", desc: "Morceaux mous nets", color: "text-blue-600 bg-blue-100" },
        { type: 6, label: "Diarrhée légère", desc: "Morceaux duveteux", color: "text-blue-700 bg-blue-200" },
        { type: 7, label: "Diarrhée sévère", desc: "Liquide, sans morceaux", color: "text-red-700 bg-red-200" },
    ]

    const currentType = BRISTOL_TYPES[bristolScale - 1]

    return (
        <Card className="border-orange-200">
            <CardHeader className="bg-orange-50/50">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Droplets className="h-5 w-5" /> Gastro-Entérologie Advance
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <Activity className="h-4 w-4" /> Transit & Échelle de Bristol
                        </h4>
                        <div className="p-6 bg-white border rounded-2xl shadow-sm space-y-6">
                            <input
                                type="range"
                                min="1"
                                max="7"
                                step="1"
                                value={bristolScale}
                                onChange={(e) => setBristolScale(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                <span>Constipation</span>
                                <span>Normal</span>
                                <span>Diarrhée</span>
                            </div>
                            <div className={`p-4 rounded-xl border flex items-center justify-between ${currentType.color.split(' ')[1]}`}>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-60">Type {currentType.type}</p>
                                    <h4 className="text-md font-bold">{currentType.label}</h4>
                                    <p className="text-[10px] font-medium opacity-80">{currentType.desc}</p>
                                </div>
                                <Badge className={`${currentType.color.split(' ')[0]} border-none bg-white font-black`}>IA Interpreted</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <Microscope className="h-4 w-4" /> Rapport d'Endoscopie IA
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                                <p className="text-xs font-bold text-slate-400 uppercase">Aide à la détection de polypes</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="bg-white border-orange-200 text-orange-600 font-bold">Uploader Vidéo/Photo</Button>
                                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">Scanner par IA</Button>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                                    <span>L'analyse automatique peut assister le médecin pour identifier les zones suspectes.</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold uppercase">Hélicobacter Pylori</Label>
                                    <Badge variant="outline" className="w-full justify-center py-1">En attente labo</Badge>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold uppercase">Score de Mayo (RCH)</Label>
                                    <Badge variant="outline" className="w-full justify-center py-1 bg-slate-100">---</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
