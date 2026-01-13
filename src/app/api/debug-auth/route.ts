import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email") || "test@admin.sn"
  
  try {
    // 1. Vérifier la connexion DB
    const dbTest = await prisma.$queryRaw`SELECT NOW()`
    
    // 2. Chercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    })
    
    if (!user) {
      return NextResponse.json({
        error: "Utilisateur non trouvé",
        email,
        dbConnected: true
      })
    }
    
    // 3. Tester le mot de passe
    const testPassword = "admin"
    const isValid = await bcrypt.compare(testPassword, user.password)
    
    return NextResponse.json({
      dbConnected: true,
      userFound: true,
      email: user.email,
      hasPassword: !!user.password,
      passwordHash: user.password.substring(0, 20) + "...",
      passwordTestResult: isValid,
      userActive: user.actif,
      roleName: user.role.nom
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 500 })
  }
}
