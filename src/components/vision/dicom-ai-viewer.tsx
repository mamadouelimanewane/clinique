"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scan, Eye, Activity, FileText, AlertCircle, Crosshair, Download } from "lucide-react"

export function DicomAiViewer() {
    const [scanning, setScanning] = useState(false)
    const [scanned, setScanned] = useState(false)

    const [aiReport, setAiReport] = useState<string | null>(null)

    const runAiScan = async () => {
        setScanning(true)
        try {
            const response = await fetch("/api/ai/vision", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imageUrl: "https://example.com/mock-mri.jpg", // En prod, l'URL du fichier uploadé
                    specialty: "Neurologie"
                })
            })

            const data = await response.json()
            setAiReport(data.analysis)
            setScanned(true)
        } catch (error) {
            console.error("Vision Error:", error)
        } finally {
            setScanning(false)
        }
    }

    return (
        <Card className="border-none shadow-2xl bg-slate-900 text-white overflow-hidden rounded-3xl">
            <CardHeader className="border-b border-slate-800 bg-slate-900/50">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <Scan className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black">Vision IA Multimodale</CardTitle>
                            <CardDescription className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Analyse DICOM Temps Réel</CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="border-indigo-500 text-indigo-400 font-bold text-[9px]">DICOM v3.0 AI-READY</Badge>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="aspect-square relative bg-black flex items-center justify-center group overflow-hidden">
                    {/* MRI Mock Image representation */}
                    <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 via-slate-800 to-black" />
                    <Activity className="h-48 w-48 text-slate-800 opacity-20" />

                    {scanning && (
                        <div className="absolute inset-0 bg-indigo-600/10 z-10">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-scan" />
                        </div>
                    )}

                    {scanned && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative h-24 w-24 border-2 border-red-500 rounded-full animate-pulse flex items-center justify-center">
                                <Crosshair className="h-6 w-6 text-red-500" />
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap shadow-lg">
                                    SUSPECTED LESION (85%)
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coupe Axiale T2</p>
                            <p className="text-xs font-medium">Patient: #8829-AF</p>
                        </div>
                        {!scanned ? (
                            <Button onClick={runAiScan} disabled={scanning} className="bg-indigo-600 hover:bg-indigo-700 h-8 text-[10px] font-black uppercase">
                                {scanning ? "Analyse Neuro-IA..." : "Scanner par IA"}
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8 text-[10px] bg-white/10 border-white/20"><FileText className="h-3 w-3 mr-1" /> Rapport IA</Button>
                                <Button variant="outline" size="sm" className="h-8 text-[10px] bg-white/10 border-white/20"><Download className="h-3 w-3 mr-1" /> Export DICOM</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-4 bg-slate-900 border-t border-slate-800">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">Biomarqueurs IA</h4>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>Volume cérébral</span>
                                    <span className="text-emerald-400">Normal</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <span>Déviance ligne méd.</span>
                                    <span className="text-slate-400">Néant</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">Status Rapport</h4>
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-3 w-3 text-orange-400" />
                                <span className="text-xs font-bold text-orange-400">Alerte Détection</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                        L'IA a identifié une zone d'hypersignal T2 de 12mm dans le lobe frontal gauche. Un pré-rapport radiologique a été généré pour validation par le radiologue.
                    </p>
                </div>
            </CardContent>

            <style jsx>{`
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 2s ease-in-out infinite;
                }
            `}</style>
        </Card>
    )
}
