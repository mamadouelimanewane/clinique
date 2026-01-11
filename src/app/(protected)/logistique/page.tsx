import { ArticleLogistiqueStock } from "@/components/logistique/stock-technique"

export default function LogistiqueStockPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Stocks Techniques</h2>
                <p className="text-muted-foreground">
                    Réactifs de laboratoire, consommables chirurgicaux et entretien.
                </p>
            </div>
            <ArticleLogistiqueStock />
        </div>
    )
}
