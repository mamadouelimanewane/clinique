"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
    BarChart3,
    PieChart,
    FileText,
    ArrowRightLeft,
    Download,
    Filter,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    TrendingUp,
    ShieldCheck,
    Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function StatesDashboard() {
    const { data: balance, isLoading } = useQuery({
        queryKey: ['compta-balance'],
        queryFn: async () => {
            const res = await fetch('/api/comptabilite/balance')
            if (!res.ok) throw new Error('Erreur chargement balance')
            return res.json()
        }
    })

    const totalDebit = balance?.reduce((acc: number, item: any) => acc + Number(item.totalDebit), 0) || 0
    const totalCredit = balance?.reduce((acc: number, item: any) => acc + Number(item.totalCredit), 0) || 0

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-[30px] bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-indigo-200">
                        <BarChart3 className="h-10 w-10 text-white" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                            États <span className="text-indigo-600">Financiers</span>
                        </h2>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1 flex items-center gap-2">
                            Systeme Comptable OHADA (SYSCOA)
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full lg:w-auto">
                    <Button variant="outline" className="h-14 rounded-2xl border-slate-200 font-black px-8 uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">
                        <Download className="mr-2 h-4 w-4" /> Export PDF
                    </Button>
                    <Button className="h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black px-8 shadow-2xl shadow-indigo-200 uppercase text-[10px] tracking-widest italic tracking-tight">
                        <Filter className="mr-2 h-4 w-4" /> Période
                    </Button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-xl rounded-[32px] bg-white overflow-hidden group">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                                <ArrowUpRight className="h-6 w-6" />
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-600 border-none font-black text-[10px]">EQUILIBRÉ</Badge>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Débit</p>
                        <h3 className="text-3xl font-black tracking-tighter text-slate-900">{totalDebit.toLocaleString()} F</h3>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white overflow-hidden group">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-rose-50 text-rose-600">
                                <ArrowDownLeft className="h-6 w-6" />
                            </div>
                            <Badge className="bg-rose-100 text-rose-600 border-none font-black text-[10px]">EQUILIBRÉ</Badge>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Crédit</p>
                        <h3 className="text-3xl font-black tracking-tighter text-slate-900">{totalCredit.toLocaleString()} F</h3>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-slate-900 text-white overflow-hidden group">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-white/10 text-emerald-400">
                                <Wallet className="h-6 w-6" />
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black text-[10px]">NET</Badge>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Solde de Période</p>
                        <h3 className="text-3xl font-black tracking-tighter text-white">{(totalDebit - totalCredit).toLocaleString()} F</h3>
                    </CardContent>
                </Card>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="balance" className="space-y-8">
                <TabsList className="bg-slate-100 rounded-[24px] p-2 h-[64px] shadow-inner">
                    <TabsTrigger value="balance" className="h-full rounded-[18px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-indigo-600 font-extrabold text-[11px] uppercase tracking-widest transition-all">
                        Balance des Comptes
                    </TabsTrigger>
                    <TabsTrigger value="grandlivre" className="h-full rounded-[18px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-indigo-600 font-extrabold text-[11px] uppercase tracking-widest transition-all">
                        Grand Livre
                    </TabsTrigger>
                    <TabsTrigger value="resultat" className="h-full rounded-[18px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-indigo-600 font-extrabold text-[11px] uppercase tracking-widest transition-all">
                        Compte de Résultat
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="balance" className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-xl">
                        <CardHeader className="p-8 bg-slate-50 border-b border-slate-100">
                            <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Balance Générale des Comptes</CardTitle>
                            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-400">Période du 01/01/2026 au 31/12/2026</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 border-none">
                                        <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest h-14">Numéro</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest h-14">Intitulé du Compte</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest h-14 text-right">Débit</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest h-14 text-right">Crédit</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest h-14 text-right px-8">Solde</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-32 text-center">
                                                <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
                                            </TableCell>
                                        </TableRow>
                                    ) : balance?.map((row: any) => {
                                        const solde = row.totalDebit - row.totalCredit
                                        return (
                                            <TableRow key={row.numero} className="hover:bg-indigo-50/20 border-slate-50">
                                                <TableCell className="px-8 py-4 font-black text-xs text-indigo-600">{row.numero}</TableCell>
                                                <TableCell className="font-bold text-slate-700 text-xs">{row.libelle}</TableCell>
                                                <TableCell className="text-right font-mono text-xs">{Number(row.totalDebit).toLocaleString()}</TableCell>
                                                <TableCell className="text-right font-mono text-xs">{Number(row.totalCredit).toLocaleString()}</TableCell>
                                                <TableCell className={cn(
                                                    "text-right font-black text-xs px-8",
                                                    solde >= 0 ? "text-emerald-600" : "text-rose-600"
                                                )}>
                                                    {solde.toLocaleString()} F
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="grandlivre" className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[40px] shadow-xl border border-dashed border-slate-200">
                        <ArrowRightLeft className="h-12 w-12 text-slate-200 mb-4" />
                        <h3 className="text-lg font-black uppercase tracking-tighter text-slate-400 italic">Consultation détaillée du Grand Livre</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Module en cours de déploiement...</p>
                    </div>
                </TabsContent>

                <TabsContent value="resultat" className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[40px] shadow-xl border border-dashed border-slate-200">
                        <TrendingUp className="h-12 w-12 text-slate-200 mb-4" />
                        <h3 className="text-lg font-black uppercase tracking-tighter text-slate-400 italic">Analyse des Produits & Charges</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Calcul du résultat OHADA en cours...</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
