
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
    const email = 'zerolesignbeats@gmail.com';
    const password = '654321';

    console.log(`Upserting admin user: ${email}`);

    try {
        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                role: 'admin',
                // Update name if you want, but optional
            },
            create: {
                email,
                password: hashedPassword,
                name: 'Redbrush Admin',
                role: 'admin',
            },
        });

        console.log('Admin user upserted successfully:', user);
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
