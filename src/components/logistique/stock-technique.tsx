"use client"

import { useQuery } from "@tanstack/react-query"
import { Package, AlertCircle, PlusCircle, ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export function ArticleLogistiqueStock() {
    const { data: articles, isLoading } = useQuery({
        queryKey: ['articles-logistique'],
        queryFn: async () => {
            return [
                { id: '1', designation: 'Réactif Glycémie (Kit 100)', categorie: 'REACTIF', stockActuel: 12, stockAlerte: 10, uniteMesure: 'Boite' },
                { id: '2', designation: 'Gants Stériles (Taille 7)', categorie: 'CONSOMMABLE_CHIR', stockActuel: 5, stockAlerte: 20, uniteMesure: 'Unité' },
                { id: '3', designation: 'Compresses non tissées 10x10', categorie: 'CONSOMMABLE_MED', stockActuel: 450, stockAlerte: 100, uniteMesure: 'Unité' },
                { id: '4', designation: 'Seringues 5ml (Boite 50)', categorie: 'CONSOMMABLE_MED', stockActuel: 85, stockAlerte: 50, uniteMesure: 'Boite' },
            ]
        }
    })

    if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600 h-8 w-8" /></div>

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Gestion Logistique</h2>
                    <p className="text-slate-500 font-medium">Inventaire temps réel des réactifs et consommables techniques.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none h-11 px-6 rounded-2xl font-bold">
                    <PlusCircle className="mr-2 h-5 w-5" /> Nouvel Article
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-indigo-50/50 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Package className="h-24 w-24 text-indigo-600" />
                    </div>
                    <CardHeader className="p-6 pb-2">
                        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Total Articles</p>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="text-4xl font-black text-indigo-900">156</div>
                        <p className="text-[10px] text-indigo-400 font-bold mt-1 uppercase tracking-tighter">+5 cette semaine</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-rose-50/50 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                        <AlertCircle className="h-24 w-24 text-rose-600" />
                    </div>
                    <CardHeader className="p-6 pb-2">
                        <p className="text-xs font-black text-rose-600 uppercase tracking-widest">Alertes Stock</p>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="text-4xl font-black text-rose-900">12</div>
                        <p className="text-[10px] text-rose-400 font-bold mt-1 uppercase tracking-tighter">Réapprovisionnement immédiat requis</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50/50 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="h-24 w-24 text-emerald-600" />
                    </div>
                    <CardHeader className="p-6 pb-2">
                        <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Valeur Stock</p>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="text-4xl font-black text-emerald-900">2.4M <span className="text-lg font-bold">F</span></div>
                        <p className="text-[10px] text-emerald-400 font-bold mt-1 uppercase tracking-tighter">Estimation basée sur derniers achats</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100 p-8">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-black flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                                <Package className="h-5 w-5" />
                            </div>
                            Inventaire Permanent
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold border-slate-200">Filtrer</Button>
                            <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold border-slate-200 text-indigo-600">Exporter PDF</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Désignation</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Catégorie</TableHead>
                                <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Niveau Stock</TableHead>
                                <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Seuil Alerte</TableHead>
                                <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles?.map((art) => (
                                <TableRow key={art.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                    <TableCell className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900">{art.designation}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: ART-{art.id.padStart(4, '0')}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="rounded-lg border-slate-200 bg-slate-50 text-[10px] font-black tracking-widest text-slate-500">
                                            {art.categorie}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex flex-col items-end">
                                            <span className={cn(
                                                "font-black text-lg",
                                                art.stockActuel <= art.stockAlerte ? "text-rose-600" : "text-slate-900"
                                            )}>
                                                {art.stockActuel}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{art.uniteMesure}(s)</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-slate-400">
                                        {art.stockAlerte}
                                    </TableCell>
                                    <TableCell className="text-right px-8 space-x-2">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                                            <ArrowDownLeft className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
