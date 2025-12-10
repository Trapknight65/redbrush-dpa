import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'zerolesignbeats@gmail.com'
    const password = await hash('654321', 10)

    // Use upsert to avoid errors if user already exists
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            // Update password if it exists to ensure we know it
            password,
        },
        create: {
            email,
            password,
            name: 'Redbrush Admin',
            role: 'admin',
        },
    })
    console.log('Admin user seeded:', user.email)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
