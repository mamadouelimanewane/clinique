import Link from "next/link"
import { Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header Public */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-100">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase italic leading-none">
                                SIGHI <span className="text-teal-600">Clinique</span>
                            </h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portail Patient</p>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link href="/login">
                            <Button variant="ghost" className="font-bold text-slate-600 hover:text-teal-600">Espace Médecin</Button>
                        </Link>
                        <Link href="/rendez-vous">
                            <Button className="bg-teal-600 hover:bg-teal-700 font-bold rounded-xl shadow-lg shadow-teal-200">
                                Prendre RDV
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="font-bold text-slate-500">© 2026 SIGHI Clinique. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    )
}
