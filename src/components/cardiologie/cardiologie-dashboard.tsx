"use client"

import { useState } from "react"
import {
    HeartPulse,
    Activity,
    Stethoscope,
    Zap,
    Plus,
    Search,
    Clock,
    AlertCircle,
    ArrowUpRight,
    LineChart,
    Settings,
    FileText,
    Thermometer,
    Heart,
    Zap as Flash,
    ClipboardList,
    TrendingDown,
    TrendingUp
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export function CardiologieDashboard() {
    const [activeTab, setActiveTab] = useState("overview")

    // --- Mock Data ---
    const stats = {
        consultationsToday: 15,
        ecgDone: 8,
        heartRateAvg: 72,
        hypertensivePatients: 42
    }

    const patients = [
        { id: "C-01", name: "Ibrahima Fall", age: "64 ans", status: "STABLE", nextVist: "11/01", condition: "Insuffisance Cardiaque" },
        { id: "C-02", name: "Ndeye Gueye", age: "52 ans", status: "SURVEILLANCE", nextVist: "Aujourd'hui", condition: "HTA Élaborée" },
        { id: "C-03", name: "Samba Ndiaye", age: "45 ans", status: "URGENCE", nextVist: "Maintenant", condition: "Douleur Thoracique" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">
                        Service Cardiologie & Rythmologie
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Expertise cardiovasculaire, monitoring et soins intensifs cardiaques
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-red-200 hover:bg-red-50 text-red-700">
                        <Activity className="mr-2 h-4 w-4" /> Monitoring LIVE
                    </Button>
                    <Button className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100 transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Consultation
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-red-50 dark:bg-red-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg">
                            <HeartPulse className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-red-600/70 uppercase tracking-wider">Patients (Jour)</p>
                            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100">{stats.consultationsToday}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-50 dark:bg-indigo-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <Flash className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/70 uppercase tracking-wider">ECG Réalisés</p>
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.ecgDone}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Moy. Rythme</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.heartRateAvg} bpm</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-rose-50 dark:bg-rose-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-rose-600/70 uppercase tracking-wider">Suivi HTA</p>
                            <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-100">{stats.hypertensivePatients}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100 border p-1 rounded-xl">
                    <TabsTrigger value="overview">Vue Globale</TabsTrigger>
                    <TabsTrigger value="ecg">ECG & Holter</TabsTrigger>
                    <TabsTrigger value="tests">Épreuves d'effort</TabsTrigger>
                    <TabsTrigger value="echo">Échocardiographie</TabsTrigger>
                    <TabsTrigger value="interven">Intégration Bloc</TabsTrigger>
                </TabsList>

                {/* Vue Globale */}
                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Monitoring Patients Hospitalisés</CardTitle>
                                        <Badge className="bg-red-500 text-white animate-pulse">LIVE FEED</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Condition</TableHead>
                                                <TableHead>Tension / BPM</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {patients.map((p) => (
                                                <TableRow key={p.id} className="hover:bg-slate-50 transition-colors">
                                                    <TableCell className="font-bold">{p.name} <span className="text-[10px] text-slate-400 ml-1">{p.age}</span></TableCell>
                                                    <TableCell className="text-sm font-medium">{p.condition}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-xs font-bold text-slate-900">12/8</div>
                                                            <div className="h-4 w-15 bg-slate-100 rounded-full overflow-hidden flex items-center">
                                                                <div className="h-full bg-red-400" style={{ width: '70%' }} />
                                                            </div>
                                                            <div className="text-xs font-bold text-red-600">75 bpm</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={cn(
                                                            "text-xs uppercase font-black",
                                                            p.status === "URGENCE" ? "border-red-200 text-red-600 bg-red-50" : "border-slate-200"
                                                        )}>{p.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="font-bold text-red-600">S'alerter</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-900 to-indigo-950 text-white p-6">
                                    <h4 className="text-sm font-bold opacity-70 mb-2 uppercase tracking-tighter">Holter en cours</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-white/10 p-2 rounded border border-white/5">
                                            <span className="text-xs font-semibold">M. Fall - 24h Rhythm</span>
                                            <span className="text-[10px] text-emerald-400 font-bold">Enregistrement...</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/10 p-2 rounded border border-white/5">
                                            <span className="text-xs font-semibold">Mme. Gueye - 48h Tension</span>
                                            <span className="text-[10px] text-emerald-400 font-bold">Enregistrement...</span>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4 bg-white text-indigo-900 hover:bg-slate-100 font-bold text-xs h-8">Voir tous les Holters</Button>
                                </Card>
                                <Card className="border-none shadow-sm p-6 bg-rose-50 border-2 border-rose-100">
                                    <h4 className="text-sm font-bold text-rose-900 mb-2 uppercase tracking-tighter">Vigilance HTA</h4>
                                    <p className="text-xs text-rose-700 leading-relaxed">3 patients ont dépassé le seuil critique (systolique {'>'} 160) ce matin.</p>
                                    <div className="mt-4 flex -space-x-2">
                                        <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center font-bold text-[10px]">IF</div>
                                        <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center font-bold text-[10px]">NG</div>
                                        <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center font-bold text-[10px]">SN</div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Right Panel: Heart Graph & Team */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md overflow-hidden bg-white p-6 relative">
                                <h4 className="font-bold text-sm mb-4">Analyse du Rythme (Moyenne Équipe)</h4>
                                <div className="h-32 w-full bg-slate-50 rounded-xl relative overflow-hidden flex items-end px-2 gap-1 pb-2">
                                    {[20, 45, 30, 60, 40, 75, 50, 65, 30, 40, 50, 80, 45, 35].map((h, i) => (
                                        <div key={i} className="flex-1 bg-red-400 rounded-t-sm" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-xs font-bold">Stabilité : 92%</div>
                                    <Badge className="bg-emerald-100 text-emerald-700">Optimal</Badge>
                                </div>
                            </Card>

                            <Card className="border-none shadow-sm p-4 space-y-4">
                                <h3 className="font-bold text-sm flex items-center gap-2"><Clock className="h-4 w-4 text-red-600" /> Équipe en Service</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs shadow-sm">DF</div>
                                        <div>
                                            <p className="text-xs font-bold">Dr. Diop Fall</p>
                                            <p className="text-[10px] text-slate-500">Cardiologue Interventionnel</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shadow-sm">MK</div>
                                        <div>
                                            <p className="text-xs font-bold">Inf. Marie Kane</p>
                                            <p className="text-[10px] text-slate-500">Unité de Soins Intensifs</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full text-xs variant-ghost h-8">Modifier Planning</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* ECG & Holter Placeholder */}
                <TabsContent value="ecg">
                    <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader>
                            <CardTitle>Interprétation ECG Numérique</CardTitle>
                            <CardDescription>Traitement automatique des signaux et validation cardiologue</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 border-t">
                            <Activity className="h-16 w-16 text-red-500 animate-pulse mb-6" />
                            <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">Signal ECG 12 Pistes • Patient: Ibrahima Fall</p>
                            <div className="w-full max-w-lg h-24 border-2 border-dashed border-slate-200 mt-6 rounded-xl flex items-center justify-center text-slate-300 text-[10px] font-bold">
                                GLISSER LE FICHIER .DICOM OU .XML ICI
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
