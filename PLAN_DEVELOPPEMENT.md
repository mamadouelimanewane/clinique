# 📅 Plan de Développement SIGHI - 16 Semaines

## 🎯 Vue d'Ensemble

**Objectif** : Développer un système complet de gestion hospitalière en 4 phases majeures  
**Durée** : 16 semaines (4 mois)  
**Méthodologie** : Agile avec sprints de 2 semaines

---

## 📊 Phase 1 : Fondations & Comptabilité OHADA (Semaines 1-4)

### Semaine 1 : Setup & Architecture
**Objectifs** :
- ✅ Initialiser le projet Next.js 14 + TypeScript
- ✅ Configurer Tailwind CSS + shadcn/ui
- ✅ Mettre en place l'architecture modulaire
- ✅ Créer le design system

**Livrables** :
- [x] Projet Next.js configuré
- [x] Documentation architecture (`ARCHITECTURE.md`)
- [ ] Design system de base
- [ ] Composants UI réutilisables

**Tâches** :
```bash
✅ npx create-next-app@latest
✅ npm install @prisma/client prisma
⏳ npx shadcn-ui@latest init
⏳ Créer structure /src/modules
⏳ Configurer ESLint + Prettier
```

---

### Semaine 2 : Base de Données & Authentification
**Objectifs** :
- Configurer Prisma avec PostgreSQL
- Créer le schéma de base de données initial
- Implémenter l'authentification NextAuth.js
- Système de rôles et permissions

**Livrables** :
- [ ] Schéma Prisma complet (v1)
- [ ] Authentification fonctionnelle
- [ ] RBAC (Role-Based Access Control)
- [ ] Page de login/register

**Tâches** :
```bash
⏳ npx prisma init
⏳ Créer schema.prisma (User, Role, Permission)
⏳ npm install next-auth
⏳ Configurer NextAuth.js
⏳ Créer middleware d'authentification
⏳ npx prisma migrate dev
```

**Schéma Prisma Initial** :
```prisma
// User & Auth
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  nom       String
  prenom    String
  role      Role     @relation(fields: [roleId], references: [id])
  roleId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Role {
  id          String       @id @default(cuid())
  nom         String       @unique
  description String?
  permissions Permission[]
  users       User[]
}

model Permission {
  id          String @id @default(cuid())
  nom         String @unique
  description String?
  roles       Role[]
}
```

---

### Semaine 3 : Module Comptabilité OHADA - Partie 1
**Objectifs** :
- Implémenter le Plan Comptable SYSCOA
- Créer les journaux comptables
- Système de saisie d'écritures

**Livrables** :
- [ ] Plan comptable SYSCOA complet (classes 1-8)
- [ ] Gestion des journaux (Achats, Ventes, Banque, Caisse, OD)
- [ ] Interface de saisie comptable
- [ ] Validation des écritures (équilibre débit/crédit)

**Schéma Prisma Comptabilité** :
```prisma
model CompteComptable {
  id          String   @id @default(cuid())
  numero      String   @unique // Ex: "601100"
  libelle     String   // Ex: "Achats de marchandises"
  classe      Int      // 1-8 (SYSCOA)
  type        String   // ACTIF, PASSIF, CHARGE, PRODUIT
  sens        String   // DEBIT, CREDIT
  ecritures   EcritureComptable[]
  createdAt   DateTime @default(now())
}

model Journal {
  id        String   @id @default(cuid())
  code      String   @unique // AC, VE, BQ, CA, OD
  libelle   String   // "Journal des Achats"
  type      String   // ACHATS, VENTES, BANQUE, CAISSE, OD
  ecritures EcritureComptable[]
  createdAt DateTime @default(now())
}

model EcritureComptable {
  id              String            @id @default(cuid())
  journal         Journal           @relation(fields: [journalId], references: [id])
  journalId       String
  compte          CompteComptable   @relation(fields: [compteId], references: [id])
  compteId        String
  dateEcriture    DateTime
  libelle         String
  debit           Decimal           @default(0) @db.Decimal(15, 2)
  credit          Decimal           @default(0) @db.Decimal(15, 2)
  pieceRef        String?           // Référence pièce justificative
  exercice        ExerciceComptable @relation(fields: [exerciceId], references: [id])
  exerciceId      String
  valide          Boolean           @default(false)
  createdBy       String
  createdAt       DateTime          @default(now())
}

model ExerciceComptable {
  id           String              @id @default(cuid())
  annee        Int                 @unique
  dateDebut    DateTime
  dateFin      DateTime
  cloture      Boolean             @default(false)
  ecritures    EcritureComptable[]
  createdAt    DateTime            @default(now())
}
```

