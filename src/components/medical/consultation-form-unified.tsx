"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section } from "lucide-react"
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
import { ArrowRightLeft, Stethoscope, UserCog, AlertCircle, CheckCircle2, FileText } from "lucide-react"
import { toast } from "sonner"
import { generateConsultationReport, uploadToGed } from "@/lib/ged-service"

const consultationSchema = z.object({
    motif: z.string().min(3),
    anamnese: z.string().optional(),
    examenClinique: z.string().optional(),
    diagnostic: z.string().optional(),
    specialite: z.string().default("GENERALISTE")
})

export function UnifiedConsultationForm({ specialist }: { specialist?: string }) {
    const [activeTab, setActiveTab] = useState("clinique")
    const form = useForm({
        resolver: zodResolver(consultationSchema) as any,
        defaultValues: {
            motif: "",
            specialite: specialist || "Generaliste",
            anamnese: "",
            examenClinique: "",
            diagnostic: ""
        }
    })

    const genererCR = async () => {
        const values = form.getValues()

        toast.promise(
            (async () => {
                const pdfBlob = await generateConsultationReport(values)
                const gedResult = await uploadToGed(pdfBlob, {
                    patientId: "P-882",
                    type: "CONSULTATION",
                    title: `Rapport Consultation ${new Date().toLocaleDateString()}`
                })

                // Ouvrir le PDF dans un nouvel onglet pour visualisation
                const url = URL.createObjectURL(pdfBlob)
                window.open(url, '_blank')

                return gedResult
            })(),
            {
                loading: 'Génération et archivage du compte-rendu...',
                success: 'Compte-rendu généré, archivé et ouvert !',
                error: 'Erreur lors de la génération',
            }
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                <h2 className="text-xl font-bold">Nouvelle Consultation : <span className="text-indigo-600">{specialist || "Médecine Générale"}</span></h2>
                <Button onClick={form.handleSubmit((v) => console.log(v))}>Sauvegarder le dossier</Button>
            </div>

            <Form {...form}>
                <form className="space-y-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="clinique">Examen Clinique</TabsTrigger>
                            <TabsTrigger value="specialise" className={!specialist ? "hidden" : ""}>
                                Module Spécialisé
                            </TabsTrigger>
                            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="clinique" className="space-y-6">
                            <Card>
                                <CardHeader><CardTitle className="text-sm uppercase text-muted-foreground">Motif & Anamnèse</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="motif"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Motif de consultation</FormLabel>
                                                <FormControl><Input placeholder="Ex: Fièvre, douleur..." {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="anamnese"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Antécédents & Histoire de la maladie</FormLabel>
                                                <FormControl><Textarea rows={4} {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader><CardTitle className="text-sm uppercase text-muted-foreground">Examen Physique & Diagnostic</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="examenClinique"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Observations cliniques</FormLabel>
                                                <FormControl><Textarea rows={4} {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="diagnostic"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Diagnostic Principal (CIM-10)</FormLabel>
                                                <FormControl><Input placeholder="Rechercher code ou libellé..." {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="specialise">
                            {specialist === "Cardiologie" && <CardioModule patientId="temp" />}
                            {specialist === "Dentaire" && <DentalModule />}
                            {specialist === "Gynecologie" && <GynecoModule />}
                            {specialist === "Pediatrie" && <PediatrieModule />}
                            {specialist === "Ophtalmologie" && <OphatmoModule />}
                            {specialist === "Nephrologie" && <NephroModule />}

                            {specialist === "Pneumologie" && <PneumoModule />}
                            {specialist === "Dermatologie" && <DermatoModule />}
                            {specialist === "Orthopedie" && <OrthoModule />}
                            {specialist === "ORL" && <OrlModule />}
                            {specialist === "Neurologie" && <NeuroModule />}
                            {specialist === "Gastro-Entérologie" && <GastroModule />}
                            {specialist === "Endocrinologie" && <EndoModule />}

                            {!specialist && (
                                <div className="p-12 text-center border-2 border-dashed rounded-xl bg-slate-50">
                                    <ArrowRightLeft className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-700">Orientation Spécialisée</h3>
                                    <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2">
                                        En tant que médecin généraliste, vous pouvez orienter le patient vers un spécialiste après l'examen clinique initial.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                                        {[
                                            "Cardiologie", "Dentaire", "Gynecologie", "Pediatrie", "Ophtalmologie",
                                            "Nephrologie", "Pneumologie", "Dermatologie", "Orthopedie", "ORL",
                                            "Neurologie", "Gastro-Entérologie", "Endocrinologie"
                                        ].map(s => (
                                            <Button
                                                key={s}
                                                variant="outline"
                                                size="sm"
                                                className="hover:border-indigo-500 hover:text-indigo-600"
                                                onClick={() => {
                                                    form.setValue("specialite", s)
                                                    toast.success(`Patient orienté vers : ${s}`)
                                                }}
                                            >
                                                Vers {s}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="prescriptions">
                            <Card>
                                <CardHeader><CardTitle>Ordonnance Numérique</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="p-10 border-2 border-dashed rounded-lg text-center text-muted-foreground">
                                        Zone de prescription médicamenteuse...
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={genererCR} className="text-slate-600">
                            <FileText className="h-4 w-4 mr-2" /> Compte-rendu
                        </Button>
                        <Button className="bg-slate-900 hover:bg-slate-800">
                            Enregistrer la consultation
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
