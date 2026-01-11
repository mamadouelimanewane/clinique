"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

import { LogOut, Calendar, Home, CheckCircle2, Clock, FileText, ChevronRight, UserMinus, ShieldCheck, Download, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DischargeManagement() {
    // Mock data for discharge planning with premium context
    const discharges = [
        { id: "D1", patient: "Amadou DIOP", chambre: "Suite 101", prévu: "12 janv. 2026", statut: "VALIDÉ", urgence: "Standard" },
        { id: "D2", patient: "Fatou SALL", chambre: "Privée 103", prévu: "13 janv. 2026", statut: "ATTENTE_DOCS", urgence: "Haute" },
        { id: "D3", patient: "Jean MENDY", chambre: "Standard 104", prévu: "15 janv. 2026", statut: "EN_COURS", urgence: "Standard" },
    ]

    const handleDischargeAction = (patientName: string) => {
        toast.success(`Procédure de sortie initiée pour ${patientName}`, {
            description: "Génération du compte-rendu d'hospitalisation et clôture administrative.",
            icon: <Sparkles className="h-4 w-4 text-indigo-500" />
        })
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* Action Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-10 rounded-[40px] shadow-2xl border border-slate-50 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                    <LogOut className="h-60 w-60 text-indigo-900" />
                </div>

                <div className="space-y-3 relative z-10">
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                        Gestion des <span className="text-indigo-600">Sorties</span>
                    </h2>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-indigo-500" /> Clôture clinique et administrative sécurisée
                    </p>
                </div>

                <div className="flex gap-4 relative z-10">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
                                <Plus className="mr-2 h-5 w-5" /> Planifier une sortie
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md border-none rounded-[40px] shadow-2xl p-0 overflow-hidden">
                            <div className="bg-indigo-900 p-8 text-white">
                                <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic">Nouveau Départ</DialogTitle>
                                <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mt-2">Dossier de sortie informatisé</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <Input placeholder="Rechercher patient..." className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                                    <Input type="date" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                                    <Input placeholder="Mode de transport (ex: Ambulance, Famille)" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100">
                                    Valider la planification
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Programmed Discharges List */}
            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-xl">
                <CardHeader className="bg-slate-50 p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-slate-900">Sorties Programmées</CardTitle>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">File active du 11 au 15 janvier 2026</p>
                    </div>
                    <Button variant="ghost" className="h-11 w-11 rounded-xl bg-white shadow-sm border border-slate-100">
                        <Calendar className="h-5 w-5 text-indigo-600" />
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="border-none">
                                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Date Prévue</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Patient & Chambre</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Niveau Urgence</TableHead>
                                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">État Administratif</TableHead>
                                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {discharges.map((d) => (
                                <TableRow key={d.id} className="group hover:bg-indigo-50/30 transition-all border-slate-50">
                                    <TableCell className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                                <Clock className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <span className="font-black text-xs text-slate-900 italic">{d.prévu}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">{d.patient}</span>
                                            <span className="text-[10px] text-indigo-500 font-bold tracking-widest flex items-center gap-1">
                                                <Home className="h-3 w-3" /> {d.chambre}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={cn(
                                            "rounded-full px-4 border-none text-[8px] font-black tracking-widest uppercase",
                                            d.urgence === 'Haute' ? "bg-rose-100 text-rose-600 shadow-sm" : "bg-slate-100 text-slate-400"
                                        )}>
                                            {d.urgence}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {d.statut === 'VALIDÉ' ? (
                                                <Badge className="bg-emerald-100 text-emerald-600 border-none font-black text-[10px] px-3 shadow-inner">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" /> PRÊT
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-amber-100 text-amber-600 border-none font-black text-[10px] px-3">
                                                    <Clock className="h-3 w-3 mr-1" /> EN COURS
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 text-right">
                                        <div className="flex justify-end gap-2 outline-none">
                                            <Button
                                                onClick={() => handleDischargeAction(d.patient)}
                                                className="h-10 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 group-hover:scale-105 transition-all outline-none"
                                            >
                                                Sortir
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl bg-white shadow-sm border border-slate-100">
                                                        <FileText className="h-4 w-4 text-slate-400" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2 font-bold text-xs">
                                                    <DropdownMenuItem className="rounded-xl gap-2"><Download className="h-4 w-4" /> Billet de sortie</DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-xl gap-2"><FileText className="h-4 w-4" /> Résumé clinique</DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-xl gap-2 text-rose-600"><UserMinus className="h-4 w-4" /> Annuler</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
