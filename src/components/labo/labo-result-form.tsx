"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { ShieldCheck, Sparkles, AlertTriangle, Fingerprint, Microscope, Activity, Loader2, Save } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const laboSchema = z.object({
    acteRealiseId: z.string(),
    valeurs: z.any().optional(),
    conclusion: z.string().optional(),
})

type Props = {
    acteRealiseId: string
    patientName: string
    onSuccess: () => void
}

export function LaboResultForm({ acteRealiseId, patientName, onSuccess }: Props) {
    const form = useForm<z.infer<typeof laboSchema>>({
        resolver: zodResolver(laboSchema),
        defaultValues: {
            acteRealiseId,
            conclusion: "",
        },
    })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof laboSchema>) => {
            const res = await fetch('/api/labo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            if (!res.ok) throw new Error('Erreur sauvegarde')
            return res.json()
        },
        onSuccess: () => {
            toast.success("Analyse validée avec succès", {
                description: `Les résultats pour ${patientName} ont été transmis au LIS.`,
                icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />
            })
            onSuccess()
        },
        onError: () => {
            toast.error("Échec de la validation", {
                description: "Veuillez vérifier la connexion avec l'automate.",
                icon: <AlertTriangle className="h-4 w-4 text-rose-500" />
            })
        }
    })

    function onSubmit(values: z.infer<typeof laboSchema>) {
        mutation.mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500">
                <div className="flex items-start justify-between bg-slate-50/80 p-6 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                            <Fingerprint className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identité Patient</p>
                            <h4 className="text-lg font-black text-slate-900 tracking-tighter uppercase">{patientName}</h4>
                        </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-tighter italic">
                        ISO 15189 Saisie
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Microscope className="h-4 w-4 text-emerald-600" />
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Valeurs Techniques (Automate)</h4>
                        </div>
                        <div className="p-8 border-none bg-slate-50 rounded-[32px] space-y-6 shadow-inner">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Résultat Mesuré</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Ex: 4.52"
                                        className="h-14 rounded-2xl border-none shadow-xl bg-white focus-visible:ring-emerald-600 text-lg font-black"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 uppercase tracking-widest">mmol/L</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white/50 rounded-xl border border-slate-100">
                                <Activity className="h-4 w-4 text-emerald-500" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase italic">Run ID: 2026-XQ-402</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Save className="h-4 w-4 text-indigo-600" />
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Expertise du Biologiste</h4>
                        </div>
                        <FormField
                            control={form.control}
                            name="conclusion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Saisir la conclusion biologique..."
                                            className="min-h-[160px] rounded-[32px] border-none bg-slate-50 shadow-inner p-6 focus-visible:ring-indigo-600 font-bold"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px] font-black" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-400" />
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Interprétation IA assistée disponible</p>
                    </div>
                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="h-14 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-emerald-500/20 transition-all active:scale-95"
                    >
                        {mutation.isPending ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-5 w-5" />
                        )}
                        Valider & Signer l'Analyse
                    </Button>
                </div>
            </form>
        </Form>
    )
}
