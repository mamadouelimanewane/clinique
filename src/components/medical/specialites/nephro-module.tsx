"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Beaker, Calculator, Droplets } from "lucide-react"

export function NephroModule() {
    const [data, setData] = useState({
        creatinine: "",
        age: "45",
        poids: "70",
        sexe: "M",
        cockcroft: null as number | null
    })

    const calculerClairance = () => {
        if (!data.creatinine) return
        const creat = parseFloat(data.creatinine)
        const age = parseInt(data.age)
        const poids = parseInt(data.poids)

        // Formule de Cockcroft-Gault
        let k = data.sexe === "M" ? 1.23 : 1.04
        let result = ((140 - age) * poids * k) / creat
        setData({ ...data, cockcroft: Math.round(result) })
    }

    return (
        <Card className="border-indigo-200">
            <CardHeader className="bg-indigo-50/50">
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                    <Droplets className="h-5 w-5" /> Néphrologie & Urologie Advance
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500">Fonction Rénale</h4>
                        <div className="space-y-2">
                            <Label>Créatinine Sanguine (µmol/L)</Label>
                            <div className="flex gap-2">
                                <Input type="number" value={data.creatinine} onChange={(e) => setData({ ...data, creatinine: e.target.value })} onBlur={calculerClairance} />
                                <Button onClick={calculerClairance} variant="secondary" size="icon"><Calculator className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Poids (kg)</Label>
                                <Input type="number" value={data.poids} onChange={(e) => setData({ ...data, poids: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Âge</Label>
                                <Input type="number" value={data.age} onChange={(e) => setData({ ...data, age: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed p-6 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Clairance Créatinine (Cockcroft-Gault)</p>
                        {data.cockcroft ? (
                            <div className="space-y-2">
                                <div className={`text-4xl font-black ${data.cockcroft < 60 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                    {data.cockcroft} <span className="text-sm">ml/min</span>
                                </div>
                                <Badge variant={data.cockcroft < 60 ? "destructive" : "secondary"}>
                                    {data.cockcroft < 15 ? "I.R Terminale" :
                                        data.cockcroft < 30 ? "I.R Sévère" :
                                            data.cockcroft < 60 ? "I.R Modérée" : "Normale"}
                                </Badge>
                            </div>
                        ) : (
                            <div className="opacity-30 flex flex-col items-center">
                                <Beaker className="h-12 w-12 mb-2" />
                                <p className="text-xs italic">Saisissez la créatinine pour calculer le DFG</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
