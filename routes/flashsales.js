import express from 'express';
import {
  getAllFlashsales,
  getFlashsaleById,
  createFlashsale,
  updateFlashsale,
  deleteFlashsale
} from '../controllers/flashsaleController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllFlashsales);
router.get('/:id', getFlashsaleById);
router.post('/', createFlashsale);
router.put('/:id', updateFlashsale);
router.delete('/:id', deleteFlashsale);

export default router;
