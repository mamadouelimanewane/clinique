"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2, FileText, CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FacturesList() {
    const router = useRouter()
    const { data: factures, isLoading } = useQuery({
        queryKey: ['factures-list'],
        queryFn: async () => {
            const res = await fetch('/api/facturation')
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json() as Promise<any[]>
        }
    })

    const getStatusBadge = (statut: string) => {
        switch (statut) {
            case 'PAYEE':
                return (
                    <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 py-1 rounded-lg font-black text-[10px] tracking-widest flex items-center gap-1.5 shadow-sm">
                        <CheckCircle className="w-3.5 h-3.5" /> PAYÉE
                    </Badge>
                )
            case 'EN_ATTENTE':
                return (
                    <Badge className="bg-amber-100 text-amber-700 border-none px-3 py-1 rounded-lg font-black text-[10px] tracking-widest flex items-center gap-1.5 shadow-sm">
                        <Clock className="w-3.5 h-3.5" /> EN ATTENTE
                    </Badge>
                )
            case 'ANNULEE':
                return (
                    <Badge className="bg-rose-100 text-rose-700 border-none px-3 py-1 rounded-lg font-black text-[10px] tracking-widest flex items-center gap-1.5 shadow-sm">
                        <AlertCircle className="w-3.5 h-3.5" /> ANNULÉE
                    </Badge>
                )
            default:
                return <Badge variant="outline" className="text-[10px] font-black">{statut}</Badge>
        }
    }

    if (isLoading) {
        return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Summary Cards for Billing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none bg-slate-900 text-white overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp className="h-24 w-24" />
                    </div>
                    <CardContent className="p-6">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Chiffre du Mois</p>
                        <h3 className="text-3xl font-black">12.4M <span className="text-sm">F</span></h3>
                        <div className="flex items-center gap-2 mt-4 text-emerald-400">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-[10px] font-bold">+12% vs mois dernier</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none bg-indigo-600 text-white overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <DollarSign className="h-24 w-24" />
                    </div>
                    <CardContent className="p-6">
                        <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-1">Encaissé Aujourd'hui</p>
                        <h3 className="text-3xl font-black">850K <span className="text-sm">F</span></h3>
                        <div className="flex items-center gap-2 mt-4 text-indigo-200">
                            <Clock className="h-4 w-4" />
                            <span className="text-[10px] font-bold">Dernier encaissement à 15:42</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none bg-rose-500 text-white overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Wallet className="h-24 w-24" />
                    </div>
                    <CardContent className="p-6">
                        <p className="text-xs font-black text-rose-100 uppercase tracking-widest mb-1">Impayés / Créances</p>
                        <h3 className="text-3xl font-black">2.1M <span className="text-sm">F</span></h3>
                        <div className="flex items-center gap-2 mt-4 text-rose-100">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-[10px] font-bold">8 dossiers à relancer</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Facture</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Patient</TableHead>
                                <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Montant Total</TableHead>
                                <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Reste Patient</TableHead>
                                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Statut</TableHead>
                                <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {factures?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-400 font-medium">
                                        Aucune facture pour cette période.
                                    </TableCell>
                                </TableRow>
                            )}
                            {factures?.map((facture) => (
                                <TableRow key={facture.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                    <TableCell className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-mono font-black text-indigo-600 text-xs">{facture.numero}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                {format(new Date(facture.dateEmission), 'dd MMM yyyy')}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-[10px]">
                                                {facture.patient.prenom.charAt(0)}{facture.patient.nom.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-900 uppercase text-xs">
                                                {facture.patient.prenom} {facture.patient.nom}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="font-black text-slate-900">
                                            {new Intl.NumberFormat('fr-SN').format(facture.montantTotal)} <span className="text-[10px]">F</span>
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className={cn(
                                            "font-bold text-xs",
                                            facture.partPatient > 0 ? "text-rose-600" : "text-emerald-600"
                                        )}>
                                            {new Intl.NumberFormat('fr-SN').format(facture.partPatient)} F
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center">
                                            {getStatusBadge(facture.statut)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-8">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => router.push(`/facturation/${facture.id}`)}
                                            className="font-black text-[10px] uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 rounded-xl px-4"
                                        >
                                            Détails
                                        </Button>
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
