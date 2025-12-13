
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


router.put('/customers/:id', verifyToken, updateCustomer);

router.delete('/customers/:id', verifyToken, deleteCustomer);


router.get('/refunds', verifyToken, getAllRefunds);




//aaa
// routes/customer.js me add karo
router.get('/customers/:id/dashboard', verifyToken, async (req, res) => {
  try {
    const customerId = req.params.id;
    
    // Basic customer info
    const customer = await getCustomerById(req, res, true); // Agar getCustomerById helper me param hai
    
    // Aggregated stats
    const totalOrdersCount = await Order.countDocuments({ customerId });
    const totalSpentAgg = await Order.aggregate([
      { $match: { customerId } },
      { $group: { _id: null, totalSpent: { $sum: "$totalAmount" } } }
    ]);
    const totalSpent = totalSpentAgg[0]?.totalSpent || 0;
    
    res.json({
      success: true,
      data: {
        ...customer.toObject(),
        totalOrders: totalOrdersCount,
        totalSpent
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

