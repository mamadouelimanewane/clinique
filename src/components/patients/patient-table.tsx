"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2, Search, Eye, Edit, User, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useDebounce } from "@/hooks/use-debounce" // We need to create this hook or implement debounce manually

// --- Simple debounce hook implementation inline for now ---
import { useEffect } from "react"

function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}
// --------------------------------------------------------

type Patient = {
    id: string
    numeroPatient: string
    nom: string
    prenom: string
    dateNaissance: string
    sexe: "M" | "F"
    telephone: string
    email: string | null
    ville: string | null
    assureur: string | null
}

export function PatientTable() {
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounceValue(search, 500)
    const router = useRouter()

    const { data: patients, isLoading } = useQuery<Patient[]>({
        queryKey: ['patients-list', debouncedSearch],
        queryFn: async () => {
            const params = new URLSearchParams()
            if (debouncedSearch) params.append("q", debouncedSearch)

            const res = await fetch(`/api/patients?${params.toString()}`)
            if (!res.ok) throw new Error('Erreur chargement')
            return res.json()
        }
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher par nom, téléphone..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Numéro</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Âge/Sexe</TableHead>
                            <TableHead>Assurance</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    <div className="flex justify-center items-center">
                                        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Chargement...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : patients?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                                    Aucun patient trouvé.
                                </TableCell>
                            </TableRow>
                        ) : (
                            patients?.map((patient) => {
                                const age = new Date().getFullYear() - new Date(patient.dateNaissance).getFullYear();
                                return (
                                    <TableRow key={patient.id} className="cursor-pointer hover:bg-slate-50" onClick={() => router.push(`/patients/${patient.id}`)}>
                                        <TableCell>
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback className={patient.sexe === 'M' ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}>
                                                    {patient.prenom[0]}{patient.nom[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{patient.prenom} {patient.nom.toUpperCase()}</div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {patient.ville || "N/A"}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded w-fit">
                                                {patient.numeroPatient}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm">
                                                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {patient.telephone}</span>
                                                <span className="text-xs text-muted-foreground">{patient.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {age} ans <Badge variant="outline" className="ml-1 text-xs">{patient.sexe}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {patient.assureur ? (
                                                <Badge variant="secondary" className="text-xs">{patient.assureur}</Badge>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" asChild onClick={(e) => e.stopPropagation()}>
                                                <Link href={`/patients/${patient.id}`}>
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
