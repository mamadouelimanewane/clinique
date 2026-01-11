"use client"

import { useState } from "react"
import {
    Calculator,
    TrendingUp,
    Zap,
    ShieldCheck,
    Plus,
    Settings,
    ArrowUpRight,
    Activity,
    Target,
    Users,
    Stethoscope
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export function PricingSystems() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* AI Dynamic Pricing Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] bg-gradient-to-br from-indigo-600 to-indigo-900 text-white p-10 relative overflow-hidden group">
                    <Zap className="absolute -top-10 -right-10 h-64 w-64 text-white opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-indigo-300 animate-pulse" />
                                <p className="text-xs font-black uppercase tracking-[0.4em] text-indigo-200">Moteur de Tarification Dynamique IA</p>
                            </div>
                            <h2 className="text-5xl font-black italic tracking-tighter">Optimisation <span className="text-indigo-400">Automatique</span></h2>
                            <p className="text-sm font-medium text-indigo-100/80 max-w-md leading-relaxed">
                                L'algorithme ajuste les tarifs des consultations "VIP" et "Premium" en fonction de la demande en temps réel et de la charge des spécialistes.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Button className="bg-white text-indigo-900 font-black text-xs h-12 px-8 rounded-2xl shadow-xl">Appliquer Nouveaux Tarifs</Button>
                                <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white font-black text-xs h-12 px-8 rounded-2xl">Paramétrer Courbes</Button>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-indigo-300 uppercase mb-2">Impact Marge</p>
                                <div className="h-24 w-24 rounded-full border-4 border-emerald-400 flex items-center justify-center">
                                    <span className="text-2xl font-black">+14%</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-indigo-300 uppercase mb-2">Taux Adoption</p>
                                <div className="h-24 w-24 rounded-full border-4 border-indigo-400 flex items-center justify-center">
                                    <span className="text-2xl font-black">92%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white p-10 flex flex-col justify-between group overflow-hidden relative">
                    <div className="relative z-10">
                        <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                            <Target className="h-7 w-7 text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight">Objectif <br /><span className="text-indigo-500 text-4xl">Yield Mgmt</span></h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4">Maximisation du CA par Acte</p>
                    </div>
                    <div className="space-y-4 pt-10 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs font-bold uppercase">
                            <span className="text-slate-400 font-black">Score Efficacité</span>
                            <span className="text-indigo-400">Excellent</span>
                        </div>
                        <Progress value={92} className="h-1.5 bg-white/5" indicatorClassName="bg-indigo-500" />
                    </div>
                </Card>
            </div>

            {/* Master Catalog Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                        <CardHeader className="bg-slate-50 p-8 border-b flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Catalogue des Actes & Services</CardTitle>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Nomenclature SIGHI v4.2</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input placeholder="Rechercher par code ou libellé..." className="pl-10 h-10 rounded-xl bg-white border-slate-200 text-xs font-bold" />
                                </div>
                                <Button className="bg-slate-900 rounded-xl font-black text-[9px] uppercase h-10 px-6">Ajouter Acte</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="border-none">
                                        <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Code/Désignation</TableHead>
                                        <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Catégorie</TableHead>
                                        <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Tarif Base</TableHead>
                                        <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Statut IA</TableHead>
                                        <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right pr-8">Ajusté</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { code: "CONS-01", name: "Consultation Spécialiste VIP", cat: "Médecine", price: "25,000 F", ai: "Boost +15%", adj: "28,750 F" },
                                        { code: "SCAN-T01", name: "Scanner Thoracique s/Injection", cat: "Imagerie", price: "85,000 F", ai: "Stable", adj: "85,000 F" },
                                        { code: "LAB-H02", name: "Bilan Hématologique Complet", cat: "Laboratoire", price: "12,500 F", ai: "Optimisé", adj: "13,200 F" },
                                        { code: "CHIR-P04", name: "Pansement Post-Opératoire", cat: "Chirurgie", price: "7,500 F", ai: "Base", adj: "7,500 F" },
                                        { code: "HOSP-S01", name: "Nuitée Suite Prestige", cat: "Hospitalisation", price: "45,000 F", ai: "Boost +20%", adj: "54,000 F" },
                                    ].map((acte, i) => (
                                        <TableRow key={i} className="group border-slate-50 hover:bg-indigo-50/30 transition-all">
                                            <TableCell className="px-8 py-5">
                                                <div>
                                                    <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">{acte.code}</p>
                                                    <p className="text-xs font-bold text-slate-900 uppercase italic tracking-tight">{acte.name}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="border-slate-200 text-slate-500 text-[8px] font-black tracking-widest uppercase">{acte.cat}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-black text-slate-400 text-xs line-through">{acte.price}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={cn(
                                                    "font-black text-[8px] tracking-widest px-3 py-1 rounded-md border-none italic",
                                                    acte.ai.includes("+") ? "bg-indigo-100 text-indigo-700 underline" :
                                                        acte.ai === "Stable" ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-700"
                                                )}>{acte.ai}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <span className="font-black text-slate-900 flex items-center justify-end gap-1">
                                                    {acte.adj}
                                                    {acte.ai.includes("+") && <ArrowUpRight className="h-3 w-3 text-indigo-600" />}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* Specialty Margins */}
                    <Card className="border-none shadow-2xl rounded-[40px] p-8 bg-slate-900 text-white">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-8 italic border-b border-indigo-500/20 pb-4">Performance Pôles</h4>
                        <div className="space-y-6">
                            {[
                                { pole: "Radiologie", margin: 42, color: "text-indigo-400" },
                                { pole: "Cardiologie", margin: 28, color: "text-blue-400" },
                                { pole: "Laboratoire", margin: 35, color: "text-emerald-400" },
                                { pole: "Maternité", margin: 18, color: "text-rose-400" },
                            ].map((p, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase">
                                        <span>{p.pole}</span>
                                        <span className={p.color}>{p.margin}% MARGE</span>
                                    </div>
                                    <Progress value={p.margin} className="h-1 bg-white/10" indicatorClassName={cn(
                                        p.pole === "Radiologie" ? "bg-indigo-500" :
                                            p.pole === "Cardiologie" ? "bg-blue-500" :
                                                p.pole === "Laboratoire" ? "bg-emerald-500" : "bg-rose-500"
                                    )} />
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-10 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest h-12 rounded-2xl">Audit Coûts vs Tarifs</Button>
                    </Card>

                    {/* Quick Config */}
                    <Card className="border-none shadow-xl rounded-[40px] p-8 bg-slate-50 group hover:shadow-2xl transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <Settings className="h-5 w-5 text-slate-900 group-hover:rotate-90 transition-transform duration-500" />
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 italic underline">Global Pricing Multiplier</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span>Multiplicateur VIP</span>
                                <Badge className="bg-slate-900 text-white">x1.25</Badge>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span>Remise État/IPRES</span>
                                <Badge className="bg-slate-200 text-slate-600 font-black">-15%</Badge>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
