// import User from '../models/Auth.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { JWT_SECRET } from '../config/config.js';

// // Register function

// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role, phone, storeName, gstNumber } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ success: false, message: 'Email already in use' });

//     const newUser = new User({ name, email, password, role, phone, storeName, gstNumber });
//     await newUser.save();

//     res.status(201).json({ success: true, message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Login function

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//     const token = jwt.sign(
//       {
//         userId: user._id.toString(),
//         email: user.email,
//         role: user.role,
//         name: user.name
//       },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.json({
//       success: true,
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get all users function

// export const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const filter = role ? { role } : {};
//     const users = await User.find(filter);
//     res.json({ success: true, data: users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// // getAnalytics

// export const getAnalytics = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader?.startsWith('Bearer ')) {
//       return res.status(401).json({ success: false, message: "Authorization required" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, JWT_SECRET);
    
//     if (decoded.role !== "superadmin") {
//       return res.status(403).json({ success: false, message: "Superadmin access only" });
//     }

//     const [totalUsers, totalVendors, totalCustomers] = await Promise.all([
//       User.countDocuments(),
//       User.countDocuments({ role: "vendor" }),
//       User.countDocuments({ role: "customer" })
//     ]);

//     const analytics = {
//       totalUsers,
//       totalVendors,
//       totalCustomers,
//       totalOrders: 0  // Will be real when Order model exists
//     };

//     console.log("✅ Analytics:", analytics);
//     res.json({ success: true, data: analytics });
//   } catch (error) {
//     console.error("❌ Analytics error:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch analytics" });
//   }
// };

// // ✅ VENDOR ANALYTICS (authController.js me ye function add karo)
// export const getVendorAnalytics = async (req, res) => {
//   try {
  
//     const decoded = req.user; 
    
//     if (decoded.role !== 'vendor') {
//       return res.status(403).json({ 
//         success: false, 
//         message: 'Vendor access only' 
//       });
//     }

//     const vendorId = decoded.userId;

//     // VENDOR KE REAL STATS
//     const [totalProducts, totalOrders, pendingOrders, totalRevenue] = await Promise.all([
//       Product.countDocuments({ vendorId }),      
//       Order.countDocuments({ 'items.productId': { $in: await Product.distinct('_id', { vendorId }) } }), // Uske orders
//       Order.countDocuments({ 
//         status: 'pending',
//         'items.productId': { $in: await Product.distinct('_id', { vendorId }) }
//       }), // Pending orders
//       Order.aggregate([
//         { $match: { 
//             'items.productId': { $in: await Product.distinct('_id', { vendorId }) },
//             status: { $nin: ['cancelled', 'returned'] }
//           } 
//         },
//         { $unwind: '$items' },
//         { $group: { _id: null, total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } }
//       ])
//     ]);

//     const analytics = {
//       totalProducts,
//       totalOrders,
//       pendingOrders: pendingOrders[0]?.total || 0,
//       totalRevenue: totalRevenue[0]?.total || 0
//     };

//     console.log(' Vendor Analytics:', analytics);
//     res.json({ success: true, data: analytics });
//   } catch (error) {
//     console.error(' Vendor Analytics error:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
//   }
// };


import User from '../models/Auth.js';
import Product from '../models/Product.js';  // ✅ ADD THIS
import Order from '../models/Order.js';      // ✅ ADD THIS
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../config/config.js';

// Register function
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, storeName, gstNumber } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'Email already in use' });

    const newUser = new User({ name, email, password, role, phone, storeName, gstNumber });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all users function
export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter);
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin Analytics
export const getAnalytics = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Authorization required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.role !== "superadmin") {
      return res.status(403).json({ success: false, message: "Superadmin access only" });
    }

    const [totalUsers, totalVendors, totalCustomers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "vendor" }),
      User.countDocuments({ role: "customer" })
    ]);

    const analytics = {
      totalUsers,
      totalVendors,
      totalCustomers,
      totalOrders: 0
    };

    console.log("✅ Analytics:", analytics);
    res.json({ success: true, data: analytics });
  } catch (error) {
    console.error("❌ Analytics error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
};

// 🔥 VENDOR DASHBOARD (REAL API DATA - NO DUMMY)
export const getVendorDashboard = async (req, res) => {
  try {
    const decoded = req.user;
    
    if (decoded.role !== 'vendor') {
      return res.status(403).json({ success: false, message: 'Vendor access only' });
    }

    const vendorId = decoded.userId;

    // 🔥 Step 1: Vendor ke products fetch karo
    const vendorProducts = await Product.find({ vendorId }).select('_id');
    const productIds = vendorProducts.map(p => p._id);

    // Agar vendor ke products nahi hain
    if (productIds.length === 0) {
      return res.json({ 
        success: true, 
        data: {
          name: 'My Store',
          owner: decoded.name,
          confirmed: 0,
          delivered: 0,
          cooking: 0,
          readyForDelivery: 0,
          refunded: 0,
          all: 0,
          totalEarning: 0,
          commission: 0,
          recentOrders: []
        }
      });
    }

    // 🔥 Step 2: Status-wise order counts
    const orderCounts = await Order.aggregate([
      {
        $match: {
          'items.productId': { $in: productIds }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // 🔥 Step 3: Delivered orders revenue
    const revenueResult = await Order.aggregate([
      {
        $match: {
          'items.productId': { $in: productIds },
          status: 'delivered'
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      }
    ]);

    // 🔥 Step 4: Recent 4 orders
    const recentOrders = await Order.find({
      'items.productId': { $in: productIds }
    })
    .sort({ createdAt: -1 })
    .limit(4)
    .select('status createdAt customerName totalAmount items')
    .lean();

    // Map status counts
    const stats = orderCounts.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;
    const commission = totalRevenue * 0.1; // 10%

    // 🔥 FRONTEND FORMAT (REAL DATA)
    const vendorData = {
      name: 'My Store',
      owner: decoded.name,
      confirmed: stats.confirmed || 0,
      delivered: totalRevenue,
      cooking: stats.processing || 0,
      readyForDelivery: stats.ready || 0,
      refunded: stats.refunded || 0,
      all: await Order.countDocuments({ 'items.productId': { $in: productIds } }),
      totalEarning: totalRevenue,
      commission,
      recentOrders: recentOrders.map(order => ({
        id: order._id.toString().slice(-6).toUpperCase(),
        customer: order.customerName || 'Customer',
        total: order.totalAmount || order.items.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0),
        status: order.status || 'pending',
        date: new Date(order.createdAt).toISOString().split('T')[0]
      }))
    };

    console.log('🔥 REAL Vendor Data:', {
      products: vendorProducts.length,
      orders: vendorData.all,
      revenue: totalRevenue
    });

    res.json({ success: true, data: vendorData });
  } catch (error) {
    console.error('❌ Vendor Dashboard Error:', error);
    
    // Empty fallback (no dummy numbers)
    res.json({ 
      success: true,
      data: {
        name: 'My Store',
        owner: req.user?.name || 'Vendor',
        confirmed: 0,
        delivered: 0,
        cooking: 0,
        readyForDelivery: 0,
        refunded: 0,
        all: 0,
        totalEarning: 0,
        commission: 0,
        recentOrders: []
      }
    });
  }
};
