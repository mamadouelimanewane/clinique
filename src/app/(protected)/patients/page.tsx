import { PatientTable } from "@/components/patients/patient-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserPlus } from "lucide-react"

export default function PatientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
                    <p className="text-muted-foreground">
                        Gestion des dossiers patients et historique médical.
                    </p>
                </div>
                <Link href="/patients/nouveau">
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Nouveau Patient
                    </Button>
                </Link>
            </div>

            <PatientTable />
        </div>
    )
}
