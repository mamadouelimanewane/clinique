"use client"

import { useState } from "react"
import {
    FlaskConical,
    Beaker,
    ClipboardList,
    Activity,
    CheckCircle2,
    Clock,
    AlertCircle,
    Filter,
    Search,
    Plus,
    ArrowUpRight,
    Printer,
    Microscope,
    History,
    FileText,
    TrendingUp,
    Zap,
    ShieldCheck,
    Thermometer,
    DollarSign,
    Users,
    Globe,
    Microchip,
    Target
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

import { LaboStock } from "./labo-stock"
import { LaboAccounting } from "./labo-accounting"

export function LaboratoireDashboard() {
    const [activeTab, setActiveTab] = useState("worklist")

    // --- High-Level Stats ---
    const stats = [
        { label: "Analyses en cours", value: "24", sub: "12 urgences STAT", trend: "+5%", icon: Microscope, color: "emerald", pulse: true },
        { label: "Validations (J)", value: "48", sub: "Zéro erreur LIS", trend: "100% Qualité", icon: CheckCircle2, color: "blue" },
        { label: "Délai (TAT) Moyen", value: "32 min", sub: "Objectif < 45 min", trend: "-8 min", icon: Clock, color: "amber" },
        { label: "C.A Journalier (J)", value: "1,420,000 F", sub: "40% Externe", trend: "+12%", icon: DollarSign, color: "slate", dark: true },
    ]

    const worklist = [
        { id: "L26-001", patient: "Moussa SOW", test: "NFS + CRP + Glycémie", origin: "Hosp. M101", priority: "Urgent", status: "En cours", time: "10:15" },
        { id: "L26-002", patient: "Awa NDIAYE", test: "Bilan Lipidique", origin: "Externe (DOM)", priority: "Normal", status: "Prélevé", time: "09:45" },
        { id: "L26-003", patient: "Alioune DIOP", test: "Urée / Créat", origin: "Externe (Hôpital X)", priority: "Normal", status: "Attente", time: "11:20" },
    ]

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Scientific Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-10 rounded-[40px] shadow-2xl border border-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Microchip className="h-60 w-60 text-emerald-900" />
                </div>

                <div className="flex items-center gap-8 relative z-10">
                    <div className="h-24 w-24 rounded-[32px] bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-2xl shadow-emerald-200 ring-4 ring-emerald-50/50">
                        <FlaskConical className="h-12 w-12 text-white" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                            Laboratoire <span className="text-emerald-600">BioTech</span> <span className="text-slate-300">X</span>
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Accréditation ISO 15189 v2022
                            </p>
                            <div className="h-1 w-1 rounded-full bg-slate-300" />
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                <Globe className="h-4 w-4" /> Prestations Externes Ouvertes
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 relative z-10 w-full lg:w-auto">
                    <Button variant="outline" className="h-14 flex-1 lg:flex-none border-slate-200 rounded-2xl font-black px-8 uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> Labo Mobile
                    </Button>
                    <Button className="h-14 flex-1 lg:flex-none rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 shadow-2xl shadow-emerald-200 uppercase text-[10px] tracking-widest italic tracking-tight">
                        <Plus className="mr-2 h-5 w-5" /> Nouvel Examen Ext.
                    </Button>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <Card key={i} className={cn(
                        "group border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden",
                        s.dark ? "bg-slate-900 text-white" : "bg-white/80 backdrop-blur-sm border border-white/20"
                    )}>
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className={cn(
                                    "p-4 rounded-2xl shadow-inner",
                                    s.dark ? "bg-emerald-500/10 text-emerald-400" :
                                        (s.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                                            s.color === 'blue' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600")
                                )}>
                                    <s.icon className={cn("h-6 w-6", s.pulse && "animate-pulse")} />
                                </div>
                                <Badge className={cn(
                                    "border-none px-3 py-1 font-black text-[10px] rounded-full",
                                    s.dark ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-100 text-slate-500"
                                )}>
                                    {s.trend}
                                </Badge>
                            </div>
                            <div className="space-y-1">
                                <p className={cn(
                                    "text-[10px] font-black uppercase tracking-widest",
                                    s.dark ? "text-slate-500" : "text-slate-400"
                                )}>{s.label}</p>
                                <h3 className="text-3xl font-black tracking-tighter">{s.value}</h3>
                                <p className={cn(
                                    "text-[10px] font-bold italic",
                                    s.dark ? "text-emerald-400/60" : "text-slate-400"
                                )}>{s.sub}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Scientific Workspaces */}
            <Tabs defaultValue="worklist" className="space-y-10">
                <TabsList className="bg-slate-100/80 p-2 h-20 rounded-[30px] shadow-inner border border-white flex overflow-x-auto no-scrollbar gap-2">
                    {[
                        { val: "worklist", label: "Worklist Live", icon: Activity },
                        { val: "validation", label: "Validation Bio", icon: Target },
                        { val: "stock", label: "Stocks Réactifs", icon: Beaker },
                        { val: "accounting", label: "Finance & CA", icon: DollarSign },
                        { val: "external", label: "Prestations Ext.", icon: Globe },
                        { val: "quality", label: "Contrôle Qualité", icon: ShieldCheck },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full min-w-[160px] rounded-[22px] px-6 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-emerald-600 font-black text-[10px] uppercase tracking-widest transition-all">
                            <t.icon className="h-4 w-4 mr-2" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <TabsContent value="worklist">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-2 border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 p-8 border-b border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-slate-900">Flux Analyses Temps-Réel</CardTitle>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="rounded-xl font-black text-[9px] uppercase tracking-widest bg-white border-slate-200">Filtrer</Button>
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50/50">
                                            <TableRow className="border-none">
                                                <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Arrivée</TableHead>
                                                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Patient & Origine</TableHead>
                                                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Examen</TableHead>
                                                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Statut</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {worklist.map((w) => (
                                                <TableRow key={w.id} className="group hover:bg-emerald-50/30 transition-all border-slate-50 font-medium">
                                                    <TableCell className="px-8 py-5">
                                                        <span className="text-[10px] font-black text-slate-400 italic">{w.time}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-slate-900 uppercase tracking-tighter group-hover:text-emerald-600 transition-colors">{w.patient}</span>
                                                            <span className="text-[9px] text-slate-400 font-bold tracking-widest italic">{w.origin}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="border-emerald-100 text-emerald-700 font-black text-[9px] uppercase px-3 rounded-lg">{w.test}</Badge>
                                                    </TableCell>
                                                    <TableCell className="px-8 text-right">
                                                        <Button className="h-8 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[9px] uppercase tracking-widest shadow-lg shadow-emerald-50">Saisir</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="space-y-8">
                                <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[32px] overflow-hidden">
                                    <CardHeader className="p-8 pb-4">
                                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                            <Microchip className="h-4 w-4 text-emerald-400" /> État des Automates
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                                <span>Sysmex XN-1000</span>
                                                <span className="text-emerald-400">IDLE</span>
                                            </div>
                                            <Progress value={20} className="h-1 bg-white/10" />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                                <span>Roche COBAS 6000</span>
                                                <span className="text-amber-400 italic">CALIB.</span>
                                            </div>
                                            <Progress value={100} className="h-1 bg-white/10" />
                                        </div>
                                        <Button variant="outline" className="w-full h-11 rounded-xl border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Consolider LIS</Button>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-[32px] p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <ShieldCheck className="h-10 w-10 text-emerald-200" />
                                        <Badge className="bg-white/20 text-white border-none font-black text-[8px] uppercase tracking-widest">ISO 15189</Badge>
                                    </div>
                                    <h4 className="text-xl font-black uppercase italic tracking-tighter mb-1">Qualité Biologique</h4>
                                    <p className="text-emerald-100 text-[10px] font-bold leading-relaxed mb-6 opacity-80">Tous les contrôles internes (CIQ) sont validés pour le run en cours. Levey-Jennings stable.</p>
                                    <Button className="w-full h-11 bg-white hover:bg-slate-50 text-emerald-700 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl">Menu Qualité</Button>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="external">
                        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white min-h-[400px] flex flex-col">
                            <CardHeader className="bg-slate-900 text-white p-10">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-3xl font-black uppercase tracking-tighter italic">Prestations Patients Externes</CardTitle>
                                        <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" /> Croissance externe : +24% ce mois
                                        </p>
                                    </div>
                                    <Button className="h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-emerald-500/20">
                                        Facturer Analyse Externe
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col items-center justify-center p-20 gap-8">
                                <div className="h-32 w-32 rounded-full border-4 border-dashed border-slate-100 flex items-center justify-center">
                                    <Globe className="h-12 w-12 text-slate-200" />
                                </div>
                                <div className="text-center max-w-md">
                                    <h5 className="text-xl font-black text-slate-400 uppercase tracking-tighter italic">Prêt pour les interventions externes</h5>
                                    <p className="text-xs text-slate-400 font-bold mt-2">Le module de facturation externe est interconnecté avec le laboratoire mobile et les prélèvements à domicile.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
