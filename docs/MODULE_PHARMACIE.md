# 💊 Module Pharmacie - Documentation Complète

## Vue d'Ensemble

Le module Pharmacie est un système complet de gestion pharmaceutique hospitalière conforme aux bonnes pratiques de gestion des stocks médicaux. Il couvre l'ensemble du cycle de vie des médicaments, de l'approvisionnement à la dispensation.

## 🎯 Fonctionnalités Principales

### 1. Gestion de l'Inventaire
- **Catalogue complet** : DCI, noms commerciaux, formes galéniques, dosages
- **Traçabilité** : Codes ANIS (Sénégal), fabricants, lots
- **Alertes intelligentes** : Stock minimum, ruptures, péremptions
- **Recherche avancée** : Par DCI, nom commercial, forme

### 2. Dispensation & Vente
- **Identification patient** : Recherche rapide, profil complet
- **Gestion des ordonnances** : Saisie manuelle ou scan
- **Calcul automatique** : Part assurance/patient
- **Facturation intégrée** : Génération automatique de factures
- **Alertes médicales** : Contre-indications, allergies

### 3. Approvisionnement
- **Gestion des fournisseurs** : Coordonnées, historique
- **Bons de commande** : Création, suivi, réception
- **Statuts** : BROUILLON, EN_ATTENTE, PARTIELLE, LIVREE, ANNULEE
- **Réception de marchandises** : Contrôle qualité, mise en stock

### 4. Traçabilité & Historique
- **Journal des mouvements** : ENTREE, SORTIE, AJUSTEMENT, PEREMPTION
- **Audit trail** : Utilisateur, date/heure, motif
- **Rapports** : Rotation des stocks, valorisation
- **Export** : Excel, PDF pour audits

## 📊 Modèle de Données

### Medicament
```prisma
model Medicament {
  id             String
  codeANIS       String?    // Code officiel Sénégal
  dci            String     // Dénomination Commune Internationale
  nomCommercial  String
  forme          String     // Comprimé, Sirop, Injectable
  dosage         String
  fabricant      String?
  prixAchat      Decimal
  prixVente      Decimal
  stockMinimum   Int
  actif          Boolean
}
```

### Stock
```prisma
model Stock {
  id             String
  medicamentId   String
  lot            String
  datePeremption DateTime
  quantite       Int
  emplacement    String?
}
```

### Fournisseur
```prisma
model Fournisseur {
  id        String
  nom       String
  code      String?
  contact   String?
  email     String?
  telephone String?
  adresse   String?
  ninea     String?  // Numéro d'Identification Nationale (Sénégal)
  rccm      String?  // Registre du Commerce
}
```

### CommandePharmacie
```prisma
model CommandePharmacie {
  id              String
  numeroCommande  String    // BC-PH-2026-0001
  fournisseurId   String
  dateCommande    DateTime
  dateLivraison   DateTime?
  montantTotal    Decimal
  statut          String    // BROUILLON, EN_ATTENTE, PARTIELLE, LIVREE
}
```

### Dispensation
```prisma
model Dispensation {
  id           String
  medicamentId String
  patientId    String
  quantite     Int
  prescription String?
  pharmacien   String
  createdAt    DateTime
}
```

## 🔄 Workflows

### Workflow 1: Réception de Marchandises
1. **Création du bon de commande** → Statut: BROUILLON
2. **Validation et envoi** → Statut: EN_ATTENTE
3. **Réception partielle/totale** → Statut: PARTIELLE/LIVREE
4. **Création automatique de stocks** par lot
5. **Enregistrement du mouvement** (ENTREE)

### Workflow 2: Dispensation Patient
1. **Identification du patient** (recherche)
2. **Récupération de l'ordonnance** (scan ou saisie)
3. **Sélection des médicaments**
4. **Calcul part assurance/patient**
5. **Validation et encaissement**
6. **Déduction automatique des stocks** (FIFO)
7. **Génération de la facture**
8. **Enregistrement du mouvement** (SORTIE)

