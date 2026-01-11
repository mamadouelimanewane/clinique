"use client"

import { useState } from "react"
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Activity,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    Filter,
    Download,
    BarChart3,
    PieChart,
    Wallet,
    Info
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function LaboAccounting() {
    const transactions = [
        { id: "T-001", date: "11/01/2026", desc: "Paiement Patient - NFS + Glycémie", cat: "Revenu", amount: 12500, type: "EXTERNAL" },
        { id: "T-002", date: "11/01/2026", desc: "Achat Réactifs - Laborex", cat: "Dépense", amount: 450000, type: "STOCK" },
        { id: "T-003", date: "10/01/2026", desc: "Paiement Patient - Bilan Complet", cat: "Revenu", amount: 35000, type: "INTERNAL" },
        { id: "T-004", date: "10/01/2026", desc: "Assurance AXA - Facturation", cat: "Revenu", amount: 1250000, type: "EXTERNAL" },
    ]

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-2xl rounded-[32px] bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                        <Wallet className="h-40 w-40 text-emerald-400" />
                    </div>
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Chiffre d'Affaires Mensuel</p>
                        <h3 className="text-3xl font-black tracking-tighter mb-4 italic italic uppercase">12,850,000 F</h3>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black text-[9px] px-2 py-0.5">+14.2%</Badge>
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">Vs mois dernier</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white border border-slate-100 overflow-hidden relative group">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">Dépenses Réactifs</p>
                        <h3 className="text-3xl font-black tracking-tighter text-slate-900 mb-4 italic italic uppercase">3,420,000 F</h3>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-rose-50 text-rose-600 border-none font-black text-[9px] px-2 py-0.5">+5.8%</Badge>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic tracking-tighter italic">Augmentation coût intrants</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white border border-slate-100 overflow-hidden relative group">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Marge Nette Labo</p>
                        <h3 className="text-3xl font-black tracking-tighter text-emerald-600 mb-4 italic uppercase">9,430,000 F</h3>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[73%]" />
                            </div>
                            <span className="text-[9px] text-emerald-600 font-black italic tracking-tighter italic whitespace-nowrap">73% Margin</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white border border-slate-100 overflow-hidden relative group">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic tracking-tighter">Paiements en attente</p>
                        <h3 className="text-3xl font-black tracking-tighter text-amber-500 mb-4 italic italic uppercase">1,120,000 F</h3>
                        <div className="flex items-center gap-2 group-hover:scale-105 transition-transform italic underline decoration-amber-500">
                            <TrendingDown className="h-4 w-4 text-amber-500" />
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic tracking-tighter">Recouvrement Assurances</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Financial Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Daily Journal */}
                <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                    <CardHeader className="bg-slate-50 p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-slate-900 italic">Journal des Flux Financiers</CardTitle>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic italic flex items-center gap-2"><Calendar className="h-3 w-3" /> Aujourd'hui, 11 Janvier 2026</p>
                        </div>
                        <div className="flex gap-2 underline decoration-emerald-500 decoration-2">
                            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-white shadow-sm border border-slate-100"><Filter className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-white shadow-sm border border-slate-100"><Download className="h-4 w-4" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-none italic font-black uppercase tracking-tighter">
                                    <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">ID / Date</TableHead>
                                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Description / Catégorie</TableHead>
                                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Montant</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((t) => (
                                    <TableRow key={t.id} className="group hover:bg-slate-50/50 transition-all border-slate-50">
                                        <TableCell className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-900 italic italic">{t.id}</span>
                                                <span className="text-[9px] text-slate-400 font-bold italic tracking-tighter">{t.date}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 uppercase tracking-tighter">{t.desc}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge className={cn(
                                                        "text-[8px] font-black tracking-widest uppercase italic italic",
                                                        t.cat === 'Revenu' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                                    )}>{t.cat}</Badge>
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">{t.type}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-8 text-right">
                                            <span className={cn(
                                                "text-sm font-black italic italic tracking-tighter",
                                                t.cat === 'Revenu' ? "text-emerald-600" : "text-rose-600"
                                            )}>
                                                {t.cat === 'Revenu' ? '+' : '-'} {t.amount.toLocaleString()} F
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Billing Summary / Mini Analytics */}
                <div className="space-y-8 italic tracking-tighter italic">
                    <Card className="border-none shadow-2xl bg-white rounded-[40px] p-8">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 italic italic underline decoration-indigo-500">
                                <BarChart3 className="h-4 w-4 text-indigo-500" /> Structure Revenus
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                            <div className="space-y-3 font-black uppercase italic tracking-tighter italic">
                                <div className="flex justify-between items-center text-[10px] font-black">
                                    <span>Prestations Externes</span>
                                    <span className="text-emerald-500">65%</span>
                                </div>
                                <Progress value={65} className="h-2 bg-slate-100" />
                            </div>
                            <div className="space-y-3 font-black uppercase italic tracking-tighter italic">
                                <div className="flex justify-between items-center text-[10px] font-black">
                                    <span>Analyses Cliniques (Hosp.)</span>
                                    <span className="text-blue-500">25%</span>
                                </div>
                                <Progress value={25} className="h-2 bg-slate-100" />
                            </div>
                            <div className="space-y-3 font-black uppercase italic tracking-tighter italic">
                                <div className="flex justify-between items-center text-[10px] font-black">
                                    <span>Partenariats (B2B)</span>
                                    <span className="text-indigo-500">10%</span>
                                </div>
                                <Progress value={10} className="h-2 bg-slate-100" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-[40px] p-8 italic tracking-tighter italic">
                        <div className="flex justify-between items-start mb-6 italic italic underline decoration-emerald-400">
                            <Activity className="h-10 w-10 text-emerald-300" />
                            <PieChart className="h-6 w-6 opacity-20" />
                        </div>
                        <h4 className="text-xl font-black uppercase italic italic tracking-tighter mb-2 italic">Expertise Comptable</h4>
                        <p className="text-blue-100 text-[10px] font-bold leading-relaxed mb-6 opacity-80 italic tracking-tighter">Votre ratio de rentabilité brute par analyse est de 3.2x, supérieur à la moyenne du secteur (2.8x).</p>
                        <Button className="w-full h-12 bg-white hover:bg-slate-50 text-indigo-700 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Rapport Trimestriel</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