**Interface UI** :
- Dashboard comptable
- Formulaire de saisie d'écritures
- Liste des écritures par journal
- Validation et équilibre automatique

---

### Semaine 4 : Module Comptabilité OHADA - Partie 2
**Objectifs** :
- Grand Livre et Balance
- États financiers de base
- Comptabilité analytique

**Livrables** :
- [ ] Grand Livre par compte
- [ ] Balance générale
- [ ] Bilan comptable (actif/passif)
- [ ] Compte de résultat (charges/produits)
- [ ] Centres analytiques

**Fonctionnalités** :
```typescript
// API Routes
GET  /api/comptabilite/grand-livre?compteId=xxx
GET  /api/comptabilite/balance?exerciceId=xxx
GET  /api/comptabilite/bilan?exerciceId=xxx
GET  /api/comptabilite/compte-resultat?exerciceId=xxx
POST /api/comptabilite/ecritures
PUT  /api/comptabilite/ecritures/:id/valider
```

**Schéma Analytique** :
```prisma
model CentreAnalytique {
  id          String @id @default(cuid())
  code        String @unique
  libelle     String
  type        String // SERVICE, MEDECIN, ACTE
  actif       Boolean @default(true)
  createdAt   DateTime @default(now())
}
```

---

## 🏥 Phase 2 : Médical Core (Semaines 5-8)

### Semaine 5 : Dossier Patient Électronique (DPE)
**Objectifs** :
- Créer le modèle Patient complet
- Gestion des antécédents et allergies
- Historique médical
- Couverture sociale

**Livrables** :
- [ ] CRUD Patient complet
- [ ] Fiche patient détaillée
- [ ] Recherche avancée de patients
- [ ] Import/Export données patient

**Schéma Patient** :
```prisma
model Patient {
  id                String         @id @default(cuid())
  numeroPatient     String         @unique // Auto-généré
  nom               String
  prenom            String
  dateNaissance     DateTime
  sexe              String         // M, F
  telephone         String
  email             String?
  adresse           String?
  ville             String?
  profession        String?
  situationMatrimoniale String?
  
  // Couverture sociale
  assureur          String?
  numeroAssure      String?
  tauxCouverture    Decimal?       @db.Decimal(5, 2)
  
  // Relations
  antecedents       Antecedent[]
  allergies         Allergie[]
  consultations     Consultation[]
  rendezvous        RendezVous[]
  factures          Facture[]
  
  // Contacts d'urgence
  contactUrgenceNom String?
  contactUrgenceTel String?
  
  // Métadonnées
  photo             String?        // URL Cloudinary
  actif             Boolean        @default(true)
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt
}

model Antecedent {
  id          String   @id @default(cuid())
  patient     Patient  @relation(fields: [patientId], references: [id])
  patientId   String
  type        String   // MEDICAL, CHIRURGICAL, FAMILIAL
  description String
  date        DateTime?
  createdAt   DateTime @default(now())
}

model Allergie {
  id          String   @id @default(cuid())
  patient     Patient  @relation(fields: [patientId], references: [id])
  patientId   String
  type        String   // MEDICAMENT, ALIMENTAIRE, AUTRE
  allergene   String
  severite    String   // LEGERE, MODEREE, SEVERE
  createdAt   DateTime @default(now())
}
```

---

### Semaine 6 : Gestion des Consultations
**Objectifs** :
- Système de prise de rendez-vous
- Fiche de consultation
- Prescriptions électroniques
- Génération de documents

**Livrables** :
- [ ] Calendrier de rendez-vous intelligent
- [ ] Fiche de consultation standardisée
- [ ] Prescripteur avec base médicamenteuse
- [ ] Génération PDF (ordonnance, certificat)

