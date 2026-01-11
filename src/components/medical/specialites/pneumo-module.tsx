"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wind, Activity, TrendingDown, ClipboardList } from "lucide-react"

export function PneumoModule() {
    const [data, setData] = useState({
        cvc: "",
        vems: "",
        dem: ""
    })

    // Calcul du rapport de Tiffeneau
    const tiffeneau = data.vems && data.cvc ? (parseFloat(data.vems) / parseFloat(data.cvc) * 100).toFixed(1) : null

    return (
        <Card className="border-blue-200">
            <CardHeader className="bg-blue-50/50">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Wind className="h-5 w-5" /> Pneumologie : Explorations Fonctionnelles
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <Activity className="h-4 w-4" /> Résultats Spirométrie
                        </h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>CVC (Capacité Vitale Capacité) - Litres</Label>
                                <Input type="number" step="0.01" value={data.cvc} onChange={(e) => setData({ ...data, cvc: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>VEMS (Volume Expiré Max / Seconde) - Litres</Label>
                                <Input type="number" step="0.01" value={data.vems} onChange={(e) => setData({ ...data, vems: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>DEM (Débit Expiratoire Moyen)</Label>
                                <Input type="number" step="0.01" value={data.dem} onChange={(e) => setData({ ...data, dem: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-dashed p-6 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">Indice de Tiffeneau (VEMS/CVC)</p>
                        {tiffeneau ? (
                            <div className="space-y-4 w-full">
                                <div className={`text-5xl font-black ${parseFloat(tiffeneau) < 70 ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {tiffeneau}%
                                </div>
                                <Badge variant={parseFloat(tiffeneau) < 70 ? "destructive" : "secondary"} className="py-1 px-4">
                                    {parseFloat(tiffeneau) < 70 ? "Syndrome Obstructif" : "Fonction normale"}
                                </Badge>
                                <div className="mt-4 p-3 bg-white border rounded-lg text-left shadow-sm">
                                    <h5 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1 mb-2">
                                        <ClipboardList className="h-3 w-3" /> Interprétation Auto
                                    </h5>
                                    <p className="text-xs text-slate-600">
                                        {parseFloat(tiffeneau) < 70
                                            ? "Diminution du rapport VEMS/CVC. Évoque un asthme ou une BPCO. Prévoir test de réversibilité."
                                            : "Paramètres dans les normes physiologiques pour le profil patient."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="opacity-30">
                                <TrendingDown className="h-12 w-12 mx-auto mb-2" />
                                <p className="text-xs italic">Saisissez VEMS et CVC pour l'interprétation</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
