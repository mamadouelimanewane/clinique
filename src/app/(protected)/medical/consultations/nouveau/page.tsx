import { prisma } from "@/lib/prisma"
import { UnifiedConsultationForm } from "@/components/medical/consultation-form-unified"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function NewConsultationPage({
    searchParams,
}: {
    searchParams: SearchParams
}) {
    const { patientId } = await searchParams

    if (!patientId || typeof patientId !== 'string') {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <Alert variant="destructive" className="max-w-md">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Aucun patient sélectionné</AlertTitle>
                    <AlertDescription>
                        Veuillez d'abord sélectionner un patient depuis la liste pour démarrer une consultation.
                    </AlertDescription>
                </Alert>
                <Link href="/patients">
                    <Button>Aller à la liste des patients</Button>
                </Link>
            </div>
        )
    }

    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        select: { id: true, nom: true, prenom: true }
    })

    if (!patient) {
        return <div>Patient introuvable.</div>
    }

    return (
        <div className="space-y-6">
            <UnifiedConsultationForm
                patientId={patient.id}
                patientName={`${patient.prenom} ${patient.nom}`}
            />
        </div>
    )
}
