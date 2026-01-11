"use client"

import { useState, useEffect } from "react"
import {
    ShieldAlert,
    Database,
    RefreshCcw,
    History,
    Lock,
    Zap,
    Cpu,
    Globe,
    Activity,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Server,
    CloudIcon,
    Fingerprint,
    ShieldCheck,
    ArrowRightLeft,
    HardDrive,
    Terminal
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function CyberDisasterHub() {
    const [backupProgress, setBackupProgress] = useState(0)
    const [isBackingUp, setIsBackingUp] = useState(false)
    const [serverStatus, setServerStatus] = useState<'A' | 'B'>('A')
    const [isDrilling, setIsDrilling] = useState(false)
    const [drillStep, setDrillStep] = useState(0)

    const triggerBackup = () => {
        setIsBackingUp(true)
        setBackupProgress(0)
        toast.info("Initialisation du backup géo-redondant (Triple-Zone)...")

        let progress = 0
        const interval = setInterval(() => {
            progress += 2
            setBackupProgress(progress)
            if (progress >= 100) {
                clearInterval(interval)
                setIsBackingUp(false)
                toast.success("Synchronisation terminée : Données sécurisées sur Dakar, Paris et AWS.")
            }
        }, 100)
    }

    const runStressTest = () => {
        setIsDrilling(true)
        setDrillStep(1)
        toast.error("INCIDENT SIMULÉ : Panne totale Cluster A Alpha !", { duration: 3000 })

        setTimeout(() => {
            setDrillStep(2)
            toast.info("Détection par Cyber-Sentinelle : 2ms. Analyse d'intégrité...", { duration: 3000 })
        }, 2000)

        setTimeout(() => {
            setDrillStep(3)
            setServerStatus('B')
            toast.success("FAILOVER RÉUSSI : Basculement sur Cluster B Beta (Paris) - Latence : 14ms", { duration: 5000 })
        }, 4000)

        setTimeout(() => {
            setIsDrilling(false)
            setDrillStep(0)
        }, 7000)
    }

    const toggleFailover = () => {
        const target = serverStatus === 'A' ? 'B' : 'A'
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: `Basculement vers Cluster ${target}...`,
                success: `Failover réussi. Système actif sur Cluster ${target}. Transition : 18ms.`,
                error: 'Échec du failover.'
            }
        )
        setServerStatus(target)
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Ultra-Tech Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl shadow-slate-500/20 rotate-3">
                            <ShieldAlert className="h-7 w-7 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase italic">Cyber <span className="text-indigo-600">Fortress</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Zero-Trust Architecture • Géo-Redondance • Failover Automatique
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-rose-200 text-rose-600 font-extrabold text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-all flex gap-2" onClick={runStressTest} disabled={isDrilling}>
                        <Zap className="h-4 w-4" /> Stress Test Live
                    </Button>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex gap-2" onClick={toggleFailover}>
                        <ArrowRightLeft className="h-4 w-4" /> Manuel Failover
                    </Button>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2" onClick={triggerBackup} disabled={isBackingUp}>
                        <RefreshCcw className={cn("h-5 w-5", isBackingUp && "animate-spin")} /> {isBackingUp ? "Sync en cours..." : "Lancer Sync Géo-Zone"}
                    </Button>
                </div>
            </div>

            {isDrilling && (
                <div className="bg-rose-600 text-white p-6 rounded-[30px] shadow-2xl animate-pulse flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <AlertTriangle className="h-8 w-8" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest">DRP DRILL : Simulation de Crise en cours</p>
                            <p className="text-xl font-black italic">ÉTAPE {drillStep} : {drillStep === 1 ? "Interruption Service Cluster A" : drillStep === 2 ? "Routage Trafic vers Cloud Paris" : "Stabilisation Cluster B"}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Real-time Status */}
                <Card className="lg:col-span-8 border-none shadow-3xl rounded-[50px] bg-white overflow-hidden p-8 border border-slate-100">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase">Status des <span className="text-indigo-600">Clusters</span></h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Surveillance active 24/7</p>
                        </div>
                        <Badge className={cn("border-none font-black text-[10px] px-4 py-2 rounded-full", isDrilling ? "bg-rose-100 text-rose-600" : "bg-emerald-50 text-emerald-600")}>
                            {isDrilling ? "DRILL EN COURS" : "SYSTÈME NOMINAL"}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={cn("p-8 rounded-[40px] border-2 transition-all duration-700 relative overflow-hidden group shadow-sm", (serverStatus === 'A' && !isDrilling) ? "bg-indigo-50/50 border-indigo-200" : isDrilling && drillStep < 3 ? "bg-rose-50 border-rose-300" : "bg-slate-50 border-slate-100 opacity-50")}>
                            {isDrilling && drillStep < 3 && <div className="absolute inset-0 bg-rose-500/10 animate-pulse pointer-events-none" />}
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg", (serverStatus === 'A' && !isDrilling) ? "bg-indigo-600 text-white" : isDrilling && drillStep < 3 ? "bg-rose-600 text-white" : "bg-slate-300 text-white")}>
                                    {isDrilling && drillStep < 3 ? <AlertTriangle className="h-7 w-7" /> : <Server className="h-7 w-7" />}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-slate-400">Cluster Alpha</p>
                                    <p className="text-xs font-bold text-slate-900">Dakar-Plateau</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-slate-500">Charge CPU</span>
                                    <span className={cn(isDrilling && drillStep < 3 ? "text-rose-600" : "text-indigo-600")}>{isDrilling && drillStep < 3 ? "ERROR" : "24%"}</span>
                                </div>
                                <Progress value={isDrilling && drillStep < 3 ? 0 : 24} className={cn("h-1.5", isDrilling && drillStep < 3 && "bg-rose-100")} />
                                <div className="flex items-center gap-2 mt-4">
                                    {isDrilling && drillStep < 3 ? <XCircle className="h-4 w-4 text-rose-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                                    <span className="text-[10px] font-black text-slate-900 uppercase">{isDrilling && drillStep < 3 ? "HORS SERVICE" : "Maître Actif"}</span>
                                </div>
                            </div>
                        </div>

                        <div className={cn("p-8 rounded-[40px] border-2 transition-all duration-700 relative overflow-hidden group shadow-sm", serverStatus === 'B' ? "bg-indigo-50/50 border-indigo-200 shadow-xl" : "bg-slate-50 border-slate-100 opacity-50")}>
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg", serverStatus === 'B' ? "bg-indigo-600 text-white" : "bg-slate-300 text-white")}>
                                    <CloudIcon className="h-7 w-7" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-slate-400">Cluster Beta</p>
                                    <p className="text-xs font-bold text-slate-900">AWS Paris (DR)</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-slate-500">Sync État</span>
                                    <span className="text-emerald-600">TEMPS RÉEL</span>
                                </div>
                                <Progress value={100} className="h-1.5 bg-emerald-100" />
                                <div className="flex items-center gap-2 mt-4">
                                    <Zap className="h-4 w-4 text-amber-500" />
                                    <span className="text-[10px] font-black text-slate-900 uppercase">En attente (Standby)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isBackingUp && (
                        <div className="mt-10 p-8 bg-slate-900 rounded-[35px] text-white animate-in zoom-in-95">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <Database className="h-5 w-5 text-indigo-400" />
                                    <p className="text-xs font-black uppercase tracking-widest italic">Sauvegarde Triple-Zone en cours...</p>
                                </div>
                                <span className="text-xs font-black text-indigo-400">{backupProgress}%</span>
                            </div>
                            <Progress value={backupProgress} className="h-2 bg-white/10" />
                        </div>
                    )}
                </Card>

                {/* Right Column: Security Features */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-all duration-700">
                            <Lock className="h-24 w-24 text-white" />
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <Fingerprint className="h-5 w-5" />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Périmètre de Sécurité</h4>
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: "Chiffrement AES-256", desc: "Données DMP & GED inaccessibles hors système.", active: true },
                                { title: "IA Cyber-Sentinelle", desc: "Détection proactive des tentatives Brute Force.", active: true },
                                { title: "Archivage WORM", desc: "Données immuables pour preuve légale.", active: true },
                            ].map((s, i) => (
                                <div key={i} className="flex gap-4 group/item cursor-help">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-wider">{s.title}</p>
                                        <p className="text-[9px] font-bold text-slate-500 italic mt-0.5">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="border-none shadow-2xl rounded-[40px] bg-white border border-slate-100 p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <Activity className="h-5 w-5 text-indigo-600" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 italic">Derniers Incidents</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50">
                                    <span className="text-[9px] font-black uppercase text-slate-400">01:42 AM</span>
                                    <span className="text-[9px] font-black uppercase text-emerald-600">Scan Réseau Bloqué</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50">
                                    <span className="text-[9px] font-black uppercase text-slate-400">Hier</span>
                                    <span className="text-[9px] font-black uppercase text-indigo-600">Success Failover Test</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Consulter les Logs Master</Button>
                    </Card>
                </div>
            </div>

            {/* Bottom Innovation Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Réseau privé SIGHI-NET", val: "Actif", icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
                    { title: "Intégrité Blockchain", val: "Validée", icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { title: "Cold Storage Backup", val: "Journalier", icon: HardDrive, color: "text-slate-600", bg: "bg-slate-50" },
                    { title: "Kernel Securisé v3", val: "Optimum", icon: Cpu, color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((item, i) => (
                    <Card key={i} className="border-none shadow-xl rounded-[30px] p-6 group hover:translate-y-[-5px] transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", item.bg, item.color)}>
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.title}</p>
                                <p className="text-xs font-black text-slate-900 italic">{item.val}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
