"use client"

import { useState } from "react"
import {
    Activity,
    Plus,
    Search,
    Clock,
    AlertCircle,
    ArrowUpRight,
    Mic,
    Volume2,
    Ear,
    Wind,
    Settings,
    FileText,
    LineChart,
    Calendar,
    Stethoscope,
    Shield
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

export function ORLDashboard() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const stats = {
        consultations: 18,
        audiograms: 5,
        fibroscopies: 7,
        surgeriesPlanned: 2
    }

    const patients = [
        { id: "O-01", patient: "Abdoulaye Wade", procedure: "Nasofibroscopie", reason: "Dysphonie", status: "Salle d'attente" },
        { id: "O-02", patient: "Fanta Diop", procedure: "Audiométrie", reason: "Baisse Auditive", status: "En cours" },
        { id: "O-03", patient: "Mamadou Fall", procedure: "Consultation ORL", reason: "Otite Chronique", status: "Terminé" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
                        Pôle O.R.L & Chirurgie Cervico-Faciale
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Oto-Rhino-Laryngologie, Audiologie et soins de la tête et du cou
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-purple-200 hover:bg-purple-50 text-purple-700">
                        <LineChart className="mr-2 h-4 w-4" /> Audiogramme
                    </Button>
                    <Button className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-100 transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Consultation
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-purple-50 dark:bg-purple-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg">
                            <Ear className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-purple-600/70 uppercase tracking-wider">Audiogrammes (Jour)</p>
                            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.audiograms}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Fibroscopies</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.fibroscopies}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                            <Stethoscope className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider">Patients (Jour)</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.consultations}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Chirurgies Prévues</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.surgeriesPlanned}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100 border p-1 rounded-xl">
                    <TabsTrigger value="overview">Planning Clinique</TabsTrigger>
                    <TabsTrigger value="audiology">Audiologie & Tests</TabsTrigger>
                    <TabsTrigger value="endoscopy">Fibroscopie & Larynx</TabsTrigger>
                    <TabsTrigger value="surgery">Chirurgie CCF</TabsTrigger>
                    <TabsTrigger value="logistics">Equipements ORL</TabsTrigger>
                </TabsList>

                {/* Planning Clinique */}
                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Liste des Soins ORL Aujourd'hui</CardTitle>
                                        <Badge className="bg-purple-500 text-white">Actif</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Examen / Motif</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {patients.map((p) => (
                                                <TableRow key={p.id} className="hover:bg-slate-50 transition-colors">
                                                    <TableCell className="font-bold">{p.patient}</TableCell>
                                                    <TableCell>
                                                        <div className="text-sm font-medium">{p.procedure}</div>
                                                        <div className="text-[10px] text-slate-400">{p.reason}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-xs",
                                                            p.status === "En cours" ? "border-purple-200 text-purple-600 bg-purple-50" : "border-slate-200"
                                                        )}>{p.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="font-bold text-purple-600">Détails</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-none shadow-sm p-6 bg-slate-900 text-white overflow-hidden relative group">
                                    <Volume2 className="absolute -top-4 -right-4 h-24 w-24 opacity-10 group-hover:scale-125 transition-transform" />
                                    <h4 className="text-sm font-bold mb-4 uppercase tracking-tighter text-purple-400">Station d'Audiométrie</h4>
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-center text-xs">
                                            <span>Cabine Insonorisée</span>
                                            <Badge className="bg-emerald-500 border-none h-4 text-[8px]">LIBRE</Badge>
                                        </div>
                                        <Progress value={20} className="h-1 bg-white/10" />
                                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 text-xs h-8">Lancer un nouvel Audiogramme</Button>
                                    </div>
                                </Card>
                                <Card className="border-none shadow-sm p-6 bg-purple-50 border border-purple-100 flex flex-col justify-between">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Wind className="h-5 w-5 text-purple-600" />
                                        <h4 className="font-bold text-xs uppercase tracking-tighter text-slate-700">Exploration Fonctionnelle</h4>
                                    </div>
                                    <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Mise à jour logiciel nasofibroscope G-series effectuée le 05/01. Tous les filtres sont opérationnels.</p>
                                    <Button variant="outline" className="w-full text-xs h-7 border-purple-200">Rapport Technique</Button>
                                </Card>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md overflow-hidden bg-white p-6">
                                <h4 className="font-bold text-sm mb-4">Consultations Prioritaires</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                        <div>
                                            <p className="text-xs font-bold text-red-900">Urgence : Corps Étranger</p>
                                            <p className="text-[10px] text-red-700">Adulte • Obstruction Nasale</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <Clock className="h-5 w-5 text-slate-400" />
                                        <div>
                                            <p className="text-xs font-bold">11:30 - Suivi Post-Op</p>
                                            <p className="text-[10px] text-slate-500">Amygdalectomie (J+7)</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-none shadow-sm p-6 bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
                                <h4 className="font-bold text-base mb-2">Bloc ORL</h4>
                                <div className="p-3 bg-white/10 rounded-lg border border-white/20 mb-4">
                                    <p className="text-xs font-bold">Prochaine Intervention</p>
                                    <p className="text-[10px] opacity-70">Septoplastie + Turbinoplastie</p>
                                    <p className="text-sm font-black mt-2">14:30</p>
                                </div>
                                <Button className="w-full bg-white text-purple-900 hover:bg-slate-100 font-bold text-xs h-9">Consulter le Planning Bloc</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
