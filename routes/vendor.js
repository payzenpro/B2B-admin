


// import express from 'express';
// import { verifyToken, authorize } from '../middleware/auth.js';
// import {
//   getAllVendors,
//   getVendorById,
//   createVendor,
//   updateVendor,
//   deleteVendor,
//   getVendorOrders
// } from '../controllers/vendorController.js';  

// const router = express.Router();

// router.get('/', verifyToken, authorize('superadmin'), getAllVendors);
// router.get('/:id', verifyToken, getVendorById);
// router.post('/', verifyToken, createVendor);
// router.put('/:id', verifyToken, updateVendor);
// router.delete('/:id', verifyToken, deleteVendor);

// router.get('/orders', verifyToken, authorize('vendor'), getVendorOrders);

// export default router;

// backend/routes/vendor.js
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Order from '../models/order.js';   // <- yahi wala model tumne banaya hai

const router = express.Router();

/**
 * GET /api/vendor/orders
 * Logged-in vendor ke saare orders laata hai
 */
router.get('/orders', verifyToken, async (req, res) => {
  try {
    console.log('🔹 /api/vendor/orders hit, user =', req.user);

    // Token payload se vendor ka id nikaalna
    // Tumhare token ka payload hai: { userId, email, role, name }
    const vendorId = req.user.userId || req.user._id;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: 'VendorId missing from token',
      });
    }

    // Order schema me field ka naam tumne yeh rakha hai:
    // customerId, vendorId, items, status, totalAmount, ...
    const orders = await Order.find({ vendorId })
      .populate('customerId', 'name email')         // optional
      .populate('items.product', 'name price image')// optional
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.error('❌ Error in /api/vendor/orders:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch vendor orders',
    });
  }
});

export default router;
