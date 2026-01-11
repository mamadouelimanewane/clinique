"use client"

import { useState } from "react"
import {
    BookOpen,
    Sparkles,
    Stethoscope,
    Zap,
    FlaskConical,
    Scan,
    Package,
    Wrench,
    CreditCard,
    Users,
    MessageSquare,
    ShieldCheck,
    Settings,
    ChevronRight,
    Search,
    Download,
    Printer,
    ArrowUpRight,
    Activity,
    Target,
    HeartPulse,
    Boxes,
    Building2,
    Lock,
    Globe
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export function UserGuideMaster() {
    const [activeChapter, setActiveChapter] = useState("intro")

    const chapters = [
        { id: "intro", title: "Vision & Fondamentaux", icon: Sparkles, color: "text-indigo-600" },
        { id: "medical", title: "Prise en Charge Médicale", icon: Stethoscope, color: "text-violet-600" },
        { id: "platform", title: "Plateau Technique & Labo", icon: FlaskConical, color: "text-emerald-600" },
        { id: "imaging", title: "Imagerie & Vision IA", icon: Scan, color: "text-blue-600" },
        { id: "logistics", title: "Logistique & GMAO", icon: Package, color: "text-amber-600" },
        { id: "finance", title: "Finance & Tarification", icon: CreditCard, color: "text-rose-600" },
        { id: "comms", title: "Communication & GED", icon: MessageSquare, color: "text-sky-600" },
        { id: "admin", title: "Pilotage Stratégique", icon: Building2, color: "text-slate-900" },
        { id: "security", title: "Sécurité & Paramètres", icon: ShieldCheck, color: "text-red-700" },
    ]

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Ultra-Premium Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-500/20 rotate-3">
                            <BookOpen className="h-7 w-7 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">Guide <span className="text-indigo-600">Magistral</span> SIGHI</h1>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                        Manuel d'Exploitation Master • Clinique Aéré Lao • Version 2026.1
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex gap-2">
                        <Printer className="h-4 w-4" /> Version Imprimable
                    </Button>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Rechercher une fonction..." className="pl-10 h-12 rounded-xl bg-slate-100 border-none font-bold text-xs" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Navigation Sidebar */}
                <div className="space-y-2">
                    <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Sommaire Interactif</h3>
                    <div className="space-y-1">
                        {chapters.map((chap) => (
                            <button
                                key={chap.id}
                                onClick={() => setActiveChapter(chap.id)}
                                className={cn(
                                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left group",
                                    activeChapter === chap.id
                                        ? "bg-slate-900 text-white shadow-2xl scale-105"
                                        : "hover:bg-slate-50 text-slate-500"
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                    activeChapter === chap.id ? "bg-white/10" : "bg-slate-100 group-hover:bg-white"
                                )}>
                                    <chap.icon className={cn("h-5 w-5", activeChapter === chap.id ? "text-indigo-400" : chap.color)} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-tight">{chap.title}</span>
                                {activeChapter === chap.id && <ChevronRight className="ml-auto h-4 w-4 text-indigo-400" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-12">
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
                        <CardHeader className="p-10 border-b border-slate-50">
                            <Badge className="bg-indigo-600 text-white mb-4 italic px-4 py-1">CHAPITRE : {activeChapter.toUpperCase()}</Badge>
                            <CardTitle className="text-3xl font-black italic tracking-tighter uppercase leading-tight">
                                {chapters.find(c => c.id === activeChapter)?.title}
                            </CardTitle>
                            <CardDescription className="text-sm font-medium text-slate-400 mt-2">
                                Guide complet d'utilisation des outils et méthodologies SIGHI.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-10">
                            <Accordion type="single" collapsible className="w-full">
                                {activeChapter === "intro" && (
                                    <>
                                        <AccordionItem value="vision" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">1.1 La Vision SIGHI 2026</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed space-y-4">
                                                <p>SIGHI (Système d'Information et de Gestion Hospitalière Intégré) n'est pas qu'un logiciel, c'est le <strong>système nerveux central</strong> de la Clinique Aéré Lao. Il a été conçu pour automatiser les tâches administratives répétitives et permettre au personnel de se concentrer sur l'essentiel : le patient.</p>
                                                <div className="p-6 bg-slate-50 rounded-3xl border-l-4 border-indigo-600">
                                                    <p className="italic font-bold text-slate-900">"L'excellence technologique au service de l'humanisation des soins."</p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="ui" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">1.2 Ergonomie & Langage Visuel</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed space-y-4">
                                                <p>L'interface utilise des codes couleurs spécifiques :</p>
                                                <ul className="list-disc pl-5 space-y-2">
                                                    <li><span className="text-indigo-600 font-black">Indigo</span> : Actions principales et Systèmes IA.</li>
                                                    <li><span className="text-emerald-600 font-black">Émeraude</span> : Succès, Validation financière et Santé.</li>
                                                    <li><span className="text-amber-600 font-black">Ambre</span> : Maintenance, Stocks et Alertes de niveau 1.</li>
                                                    <li><span className="text-rose-600 font-black">Rose/Rouge</span> : Urgences médicales et Alertes critiques.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}

                                {activeChapter === "medical" && (
                                    <>
                                        <AccordionItem value="consult" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">2.1 Gestion du Dossier Patient Patient IA</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed space-y-4">
                                                <p>Le module <strong>Medical</strong> centralise l'historique complet du patient. Grâce à la "Smart Search", vous pouvez retrouver un dossier via NINEA, Nom ou matricule d'assurance en moins de 2 secondes.</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                                                        <Sparkles className="h-5 w-5 text-indigo-600 mb-2" />
                                                        <h5 className="font-black text-xs uppercase mb-1">Smart Prescription</h5>
                                                        <p className="text-[10px]">L'IA suggère des dosages et vérifie les interactions médicamenteuses en temps réel.</p>
                                                    </div>
                                                    <div className="bg-violet-50 p-4 rounded-2xl border border-violet-100">
                                                        <Activity className="h-5 w-5 text-violet-600 mb-2" />
                                                        <h5 className="font-black text-xs uppercase mb-1">Pulse Monitor</h5>
                                                        <p className="text-[10px]">Visualisation graphique des constantes vitales historiques pour un diagnostic affiné.</p>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="hosp" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">2.2 Circuit d'Hospitalisation & Sortie</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                Le module de sortie (Discharge Management) coordonne le départ du patient avec la facturation et le bio-nettoyage des chambres pour optimiser le taux d'occupation.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}

                                {activeChapter === "platform" && (
                                    <>
                                        <AccordionItem value="lab" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">3.1 Automates de Laboratoire</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                La saisie des résultats est directe ou automatisée via les interfaces HL7 des analyseurs. Les alertes de résultats pathologiques sont envoyées instantanément au médecin via le <strong>Comms Hub</strong>.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="pharma" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">3.2 Dispensation à la Pharmacie</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                Chaque boîte de médicament est scannée à la sortie. Le système effectue une déduction d'inventaire "FEFO" (First Expired, First Out) pour minimiser les pertes par expiration.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}

                                {activeChapter === "imaging" && (
                                    <>
                                        <AccordionItem value="dicom" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">4.1 DICOM & Vision IA 2026</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed space-y-4">
                                                <p>La vision IA assiste le radiologue en pré-analysant les clichés. Elle met en évidence les zones de "Haut Risque" par un cercle rouge pulsé, permettant une priorisation immédiate des cas critiques.</p>
                                                <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-2xl text-white">
                                                    <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                                                        <Scan className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black uppercase italic">Moteur de Segmentation 3D</p>
                                                        <p className="text-[10px] text-slate-400">Reconstruction automatique des organes en haute définition.</p>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}

                                {activeChapter === "logistics" && (
                                    <>
                                        <AccordionItem value="gmao" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">5.1 GMAO Expert System</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                La maintenance du plateau technique est prédictive. Une baisse de performance d'un asset (ex: Clim Scanner) génère automatiquement un ticket d'intervention avant même la panne totale.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="hse" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">5.2 Qualité & HSE (Hygiène/Sécurité)</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                Suivi rigoureux des circuits de déchets (DASRI) et des audits de bio-nettoyage. Le score de qualité global est affiché en temps réel au tableau de bord directeur.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}

                                {activeChapter === "finance" && (
                                    <>
                                        <AccordionItem value="pricing" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">6.1 Dynamic Pricing IA</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed space-y-4">
                                                <p>La tarification s'adapte automatiquement à la nomenclature nationale tout en appliquant des multiplicateurs "VIP" ou des remises "Agent" configurables dans le module <strong>Tarification</strong>.</p>
                                                <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3">
                                                    <Target className="h-5 w-5 text-emerald-600" />
                                                    <span className="text-xs font-bold text-emerald-900 uppercase">Objectif : Maximisation de la Marge Nette (Yield 2026).</span>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="tiers" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">6.2 Tiers-Payant & Recouvrement</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                Automatisation des bordereaux d'envoi pour l'État (Matricules), les assurances (AXA, SUNU) et les retraités (IPRES). Le pointage des paiements reçus se fait en un clic.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}

                                {activeChapter === "comms" && (
                                    <>
                                        <AccordionItem value="whatsapp" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">7.1 Communication Omni-Canal (WhatsApp/SMS)</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                Envoi automatique des rappels de RDV, des résultats de labo cryptés et des factures via les passerelles business. Chaque message est tracé (Délivré/Lu).
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="ged" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">7.2 Cloud GED Master Archive</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                Zéro papier : tous les documents (scanners, formulaires, contrats) sont indexés et stockés dans le Cloud AES-256 avec une accessibilité universelle sécurisée.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}

                                {activeChapter === "admin" && (
                                    <>
                                        <AccordionItem value="board" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">8.1 Executive Command Center</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                Vue d'ensemble stratégique pour la direction : occupation des lits, CA en direct, satisfaction patient et alertes système critiques sur un écran unique "Cockpit".
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}

                                {activeChapter === "security" && (
                                    <>
                                        <AccordionItem value="access" className="border-b-slate-100">
                                            <AccordionTrigger className="hover:no-underline"><span className="text-sm font-black uppercase text-slate-900 italic">9.1 Gestion des Accès & Sécurité</span></AccordionTrigger>
                                            <AccordionContent className="text-slate-500 text-sm leading-relaxed">
                                                Chaque action utilisateur est loguée (Audit Trail). La double authentification (2FA) est impérative pour les rôles administratifs et financiers.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}
                            </Accordion>

                            <div className="mt-16 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Besoin d'aide supplémentaire ?</p>
                                    <p className="text-xs font-bold text-indigo-600 italic">Contactez le Support Technique IT - Poste 4402</p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Button
                                        onClick={() => window.open('/manuel_utilisation_ultra.pdf', '_blank')}
                                        className="bg-slate-900 rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl"
                                    >
                                        <Download className="h-4 w-4" /> Manuel Ultra
                                    </Button>
                                    <Button
                                        onClick={() => window.open('/manuel_utilisation_detaille.pdf', '_blank')}
                                        className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl"
                                    >
                                        <Download className="h-4 w-4" /> Manuel Technique
                                    </Button>
                                    <Button
                                        onClick={() => window.open('/guide_administration_sighi.pdf', '_blank')}
                                        className="bg-violet-600 hover:bg-violet-700 rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl"
                                    >
                                        <ShieldCheck className="h-4 w-4" /> Guide Admin
                                    </Button>
                                    <Button
                                        onClick={() => window.open('/manuel_technique_architecture.pdf', '_blank')}
                                        className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl"
                                    >
                                        <Settings className="h-4 w-4" /> Architecture Code
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Pulse Card */}
                    <Card className="border-none shadow-2xl rounded-[40px] bg-indigo-950 text-white p-10 relative overflow-hidden group">
                        <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                            <Globe className="h-64 w-64" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="space-y-4 max-w-lg">
                                <h4 className="text-2xl font-black italic uppercase tracking-tighter">SIGHI Academy</h4>
                                <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                                    Des sessions de formation en présentiel sont organisées chaque premier lundi du mois dans la salle de conférence "Emergence". Inscrivez-vous pour maîtriser les nouvelles fonctions IA.
                                </p>
                            </div>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs h-14 px-10 rounded-2xl shadow-2xl transition-all">
                                Consulter le Planning Formations
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
