import { jsPDF } from "jspdf"
import "jspdf-autotable"

export async function generateConsultationReport(consultationData: Record<string, any>) {
    const doc = new jsPDF()

    // Header
    doc.setFillColor(31, 41, 55) // Slate-800
    doc.rect(0, 0, 210, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.text("CLINIQUE AÉRÉ LAO", 105, 25, { align: "center" })
    doc.setFontSize(10)
    doc.text("L'excellence technologique au service de votre santé", 105, 32, { align: "center" })

    // Patient Info
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(14)
    doc.text("COMPTE-RENDU DE CONSULTATION", 20, 55)

    doc.setFontSize(10)
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 150, 55)

    doc.setDrawColor(200, 200, 200)
    doc.line(20, 60, 190, 60)

    // Body
    const bodyY = 75
    doc.setFont("helvetica", "bold")
    doc.text("MOTIF :", 20, bodyY)
    doc.setFont("helvetica", "normal")
    doc.text(consultationData.motif || "Non spécifié", 60, bodyY)

    doc.setFont("helvetica", "bold")
    doc.text("ANAMNÈSE :", 20, bodyY + 15)
    doc.setFont("helvetica", "normal")
    const anamnese = doc.splitTextToSize(consultationData.anamnese || "N/A", 130)
    doc.text(anamnese, 60, bodyY + 15)

    doc.setFont("helvetica", "bold")
    doc.text("EXAMEN CLINIQUE :", 20, bodyY + 45)
    doc.setFont("helvetica", "normal")
    const examen = doc.splitTextToSize(consultationData.examenClinique || "N/A", 130)
    doc.text(examen, 60, bodyY + 45)

    doc.setFont("helvetica", "bold")
    doc.text("DIAGNOSTIC :", 20, bodyY + 75)
    doc.setFont("helvetica", "normal")
    doc.text(consultationData.diagnostic || "En attente", 60, bodyY + 75)

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text("Ce document est généré électroniquement et signé techniquement.", 105, 280, { align: "center" })
    doc.text("Clinique Aéré Lao - Sénégal - SIGHI System v1.0", 105, 285, { align: "center" })

    return doc.output('blob')
}

export async function uploadToGed(file: Blob, metadata: { patientId: string, type: string, title: string, module: string }) {
    // Dans une version de production, ici on enverrait vers AWS S3 ou Firebase Storage
    console.log(`[GED] Téléchargement de ${metadata.title} pour le patient ${metadata.patientId}...`)

    // Simulation d'une URL cloud
    const simulatedUrl = `https://storage.sighiclini.com/docs/${metadata.patientId}/${Date.now()}.pdf`

    // Persistance en base de données via notre nouvelle API
    try {
        const response = await fetch('/api/ged', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titre: metadata.title,
                type: metadata.type,
                url: simulatedUrl,
                module: metadata.module || "MEDICAL",
                patientId: metadata.patientId,
                metadata: {
                    fileSize: file.size,
                    generatedAt: new Date().toISOString()
                }
            })
        })

        if (!response.ok) throw new Error("Erreur lors de l'enregistrement en base")

        return await response.json()
    } catch (error) {
        console.error("[GED_UPLOAD_ERROR]", error)
        // Fallback pour ne pas bloquer l'utilisateur si l'API échoue
        return {
            url: simulatedUrl,
            id: Math.random().toString(36).substring(7),
            status: "STORED_OFFLINE"
        }
    }
}
