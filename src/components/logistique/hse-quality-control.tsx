"use client"

import { useState } from "react"
import {
    ShieldCheck,
    AlertCircle,
    FileWarning,
    Thermometer,
    Wind,
    Droplets,
    Trash2,
    CheckCircle2,
    Search,
    Plus,
    History,
    Users,
    Building2,
    FileText,
    PieChart,
    Activity,
    Stethoscope,
    TrendingUp,
    Microscope,
    ClipboardCheck,
    Waves
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

export function HSEQualityControl() {
    const [activeTab, setActiveTab] = useState("risk")

    // --- Mock Data ---
    const qualityScore = 94
    const safetyEvents = 2

    const hygieneAudit = [
        { service: "Bloc Opératoire", score: 98, status: "Optimal", lastAudit: "Hier" },
        { service: "Maternité", score: 92, status: "Alerte Mineure", lastAudit: "05/01/2026" },
        { service: "Cuisine / Hospitalisation", score: 86, status: "Action Requise", lastAudit: "01/01/2026" },
    ]

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Premium Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-xl shadow-violet-500/20 rotate-3">
                            <ShieldCheck className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Accréditation <span className="text-violet-600">& Qualité</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Conformité HAS • ISO 9001:2015 • Vigilance Sanitaire
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:border-violet-200 transition-all">
                        <FileWarning className="mr-2 h-4 w-4" /> Signaler E.I.G
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-violet-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <Plus className="h-5 w-5" /> Nouvel Audit
                    </Button>
                </div>
            </div>

            {/* Quality Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-2 border-none shadow-2xl rounded-[40px] bg-gradient-to-br from-violet-600 to-violet-900 text-white p-10 relative overflow-hidden group">
                    <ShieldCheck className="absolute -top-10 -right-10 h-64 w-64 text-white opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="space-y-6">
                            <p className="text-xs font-black uppercase tracking-[0.4em] text-violet-200">Indice Global Performance (IPAQSS)</p>
                            <h2 className="text-7xl font-black italic tracking-tighter">94.8<span className="text-3xl text-violet-300 ml-1">%</span></h2>
                            <div className="flex gap-3">
                                <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] px-4 py-1">CERTIFIÉ B</Badge>
                                <Badge className="bg-white/10 text-violet-100 border-none font-black text-[10px] px-4 py-1 tracking-widest uppercase">Objectif A: 96%</Badge>
                            </div>
                        </div>
                        <div className="h-32 w-32 md:h-48 md:w-48">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="transparent" stroke="white" strokeWidth="8" strokeDasharray="300" strokeDashoffset={300 - (300 * 94.8) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                            </svg>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-rows-2 gap-8">
                    <Card className="border-none shadow-xl rounded-[35px] bg-white p-8 flex flex-col justify-between group hover:shadow-2xl transition-all">
                        <div className="flex justify-between items-start">
                            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            <Badge className="bg-rose-100 text-rose-700 font-black text-[8px] animate-pulse">CRITIQUE</Badge>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 leading-none">02</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">Alertes Risques Actives</p>
                        </div>
                    </Card>
                    <Card className="border-none shadow-xl rounded-[35px] bg-slate-900 text-white p-8 group hover:shadow-2xl transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <PieChart className="h-6 w-6 text-indigo-400" />
                            <TrendingUp className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase"><span>Conformité HAS</span> <span>100%</span></div>
                            <Progress value={100} className="h-1 bg-white/10" />
                        </div>
                    </Card>
                </div>
            </div>

            <Tabs defaultValue="risk" className="space-y-10" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100/50 rounded-[30px] p-2 h-[80px] shadow-inner border border-slate-200 flex overflow-x-auto justify-start scrollbar-hide w-full gap-2">
                    {[
                        { val: "risk", label: "Gestion des Risques & EIG", icon: AlertCircle },
                        { val: "hygiene", label: "Bio-Nettoyage & IAS", icon: Waves },
                        { val: "waste", label: "DASRI & Environnement", icon: Trash2 },
                        { val: "audits", label: "Audits & Accréditation", icon: ClipboardCheck },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full rounded-[22px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-violet-600 font-black text-[10px] uppercase tracking-widest transition-all gap-3 border border-transparent data-[state=active]:border-violet-50">
                            <t.icon className="h-4 w-4" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Hygiene & Bio-Nettoyage View */}
                <TabsContent value="hygiene" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <Card className="border-none shadow-md overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Derniers Audits d'Unité</CardTitle>
                                        <Badge className="bg-violet-600">Plan 2026</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50">
                                            <TableRow>
                                                <TableHead>Service / Unité</TableHead>
                                                <TableHead>Score Hygiène</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead className="text-right">Dernier passage</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {hygieneAudit.map((audit) => (
                                                <TableRow key={audit.service} className="hover:bg-slate-50 cursor-pointer">
                                                    <TableCell className="font-bold text-sm">{audit.service}</TableCell>
                                                    <TableCell className="w-48">
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between text-[10px] font-bold"><span>{audit.score}%</span></div>
                                                            <Progress value={audit.score} className={cn(
                                                                "h-1.5",
                                                                audit.score > 90 ? "bg-slate-100 text-emerald-500" : "bg-slate-100 text-amber-500"
                                                            )} />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-[9px] font-black border-none",
                                                            audit.status === "Optimal" ? "bg-emerald-50 text-emerald-600" :
                                                                audit.status === "Alerte Mineure" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                                                        )}>{audit.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs text-slate-400 italic">{audit.lastAudit}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <div className="p-3 border-t bg-slate-50 flex justify-center">
                                    <Button variant="link" className="text-xs text-violet-600 font-bold">Planifier un audit aléatoire</Button>
                                </div>
                            </Card>
                        </div>

                        {/* Environment Side Panel */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md p-6 bg-slate-900 text-white relative h-64 flex flex-col justify-between">
                                <Waves className="absolute -top-10 -right-10 h-40 w-40 opacity-5" />
                                <div>
                                    <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest mb-4">Stérilisation & Autoclave</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="flex items-center gap-2"><Droplets className="h-3 w-3" /> Cycle 14A</span>
                                            <Badge className="bg-emerald-500 text-[8px] h-4">TERMINÉ - OK</Badge>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="flex items-center gap-2"><Thermometer className="h-3 w-3" /> Température</span>
                                            <span className="font-mono">134.2 °C</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black text-[10px] h-8 shadow-xl">Imprimer PV Stérilisation</Button>
                            </Card>

                            <Card className="border-none shadow-md p-6 bg-white border-l-4 border-l-orange-500">
                                <h4 className="text-sm font-black mb-1">DASRI & Déchets</h4>
                                <p className="text-[10px] text-slate-400 mb-4">Filière d'élimination des déchets à risques infectieux.</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-bold italic">
                                        <span>Dernière collecte</span>
                                        <span className="text-indigo-600 underline">Aujourd'hui 09:00</span>
                                    </div>
                                    <Progress value={45} className="h-1 bg-slate-100" />
                                    <p className="text-[9px] text-slate-400">Remplissage bacs central : 45%</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
