import { Router } from 'express';
import { getAllAdoptions, getAdoptionById, createAdoption } from '../controllers/adoption.controller.js';

const router = Router();

router.get('/', getAllAdoptions);
router.get('/:aid', getAdoptionById);
router.post('/:uid/:pid', createAdoption);

export default router;
