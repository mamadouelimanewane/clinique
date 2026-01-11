"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, Target, Zap } from "lucide-react"

export function OphatmoModule() {
    const [vision, setVision] = useState({ od: "10/10", og: "8/10" })

    return (
        <Card className="border-emerald-200">
            <CardHeader className="bg-emerald-50/50">
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                    <Eye className="h-5 w-5" /> Ophtalmologie Digitale
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <Target className="h-4 w-4" /> Acuité Visuelle (Monoyer/Snellen)
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Oeil Droit (OD)</Label>
                                <Input value={vision.od} onChange={(e) => setVision({ ...vision, od: e.target.value })} className="font-bold text-center" />
                            </div>
                            <div className="space-y-2">
                                <Label>Oeil Gauche (OG)</Label>
                                <Input value={vision.og} onChange={(e) => setVision({ ...vision, og: e.target.value })} className="font-bold text-center" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Pression Intra-Oculaire (mmHg)</Label>
                            <div className="flex gap-2">
                                <Input type="number" placeholder="OD" className="w-1/2" />
                                <Input type="number" placeholder="OG" className="w-1/2" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 text-emerald-400 p-6 rounded-xl relative overflow-hidden flex flex-col items-center justify-center">
                        <div className="absolute top-2 right-2 opacity-20"><Zap className="h-10 w-10" /></div>
                        <p className="text-[10px] uppercase tracking-widest text-emerald-600 mb-4">Aide au diagnostic cataracte</p>
                        <div className="text-center space-y-2">
                            <p className="text-3xl font-mono">IOL Calc : +21.5 D</p>
                            <p className="text-xs text-white/60">Formule : Barrett Universal II</p>
                            <Badge variant="outline" className="border-emerald-500 text-emerald-500 mt-2">Calcul automatique</Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
