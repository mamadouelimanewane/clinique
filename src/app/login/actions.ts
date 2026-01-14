"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function resetAdminPassword() {
    try {
        const hashedPassword = await bcrypt.hash("password123", 10)

        // Check if user exists first
        const user = await prisma.user.findUnique({
            where: { email: "admin@sighi.sn" }
        })

        if (!user) {
            // Create if not exists (fallback)
            // ... (simplified for now, just update)
            return { success: false, message: "User admin not found" }
        }

        await prisma.user.update({
            where: { email: "admin@sighi.sn" },
            data: { password: hashedPassword },
        })

        return { success: true, message: "Mot de passe réinitialisé à 'password123' !" }
    } catch (error: any) {
        console.error("Reset password failed:", error)
        return { success: false, message: "Erreur: " + error.message }
    }
}
