"use client"

import { useState } from "react"
import {
    BookOpen,
    Calculator,
    FileBarChart,
    PieChart,
    Zap,
    Plus,
    Search,
    ArrowRightLeft,
    Building2,
    Download,
    Printer,
    History,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Calendar,
    Filter,
    FileText,
    Settings,
    Database,
    Table as TableIcon,
    BarChart3,
    MoreVertical,
    Save
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"

export function SageAccountingEngine() {
    const [activeTab, setActiveTab] = useState("general")

    // --- Real Data Fetching ---
    const { data: entries, isLoading: isLoadingEntries } = useQuery({
        queryKey: ['accounting-entries'],
        queryFn: async () => {
            const res = await fetch('/api/comptabilite/ecritures')
            if (!res.ok) throw new Error('Failed to fetch entries')
            return res.json() as Promise<any[]>
        }
    })

    const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
        queryKey: ['accounting-accounts'],
        queryFn: async () => {
            const res = await fetch('/api/comptabilite/comptes')
            if (!res.ok) throw new Error('Failed to fetch accounts')
            return res.json() as Promise<any[]>
        }
    })

    const { data: centers, isLoading: isLoadingCenters } = useQuery({
        queryKey: ['accounting-centers'],
        queryFn: async () => {
            const res = await fetch('/api/comptabilite/centres')
            if (!res.ok) throw new Error('Failed to fetch centers')
            return res.json() as Promise<any[]>
        }
    })

    const stats = {
        caAnnee: entries ? new Intl.NumberFormat('fr-SN').format(entries.filter((e: any) => e.sens === 'CREDIT' && e.compte.numero.startsWith('7')).reduce((acc, e) => acc + Number(e.montant), 0)) : "0",
        ebitda: "34.1 M", // Simplified
        netResult: entries ? new Intl.NumberFormat('fr-SN').format(entries.reduce((acc, e) => acc + (e.sens === 'CREDIT' ? Number(e.montant) : -Number(e.montant)), 0)) : "0",
        bankBalance: entries ? new Intl.NumberFormat('fr-SN').format(entries.filter((e: any) => e.compte.numero.startsWith('52')).reduce((acc, e) => acc + (e.sens === 'DEBIT' ? Number(e.montant) : -Number(e.montant)), 0)) : "0"
    }

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section - Professional Finance Look */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-900">
                        Système Comptable Expert (Sage Edition)
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Comptabilité générale, analytique et reporting SYSCOA / OHADA
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none">
                        <Printer className="mr-2 h-4 w-4" /> Editions
                    </Button>
                    <Button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Saisie d'écriture
                    </Button>
                </div>
            </div>

            {/* Financial Intelligence Hub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-slate-900 text-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                            <BarChart3 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold opacity-60 uppercase tracking-wider">CA Annuel (YTD)</p>
                            <h3 className="text-2xl font-bold">{stats.caAnnee} <span className="text-xs">F</span></h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">EBITDA (Marge)</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.ebitda} <span className="text-xs">F</span></h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Résultat Net</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.netResult} <span className="text-xs">F</span></h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                            <Calculator className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider">Trésorerie Disponible</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.bankBalance} <span className="text-xs">F</span></h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="general" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100 border p-1 rounded-xl w-full flex overflow-x-auto justify-start h-auto">
                    <TabsTrigger value="general" className="gap-2 shrink-0"><BookOpen className="h-4 w-4" /> Comptabilité Générale</TabsTrigger>
                    <TabsTrigger value="analytique" className="gap-2 shrink-0"><PieChart className="h-4 w-4" /> Analytique par Pôle</TabsTrigger>
                    <TabsTrigger value="editions" className="gap-2 shrink-0"><FileBarChart className="h-4 w-4" /> Editions & Etats</TabsTrigger>
                    <TabsTrigger value="tresorerie" className="gap-2 shrink-0"><Zap className="h-4 w-4" /> Flux Trésorerie</TabsTrigger>
                    <TabsTrigger value="config" className="gap-2 shrink-0"><Settings className="h-4 w-4" /> Plan de Comptes</TabsTrigger>
                </TabsList>

                {/* Comptabilité Générale: Journaux & Saisie */}
                <TabsContent value="general" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-white dark:bg-slate-900 border-b flex flex-row items-center justify-between py-4">
                                    <div>
                                        <CardTitle className="text-lg">Dernières Écritures (Tous Journaux)</CardTitle>
                                        <CardDescription>Flux financier en temps réel</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="h-8"><Filter className="h-3 w-3 mr-1" /> Filtrer</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50">
                                            <TableRow>
                                                <TableHead>N° Pièce</TableHead>
                                                <TableHead>Libellé</TableHead>
                                                <TableHead>Journal</TableHead>
                                                <TableHead className="text-right">Montant</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoadingEntries ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-24 text-center">
                                                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                                    </TableCell>
                                                </TableRow>
                                            ) : entries?.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                        Aucune écriture trouvée.
                                                    </TableCell>
                                                </TableRow>
                                            ) : entries?.map((e: any) => (
                                                <TableRow key={e.id} className="group hover:bg-slate-50">
                                                    <TableCell className="font-mono text-[10px] font-bold">{e.numeroPiece || e.id.substring(0, 8).toUpperCase()}</TableCell>
                                                    <TableCell>
                                                        <p className="text-xs font-bold">{e.libelle}</p>
                                                        <p className="text-[10px] text-slate-400">{format(new Date(e.dateEcriture), 'dd/MM/yyyy')}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="text-[9px] uppercase tracking-tighter">{e.journal.code}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className={cn(
                                                            "text-xs font-black",
                                                            e.sens === "DEBIT" ? "text-red-500" : "text-emerald-600"
                                                        )}>
                                                            {e.sens === "DEBIT" ? "-" : "+"}{new Intl.NumberFormat('fr-SN').format(Number(e.montant))} F
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-4 w-4" /></Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <div className="p-3 border-t bg-slate-50 flex justify-center">
                                    <Button variant="link" className="text-xs text-indigo-600 font-bold">Consulter le Grand Livre complet</Button>
                                </div>
                            </Card>
                        </div>

                        {/* Quick Actions & Compliance */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md p-6 bg-white">
                                <h4 className="font-bold text-sm mb-4">Clôture Mensuelle</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-500 italic">Période Décembre 2025</span>
                                        <Badge className="bg-emerald-500">CLÔTURÉ</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold">Période Janvier 2026</span>
                                        <Badge variant="outline" className="text-orange-500 border-orange-200">OUVERT</Badge>
                                    </div>
                                    <Button className="w-full bg-slate-900 text-white font-bold text-xs h-9 mt-2">Valider la Balance Prov.</Button>
                                </div>
                            </Card>

                            <Card className="border-none shadow-sm p-6 bg-gradient-to-br from-indigo-700 to-indigo-900 text-white">
                                <h4 className="font-bold text-base mb-2 italic">Dashboard Analytique</h4>
                                <p className="text-xs opacity-70 leading-relaxed mb-6">Comparaison des performances des pôles cliniques vs budget prévisionnel.</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px]"><span>Execution Budget</span> <span>78%</span></div>
                                    <Progress value={78} className="h-1 bg-white/10" />
                                </div>
                                <Button className="w-full mt-6 bg-white text-indigo-900 font-bold text-xs h-9">Ouvrir le Pilotage</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Analytique par Pôle */}
                <TabsContent value="analytique" className="mt-0 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoadingCenters ? (
                            <div className="col-span-full flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
                        ) : centers?.map((p: any) => (
                            <Card key={p.id} className="border-none shadow-md p-6 group hover:scale-[1.02] transition-transform">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold bg-indigo-500")}>
                                        {p.libelle.charAt(0)}
                                    </div>
                                    <Badge variant="secondary" className="text-xs">{p.code}</Badge>
                                </div>
                                <h4 className="text-lg font-black text-slate-800">{p.libelle}</h4>
                                <div className="mt-4 border-t pt-4">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Type</p>
                                    <h5 className="text-xl font-black text-indigo-600">{p.type}</h5>
                                </div>
                                <Button variant="ghost" className="w-full mt-4 text-xs h-8 group-hover:bg-slate-50">Détail des coûts</Button>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Editions & Etats Financiers (The Sage Core) */}
                <TabsContent value="editions" className="mt-0">
                    <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b">
                            <CardTitle>Centre d'Editions & Etats Réglementaires</CardTitle>
                            <CardDescription>Générez vos documents comptables certifiés (OHADA)</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4 border border-dashed rounded-xl flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600"><FileText className="h-5 w-5" /></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Bilan (OHADA)</p>
                                        <p className="text-[10px] text-slate-400 italic">Visualisation Actif / Passif</p>
                                    </div>
                                    <Download className="h-4 w-4 text-slate-300 group-hover:text-red-600" />
                                </div>
                                <div className="p-4 border border-dashed rounded-xl flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><TableIcon className="h-5 w-5" /></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Balance des Comptes</p>
                                        <p className="text-[10px] text-slate-400 italic">Mouvements & Soldes</p>
                                    </div>
                                    <Download className="h-4 w-4 text-slate-300 group-hover:text-emerald-600" />
                                </div>
                                <div className="p-4 border border-dashed rounded-xl flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><Database className="h-5 w-5" /></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Grand Livre</p>
                                        <p className="text-[10px] text-slate-400 italic">Détail exhaustif des écritures</p>
                                    </div>
                                    <Download className="h-4 w-4 text-slate-300 group-hover:text-indigo-600" />
                                </div>
                                <div className="p-4 border border-dashed rounded-xl flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-colors group shadow-sm bg-indigo-50/20 border-indigo-200">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white"><TrendingUp className="h-5 w-5" /></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-indigo-900">Résultat d'Exploitation</p>
                                        <p className="text-[10px] text-indigo-600 font-bold italic">Editions Pilotage Clinique</p>
                                    </div>
                                    <Printer className="h-4 w-4 text-indigo-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
