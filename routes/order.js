import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/orders', verifyToken, getAllOrders);
router.get('/orders/:id', verifyToken, getOrderById);
router.post('/orders', verifyToken, createOrder);
router.put('/orders/:id/status', verifyToken, updateOrderStatus);
router.delete('/orders/:id', verifyToken, deleteOrder);

export default router;
