"use client"

import { useState, useEffect } from "react"
import {
    Fingerprint,
    Wifi,
    Smartphone,
    Lock,
    Zap,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    Key,
    RefreshCcw,
    Users,
    Clock,
    MonitorSpeaker,
    Bell
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function PatientDigitalKeyroom() {
    const [isScanning, setIsScanning] = useState(false)
    const [accessGranted, setAccessGranted] = useState(false)
    const [activeLocks, setActiveLocks] = useState({
        room: true,
        elevator: false,
        pharmacy_locker: false
    })

    const simulateNFC = () => {
        setIsScanning(true)
        setAccessGranted(false)
        toast.loading("Scanning Signal NFC / Biométrie Patient...")

        setTimeout(() => {
            setIsScanning(false)
            setAccessGranted(true)
            toast.dismiss()
            toast.success("Identité Vérifiée. Accès Déverrouillé.", {
                icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />
            })
            // Reset for demo
            setTimeout(() => setAccessGranted(false), 5000)
        }, 2000)
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Revolution Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-xl shadow-slate-500/20 rotate-3">
                            <Fingerprint className="h-7 w-7 text-emerald-400" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Patient <span className="text-emerald-600">Digital Key</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Zero-Physical-Contact • NFC & Biometric Protocol • Hospitality v2026
                    </p>
                </div>
                <div className="flex gap-4">
                    <Badge className="h-10 px-6 rounded-full bg-emerald-500/10 text-emerald-600 font-black text-[10px] uppercase tracking-widest border-none flex items-center gap-2">
                        <Wifi className="h-4 w-4 animate-pulse" /> RÉSEAU SÉCURISÉ ACTIF
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Central Interaction: Phone Simulator */}
                <Card className="lg:col-span-5 border-none shadow-3xl rounded-[60px] bg-slate-900 p-4 relative overflow-hidden group border-8 border-slate-800 h-[700px]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-3xl z-30" />

                    <div className="h-full w-full bg-slate-950 rounded-[50px] overflow-hidden relative flex flex-col p-8">
                        {/* Phone Content */}
                        <div className="mt-10 flex justify-between items-center text-white/40">
                            <Clock className="h-4 w-4" />
                            <div className="flex gap-2">
                                <Wifi className="h-4 w-4" />
                                <div className="h-4 w-8 border border-white/20 rounded-sm flex items-end p-[1px]">
                                    <div className="w-full h-full bg-emerald-500 rounded-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-center space-y-6">
                            <div className="h-24 w-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center">
                                <ShieldCheck className={cn("h-12 w-12 transition-all duration-700", accessGranted ? "text-emerald-400 scale-125" : "text-slate-700")} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Clinique <span className="text-emerald-400">Aere Lao</span></h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Votre Clé Universelle Digitale</p>
                            </div>
                        </div>

                        {/* Interactive Zone */}
                        <div className="mt-auto mb-10 space-y-8">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Localisation : SUITE 402</span>
                                    <Badge className="bg-emerald-500 text-[8px] px-2">PROXIMITÉ DÉTECTÉE</Badge>
                                </div>
                                <Button
                                    onClick={simulateNFC}
                                    disabled={isScanning}
                                    className={cn(
                                        "w-full h-20 rounded-[30px] font-black text-xs uppercase tracking-widest transition-all duration-700 shadow-2xl",
                                        accessGranted ? "bg-emerald-500 text-white" : "bg-white text-slate-900 hover:bg-emerald-50"
                                    )}
                                >
                                    {isScanning ? (
                                        <RefreshCcw className="h-6 w-6 animate-spin" />
                                    ) : accessGranted ? (
                                        <CheckCircle2 className="h-8 w-8 animate-bounce" />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <Smartphone className="h-6 w-6 mb-1" />
                                            <span>Maintenir près de la serrure</span>
                                        </div>
                                    )}
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                                    <Bell className="h-5 w-5 text-amber-500" />
                                    <span className="text-[8px] font-black text-white uppercase italic tracking-widest">AIDE SOIGNANT</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                                    <MonitorSpeaker className="h-5 w-5 text-indigo-400" />
                                    <span className="text-[8px] font-black text-white uppercase italic tracking-widest">MULTI-MEDIA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Right: Hospital Admin Control */}
                <div className="lg:col-span-7 space-y-8">
                    <Card className="border-none shadow-2xl rounded-[50px] bg-white p-10 border border-slate-100">
                        <div className="flex justify-between items-start mb-10">
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 border-l-4 border-emerald-500 pl-6">Gestion des <span className="text-emerald-600">Accès Patient</span></h3>
                                <p className="text-sm font-medium text-slate-400 italic ml-6">Technologie adoptée par les cliniques Mayo & Cleveland.</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Clés Actives</p>
                                <p className="text-2xl font-black text-emerald-600">124 <span className="text-[10px] text-slate-300">/ 150</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest bg-slate-100 px-4 py-2 rounded-lg inline-block">Protocoles de Sécurité</h4>
                                {[
                                    { label: "Double Auth Biométrique", status: "Requis", icon: Fingerprint, color: "text-indigo-600" },
                                    { label: "Géo-Fencing Hospitalier", status: "Actif", icon: MapPin, color: "text-emerald-600" },
                                    { label: "Révocation Instantanée", status: "Activé", icon: Lock, color: "text-rose-600" },
                                ].map((p, i) => (
                                    <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-50 rounded-3xl transition-all group">
                                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform", p.color)}>
                                            <p.icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase text-slate-900 tracking-tight">{p.label}</p>
                                            <p className="text-[11px] font-bold text-slate-400 italic">{p.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-950 rounded-[40px] p-8 text-white relative overflow-hidden group">
                                <Zap className="absolute -top-10 -right-10 h-40 w-40 text-emerald-500 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                                <div className="relative z-10 space-y-6">
                                    <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Automation Smart-Room</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-xs font-bold italic">
                                            <span>Éclairage Ciracadien</span>
                                            <Badge className="bg-emerald-500 text-[8px]">SYNC</Badge>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold italic">
                                            <span>Température Suite</span>
                                            <span className="text-emerald-400">22.5°C</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold italic">
                                            <span>Privacy Mode</span>
                                            <span className="text-amber-500">OFF</span>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-6 h-12 bg-white text-slate-900 font-black text-[10px] uppercase rounded-xl hover:bg-emerald-400 hover:text-white transition-all">CONFIGURER PRÉFÉRENCES</Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-none shadow-2xl rounded-[40px] bg-gradient-to-br from-slate-900 to-slate-950 text-white p-10 overflow-hidden relative border border-white/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            <div className="space-y-4">
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none px-4 py-2 text-[10px] font-black uppercase">Innovation Pratique</Badge>
                                <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight">Le Patient est la <span className="text-emerald-500 font-normal">Clé</span></h3>
                                <p className="text-xs font-medium text-slate-400 italic leading-relaxed">
                                    Plus besoin de bracelets plastiques ou de cartes magnétiques. Le smartphone du patient devient son identifiant unique de l'ascenseur jusqu'à la délivrance sécurisée de ses médicaments.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-40 w-40 rounded-full border-4 border-emerald-500/20 flex items-center justify-center p-4">
                                    <div className="h-full w-full rounded-full border-4 border-emerald-500/50 flex items-center justify-center animate-pulse">
                                        <Fingerprint className="h-16 w-16 text-emerald-400" />
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">READY FOR DEPLOYMENT</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function MapPin(props: any) {
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
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}
