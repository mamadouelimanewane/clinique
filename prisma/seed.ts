import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Début du seeding de la base de données...')
    const today = new Date()

    // ============================================================================
    // 1. RÔLES ET PERMISSIONS
    // ============================================================================
    console.log('📝 Création des rôles et permissions...')

    const adminRole = await prisma.role.upsert({
        where: { nom: 'ADMIN' },
        update: {},
        create: {
            nom: 'ADMIN',
            description: 'Administrateur système avec tous les droits',
        },
    })

    const medecinRole = await prisma.role.upsert({
        where: { nom: 'MEDECIN' },
        update: {},
        create: {
            nom: 'MEDECIN',
            description: 'Médecin avec accès au module médical',
        },
    })

    const comptableRole = await prisma.role.upsert({
        where: { nom: 'COMPTABLE' },
        update: {},
        create: {
            nom: 'COMPTABLE',
            description: 'Comptable avec accès au module comptabilité',
        },
    })

    const pharmacienRole = await prisma.role.upsert({
        where: { nom: 'PHARMACIEN' },
        update: {},
        create: {
            nom: 'PHARMACIEN',
            description: 'Pharmacien avec accès au module pharmacie',
        },
    })

    const receptionnisteRole = await prisma.role.upsert({
        where: { nom: 'RECEPTIONNISTE' },
        update: {},
        create: {
            nom: 'RECEPTIONNISTE',
            description: 'Réceptionniste avec accès limité',
        },
    })

    // ============================================================================
    // 2. UTILISATEURS PAR DÉFAUT
    // ============================================================================
    console.log('👥 Création des utilisateurs par défaut...')

    const hashedPassword = await bcrypt.hash('password123', 10)

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@sighi.sn' },
        update: {},
        create: {
            email: 'admin@sighi.sn',
            password: hashedPassword,
            nom: 'Admin',
            prenom: 'Système',
            telephone: '+221 77 123 45 67',
            roleId: adminRole.id,
            actif: true,
        },
    })

    const medecinUser = await prisma.user.upsert({
        where: { email: 'dr.diop@sighi.sn' },
        update: {},
        create: {
            email: 'dr.diop@sighi.sn',
            password: hashedPassword,
            nom: 'Diop',
            prenom: 'Amadou',
            telephone: '+221 77 234 56 78',
            roleId: medecinRole.id,
            actif: true,
        },
    })

    const comptableUser = await prisma.user.upsert({
        where: { email: 'comptable@sighi.sn' },
        update: {},
        create: {
            email: 'comptable@sighi.sn',
            password: hashedPassword,
            nom: 'Ndiaye',
            prenom: 'Fatou',
            telephone: '+221 77 345 67 89',
            roleId: comptableRole.id,
            actif: true,
        },
    })

    // ============================================================================
    // 3. PLAN COMPTABLE SYSCOA (Comptes principaux)
    // ============================================================================
    console.log('💰 Création du plan comptable SYSCOA...')

    const comptes = [
        // CLASSE 1 - COMPTES DE RESSOURCES DURABLES
        { numero: '10', libelle: 'Capital', classe: 1, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '101', libelle: 'Capital social', classe: 1, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '12', libelle: 'Résultat de l\'exercice', classe: 1, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '16', libelle: 'Emprunts et dettes assimilées', classe: 1, type: 'PASSIF', sens: 'CREDIT' },

        // CLASSE 2 - COMPTES D'ACTIF IMMOBILISÉ
        { numero: '21', libelle: 'Immobilisations incorporelles', classe: 2, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '22', libelle: 'Terrains', classe: 2, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '23', libelle: 'Bâtiments', classe: 2, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '24', libelle: 'Matériel', classe: 2, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '2441', libelle: 'Matériel médical', classe: 2, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '2444', libelle: 'Matériel de bureau', classe: 2, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '28', libelle: 'Amortissements', classe: 2, type: 'ACTIF', sens: 'CREDIT' },

        // CLASSE 3 - COMPTES DE STOCKS
        { numero: '31', libelle: 'Marchandises', classe: 3, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '32', libelle: 'Matières premières et fournitures', classe: 3, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '321', libelle: 'Médicaments', classe: 3, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '322', libelle: 'Consommables médicaux', classe: 3, type: 'ACTIF', sens: 'DEBIT' },

        // CLASSE 4 - COMPTES DE TIERS
        { numero: '40', libelle: 'Fournisseurs et comptes rattachés', classe: 4, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '401', libelle: 'Fournisseurs', classe: 4, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '41', libelle: 'Clients et comptes rattachés', classe: 4, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '411', libelle: 'Clients', classe: 4, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '4111', libelle: 'Patients', classe: 4, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '4112', libelle: 'Assurances et mutuelles', classe: 4, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '42', libelle: 'Personnel', classe: 4, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '421', libelle: 'Personnel - Rémunérations dues', classe: 4, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '43', libelle: 'Organismes sociaux', classe: 4, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '44', libelle: 'État et collectivités publiques', classe: 4, type: 'PASSIF', sens: 'CREDIT' },
        { numero: '445', libelle: 'État - TVA', classe: 4, type: 'PASSIF', sens: 'CREDIT' },

        // CLASSE 5 - COMPTES DE TRÉSORERIE
        { numero: '52', libelle: 'Banques', classe: 5, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '521', libelle: 'Banques locales', classe: 5, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '57', libelle: 'Caisse', classe: 5, type: 'ACTIF', sens: 'DEBIT' },
        { numero: '571', libelle: 'Caisse principale', classe: 5, type: 'ACTIF', sens: 'DEBIT' },

        // CLASSE 6 - COMPTES DE CHARGES
        { numero: '60', libelle: 'Achats et variations de stocks', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '601', libelle: 'Achats de marchandises', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '6011', libelle: 'Achats de médicaments', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '602', libelle: 'Achats de matières premières', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '61', libelle: 'Transports', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '62', libelle: 'Services extérieurs A', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '63', libelle: 'Services extérieurs B', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '64', libelle: 'Impôts et taxes', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '66', libelle: 'Charges de personnel', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '661', libelle: 'Salaires', classe: 6, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '664', libelle: 'Charges sociales', classe: 6, type: 'CHARGE', sens: 'DEBIT' },

        // CLASSE 7 - COMPTES DE PRODUITS
        { numero: '70', libelle: 'Ventes', classe: 7, type: 'PRODUIT', sens: 'CREDIT' },
        { numero: '701', libelle: 'Ventes de produits finis', classe: 7, type: 'PRODUIT', sens: 'CREDIT' },
        { numero: '7011', libelle: 'Consultations médicales', classe: 7, type: 'PRODUIT', sens: 'CREDIT' },
        { numero: '7012', libelle: 'Actes médicaux', classe: 7, type: 'PRODUIT', sens: 'CREDIT' },
        { numero: '7013', libelle: 'Ventes de médicaments', classe: 7, type: 'PRODUIT', sens: 'CREDIT' },
        { numero: '7014', libelle: 'Examens et analyses', classe: 7, type: 'PRODUIT', sens: 'CREDIT' },
        { numero: '702', libelle: 'Ventes de marchandises', classe: 7, type: 'PRODUIT', sens: 'CREDIT' },

        // CLASSE 8 - COMPTES DES AUTRES CHARGES ET PRODUITS
        { numero: '81', libelle: 'Valeurs comptables des cessions', classe: 8, type: 'CHARGE', sens: 'DEBIT' },
        { numero: '82', libelle: 'Produits des cessions', classe: 8, type: 'PRODUIT', sens: 'CREDIT' },
    ]

    for (const compte of comptes) {
        await prisma.compteComptable.upsert({
            where: { numero: compte.numero },
            update: {},
            create: compte,
        })
    }

    // ============================================================================
    // 4. JOURNAUX COMPTABLES
    // ============================================================================
    console.log('📚 Création des journaux comptables...')

    const journaux = [
        { code: 'AC', libelle: 'Journal des Achats', type: 'ACHATS' },
        { code: 'VE', libelle: 'Journal des Ventes', type: 'VENTES' },
        { code: 'BQ', libelle: 'Journal de Banque', type: 'BANQUE' },
        { code: 'CA', libelle: 'Journal de Caisse', type: 'CAISSE' },
        { code: 'OD', libelle: 'Opérations Diverses', type: 'OD' },
    ]

    for (const journal of journaux) {
        await prisma.journal.upsert({
            where: { code: journal.code },
            update: {},
            create: journal,
        })
    }

    // ============================================================================
    // 5. EXERCICE COMPTABLE
    // ============================================================================
    console.log('📅 Création de l\'exercice comptable...')

    await prisma.exerciceComptable.upsert({
        where: { annee: 2026 },
        update: {},
        create: {
            annee: 2026,
            dateDebut: new Date('2026-01-01'),
            dateFin: new Date('2026-12-31'),
            cloture: false,
        },
    })

    // ============================================================================
    // 6. CENTRES ANALYTIQUES
    // ============================================================================
    console.log('🏢 Création des centres analytiques...')

    const centres = [
        { code: 'CONS', libelle: 'Consultations', type: 'SERVICE' },
        { code: 'PHAR', libelle: 'Pharmacie', type: 'SERVICE' },
        { code: 'LABO', libelle: 'Laboratoire', type: 'SERVICE' },
        { code: 'RADIO', libelle: 'Radiologie', type: 'SERVICE' },
        { code: 'DENT', libelle: 'Dentaire', type: 'SERVICE' },
    ]

    for (const centre of centres) {
        await prisma.centreAnalytique.upsert({
            where: { code: centre.code },
            update: {},
            create: centre,
        })
    }

    // ============================================================================
    // 7. NOMENCLATURE DES ACTES
    // ============================================================================
    console.log('🩺 Création de la nomenclature des actes...')

    const actes = [
        { code: 'CONS001', libelle: 'Consultation générale', specialite: 'GENERALISTE', tarif: 15000, duree: 30 },
        { code: 'CONS002', libelle: 'Consultation spécialisée', specialite: 'SPECIALISTE', tarif: 25000, duree: 45 },
        { code: 'DENT001', libelle: 'Détartrage', specialite: 'DENTAIRE', tarif: 20000, duree: 30 },
        { code: 'DENT002', libelle: 'Extraction dentaire', specialite: 'DENTAIRE', tarif: 15000, duree: 20 },
        { code: 'DENT003', libelle: 'Plombage', specialite: 'DENTAIRE', tarif: 25000, duree: 45 },
        { code: 'RADIO001', libelle: 'Radiographie thorax', specialite: 'RADIOLOGIE', tarif: 30000, duree: 15 },
        { code: 'RADIO002', libelle: 'Échographie abdominale', specialite: 'RADIOLOGIE', tarif: 40000, duree: 30 },
        { code: 'LABO001', libelle: 'Numération formule sanguine', specialite: 'LABORATOIRE', tarif: 5000, duree: 60 },
        { code: 'LABO002', libelle: 'Glycémie', specialite: 'LABORATOIRE', tarif: 3000, duree: 30 },
    ]

    for (const acte of actes) {
        await prisma.nomenclatureActe.upsert({
            where: { code: acte.code },
            update: {},
            create: acte,
        })
    }

    // ============================================================================
    // 8. MÉDICAMENTS (Exemples)
    // ============================================================================
    console.log('💊 Création des médicaments...')

    const medicaments = [
        {
            codeANIS: 'ANIS001',
            dci: 'Paracétamol',
            nomCommercial: 'Doliprane 1000mg',
            forme: 'Comprimé',
            dosage: '1000mg',
            fabricant: 'Sanofi',
            prixAchat: 500,
            prixVente: 750,
            stockMinimum: 50,
        },
        {
            codeANIS: 'ANIS002',
            dci: 'Amoxicilline',
            nomCommercial: 'Amoxil 500mg',
            forme: 'Gélule',
            dosage: '500mg',
            fabricant: 'GSK',
            prixAchat: 1000,
            prixVente: 1500,
            stockMinimum: 30,
        },
        {
            codeANIS: 'ANIS003',
            dci: 'Ibuprofène',
            nomCommercial: 'Advil 400mg',
            forme: 'Comprimé',
            dosage: '400mg',
            fabricant: 'Pfizer',
            prixAchat: 600,
            prixVente: 900,
            stockMinimum: 40,
        },
    ]

    for (const med of medicaments) {
        await prisma.medicament.upsert({
            where: { codeANIS: med.codeANIS },
            update: {},
            create: med,
        })
    }

    // ============================================================================
    // 9. CONFIGURATION SYSTÈME
    // ============================================================================
    console.log('⚙️ Création de la configuration système...')

    const configs = [
        { cle: 'NOM_CLINIQUE', valeur: 'Clinique Moderne de Dakar', type: 'STRING', module: 'GENERAL', description: 'Nom de la clinique' },
        { cle: 'ADRESSE', valeur: 'Avenue Cheikh Anta Diop, Dakar', type: 'STRING', module: 'GENERAL', description: 'Adresse de la clinique' },
        { cle: 'TELEPHONE', valeur: '+221 33 123 45 67', type: 'STRING', module: 'GENERAL', description: 'Téléphone principal' },
        { cle: 'EMAIL', valeur: 'contact@clinique.sn', type: 'STRING', module: 'GENERAL', description: 'Email principal' },
        { cle: 'TVA_TAUX', valeur: '18', type: 'NUMBER', module: 'COMPTABILITE', description: 'Taux de TVA en %' },
        { cle: 'DEVISE', valeur: 'XOF', type: 'STRING', module: 'COMPTABILITE', description: 'Devise (Franc CFA)' },
        { cle: 'DUREE_RDV_DEFAUT', valeur: '30', type: 'NUMBER', module: 'MEDICAL', description: 'Durée par défaut d\'un RDV en minutes' },
    ]

    for (const config of configs) {
        await prisma.configuration.upsert({
            where: { cle: config.cle },
            update: {},
            create: config,
        })
    }

    // ============================================================================
    // 10. LITS ET CHAMBRES
    // ============================================================================
    console.log('🛌 Création des lits d\'hospitalisation...')

    const lits = [
        { numero: '101', chambre: 'Chambre 1', service: 'MEDECINE', categorie: 'VIP', prixJournalier: 50000 },
        { numero: '102', chambre: 'Chambre 1', service: 'MEDECINE', categorie: 'VIP', prixJournalier: 50000 },
        { numero: '201', chambre: 'Chambre A', service: 'CHIRURGIE', categorie: 'STANDARD', prixJournalier: 25000 },
        { numero: '202', chambre: 'Chambre A', service: 'CHIRURGIE', categorie: 'STANDARD', prixJournalier: 25000 },
        { numero: 'M01', chambre: 'VIP Maternité', service: 'MATERNITE', categorie: 'VIP', prixJournalier: 75000 },
    ]

    for (const lit of lits) {
        await prisma.lit.upsert({
            where: { numero: lit.numero },
            update: {},
            create: lit,
        })
    }

    // ============================================================================
    // 11. ARTICLES LOGISTIQUES
    // ============================================================================
    console.log('📦 Création des articles logistiques...')

    const articles = [
        { designation: 'Réactif Glycémie (Kit 100)', categorie: 'REACTIF', uniteMesure: 'Boite', stockAlerte: 10, stockActuel: 15 },
        { designation: 'Gants Stériles T7', categorie: 'CONSOMMABLE_CHIR', uniteMesure: 'Unité', stockAlerte: 50, stockActuel: 100 },
        { designation: 'Fil de suture 3/0', categorie: 'CONSOMMABLE_CHIR', uniteMesure: 'Unité', stockAlerte: 20, stockActuel: 40 },
    ]

    for (const art of articles) {
        await prisma.articleLogistique.create({ data: art })
    }

    // ============================================================================
    // 12. PATIENTS RÉELS (Exemples)
    // ============================================================================
    console.log('👤 Création des patients de test...')

    const patient1 = await prisma.patient.upsert({
        where: { numeroPatient: 'PAT-2026-0001' },
        update: {},
        create: {
            numeroPatient: 'PAT-2026-0001',
            nom: 'Sow',
            prenom: 'Moussa',
            dateNaissance: new Date('1985-05-15'),
            sexe: 'M',
            telephone: '+221 77 555 11 22',
            email: 'moussa.sow@email.sn',
            adresse: 'Dakar Plateau',
            profession: 'Ingénieur',
            situationMatrimoniale: 'MARIE',
            assureur: 'ASKIA',
            tauxCouverture: 80,
        },
    })

    const patient2 = await prisma.patient.upsert({
        where: { numeroPatient: 'PAT-2026-0002' },
        update: {},
        create: {
            numeroPatient: 'PAT-2026-0002',
            nom: 'Fall',
            prenom: 'Mariama',
            dateNaissance: new Date('1992-08-22'),
            sexe: 'F',
            telephone: '+221 70 444 33 22',
            email: 'mariama.fall@email.sn',
            adresse: 'Mermoz',
            profession: 'Enseignante',
            situationMatrimoniale: 'CELIBATAIRE',
            assureur: 'IPM DOUANES',
            tauxCouverture: 100,
        },
    })

    // ============================================================================
    // 13. RENDEZ-VOUS & CONSULTATIONS
    // ============================================================================
    console.log('📅 Création des rdv et consultations...')

    const rdv1 = await prisma.rendezVous.create({
        data: {
            patientId: patient1.id,
            medecinId: medecinUser.id,
            dateHeure: new Date(new Date().setHours(9, 0, 0, 0)),
            motif: 'Fièvre persistante et céphalées',
            statut: 'TERMINE',
        },
    })

    const rdv2 = await prisma.rendezVous.create({
        data: {
            patientId: patient2.id,
            medecinId: medecinUser.id,
            dateHeure: new Date(new Date().setHours(14, 30, 0, 0)),
            motif: 'Suivi post-opératoire',
            statut: 'PLANIFIE',
        },
    })

    const consultation1 = await prisma.consultation.create({
        data: {
            patientId: patient1.id,
            medecinId: medecinUser.id,
            motifConsultation: 'Fièvre persistante depuis 3 jours',
            anamnese: 'Patient se plaint de frissons nocturnes et de maux de tête intenses.',
            examenClinique: 'Tension 13/8, Température 39.2°C, Abdomen souple.',
            diagnostic: 'Suspicion de Paludisme',
            planTraitement: 'Prescription de TDR et traitement antipaludéen.',
            poids: 75,
            temperature: 39.2,
            tensionSystolique: 130,
            tensionDiastolique: 80,
        },
    })

    // ============================================================================
    // 14. FACTURATION & PAIEMENTS
    // ============================================================================
    console.log('💳 Création des factures de test...')

    const facture1 = await prisma.facture.create({
        data: {
            numeroFacture: 'FAC-2026-0001',
            patientId: patient1.id,
            dateFacture: new Date(),
            dateEcheance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            montantHT: 15000,
            montantTTC: 15000,
            partAssurance: 12000,
            partPatient: 3000,
            statut: 'PARTIELLE',
            lignes: {
                create: [
                    { designation: 'Consultation générale', quantite: 1, prixUnitaire: 15000, montant: 15000 },
                ]
            }
        },
    })

    await prisma.paiement.create({
        data: {
            factureId: facture1.id,
            montant: 3000,
            modePaiement: 'MOBILE_MONEY',
            reference: 'WAVE-123456',
            createdById: adminUser.id,
        }
    })

    // ============================================================================
    // 15. PHARMACIE - MOUVEMENTS DE STOCK
    // ============================================================================
    console.log('📦 Création des mouvements de pharmacie...')

    const doliprane = await prisma.medicament.findUnique({ where: { codeANIS: 'ANIS001' } })
    if (doliprane) {
        await prisma.stock.create({
            data: {
                medicamentId: doliprane.id,
                lot: 'LOT-2026-A',
                datePeremption: new Date('2027-12-31'),
                quantite: 100,
                emplacement: 'Rayon A1',
            }
        })

        await prisma.mouvementStock.create({
            data: {
                medicamentId: doliprane.id,
                type: 'ENTREE',
                quantite: 100,
                motif: 'Réception commande fournisseur #CF001',
                utilisateur: 'Pharmacien Central',
            }
        })
    }

    // ============================================================================
    // 16. HOSPITALISATION
    // ============================================================================
    console.log('🏥 Création d\'une hospitalisation active...')

    const litVIP = await prisma.lit.findUnique({ where: { numero: '101' } })
    if (litVIP) {
        await prisma.lit.update({
            where: { id: litVIP.id },
            data: { occupe: true }
        })

        await prisma.hospitalisation.create({
            data: {
                patientId: patient1.id,
                litId: litVIP.id,
                dateEntree: new Date(),
                motif: 'Mise en observation pour syndrome fébrile aigu',
                statut: 'EN_COURS',
                observations: {
                    create: [
                        { note: 'Patient installé, constantes stables sous perfusion.', infirmierId: adminUser.id }
                    ]
                }
            }
        })
    }

    // ============================================================================
    // 17. CHIRURGIE (INTERVENTION)
    // ============================================================================
    console.log('🔪 Création d\'une intervention programmée...')

    await prisma.intervention.create({
        data: {
            patientId: patient2.id,
            chirurgienId: medecinUser.id,
            typeIntervention: 'Appendicectomie',
            dateHeure: new Date('2026-01-15T10:00:00'),
            salle: 'Bloc 1',
            statut: 'PROGRAMMEE',
            typeAnesthesie: 'Générale',
        }
    })

    // ============================================================================
    // 18. GMAO (MAINTENANCE)
    // ============================================================================
    console.log('🛠️ Création des équipements et tickets maintenance...')

    const scanner = await prisma.equipement.create({
        data: {
            code: 'EQU-RAD-001',
            nom: 'Scanner CT 128 Coupes',
            type: 'SCANNER',
            marque: 'GE Healthcare',
            modele: 'Revolution HD',
            localisation: 'Radiologie - Rez-de-chaussée',
            statut: 'OPERATIONNEL',
            dateProchaineMaintenance: new Date('2026-06-30'),
        }
    })

    await prisma.ticketMaintenance.create({
        data: {
            equipementId: scanner.id,
            type: 'PREVENTIF',
            priorite: 'MOYENNE',
            objet: 'Maintenance trimestrielle Q1 2026',
            description: 'Vérification des filtres et calibration du tube.',
            statut: 'OUVERT',
        }
    })

    // ============================================================================
    // 19. HSE & QUALITÉ
    // ============================================================================
    console.log('🛡️ Création des audits qualité...')

    await prisma.auditQualite.create({
        data: {
            service: 'Hospitalisation',
            auditeur: 'Dr. Diop Amadou',
            type: 'HYGIENE',
            score: 85,
            observations: 'Bonne tenue globale. Améliorer le tri des DASRI en zone B.',
        }
    })

    console.log('✅ Seeding terminé avec succès!')

    console.log('\n📊 Résumé:')
    console.log(`- ${await prisma.role.count()} rôles créés`)
    console.log(`- ${await prisma.user.count()} utilisateurs créés`)
    console.log(`- ${await prisma.patient.count()} patients créés`)
    console.log(`- ${await prisma.consultation.count()} consultations créées`)
    console.log(`- ${await prisma.facture.count()} factures créées`)
    console.log(`- ${await prisma.hospitalisation.count()} hospitalisations actives`)
    console.log(`- ${await prisma.equipement.count()} équipements bio-médicaux enregistrés`)
    console.log('\n🔑 Identifiants de connexion:')
    console.log('Admin: admin@sighi.sn / password123')
    console.log('Médecin: dr.diop@sighi.sn / password123')
    console.log('Comptable: comptable@sighi.sn / password123')
}

main()
    .catch((e) => {
        console.error('❌ Erreur lors du seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
