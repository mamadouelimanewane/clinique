"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Printer, Download, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function FactureView({ id }: { id: string }) {
    const { data: facture, isLoading } = useQuery({
        queryKey: ['facture', id],
        queryFn: async () => {
            const res = await fetch(`/api/facturation/${id}`)
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json()
        }
    })

    if (isLoading) {
        return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    if (!facture) return <div>Facture introuvable</div>

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center print:hidden">
                <h2 className="text-2xl font-bold">Détails de la Facture</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" /> Imprimer
                    </Button>
                    {facture.statut !== 'PAYEE' && (
                        <Button>
                            <CreditCard className="mr-2 h-4 w-4" /> Encaisser Paiement
                        </Button>
                    )}
                </div>
            </div>

            <Card className="print:shadow-none print:border-none" id="facture-print">
                <CardHeader className="flex flex-row justify-between items-start pb-8 border-b">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-900">CLINIQUE SIGHI</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Avenue Cheikh Anta Diop<br />
                            Dakar, Sénégal<br />
                            Tél: +221 33 800 00 00
                        </p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-xl font-bold">FACTURE</h3>
                        <p className="font-mono text-lg mt-1">{facture.numero}</p>
                        <Badge variant={facture.statut === 'PAYEE' ? 'default' : 'secondary'} className="mt-2">
                            {facture.statut}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="pt-8 space-y-8">
                    {/* Infos Client */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Patient</h4>
                            <p className="font-bold text-lg">{facture.patient.prenom} {facture.patient.nom}</p>
                            <p className="text-sm">Matricule: {facture.patient.numeroPatient}</p>
                            <p className="text-sm">{facture.patient.adresse || "Adresse non renseignée"}</p>
                        </div>
                        <div className="text-right">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Informations</h4>
                            <p className="text-sm"><span className="font-medium">Date:</span> {format(new Date(facture.dateEmission), 'dd/MM/yyyy')}</p>
                            <p className="text-sm"><span className="font-medium">Échéance:</span> Réception</p>
                            {facture.patient.assureur && (
                                <p className="text-sm mt-2">
                                    Assurance: <span className="font-medium">{facture.patient.assureur} ({facture.patient.tauxCouverture}%)</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Lignes */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Désignation</TableHead>
                                <TableHead className="text-right">Qté</TableHead>
                                <TableHead className="text-right">Prix Unitaire</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facture.lignes.map((ligne: any) => (
                                <TableRow key={ligne.id}>
                                    <TableCell>{ligne.designation}</TableCell>
                                    <TableCell className="text-right">{ligne.quantite}</TableCell>
                                    <TableCell className="text-right">{new Intl.NumberFormat('fr-SN').format(ligne.prixUnitaire)}</TableCell>
                                    <TableCell className="text-right font-medium">{new Intl.NumberFormat('fr-SN').format(ligne.montantTotal)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Totaux */}
                    <div className="flex justify-end">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Total Brut</span>
                                <span>{new Intl.NumberFormat('fr-SN').format(facture.montantTotal)} CFA</span>
                            </div>
                            {facture.partAssurance > 0 && (
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Part Assurance</span>
                                    <span>- {new Intl.NumberFormat('fr-SN').format(facture.partAssurance)} CFA</span>
                                </div>
                            )}
                            <Separator />
                            <div className="flex justify-between font-bold text-lg pt-2 text-blue-900">
                                <span>Net à Payer</span>
                                <span>{new Intl.NumberFormat('fr-SN').format(facture.partPatient)} CFA</span>
                            </div>
                        </div>
                    </div>

                    {/* Pied de page */}
                    <div className="border-t pt-8 text-center text-xs text-muted-foreground print:absolute print:bottom-8 print:left-0 print:right-0">
                        <p>Merci de votre confiance. Bon rétablissement !</p>
                        <p>NINEA: 001234567 - RC: SN-DKR-2026-B-1234</p>
                    </div>
                </CardContent>
            </Card>

            {/* Styles d'impression */}
            <style jsx global>{`
        @media print {
            body * {
                visibility: hidden;
            }
            #facture-print, #facture-print * {
                visibility: visible;
            }
            #facture-print {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                border: none;
                box-shadow: none;
            }
        }
      `}</style>
        </div>
    )
}
