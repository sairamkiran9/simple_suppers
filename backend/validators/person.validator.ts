import { z } from 'zod';

// For creating/updating profile from Firebase token data
export const FirebaseProfileSchema = z.object({
  firebaseUid: z.string().min(1),
  email: z.string().email(),
  displayName: z.string().optional(),
  photoURL: z.string().url().optional(),
  emailVerified: z.boolean().default(false),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

// For profile completion (missing required fields)
export const ProfileCompletionSchema = z.object({
  firstname: z.string().min(1).max(100).optional(),
  lastname: z.string().min(1).max(100).optional(),
  phone: z.string().regex(/^[0-9\-\+\s\(\)]+$/).min(10),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  }),
});

// For updating existing profile
export const ProfileUpdateSchema = z.object({
  firstname: z.string().min(1).max(100).optional(),
  lastname: z.string().min(1).max(100).optional(),
  phone: z.string().regex(/^[0-9\-\+\s\(\)]+$/).optional(),
  displayName: z.string().optional(),
});

export type FirebaseProfile = z.infer<typeof FirebaseProfileSchema>;
export type ProfileCompletion = z.infer<typeof ProfileCompletionSchema>;
export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>;