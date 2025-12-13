import express from 'express';
import verifyToken, { authorize } from '../middleware/auth.js';
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getVendorOrders,
  getMyOrders,        
  getCustomerOrders,  
  getOrderById,       
} from '../controllers/orderController.js';

const router = express.Router();


router.post(
  '/orders',
  verifyToken,
  authorize('customer'),  
  createOrder
);

router.get(
  '/orders/my',
  verifyToken,
  authorize('customer'),
  getCustomerOrders     
);


router.get(
  '/orders',
  verifyToken,
  authorize('superadmin'),
  getAllOrders
);


router.get(
  '/vendor/orders',
  verifyToken,
  authorize('vendor'),
  getVendorOrders
);

router.get(
  '/orders/:id',
  verifyToken,
  getOrderById
);

router.put(
  '/orders/:id',
  verifyToken,
  authorize('superadmin', 'vendor'),
  updateOrder
);

router.delete(
  '/orders/:id',
  verifyToken,
  authorize('superadmin'),
  deleteOrder
);

export default router;

