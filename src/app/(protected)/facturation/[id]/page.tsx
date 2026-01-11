import { FactureView } from "@/components/facturation/facture-view"

type Props = {
    params: Promise<{ id: string }>
}

export default async function FacturePage({ params }: Props) {
    const { id } = await params
    return <FactureView id={id} />
}
