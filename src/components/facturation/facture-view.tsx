"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Printer, Download, CreditCard, Banknote, Smartphone, CheckCircle, ShieldCheck, History, ArrowLeft, Receipt, Wallet, Layers } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function FactureView({ id }: { id: string }) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const [paymentData, setPaymentData] = useState({
        montant: 0,
        modePaiement: "ESPECES",
        reference: ""
    })

    const { data: facture, isLoading } = useQuery({
        queryKey: ['facture', id],
        queryFn: async () => {
            const res = await fetch(`/api/facturation/${id}`)
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json()
        }
    })

    const mutation = useMutation({
        mutationFn: async (data: typeof paymentData) => {
            const res = await fetch(`/api/facturation/${id}/paiement`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error('Erreur lors du paiement')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['facture', id] })
            queryClient.invalidateQueries({ queryKey: ['factures-list'] })
            setIsPaymentOpen(false)
            toast.success("Paiement validé avec succès", {
                description: "L'écriture comptable a été générée automatiquement.",
                className: "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold"
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    if (isLoading) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center animate-pulse">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Génération du document fiscal...</p>
            </div>
        )
    }

    if (!facture) return <div>Facture introuvable</div>

    const handlePrint = () => window.print()

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate(paymentData)
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-slate-100">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic italic">Détails <span className="text-indigo-600">Facture</span></h2>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Référence Unique:</span>
                            <code className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-black text-slate-600 uppercase tracking-tighter">{facture.numeroFacture || facture.numero}</code>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" onClick={handlePrint} className="h-12 rounded-2xl border-slate-200 font-black px-6 uppercase text-[10px] tracking-widest transition-all">
                        <Printer className="mr-2 h-4 w-4" /> Imprimer
                    </Button>

                    {facture.statut !== 'PAYEE' && (
                        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                            <DialogTrigger asChild>
                                <Button className="h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black px-8 shadow-2xl shadow-emerald-200 uppercase text-[10px] tracking-widest italic flex-1 md:flex-none">
                                    <CreditCard className="mr-2 h-4 w-4" /> Encaisser le solde
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[32px] border-none shadow-2xl p-0 overflow-hidden">
                                <form onSubmit={handlePaymentSubmit}>
                                    <div className="bg-slate-900 p-8 text-white">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                                                <Wallet className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <DialogTitle className="text-xl font-black uppercase tracking-tighter italic">Processus d'<span className="text-emerald-400">Encaissement</span></DialogTitle>
                                                <DialogDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Génération automatique des flux comptables</DialogDescription>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Montant Requis</span>
                                                <span className="text-2xl font-black text-emerald-900">{new Intl.NumberFormat('fr-SN').format(facture.partPatient)} F</span>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mode de Paiement</Label>
                                                <Select value={paymentData.modePaiement} onValueChange={(val) => setPaymentData({ ...paymentData, modePaiement: val })}>
                                                    <SelectTrigger className="h-14 rounded-2xl border-none bg-slate-50 shadow-inner font-bold focus:ring-emerald-500 transition-all">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                                                        <SelectItem value="ESPECES" className="font-bold py-3"><div className="flex items-center gap-2"><Banknote className="h-4 w-4 text-emerald-600" /> ESPÈCES</div></SelectItem>
                                                        <SelectItem value="MOBILE_MONEY" className="font-bold py-3"><div className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-blue-500" /> MOBILE MONEY (WAVE/OM)</div></SelectItem>
                                                        <SelectItem value="VIREMENT" className="font-bold py-3"><div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-500" /> VIREMENT BANCAIRE</div></SelectItem>
                                                        <SelectItem value="CHEQUE" className="font-bold py-3"><div className="flex items-center gap-2"><History className="h-4 w-4 text-slate-700" /> CHÈQUE</div></SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Référence Transaction</Label>
                                                <Input
                                                    placeholder="N° Transac, Chèque ou Virement..."
                                                    className="h-14 rounded-2xl border-none bg-slate-50 shadow-inner font-bold"
                                                    value={paymentData.reference}
                                                    onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
                                            disabled={mutation.isPending}
                                            onClick={() => setPaymentData({ ...paymentData, montant: Number(facture.partPatient) })}
                                        >
                                            {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle className="mr-2 h-5 w-5 text-emerald-400" />}
                                            Confirmer l'Encaissement
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            {/* Premium Invoice UI */}
            <Card className="border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[48px] overflow-hidden bg-white print:shadow-none print:rounded-none" id="facture-print">
                <CardHeader className="p-12 pb-8 border-b border-slate-50">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-[18px] bg-slate-900 flex items-center justify-center text-white shadow-xl">
                                    <Receipt className="h-6 w-6" />
                                </div>
                                <h1 className="text-3xl font-black italic tracking-tighter italic uppercase underline decoration-indigo-500 decoration-4 underline-offset-8">Clinique <span className="text-indigo-600">SIGHI</span></h1>
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                                Avenue Cheikh Anta Diop, BP 5005<br />
                                Dakar - Fann, SÉNÉGAL<br />
                                <span className="text-slate-900 font-black">Tél: +221 33 800 11 22</span>
                            </div>
                        </div>
                        <div className="text-right space-y-2">
                            <Badge className={cn(
                                "px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest shadow-lg border-none",
                                facture.statut === 'PAYEE' ? "bg-emerald-500 text-white" : "bg-rose-500 text-white animate-pulse"
                            )}>
                                {facture.statut === 'PAYEE' ? "PAIEMENT VALIDÉ" : "RESTE À RECOUVRER"}
                            </Badge>
                            <div className="pt-2">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">N° Facture</h3>
                                <p className="text-2xl font-black text-slate-900 font-mono tracking-tighter uppercase">{facture.numeroFacture || facture.numero}</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-12 pt-10 space-y-12">
                    {/* Patient & Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Layers className="h-3 w-3 text-indigo-500" /> Destinataire / Patient
                                </h4>
                                <div className="space-y-1">
                                    <p className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{facture.patient.prenom} {facture.patient.nom}</p>
                                    <p className="text-[10px] font-bold text-indigo-600 bg-indigo-50 w-fit px-2 py-0.5 rounded-lg border border-indigo-100 uppercase tracking-widest">ID: {facture.patient.numeroPatient || "NP-0001"}</p>
                                </div>
                            </div>
                            <div className="mt-8 text-xs font-bold text-slate-500 flex flex-col gap-1">
                                <p>Tel: {facture.patient.telephone || "N/A"}</p>
                                <p className="text-[10px] italic">{facture.patient.adresse || "Dakar, Sénégal"}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end text-right px-4 space-y-4">
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Émission</h4>
                                <p className="text-sm font-black text-slate-900">{format(new Date(facture.dateFacture), 'PPPP', { locale: fr })}</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Échéance</h4>
                                <p className="text-sm font-black text-rose-600 uppercase tracking-tighter italic">Paiement au Comptant</p>
                            </div>
                            {facture.patient.assureur && (
                                <div className="space-y-1 bg-amber-50 rounded-xl p-3 border border-amber-100 inline-block ml-auto">
                                    <h4 className="text-[9px] font-black text-amber-700 uppercase tracking-tighter">Couverture Tiers-Payant</h4>
                                    <p className="text-xs font-black text-amber-900 uppercase">{facture.patient.assureur} - {facture.patient.tauxCouverture}%</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table des Actes */}
                    <div className="rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-none">
                                    <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Description des Prestations</TableHead>
                                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-slate-400 w-24">Qté</TableHead>
                                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-slate-400 w-32">P.U (F)</TableHead>
                                    <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 w-40">Total (F)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {facture.lignes.map((ligne: any) => (
                                    <TableRow key={ligne.id} className="border-slate-50 hover:bg-slate-50 transition-colors">
                                        <TableCell className="px-8 py-5 font-bold text-slate-700 text-sm">
                                            {ligne.designation}
                                        </TableCell>
                                        <TableCell className="text-right font-black text-slate-400 text-xs">{ligne.quantite}</TableCell>
                                        <TableCell className="text-right font-bold text-slate-600 text-xs">{new Intl.NumberFormat('fr-SN').format(ligne.prixUnitaire)}</TableCell>
                                        <TableCell className="text-right px-8 font-black text-slate-900 text-sm">
                                            {new Intl.NumberFormat('fr-SN').format(ligne.montantTotal || (ligne.prixUnitaire * ligne.quantite))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Financial Calculations */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0 pt-4">
                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="p-6 bg-slate-900 rounded-[24px] text-white space-y-3 relative overflow-hidden group">
                                <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Note de Service</h4>
                                <p className="text-[10px] font-medium text-slate-300 italic">"Conformément aux directives SYSCOA, cette facture intègre les flux de tiers-payant pré-négociés. Les paiements par Mobile Money sont recommandés pour une validation instantanée."</p>
                            </div>
                            <div className="flex items-center gap-6 px-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Certifié par</span>
                                    <span className="text-xs font-black text-slate-900 uppercase">Direction Administrative</span>
                                </div>
                                <Separator orientation="vertical" className="h-4 bg-slate-200" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Validation</span>
                                    <span className="text-[10px] font-black text-emerald-600 uppercase">Agent SIGHI-2026</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 bg-slate-50 rounded-[40px] p-10 space-y-4 shadow-inner border border-slate-100">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-black text-slate-400 uppercase tracking-widest">Total Brut HT</span>
                                <span className="font-bold text-slate-900">{new Intl.NumberFormat('fr-SN').format(facture.montantHT || (facture.montantTTC / 1.18))} F</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-black text-slate-400 uppercase tracking-widest">TVA (18%)</span>
                                <span className="font-bold text-slate-900">{new Intl.NumberFormat('fr-SN').format(facture.montantTVA || (facture.montantTTC - (facture.montantTTC / 1.18)))} F</span>
                            </div>
                            <Separator className="bg-slate-200" />
                            <div className="flex justify-between items-center py-2">
                                <span className="text-xs font-black text-slate-900 uppercase tracking-[0.1em]">Total Facturé TTC</span>
                                <span className="text-xl font-black text-slate-900">{new Intl.NumberFormat('fr-SN').format(facture.montantTTC || facture.montantTotal)} F</span>
                            </div>
                            {facture.partAssurance > 0 && (
                                <div className="flex justify-between items-center text-xs p-3 bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
                                    <span className="font-black text-slate-400 uppercase tracking-tighter">Part Assureur ({facture.patient.tauxCouverture}%)</span>
                                    <span className="font-black text-amber-600">- {new Intl.NumberFormat('fr-SN').format(facture.partAssurance)} F</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[28px] text-white shadow-xl shadow-indigo-100 mt-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Net Patient</span>
                                <span className="text-2xl font-black">{new Intl.NumberFormat('fr-SN').format(facture.partPatient)} F</span>
                            </div>
                        </div>
                    </div>
                </CardContent>

                {/* Footer / QR / Sign */}
                <CardFooter className="p-12 pt-0 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left opacity-30 group hover:opacity-100 transition-opacity duration-500">
                    <div className="space-y-4">
                        <div className="h-24 w-24 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
                            <p className="text-[8px] font-black text-slate-400 text-center uppercase tracking-tighter">Sceau Numérique<br />Généré par SIGHI</p>
                        </div>
                    </div>
                    <div className="text-[9px] font-bold text-slate-400 max-w-sm leading-relaxed uppercase tracking-widest text-center md:text-right">
                        Merci de votre confiance. <br /> Une facture acquittée vous sera remise après validation bancaire. <br />
                        <span className="text-slate-900 font-black">NINEA: 001234567 - RC: SN-DKR-2026-B-1234</span>
                    </div>
                </CardFooter>
            </Card>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body {
                        background: white !important;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
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
                        width: 100% !important;
                        border: none !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    @page {
                        margin: 2cm;
                    }
                }
            `}</style>
        </div>
    )
}
