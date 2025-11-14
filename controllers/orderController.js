// import Order from '../models/Order.js';

// // Get all orders with role-based filtering
// export const getAllOrders = async (req, res) => {
//   try {
//     const { status } = req.query;
//     let filter = {};

//     if (req.user.role === 'vendor') {
//       filter.vendorId = req.user.userId;
//     } else if (req.user.role === 'customer') {
//       filter.customerId = req.user.userId;
//     }

    

//     if (status && status !== 'all') {
//       filter.status = status;
//     }

//     const orders = await Order.find(filter)
//       .sort({ createdAt: -1 })
//       .populate('customerId', 'name email phone')
//       .populate('vendorId', 'name storeName');

//     res.json({ 
//       success: true,
//       data: orders,
//       count: orders.length 
//     });

    







//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get single order with permission checks
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate('customerId', 'name email phone')
//       .populate('vendorId', 'name storeName');

//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     if (req.user.role === 'vendor' && order.vendorId?.toString() !== req.user.userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }
    
//     if (req.user.role === 'customer' && order.customerId?.toString() !== req.user.userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     res.json({ success: true, data: order });
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Create order
// export const createOrder = async (req, res) => {
//   try {
//     const orderData = {
//       ...req.body,
//       orderId: `ORD${Date.now()}`,
//       customerId: req.user.userId
//     };

//     const order = new Order(orderData);
//     await order.save();

//     res.status(201).json({ 
//       success: true, 
//       message: 'Order created successfully',
//       data: order 
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Update order status
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
    
//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     if (req.user.role === 'vendor' && order.vendorId?.toString() !== req.user.userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     if (req.user.role === 'customer') {
//       return res.status(403).json({ success: false, message: 'Customers cannot update order status' });
//     }

//     order.status = req.body.status;
//     if (req.body.adminNote) {
//       order.adminNote = req.body.adminNote;
//     }

//     await order.save();

//     res.json({ 
//       success: true, 
//       message: 'Order status updated',
//       data: order 
//     });
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Delete order
// export const deleteOrder = async (req, res) => {
//   try {
//     if (req.user.role !== 'superadmin') {
//       return res.status(403).json({ 
//         success: false, 
//         message: 'Only superadmin can delete orders' 
//       });
//     }

//     await Order.findByIdAndDelete(req.params.id);

//     res.json({ success: true, message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// controllers/orderController.


import Order from '../models/order.js';

export const getAllOrders = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'vendor') {
      filter.vendorId = req.user.userId;
    } else if (req.user.role === 'customer') {
      filter.customerId = req.user.userId;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate('customerId', 'name email phone')
      .populate('vendorId', 'name storeName');

    res.json({ success: true, data: orders, count: orders.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('vendorId', 'name storeName');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (req.user.role === 'vendor' && order.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (req.user.role === 'customer' && order.customerId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      orderId: `ORD${Date.now()}`,
      customerId: req.user.userId
    };

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({ success: true, message: 'Order created successfully', data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (req.user.role === 'vendor' && order.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (req.user.role === 'customer') {
      return res.status(403).json({ success: false, message: 'Customers cannot update order status' });
    }

    order.status = req.body.status;
    if (req.body.adminNote) {
      order.adminNote = req.body.adminNote;
    }

    await order.save();

    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Only superadmin can delete orders' });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




