"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Beaker, FileText, CheckCircle, Clock, FlaskConical as Flask, Zap, ShieldCheck, Thermometer, Pipette, Microchip, Search, Filter, AlertTriangle } from "lucide-react"

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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LaboResultForm } from "./labo-result-form"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export function LaboWorklist() {
    const queryClient = useQueryClient()
    const [selectedRequest, setSelectedRequest] = useState<any>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { data: demands, isLoading } = useQuery({
        queryKey: ['labo-demands'],
        queryFn: async () => {
            const res = await fetch('/api/labo?status=pending')
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json() as Promise<any[]>
        }
    })

    const stats = [
        { label: "En attente", value: demands?.length || 0, icon: Clock, color: "indigo" },
        { label: "Urgences (STAT)", value: "2", icon: AlertTriangle, color: "rose" },
        { label: "Prélèvements faits", value: "14", icon: CheckCircle, color: "emerald" },
    ]

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Action Bar & Stats */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Flask className="h-40 w-40 text-indigo-900" />
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                    <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic flex items-center gap-3">
                        Worklist <span className="text-indigo-600">Labo</span> <Pipette className="h-6 w-6 text-indigo-400" />
                    </h2>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-indigo-500" /> Système d'analyse certifié ISO-15189
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto relative z-10">
                    {stats.map((s, i) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 min-w-[180px]">
                            <div className={cn(
                                "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110",
                                s.color === 'indigo' ? 'bg-indigo-600 text-white shadow-indigo-100' :
                                    s.color === 'rose' ? 'bg-rose-600 text-white shadow-rose-100' :
                                        'bg-emerald-600 text-white shadow-emerald-100'
                            )}>
                                <s.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                                <p className="text-2xl font-black text-slate-900 tracking-tighter">{isLoading ? "..." : s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Table */}
            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                <CardHeader className="bg-indigo-900 text-white p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                                <Microchip className="h-5 w-5 text-indigo-300" />
                            </div>
                            <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Analyses en attente de traitement</CardTitle>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <Input placeholder="Rechercher analyse..." className="bg-white/10 border-none text-white pl-10 h-11 rounded-xl focus-visible:ring-indigo-400 placeholder:text-indigo-300/50 font-medium" />
                            </div>
                            <Button variant="ghost" className="h-11 w-11 p-0 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
                                <Filter className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest animate-pulse">Chargement de la file d'attente...</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-none">
                                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Arrivée</TableHead>
                                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Patient / Dossier</TableHead>
                                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Type d'analyse</TableHead>
                                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Prescripteur</TableHead>
                                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {demands?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-48">
                                            <div className="flex flex-col items-center gap-3 opacity-20">
                                                <Beaker className="h-16 w-16" />
                                                <p className="text-xs font-black uppercase tracking-widest">Le labo est à jour</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {demands?.map((dem) => (
                                    <TableRow key={dem.id} className="group hover:bg-indigo-50/30 transition-all border-slate-50">
                                        <TableCell className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3 w-3 text-indigo-400" />
                                                <span className="text-[10px] font-black text-slate-400 italic">
                                                    {format(new Date(dem.createdAt), "HH:mm", { locale: fr })}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">
                                                    {dem.consultation.patient.prenom} {dem.consultation.patient.nom}
                                                </span>
                                                <span className="text-[9px] text-slate-400 font-bold tracking-widest italic">{dem.consultation.patient.numeroPatient}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-indigo-50 text-indigo-700 border-none font-black text-[9px] px-3 py-1 rounded-lg uppercase tracking-widest italic">
                                                {dem.acte.libelle}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">Dr</div>
                                                <span className="text-xs font-bold text-slate-700">{dem.consultation.medecin.nom}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-8 text-right">
                                            <Button
                                                onClick={() => {
                                                    setSelectedRequest(dem)
                                                    setIsDialogOpen(true)
                                                }}
                                                className="h-10 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 group-hover:scale-105 transition-all"
                                            >
                                                Résultats
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl border-none rounded-[40px] shadow-2xl p-0 overflow-hidden">
                    <div className="bg-indigo-900 p-8 text-white relative">
                        <DialogHeader>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <Flask className="h-6 w-6 text-indigo-300" />
                                </div>
                                <div className="text-left">
                                    <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic">Saisie des Résultats</DialogTitle>
                                    <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mt-1">Analyse : {selectedRequest?.acte?.libelle}</p>
                                </div>
                            </div>
                        </DialogHeader>
                    </div>
                    <div className="p-8">
                        {selectedRequest && (
                            <LaboResultForm
                                acteRealiseId={selectedRequest.id}
                                patientName={`${selectedRequest.consultation.patient.prenom} ${selectedRequest.consultation.patient.nom}`}
                                onSuccess={() => {
                                    setIsDialogOpen(false)
                                    queryClient.invalidateQueries({ queryKey: ['labo-demands'] })
                                }}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
