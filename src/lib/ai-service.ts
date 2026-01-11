import { OpenAI } from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const deepseek = new OpenAI({
    apiKey: "sk-c8185246c4e54519884527829170409f", // Clé fournie par l'utilisateur
    baseURL: "https://api.deepseek.com",
})

export async function analyzeMedicalImage(imageUrl: string, specialty: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `Tu es un expert en imagerie médicale spécialisé en ${specialty}. Analyse l'image fournie et fournis un rapport structuré incluant : Détection, Localisation, Gravité et Recommandations. Réponds en français.`
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyse cette image médicale et identifie d'éventuelles anomalies." },
                        { type: "image_url", image_url: { url: imageUrl } }
                    ]
                }
            ],
            max_tokens: 500,
        })

        return response.choices[0].message.content
    } catch (error) {
        console.error("Erreur Analyse Image IA:", error)
        throw new Error("Échec de l'analyse d'image")
    }
}

export async function processChatWithAi(message: string, patientContext: any) {
    try {
        const response = await deepseek.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: "Tu es l'assistant intelligent de la Clinique Aéré Lao. Ton rôle est d'accueillir les patients, de qualifier leurs symptômes et de les orienter. Si le cas semble urgent, dédie un message d'alerte spécifique. Contexte patient: " + JSON.stringify(patientContext)
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 300,
        })

        return response.choices[0].message.content
    } catch (error) {
        console.error("Erreur Chat IA DeepSeek:", error)
        throw new Error("Échec de la réponse IA")
    }
}

export async function transcribeAndAnalyzeVoice(audioBuffer: Buffer) {
    try {
        // Transcription via Whisper
        const transcription = await openai.audio.transcriptions.create({
            file: await OpenAI.toFile(audioBuffer, "audio.mp3"),
            model: "whisper-1",
            response_format: "text",
        })

        // Analyse de sentiment / biomarqueurs via DeepSeek (plus performant en raisonnement textuel)
        const analysis = await deepseek.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: "Analyse ce texte transcrit d'une consultation médicale. Identifie les biomarqueurs vocaux rapportés : stress, fatigue, clarté mentale. Réponds par un objet JSON."
                },
                {
                    role: "user",
                    content: transcription
                }
            ]
        })

        return {
            text: transcription,
            analysis: JSON.parse(analysis.choices[0].message.content || "{}")
        }
    } catch (error) {
        console.error("Erreur Analyse Vocale IA:", error)
        throw new Error("Échec de l'analyse vocale")
    }
}
