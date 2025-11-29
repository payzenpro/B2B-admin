import express from 'express';
import verifyToken, { authorize } from '../middleware/auth.js';
import {
  createOrder,
  getAllOrders,
  getVendorOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();


router.post('/orders', verifyToken, createOrder);
router.get('/orders', verifyToken, authorize('superadmin'), getAllOrders);
router.get('/vendor/orders', verifyToken, authorize('vendor'), getVendorOrders);

router.get('/orders/:id', verifyToken, getOrderById);
router.put('/orders/:id/status', verifyToken, updateOrderStatus);
router.delete('/orders/:id', verifyToken, authorize('superadmin'), deleteOrder);

export default router;
