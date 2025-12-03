
// import express from 'express';
// import verifyToken, { authorize } from '../middleware/auth.js';
// import {
//   createOrder,
//   updateOrder,
//   deleteOrder,
//   getAllOrders,
//   getMyOrders,
//   getVendorOrders
// } from '../controllers/orderController.js';

// const router = express.Router();

// router.post(
//   '/orders',
//   verifyToken,
//   authorize('superadmin', 'vendor'),
//   createOrder
// );


// router.get(
//   '/orders',
//   verifyToken,
//   authorize('superadmin'),
//   getAllOrders
// );

// router.get(
//   '/vendor/orders',
//   verifyToken,
//   authorize('vendor'),
//   getVendorOrders
// );


// // router.get(
// //   '/my-orders',
// //   verifyToken,
// //   authorize('customer'),
// //   getMyOrders
// // );

// router.get(
//   '/orders',
//   verifyToken,
//   authorize('customer'),
//   getMyOrders
// );

// router.put(
//   '/orders/:id',
//   verifyToken,
//   authorize('superadmin', 'vendor'),
//   updateOrder
// );

// router.delete(
//   '/orders/:id',
//   verifyToken,
//   authorize('superadmin'),
//   deleteOrder
// );

// router.post(
//   '/orders',
//   verifyToken,
//   authorize('customer'),
//   createOrder
// );




// export default router;

import express from 'express';
import verifyToken, { authorize } from '../middleware/auth.js';
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getVendorOrders,
  getMyOrders,        // optional
  getCustomerOrders,  // ye bhi banaya hua hai
  getOrderById,       // upar controller me already hai
} from '../controllers/orderController.js';

const router = express.Router();

// 1️⃣ Customer place order
router.post(
  '/orders',
  verifyToken,
  authorize('customer'),   // ya sirf verifyToken bhi rakh sakte ho
  createOrder
);

// 2️⃣ Customer – apne orders dekhe (My Orders)
// NOTE: isko hamesha /orders/:id se pehle likhna
router.get(
  '/orders/my',
  verifyToken,
  authorize('customer'),
  getCustomerOrders      // ya getMyOrders, jo tumhe pasand
);

// 3️⃣ Superadmin – sab orders
router.get(
  '/orders',
  verifyToken,
  authorize('superadmin'),
  getAllOrders
);

// 4️⃣ Vendor – apne orders
router.get(
  '/vendor/orders',
  verifyToken,
  authorize('vendor'),
  getVendorOrders
);

// 5️⃣ Order details (customer + vendor + admin sab use kar sakte, baad me role check bhi add kar sakte ho)
router.get(
  '/orders/:id',
  verifyToken,
  getOrderById
);

// 6️⃣ Update order (vendor/superadmin)
router.put(
  '/orders/:id',
  verifyToken,
  authorize('superadmin', 'vendor'),
  updateOrder
);

// 7️⃣ Delete order (sirf superadmin)
router.delete(
  '/orders/:id',
  verifyToken,
  authorize('superadmin'),
  deleteOrder
);

export default router;

