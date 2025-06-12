import { Request, Response } from 'express';
import { PersonService } from '../services/person.service';
import { PersonSchema } from '../validators/person.validator';

export const PersonController = {
  create: async (req: Request, res: Response) => {
    try {
      const parsed = PersonSchema.parse(req.body); // ✅ validate here
      const person = await PersonService.createPerson(parsed.firstname, parsed.lastname, parsed.email, parsed.phone);
      res.status(201).json(person);
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: err.message });
    }
  },
};
