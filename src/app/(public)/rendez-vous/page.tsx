"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar as CalendarIcon, Clock, CheckCircle2, User, Phone, Mail, FileText, Loader2, Stethoscope, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useQuery, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const bookingSchema = z.object({
    specialite: z.string().min(1, "Veuillez choisir une spécialité"),
    medecinId: z.string().min(1, "Veuillez choisir un médecin"),
    date: z.date({ required_error: "Veuillez choisir une date" }),
    heure: z.string().min(1, "Veuillez choisir une heure"),
    nom: z.string().min(2, "Le nom est requis"),
    prenom: z.string().min(2, "Le prénom est requis"),
    telephone: z.string().min(9, "Téléphone invalide"),
    email: z.string().email("Email invalide").optional().or(z.literal('')),
    motif: z.string().optional(),
})

export default function BookingPage() {
    const [step, setStep] = useState(1)

    // Fetch doctors
    const { data: doctors } = useQuery({
        queryKey: ['public-doctors'],
        queryFn: async () => {
            const res = await fetch('/api/public/rendez-vous')
            if (!res.ok) return []
            return res.json()
        }
    })

    const form = useForm<z.infer<typeof bookingSchema>>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            hour: "09:00"
        }
    })

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            const dateTime = new Date(values.date)
            const [hours, minutes] = values.heure.split(':')
            dateTime.setHours(parseInt(hours), parseInt(minutes))

            const res = await fetch('/api/public/rendez-vous', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    date: dateTime.toISOString()
                })
            })
            if (!res.ok) throw new Error("Erreur reservation")
            return res.json()
        },
        onSuccess: () => {
            setStep(3)
            toast.success("Rendez-vous confirmé !")
        },
        onError: () => {
            toast.error("Erreur lors de la réservation. Veuillez réessayer.")
        }
    })

    const onSubmit = (values: z.infer<typeof bookingSchema>) => {
        mutation.mutate(values)
    }

    const availableSpecialties = Array.from(new Set(doctors?.map((d: any) => d.specialite) || []))
    const filteredDoctors = doctors?.filter((d: any) => !form.watch("specialite") || d.specialite === form.watch("specialite"))

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">Prendre Rendez-vous</h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Réservez votre consultation en quelques clics. Sélectionnez votre spécialité, votre médecin et l'horaire qui vous convient.
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                                step === s ? "bg-teal-600 text-white shadow-lg shadow-teal-200 scale-110" :
                                    step > s ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                            )}>
                                {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
                            </div>
                            {s < 3 && <div className={cn("h-1 w-12 mx-4 rounded-full", step > s ? "bg-emerald-500" : "bg-slate-100")} />}
                        </div>
                    ))}
                </div>
            </div>

            {step === 3 ? (
                <div className="bg-white rounded-[40px] p-12 text-center shadow-xl border border-slate-100 animate-in zoom-in-50 duration-500">
                    <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Réservation Confirmée !</h2>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                        Votre demande de rendez-vous a bien été enregistrée. Vous recevrez un SMS de confirmation dans quelques instants.
                    </p>
                    <Button onClick={() => window.location.reload()} className="h-14 px-8 rounded-2xl font-bold bg-slate-900 text-white">
                        Prendre un autre rendez-vous
                    </Button>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">

                            {/* STEP 1: Medical Info */}
                            <div className={cn("space-y-8 animate-in fade-in slide-in-from-left-8 duration-500", step !== 1 && "hidden")}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="specialite"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-bold flex items-center gap-2">
                                                    <Stethoscope className="h-5 w-5 text-teal-600" /> Spécialité
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-14 bg-slate-50 border-0 text-lg">
                                                            <SelectValue placeholder="Choisir une spécialité" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {availableSpecialties.map((s: string) => (
                                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="medecinId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-bold flex items-center gap-2">
                                                    <User className="h-5 w-5 text-teal-600" /> Médecin
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!form.watch("specialite")}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-14 bg-slate-50 border-0 text-lg">
                                                            <SelectValue placeholder="Choisir un médecin" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {filteredDoctors?.map((d: any) => (
                                                            <SelectItem key={d.id} value={d.id}>Dr. {d.prenom} {d.nom}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="text-lg font-bold flex items-center gap-2">
                                                    <CalendarIcon className="h-5 w-5 text-teal-600" /> Date souhaitée
                                                </FormLabel>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                                    initialFocus
                                                    className="rounded-xl border shadow-sm p-4 w-full flex justify-center bg-white pointer-events-auto"
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="heure"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-lg font-bold flex items-center gap-2">
                                                        <Clock className="h-5 w-5 text-teal-600" /> Horaire
                                                    </FormLabel>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
                                                            <div
                                                                key={time}
                                                                onClick={() => field.onChange(time)}
                                                                className={cn(
                                                                    "p-3 rounded-xl border-2 text-center cursor-pointer font-bold transition-all",
                                                                    field.value === time ? "border-teal-500 bg-teal-50 text-teal-700" : "border-slate-100 hover:border-slate-300"
                                                                )}
                                                            >
                                                                {time}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="motif"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-lg font-bold flex items-center gap-2">
                                                        <FileText className="h-5 w-5 text-teal-600" /> Motif (Optionnel)
                                                    </FormLabel>
                                                    <Textarea
                                                        placeholder="Brève description..."
                                                        className="resize-none bg-slate-50 border-0 min-h-[100px]"
                                                        {...field}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6 border-t">
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            const v = form.getValues();
                                            if (v.specialite && v.medecinId && v.date && v.heure) setStep(2)
                                            else toast.error("Veuillez remplir tous les champs obligatoires")
                                        }}
                                        className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg"
                                    >
                                        Suivant <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* STEP 2: Personal Info */}
                            <div className={cn("space-y-8 animate-in fade-in slide-in-from-right-8 duration-500", step !== 2 && "hidden")}>
                                <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-4 mb-8">
                                    <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                                        <CalendarIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-teal-900">Récapitulatif</h3>
                                        <p className="text-teal-700 text-sm">
                                            {form.watch("date") ? format(form.watch("date"), "d MMMM yyyy", { locale: fr }) : ""} à {form.watch("heure")}
                                            avec Dr le médecin sélectionné
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="prenom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold">Prénom</FormLabel>
                                                <FormControl><Input placeholder="Votre prénom" className="h-14 bg-slate-50 border-0" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="nom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold">Nom</FormLabel>
                                                <FormControl><Input placeholder="Votre nom" className="h-14 bg-slate-50 border-0" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="telephone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold">Téléphone</FormLabel>
                                                <FormControl><Input placeholder="Ex: 77 000 00 00" className="h-14 bg-slate-50 border-0" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold">Email (Optionnel)</FormLabel>
                                                <FormControl><Input placeholder="exemple@email.com" className="h-14 bg-slate-50 border-0" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-between pt-6 border-t">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                        className="h-14 px-8 rounded-2xl font-bold text-lg"
                                    >
                                        Retour
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="h-14 px-12 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg shadow-xl shadow-teal-200"
                                        disabled={mutation.isPending}
                                    >
                                        {mutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                        Confirmer le Rendez-vous
                                    </Button>
                                </div>
                            </div>

                        </form>
                    </Form>
                </div>
            )}
        </div>
    )
}
