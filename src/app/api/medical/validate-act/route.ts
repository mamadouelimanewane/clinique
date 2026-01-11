import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { patientId, specialite, montant } = await req.json()

        // 1. Création automatique d'une facture pour l'acte de spécialité
        const facture = await prisma.facture.create({
            data: {
                patientId,
                montantTotal: montant || 15000, // Tarif par défaut spécialité si non précisé
                statut: "EN_ATTENTE",
                lignes: {
                    create: {
                        libelle: `Consultation Spécialisée : ${specialite}`,
                        quantite: 1,
                        prixUnitaire: montant || 15000,
                        montantTotal: montant || 15000,
                    }
                }
            }
        })

        return NextResponse.json({ success: true, factureId: facture.id })
    } catch (error) {
        console.error("Erreur génération facture spécialité:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}
