"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, User, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

const MOCK_APPOINTMENTS = [
    { id: 1, time: "09:00", patient: "Abdou Rahmane", doc: "Dr. Sy", specialite: "Cardiologie", status: "CONFIRME" },
    { id: 2, time: "10:30", patient: "Fatou Kiné", doc: "Dr. Diop", specialite: "Pédiatrie", status: "ATTENTE" },
    { id: 3, time: "14:15", patient: "Ibrahima Fall", doc: "Dr. Sow", specialite: "Ophtalmo", status: "CONFIRME" },
    { id: 4, time: "16:00", patient: "Mariama Ba", doc: "Dr. Sy", specialite: "Cardiologie", status: "URGENT" },
]

export function AppointmentCalendar() {
    const [view, setView] = useState('day') // day, week, month

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Agenda Centralisé</h1>
                    <p className="text-muted-foreground">Gestion des rendez-vous par service et praticien.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Search className="h-4 w-4 mr-2" /> Rechercher</Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Plus className="h-4 w-4 mr-2" /> Nouveau Rendez-vous
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 border-none shadow-none bg-slate-50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Sélecteur de Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-white rounded-xl border shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                                <span className="font-bold text-sm">Janvier 2026</span>
                                <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 font-bold mb-2">
                                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                {Array.from({ length: 31 }).map((_, i) => (
                                    <div key={i} className={`p-2 rounded-lg cursor-pointer hover:bg-indigo-50 ${i === 9 ? 'bg-indigo-600 text-white' : ''}`}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <h4 className="text-[10px] font-bold uppercase text-slate-400">Filtres par Service</h4>
                            {["Cardiologie", "Pédiatrie", "Dermatologie", "Ophtalmologie"].map(s => (
                                <div key={s} className="flex items-center gap-2 text-sm p-2 hover:bg-white rounded-lg cursor-pointer">
                                    <div className={`h-2 w-2 rounded-full ${s === 'Cardiologie' ? 'bg-red-400' : 'bg-blue-400'}`} />
                                    {s}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 border-none shadow-sm overflow-hidden">
                    <CardHeader className="bg-white border-b flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <Button variant={view === 'day' ? 'default' : 'ghost'} size="sm" onClick={() => setView('day')} className="text-[10px] h-7 px-3">Jour</Button>
                                <Button variant={view === 'week' ? 'default' : 'ghost'} size="sm" onClick={() => setView('week')} className="text-[10px] h-7 px-3">Semaine</Button>
                            </div>
                            <span className="font-bold text-slate-700">Lundi 10 Janvier 2026</span>
                        </div>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">12 Rendez-vous aujourd'hui</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {MOCK_APPOINTMENTS.map(apt => (
                                <div key={apt.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-center gap-6">
                                        <span className="font-mono text-sm font-bold text-indigo-600 w-12">{apt.time}</span>
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{apt.patient}</h4>
                                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                                <Stethoscope className="h-3 w-3" /> {apt.doc} • <Badge variant="secondary" className="px-1 py-0 text-[9px]">{apt.specialite}</Badge>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={apt.status === 'CONFIRME' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : apt.status === 'URGENT' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-slate-100 text-slate-700'}>
                                            {apt.status}
                                        </Badge>
                                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100"><ChevronRight className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ))}
                            <div className="p-20 text-center bg-slate-50/50">
                                <p className="text-xs text-slate-400 italic">Fin de journée de consultation</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function Stethoscope(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 1 0-.2.3z" />
            <path d="M10 22v-2" />
            <path d="M16 18a4 4 0 0 0-8 0v2a4 4 0 0 0 8 0z" />
            <path d="M12 2v3a5 5 0 0 0 5 5h3" />
            <path d="m20 10 2 2-2 2" />
        </svg>
    )
}
