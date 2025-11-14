import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllRefunds,
  getRefundById,
  createRefund,
  updateRefund,
  deleteRefund,
  approveRefund,
  rejectRefund,
  getMyRefunds
} from '../controllers/refundController.js';

const router = express.Router();

router.get('/', verifyToken, getAllRefunds);
router.get('/my-refunds', verifyToken, getMyRefunds);
router.get('/:id', verifyToken, getRefundById);
router.post('/', verifyToken, createRefund);
router.put('/:id', verifyToken, updateRefund);
router.put('/:id/approve', verifyToken, approveRefund);
router.put('/:id/reject', verifyToken, rejectRefund);
router.delete('/:id', verifyToken, deleteRefund);

export default router;
