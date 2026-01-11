"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Baby, Activity, AlertCircle } from "lucide-react"

export function GynecoModule() {
    const [data, setData] = useState({
        sa: "", // Semaines d'Aménorrhée
        hauteurUterine: "",
        bcf: "", // Bruits du Cœur Foetal
        presentation: "Cephalique"
    })

    return (
        <Card className="border-pink-200">
            <CardHeader className="bg-pink-50/50">
                <CardTitle className="flex items-center gap-2 text-pink-700">
                    <Baby className="h-5 w-5" /> Gynécologie-Obstétrique Advance
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Terme (SA)</Label>
                        <Input type="number" placeholder="Ex: 32" value={data.sa} onChange={(e) => setData({ ...data, sa: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label>Hauteur Utérine (cm)</Label>
                        <Input type="number" placeholder="Ex: 28" value={data.hauteurUterine} onChange={(e) => setData({ ...data, hauteurUterine: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label>BCF (BPM)</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Ex: 145" value={data.bcf} onChange={(e) => setData({ ...data, bcf: e.target.value })} />
                            <Button size="icon" variant="outline" className="shrink-0"><Activity className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 flex gap-4">
                    <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
                    <div>
                        <h4 className="font-bold text-amber-800 text-sm">Calculateur de risque de pré-éclampsie</h4>
                        <p className="text-xs text-amber-700">Algorithme basé sur la tension artérielle moyenne et les antécédents.</p>
                        <Button variant="link" className="p-0 h-auto text-xs font-bold text-amber-900 mt-1">Lancer l'analyse</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
