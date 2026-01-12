import { PrismaClient } from '../src/generated/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    // Find ADMIN role first
    let adminRole = await prisma.role.findUnique({ where: { nom: 'ADMIN' } })
    if (!adminRole) {
        adminRole = await prisma.role.create({
            data: {
                nom: 'ADMIN',
                description: 'Administrateur système'
            }
        })
    }

    const user = await prisma.user.upsert({
        where: { email: 'admin@sighi.sn' },
        update: {
            password: hashedPassword,
            actif: true
        },
        create: {
            email: 'admin@sighi.sn',
            password: hashedPassword,
            nom: 'Admin',
            prenom: 'Système',
            roleId: adminRole.id,
            actif: true
        }
    })
    
    console.log('User created/updated:', user.email)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())
