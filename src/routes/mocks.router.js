import { Router } from 'express';
import { getMockingPets, getMockingUsers, generateData } from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets', getMockingPets);
router.get('/mockingusers', getMockingUsers);
router.post('/generateData', generateData);

export default router;
