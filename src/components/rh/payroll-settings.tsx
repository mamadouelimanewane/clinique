"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Settings2, Trash2 } from "lucide-react"

const DEFAULT_RUBRIQUES = [
    { code: "100", libelle: "Salaire de base", type: "GAIN", imposable: true, categorie: "FIXE" },
    { code: "200", libelle: "Indemnité de Transport", type: "GAIN", imposable: false, categorie: "FIXE" },
    { code: "300", libelle: "Indemnité de Logement", type: "GAIN", imposable: true, categorie: "FIXE" },
    { code: "400", libelle: "I.P.R.E.S (Part Ouvrière)", type: "RETENUE", imposable: false, categorie: "SOCIALE" },
    { code: "500", libelle: "I.R. (Impôt sur le Revenu)", type: "RETENUE", imposable: false, categorie: "FISCALE" },
]

export function PayrollSettings() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Settings2 className="h-5 w-5 text-slate-600" /> Rubriques de Paie
                        </CardTitle>
                        <CardDescription>Configuration des gains et retenues standards (Code du Travail Sénégal)</CardDescription>
                    </div>
                    <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Ajouter une rubrique</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Libellé</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Imposable</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {DEFAULT_RUBRIQUES.map((r) => (
                                <TableRow key={r.code}>
                                    <TableCell className="font-mono text-xs">{r.code}</TableCell>
                                    <TableCell className="font-medium">{r.libelle}</TableCell>
                                    <TableCell>
                                        <Badge variant={r.type === 'GAIN' ? 'secondary' : 'destructive'} className="text-[10px]">
                                            {r.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{r.imposable ? "Oui" : "Non"}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{r.categorie}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-bold">Mise à jour des taux fiscaux 2026</h4>
                            <p className="text-sm text-slate-400 font-light">Le barème de l'Impôt sur le Revenu a été mis à jour selon la dernière loi de finances.</p>
                        </div>
                        <Badge className="bg-emerald-500">ACTIF</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
