"use client"

import { useState } from "react"
import {
    Wrench,
    Settings,
    History,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Activity,
    Database,
    Cpu,
    FileText,
    Plus,
    Search,
    Calendar,
    MoreVertical,
    ShieldCheck,
    FlaskConical,
    Zap,
    TrendingUp,
    Play,
    Pause,
    BarChart3,
    ArrowRightLeft,
    Stethoscope,
    Package
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
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Users } from "lucide-react"

export function GMAOExpertSystem() {
    const [activeTab, setActiveTab] = useState("parc")

    // --- Real Data Fetching ---
    const { data: equipments, isLoading: isLoadingEquipments } = useQuery({
        queryKey: ['maintenance-equipments'],
        queryFn: async () => {
            const res = await fetch('/api/maintenance/equipements')
            if (!res.ok) throw new Error('Failed to fetch equipments')
            return res.json() as Promise<any[]>
        }
    })

    const { data: tickets, isLoading: isLoadingTickets } = useQuery({
        queryKey: ['maintenance-tickets'],
        queryFn: async () => {
            const res = await fetch('/api/maintenance/tickets')
            if (!res.ok) throw new Error('Failed to fetch tickets')
            return res.json() as Promise<any[]>
        }
    })

    const stats = {
        totalAssets: equipments?.length || 0,
        uptime: "98.4%", // Logic can be improved
        preventiveDue: tickets?.filter((t: any) => t.type === 'PREVENTIF' && t.statut === 'OUVERT').length || 0,
        criticalAlarms: tickets?.filter((t: any) => t.priorite === 'CRITIQUE' && t.statut !== 'RESOLU').length || 0
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* High-End Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-500/20 -rotate-3">
                            <Wrench className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Engineering <span className="text-orange-600">& Biotech</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        GMAO Expert • Maintenance Prédictive • Calibration ISO
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:border-orange-200 transition-all">
                        <History className="mr-2 h-4 w-4" /> Historique Master
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-orange-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <Plus className="h-5 w-5" /> Nouvel Asset
                    </Button>
                </div>
            </div>

            {/* Performance Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Uptime Plateau", value: stats.uptime, icon: Activity, color: "emerald", trend: "Stable" },
                    { label: "MTBF Moyen", value: "840h", icon: TrendingUp, color: "blue", trend: "+12% vs Q4" },
                    { label: "Pannes Critiques", value: stats.criticalAlarms, icon: AlertTriangle, color: "rose", trend: "Action Requise" },
                    { label: "Valeur Assets", value: "1.2 Md F", icon: Database, color: "orange", trend: "Actif Net" },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl rounded-[35px] overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn(
                                    "p-4 rounded-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110",
                                    stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                                        stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                                            stat.color === 'rose' ? "bg-rose-50 text-rose-600" : "bg-orange-50 text-orange-600"
                                )}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <Badge className="bg-slate-50 text-slate-400 border-none font-bold text-[8px] uppercase tracking-widest">{stat.trend}</Badge>
                            </div>
                            <h4 className="text-3xl font-black tracking-tighter text-slate-900 italic">{stat.value}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{stat.label}</p>
                            <div className="mt-6 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full transition-all duration-1000 w-2/3",
                                    stat.color === 'emerald' ? "bg-emerald-500" :
                                        stat.color === 'blue' ? "bg-blue-500" :
                                            stat.color === 'rose' ? "bg-rose-500" : "bg-orange-500"
                                )} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="parc" className="space-y-10" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100/50 rounded-[30px] p-2 h-[80px] shadow-inner border border-slate-200 flex overflow-x-auto justify-start scrollbar-hide w-full gap-2">
                    {[
                        { val: "parc", label: "Master Asset Registry", icon: Database },
                        { val: "preventive", label: "Génie Préventif", icon: ShieldCheck },
                        { val: "curative", label: "Tickets Curatifs", icon: Zap },
                        { val: "calibration", label: "Métrologie ISO", icon: FlaskConical },
                        { val: "parts", label: "Pièces Détachées", icon: Package },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full rounded-[22px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-orange-600 font-black text-[10px] uppercase tracking-widest transition-all gap-3 border border-transparent data-[state=active]:border-orange-50">
                            <t.icon className="h-4 w-4" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Parc Équipements Table */}
                <TabsContent value="parc" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-white dark:bg-slate-900 border-b flex flex-row items-center justify-between py-4">
                                    <div>
                                        <CardTitle className="text-lg">Inventaire Technique</CardTitle>
                                        <CardDescription>Visualisation de l'état du plateau technique</CardDescription>
                                    </div>
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input placeholder="N° de série, Nom..." className="pl-9 w-64 bg-slate-50 border-none h-9" />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50">
                                            <TableRow>
                                                <TableHead>Équipement</TableHead>
                                                <TableHead>Localisation</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead>Prochaine Maint.</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoadingEquipments ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-24 text-center">
                                                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                                    </TableCell>
                                                </TableRow>
                                            ) : equipments?.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                        Aucun équipement trouvé.
                                                    </TableCell>
                                                </TableRow>
                                            ) : equipments?.map((item) => (
                                                <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold border">
                                                                <Stethoscope className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold">{item.nom}</p>
                                                                <p className="text-[10px] text-slate-400">{item.marque} • {item.code}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-xs font-semibold text-slate-600">{item.localisation}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-[10px] font-black border-none",
                                                            item.statut === "OPERATIONNEL" ? "bg-emerald-50 text-emerald-600 shadow-sm" : "bg-red-50 text-red-600 animate-pulse"
                                                        )}>{item.statut}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-slate-400 font-mono italic">
                                                        {item.dateProchaineMaintenance ? format(new Date(item.dateProchaineMaintenance), 'dd/MM/yyyy') : '-'}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Planning & Alarms Side Panel */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md p-6 bg-white">
                                <h4 className="font-bold text-sm mb-4 flex items-center gap-2 underline decoration-orange-500 underline-offset-4">Planning Semaine</h4>
                                <div className="space-y-4">
                                    {isLoadingTickets ? (
                                        <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin" /></div>
                                    ) : tickets?.length === 0 ? (
                                        <p className="text-[10px] text-center text-slate-400">Aucun ticket planifié.</p>
                                    ) : tickets?.map((c: any, i: number) => (
                                        <div key={i} className="flex gap-4 p-3 bg-slate-50 rounded-xl relative overflow-hidden group hover:bg-white border hover:border-orange-200 transition-all cursor-pointer">
                                            <div className={cn(
                                                "h-10 w-2 rounded-full shrink-0",
                                                c.priorite === 'HAUTE' || c.priorite === 'CRITIQUE' ? "bg-red-500" : "bg-orange-500"
                                            )} />
                                            <div>
                                                <p className="text-xs font-bold">{c.objet}</p>
                                                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                                                    <Stethoscope className="h-3 w-3" /> {c.equipement.nom}
                                                </p>
                                                <p className="text-[9px] font-black text-orange-600 mt-1 uppercase">
                                                    {format(new Date(c.createdAt), 'dd MMM', { locale: fr })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-6 bg-orange-600 text-white font-bold h-9 text-xs shadow-lg">Calendrier GM</Button>
                            </Card>

                            <Card className="border-none shadow-sm p-6 bg-slate-900 text-white relative overflow-hidden">
                                <Cpu className="absolute -top-4 -right-4 h-20 w-20 text-white/5" />
                                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">IoT & Capteurs</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span>T° Stockage Vaccins</span>
                                        <Badge className="bg-emerald-500 font-mono">4.2°C</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Pression Oxygène</span>
                                        <Badge className="bg-emerald-500 font-mono">8.4 Bar</Badge>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full mt-6 text-[10px] h-8 border-white/20 text-white hover:bg-white/10">Configure Alarms</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Calibration & Metrology */}
                <TabsContent value="calibration" className="mt-0">
                    <Card className="border-none shadow-md">
                        <CardHeader className="bg-indigo-900 text-white p-8 border-none overflow-hidden relative">
                            <FlaskConical className="absolute top-0 right-0 h-48 w-48 opacity-10 rotate-12" />
                            <CardTitle className="text-2xl font-black">Certifications & Métrologie</CardTitle>
                            <CardDescription className="text-indigo-200">Suivi des certificats d'étalonnage pour la conformité ISO.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-indigo-50/50">
                                    <TableRow>
                                        <TableHead className="text-indigo-900 font-bold">Équipement</TableHead>
                                        <TableHead className="text-indigo-900 font-bold">Dernier Certif.</TableHead>
                                        <TableHead className="text-indigo-900 font-bold">Validité</TableHead>
                                        <TableHead className="text-indigo-900 font-bold">Organisme</TableHead>
                                        <TableHead className="text-right text-indigo-900 font-bold">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-bold">Automate Sysmex XN-1000</TableCell>
                                        <TableCell className="text-xs">CERT-1123-2025</TableCell>
                                        <TableCell><Badge className="bg-emerald-100 text-emerald-700">VALIDE (240 Jours)</Badge></TableCell>
                                        <TableCell className="text-xs">Laboratoire National</TableCell>
                                        <TableCell className="text-right"><Button variant="ghost" size="sm"><FileText className="h-4 w-4 mr-2" /> PDF</Button></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Pièces Détachées Tracking */}
                <TabsContent value="parts" className="mt-0 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 p-8 border-b border-slate-100">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Stock Pièces Critiques</CardTitle>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Inventaire Maintenance (Spare Parts)</p>
                                    </div>
                                    <Button size="sm" className="bg-orange-600 rounded-xl h-10 px-6 font-black text-[10px] uppercase">Achat Express</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="border-none">
                                            <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Désignation</TableHead>
                                            <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Compatible avec</TableHead>
                                            <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Quantité</TableHead>
                                            <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Statut</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { name: "Filtres HEPA H14", compat: "Bloc Opératoire (Air Systems)", qty: 24, status: "OK", min: 10 },
                                            { name: "Cartouches Encre Labo", compat: "Sysmex XN-1000", qty: 4, status: "ALERTE", min: 5 },
                                            { name: "Batteries UPS 12V/7Ah", compat: "Onduleurs Salle Serveur", qty: 12, status: "OK", min: 6 },
                                            { name: "Lampes Halogènes 50W", compat: "Scialytique Dr. Mach", qty: 2, status: "CRITIQUE", min: 8 },
                                        ].map((p, i) => (
                                            <TableRow key={i} className="group border-slate-50 hover:bg-orange-50/30 transition-all">
                                                <TableCell className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
                                                            <Package className="h-4 w-4" />
                                                        </div>
                                                        <span className="font-bold text-sm text-slate-900 uppercase italic tracking-tight">{p.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-xs text-slate-500 font-medium italic">{p.compat}</TableCell>
                                                <TableCell className="text-center">
                                                    <span className="font-black text-slate-900">{p.qty}</span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge className={cn(
                                                        "font-black text-[8px] tracking-widest px-3 py-1 rounded-md border-none",
                                                        p.status === "OK" ? "bg-emerald-100 text-emerald-700" :
                                                            p.status === "ALERTE" ? "bg-orange-100 text-orange-700 font-black italic underline" : "bg-rose-100 text-rose-700 animate-pulse"
                                                    )}>{p.status}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Inventory Value Side Card */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white p-8 relative overflow-hidden group">
                                <TrendingUp className="absolute -bottom-10 -right-10 h-40 w-40 text-white opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-400 mb-6 italic underline">Analyse Stock GMAO</h4>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Valeur Pièces Détachées</p>
                                            <h3 className="text-3xl font-black italic">8.4M <span className="text-xs">F</span></h3>
                                        </div>
                                        <Badge className="bg-orange-600 text-[9px] font-black underline border-none shadow-lg">STOCKÉ</Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold"><span>Obsolescence Automates</span> <span>12%</span></div>
                                        <Progress value={12} className="h-1 bg-white/10" />
                                    </div>
                                </div>
                                <Button className="w-full mt-10 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest h-12 rounded-2xl">Bilan Inventaire PDF</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    )
}
