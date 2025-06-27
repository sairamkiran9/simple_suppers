import { Router } from 'express';
import { PersonController } from '../controllers/person.controller';
import { authenticateFirebase } from '../auth/auth';

const router = Router();

// Firebase-authenticated routes
router.post('/sync', authenticateFirebase, PersonController.syncProfile);
router.get('/profile', authenticateFirebase, PersonController.getProfile);
router.post('/complete', authenticateFirebase, PersonController.completeProfile);
router.put('/profile', authenticateFirebase, PersonController.updateProfile);

export default router;
