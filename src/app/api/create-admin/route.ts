import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    // 1. Créer le rôle ADMIN
    const adminRole = await prisma.role.upsert({
      where: { nom: "ADMIN" },
      update: {},
      create: {
        nom: "ADMIN",
        description: "Administrateur système avec tous les droits",
      },
    })

    // 2. Hash du mot de passe
    const hashedPassword = await bcrypt.hash("password123", 10)

    // 3. Créer l'utilisateur admin
    const adminUser = await prisma.user.upsert({
      where: { email: "admin@sighi.sn" },
      update: { password: hashedPassword },
      create: {
        email: "admin@sighi.sn",
        password: hashedPassword,
        nom: "Admin",
        prenom: "Système",
        telephone: "+221 77 123 45 67",
        roleId: adminRole.id,
        actif: true,
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: "Utilisateur admin créé avec succès",
      email: "admin@sighi.sn",
      password: "password123"
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
