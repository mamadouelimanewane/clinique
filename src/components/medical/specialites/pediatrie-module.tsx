"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts'
import { Baby, TrendingUp, Info } from "lucide-react"

const MOCK_GROWTH_DATA = [
    { age: 0, weight: 3.2, p50: 3.3, p97: 4.2, p3: 2.4 },
    { age: 1, weight: 4.1, p50: 4.5, p97: 5.5, p3: 3.4 },
    { age: 2, weight: 5.2, p50: 5.6, p97: 6.8, p3: 4.3 },
    { age: 3, weight: 5.8, p50: 6.4, p97: 7.9, p3: 5.0 },
    { age: 4, weight: 6.9, p50: 7.0, p97: 8.6, p3: 5.6 },
    { age: 5, weight: 7.5, p50: 7.5, p97: 9.3, p3: 6.0 },
]

export function PediatrieModule() {
    const [weight, setWeight] = useState("7.5")
    const [age, setAge] = useState("5")

    return (
        <Card className="border-sky-200">
            <CardHeader className="bg-sky-50/50 flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sky-700">
                    <Baby className="h-5 w-5" /> Pédiatrie : Courbes de Croissance OMS
                </CardTitle>
                <Badge className="bg-sky-500">Digital Growth Tracker</Badge>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500">Saisie des mesures</h4>
                        <div className="space-y-2">
                            <Label>Age (Mois)</Label>
                            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Poids (kg)</Label>
                            <Input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Taille (cm)</Label>
                            <Input type="number" placeholder="Ex: 65" />
                        </div>

                        <div className="p-3 bg-sky-50 border border-sky-100 rounded-lg">
                            <p className="text-xs font-bold text-sky-800 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> Couloir de croissance
                            </p>
                            <p className="text-[10px] text-sky-600 mt-1">L'enfant se situe au 50ème percentile (Moyenne stable).</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2 h-[300px] w-full bg-white p-2 rounded-xl border border-slate-100">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={MOCK_GROWTH_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="age" label={{ value: 'Age (mois)', position: 'insideBottom', offset: -5 }} fontSize={10} />
                                <YAxis label={{ value: 'Poids (kg)', angle: -90, position: 'insideLeft' }} fontSize={10} />
                                <Tooltip />
                                <Line type="monotone" dataKey="p97" stroke="#fee2e2" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="p50" stroke="#bae6fd" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="p3" stroke="#fee2e2" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="weight" stroke="#0369a1" strokeWidth={3} dot={{ r: 4, fill: '#0369a1' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
