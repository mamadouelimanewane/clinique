import { jsPDF } from "jspdf"
import fs from "fs"
import path from "path"

async function generateDetailedManual() {
    console.log("Démarrage de la génération du manuel détaillé SIGHI...")

    const doc = new jsPDF()
    const primaryColor = [15, 23, 42] // Slate 900
    const accentColor = [79, 70, 229] // Indigo 600

    // --- PAGE 1: COUVERTURE ---
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.rect(0, 0, 210, 297, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(30)
    doc.text("MANUEL D'OPÉRATION", 20, 100)
    doc.text("TECHNIQUE SIGHI 2026", 20, 115)

    doc.setFontSize(14)
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
    doc.text("Analyse exhaustive des interfaces et workflows", 20, 130)

    doc.setDrawColor(255, 255, 255)
    doc.setLineWidth(1)
    doc.line(20, 140, 100, 140)

    doc.setTextColor(150, 150, 150)
    doc.setFontSize(10)
    doc.text("Clinique Dentaire Aere Lao - Département IT", 20, 260)
    doc.text("Document de référence interne - Diffusion contrôlée", 20, 265)

    let pageNum = 1
    let y = 30

    const nextPager = (title: string) => {
        doc.addPage()
        pageNum++
        doc.setFillColor(248, 250, 252)
        doc.rect(0, 0, 210, 20, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(10)
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.text(title.toUpperCase(), 15, 13)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(8)
        doc.text(`Page ${pageNum} / 18`, 185, 13)
        y = 35
    }

    const addModuleHeader = (title: string, desc: string) => {
        doc.setFont("helvetica", "bold")
        doc.setFontSize(18)
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
        doc.text(title, 15, y)
        y += 8
        doc.setFont("helvetica", "italic")
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100)
        const splitDesc = doc.splitTextToSize(desc, 180)
        doc.text(splitDesc, 15, y)
        y += splitDesc.length * 5 + 5
    }

    const addFeature = (btnName: string, action: string, result: string) => {
        if (y > 250) nextPager(btnName)

        doc.setFont("helvetica", "bold")
        doc.setFontSize(11)
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2])
        doc.text(`> Élément : ${btnName}`, 15, y)
        y += 6

        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.setTextColor(50, 50, 50)

        const actionLines = doc.splitTextToSize(`Action : ${action}`, 175)
        doc.text(actionLines, 20, y)
        y += actionLines.length * 5

        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
        const resultLines = doc.splitTextToSize(`Résultat Attendu : ${result}`, 175)
        doc.text(resultLines, 20, y)
        y += resultLines.length * 5 + 8
    }

    const darkColor = [15, 23, 42]

    // --- MODULE 1: GÉNÉRAL ---
    nextPager("GROUPE : GÉNÉRAL")
    addModuleHeader("1.1 TABLEAU DE BORD", "Vue d'ensemble décisionnelle synchronisée en temps réel avec tous les services.")
    addFeature("Filtre Période", "L'utilisateur sélectionne une plage de dates via le sélecteur calendrier en haut à droite.", "Le système recalcule instantanément tous les KPIs financiers et statistiques de fréquentation pour la période choisie.")
    addFeature("Carte 'Chiffre d'Affaires'", "Cliquer sur le montant global affiché en grand.", "L'interface bascule vers le module comptable avec un filtrage pré-activé sur les recettes de la journée.")
    addFeature("Widget 'Alertes Maintenance'", "L'utilisateur clique sur une icône de clé rouge clignotante.", "Une fenêtre contextuelle liste les équipements critiques nécessitant une intervention immédiate (GMAO).")

    addModuleHeader("1.2 RENDEZ-VOUS", "Gestionnaire d'agenda centralisé pour la coordination des praticiens.")
    addFeature("Bouton 'Nouveau RDV'", "Cliquer sur le bouton indigo 'Plus' situé dans l'entête de la page agenda.", "Un formulaire s'ouvre permettant de lier un patient existant ou d'en créer un nouveau tout en réservant un créneau horaire.")
    addFeature("Champ 'Recherche Patient'", "Saisir les premières lettres du nom du patient dans la barre de recherche interne.", "Une liste de suggestions filtrée apparaît, permettant de sélectionner le dossier sans recharger la page.")

    // --- MODULE 2: MÉDICAL & CLINIQUE ---
    nextPager("GROUPE : MÉDICAL & CLINIQUE")
    addModuleHeader("2.1 PATIENTS (CRM MÉDICAL)", "Base de données centrale des fiches signalétiques et historiques.")
    addFeature("Bouton 'Importer Dossier'", "Cliquer sur l'icône de téléchargement dans la liste des patients.", "Permet de charger des documents externes (PDF/Images) qui seront automatiquement indexés par l'IA dans la fiche patient.")
    addFeature("Badge 'Statut Assurance'", "Survoler ou cliquer sur le badge de couleur (Vert/Rouge) à côté du nom du patient.", "Affiche le détail des droits ouverts et le taux de prise en charge conventionné pour ce patient spécifique.")

    addModuleHeader("2.2 CONSULTATIONS", "Moteur d'examen clinique et de prescription intelligente.")
    addFeature("Champ 'Observations Cliniques'", "Le médecin saisit le texte ou utilise la dictée vocale dans l'éditeur riche.", "Le système analyse les mots-clés en temps réel pour suggérer des codes de diagnostic (CIM-10) correspondants.")
    addFeature("Bouton 'Générer Ordonnance'", "Cliquer sur le bouton 'Finaliser & Imprimer' après avoir sélectionné les médicaments.", "Produit un document PDF sécurisé avec QR Code de vérification et déduit automatiquement les stocks de la pharmacie.")

    addModuleHeader("2.3 HOSPITALISATION", "Gestion des flux de séjours et des unités de soins.")
    addFeature("Bouton 'Changer Chambre'", "Utiliser le glisser-déposer (Drag & Drop) d'un dossier patient vers un autre lit libre.", "Met à jour instantanément le tableau d'occupation et notifie l'équipe de bio-nettoyage du mouvement effectué.")
    addFeature("Champ 'Régime Alimentaire'", "Sélectionner les restrictions dans le menu déroulant de la fiche de suivi.", "Génère une alerte automatique pour le service de restauration interne lors de la préparation des repas.")

    // --- MODULE 3: PLATEAU TECHNIQUE ---
    nextPager("GROUPE : PLATEAU TECHNIQUE")
    addModuleHeader("2.4 SANTÉ PRÉDICTIVE (AI)", "Intelligence augmentée pour le diagnostic et le pronostic.")
    addFeature("Bouton 'Lancer Analyse IA'", "Cliquer sur le bouton 'Zap' dans l'onglet Santé Prédictive.", "L'IA analyse les tissus et imageries pour détecter les signaux faibles et calculer les scores de risque complication.")

    addModuleHeader("2.5 INNOVATION LAB", "Recherche et développement sur les technologies futures.")
    addFeature("Bouton 'Holo-Twin'", "Cliquer sur 'Générer' dans le module Bio-Twin.", "Crée une simulation 3D prédictive de la dentition du patient, visible en réalité augmentée.")

    addModuleHeader("2.6 SMART CONCIERGE", "Gestion de l'accueil VIP et services hôteliers de luxe.")
    addFeature("Bouton 'Action VIP'", "Le concierge clique sur l'icône de flèche pour coordonner l'arrivée d'un client Gold.", "Génère un protocole d'accueil personnalisé incluant la préparation de la suite et l'assistant personnel dédié.")

    addModuleHeader("5.5 CYBER FORTRESS (AVANCÉ)", "Sécurité périmétrique et résilience.")
    addFeature("Bouton 'Stress Test Live'", "Cliquer sur 'Stress Test' dans le Cyber Fortress.", "Lance une simulation de panne totale (DRP Drill) pour démontrer la bascule automatique vers le cluster de secours en moins de 30ms.")

    addModuleHeader("3.1 LABORATOIRE", "Centre de traitement des analyses biologiques et biochimiques.")
    addFeature("Bouton 'Valider Résultat'", "Le technicien clique sur l'icône de coche après vérification des valeurs saisies par l'automate.", "Le compte-rendu est signé numériquement et transmis au dossier médical du patient ainsi qu'à son WhatsApp personnel.")
    addFeature("Tableau 'Worklist'", "Consulter la liste des prélèvements en attente classés par urgence.", "Permet d'organiser le flux de travail des automates en priorité selon le critère 'Urgent' sélectionné à l'accueil.")

    addModuleHeader("3.2 IMAGERIE", "Visualiseur DICOM intégré et assistant IA diagnostic.")
    addFeature("Bouton 'Vision IA'", "Cliquer sur l'icône de cerveau située sur la barre d'outils du visualiseur radio.", "L'intelligence artificielle scanne le cliché et applique des filtres de détection automatique sur les zones suspectes.")
    addFeature("Champ 'Annotation 3D'", "L'utilisateur sélectionne une zone sur l'image et ajoute une note.", "Crée un marqueur spatial permanent dans le dossier d'imagerie, visible par le chirurgien lors de l'intervention.")

    addModuleHeader("4.1 COMMUNICATION & CONFÉRENCE", "Gestion des flux omnicanaux et de la télé-expertise.")
    addFeature("Bouton 'Record IA'", "Cliquer sur le bouton 'Lancer Enregistrement' pendant une conférence.", "Le système démarre la capture vidéo et l'analyse sémantique en temps réel pour le futur PV.")
    addFeature("Onglet 'Actes/PV'", "Cliquer sur l'onglet 'Actes/PV' dans la barre latérale droite de la conférence.", "Permet de visualiser en direct les points de décision identifiés par l'IA et de télécharger le PV final.")
    addFeature("Expérience Patient", "Consultation de la page 'Patient Satisfaction Center'.", "Affichage du score NPS global (9.4/10) et analyse sémantique IA des feedbacks pour améliorer la qualité de service.")
    addFeature("Auto-Lien WhatsApp", "Validation d'un rendez-vous 'Téléconsultation' à l'accueil.", "Le moteur de comms génère un lien unique et l'envoie instantanément au patient via WhatsApp Business.")

    addModuleHeader("4.2 COMPTABILITÉ", "Cœur financier pour le suivi des écritures et de la trésorerie.")
    addFeature("Bouton 'Saisir Écriture'", "Cliquer sur le bouton 'Nouvelle Ligne' dans le journal de caisse ou de banque.", "Ouvre une interface de saisie assistée qui équilibre automatiquement les comptes selon le plan comptable SYSCOHADA.")
    addFeature("Champ 'Analytique'", "Sélectionner le pôle de dépense (ex: Radiologie) dans le champ de ventilation.", "Permet de calculer la rentabilité nette par service lors de l'édition du rapport de fin de mois.")

    addModuleHeader("4.2 RECOUVREMENT", "Suivi des créances et des paiements tiers-payants.")
    addFeature("Bouton 'Relancer Assureur'", "Cliquer sur l'icône de cloche à côté d'une facture impayée depuis plus de 30 jours.", "Envoie un email de relance automatique structuré à la compagnie d'assurance avec le bordereau de facturation en pièce jointe.")
    addFeature("Tableau 'Balance Agée'", "Visualiser la répartition des dettes par ancienneté (0-30j, 30-60j, +90j).", "Offre une vision critique sur les risques d'impayés et permet d'ajuster la stratégie de recouvrement.")

    // --- MODULE 5: SUPPORTS & CONFIG ---
    nextPager("GROUPE : SUPPORTS & CONFIG")
    addModuleHeader("5.1 PARAMÈTRES", "Configuration globale et identité numérique de la clinique.")
    addFeature("Champ 'Taux de TVA'", "Modifier la valeur numérique dans la section Configuration Fiscale.", "Applique instantanément le nouveau taux à TOUTES les factures générées à partir de cet instant dans tout le système.")

    addModuleHeader("5.2 SIGHI ACADEMY", "Centre de formation et de certification interactive.")
    addFeature("Bouton 'Lancer Simulation'", "Cliquer sur le bouton 'Lancer' d'un module de formation (ex: Cyber Fortress).", "Démarre un environnement de test immersif où l'utilisateur doit valider des étapes techniques pour obtenir son certificat.")

    addModuleHeader("5.3 ARCHIVES & GED", "Gestion électronique des documents et archivage légal.")
    addFeature("Filtrage 'Data Integrity'", "Sélectionner le mode 'Audit' dans le navigateur de fichiers.", "Affiche l'empreinte blockchain de chaque document pour certifier qu'il n'a pas été modifié depuis son archivage.")

    addModuleHeader("5.4 E-LEARNING CHU", "Pôle universaitre et formation académique.")
    addFeature("Bouton 'Rejoindre Live'", "Cliquer sur le bouton 'Play' dans la section Masterclass.", "Connecte l'utilisateur au flux vidéo sécurisé du bloc opératoire pour une formation en temps réel.")

    // --- PAGE FINALE ---
    nextPager("SYNTHÈSE TECHNIQUE")
    y = 60
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("CONSIGNES DE SÉCURITÉ OPÉRATIONNELLES", 15, y)
    y += 10
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    const security = [
        "1. Ne partagez jamais vos identifiants SIGHI 2026. Chaque action est tracée nominalement.",
        "2. Déconnectez-vous systématiquement avant de quitter votre poste de travail.",
        "3. En cas de blocage d'un bouton, rafraîchissez la page (Touche F5) avant de contacter le support.",
        "4. Les rapports PDF générés doivent être traités avec la plus haute confidentialité médicale.",
    ]
    security.forEach(s => {
        doc.text(s, 15, y)
        y += 7
    })

    // Sauvegarde
    const outputFilename = "manuel_utilisation_detaille.pdf"
    const outputPath = path.join(process.cwd(), outputFilename)
    const pdfOutput = doc.output("arraybuffer")
    fs.writeFileSync(outputPath, Buffer.from(pdfOutput))
    console.log(`Génération réussie : ${outputPath}`)
}

generateDetailedManual()
