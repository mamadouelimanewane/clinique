"use client"

import { useState } from "react"
import {
    Search,
    Plus,
    FileText,
    CheckCircle2,
    AlertCircle,
    Clock,
    CreditCard,
    Smartphone,
    Banknote,
    Microscope,
    Pill,
    Bed,
    User,
    ArrowRight,
    Printer,
    Download,
    X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"

export function ConsolidatedBilling() {
    const [selectedPatient, setSelectedPatient] = useState<any>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [showInvoice, setShowInvoice] = useState(false)

    // Mock Patients
    const patients = [
        { id: "P1", name: "Mamadou Fall", matricule: "SN-2026-F12", assurance: "AXA", taux: 80 },
        { id: "P2", name: "Astou Diop", matricule: "SN-2026-D44", assurance: "IPRES", taux: 100 },
    ]

    // Mock Pending Items for P1
    const pendingItems = [
        { id: "S1", type: "Hospitalisation", desc: "Chambre VIP (4 jours)", date: "10/01/2026", amount: 120000, icon: Bed },
        { id: "S2", type: "Laboratoire", desc: "Bilan Sanguin Complet", date: "11/01/2026", amount: 45000, icon: Microscope },
        { id: "S3", type: "Pharmacie", desc: "Traitement Post-Op", date: "11/01/2026", amount: 32500, icon: Pill },
    ]

    const totalAmount = pendingItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.amount, 0)

    const assurancePart = selectedPatient ? (totalAmount * selectedPatient.taux) / 100 : 0
    const patientPart = totalAmount - assurancePart

    const toggleItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Patient Search & Info */}
                <Card className="lg:col-span-1 border-none shadow-2xl rounded-[40px] bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 h-40 w-40 bg-emerald-500/20 rounded-full blur-3xl" />
                    <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Sélection Patient</CardTitle>
                        <CardDescription className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-2">Dossier Facturation</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                placeholder="Nom ou Matricule..."
                                className="pl-10 h-14 rounded-2xl border-none bg-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500 font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {!selectedPatient ? (
                            <div className="space-y-3 pt-4">
                                {patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                                    <div
                                        key={p.id}
                                        className="p-4 rounded-2xl bg-slate-800/50 hover:bg-emerald-600 transition-all cursor-pointer group"
                                        onClick={() => setSelectedPatient(p)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-black uppercase tracking-tighter text-sm">{p.name}</p>
                                                <p className="text-[10px] text-slate-400 group-hover:text-emerald-100">{p.matricule}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in zoom-in-95 duration-500">
                                <div className="p-6 rounded-3xl bg-emerald-600 shadow-xl shadow-emerald-900/40 relative group overflow-hidden">
                                    <div className="absolute -bottom-4 -right-4 h-20 w-20 opacity-20 pointer-events-none">
                                        <User className="h-20 w-20 text-white" />
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                            <User className="h-6 w-6 text-white" />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
                                            onClick={() => { setSelectedPatient(null); setSelectedItems([]) }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">{selectedPatient.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 opacity-70 mt-1">{selectedPatient.matricule}</p>

                                    <div className="mt-6 flex items-center gap-2">
                                        <Badge className="bg-white/20 text-white border-none font-black text-[9px] uppercase tracking-widest">{selectedPatient.assurance}</Badge>
                                        <span className="text-[10px] font-black text-emerald-100">{selectedPatient.taux}% Couverture</span>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-800">
                                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Total Brut</span>
                                        <span className="text-white">{totalAmount.toLocaleString()} F</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-emerald-400">
                                        <span>Part Assurance</span>
                                        <span>- {assurancePart.toLocaleString()} F</span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Net à Payer (Patient)</p>
                                            <p className="text-3xl font-black text-white italic tracking-tighter">{patientPart.toLocaleString()} <span className="text-sm">F</span></p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-emerald-50 font-black text-[12px] uppercase tracking-widest shadow-xl transition-all active:scale-95 disabled:opacity-50"
                                    disabled={selectedItems.length === 0}
                                    onClick={() => setShowInvoice(true)}
                                >
                                    <CheckCircle2 className="h-5 w-5 mr-3 text-emerald-600" /> Générer Facture
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Right: Items to Invoice */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white min-h-[500px]">
                        <CardHeader className="bg-slate-50 p-8 border-b border-slate-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-slate-900">Prestations en attente de paiement</CardTitle>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic flex items-center gap-2">
                                        <Clock className="h-3 w-3" /> Services non clôturés au {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                                {selectedItems.length > 0 && (
                                    <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] px-4 py-2 rounded-full">
                                        {selectedItems.length} Sélectionnés
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {!selectedPatient ? (
                                <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                                    <Search className="h-16 w-16 mb-4 opacity-10" />
                                    <p className="text-sm font-black uppercase tracking-widest opacity-30 italic">Veuillez sélectionner un patient</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="border-none">
                                            <TableHead className="px-8 h-12 w-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Sel.</TableHead>
                                            <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Prestation / Service</TableHead>
                                            <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Date Action</TableHead>
                                            <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right pr-8">Montant B.</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pendingItems.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                className={cn(
                                                    "group transition-all border-slate-50 cursor-pointer",
                                                    selectedItems.includes(item.id) ? "bg-emerald-50/30" : "hover:bg-slate-50/50"
                                                )}
                                                onClick={() => toggleItem(item.id)}
                                            >
                                                <TableCell className="px-8 py-6 text-center">
                                                    <Checkbox
                                                        checked={selectedItems.includes(item.id)}
                                                        onCheckedChange={() => toggleItem(item.id)}
                                                        className="h-5 w-5 rounded-md border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-none"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-tighter">
                                                        <div className={cn(
                                                            "h-10 w-10 rounded-xl flex items-center justify-center",
                                                            selectedItems.includes(item.id) ? "bg-white shadow text-emerald-600" : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow transition-all"
                                                        )}>
                                                            <item.icon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-900">{item.desc}</p>
                                                            <p className="text-[9px] text-slate-400 tracking-widest">{item.type}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-[10px] font-bold text-slate-400 italic">{item.date}</TableCell>
                                                <TableCell className="text-right pr-8">
                                                    <span className="text-sm font-black italic tracking-tighter text-slate-900 italic">
                                                        {item.amount.toLocaleString()} F
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>

                    {/* Payment Channel Selection */}
                    {selectedItems.length > 0 && (
                        <Card className="border-none shadow-xl rounded-[32px] bg-slate-50 p-6 flex flex-wrap gap-4 items-center justify-center animate-in slide-in-from-top-4 duration-500">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-full text-center mb-2 italic">Mode de Paiement Préféré</p>
                            <Button variant="ghost" className="h-16 px-8 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-700 hover:text-emerald-600 transition-all font-black text-[10px] uppercase tracking-widest gap-3 active:scale-95 group">
                                <Banknote className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform" /> Espèces
                            </Button>
                            <Button variant="ghost" className="h-16 px-8 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-700 hover:text-blue-500 transition-all font-black text-[10px] uppercase tracking-widest gap-3 active:scale-95 group">
                                <Smartphone className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" /> Wave
                            </Button>
                            <Button variant="ghost" className="h-16 px-8 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-700 hover:text-orange-500 transition-all font-black text-[10px] uppercase tracking-widest gap-3 active:scale-95 group">
                                <Smartphone className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform" /> O. Money
                            </Button>
                            <Button variant="ghost" className="h-16 px-8 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-700 hover:text-indigo-500 transition-all font-black text-[10px] uppercase tracking-widest gap-3 active:scale-95 group">
                                <CreditCard className="h-6 w-6 text-indigo-500 group-hover:scale-110 transition-transform" /> Carte Bancaire
                            </Button>
                        </Card>
                    )}
                </div>
            </div>

            {/* Global Invoice Preview Modal */}
            <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
                <DialogContent className="sm:max-w-[700px] border-none shadow-2xl rounded-[40px] p-0 overflow-hidden bg-white">
                    <div className="bg-slate-900 text-white p-10 flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-black italic tracking-tighter uppercase italic">Facture <span className="text-emerald-500">Globalisée</span></h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 italic underline decoration-emerald-500">Document Officiel • Clinique Sighi</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-mono font-black text-emerald-500 tracking-widest">INV-2026-X12</p>
                            <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase italic">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="p-10 space-y-8">
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">Client / Patient</p>
                                <p className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">{selectedPatient?.name}</p>
                                <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-1 italic">{selectedPatient?.matricule}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">Prise en Charge</p>
                                <p className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">{selectedPatient?.assurance}</p>
                                <p className="text-xs text-emerald-600 font-bold tracking-widest uppercase mt-1 italic italic underline">Convention {selectedPatient?.taux}% Actve</p>
                            </div>
                        </div>

                        <div className="border-y border-slate-100 py-6">
                            <Table>
                                <TableBody>
                                    {pendingItems.filter(i => selectedItems.includes(i.id)).map(item => (
                                        <TableRow key={item.id} className="border-none">
                                            <TableCell className="py-2 pl-0 font-bold text-xs uppercase text-slate-600">{item.desc}</TableCell>
                                            <TableCell className="py-2 text-right pr-0 font-black text-slate-900 text-sm italic">{item.amount.toLocaleString()} F</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-black uppercase text-slate-500 tracking-widest">
                                <span>Total Brut Services</span>
                                <span className="text-slate-900">{totalAmount.toLocaleString()} F</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black uppercase text-emerald-500 tracking-widest">
                                <span>Part Assurance ({selectedPatient?.taux}%)</span>
                                <span>- {assurancePart.toLocaleString()} F</span>
                            </div>
                            <div className="pt-6 border-t border-slate-900 flex justify-between items-center">
                                <span className="text-xl font-black uppercase italic italic tracking-tighter italic">Net à Payer Patient</span>
                                <span className="text-3xl font-black text-slate-900 italic tracking-tighter">{patientPart.toLocaleString()} F</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                        <Button variant="ghost" className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all" onClick={() => setShowInvoice(false)}>Annuler</Button>
                        <Button className="h-12 px-8 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 gap-2">
                            <Printer className="h-4 w-4" /> Imprimer & Valider Encaissement
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
