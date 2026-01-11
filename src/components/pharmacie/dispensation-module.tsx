"use client"

import { useState } from "react"
import {
    User,
    Search,
    Plus,
    Trash2,
    CreditCard,
    UserSearch,
    Stethoscope,
    ShoppingCart,
    CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

export function DispensationModule() {
    const [basket, setBasket] = useState<any[]>([
        { id: "1", nom: "Paracétamol 500mg", qty: 2, prix: 50, total: 100 },
        { id: "2", nom: "Amoxicilline 1g", qty: 1, prix: 1500, total: 1500 },
    ])

    const total = basket.reduce((acc, item) => acc + item.total, 0)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Patient & Prescription Search */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <UserSearch className="h-5 w-5 text-indigo-500" /> Profil Patient & Ordonnance
                        </CardTitle>
                        <CardDescription>Identifier le patient et récupérer ses prescriptions en cours.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <Label>Rechercher un Patient</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Nom, Prénom ou N° Patient..." className="pl-9" />
                                </div>
                            </div>
                            <Button variant="outline" className="mt-8">
                                <Stethoscope className="h-4 w-4 mr-2" /> Scanner Ordonnance
                            </Button>
                        </div>

                        {/* Selected Patient Info (Simulated) */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border shadow-sm">
                                    <User className="h-6 w-6 text-slate-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200">Abdou Khadre DIOP</div>
                                    <div className="text-xs text-muted-foreground">REF: PAT-2026-0482 | 45 ans | Homme</div>
                                </div>
                            </div>
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Assuré (80%)</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Plus className="h-5 w-5 text-emerald-500" /> Sélection des Médicaments
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2 space-y-2">
                                <Label>Produit</Label>
                                <Input placeholder="Rechercher dans le stock..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Quantité</Label>
                                <Input type="number" defaultValue={1} />
                            </div>
                            <div className="flex items-end">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                                    <Plus className="h-4 w-4 mr-2" /> Ajouter
                                </Button>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Désignation</TableHead>
                                    <TableHead>Quantité</TableHead>
                                    <TableHead>Prix Unit.</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {basket.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.nom}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell>{item.prix} CFA</TableCell>
                                        <TableCell className="font-bold">{item.total} CFA</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="text-red-400">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Checkout Summary */}
            <div className="space-y-6">
                <Card className="border-none shadow-lg bg-slate-900 text-white">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-emerald-400" /> Résumé Vente
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-zinc-400 text-sm">
                            <span>Sous-total</span>
                            <span>{total} CFA</span>
                        </div>
                        <div className="flex justify-between text-zinc-400 text-sm">
                            <span>Part Assurance (80%)</span>
                            <span className="text-emerald-400">-{total * 0.8} CFA</span>
                        </div>
                        <Separator className="bg-zinc-800" />
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-lg font-bold">Total Patient</span>
                            <span className="text-2xl font-black text-emerald-400">
                                {total * 0.2} <span className="text-xs">CFA</span>
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold h-12">
                            <CreditCard className="mr-2 h-5 w-5" /> Encaisser & Valider
                        </Button>
                        <p className="text-[10px] text-zinc-500 text-center">
                            Une facture sera générée et les stocks seront automatiquement déduits.
                        </p>
                    </CardFooter>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm">Points de Vigilance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex gap-2 text-xs p-3 rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            <span>Vérifier les contre-indications (Patient asthmatique).</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
