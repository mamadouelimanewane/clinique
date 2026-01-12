"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
    Pill,
    Plus,
    Search,
    AlertCircle,
    Trash2,
    Edit,
    ArrowRightLeft,
    CheckCircle2,
    XCircle,
    Package,
    Loader2
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function MedicineInventory() {
    const [searchTerm, setSearchTerm] = useState("")

    const { data: inventory, isLoading } = useQuery({
        queryKey: ['pharmacy-inventory', searchTerm],
        queryFn: async () => {
            const res = await fetch(`/api/pharmacie/inventory?q=${searchTerm}`)
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json()
        }
    })

    const rupturesCount = inventory?.filter((item: any) => item.statut === 'RUPTURE').length || 0
    const critiquesCount = inventory?.filter((item: any) => item.statut === 'CRITIQUE').length || 0
    const totalValue = inventory?.reduce((acc: number, item: any) => acc + (item.prix * item.stockTotal), 0) || 0

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Pharmacy Stock Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-none shadow-xl rounded-[32px] bg-white overflow-hidden group">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                                <Pill className="h-6 w-6" />
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-600 border-none font-black text-[10px]">{inventory?.length || 0} Réf.</Badge>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter text-slate-900">Articles en Stock</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic">Inventaire actif</p>
                    </CardContent>
                </Card>

                <Card className={cn(
                    "border-none shadow-xl rounded-[32px] overflow-hidden group",
                    (rupturesCount + critiquesCount) > 0 ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
                )}>
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-4 rounded-2xl bg-white/20 text-white">
                                <AlertCircle className={cn("h-6 w-6", (rupturesCount + critiquesCount) > 0 && "animate-pulse")} />
                            </div>
                            <Badge className="bg-white/20 text-white border-none font-black text-[10px]">{rupturesCount} Ruptures</Badge>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter">Alertes Critiques</h3>
                        <p className="text-[10px] text-rose-100 font-black uppercase tracking-widest mt-1 italic">
                            {critiquesCount} médicaments en stock bas
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white border border-slate-100 overflow-hidden group">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 text-blue-600">
                                <Package className="h-6 w-6" />
                            </div>
                            <Badge className="bg-blue-100 text-blue-600 border-none font-black text-[10px]">OMS GPP</Badge>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter text-slate-900">Rotation Stock</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic">Flux optimal</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-slate-900 text-white overflow-hidden relative">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Valorisation Vente</p>
                        <h3 className="text-3xl font-black tracking-tighter text-emerald-400 italic uppercase">
                            {totalValue.toLocaleString()} F
                        </h3>
                        <div className="flex items-center gap-2 mt-4">
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black text-[9px] px-2 py-0.5">ESTIMÉ</Badge>
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic tracking-tighter">Valeur totale stock</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-xl">
                <CardHeader className="bg-slate-50 p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-slate-900 italic">Plateforme Inventaire Pharmacie</CardTitle>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Contrôle de stock certifié GPP
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Rechercher médicament..."
                                className="pl-10 h-12 w-64 rounded-2xl border-none bg-white shadow-inner font-bold text-xs focus-visible:ring-emerald-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="h-12 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-200">
                            <Plus className="h-4 w-4 mr-2" /> Nouveau Produit
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50 italic">
                            <TableRow className="border-none">
                                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Désignation / DCI</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Forme / Dosage</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Niveau Stock</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Prix Vente</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">État</TableHead>
                                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Chargement de l'inventaire...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : inventory?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Aucun médicament trouvé</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                inventory?.map((item: any) => (
                                    <TableRow key={item.id} className="group hover:bg-emerald-50/20 transition-all border-slate-50 underline-offset-4">
                                        <TableCell className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-lg group-hover:text-emerald-600 transition-all">
                                                    <Pill className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 uppercase tracking-tighter group-hover:text-emerald-700 transition-colors">{item.nom}</div>
                                                    <div className="text-[10px] text-slate-400 font-black italic tracking-widest uppercase">{item.dci}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black italic">{item.forme}</span>
                                                <span className="text-[10px] text-slate-400 font-bold">{item.dosage}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1 w-24">
                                                <div className="flex justify-between text-[10px] font-black italic">
                                                    <span className={cn(item.stockTotal <= item.min ? "text-rose-600" : "text-emerald-600")}>{item.stockTotal}</span>
                                                    <span className="text-slate-300">/ {item.min * 3}</span>
                                                </div>
                                                <Progress
                                                    value={(Math.min(item.stockTotal, item.min * 3) / (item.min * 3)) * 100}
                                                    className={cn(
                                                        "h-1.5 rounded-full overflow-hidden bg-slate-100",
                                                    )}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-black italic tracking-tighter text-slate-900 italic">
                                                {item.prix.toLocaleString()} F
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "rounded-full px-4 border-none text-[8px] font-black tracking-widest uppercase italic",
                                                item.statut === 'OK' ? "bg-emerald-100 text-emerald-600" :
                                                    item.statut === 'CRITIQUE' ? "bg-rose-100 text-rose-600 animate-pulse" :
                                                        item.statut === 'BAS' ? "bg-amber-100 text-amber-600" : "bg-slate-900 text-white"
                                            )}>
                                                {item.statut}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-8 text-right">
                                            <div className="flex justify-end gap-2 outline-none">
                                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 hover:text-emerald-600 transition-all active:scale-95">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 hover:text-rose-600 transition-all active:scale-95">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
