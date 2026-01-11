import { jsPDF } from "jspdf"
import fs from "fs"
import path from "path"

async function generateManual() {
    console.log("Démarrage de la génération du manuel SIGHI...")

    const doc = new jsPDF()
    const primaryColor = [79, 70, 229] // Indigo
    const darkColor = [15, 23, 42] // Slate 900
    const emeraldColor = [5, 150, 105] // Emerald

    // --- PAGE 1: COUVERTURE ---
    doc.setFillColor(darkColor[0], darkColor[1], darkColor[2])
    doc.rect(0, 0, 210, 297, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(36)
    doc.text("LA BIBLE SIGHI :", 20, 100)
    doc.text("GUIDE D'UTILISATION", 20, 115)
    doc.text("INTÉGRAL (VERSION", 20, 130)
    doc.text("ULTRA-DÉTAILLÉE)", 20, 145)

    doc.setDrawColor(245, 158, 11) // Amber 500
    doc.setLineWidth(2)
    doc.line(70, 160, 140, 160)

    doc.setFontSize(14)
    doc.setTextColor(245, 158, 11)
    doc.text("Documentation Officielle SIGHI Cloud Master 2026", 105, 180, { align: "center" })

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.text("Clinique Dentaire Aere Lao", 105, 240, { align: "center" })
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text("Version Industrielle - Manuel Complet", 105, 250, { align: "center" })

    // --- FONCTIONS UTILITAIRES ---
    let y = 30
    const addHeader = (title: string, page: number) => {
        doc.addPage()
        doc.setFont("helvetica", "normal")
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text("La Bible SIGHI : Guide d'Utilisation Intégral (Version Ultra-Détaillée)", 15, 15)
        doc.text("SIGHI CLOUD ERP", 170, 15)
        doc.setDrawColor(150, 150, 150)
        doc.setLineWidth(0.2)
        doc.line(15, 18, 195, 18)

        doc.setFont("helvetica", "bold")
        doc.setFontSize(22)
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.text(title, 15, 35)

        doc.setFontSize(8)
        doc.text("Clinique Aere Lao - L'excellence au service de la Santé", 105, 285, { align: "center" })
        doc.text(`${page} / 12`, 185, 285)
        y = 50
    }

    const addSection = (title: string, content: string[]) => {
        if (y > 250) {
            // New page logic simplified
        }
        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2])
        doc.text(title, 15, y)
        y += 10
        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.setTextColor(50, 50, 50)
        content.forEach(line => {
            const splitLines = doc.splitTextToSize(line, 175)
            doc.text(splitLines, 15, y)
            y += splitLines.length * 6
        })
        y += 5
    }

    // --- CHAPITRE 1: TABLEAU DE BORD ---
    addHeader("## CHAPITRE 1 : CENTRE DE COMMANDEMENT", 2)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    doc.text("Le Centre de Commandement est le cœur décisionnel de la clinique, offrant une vision 360° en temps réel.", 15, 45)

    y = 60
    addSection("1.1 Dashboards & KPIs", [
        "• Chiffre d'Affaires Live : Affiche les encaissements du jour et les projections mensuelles basées sur l'activité réelle.",
        "• Taux d'Occupation : Visualisation spatiale des lits disponibles et occupés en Hospitalisation.",
        "• Alertes Système : Notifications critiques concernant la maintenance des équipements ou les stocks bas.",
        "• Satisfaction Patient : Score NPS calculé automatiquement après chaque consultation via les retours patients."
    ])

    addSection("1.2 Actions Importantes", [
        "• Générer Rapport CA : Permet d'exporter sous format PDF/Excel les performances financières pour le conseil.",
        "• Vision 2030 : Accès direct aux modules d'intelligence prédictive de croissance.",
        "• Simulation de Scénarios : Outil IA pour simuler l'impact d'une nouvelle extension de service."
    ])

    // --- CHAPITRE 2: DOSSIER MEDICAL ---
    addHeader("## CHAPITRE 2 : MEDICAL & CLINIQUE", 3)
    addSection("2.1 Smart Dossier Patient", [
        "• Centralisation Totale : Accès immédiat aux antécédents, allergies, et résultats de laboratoire.",
        "• Smart Prescription IA : Aide à la décision médicale avec vérification automatique des interactions médicamenteuses.",
        "• Dictée Vocale : Intégration de la reconnaissance vocale médicale pour une saisie ultra-rapide des comptes-rendus.",
        "• Biomarqueurs : Analyse IA des constantes pour détecter les signaux faibles de dégradation."
    ])

    addSection("2.2 Hospitalisation & Bloc", [
        "• Gestion des Mouvements : Suivi des entrées, transferts et sorties (Discharge) avec coordination logistique.",
        "• Plan de Soins Infirmiers : Interface tactile pour la validation des soins et administration des traitements.",
        "• Suivi Post-Opératoire : Module spécifique pour la surveillance intensive post-chirurgicale."
    ])

    // --- CHAPITRE 3: PLATEAU TECHNIQUE ---
    addHeader("## CHAPITRE 3 : LABO & IMAGERIE", 4)
    addSection("3.1 Laboratoire Central", [
        "• Connexion Automates : Récupération bidirectionnelle des résultats via les protocoles HL7/ASTM.",
        "• Alertes de Panic : Notification instantanée sur le mobile du prescripteur en cas de résultat critique.",
        "• Traçabilité des Prélèvements : Utilisation de codes-barres pour chaque échantillon de la collecte au résultat."
    ])

    addSection("3.2 Vision IA 2026 (Imagerie)", [
        "• Visualiseur DICOM Cloud : Accès universel aux clichés (Radio, Scanner, IRM) avec outils de mesure avancés.",
        "• Aide au Diagnostic IA : Préréglage automatique des zones pathologiques et segmentation 3D des organes.",
        "• Rapport IA Automatisé : Génération d'un pré-compte rendu radiologique pour validation."
    ])

    // --- CHAPITRE 4: LOGISTIQUE & GMAO ---
    addHeader("## CHAPITRE 4 : LOGISTIQUE ET GMAO", 5)
    addSection("4.1 Master Asset Registry", [
        "• Inventaire Technique : Suivi détaillé de chaque équipement (Marque, Modèle, N° Série, Emplacement).",
        "• Maintenance Prédictive : Analyse des vibrations et de la consommation pour anticiper les pannes.",
        "• Planning de Calibration : Rappels automatiques pour le respect des normes ISO."
    ])

    addSection("4.2 Gestion des Stocks Centralisée", [
        "• Pharmacie : Gestion par lots et dates d'expiration (FEFO). Alerte automatique de rupture.",
        "• Logistique Médicale : Suivi des consommables (seringues, pansements) par service.",
        "• Achats Express : Bouton de commande automatique dès que le seuil de sécurité est atteint."
    ])

    // --- CHAPITRE 5: FINANCE & FACTURATION ---
    addHeader("## CHAPITRE 5 : FINANCE & TARIFICATION", 6)
    addSection("5.1 Paiements & Mobile Money", [
        "• Flux de Caisse Live : Centralisation des paiements Espèces, Chèques, et Virement.",
        "• Mobile Money Hub : Intégration Wave et Orange Money avec validation automatique en comptabilité.",
        "• Digital Receipts : Envoi immédiat du reçu de paiement via WhatsApp ou Email au patient."
    ])

    addSection("5.2 Tiers-Payant & Conventions", [
        "• Dossier de Prise en Charge : Gestion des conventions État, IPRES, et Assurances privées (AXA, SUNU).",
        "• Billing Consolidé : Génération des factures de groupe pour les entreprises partenaires.",
        "• Recouvrement Intelligent : Relances automatiques pour les factures non réglées par les assureurs."
    ])

    // --- CHAPITRE 6: COMMUNICATION & CONFÉRENCE ---
    addHeader("## CHAPITRE 6 : COMMUNICATION & CONFÉRENCE LIVE", 7)
    addSection("6.1 Télé-Expertise SIGHI Live", [
        "• Vidéo Conférence HD : Système de streaming sécurisé AES-256 pour les consultations à distance.",
        "• Enregistrement Cloud : Capture intégrale des échanges médicaux pour archivage légal.",
        "• Génération de PV IA : Moteur NLP qui transforme la conversation en procès-verbal structuré automatiquement.",
        "• WhatsApp Gateway : Envoi automatique des liens de connexion sécurisés aux patients lors de la validation du RDV."
    ])

    addSection("6.2 Cloud GED Master", [
        "• Indexation Intelligente : Recherche plein texte dans tous les documents scannés.",
        "• Archivage Légal : Conservation sécurisée sur 10 ans selon les normes MSAS.",
        "• Workflow Signature : Signature électronique des consentements éclairés et contrats."
    ])

    // --- CHAPITRE 7: STRATEGIE IA ---
    addHeader("## CHAPITRE 7 : ANALYTICS & STRATEGIE", 8)
    addSection("7.1 Moteur de Tarification Dynamique", [
        "• Yield Management : Optimisation des tarifs des prestations Premium en fonction de la demande.",
        "• Analyse de Rentabilité : Tableau de bord par Pôle (Radiologie vs Maternité) pour investissement stratégique.",
        "• Benchmark : Comparaison des coûts de revient vs prix de vente catalogue."
    ])

    // --- CHAPITRE 8: COEUR DE SYSTEME & CYBER-SECURITY ---
    addHeader("## CHAPITRE 8 : COEUR DE SYSTEME & CYBER-FORTRESS", 9)
    addSection("8.1 Cyber-Security 2026", [
        "• Géo-Redondance Triple-Zone : Vos données sont sauvegardées en temps réel sur 3 clusters physiquement isolés.",
        "• Failover Zéro-Transition : Basculement automatique en cas de panne critique du serveur maître.",
        "• IA Cyber-Sentinelle : Surveillance active contre les intrusions et comportements anormaux.",
        "• Archivage WORM Blockchain : Preuve d'intégrité immuable de vos dossiers médicaux."
    ])

    // --- CHAPITRE 9: INNOVATION PRÉDICTIVE ---
    addHeader("## CHAPITRE 9 : SANTÉ PRÉDICTIVE & IA CLINIQUE", 10)
    addSection("9.1 L'Intelligence Diagnostique", [
        "• Analyse d'Imagerie Zero-Click : L'IA pré-diagnostique les clichés dès leur chargement.",
        "• Prédiction de Risque Complication : Calcul du risque post-opératoire basé sur le profil biologique.",
        "• Planification Thérapeutique IA : Suggestion de protocoles optimisés selon les données mondiales standardisées."
    ])

    // --- CHAPITRE 10: CERTIFICATION & FORMATION ---
    addHeader("## CHAPITRE 10 : SIGHI ACADEMY & CERTIFICATION", 11)
    addSection("10.1 Le Parcours de Maîtrise", [
        "• Cockpit de Simulation : Environnement sécurisé pour tester les interventions d'urgence (Failover, Cyber-attaque).",
        "• Certification Professional 2026 : Validation des acquis sur l'IA Clinique et la Gestion Financière.",
        "• Badges de Compétences : Reconnaissance visuelle des experts métiers au sein de la clinique.",
        "• Formation Continue : Mise à jour automatique des modules de formation selon les évolutions du kernel SIGHI."
    ])

    // --- CHAPITRE 11: PÔLE ACADÉMIQUE CHU ---
    addHeader("## CHAPITRE 11 : HUB E-LEARNING CHU DAKAR", 12)
    addSection("11.1 Formation & Recherche", [
        "• Plateforme E-Learning : Catalogue de cours magistraux et masterclass chirurgicales.",
        "• Streaming Live Bloc : Retransmission en direct des interventions pour les internes.",
        "• Crédits ECTS : Suivi automatisé des heures de formation pour la certification universitaire.",
        "• Bibliothèque IA : Accès aux dernières publications et analyses de cas cliniques."
    ])

    // --- CHAPITRE 12: INNOVATION LAB & R&D ---
    addHeader("## CHAPITRE 12 : INNOVATION LAB - L'AVENIR DE LA SANTÉ", 13)
    addSection("12.1 Technologies de Rupture", [
        "• Holographic Bio-Twin : Simulation 3D de l'évolution de la santé du patient sur 10 ans.",
        "• Eco-Sustains Monitor : Tracking en temps réel de l'empreinte carbone et gestion LEED Platinum.",
        "• Neural Clinic Network : Intelligence collective décentralisée via apprentissage fédéré.",
        "• Stress Test Cyber : Cockpit de simulation de crise pour tester la résilience du système (Failover Drill)."
    ])

    // --- CHAPITRE 13: CONCIERGERIE VIP ---
    addHeader("## CHAPITRE 13 : SMART CONCIERGE & SERVICES VIP", 14)
    addSection("13.1 L'Expérience 5 Étoiles", [
        "• Accueil Personnalisé IA : Génération automatique de messages de bienvenue sur mesure.",
        "• Services à la Carte : Commande directe de services (Restauration, Transport Limo, Traducteur).",
        "• Monitoring VIP : Suivi en temps réel des flux d'arrivée et des préférences spécifiques des clients Gold.",
        "• Réactivité Haute Performance : Temps de réponse moyen réduit à 45 secondes pour les requêtes conciergerie."
    ])

    // --- PAGE FINALE ---
    addHeader("## CONCLUSION & SUPPORT", 15)
    y = 60
    doc.setFont("helvetica", "bold")
    doc.text("L'avenir de la santé est entre vos mains.", 15, y)
    y += 15
    doc.setFont("helvetica", "normal")
    const finContent = [
        "SIGHI 2026 n'est pas seulement un outil de gestion, c'est l'assurance d'une clinique agile, rentable et centrée sur l'humain.",
        "",
        "Pour tout support technique :",
        "• Hotline IT : Poste 4402",
        "• Email : it.support@laoclinic.sn",
        "• Formations : Tous les premiers lundis du mois."
    ]
    finContent.forEach(line => {
        doc.text(line, 15, y)
        y += 8
    })

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setFont("helvetica", "bold")
    doc.text("SIGHI - Powered by High-Tech Health Intelligence", 105, 150, { align: "center" })

    // Sauvegarde en PDF
    const outputFilename = "manuel_utilisation_ultra.pdf"
    const outputPath = path.join(process.cwd(), outputFilename)

    // Convertir jsPDF output en Buffer
    const pdfOutput = doc.output("arraybuffer")
    fs.writeFileSync(outputPath, Buffer.from(pdfOutput))
    console.log(`Génération réussie : ${outputPath}`)
}

generateManual()
