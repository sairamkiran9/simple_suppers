import { PrismaClient, MenuItem } from "@prisma/client";

const prisma = new PrismaClient();

export class MenuItemRepository {
  // Create a menu item
  async createMenuItem(data: {
    name: string;
    price: number;
    description?: string;
    maxLimit?: number;
    producerId: number;
  }): Promise<MenuItem> {
    return await prisma.menuItem.create({
      data,
    });
  }

  async getProducerIdByEmail(email: string): Promise<number | null> {
    const producer = await prisma.producer.findUnique({
      where: { personEmail: email },
    });
    return producer?.id ?? null;
  }

  async getActiveMenuItems(producerId: number): Promise<MenuItem[]> {
    return prisma.menuItem.findMany({
      where: { producerId, maxLimit: { gt: 0 } },
      orderBy: { createdAt: "desc" },
    });
  }
}
