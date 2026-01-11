import { ConsultationsList } from "@/components/medical/consultations-list"

export default function ConsultationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Journal des Consultations</h2>
                <p className="text-muted-foreground">
                    Historique des actes médicaux et consultations du centre.
                </p>
            </div>
            <ConsultationsList />
        </div>
    )
}
