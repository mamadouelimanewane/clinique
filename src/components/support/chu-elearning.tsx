"use client"

import { useState } from "react"
import {
    School,
    BookOpen,
    Video,
    FileText,
    PlayCircle,
    Award,
    Users,
    Clock,
    Sparkles,
    Search,
    ChevronRight,
    Library,
    Mic2,
    MonitorPlay,
    Star,
    Globe
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function CHUElearningPlatform() {
    const [activeCourse, setActiveCourse] = useState<null | string>(null)

    const categories = [
        { id: 'odontologie', name: 'Odontologie Conservatrice', icon: Library, count: 24 },
        { id: 'chirurgie', name: 'Chirurgie Buccale PAO', icon: MonitorPlay, count: 18 },
        { id: 'ia-med', name: 'IA & Radiologie Dentaire', icon: Sparkles, count: 12 },
        { id: 'recherche', name: 'Méthodologie Recherche', icon: Globe, count: 9 },
    ]

    const courses = [
        {
            id: 'c1',
            title: "Techniques Avancées de Restauration Esthétique",
            instructor: "Pr. Mamadou Ly - CHU Dakar",
            duration: "6h 45min",
            students: 124,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400",
            level: "Interne / Praticien"
        },
        {
            id: 'c2',
            title: "Interprétation IA des CBCT 3D",
            instructor: "Dr. Aere Lao",
            duration: "4h 20min",
            students: 89,
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400",
            level: "Spécialiste"
        },
        {
            id: 'c3',
            title: "Protocoles d'Urgence en Chirurgie Maxillo-Faciale",
            instructor: "Pr. Ibrahima Sow",
            duration: "12h 00min",
            students: 210,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400",
            level: "Général"
        }
    ]

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* CHU Learning Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-500/20 rotate-3">
                            <School className="h-7 w-7 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Plateforme <span className="text-indigo-600">E-Learning CHU</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Pôle Universitaire & Recherche • Streaming Chirurgical • Crédits ECTS
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex gap-2">
                        <Mic2 className="h-4 w-4" /> Webinaires Live
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <Award className="h-5 w-5" /> Diplômes & Crédits
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Statistics / Quick Links */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white p-8 relative overflow-hidden group">
                        <div className="space-y-1 relative z-10">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Ma progression ECTS</p>
                            <h3 className="text-3xl font-black italic">45 / 60</h3>
                            <Progress value={75} className="h-2 bg-white/10 mt-4" />
                        </div>
                        <PlayCircle className="absolute -bottom-10 -right-10 h-32 w-32 text-indigo-500 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                    </Card>

                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Facultés & Spécialités</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {categories.map((cat) => (
                            <Button key={cat.id} variant="ghost" className="justify-start h-16 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100 px-6 group">
                                <cat.icon className="h-5 w-5 mr-3 text-indigo-600 group-hover:rotate-12 transition-transform" />
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase text-slate-900">{cat.name}</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase">{cat.count} Cours</p>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Main Course Content */}
                <div className="lg:col-span-3 space-y-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase">Catalogue <span className="text-indigo-600">Académique</span></h2>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input placeholder="Rechercher un module..." className="w-full h-12 pl-10 rounded-2xl bg-slate-100 border-none text-[10px] font-black outline-none italic" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <Card key={course.id} className="border-none shadow-2xl rounded-[40px] overflow-hidden group hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-slate-50">
                                <div className="h-48 relative overflow-hidden">
                                    <img src={course.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={course.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                        <Badge className="bg-indigo-600 text-[8px] font-black uppercase tracking-widest px-3 py-1">{course.level}</Badge>
                                    </div>
                                    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <CardContent className="p-8 space-y-5">
                                    <h5 className="font-black text-sm text-slate-900 leading-tight uppercase italic min-h-[40px]">{course.title}</h5>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Instructeur Maître</p>
                                        <p className="text-[11px] font-bold text-slate-700">{course.instructor}</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1 text-[10px] font-black text-slate-400">
                                                <Clock className="h-3 w-3" /> {course.duration}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-black text-amber-500">
                                                <Star className="h-3 w-3 fill-current" /> {course.rating}
                                            </div>
                                        </div>
                                        <Button size="sm" className="h-10 w-10 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-colors">
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Featured Event / Surgery Live */}
                    <Card className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[50px] p-10 text-white overflow-hidden relative border-none shadow-3xl">
                        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                            <Video className="h-48 w-48 text-white" />
                        </div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <Badge className="bg-rose-500 text-white border-none font-black text-[9px] px-4 py-2 rounded-full animate-pulse uppercase tracking-[0.2em]">Live Masterclass</Badge>
                                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">Chirurgie Implantaire <br /><span className="text-indigo-400">Complexe v2026</span></h2>
                                <p className="text-sm font-medium text-indigo-100/70 italic leading-relaxed">
                                    Suivez en direct l'intervention du Dr. Aere Lao depuis le bloc opératoire central avec commentaires audio en temps réel.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <Button className="bg-white text-indigo-900 font-black text-xs h-14 px-10 rounded-2xl shadow-xl hover:bg-indigo-50 uppercase tracking-widest gap-3">
                                        <PlayCircle className="h-5 w-5 fill-current" /> Rejoindre le Live
                                    </Button>
                                    <div className="flex items-center text-[10px] font-black uppercase text-indigo-200">
                                        <Users className="h-4 w-4 mr-2" /> 45 Internes en ligne
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black/20 backdrop-blur-3xl rounded-[40px] p-8 border border-white/10 space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 px-1">Programme du Jour</h4>
                                {[
                                    { time: "14:00", event: "Ouverture & Protocole d'Infection Control", done: true },
                                    { time: "14:45", event: "Ostéotomie Assistée par Navigation IA", done: false },
                                    { time: "15:30", event: "Q&A Session Interactive CHU", done: false },
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4 items-center group">
                                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center font-black text-[10px]", step.done ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/40")}>
                                            {step.time}
                                        </div>
                                        <p className={cn("text-xs font-bold", step.done ? "text-white line-through opacity-50" : "text-indigo-50")}>{step.event}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
