"use client"

import { useState } from "react"
import {
    Activity,
    Plus,
    Search,
    Clock,
    AlertCircle,
    ArrowUpRight,
    Syringe,
    Accessibility,
    Wrench,
    Settings,
    FileText,
    Dna,
    Stethoscope,
    Shield,
    TrendingUp,
    Bone,
    Thermometer,
    HeartPulse
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
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export function OrthopedieDashboard() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const stats = {
        consultations: 25,
        fractures: 4,
        surgeriesToday: 3,
        physioSessions: 12
    }

    const patients = [
        { id: "ORTH-01", patient: "Alioune Wade", diagnosis: "Fracture Tibia", type: "Urgence", status: "Plâtré", device: "Plâtre résine" },
        { id: "ORTH-02", patient: "Sokhna Ndiaye", diagnosis: "Pose PTH G", type: "Programmé", status: "Post-Op J+2", device: "Prothèse Titane" },
        { id: "ORTH-03", patient: "Cheikh Tidiane", diagnosis: "Rupture LCA", type: "Sport", status: "Pre-Op", device: "Orthèse" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-blue-800">
                        Pôle Orthopédie & Traumatologie
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Chirurgie osseuse, traumatologie du sport et rééducation fonctionnelle
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-slate-200 hover:bg-slate-50 text-slate-700">
                        <Wrench className="mr-2 h-4 w-4" /> Stocks Prothèses
                    </Button>
                    <Button className="flex-1 md:flex-none bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-100 transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Admission
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-700 flex items-center justify-center text-white shadow-lg">
                            <Bone className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider">Fractures (Jour)</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.fractures}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-slate-100 dark:bg-slate-900">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white shadow-lg">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Chirurgies Bloc</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.surgeriesToday}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <Accessibility className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Rééducation</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.physioSessions}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <Stethoscope className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Patients (Jour)</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.consultations}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100 border p-1 rounded-xl">
                    <TabsTrigger value="overview">Flux Opérationnel</TabsTrigger>
                    <TabsTrigger value="trauma">Traumatologie</TabsTrigger>
                    <TabsTrigger value="surgeries">Chirurgie Réglée</TabsTrigger>
                    <TabsTrigger value="physio">Rééducation</TabsTrigger>
                    <TabsTrigger value="logistics">Stocks & Implants</TabsTrigger>
                </TabsList>

                {/* Flux Opérationnel */}
                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Patients en parcours Ortho</CardTitle>
                                        <Badge className="bg-blue-600 text-white">Actif</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Diagnostic / Traitement</TableHead>
                                                <TableHead>Statut Actuel</TableHead>
                                                <TableHead className="text-right">Suivi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {patients.map((p) => (
                                                <TableRow key={p.id} className="hover:bg-slate-50 transition-colors">
                                                    <TableCell className="font-bold">{p.patient}</TableCell>
                                                    <TableCell>
                                                        <div className="text-sm font-medium">{p.diagnosis}</div>
                                                        <div className="text-[10px] text-slate-400">{p.device}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-xs uppercase",
                                                            p.type === "Urgence" ? "border-red-200 text-red-600 bg-red-50" : "border-blue-200 text-blue-600 bg-blue-50"
                                                        )}>{p.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="font-bold text-blue-700">Dossier</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-none shadow-sm p-6 bg-slate-900 text-white relative overflow-hidden group">
                                    <h4 className="text-sm font-bold mb-4 uppercase text-blue-400 tracking-tighter">Inventaire Implants</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-xs">
                                            <span>Prothèses de Hanche (Standard)</span>
                                            <span className="font-bold text-emerald-400">8 en stock</span>
                                        </div>
                                        <Progress value={80} className="h-1 bg-white/10" />
                                        <div className="flex justify-between items-center text-xs">
                                            <span>Vis & Plaques de Compression</span>
                                            <span className="font-bold text-amber-400">Low (3 packs)</span>
                                        </div>
                                        <Progress value={30} className="h-1 bg-white/10" />
                                    </div>
                                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white border-none text-xs h-8">Commander du matériel</Button>
                                </Card>
                                <Card className="border-none shadow-sm p-6 bg-blue-50 border border-blue-100 flex flex-col justify-between">
                                    <h4 className="font-bold text-xs uppercase tracking-tighter text-blue-800 mb-2">Centre de Plâtre & Contentions</h4>
                                    <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Poste de soin #1 : Disponible. <br />Poste #2 : En cours (Patient Alioune Wade).</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700"><Wrench className="h-5 w-5" /></div>
                                        <div>
                                            <p className="text-[10px] font-bold">Resine haute résistance</p>
                                            <p className="text-[8px] text-slate-400 tracking-wider">STOCK ACTUALISÉ CE MATIN</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md overflow-hidden bg-white p-6">
                                <h4 className="font-bold text-sm mb-4">Urgences Traumato</h4>
                                <div className="space-y-4">
                                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                                        <p className="text-xs font-extrabold text-red-900">AVP (Accident Voie Publique)</p>
                                        <p className="text-[10px] text-red-700">Fracture ouverte soupçonnée</p>
                                        <div className="mt-2 flex justify-between items-center">
                                            <Badge className="bg-red-600 text-white text-[8px]">CRITIQUE</Badge>
                                            <span className="text-[10px] font-bold">Arrivée estimée: 12:15</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-none shadow-sm p-6 bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                                <h4 className="font-bold text-base mb-2">Bloc Ortho</h4>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10 mb-4">
                                    <p className="text-xs font-bold">Prochaine Intervention</p>
                                    <p className="text-[10px] opacity-70">Pose de Prothèse Totale de Genou (PTG)</p>
                                    <p className="text-lg font-black mt-1">15:00</p>
                                </div>
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs h-9">Détails de l'Intervention</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
