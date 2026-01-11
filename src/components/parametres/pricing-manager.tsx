"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileSpreadsheet, Download, Plus, Search, Tag, Settings2, Stethoscope, TrendingUp, Activity, Zap } from "lucide-react"
import { toast } from "sonner"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export function PricingManager() {
    const [activeTab, setActiveTab] = useState<'actes' | 'pharmacie' | 'articles'>('actes')
    const [loading, setLoading] = useState(false)

    const exportData = (format: 'XLS' | 'CSV') => {
        toast.success(`Export ${format} généré avec succès !`)
    }

    const ACTES_DATA = [
        { code: "CS01", libelle: "Consultation Généraliste", prix: 10000, cout: 2000, margin: 80, trend: "+2%" },
        { code: "CS02", libelle: "Consultation Spécialiste", prix: 25000, cout: 5000, margin: 80, trend: "+5%" },
        { code: "RX01", libelle: "Radiographie Thorax", prix: 15000, cout: 4500, margin: 70, trend: "-1%" },
        { code: "LB01", libelle: "Numération Globulaire (NFS)", prix: 8500, cout: 1500, margin: 82, trend: "+0.5%" },
    ]

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* High-End Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 rotate-3">
                            <Tag className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Grille <span className="text-indigo-600">Tarifaire</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Catalogue Officiel • Optimisation des Marges • Pricing IA
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex gap-2" onClick={() => exportData('XLS')}>
                        <FileSpreadsheet className="h-4 w-4" /> Export Master
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <Plus className="h-5 w-5" /> Nouvel Acte
                    </Button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "Chiffre d'Affaire Estimé", value: "45.2M", icon: TrendingUp, color: "indigo", unit: "FCFA" },
                    { label: "Marge Nette Moyenne", value: "72.4", icon: Activity, color: "emerald", unit: "%" },
                    { label: "Index Inflation Médicale", value: "4.8", icon: Zap, color: "amber", unit: "%" },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl rounded-[35px] overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg",
                                    stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600 shadow-indigo-100" :
                                        stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600 shadow-emerald-100" : "bg-amber-50 text-amber-600 shadow-amber-100"
                                )}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <Badge className="bg-slate-50 text-slate-400 border-none font-black text-[9px]">LIVE</Badge>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</h4>
                                <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter">
                                    {stat.value} <span className="text-sm font-bold text-slate-400 uppercase ml-1">{stat.unit}</span>
                                </h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="actes" className="space-y-10" onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="bg-slate-100/50 rounded-[30px] p-2 h-[80px] shadow-inner border border-slate-200 flex overflow-x-auto justify-start scrollbar-hide w-full gap-2">
                    {[
                        { val: "actes", label: "Nomenclature Actes", icon: Stethoscope },
                        { val: "pharmacie", label: "Catalogue Pharmacie", icon: Tag },
                        { val: "articles", label: "Articles Logistique", icon: Settings2 },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full rounded-[22px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-all gap-3 border border-transparent data-[state=active]:border-indigo-50">
                            <t.icon className="h-4 w-4" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="actes" className="mt-0">
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                        <CardHeader className="bg-slate-50/50 p-8 border-b flex flex-row items-center justify-between">
                            <div className="relative w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input placeholder="Rechercher par code ou libellé..." className="h-14 pl-12 rounded-[22px] border-none bg-white shadow-inner font-bold text-sm" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="border-none">
                                        <TableHead className="px-8 h-16 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Code/Désignation</TableHead>
                                        <TableHead className="h-16 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-right">Prix HT</TableHead>
                                        <TableHead className="h-16 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-right">Prix Public</TableHead>
                                        <TableHead className="h-16 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-center">Marge (%)</TableHead>
                                        <TableHead className="h-16 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-right pr-8">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ACTES_DATA.map((item, i) => (
                                        <TableRow key={i} className="group border-slate-50 hover:bg-slate-50/80 transition-all">
                                            <TableCell className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">{item.code}</span>
                                                    <span className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{item.libelle}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-slate-400 italic text-xs">{(item.prix * 0.82).toLocaleString()} F</TableCell>
                                            <TableCell className="text-right font-black text-slate-900 text-sm">{item.prix.toLocaleString()} F</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[9px] px-3 py-1">{item.margin}%</Badge>
                                                    <span className={cn("text-[8px] font-black", item.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
                                                        {item.trend} VS Q3
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                                    <Settings2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
