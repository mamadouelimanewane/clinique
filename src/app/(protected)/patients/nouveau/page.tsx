import { PatientForm } from "@/components/patients/patient-form"

export default function NouveauPatientPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Nouveau Dossier Patient</h2>
                <p className="text-muted-foreground">
                    Remplissez les informations ci-dessous pour créer un nouveau dossier médical.
                </p>
            </div>
            <PatientForm />
        </div>
    )
}
