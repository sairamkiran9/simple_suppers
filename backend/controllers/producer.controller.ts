import { Request, Response } from "express";
import { ProducerService } from "../services/producer.service";

const service = new ProducerService();

export const ProducerController = {
  async index(req: Request, res: Response) {
    try {
      const email = req.user?.email;
      if (!email) return res.status(403).json({ error: "Unauthorized" });

      const items = await service.getActiveMeals(email);
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async Additem(req: Request, res: Response) {
    try {
      const email = req.user?.email;
      if (!email) return res.status(403).json({ error: "Unauthorized" });

      const { name, price, description, maxLimit } = req.body;
      const item = await service.addMenuItem(email, {
        name,
        price,
        description,
        maxLimit,
      });

      res.status(201).json(item);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
