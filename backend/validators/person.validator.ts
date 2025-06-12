import { z } from 'zod';

export const PersonSchema = z.object({
  firstname: z.string().min(1).max(100),
  lastname: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9\-\+\s\(\)]+$/).optional(), // phone regex, allow +, -, spaces, etc.
});
