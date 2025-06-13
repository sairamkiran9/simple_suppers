import { Router } from 'express';
import { PersonController } from '../controllers/person.controller';

const router = Router();

router.post('/', PersonController.create);

export default router;
