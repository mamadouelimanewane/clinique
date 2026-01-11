"use client"

import { useState } from "react"
import { Zap, ShieldCheck, Thermometer, FlaskConical, Pill, Package, AlertTriangle, ArrowUpRight, ArrowDownLeft, Search, Plus, History, ShoppingCart, BarChart3, Truck, Activity, Box, Download, Target, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicineInventory } from "./medicine-inventory"
import { DispensationModule } from "./dispensation-module"
import { StockMovementLog } from "./stock-movement-log"
import { ProcurementModule } from "./procurement-module"
import { PharmacieAccounting } from "./pharmacie-accounting"

export function PharmacieDashboard() {
    const metrics = [
        { label: "Articles en Stock", value: "1,284", sub: "+12 nouveaux", trend: "+2.4%", icon: Box, color: "emerald" },
        { label: "Alertes Rupture", value: "18", sub: "5 critiques", trend: "Attention", icon: AlertTriangle, color: (s: any) => s.value > 10 ? "rose" : "amber", pulse: true },
        { label: "Approvisionnements", value: "3", sub: "En transit", trend: "Logistique", icon: Truck, color: "blue" },
        { label: "Chiffre d'Affaire (J)", value: "842,500 F", sub: "45 ventes", trend: "+15%", icon: Activity, color: "slate", dark: true },
    ]

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-[30px] bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-2xl shadow-emerald-200">
                        <Pill className="h-10 w-10 text-white" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                            Smart <span className="text-emerald-600">Pharmacie</span>
                        </h2>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Gestion des stocks certifiée OMS/GAMP5
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full lg:w-auto">
                    <Button variant="outline" className="h-14 rounded-2xl border-slate-200 font-black px-8 uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">
                        <Download className="mr-2 h-4 w-4" /> Export Stock
                    </Button>
                    <Button className="h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black px-8 shadow-2xl shadow-emerald-200 uppercase text-[10px] tracking-widest italic tracking-tight">
                        <Plus className="mr-2 h-5 w-5" /> Entrée de Stock
                    </Button>
                </div>
            </div>

            {/* Premium Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <Card key={i} className={cn(
                        "group border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden",
                        m.dark ? "bg-slate-900 text-white" : "bg-white/80 backdrop-blur-sm border border-white/20"
                    )}>
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className={cn(
                                    "p-4 rounded-2xl shadow-inner",
                                    m.dark ? "bg-white/10 text-emerald-400" :
                                        (typeof m.color === 'string' ? `bg-${m.color}-50 text-${m.color}-600` : "bg-rose-50 text-rose-600")
                                )}>
                                    <m.icon className={cn("h-6 w-6", m.pulse && "animate-pulse")} />
                                </div>
                                <Badge className={cn(
                                    "border-none px-3 py-1 font-black text-[10px] rounded-full",
                                    m.dark ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-100 text-slate-500"
                                )}>
                                    {m.trend}
                                </Badge>
                            </div>
                            <div className="space-y-1">
                                <p className={cn(
                                    "text-[10px] font-black uppercase tracking-widest",
                                    m.dark ? "text-slate-500" : "text-slate-400"
                                )}>{m.label}</p>
                                <h3 className="text-3xl font-black tracking-tighter">{m.value}</h3>
                                <p className={cn(
                                    "text-[10px] font-bold italic",
                                    m.dark ? "text-emerald-400/60" : "text-slate-400"
                                )}>{m.sub}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Tabs System */}
            <Tabs defaultValue="ventes" className="space-y-10">
                <TabsList className="bg-slate-100 rounded-[30px] p-2 h-[72px] shadow-inner mb-8">
                    {[
                        { val: "ventes", label: "Vente & Sortie", icon: ShoppingCart },
                        { val: "inventaire", label: "Inventaire", icon: Package },
                        { val: "achats", label: "Achats", icon: Truck },
                        { val: "finance", label: "Finance & Compta", icon: DollarSign },
                        { val: "logs", label: "Traçabilité", icon: History },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full min-w-[170px] rounded-[24px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-emerald-600 font-extrabold text-[11px] uppercase tracking-widest transition-all">
                            <t.icon className="h-4 w-4 mr-3" />
                            {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <TabsContent value="ventes">
                        <DispensationModule />
                    </TabsContent>
                    <TabsContent value="inventaire">
                        <MedicineInventory />
                    </TabsContent>
                    <TabsContent value="achats">
                        <ProcurementModule />
                    </TabsContent>
                    <TabsContent value="finance">
                        <PharmacieAccounting />
                    </TabsContent>
                    <TabsContent value="logs">
                        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[32px] shadow-xl border border-slate-50 mb-6 gap-6">
                            <h3 className="text-2xl font-black uppercase tracking-tighter italic">Journal des <span className="text-emerald-600">Mouvements</span></h3>
                            <Button variant="outline" className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest border-slate-200">
                                <Download className="h-4 w-4 mr-2" /> Exporter le Log Complet
                            </Button>
                        </div>
                        <StockMovementLog />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
