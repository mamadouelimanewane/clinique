"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Loader2, Save, Thermometer, Activity, Weight, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const consultationSchema = z.object({
    patientId: z.string(),
    motif: z.string().min(1, "Le motif est requis"),
    interrogatoire: z.string().optional(),
    examenPhysique: z.string().optional(),
    diagnostic: z.string().optional(),
    constantes: z.object({
        tension: z.string().optional(),
        temperature: z.coerce.number().optional(),
        poids: z.coerce.number().optional(),
        pouls: z.coerce.number().optional(),
    }).optional(),
    actesIds: z.array(z.string()).optional(),
})

type Props = {
    patientId: string
    patientName: string
}

export function ConsultationForm({ patientId, patientName }: Props) {
    const router = useRouter()
    const queryClient = useQueryClient()

    // 1. Charger les actes disponibles
    const { data: actesRef } = useQuery({
        queryKey: ['actes-ref'],
        queryFn: async () => {
            const res = await fetch('/api/medical/actes')
            if (!res.ok) throw new Error('Erreur chargement actes')
            return res.json() as Promise<{ id: string; libelle: string; code: string }[]>
        }
    })

    const form = useForm<z.infer<typeof consultationSchema>>({
        resolver: zodResolver(consultationSchema),
        defaultValues: {
            patientId: patientId,
            actesIds: [],
            constantes: {
                temperature: 37,
            }
        },
    })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof consultationSchema>) => {
            const res = await fetch('/api/medical/consultations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            if (!res.ok) throw new Error('Erreur sauvegarde')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patient', patientId] })
            alert("Consultation enregistrée avec succès")
            router.push(`/patients/${patientId}`) // Retour au dossier patient
        },
        onError: () => {
            alert("Erreur lors de l'enregistrement")
        }
    })

    function onSubmit(values: z.infer<typeof consultationSchema>) {
        mutation.mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="flex items-center justify-between bg-slate-100 p-4 rounded-lg">
                    <div>
                        <h3 className="font-medium text-lg">Patient : {patientName}</h3>
                        <p className="text-sm text-muted-foreground bg-slate-200 inline-block px-2 py-0.5 rounded">ID: {patientId}</p>
                    </div>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" /> Terminer la consultation
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Colonne Gauche : Constantes & Actes */}
                    <div className="space-y-6">
                        <Card className="bg-blue-50/50">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-blue-600" /> Constantes Vitales
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="constantes.tension"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2"><Heart className="h-3 w-3" /> Tension Artérielle (mmHg)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="12/8" {...field} className="bg-white" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="constantes.temperature"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2"><Thermometer className="h-3 w-3" /> Température (°C)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" placeholder="37.5" {...field} className="bg-white" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="constantes.poids"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2"><Weight className="h-3 w-3" /> Poids (kg)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.5" placeholder="70" {...field} className="bg-white" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="constantes.pouls"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pouls (bpm)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="80" {...field} className="bg-white" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Actes Réalisés</CardTitle>
                                <CardDescription>Cochez les actes pour la facturation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="actesIds"
                                    render={() => (
                                        <FormItem>
                                            <div className="space-y-2">
                                                {actesRef?.map((acte) => (
                                                    <FormField
                                                        key={acte.id}
                                                        control={form.control}
                                                        name="actesIds"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={acte.id}
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(acte.id)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? field.onChange([...(field.value || []), acte.id])
                                                                                    : field.onChange(
                                                                                        field.value?.filter(
                                                                                            (value) => value !== acte.id
                                                                                        )
                                                                                    )
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal cursor-pointer">
                                                                        {acte.libelle} <span className="text-xs text-muted-foreground">({acte.code})</span>
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Colonne Principale : Observation */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Observation Médicale</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="motif"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-semibold">Motif de consultation *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Maux de tête persistants, fièvre..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="interrogatoire"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">Interrogatoire / Histoire de la maladie</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Détails des symptômes, durée, intensité, contexte..." className="min-h-[120px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="examenPhysique"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">Examen Physique</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Observations cliniques..." className="min-h-[120px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Separator className="my-4" />

                                <FormField
                                    control={form.control}
                                    name="diagnostic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-bold text-blue-700">Diagnostic Retenu</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Conclusion médicale..." className="min-h-[80px] border-blue-200" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    )
}
