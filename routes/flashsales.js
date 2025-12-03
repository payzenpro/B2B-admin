
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllFlashsales,
  getFlashsaleById,
  createFlashsale,
  updateFlashsale,
  deleteFlashsale
} from '../controllers/flashsaleController.js';

const router = express.Router();

router.get('/flashsales', verifyToken, getAllFlashsales);
router.get('/flashsales/:id', verifyToken, getFlashsaleById);
router.post('/flashsales', verifyToken, createFlashsale);
router.put('/flashsales/:id', verifyToken, updateFlashsale);
router.delete('/flashsales/:id', verifyToken, deleteFlashsale);

export default router;
