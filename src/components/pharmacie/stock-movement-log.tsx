"use client"

import {
    ArrowUpCircle,
    ArrowDownCircle,
    RefreshCcw,
    User,
    Calendar
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function StockMovementLog() {
    const movements = [
        { id: "1", medicament: "Paracétamol", type: "ENTREE", qty: 500, motif: "Livraison Fournisseur Laborex", user: "Pharmacien Chef", date: "10/01/2026 09:15" },
        { id: "2", medicament: "Amoxicilline", type: "SORTIE", qty: 2, motif: "Dispensation Patient #482", user: "Assis. Pharmacie", date: "10/01/2026 10:30" },
        { id: "3", medicament: "Ceftriaxone", type: "AJUSTEMENT", qty: -1, motif: "Casse accidentelle", user: "Pharmacien Chef", date: "09/01/2026 16:45" },
        { id: "4", medicament: "Artemether", type: "SORTIE", qty: 10, motif: "Transfert Service Urgences", user: "Admin Stock", date: "09/01/2026 11:20" },
    ]

    return (
        <div className="rounded-xl border bg-white dark:bg-slate-950 overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                    <TableRow>
                        <TableHead>Date & Heure</TableHead>
                        <TableHead>Médicament</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-center">Quantité</TableHead>
                        <TableHead>Motif / Référence</TableHead>
                        <TableHead>Utilisateur</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movements.map((m) => (
                        <TableRow key={m.id}>
                            <TableCell className="text-xs font-medium text-slate-500">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {m.date}</span>
                            </TableCell>
                            <TableCell className="font-bold">{m.medicament}</TableCell>
                            <TableCell>
                                <Badge
                                    className={cn(
                                        "gap-1",
                                        m.type === 'ENTREE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            m.type === 'SORTIE' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                'bg-slate-50 text-slate-700 border-slate-200'
                                    )}
                                    variant="outline"
                                >
                                    {m.type === 'ENTREE' ? <ArrowUpCircle className="h-3 w-3" /> :
                                        m.type === 'SORTIE' ? <ArrowDownCircle className="h-3 w-3" /> : <RefreshCcw className="h-3 w-3" />}
                                    {m.type}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-center font-mono font-black">
                                <span className={m.qty > 0 ? "text-emerald-600" : "text-red-500"}>
                                    {m.qty > 0 ? `+${m.qty}` : m.qty}
                                </span>
                            </TableCell>
                            <TableCell className="text-sm text-slate-600 dark:text-slate-400 italic">
                                {m.motif}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center">
                                        <User className="h-3 w-3 text-slate-400" />
                                    </div>
                                    {m.user}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}
