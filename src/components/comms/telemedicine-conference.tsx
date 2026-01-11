"use client"

import { useState, useEffect } from "react"
import {
    Video,
    Mic,
    MicOff,
    VideoOff,
    ScreenShare,
    MessageSquare,
    Users,
    Settings,
    Disc,
    StopCircle,
    FileText,
    Download,
    Sparkles,
    Circle,
    MoreVertical,
    PhoneOff,
    Hand,
    LayoutGrid,
    ShieldCheck,
    Zap,
    Send,
    Play,
    Activity,
    User
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function TelemedicineConference() {
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)
    const [activeTab, setActiveTab] = useState<'participants' | 'chat' | 'pv'>('participants')
    const [pvProgress, setPvProgress] = useState(0)
    const [isGeneratingPv, setIsGeneratingPv] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isRecording])

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const startRecording = () => {
        setIsRecording(true)
        toast.info("Enregistrement Cloud démarré (HD 1080p)")
    }

    const stopRecording = () => {
        setIsRecording(false)
        setIsGeneratingPv(true)
        toast.success("Enregistrement sauvegardé. Génération du PV par l'IA en cours...")

        let progress = 0
        const interval = setInterval(() => {
            progress += 5
            setPvProgress(progress)
            if (progress >= 100) {
                clearInterval(interval)
                setIsGeneratingPv(false)
                toast.success("Procès-verbal de conférence généré avec succès!")
            }
        }, 150)
    }

    const participants = [
        { name: "Dr. Aere Lao (Moi)", role: "Chirurgien Dentiste", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AERE", status: "Present", isMe: true },
        { name: "Mme. Fatou Sow", role: "Patiente", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=FATOU", status: "Present" },
        { name: "Dr. Moussa Kane", role: "Expert Consulté", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MOUSSA", status: "Present" },
    ]

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] gap-6 p-4 md:p-8 animate-in fade-in duration-1000">
            {/* Header / Toolbar Top */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/50 backdrop-blur-xl p-6 rounded-[35px] border border-white shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                        <Video className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">Télé-Expertise <span className="text-indigo-600">Live</span></h1>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[9px] px-2">SÉCURISÉ AES-256</Badge>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: CONF-9J82-LAO</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {isRecording && (
                        <div className="flex items-center gap-3 bg-rose-50 px-4 py-2 rounded-2xl border border-rose-100 animate-pulse">
                            <Circle className="h-2 w-2 fill-rose-600 text-rose-600" />
                            <span className="text-xs font-black text-rose-600 font-mono tracking-tighter">{formatTime(recordingTime)}</span>
                        </div>
                    )}
                    <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden md:block" />
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-500/20 gap-2">
                        <PhoneOff className="h-4 w-4" /> Quitter
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                {/* Video Area */}
                <div className="lg:col-span-8 flex flex-col gap-4 relative">
                    <div className="flex-1 bg-slate-900 rounded-[40px] overflow-hidden relative group border-4 border-slate-800 shadow-3xl">
                        {/* Main Stream (Speaker) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {isVideoOff ? (
                                <div className="flex flex-col items-center gap-4 opacity-50">
                                    <div className="h-32 w-32 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-700">
                                        <Users className="h-12 w-12 text-slate-600" />
                                    </div>
                                    <p className="text-slate-500 font-black uppercase text-xs tracking-widest">Caméra désactivée</p>
                                </div>
                            ) : (
                                <img
                                    src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1200"
                                    className="w-full h-full object-cover"
                                    alt="Video stream"
                                />
                            )}
                        </div>

                        {/* Overlay Controls */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 p-4 bg-black/40 backdrop-blur-2xl rounded-[30px] opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/10">
                            {[
                                { icon: isMuted ? MicOff : Mic, label: "Audio", active: !isMuted, onClick: () => setIsMuted(!isMuted) },
                                { icon: isVideoOff ? VideoOff : Video, label: "Vidéo", active: !isVideoOff, onClick: () => setIsVideoOff(!isVideoOff) },
                                { icon: ScreenShare, label: "Écran", active: false },
                                { icon: Hand, label: "Main", active: false },
                            ].map((btn, i) => (
                                <Button
                                    key={i}
                                    onClick={btn.onClick}
                                    className={cn(
                                        "h-14 w-14 rounded-2xl transition-all",
                                        btn.active ? "bg-white/10 text-white hover:bg-white/20" : "bg-rose-600/20 text-rose-500 hover:bg-rose-600/30"
                                    )}
                                >
                                    <btn.icon className="h-6 w-6" />
                                </Button>
                            ))}
                        </div>

                        {/* Top Overlays */}
                        <div className="absolute top-8 left-8">
                            <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white font-black text-[10px] px-3 py-1.5 rounded-xl uppercase tracking-widest flex gap-2 items-center">
                                <Activity className="h-3 w-3 text-emerald-400" /> Dr. Kane (Intervenant)
                            </Badge>
                        </div>

                        {/* Thumbnail PiP */}
                        <div className="absolute top-8 right-8 w-48 h-32 rounded-3xl bg-slate-800 border-2 border-white/10 overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
                                className="w-full h-full object-cover opacity-80"
                                alt="Self preview"
                            />
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/40 rounded-lg text-[8px] font-black text-white uppercase italic">Moi</div>
                        </div>
                    </div>

                    {/* Bottom Feature Strip */}
                    <div className="flex gap-4">
                        <Button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={cn(
                                "h-16 px-10 rounded-[25px] flex-1 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all border-none",
                                isRecording ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-slate-900 hover:bg-indigo-600 text-white"
                            )}
                        >
                            {isRecording ? <StopCircle className="h-5 w-5 mr-3" /> : <Disc className="h-5 w-5 mr-3" />}
                            {isRecording ? "Arrêter l'Enregistrement" : "Lancer Enregistrement IA"}
                        </Button>
                        <Button className="h-16 w-16 rounded-[25px] bg-white border border-slate-100 shadow-xl text-slate-900">
                            <LayoutGrid className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* Sidebar (Chat / Participants / PV) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card className="flex-1 border-none shadow-2xl rounded-[40px] bg-white overflow-hidden flex flex-col border border-slate-100">
                        <Tabs defaultValue="chat" className="flex-1 flex flex-col" onValueChange={(v) => setActiveTab(v as any)}>
                            <TabsList className="bg-slate-50 p-2 h-16 rounded-none border-b grid grid-cols-3">
                                <TabsTrigger value="participants" className="rounded-xl font-bold text-[10px] uppercase data-[state=active]:bg-white data-[state=active]:shadow-lg">
                                    <Users className="h-3 w-3 mr-2" /> {participants.length} Pros
                                </TabsTrigger>
                                <TabsTrigger value="chat" className="rounded-xl font-bold text-[10px] uppercase data-[state=active]:bg-white data-[state=active]:shadow-lg">
                                    <MessageSquare className="h-3 w-3 mr-2" /> Chat
                                </TabsTrigger>
                                <TabsTrigger value="pv" className="rounded-xl font-bold text-[10px] uppercase data-[state=active]:bg-white data-[state=active]:shadow-lg">
                                    <FileText className="h-3 w-3 mr-2" /> Actes/PV
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="chat" className="flex-1 flex flex-col p-6 m-0 gap-4">
                                <ScrollArea className="flex-1 pr-4">
                                    <div className="space-y-6">
                                        <div className="flex flex-col items-start gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">16:42 • Dr. Kane</span>
                                            </div>
                                            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-xs font-bold text-slate-700 leading-relaxed">
                                                J’ai analysé les radios panoramiques, je confirme la nécessité d’une extraction.
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-indigo-400 uppercase italic">Moi</span>
                                            </div>
                                            <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none text-xs font-bold text-white shadow-lg">
                                                Compris. On va planifier ça pour mardi prochain.
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                                <div className="relative mt-4">
                                    <Input placeholder="Votre message..." className="h-14 rounded-2xl pr-14 border-slate-100 bg-slate-50 font-bold text-sm" />
                                    <Button size="icon" className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-indigo-600 shadow-lg">
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="participants" className="flex-1 p-6 m-0">
                                <div className="space-y-4">
                                    {participants.map((p, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50/50 border border-transparent hover:border-slate-200 transition-all">
                                            <div className="relative">
                                                <img src={p.image} className="h-10 w-10 rounded-xl shadow-lg" alt={p.name} />
                                                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xs font-black uppercase tracking-tight text-slate-900">{p.name}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">{p.role}</p>
                                            </div>
                                            <MoreVertical className="h-4 w-4 text-slate-300" />
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="pv" className="flex-1 flex flex-col p-6 m-0 gap-6">
                                {isGeneratingPv ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 animate-in zoom-in-95 duration-500">
                                        <div className="relative h-24 w-24">
                                            <Circle className="h-full w-full text-indigo-100 stroke-[4px]" />
                                            <Circle className="h-full w-full text-indigo-600 stroke-[4px] absolute top-0 left-0 animate-spin" style={{ strokeDasharray: '25, 100' }} />
                                            <Sparkles className="h-8 w-8 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black uppercase italic tracking-tighter">Génération IA...</h4>
                                            <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">Analyse de la voix & Synthèse des actions</p>
                                        </div>
                                        <div className="w-full max-w-[200px] space-y-2">
                                            <Progress value={pvProgress} className="h-2" />
                                            <span className="text-[10px] font-black text-indigo-600">{pvProgress}% complété</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col gap-6">
                                        <Card className="bg-indigo-50/50 border-indigo-100 border-2 rounded-[30px] p-6 shadow-sm group hover:shadow-xl transition-all duration-500">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <Badge className="bg-white text-indigo-600 border-none text-[8px] font-black">PV_CONF_2026.pdf</Badge>
                                            </div>
                                            <h4 className="font-black text-sm uppercase italic tracking-tight">Proces-Verbal de Séance IA</h4>
                                            <p className="text-[10px] font-bold text-slate-400 mt-2 leading-relaxed">
                                                Inclut : Transcription intégrale, points de décision, actions assignées et horodatage blockchain.
                                            </p>
                                            <Button className="w-full mt-6 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white font-black text-[9px] uppercase tracking-widest h-12 rounded-xl transition-all gap-2">
                                                <Download className="h-4 w-4" /> Télécharger Dossier Complexe
                                            </Button>
                                        </Card>

                                        <div className="space-y-4">
                                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Derniers Événements</h5>
                                            <div className="space-y-3">
                                                <div className="flex gap-3 px-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5" />
                                                    <p className="text-[10px] font-bold text-slate-600">Partage de l'imagerie CBCT Dr. Kane</p>
                                                </div>
                                                <div className="flex gap-3 px-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5" />
                                                    <p className="text-[10px] font-bold text-slate-600">Accord patient sur plan de traitement</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </Card>

                    {/* Quick Stat / Security Card */}
                    <Card className="bg-slate-900 rounded-[35px] p-8 border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-all duration-700">
                            <ShieldCheck className="h-24 w-24 text-white" />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <Zap className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white uppercase italic tracking-widest">Statut Connexion</p>
                                <p className="text-xs font-bold text-slate-400 mt-1 italic">Latence : 12ms • Cluster Dakar A</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
