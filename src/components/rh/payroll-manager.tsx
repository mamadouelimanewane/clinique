"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Banknote, FileText, Plus, Download, CheckCircle, Calculator, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function PayrollManager() {
    const queryClient = useQueryClient()

    const { data: bulletins, isLoading } = useQuery({
        queryKey: ['bulletins-paie'],
        queryFn: async () => {
            const res = await fetch('/api/rh/paie')
            return res.json()
        }
    })

    const { data: employes } = useQuery({
        queryKey: ['employes'],
        queryFn: async () => [
            { id: '1', nom: 'Diop', prenom: 'Moussa', matricule: 'EMP-001', fonction: 'Infirmier' },
            { id: '2', nom: 'Sow', prenom: 'Aissatou', matricule: 'EMP-002', fonction: 'Médecin' },
        ]
    })

    const generatePaie = useMutation({
        mutationFn: async (employeId: string) => {
            const res = await fetch('/api/rh/paie', {
                method: 'POST',
                body: JSON.stringify({ employeId, periode: "01/2026" })
            })
            return res.json()
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bulletins-paie'] })
    })

    if (isLoading) return <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calculator className="h-6 w-6 text-indigo-600" /> Gestion de la Paie
                    </h2>
                    <p className="text-muted-foreground">Calcul et émission des bulletins de salaire</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Virement</Button>
                    <Button className="bg-indigo-600"><Plus className="mr-2 h-4 w-4" /> Générer Paie Massive</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>Derniers Bulletins Émis</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employé</TableHead>
                                    <TableHead>Période</TableHead>
                                    <TableHead className="text-right">Net à Payer</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bulletins?.map((b: any) => (
                                    <TableRow key={b.id}>
                                        <TableCell className="font-medium">{b.employe.prenom} {b.employe.nom}</TableCell>
                                        <TableCell>{b.periode}</TableCell>
                                        <TableCell className="text-right font-bold">{new Intl.NumberFormat('fr-FR').format(b.salaireNet)} FCFA</TableCell>
                                        <TableCell><Badge variant="outline">{b.statut}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm"><FileText className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Génération Individuelle</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {employes?.map(emp => (
                            <div key={emp.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition">
                                <div>
                                    <p className="font-bold text-sm">{emp.prenom} {emp.nom}</p>
                                    <p className="text-xs text-muted-foreground">{emp.fonction}</p>
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => generatePaie.mutate(emp.id)}
                                    disabled={generatePaie.isPending}
                                >
                                    {generatePaie.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calculator className="h-4 w-4" />}
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
