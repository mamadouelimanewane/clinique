"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import {
    Activity,
    Thermometer,
    Weight,
    Heart,
    ArrowRightLeft,
    FileText,
    Save,
    Loader2
} from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// Import modules modules
import { CardioModule } from "./specialites/cardio-module"
import { DentalModule } from "./specialites/dental-module"
import { GynecoModule } from "./specialites/gyneco-module"
import { PediatrieModule } from "./specialites/pediatrie-module"
import { OphatmoModule } from "./specialites/ophtalmo-module"
import { NephroModule } from "./specialites/nephro-module"
import { DermatoModule } from "./specialites/dermato-module"
import { PneumoModule } from "./specialites/pneumo-module"
import { OrthoModule } from "./specialites/ortho-module"
import { OrlModule } from "./specialites/orl-module"
import { NeuroModule } from "./specialites/neuro-module"
import { GastroModule } from "./specialites/gastro-module"
import { EndoModule } from "./specialites/endo-module"

import { generateConsultationReport, uploadToGed } from "@/lib/ged-service"

const consultationSchema = z.object({
    patientId: z.string(),
    specialite: z.string().default("GENERALISTE"),
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
    specialist?: string
}

export function UnifiedConsultationForm({ patientId, patientName, specialist }: Props) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [activeTab, setActiveTab] = useState("clinique")

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
        resolver: zodResolver(consultationSchema) as any,
        defaultValues: {
            patientId: patientId,
            specialite: specialist || "Medecine Generale",
            motif: "",
            interrogatoire: "",
            examenPhysique: "",
            diagnostic: "",
            actesIds: [],
            constantes: {
                tension: "",
                temperature: 37,
                poids: 0,
                pouls: 0,
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
            toast.success("Consultation enregistrée avec succès")
            router.push(`/patients/${patientId}`) // Retour au dossier patient
        },
        onError: () => {
            toast.error("Erreur lors de l'enregistrement")
        }
    })

    function onSubmit(values: z.infer<typeof consultationSchema>) {
        mutation.mutate(values)
    }

    const genererCR = async () => {
        const values = form.getValues()
        toast.promise(
            (async () => {
                const pdfBlob = await generateConsultationReport(values)
                const gedResult = await uploadToGed(pdfBlob, {
                    patientId: patientId,
                    type: "CONSULTATION",
                    module: "CONSULTATION",
                    title: `Rapport Consultation ${new Date().toLocaleDateString()}`
                })
                const url = URL.createObjectURL(pdfBlob)
                window.open(url, '_blank')
                return gedResult
            })(),
            {
                loading: 'Génération...',
                success: 'Compte-rendu généré !',
                error: 'Erreur génération',
            }
        )
    }

    // Determine current specialist from form if not passed as prop
    const currentSpecialist = form.watch("specialite")

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">Nouvelle Consultation</h2>
                    <p className="text-sm font-medium text-slate-500">Patient : <span className="text-indigo-600 font-bold">{patientName}</span></p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={genererCR}>
                        <FileText className="h-4 w-4 mr-2" /> Aperçu Rapport
                    </Button>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={mutation.isPending}
                        className="bg-indigo-600 hover:bg-indigo-700"
                    >
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" /> Enregistrer le Dossier
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form className="space-y-6">

                    {/* Constantes Vitales Ribbon */}
                    <Card className="bg-slate-50 border-none shadow-inner">
                        <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <FormField
                                control={form.control}
                                name="constantes.tension"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <Heart className="h-3 w-3 text-rose-500" /> Tension
                                        </div>
                                        <div className="relative">
                                            <Input {...field} className="bg-white border-0 shadow-sm h-12 text-lg font-bold" placeholder="12/8" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">mmHg</span>
                                        </div>
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="constantes.temperature"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <Thermometer className="h-3 w-3 text-amber-500" /> Température
                                        </div>
                                        <div className="relative">
                                            <Input {...field} type="number" className="bg-white border-0 shadow-sm h-12 text-lg font-bold" placeholder="37.0" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">°C</span>
                                        </div>
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="constantes.poids"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <Weight className="h-3 w-3 text-indigo-500" /> Poids
                                        </div>
                                        <div className="relative">
                                            <Input {...field} type="number" className="bg-white border-0 shadow-sm h-12 text-lg font-bold" placeholder="70" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">kg</span>
                                        </div>
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="constantes.pouls"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <Activity className="h-3 w-3 text-emerald-500" /> Pouls
                                        </div>
                                        <div className="relative">
                                            <Input {...field} type="number" className="bg-white border-0 shadow-sm h-12 text-lg font-bold" placeholder="80" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">bpm</span>
                                        </div>
                                    </div>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="bg-white p-1 rounded-xl shadow-sm border h-auto flex-wrap mb-6">
                            <TabsTrigger value="clinique" className="rounded-lg h-10 px-6 font-bold">Examen Clinique</TabsTrigger>
                            <TabsTrigger value="specialise" className="rounded-lg h-10 px-6 font-bold data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                                {currentSpecialist && currentSpecialist !== "Medecine Generale" && currentSpecialist !== "GENERALISTE" ? `Module ${currentSpecialist}` : "Module Spécialisé"}
                            </TabsTrigger>
                            <TabsTrigger value="actes" className="rounded-lg h-10 px-6 font-bold">Actes & Facturation</TabsTrigger>
                        </TabsList>

                        <TabsContent value="clinique" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-black uppercase text-slate-400 tracking-widest">Interrogatoire</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="motif"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold text-slate-700">Motif de consultation *</FormLabel>
                                                    <FormControl><Input placeholder="Ex: Douleurs abdominales, Céphalées..." {...field} className="font-medium" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="interrogatoire"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold text-slate-700">Anamnèse & Histoire</FormLabel>
                                                    <FormControl><Textarea className="min-h-[150px] resize-none" placeholder="Histoire de la maladie, antécédents récents..." {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-black uppercase text-slate-400 tracking-widest">Examen & Diagnostic</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="examenPhysique"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold text-slate-700">Signes Physiques</FormLabel>
                                                    <FormControl><Textarea className="min-h-[150px] resize-none" placeholder="Observations cliniques..." {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="diagnostic"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-black text-indigo-600">Conclusion Diagnostique</FormLabel>
                                                    <FormControl><Input className="h-12 border-indigo-100 bg-indigo-50/50 text-indigo-900 font-medium" placeholder="Diagnostic retenu..." {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="specialise" className="min-h-[400px]">
                            {currentSpecialist === "Cardiologie" && <CardioModule patientId={patientId} />}
                            {currentSpecialist === "Dentaire" && <DentalModule />}
                            {currentSpecialist === "Gynecologie" && <GynecoModule />}
                            {currentSpecialist === "Pediatrie" && <PediatrieModule />}
                            {currentSpecialist === "Ophtalmologie" && <OphatmoModule />}
                            {currentSpecialist === "Nephrologie" && <NephroModule />}
                            {currentSpecialist === "Pneumologie" && <PneumoModule />}
                            {currentSpecialist === "Dermatologie" && <DermatoModule />}
                            {currentSpecialist === "Orthopedie" && <OrthoModule />}
                            {currentSpecialist === "ORL" && <OrlModule />}
                            {currentSpecialist === "Neurologie" && <NeuroModule />}
                            {currentSpecialist === "Gastro-Entérologie" && <GastroModule />}
                            {currentSpecialist === "Endocrinologie" && <EndoModule />}

                            {(!currentSpecialist || currentSpecialist === "Medecine Generale" || currentSpecialist === "GENERALISTE") && (
                                <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <ArrowRightLeft className="h-12 w-12 text-slate-300 mb-4" />
                                    <h3 className="text-lg font-black text-slate-700 mb-2">Orientation Spécialisée</h3>
                                    <p className="text-slate-500 text-center max-w-md mb-8">
                                        Activez un module de spécialité pour accéder aux formulaires spécifiques (Odontogramme, Score Cardiaque, etc.)
                                    </p>
                                    <div className="flex flex-wrap gap-3 justify-center max-w-3xl">
                                        {[
                                            "Cardiologie", "Dentaire", "Gynecologie", "Pediatrie", "Ophtalmologie",
                                            "Nephrologie", "Pneumologie", "Dermatologie", "Orthopedie", "ORL",
                                            "Neurologie", "Gastro-Entérologie", "Endocrinologie"
                                        ].map(s => (
                                            <Button
                                                key={s}
                                                type="button"
                                                variant="outline"
                                                className="font-bold border-slate-200 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
                                                onClick={() => {
                                                    form.setValue("specialite", s)
                                                    toast.success(`Module ${s} activé`)
                                                }}
                                            >
                                                {s}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="actes">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Codification des Actes</CardTitle>
                                    <CardDescription>Sélectionnez les actes réalisés pour la facturation</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="actesIds"
                                        render={() => (
                                            <FormItem>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {actesRef?.map((acte) => (
                                                        <FormField
                                                            key={acte.id}
                                                            control={form.control}
                                                            name="actesIds"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={acte.id}
                                                                        className="flex flex-row items-center space-x-3 space-y-0 p-3 rounded-lg border hover:bg-slate-50 cursor-pointer"
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
                                                                        <FormLabel className="font-medium cursor-pointer flex-1">
                                                                            {acte.libelle}
                                                                            <span className="block text-xs text-slate-400 font-mono mt-0.5">{acte.code}</span>
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
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>
        </div>
    )
}
