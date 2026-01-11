"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Phone, CheckCheck, Clock, ShieldCheck, Mail, Plus, Activity, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function CommunicationHub() {
    const [activeTab, setActiveTab] = useState<'whatsapp' | 'sms' | 'email' | 'ged'>('whatsapp')
    const [loading, setLoading] = useState(false)

    const sendNotification = (type: string) => {
        setLoading(true)
        setTimeout(() => {
            toast.success(`${type} envoyé avec succès !`)
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Premium Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 rotate-3">
                            <MessageSquare className="h-7 w-7" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Omni-Channel <span className="text-emerald-600">Comms</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        WhatsApp Business • SMS Gateway • Cloud GED • Sécurisé AES-256
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end mr-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Crédits Gateway</p>
                        <p className="text-xl font-black text-emerald-600">12,450 <span className="text-[10px] text-slate-400 font-bold uppercase">SMS restant</span></p>
                    </div>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2">
                        <Plus className="h-5 w-5" /> Nouveau Message
                    </Button>
                </div>
            </div>

            {/* Main Interface Tabs */}
            <Tabs defaultValue="whatsapp" className="space-y-10" onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="bg-slate-100/50 rounded-[30px] p-2 h-[80px] shadow-inner border border-slate-200 flex overflow-x-auto justify-start scrollbar-hide w-full gap-2">
                    {[
                        { val: "whatsapp", label: "WhatsApp Business", icon: MessageSquare },
                        { val: "sms", label: "Automates SMS", icon: Phone },
                        { val: "email", label: "Email Professionnel", icon: Mail },
                        { val: "ged", label: "Cloud GED & Stockage", icon: ShieldCheck },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full rounded-[22px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-emerald-600 font-black text-[10px] uppercase tracking-widest transition-all gap-3 border border-transparent data-[state=active]:border-emerald-50">
                            <t.icon className="h-4 w-4" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="whatsapp" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                            <CardHeader className="bg-emerald-50/50 p-8 border-b border-emerald-100 flex flex-row items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                                        <CardTitle className="text-xl font-black italic tracking-tighter uppercase">WhatsApp Live Gateway</CardTitle>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Échange sécurisé avec le patient</p>
                                </div>
                                <Badge className="bg-white text-emerald-600 border border-emerald-200 font-black text-[10px] px-4 py-1.5 rounded-full shadow-sm">API CONNECTÉE</Badge>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label>Patient Destinataire</Label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input placeholder="Rechercher par nom ou téléphone..." className="pl-10 h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500 font-bold" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Template Protocolé</Label>
                                        <select className="w-full h-14 rounded-2xl bg-slate-50 border-none px-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500">
                                            <option>Rappel de Rendez-vous</option>
                                            <option>Lien Conférence Live</option>
                                            <option>Alerte Résultats Labo</option>
                                            <option>Directives Bloc Opératoire</option>
                                            <option>Confirmation Admission</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label>Contenu du Message</Label>
                                    <Textarea
                                        rows={6}
                                        className="rounded-[25px] bg-slate-50 border-none p-6 text-sm font-medium leading-relaxed focus-visible:ring-emerald-500"
                                        placeholder="Saisissez votre message ici..."
                                        defaultValue="Bonjour [Patient], voici votre lien de connexion sécurisé pour la téléconsultation SIGHI prévue aujourd'hui : https://lao-clinic.sn/live/CONF-9J82-LAO. Veuillez vous connecter 5 minutes avant le début."
                                    />
                                </div>
                                <Button className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all active:scale-95 flex gap-3" onClick={() => sendNotification("WhatsApp")}>
                                    <Send className="h-5 w-5" /> {loading ? "Initialisation du Gateway..." : "Envoyer le Message Sécurisé"}
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="space-y-8">
                            {/* Live Tracking Feed */}
                            <Card className="border-none shadow-2xl rounded-[40px] p-8 bg-slate-900 text-white overflow-hidden relative group">
                                <Activity className="absolute -bottom-10 -right-10 h-40 w-40 text-white opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-8 italic">Flux de Sortie Live</h4>
                                <div className="space-y-6">
                                    {[
                                        { name: "Fatou Sow", status: "Lu", time: "2m", color: "emerald" },
                                        { name: "Ibrahima Diallo", status: "Delivré", time: "14m", color: "blue" },
                                        { name: "Yakhara Gueye", status: "Echec", time: "1h", color: "rose" },
                                    ].map((feed, i) => (
                                        <div key={i} className="flex justify-between items-center group/item hover:translate-x-1 transition-transform cursor-pointer">
                                            <div className="flex gap-4">
                                                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center",
                                                    feed.color === 'emerald' ? "bg-emerald-500/20 text-emerald-400" :
                                                        feed.color === 'blue' ? "bg-blue-500/20 text-blue-400" : "bg-rose-500/20 text-rose-400"
                                                )}>
                                                    <CheckCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase">{feed.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-500 italic">WhatsApp • {feed.time}</p>
                                                </div>
                                            </div>
                                            <Badge className={cn("bg-transparent border-none font-black text-[9px] uppercase tracking-widest",
                                                feed.color === 'emerald' ? "text-emerald-400" :
                                                    feed.color === 'blue' ? "text-blue-400" : "text-rose-400"
                                            )}>{feed.status}</Badge>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-10 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-[9px] uppercase tracking-widest h-11 rounded-xl">Voir toute l'histoire</Button>
                            </Card>

                            {/* Privacy Statement */}
                            <Card className="border-none shadow-xl rounded-[40px] p-8 bg-slate-50">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Compliance AES-256</h4>
                                </div>
                                <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
                                    Le protocole "Communication Hub" crypte automatiquement les données de santé (DMP) avant transmission. Aucun identifiant patient n'est transmis par SMS standard.
                                </p>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="ged" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <Card className="lg:col-span-1 border-none shadow-2xl rounded-[40px] bg-gradient-to-br from-slate-800 to-black text-white p-10 flex flex-col justify-between group overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                                    <ShieldCheck className="h-7 w-7 text-emerald-400" />
                                </div>
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight">GED Cloud <br /><span className="text-emerald-500">Security</span></h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4">Stockage Illimité & Sécurisé</p>
                            </div>

                            <div className="relative z-10 space-y-4 pt-10 border-t border-white/10 mt-10">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                    <span className="text-slate-400">Total Stocké</span>
                                    <span>2.4 TB</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[65%]" />
                                </div>
                            </div>

                            <Button className="w-full mt-10 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest h-14 rounded-2xl">Recharger Cloud Pack</Button>
                        </Card>

                        <div className="lg:col-span-3 space-y-8">
                            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 p-8 border-b flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Archives & Documents Numériques</CardTitle>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Gestion Électronique des Documents (GED)</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="outline" className="rounded-xl font-black text-[9px] uppercase h-10 px-6">Scanner</Button>
                                        <Button className="bg-slate-900 rounded-xl font-black text-[9px] uppercase h-10 px-6">Upload Cloud</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-3 gap-6 p-8">
                                        {[
                                            { name: "Radiographies_Q4.pdf", size: "12.4 MB", type: "PDF", date: "Hier" },
                                            { name: "Contrat_Fournisseur_Sanofi.docx", size: "1.2 MB", type: "DOCX", date: "05/01" },
                                            { name: "Compte_Rendu_Chirurgie.pdf", size: "8.5 MB", type: "PDF", date: "01/01" },
                                            { name: "Facture_Consolidee_Labo.pdf", size: "0.5 MB", type: "PDF", date: "30/12" },
                                            { name: "Fiche_Patient_X102.zip", size: "450 MB", type: "ZIP", date: "28/12" },
                                            { name: "Audit_ISO_2025.pdf", size: "22 MB", type: "PDF", date: "15/12" },
                                        ].map((file, i) => (
                                            <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-[25px] hover:bg-white hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer border border-transparent hover:border-emerald-100 group">
                                                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                                                    <Mail className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase text-slate-900 truncate w-32">{file.name}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 mt-1">{file.size} • {file.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <div className="p-4 border-t bg-slate-50 flex justify-center">
                                    <Button variant="link" className="text-[10px] font-black uppercase text-emerald-600">Accéder au Cloud Master Storage</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

