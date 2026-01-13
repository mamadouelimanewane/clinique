"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2, Lock, Mail, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide.",
    }),
    password: z.string().min(1, {
        message: "Le mot de passe est requis.",
    }),
})

export function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            })

            if (result?.error) {
                setError("Identifiants incorrects. Veuillez vérifier vos accès.")
            } else {
                router.push("/dashboard")
                router.refresh()
            }
        } catch (err) {
            setError("Une erreur technique est survenue. Veuillez réessayer.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-white tracking-tight">Espace Professionnel</CardTitle>
                <CardDescription className="text-slate-400">
                    Saisie sécurisée des accès cliniques
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-slate-300 font-medium ml-1">Adresse Email</FormLabel>
                                    <FormControl>
                                        <div className="relative group/input">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                            <Input
                                                placeholder="nom@clinique.sn"
                                                {...field}
                                                className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-rose-400 text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-slate-300 font-medium ml-1">Mot de passe</FormLabel>
                                    <FormControl>
                                        <div className="relative group/input">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                {...field}
                                                className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-rose-400 text-xs" />
                                </FormItem>
                            )}
                        />

                        {error && (
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 shadow-lg shadow-indigo-500/20 relative overflow-hidden group/btn"
                            disabled={isLoading}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "S'authentifier"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <div className="p-6 pt-0 flex flex-col items-center gap-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                    SYSTÈME DE GESTION HOSPITALIÈRE SÉCURISÉ<br />
                    ACCÈS RÉSERVÉ AU PERSONNEL AUTORISÉ
                </p>
            </div>
        </Card>
    )
}
