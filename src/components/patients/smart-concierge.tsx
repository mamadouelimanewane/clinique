"use client"

import { useState } from "react"
import {
    BellRing,
    ConciergeBell,
    Sparkles,
    Plane,
    Coffee,
    Car,
    Languages,
    Utensils,
    CheckCircle2,
    Clock,
    UserCheck,
    Star,
    Crown,
    MapPin,
    ArrowRight,
    MessageSquareHeart
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function SmartConciergeVIP() {
    const [activeRequest, setActiveRequest] = useState<string | null>(null)

    const vipPatients = [
        { name: "M. Abdoulaye Sy", status: "En Arrivée", room: "Suite 402", time: "10:30", preference: "Service Anglophone" },
        { name: "Mme Khady Diene", status: "En Chambre", room: "VIP 05", time: "Actuel", preference: "Diététique Spécifique" },
        { name: "Dr Stefan Müller", status: "Attendu", room: "Loge Master", time: "14:15", preference: "Transfert Aéroport" },
    ]

    const handleServiceRequest = (service: string) => {
        toast.success(`Requête "${service}" envoyée au Room Service & Accueil VIP.`)
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* VIP Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20 rotate-3">
                            <ConciergeBell className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Smart <span className="text-amber-600">Concierge</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Service VIP 5 Étoiles • Accueil Personnalisé • Conciergerie IA
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end mr-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Satisfaction VIP</p>
                        <p className="text-2xl font-black text-amber-600">10 / 10 <span className="text-[10px] text-slate-400 font-bold uppercase">Perfect Score</span></p>
                    </div>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-amber-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <Crown className="h-5 w-5" /> Gérer Salons VIP
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Live VIP Arrival Monitoring */}
                <Card className="lg:col-span-8 border-none shadow-3xl rounded-[50px] bg-white overflow-hidden p-8 border border-slate-100">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase">Flux d'Accueil <span className="text-amber-600">Premium</span></h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Coordination Temps Réel des Arrivées</p>
                        </div>
                        <Badge className="bg-amber-50 text-amber-600 border-none font-black text-[10px] px-6 py-2 rounded-full">3 VIP AUJOURD'HUI</Badge>
                    </div>

                    <div className="space-y-6">
                        {vipPatients.map((vip, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[40px] bg-slate-50/50 border border-transparent hover:border-amber-100 hover:bg-white hover:shadow-2xl transition-all duration-700 group">
                                <div className="h-20 w-20 rounded-3xl bg-white shadow-lg flex items-center justify-center border border-slate-100 relative">
                                    <div className="absolute -top-2 -right-2 bg-amber-500 h-6 w-6 rounded-full flex items-center justify-center border-2 border-white">
                                        <Crown className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-xl font-black text-slate-900">{vip.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-lg font-black uppercase italic text-slate-900">{vip.name}</h4>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase italic">
                                                <MapPin className="h-3 w-3" /> {vip.room} • {vip.time}
                                            </div>
                                        </div>
                                        <Badge className={cn("bg-white border text-[9px] font-black uppercase px-4 py-1.5 rounded-full", vip.status === "En Chambre" ? "text-emerald-500 border-emerald-100" : "text-amber-500 border-amber-100")}>{vip.status}</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className="bg-white border-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest">{vip.preference}</Badge>
                                        <Badge variant="outline" className="bg-white border-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest">Client Gold</Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-white shadow-sm hover:bg-amber-500 hover:text-white transition-all">
                                        <BellRing className="h-5 w-5" />
                                    </Button>
                                    <Button className="h-12 px-6 rounded-2xl bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest gap-2 group-hover:bg-amber-600">
                                        Action <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Right: Concierge Services & IA Insights */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white p-8 relative overflow-hidden group">
                        <Sparkles className="absolute -bottom-10 -right-10 h-40 w-40 text-amber-500 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                        <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-8 italic">Conciergerie à la Carte</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: "Restauration", icon: Utensils, label: "Toque" },
                                { name: "Transport", icon: Car, label: "Limo" },
                                { name: "Traduction", icon: Languages, label: "Live" },
                                { name: "Hébergement", icon: Coffee, label: "Suite" },
                            ].map((service, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleServiceRequest(service.name)}
                                    className="p-6 rounded-[30px] bg-white/5 border border-white/10 hover:bg-white hover:text-slate-900 transition-all duration-500 flex flex-col items-center gap-3 group/btn"
                                >
                                    <service.icon className="h-6 w-6 text-amber-400 group-hover/btn:scale-110 transition-transform" />
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-tighter">{service.name}</p>
                                        <p className="text-[8px] font-bold opacity-40 uppercase">{service.label}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card className="border-none shadow-2xl rounded-[40px] bg-white p-8 border border-slate-100 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <MessageSquareHeart className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-tight text-slate-900 italic">Welcome Bot IA</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Génération de Message</p>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed italic bg-slate-50 p-6 rounded-[30px] border border-slate-100">
                            "Bonjour [Patient], la Clinique Aéré Lao est ravie de vous accueillir. Votre Suite VIP est prête et votre assistant personnel vous attend."
                        </p>
                        <Button className="w-full h-14 bg-indigo-600 hover:bg-slate-900 text-white font-black text-[10px] uppercase rounded-2xl transition-all shadow-xl shadow-indigo-200">
                            Personnaliser via IA
                        </Button>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[40px] bg-white p-8 border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Performance Service</span>
                            <span className="text-xs font-black text-amber-600 uppercase">Excellent</span>
                        </div>
                        <Progress value={92} className="h-2 bg-slate-100" />
                        <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-4 text-center">Réponse moyenne en 45 secondes</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}
