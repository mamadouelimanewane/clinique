"use client"

import { useState } from "react"
import {
    FlaskConical,
    ClipboardCheck,
    Beaker,
    Search,
    Clock,
    AlertCircle,
    CheckCircle2,
    FileText,
    MoreVertical,
    Save,
    Printer,
    Download
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function LabDashboard() {
    const queryClient = useQueryClient()
    const [selectedExam, setSelectedExam] = useState<any>(null)
    const [resultValues, setResultValues] = useState("")
    const [conclusion, setConclusion] = useState("")

    const { data: pendingExams, isLoading } = useQuery({
        queryKey: ['pending-exams'],
        queryFn: async () => {
            const res = await fetch('/api/medical/laboratoire/pending')
            if (!res.ok) throw new Error("Erreur chargement examens")
            return res.json()
        }
    })

    const submitMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch('/api/medical/laboratoire/resultat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Erreur lors de la validation")
            return res.json()
        },
        onSuccess: () => {
            toast.success("Résultat validé avec succès")
            queryClient.invalidateQueries({ queryKey: ['pending-exams'] })
            setSelectedExam(null)
            setResultValues("")
            setConclusion("")
        },
        onError: () => {
            toast.error("Une erreur est survenue")
        }
    })

    const handleOpenSubmit = (exam: any) => {
        setSelectedExam(exam)
    }

    const handleSubmit = () => {
        if (!resultValues) return toast.error("Veuillez saisir les valeurs")
        submitMutation.mutate({
            acteRealiseId: selectedExam.id,
            valeurs: { raw: resultValues },
            conclusion
        })
    }

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8 animate-in fade-in duration-700">
            {/* High-End Lab Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                            <FlaskConical className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">Laboratoire <span className="text-indigo-600">Central</span></h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plateforme de Biologie Médicale & Analyses</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Rechercher un échantillon..." className="pl-10 h-12 w-72 rounded-xl border-slate-200 bg-white" />
                    </div>
                    <Button className="h-12 px-6 rounded-xl bg-slate-900 font-bold text-xs uppercase tracking-widest">
                        <Printer className="mr-2 h-4 w-4" /> Impression Groupée
                    </Button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "En Attente", value: pendingExams?.length || 0, icon: Clock, color: "amber" },
                    { label: "Urgences (STAT)", value: "2", icon: AlertCircle, color: "red" },
                    { label: "Analyses ce jour", value: "48", icon: CheckCircle2, color: "emerald" },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                        <CardContent className="p-6 flex items-center gap-6">
                            <div className={cn(
                                "h-14 w-14 rounded-2xl flex items-center justify-center",
                                stat.color === 'amber' ? "bg-amber-50 text-amber-600" :
                                    stat.color === 'red' ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                            )}>
                                <stat.icon className="h-7 w-7" />
                            </div>
                            <div>
                                <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* List of Pending Exams */}
            <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="bg-slate-50 border-b p-8">
                    <CardTitle className="text-lg font-black uppercase tracking-tight italic">Echantillons <span className="text-indigo-600">à Analyser</span></CardTitle>
                    <CardDescription className="text-xs">Flux de travail en temps réel pour le personnel biomédical</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 border-none">
                                <TableHead className="px-8 font-bold text-[10px] uppercase h-14">Patient</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase h-14">Type d'Analyse</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase h-14 text-center">Prescription</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase h-14">Médecin</TableHead>
                                <TableHead className="text-right px-8 font-bold text-[10px] uppercase h-14">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" /></TableCell>
                                </TableRow>
                            ) : pendingExams?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-slate-400 font-bold uppercase tracking-widest">Aucune analyse en attente</TableCell>
                                </TableRow>
                            ) : pendingExams?.map((exam: any) => (
                                <TableRow key={exam.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 uppercase text-xs tracking-tight">{exam.consultation.patient.prenom} {exam.consultation.patient.nom}</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase">{exam.consultation.patient.numeroPatient}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px] font-black border-indigo-200 text-indigo-700 bg-indigo-50">
                                            {exam.acte.libelle}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center font-mono text-[10px] font-bold text-slate-500">
                                        {format(new Date(exam.createdAt), 'dd MMM HH:mm', { locale: fr })}
                                    </TableCell>
                                    <TableCell className="font-bold text-slate-700 text-xs">
                                        Dr. {exam.consultation.medecin.nom}
                                    </TableCell>
                                    <TableCell className="text-right px-8">
                                        <Button
                                            onClick={() => handleOpenSubmit(exam)}
                                            className="h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100"
                                        >
                                            <Save className="mr-2 h-3.5 w-3.5" /> Saisir Résultats
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Results Entry Modal */}
            <Dialog open={!!selectedExam} onOpenChange={(open) => !open && setSelectedExam(null)}>
                <DialogContent className="max-w-xl rounded-[32px] border-none shadow-2xl p-8">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase tracking-tighter italic">Saisie des <span className="text-indigo-600">Résultats</span></DialogTitle>
                        <DialogDescription className="text-xs uppercase font-bold tracking-widest mt-2">
                            {selectedExam?.acte?.libelle} • {selectedExam?.consultation?.patient?.prenom} {selectedExam?.consultation?.patient?.nom}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-6">
                        <div className="space-y-3">
                            <Label htmlFor="results" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Valeurs de l'Analyse</Label>
                            <Textarea
                                id="results"
                                placeholder="Saisissez les résultats structurés (Ex: Glycémie: 1.2 g/L, Créatinine: 11 mg/L...)"
                                className="min-h-[120px] rounded-2xl border-slate-200 focus:ring-indigo-500"
                                value={resultValues}
                                onChange={(e) => setResultValues(e.target.value)}
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="conclusion" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Conclusion & Notes</Label>
                            <Textarea
                                id="conclusion"
                                placeholder="Conclusion diagnostique ou observations..."
                                className="min-h-[80px] rounded-2xl border-slate-200 focus:ring-indigo-500"
                                value={conclusion}
                                onChange={(e) => setConclusion(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-4">
                        <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-black uppercase text-[10px] tracking-widest px-8" onClick={() => setSelectedExam(null)}>
                            Annuler
                        </Button>
                        <Button
                            className="h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-black uppercase text-[10px] tracking-widest px-8 shadow-xl shadow-indigo-100 text-white"
                            onClick={handleSubmit}
                            disabled={submitMutation.isPending}
                        >
                            {submitMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ClipboardCheck className="mr-2 h-4 w-4" />}
                            Valider le Rapport
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function Loader2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M4.93 4.93l2.83 2.83" />
            <path d="M16.24 16.24l2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="M4.93 19.07l2.83 -2.83" />
            <path d="M16.24 7.76l2.83 -2.83" />
        </svg>
    )
}
