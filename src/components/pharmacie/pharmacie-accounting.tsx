"use client"

import { useState } from "react"
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    Filter,
    Download,
    BarChart3,
    PieChart,
    Wallet,
    Receipt,
    CreditCard
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function PharmacieAccounting() {
    const transactions = [
        { id: "V-2026-102", date: "11/01/2026", desc: "Vente Comptoir - Ticket #4042", cat: "Revenu", amount: 45000, method: "CASH" },
        { id: "A-2026-005", date: "11/01/2026", desc: "Commande Laborex - Antibiotiques", cat: "Dépense", amount: 1250000, method: "VIREMENT" },
        { id: "V-2026-101", date: "11/01/2026", desc: "Prise en charge IPM - Patient X", cat: "Revenu", amount: 12500, method: "ASSURANCE" },
        { id: "V-2026-100", date: "10/01/2026", desc: "Vente Comptoir - Ticket #4041", cat: "Revenu", amount: 8500, method: "WAVE" },
    ]

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-2xl rounded-[32px] bg-emerald-600 text-white overflow-hidden relative">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-2">Ventes du Mois (HT)</p>
                        <h3 className="text-3xl font-black tracking-tighter mb-4 italic uppercase">18,450,000 F</h3>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-white/20 text-white border-none font-black text-[9px] px-2 py-0.5">+8.2%</Badge>
                            <span className="text-[9px] text-emerald-100 font-bold uppercase tracking-widest italic">Vs mois dernier</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white border border-slate-100 overflow-hidden relative group">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">Achats Fournisseurs</p>
                        <h3 className="text-3xl font-black tracking-tighter text-slate-900 mb-4 italic uppercase">12,180,000 F</h3>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-rose-50 text-rose-600 border-none font-black text-[9px] px-2 py-0.5">+12%</Badge>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic tracking-tighter">Réapprovisionnement massif</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white border border-slate-100 overflow-hidden relative group">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic underline decoration-emerald-500">Marge Commerciale</p>
                        <h3 className="text-3xl font-black tracking-tighter text-emerald-600 mb-4 italic uppercase">6,270,000 F</h3>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic tracking-tighter">Marge cible atteinte</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-slate-900 text-white overflow-hidden relative">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Encaisse Coffre</p>
                        <h3 className="text-3xl font-black tracking-tighter text-blue-400 italic uppercase">2,450,000 F</h3>
                        <div className="flex items-center gap-2 mt-4">
                            <CreditCard className="h-4 w-4 text-blue-400" />
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic tracking-tighter">Saisie caisse de 13h</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Financial Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Journal */}
                <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                    <CardHeader className="bg-slate-50 p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-slate-900 italic">Journal des Ventes & Achats</CardTitle>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic italic flex items-center gap-2"><Calendar className="h-3 w-3" /> Aujourd'hui, 11 Janvier 2026</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-white shadow-sm border border-slate-100"><Filter className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-white shadow-sm border border-slate-100"><Download className="h-4 w-4" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-none italic font-black uppercase tracking-tighter">
                                    <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Référence</TableHead>
                                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Objet / Mode</TableHead>
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
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-1">
                                                        <Receipt className="h-3 w-3" /> {t.method}
                                                    </span>
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

                {/* Dashboard Side Widgets */}
                <div className="space-y-8 italic tracking-tighter italic">
                    <Card className="border-none shadow-2xl bg-white rounded-[40px] p-8 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                            <PieChart className="h-24 w-24 text-emerald-600" />
                        </div>
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 italic italic underline decoration-emerald-500">
                                <BarChart3 className="h-4 w-4 text-emerald-500" /> Analyse Tiers-Payant
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                            <div className="space-y-3 font-black uppercase italic tracking-tighter">
                                <div className="flex justify-between items-center text-[10px]">
                                    <span>Assurances (AXA, NSIA)</span>
                                    <span className="text-emerald-500">55%</span>
                                </div>
                                <Progress value={55} className="h-2 bg-slate-100" />
                            </div>
                            <div className="space-y-3 font-black uppercase italic tracking-tighter">
                                <div className="flex justify-between items-center text-[10px]">
                                    <span>IPM / Entreprises</span>
                                    <span className="text-blue-500">30%</span>
                                </div>
                                <Progress value={30} className="h-2 bg-slate-100" />
                            </div>
                            <div className="space-y-3 font-black uppercase italic tracking-tighter">
                                <div className="flex justify-between items-center text-[10px]">
                                    <span>Comptoir (Direct)</span>
                                    <span className="text-slate-400">15%</span>
                                </div>
                                <Progress value={15} className="h-2 bg-slate-100" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-[40px] p-8 italic tracking-tighter italic overflow-hidden relative">
                        <div className="absolute -left-4 -bottom-4 opacity-5 pointer-events-none">
                            <ShoppingCart className="h-40 w-40 text-emerald-400" />
                        </div>
                        <div className="flex justify-between items-start mb-6">
                            <Receipt className="h-10 w-10 text-emerald-400" />
                            <Badge className="bg-emerald-500 text-white border-none font-black text-[9px] uppercase tracking-widest">Optimisé</Badge>
                        </div>
                        <h4 className="text-xl font-black uppercase italic italic tracking-tighter mb-2 italic">Performance Achat</h4>
                        <p className="text-slate-400 text-[10px] font-bold leading-relaxed mb-6 opacity-80 italic tracking-tighter italic">Grâce à la centrale d'achat groupée, vous avez économisé 854,000 F ce mois-ci sur les génériques.</p>
                        <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95">Voir Optimisations</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
