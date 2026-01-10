# 🏗️ Architecture SIGHI - Système Intégré de Gestion Hospitalière Intelligent

## 📊 Vue d'Ensemble

Le SIGHI est une solution complète de gestion hospitalière conçue pour les cliniques privées au Sénégal, intégrant :
- ✅ Gestion médicale complète (DPE, consultations, spécialités)
- ✅ Comptabilité OHADA/SYSCOA conforme
- ✅ Intelligence Artificielle pour l'aide au diagnostic
- ✅ Gestion des ressources humaines et logistique
- ✅ Interopérabilité avec le système de santé sénégalais

---

## 🎯 Architecture Technique

### Stack Technologique

```
Frontend:
├── Next.js 14+ (App Router)
├── React 18+ avec TypeScript
├── Tailwind CSS + shadcn/ui
├── Zustand (state management)
└── React Query (data fetching)

Backend:
├── Next.js API Routes
├── Prisma ORM
├── PostgreSQL (données transactionnelles)
├── MongoDB (imagerie médicale - Phase 2)
└── NextAuth.js (authentification)

IA/ML:
├── TensorFlow.js (client-side)
├── API Python/FastAPI (serveur IA - Phase 4)
└── OpenAI API (chatbot médical)

Déploiement:
├── Vercel (frontend + API)
├── Railway/Supabase (PostgreSQL)
└── Cloudinary (stockage images)
```

---

## 🏛️ Architecture Modulaire

```
SIGHI/
├── 📦 Module Comptabilité OHADA/SYSCOA (MCO) - PRIORITÉ 1
│   ├── Plan comptable SYSCOA
│   ├── Journaux comptables
│   ├── Grand livre & Balance
│   ├── États financiers (Bilan, Compte de résultat)
│   ├── Comptabilité analytique
│   └── Trésorerie & Budget
│
├── 🏥 Module Médical Central (MMC) - PRIORITÉ 2
│   ├── Dossier Patient Électronique (DPE)
│   ├── Gestion des consultations
│   ├── Prescriptions électroniques
│   ├── Gestion des rendez-vous
│   └── Historique médical
│
├── 💊 Module Pharmacie (MPH) - PRIORITÉ 3
│   ├── Gestion des stocks
│   ├── Dispensation
│   ├── Interactions médicamenteuses
│   ├── Péremption & Alertes
│   └── Inventaire
│
├── 🔬 Module Radiologie & Imagerie (MRI) - PRIORITÉ 4
│   ├── Gestion des demandes
│   ├── PACS (stockage DICOM)
│   ├── Rapportage
│   └── IA de détection
│
├── 🦷 Module Spécialités Médicales - PRIORITÉ 5
│   ├── Chirurgie Dentaire
│   ├── Cardiologie
│   ├── Dermatologie
│   ├── Maternité
│   └── Autres spécialités
│
├── 🤖 Module Intelligence Artificielle (MIA) - PRIORITÉ 6
│   ├── Aide au diagnostic
│   ├── Prédiction des stocks
│   ├── Analyse financière
│   └── Chatbot SANTÉ.AI
│
├── 👥 Module Ressources Humaines (MRH) - PRIORITÉ 7
│   ├── Gestion du personnel
│   ├── Planning & Gardes
│   ├── Paie
│   └── Formations
│
└── 🔧 Modules Support - PRIORITÉ 8
    ├── Maintenance équipements
    ├── Communication
    └── Sécurité & Contrôle d'accès
```

---

## 🗄️ Architecture Base de Données

### Schéma Principal (PostgreSQL)

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPTABILITÉ OHADA                        │
├─────────────────────────────────────────────────────────────┤
│ • CompteComptable (Plan SYSCOA)                             │
│ • Journal (Achats, Ventes, Banque, Caisse, OD)              │
│ • EcritureComptable                                          │
│ • ExerciceComptable                                          │
│ • CentreAnalytique                                           │
│ • Facture (Patient, Fournisseur)                            │
│ • Paiement                                                   │
│ • Budget                                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      MÉDICAL CENTRAL                         │
├─────────────────────────────────────────────────────────────┤
│ • Patient (DPE)                                              │
│ • Consultation                                               │
│ • Prescription                                               │
│ • Acte (Nomenclature)                                        │
│ • RendezVous                                                 │
│ • Antecedent                                                 │
│ • Allergie                                                   │
│ • Vaccination                                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         PHARMACIE                            │
├─────────────────────────────────────────────────────────────┤
│ • Medicament (Base ANIS)                                     │
│ • Stock                                                      │
│ • MouvementStock                                             │
│ • Dispensation                                               │
│ • Fournisseur                                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    RESSOURCES HUMAINES                       │
├─────────────────────────────────────────────────────────────┤
│ • Employe (Médical, Administratif, Paramédical)             │
│ • Contrat                                                    │
│ • Planning                                                   │
│ • Conge                                                      │
│ • Paie                                                       │
│ • Formation                                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      SYSTÈME & SÉCURITÉ                      │
├─────────────────────────────────────────────────────────────┤
│ • User (Authentification)                                    │
│ • Role & Permission                                          │
│ • AuditLog                                                   │
│ • Configuration                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Sécurité & Conformité

