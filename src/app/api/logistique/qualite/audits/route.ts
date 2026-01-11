import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const audits = await prisma.auditQualite.findMany({
            orderBy: { dateAudit: 'desc' }
        })
        return NextResponse.json(audits)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Non autorisé", { status: 401 })

    try {
        const body = await req.json()
        const audit = await prisma.auditQualite.create({
            data: {
                ...body,
                dateAudit: body.dateAudit ? new Date(body.dateAudit) : new Date()
            }
        })
        return NextResponse.json(audit)
    } catch (error) {
        return new NextResponse("Erreur interne", { status: 500 })
    }
}
