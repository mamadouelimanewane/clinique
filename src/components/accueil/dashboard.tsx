"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Calendar, UserCheck, Clock, CheckCircle } from "lucide-react"

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

export function AccueilDashboard() {
    const { data: rdvs, isLoading } = useQuery({
        queryKey: ['accueil-rdv'],
        queryFn: async () => {
            const res = await fetch('/api/accueil/rdv-jour')
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json() as Promise<any[]>
        }
    })

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-blue-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendus Aujourd'hui</CardTitle>
                        <Calendar className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? "-" : rdvs?.length || 0}</div>
                    </CardContent>
                </Card>
                <Card className="bg-emerald-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Arrivés / En Salle</CardTitle>
                        <UserCheck className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                    </CardContent>
                </Card>
                <Card className="bg-purple-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Consultations Terminées</CardTitle>
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Planning du Jour</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Heure</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Médecin / Service</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rdvs?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                            Aucun rendez-vous planifié pour aujourd'hui.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {rdvs?.map((rdv) => (
                                    <TableRow key={rdv.id}>
                                        <TableCell className="font-medium">
                                            {format(new Date(rdv.dateHeure), "HH:mm")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{rdv.patient.prenom} {rdv.patient.nom}</div>
                                            <div className="text-xs text-muted-foreground">{rdv.patient.telephone}</div>
                                        </TableCell>
                                        <TableCell>Dr. {rdv.medecin.nom}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{rdv.statut}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm">
                                                <UserCheck className="mr-2 h-4 w-4" /> Enregistrer Arrivée
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
