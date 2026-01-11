"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic2, Wind, Headphones, Activity, Volume2 } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export function OrlModule() {
    const [data, setData] = useState([
        { freq: 250, od: 10, og: 15 },
        { freq: 500, od: 15, og: 20 },
        { freq: 1000, od: 20, og: 25 },
        { freq: 2000, od: 25, og: 30 },
        { freq: 4000, od: 45, og: 40 },
        { freq: 8000, od: 60, og: 55 },
    ])

    return (
        <Card className="border-cyan-200">
            <CardHeader className="bg-cyan-50/50">
                <CardTitle className="flex items-center gap-2 text-cyan-700">
                    <Headphones className="h-5 w-5" /> ORL Digital Advance
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500 flex items-center gap-2">
                            <Activity className="h-4 w-4" /> Audiogramme fréquentiel
                        </h4>
                        <div className="h-[300px] w-full bg-white border rounded-xl p-2 shadow-inner">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="freq" label={{ value: 'Fréq (Hz)', position: 'insideBottom', offset: -5 }} />
                                    <YAxis reversed label={{ value: 'Perte (dB)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="od" stroke="#ef4444" name="Oreille Droite" strokeWidth={3} dot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="og" stroke="#3b82f6" name="Oreille Gauche" strokeWidth={3} dot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-sm uppercase text-slate-500 mb-4 flex items-center gap-2">
                                <Volume2 className="h-4 w-4" /> Examen clinique ORL
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Otoscopie OD</Label>
                                    <select className="w-full p-2 border rounded-lg text-sm bg-white">
                                        <option>Normal</option>
                                        <option>Tympan congestif</option>
                                        <option>Bouchon de cérumen</option>
                                        <option>Perforation tympanique</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Otoscopie OG</Label>
                                    <select className="w-full p-2 border rounded-lg text-sm bg-white">
                                        <option>Normal</option>
                                        <option>Tympan congestif</option>
                                        <option>Bouchon de cérumen</option>
                                        <option>Perforation tympanique</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-dashed text-center">
                            <Badge variant="outline" className="text-cyan-600 border-cyan-200 bg-white mb-2">Interprétation IA</Badge>
                            <p className="text-xs text-slate-600 font-medium">
                                "Profil audiométrique suggérant une presbyacousie débutante avec chute sur les hautes fréquences (4000-8000 Hz)."
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
