"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Phone, MapPin, Clock, Calendar, ShieldCheck, HeartPulse, UserCircle2, ArrowRight, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

export default function PublicWebsite() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900">AÉRÉ LAO</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
                        <Link href="#" className="hover:text-indigo-600 transition-colors">Accueil</Link>
                        <Link href="#" className="hover:text-indigo-600 transition-colors">Spécialités</Link>
                        <Link href="#" className="hover:text-indigo-600 transition-colors">L&apos;Équipe</Link>
                        <Link href="#" className="hover:text-indigo-600 transition-colors">Contact</Link>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-6">
                        Prendre RDV
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-12 pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 relative z-10 text-center lg:text-left">
                        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 px-4 py-1 text-xs font-bold uppercase tracking-widest">
                            L&apos;excellence médicale au cœur du Fouta
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter text-slate-900">
                            Votre santé méritait <span className="text-indigo-600">le meilleur</span> de la technologie.
                        </h1>
                        <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium">
                            Clinique Aéré Lao combine expertise médicale de pointe et équipements digitaux de dernière génération pour un diagnostic précis et un suivi personnalisé.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-14 text-md font-bold">
                                Découvrez nos spécialités <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <div className="flex items-center gap-4 px-6">
                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-pulse">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Urgence 24h/7</p>
                                    <p className="text-md font-black text-slate-900">+221 33 800 00 00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-slate-100 border-8 border-white shadow-2xl rotate-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="h-20 w-20 text-slate-300" />
                            <p className="absolute bottom-10 text-xs font-bold text-slate-400 uppercase tracking-widest">Photo de la Clinique Aéré Lao</p>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3" />
            </section>

            {/* KPI Section */}
            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div className="space-y-2">
                        <h4 className="text-4xl font-black">25+</h4>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Spécialistes</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-4xl font-black">15k</h4>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Patients/an</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-4xl font-black">98%</h4>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Satisfaction</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-4xl font-black">24/7</h4>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Service Urgence</p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:row justify-between items-end mb-16 gap-4">
                        <div className="space-y-4 text-center md:text-left">
                            <Badge className="bg-indigo-50 text-indigo-700">Expertise</Badge>
                            <h2 className="text-4xl font-black tracking-tight">Nos Praticiens Référents</h2>
                        </div>
                        <Button variant="ghost" className="text-indigo-600 font-bold">Voir toute l&apos;équipe <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Dr. Amadou Sy", role: "Cardiologue", specialty: "Score2 Expert", img: "AS" },
                            { name: "Dr. Fatou Diop", role: "Gynécologue", specialty: "Obstétrique High-Tech", img: "FD" },
                            { name: "Dr. Moussa Sow", role: "Ophtalmologue", specialty: "Chirurgie Cataracte", img: "MS" },
                            { name: "Dr. Awa Ndiaye", role: "Pédiatre", specialty: "Suivi OMS & Croissance", img: "AN" },
                        ].map((doc, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative h-72 rounded-3xl bg-slate-100 mb-6 overflow-hidden border-4 border-white shadow-sm group-hover:shadow-xl transition-all">
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-slate-300 bg-slate-50 group-hover:scale-110 transition-transform">
                                        {doc.img}
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <Badge className="bg-white/90 backdrop-blur text-slate-900 border-none shadow-sm">{doc.specialty}</Badge>
                                    </div>
                                </div>
                                <h4 className="text-lg font-black text-slate-900">{doc.name}</h4>
                                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{doc.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog/News Section */}
            <section className="py-24 bg-indigo-600 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center space-y-4 mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Actualités & Conseils Santé</h2>
                        <p className="opacity-70 max-w-2xl mx-auto font-medium">Restez informés des dernières avancées médicales et de nos conseils pour une vie plus saine.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Prévention Cardiovasculaire : Les nouveaux algorithmes", date: "12 Déc. 2025", cat: "Cardiologie" },
                            { title: "L&apos;importance du suivi pédiatrique digital", date: "05 Jan. 2026", cat: "Pédiatrie" },
                            { title: "Cataracte : Pourquoi choisir la chirurgie assistée ?", date: "08 Jan. 2026", cat: "Ophtalmologie" },
                        ].map((post, i) => (
                            <Card key={i} className="bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/20 transition-all cursor-pointer p-8 rounded-3xl">
                                <Badge className="bg-white text-indigo-600 mb-6">{post.cat}</Badge>
                                <h3 className="text-xl font-bold mb-4 leading-tight">{post.title}</h3>
                                <div className="flex items-center justify-between mt-8">
                                    <span className="text-xs opacity-60 font-bold uppercase tracking-widest">{post.date}</span>
                                    <ArrowRight className="h-5 w-5 opacity-40" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl" />
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center space-y-4 mb-20">
                        <Badge variant="outline" className="border-indigo-200 text-indigo-600 font-bold px-4">Plateau Médical</Badge>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Une technologie au service du patient</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Gynécologie Advance", icon: HeartPulse, desc: "Suivi obstétrical haute définition et diagnostic intelligent.", color: "bg-pink-50 text-pink-600" },
                            { title: "Cardiologie Digitale", icon: Activity, desc: "Bilan complet SCORE2 et monitoring cardiaque temps réel.", color: "bg-indigo-50 text-indigo-600" },
                            { title: "Ophtalmologie IOL", icon: ShieldCheck, desc: "Calcul d&apos;implant et chirurgie de pointe assistée par ordinateur.", color: "bg-emerald-50 text-emerald-600" },
                            { title: "Dermatologie IA", icon: UserCircle2, desc: "Dépistage intelligent des lésions cutanées par analyse d&apos;image.", color: "bg-orange-50 text-orange-600" },
                            { title: "Laboratoire 2.0", icon: Clock, desc: "Analyses automatisées et résultats accessibles via portail patient.", color: "bg-blue-50 text-blue-600" },
                            { title: "Accueil & Confort", icon: MapPin, desc: "Un environnement moderne et serein pour votre rétablissement.", color: "bg-slate-50 text-slate-600" },
                        ].map((s, i) => (
                            <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white p-8 rounded-3xl">
                                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${s.color}`}>
                                    <s.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{s.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-100 pb-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 bg-indigo-600 rounded flex items-center justify-center">
                                <Activity className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-black tracking-tight">AÉRÉ LAO</span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">L'excellence médicale pour tous, technologie au service des soins.</p>
                    </div>
                    <div className="space-y-4">
                        <h5 className="font-bold text-xs uppercase tracking-widest text-slate-900">Clinique</h5>
                        <ul className="text-xs text-slate-500 space-y-2 font-medium">
                            <li><Link href="#" className="hover:text-indigo-600">A propos</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600">Nos Praticiens</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600">Recrutement</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h5 className="font-bold text-xs uppercase tracking-widest text-slate-900">Services</h5>
                        <ul className="text-xs text-slate-500 space-y-2 font-medium">
                            <li><Link href="#" className="hover:text-indigo-600">Urgences</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600">Consultations</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600">Hospitalisation</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h5 className="font-bold text-xs uppercase tracking-widest text-slate-900">Suivez-nous</h5>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-indigo-600 bg-slate-50"><Facebook className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-indigo-600 bg-slate-50"><Instagram className="h-5 w-5" /></Button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:row items-center justify-between gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <p>© 2026 Clinique Aéré Lao. Tous droits réservés.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-slate-900">Mentions Légales</Link>
                        <Link href="#" className="hover:text-slate-900">Politique de Confidentialité</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function ImageIcon(props: any) {
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
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    )
}
