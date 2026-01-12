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
    Calendar,
    Loader2
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { format } from "date-fns"

export function ProcurementModule() {
    const [openNewOrder, setOpenNewOrder] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState("")
    const [orderDate, setOrderDate] = useState("")
    const [orderLines, setOrderLines] = useState<{ medicamentId: string, quantite: number, prixUnitaire: number }[]>([])
    const queryClient = useQueryClient()

    // --- DATA FETCHING ---
    const { data: suppliers } = useQuery({
        queryKey: ['suppliers'],
        queryFn: async () => {
            const res = await fetch('/api/pharmacie/fournisseurs')
            return res.json()
        }
    })

    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch('/api/pharmacie/commandes')
            return res.json()
        }
    })

    const { data: medicaments } = useQuery({
        queryKey: ['medicaments-list'],
        queryFn: async () => {
            const res = await fetch('/api/pharmacie/medicaments')
            return res.json()
        }
    })

    const createOrderMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch('/api/pharmacie/commandes', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Erreur")
            return res.json()
        },
        onSuccess: () => {
            toast.success("Commande créée avec succès")
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            setOpenNewOrder(false)
            setOrderLines([])
            setSelectedSupplier("")
        },
        onError: () => toast.error("Erreur lors de la création")
    })

    // --- LOGIC ---
    const addLine = () => {
        setOrderLines([...orderLines, { medicamentId: "", quantite: 1, prixUnitaire: 0 }])
    }

    const updateLine = (index: number, field: string, value: any) => {
        const newLines = [...orderLines]
        // @ts-ignore
        newLines[index][field] = value

        // Auto-fill price if medicament changes
        if (field === 'medicamentId') {
            const med = medicaments?.find((m: any) => m.id === value)
            if (med) newLines[index].prixUnitaire = Number(med.prixAchat)
        }

        setOrderLines(newLines)
    }

    const removeLine = (index: number) => {
        setOrderLines(orderLines.filter((_, i) => i !== index))
    }

    const calculateTotal = () => {
        return orderLines.reduce((acc, line) => acc + (line.quantite * line.prixUnitaire), 0)
    }

    const handleSubmit = () => {
        if (!selectedSupplier || orderLines.length === 0) return toast.error("Veuillez remplir tous les champs")
        createOrderMutation.mutate({
            fournisseurId: selectedSupplier,
            dateLivraison: orderDate,
            lignes: orderLines
        })
    }

    const getStatusBadge = (statut: string) => {
        const configs = {
            EN_ATTENTE: { variant: "secondary" as const, className: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
            PARTIELLE: { variant: "outline" as const, className: "bg-blue-50 text-blue-700 border-blue-200", icon: Package },
            LIVREE: { variant: "outline" as const, className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
            ANNULEE: { variant: "destructive" as const, className: "", icon: XCircle },
        }
        // @ts-ignore
        const config = configs[statut] || configs.EN_ATTENTE
        const Icon = config.icon

        return (
            <Badge variant={config.variant} className={config.className}>
                <Icon className="h-3 w-3 mr-1" />
                {statut?.replace('_', ' ')}
            </Badge>
        )
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue="orders" className="space-y-4">
                <TabsList className="bg-slate-100 p-1">
                    <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <FileText className="h-4 w-4 mr-2" /> Bons de Commande
                    </TabsTrigger>
                    <TabsTrigger value="suppliers" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Building2 className="h-4 w-4 mr-2" /> Fournisseurs
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-4">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Rechercher une commande..." className="pl-9 bg-slate-50" />
                        </div>
                        <Dialog open={openNewOrder} onOpenChange={setOpenNewOrder}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                                    <Plus className="h-4 w-4 mr-2" /> Nouveau Bon de Commande
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px]">
                                <DialogHeader>
                                    <DialogTitle>Créer un Bon de Commande</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Fournisseur</Label>
                                            <Select onValueChange={setSelectedSupplier}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {suppliers?.map((s: any) => (
                                                        <SelectItem key={s.id} value={s.id}>{s.nom}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Date de Livraison Souhaitée</Label>
                                            <Input type="date" onChange={(e) => setOrderDate(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-4 space-y-3 bg-slate-50/50">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold text-sm">Articles à Commander</h4>
                                            <Button size="sm" variant="outline" onClick={addLine}>
                                                <Plus className="h-3 w-3 mr-1" /> Ajouter Ligne
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            <div className="col-span-5">Produit</div>
                                            <div className="col-span-2">Quantité</div>
                                            <div className="col-span-3">Prix Unit.</div>
                                            <div className="col-span-1"></div>
                                        </div>
                                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                            {orderLines.map((line, i) => (
                                                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                                                    <div className="col-span-5">
                                                        <Select onValueChange={(v) => updateLine(i, 'medicamentId', v)}>
                                                            <SelectTrigger className="h-9">
                                                                <SelectValue placeholder="Produit..." />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {medicaments?.map((m: any) => (
                                                                    <SelectItem key={m.id} value={m.id}>{m.nomCommercial} {m.dosage}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <Input
                                                            type="number"
                                                            value={line.quantite}
                                                            onChange={(e) => updateLine(i, 'quantite', Number(e.target.value))}
                                                            className="h-9"
                                                        />
                                                    </div>
                                                    <div className="col-span-3">
                                                        <Input
                                                            type="number"
                                                            value={line.prixUnitaire}
                                                            onChange={(e) => updateLine(i, 'prixUnitaire', Number(e.target.value))}
                                                            placeholder="Prix"
                                                            className="h-9"
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-500" onClick={() => removeLine(i)}>
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-slate-900 text-white rounded-xl p-6 flex justify-between items-center shadow-lg">
                                        <span className="font-medium text-slate-300">Montant Total HT</span>
                                        <span className="text-3xl font-black">{calculateTotal().toLocaleString()} FCFA</span>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setOpenNewOrder(false)}>Annuler</Button>
                                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={createOrderMutation.isPending}>
                                        {createOrderMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Enregistrer & Envoyer
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="border-none shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="font-bold text-slate-900">N° Commande</TableHead>
                                    <TableHead className="font-bold text-slate-900">Fournisseur</TableHead>
                                    <TableHead className="font-bold text-slate-900">Date</TableHead>
                                    <TableHead className="font-bold text-slate-900">Articles</TableHead>
                                    <TableHead className="font-bold text-slate-900">Montant</TableHead>
                                    <TableHead className="font-bold text-slate-900">Statut</TableHead>
                                    <TableHead className="text-right font-bold text-slate-900">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders?.map((order: any) => (
                                    <TableRow key={order.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-mono font-bold text-blue-600">
                                            {order.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 font-medium">
                                                <Building2 className="h-4 w-4 text-slate-400" />
                                                {order.fournisseur}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {format(new Date(order.date), 'dd/MM/yyyy')}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-mono bg-slate-50">
                                            {order.articles}
                                        </TableCell>
                                        <TableCell className="font-bold text-slate-700">
                                            {order.montant.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">FCFA</span>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(order.statut)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">Détails</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {orders?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                                            Aucune commande trouvée
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="suppliers" className="space-y-4">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Rechercher un fournisseur..." className="pl-9 bg-slate-50" />
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                            <Plus className="h-4 w-4 mr-2" /> Nouveau Fournisseur
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {suppliers?.map((supplier: any) => (
                            <Card key={supplier.id} className="border-none shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                                                <Building2 className="h-6 w-6 text-blue-600 group-hover:text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base font-bold">{supplier.nom}</CardTitle>
                                                <CardDescription className="text-xs font-mono mt-1">{supplier.contact}</CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between text-sm bg-slate-50 p-2 rounded-lg">
                                        <span className="text-muted-foreground">Téléphone</span>
                                        <span className="font-bold text-slate-700">{supplier.telephone}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Commandes</span>
                                        <Badge variant="secondary" className="font-mono">{supplier._count?.commandes || 0}</Badge>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full mt-2 font-bold group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                                        Voir Fiche
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
