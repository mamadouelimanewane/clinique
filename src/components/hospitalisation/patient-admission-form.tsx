"use client"

import { useState } from "react"
import {
    User,
    Calendar,
    MapPin,
    FileText,
    Stethoscope,
    AlertCircle,
    CheckCircle2,
    Clock,
    Building2,
    Bed
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function PatientAdmissionForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        patientId: "",
        service: "",
        chambre: "",
        motif: "",
        diagnosticEntree: "",
        medecinResponsable: "",
        priorite: "NORMALE"
    })

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900">
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-indigo-600" />
                        Nouvelle Admission Hospitalière
                    </CardTitle>
                    <CardDescription>
                        Processus guidé d'admission en {step}/3 étapes
                    </CardDescription>

                    {/* Progress Bar */}
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`flex-1 h-2 rounded-full transition-all ${s <= step ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {step === 1 && (
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg">Étape 1: Identification du Patient</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <Label>Rechercher un Patient</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Nom, Prénom ou N° Patient..."
                                            className="flex-1"
                                        />
                                        <Button variant="outline">Rechercher</Button>
                                    </div>
                                </div>

                                {/* Patient Selected (Simulated) */}
                                <div className="col-span-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border-2 border-indigo-200">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <User className="h-8 w-8 text-indigo-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-lg">Amadou DIOP</div>
                                            <div className="text-sm text-muted-foreground">
                                                PAT-2026-0482 • 65 ans • Homme
                                            </div>
                                            <div className="flex gap-2 mt-1">
                                                <Badge variant="outline" className="text-xs">Diabétique</Badge>
                                                <Badge variant="outline" className="text-xs">HTA</Badge>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <Label>Motif d'Admission *</Label>
                                    <Textarea
                                        placeholder="Décrire brièvement le motif de l'hospitalisation..."
                                        className="min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Priorité</Label>
                                    <Select defaultValue="NORMALE">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NORMALE">Normale</SelectItem>
                                            <SelectItem value="URGENTE">Urgente</SelectItem>
                                            <SelectItem value="CRITIQUE">Critique</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Mode d'Entrée</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="URGENCES">Urgences</SelectItem>
                                            <SelectItem value="CONSULTATION">Consultation</SelectItem>
                                            <SelectItem value="TRANSFERT">Transfert</SelectItem>
                                            <SelectItem value="PROGRAMME">Programmé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg">Étape 2: Affectation du Lit</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Service *</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="medecine">Médecine Générale</SelectItem>
                                            <SelectItem value="chirurgie">Chirurgie</SelectItem>
                                            <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                                            <SelectItem value="maternite">Maternité</SelectItem>
                                            <SelectItem value="reanimation">Réanimation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Médecin Responsable *</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dr-sy">Dr. Sy (Cardiologue)</SelectItem>
                                            <SelectItem value="dr-diop">Dr. Diop (Interniste)</SelectItem>
                                            <SelectItem value="dr-sow">Dr. Sow (Chirurgien)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="col-span-2 space-y-3">
                                    <Label>Lits Disponibles</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["101", "102", "105", "108"].map((num) => (
                                            <Card
                                                key={num}
                                                className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-indigo-500"
                                            >
                                                <CardContent className="p-4 text-center">
                                                    <Bed className="h-6 w-6 mx-auto mb-2 text-emerald-500" />
                                                    <div className="font-bold">Chambre {num}</div>
                                                    <Badge variant="outline" className="mt-1 text-xs bg-emerald-50 text-emerald-700">
                                                        Disponible
                                                    </Badge>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg">Étape 3: Informations Médicales</h3>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label>Diagnostic d'Entrée *</Label>
                                    <Textarea
                                        placeholder="Diagnostic principal et diagnostics associés..."
                                        className="min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Antécédents Pertinents</Label>
                                    <Textarea
                                        placeholder="ATCD médicaux, chirurgicaux, allergies..."
                                        className="min-h-[80px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Traitement en Cours</Label>
                                    <Textarea
                                        placeholder="Médicaments actuels du patient..."
                                        className="min-h-[80px]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Régime Alimentaire</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="NORMAL">Normal</SelectItem>
                                                <SelectItem value="DIABETIQUE">Diabétique</SelectItem>
                                                <SelectItem value="SANS_SEL">Sans sel</SelectItem>
                                                <SelectItem value="LIQUIDE">Liquide</SelectItem>
                                                <SelectItem value="JEUN">À jeun</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Isolement</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Aucun" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="AUCUN">Aucun</SelectItem>
                                                <SelectItem value="CONTACT">Contact</SelectItem>
                                                <SelectItem value="GOUTTELETTES">Gouttelettes</SelectItem>
                                                <SelectItem value="AERIEN">Aérien</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-8 pt-6 border-t">
                        <Button
                            variant="outline"
                            onClick={() => setStep(Math.max(1, step - 1))}
                            disabled={step === 1}
                        >
                            Précédent
                        </Button>

                        {step < 3 ? (
                            <Button
                                onClick={() => setStep(step + 1)}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                Suivant
                            </Button>
                        ) : (
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Valider l'Admission
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