**Schéma Consultation** :
```prisma
model RendezVous {
  id          String    @id @default(cuid())
  patient     Patient   @relation(fields: [patientId], references: [id])
  patientId   String
  medecin     User      @relation(fields: [medecinId], references: [id])
  medecinId   String
  dateHeure   DateTime
  duree       Int       @default(30) // minutes
  motif       String
  statut      String    @default("PLANIFIE") // PLANIFIE, CONFIRME, ANNULE, TERMINE
  notes       String?
  createdAt   DateTime  @default(now())
}

model Consultation {
  id              String        @id @default(cuid())
  patient         Patient       @relation(fields: [patientId], references: [id])
  patientId       String
  medecin         User          @relation(fields: [medecinId], references: [id])
  medecinId       String
  dateConsultation DateTime     @default(now())
  
  // Examen clinique
  motifConsultation String
  anamnese        String?
  examenClinique  String?
  diagnostic      String?
  
  // Constantes
  poids           Decimal?      @db.Decimal(5, 2)
  taille          Decimal?      @db.Decimal(5, 2)
  temperature     Decimal?      @db.Decimal(4, 1)
  tensionSystolique Int?
  tensionDiastolique Int?
  frequenceCardiaque Int?
  
  // Relations
  prescriptions   Prescription[]
  actes           ActeRealise[]
  
  // Facturation
  facture         Facture?      @relation(fields: [factureId], references: [id])
  factureId       String?
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Prescription {
  id              String       @id @default(cuid())
  consultation    Consultation @relation(fields: [consultationId], references: [id])
  consultationId  String
  medicament      String       // Nom du médicament
  dosage          String       // Ex: "500mg"
  forme           String       // Comprimé, Sirop, etc.
  posologie       String       // Ex: "1 cp matin et soir"
  duree           String       // Ex: "7 jours"
  quantite        Int
  instructions    String?
  createdAt       DateTime     @default(now())
}
```

---

### Semaine 7 : Module Pharmacie
**Objectifs** :
- Gestion des stocks de médicaments
- Dispensation
- Alertes (péremption, rupture)
- Traçabilité complète

**Livrables** :
- [ ] CRUD Médicaments
- [ ] Gestion des stocks (entrées/sorties)
- [ ] Interface de dispensation
- [ ] Alertes automatiques
- [ ] Inventaire

**Schéma Pharmacie** :
```prisma
model Medicament {
  id              String            @id @default(cuid())
  codeANIS        String?           @unique // Code ANIS Sénégal
  dci             String            // Dénomination Commune Internationale
  nomCommercial   String
  forme           String            // Comprimé, Sirop, Injectable
  dosage          String
  fabricant       String?
  prixAchat       Decimal           @db.Decimal(10, 2)
  prixVente       Decimal           @db.Decimal(10, 2)
  stockMinimum    Int               @default(10)
  actif           Boolean           @default(true)
  stocks          Stock[]
  mouvements      MouvementStock[]
  dispensations   Dispensation[]
  createdAt       DateTime          @default(now())
}

model Stock {
  id              String     @id @default(cuid())
  medicament      Medicament @relation(fields: [medicamentId], references: [id])
  medicamentId    String
  lot             String
  datePeremption  DateTime
  quantite        Int
  emplacement     String?    // Rayon, Étagère
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
}

model MouvementStock {
  id              String     @id @default(cuid())
  medicament      Medicament @relation(fields: [medicamentId], references: [id])
  medicamentId    String
  type            String     // ENTREE, SORTIE, AJUSTEMENT
  quantite        Int
  motif           String
  reference       String?    // Bon de commande, etc.
  utilisateur     String
  createdAt       DateTime   @default(now())
}

model Dispensation {
  id              String     @id @default(cuid())
  medicament      Medicament @relation(fields: [medicamentId], references: [id])
  medicamentId    String
  patient         Patient    @relation(fields: [patientId], references: [id])
  patientId       String
  quantite        Int
  prescription    String?    // Référence prescription
  pharmacien      String
  createdAt       DateTime   @default(now())
}
```

---

### Semaine 8 : Facturation Patient & Intégration Comptable
**Objectifs** :
- Facturation des consultations et actes
- Prise en charge assurance
- Intégration avec module comptable
- Recouvrement

**Livrables** :
- [ ] Génération automatique de factures
- [ ] Gestion tiers payant
- [ ] Écritures comptables automatiques
- [ ] Suivi des paiements
- [ ] Relances automatiques

**Schéma Facturation** :
```prisma
model Facture {
  id              String       @id @default(cuid())
  numeroFacture   String       @unique // Auto-généré
  patient         Patient      @relation(fields: [patientId], references: [id])
  patientId       String
  dateFacture     DateTime     @default(now())
  dateEcheance    DateTime
  
  // Montants
  montantHT       Decimal      @db.Decimal(10, 2)
  montantTVA      Decimal      @default(0) @db.Decimal(10, 2)
  montantTTC      Decimal      @db.Decimal(10, 2)
  
  // Prise en charge
  partAssurance   Decimal      @default(0) @db.Decimal(10, 2)
  partPatient     Decimal      @db.Decimal(10, 2)
  
  // Statut
  statut          String       @default("IMPAYEE") // IMPAYEE, PAYEE, ANNULEE
  
  // Relations
  lignes          LigneFacture[]
  paiements       Paiement[]
  consultations   Consultation[]
  
  // Comptabilité
  ecritureComptableId String?
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}

model LigneFacture {
  id          String   @id @default(cuid())
  facture     Facture  @relation(fields: [factureId], references: [id])
  factureId   String
  designation String
  quantite    Int      @default(1)
  prixUnitaire Decimal @db.Decimal(10, 2)
  montant     Decimal  @db.Decimal(10, 2)
  createdAt   DateTime @default(now())
}

model Paiement {
  id          String   @id @default(cuid())
  facture     Facture  @relation(fields: [factureId], references: [id])
  factureId   String
  datePaiement DateTime @default(now())
  montant     Decimal  @db.Decimal(10, 2)
  modePaiement String  // ESPECES, CARTE, VIREMENT, CHEQUE
  reference   String?
  createdBy   String
  createdAt   DateTime @default(now())
}
```

