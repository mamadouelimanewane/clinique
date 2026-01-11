"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Bed, UserPlus, LogOut, Info, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export function BedManagement() {
    const queryClient = useQueryClient()
    const { data: lits, isLoading } = useQuery({
        queryKey: ['lits'],
        queryFn: async () => {
            const res = await fetch('/api/hospitalisation')
            if (!res.ok) throw new Error('Erreur chargement lits')
            return res.json() as Promise<any[]>
        }
    })

    const libererMutation = useMutation({
        mutationFn: async (hospitalisationId: string) => {
            const res = await fetch('/api/hospitalisation', {
                method: 'PUT',
                body: JSON.stringify({ hospitalisationId })
            })
            if (!res.ok) throw new Error('Erreur lors de la libération')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lits'] })
        }
    })

    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>

    const services = Array.from(new Set(lits?.map(l => l.service)))

    return (
        <div className="space-y-8">
            {services.map(service => (
                <section key={service} className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                        Service {service}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {lits?.filter(l => l.service === service).map(lit => {
                            const currentHosp = lit.hospitalisations?.[0]
                            return (
                                <Card key={lit.id} className={`${lit.occupe ? 'border-amber-200 bg-amber-50/30' : 'border-emerald-200 bg-emerald-50/30'}`}>
                                    <CardHeader className="p-4 pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <Bed className={`h-5 w-5 ${lit.occupe ? 'text-amber-600' : 'text-emerald-600'}`} />
                                                <span className="font-bold text-lg">N° {lit.numero}</span>
                                            </div>
                                            <Badge variant={lit.occupe ? "destructive" : "secondary"}>
                                                {lit.occupe ? "Occupé" : "Libre"}
                                            </Badge>
                                        </div>
                                        <CardDescription>{lit.categorie} - Chambre {lit.chambre}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        {lit.occupe ? (
                                            <div className="space-y-3">
                                                <div className="bg-white/80 p-2 rounded border border-amber-100 mt-2">
                                                    <p className="text-sm font-bold text-slate-800">{currentHosp?.patient.prenom} {currentHosp?.patient.nom}</p>
                                                    <p className="text-[10px] text-muted-foreground">{currentHosp?.patient.numeroPatient}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" className="w-full text-xs h-8">
                                                        <Info className="h-3 w-3 mr-1" /> Soins
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="w-full text-xs h-8 text-amber-700 hover:bg-amber-100"
                                                        onClick={() => {
                                                            if (currentHosp) {
                                                                toast.promise(libererMutation.mutateAsync(currentHosp.id), {
                                                                    loading: 'Libération du lit...',
                                                                    success: 'Lit libéré avec succès',
                                                                    error: 'Erreur lors de la libération'
                                                                })
                                                            }
                                                        }}
                                                        disabled={libererMutation.isPending}
                                                    >
                                                        {libererMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Libérer"}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 h-9" size="sm">
                                                <UserPlus className="h-4 w-4 mr-2" /> Admission
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </section>
            ))}
        </div>
    )
}
