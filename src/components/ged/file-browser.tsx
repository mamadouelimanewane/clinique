"use client"

import { useState } from "react"
import { Folder, FileText, Download, Upload, Search, MoreVertical, File, Grid, List as ListIcon, ShieldCheck, Clock, Tag, AlertCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Document = {
    id: string
    titre: string
    type: string
    url: string
    module: string
    createdAt: string
    patient?: {
        nom: string
        prenom: string
    }
}

export function FileManager() {
    const [view, setView] = useState<"grid" | "list">("grid")

    const { data: documents, isLoading } = useQuery({
        queryKey: ['ged-documents'],
        queryFn: async () => {
            const res = await fetch('/api/ged')
            if (!res.ok) throw new Error('Erreur chargement GED')
            return res.json() as Promise<Document[]>
        }
    })

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-indigo-600 font-bold animate-pulse">Exploration des archives...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Action Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-slate-900 p-6 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-50">
                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Folder className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Archive Numérique</h2>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="h-3 w-3 text-emerald-500" /> Stockage Hautement Sécurisé
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Rechercher un document..." className="pl-10 h-11 w-full lg:w-72 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500 shadow-none font-medium" />
                    </div>

                    <div className="bg-slate-100 p-1 rounded-xl flex">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-9 w-9 rounded-lg transition-all", view === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400")}
                            onClick={() => setView("grid")}
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-9 w-9 rounded-lg transition-all", view === "list" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400")}
                            onClick={() => setView("list")}
                        >
                            <ListIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button className="h-11 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100 transition-all hover:scale-105">
                        <Upload className="mr-2 h-5 w-5" /> Archivage
                    </Button>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['Tous', 'Consultations', 'Analyses', 'Imagerie', 'Ordonnances', 'Administratif'].map((filter) => (
                    <Button key={filter} variant="outline" className="rounded-full border-slate-200 font-bold text-xs px-6 h-9 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                        {filter}
                    </Button>
                ))}
            </div>

            {/* Content Display */}
            {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {documents?.map((doc) => (
                        <Card key={doc.id} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 border border-transparent hover:border-indigo-100">
                            <CardContent className="p-0">
                                <div className="h-32 bg-slate-50 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden group-hover:bg-indigo-50 transition-colors">
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full shadow-md"><MoreVertical className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2 min-w-[160px]">
                                                <DropdownMenuItem className="rounded-xl font-bold py-2"><Download className="mr-2 h-4 w-4" /> Télécharger</DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl font-bold py-2"><Tag className="mr-2 h-4 w-4" /> Étiqueter</DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl font-bold py-2 text-rose-600"><AlertCircle className="mr-2 h-4 w-4" /> Supprimer</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="transition-transform duration-500 group-hover:scale-110">
                                        {doc.type === 'PDF' ? <FileText className="h-16 w-16 text-rose-400" /> :
                                            doc.type === 'IMAGE' ? <File className="h-16 w-16 text-indigo-400" /> :
                                                <FileText className="h-16 w-16 text-slate-300" />}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className="bg-indigo-50 text-indigo-600 border-none text-[8px] font-black uppercase tracking-tighter rounded-md">
                                            {doc.module}
                                        </Badge>
                                        <span className="text-[10px] text-slate-400 font-bold">{doc.type}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight" title={doc.titre}>
                                        {doc.titre}
                                    </h4>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3 w-3 text-slate-300" />
                                            <span className="text-[10px] text-slate-400 font-bold italic">
                                                {format(new Date(doc.createdAt), 'dd/MM/yyyy')}
                                            </span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-indigo-600 hover:text-white transition-all">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Nom du Document</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Type</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Module</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Date d'archivage</TableHead>
                                <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 h-14">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents?.map((doc) => (
                                <TableRow key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                                <FileText className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <span className="font-bold text-slate-900 uppercase tracking-tight text-sm">{doc.titre}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell><Badge variant="outline" className="text-[10px] font-black">{doc.type}</Badge></TableCell>
                                    <TableCell><span className="text-xs font-bold text-slate-500 uppercase">{doc.module}</span></TableCell>
                                    <TableCell className="text-xs text-slate-400 font-medium">{format(new Date(doc.createdAt), 'PPP', { locale: fr })}</TableCell>
                                    <TableCell className="text-right px-8">
                                        <Button variant="ghost" size="sm" className="rounded-xl font-bold h-9">Consulter</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    )
}
