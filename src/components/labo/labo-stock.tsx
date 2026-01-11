"use client"

import { useState } from "react"
import {
    Beaker,
    Plus,
    Search,
    AlertTriangle,
    Edit,
    Trash2,
    RefreshCcw,
    Package,
    TrendingDown,
    Thermometer,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function LaboStock() {
    const stockItems = [
        { id: "S1", name: "Réactif CRP Roche", category: "Biochimie", qty: 15, unit: "Kits", min: 20, price: 45000, status: "CRITIQUE", lot: "LOT-XP-12", exp: "12/2026" },
        { id: "S2", name: "Lames pour frottis", category: "Hématologie", qty: 850, unit: "Unités", min: 200, price: 150, status: "OK", lot: "LOT-H-88", exp: "-" },
        { id: "S3", name: "Kit NFS Sysmex", category: "Hématologie", qty: 8, unit: "Kits", min: 10, price: 125000, status: "BAS", lot: "S-555-QN", exp: "05/2026" },
        { id: "S4", name: "Cuvettes de réaction", category: "Consommables", qty: 5000, unit: "Unités", min: 1000, price: 25, status: "OK", lot: "C-901", exp: "-" },
    ]

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Stock Header Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-xl rounded-[32px] bg-white overflow-hidden group">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-4 rounded-2xl bg-rose-50 text-rose-600">
                                <AlertTriangle className="h-6 w-6 animate-pulse" />
                            </div>
                            <Badge className="bg-rose-100 text-rose-600 border-none font-black text-[10px]">6 Alertes</Badge>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter text-slate-900">Stocks Critiques</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic">Action immédiate requise</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-slate-900 text-white overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400">
                                <Package className="h-6 w-6" />
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black text-[10px]">128 Items</Badge>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter">Valeur d'Inventaire</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic italic underline decoration-emerald-500">8,450,000 F CFA</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white border border-slate-100 group">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
                                <RefreshCcw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-700" />
                            </div>
                            <Badge className="bg-blue-100 text-blue-600 border-none font-black text-[10px]">3 En transit</Badge>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter text-slate-900">Approvisionnements</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic italic">Livraison prévue demain</p>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-xl">
                <CardHeader className="bg-slate-50 p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-slate-900">Inventaire Réactifs & Consommables</CardTitle>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Traçabilité complète par lot et péremption</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Rechercher..." className="pl-10 h-11 w-64 rounded-xl border-slate-200 bg-white shadow-sm font-bold text-xs" />
                        </div>
                        <Button className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest">
                            <Plus className="h-4 w-4 mr-2" /> Ajouter Stock
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50 italic">
                            <TableRow className="border-none">
                                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Désignation</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Catégorie</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Stock Actuel</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Péremption</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Niveau</TableHead>
                                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stockItems.map((item) => (
                                <TableRow key={item.id} className="group hover:bg-slate-50/50 transition-all border-slate-50 underline-offset-4">
                                    <TableCell className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                                <Beaker className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 uppercase tracking-tighter">{item.name}</div>
                                                <div className="text-[10px] text-slate-400 font-black italic tracking-widest">LOT: {item.lot}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="rounded-lg border-slate-200 text-slate-500 font-black text-[9px] uppercase tracking-widest">{item.category}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 w-24">
                                            <div className="flex justify-between text-[10px] font-black italic">
                                                <span>{item.qty} {item.unit}</span>
                                                <span className="text-slate-300">/ {item.min * 2}</span>
                                            </div>
                                            <Progress
                                                value={(item.qty / (item.min * 2)) * 100}
                                                className={cn(
                                                    "h-1.5",
                                                    item.status === 'CRITIQUE' ? "bg-rose-100" : "bg-emerald-100"
                                                )}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "text-xs font-black italic tracking-tighter",
                                            item.exp !== '-' && item.exp.includes('2026') ? "text-slate-900" : "text-amber-500"
                                        )}>
                                            {item.exp}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn(
                                            "rounded-full px-4 border-none text-[8px] font-black tracking-widest uppercase italic",
                                            item.status === 'CRITIQUE' ? "bg-rose-100 text-rose-600" :
                                                item.status === 'BAS' ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                                        )}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-8 text-right">
                                        <div className="flex justify-end gap-2 outline-none">
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 hover:text-emerald-600">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 hover:text-rose-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
