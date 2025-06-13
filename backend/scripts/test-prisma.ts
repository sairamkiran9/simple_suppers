import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const person = await prisma.person.create({
    data: {
      firstname: 'Jack',
      lastname: 'Daniels',
      email: 'jd@bourbon.com',
      phone: '1234567890',
    },
  });

  console.log('Created person:', person);
}

main().finally(() => prisma.$disconnect());
