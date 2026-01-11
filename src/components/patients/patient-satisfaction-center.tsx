"use client"

import { useState } from "react"
import {
    Heart,
    Star,
    MessageCircle,
    ThumbsUp,
    ThumbsDown,
    Send,
    TrendingUp,
    Users,
    ShieldCheck,
    Sparkles,
    BarChart3,
    CheckCircle2,
    Calendar,
    Search
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function PatientSatisfactionCenter() {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmitSurvey = () => {
        setLoading(true)
        setTimeout(() => {
            toast.success("Enquête de satisfaction archivée. Merci !")
            setLoading(false)
            setRating(0)
            setComment("")
        }, 1500)
    }

    const surveys = [
        { patient: "Modou Fall", date: "Il y a 2h", rating: 5, comment: "Consultation à distance impressionnante. Dr. Lao est très pro.", type: "Téléconsultation" },
        { patient: "Sophie Ndiaye", date: "Ce matin", rating: 4, comment: "Très fluide, mais petit délai sur l'envoi du PV.", type: "Expertise" },
        { patient: "Alioune Diop", date: "Hier", rating: 5, comment: "Le système WhatsApp est super pratique.", type: "Suivi" },
    ]

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-xl shadow-rose-500/20 rotate-3">
                            <Heart className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Expérience <span className="text-rose-600">Patient</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Satisfaction Score • NPS Management • Qualité de Service IA
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end mr-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score NPS Global</p>
                        <p className="text-2xl font-black text-rose-600">9.4 <span className="text-[10px] text-slate-400 font-bold uppercase">/ 10</span></p>
                    </div>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-rose-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <BarChart3 className="h-5 w-5" /> Rapport Qualité Q1
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Cards */}
                <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white p-8 relative overflow-hidden group">
                    <TrendingUp className="absolute -bottom-10 -right-10 h-40 w-40 text-rose-500 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                    <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-6">Taux de Recommandation</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h4 className="text-5xl font-black italic tracking-tighter">98%</h4>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none">EXCELLENT</Badge>
                        </div>
                        <Progress value={98} className="h-2 bg-white/10" />
                        <p className="text-[10px] font-bold text-slate-500 uppercase italic">Basé sur 450 enquêtes ce trimestre</p>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl rounded-[40px] bg-white border border-slate-100 p-8">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Délai Attente Moyen</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h4 className="text-5xl font-black italic tracking-tighter text-slate-900">8.5 <span className="text-xs font-bold text-slate-400">MIN</span></h4>
                            <div className="flex items-center gap-1 text-emerald-500">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase">-15%</span>
                            </div>
                        </div>
                        <Progress value={85} className="h-2 bg-slate-100" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase italic">Réduction grâce au Smart Triage IA</p>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl rounded-[40px] bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest italic">Analyse Sémantique IA</h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed italic opacity-90">
                        "Les patients apprécient particulièrement la rapidité d'envoi du Procès-verbal de conférence live après la consultation."
                    </p>
                    <div className="mt-6 flex gap-2">
                        <Badge className="bg-white/10 text-white font-black text-[8px]">RAPIDITÉ</Badge>
                        <Badge className="bg-white/10 text-white font-black text-[8px]">CLARTÉ</Badge>
                        <Badge className="bg-white/10 text-white font-black text-[8px]">MODERNITÉ</Badge>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Manual Simulation Feature */}
                <Card className="lg:col-span-4 border-none shadow-2xl rounded-[40px] bg-white border border-slate-100 overflow-hidden">
                    <CardHeader className="p-8 bg-slate-50 border-b">
                        <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Simulateur d'Enquête</CardTitle>
                        <CardDescription className="text-[10px] font-bold text-slate-400 uppercase">Test du circuit patient post-conférence</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Note Globale</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={cn("h-12 flex-1 rounded-xl transition-all", star <= rating ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-300")}
                                    >
                                        <Star className={cn("h-6 w-6 mx-auto", star <= rating && "fill-current")} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Commentaire du Patient</label>
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="rounded-2xl bg-slate-50 border-none p-6 text-sm font-medium"
                                placeholder="Partagez votre expérience..."
                            />
                        </div>

                        <Button
                            onClick={handleSubmitSurvey}
                            disabled={loading || !rating}
                            className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase rounded-2xl shadow-xl transition-all gap-2"
                        >
                            <Send className="h-4 w-4" /> {loading ? "Archivage..." : "Enregistrer l'Avis"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Live Feed of Feedback */}
                <Card className="lg:col-span-8 border-none shadow-2xl rounded-[40px] bg-white border border-slate-100">
                    <CardHeader className="p-8 border-b border-slate-50 flex flex-row justify-between items-center">
                        <div>
                            <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Flux des Avis Recent</CardTitle>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suivi en direct du feedback patient</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative w-48">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <input placeholder="Filtrer..." className="w-full h-10 pl-10 rounded-xl bg-slate-100 border-none text-[10px] font-black outline-none" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="space-y-6">
                            {surveys.map((s, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-[30px] bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                    <div className="h-16 w-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-rose-500 border border-slate-100">
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-black">{s.rating}</span>
                                            <Star className="h-3 w-3 fill-current" />
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-black uppercase italic text-slate-900">{s.patient}</h4>
                                            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black">{s.type}</Badge>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-500 italic">"{s.comment}"</p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <Calendar className="h-3 w-3 text-slate-300" />
                                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{s.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
