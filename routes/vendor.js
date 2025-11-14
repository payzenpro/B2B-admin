// import express from 'express';
// import {
//   getAllVendors,
//   getVendorById,
//   createVendor,
//   updateVendor,
//   deleteVendor
// } from '../controllers/vendorController.js';

// const router = express.Router();

// router.get('/vendors', getAllVendors);

// router.get('/vendors/:id', getVendorById);

// // CRUD operations
// router.post('/vendors', createVendor);
// router.put('/vendors/:id', updateVendor);
// router.delete('/vendors/:id', deleteVendor);

// export default router;


// import express from 'express';
// import { verifyToken } from '../middleware/auth.js';
// import { getAllRefunds } from '../controllers/refundController.js';

// const router = express.Router();

// // ✅ Vendor routes (filtered by vendorId in controller)
// router.get('/refunds', verifyToken, getAllRefunds);

// // ✅ Placeholder for future routes (comment out for now)
// // router.get('/orders', verifyToken, getVendorOrders);
// // router.get('/products', verifyToken, getVendorProducts);


// export default router;


import express from 'express';
import { verifyToken, authorize } from '../middleware/auth.js';
import {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorOrders
} from '../controllers/vendorController.js';  

const router = express.Router();

router.get('/', verifyToken, authorize('superadmin'), getAllVendors);
router.get('/:id', verifyToken, getVendorById);
router.post('/', verifyToken, createVendor);
router.put('/:id', verifyToken, updateVendor);
router.delete('/:id', verifyToken, deleteVendor);

router.get('/orders', verifyToken, authorize('vendor'), getVendorOrders);

export default router;
