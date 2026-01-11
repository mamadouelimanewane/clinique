import { jsPDF } from "jspdf"
import fs from "fs"
import path from "path"

async function generateAdminGuides() {
    console.log("Démarrage de la génération des guides Admin et Technique...")

    // --- GUIDE 1: ADMINISTRATION DE L'APPLICATION ---
    const adminDoc = new jsPDF()
    const primaryColor = [15, 23, 42] // Slate 900
    const adminAccent = [124, 58, 237] // Violet 600

    // Couverture Admin
    adminDoc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    adminDoc.rect(0, 0, 210, 297, "F")
    adminDoc.setTextColor(255, 255, 255)
    adminDoc.setFont("helvetica", "bold")
    adminDoc.setFontSize(30)
    adminDoc.text("GUIDE D'ADMINISTRATION", 20, 100)
    adminDoc.text("SYSTÈME SIGHI 2026", 20, 115)
    adminDoc.setFontSize(14)
    adminDoc.setTextColor(adminAccent[0], adminAccent[1], adminAccent[2])
    adminDoc.text("Gestion des accès, configurations & monitoring financier", 20, 130)

    const addAdminHeader = (title: string, page: number) => {
        adminDoc.addPage()
        adminDoc.setFillColor(248, 250, 252)
        adminDoc.rect(0, 0, 210, 20, "F")
        adminDoc.setFont("helvetica", "bold")
        adminDoc.setFontSize(10)
        adminDoc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        adminDoc.text(title.toUpperCase(), 15, 13)
        adminDoc.text(`${page} / 10`, 185, 13)
    }

    // Contenu Admin
    addAdminHeader("Chapitre 1 : Gestion des Utilisateurs", 2)
    let y = 40
    adminDoc.setFontSize(12)
    adminDoc.text("1.1 Création et Rôles RBAC", 15, y)
    y += 10
    adminDoc.setFont("helvetica", "normal")
    adminDoc.setFontSize(10)
    const adminLines = [
        "• Accès : Paramètres > RH > Gestion des Utilisateurs.",
        "• Rôles prédéfinis : Administrateur Master, Praticien, Infirmier, Comptable, Réceptionniste.",
        "• Sécurité : Chaque utilisateur doit avoir la Double Authentification (2FA) activée pour les accès hors clinique.",
        "• Audit Trail : Toutes les connexions et modifications sont loguées dans 'Dashboard Admin > Security Logs'."
    ]
    adminLines.forEach(l => { adminDoc.text(l, 15, y); y += 7 })

    addAdminHeader("Chapitre 2 : Configuration Financière", 3)
    y = 40
    adminDoc.setFont("helvetica", "bold")
    adminDoc.text("2.1 Paramétrage des passerelles de paiement", 15, y)
    y += 10
    adminDoc.setFont("helvetica", "normal")
    const financeLines = [
        "• Configuration : Paramètres > Finance > Gateways.",
        "• API Keys : Gestion des clés secrètes pour Wave et Orange Money (Production vs Sandbox).",
        "• Swift/IBAN : Mise à jour des coordonnées bancaires pour les virements internationaux (Swift BOA).",
        "• Taxes : Paramétrage du taux de TVA national et des exonérations conventionnées."
    ]
    financeLines.forEach(l => { adminDoc.text(l, 15, y); y += 7 })

    // Sauvegarde Admin
    fs.writeFileSync(path.join(process.cwd(), "guide_administration_sighi.pdf"), Buffer.from(adminDoc.output("arraybuffer")))

    // --- GUIDE 2: ARCHITECTURE & TECHNIQUE ---
    const techDoc = new jsPDF()
    const techAccent = [5, 150, 105] // Emerald 600

    // Couverture Tech
    techDoc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    techDoc.rect(0, 0, 210, 297, "F")
    techDoc.setTextColor(255, 255, 255)
    techDoc.setFont("helvetica", "bold")
    techDoc.setFontSize(30)
    techDoc.text("MANUEL TECHNIQUE &", 20, 100)
    techDoc.text("ARCHITECTURE SYSTEME", 20, 115)
    techDoc.setFontSize(14)
    techDoc.setTextColor(techAccent[0], techAccent[1], techAccent[2])
    techDoc.text("Stack Technologique, Schémas Data & Sécurité", 20, 130)

    const addTechHeader = (title: string, page: number) => {
        techDoc.addPage()
        techDoc.setFillColor(248, 250, 252)
        techDoc.rect(0, 0, 210, 20, "F")
        techDoc.setFont("helvetica", "bold")
        techDoc.setFontSize(10)
        techDoc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        techDoc.text(title.toUpperCase(), 15, 13)
        techDoc.text(`${page} / 12`, 185, 13)
    }

    // Contenu Tech
    addTechHeader("Chapitre 1 : Stack Technologique", 2)
    y = 40
    techDoc.setFontSize(12)
    techDoc.text("1.1 Frontend & Logic Bridge", 15, y)
    y += 10
    techDoc.setFont("helvetica", "normal")
    techDoc.setFontSize(10)
    const techLines = [
        "• Framework : Next.js 16+ (App Router) avec React 19.",
        "• Langage : TypeScript pour un typage statique rigoureux.",
        "• UI : Tailwind CSS + Radix UI (Shadcn) pour des composants accessibles.",
        "• State Management : Zustand pour la légèreté et la réactivité.",
        "• Icons : Lucide React (Standard 2026)."
    ]
    techLines.forEach(l => { techDoc.text(l, 15, y); y += 7 })

    addTechHeader("Chapitre 2 : Backend & Base de Données", 3)
    y = 40
    techDoc.setFont("helvetica", "bold")
    techDoc.text("2.1 Persistance & API Services", 15, y)
    y += 10
    techDoc.setFont("helvetica", "normal")
    const backLines = [
        "• ORM : Prisma pour la communication avec la base de données.",
        "• Database : SQLite (Local) ou PostgreSQL (Cloud Production).",
        "• Auth : Next-Auth v5 avec adaptateur Prisma (JWT crypté).",
        "• API Architecture : REST & Server Actions pour une sécurité optimale.",
        "• IA Engine : Intégration OpenAI (GPT-4o) et Computer Vision (Dicom analysis)."
    ]
    backLines.forEach(l => { techDoc.text(l, 15, y); y += 7 })

    addTechHeader("Chapitre 3 : Schéma d'Architecture", 4)
    y = 40
    techDoc.setFont("helvetica", "bold")
    techDoc.text("3.1 Flux de Données Patient", 15, y)
    y += 10
    techDoc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    techDoc.rect(20, y, 170, 80)
    techDoc.setFontSize(8)
    techDoc.text("[ BROWSER: Next.js Client ] ---> [ SERVER: Next.js API/Actions ] ---> [ DB: Prisma Layer ]", 105, y + 20, { align: "center" })
    techDoc.text("                                     |                                 |", 105, y + 30, { align: "center" })
    techDoc.text("                                     v                                 v", 105, y + 40, { align: "center" })
    techDoc.text("                           [ AI SERVICES: Dicom/NLP ]        [ CLOUD STORAGE: AES-256 ]", 105, y + 50, { align: "center" })

    // Sauvegarde Tech
    fs.writeFileSync(path.join(process.cwd(), "manuel_technique_architecture.pdf"), Buffer.from(techDoc.output("arraybuffer")))

    console.log("Génération des guides Admin et Technique réussie.")
}

generateAdminGuides()
