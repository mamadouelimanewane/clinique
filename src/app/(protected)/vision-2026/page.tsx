import { WhatsAppAiConcierge } from "@/components/vision/whatsapp-concierge"
import { DicomAiViewer } from "@/components/vision/dicom-ai-viewer"
import { VoiceBiomarkersAi } from "@/components/vision/voice-biomarkers"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, Zap, Target, Cpu } from "lucide-react"

export default function Vision2026Page() {
    return (
        <div className="p-4 lg:p-8 space-y-8 bg-white min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-indigo-600 animate-pulse" />
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Vision SIGHI 2026</h1>
                    </div>
                    <p className="text-slate-500 font-medium max-w-2xl">
                        Découvrez les technologies de rupture qui transformeront la Clinique Aéré Lao en un pôle d'intelligence médicale de référence mondiale.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Badge className="bg-slate-900 text-white px-4 py-1 font-bold text-xs">STATUS: R&D</Badge>
                    <Badge variant="outline" className="border-indigo-600 text-indigo-600 px-4 py-1 font-bold text-xs">VITESSE IA: 2.4 PFLOPS</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Section 1: Conciergerie WhatsApp */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        < Zap className="h-5 w-5 text-emerald-600" />
                        <h2 className="font-black text-lg text-slate-800">Conciergerie Patient</h2>
                    </div>
                    <WhatsAppAiConcierge />
                    <p className="text-[10px] text-slate-400 font-medium px-2 italic">
                        L'IA trie les patients par gravité et planifie les consultations en fonction des disponibilités réelles des spécialistes.
                    </p>
                </div>

                {/* Section 2: Multimodale / DICOM */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <Target className="h-5 w-5 text-indigo-600" />
                        <h2 className="font-black text-lg text-slate-800">Vision 3D & DICOM</h2>
                    </div>
                    <DicomAiViewer />
                    <p className="text-[10px] text-slate-400 font-medium px-2 italic">
                        Détection automatique de pathologies sur IRM et Scanner avec aide à la segmentation 3D des organes.
                    </p>
                </div>

                {/* Section 3: Analyse de la Voix */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <Cpu className="h-5 w-5 text-indigo-600" />
                        <h2 className="font-black text-lg text-slate-800">Biomarqueurs Vocaux</h2>
                    </div>
                    <VoiceBiomarkersAi />
                    <p className="text-[10px] text-slate-400 font-medium px-2 italic">
                        Dépistage de l'anxiété, de la fatigue et de la dépression via l'analyse acoustique lors de la dictée médicale.
                    </p>
                </div>
            </div>

            {/* Futuristic Roadmap */}
            <div className="bg-slate-900 rounded-[40px] p-12 text-white overflow-hidden relative border border-slate-700">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-3xl font-black mb-6">Feuille de Route Innovation</h3>
                        <div className="space-y-6">
                            {[
                                { year: "Q3 2026", title: "Jumeau Numérique Patient", desc: "Simulateur physiologique pour tester les traitements avant application." },
                                { year: "Q1 2027", title: "Robotique Télé-Assistée", desc: "Chirurgie assistée par IA avec retour haptique haute précision." },
                                { year: "Q4 2027", title: "Hôpital Décentralisé Meta", desc: "Consultations immersives en réalité virtuelle pour le suivi à distance." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="text-indigo-400 font-black text-sm whitespace-nowrap mt-1">{item.year}</div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center lg:items-end">
                        <div className="h-64 w-64 rounded-full border border-indigo-500/30 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
                            <Cpu className="h-20 w-20 text-indigo-400 animate-pulse" />
                            <div className="absolute -bottom-4 bg-indigo-600 px-6 py-2 rounded-full font-black text-xs">CERVEAU CENTRAL SIGHI</div>
                        </div>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            </div>
        </div>
    )
}
