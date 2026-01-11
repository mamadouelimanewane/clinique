"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2, Plus, ArrowRight, Save } from "lucide-react"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

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
            queryClient.invalidateQueries({ queryKey: ['ecritures-list'] }) // Refresh list
            form.reset({
                ...form.getValues(),
                libelle: "",
                montant: "",
                pieceRef: "",
            })
            toast.success("Écriture enregistrée", { description: "L'écriture a été ajoutée au journal." })
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
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Saisie d'écriture</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Journal */}
                            <FormField
                                control={form.control}
                                name="journalId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Journal</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un journal" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {refs?.journaux.map((j) => (
                                                    <SelectItem key={j.id} value={j.id}>
                                                        {j.code} - {j.libelle}
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
                                        <FormLabel>Date d'écriture</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Compte */}
                            <FormField
                                control={form.control}
                                name="compteId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Compte (Plan SYSCOA)</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un compte" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="max-h-[300px]">
                                                {refs?.comptes.map((c) => (
                                                    <SelectItem key={c.id} value={c.id}>
                                                        {c.numero} - {c.libelle}
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
                                        <FormLabel>Réf. Pièce (Optionnel)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: FAC-001" {...field} />
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
                                    <FormLabel>Libellé de l'écriture</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Achat fournitures bureau" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            {/* Montant */}
                            <FormField
                                control={form.control}
                                name="montant"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Montant (XOF)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0" {...field} />
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
                                        <FormLabel>Sens</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="DEBIT">DÉBIT</SelectItem>
                                                <SelectItem value="CREDIT">CRÉDIT</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Enregistrer l'écriture
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
