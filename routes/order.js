// import express from 'express';
// import { verifyToken } from '../middleware/auth.js';
// import {
//   getAllOrders,
//   getOrderById,
//   createOrder,
//   updateOrderStatus,
//   deleteOrder
// } from '../controllers/orderController.js';

// const router = express.Router();

// router.get('/', verifyToken, getAllOrders);
// router.get('/:id', verifyToken, getOrderById);
// router.post('/', verifyToken, createOrder);
// router.put('/:id/status', verifyToken, updateOrderStatus);
// router.delete('/:id', verifyToken, deleteOrder);

// export default router;

// backend/routes/order.js
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', verifyToken, getAllOrders);
router.get('/:id', verifyToken, getOrderById);
router.post('/', verifyToken, createOrder);
router.put('/:id/status', verifyToken, updateOrderStatus);
router.delete('/:id', verifyToken, deleteOrder);


export default router;

