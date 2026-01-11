import { NextRequest, NextResponse } from "next/server"
import { analyzeMedicalImage } from "@/lib/ai-service"

export async function POST(req: NextRequest) {
    try {
        const { imageUrl, specialty } = await req.json()

        if (!imageUrl) {
            return NextResponse.json({ error: "Image URL manquante" }, { status: 400 })
        }

        const analysis = await analyzeMedicalImage(imageUrl, specialty || "Généraliste")

        return NextResponse.json({ analysis })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
