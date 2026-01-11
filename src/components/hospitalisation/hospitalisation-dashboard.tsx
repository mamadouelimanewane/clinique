"use client"

import { useState } from "react"
import {
    Bed,
    Users,
    Activity,
    AlertTriangle,
    Clock,
    TrendingUp,
    Building2,
    UserPlus,
    FileText,
    Stethoscope,
    Pill,
    Heart,
    Thermometer,
    Droplets,
    Wind,
    Calendar,
    ChevronRight,
    Search,
    Filter,
    Download,
    Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BedManagementGrid } from "./bed-management-grid"
import { PatientAdmissionForm } from "./patient-admission-form"
import { ActivePatientsMonitor } from "./active-patients-monitor"
import { NursingObservations } from "./nursing-observations"
import { DischargeManagement } from "./discharge-management"

export function HospitalisationDashboard() {
    const [selectedService, setSelectedService] = useState<string>("all")

    // KPIs en temps réel
    const stats = {
        totalBeds: 120,
        occupied: 87,
        available: 33,
        criticalPatients: 5,
        admissionsToday: 8,
        dischargesPlanned: 12,
        averageStay: 4.2,
        occupancyRate: 72.5
    }

    const services = [
        { id: "medecine", name: "Médecine Générale", beds: 40, occupied: 32, color: "bg-blue-500" },
        { id: "chirurgie", name: "Chirurgie", beds: 30, occupied: 25, color: "bg-red-500" },
        { id: "pediatrie", name: "Pédiatrie", beds: 25, occupied: 18, color: "bg-pink-500" },
        { id: "maternite", name: "Maternité", beds: 15, occupied: 8, color: "bg-purple-500" },
        { id: "reanimation", name: "Réanimation", beds: 10, occupied: 4, color: "bg-orange-500" },
    ]

    return (
        <div className="space-y-6">
            {/* Header avec actions rapides */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Gestion Hospitalisation
                    </h1>
                    <p className="text-muted-foreground">
                        Système intégré de gestion des lits et monitoring patient 24/7
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none">
                        <Download className="mr-2 h-4 w-4" /> Rapport
                    </Button>
                    <Button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
                        <UserPlus className="mr-2 h-4 w-4" /> Nouvelle Admission
                    </Button>
                </div>
            </div>

            {/* KPIs Grid - Premium Design */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <Card className="col-span-2 border-none shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Lits Totaux</CardTitle>
                        <Bed className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalBeds}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-emerald-500 font-bold">{stats.available}</span> disponibles
                        </p>
                    </CardContent>
                </Card>

                <Card className="col-span-2 border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Taux d'Occupation</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.occupancyRate}%</div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all"
                                style={{ width: `${stats.occupancyRate}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-2 border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Patients Critiques</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600">{stats.criticalPatients}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Surveillance renforcée
                        </p>
                    </CardContent>
                </Card>

                <Card className="col-span-2 border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Admissions (J)</CardTitle>
                        <UserPlus className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600">{stats.admissionsToday}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.dischargesPlanned} sorties prévues
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Services Overview - Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {services.map((service) => {
                    const occupancyPercent = (service.occupied / service.beds) * 100
                    return (
                        <Card
                            key={service.id}
                            className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            onClick={() => setSelectedService(service.id)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className={`h-3 w-3 rounded-full ${service.color}`} />
                                    <Building2 className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                                </div>
                                <CardTitle className="text-sm mt-2">{service.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Occupation</span>
                                    <span className="font-bold">{service.occupied}/{service.beds}</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                                    <div
                                        className={`${service.color} h-1.5 rounded-full transition-all`}
                                        style={{ width: `${occupancyPercent}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {Math.round(occupancyPercent)}% occupé
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Main Tabs - Modules Opérationnels */}
            <Tabs defaultValue="beds" className="space-y-6">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 h-12 gap-1">
                    <TabsTrigger value="beds" className="h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                        <Bed className="h-4 w-4 mr-2" /> Plan des Lits
                    </TabsTrigger>
                    <TabsTrigger value="patients" className="h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                        <Users className="h-4 w-4 mr-2" /> Patients Actifs
                    </TabsTrigger>
                    <TabsTrigger value="observations" className="h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                        <Activity className="h-4 w-4 mr-2" /> Observations
                    </TabsTrigger>
                    <TabsTrigger value="admissions" className="h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                        <UserPlus className="h-4 w-4 mr-2" /> Admissions
                    </TabsTrigger>
                    <TabsTrigger value="discharge" className="h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                        <FileText className="h-4 w-4 mr-2" /> Sorties
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="beds" className="space-y-4 focus-visible:outline-none">
                    <BedManagementGrid selectedService={selectedService} />
                </TabsContent>

                <TabsContent value="patients" className="space-y-4 focus-visible:outline-none">
                    <ActivePatientsMonitor />
                </TabsContent>

                <TabsContent value="observations" className="space-y-4 focus-visible:outline-none">
                    <NursingObservations />
                </TabsContent>

                <TabsContent value="admissions" className="space-y-4 focus-visible:outline-none">
                    <PatientAdmissionForm />
                </TabsContent>

                <TabsContent value="discharge" className="space-y-4 focus-visible:outline-none">
                    <DischargeManagement />
                </TabsContent>
            </Tabs>
        </div>
    )
}
