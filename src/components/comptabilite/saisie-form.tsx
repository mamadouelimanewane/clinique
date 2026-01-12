"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2, Plus, ArrowRight, Save, FileText, Calendar, Hash, Tag, DollarSign, ArrowUpCircle, ArrowDownCircle, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Schema de validation
const formSchema = z.object({
    journalId: z.string().min(1, "Le journal est requis"),
    compteId: z.string().min(1, "Le compte est requis"),
    dateEcriture: z.string(),
    libelle: z.string().min(3, "Le libellé doit contenir au moins 3 caractères"),
    montant: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Le montant doit être un nombre positif",
    }),
    sens: z.enum(["DEBIT", "CREDIT"]),
    pieceRef: z.string().optional(),
})

// Types pour les données de référence
type ReferenceData = {
    comptes: { id: string; numero: string; libelle: string }[]
    journaux: { id: string; code: string; libelle: string }[]
    exercice: { id: string; annee: number }
}

export function SaisieComptableForm() {
    const queryClient = useQueryClient()

    // 1. Récupération des données de référence
    const { data: refs, isLoading: isLoadingRefs } = useQuery<ReferenceData>({
        queryKey: ['compta-refs'],
        queryFn: async () => {
            const res = await fetch('/api/comptabilite/reference')
            if (!res.ok) throw new Error('Erreur chargement références')
            return res.json()
        }
    })

    // 2. Mutation pour sauvegarder l'écriture
    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const res = await fetch('/api/comptabilite/ecritures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    montant: Number(values.montant),
                    exerciceId: refs?.exercice.id
                }),
            })
            if (!res.ok) throw new Error('Erreur sauvegarde')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ecritures-list'] })
            form.reset({
                ...form.getValues(),
                libelle: "",
                montant: "",
                pieceRef: "",
            })
            toast.success("Écriture enregistrée", {
                description: "L'écriture a été ajoutée avec succès au journal OHADA.",
                className: "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold"
            })
        },
        onError: () => {
            toast.error("Erreur lors de l'enregistrement.")
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dateEcriture: format(new Date(), 'yyyy-MM-dd'),
            sens: "DEBIT",
            pieceRef: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!refs?.exercice) {
            toast.error("Aucun exercice comptable ouvert trouvé.")
            return
        }
        mutation.mutate(values)
    }

    if (isLoadingRefs) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[32px] shadow-xl border border-slate-50">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">Initialisation du Plan Comptable...</p>
            </div>
        )
    }

    return (
        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardHeader className="bg-slate-900 text-white p-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-black uppercase tracking-tighter italic">Saisie <span className="text-emerald-400">Comptable</span></CardTitle>
                        <CardDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                            {refs?.exercice ? `Exercice ${refs.exercice.annee}` : 'Aucun exercice actif'} • Normes SYSCOA
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Journal */}
                            <FormField
                                control={form.control}
                                name="journalId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <FileText className="h-3 w-3 text-emerald-500" /> Journal de destination
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-14 rounded-2xl border-none bg-slate-50 shadow-inner font-bold focus:ring-emerald-500 transition-all">
                                                    <SelectValue placeholder="Choisir un journal" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                                                {refs?.journaux.map((j) => (
                                                    <SelectItem key={j.id} value={j.id} className="font-bold py-3">
                                                        <span className="text-emerald-600 mr-2">[{j.code}]</span> {j.libelle}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date */}
                            <FormField
                                control={form.control}
                                name="dateEcriture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <Calendar className="h-3 w-3 text-emerald-500" /> Date d'opération
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} className="h-14 rounded-2xl border-none bg-slate-50 shadow-inner font-bold focus:ring-emerald-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Compte */}
                            <FormField
                                control={form.control}
                                name="compteId"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-1">
                                        <FormLabel className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <Hash className="h-3 w-3 text-emerald-500" /> Compte SYSCOA
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-14 rounded-2xl border-none bg-slate-50 shadow-inner font-bold focus:ring-emerald-500">
                                                    <SelectValue placeholder="Choisir un compte" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="max-h-[400px] rounded-2xl border-slate-100 shadow-2xl">
                                                {refs?.comptes.map((c) => (
                                                    <SelectItem key={c.id} value={c.id} className="font-bold py-3">
                                                        <span className="bg-slate-900 text-white px-2 py-0.5 rounded-lg text-[9px] mr-3">{c.numero}</span>
                                                        {c.libelle}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Pièce Référence */}
                            <FormField
                                control={form.control}
                                name="pieceRef"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <Save className="h-3 w-3 text-emerald-500" /> Référence Pièce
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="PCS-2026-0001" {...field} className="h-14 rounded-2xl border-none bg-slate-50 shadow-inner font-bold placeholder:text-slate-300 focus:ring-emerald-500 uppercase" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Libellé */}
                        <FormField
                            control={form.control}
                            name="libelle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <Tag className="h-3 w-3 text-emerald-500" /> Intitulé de l'écriture
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Description détaillée du mouvement..." {...field} className="h-14 rounded-2xl border-none bg-slate-50 shadow-inner font-bold focus:ring-emerald-500 placeholder:text-slate-300" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            {/* Montant */}
                            <FormField
                                control={form.control}
                                name="montant"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <DollarSign className="h-3 w-3 text-emerald-500" /> Valeur Numéraire (XOF)
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0" {...field} className="h-16 rounded-2xl border-none bg-emerald-50 shadow-inner font-black text-2xl text-emerald-700 focus:ring-emerald-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Sens (Débit/Crédit) */}
                            <FormField
                                control={form.control}
                                name="sens"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <ArrowRight className="h-3 w-3 text-emerald-500" /> Sens du Flux
                                        </FormLabel>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button
                                                type="button"
                                                variant={field.value === "DEBIT" ? "default" : "outline"}
                                                className={cn(
                                                    "h-16 rounded-2xl font-black uppercase tracking-widest transition-all",
                                                    field.value === "DEBIT" ? "bg-slate-900 shadow-xl" : "bg-slate-50 border-none text-slate-400"
                                                )}
                                                onClick={() => field.onChange("DEBIT")}
                                            >
                                                <ArrowUpCircle className={cn("mr-2 h-5 w-5", field.value === "DEBIT" ? "text-emerald-400" : "text-slate-300")} /> Débit
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={field.value === "CREDIT" ? "default" : "outline"}
                                                className={cn(
                                                    "h-16 rounded-2xl font-black uppercase tracking-widest transition-all",
                                                    field.value === "CREDIT" ? "bg-slate-900 shadow-xl" : "bg-slate-50 border-none text-slate-400"
                                                )}
                                                onClick={() => field.onChange("CREDIT")}
                                            >
                                                <ArrowDownCircle className={cn("mr-2 h-5 w-5", field.value === "CREDIT" ? "text-rose-400" : "text-slate-300")} /> Crédit
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-16 rounded-[24px] bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest shadow-2xl shadow-emerald-200 transition-all active:scale-95 group"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? (
                                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            ) : (
                                <Save className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                            )}
                            Valider l'écriture en base
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
