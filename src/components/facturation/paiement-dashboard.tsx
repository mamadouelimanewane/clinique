"use client"

import { useState } from "react"
import {
    CreditCard,
    Smartphone,
    Banknote,
    ArrowRightLeft,
    Building2,
    Layers,
    CheckCircle2,
    Clock,
    AlertCircle,
    Search,
    Plus,
    History,
    FileText,
    ShieldCheck,
    TrendingUp,
    Filter,
    ArrowUpRight,
    Wallet,
    Users,
    Receipt,
    Divide,
    Activity,
    BarChart3
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConsolidatedBilling } from "./consolidated-billing"
import { FacturesList } from "./factures-list"
import { PricingSystems } from "./pricing-systems"
import { Calculator } from "lucide-react"

export function PaiementDashboard() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const stats = {
        caToday: "850,000 FCFA",
        pendingTiers: "1,240,000 FCFA",
        recoveryRate: "92%",
        recentPayments: 24
    }

    const organizations = [
        { id: "STATE", name: "État (Fonctionnaires)", type: "Public", balance: "450,000 FCFA", status: "Actif" },
        { id: "IPRES", name: "IPRES / Retraités", type: "Public", balance: "180,000 FCFA", status: "Actif" },
        { id: "AXA", name: "AXA Assurances", type: "Privé", balance: "320,000 FCFA", status: "Actif" },
        { id: "SUNU", name: "SUNU Assurances", type: "Privé", balance: "290,000 FCFA", status: "Actif" },
    ]

    const transactions = [
        { id: "TR-102", patient: "Alioune Sow", total: "45,000", method: "Wave", date: "10:15", status: "Validé" },
        { id: "TR-103", patient: "Khadidiatou Sy", total: "120,000", method: "Prise en charge (80%)", date: "09:45", status: "En attente Tiers" },
        { id: "TR-104", patient: "Moussa Diouf", total: "15,000", method: "Espèces", date: "09:20", status: "Validé" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-950">
                        Gestion des Encaissements & Tiers-Payant
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Centralisation des paiements multi-canaux et suivi des prises en charge
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none">
                        <History className="mr-2 h-4 w-4" /> Historique Caisse
                    </Button>
                    <Button className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouvel Encaissement
                    </Button>
                </div>
            </div>

            {/* Financial Status Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                            <Wallet className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Caisse du Jour</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.caToday}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-amber-50 dark:bg-amber-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-100">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider">Dette Tiers-Payant</p>
                            <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">{stats.pendingTiers}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Taux Recouvrement</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.recoveryRate}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                            <ArrowRightLeft className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider">Transactions</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.recentPayments}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-10" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100/50 rounded-[30px] p-2 h-[80px] shadow-inner border border-slate-200 w-full flex justify-start gap-2">
                    {[
                        { val: "overview", label: "Flux de Caisse Live", icon: Activity },
                        { val: "tiers", label: "Conventions & Tiers", icon: ShieldCheck },
                        { val: "pricing", label: "Tarification IA", icon: Calculator },
                        { val: "billing", label: "Facturation Globale", icon: Layers },
                        { val: "electronic", label: "Historique & Reçus", icon: History },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full rounded-[22px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-emerald-600 font-black text-[10px] uppercase tracking-widest transition-all gap-3">
                            <t.icon className="h-4 w-4" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Flux de Caisse */}
                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg text-emerald-900">Encaissements Récents</CardTitle>
                                        <Badge variant="outline" className="border-emerald-200 text-emerald-600">En direct</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Montant</TableHead>
                                                <TableHead>Méthode</TableHead>
                                                <TableHead>Heure</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {transactions.map((t) => (
                                                <TableRow key={t.id} className="hover:bg-slate-50 transition-colors">
                                                    <TableCell className="font-bold">{t.patient}</TableCell>
                                                    <TableCell className="font-mono text-emerald-600 font-bold">{t.total} F</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {t.method.includes("Wave") && <Smartphone className="h-3 w-3 text-blue-500" />}
                                                            {t.method.includes("Espèces") && <Banknote className="h-3 w-3 text-emerald-500" />}
                                                            {t.method.includes("Prise") && <Building2 className="h-3 w-3 text-amber-500" />}
                                                            <span className="text-xs">{t.method}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-slate-400">{t.date}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className={cn(
                                                            "text-[10px] font-bold",
                                                            t.status === "Validé" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                                        )}>{t.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Receipt className="h-4 w-4 text-slate-400" /></Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-none shadow-sm bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Smartphone className="h-24 w-24" />
                                    </div>
                                    <h4 className="text-sm font-bold opacity-80 mb-2 uppercase tracking-tighter">Mobile Money Hub</h4>
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                            <span className="text-xs">Solde Wave Transit</span>
                                            <span className="font-bold text-sm">345,000 F</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                            <span className="text-xs">Solde Orange Money</span>
                                            <span className="font-bold text-sm">122,500 F</span>
                                        </div>
                                        <Button className="w-full bg-white text-blue-700 hover:bg-slate-100 font-bold text-xs h-8">Demander un Virement vers Banque</Button>
                                    </div>
                                </Card>
                                <Card className="border-none shadow-sm p-6 bg-slate-900 text-white">
                                    <h4 className="text-sm font-bold opacity-70 mb-4 uppercase tracking-tighter">Répartition Encaissements</h4>
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px]">
                                                <span>Espèces</span>
                                                <span>45%</span>
                                            </div>
                                            <Progress value={45} className="h-1 bg-white/10" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px]">
                                                <span>Mobile Money</span>
                                                <span>35%</span>
                                            </div>
                                            <Progress value={35} className="h-1 bg-white/10" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px]">
                                                <span>Virement / Chèque</span>
                                                <span>20%</span>
                                            </div>
                                            <Progress value={20} className="h-1 bg-white/10" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Side Panel: Tiers Payant Overview */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md bg-white p-6">
                                <h4 className="font-bold text-sm mb-4">Solde Tiers-Payant (Dû)</h4>
                                <div className="space-y-4">
                                    {organizations.map((org) => (
                                        <div key={org.id} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg cursor-pointer group">
                                            <div>
                                                <p className="text-xs font-bold">{org.name}</p>
                                                <p className="text-[10px] text-slate-400">{org.type}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-amber-600">{org.balance}</p>
                                                <Badge variant="outline" className="text-[8px] p-0 px-1.5 h-auto font-black group-hover:underline">FACTUREZ</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-6 bg-slate-900 text-white h-9 text-xs">Générer Bordereaux Tiers</Button>
                            </Card>

                            <Card className="border-none shadow-sm p-6 bg-emerald-50 border border-emerald-100 relative overflow-hidden">
                                <ShieldCheck className="absolute -top-4 -right-4 h-20 w-20 text-emerald-200" />
                                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">Contrôle Caisse</h4>
                                <p className="text-[10px] text-emerald-600 leading-relaxed">Caisse clôturée hier par Admin. <br />Écart : 0 FCFA.</p>
                                <Button variant="outline" className="w-full mt-4 text-[10px] h-7 border-emerald-200 text-emerald-700">Ouvrir le PV du jour</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Tiers-Payant Management */}
                <TabsContent value="tiers" className="mt-0">
                    <Card className="border-none shadow-md">
                        <CardHeader className="bg-white dark:bg-slate-900 border-b flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Gestion des Conventions & Tiers-Payant</CardTitle>
                                <CardDescription>Gestion des prises en charge Fonctionnaires, IPRES et Assurances</CardDescription>
                            </div>
                            <Button className="bg-amber-600">Nouvelle Convention</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Organisme</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Taux Moy.</TableHead>
                                        <TableHead>Délai Paiement</TableHead>
                                        <TableHead>Encaissement</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-bold">État (Matricules)</TableCell>
                                        <TableCell><Badge>Public</Badge></TableCell>
                                        <TableCell className="font-bold">80%</TableCell>
                                        <TableCell className="text-xs text-slate-500">60-90 Jours</TableCell>
                                        <TableCell className="font-mono text-emerald-600 font-bold">Encours: 4.5M</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="font-bold text-amber-600">Pointer</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">IPRES</TableCell>
                                        <TableCell><Badge>Public</Badge></TableCell>
                                        <TableCell className="font-bold">100%</TableCell>
                                        <TableCell className="text-xs text-slate-500">45 Jours</TableCell>
                                        <TableCell className="font-mono text-emerald-600 font-bold">Encours: 1.2M</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="font-bold text-amber-600">Pointer</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Facturation Groupée */}
                <TabsContent value="billing" className="mt-0">
                    <ConsolidatedBilling />
                </TabsContent>

                {/* Tarification IA & Catalogue */}
                <TabsContent value="pricing" className="mt-0">
                    <PricingSystems />
                </TabsContent>

                {/* Paiements Électroniques Detail */}
                <TabsContent value="electronic" className="mt-0">
                    <FacturesList />
                </TabsContent>
            </Tabs>
        </div>
    )
}
