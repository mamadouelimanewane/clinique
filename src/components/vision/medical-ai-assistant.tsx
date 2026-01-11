"use client"

import { useState } from "react"
import { Sparkles, MessageSquare, Send, BrainCircuit, Bot, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function MedicalAiAssistant() {
    const [query, setQuery] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const handleSearch = () => {
        if (!query) return
        setIsAnalyzing(true)
        setTimeout(() => setIsAnalyzing(false), 2000)
    }

    return (
        <Card className="border-none shadow-lg bg-gradient-to-br from-indigo-900 to-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <BrainCircuit className="h-24 w-24" />
            </div>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-md flex items-center gap-2">
                        SIGHI Copilot AI
                        <Badge className="bg-emerald-500 text-[8px] h-4">ONLINE</Badge>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-xs text-indigo-200">
                    Posez une question clinique, analysez un symptôme ou demandez une revue de littérature instantanée.
                </p>
                <div className="flex gap-2">
                    <Input
                        placeholder="Ex: Analyse des risques post-opératoires..."
                        className="bg-white/10 border-white/20 text-white text-xs placeholder:text-white/40 h-9"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button
                        size="icon"
                        className="bg-indigo-500 hover:bg-indigo-600 h-9 w-9 shrink-0"
                        onClick={handleSearch}
                    >
                        {isAnalyzing ? <Sparkles className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </div>

                {isAnalyzing && (
                    <div className="flex items-center gap-3 animate-pulse bg-white/5 p-3 rounded-lg border border-white/10">
                        <AlertCircle className="h-4 w-4 text-amber-400" />
                        <span className="text-[10px] font-medium italic">Consultation des bases PubMed et données cliniques internes...</span>
                    </div>
                )}

                {!isAnalyzing && query.length > 5 && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-start gap-2 text-[10px] leading-relaxed bg-indigo-500/20 p-3 rounded-lg border border-indigo-400/30">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                            <span>
                                **Analyse préliminaire** : Basé sur le profil patient #441 (Antécédents HTA), le risque embolique est modéré. Prescription de Rivaroxaban suggérée sous réserve de validation biologique (INR).
                            </span>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[8px] border-white/20 text-white/60 cursor-pointer hover:bg-white/10">Résumé Dossier</Badge>
                    <Badge variant="outline" className="text-[8px] border-white/20 text-white/60 cursor-pointer hover:bg-white/10">Revue Biblio</Badge>
                    <Badge variant="outline" className="text-[8px] border-white/20 text-white/60 cursor-pointer hover:bg-white/10">Dose Calculator</Badge>
                </div>
            </CardContent>
        </Card>
    )
}
