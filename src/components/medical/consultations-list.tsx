"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, User } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ConsultationsList() {
    const { data: consultations, isLoading } = useQuery({
        queryKey: ['consultations-list'],
        queryFn: async () => {
            const res = await fetch('/api/medical/consultations?limit=20')
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json() as Promise<any[]>
        }
    })

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date / Heure</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Médecin</TableHead>
                        <TableHead>Motif</TableHead>
                        <TableHead>Statut</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {consultations?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                Aucune consultation récente.
                            </TableCell>
                        </TableRow>
                    )}
                    {consultations?.map((cons) => (
                        <TableRow key={cons.id}>
                            <TableCell className="font-medium">
                                {format(new Date(cons.dateConsultation), "d MMM yyyy à HH:mm", { locale: fr })}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{cons.patient.prenom} {cons.patient.nom}</span>
                                </div>
                                <div className="text-xs text-muted-foreground pl-6">{cons.patient.numeroPatient}</div>
                            </TableCell>
                            <TableCell>Dr. {cons.medecin.prenom} {cons.medecin.nom}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{cons.motif}</TableCell>
                            <TableCell>
                                <Badge variant={cons.statut === "TERMINEE" ? "default" : "secondary"}>
                                    {cons.statut}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
