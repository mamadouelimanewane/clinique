---
description: Processus complet des achats de la clinique (Expression du besoin -> Livraison -> Stock)
---

# Workflow des Achats - Clinique Sighi

Ce workflow décrit le cycle de vie complet d'une commande, assurant la traçabilité et le contrôle budgétaire entre les départements demandeurs, la centrale d'achats et la finance.

### 1. Expression du Besoin (Demande d'Achat - DA)
- **Acteur** : Chef de service (Labo, Bloc, Pharmacie, Maintenance).
- **Action** : Création d'une DA spécifiant les articles, les quantités et le niveau d'urgence.
- **Synergie** : L'IA peut suggérer des DA basées sur les seuils critiques de stock.

### 2. Validation de la DA
- **Acteur** : Manager de Département.
- **Action** : Revue technique et approbation de la demande.
- **Statut** : La demande passe de `BROUILLON` à `EN ATTENTE ACHATS`.

### 3. Transformation en Bon de Commande (BC)
- **Acteur** : Centrale des Achats.
- **Action** : Sélection du fournisseur (base de données fournisseurs agréés) et négociation des tarifs si nécessaire.
- **Synergie** : Regroupement de DA similaires pour bénéficier de remises sur volume.

### 4. Approbation Budgétaire
- **Acteur** : Direction Financière / Comptabilité.
- **Action** : Validation de l'engagement de dépense.
- **Statut** : Le BC passe à `VALIDÉ POUR ENVOI`.

### 5. Envoi Fournisseur
- **Acteur** : Acheteur / Système automatique.
- **Action** : Envoi du Bon de Commande officiel par email ou portail fournisseur.

### 6. Réception & Contrôle Qualité
- **Acteur** : Réceptionnaire Logistique.
- **Action** : Vérification de la conformité quantitative et qualitative par rapport au BC.
- **Synergie** : Enregistrement du Bon de Livraison (BL) scanné dans la GED.

### 7. Clôture & Intégration Stock
- **Acteur** : Gestionnaire de Stock / Système.
- **Action** : Incrémentation automatique des stocks.
- **Synergie** : Transmission automatique des données de facturation au module Comptabilité.
