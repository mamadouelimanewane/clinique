"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Wallet, PieChart, Activity } from "lucide-react"

const DATA_MONTHLY = [
    { month: 'Jui', revenus: 12000000, couts: 4000000, marge: 8000000 },
    { month: 'Aoû', revenus: 15000000, couts: 4500000, marge: 10500000 },
    { month: 'Sep', revenus: 18000000, couts: 5000000, marge: 13000000 },
    { month: 'Oct', revenus: 14000000, couts: 4200000, marge: 9800000 },
    { month: 'Nov', revenus: 22000000, couts: 6000000, marge: 16000000 },
    { month: 'Déc', revenus: 28000000, couts: 8000000, marge: 20000000 },
]

const DATA_SPECIALTIES = [
    { name: 'Cardio', value: 35 },
    { name: 'Gynéco', value: 25 },
    { name: 'Pédia', value: 20 },
    { name: 'Dermato', value: 10 },
    { name: 'Ophtalmo', value: 10 },
]

export function FinancialAnalytics() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { title: "CA Mensuel", value: "28M", trend: "+15%", icon: DollarSign, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { title: "Marge Nette", value: "20M", trend: "+22%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { title: "Coûts Opé.", value: "8M", trend: "-5%", icon: Wallet, color: "text-orange-600", bg: "bg-orange-50" },
                    { title: "Taux de Marge", value: "71%", trend: "+2%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
                ].map((kpi, i) => (
                    <Card key={i} className="border-none shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                                </div>
                                <Badge variant="secondary" className="text-[10px] font-bold">{kpi.trend}</Badge>
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</p>
                                <h3 className="text-2xl font-black text-slate-900">{kpi.value} <span className="text-xs font-normal">FCFA</span></h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Évolution des Marges Cliniques</CardTitle>
                        <CardDescription>Comparaison mensuelle Revenus vs Coûts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={DATA_MONTHLY}>
                                    <defs>
                                        <linearGradient id="colorMarge" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                        cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
                                    />
                                    <Area type="monotone" dataKey="marge" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorMarge)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Mix Spécialités</CardTitle>
                        <CardDescription>Contribution au Chiffre d'Affaire.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6 mt-4">
                            {DATA_SPECIALTIES.map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                        <span className="text-slate-500">{s.name}</span>
                                        <span className="text-slate-900">{s.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                                            style={{ width: `${s.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Optimisation Suggérée</p>
                            <p className="text-xs text-slate-600 italic">"L'Ophtalmologie affiche la plus forte marge brute par acte (82%). Accentuer la promotion de ce pôle."</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
