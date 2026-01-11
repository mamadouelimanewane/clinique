"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const patientValidationSchema = z.object({
    nom: z.string().min(2, "Le nom est requis"),
    prenom: z.string().min(2, "Le prénom est requis"),
    dateNaissance: z.string().min(1, "La date de naissance est requise"),
    sexe: z.enum(["M", "F"]),
    telephone: z.string().min(5, "Le téléphone est requis"),
    email: z.string().email().optional().or(z.literal('')),
    adresse: z.string().optional(),
    ville: z.string().optional(),
    profession: z.string().optional(),
    situationMatrimoniale: z.enum(["CELIBATAIRE", "MARIE", "DIVORCE", "VEUF"]),
    assureur: z.string().optional(),
    numeroAssure: z.string().optional(),
    tauxCouverture: z.coerce.number().min(0).max(100).optional(),
})

export function PatientForm() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof patientValidationSchema>>({
        resolver: zodResolver(patientValidationSchema) as any,
        defaultValues: {
            prenom: "",
            nom: "",
            dateNaissance: "",
            sexe: "M",
            telephone: "",
            email: "",
            adresse: "",
            situationMatrimoniale: "CELIBATAIRE",
            profession: "",
            assureur: "",
            numeroAssure: "",
            tauxCouverture: 0,
            ville: "Dakar",
        },
    })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof patientValidationSchema>) => {
            const res = await fetch('/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            if (!res.ok) throw new Error('Erreur sauvegarde')
            return res.json()
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['patients-list'] })
            toast.success("Patient créé avec succès")
            router.push(`/patients/${data.id}`)
        },
        onError: () => {
            toast.error("Erreur lors de la création")
        }
    })

    function onSubmit(values: z.infer<typeof patientValidationSchema>) {
        mutation.mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <Card>
                    <CardHeader>
                        <CardTitle>État Civil</CardTitle>
                        <CardDescription>Informations d'identité du patient</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="prenom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Moussa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Diop" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dateNaissance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de Naissance *</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sexe"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sexe</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="M">Masculin</SelectItem>
                                            <SelectItem value="F">Féminin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="situationMatrimoniale"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Situation Matrimoniale</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="CELIBATAIRE">Célibataire</SelectItem>
                                            <SelectItem value="MARIE">Marié(e)</SelectItem>
                                            <SelectItem value="DIVORCE">Divorcé(e)</SelectItem>
                                            <SelectItem value="VEUF">Veuf/Veuve</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="profession"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profession</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enseignant" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Coordonnées</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="telephone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Téléphone *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+221 77..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@exemple.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="adresse"
                            render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                    <FormLabel>Adresse</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Adresse complète" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ville"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ville</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dakar" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Assurance & Prise en charge</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="assureur"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assureur / Mutuelle</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: AXA, IPM..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tauxCouverture"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Taux de couverture (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} max={100} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="numeroAssure"
                            render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                    <FormLabel>Numéro d'assuré / Matricule</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Numéro sur la carte" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Créer le dossier patient
                    </Button>
                </div>
            </form>
        </Form>
    )
}
