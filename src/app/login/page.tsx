import { LoginForm } from "@/components/auth/login-form"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Activity } from "lucide-react"

export const metadata: Metadata = {
    title: "Connexion - Clinique Aéré Lao",
    description: "Portail de connexion sécurisé pour le personnel de la Clinique Aéré Lao",
}

export default function LoginPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-950">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-clinic.png"
                    alt="Clinique Aéré Lao Background"
                    fill
                    className="object-cover opacity-20 blur-[2px]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-indigo-950/50" />
            </div>

            {/* Decorative Orbs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] animate-pulse" />

            <div className="relative z-10 w-full max-w-md">
                {/* Branding */}
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="flex items-center gap-3 mb-4 group">
                        <div className="h-12 w-12 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Activity className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter text-white leading-none">AÉRÉ LAO</span>
                            <span className="text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase">Digital Health Hub</span>
                        </div>
                    </Link>
                </div>

                <LoginForm />

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        ← Retour au site public
                    </Link>
                </div>
            </div>
        </div>
    )
}
