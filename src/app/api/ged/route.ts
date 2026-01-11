import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const { searchParams } = new URL(req.url)
        const patientId = searchParams.get("patientId")
        const module = searchParams.get("module")

        const query: any = {}
        if (patientId) query.patientId = patientId
        if (module) query.module = module

        const documents = await prisma.documentGED.findMany({
            where: query,
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        numeroPatient: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(documents)
    } catch (error) {
        console.error("[GED_GET]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const { titre, type, url, module, patientId, metadata } = body

        const document = await prisma.documentGED.create({
            data: {
                titre,
                type,
                url,
                module,
                patientId,
                metadata: metadata || {}
            }
        })

        return NextResponse.json(document)
    } catch (error) {
        console.error("[GED_POST]", error)
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
