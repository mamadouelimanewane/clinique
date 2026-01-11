import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ArchivesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Archives Médicales</h2>
                <p className="text-muted-foreground">
                    Historique des dossiers physiques et numérisés.
                </p>
            </div>

            <div className="flex justify-center mt-10">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5" /> Rechercher dans les Archives
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input placeholder="Nom du patient, N° Cote, Année..." className="text-lg h-12" />
                        </div>
                        <div className="bg-slate-50 p-8 text-center text-muted-foreground rounded-lg border border-dashed">
                            Entrez un critère de recherche pour localiser un dossier archivé.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
