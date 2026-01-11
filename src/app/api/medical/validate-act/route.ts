import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { patientId, specialite, montant } = await req.json()

        const prix = montant || 15000
        const dateNow = new Date()
        const dateEcheance = new Date(dateNow)
        dateEcheance.setDate(dateEcheance.getDate() + 30) // 30 jours échéance

        // Génération de numéro de facture (simplifié)
        const count = await prisma.facture.count()
        const numeroFacture = `FAC-${dateNow.getFullYear()}-${(count + 1).toString().padStart(4, '0')}`

        // 1. Création automatique d'une facture pour l'acte de spécialité
        const facture = await prisma.facture.create({
            data: {
                patientId,
                numeroFacture,
                dateEcheance,
                montantHT: prix,
                montantTTC: prix,
                partPatient: prix,
                partAssurance: 0,
                statut: "IMPAYEE",
                lignes: {
                    create: {
                        designation: `Consultation Spécialisée : ${specialite}`,
                        quantite: 1,
                        prixUnitaire: prix,
                        montant: prix,
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
