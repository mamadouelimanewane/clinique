"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Stethoscope,
    Pill,
    CreditCard,
    Users,
    Settings,
    Menu,
    X,
    Activity,
    UserPlus,
    Heart,
    Plus,
    BrainCircuit,
    ShieldAlert,
    GraduationCap,
    School,
    ConciergeBell,
    ShoppingBag,
    FlaskConical,
    Scan,
    Home,
    Wrench,
    Archive,
    HandCoins,
    FolderSearch,
    Bed,
    Scissors,
    Baby,
    Package,
    ChevronDown,
    Calendar,
    MessageSquare,
    Mail,
    Sparkles,
    Zap,
    BookOpen,
    Video
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const menuGroups = [
    {
        title: "Général",
        items: [
            { label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard", color: "text-sky-500" },
            { label: "Rendez-vous", icon: Calendar, href: "/appointments", color: "text-indigo-400" },
            { label: "Accueil", icon: Home, href: "/accueil", color: "text-orange-500" },
        ]
    },
    {
        title: "Médical & Clinique",
        items: [
            { label: "Patients", icon: UserPlus, href: "/patients", color: "text-pink-700" },
            { label: "Consultations", icon: Stethoscope, href: "/medical", color: "text-violet-500" },
            { label: "Hospitalisation", icon: Bed, href: "/hospitalisation", color: "text-blue-600" },
            { label: "Bloc Opératoire", icon: Scissors, href: "/chirurgie", color: "text-red-500" },
            { label: "Maternité", icon: Baby, href: "/maternite", color: "text-pink-400" },
            { label: "Smart Concierge", icon: ConciergeBell, href: "/patients/concierge", color: "text-amber-500" },
            { label: "Expérience Patient", icon: Heart, href: "/patients/satisfaction", color: "text-rose-500" },
            { label: "Santé Prédictive", icon: BrainCircuit, href: "/medical/predictive", color: "text-indigo-600" },
            { label: "Innovation Lab", icon: FlaskConical, href: "/medical/innovation-lab", color: "text-rose-500" },
            { label: "Smart IA Assistant", icon: Sparkles, href: "/medical/smart-ia", color: "text-indigo-400" },
            { label: "Vision SIGHI 2026", icon: Zap, href: "/vision-2026", color: "text-yellow-400" },
        ]
    },
    {
        title: "Plateau Technique",
        items: [
            { label: "Laboratoire", icon: FlaskConical, href: "/labo", color: "text-emerald-600" },
            { label: "Imagerie", icon: Scan, href: "/imagerie", color: "text-blue-500" },
            { label: "Pharmacie", icon: Pill, href: "/pharmacie", color: "text-emerald-500" },
            { label: "Logistique / Stocks", icon: Package, href: "/logistique", color: "text-amber-600" },
        ]
    },
    {
        title: "Gestion & Finance",
        items: [
            { label: "Comptabilité", icon: CreditCard, href: "/comptabilite", color: "text-zinc-300" },
            { label: "Achats Centralisés", icon: ShoppingBag, href: "/achats", color: "text-indigo-400" },
            { label: "Recouvrement", icon: HandCoins, href: "/recouvrement", color: "text-amber-500" },
            { label: "RH", icon: Users, href: "/rh", color: "text-blue-700" },
            { label: "Communication", icon: MessageSquare, href: "/comms", color: "text-emerald-500" },
            { label: "Conférence Live", icon: Video, href: "/comms/conference", color: "text-indigo-600" },
        ]
    },
    {
        title: "Supports & Config",
        items: [
            { label: "Cyber Fortress", icon: ShieldAlert, href: "/security", color: "text-rose-600" },
            { label: "E-Learning CHU", icon: School, href: "/support/chu-elearning", color: "text-indigo-400" },
            { label: "SIGHI Academy", icon: GraduationCap, href: "/support/academy", color: "text-indigo-600" },
            { label: "Guide Magistral", icon: BookOpen, href: "/guide", color: "text-indigo-400" },
            { label: "Archives & GED", icon: FolderSearch, href: "/ged", color: "text-yellow-600" },
            { label: "Tarifs & Grille", icon: CreditCard, href: "/parametres/tarifs", color: "text-indigo-400" },
            { label: "Maintenance", icon: Wrench, href: "/maintenance", color: "text-slate-400" },
            { label: "Paramètres", icon: Settings, href: "/parametres", color: "text-slate-500" },
        ]
    }
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white overflow-y-auto scrollbar-hide">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-10">
                    <div className="relative h-8 w-8 mr-4 bg-primary rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h1 className="text-xl font-bold tracking-wider">SIGHI CLI</h1>
                </Link>

                <div className="space-y-6">
                    {menuGroups.map((group) => (
                        <div key={group.title}>
                            <h2 className="px-4 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                                {group.title}
                            </h2>
                            <div className="space-y-1">
                                {group.items.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className={cn(
                                            "text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200",
                                            pathname.startsWith(route.href) ? "text-white bg-white/10 shadow-sm" : "text-zinc-400"
                                        )}
                                    >
                                        <div className="flex items-center flex-1">
                                            <route.icon className={cn("h-4 w-4 mr-3", route.color)} />
                                            {route.label}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 text-white border-r-slate-800">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
