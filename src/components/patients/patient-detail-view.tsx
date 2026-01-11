"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Phone, Mail, MapPin, User, Calendar, Activity, FileText, AlertTriangle, Syringe, FlaskConical } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function PatientDetailView({ id }: { id: string }) {
    const router = useRouter()

    const { data: patient, isLoading } = useQuery({
        queryKey: ['patient', id],
        queryFn: async () => {
            const res = await fetch(`/api/patients/${id}`)
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json()
        }
    })

    if (isLoading) {
        return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    if (!patient) {
        return <div className="text-center">Patient introuvable</div>
    }

    const age = new Date().getFullYear() - new Date(patient.dateNaissance).getFullYear()

    return (
        <div className="space-y-6">
            {/* Header du dossier */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
                        <AvatarFallback className="text-2xl bg-slate-100 text-slate-700">
                            {patient.prenom[0]}{patient.nom[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{patient.prenom} {patient.nom.toUpperCase()}</h1>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-muted-foreground">
                            <Badge variant="outline" className="font-mono">{patient.numeroPatient}</Badge>
                            <span>•</span>
                            <span>{age} ans ({format(new Date(patient.dateNaissance), 'dd/MM/yyyy')})</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {patient.ville || "N/A"}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Modifier</Button>
                    <Button onClick={() => router.push(`/medical/consultations/nouveau?patientId=${patient.id}`)}>Nouvelle Consultation</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="text-lg">Informations</CardTitle></CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> <span>{patient.telephone}</span></div>
                            {patient.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> <span>{patient.email}</span></div>}
                            <Separator />
                            <div><span className="text-muted-foreground block mb-1 text-xs uppercase">Profession</span><span className="font-medium">{patient.profession || "Non renseigné"}</span></div>
                            <div><span className="text-muted-foreground block mb-1 text-xs uppercase">Assurance</span><div className="flex justify-between items-center"><span className="font-medium">{patient.assureur || "Aucune"}</span>{patient.tauxCouverture && <Badge>{patient.tauxCouverture}%</Badge>}</div></div>
                        </CardContent>
                    </Card>

                    <Card className="border-red-100 bg-red-50/10">
                        <CardHeader><CardTitle className="text-lg text-red-700 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Allergies</CardTitle></CardHeader>
                        <CardContent>
                            {patient.allergies?.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">{patient.allergies.map((a: any) => (<li key={a.id} className="font-medium text-red-800 text-sm">{a.substance} ({a.severite})</li>))}</ul>
                            ) : <p className="text-muted-foreground text-sm">Aucune allergie connue.</p>}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Tabs defaultValue="resume" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="resume">Résumé</TabsTrigger>
                            <TabsTrigger value="consultations">Consultations</TabsTrigger>
                            <TabsTrigger value="examens">Examens</TabsTrigger>
                            <TabsTrigger value="historique">Historique</TabsTrigger>
                        </TabsList>

                        <TabsContent value="resume" className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Groupe Sanguin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{patient.groupeSanguin || "N/A"}</div></CardContent></Card>
                                <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Dernière Constante</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12/8 BP</div></CardContent></Card>
                            </div>
                            <Card>
                                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Calendar className="h-5 w-5 text-blue-600" /> Prochains Rendez-vous</CardTitle></CardHeader>
                                <CardContent>
                                    {patient.rendezVous?.length > 0 ? (
                                        <div className="space-y-4">{patient.rendezVous.map((rdv: any) => (<div key={rdv.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"><div><p className="font-medium">{format(new Date(rdv.dateHeure), "d MMMM à HH:mm", { locale: fr })}</p><p className="text-xs text-muted-foreground">{rdv.type}</p></div><Badge variant="outline">{rdv.statut}</Badge></div>))}</div>
                                    ) : <p className="text-muted-foreground text-sm py-4 text-center italic">Aucun RDV prévu.</p>}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="consultations" className="mt-4">
                            <Card>
                                <CardHeader><CardTitle>Historique Clinique</CardTitle></CardHeader>
                                <CardContent>
                                    {patient.consultations?.length > 0 ? (
                                        <div className="space-y-6">{patient.consultations.map((cons: any) => (<div key={cons.id} className="flex gap-4 border-b last:border-0 pb-4"><div className="flex-1"><p className="font-bold text-lg">{format(new Date(cons.dateConsultation), "dd MMMM yyyy", { locale: fr })}</p><p className="text-sm text-blue-600 font-medium mb-2">Dr. {cons.medecin?.prenom} {cons.medecin?.nom}</p><p className="text-sm bg-slate-50 p-3 rounded"><strong>Motif:</strong> {cons.motifConsultation}</p></div></div>))}</div>
                                    ) : <div className="text-center py-8 text-muted-foreground"><FileText className="h-12 w-12 mx-auto mb-2 opacity-10" /><p>Aucune consultation.</p></div>}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="examens" className="mt-4">
                            <Card>
                                <CardHeader><CardTitle>Résultats Paracliniques</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {patient.consultations?.flatMap((c: any) => c.actesRealises || [])
                                            .filter((a: any) => a.acte.specialite === 'LABORATOIRE' || a.acte.specialite === 'RADIOLOGIE')
                                            .length > 0 ? (
                                            patient.consultations.flatMap((c: any) => c.actesRealises)
                                                .filter((a: any) => a.acte.specialite === 'LABORATOIRE' || a.acte.specialite === 'RADIOLOGIE')
                                                .map((acte: any) => (
                                                    <div key={acte.id} className="border p-4 rounded-lg flex justify-between items-center group hover:bg-slate-50 transition">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Badge variant="outline" className="text-[10px]">{acte.acte.specialite}</Badge>
                                                                {acte.resultat && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                                                            </div>
                                                            <h4 className="font-bold text-slate-800">{acte.acte.libelle}</h4>
                                                            <p className="text-xs text-muted-foreground">{format(new Date(acte.createdAt), "dd/MM/yyyy HH:mm")}</p>
                                                            {acte.resultat && (
                                                                <div className="mt-2 text-sm text-indigo-700 bg-indigo-50 p-2 rounded border border-indigo-100 italic">
                                                                    {acte.resultat.conclusion}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <Badge variant={acte.resultat ? "default" : "secondary"}>{acte.resultat ? "Validé" : "En attente"}</Badge>
                                                            {!acte.resultat && <p className="text-[10px] text-muted-foreground mt-1 italic">Analyse en cours...</p>}
                                                        </div>
                                                    </div>
                                                ))
                                        ) : <div className="text-center py-12 text-muted-foreground"><FlaskConical className="h-12 w-12 mx-auto mb-2 opacity-10" /><p>Aucun examen de laboratoire ou d'imagerie.</p></div>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="historique" className="mt-4">
                            <Card>
                                <CardHeader><CardTitle>Antécédents & Terrain</CardTitle></CardHeader>
                                <CardContent className="space-y-6">
                                    <div><h4 className="font-medium mb-3 flex items-center gap-2 text-orange-600"><Activity className="h-4 w-4" /> Médicaux</h4>
                                        {patient.antecedents?.length > 0 ? (<ul className="grid grid-cols-2 gap-2 text-sm">{patient.antecedents.map((a: any) => (<li key={a.id} className="bg-slate-50 p-2 rounded flex justify-between"><span>{a.libelle}</span><span className="text-xs text-muted-foreground">{a.type}</span></li>))}</ul>) : <p className="text-sm text-muted-foreground italic">Aucun antécédent.</p>}</div>
                                    <Separator />
                                    <div><h4 className="font-medium mb-3 flex items-center gap-2 text-emerald-600"><Syringe className="h-4 w-4" /> Vaccinations</h4><p className="text-sm text-muted-foreground italic">Non renseigné.</p></div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

function CheckCircle(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
}
