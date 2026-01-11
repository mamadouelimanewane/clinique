"use client"

import { useState } from "react"
import {
    Scissors,
    Smile,
    Calendar,
    Activity,
    Plus,
    Search,
    Activity as ToothIcon,
    ClipboardList,
    Image as ImageIcon,
    Receipt,
    Clock,
    AlertCircle,
    CheckCircle2,
    Settings,
    Shield,
    FileText,
    ArrowUpRight,
    TrendingUp
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
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
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export function DentaireDashboard() {
    const [selectedTooth, setSelectedTooth] = useState<number | null>(null)

    // --- Mock Data ---
    const stats = {
        patientsToday: 12,
        proceduresPerMonth: 85,
        urgentInterventions: 3,
        revenueDay: "450,000 FCFA"
    }

    const appointments = [
        { id: "A1", patient: "Abdou Rahmane", time: "09:00", procedure: "Détartrage", status: "Terminé" },
        { id: "A2", patient: "Fanta Diop", time: "10:30", procedure: "Extraction (Dent 18)", status: "En attente" },
        { id: "A3", patient: "Moussa Sarr", time: "14:00", procedure: "Pose de couronne", status: "Confirmé" },
    ]

    const treatments = [
        { tooth: 18, type: "Extraction", date: "10/01/2026", doctor: "Dr. Ndiaye", cost: "35,000 FCFA" },
        { tooth: 22, type: "Composite", date: "05/01/2026", doctor: "Dr. Ndiaye", cost: "15,000 FCFA" },
        { tooth: 46, type: "Endodontie", date: "22/12/2025", doctor: "Dr. Fall", cost: "80,000 FCFA" },
    ]

    // Odontogram teeth mapping (Simplified)
    const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
    const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Chirurgie Dentaire & Odontologie
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Gestion complète des soins, prothèses et suivi odontologique
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-blue-200 hover:bg-blue-50 text-blue-700">
                        <ImageIcon className="mr-2 h-4 w-4" /> Panoramique
                    </Button>
                    <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 dark:shadow-none transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Consultation
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                            <Smile className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider">Patients (Jour)</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.patientsToday}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Actes réalisés</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.proceduresPerMonth}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-red-50 dark:bg-red-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-100">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-red-600/70 uppercase tracking-wider">Urgences</p>
                            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100">{stats.urgentInterventions}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                            <Receipt className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Chiffre d'Affaires</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.revenueDay}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="odontogramme" className="space-y-4">
                <TabsList className="bg-slate-100 border p-1 rounded-xl">
                    <TabsTrigger value="odontogramme">Odontogramme</TabsTrigger>
                    <TabsTrigger value="planning">Agenda & RDV</TabsTrigger>
                    <TabsTrigger value="history">Historique Soins</TabsTrigger>
                    <TabsTrigger value="prosthesis">Prothèses</TabsTrigger>
                    <TabsTrigger value="billing">Facturation</TabsTrigger>
                </TabsList>

                {/* Odontogram Content */}
                <TabsContent value="odontogramme">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2 border-none shadow-md overflow-hidden bg-white dark:bg-slate-900">
                            <CardHeader className="border-b bg-slate-50/50">
                                <CardTitle className="text-lg">Odontogramme Numérique</CardTitle>
                                <CardDescription>Sélectionnez une dent pour voir l'historique ou ajouter un soin</CardDescription>
                            </CardHeader>
                            <CardContent className="p-10 flex flex-col items-center gap-10">
                                {/* Upper Jaw */}
                                <div className="flex gap-2 flex-wrap justify-center">
                                    {upperTeeth.map((t) => (
                                        <div
                                            key={t}
                                            onClick={() => setSelectedTooth(t)}
                                            className={cn(
                                                "w-12 h-16 rounded-t-2xl rounded-b-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-sm",
                                                selectedTooth === t ? "bg-blue-600 border-blue-400 text-white shadow-blue-200 scale-110" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-400"
                                            )}
                                        >
                                            <span className="text-[10px] font-bold opacity-50">{t}</span>
                                            <ToothIcon className="h-6 w-6 mt-1" />
                                            {t === 18 && <div className="mt-1 h-1 w-1 bg-red-500 rounded-full" />}
                                        </div>
                                    ))}
                                </div>

                                {/* Divider or Mouth line */}
                                <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />

                                {/* Lower Jaw */}
                                <div className="flex gap-2 flex-wrap justify-center">
                                    {lowerTeeth.map((t) => (
                                        <div
                                            key={t}
                                            onClick={() => setSelectedTooth(t)}
                                            className={cn(
                                                "w-12 h-16 rounded-b-2xl rounded-t-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-sm",
                                                selectedTooth === t ? "bg-blue-600 border-blue-400 text-white shadow-blue-200 scale-110" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-400"
                                            )}
                                        >
                                            <ToothIcon className="h-6 w-6 mb-1" />
                                            <span className="text-[10px] font-bold opacity-50">{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Side Panel: Tooth Details */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md overflow-hidden group">
                                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base">Détails Dent #{selectedTooth || "---"}</CardTitle>
                                        <Settings className="h-4 w-4 opacity-70 group-hover:rotate-45 transition-transform" />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    {!selectedTooth ? (
                                        <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
                                            <AlertCircle className="h-10 w-10 opacity-20" />
                                            <p className="text-sm font-medium">Sélectionnez une dent sur le schéma</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 animate-in slide-in-from-right-2">
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Dernier Soin</p>
                                                <p className="font-bold text-sm">Composite Oclusal</p>
                                                <p className="text-xs text-slate-500">Réalisé le 05/01/2026</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-slate-500 uppercase">Actions Rapides</Label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Button variant="outline" size="sm" className="text-[10px] h-8 border-slate-200">Composite</Button>
                                                    <Button variant="outline" size="sm" className="text-[10px] h-8 border-slate-200 text-red-600 hover:bg-red-50">Extraction</Button>
                                                    <Button variant="outline" size="sm" className="text-[10px] h-8 border-slate-200">Couronne</Button>
                                                    <Button variant="outline" size="sm" className="text-[10px] h-8 border-slate-200">Endo</Button>
                                                </div>
                                            </div>
                                            <Button className="w-full bg-blue-600">Prescrire Nouveau Soin</Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md overflow-hidden bg-slate-900 text-white p-6 relative">
                                <div className="absolute -top-4 -right-4 h-24 w-24 bg-blue-500 opacity-20 blur-2xl rounded-full" />
                                <h3 className="text-lg font-black mb-1">Rapport Panoramique</h3>
                                <p className="text-xs text-slate-400 mb-4">Mise à jour il y a 3 mois</p>
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10">
                                    <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <ImageIcon className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">XRAY-DENTAL-001.jpg</p>
                                        <p className="text-[10px] text-slate-500">Format DICOM / 4.2 MB</p>
                                    </div>
                                </div>
                                <Button variant="ghost" className="w-full mt-4 text-xs hover:bg-white/10">Ouvrir le visualiseur</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Agenda Content */}
                <TabsContent value="planning">
                    <Card className="border-none shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Agenda du Cabinet</CardTitle>
                                <CardDescription>Planning des consultations et interventions dentaires</CardDescription>
                            </div>
                            <Button className="bg-indigo-600">Nouveau RDV</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Heure</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Acte Prévu</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Arrive</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((a) => (
                                        <TableRow key={a.id} className="hover:bg-slate-50">
                                            <TableCell className="font-bold text-indigo-600">{a.time}</TableCell>
                                            <TableCell className="font-semibold">{a.patient}</TableCell>
                                            <TableCell>{a.procedure}</TableCell>
                                            <TableCell>
                                                <Badge variant={a.status === "Terminé" ? "secondary" : "default"} className={cn(
                                                    "text-[10px]",
                                                    a.status === "Confirmé" ? "bg-emerald-100 text-emerald-700 border-none" : ""
                                                )}>
                                                    {a.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="icon" variant="ghost"><CheckCircle2 className="h-4 w-4 text-emerald-500" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Prothèse Content */}
                <TabsContent value="prosthesis">
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Suivi des Prothèses & Labo Externe</CardTitle>
                            <CardDescription>Traçabilité des envois et réceptions de prothèses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="bg-slate-50 border-none p-4">
                                    <h4 className="font-bold text-sm mb-4">Commandes en cours</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-bold">Bridge #14-16</p>
                                                <p className="text-xs text-slate-500">Patient: Moussa Sarr</p>
                                            </div>
                                            <Badge className="bg-amber-100 text-amber-700">En fabrication</Badge>
                                        </div>
                                        <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-bold">Prothèse Partielle</p>
                                                <p className="text-xs text-slate-500">Patient: Fanta Diop</p>
                                            </div>
                                            <Badge className="bg-emerald-100 text-emerald-700">Prêt / Reçu</Badge>
                                        </div>
                                    </div>
                                </Card>
                                <div className="flex flex-col items-center justify-center p-10 bg-slate-100/50 rounded-xl border-2 border-dashed border-slate-200">
                                    <Plus className="h-10 w-10 text-slate-300 mb-2" />
                                    <p className="text-sm font-bold text-slate-500">Nouvelle fiche de laboratoire</p>
                                    <Button variant="link" className="text-xs">Consulter les tarifs labo</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* History Content */}
                <TabsContent value="history">
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Journal de Soins</CardTitle>
                            <CardDescription>Historique complet des actes dentaires réalisés</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Dent</TableHead>
                                        <TableHead>Acte</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Chirurgien</TableHead>
                                        <TableHead className="text-right">Montant</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {treatments.map((t, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-bold">#{t.tooth}</TableCell>
                                            <TableCell className="font-medium">{t.type}</TableCell>
                                            <TableCell className="text-xs text-slate-500">{t.date}</TableCell>
                                            <TableCell className="text-xs">{t.doctor}</TableCell>
                                            <TableCell className="text-right font-bold text-emerald-600">{t.cost}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
