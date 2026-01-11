import { AccueilDashboard } from "@/components/accueil/dashboard"

export default function AccueilPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Espace Accueil</h2>
                <p className="text-muted-foreground">
                    Gestion des arrivées patients et de la file d'attente.
                </p>
            </div>
            <AccueilDashboard />
        </div>
    )
}
