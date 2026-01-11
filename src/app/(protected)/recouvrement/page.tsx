"use client"

import { useQuery } from "@tanstack/react-query"
import { Loader2, DollarSign, Clock, AlertTriangle, PhoneCall, TrendingDown, TrendingUp, Filter, Search, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function RecouvrementPage() {
    const { data: unpaidFactures, isLoading } = useQuery({
        queryKey: ['unpaid-factures'],
        queryFn: async () => {
            const res = await fetch('/api/facturation?statut=IMPAYEE')
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json() as Promise<any[]>
        }
    })

    const metrics = [
        { label: "Total Créances", value: "1.450.000 F", trend: "+12.5%", color: "rose", icon: DollarSign },
        { label: "Retard Critique", value: "450.320 F", trend: "+5.2%", color: "amber", icon: Clock },
        { label: "Taux de Recouvrement", value: "88%", trend: "-2.1%", color: "indigo", icon: TrendingUp },
        { label: "Relances cette semaine", value: "24", trend: "+8", color: "emerald", icon: PhoneCall },
    ]

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                        Gestion du <span className="text-indigo-600">Recouvrement</span>
                    </h2>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" /> Optimisation des flux de trésorerie et relances clients
                    </p>
                </div>
                <div className="flex gap-3 w-full lg:w-auto">
                    <Button variant="outline" className="h-12 rounded-2xl border-slate-200 font-bold px-6">
                        <Download className="mr-2 h-4 w-4" /> Rapport Mensuel
                    </Button>
                    <Button className="h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold px-6 shadow-lg shadow-indigo-100 italic tracking-tight">
                        Nouvelle Campagne Relance
                    </Button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <Card key={i} className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn(
                                    "p-3 rounded-2xl shadow-inner",
                                    m.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                                        m.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                            m.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                                                'bg-emerald-50 text-emerald-600'
                                )}>
                                    <m.icon className="h-6 w-6" />
                                </div>
                                <Badge className={cn(
                                    "border-none px-3 py-1 font-black text-[10px]",
                                    m.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    {m.trend}
                                </Badge>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{m.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Debt List Table */}
            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                <CardHeader className="bg-slate-900 text-white p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Détail des Créances en Attente</CardTitle>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <Input placeholder="Rechercher patient..." className="bg-slate-800 border-none text-white pl-10 h-11 rounded-xl focus-visible:ring-indigo-500 placeholder:text-slate-500 font-medium" />
                            </div>
                            <Button variant="ghost" className="h-11 w-11 p-0 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white transition-all">
                                <Filter className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Analyse du grand livre...</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-none">
                                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Référence</TableHead>
                                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Débiteur (Patient / Assurance)</TableHead>
                                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Âge Créance</TableHead>
                                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Reste à Recouvrer</TableHead>
                                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { ref: "FAC-2026-0042", patient: "Mamadou FALL", assurance: "IPM Sonatel (70%)", date: "02/01/2026", montant: "45.000 F", age: "9 jours", status: "NORMAL" },
                                    { ref: "FAC-2026-0038", patient: "Fatou NDIAYE", assurance: "Direct (100%)", date: "15/12/2025", montant: "125.000 F", age: "27 jours", status: "ALERTE" },
                                    { ref: "FAC-2026-0012", patient: "Amadou DIOP", assurance: "Allianz (80%)", date: "01/11/2025", montant: "850.000 F", age: "71 jours", status: "CRITIQUE" },
                                ].map((row, i) => (
                                    <TableRow key={i} className="group hover:bg-indigo-50/30 transition-colors border-slate-50">
                                        <TableCell className="px-8 py-5 font-black text-xs text-slate-400 uppercase tracking-tighter group-hover:text-indigo-600">
                                            {row.ref}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 uppercase tracking-tighter">{row.patient}</span>
                                                <span className="text-[10px] text-slate-400 font-bold">{row.assurance}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={cn(
                                                "rounded-full px-4 border-none text-[8px] font-black tracking-widest transition-all group-hover:scale-105",
                                                row.status === 'CRITIQUE' ? "bg-rose-100 text-rose-600 shadow-lg shadow-rose-200" :
                                                    row.status === 'ALERTE' ? "bg-amber-100 text-amber-600" :
                                                        "bg-slate-100 text-slate-400"
                                            )}>
                                                {row.age}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right py-5 px-4 font-black text-lg tracking-tighter text-slate-900">
                                            {row.montant}
                                        </TableCell>
                                        <TableCell className="px-8 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-white hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">
                                                    <PhoneCall className="h-4 w-4" />
                                                </Button>
                                                <Button className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white border-none text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all">
                                                    Détails
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
