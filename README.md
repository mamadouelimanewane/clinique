# 🏥 SIGHI - Système Intégré de Gestion Hospitalière Intelligent

> Solution complète de gestion hospitalière pour cliniques privées au Sénégal

[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791)](https://www.postgresql.org/)

## 📋 Vue d'Ensemble

SIGHI est une plateforme de dernière génération conçue spécifiquement pour les cliniques privées au Sénégal, intégrant :

- ✅ **Comptabilité OHADA/SYSCOA** conforme
- ✅ **Dossier Patient Électronique** (DPE) complet
- ✅ **Gestion des consultations** et prescriptions
- ✅ **Pharmacie** avec gestion des stocks
- ✅ **Facturation** et prise en charge assurance
- ✅ **Ressources Humaines** (planning, paie, congés)
- ✅ **Intelligence Artificielle** pour l'aide au diagnostic
- ✅ **Multilingue** (Français, Wolof)

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ 
- PostgreSQL 15+
- npm ou yarn

### Installation

1. **Cloner le projet** (ou vous êtes déjà dans le dossier)

```bash
cd c:\gravity\clinique
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer la base de données**

Créez un fichier `.env` à la racine du projet :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sighi_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-tres-securise"
```

4. **Initialiser la base de données**

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev --name init

# (Optionnel) Peupler avec des données de test
npx prisma db seed
```

5. **Lancer le serveur de développement**

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
clinique/
├── prisma/
│   ├── schema.prisma          # Schéma de base de données complet
│   ├── migrations/            # Migrations SQL
│   └── seed.ts               # Données initiales
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/             # API Routes
│   │   ├── (auth)/          # Pages authentification
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── comptabilite/    # Module comptabilité
│   │   ├── medical/         # Module médical
│   │   ├── pharmacie/       # Module pharmacie
│   │   └── rh/              # Module RH
│   ├── components/          # Composants React
│   │   ├── ui/             # Composants UI de base
│   │   └── modules/        # Composants par module
│   ├── lib/                # Utilitaires
│   │   ├── prisma.ts       # Client Prisma
│   │   ├── auth.ts         # Configuration NextAuth
│   │   └── utils.ts        # Fonctions utilitaires
│   └── modules/            # Logique métier par module
│       ├── comptabilite/
│       ├── medical/
│       ├── pharmacie/
│       └── rh/
├── public/                 # Fichiers statiques
├── ARCHITECTURE.md         # Documentation architecture
├── PLAN_DEVELOPPEMENT.md   # Plan de développement
└── README.md              # Ce fichier
```

## 🗄️ Base de Données

Le schéma Prisma complet inclut :

### Modules Principaux

1. **Authentification & Sécurité**
   - User, Role, Permission
   - AuditLog (traçabilité complète)

2. **Comptabilité OHADA/SYSCOA**
   - CompteComptable (Plan SYSCOA)
   - Journal (Achats, Ventes, Banque, Caisse, OD)
   - EcritureComptable
   - ExerciceComptable
   - CentreAnalytique
   - Budget

3. **Médical**
   - Patient (DPE complet)
   - Consultation
   - RendezVous
   - Prescription
   - NomenclatureActe
   - Antecedent, Allergie, Vaccination

4. **Pharmacie**
   - Medicament
   - Stock
   - MouvementStock
   - Dispensation

5. **Facturation**
   - Facture
   - LigneFacture
   - Paiement

6. **Ressources Humaines**
   - Employe
   - Conge
   - Planning

### Commandes Prisma Utiles

```bash
# Ouvrir Prisma Studio (interface graphique)
npx prisma studio

# Créer une nouvelle migration
npx prisma migrate dev --name nom_migration

# Réinitialiser la base de données
npx prisma migrate reset

# Générer le client Prisma
npx prisma generate

# Formater le schéma
npx prisma format
```

## 🎨 Stack Technique

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **shadcn/ui** - Composants UI modernes
- **Zustand** - State management
- **React Query** - Data fetching

### Backend
- **Next.js API Routes** - API RESTful
- **Prisma** - ORM moderne
- **PostgreSQL** - Base de données relationnelle
- **NextAuth.js** - Authentification

### Outils
- **ESLint** - Linting
- **Prettier** - Formatage de code
- **TypeScript** - Vérification de types

## 📊 Modules Fonctionnels

### 1. Module Comptabilité OHADA/SYSCOA

Gestion comptable complète conforme aux normes OHADA :

- Plan comptable SYSCOA (classes 1-8)
- Journaux réglementaires
- Saisie d'écritures comptables
- Grand Livre et Balance
- Bilan et Compte de résultat
- Comptabilité analytique
- Gestion budgétaire

### 2. Module Médical

Dossier patient électronique et gestion des soins :

- Dossier patient complet (identité, antécédents, allergies)
- Prise de rendez-vous intelligente
- Consultations avec constantes vitales
- Prescriptions électroniques
- Nomenclature des actes
- Historique médical complet

### 3. Module Pharmacie

Gestion complète de la pharmacie :

- Catalogue médicaments (base ANIS Sénégal)
- Gestion des stocks (FIFO)
- Alertes péremption et rupture
- Dispensation avec traçabilité
- Mouvements de stock
- Inventaire

### 4. Module Facturation

Facturation patient et recouvrement :

- Génération automatique de factures
- Prise en charge assurance/mutuelle
- Tiers payant
- Suivi des paiements
- Relances automatiques
- Intégration comptable

### 5. Module RH

Gestion du personnel :

- Dossier employé
- Planning et gardes
- Gestion des congés
- Paie (intégration comptable)
- Formations

## 🔐 Sécurité

- **Authentification** : NextAuth.js avec JWT
- **Autorisation** : RBAC (Role-Based Access Control)
- **Chiffrement** : Données sensibles chiffrées
- **Audit** : Traçabilité complète des actions
- **Conformité** : RGPD adapté au Sénégal

## 🌍 Internationalisation

- Français (par défaut)
- Wolof (en cours)
- Arabe (optionnel)

## 📱 Interfaces

1. **Portail Médical** (`/medical`)
2. **Portail Administration** (`/admin`)
3. **Portail Comptabilité** (`/comptabilite`)
4. **Portail Patient** (`/patient`)

## 🚀 Déploiement

### Développement

```bash
npm run dev
```

### Production

```bash
# Build
npm run build

# Start
npm start
```

### Déploiement Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

## 📈 Roadmap

### Phase 1 : Fondations (Semaines 1-4) ✅
- [x] Architecture & Setup
- [x] Schéma de base de données
- [ ] Module Comptabilité OHADA
- [ ] Authentification

### Phase 2 : Médical Core (Semaines 5-8)
- [ ] Dossier Patient Électronique
- [ ] Gestion des consultations
- [ ] Module Pharmacie
- [ ] Facturation

### Phase 3 : Spécialités (Semaines 9-12)
- [ ] Radiologie & Imagerie
- [ ] Chirurgie Dentaire
- [ ] Autres spécialités
- [ ] Module RH

### Phase 4 : IA & Avancé (Semaines 13-16)
- [ ] Module IA (diagnostic)
- [ ] Chatbot SANTÉ.AI
- [ ] Intégrations externes
- [ ] Formation

## 🤝 Contribution

Ce projet est en développement actif. Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Propriétaire - Tous droits réservés

## 📞 Support

Pour toute question ou support :
- Email: support@sighi.sn
- Documentation: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Plan de développement: [PLAN_DEVELOPPEMENT.md](./PLAN_DEVELOPPEMENT.md)

---

**Version** : 1.0.0  
**Date** : Janvier 2026  
**Développé avec** ❤️ pour les cliniques du Sénégal
