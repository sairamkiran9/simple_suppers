import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PersonRepository = {
  createPerson: async (data: { name: string; email: string; phone: string }) => {
    return prisma.person.create({ data });
  },
};
