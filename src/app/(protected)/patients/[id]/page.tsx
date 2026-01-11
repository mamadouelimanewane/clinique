import { PatientDetailView } from "@/components/patients/patient-detail-view"

type Props = {
    params: Promise<{ id: string }>
}

export default async function PatientPage({ params }: Props) {
    const resolvedParams = await params
    return <PatientDetailView id={resolvedParams.id} />
}
