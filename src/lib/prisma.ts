import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query', 'error', 'warn'],
    })

if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing in environment variables!");
    // In strict mode we might throw, but logging is essential for Render logs
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
