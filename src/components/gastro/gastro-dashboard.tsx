"use client"

import { useState } from "react"
import {
    Activity,
    Zap,
    Plus,
    Search,
    Clock,
    AlertCircle,
    ArrowUpRight,
    Settings,
    FileText,
    Microscope,
    History,
    MoreVertical,
    Coffee,
    Scissors,
    ShieldCheck,
    FlaskConical
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

export function GastroDashboard() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const stats = {
        endoscopiesToday: 6,
        consultations: 12,
        waitingBiopsy: 4,
        availableScope: 3
    }

    const interventions = [
        { id: "G-01", patient: "Moussa Ba", procedure: "Gastroscopie", doctor: "Dr. Diouf", status: "En cours", scope: "Video-G7" },
        { id: "G-02", patient: "Aïcha Diallo", procedure: "Coloscopie total", doctor: "Dr. Diouf", status: "Préparation", scope: "Video-C2" },
        { id: "G-03", patient: "Abdou Kane", procedure: "Écho-endoscopie", doctor: "Dr. Sarr", status: "Terminé", scope: "US-Scope" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-700">
                        Pôle Gastro-Entérologie & Hépatologie
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Endoscopie interventionnelle, maladies inflammatoires et suivi digestif
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-orange-200 hover:bg-orange-50 text-orange-700">
                        <History className="mr-2 h-4 w-4" /> Historique Endos
                    </Button>
                    <Button className="flex-1 md:flex-none bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-100 transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouvel Examen
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-orange-50 dark:bg-orange-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg">
                            <Scissors className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-orange-600/70 uppercase tracking-wider">Endoscopies (Jour)</p>
                            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.endoscopiesToday}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-amber-50 dark:bg-amber-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-lg">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider">Consultations</p>
                            <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">{stats.consultations}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Endoscopes OK</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.availableScope}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <FlaskConical className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Attente Biopsie</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.waitingBiopsy}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100 border p-1 rounded-xl">
                    <TabsTrigger value="overview">Vue Opérationnelle</TabsTrigger>
                    <TabsTrigger value="consultations">Consultations</TabsTrigger>
                    <TabsTrigger value="endoscopy">Endoscopie & Bloc</TabsTrigger>
                    <TabsTrigger value="biopsy">Résultats Biopsies</TabsTrigger>
                    <TabsTrigger value="logistics">Hygiène & Parc Endos</TabsTrigger>
                </TabsList>

                {/* Vue Opérationnelle */}
                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Programme Endoscopique du Jour</CardTitle>
                                        <Badge className="bg-orange-500 text-white">LIVE BLOCK</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Examen</TableHead>
                                                <TableHead>Matériel</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {interventions.map((i) => (
                                                <TableRow key={i.id} className="hover:bg-slate-50 transition-colors">
                                                    <TableCell className="font-bold">{i.patient}</TableCell>
                                                    <TableCell className="text-sm font-medium">{i.procedure}</TableCell>
                                                    <TableCell className="text-[10px] font-mono text-slate-500">{i.scope}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-xs uppercase",
                                                            i.status === "En cours" ? "border-orange-200 text-orange-600 bg-orange-50 animate-pulse" : "border-slate-200"
                                                        )}>{i.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="font-bold text-orange-600">Ouvrir</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-none shadow-sm p-6 bg-indigo-900 text-white">
                                    <h4 className="text-sm font-bold opacity-70 mb-4 flex items-center gap-2"><FlaskConical className="h-4 w-4" /> Labo Bio-Anath</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                                            <span>Mardi 08/01 - Biopsie Antrale</span>
                                            <span className="font-bold text-emerald-400">Prêt</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                                            <span>Jeudi 10/01 - Polypectomie</span>
                                            <span className="font-bold text-amber-400">Laboratoire</span>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs">Accéder aux comptes-rendus</Button>
                                </Card>
                                <Card className="border-none shadow-sm p-6 bg-slate-50 border border-slate-200">
                                    <h4 className="text-sm font-bold text-slate-700 mb-2">Hygiène & Désinfection</h4>
                                    <p className="text-xs text-slate-500 mb-4 italic">Traçabilité des cycles de lavage endoscopes.</p>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs ring-4 ring-emerald-50">OK</div>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-[10px] mb-1">
                                                <span>Cycle moyen</span>
                                                <span>28min / norme OK</span>
                                            </div>
                                            <Progress value={95} className="h-1" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md overflow-hidden bg-white p-6">
                                <h4 className="font-bold text-sm mb-4">File d'attente Consultations</h4>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((_, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                                            <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">#{idx + 1}</div>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold">Patient Patient {idx}</p>
                                                <p className="text-[10px] text-slate-400">Suivi MICI</p>
                                            </div>
                                            <ArrowUpRight className="h-3 w-3 text-slate-300" />
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full mt-4 text-xs h-8">Appeler le suivant</Button>
                            </Card>

                            <Card className="border-none shadow-sm p-4 bg-gradient-to-br from-orange-600 to-amber-600 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Coffee className="h-24 w-24" />
                                </div>
                                <h4 className="font-bold text-sm mb-1">Garde Digestive</h4>
                                <p className="text-xs opacity-80 mb-4">24h/24 • Urgences Hémorragiques</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">DS</div>
                                    <div>
                                        <p className="text-xs font-bold">Dr. Samba Diouf</p>
                                        <p className="text-[10px] opacity-70">Astreinte Block</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
