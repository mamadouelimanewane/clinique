"use client"

import { useState } from "react"
import {
    Microscope,
    BookOpen,
    Database,
    FlaskConical,
    Search,
    Zap,
    Plus,
    Users,
    Share2,
    Globe,
    Cpu,
    Sparkles,
    FileText,
    PieChart,
    Dna,
    Stethoscope,
    TrendingUp,
    ArrowUpRight,
    Download,
    Library,
    Target,
    Filter,
    Lightbulb,
    Mail,
    History,
    Network
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

export function ScientificHub() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const activeStudies = [
        { id: "PHASE-III", name: "Impact de l'IA sur le diagnostic du Paludisme", director: "Pr. Diallo", progress: 65, phase: "Clinique" },
        { id: "RCT-12", name: "Épidémiologie des maladies cardiovasculaires (Dakar)", director: "Dr. Fall", progress: 40, phase: "Recueil Data" },
        { id: "BIO-TECH", name: "Analyse génomique des résistances bactériennes", director: "Pr. Sow", progress: 90, phase: "Publication" },
    ]

    const recentPublications = [
        { title: "Deep Learning for Retinal Scan in Sub-Saharan Context", journal: "The Lancet", date: "Jan 2026", impact: "High" },
        { title: "Optimisation des flux hospitaliers via IA prédictive", journal: "Revue Médicale Africaine", date: "Déc 2025", impact: "Medium" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header: Futuristic Scientific Look */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
                        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">SIGHI Intelligence & Research (SIR)</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-600">
                        Centre de Recherche & Innovation Médicale
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Accélération des découvertes cliniques par l'IA et la science ouverte
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none">
                        <Library className="mr-2 h-4 w-4" /> PubMed Search
                    </Button>
                    <Button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Étude
                    </Button>
                </div>
            </div>

            {/* Research Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                            <Microscope className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">Études Actives</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">12</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-100">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Publications 2026</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">08</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-100">
                            <Database className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider">Patients (Cohortes)</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">2.5k+</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-slate-900 text-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shadow-xl">
                            <Cpu className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold opacity-60 uppercase tracking-wider">Modèles IA Entraînés</p>
                            <h3 className="text-2xl font-bold">05</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100 border p-1 rounded-xl w-full flex overflow-x-auto justify-start h-auto">
                    <TabsTrigger value="overview" className="gap-2 shrink-0"><Target className="h-4 w-4" /> Lab Innovation</TabsTrigger>
                    <TabsTrigger value="studies" className="gap-2 shrink-0"><FlaskConical className="h-4 w-4" /> Essais Cliniques</TabsTrigger>
                    <TabsTrigger value="ai-lab" className="gap-2 shrink-0"><Sparkles className="h-4 w-4" /> IA Médicale (MLOps)</TabsTrigger>
                    <TabsTrigger value="datalake" className="gap-2 shrink-0"><Database className="h-4 w-4" /> Entrepôt de Données</TabsTrigger>
                    <TabsTrigger value="publications" className="gap-2 shrink-0"><FileText className="h-4 w-4" /> Bibliothèque & Pubs</TabsTrigger>
                </TabsList>

                {/* Lab Innovation: Overview */}
                <TabsContent value="overview" className="mt-0 space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-md overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Projets Médicaux à Impact</CardTitle>
                                        <Badge className="bg-indigo-600 text-white">En cours</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50">
                                            <TableRow>
                                                <TableHead>Projet / Étude</TableHead>
                                                <TableHead>Directeur de Recherche</TableHead>
                                                <TableHead>Phase</TableHead>
                                                <TableHead className="text-right">Avancement</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {activeStudies.map((study) => (
                                                <TableRow key={study.id} className="hover:bg-slate-50 cursor-pointer">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200">
                                                                <Dna className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold">{study.name}</p>
                                                                <p className="text-[10px] text-slate-400 font-mono italic">{study.id}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-xs font-semibold">{study.director}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="text-[10px] uppercase font-black">{study.phase}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right w-32">
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between text-[10px] font-bold">
                                                                <span>{study.progress}%</span>
                                                            </div>
                                                            <Progress value={study.progress} className="h-1.5" />
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-none shadow-sm p-6 bg-slate-900 text-white relative overflow-hidden group">
                                    <h4 className="text-sm font-bold mb-4 uppercase text-indigo-400 tracking-tighter flex items-center gap-2">
                                        <Zap className="h-4 w-4" /> Accélérateur IA
                                    </h4>
                                    <div className="space-y-4">
                                        <p className="text-xs text-slate-400">Le modèle de segmentation d'images pulmonaires a atteint une précision de **98.2%** sur le dataset local.</p>
                                        <div className="flex gap-2">
                                            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-xs h-8">Tester en Staging</Button>
                                            <Button variant="outline" className="flex-1 border-white/20 text-xs h-8">Logs Entraînement</Button>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="border-none shadow-sm p-6 bg-indigo-50 border border-indigo-100 flex flex-col justify-between">
                                    <div className="flex items-center gap-2 mb-2 text-indigo-900">
                                        <Network className="h-5 w-5" />
                                        <h4 className="font-bold text-xs uppercase tracking-tighter">Collaborations</h4>
                                    </div>
                                    <p className="text-[10px] text-slate-500 leading-relaxed mb-4 italic">
                                        Partenariats actifs : Institut Pasteur, Stanford Medical AI, Université de Dakar.
                                    </p>
                                    <Button variant="ghost" className="w-full text-xs h-7 border-indigo-200 text-indigo-700 hover:bg-indigo-100">
                                        Demander un accès chercheur
                                    </Button>
                                </Card>
                            </div>
                        </div>

                        {/* Right Panel: Academic Intelligence */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md overflow-hidden bg-white p-6">
                                <h4 className="font-bold text-sm mb-4">Veille Académique (Flux PubMed)</h4>
                                <div className="space-y-4">
                                    {recentPublications.map((pub, idx) => (
                                        <div key={idx} className="p-3 bg-slate-50 rounded-xl border hover:border-indigo-300 transition-all cursor-pointer group">
                                            <p className="text-xs font-bold group-hover:text-indigo-600">{pub.title}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-[10px] text-slate-400">{pub.journal} • {pub.date}</span>
                                                <Badge className={cn(
                                                    "text-[8px] h-4",
                                                    pub.impact === "High" ? "bg-red-500" : "bg-emerald-500"
                                                )}>{pub.impact} Impact</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-4 bg-slate-900 text-white text-xs h-9">
                                    <Search className="mr-2 h-4 w-4" /> Explorer la bibliothèque
                                </Button>
                            </Card>

                            <Card className="border-none shadow-sm p-6 bg-gradient-to-br from-indigo-800 to-indigo-950 text-white">
                                <Lightbulb className="h-8 w-8 text-yellow-400 mb-4" />
                                <h4 className="font-bold text-base mb-1">Appel à projets (Août 2026)</h4>
                                <p className="text-xs opacity-70 mb-4 tracking-tight">Thème : "IA et Soins de Proximité en Milieu Rural". Financement disponible jusqu'à 15M FCFA.</p>
                                <Button className="w-full bg-indigo-500 hover:bg-indigo-600 font-bold text-xs h-9">Consulter l'appel</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* AI Lab: ML Engineering */}
                <TabsContent value="ai-lab" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-none shadow-md p-6 bg-black text-white relative h-64 overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Cpu className="h-20 w-20" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <h4 className="text-xl font-black mb-1">Inférence de Diagnostics</h4>
                                    <p className="text-xs text-slate-400">Analyse multimodale des dossiers patients.</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold"><span>Utilisation GPU (T4v2)</span> <span>42%</span></div>
                                    <Progress value={42} className="h-1 bg-white/10" />
                                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold text-[10px] h-7">Monitorer</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
