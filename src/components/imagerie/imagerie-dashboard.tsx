"use client"

import { useState } from "react"
import {
    ImageIcon,
    Monitor,
    FileText,
    Zap,
    Search,
    Clock,
    AlertCircle,
    Plus,
    ArrowUpRight,
    Activity,
    Shield,
    HardDrive,
    Layers,
    Expand,
    Filter,
    Camera,
    Printer
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
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export function ImagerieDashboard() {
    const [activeTab, setActiveTab] = useState("worklist")

    // --- Mock Data ---
    const stats = {
        scansToday: 18,
        pendingReports: 6,
        pacsStorage: "72%",
        modalitiesOnline: 4
    }

    const worklist = [
        { id: "RAD-001", patient: "Abdou Diouf", modality: "Scanner (TDM)", reason: "Douleur Abdo", priority: "Urgent", status: "En attente" },
        { id: "RAD-002", patient: "Fanta Kane", modality: "Échographie", reason: "Obstétricale", priority: "Normal", status: "Réalisé" },
        { id: "RAD-003", patient: "Moussa Sow", modality: "Radiologie Standard", reason: "Trauma épaule", priority: "Urgent", status: "En cours" },
    ]

    const reports = [
        { id: "REP-99", patient: "Alioune Ba", modality: "IRM Cérébrale", date: "09/01", status: "Prêt pour signature", doctor: "Dr. Fall" },
        { id: "REP-98", patient: "Khadija Sy", modality: "Scanner Thorax", date: "09/01", status: "Brouillon", doctor: "Dr. Ndiaye" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">
                        Pôle Imagerie Médicale & Radiologie
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Centre de diagnostic avancé : Scanner, IRM, Échographie et Radiographie
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none">
                        <Monitor className="mr-2 h-4 w-4" /> Console PACS
                    </Button>
                    <Button className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Demande
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-slate-100 dark:bg-slate-900">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                            <Camera className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Examens (Jour)</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.scansToday}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider">Comptes-Rendus</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.pendingReports}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">IA Diagnostic</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">ON</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <HardDrive className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Stockage PACS</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.pacsStorage}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="worklist" className="space-y-4" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between overflow-x-auto pb-1">
                    <TabsList className="bg-slate-100 border p-1 rounded-xl">
                        <TabsTrigger value="worklist">Worklist Modalités</TabsTrigger>
                        <TabsTrigger value="reporting">Comptes-Rendus</TabsTrigger>
                        <TabsTrigger value="viewer">Visualiseur DICOM</TabsTrigger>
                        <TabsTrigger value="archive">Archives & PACS</TabsTrigger>
                        <TabsTrigger value="ai">Intelligence Artificielle</TabsTrigger>
                    </TabsList>
                </div>

                {/* Worklist Modalities */}
                <TabsContent value="worklist" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <Card className="border-none shadow-md">
                                <CardHeader className="bg-slate-50/50 border-b pb-4">
                                    <h3 className="font-bold text-lg">Planning des Modalités</h3>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Modalité</TableHead>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Motif / Priority</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {worklist.map((w) => (
                                                <TableRow key={w.id} className="hover:bg-slate-50 transition-colors">
                                                    <TableCell className="font-bold text-slate-700">{w.modality}</TableCell>
                                                    <TableCell className="font-semibold">{w.patient}</TableCell>
                                                    <TableCell>
                                                        <div className="text-xs">{w.reason}</div>
                                                        <Badge variant="outline" className={cn(
                                                            "text-[8px] h-4 uppercase",
                                                            w.priority === "Urgent" ? "border-red-200 text-red-600 bg-red-50" : ""
                                                        )}>{w.priority}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="text-[10px]">{w.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="font-bold text-blue-600">Démarrer</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Panel: AI & PACS */}
                        <div className="space-y-6">
                            <Card className="border-none bg-indigo-900 text-white p-6 shadow-xl relative overflow-hidden group">
                                <Shield className="absolute -bottom-4 -right-4 h-24 w-24 opacity-10 group-hover:scale-125 transition-transform" />
                                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-amber-400 fill-amber-400" /> IA Diagnostic Assist
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                                        <p className="text-xs font-bold mb-1">Dernière Détection</p>
                                        <p className="text-sm">Nodule suspect (L-Inf Droit)</p>
                                        <p className="text-[10px] text-indigo-300">Confiance: 94.2% • Patient: Alioune Ba</p>
                                    </div>
                                    <Button className="w-full bg-white text-indigo-900 hover:bg-slate-100 font-bold text-xs h-9">
                                        Ouvrir l'Analyse IA
                                    </Button>
                                </div>
                            </Card>

                            <Card className="border-none shadow-sm p-4 text-center space-y-2">
                                <HardDrive className="h-8 w-8 text-slate-300 mx-auto" />
                                <h4 className="font-bold text-xs uppercase tracking-widest">Capacité PACS</h4>
                                <Progress value={72} className="h-2 bg-slate-100" />
                                <p className="text-[10px] text-slate-400">12.5 TB / 20 TB utilisés</p>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Viewer Placeholder */}
                <TabsContent value="viewer">
                    <Card className="border-none shadow-2xl bg-black aspect-video flex flex-col items-center justify-center relative overflow-hidden rounded-xl">
                        <div className="absolute top-4 left-4 flex gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8 bg-black/50 border-white/20 text-white hover:bg-white/10"><Layers className="h-4 w-4" /></Button>
                            <Button size="icon" variant="outline" className="h-8 w-8 bg-black/50 border-white/20 text-white hover:bg-white/10"><Expand className="h-4 w-4" /></Button>
                        </div>
                        <Activity className="h-20 w-20 text-slate-800 animate-pulse" />
                        <p className="text-slate-600 mt-4 font-mono text-sm tracking-widest uppercase">Visualiseur DICOM • 4K Engine Ready</p>

                        <div className="absolute bottom-6 flex gap-4">
                            <Badge className="bg-white/10 text-white/50 border-white/10 uppercase text-[8px] tracking-[4px]">Patient: ABDOU DIOUF - SCANNER ABDO - 2026-01-10</Badge>
                        </div>
                    </Card>
                </TabsContent>

                {/* Reporting Content */}
                <TabsContent value="reporting">
                    <Card className="border-none shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Dictée & Rédaction de Comptes-Rendus</CardTitle>
                                <CardDescription>Génération automatique par templates spécialisés</CardDescription>
                            </div>
                            <Button className="bg-slate-900">Signer & Envoyer</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-4">
                                    <Label className="text-xs font-bold uppercase text-slate-400">Templates</Label>
                                    <div className="flex flex-col gap-1">
                                        <Button variant="outline" size="sm" className="justify-start text-xs border-slate-200">Normal (Défaut)</Button>
                                        <Button variant="outline" size="sm" className="justify-start text-xs border-slate-200">Traumatologie</Button>
                                        <Button variant="outline" size="sm" className="justify-start text-xs border-slate-200">Oncologie</Button>
                                    </div>
                                </div>
                                <div className="md:col-span-3">
                                    <div className="min-h-[300px] border rounded-xl p-6 bg-slate-50 text-slate-800 focus-within:ring-2 focus-within:ring-slate-900 transition-all">
                                        <p className="font-bold border-b pb-2 mb-4">COMPTE-RENDU D'EXAMEN : SCANNER ABDOMINO-PELVIEN</p>
                                        <p className="text-sm italic text-slate-400 mb-6">[ Cliquez ici ou utilisez le micro pour commencer la dictée ]</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
