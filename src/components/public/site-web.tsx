"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
    Activity,
    Phone,
    ArrowRight,
    LogIn,
    ShieldCheck,
    HeartPulse,
    Zap,
    Globe,
    Microscope,
    Stethoscope,
    Instagram,
    Facebook,
    MessageSquare,
    Sparkles
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PublicWebsite() {
    return (
        <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Ultra-Modern Navigation */}
            <nav className="fixed top-0 z-[100] w-full px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/70 backdrop-blur-2xl border border-white/20 rounded-[32px] px-8 h-20 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3 group-hover:rotate-0 transition-transform">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">AÉRÉ LAO</span>
                                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Medical Hub</span>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500">
                            <Link href="/" className="hover:text-indigo-600 transition-all hover:scale-105">Accueil</Link>
                            <Link href="#specialites" className="hover:text-indigo-600 transition-all hover:scale-105">Spécialités</Link>
                            <Link href="#vison" className="hover:text-indigo-600 transition-all hover:scale-105">Innovation</Link>
                            <Link href="#contact" className="hover:text-indigo-600 transition-all hover:scale-105">Contact</Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/login">
                                <Button variant="ghost" className="hidden sm:flex items-center gap-2 font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl px-6">
                                    <LogIn className="h-4 w-4" />
                                    Accès Appli
                                </Button>
                            </Link>
                            <Link href="/rendez-vous">
                                <Button className="bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl px-8 h-12 shadow-xl shadow-slate-200 transition-all hover:-translate-y-1">
                                    Prendre RDV
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Futuristic Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 relative z-10">
                        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-5 py-2">
                            <Sparkles className="h-4 w-4 text-indigo-600 fill-indigo-600" />
                            <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">L'avenir de la santé est ici</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900">
                            La Clinique du <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Futur</span> est à Aéré Lao.
                        </h1>

                        <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed">
                            Vivez une expérience médicale augmentée où l'intelligence artificielle et l'expertise humaine s'unissent pour votre bien-être.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/rendez-vous">
                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[24px] px-10 h-16 text-lg font-black shadow-2xl shadow-indigo-200 transition-all hover:scale-105 group">
                                    Réserver mon soin <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                            <div className="flex items-center gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white rotate-12">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgence 24/7</p>
                                    <p className="text-lg font-black text-slate-900">+221 33 800 00 00</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 pt-6 border-t border-slate-100">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                                        <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-indigo-300 flex items-center justify-center text-[10px] font-bold">DR</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-slate-500">
                                <span className="text-indigo-600 font-black">25+ Experts</span> disponibles dès maintenant
                            </p>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-[60px] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />

                        <div className="relative aspect-[4/5] rounded-[50px] overflow-hidden border-[12px] border-white shadow-[0_32px_64px_rgba(0,0,0,0.12)] rotate-2 group-hover:rotate-0 transition-all duration-700">
                            <Image
                                src="/images/hero-clinic.png"
                                alt="Futuristic Clinique Aéré Lao"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 translate-y-20 group-hover:translate-y-0 transition-transform duration-700">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-xl font-black text-white">Distinction 2026</h4>
                                        <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest">Architecture & Innovation</p>
                                    </div>
                                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-xl">
                                        <Zap className="h-6 w-6 fill-indigo-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative background atoms */}
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] -z-10" />
            </section>

            {/* Vision / Key Tech Grid */}
            <section id="vison" className="py-32 bg-slate-900 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Dashboard Patient", icon: UserCircle, desc: "Accédez à vos résultats et ordonnances en temps réel depuis votre mobile.", val: "100%", label: "Digital" },
                            { title: "IA Diagnostics", icon: Microscope, desc: "Analyse prédictive pour des diagnostics d'une précision inégalée.", val: "99.9%", label: "Précision" },
                            { title: "Télémédecine", icon: Globe, desc: "Consultez nos meilleurs spécialistes où que vous soyez.", val: "24h/7", label: "Accès" },
                            { title: "Bio-Tech Lab", icon: Zap, desc: "Analyses génétiques et biologiques haute performance.", val: "<2h", label: "Résultats" }
                        ].map((stat, i) => (
                            <div key={i} className="group bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-all cursor-crosshair">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                        <stat.icon className="h-8 w-8" />
                                    </div>
                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{stat.label}</span>
                                </div>
                                <h4 className="text-4xl font-black text-white mb-2">{stat.val}</h4>
                                <h5 className="text-lg font-bold text-slate-200 mb-4">{stat.title}</h5>
                                <p className="text-slate-500 text-sm font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialties Section */}
            <section id="specialites" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl space-y-4">
                            <Badge className="bg-indigo-600 text-white rounded-full px-4 py-1 hover:bg-indigo-700">Départements</Badge>
                            <h2 className="text-5xl font-black tracking-tight text-slate-900">Une expertise multidisciplinaire pour chaque <span className="text-indigo-600">génération</span>.</h2>
                        </div>
                        <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 border-slate-100 font-bold hover:bg-slate-50">Découvrir tous les pôles</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: HeartPulse, title: "Cardiologie", color: "from-rose-500/20 to-rose-500/5", textColor: "text-rose-600", desc: "Soins cardiaques haut de gamme avec technologie SCORE2." },
                            { icon: Stethoscope, title: "Chirurgie", color: "from-indigo-500/20 to-indigo-500/5", textColor: "text-indigo-600", desc: "Blocs opératoires ultra-modernes et micro-chirurgie." },
                            { icon: ShieldCheck, title: "Ophtalmologie", color: "from-emerald-500/20 to-emerald-500/5", textColor: "text-emerald-600", desc: "Correction laser et chirurgie oculaire assistée par IA." }
                        ].map((item, i) => (
                            <div key={i} className="group p-2 bg-[#fcfcfc] rounded-[48px] border border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500">
                                <div className={`aspect-square rounded-[40px] bg-gradient-to-br ${item.color} flex items-center justify-center transition-transform group-hover:scale-95 duration-500`}>
                                    <item.icon className={`h-24 w-24 ${item.textColor} opacity-20 group-hover:opacity-100 transition-opacity`} />
                                </div>
                                <div className="p-10">
                                    <h4 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h4>
                                    <p className="text-slate-500 font-medium mb-6">{item.desc}</p>
                                    <Button variant="ghost" className="p-0 h-auto font-black text-indigo-600 hover:bg-transparent hover:translate-x-2 transition-transform">En savoir plus <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modern CTA */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900 rounded-[60px] p-12 md:p-24 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 relative z-10 max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Prêt pour votre <span className="text-emerald-400 underline decoration-indigo-500 underline-offset-8">check-up</span> ?</h2>
                            <p className="text-slate-400 text-lg font-medium">Rejoignez les 15,000 patients qui font confiance à notre technologie chaque année.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-3xl h-20 px-10 text-xl font-black transition-all">
                                    Connexion App
                                </Button>
                            </Link>
                            <Link href="/rendez-vous">
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-emerald-400 rounded-3xl h-20 px-10 text-xl font-black transition-all">
                                    Prendre RDV
                                </Button>
                            </Link>
                        </div>

                        {/* Abstract glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter">AÉRÉ LAO</span>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed">Redéfinir le standard des soins médicaux en Afrique avec l'innovation digitale.</p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all"><Facebook /></Button>
                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all"><Instagram /></Button>
                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all"><MessageSquare /></Button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Navigation</h5>
                        <ul className="space-y-4 text-slate-600 font-bold">
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">L'Équipe Médicale</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">Infrastructures</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">Carrières</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Services</h5>
                        <ul className="space-y-4 text-slate-600 font-bold">
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">Portail Patient</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">Urgences 24/7</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">Conseils Santé</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Localisation</h5>
                        <div className="space-y-4 text-slate-600 font-bold">
                            <p className="flex items-start gap-2">Aéré Lao, Fouta - Sénégal</p>
                            <p className="flex items-center gap-2 text-indigo-600">contact@aerelaomedical.sn</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">© 2026 AÉRÉ LAO Medical Hub. Excellence beyond borders.</p>
                    <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Link href="#" className="hover:text-indigo-600">Privacité</Link>
                        <Link href="#" className="hover:text-indigo-600">Cookies</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function UserCircle(props: any) {
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
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
        </svg>
    )
}
