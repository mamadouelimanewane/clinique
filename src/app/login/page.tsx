import { LoginForm } from "@/components/auth/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Connexion - SIGHI",
    description: "Portail de connexion au système hospitalier",
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
            <div className="absolute top-4 left-4 font-bold text-xl text-primary flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    S
                </div>
                SIGHI
            </div>
            <LoginForm />
        </div>
    )
}
