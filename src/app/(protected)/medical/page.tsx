import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, FileText, ClipboardList } from "lucide-react"

export default function MedicalDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Espace Médical</h2>
                <p className="text-muted-foreground">
                    Gestion des soins, dossiers patients et consultations.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/patients">
                    <Card className="hover:bg-slate-50 transition cursor-pointer h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Patients
                            </CardTitle>
                            <CardDescription>
                                Rechercher un dossier, créer un nouveau patient.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/medical/consultations">
                    <Card className="hover:bg-slate-50 transition cursor-pointer h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-emerald-600" />
                                Journal Consultations
                            </CardTitle>
                            <CardDescription>
                                Voir l'historique des consultations du jour.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Card className="hover:bg-slate-50 transition cursor-pointer h-full opacity-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-purple-600" />
                            Rendez-vous
                        </CardTitle>
                        <CardDescription>
                            Planning des consultations (Bientôt disponible).
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
