import { prisma } from './src/lib/prisma';
import { compare } from 'bcryptjs';

async function checkUser() {
    const email = 'zerolesignbeats@gmail.com';
    console.log(`Checking for user: ${email}`);

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            console.log('User found:', user);
            // Check password '654321'
            const isMatch = await compare('654321', user.password);
            console.log('Password "654321" match:', isMatch);
        } else {
            console.log('User NOT found.');
        }
    } catch (error) {
        console.error('Error checking user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUser();
