"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Zap, ShieldCheck, Activity, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const TEETH_TOP = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
const TEETH_BOTTOM = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

export function DentalModule({ initialData }: { initialData?: any }) {
    const [selectedTeeth, setSelectedTeeth] = useState<Record<number, string>>(initialData || {})

    const toggleTooth = (num: number) => {
        const newState = { ...selectedTeeth }
        if (newState[num] === "CARIE") newState[num] = "SOIGNE"
        else if (newState[num] === "SOIGNE") delete newState[num]
        else newState[num] = "CARIE"
        setSelectedTeeth(newState)
    }

    const Tooth = ({ num }: { num: number }) => (
        <div
            onClick={() => toggleTooth(num)}
            className={cn(
                "w-10 h-14 border-2 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-sm",
                selectedTeeth[num] === 'CARIE' ? "bg-red-50 border-red-500 shadow-red-100" :
                    selectedTeeth[num] === 'SOIGNE' ? "bg-indigo-50 border-indigo-500 shadow-indigo-100" :
                        "bg-white border-slate-100 hover:border-indigo-300 hover:shadow-lg"
            )}
        >
            <span className={cn(
                "text-[10px] font-black",
                selectedTeeth[num] === 'CARIE' ? "text-red-700" :
                    selectedTeeth[num] === 'SOIGNE' ? "text-indigo-700" :
                        "text-slate-400"
            )}>{num}</span>
            <div className={cn(
                "w-5 h-5 rounded-full mt-2 border-2",
                selectedTeeth[num] === 'CARIE' ? "bg-red-500 border-red-200 animate-pulse" :
                    selectedTeeth[num] === 'SOIGNE' ? "bg-indigo-500 border-indigo-200" :
                        "bg-slate-50 border-transparent"
            )} />
        </div>
    )

    return (
        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
            <CardHeader className="bg-slate-900 text-white p-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                            <Activity className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tighter">Odontogramme 3D Advance</CardTitle>
                            <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="h-3 w-3" /> Cartographie Dentaire Certifiée
                            </p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-10 space-y-12">
                <div className="space-y-12">
                    {/* Arc supérieur */}
                    <div className="flex justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
                        {TEETH_TOP.map(n => <Tooth key={n} num={n} />)}
                    </div>

                    <div className="relative flex items-center justify-center py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-slate-100 italic" /></div>
                        <Badge className="relative bg-slate-100 text-slate-400 border-none font-black text-[9px] px-6">LIGNE D'OCCLUSION</Badge>
                    </div>

                    {/* Arc inférieur */}
                    <div className="flex justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
                        {TEETH_BOTTOM.map(n => <Tooth key={n} num={n} />)}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-50">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded-lg shadow-lg shadow-red-200" />
                                <span className="text-[10px] font-black text-slate-500 uppercase">Lésion Carieuse</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-200" />
                                <span className="text-[10px] font-black text-slate-500 uppercase">Restauration / Soin</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-slate-100 rounded-lg border border-slate-200" />
                                <span className="text-[10px] font-black text-slate-500 uppercase">Sain / Intact</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl">
                            <Info className="h-4 w-4 text-indigo-600" />
                            <p className="text-[9px] text-indigo-600 font-bold uppercase">Cliquez sur une dent pour changer son statut</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
