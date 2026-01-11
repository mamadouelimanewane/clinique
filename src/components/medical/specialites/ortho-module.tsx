"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bone, Activity, Scissors, Scan, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export function OrthoModule() {
    const [analyzingXray, setAnalyzingXray] = useState(false)
    const [iaResult, setIaResult] = useState<any>(null)

    const simulateIaAnalysis = () => {
        setAnalyzingXray(true)
        setTimeout(() => {
            setIaResult({
                detection: "Suspection de fracture spiroïde",
                location: "Tiers moyen du Tibia",
                probability: 89,
                gravity: "MODEREE"
            })
            setAnalyzingXray(false)
            toast.success("Analyse IA terminée")
        }, 2500)
    }

    return (
        <Card className="border-slate-300">
            <CardHeader className="bg-slate-50">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Bone className="h-5 w-5" /> Orthopédie & Traumatologie Advance
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500">Traumatologie / Lésion</h4>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label>Type d'accident</Label>
                                <select className="w-full p-2 border rounded-lg text-sm bg-white">
                                    <option>AVP (Accident Voie Publique)</option>
                                    <option>Chute de sa hauteur</option>
                                    <option>Accident de sport</option>
                                    <option>Agression / Trauma direct</option>
                                </select>
                            </div>
                            <div className="space-y-2 text-center p-6 border-2 border-dashed rounded-xl bg-slate-50/50">
                                <Scan className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                                <p className="text-xs font-bold text-slate-500">Uploader Radiographie / Scanner</p>
                                <Button variant="outline" size="sm" className="mt-4" onClick={simulateIaAnalysis} disabled={analyzingXray}>
                                    {analyzingXray ? "Analyse IA..." : "Lancer Aide Diagnostic IA"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-xl p-6 border flex flex-col justify-center ${iaResult ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-dashed border-slate-200'}`}>
                        {iaResult ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Badge className="bg-indigo-600">Aide au Diagnostic IA</Badge>
                                    <span className="text-[10px] font-bold text-indigo-400">{iaResult.probability}% Certitude</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Détection</p>
                                    <p className="text-xl font-black text-indigo-900">{iaResult.detection}</p>
                                    <p className="text-sm font-medium text-slate-700">{iaResult.location}</p>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-indigo-100">
                                    <AlertCircle className="h-4 w-4 text-orange-500" />
                                    <p className="text-[10px] text-slate-600 font-medium">L'avis de l'expert chirurgien prévaut sur l'IA.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center opacity-30">
                                <Activity className="h-10 w-10 mx-auto mb-2" />
                                <p className="text-xs italic">En attente d'imagerie pour analyse...</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-6 border-t">
                    <h4 className="font-semibold text-sm uppercase text-slate-500 mb-4 flex items-center gap-2">
                        <Scissors className="h-4 w-4" /> Planification Chirurgicale
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                            <span className="text-[10px] font-bold uppercase opacity-50">Matériel</span>
                            <span className="text-xs font-bold">Ostéosynthèse</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                            <span className="text-[10px] font-bold uppercase opacity-50">Prothèse</span>
                            <span className="text-xs font-bold">Arthroplastie</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                            <span className="text-[10px] font-bold uppercase opacity-50">Orthèse</span>
                            <span className="text-xs font-bold">Contention / Plâtre</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
