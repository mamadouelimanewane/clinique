"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2, ArrowUpCircle, ArrowDownCircle, History, Filter } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Ecriture = {
    id: string
    dateEcriture: string
    journal: { code: string; libelle: string }
    compte: { numero: string; libelle: string }
    libelle: string
    debit: number
    credit: number
    pieceRef: string | null
    createdBy: { nom: string; prenom: string }
}

export function EcrituresList() {
    const { data: ecritures, isLoading } = useQuery<Ecriture[]>({
        queryKey: ['ecritures-list'],
        queryFn: async () => {
            const res = await fetch('/api/comptabilite/ecritures?limit=10')
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json()
        }
    })

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="h-10 w-10 animate-spin text-emerald-600 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronisation du Grand Livre...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="rounded-[32px] border border-slate-100 bg-white/50 backdrop-blur-sm shadow-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-none hover:bg-transparent">
                            <TableHead className="px-6 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Flux Date</TableHead>
                            <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Jnl</TableHead>
                            <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Compte (SYSCOA)</TableHead>
                            <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Désignation</TableHead>
                            <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Débit</TableHead>
                            <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Crédit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ecritures?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-40 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <History className="h-8 w-8 text-slate-200" />
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Aucun flux enregistré sur cet exercice</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            ecritures?.map((ecriture) => (
                                <TableRow key={ecriture.id} className="group hover:bg-emerald-50/10 border-slate-50 transition-colors">
                                    <TableCell className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 text-xs">{format(new Date(ecriture.dateEcriture), 'dd MMM yyyy')}</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Réceptionné</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-slate-900 text-white border-none rounded-lg font-black text-[9px] px-2 py-0.5 shadow-lg">
                                            {ecriture.journal.code}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-emerald-700 font-extrabold text-xs">{ecriture.compte.numero}</span>
                                            <span className="text-[9px] text-slate-400 font-medium truncate max-w-[120px]">{ecriture.compte.libelle}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-700 text-xs truncate max-w-[180px]">{ecriture.libelle}</span>
                                            <span className="text-[9px] text-slate-400 italic">Réf: {ecriture.pieceRef || "N/A"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {ecriture.debit > 0 ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="font-black text-slate-900 font-mono text-sm">{new Intl.NumberFormat('fr-SN').format(ecriture.debit)}</span>
                                                <ArrowUpCircle className="h-3 w-3 text-emerald-500" />
                                            </div>
                                        ) : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {ecriture.credit > 0 ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="font-black text-slate-900 font-mono text-sm">{new Intl.NumberFormat('fr-SN').format(ecriture.credit)}</span>
                                                <ArrowDownCircle className="h-3 w-3 text-rose-500" />
                                            </div>
                                        ) : "-"}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Flux Entrants</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Flux Sortants</span>
                    </div>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 flex items-center gap-2 transition-colors">
                    <Filter className="h-3 w-3" /> Voir le Grand Livre complet
                </button>
            </div>
        </div>
    )
}
