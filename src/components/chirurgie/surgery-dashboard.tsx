"use client"

import { useState } from "react"
import { Calendar, Clock, Plus, Bed, TrendingUp, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function SurgeryDashboard() {
    const [selectedRoom, setSelectedRoom] = useState<string>("all")
    const [detailOpen, setDetailOpen] = useState(false)
    const [selectedIntervention, setSelectedIntervention] = useState<any>(null)

    const stats = {
        totalRooms: 5,
        occupied: 3,
        available: 2,
        interventionsToday: 4,
        ongoing: 1,
        scheduled: 3,
        occupancyRate: 60,
    }

    const rooms = [
        { id: "1", name: "Salle 1", status: "EN_COURS", current: "Appendicectomie" },
        { id: "2", name: "Salle 2", status: "PROGRAMMEE", current: "Hernie Inguinale" },
        { id: "3", name: "Salle 3", status: "DISPONIBLE" },
        { id: "4", name: "Salle 4", status: "DISPONIBLE" },
        { id: "5", name: "Salle 5", status: "EN_COURS", current: "Césarienne" },
    ]

    const interventions = [
        { time: "08:30", type: "Appendicectomie", patient: "Awa Ndiaye", surgeon: "Dr. Sarr", room: "Salle 1", status: "EN_COURS" },
        { time: "10:15", type: "Hernie Inguinale", patient: "Ibrahima Fall", surgeon: "Dr. Kane", room: "Salle 2", status: "PROGRAMMEE" },
        { time: "11:00", type: "Césarienne", patient: "Fatou Sow", surgeon: "Dr. Diop", room: "Salle 1", status: "PROGRAMMEE" },
        { time: "14:30", type: "Cholécystectomie", patient: "Moussa Ba", surgeon: "Dr. Ndiaye", room: "Salle 3", status: "PROGRAMMEE" },
    ]

    const openDetails = (intervention: any) => {
        setSelectedIntervention(intervention)
        setDetailOpen(true)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Bloc Opératoire</h1>
                    <p className="text-muted-foreground">Planning des interventions et occupation des salles</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none">
                        <Clock className="mr-2 h-4 w-4" /> Rapport du jour
                    </Button>
                    <Button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 shadow-lg">
                        <Plus className="mr-2 h-4 w-4" /> Programmer Intervention
                    </Button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="col-span-2 border-none shadow-sm hover:shadow-md bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Salles Totales</CardTitle>
                        <Bed className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalRooms}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-emerald-500 font-bold">{stats.available}</span> disponibles
                        </p>
                    </CardContent>
                </Card>
                <Card className="col-span-2 border-none shadow-sm hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Taux d'Occupation</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.occupancyRate}%</div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: `${stats.occupancyRate}%` }} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-2 border-none shadow-sm hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Interventions Aujourd'hui</CardTitle>
                        <Calendar className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600">{stats.interventionsToday}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.ongoing} en cours, {stats.scheduled} programmées
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Rooms Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map(room => (
                    <Card key={room.id} className="border-2 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedRoom(room.id)}>
                        <CardHeader className="flex items-center justify-between pb-2">
                            <div className="flex items-center gap-2">
                                <Bed className="h-5 w-5 text-indigo-600" />
                                <CardTitle className="text-sm font-medium">{room.name}</CardTitle>
                            </div>
                            <Badge variant={room.status === "EN_COURS" ? "destructive" : room.status === "PROGRAMMEE" ? "secondary" : "outline"}>
                                {room.status.replace('_', ' ')}
                            </Badge>
                        </CardHeader>
                        {room.current && (
                            <CardContent>
                                <p className="text-sm font-medium">{room.current}</p>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>

            {/* Interventions du Jour */}
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle>Interventions du Jour</CardTitle>
                    <CardDescription>Heure – Intervention – Patient – Chirurgien – Salle – Statut</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Heure</TableHead>
                                <TableHead>Intervention</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Chirurgien</TableHead>
                                <TableHead>Salle</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {interventions.map((i, idx) => (
                                <TableRow key={idx} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                    <TableCell>{i.time}</TableCell>
                                    <TableCell>{i.type}</TableCell>
                                    <TableCell>{i.patient}</TableCell>
                                    <TableCell>{i.surgeon}</TableCell>
                                    <TableCell>{i.room}</TableCell>
                                    <TableCell>
                                        <Badge variant={i.status === "EN_COURS" ? "destructive" : i.status === "PROGRAMMEE" ? "secondary" : "outline"}>
                                            {i.status.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" title="Détails" onClick={() => openDetails(i)}>
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Detail Dialog */}
            <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Détails de l'Intervention</DialogTitle>
                    </DialogHeader>
                    {selectedIntervention && (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-2">
                                <Label className="text-sm font-medium">Heure</Label>
                                <div>{selectedIntervention.time}</div>
                                <Label className="text-sm font-medium">Intervention</Label>
                                <div>{selectedIntervention.type}</div>
                                <Label className="text-sm font-medium">Patient</Label>
                                <div>{selectedIntervention.patient}</div>
                                <Label className="text-sm font-medium">Chirurgien</Label>
                                <div>{selectedIntervention.surgeon}</div>
                                <Label className="text-sm font-medium">Salle</Label>
                                <div>{selectedIntervention.room}</div>
                                <Label className="text-sm font-medium">Statut</Label>
                                <Badge variant={selectedIntervention.status === "EN_COURS" ? "destructive" : selectedIntervention.status === "PROGRAMMEE" ? "secondary" : "outline"}>
                                    {selectedIntervention.status.replace('_', ' ')}
                                </Badge>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDetailOpen(false)}>Fermer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
