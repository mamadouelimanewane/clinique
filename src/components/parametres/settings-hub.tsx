"use client"

import { useState } from "react"
import {
    Settings,
    Globe,
    ShieldCheck,
    Bell,
    Database,
    Smartphone,
    Building2,
    Image as ImageIcon,
    Coins,
    CreditCard,
    Lock,
    Save,
    RefreshCcw,
    Palette
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export function SettingsHub() {
    const [loading, setLoading] = useState(false)

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            toast.success("Configurations globales enregistrées !")
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col gap-10 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Premium Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-500/20 rotate-3">
                            <Settings className="h-7 w-7 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Cœur de <span className="text-indigo-600">Système</span></h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Config Globale • Identité Visuelle • Sécurité Cluster
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex gap-2">
                        <RefreshCcw className="h-4 w-4" /> Reset Usine
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex gap-2"
                    >
                        <Save className="h-5 w-5" /> {loading ? "Synchronisation..." : "Appliquer les Changements"}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="identity" className="space-y-10">
                <TabsList className="bg-slate-100/50 rounded-[30px] p-2 h-[80px] shadow-inner border border-slate-200 flex overflow-x-auto justify-start scrollbar-hide w-full gap-2">
                    {[
                        { val: "identity", label: "Identité & Branding", icon: ImageIcon },
                        { val: "finance", label: "Devises & Banque", icon: Coins },
                        { val: "security", label: "Sécurité & Accès", icon: ShieldCheck },
                        { val: "network", label: "Intégrations API", icon: Globe },
                    ].map(t => (
                        <TabsTrigger key={t.val} value={t.val} className="h-full rounded-[22px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-all gap-3 border border-transparent data-[state=active]:border-indigo-50">
                            <t.icon className="h-4 w-4" /> {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Identity & Branding */}
                <TabsContent value="identity" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 p-8 border-b border-slate-100 flex flex-row justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Identité Visuelle Clinique</CardTitle>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Personnalisation des documents et interface</p>
                                </div>
                                <Palette className="h-6 w-6 text-indigo-600" />
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logo Officiel (PNG/SVG)</Label>
                                        <div className="h-40 w-full border-2 border-dashed border-slate-200 rounded-[30px] flex flex-col items-center justify-center bg-slate-50 group hover:border-indigo-300 transition-all cursor-pointer">
                                            <ImageIcon className="h-10 w-10 text-slate-300 mb-2 group-hover:scale-110 transition-transform" />
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Glisser ou Cliquer</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nom de l'Établissement</Label>
                                            <Input defaultValue="Clinique Dentaire Aere Lao" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slogan (Baseline)</Label>
                                            <Input defaultValue="L'Excellence Médicale au cœur de Lao" className="h-14 rounded-2xl bg-slate-50 border-none font-bold italic" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 rounded-2xl bg-indigo-600 text-white flex flex-col items-center gap-2">
                                        <div className="h-4 w-4 rounded-full bg-white opacity-20" />
                                        <span className="text-[8px] font-black uppercase">Couleur Primaire</span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col items-center gap-2">
                                        <div className="h-4 w-4 rounded-full bg-white opacity-20" />
                                        <span className="text-[8px] font-black uppercase">Couleur Accent</span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-amber-500 text-white flex flex-col items-center gap-2">
                                        <div className="h-4 w-4 rounded-full bg-white opacity-20" />
                                        <span className="text-[8px] font-black uppercase">Alerte IA</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-8">
                            <Card className="border-none shadow-2xl rounded-[40px] p-8 bg-slate-900 text-white overflow-hidden relative group">
                                <Building2 className="absolute -bottom-10 -right-10 h-40 w-40 text-white opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-8 italic">Informations Légales</h4>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">NINEA / RCCM</p>
                                        <p className="text-sm font-black">SN-DKR-2026-B-12345</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Agrément Sanitaire</p>
                                        <p className="text-sm font-black">MSAS/DGS/2026-088</p>
                                    </div>
                                </div>
                                <Button className="w-full mt-10 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-[9px] uppercase tracking-widest h-11 rounded-xl">Modifier Entête Officielle</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Finance & Bank */}
                <TabsContent value="finance" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                            <CardHeader className="bg-emerald-50/50 p-8 border-b border-emerald-100 flex flex-row justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Configuration Financière</CardTitle>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Devises, Taxes et Connectivité Bancaire</p>
                                </div>
                                <Coins className="h-6 w-6 text-emerald-600" />
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Devise de Référence</Label>
                                        <Select defaultValue="XOF">
                                            <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="XOF">Franc CFA (XOF)</SelectItem>
                                                <SelectItem value="EUR">Euro (€)</SelectItem>
                                                <SelectItem value="USD">Dollar (US$)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Taux TVA (%)</Label>
                                        <Input defaultValue="18" type="number" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Passerelle Bancaire Centrale</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-6 rounded-[25px] border-2 border-emerald-500/20 bg-emerald-50/10 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                    <Building2 className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase">Bank of Africa (BOA)</p>
                                                    <p className="text-[10px] font-bold text-slate-400">Connecté • Flux Swfit</p>
                                                </div>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="p-6 rounded-[25px] border-2 border-slate-100 flex items-center justify-between opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <CreditCard className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase">UBA Senegal</p>
                                                    <p className="text-[10px] font-bold text-slate-400">Déconnecté</p>
                                                </div>
                                            </div>
                                            <Switch />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white p-10 flex flex-col justify-between group overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                    <Smartphone className="h-7 w-7 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight">Mobile Money <br /><span className="text-emerald-500 text-4xl">Integrator</span></h3>
                                <div className="mt-8 space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span className="text-slate-500">Wave Gateway</span>
                                        <Badge className="bg-emerald-600 text-white border-none">ACTIVE</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span className="text-slate-500">Orange Money</span>
                                        <Badge className="bg-emerald-600 text-white border-none">ACTIVE</Badge>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full mt-10 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest h-14 rounded-2xl">Re-clés API Mobile</Button>
                        </Card>
                    </div>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[40px] bg-white overflow-hidden">
                            <CardHeader className="bg-rose-50/50 p-8 border-b border-rose-100 flex flex-row justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Protocoles de Sécurité SIGHI</CardTitle>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Authentification et Contrôle d'Accès</p>
                                </div>
                                <Lock className="h-6 w-6 text-rose-600" />
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[25px]">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-sm">
                                                <Smartphone className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase">Double Authentification (2FA)</p>
                                                <p className="text-[10px] font-bold text-slate-400">Pour tous les comptes administrateurs</p>
                                            </div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[25px]">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-600 shadow-sm">
                                                <RefreshCcw className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase">Rotation des Mots de Passe</p>
                                                <p className="text-[10px] font-bold text-slate-400">Expiration forcée tous les 90 jours</p>
                                            </div>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-8">
                            <Card className="border-none shadow-2xl rounded-[40px] bg-gradient-to-br from-rose-600 to-rose-900 text-white p-8">
                                <h4 className="text-xs font-black uppercase tracking-widest mb-6">Auditeur en Direct</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
                                        <span className="text-[10px] font-black uppercase">Dernière Intrusion Bloquée</span>
                                        <span className="text-xs font-bold font-mono">192.168.x.x</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
                                        <span className="text-[10px] font-black uppercase">Tentatives (24h)</span>
                                        <span className="text-xs font-bold">14</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-8 bg-white text-rose-900 font-black text-[10px] h-11 rounded-xl">Bilan de Sécurité complet</Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
