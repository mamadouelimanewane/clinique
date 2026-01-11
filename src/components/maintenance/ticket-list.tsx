"use client"

import { useState } from "react"
import { Plus, Wrench, Trash2, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

type Ticket = {
    id: number
    titre: string
    lieu: string
    type: "PANNE" | "NETTOYAGE" | "INFORMATIQUE"
    priorite: "BASSE" | "MOYENNE" | "HAUTE"
    statut: "OUVERT" | "EN_COURS" | "RESOLU"
    date: string
}

export function MaintenanceTickets() {
    const [open, setOpen] = useState(false)
    const [tickets, setTickets] = useState<Ticket[]>([
        { id: 1, titre: "Fuite d'eau lavabo", lieu: "Salle 102", type: "PANNE", priorite: "MOYENNE", statut: "OUVERT", date: "10/01/2026" },
        { id: 2, titre: "Nettoyage urgent", lieu: "Accueil", type: "NETTOYAGE", priorite: "HAUTE", statut: "EN_COURS", date: "10/01/2026" },
    ])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Logic d'ajout (mock)
        setOpen(false)
        alert("Ticket créé (Simulation)")
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Card className="w-40 border-l-4 border-l-red-500">
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-sm">Priorité Haute</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-2xl font-bold">1</CardContent>
                    </Card>
                    <Card className="w-40 border-l-4 border-l-blue-500">
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-sm">En Cours</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-2xl font-bold">1</CardContent>
                    </Card>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nouveau Ticket
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Signaler un incident</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="grid gap-2">
                                <Label>Titre / Objet</Label>
                                <Input placeholder="Ex: Ampoule grillée" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Type</Label>
                                    <Select>
                                        <SelectTrigger><SelectValue placeholder="Choisir..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PANNE">Panne / Réparation</SelectItem>
                                            <SelectItem value="NETTOYAGE">Nettoyage</SelectItem>
                                            <SelectItem value="INFORMATIQUE">Informatique</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Lieu</Label>
                                    <Input placeholder="Ex: Couloir A" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea placeholder="Détails du problème..." />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Créer le ticket</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {tickets.map(ticket => (
                    <Card key={ticket.id} className="flex flex-row items-center p-4 gap-4">
                        <div className={`p-3 rounded-full ${ticket.type === 'NETTOYAGE' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                            {ticket.type === 'NETTOYAGE' ? <Trash2 className="h-5 w-5" /> : <Wrench className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{ticket.titre}</h4>
                                <Badge variant={ticket.priorite === 'HAUTE' ? 'destructive' : 'outline'}>{ticket.priorite}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{ticket.lieu} • {ticket.date}</p>
                        </div>
                        <div>
                            <Badge variant="secondary">{ticket.statut}</Badge>
                        </div>
                        <Button variant="ghost" size="sm">Gérer</Button>
                    </Card>
                ))}
            </div>
        </div>
    )
}
