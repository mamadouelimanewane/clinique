"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Download, User, LogOut, Bell, ShieldCheck, Activity } from "lucide-react"

export function PatientPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-none shadow-2xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black">Portail Patient</CardTitle>
                            <CardDescription>Accédez à vos résultats et rendez-vous</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500">N° Dossier Patient</label>
                            <Input placeholder="Ex: PT-2026-001" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500">Code Secret (SMS)</label>
                            <Input type="password" placeholder="••••••" />
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 font-bold" onClick={() => setIsLoggedIn(true)}>
                            Se connecter
                        </Button>
                        <p className="text-[10px] text-center text-slate-400 mt-4">
                            En vous connectant, vous acceptez nos conditions de confidentialité des données de santé.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="h-6 w-6 text-indigo-600" />
                        <span className="font-black text-lg">PATIENT HUB</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5 text-slate-400" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">AF</div>
                        <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}><LogOut className="h-4 w-4" /></Button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-4 lg:p-8 space-y-8">
                <div className="flex flex-col md:row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Bonjour, Awa Fall</h1>
                        <p className="text-slate-500 font-medium">Bienvenue sur votre espace santé Aéré Lao.</p>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 px-4 py-1">Dossier Complet</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Derniers Documents</CardTitle>
                                <CardDescription>Téléchargez vos comptes-rendus et résultats.</CardDescription>
                            </div>
                            <FileText className="h-5 w-5 text-slate-300" />
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {[
                                    { title: "Compte-rendu Consultation Cardio", date: "10 Jan. 2026", type: "PDF", size: "1.2 MB" },
                                    { title: "Résultats Laboratoire (NFS)", date: "08 Jan. 2026", type: "PDF", size: "840 KB" },
                                    { title: "Ordonnance Médicale", date: "10 Jan. 2026", type: "PDF", size: "450 KB" },
                                ].map((doc, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-800">{doc.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{doc.date} • {doc.size}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="border-none shadow-sm bg-indigo-600 text-white">
                            <CardHeader>
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Calendar className="h-4 w-4" /> Prochain RDV
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-white/10 rounded-xl space-y-2">
                                    <p className="text-2xl font-black">15 Janvier</p>
                                    <p className="text-xs opacity-80">14h30 • Gynécologie</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500 w-fit px-2 py-0.5 rounded">Confirmé</p>
                                </div>
                                <Button className="w-full bg-white text-indigo-600 hover:bg-slate-100 font-bold text-xs h-10">Modifier le RDV</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Sécurité des données
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[10px] text-slate-400 leading-relaxed">
                                    Vos données sont cryptées conformément aux normes de santé internationales. Seul vous et vos praticiens autorisés peuvent y accéder.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