---

## 🔬 Phase 3 : Spécialités Médicales (Semaines 9-12)

### Semaine 9 : Module Radiologie & Imagerie
**Objectifs** :
- Gestion des demandes d'examens
- Stockage DICOM (MongoDB)
- Rapportage
- Intégration IA (détection basique)

**Livrables** :
- [ ] Workflow demande → réalisation → rapport
- [ ] Visualiseur DICOM basique
- [ ] Génération de rapports
- [ ] Archivage conforme (10 ans)

---

### Semaine 10 : Chirurgie Dentaire
**Objectifs** :
- Carte dentaire interactive
- Gestion des soins dentaires
- Planning des interventions
- Facturation spécifique

**Livrables** :
- [ ] Odontogramme numérique
- [ ] Suivi des traitements par dent
- [ ] Gestion des prothèses
- [ ] Facturation par acte dentaire

---

### Semaine 11 : Autres Spécialités
**Objectifs** :
- Cardiologie (ECG)
- Maternité (suivi grossesse)
- Dermatologie (photos médicales)
- Modules génériques

**Livrables** :
- [ ] Templates de consultation par spécialité
- [ ] Formulaires spécialisés
- [ ] Suivi des pathologies chroniques

---

### Semaine 12 : Module Ressources Humaines
**Objectifs** :
- Gestion du personnel
- Planning et gardes
- Paie basique
- Portail employé

**Livrables** :
- [ ] CRUD Employés
- [ ] Planning intelligent
- [ ] Gestion des congés
- [ ] Paie intégrée avec comptabilité

---

## 🤖 Phase 4 : IA & Finalisations (Semaines 13-16)

### Semaine 13 : Module IA - Partie 1
**Objectifs** :
- Aide au diagnostic (règles basiques)
- Prédiction des stocks
- Chatbot SANTÉ.AI

**Livrables** :
- [ ] API Python/FastAPI pour IA
- [ ] Modèles de prédiction de stocks
- [ ] Chatbot de triage symptomatique

---

### Semaine 14 : Module IA - Partie 2 & Intégrations
**Objectifs** :
- Analyse d'imagerie (IA)
- Intégrations externes
- API publique

**Livrables** :
- [ ] Détection d'anomalies radiologiques
- [ ] Intégration laboratoires
- [ ] API REST documentée (Swagger)

---

### Semaine 15 : Tests, Optimisation & Documentation
**Objectifs** :
- Tests E2E complets
- Optimisation des performances
- Documentation utilisateur

**Livrables** :
- [ ] Suite de tests complète
- [ ] Documentation API
- [ ] Manuels utilisateurs par profil
- [ ] Tutoriels vidéo

---

### Semaine 16 : Déploiement & Formation
**Objectifs** :
- Déploiement production
- Formation des utilisateurs
- Support initial

**Livrables** :
- [ ] Application déployée (Vercel + Railway)
- [ ] Sessions de formation
- [ ] Hotline de support
- [ ] Plan de maintenance

---

## 📊 Indicateurs de Succès

### Techniques
- ✅ 100% des modules fonctionnels
- ✅ < 200ms temps de réponse moyen
- ✅ 99.9% uptime
- ✅ 0 erreurs critiques

### Métier
- ✅ Conformité OHADA/SYSCOA : 100%
- ✅ Satisfaction utilisateurs : > 80%
- ✅ Temps de formation : < 2h par profil
- ✅ ROI : Positif à 6 mois

---

## 🛠️ Outils & Technologies

```json
{
  "frontend": ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  "backend": ["Next.js API", "Prisma", "PostgreSQL", "NextAuth.js"],
  "ai": ["TensorFlow.js", "Python/FastAPI", "OpenAI API"],
  "deployment": ["Vercel", "Railway", "Cloudinary"],
  "testing": ["Jest", "Playwright", "Cypress"],
  "monitoring": ["Sentry", "Vercel Analytics"]
}
```

---

**Prochaine étape** : Semaine 1 - Jour 1 ✅  
**Statut** : EN COURS 🚀
