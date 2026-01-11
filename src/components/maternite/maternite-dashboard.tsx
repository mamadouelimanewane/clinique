"use client"

import { useState } from "react"
import {
    Baby,
    Stethoscope,
    Calendar,
    HeartPulse,
    Plus,
    Search,
    Bed,
    Wrench,
    Receipt,
    Activity,
    Clock,
    Thermometer,
    ArrowUpRight,
    Filter,
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    FileText,
    Settings,
    UserPlus,
    User
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
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function MaterniteDashboard() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const stats = {
        totalPatients: 42,
        birthsToday: 3,
        nurseryOccupancy: 85,
        availableBeds: 8,
        pendingInvoices: 12,
        criticalAlerts: 1
    }

    const pregnancies = [
        { id: "P1", name: "Aminata Gueye", dpa: "2026-01-15", g: 1, p: 0, status: "TERME_PROCHE", rdv: "Demain" },
        { id: "P2", name: "Mariama Ba", dpa: "2026-03-12", g: 3, p: 2, status: "SUIVI_NORMAL", rdv: "20/01" },
        { id: "P3", name: "Sokhna Diop", dpa: "2026-02-05", g: 2, p: 1, status: "PATHOLOGIQUE", rdv: "Aujourd'hui" },
    ]

    const newborns = [
        { id: "B1", name: "Bébé Faye", mother: "Fatou Faye", age: "6h", weight: "3.2kg", health: "Excellent", incubator: false },
        { id: "B2", name: "Bébé Sow", mother: "Aïcha Sow", age: "24h", weight: "2.1kg", health: "Surveillance", incubator: true },
        { id: "B3", name: "Bébé Ndiaye", mother: "Khadija Ndiaye", age: "48h", weight: "3.5kg", health: "Excellent", incubator: false },
    ]

    const beds = [
        { id: "101", room: "101", type: "Standard", status: "Occupé", patient: "Aminata Gueye" },
        { id: "102", room: "101", type: "Standard", status: "Libre", patient: null },
        { id: "103", room: "102", type: "VIP", status: "Nettoyage", patient: null },
        { id: "201", room: "201", type: "Post-op", status: "Occupé", patient: "Fatou Faye" },
    ]

    const equipment = [
        { name: "Échographe 4D", status: "Opérationnel", lastCheck: "05/01", priority: "Haute" },
        { name: "Moniteur Fœtal", status: "Opérationnel", lastCheck: "08/01", priority: "Critique" },
        { name: "Couveuse R1", status: "Maintenance", lastCheck: "10/01", priority: "Haute" },
    ]

    const billing = [
        { id: "FAC-1024", patient: "Fatou Faye", amount: "250,000 FCFA", status: "A régler", type: "Accouchement" },
        { id: "FAC-1025", patient: "Mariama Ba", amount: "15,000 FCFA", status: "Payé", type: "Consultation CPN" },
        { id: "FAC-1026", patient: "Aïcha Sow", amount: "185,000 FCFA", status: "Assurance", type: "Hospitalisation" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600">
                        Pôle Maternité & Néonatologie
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Centre d'excellence en santé maternelle et infantile
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-pink-200 hover:bg-pink-50 text-pink-700">
                        <FileText className="mr-2 h-4 w-4" /> Rapport de Garde
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-105">
                                <Plus className="mr-2 h-4 w-4" /> Nouvelle Admission
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Admission Maternité</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Nom de la Patiente</Label>
                                    <Input placeholder="Rechercher ou saisir..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Type d'admission</Label>
                                    <Input placeholder="Accouchement, CPN, Urgence..." />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost">Annuler</Button>
                                <Button className="bg-indigo-600">Confirmer l'admission</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none">
                            <Baby className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Naissances Aujourd'hui</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.birthsToday}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100 dark:shadow-none">
                            <Bed className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Lits Disponibles</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.availableBeds}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-pink-50 dark:bg-pink-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-100 dark:shadow-none">
                            <HeartPulse className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-pink-600/70 uppercase tracking-wider">Grossesses Suivies</p>
                            <h3 className="text-2xl font-bold text-pink-900 dark:text-pink-100">{stats.totalPatients}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-amber-50 dark:bg-amber-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-100 dark:shadow-none">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider">Alertes Critiques</p>
                            <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">{stats.criticalAlerts}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Tabs Interaction */}
            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                    <TabsList className="p-1 bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                            Vue Globale
                        </TabsTrigger>
                        <TabsTrigger value="tracking">Suivi & Accouchements</TabsTrigger>
                        <TabsTrigger value="nursery">Pôle Nurserie</TabsTrigger>
                        <TabsTrigger value="beds">Occupation Lits</TabsTrigger>
                        <TabsTrigger value="equipment">Équipements</TabsTrigger>
                        <TabsTrigger value="billing">Facturation</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input placeholder="Rechercher une patiente..." className="pl-9 w-64 bg-slate-50 border-none shadow-none focus-visible:ring-1" />
                        </div>
                        <Button variant="ghost" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Vue Globale Content */}
                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Summary left */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-sm overflow-hidden">
                                <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b pb-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Activités du Pôle</CardTitle>
                                            <CardDescription>Aperçu des rendez-vous et accouchements aujourd'hui</CardDescription>
                                        </div>
                                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none">Live</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50/30">
                                            <TableRow>
                                                <TableHead className="font-bold">Patiente</TableHead>
                                                <TableHead className="font-bold">DPA / Age</TableHead>
                                                <TableHead className="font-bold">Statut Clinique</TableHead>
                                                <TableHead className="font-bold text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pregnancies.map((p) => (
                                                <TableRow key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">
                                                                {p.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-sm">{p.name}</div>
                                                                <div className="text-xs text-slate-400">G{p.g} P{p.p}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-sm">{p.dpa}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-[10px] font-bold",
                                                            p.status === "PATHOLOGIQUE" ? "border-red-200 text-red-600 bg-red-50" :
                                                                p.status === "TERME_PROCHE" ? "border-amber-200 text-amber-600 bg-amber-50" :
                                                                    "border-emerald-200 text-emerald-600 bg-emerald-50"
                                                        )}>
                                                            {p.status.replace('_', ' ')}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-none shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                            <Wrench className="h-4 w-4 text-slate-600" /> Équipements Critiques
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {equipment.slice(0, 2).map((e, i) => (
                                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                                                <span className="text-sm font-medium">{e.name}</span>
                                                <Badge className="text-[10px] bg-emerald-500 text-white border-none">{e.status}</Badge>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                            <Receipt className="h-4 w-4 text-slate-600" /> Facturation en attente
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">1,450,000 FCFA</span>
                                            <span className="text-xs text-slate-400">Total impayés du service</span>
                                        </div>
                                        <Progress value={65} className="h-1.5 bg-slate-100" />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Recent Births right */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-sm relative overflow-hidden group">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Baby className="h-5 w-5 text-pink-500" /> Dernières Naissances
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {newborns.map((b) => (
                                        <div key={b.id} className="relative flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-100 cursor-pointer">
                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-sm text-slate-900 truncate">{b.name}</div>
                                                <div className="text-xs text-slate-500">Mère: {b.mother}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-bold text-emerald-600">{b.age}</div>
                                                <div className="text-[10px] text-slate-400">{b.weight}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full text-slate-500 text-xs hover:text-indigo-600 transition-colors">
                                        Voir l'historique complet
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-900 to-indigo-950 text-white p-6 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Clock className="h-32 w-32" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Planning Médecin</h3>
                                <div className="space-y-3 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">DS</div>
                                        <div>
                                            <div className="font-semibold text-sm">Dr. Sylla (Garde)</div>
                                            <div className="text-xs text-indigo-200">Disponible • Bloc 1</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-70">
                                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">DK</div>
                                        <div>
                                            <div className="font-semibold text-sm">Dr. Kane</div>
                                            <div className="text-xs text-indigo-200">Repos • Reprise 08:00</div>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full mt-6 bg-white text-indigo-900 hover:bg-slate-100 border-none transition-all">
                                    Voir le planning complet
                                </Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Tracking & Births */}
                <TabsContent value="tracking">
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Suivi des Grossesses & Accouchements</CardTitle>
                                <CardDescription>Gestion des dossiers CPN et planning d'accouchement</CardDescription>
                            </div>
                            <Button className="bg-pink-600">Nouveau Dossier CPN</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patiente</TableHead>
                                        <TableHead>Dernière CPN</TableHead>
                                        <TableHead>G/P</TableHead>
                                        <TableHead>Risque</TableHead>
                                        <TableHead>Prochain RDV</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pregnancies.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-semibold">{p.name}</TableCell>
                                            <TableCell>05/01/2026</TableCell>
                                            <TableCell>{p.g}/{p.p}</TableCell>
                                            <TableCell>
                                                <Badge variant={p.status === "PATHOLOGIQUE" ? "destructive" : "secondary"}>
                                                    {p.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-indigo-600 font-medium">{p.rdv}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Détails</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Nursery Content */}
                <TabsContent value="nursery">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newborns.map((baby) => (
                            <Card key={baby.id} className={cn(
                                "border-none shadow-sm transition-all hover:shadow-md",
                                baby.incubator ? "ring-2 ring-amber-400/50 bg-amber-50/20" : "bg-white dark:bg-slate-900"
                            )}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                                                <Baby className="h-6 w-6 text-sky-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-sm">{baby.name}</CardTitle>
                                                <CardDescription className="text-xs">Mère: {baby.mother}</CardDescription>
                                            </div>
                                        </div>
                                        {baby.incubator && <Badge className="bg-amber-100 text-amber-700 border-none animate-pulse">INCUBATEUR</Badge>}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                                            <span className="text-slate-500 block">Poids</span>
                                            <span className="font-bold">{baby.weight}</span>
                                        </div>
                                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                                            <span className="text-slate-500 block">Âge</span>
                                            <span className="font-bold">{baby.age}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs items-center">
                                            <span className="text-slate-500">État de santé</span>
                                            <span className="font-bold text-emerald-600">{baby.health}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1 text-[10px] h-8">
                                                <Settings className="h-3 w-3 mr-1" /> Paramètres
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1 text-[10px] h-8">
                                                <Thermometer className="h-3 w-3 mr-1" /> Constantes
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Card className="border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 bg-transparent hover:bg-slate-50 cursor-pointer transition-all">
                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                                <Plus className="h-6 w-6 text-slate-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">Ajouter un nouveau né</span>
                        </Card>
                    </div>
                </TabsContent>

                {/* Beds Management */}
                <TabsContent value="beds">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {beds.map((bed) => (
                            <Card key={bed.id} className={cn(
                                "border-none shadow-sm cursor-pointer transition-all hover:scale-105",
                                bed.status === "Occupé" ? "bg-pink-50 dark:bg-pink-900/20" :
                                    bed.status === "Nettoyage" ? "bg-amber-50 dark:bg-amber-900/20" :
                                        "bg-emerald-50 dark:bg-emerald-900/20"
                            )}>
                                <CardHeader className="p-3 text-center border-b border-white/50 dark:border-slate-800/50">
                                    <h4 className="font-bold text-lg">{bed.room}</h4>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">{bed.type}</p>
                                </CardHeader>
                                <CardContent className="p-3 flex flex-col items-center gap-1">
                                    <div className={cn(
                                        "h-2 w-full rounded-full mb-2",
                                        bed.status === "Occupé" ? "bg-pink-400" :
                                            bed.status === "Nettoyage" ? "bg-amber-400" :
                                                "bg-emerald-400"
                                    )} />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate w-full text-center">
                                        {bed.patient || "Disponible"}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Equipment & Logistics */}
                <TabsContent value="equipment">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Maintenance & Inventaire des Équipements</CardTitle>
                            <CardDescription>Suivi de l'état des appareils spécialisés pédiatriques et gynécologiques</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Appareil</TableHead>
                                            <TableHead>Statut</TableHead>
                                            <TableHead>Dernière Révision</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {equipment.map((e, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium text-sm">{e.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant={e.status === "Opérationnel" ? "outline" : "destructive"} className="text-[10px]">
                                                        {e.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs text-slate-500">{e.lastCheck}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <Card className="bg-slate-50 dark:bg-slate-900 p-4 border-none shadow-none">
                                    <h4 className="font-bold text-sm mb-4">Alerte Prochaine Maintenance</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                                                <AlertCircle className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold">Couveuse R1</p>
                                                <p className="text-xs text-slate-500">Révision annuelle prévue demain.</p>
                                                <Button size="sm" variant="link" className="p-0 h-6 text-amber-600 text-xs font-bold">Planifier maintenant</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing">
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Facturation Pôle Maternité</CardTitle>
                                <CardDescription>Gestion des actes financiers liés au service</CardDescription>
                            </div>
                            <Button variant="outline" className="border-slate-200">
                                <Receipt className="mr-2 h-4 w-4" /> Nouveau Devis
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Facture #</TableHead>
                                        <TableHead>Patiente</TableHead>
                                        <TableHead>Acte</TableHead>
                                        <TableHead>Montant</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {billing.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-mono text-xs text-indigo-600">{item.id}</TableCell>
                                            <TableCell className="font-semibold text-sm">{item.patient}</TableCell>
                                            <TableCell className="text-sm">{item.type}</TableCell>
                                            <TableCell className="font-bold text-sm">{item.amount}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === "Payé" ? "secondary" : "default"} className={cn(
                                                    "text-[10px]",
                                                    item.status === "A régler" ? "bg-amber-100 text-amber-600 border-none shadow-none" : ""
                                                )}>
                                                    {item.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon">
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
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
