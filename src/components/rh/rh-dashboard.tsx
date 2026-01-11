"use client"

import { useState } from "react"
import {
    Users,
    Briefcase,
    FileBadge,
    Banknote,
    Calendar,
    Search,
    Plus,
    UserPlus,
    MoreVertical,
    GraduationCap,
    ScrollText,
    History,
    CheckCircle2,
    AlertCircle,
    Clock,
    Calculator,
    Building2,
    Stethoscope,
    Fingerprint,
    FileText,
    TrendingUp,
    ShieldCheck,
    MapPin,
    Phone,
    Mail,
    Archive,
    Download,
    Eye,
    Landmark,
    Percent,
    Loader2,
    TrendingDown,
    ArrowRightLeft,
    ArrowUpRight
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
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

type Employee = {
    id: string
    nom: string
    prenom: string
    fonction: string
    typeContrat: string
    categorie: string
    dateEmbauche: string
    actif: boolean
}

export function RHDashboard() {
    const [activeTab, setActiveTab] = useState("employees")

    const { data: employeesData, isLoading: isLoadingEmployees } = useQuery<Employee[]>({
        queryKey: ['rh-employees'],
        queryFn: async () => {
            const res = await fetch('/api/rh/employes')
            if (!res.ok) return [
                { id: "1", nom: "DIAGNE", prenom: "Amary", fonction: "Chirurgien Chef", typeContrat: "CDI", categorie: "Médical", dateEmbauche: "2018-05-12", actif: true },
                { id: "2", nom: "SALL", prenom: "Fatou", fonction: "Infirmière Major", typeContrat: "CDI", categorie: "Soins", dateEmbauche: "2020-02-15", actif: true },
                { id: "3", nom: "SY", prenom: "Abdou", fonction: "Biologiste", typeContrat: "CDD", categorie: "Laboratoire", dateEmbauche: "2023-11-01", actif: true },
            ]
            return res.json()
        }
    })

    const stats = {
        totalStaff: 124,
        newHires: 3,
        payrollTotal: "48,420,000 F",
        averageTenure: "4.2 ans"
    }

    const payrollSummary = [
        { item: "Masse Salariale Nette", amount: "34,480,000", type: "Net" },
        { item: "Cotisations Sociales (IPRES/IPM)", amount: "8,370,000", type: "Retenue" },
        { item: "IRPP (Impôt sur le Revenu)", amount: "5,570,000", type: "Retenue" },
    ]

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* High-End Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                            <Users className="h-6 w-6" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Console <span className="text-teal-600">RH</span> & Talents</h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Capital Humain • Paie SNS • Performance Clinique</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                        <Download className="mr-2 h-4 w-4" /> Export Bilan Social
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                        <UserPlus className="mr-2 h-5 w-5" /> Nouveau Talent
                    </Button>
                </div>
            </div>

            {/* Premium Metrics Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Effectif Global", value: stats.totalStaff, sub: "Actif ce mois", icon: Users, color: "teal", trend: "+2" },
                    { label: "Masse Salariale", value: stats.payrollTotal, sub: "Mois en cours", icon: Banknote, color: "indigo", trend: "Stable" },
                    { label: "Ancienneté Moy.", value: stats.averageTenure, sub: "Fidélisation", icon: GraduationCap, color: "amber", trend: "Excellente" },
                    { label: "Climat Social", value: "94%", sub: "Index satisfaction", icon: ShieldCheck, color: "emerald", trend: "+4%" },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 group">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn(
                                    "p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110",
                                    stat.color === 'teal' ? "bg-teal-50 text-teal-600" :
                                        stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                                            stat.color === 'amber' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                )}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <Badge variant="outline" className="border-slate-100 text-[9px] font-black uppercase italic tracking-tighter">{stat.trend}</Badge>
                            </div>
                            <h4 className="text-3xl font-black tracking-tighter text-slate-900 group-hover:translate-x-1 transition-transform">{stat.value}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic tracking-tighter">{stat.label}</p>
                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">{stat.sub}</span>
                                {/* <ArrowUpRight className="h-3 w-3 text-slate-300" /> */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="employees" className="space-y-8" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100/50 rounded-[28px] p-2 h-[80px] shadow-inner border border-slate-200 flex overflow-x-auto overflow-y-hidden justify-start scrollbar-hide">
                    {[
                        { val: "employees", label: "Annuaire & Contrats", icon: Users },
                        { val: "payroll", label: "Paie & Fiscalité", icon: Calculator },
                        { val: "recrutement", label: "Recrutement", icon: UserPlus },
                        { val: "conges", label: "Congés & Absences", icon: Clock },
                        { val: "reporting", label: "Reporting RH", icon: TrendingUp },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full rounded-[20px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-teal-600 font-black text-[10px] uppercase tracking-widest transition-all gap-3">
                            <t.icon className="h-4 w-4" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Gestion des Employés & Contrats */}
                <TabsContent value="employees" className="mt-0 space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <Card className="lg:col-span-1 border-none shadow-sm bg-slate-50 p-4 space-y-6">
                            <div>
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-widest">Type de Contrat</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-indigo-500" /> CDI</span>
                                        <Badge className="bg-indigo-100 text-indigo-700 border-none">82</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="flex items-center gap-2"><ScrollText className="h-4 w-4 text-teal-500" /> CDD</span>
                                        <Badge className="bg-teal-100 text-teal-700 border-none">24</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-orange-500" /> Stagiaires</span>
                                        <Badge className="bg-orange-100 text-orange-700 border-none">12</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="flex items-center gap-2"><History className="h-4 w-4 text-slate-500" /> Contractuels</span>
                                        <Badge className="bg-slate-200 text-slate-700 border-none">6</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-widest">Alerte Contrats</h4>
                                <div className="p-3 bg-red-50 rounded-lg border border-red-100 border-l-4 border-l-red-500">
                                    <p className="text-[10px] font-bold text-red-900">3 CDD arrivent à terme</p>
                                    <p className="text-[10px] text-red-700">Action requise sous 15 jours</p>
                                </div>
                            </div>
                        </Card>

                        <div className="lg:col-span-3 space-y-4">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-white dark:bg-slate-900 border-b flex flex-row items-center justify-between py-4">
                                    <div>
                                        <CardTitle className="text-lg">Collaborateurs de la Clinique</CardTitle>
                                        <CardDescription>Liste exhaustive et statuts contractuels</CardDescription>
                                    </div>
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input placeholder="Rechercher..." className="pl-9 w-64 bg-slate-50 border-none h-9" />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50">
                                            <TableRow>
                                                <TableHead>Collaborateur</TableHead>
                                                <TableHead>Contrat</TableHead>
                                                <TableHead>Pôle / Service</TableHead>
                                                <TableHead>Ancienneté</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(isLoadingEmployees) ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="h-24 text-center">
                                                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                                    </TableCell>
                                                </TableRow>
                                            ) : employeesData?.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                                        Aucun collaborateur trouvé.
                                                    </TableCell>
                                                </TableRow>
                                            ) : employeesData?.map((emp: Employee) => (
                                                <TableRow key={emp.id} className="group hover:bg-slate-50 transition-colors">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-9 w-9 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 font-bold border">
                                                                {emp.nom.substring(0, 1).toUpperCase()}{emp.prenom.substring(0, 1).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold">{emp.prenom} {emp.nom}</p>
                                                                <p className="text-[10px] text-slate-400">{emp.fonction}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-[10px] font-black",
                                                            emp.typeContrat === "CDI" ? "border-indigo-200 text-indigo-700 bg-indigo-50" :
                                                                emp.typeContrat === "CDD" ? "border-teal-200 text-teal-700 bg-teal-50" : "bg-slate-50 text-slate-500"
                                                        )}>{emp.typeContrat}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-sm font-medium text-slate-600">{emp.categorie}</TableCell>
                                                    <TableCell className="text-xs text-slate-400">{format(new Date(emp.dateEmbauche), 'dd/MM/yyyy')}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={cn("h-2 w-2 rounded-full", emp.actif ? "bg-emerald-500" : "bg-orange-400")} />
                                                            <span className="text-xs font-semibold">{emp.actif ? "Actif" : "Inactif"}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Voir Dossier</DropdownMenuItem>
                                                                <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> Contrat & Avenant</DropdownMenuItem>
                                                                <DropdownMenuItem><Calendar className="mr-2 h-4 w-4" /> Historique Congés</DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-red-600"><Archive className="mr-2 h-4 w-4" /> Archiver</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Paie & Fiscalité Sénégalaise */}
                <TabsContent value="payroll" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-slate-900 text-white flex flex-row items-center justify-between border-none py-6">
                                    <div>
                                        <CardTitle className="text-xl">Préparation de la Paie</CardTitle>
                                        <CardDescription className="text-teal-400">Mois de Janvier 2026 • Conformité IRPP / IPRES / IPM</CardDescription>
                                    </div>
                                    <Button className="bg-teal-500 hover:bg-teal-600 text-white font-bold h-10 px-6 shadow-xl">
                                        <Calculator className="mr-2 h-5 w-5" /> Lancer le Calcul
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">Salaire Brut <TrendingUp className="h-4 w-4 text-emerald-500" /></p>
                                            <h4 className="text-2xl font-black text-slate-800">42,85M <span className="text-xs">F</span></h4>
                                        </div>
                                        <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex flex-col justify-between">
                                            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 flex items-center justify-between">Retenues Fiscales <TrendingDown className="h-4 w-4 text-red-500" /></p>
                                            <h4 className="text-2xl font-black text-red-900">8,37M <span className="text-xs">F</span></h4>
                                        </div>
                                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col justify-between">
                                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center justify-between">Net à Payer <CheckCircle2 className="h-4 w-4 text-emerald-500" /></p>
                                            <h4 className="text-2xl font-black text-emerald-900">34,48M <span className="text-xs">F</span></h4>
                                        </div>
                                    </div>

                                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">Détail des Cotisations Sociales (Sénégal)</h5>
                                    <div className="space-y-4">
                                        {payrollSummary.map((item) => (
                                            <div key={item.item} className="flex justify-between items-center group">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "h-2 w-2 rounded-full",
                                                        item.type === "Ajout" ? "bg-emerald-500" : item.type === "Retenue" ? "bg-red-500" : "bg-slate-300"
                                                    )} />
                                                    <span className="text-sm font-semibold text-slate-700">{item.item}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={cn(
                                                        "font-mono text-sm font-bold",
                                                        item.type === "Retenue" ? "text-red-600" : "text-slate-900"
                                                    )}>{item.amount} F</span>
                                                    <ArrowRightLeft className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 cursor-pointer" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
                                    <Button variant="outline" className="text-xs h-9">Exporter Fichiers Virement BOA/SGBS</Button>
                                    <Button variant="outline" className="text-xs h-9">Générer Bulletins (124 PDF)</Button>
                                </div>
                            </Card>
                        </div>

                        {/* Fiscal & Social Compliance Side Panel */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md p-6 bg-white">
                                <h4 className="font-bold text-sm mb-4 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal-600" /> Paramètres Légaux SNS</h4>
                                <div className="space-y-4">
                                    <div className="p-3 bg-teal-50/50 rounded-lg border border-teal-100">
                                        <div className="flex justify-between text-[10px] font-bold mb-1">
                                            <span>IPRES Générale</span>
                                            <span>5.6%</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span>IPRES Cadre</span>
                                            <span>2.4%</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span>IPM (Part Patrons)</span>
                                            <span>50%</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100 italic">
                                        <p className="text-[10px] text-purple-700">Barème IRPP 2026 appliqué automatiquement sur les revenus imposables.</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-none shadow-sm p-6 bg-gradient-to-br from-teal-800 to-indigo-900 text-white relative overflow-hidden group">
                                <Landmark className="absolute -bottom-4 -right-4 h-24 w-24 opacity-10" />
                                <h4 className="text-lg font-black mb-1">Déclaration VRS</h4>
                                <p className="text-xs opacity-70 mb-4 tracking-tight underline">Versement retenues à la source (VRS) prêt pour le portail Etax.</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold mb-4">
                                    <span className="p-1 bg-white/20 rounded">#X112-2026</span>
                                    <span>Généré le 05/01</span>
                                </div>
                                <Button className="w-full bg-white text-teal-900 font-bold text-xs h-9">Télécharger Fichier XML Etax</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
