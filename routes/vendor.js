
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Order from '../models/Order.js';   

const router = express.Router();


router.get('/orders', verifyToken, async (req, res) => {
  try {
    console.log('🔹 /api/vendor/orders hit, user =', req.user);

    const vendorId = req.user.userId || req.user._id;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: 'VendorId missing from token',
      });
    }

    const orders = await Order.find({ vendorId })
      .populate('customerId', 'name email')         
      .populate('items.product', 'name price image')
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


//ass


router.get("/vendors/:vendorId", verifyToken, async (req, res) => {
  try {
    const { vendorId } = req.params;

    const user = await User.findById(vendorId).select("name email phone");
    if (!user) return res.status(404).json({ success: false, message: "Vendor not found" });

    const [store, ordersCount, productsCount, revenueAgg] = await Promise.all([
      Store.findOne({ vendorId }).select("name status addressLine1 city state pincode"),
      Order.countDocuments({ vendorId }),
      Product.countDocuments({ vendorId }),
      Order.aggregate([
        { $match: { vendorId } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        storeName: store?.name || `${user.name}'s Store`,
        status: store?.status || "active",
        totalOrders: ordersCount,
        totalProducts: productsCount,
        totalRevenue: revenueAgg[0]?.totalRevenue || 0,
        rating: 4.5,
        storeAddress: store
      }
    });
  } catch (error) {
    console.error("Vendor API error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
