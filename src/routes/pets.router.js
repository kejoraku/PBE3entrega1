import { Router } from 'express';
import { getPets } from '../controllers/pets.controller.js';

const router = Router();

router.get('/', getPets);

export default router;
