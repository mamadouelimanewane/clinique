import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export async function GET() {
  try {
    console.log("🚀 Démarrage de l'initialisation DB...");
    
    // 1. Création des tables
    console.log("➡️ Push du schema...");
    const { stdout: pushOut, stderr: pushErr } = await execAsync("npx prisma db push --accept-data-loss");
    console.log("Push log:", pushOut);
    if (pushErr) console.error("Push error:", pushErr);

    // 2. Création de l'admin
    console.log("➡️ Seeding...");
    const { stdout: seedOut, stderr: seedErr } = await execAsync("npx prisma db seed");
    console.log("Seed log:", seedOut);
    if (seedErr) console.error("Seed error:", seedErr);

    return NextResponse.json({ 
      success: true, 
      message: "Base de données initialisée avec succès !",
      details: { push: pushOut, seed: seedOut }
    });
  } catch (error: any) {
    console.error("❌ Erreur critique:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message, 
      stack: error.stack 
    }, { status: 500 });
  }
}
