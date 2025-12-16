
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function addUser() {
  const email = 'aparicio.bambi@gmail.com';
  const password = '123456';
  
  // Assuming 'admin' role is desired since this is likely for dashboard access
  const role = 'admin'; 

  console.log(`Upserting user: ${email}`);

  try {
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        // We update the role to ensure they have access if they already existed as a regular user
        role: role, 
      },
      create: {
        email,
        password: hashedPassword,
        name: 'Aparicio Bambi',
        role: role,
      },
    });

    console.log('User upserted successfully:', user);
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addUser();
