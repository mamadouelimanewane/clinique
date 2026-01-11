"use client"

import { useState } from "react"
import {
    Truck,
    Plus,
    Search,
    Building2,
    Package,
    CheckCircle2,
    Clock,
    XCircle,
    FileText,
    Calendar
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProcurementModule() {
    const [openNewOrder, setOpenNewOrder] = useState(false)

    // Mock data
    const suppliers = [
        { id: "1", nom: "Laborex Sénégal", contact: "Amadou Diop", tel: "77 123 45 67", commandes: 12 },
        { id: "2", nom: "Pharma Distribution", contact: "Fatou Sall", tel: "76 234 56 78", commandes: 8 },
        { id: "3", nom: "Medis Import", contact: "Jean Mendy", tel: "78 345 67 89", commandes: 15 },
    ]

    const orders = [
        {
            id: "BC-PH-2026-001",
            fournisseur: "Laborex Sénégal",
            date: "08/01/2026",
            montant: 2450000,
            statut: "EN_ATTENTE",
            articles: 15
        },
        {
            id: "BC-PH-2026-002",
            fournisseur: "Pharma Distribution",
            date: "05/01/2026",
            montant: 1850000,
            statut: "PARTIELLE",
            articles: 8
        },
        {
            id: "BC-PH-2025-098",
            fournisseur: "Medis Import",
            date: "28/12/2025",
            montant: 3200000,
            statut: "LIVREE",
            articles: 22
        },
    ]

    const getStatusBadge = (statut: string) => {
        const configs = {
            EN_ATTENTE: { variant: "secondary" as const, className: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
            PARTIELLE: { variant: "outline" as const, className: "bg-blue-50 text-blue-700 border-blue-200", icon: Package },
            LIVREE: { variant: "outline" as const, className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
            ANNULEE: { variant: "destructive" as const, className: "", icon: XCircle },
        }
        const config = configs[statut as keyof typeof configs] || configs.EN_ATTENTE
        const Icon = config.icon

        return (
            <Badge variant={config.variant} className={config.className}>
                <Icon className="h-3 w-3 mr-1" />
                {statut.replace('_', ' ')}
            </Badge>
        )
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue="orders" className="space-y-4">
                <TabsList className="bg-slate-100 dark:bg-slate-800">
                    <TabsTrigger value="orders">
                        <FileText className="h-4 w-4 mr-2" /> Bons de Commande
                    </TabsTrigger>
                    <TabsTrigger value="suppliers">
                        <Building2 className="h-4 w-4 mr-2" /> Fournisseurs
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Rechercher une commande..." className="pl-9" />
                        </div>
                        <Dialog open={openNewOrder} onOpenChange={setOpenNewOrder}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <Plus className="h-4 w-4 mr-2" /> Nouveau Bon de Commande
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px]">
                                <DialogHeader>
                                    <DialogTitle>Créer un Bon de Commande</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Fournisseur</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {suppliers.map(s => (
                                                        <SelectItem key={s.id} value={s.id}>{s.nom}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Date de Livraison Souhaitée</Label>
                                            <Input type="date" />
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold text-sm">Articles à Commander</h4>
                                            <Button size="sm" variant="outline">
                                                <Plus className="h-3 w-3 mr-1" /> Ajouter Ligne
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
                                            <div className="col-span-5">Produit</div>
                                            <div className="col-span-2">Quantité</div>
                                            <div className="col-span-2">Prix Unit.</div>
                                            <div className="col-span-2">Total</div>
                                            <div className="col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-2 items-center">
                                            <div className="col-span-5">
                                                <Input placeholder="Rechercher produit..." size={1} />
                                            </div>
                                            <div className="col-span-2">
                                                <Input type="number" defaultValue={1} size={1} />
                                            </div>
                                            <div className="col-span-2">
                                                <Input type="number" placeholder="Prix" size={1} />
                                            </div>
                                            <div className="col-span-2 text-sm font-bold">
                                                0 FCFA
                                            </div>
                                            <div className="col-span-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <XCircle className="h-4 w-4 text-red-400" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 flex justify-between items-center">
                                        <span className="font-semibold">Montant Total HT</span>
                                        <span className="text-2xl font-bold text-blue-600">0 FCFA</span>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setOpenNewOrder(false)}>Annuler</Button>
                                    <Button className="bg-blue-600">Enregistrer & Envoyer</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="border-none shadow-sm">
                        <Table>
                            <TableHeader className="bg-slate-50 dark:bg-slate-900">
                                <TableRow>
                                    <TableHead>N° Commande</TableHead>
                                    <TableHead>Fournisseur</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Articles</TableHead>
                                    <TableHead>Montant</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-mono font-bold text-blue-600">
                                            {order.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-slate-400" />
                                                {order.fournisseur}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {order.date}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-mono">
                                            {order.articles}
                                        </TableCell>
                                        <TableCell className="font-bold">
                                            {order.montant.toLocaleString()} <span className="text-xs">FCFA</span>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(order.statut)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Détails</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="suppliers" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Rechercher un fournisseur..." className="pl-9" />
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="h-4 w-4 mr-2" /> Nouveau Fournisseur
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {suppliers.map((supplier) => (
                            <Card key={supplier.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                <Building2 className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{supplier.nom}</CardTitle>
                                                <CardDescription className="text-xs">{supplier.contact}</CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Téléphone</span>
                                        <span className="font-mono">{supplier.tel}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Commandes</span>
                                        <Badge variant="outline">{supplier.commandes}</Badge>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full mt-2">
                                        Voir Détails
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
