"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Image as ImageIcon, Scan, AlertTriangle, CheckCircle2 } from "lucide-react"

export function DermatoModule() {
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)

    const simulateAnalysis = () => {
        setAnalyzing(true)
        setTimeout(() => {
            setResult({
                score: 0.12,
                type: "Naevus Bénin",
                confidence: 94,
                recommendation: "Suivi annuel standard recommandé."
            })
            setAnalyzing(false)
        }, 2000)
    }

    return (
        <Card className="border-orange-200">
            <CardHeader className="bg-orange-50/50">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Camera className="h-5 w-5" /> Dermato-Analyse IA
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-orange-200 rounded-xl p-8 flex flex-col items-center justify-center bg-orange-50/30">
                            <ImageIcon className="h-12 w-12 text-orange-200 mb-2" />
                            <p className="text-sm font-medium text-orange-800">Uploader une macro-photo</p>
                            <p className="text-[10px] text-orange-600/60 mt-1">Formats : JPG, PNG (Max 5MB)</p>
                            <Input type="file" className="hidden" id="dermato-upload" />
                            <Button variant="outline" size="sm" className="mt-4 border-orange-200 text-orange-700 bg-white" onClick={() => document.getElementById('dermato-upload')?.click()}>Choisir un fichier</Button>
                        </div>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={analyzing} onClick={simulateAnalysis}>
                            {analyzing ? (
                                <>
                                    <Scan className="h-4 w-4 mr-2 animate-spin" /> Analyse en cours...
                                </>
                            ) : (
                                <>
                                    <Scan className="h-4 w-4 mr-2" /> Lancer l'analyse des lésions (ABCDE)
                                </>
                            )}
                        </Button>
                    </div>

                    <div className={`rounded-xl p-6 border transition-all ${result ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400'}`}>
                        {result ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Résultat IA</h4>
                                    <Badge className="bg-emerald-500">{result.confidence}% Confiance</Badge>
                                </div>
                                <div className="flex items-center gap-4 py-2">
                                    <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black text-slate-900">{result.type}</p>
                                        <p className="text-xs text-slate-500 italic">Score mélanome : {result.score}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100 italic">
                                    "{result.recommendation}"
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                <p className="text-xs">Aucune image analysée pour le moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
