import { SaisieComptableForm } from "@/components/comptabilite/saisie-form"
import { EcrituresList } from "@/components/comptabilite/ecritures-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SaisieComptablePage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Saisie Comptable</h2>
                <p className="text-muted-foreground">
                    Enregistrement des écritures dans les journaux comptables (OHADA).
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-1">
                    <SaisieComptableForm />
                </div>

                <div className="md:col-span-1">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Dernières écritures</CardTitle>
                            <CardDescription>
                                Historique des 10 derniers mouvements saisis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EcrituresList />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
