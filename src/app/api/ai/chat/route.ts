import { NextRequest, NextResponse } from "next/server"
import { processChatWithAi } from "@/lib/ai-service"

export async function POST(req: NextRequest) {
    try {
        const { message, context } = await req.json()

        if (!message) {
            return NextResponse.json({ error: "Message manquant" }, { status: 400 })
        }

        const response = await processChatWithAi(message, context || {})

        return NextResponse.json({ response })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
