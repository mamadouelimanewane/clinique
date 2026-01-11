"use client"

import { useState } from "react"
import {
    Bed,
    Check,
    X,
    AlertCircle,
    User,
    Clock,
    Thermometer,
    Activity,
    Droplets,
    Heart,
    Wind,
    Pill,
    Stethoscope,
    Calendar,
    MapPin,
    UserCog
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"

interface BedManagementGridProps {
    selectedService: string
}

export function BedManagementGrid({ selectedService }: BedManagementGridProps) {
    const [selectedBed, setSelectedBed] = useState<any>(null)

    const { data: bedsData, isLoading } = useQuery({
        queryKey: ['hospitalisation-lits'],
        queryFn: async () => {
            const res = await fetch('/api/hospitalisation/lits')
            if (!res.ok) throw new Error('Failed to fetch beds')
            return res.json() as Promise<any[]>
        }
    })

    const beds = bedsData?.map((b: any) => {
        const activeHospi = b.hospitalisations?.[0]
        return {
            id: b.id,
            service: b.service.toLowerCase(),
            chambre: b.numero,
            patient: activeHospi ? `${activeHospi.patient.prenom} ${activeHospi.patient.nom}` : null,
            patientId: activeHospi?.patient.id,
            age: 0, // Need to calculate from dateNaissance
            pathology: activeHospi?.motif || "-",
            etat: b.occupe ? "STABLE" : "DISPONIBLE", // Simplified
            admission: activeHospi ? format(new Date(activeHospi.dateEntree), 'dd/MM/yyyy') : "-",
            constantes: { temp: 37, ta: "12/8", fc: 75, spo2: 98 } // Mocked until we have actual constants
        }
    }) || []

    const filteredBeds = selectedService === "all"
        ? beds
        : beds.filter(b => b.service === selectedService)

    const getBedStatusColor = (etat: string) => {
        switch (etat) {
            case "DISPONIBLE": return "bg-emerald-100 border-emerald-300 text-emerald-700"
            case "STABLE": return "bg-blue-100 border-blue-300 text-blue-700"
            case "SURVEILLANCE": return "bg-amber-100 border-amber-300 text-amber-700"
            case "CRITIQUE": return "bg-red-100 border-red-300 text-red-700 animate-pulse"
            case "NETTOYAGE": return "bg-slate-100 border-slate-300 text-slate-700"
            default: return "bg-slate-100 border-slate-300"
        }
    }

    const getBedIcon = (etat: string) => {
        switch (etat) {
            case "DISPONIBLE": return <Check className="h-5 w-5 text-emerald-600" />
            case "CRITIQUE": return <AlertCircle className="h-5 w-5 text-red-600" />
            case "NETTOYAGE": return <X className="h-5 w-5 text-slate-600" />
            default: return <User className="h-5 w-5 text-blue-600" />
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold">Plan des Lits</h3>
                    <div className="flex gap-2 text-xs">
                        <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1" /> Disponible
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-1" /> Occupé
                        </Badge>
                        <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700">
                            <div className="h-2 w-2 rounded-full bg-red-500 mr-1 animate-pulse" /> Critique
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredBeds.map((bed) => (
                    <Dialog key={bed.id}>
                        <DialogTrigger asChild>
                            <Card
                                className={cn(
                                    "cursor-pointer transition-all hover:shadow-lg border-2",
                                    getBedStatusColor(bed.etat)
                                )}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Bed className="h-5 w-5" />
                                            <CardTitle className="text-base font-bold">
                                                Lit {bed.chambre}
                                            </CardTitle>
                                        </div>
                                        {getBedIcon(bed.etat)}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {bed.patient ? (
                                        <>
                                            <div className="font-bold text-sm">{bed.patient}</div>
                                            <div className="text-xs text-muted-foreground">{bed.pathology}</div>
                                            <div className="flex gap-2 mt-2 flex-wrap">
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                    <Thermometer className="h-3 w-3 mr-0.5" /> {bed.constantes?.temp}°C
                                                </Badge>
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                    <Heart className="h-3 w-3 mr-0.5" /> {bed.constantes?.fc}
                                                </Badge>
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                    <Wind className="h-3 w-3 mr-0.5" /> {bed.constantes?.spo2}%
                                                </Badge>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-sm text-muted-foreground italic">
                                            {bed.etat === "NETTOYAGE" ? "En cours de nettoyage" : "Lit disponible"}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Détails Lit {bed.chambre} - {bed.service.toUpperCase()}</DialogTitle>
                            </DialogHeader>
                            {bed.patient ? (
                                <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-xs text-muted-foreground">Patient</Label>
                                            <div className="font-bold">{bed.patient}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-muted-foreground">Âge</Label>
                                            <div className="font-bold">{bed.age || 0} ans</div>
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label className="text-xs text-muted-foreground">Pathologie / Motif</Label>
                                            <div className="font-bold">{bed.pathology}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-muted-foreground">Date d'admission</Label>
                                            <div className="flex items-center gap-1 text-sm">
                                                <Calendar className="h-3 w-3" /> {bed.admission}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-muted-foreground">État</Label>
                                            <Badge className={cn(
                                                bed.etat === "CRITIQUE" ? "bg-red-500" :
                                                    bed.etat === "SURVEILLANCE" ? "bg-amber-500" : "bg-blue-500"
                                            )}>
                                                {bed.etat}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <Label className="text-sm font-bold mb-3 block">Constantes Vitales</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                                <Thermometer className="h-5 w-5 text-red-500" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Température</div>
                                                    <div className="font-bold">{bed.constantes.temp}°C</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                                <Activity className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Tension</div>
                                                    <div className="font-bold">{bed.constantes.ta}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                                <Heart className="h-5 w-5 text-pink-500" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Fréquence Cardiaque</div>
                                                    <div className="font-bold">{bed.constantes.fc} bpm</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                                <Wind className="h-5 w-5 text-emerald-500" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">SpO2</div>
                                                    <div className="font-bold">{bed.constantes.spo2}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Bed className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>Ce lit est actuellement {bed.etat === "NETTOYAGE" ? "en cours de nettoyage" : "disponible"}</p>
                                </div>
                            )}
                            <DialogFooter>
                                {bed.patient ? (
                                    <>
                                        <Button variant="outline">Voir Dossier Complet</Button>
                                        <Button className="bg-red-600 hover:bg-red-700">Planifier Sortie</Button>
                                    </>
                                ) : (
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">Admettre Patient</Button>
                                )}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    )
}
