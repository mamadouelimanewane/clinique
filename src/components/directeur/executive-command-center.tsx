"use client"

import { useState } from "react"
import {
    LayoutDashboard,
    TrendingUp,
    Users,
    BedDouble,
    Activity,
    DollarSign,
    ShieldAlert,
    Building2,
    Map,
    Zap,
    Calendar,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    Cpu,
    Globe,
    Star,
    Clock,
    Target,
    BarChart3,
    PieChart,
    Stethoscope,
    Boxes
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { StrategicBoardReport } from "./strategic-board-report"
import { FileText } from "lucide-react"

export function ExecutiveCommandCenter() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const globalKpis = {
        dailyRevenue: "8.4M",
        occupancyRate: "89%",
        patientSatisfaction: "4.8/5",
        activeEvents: 3
    }

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-700">
            {/* Ultra-Premium Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-8 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-2xl rotate-3">
                        <Building2 className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-none">
                            Centre de Commandement Stratégique
                        </h1>
                        <p className="text-slate-500 font-bold flex items-center gap-2">
                            <Globe className="h-4 w-4 text-indigo-500" /> Pilotage Global de la Clinique Aéré Lao
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 mr-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                        ))}
                        <div className="h-8 w-8 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">+12</div>
                    </div>
                    <Button className="bg-slate-950 hover:bg-black text-white px-6 font-bold shadow-xl border-none">
                        <Target className="mr-2 h-4 w-4" /> Vision 2030
                    </Button>
                </div>
            </div>

            {/* Real-time Pulse Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-none shadow-2xl bg-indigo-700 text-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <DollarSign className="h-24 w-24" />
                    </div>
                    <CardContent className="p-6">
                        <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Chiffre d'Affaire (Mois)</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-4xl font-black">1.45 <span className="text-xl">Md</span></h3>
                            <Badge className="bg-white/20 text-white border-none mb-1 text-[10px]"><ArrowUpRight className="h-3 w-3 mr-1" /> 12%</Badge>
                        </div>
                        <p className="text-[10px] text-indigo-300 mt-4 italic font-bold">Projection : 1.6 Md d'ici fin du mois</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-2xl bg-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                    <CardContent className="p-6">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Taux d'Occupation</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-4xl font-black text-slate-900">{globalKpis.occupancyRate}</h3>
                            <Badge className="bg-emerald-100 text-emerald-700 border-none mb-1 text-[10px]">Optimal</Badge>
                        </div>
                        <div className="mt-4 space-y-1">
                            <Progress value={89} className="h-1.5 bg-slate-100" />
                            <p className="text-[9px] text-slate-400 font-bold">48 lits occupés sur 54</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-2xl bg-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                    <CardContent className="p-6">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Satisfaction Patient</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-4xl font-black text-slate-900">{globalKpis.patientSatisfaction}</h3>
                            <div className="flex mb-1.5">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 text-yellow-500 fill-yellow-500" />)}
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-4 leading-relaxed line-clamp-1 italic">"Excellent accueil au pôle cardiologie..."</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-2xl bg-slate-900 text-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-orange-400 text-xs font-black uppercase tracking-widest">Alertes Système</p>
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                        </div>
                        <h3 className="text-4xl font-black">{globalKpis.activeEvents} <span className="text-sm font-normal opacity-50 underline">Événements</span></h3>
                        <div className="mt-4 flex gap-2">
                            <Badge className="bg-white/10 text-white text-[8px] border-none">1 Maintenance</Badge>
                            <Badge className="bg-white/10 text-white text-[8px] border-none">2 Stocks Bas</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl w-full flex justify-between h-auto border border-slate-200">
                    <div className="flex gap-1">
                        <TabsTrigger value="overview" className="gap-2 rounded-xl text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg">
                            <LayoutDashboard className="h-4 w-4" /> Vue d'Ensemble
                        </TabsTrigger>
                        <TabsTrigger value="departments" className="gap-2 rounded-xl text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg">
                            <Boxes className="h-4 w-4" /> Performance Pôles
                        </TabsTrigger>
                        <TabsTrigger value="hr-fin" className="gap-2 rounded-xl text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg">
                            <Users className="h-4 w-4" /> RH & Finance
                        </TabsTrigger>
                        <TabsTrigger value="report" className="gap-2 rounded-xl text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg">
                            <FileText className="h-4 w-4" /> Rapport Stratégique
                        </TabsTrigger>
                    </div>
                    <Button variant="ghost" size="sm" className="hidden md:flex text-indigo-600 font-black text-[10px]">GÉNÉRER RAPPORT CA CONSEIL <ArrowUpRight className="ml-2 h-3 w-3" /></Button>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Map & Infrastructure Concept */}
                        <Card className="lg:col-span-2 border-none shadow-2xl bg-white overflow-hidden min-h-[500px] relative">
                            <CardHeader className="border-b bg-slate-50/50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-xl">Infrastructure & Flux Temps Réel</CardTitle>
                                        <CardDescription>Visualisation spatiale de l'occupation</CardDescription>
                                    </div>
                                    <Badge className="bg-slate-200 text-slate-800 border-none">NIVEAU 1 (Rez-de-Chaussée)</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 flex items-center justify-center bg-slate-50 relative">
                                {/* Futuristic Build View Placeholder */}
                                <div className="w-full h-[400px] flex flex-col items-center justify-center gap-6">
                                    <div className="grid grid-cols-3 gap-4 w-[80%] opacity-40">
                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                            <div key={i} className={cn(
                                                "h-24 rounded-2xl border-2 border-dashed border-indigo-200 flex items-center justify-center font-black text-slate-300",
                                                i === 1 && "bg-indigo-50 border-solid border-indigo-400 text-indigo-600 opacity-100",
                                                i === 4 && "bg-red-50 border-solid border-red-400 text-red-600 opacity-100"
                                            )}>
                                                {i === 1 ? "BLOC OP." : i === 4 ? "URGENCES" : `SALLE ${i}`}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-indigo-600 animate-pulse" />
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Moteur Vision 3D SIGHI ready</span>
                                    </div>
                                </div>

                                {/* Floating Data Overlays */}
                                <div className="absolute top-10 right-10 space-y-3">
                                    <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border shadow-xl w-48 animate-in slide-in-from-right-10">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Bloc Opératoire 1</p>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-slate-900">Dr. Ndiaye</span>
                                            <Badge className="bg-emerald-500 text-[8px] h-3">OPÉRATION</Badge>
                                        </div>
                                        <Progress value={65} className="h-1 bg-slate-100" />
                                        <p className="text-[8px] text-slate-400 mt-1 italic">Durée estimée restante: 25 min</p>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border shadow-xl w-48">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Urgences</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-900">Attente moy.</span>
                                            <span className="text-xs font-black text-red-600">14 min</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Executive AI Insights */}
                        <div className="space-y-8">
                            <Card className="border-none shadow-2xl bg-indigo-950 text-white p-8 relative overflow-hidden">
                                <div className="absolute -bottom-10 -right-10 opacity-5">
                                    <Cpu className="h-48 w-48" />
                                </div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
                                    <h4 className="font-bold text-sm tracking-widest uppercase">AI Strategy Insight</h4>
                                </div>
                                <div className="space-y-6 relative z-10">
                                    <p className="text-sm leading-relaxed text-indigo-100 italic">
                                        "L'activité IRM a cru de **22%** ce trimestre alors que la cardiologie stagne. Une extension du plateau technique d'imagerie pourrait générer **+4.5M/jour** d'ici T4."
                                    </p>
                                    <div className="pt-6 border-t border-white/10">
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase mb-4">Recommandations</p>
                                        <div className="space-y-3">
                                            <div className="flex gap-3 items-start">
                                                <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black italic shadow-inner">1</div>
                                                <p className="text-xs leading-tight">Digitaliser le pôle Pédiatrie pour réduire le temps administratif de 15%.</p>
                                            </div>
                                            <div className="flex gap-3 items-start">
                                                <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black italic shadow-inner">2</div>
                                                <p className="text-xs leading-tight">Mettre en place une tarification dynamique pour les consultations Premium.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full mt-10 bg-white text-indigo-950 font-black text-xs h-10 hover:bg-slate-100 shadow-xl">Simuler Scénarios de Croissance</Button>
                            </Card>

                            <Card className="border-none shadow-xl bg-white p-6">
                                <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-indigo-600" /> Pipeline de Projets
                                </h4>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight"><span>Certification ISO 9001</span> <span>85%</span></div>
                                        <Progress value={85} className="h-1 bg-slate-100" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight"><span>Nouveau Pôle Ophtalmo</span> <span>30%</span></div>
                                        <Progress value={30} className="h-1 bg-slate-100" />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Performance Pôles */}
                <TabsContent value="departments" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Maternité", rev: "345M", trend: "+8%", color: "text-pink-600" },
                            { name: "Bloc Opératoire", rev: "512M", trend: "+15%", color: "text-indigo-600" },
                            { name: "Laboratoire", rev: "210M", trend: "-2%", color: "text-emerald-600" },
                            { name: "Radiologie", rev: "442M", trend: "+20%", color: "text-blue-600" },
                        ].map(dept => (
                            <Card key={dept.name} className="border-none shadow-lg p-6 hover:translate-y-[-5px] transition-transform cursor-pointer">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2 mb-4">{dept.name}</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <h5 className="text-2xl font-black text-slate-900">{dept.rev} F</h5>
                                        <Badge variant="outline" className={cn("text-[9px] border-none", dept.trend.startsWith('+') ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50")}>
                                            {dept.trend}
                                        </Badge>
                                    </div>
                                    <p className="text-[10px] text-slate-400 italic font-medium">Rentabilité : Haute</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Rapport Stratégique */}
                <TabsContent value="report" className="mt-0">
                    <StrategicBoardReport />
                </TabsContent>
            </Tabs>
        </div>
    )
}
