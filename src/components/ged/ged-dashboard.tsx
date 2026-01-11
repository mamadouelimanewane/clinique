"use client"

import { useState } from "react"
import {
    FileText,
    Folder,
    Upload,
    Search,
    Plus,
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    History,
    Share2,
    Download,
    Eye,
    Tag,
    ShieldCheck,
    Workflow,
    ArrowRight,
    Filter,
    Layers,
    UserCircle,
    HardDrive,
    Lock
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

export function GEDDashboard() {
    const [activeTab, setActiveTab] = useState("explorer")

    // --- Mock Data ---
    const stats = {
        totalFiles: 1245,
        pendingApprovals: 8,
        storageUsed: "4.2 GB / 10 GB",
        activeWorkflows: 12
    }

    const recentDocs = [
        { id: "doc-1", name: "Protocole Chirurgie Ambulatoire.pdf", category: "Médical", owner: "Dr. Fall", date: "Aujourd'hui", status: "Validé" },
        { id: "doc-2", name: "Contrat Laboratoire Externe.docx", category: "Administratif", owner: "Admin", date: "Hier", status: "En révision" },
        { id: "doc-3", name: "Fiche Consentement Eclairé.pdf", category: "Patient", owner: "Inf. Marie", date: "10/01", status: "Brouillon" },
    ]

    const activeWorkflows = [
        {
            id: "wf-1",
            name: "Validation Achat Scanner",
            initiator: "Directeur Médical",
            step: "Compta (Approbation)",
            progress: 66,
            priority: "Haute"
        },
        {
            id: "wf-2",
            name: "Recrutement Infirmier Bloc",
            initiator: "RH",
            step: "Entretien Technique",
            progress: 40,
            priority: "Normal"
        },
        {
            id: "wf-3",
            name: "Mise à jour Protocoles Hygiène",
            initiator: "Qualité",
            step: "Signature Biologiste",
            progress: 90,
            priority: "Critique"
        },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 border-none">
                        G.E.D & Workflows Intelligent
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Gestion documentaire, processus d'approbation et archivage légal
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-slate-200">
                        <History className="mr-2 h-4 w-4" /> Activité
                    </Button>
                    <Button className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all hover:scale-105">
                        <Upload className="mr-2 h-4 w-4" /> Uploader
                    </Button>
                    <Button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouveau Workflow
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Documents Totaux</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.totalFiles}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-orange-50 dark:bg-orange-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-orange-600/70 uppercase tracking-wider">En attente d'avis</p>
                            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.pendingApprovals}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <Workflow className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Process actifs</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.activeWorkflows}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <HardDrive className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Espace Stockage</p>
                            <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">{stats.storageUsed}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="explorer" className="space-y-4" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between overflow-x-auto pb-1 gap-4">
                    <TabsList className="bg-slate-100 border p-1 rounded-xl shrink-0">
                        <TabsTrigger value="explorer">Explorateur</TabsTrigger>
                        <TabsTrigger value="workflows">Workflows</TabsTrigger>
                        <TabsTrigger value="tasks">Mes Tâches</TabsTrigger>
                        <TabsTrigger value="config">Paramètres GED</TabsTrigger>
                    </TabsList>

                    <div className="relative w-max hidden lg:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input placeholder="Recherche globale (OCR)..." className="pl-9 w-80 bg-slate-50 border-none shadow-inner" />
                    </div>
                </div>

                {/* Explorateur de Documents */}
                <TabsContent value="explorer" className="mt-0 space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar: Categories */}
                        <Card className="lg:col-span-1 border-none bg-slate-50 dark:bg-slate-900 p-4 space-y-6">
                            <div>
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-widest">Catégories</h4>
                                <div className="space-y-1">
                                    <Button variant="ghost" className="w-full justify-start text-sm bg-white dark:bg-black/20 shadow-sm"><Folder className="mr-2 h-4 w-4 text-yellow-500" /> Dossiers Patients</Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm text-slate-600"><Folder className="mr-2 h-4 w-4 text-blue-500" /> Administratif</Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm text-slate-600"><Folder className="mr-2 h-4 w-4 text-red-500" /> Protocoles Médicaux</Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm text-slate-600"><Folder className="mr-2 h-4 w-4 text-emerald-500" /> Ressources Humaines</Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm text-slate-600"><Folder className="mr-2 h-4 w-4 text-indigo-500" /> Comptabilité</Button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-widest">Tags Récents</h4>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="text-[10px] bg-white">#CR-Urgent</Badge>
                                    <Badge variant="outline" className="text-[10px] bg-white">#2026</Badge>
                                    <Badge variant="outline" className="text-[10px] bg-white">#Signé</Badge>
                                    <Badge variant="outline" className="text-[10px] bg-white">#Confidentiel</Badge>
                                </div>
                            </div>

                            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4">
                                <h5 className="text-xs font-bold mb-2 flex items-center gap-2"><ShieldCheck className="h-3 w-3 text-emerald-400" /> Sécurité GED</h5>
                                <p className="text-[10px] opacity-70 leading-relaxed">Le cryptage AES-256 est activé sur tous les documents. Vos accès sont enregistrés.</p>
                            </Card>
                        </Card>

                        {/* Document List */}
                        <div className="lg:col-span-3 space-y-4">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-white dark:bg-slate-900 border-b pb-4">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Dernières Modifications</CardTitle>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" className="h-8 w-8"><Layers className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="icon" className="h-8 w-8"><Filter className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nom du Document</TableHead>
                                                <TableHead>Catégorie</TableHead>
                                                <TableHead>Propriétaire</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentDocs.map((doc) => (
                                                <TableRow key={doc.id} className="group hover:bg-slate-50 transition-colors">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className={cn(
                                                                "h-9 w-9 rounded-lg flex items-center justify-center text-white shadow-sm",
                                                                doc.name.endsWith('.pdf') ? "bg-red-500" : "bg-blue-600"
                                                            )}>
                                                                <FileText className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">{doc.name}</p>
                                                                <p className="text-[10px] text-slate-400">Modifié {doc.date}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="text-[10px]">{doc.category}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-sm">{doc.owner}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className={cn(
                                                            "text-[10px] font-bold",
                                                            doc.status === "Validé" ? "bg-emerald-100 text-emerald-700" :
                                                                doc.status === "En révision" ? "bg-orange-100 text-orange-700" : ""
                                                        )}>{doc.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500"><Eye className="h-4 w-4" /></Button>
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500"><Download className="h-4 w-4" /></Button>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500"><MoreVertical className="h-4 w-4" /></Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Partager</DropdownMenuItem>
                                                                    <DropdownMenuItem><Workflow className="mr-2 h-4 w-4" /> Lancer Workflow</DropdownMenuItem>
                                                                    <DropdownMenuItem><Tag className="mr-2 h-4 w-4" /> Modifier Tags</DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-red-600"><Lock className="mr-2 h-4 w-4" /> Verrouiller</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
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

                {/* Gestion des Workflows */}
                <TabsContent value="workflows" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Workflows d'approbation en cours</CardTitle>
                                    <CardDescription>Suivi des processus décisionnels et signatures</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {activeWorkflows.map((wf) => (
                                        <div key={wf.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-sm transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-sm">{wf.name}</h4>
                                                        <Badge className={cn(
                                                            "text-[8px] h-4 uppercase tracking-tighter",
                                                            wf.priority === "Critique" ? "bg-red-500" :
                                                                wf.priority === "Haute" ? "bg-orange-500" : "bg-slate-500"
                                                        )}>{wf.priority}</Badge>
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 mt-1">Initiateur : {wf.initiator}</p>
                                                </div>
                                                <Button size="sm" variant="ghost" className="h-7 text-indigo-600 font-bold hover:text-indigo-700 text-xs">Ouvrir le suivi</Button>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                                    <span className="flex items-center gap-1 text-indigo-600"><Clock className="h-3 w-3" /> Étape actuelle : {wf.step}</span>
                                                    <span>{wf.progress}% Complété</span>
                                                </div>
                                                <Progress value={wf.progress} className="h-2 bg-slate-200" />
                                            </div>

                                            <div className="mt-4 flex items-center gap-4 text-[10px] text-slate-400">
                                                <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Initié</div>
                                                <ArrowRight className="h-3 w-3" />
                                                <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Révision RH</div>
                                                <ArrowRight className="h-3 w-3" />
                                                <div className="flex items-center gap-1 font-bold text-indigo-600 underline">Approbation Compta</div>
                                                <ArrowRight className="h-3 w-3" />
                                                <div className="flex items-center gap-1">Clôture</div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                                <div className="p-4 border-t bg-slate-50/50 flex justify-center">
                                    <Button variant="link" className="text-slate-400 text-xs">Voir tous les processus archivés</Button>
                                </div>
                            </Card>
                        </div>

                        {/* Visual Workflow Builder Preview */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md bg-white dark:bg-slate-900 p-6 overflow-hidden relative">
                                <Workflow className="absolute -top-6 -right-6 h-24 w-24 text-indigo-50/50 dark:text-indigo-900/10 pointer-events-none" />
                                <h4 className="font-bold text-sm mb-4">Modèles de Workflow</h4>
                                <div className="space-y-3">
                                    <div className="p-3 border rounded-lg bg-slate-50 hover:border-indigo-300 hover:bg-white cursor-pointer transition-all">
                                        <p className="text-xs font-bold">Approbation Facture Fournisseur</p>
                                        <p className="text-[10px] text-slate-400 mt-1">3 Étapes : Compta → DG → Trésorerie</p>
                                    </div>
                                    <div className="p-3 border rounded-lg bg-slate-50 hover:border-indigo-300 hover:bg-white cursor-pointer transition-all">
                                        <p className="text-xs font-bold">Validation Rapport Médical</p>
                                        <p className="text-[10px] text-slate-400 mt-1">2 Étapes : Praticien → Chef de Pôle</p>
                                    </div>
                                </div>
                                <Button className="w-full mt-6 bg-indigo-600 text-white font-bold text-xs h-9">Designer un modèle</Button>
                            </Card>

                            <Card className="border-none shadow-sm p-4 bg-orange-50 border-l-4 border-orange-500">
                                <div className="flex gap-3">
                                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                                    <div>
                                        <h4 className="text-xs font-bold text-orange-900">Blocage Détecté</h4>
                                        <p className="text-[10px] text-orange-700 leading-relaxed mt-1">Le workflow "Remboursement Tiers-Payant" est bloqué depuis 48h sur la signature du Dr. Ndiaye.</p>
                                        <Button variant="ghost" className="h-6 mt-2 text-[10px] p-0 text-orange-900 underline">Relancer l'utilisateur</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Mes Tâches (Signatures, Revues) */}
                <TabsContent value="tasks" className="mt-0">
                    <Card className="border-none shadow-md">
                        <CardHeader className="bg-slate-50/50 border-b">
                            <CardTitle>Actions Requises</CardTitle>
                            <CardDescription>Documents en attente de votre intervention</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Document</TableHead>
                                        <TableHead>Priorité</TableHead>
                                        <TableHead>Échéance</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Badge variant="outline" className="text-[8px] uppercase border-indigo-200 text-indigo-700 bg-indigo-50">SIGNATURE</Badge>
                                        </TableCell>
                                        <TableCell className="font-bold text-sm">Bon de Sortie #4412.pdf</TableCell>
                                        <TableCell><Badge className="bg-red-500 text-white text-[8px]">URGENT</Badge></TableCell>
                                        <TableCell className="text-xs text-slate-500">Aujourd'hui, 18h00</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" className="bg-indigo-600">Signer (Certifié)</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Badge variant="outline" className="text-[8px] uppercase border-slate-200 text-slate-600">REVISION</Badge>
                                        </TableCell>
                                        <TableCell className="font-medium text-sm">Note Interne - Nouveaux Horaires.docx</TableCell>
                                        <TableCell><Badge variant="secondary" className="text-[8px]">NORMAL</Badge></TableCell>
                                        <TableCell className="text-xs text-slate-500">Dans 2 jours</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="outline">Relire</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