### Workflow 3: Gestion des Alertes
- **Alerte stock bas** : Quantité < Stock minimum
- **Alerte rupture** : Quantité = 0
- **Alerte péremption** : Date < 6 mois
- **Notification automatique** au responsable pharmacie

## 🛣️ Routes API

### Médicaments
```typescript
GET    /api/pharmacie/medicaments       // Liste tous les médicaments
POST   /api/pharmacie/medicaments       // Créer un médicament
GET    /api/pharmacie/medicaments/:id   // Détails d'un médicament
PUT    /api/pharmacie/medicaments/:id   // Modifier un médicament
DELETE /api/pharmacie/medicaments/:id   // Supprimer un médicament
```

### Fournisseurs
```typescript
GET    /api/pharmacie/fournisseurs      // Liste tous les fournisseurs
POST   /api/pharmacie/fournisseurs      // Créer un fournisseur
```

### Commandes
```typescript
GET    /api/pharmacie/commandes         // Liste toutes les commandes
POST   /api/pharmacie/commandes         // Créer une commande
GET    /api/pharmacie/commandes/:id     // Détails d'une commande
PUT    /api/pharmacie/commandes/:id     // Modifier une commande
```

### Mouvements de Stock
```typescript
GET    /api/pharmacie/mouvements        // Journal des mouvements
POST   /api/pharmacie/mouvements        // Enregistrer un mouvement
```

### Dispensations
```typescript
GET    /api/pharmacie/dispensations     // Historique dispensations
POST   /api/pharmacie/dispensations     // Nouvelle dispensation
```

## 🎨 Composants UI

### 1. PharmacieDashboard
Composant principal avec onglets :
- Vente & Dispensation
- Inventaire Global
- Approvisionnements
- Rapports & Stats
- Historique & Traçabilité

### 2. MedicineInventory
- Table complète des médicaments
- Recherche et filtres
- Badges de statut (OK, BAS, CRITIQUE, RUPTURE)
- Actions rapides (Ajuster, Modifier, Supprimer)

### 3. DispensationModule
- Recherche patient
- Panier de médicaments
- Calcul automatique assurance
- Résumé de vente
- Points de vigilance (allergies, contre-indications)

### 4. ProcurementModule
- Gestion des fournisseurs (cartes)
- Liste des bons de commande
- Création de commande avec lignes
- Suivi des statuts

### 5. StockMovementLog
- Journal chronologique
- Filtres par type
- Badges colorés (ENTREE, SORTIE, AJUSTEMENT)
- Export Excel

## 🔐 Sécurité & Permissions

### Rôles
- **Pharmacien Chef** : Accès complet
- **Assistant Pharmacie** : Dispensation uniquement
- **Gestionnaire Stocks** : Inventaire et approvisionnement
- **Auditeur** : Lecture seule

### Audit Trail
Tous les mouvements sont tracés avec :
- Utilisateur
- Date/Heure
- Action
- Détails (avant/après)

## 📈 Indicateurs Clés (KPIs)

1. **Taux de rotation** : Sorties / Stock moyen
2. **Taux de rupture** : Nb ruptures / Nb références
3. **Valeur du stock** : Σ(Quantité × Prix achat)
4. **Marge moyenne** : (Prix vente - Prix achat) / Prix vente
5. **Péremptions** : Valeur des produits périmés

## 🚀 Prochaines Évolutions

1. **Scanner de codes-barres** pour dispensation rapide
2. **Intégration DICOM** pour imagerie médicale
3. **IA prédictive** pour optimisation des commandes
4. **Application mobile** pour inventaire terrain
5. **Blockchain** pour traçabilité pharmaceutique

## 📝 Notes Importantes

- **Gestion FIFO** : First In, First Out pour les péremptions
- **Double validation** : Pharmacien + Assistant pour dispensations
- **Conformité réglementaire** : Respect des normes OHADA
- **Sauvegarde quotidienne** : Backup automatique à 23h00

---

**Version** : 1.0.0  
**Dernière mise à jour** : 10 Janvier 2026  
**Responsable** : Équipe SIGHI
