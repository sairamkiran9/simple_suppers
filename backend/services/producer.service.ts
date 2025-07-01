// src/services/producer.service.ts
import { MenuItemRepository } from "../repositories/menuitem.repository";

export class ProducerService {
  private menuRepo = new MenuItemRepository();

  async getActiveMeals(email: string) {
    const producerId = await this.menuRepo.getProducerIdByEmail(email); //email can also be used directly to fetch data.
    if (!producerId) throw new Error("Producer not found");

    return this.menuRepo.getActiveMenuItems(producerId);
  }

  async addMenuItem(
    email: string,
    itemData: {
      name: string;
      price: number;
      description?: string;
      maxLimit?: number;
    }
  ) {
    const producerId = await this.menuRepo.getProducerIdByEmail(email);
    if (!producerId) throw new Error("Producer not found");

    return this.menuRepo.createMenuItem({ ...itemData, producerId });
  }
}
