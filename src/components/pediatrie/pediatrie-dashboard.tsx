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
    CheckCircle2,
    AlertCircle,
    FileText,
    Settings,
    UserPlus,
    Syringe,
    LineChart,
    Scale,
    FlaskConical,
    Wind
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

export function PediatrieDashboard() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const stats = {
        totalChildren: 124,
        vaccinationsToday: 15,
        pediatricOccupancy: 70,
        availableBeds: 6,
        emergencies: 2,
        unpaidInvoices: 8
    }

    const patients = [
        { id: "C1", name: "Samba Diouf", age: "4 ans", weight: "16kg", status: "STABLE", reason: "Suivi Asthme", nextVax: "None" },
        { id: "C2", name: "Coumba Fall", age: "18 mois", weight: "11kg", status: "FEBRILE", reason: "Bronchiolite", nextVax: "RRO" },
        { id: "C3", name: "Omar Sy", age: "2 mois", weight: "5.5kg", status: "URGENCE", reason: "Déshydratation", nextVax: "Penta 2" },
    ]

    const vaccinations = [
        { id: "V1", child: "Bébé Sow", vaccine: "BCG + Polio 0", date: "10/01 08:30", status: "Réalisé" },
        { id: "V2", child: "Awa Ndiaye", vaccine: "Penta 1 + Pneumo 1", date: "10/01 10:15", status: "En attente" },
        { id: "V3", child: "Modou Gueye", vaccine: "RRO", date: "10/01 11:30", status: "En attente" },
    ]

    const beds = [
        { id: "P101", room: "Moussaillon", type: "Standard", status: "Occupé", patient: "Coumba Fall" },
        { id: "P102", room: "Moussaillon", type: "Standard", status: "Libre", patient: null },
        { id: "P201", room: "Forêt Enchantée", type: "Isolation", status: "Occupé", patient: "Omar Sy" },
        { id: "P202", room: "Océan", type: "VIP", status: "Nettoyage", patient: null },
    ]

    const equipment = [
        { name: "Nébuliseur Omron", status: "Opérationnel", lastCheck: "09/01", location: "Urgence" },
        { name: "Pompe à Perfusion", status: "En charge", lastCheck: "08/01", location: "Ch. 201" },
        { name: "Moniteur Signes Vitaux", status: "Vérifier", lastCheck: "10/01", location: "Ch. 101" },
    ]

    const billing = [
        { id: "FAC-P01", patient: "Samba Diouf", amount: "12,500 FCFA", status: "Payé", type: "Consultation" },
        { id: "FAC-P02", patient: "Omar Sy", amount: "85,000 FCFA", status: "Partiel", type: "Urgence + Hosp" },
        { id: "FAC-P03", patient: "Coumba Fall", amount: "45,000 FCFA", status: "A régler", type: "Traitement IV" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-emerald-600">
                        Pôle Pédiatrie & Santé de l'Enfant
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Soins spécialisés pour les tout-petits et adolescents
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-sky-200 hover:bg-sky-50 text-sky-700">
                        <LineChart className="mr-2 h-4 w-4" /> Courbes de croissance
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex-1 md:flex-none bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-100 dark:shadow-none transition-all hover:scale-105">
                                <Plus className="mr-2 h-4 w-4" /> Nouvelle Consultation
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Consultation Pédiatrique</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Nom de l'Enfant</Label>
                                    <Input placeholder="Rechercher..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Poids (kg)</Label>
                                    <Input type="number" step="0.1" placeholder="Ex: 12.5" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost">Annuler</Button>
                                <Button className="bg-sky-600">Ouvrir le dossier</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-sky-50 dark:bg-sky-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-lg shadow-sky-100 dark:shadow-none">
                            <Baby className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-sky-600/70 uppercase tracking-wider">Enfants Suivis</p>
                            <h3 className="text-2xl font-bold text-sky-900 dark:text-sky-100">{stats.totalChildren}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100 dark:shadow-none">
                            <Syringe className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Vaccins (Jour)</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.vaccinationsToday}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-amber-50 dark:bg-amber-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-100 dark:shadow-none">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider">Urgences Vitales</p>
                            <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">{stats.emergencies}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none">
                            <Bed className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Lits Disponibles</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.availableBeds}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Tabs Interaction */}
            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between overflow-x-auto pb-2">
                    <TabsList className="p-1 bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <TabsTrigger value="overview">Vue Globale</TabsTrigger>
                        <TabsTrigger value="consultations">Consultations & Dosages</TabsTrigger>
                        <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
                        <TabsTrigger value="hospitalization">Hospitalisation</TabsTrigger>
                        <TabsTrigger value="logistics">Equipements</TabsTrigger>
                        <TabsTrigger value="billing">Compte & Factures</TabsTrigger>
                    </TabsList>

                    <div className="hidden lg:flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input placeholder="Chercher un patient..." className="pl-9 w-64 bg-slate-50 border-none" />
                        </div>
                    </div>
                </div>

                {/* Vue Globale Content */}
                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Summary left */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 border-b pb-4">
                                    <div>
                                        <CardTitle>Enfants en Salle d'Attente / Soins</CardTitle>
                                        <CardDescription>Suivi du statut clinique en temps réel</CardDescription>
                                    </div>
                                    <Badge className="bg-sky-500/10 text-sky-600 border-none">Actif</Badge>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50/30">
                                            <TableRow>
                                                <TableHead>Enfant</TableHead>
                                                <TableHead>Âge / Poids</TableHead>
                                                <TableHead>État</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {patients.map((p) => (
                                                <TableRow key={p.id} className="hover:bg-slate-50 transition-colors">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs">
                                                                {p.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-sm">{p.name}</div>
                                                                <div className="text-xs text-slate-400">{p.reason}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-sm">{p.age} • {p.weight}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-[10px] font-bold uppercase",
                                                            p.status === "URGENCE" ? "border-red-200 text-red-600 bg-red-50" :
                                                                p.status === "FEBRILE" ? "border-amber-200 text-amber-600 bg-amber-50" :
                                                                    "border-emerald-200 text-emerald-600 bg-emerald-50"
                                                        )}>
                                                            {p.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-sky-50">
                                                            <ArrowUpRight className="h-4 w-4 text-sky-600" />
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
                                            <FlaskConical className="h-4 w-4 text-emerald-600" /> Laboratoire Pédiatrique
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex justify-between text-xs p-2 bg-slate-50 rounded">
                                            <span>NFS - Omar Sy</span>
                                            <span className="font-bold text-sky-600">Prêt</span>
                                        </div>
                                        <div className="flex justify-between text-xs p-2 bg-slate-50 rounded">
                                            <span>CRP - Coumba Fall</span>
                                            <span className="font-bold text-amber-500">En cours</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                            <Wind className="h-4 w-4 text-blue-500" /> Nébulisations Prévues
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center gap-4">
                                        <div className="text-2xl font-bold">4</div>
                                        <div className="text-[10px] text-slate-500">Séances planifiées pour cette heure</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Summary Right */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-6 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Syringe className="h-32 w-32" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Vaccination du jour</h3>
                                <div className="text-3xl font-bold mb-4">65% <span className="text-xs font-normal text-emerald-100">Cible atteinte</span></div>
                                <Progress value={65} className="h-2 bg-emerald-900/50 mb-6" />
                                <div className="space-y-2">
                                    {vaccinations.slice(0, 2).map((v, i) => (
                                        <div key={i} className="flex justify-between text-xs text-emerald-50">
                                            <span>{v.child}</span>
                                            <span className="font-bold underline">{v.vaccine}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-6 bg-white text-emerald-700 hover:bg-slate-100 border-none font-bold">
                                    Ouvrir le registre PEV
                                </Button>
                            </Card>

                            <Card className="border-none shadow-sm p-4">
                                <CardTitle className="text-sm mb-4 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-sky-600" /> Équipe de Garde
                                </CardTitle>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sky-600">PN</div>
                                        <div>
                                            <p className="text-sm font-bold">Dr. Pierre Ndiaye</p>
                                            <p className="text-xs text-slate-500">Pédiatre Référent</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sky-600">AS</div>
                                        <div>
                                            <p className="text-sm font-bold">Inf. Aby Sall</p>
                                            <p className="text-xs text-slate-500">Spécialiste Néonat'</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Consultations Content */}
                <TabsContent value="consultations">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Calculateur de Dosage (Poids-Dépendant)</CardTitle>
                                <CardDescription>Outil d'aide à la prescription sécurisée</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Médicament</Label>
                                        <select className="w-full border rounded p-2 text-sm bg-slate-50">
                                            <option>Paracétamol (15mg/kg)</option>
                                            <option>Amoxicilline (80mg/kg/j)</option>
                                            <option>Ibuprofène (10mg/kg)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Poids de l'enfant (kg)</Label>
                                        <Input type="number" placeholder="12.5" />
                                    </div>
                                </div>
                                <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
                                    <p className="text-xs text-sky-600 font-bold uppercase mb-1">Dose recommandée</p>
                                    <h4 className="text-2xl font-black text-sky-900">187.5 mg</h4>
                                    <p className="text-xs text-slate-500 mt-1">Équivalent : 7.5 ml de sirop 100mg/4ml</p>
                                </div>
                                <Button className="w-full bg-sky-600">Ajouter à l'ordonnance</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Historique Consultations</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Patient</TableHead>
                                            <TableHead>Motif</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {patients.map(p => (
                                            <TableRow key={p.id}>
                                                <TableCell className="font-medium text-sm">{p.name}</TableCell>
                                                <TableCell className="text-xs">{p.reason}</TableCell>
                                                <TableCell className="text-xs text-slate-500">Aujourd'hui</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Vaccination Content */}
                <TabsContent value="vaccination">
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Calendrier National de Vaccination (PEV)</CardTitle>
                                <CardDescription>Suivi des rappels et planification des séances</CardDescription>
                            </div>
                            <Button className="bg-emerald-600">Nouvelle Séance Vacci</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Enfant</TableHead>
                                        <TableHead>Vaccin Prévu</TableHead>
                                        <TableHead>Date / Heure</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Rapport</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vaccinations.map((v) => (
                                        <TableRow key={v.id}>
                                            <TableCell className="font-semibold text-sm">{v.child}</TableCell>
                                            <TableCell className="text-sm">{v.vaccine}</TableCell>
                                            <TableCell className="text-xs">{v.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={v.status === "Réalisé" ? "secondary" : "default"}>
                                                    {v.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon"><FileText className="h-4 w-4" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Hospitalization Content */}
                <TabsContent value="hospitalization">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {beds.map((bed) => (
                            <Card key={bed.id} className={cn(
                                "border-none shadow-sm cursor-pointer transition-all hover:scale-105",
                                bed.status === "Occupé" ? "bg-sky-50 dark:bg-sky-900/20" :
                                    bed.status === "Nettoyage" ? "bg-amber-50 dark:bg-amber-900/20" :
                                        "bg-emerald-50 dark:bg-emerald-900/20"
                            )}>
                                <CardHeader className="p-3 text-center border-b border-white/50 dark:border-slate-800/50">
                                    <h4 className="font-bold text-sm">{bed.room}</h4>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">{bed.id}</p>
                                </CardHeader>
                                <CardContent className="p-3 flex flex-col items-center gap-1">
                                    <div className={cn(
                                        "h-1.5 w-full rounded-full mb-1",
                                        bed.status === "Occupé" ? "bg-sky-400" :
                                            bed.status === "Nettoyage" ? "bg-amber-400" :
                                                "bg-emerald-400"
                                    )} />
                                    <p className="text-[10px] font-medium text-slate-500 uppercase">{bed.type}</p>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate w-full text-center">
                                        {bed.patient || "Libre"}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Logistics */}
                <TabsContent value="logistics">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {equipment.map((e, i) => (
                            <Card key={i} className="border-none shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold">{e.name}</CardTitle>
                                    <CardDescription className="text-xs">{e.location}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Badge variant={e.status === "Opérationnel" ? "outline" : "destructive"}>{e.status}</Badge>
                                        <span className="text-[10px] text-slate-400">Rév. {e.lastCheck}</span>
                                    </div>
                                    <Button variant="ghost" className="w-full h-8 text-xs">Signaler un défaut</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing">
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Facturation Pédiatrique</CardTitle>
                                <CardDescription>Suivi des règlements pour les soins infantiles</CardDescription>
                            </div>
                            <Button variant="outline"><Receipt className="mr-2 h-4 w-4" /> Export Comptable</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Facture</TableHead>
                                        <TableHead>Parent / Enfant</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Montant</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Payer</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {billing.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-mono text-xs">{item.id}</TableCell>
                                            <TableCell className="font-semibold text-sm">{item.patient}</TableCell>
                                            <TableCell className="text-xs text-slate-500">{item.type}</TableCell>
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
                                                <Button size="icon" variant="ghost"><ArrowUpRight className="h-4 w-4" /></Button>
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
