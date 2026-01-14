import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        // 1. Générer le hash compatible Vercel
        const password = "password123";
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Mettre à jour l'utilisateur
        const updatedUser = await prisma.user.update({
            where: { email: "admin@sighi.sn" },
            data: { password: hashedPassword }
        });

        return NextResponse.json({
            success: true,
            message: "Mot de passe réinitialisé avec succès",
            email: updatedUser.email,
            newHash: hashedPassword
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
