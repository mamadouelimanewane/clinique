"use client"

import { useState } from "react"
import {
    ShoppingBag,
    Truck,
    Users,
    FileText,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Search,
    Plus,
    ArrowUpRight,
    TrendingUp,
    DollarSign,
    Package,
    Building2,
    BarChart3,
    ArrowRight,
    Filter,
    ClipboardList,
    MoreHorizontal,
    Sparkles,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

export function ProcurementCentral() {
    const [activeTab, setActiveTab] = useState("requisitions")

    // Mock Data
    const stats = [
        { label: "Commandes Encours", value: "24", icon: ShoppingBag, color: "blue", sub: "8 en attente de validation" },
        { label: "Valorisation Achats", value: "18.5M F", icon: DollarSign, color: "emerald", sub: "+12% ce mois" },
        { label: "Livraisons du Jour", value: "6", icon: Truck, color: "orange", sub: "3 conformes reçues" },
        { label: "Fournisseurs Actifs", value: "42", icon: Users, color: "purple", sub: "5 critiques (Santé/Biotech)" },
    ]

    const requisitions = [
        { id: "DA-2026-001", dept: "Laboratoire", type: "Réactifs", priority: "HAUTE", status: "EN_ATTENTE", total: "1,200,000 F", date: "Il y a 2h" },
        { id: "DA-2026-002", dept: "Pharmacie", type: "Antibiotiques", priority: "CRITIQUE", status: "VALIDÉE", total: "4,500,000 F", date: "Il y a 5h" },
        { id: "DA-2026-003", dept: "Maintenance", type: "Pièces Groupe", priority: "MOYENNE", status: "TERMINEE", total: "850,000 F", date: "Hier" },
    ]

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Premium Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 rotate-3">
                            <ShoppingBag className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Centrale <span className="text-indigo-600">Achats</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Synergie Supply Chain • Clinique Sighi • Pilotage Fournisseurs
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:border-indigo-200 transition-all">
                        <Filter className="mr-2 h-4 w-4" /> Analyse Budgétaire
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <Plus className="h-5 w-5" /> Nouvelle Commande
                    </Button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl rounded-[35px] overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn(
                                    "p-4 rounded-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110",
                                    stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                                        stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                                            stat.color === 'orange' ? "bg-orange-50 text-orange-600" : "bg-purple-50 text-purple-600"
                                )}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-slate-200 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h4 className="text-3xl font-black tracking-tighter text-slate-900">{stat.value}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{stat.label}</p>
                            <div className="mt-6 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full transition-all duration-1000 w-1/2",
                                    stat.color === 'blue' ? "bg-blue-500" :
                                        stat.color === 'emerald' ? "bg-emerald-500" :
                                            stat.color === 'orange' ? "bg-orange-500" : "bg-purple-500"
                                )} />
                            </div>
                            <p className="mt-4 text-[9px] font-bold text-slate-400 uppercase">{stat.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Interface tabs */}
            <Tabs defaultValue="requisitions" className="space-y-8" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100/50 rounded-[30px] p-2 h-[85px] shadow-inner border border-slate-200 flex justify-start scrollbar-hide w-full overflow-x-auto gap-2">
                    {[
                        { val: "requisitions", label: "Demandes Internes", icon: ClipboardList },
                        { val: "orders", label: "Commandes Fournisseurs", icon: FileText },
                        { val: "suppliers", label: "Base Fournisseurs", icon: Building2 },
                        { val: "receipt", label: "Réception & Qualité", icon: CheckCircle2 },
                        { val: "analytics", label: "Performance Achat", icon: BarChart3 },
                    ].map(t => (
                        <TabsTrigger
                            key={t.val}
                            value={t.val}
                            className="h-full rounded-[25px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-indigo-600 font-extrabold text-[10px] uppercase tracking-widest transition-all gap-4 border border-transparent data-[state=active]:border-indigo-50"
                        >
                            <t.icon className="h-5 w-5" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Tab Content: Internal Requisitions */}
                <TabsContent value="requisitions" className="mt-0 space-y-10">
                    {/* Workflow Visualizer (Top Bar) */}
                    <Card className="border-none shadow-xl rounded-[35px] bg-white overflow-hidden p-6 border border-slate-100">
                        <div className="flex justify-between items-center mb-8 px-4">
                            <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-400 flex items-center gap-2">
                                <Zap className="h-4 w-4 text-amber-500 animate-pulse" /> État du Workflow Actif
                            </h3>
                            <Badge className="bg-indigo-50 text-indigo-700 border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full">Automatisé par IA</Badge>
                        </div>
                        <div className="relative flex justify-between items-start gap-2">
                            {/* Connector Line */}
                            <div className="absolute top-5 left-8 right-8 h-1 bg-slate-100 rounded-full z-0">
                                <div className="h-full bg-indigo-500 rounded-full w-2/3 shadow-[0_0_15px_indigo]" />
                            </div>

                            {[
                                { step: "1", label: "Expression", sub: "DA Créée", done: true, current: false },
                                { step: "2", label: "Valid. Métier", sub: "Approuvé", done: true, current: false },
                                { step: "3", label: "BC / Achats", sub: "En Sourcing", done: true, current: false },
                                { step: "4", label: "Finance", sub: "Validation Budget", done: false, current: true },
                                { step: "5", label: "Envoi", sub: "Fournisseur", done: false, current: false },
                                { step: "6", label: "Réception", sub: "Contrôle Qualité", done: false, current: false },
                                { step: "7", label: "Clôture", sub: "Mise en Stock", done: false, current: false },
                            ].map((s, idx) => (
                                <div key={idx} className="relative z-10 flex flex-col items-center group w-24">
                                    <div className={cn(
                                        "h-10 w-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-500 shadow-lg",
                                        s.done ? "bg-indigo-600 text-white" :
                                            s.current ? "bg-white border-4 border-indigo-500 text-indigo-600 scale-125 shadow-indigo-200" :
                                                "bg-white border-2 border-slate-200 text-slate-300"
                                    )}>
                                        {s.done ? <CheckCircle2 className="h-5 w-5" /> : s.step}
                                    </div>
                                    <p className={cn(
                                        "mt-4 text-[9px] font-black uppercase tracking-tight text-center leading-tight",
                                        s.current ? "text-indigo-600" : s.done ? "text-slate-900" : "text-slate-400"
                                    )}>{s.label}</p>
                                    <p className="text-[7px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">{s.sub}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* IA Predictive Restock Card (NEW) */}
                        <Card className="lg:col-span-1 border-none bg-gradient-to-br from-indigo-600 to-indigo-900 text-white rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 group">
                            <Sparkles className="absolute -top-10 -right-10 h-40 w-40 text-white opacity-10 animate-pulse" />
                            <div className="relative z-10">
                                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                                    <Sparkles className="h-6 w-6 text-indigo-100" />
                                </div>
                                <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight">Optimisation <br /><span className="text-indigo-300">Prédictive IA</span></h3>
                                <p className="text-[10px] font-bold text-indigo-100/50 uppercase tracking-widest mt-2">Basé sur la consommation réelle</p>
                            </div>

                            <div className="space-y-4 relative z-10 pt-8 border-t border-indigo-500/30">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span>Antibiotiques (Pharm.)</span>
                                        <Badge className="bg-emerald-500 text-white text-[8px] h-4">Commander</Badge>
                                    </div>
                                    <p className="text-[9px] text-indigo-200">Rupture prévue sous : 4 jours</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-indigo-300">
                                        <span>Kits CRP (Labo)</span>
                                        <Badge className="bg-orange-500 text-white text-[8px] h-4">Alerte</Badge>
                                    </div>
                                    <p className="text-[9px] text-indigo-400">Stock restant : 12 kits</p>
                                </div>
                            </div>

                            <Button className="w-full mt-6 bg-white text-indigo-900 hover:bg-slate-50 font-black text-[10px] uppercase tracking-widest rounded-xl h-12 shadow-xl">
                                Valider Suggestions IA
                            </Button>
                        </Card>

                        {/* Live Workflow Panel */}
                        <div className="lg:col-span-3 space-y-6">
                            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                                <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100/50 flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Circuit de Validation</CardTitle>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Demandes d'achats inter-services</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input placeholder="Rechercher DA..." className="pl-10 rounded-xl h-10 border-slate-100 text-xs w-48 focus-visible:ring-indigo-500" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50/30">
                                            <TableRow className="border-none">
                                                <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Réf / Date</TableHead>
                                                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Origine (Service)</TableHead>
                                                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Type / Objet</TableHead>
                                                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Budget Estimé</TableHead>
                                                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Status</TableHead>
                                                <TableHead className="h-12 text-right pr-8">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {requisitions.map((req) => (
                                                <TableRow key={req.id} className="group hover:bg-indigo-50/30 transition-all border-slate-50">
                                                    <TableCell className="px-8 py-6">
                                                        <div className="flex flex-col">
                                                            <span className="font-mono font-black text-indigo-600 text-xs">{req.id}</span>
                                                            <span className="text-[10px] font-bold text-slate-400 italic">{req.date}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_8px_indigo]" />
                                                            <span className="font-black text-xs uppercase text-slate-700">{req.dept}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-bold text-xs text-slate-800">{req.type}</p>
                                                            <Badge variant="outline" className={cn(
                                                                "text-[8px] font-black h-4 px-1.5",
                                                                req.priority === "CRITIQUE" ? "border-rose-200 text-rose-600 bg-rose-50" :
                                                                    req.priority === "HAUTE" ? "border-orange-200 text-orange-600 bg-orange-50" : "border-slate-200 text-slate-500"
                                                            )}>PR. {req.priority}</Badge>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right font-black text-indigo-900 italic text-sm">{req.total}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge className={cn(
                                                            "rounded-lg font-black text-[9px] tracking-widest px-3 py-1",
                                                            req.status === "VALIDÉE" ? "bg-emerald-100 text-emerald-700 shadow-sm" :
                                                                req.status === "EN_ATTENTE" ? "bg-blue-100 text-blue-700 animate-pulse" : "bg-slate-100 text-slate-600"
                                                        )}>{req.status.replace('_', ' ')}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right pr-8">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-indigo-600"><ArrowRight className="h-4 w-4" /></Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Side: Fast Synergy Panel */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-2xl rounded-[40px] bg-indigo-900 text-white p-8 relative overflow-hidden group">
                                <TrendingUp className="absolute -bottom-10 -right-10 h-40 w-40 text-white opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                                <h4 className="text-xl font-black italic tracking-tighter uppercase mb-6 decoration-indigo-400 underline">Top Fournisseurs</h4>
                                <div className="space-y-5">
                                    {[
                                        { name: "SANOFI BIOTECH", volume: "12.4M F", score: 98, trend: "up" },
                                        { name: "LABOREX SENEGAL", volume: "8.2M F", score: 94, trend: "up" },
                                        { name: "SIGH-TEC MEDICAL", volume: "3.1M F", score: 87, trend: "down" },
                                    ].map((f, i) => (
                                        <div key={i} className="space-y-2 group cursor-pointer">
                                            <div className="flex justify-between items-center px-1">
                                                <div>
                                                    <p className="text-xs font-black uppercase text-indigo-100">{f.name}</p>
                                                    <p className="text-[10px] font-bold text-indigo-400">{f.volume}</p>
                                                </div>
                                                <Badge className="bg-indigo-700 text-indigo-300 border-none font-black text-[9px]">{f.score}%</Badge>
                                            </div>
                                            <Progress value={f.score} className="h-1 bg-indigo-800" indicatorClassName="bg-indigo-400" />
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-10 h-12 rounded-2xl bg-white text-indigo-900 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50">Optimiser les Contrats</Button>
                            </Card>

                            {/* Synergy Links Card */}
                            <Card className="border-none shadow-xl rounded-[40px] p-8 bg-slate-50">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                    <ArrowRight className="h-3 w-3 text-indigo-500" /> Synergy Modules
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-3xl bg-white border border-slate-100 group cursor-pointer hover:border-indigo-200 transition-all shadow-sm shadow-slate-200">
                                        <Package className="h-5 w-5 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-[9px] font-black uppercase text-slate-400">Stocks</p>
                                        <p className="text-[10px] font-black italic text-slate-900">Mise à jour Auto</p>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-white border border-slate-100 group cursor-pointer hover:border-emerald-200 transition-all shadow-sm shadow-slate-200">
                                        <DollarSign className="h-5 w-5 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-[9px] font-black uppercase text-slate-400">Finance</p>
                                        <p className="text-[10px] font-black italic text-slate-900">Dettes Fourn.</p>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-white border border-slate-100 group cursor-pointer hover:border-orange-200 transition-all shadow-sm shadow-slate-200">
                                        <Plus className="h-5 w-5 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-[9px] font-black uppercase text-slate-400">Qualité</p>
                                        <p className="text-[10px] font-black italic text-slate-900">Non-Conformités</p>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-white border border-slate-100 group cursor-pointer hover:border-purple-200 transition-all shadow-sm shadow-slate-200 font-black">
                                        <Building2 className="h-5 w-5 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-[9px] font-black uppercase text-slate-400">Logistique</p>
                                        <p className="text-[10px] font-black italic text-slate-900">Dispatching</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Other Tabs Placeholders */}
                <TabsContent value="suppliers" className="mt-0">
                    <Card className="border-none shadow-2xl rounded-[40px] p-12 text-center bg-white min-h-[400px] flex flex-col items-center justify-center">
                        <Building2 className="h-20 w-20 text-indigo-100 mb-6" />
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900">Référentiel Fournisseurs</h3>
                        <p className="text-slate-400 text-sm max-w-md mx-auto mt-2">Gestion centralisée des contrats, des agréments et de la conformité réglementaire.</p>
                        <Button className="mt-8 bg-indigo-600 rounded-xl px-10">Ajouter un Fournisseur Agréé</Button>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
