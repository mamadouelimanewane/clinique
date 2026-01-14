"use client"
import { useEffect, useState } from "react"
import { resetAdminPassword } from "../login/actions"

export default function ResetPage() {
    const [status, setStatus] = useState("En attente...")

    useEffect(() => {
        setStatus("Réinitialisation en cours...")
        resetAdminPassword().then((res) => {
            setStatus(res.success ? "✅ SUCCÈS ! Mot de passe = password123" : "❌ ERREUR: " + res.message)
        })
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white text-2xl font-bold p-10 text-center">
            {status}
            <br/><br/>
            {status.includes("SUCCÈS") && <a href="/login" className="text-blue-500 underline">Aller se connecter</a>}
        </div>
    )
}

// Force Update 01/14/2026 12:43:17
