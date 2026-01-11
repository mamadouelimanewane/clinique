# 🚀 Guide de Démarrage Rapide - SIGHI

Ce guide vous permettra de démarrer le projet SIGHI en quelques minutes.

---

## ⚡ Installation Rapide (5 minutes)

### Étape 1 : Vérifier les prérequis

```bash
# Vérifier Node.js (version 18+)
node --version

# Vérifier npm
npm --version
```

Si Node.js n'est pas installé, téléchargez-le depuis [nodejs.org](https://nodejs.org/)

---

### Étape 2 : Installer les dépendances

Les dépendances sont déjà installées ! ✅

Si vous avez besoin de réinstaller :
```bash
npm install
```

---

### Étape 3 : Configurer la base de données

Vous avez **3 options** :

#### Option A : PostgreSQL Local (Recommandé pour développement)

1. Installer PostgreSQL : [postgresql.org/download](https://www.postgresql.org/download/)
2. Créer une base de données :
```sql
CREATE DATABASE sighi_db;
```

3. Créer le fichier `.env` à la racine :
```env
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/sighi_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="changez-moi-en-production-secret-tres-long"
```

#### Option B : Supabase (Gratuit, Cloud)

1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Copier la "Connection String" (mode "Transaction")
4. Créer le fichier `.env` :
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="changez-moi-en-production"
```

#### Option C : Railway (Gratuit, Cloud)

1. Créer un compte sur [railway.app](https://railway.app)
2. Créer un nouveau projet PostgreSQL
3. Copier la "DATABASE_URL"
4. Créer le fichier `.env` avec l'URL copiée

---

### Étape 4 : Initialiser la base de données

```bash
# Pousser le schéma vers la base de données
npm run db:push

# Peupler avec les données initiales
npm run db:seed
```

Vous devriez voir :
```
✅ Seeding terminé avec succès!
📊 Résumé:
- 5 rôles créés
- 3 utilisateurs créés
- 50+ comptes comptables créés
...
```

---

### Étape 5 : Démarrer le serveur

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur ! 🎉

---

## 🔑 Identifiants de Connexion

Après le seed, vous pouvez vous connecter avec :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| **Administrateur** | admin@sighi.sn | password123 |
| **Médecin** | dr.diop@sighi.sn | password123 |
| **Comptable** | comptable@sighi.sn | password123 |

⚠️ **Important** : Changez ces mots de passe en production !

---

## 🛠️ Commandes Utiles

### Développement
```bash
npm run dev              # Démarrer le serveur de développement
npm run build            # Build pour la production
npm start                # Démarrer en mode production
npm run lint             # Vérifier le code
```

### Base de Données
```bash
npm run db:studio        # Ouvrir Prisma Studio (interface graphique)
npm run db:generate      # Régénérer le client Prisma
npm run db:push          # Pousser le schéma vers la DB
npm run db:migrate       # Créer une migration
npm run db:seed          # Peupler la DB avec des données
npm run db:reset         # Réinitialiser la DB (⚠️ supprime tout)
```

---

## 📊 Prisma Studio (Interface Graphique)

Pour visualiser et modifier vos données facilement :

```bash
npm run db:studio
```

Cela ouvrira une interface web sur [http://localhost:5555](http://localhost:5555)

---

## 🐛 Résolution de Problèmes

### Erreur : "Can't reach database server"

**Solution** : Vérifiez que PostgreSQL est démarré et que votre `DATABASE_URL` est correcte.

```bash
# Windows : Vérifier si PostgreSQL est démarré
Get-Service postgresql*

# Démarrer PostgreSQL si nécessaire
Start-Service postgresql-x64-15  # Ajustez le nom selon votre version
```

### Erreur : "Module not found"

**Solution** : Réinstallez les dépendances

```bash
rm -rf node_modules
npm install
```

### Erreur : "Prisma Client did not initialize yet"

**Solution** : Générez le client Prisma

```bash
npm run db:generate
```

### Erreur lors du seed : "Unique constraint failed"

**Solution** : Réinitialisez la base de données

```bash
npm run db:reset
# Puis répondez "yes" pour confirmer
```

---

## 📁 Structure du Projet

```
clinique/
├── prisma/
│   ├── schema.prisma          # Schéma de base de données
│   ├── seed.ts               # Données initiales
│   └── migrations/           # Migrations SQL
├── src/
│   ├── app/                  # Pages Next.js (App Router)
│   ├── components/           # Composants React
│   ├── lib/                  # Utilitaires
│   │   └── prisma.ts        # Client Prisma
│   └── modules/             # Logique métier par module
├── public/                   # Fichiers statiques
├── .env                      # Variables d'environnement (à créer)
├── package.json
└── README.md
```

---

## 🎯 Prochaines Étapes

Maintenant que le projet est configuré :

1. **Explorez la base de données** avec Prisma Studio
2. **Consultez la documentation** :
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture technique
   - [PLAN_DEVELOPPEMENT.md](./PLAN_DEVELOPPEMENT.md) - Plan de développement
   - [ETAT_AVANCEMENT.md](./ETAT_AVANCEMENT.md) - État d'avancement
3. **Commencez le développement** selon le plan de la semaine 1

---

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation TypeScript](https://www.typescriptlang.org/docs)

---

## 💬 Support

Pour toute question :
- Consultez la documentation dans le dossier du projet
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

---

**Bon développement ! 🚀**
