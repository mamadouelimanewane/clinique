import { PrismaClient } from '../src/generated/client'
import 'dotenv/config'

async function main() {
    console.log('ENV DATABASE_URL:', process.env.DATABASE_URL ? 'PRESENT' : 'MISSING')
    const prisma = new PrismaClient()
    try {
        await prisma.$connect()
        console.log('Successfully connected to DB')

        const users = await prisma.user.count()
        const patients = await prisma.patient.count()
        const rdvs = await prisma.rendezVous.count()
        const factures = await prisma.facture.count()

        console.log('📊 Verification des données:')
        console.log(`- Utilisateurs: ${users}`)
        console.log(`- Patients: ${patients}`)
        console.log(`- Rendez-vous: ${rdvs}`)
        console.log(`- Factures: ${factures}`)
    } catch (e) {
        console.error('Connection failed:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
