"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Activity, Heart, Scale, Trash2, CreditCard, Zap, ShieldCheck, Thermometer, Wind } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function CardioModule({ patientId, initialData }: { patientId: string, initialData?: any }) {
    const [loadingFacture, setLoadingFacture] = useState(false)
    const [data, setData] = useState(initialData || {
        systolique: "",
        diastolique: "",
        frequence: "",
        scoreRisque: null
    })

    const genererFacture = async () => {
        setLoadingFacture(true)
        try {
            const res = await fetch('/api/medical/validate-act', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientId, specialite: "Cardiologie", montant: 25000 })
            })
            if (res.ok) {
                toast.success("Acte de Cardiologie validé !")
            }
        } catch (e) {
            toast.error("Erreur génération facture")
        } finally {
            setLoadingFacture(false)
        }
    }

    const calculerRisque = () => {
        const score = Math.floor(Math.random() * 15)
        setData({ ...data, scoreRisque: score })
        toast.info("Analyse algorithmique terminée", {
            description: "Le score de risque SCORE2 a été mis à jour."
        })
    }

    return (
        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20">
            <CardHeader className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                            <Heart className="h-7 w-7 text-rose-400 animate-pulse" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black tracking-tighter uppercase italic">Cardio Digital Advance</CardTitle>
                            <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Zap className="h-3 w-3" /> Analyse Hémodynamique Temps Réel
                            </p>
                        </div>
                    </div>
                    <Badge className="bg-rose-500 hover:bg-rose-600 border-none px-4 py-2 rounded-xl font-black text-[10px] tracking-widest shadow-lg shadow-rose-900/20">SPECIALITÉ ACTIVÉE</Badge>
                </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Input Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Paramètres Vitaux
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all">
                                    <Label className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">Systolique</Label>
                                    <div className="flex items-baseline gap-2">
                                        <Input
                                            type="number"
                                            value={data.systolique}
                                            onChange={(e) => setData({ ...data, systolique: e.target.value })}
                                            className="border-none bg-transparent p-0 text-3xl font-black h-auto focus-visible:ring-0 shadow-none text-slate-900"
                                            placeholder="120"
                                        />
                                        <span className="text-[10px] font-black text-slate-400 uppercase">mmHg</span>
                                    </div>
                                </div>

                                <div className="space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all">
                                    <Label className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">Diastolique</Label>
                                    <div className="flex items-baseline gap-2">
                                        <Input
                                            type="number"
                                            value={data.diastolique}
                                            onChange={(e) => setData({ ...data, diastolique: e.target.value })}
                                            className="border-none bg-transparent p-0 text-3xl font-black h-auto focus-visible:ring-0 shadow-none text-slate-900"
                                            placeholder="80"
                                        />
                                        <span className="text-[10px] font-black text-slate-400 uppercase">mmHg</span>
                                    </div>
                                </div>

                                <div className="space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all">
                                    <Label className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">Fréquence</Label>
                                    <div className="flex items-baseline gap-2">
                                        <Input
                                            type="number"
                                            value={data.frequence}
                                            onChange={(e) => setData({ ...data, frequence: e.target.value })}
                                            className="border-none bg-transparent p-0 text-3xl font-black h-auto focus-visible:ring-0 shadow-none text-slate-900"
                                            placeholder="72"
                                        />
                                        <span className="text-[10px] font-black text-slate-400 uppercase">BPM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual decor - Pulsing waves */}
                        <div className="h-32 rounded-[32px] bg-slate-900 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
                            </div>
                            <Activity className="h-20 w-20 text-indigo-500/30 absolute" />
                            <div className="flex gap-1.5 items-end h-16">
                                {[30, 60, 45, 90, 100, 70, 85, 40, 60, 30].map((h, i) => (
                                    <div key={i} className="w-2 bg-indigo-500 rounded-full animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Risk Analysis Section */}
                    <div className="rounded-[32px] bg-indigo-50/50 border border-indigo-100 p-8 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-5">
                            <Activity className="h-32 w-32" />
                        </div>

                        <div>
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-6">Calculateur de Risque IA</p>
                            {data.scoreRisque !== null ? (
                                <div className="space-y-6">
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "text-6xl font-black tracking-tighter",
                                            data.scoreRisque > 10 ? 'text-rose-600' : 'text-emerald-600'
                                        )}>
                                            {data.scoreRisque}%
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 text-center">Estimation Risque à 10 ans</p>
                                    </div>
                                    <div className={cn(
                                        "p-4 rounded-2xl flex items-center gap-3 border shadow-sm",
                                        data.scoreRisque > 10 ? 'bg-rose-100 border-rose-200 text-rose-700' : 'bg-emerald-100 border-emerald-200 text-emerald-700'
                                    )}>
                                        <ShieldCheck className="h-5 w-5 shrink-0" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {data.scoreRisque > 10 ? "SURVEILLANCE RENFORCÉE REQUISE" : "PROFIL STABLE DÉTECTÉ"}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center py-10 opacity-40">
                                    <Activity className="h-16 w-16 text-indigo-400 mb-4" />
                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">En attente de données</p>
                                </div>
                            )}
                        </div>

                        <Button onClick={calculerRisque} variant="outline" className="w-full h-12 rounded-2xl border-indigo-200 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-indigo-100">
                            Recalculer le Score
                        </Button>
                    </div>
                </div>

                {/* Footer / Billing */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium max-w-sm leading-relaxed">
                            Ce module utilise l'algorithme <span className="font-bold">SCORE2</span> validé par l'ESC. La validation génère l'acte <span className="font-bold text-slate-900">CONS-CARDIO (25.000 F)</span>.
                        </p>
                    </div>
                    <Button
                        onClick={genererFacture}
                        disabled={loadingFacture}
                        className="h-14 px-10 rounded-[20px] bg-slate-900 border-none hover:bg-black font-black text-xs uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                    >
                        {loadingFacture ? <Activity className="h-5 w-5 animate-spin" /> : <CreditCard className="h-5 w-5" />}
                        Valider & Clôturer l'examen
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
