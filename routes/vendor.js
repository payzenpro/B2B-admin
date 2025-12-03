
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
// router.get('/:id', verifyToken, getVendorById);
router.post('/', verifyToken, createVendor);
router.put('/:id', verifyToken, updateVendor);
router.delete('/:id', verifyToken, deleteVendor);

router.get('/orders', verifyToken, authorize('vendor'), getVendorOrders);
router.get('/:id', verifyToken, getVendorById);

export default router;