### Niveaux de Sécurité

1. **Authentification**
   - NextAuth.js avec JWT
   - 2FA optionnel
   - Session management sécurisé

2. **Autorisation**
   - RBAC (Role-Based Access Control)
   - Permissions granulaires par module
   - Audit trail complet

3. **Données**
   - Chiffrement AES-256 au repos
   - HTTPS/TLS en transit
   - Anonymisation pour l'IA
   - Backups automatiques quotidiens

4. **Conformité**
   - RGPD adapté au Sénégal
   - Normes OHADA/SYSCOA
   - Loi sénégalaise sur la santé
   - Archivage légal (10 ans minimum)

---

## 🚀 Plan de Déploiement

### Phase 1 : Fondations (Semaines 1-4)
- ✅ Architecture & Setup projet
- ✅ Module Comptabilité OHADA/SYSCOA
- ✅ Authentification & Gestion utilisateurs
- ✅ Design system & UI components

### Phase 2 : Médical Core (Semaines 5-8)
- 🔄 Dossier Patient Électronique
- 🔄 Gestion des consultations
- 🔄 Module Pharmacie
- 🔄 Facturation patient

### Phase 3 : Spécialités (Semaines 9-12)
- ⏳ Radiologie & Imagerie
- ⏳ Chirurgie Dentaire
- ⏳ Autres spécialités
- ⏳ Ressources Humaines

### Phase 4 : IA & Avancé (Semaines 13-16)
- ⏳ Module IA (diagnostic, prédictions)
- ⏳ Chatbot SANTÉ.AI
- ⏳ Intégrations externes
- ⏳ Formation & Documentation

---

## 📱 Interfaces Utilisateurs

### Portails

1. **Portail Médical** (`/medical`)
   - Dashboard médecin
   - Consultations du jour
   - Dossiers patients
   - Prescriptions

2. **Portail Administration** (`/admin`)
   - Dashboard direction
   - Comptabilité
   - RH & Planning
   - Statistiques

3. **Portail Comptabilité** (`/comptabilite`)
   - Saisie comptable
   - États financiers
   - Trésorerie
   - Budget

4. **Portail Patient** (`/patient`)
   - Prise de RDV
   - Résultats d'examens
   - Factures
   - Messagerie sécurisée

---

## 🔌 Intégrations

### Internes
- API RESTful pour tous les modules
- WebSockets pour notifications temps réel
- Event-driven architecture

### Externes (Phase 4)
- Laboratoires d'analyses
- Assurances & Mutuelles
- Plateforme SIMENS (Ministère Santé)
- Banques (virements, relevés)
- Équipements médicaux (HL7/FHIR)

---

## 📊 KPIs & Monitoring

### Métriques Techniques
- Uptime : > 99.9%
- Response time : < 200ms
- Error rate : < 0.1%

### Métriques Métier
- Temps d'attente moyen
- Taux de facturation J+1
- Satisfaction patient (NPS)
- Rentabilité par service

---

## 🛠️ Outils de Développement

```bash
# Développement
npm run dev          # Serveur local
npm run build        # Build production
npm run lint         # Linting
npm run type-check   # TypeScript check

# Base de données
npx prisma studio    # Interface DB
npx prisma migrate   # Migrations
npx prisma generate  # Génération client

# Tests
npm run test         # Tests unitaires
npm run test:e2e     # Tests E2E
```

---

## 📚 Documentation

- `/docs/api` - Documentation API
- `/docs/user` - Manuels utilisateurs
- `/docs/dev` - Guide développeur
- `/docs/deployment` - Guide déploiement

---

## 🎯 Objectifs de Performance

- **Scalabilité** : 1000+ consultations/jour
- **Disponibilité** : 99.9% uptime
- **Performance** : < 200ms response time
- **Sécurité** : Conformité totale RGPD/OHADA
- **Utilisabilité** : Formation < 2h par profil

---

**Version** : 1.0.0  
**Date** : Janvier 2026  
**Auteur** : Équipe SIGHI  
**Licence** : Propriétaire
