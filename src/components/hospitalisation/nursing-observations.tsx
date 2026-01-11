"use client"

import { useState } from "react"
import {
    Activity,
    AlertCircle,
    Clock,
    Plus,
    Stethoscope,
    UserCheck,
    CheckCircle2,
    XCircle,
    FileText
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export function NursingObservations() {
    const [observations, setObservations] = useState([
        {
            id: "O1",
            patient: "Amadou DIOP",
            type: "Température",
            valeur: "37.2°C",
            date: "10/01/2026 08:00",
            statut: "NORMAL"
        },
        {
            id: "O2",
            patient: "Fatou SALL",
            type: "TA",
            valeur: "160/95",
            date: "10/01/2026 09:30",
            statut: "CRITIQUE"
        },
        {
            id: "O3",
            patient: "Jean MENDY",
            type: "SpO2",
            valeur: "98%",
            date: "10/01/2026 07:15",
            statut: "NORMAL"
        }
    ])

    const addObservation = (obs: any) => {
        setObservations(prev => [...prev, { id: `O${prev.length + 1}`, ...obs }])
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Observations Infirmières</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Nouvelle Observation
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Enregistrer une observation</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Patient</Label>
                                <Input placeholder="Nom du patient" id="patient" />
                            </div>
                            <div className="space-y-2">
                                <Label>Type d'observation</Label>
                                <Input placeholder="Ex: Température, TA, SpO2" id="type" />
                            </div>
                            <div className="space-y-2">
                                <Label>Valeur</Label>
                                <Input placeholder="Ex: 37.2°C" id="valeur" />
                            </div>
                            <div className="space-y-2">
                                <Label>Date / Heure</Label>
                                <Input type="datetime-local" id="date" />
                            </div>
                            <div className="space-y-2">
                                <Label>Statut</Label>
                                <select className="w-full border rounded p-2" id="statut">
                                    <option value="NORMAL">NORMAL</option>
                                    <option value="CRITIQUE">CRITIQUE</option>
                                    <option value="ALERTE">ALERTE</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={() => {
                                    const patient = (document.getElementById('patient') as HTMLInputElement).value
                                    const type = (document.getElementById('type') as HTMLInputElement).value
                                    const valeur = (document.getElementById('valeur') as HTMLInputElement).value
                                    const date = (document.getElementById('date') as HTMLInputElement).value
                                    const statut = (document.getElementById('statut') as HTMLSelectElement).value
                                    addObservation({ patient, type, valeur, date, statut })
                                }}
                                className="bg-indigo-600"
                            >
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historique des observations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Valeur</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {observations.map((o) => (
                                <TableRow key={o.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                    <TableCell>{o.id}</TableCell>
                                    <TableCell>{o.patient}</TableCell>
                                    <TableCell>{o.type}</TableCell>
                                    <TableCell>{o.valeur}</TableCell>
                                    <TableCell>{o.date}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            o.statut === "CRITIQUE" ? "bg-red-50 text-red-700 border-red-200" :
                                                o.statut === "ALERTE" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                    "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        }>
                                            {o.statut}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" title="Détails">
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" title="Supprimer" className="ml-1">
                                            <XCircle className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
