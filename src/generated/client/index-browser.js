
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.2.1
 * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
 */
Prisma.prismaVersion = {
  client: "6.2.1",
  engine: "4123509d24aa4dede1e864b46351bf2790323b69"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  nom: 'nom',
  prenom: 'prenom',
  telephone: 'telephone',
  photo: 'photo',
  actif: 'actif',
  roleId: 'roleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  nom: 'nom',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  nom: 'nom',
  description: 'description',
  module: 'module',
  action: 'action',
  createdAt: 'createdAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  module: 'module',
  entityType: 'entityType',
  entityId: 'entityId',
  details: 'details',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.CompteComptableScalarFieldEnum = {
  id: 'id',
  numero: 'numero',
  libelle: 'libelle',
  classe: 'classe',
  type: 'type',
  sens: 'sens',
  actif: 'actif',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JournalScalarFieldEnum = {
  id: 'id',
  code: 'code',
  libelle: 'libelle',
  type: 'type',
  actif: 'actif',
  createdAt: 'createdAt'
};

exports.Prisma.ExerciceComptableScalarFieldEnum = {
  id: 'id',
  annee: 'annee',
  dateDebut: 'dateDebut',
  dateFin: 'dateFin',
  cloture: 'cloture',
  createdAt: 'createdAt'
};

exports.Prisma.EcritureComptableScalarFieldEnum = {
  id: 'id',
  journalId: 'journalId',
  compteId: 'compteId',
  exerciceId: 'exerciceId',
  dateEcriture: 'dateEcriture',
  libelle: 'libelle',
  debit: 'debit',
  credit: 'credit',
  pieceRef: 'pieceRef',
  centreAnalytiqueId: 'centreAnalytiqueId',
  valide: 'valide',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CentreAnalytiqueScalarFieldEnum = {
  id: 'id',
  code: 'code',
  libelle: 'libelle',
  type: 'type',
  actif: 'actif',
  createdAt: 'createdAt'
};

exports.Prisma.BudgetScalarFieldEnum = {
  id: 'id',
  exerciceId: 'exerciceId',
  compte: 'compte',
  libelle: 'libelle',
  montant: 'montant',
  type: 'type',
  mois: 'mois',
  createdAt: 'createdAt'
};

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  numeroPatient: 'numeroPatient',
  nom: 'nom',
  prenom: 'prenom',
  dateNaissance: 'dateNaissance',
  sexe: 'sexe',
  telephone: 'telephone',
  email: 'email',
  adresse: 'adresse',
  ville: 'ville',
  profession: 'profession',
  situationMatrimoniale: 'situationMatrimoniale',
  assureur: 'assureur',
  numeroAssure: 'numeroAssure',
  tauxCouverture: 'tauxCouverture',
  contactUrgenceNom: 'contactUrgenceNom',
  contactUrgenceTel: 'contactUrgenceTel',
  contactUrgenceLien: 'contactUrgenceLien',
  photo: 'photo',
  actif: 'actif',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AntecedentScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  type: 'type',
  description: 'description',
  date: 'date',
  createdAt: 'createdAt'
};

exports.Prisma.AllergieScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  type: 'type',
  allergene: 'allergene',
  severite: 'severite',
  reaction: 'reaction',
  createdAt: 'createdAt'
};

exports.Prisma.VaccinationScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  vaccin: 'vaccin',
  dateVaccin: 'dateVaccin',
  rappel: 'rappel',
  lot: 'lot',
  createdAt: 'createdAt'
};

exports.Prisma.RendezVousScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  medecinId: 'medecinId',
  dateHeure: 'dateHeure',
  duree: 'duree',
  motif: 'motif',
  statut: 'statut',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConsultationScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  medecinId: 'medecinId',
  dateConsultation: 'dateConsultation',
  motifConsultation: 'motifConsultation',
  anamnese: 'anamnese',
  examenClinique: 'examenClinique',
  diagnostic: 'diagnostic',
  planTraitement: 'planTraitement',
  poids: 'poids',
  taille: 'taille',
  temperature: 'temperature',
  tensionSystolique: 'tensionSystolique',
  tensionDiastolique: 'tensionDiastolique',
  frequenceCardiaque: 'frequenceCardiaque',
  saturationOxygene: 'saturationOxygene',
  donneesSpecialite: 'donneesSpecialite',
  factureId: 'factureId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PrescriptionScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  medicament: 'medicament',
  dosage: 'dosage',
  forme: 'forme',
  posologie: 'posologie',
  duree: 'duree',
  quantite: 'quantite',
  instructions: 'instructions',
  createdAt: 'createdAt'
};

