import { NextResponse } from "next/server"
import { transcribeAndAnalyzeVoice } from "@/lib/ai-service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return new NextResponse("Aucun fichier audio fourni", { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const result = await transcribeAndAnalyzeVoice(buffer)

        return NextResponse.json(result)
    } catch (error) {
        console.error("[AI_VOICE_POST]", error)
        return new NextResponse("Erreur lors de l'analyse vocale", { status: 500 })
    }
}
