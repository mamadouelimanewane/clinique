"use client"

import { useState } from "react"
import {
    Users,
    ShieldCheck,
    Key,
    Lock,
    UserPlus,
    Search,
    MoreVertical,
    ShieldAlert,
    Fingerprint,
    Shield,
    Activity,
    Smartphone,
    Globe,
    Eye,
    Edit,
    Trash2,
    CheckCircle2,
    History,
    FileLock2,
    Database,
    AlertTriangle,
    Mail,
    BadgeCheck,
    Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserSecurityDashboard() {
    const [activeTab, setActiveTab] = useState("users")

    // --- Mock Data ---
    const roles = [
        { id: "r1", name: "Super Admin", users: 2, level: "Full Access", color: "bg-red-500" },
        { id: "r2", name: "Médecin Chef", users: 5, level: "Medical & Staff", color: "bg-blue-600" },
        { id: "r3", name: "Infirmier", users: 24, level: "Care & Patient", color: "bg-emerald-500" },
        { id: "r4", name: "Comptable", users: 3, level: "Financial Only", color: "bg-indigo-600" },
    ]

    const users = [
        { id: "u1", name: "Dr. Abdou Rahmane", role: "Médecin Chef", status: "Active", mfa: true, lastLogin: "10 min ago" },
        { id: "u2", name: "Marie Fall", role: "Infirmier", status: "Active", mfa: true, lastLogin: "2h ago" },
        { id: "u3", name: "Moussa Diop", role: "Comptable", status: "Inactive", mfa: false, lastLogin: "5 days ago" },
    ]

    const auditLogs = [
        { id: "l1", user: "u1", action: "Accès Dossier Patient #441", detail: "Consultation antécédents", time: "19:42", ip: "192.168.1.10" },
        { id: "l2", user: "u4", action: "Échec d'authentification", detail: "3 tentatives erronées", time: "19:30", ip: "41.82.12.44" },
        { id: "l3", user: "u1", action: "Modification Privilèges", detail: "Role 'Stagiaire' mis à jour", time: "18:15", ip: "192.168.1.10" },
    ]

    return (
        <div className="flex flex-col gap-6 p-2 md:p-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-slate-900">
                        Sécurité & Administration Système
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Gestion granulaire des accès, RBAC avancé et audit de conformité
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none">
                        <History className="mr-2 h-4 w-4" /> Journal Audit
                    </Button>
                    <Button className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all hover:scale-105">
                        <UserPlus className="mr-2 h-4 w-4" /> Nouvel Utilisateur
                    </Button>
                </div>
            </div>

            {/* Security KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-slate-900 text-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold opacity-60 uppercase tracking-wider">Score Sécurité</p>
                            <h3 className="text-2xl font-bold">94%</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                            <Lock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider">MFA Activé</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">88%</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-red-600/70 uppercase tracking-wider">Alerte Intrusions</p>
                            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100">02</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <BadgeCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">Sessions Actives</p>
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">12</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="users" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100 border p-1 rounded-xl">
                    <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                    <TabsTrigger value="roles">Rôles & Privilèges</TabsTrigger>
                    <TabsTrigger value="audit">Audit & Logs</TabsTrigger>
                    <TabsTrigger value="auth">Politiques Auth</TabsTrigger>
                    <TabsTrigger value="infra">Sécurité Infra</TabsTrigger>
                </TabsList>

                {/* Gestion des Utilisateurs */}
                <TabsContent value="users" className="mt-0">
                    <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader className="bg-white dark:bg-slate-900 border-b flex flex-row items-center justify-between pb-4">
                            <div>
                                <CardTitle>Annuaire des Comptes</CardTitle>
                                <CardDescription>Gestion des accès individuels et statut de sécurité</CardDescription>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input placeholder="Rechercher utilisateur..." className="pl-9 w-64 bg-slate-50 border-none" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Identité</TableHead>
                                        <TableHead>Rôle</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Sécurité</TableHead>
                                        <TableHead>Dernière Activité</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((u) => (
                                        <TableRow key={u.id} className="hover:bg-slate-50 transition-colors">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border">
                                                        {u.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold">{u.name}</p>
                                                        <p className="text-[10px] text-slate-400">#USER-{u.id}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-semibold">{u.role}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={cn(
                                                    "text-[10px] uppercase font-black",
                                                    u.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                                                )}>{u.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    {u.mfa ? <Fingerprint className="h-4 w-4 text-emerald-500" /> : <ShieldAlert className="h-4 w-4 text-orange-400" />}
                                                    <Smartphone className="h-4 w-4 text-blue-500" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs font-mono text-slate-400">{u.lastLogin}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4 text-slate-400" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Lock className="h-4 w-4 text-slate-400" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Gestion des Rôles Granulaires */}
                <TabsContent value="roles" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-4">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardHeader className="bg-slate-50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base">Structures de Rôles</CardTitle>
                                        <Button variant="ghost" size="sm" className="h-7 px-2 text-indigo-600"><Plus className="h-4 w-4" /></Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 space-y-3">
                                    {roles.map((r) => (
                                        <div key={r.id} className="p-3 bg-white border border-slate-100 rounded-lg hover:border-indigo-300 transition-all cursor-pointer group shadow-sm">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-sm flex items-center gap-2">
                                                    <div className={cn("h-2 w-2 rounded-full", r.color)} /> {r.name}
                                                </h4>
                                                <Badge variant="secondary" className="text-[10px]">{r.users} u.</Badge>
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-medium">{r.level}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="bg-indigo-900 text-white p-6 relative overflow-hidden group">
                                <Database className="absolute -bottom-4 -right-4 h-24 w-24 opacity-10" />
                                <h4 className="text-lg font-black mb-1">Héritage de Rôles</h4>
                                <p className="text-xs opacity-70 mb-4 tracking-tight">Configurez des structures de rôles parent/enfant pour une gestion simplifiée.</p>
                                <Button className="w-full bg-white text-indigo-900 font-bold text-xs h-9">Gérer la hiérarchie</Button>
                            </Card>
                        </div>

                        {/* Matrice de Privilèges */}
                        <div className="lg:col-span-2">
                            <Card className="border-none shadow-md">
                                <CardHeader className="bg-white dark:bg-slate-900 border-b">
                                    <CardTitle>Configuration des Privilèges : <span className="text-indigo-600">Médecin Chef</span></CardTitle>
                                    <CardDescription>Cochez les accès granulaires autorisés pour ce rôle.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-8">
                                    {["Soin & Dossiers", "Finances", "Administration", "Ressources Humaines"].map((cat) => (
                                        <div key={cat} className="space-y-4">
                                            <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">{cat}</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                                                {["Lecture", "Création", "Modification", "Suppression", "Export PDF", "Audit"].map((p) => (
                                                    <div key={p} className="flex items-center space-x-2">
                                                        <Checkbox id={`${cat}-${p}`} defaultChecked={p !== "Suppression"} />
                                                        <label htmlFor={`${cat}-${p}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                            {p}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                                    <Button variant="outline">Annuler</Button>
                                    <Button className="bg-indigo-600">Enregistrer les Privilèges</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Audit & Logs */}
                <TabsContent value="audit" className="mt-0">
                    <Card className="border-none shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Historique d'Audit (Tracabilité Totale)</CardTitle>
                                <CardDescription>Enregistrement non-modifiable de toutes les actions système critiques</CardDescription>
                            </div>
                            <Button variant="outline" className="border-slate-200">Exporter rapport (PDF/XLS)</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Utilisateur</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Détail</TableHead>
                                        <TableHead>Date / Heure</TableHead>
                                        <TableHead>Adresse IP</TableHead>
                                        <TableHead className="text-right">Vérif.</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {auditLogs.map((log) => (
                                        <TableRow key={log.id} className={cn("hover:bg-slate-50", log.action.includes("Échec") ? "bg-red-50/30" : "")}>
                                            <TableCell className="font-bold">
                                                {log.user === "u1" ? "Dr. Abdou R." : "Inconnu"}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={log.action.includes("Échec") ? "destructive" : "secondary"} className="text-[10px]">
                                                    {log.action}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-xs text-slate-500">{log.detail}</TableCell>
                                            <TableCell className="text-xs font-mono">{log.time}</TableCell>
                                            <TableCell className="text-xs font-mono opacity-50">{log.ip}</TableCell>
                                            <TableCell className="text-right">
                                                <ShieldCheck className="h-4 w-4 text-emerald-500 inline" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Politiques d'Authentification */}
                <TabsContent value="auth" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2 pr-0 mr-0"><Key className="h-4 w-4 text-indigo-600" /> Complexité des Mots de Passe</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-3">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">Longueur Minimale</p>
                                        <p className="text-xs text-slate-400">Nombre de caractères requis</p>
                                    </div>
                                    <Select defaultValue="12">
                                        <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="8">8</SelectItem>
                                            <SelectItem value="12">12</SelectItem>
                                            <SelectItem value="16">16</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between border-b pb-3">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">Rotation Obligatoire</p>
                                        <p className="text-xs text-slate-400">Renouvellement automatique</p>
                                    </div>
                                    <Select defaultValue="90">
                                        <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="30">30 Jours</SelectItem>
                                            <SelectItem value="90">90 Jours</SelectItem>
                                            <SelectItem value="never">Jamais</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <p className="text-sm font-bold">Exiger symboles & majuscules</p>
                                    <Checkbox checked />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2"><Fingerprint className="h-4 w-4 text-indigo-600" /> Multi-Facteurs (MFA)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-3 bg-slate-50 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-black">Email OTP</p>
                                            <p className="text-[10px] text-slate-400">Code temporaire par email</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-500">Activé</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="h-5 w-5 text-slate-400" />
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-black">Auth App (TOTP)</p>
                                            <p className="text-[10px] text-slate-400">Google Auth, Microsoft Auth</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-500">Activé</Badge>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-tight">La politique actuelle exige le MFA pour tout utilisateur ayant accès au module "Finances" ou "Super Admin".</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
