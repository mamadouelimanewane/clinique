"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Ecriture = {
    id: string
    dateEcriture: string
    journal: { code: string }
    compte: { numero: string; libelle: string }
    libelle: string
    debit: number
    credit: number
    pieceRef: string | null
    createdBy: { nom: string; prenom: string }
}

export function EcrituresList() {
    const { data: ecritures, isLoading } = useQuery<Ecriture[]>({
        queryKey: ['ecritures-list'],
        queryFn: async () => {
            const res = await fetch('/api/comptabilite/ecritures?limit=10')
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json()
        }
    })

    if (isLoading) {
        return <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Jnl</TableHead>
                        <TableHead>Compte</TableHead>
                        <TableHead>Libellé</TableHead>
                        <TableHead>Pièce</TableHead>
                        <TableHead className="text-right">Débit</TableHead>
                        <TableHead className="text-right">Crédit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ecritures?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                Aucune écriture enregistrée.
                            </TableCell>
                        </TableRow>
                    )}
                    {ecritures?.map((ecriture) => (
                        <TableRow key={ecriture.id}>
                            <TableCell>{format(new Date(ecriture.dateEcriture), 'dd/MM/yyyy')}</TableCell>
                            <TableCell><Badge variant="outline">{ecriture.journal.code}</Badge></TableCell>
                            <TableCell title={ecriture.compte.libelle}>{ecriture.compte.numero}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{ecriture.libelle}</TableCell>
                            <TableCell>{ecriture.pieceRef || "-"}</TableCell>
                            <TableCell className="text-right font-mono">
                                {ecriture.debit > 0 ? new Intl.NumberFormat('fr-SN').format(ecriture.debit) : ""}
                            </TableCell>
                            <TableCell className="text-right font-mono">
                                {ecriture.credit > 0 ? new Intl.NumberFormat('fr-SN').format(ecriture.credit) : ""}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
