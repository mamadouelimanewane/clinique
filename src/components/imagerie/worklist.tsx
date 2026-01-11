"use client"

import { useState } from "react"
import { Search, FileText, Upload, Check, Sparkles, AlertTriangle, Clock, Zap } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function RadiologyWorklist() {
    const [open, setOpen] = useState(false)

    // Mock data
    const requests = [
        { id: 1, patient: "Moussa DIOP", exam: "Radiographie Thorax F/P", doctor: "Dr. SOW", priority: "URGENT", date: "10:30", status: "EN_ATTENTE" },
        { id: 2, patient: "Aminata FALL", exam: "Échographie Abdominale", doctor: "Dr. LY", priority: "NORMAL", date: "11:00", status: "EN_ATTENTE" },
        { id: 3, patient: "Jean MENDY", exam: "Scanner Cérébral", doctor: "Dr. SOW", priority: "NORMAL", date: "11:45", status: "EN_COURS" },
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Worklist Imagerie</h2>
                    <p className="text-slate-500 font-medium">Flux de travail radiologique et échographique en temps réel.</p>
                </div>
                <div className="flex gap-2">
                    <Badge className="bg-amber-100 text-amber-700 border-none px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                        <Clock className="h-4 w-4" /> 4 Examens en attente
                    </Badge>
                    <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                        <Zap className="h-4 w-4" /> IA Active
                    </Badge>
                </div>
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100 p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Rechercher un dossier..." className="pl-10 h-11 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500 shadow-none" />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="h-11 rounded-2xl font-bold border-slate-200">Aujourd'hui</Button>
                            <Button variant="outline" className="h-11 rounded-2xl font-bold border-slate-200">Toutes les modalités</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Patient & Examen</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Prescripteur</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Priorité</TableHead>
                                <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
                                                {req.date}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{req.patient}</p>
                                                <p className="text-xs text-indigo-600 font-bold uppercase tracking-tighter">{req.exam}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-[10px]">
                                                {req.doctor.split('.')[1].trim().charAt(0)}
                                            </div>
                                            <span className="text-sm font-bold text-slate-600 uppercase">{req.doctor}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={req.priority === "URGENT" ? "destructive" : "outline"} className={cn(
                                            "rounded-lg px-3 py-1 font-black text-[10px] tracking-widest border-none shadow-none",
                                            req.priority === "URGENT" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400"
                                        )}>
                                            {req.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right px-8">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl bg-indigo-50 border-none text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="Scan IA">
                                                <Sparkles className="h-4 w-4" />
                                            </Button>

                                            <Dialog open={open} onOpenChange={setOpen}>
                                                <DialogTrigger asChild>
                                                    <Button className="h-10 px-6 rounded-xl bg-slate-900 hover:bg-black font-bold shadow-lg shadow-slate-200 text-xs">
                                                        <FileText className="mr-2 h-4 w-4" /> Traiter
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[700px] rounded-[40px] border-none shadow-2xl p-0 overflow-hidden">
                                                    <DialogHeader className="p-8 bg-slate-900 text-white">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Compte-rendu Radiologique</DialogTitle>
                                                                <p className="text-slate-400 text-sm font-medium">{req.exam} - {req.patient}</p>
                                                            </div>
                                                            <Badge className="bg-indigo-600 text-[10px] font-black uppercase tracking-widest">IA SCAN OPTIONNEL</Badge>
                                                        </div>
                                                    </DialogHeader>
                                                    <div className="p-8 space-y-8">
                                                        <div className="grid gap-3">
                                                            <Label className="font-black text-[10px] uppercase text-slate-400 tracking-widest px-1">Images / Clichés (DICOM/JPEG)</Label>
                                                            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-slate-400 hover:bg-indigo-50 hover:border-indigo-200 cursor-pointer transition-all group">
                                                                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                    <Upload className="h-8 w-8 text-slate-300" />
                                                                </div>
                                                                <span className="text-sm font-bold">Glisser-déposer les images ici</span>
                                                                <span className="text-[10px] mt-2">Format supporté: DICOM, JPEG, PNG (Max 50MB)</span>
                                                            </div>
                                                        </div>

                                                        <div className="grid gap-3">
                                                            <Label className="font-black text-[10px] uppercase text-slate-400 tracking-widest px-1">Observation Radiologique</Label>
                                                            <Textarea placeholder="Décrivez les signes radiologiques observés..." className="min-h-[180px] rounded-3xl bg-slate-50 border-none p-6 text-sm focus-visible:ring-indigo-500" />
                                                        </div>

                                                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-4">
                                                            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                                                            <div>
                                                                <p className="text-xs font-black text-amber-800">Alerte IA Suggestion</p>
                                                                <p className="text-[10px] text-amber-600 leading-relaxed italic">L'IA a détecté une zone d'opacité suspecte dans le lobe supérieur droit. Veuillez porter une attention particulière à cette zone lors de la lecture.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter className="p-8 bg-slate-50 flex sm:justify-between items-center">
                                                        <Button variant="ghost" className="font-black text-slate-500 rounded-xl" onClick={() => setOpen(false)}>Annuler</Button>
                                                        <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all hover:scale-105" onClick={() => setOpen(false)}>
                                                            <Check className="mr-2 h-5 w-5" /> Valider & Archiver
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
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
