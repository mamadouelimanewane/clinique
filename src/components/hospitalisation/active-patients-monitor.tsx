"use client"

import { useState } from "react"
import {
    Activity,
    Heart,
    Thermometer,
    Droplets,
    Wind,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Minus,
    Clock,
    User,
    Pill,
    Stethoscope,
    FileText,
    Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

export function ActivePatientsMonitor() {
    const patients = [
        {
            id: "1",
            nom: "Amadou DIOP",
            chambre: "M101",
            age: 65,
            pathologie: "Pneumonie",
            admission: "08/01/2026",
            joursHospitalisation: 3,
            etat: "STABLE",
            constantes: {
                temp: 37.2,
                ta: "130/80",
                fc: 78,
                spo2: 96,
                tendance: "stable"
            },
            traitements: ["Amoxicilline 1g x3/j", "Paracétamol 1g si fièvre"],
            derniereObs: "10/01/2026 08:00"
        },
        {
            id: "2",
            nom: "Fatou SALL",
            chambre: "M103",
            age: 52,
            pathologie: "Diabète décompensé",
            admission: "09/01/2026",
            joursHospitalisation: 2,
            etat: "CRITIQUE",
            constantes: {
                temp: 38.5,
                ta: "160/95",
                fc: 105,
                spo2: 92,
                tendance: "deterioration"
            },
            traitements: ["Insuline rapide", "Metformine 850mg x2/j"],
            derniereObs: "10/01/2026 09:30"
        },
        {
            id: "3",
            nom: "Jean MENDY",
            chambre: "M104",
            age: 45,
            pathologie: "AVC ischémique",
            admission: "07/01/2026",
            joursHospitalisation: 4,
            etat: "SURVEILLANCE",
            constantes: {
                temp: 36.8,
                ta: "140/85",
                fc: 82,
                spo2: 98,
                tendance: "amelioration"
            },
            traitements: ["Aspirine 100mg", "Atorvastatine 40mg"],
            derniereObs: "10/01/2026 07:15"
        },
    ]

    const getTendanceIcon = (tendance: string) => {
        switch (tendance) {
            case "amelioration": return <TrendingUp className="h-4 w-4 text-emerald-500" />
            case "deterioration": return <TrendingDown className="h-4 w-4 text-red-500" />
            default: return <Minus className="h-4 w-4 text-blue-500" />
        }
    }

    const getEtatBadge = (etat: string) => {
        switch (etat) {
            case "CRITIQUE":
                return <Badge className="bg-red-500 animate-pulse">CRITIQUE</Badge>
            case "SURVEILLANCE":
                return <Badge className="bg-amber-500">SURVEILLANCE</Badge>
            default:
                return <Badge className="bg-blue-500">STABLE</Badge>
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Patients Hospitalisés - Monitoring Actif</h3>
                <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> Exporter Liste
                </Button>
            </div>

            <div className="grid gap-4">
                {patients.map((patient) => (
                    <Card key={patient.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Patient Info */}
                                <div className="lg:col-span-3 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <User className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">{patient.nom}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {patient.age} ans • Chambre {patient.chambre}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Stethoscope className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-muted-foreground">{patient.pathologie}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                J+{patient.joursHospitalisation} ({patient.admission})
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getEtatBadge(patient.etat)}
                                        {getTendanceIcon(patient.constantes.tendance)}
                                    </div>
                                </div>

                                {/* Constantes Vitales */}
                                <div className="lg:col-span-5">
                                    <Label className="text-xs text-muted-foreground mb-3 block">Constantes Vitales</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                            <Thermometer className="h-5 w-5 text-red-500" />
                                            <div>
                                                <div className="text-xs text-muted-foreground">Température</div>
                                                <div className="font-bold">{patient.constantes.temp}°C</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                            <Activity className="h-5 w-5 text-blue-500" />
                                            <div>
                                                <div className="text-xs text-muted-foreground">TA</div>
                                                <div className="font-bold">{patient.constantes.ta}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                            <Heart className="h-5 w-5 text-pink-500" />
                                            <div>
                                                <div className="text-xs text-muted-foreground">FC</div>
                                                <div className="font-bold">{patient.constantes.fc} bpm</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                            <Wind className="h-5 w-5 text-emerald-500" />
                                            <div>
                                                <div className="text-xs text-muted-foreground">SpO2</div>
                                                <div className="font-bold">{patient.constantes.spo2}%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Traitements & Actions */}
                                <div className="lg:col-span-4 space-y-3">
                                    <div>
                                        <Label className="text-xs text-muted-foreground mb-2 block">Traitements en cours</Label>
                                        <div className="space-y-1">
                                            {patient.traitements.map((t, i) => (
                                                <div key={i} className="flex items-start gap-2 text-xs">
                                                    <Pill className="h-3 w-3 text-emerald-500 mt-0.5" />
                                                    <span>{t}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Dernière observation: {patient.derniereObs}
                                    </div>
                                    <div className="flex gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="outline" className="flex-1">
                                                    <Plus className="h-3 w-3 mr-1" /> Observation
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Nouvelle Observation - {patient.nom}</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Température (°C)</Label>
                                                            <Input type="number" step="0.1" defaultValue={patient.constantes.temp} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>TA (mmHg)</Label>
                                                            <Input defaultValue={patient.constantes.ta} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>FC (bpm)</Label>
                                                            <Input type="number" defaultValue={patient.constantes.fc} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>SpO2 (%)</Label>
                                                            <Input type="number" defaultValue={patient.constantes.spo2} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Notes Infirmières</Label>
                                                        <Textarea placeholder="Observations cliniques..." className="min-h-[100px]" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button className="bg-indigo-600">Enregistrer</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                                            Dossier
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
