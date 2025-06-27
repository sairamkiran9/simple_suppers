import { Request, Response } from 'express';
import { PersonService } from '../services/person.service';
import { ProfileCompletionSchema } from '../validators/person.validator';

export const PersonController = {
  // Sync profile from Firebase auth data (called after login)
  syncProfile: async (req: Request, res: Response) => {
    try {
      const firebaseUser = (req as any).user; // From authenticateFirebase middleware
      
      const profile = await PersonService.syncFromFirebase(firebaseUser);
      const needsCompletion = await PersonService.needsCompletion(firebaseUser.uid);
      
      res.json({
        profile,
        needsCompletion,
        message: needsCompletion ? 'Profile needs completion' : 'Profile synced successfully'
      });
    } catch (err: any) {
      console.error('Profile sync error:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Get current user's profile
  getProfile: async (req: Request, res: Response) => {
    try {
      const firebaseUser = (req as any).user;
      const profile = await PersonService.getProfile(firebaseUser.uid);
      
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      const needsCompletion = await PersonService.needsCompletion(firebaseUser.uid);
      
      res.json({
        profile,
        needsCompletion
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // Complete profile with additional required data
  completeProfile: async (req: Request, res: Response) => {
    try {
      const firebaseUser = (req as any).user;
      const parsed = ProfileCompletionSchema.parse(req.body);
      
      const result = await PersonService.completeProfile(firebaseUser.uid, parsed);
      
      res.json({
        message: 'Profile completed successfully',
        profile: result.person,
        address: result.address
      });
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: err.message });
    }
  },

  // Update profile
  updateProfile: async (req: Request, res: Response) => {
    try {
      const firebaseUser = (req as any).user;
      
      const profile = await PersonService.updateProfile(firebaseUser.uid, req.body);
      
      res.json({
        message: 'Profile updated successfully',
        profile
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
