
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController.js';
import { getAllRefunds } from '../controllers/refundController.js';

const router = express.Router();


router.get('/customers', verifyToken, getAllCustomers);

router.get('/customers/:id', verifyToken, getCustomerById);
router.post('/customers', verifyToken, createCustomer);

// ✅ Update customer
router.put('/customers/:id', verifyToken, updateCustomer);

// ✅ Delete customer
router.delete('/customers/:id', verifyToken, deleteCustomer);




// ✅ Get all refunds for logged-in customer or all (if admin)
router.get('/refunds', verifyToken, getAllRefunds);

export default router;

