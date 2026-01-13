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
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'Admin',
    'Système',
    '+221 77 123 45 67',
    'role_admin_001',
    true
);
