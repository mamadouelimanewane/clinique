"use client"

import { useState } from "react"
import {
    Bed,
    UserPlus,
    LogOut,
    Activity,
    Stethoscope,
    Thermometer,
    History,
    Search,
    MapPin,
    Building2,
    CheckCircle2,
    Clock,
    User,
    ArrowRightCircle,
    Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function HospitalisationDashboard() {
    const queryClient = useQueryClient()
    const [selectedService, setSelectedService] = useState("TOUS")

    const { data: lits, isLoading } = useQuery({
        queryKey: ['hospitalisation-lits'],
        queryFn: async () => {
            const res = await fetch('/api/hospitalisation/lits')
            if (!res.ok) throw new Error("Erreur chargement lits")
            return res.json()
        }
    })

    const filteredLits = lits?.filter((lit: any) =>
        selectedService === "TOUS" || lit.service === selectedService
    )

    const stats = {
        total: lits?.length || 0,
        occupes: lits?.filter((l: any) => l.occupe).length || 0,
        disponibles: lits?.filter((l: any) => !l.occupe).length || 0,
    }

    const occupationRate = stats.total > 0 ? (stats.occupes / stats.total) * 100 : 0

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Professional Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-3xl bg-teal-600 flex items-center justify-center text-white shadow-2xl shadow-teal-100">
                            <Building2 className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">Gestion <span className="text-teal-600">Hospitalière</span></h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Surveillance Clinique & Gestion des Lits en Temps Réel</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 rounded-2xl border-slate-200 font-black px-8 uppercase text-[10px] tracking-widest hover:bg-slate-50">
                        <History className="mr-2 h-4 w-4" /> Journal Mouvements
                    </Button>
                    <Button className="h-14 rounded-2xl bg-slate-900 hover:bg-black text-white font-black px-10 uppercase text-[10px] tracking-widest shadow-2xl active:scale-95 transition-all">
                        <UserPlus className="mr-2 h-5 w-5" /> Admission Patient
                    </Button>
                </div>
            </div>

            {/* Capacity Overview Card */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 border-none shadow-xl rounded-[40px] bg-gradient-to-br from-teal-600 to-indigo-700 text-white p-8 relative overflow-hidden group">
                    <Bed className="absolute -bottom-6 -right-6 h-40 w-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-8">Taux d'Occupation</h4>
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black tracking-tighter">{Math.round(occupationRate)}%</span>
                        </div>
                        <Progress value={occupationRate} className="h-3 bg-white/20" />
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div>
                                <p className="text-2xl font-black tracking-tighter">{stats.occupes}</p>
                                <p className="text-[9px] font-bold uppercase opacity-60">Occupés</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black tracking-tighter">{stats.disponibles}</p>
                                <p className="text-[9px] font-bold uppercase opacity-60">Libres</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Service Quick Filters */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["TOUS", "MEDECINE", "CHIRURGIE", "MATERNITE"].map((service) => (
                        <Card
                            key={service}
                            onClick={() => setSelectedService(service)}
                            className={cn(
                                "border-none shadow-lg rounded-[32px] cursor-pointer transition-all duration-300 group",
                                selectedService === service ? "bg-white ring-2 ring-teal-600 scale-[1.02]" : "bg-slate-50 hover:bg-white"
                            )}
                        >
                            <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                                <div className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-colors",
                                    selectedService === service ? "bg-teal-600 text-white" : "bg-white text-slate-400 group-hover:bg-teal-50"
                                )}>
                                    {service === "MATERNITE" ? <User className="h-5 w-5" /> : service === "CHIRURGIE" ? <Activity className="h-5 w-5" /> : <Bed className="h-5 w-5" />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">{service}</h4>
                                    <p className="text-[9px] font-bold text-slate-400 mt-1">
                                        {lits?.filter((l: any) => service === "TOUS" || l.service === service).length} Lits Total
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Beds Grid Interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {isLoading ? (
                    <div className="col-span-full h-48 flex items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
                    </div>
                ) : filteredLits?.map((lit: any) => (
                    <Card
                        key={lit.id}
                        className={cn(
                            "border-none shadow-xl rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-1 group",
                            lit.occupe ? "bg-white border-l-4 border-l-rose-500" : "bg-slate-50/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
                        )}
                    >
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn(
                                    "p-3 rounded-xl",
                                    lit.occupe ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-400"
                                )}>
                                    <Bed className="h-5 w-5" />
                                </div>
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter">
                                    {lit.numero}
                                </Badge>
                            </div>

                            {lit.occupe ? (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Patient Actuel</p>
                                        <p className="text-xs font-black text-slate-900 uppercase leading-none">
                                            {lit.hospitalisations[0]?.patient?.prenom} {lit.hospitalisations[0]?.patient?.nom}
                                        </p>
                                        <p className="text-[9px] font-bold text-slate-400 mt-1"># {lit.hospitalisations[0]?.patient?.numeroPatient}</p>
                                    </div>
                                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-[9px] font-black uppercase text-teal-600 bg-teal-50 px-2 py-1 rounded">Depuis {format(new Date(lit.hospitalisations[0].dateEntree), 'dd/MM')}</span>
                                        <button className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-colors">
                                            <ArrowRightCircle className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2 py-2">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center italic">Disponible</p>
                                    <Button variant="ghost" className="w-full text-[9px] font-black uppercase h-8 hover:text-teal-600">Assigner</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
