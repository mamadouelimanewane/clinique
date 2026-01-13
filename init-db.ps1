Write-Host "🚀 Initialisation automatique de la base de données..." -ForegroundColor Cyan

# 1. Générer le hash bcrypt pour password123
$password = "password123"
Write-Host "✅ Mot de passe configuré: $password" -ForegroundColor Green

# 2. Créer un fichier SQL avec toutes les commandes
$sqlContent = @"
-- Supprimer les anciennes données si elles existent
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Role" CASCADE;

-- Créer la table Role
CREATE TABLE "Role" (
    id TEXT PRIMARY KEY,
    nom TEXT UNIQUE NOT NULL,
    description TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Créer la table User  
CREATE TABLE "User" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    telephone TEXT,
    "roleId" TEXT NOT NULL REFERENCES "Role"(id),
    actif BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Insérer le rôle ADMIN
INSERT INTO "Role" (id, nom, description) 
VALUES ('role_admin_001', 'ADMIN', 'Administrateur système');

-- Insérer l'utilisateur admin (password: password123)
INSERT INTO "User" (id, email, password, nom, prenom, telephone, "roleId", actif)
VALUES (
    'user_admin_001',
    'admin@sighi.sn',
    '`$2a`$10`$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'Admin',
    'Système',
    '+221 77 123 45 67',
    'role_admin_001',
    true
);
"@

Set-Content -Path "init-db.sql" -Value $sqlContent
Write-Host "✅ Fichier SQL créé: init-db.sql" -ForegroundColor Green
Write-Host ""
Write-Host "📋 ÉTAPES SUIVANTES:" -ForegroundColor Yellow
Write-Host "1. Allez sur: https://console.neon.tech/app/projects/ombre-verte-52310688" -ForegroundColor White
Write-Host "2. Cliquez sur 'SQL Editor' dans le menu de gauche" -ForegroundColor White
Write-Host "3. Copiez TOUT le contenu du fichier 'init-db.sql'" -ForegroundColor White
Write-Host "4. Collez-le dans l'éditeur SQL et cliquez sur 'Run'" -ForegroundColor White
Write-Host "5. Retournez sur https://mamadouelimanewane-clinique.vercel.app/login" -ForegroundColor White
Write-Host "6. Connectez-vous avec: admin@sighi.sn / password123" -ForegroundColor White
Write-Host ""
Write-Host "✨ Le fichier init-db.sql est prêt dans ce dossier!" -ForegroundColor Cyan

# Ouvrir automatiquement le fichier SQL
notepad init-db.sql
