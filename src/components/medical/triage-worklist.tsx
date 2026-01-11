"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Thermometer, Activity, UserPlus, ArrowRight, Clock, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function TriageWorklist() {
    const [patients] = useState([
        { id: '1', name: 'Awa Fall', urgence: 'MOYENNE', constantes: { temp: 38.5, ta: '12/8', sat: 98 }, attente: '15 min' },
        { id: '2', name: 'Moussa Diop', urgence: 'ELEVEE', constantes: { temp: 37.2, ta: '18/11', sat: 95 }, attente: '5 min' },
        { id: '3', name: 'Fatou Gueye', urgence: 'STABLE', constantes: { temp: 36.6, ta: '11/7', sat: 99 }, attente: '40 min' },
    ])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">File d'attente : Médecine Générale</h2>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <Clock className="h-4 w-4" /> Temps d'attente moyen : 20 minutes
                    </p>
                </div>
                <div className="relative w-72">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Rechercher patient..." className="pl-9" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {patients.map((p) => (
                    <Card key={p.id} className={`border-l-4 ${p.urgence === 'ELEVEE' ? 'border-l-red-500 shadow-md' : 'border-l-slate-200'}`}>
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant={p.urgence === 'ELEVEE' ? 'destructive' : p.urgence === 'MOYENNE' ? 'default' : 'secondary'} className="text-[10px]">
                                    {p.urgence}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground">{p.attente}</span>
                            </div>
                            <CardTitle className="text-md mt-2">{p.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="grid grid-cols-3 gap-1 mt-2 mb-4">
                                <div className="flex flex-col items-center p-1 bg-slate-50 rounded">
                                    <Thermometer className="h-3 w-3 text-orange-500" />
                                    <span className="text-[10px] font-bold">{p.constantes.temp}°</span>
                                </div>
                                <div className="flex flex-col items-center p-1 bg-slate-50 rounded">
                                    <Activity className="h-3 w-3 text-indigo-500" />
                                    <span className="text-[10px] font-bold">{p.constantes.ta}</span>
                                </div>
                                <div className="flex flex-col items-center p-1 bg-slate-50 rounded">
                                    <Activity className="h-3 w-3 text-emerald-500" />
                                    <span className="text-[10px] font-bold">{p.constantes.sat}%</span>
                                </div>
                            </div>
                            <Button size="sm" className="w-full bg-slate-900 hover:bg-slate-800">
                                Saisir Consultation <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