exports.Prisma.NomenclatureActeScalarFieldEnum = {
  id: 'id',
  code: 'code',
  libelle: 'libelle',
  specialite: 'specialite',
  tarif: 'tarif',
  duree: 'duree',
  actif: 'actif',
  createdAt: 'createdAt'
};

exports.Prisma.ActeRealiseScalarFieldEnum = {
  id: 'id',
  consultationId: 'consultationId',
  acteId: 'acteId',
  quantite: 'quantite',
  tarif: 'tarif',
  montant: 'montant',
  notes: 'notes',
  createdAt: 'createdAt'
};

exports.Prisma.ResultatExamenScalarFieldEnum = {
  id: 'id',
  acteRealiseId: 'acteRealiseId',
  valeurs: 'valeurs',
  conclusion: 'conclusion',
  compteRendu: 'compteRendu',
  images: 'images',
  dateExamen: 'dateExamen',
  validePar: 'validePar',
  dateValidation: 'dateValidation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MedicamentScalarFieldEnum = {
  id: 'id',
  codeANIS: 'codeANIS',
  dci: 'dci',
  nomCommercial: 'nomCommercial',
  forme: 'forme',
  dosage: 'dosage',
  fabricant: 'fabricant',
  prixAchat: 'prixAchat',
  prixVente: 'prixVente',
  stockMinimum: 'stockMinimum',
  actif: 'actif',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FournisseurScalarFieldEnum = {
  id: 'id',
  nom: 'nom',
  code: 'code',
  contact: 'contact',
  email: 'email',
  telephone: 'telephone',
  adresse: 'adresse',
  ninea: 'ninea',
  rccm: 'rccm',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommandePharmacieScalarFieldEnum = {
  id: 'id',
  numeroCommande: 'numeroCommande',
  fournisseurId: 'fournisseurId',
  dateCommande: 'dateCommande',
  dateLivraison: 'dateLivraison',
  montantTotal: 'montantTotal',
  statut: 'statut',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LigneCommandePharmacieScalarFieldEnum = {
  id: 'id',
  commandeId: 'commandeId',
  medicamentId: 'medicamentId',
  quantiteCommandee: 'quantiteCommandee',
  quantiteRecue: 'quantiteRecue',
  prixUnitaire: 'prixUnitaire',
  createdAt: 'createdAt'
};

exports.Prisma.StockScalarFieldEnum = {
  id: 'id',
  medicamentId: 'medicamentId',
  lot: 'lot',
  datePeremption: 'datePeremption',
  quantite: 'quantite',
  emplacement: 'emplacement',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MouvementStockScalarFieldEnum = {
  id: 'id',
  medicamentId: 'medicamentId',
  type: 'type',
  quantite: 'quantite',
  motif: 'motif',
  reference: 'reference',
  utilisateur: 'utilisateur',
  createdAt: 'createdAt'
};

exports.Prisma.DispensationScalarFieldEnum = {
  id: 'id',
  medicamentId: 'medicamentId',
  patientId: 'patientId',
  quantite: 'quantite',
  prescription: 'prescription',
  pharmacien: 'pharmacien',
  createdAt: 'createdAt'
};

exports.Prisma.FactureScalarFieldEnum = {
  id: 'id',
  numeroFacture: 'numeroFacture',
  patientId: 'patientId',
  dateFacture: 'dateFacture',
  dateEcheance: 'dateEcheance',
  montantHT: 'montantHT',
  montantTVA: 'montantTVA',
  montantTTC: 'montantTTC',
  partAssurance: 'partAssurance',
  partPatient: 'partPatient',
  statut: 'statut',
  ecritureComptableId: 'ecritureComptableId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LigneFactureScalarFieldEnum = {
  id: 'id',
  factureId: 'factureId',
  designation: 'designation',
  quantite: 'quantite',
  prixUnitaire: 'prixUnitaire',
  montant: 'montant',
  createdAt: 'createdAt'
};

exports.Prisma.PaiementScalarFieldEnum = {
  id: 'id',
  factureId: 'factureId',
  datePaiement: 'datePaiement',
  montant: 'montant',
  modePaiement: 'modePaiement',
  reference: 'reference',
  notes: 'notes',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.LitScalarFieldEnum = {
  id: 'id',
  numero: 'numero',
  chambre: 'chambre',
  service: 'service',
  categorie: 'categorie',
  prixJournalier: 'prixJournalier',
  occupe: 'occupe',
  createdAt: 'createdAt'
};

exports.Prisma.HospitalisationScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  litId: 'litId',
  dateEntree: 'dateEntree',
  dateSortie: 'dateSortie',
  motif: 'motif',
  diagnosticEntree: 'diagnosticEntree',
  diagnosticSortie: 'diagnosticSortie',
  statut: 'statut',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ObservationInfirmierScalarFieldEnum = {
  id: 'id',
  hospitalisationId: 'hospitalisationId',
  infirmierId: 'infirmierId',
  pressionArterielle: 'pressionArterielle',
  temperature: 'temperature',
  note: 'note',
  dateHeure: 'dateHeure'
};

exports.Prisma.InterventionScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  chirurgienId: 'chirurgienId',
  anesthesisteId: 'anesthesisteId',
  typeIntervention: 'typeIntervention',
  dateHeure: 'dateHeure',
  salle: 'salle',
  statut: 'statut',
  protocoleOp: 'protocoleOp',
  typeAnesthesie: 'typeAnesthesie',
  duree: 'duree',
  createdAt: 'createdAt'
};

exports.Prisma.DossierMaterniteScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  dateDebutGrossesse: 'dateDebutGrossesse',
  parite: 'parite',
  gestite: 'gestite',
  groupageRhesus: 'groupageRhesus',
  examensPrenataux: 'examensPrenataux',
  accouchement: 'accouchement',
  createdAt: 'createdAt'
};

exports.Prisma.NouveauNeScalarFieldEnum = {
  id: 'id',
  dossierMaterniteId: 'dossierMaterniteId',
  nom: 'nom',
  prenom: 'prenom',
  dateHeureNaissance: 'dateHeureNaissance',
  sexe: 'sexe',
  poids: 'poids',
  scoreApgar: 'scoreApgar',
  createdAt: 'createdAt'
};

exports.Prisma.ArticleLogistiqueScalarFieldEnum = {
  id: 'id',
  designation: 'designation',
  categorie: 'categorie',
  famille: 'famille',
  uniteMesure: 'uniteMesure',
  stockAlerte: 'stockAlerte',
  stockActuel: 'stockActuel',
  createdAt: 'createdAt'
};

exports.Prisma.MouvementLogistiqueScalarFieldEnum = {
  id: 'id',
  articleId: 'articleId',
  type: 'type',
  quantite: 'quantite',
  serviceDestinataire: 'serviceDestinataire',
  motif: 'motif',
  utilisateur: 'utilisateur',
  createdAt: 'createdAt'
};

exports.Prisma.DocumentGEDScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  titre: 'titre',
  type: 'type',
  url: 'url',
  module: 'module',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.EmployeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  matricule: 'matricule',
  nom: 'nom',
  prenom: 'prenom',
  dateNaissance: 'dateNaissance',
  sexe: 'sexe',
  telephone: 'telephone',
  email: 'email',
  adresse: 'adresse',
  categorie: 'categorie',
  fonction: 'fonction',
  specialite: 'specialite',
  dateEmbauche: 'dateEmbauche',
  typeContrat: 'typeContrat',
  salaireBrut: 'salaireBrut',
  actif: 'actif',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CongeScalarFieldEnum = {
  id: 'id',
  employeId: 'employeId',
  type: 'type',
  dateDebut: 'dateDebut',
  dateFin: 'dateFin',
  nbJours: 'nbJours',
  motif: 'motif',
  statut: 'statut',
  createdAt: 'createdAt'
};

exports.Prisma.BulletinPaieScalarFieldEnum = {
  id: 'id',
  employeId: 'employeId',
  periode: 'periode',
  dateEmission: 'dateEmission',
  salaireBase: 'salaireBase',
  totalPrimes: 'totalPrimes',
  totalRetenues: 'totalRetenues',
  salaireNet: 'salaireNet',
  statut: 'statut'
};

exports.Prisma.LigneBulletinScalarFieldEnum = {
  id: 'id',
  bulletinId: 'bulletinId',
  libelle: 'libelle',
  type: 'type',
  base: 'base',
  taux: 'taux',
  montant: 'montant'
};

exports.Prisma.PlanningScalarFieldEnum = {
  id: 'id',
  employeId: 'employeId',
  date: 'date',
  heureDebut: 'heureDebut',
  heureFin: 'heureFin',
  type: 'type',
  createdAt: 'createdAt'
};

exports.Prisma.EquipementScalarFieldEnum = {
  id: 'id',
  code: 'code',
  nom: 'nom',
  type: 'type',
  marque: 'marque',
  modele: 'modele',
  serie: 'serie',
  dateAchat: 'dateAchat',
  dateDerniereMaintenace: 'dateDerniereMaintenace',
  dateProchaineMaintenance: 'dateProchaineMaintenance',
  statut: 'statut',
  localisation: 'localisation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TicketMaintenanceScalarFieldEnum = {
  id: 'id',
  equipementId: 'equipementId',
  type: 'type',
  priorite: 'priorite',
  objet: 'objet',
  description: 'description',
  statut: 'statut',
  intervenant: 'intervenant',
  dateResolution: 'dateResolution',
  coutEstime: 'coutEstime',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EvenementIndesirableScalarFieldEnum = {
  id: 'id',
  dateEvenement: 'dateEvenement',
  service: 'service',
  type: 'type',
  gravite: 'gravite',
  description: 'description',
  mesuresPrises: 'mesuresPrises',
  statut: 'statut',
  declaréPar: 'declaréPar',
  patientId: 'patientId',
  createdAt: 'createdAt'
};

exports.Prisma.AuditQualiteScalarFieldEnum = {
  id: 'id',
  dateAudit: 'dateAudit',
  service: 'service',
  auditeur: 'auditeur',
  type: 'type',
  score: 'score',
  observations: 'observations',
  createdAt: 'createdAt'
};

exports.Prisma.ConfigurationScalarFieldEnum = {
  id: 'id',
  cle: 'cle',
  valeur: 'valeur',
  type: 'type',
  module: 'module',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  User: 'User',
  Role: 'Role',
  Permission: 'Permission',
  AuditLog: 'AuditLog',
  CompteComptable: 'CompteComptable',
  Journal: 'Journal',
  ExerciceComptable: 'ExerciceComptable',
  EcritureComptable: 'EcritureComptable',
  CentreAnalytique: 'CentreAnalytique',
  Budget: 'Budget',
  Patient: 'Patient',
  Antecedent: 'Antecedent',
  Allergie: 'Allergie',
  Vaccination: 'Vaccination',
  RendezVous: 'RendezVous',
  Consultation: 'Consultation',
  Prescription: 'Prescription',
  NomenclatureActe: 'NomenclatureActe',
  ActeRealise: 'ActeRealise',
  ResultatExamen: 'ResultatExamen',
  Medicament: 'Medicament',
  Fournisseur: 'Fournisseur',
  CommandePharmacie: 'CommandePharmacie',
  LigneCommandePharmacie: 'LigneCommandePharmacie',
  Stock: 'Stock',
  MouvementStock: 'MouvementStock',
  Dispensation: 'Dispensation',
  Facture: 'Facture',
  LigneFacture: 'LigneFacture',
  Paiement: 'Paiement',
  Lit: 'Lit',
  Hospitalisation: 'Hospitalisation',
  ObservationInfirmier: 'ObservationInfirmier',
  Intervention: 'Intervention',
  DossierMaternite: 'DossierMaternite',
  NouveauNe: 'NouveauNe',
  ArticleLogistique: 'ArticleLogistique',
  MouvementLogistique: 'MouvementLogistique',
  DocumentGED: 'DocumentGED',
  Employe: 'Employe',
  Conge: 'Conge',
  BulletinPaie: 'BulletinPaie',
  LigneBulletin: 'LigneBulletin',
  Planning: 'Planning',
  Equipement: 'Equipement',
  TicketMaintenance: 'TicketMaintenance',
  EvenementIndesirable: 'EvenementIndesirable',
  AuditQualite: 'AuditQualite',
  Configuration: 'Configuration'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
