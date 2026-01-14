import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test de connexion ultra simple
    const userCount = await prisma.user.count();
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@sighi.sn' },
      select: { email: true, actif: true, role: { select: { nom: true } } }
    });

    return NextResponse.json({ 
      status: "Connected", 
      database: "Supabase",
      userCount,
      adminExists: !!admin,
      adminDetails: admin
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: "Error", 
      message: error.message 
    }, { status: 500 });
  }
}
