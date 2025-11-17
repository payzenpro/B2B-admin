import Order from '../models/Order.js';

// Get all orders (role-based filtering)
export const getAllOrders = async (req, res) => {
  try {
    let filter = {};

    // Role-based filtering
    if (req.user.role === 'vendor') {
      filter.vendor = req.user.id; 
    } else if (req.user.role === 'customer') {
      filter.customer = req.user.id;  
    }
    // Superadmin sees all orders (no filter)

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate('customer', 'name email phone')  
      .populate('vendor', 'name email');  
    res.json({ success: true, data: orders, count: orders.length });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email phone') 
      .populate('vendor', 'name email');  

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Access control
    if (req.user.role === 'vendor' && order.vendor?.toString() !== req.user.id) {  
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (req.user.role === 'customer' && order.customer?.toString() !== req.user.id) {  
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { 
      items, 
      totalAmount,
      paymentMethod, 
      paymentStatus, 
      status, 
      shippingAddress, 
      customerNote,
      vendorId  
    } = req.body;

    // Validate user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Items are required' 
      });
    }

    // Auto-calculate totalAmount if not provided
    const calculatedTotal = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const finalTotalAmount = totalAmount || calculatedTotal;

    if (finalTotalAmount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid total amount is required' 
      });
    }

    // Create order
    const order = new Order({
      customer: req.user.id,
      vendor: vendorId || null,  
      items: items.map(item => ({
        product: item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || ''
      })),
      totalAmount: finalTotalAmount,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentStatus || 'pending',
      status: status || 'pending',
      shippingAddress,
      customerNote,
      trackingHistory: [{
        status: status || 'pending',
        message: 'Order placed successfully',
        timestamp: new Date()
      }]
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};


// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Access control
    if (req.user.role === 'vendor' && order.vendor?.toString() !== req.user.id) { 
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    if (req.user.role === 'customer') {
      return res.status(403).json({ 
        success: false, 
        message: 'Customers cannot update order status' 
      });
    }

    // Update status
    order.status = req.body.status;
    
    // Add to tracking history
    order.trackingHistory.push({
      status: req.body.status,
      message: req.body.message || `Status updated to ${req.body.status}`
    });

    await order.save();

    res.json({ 
      success: true, 
      message: 'Order status updated', 
      data: order 
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Delete order (Superadmin only)
export const deleteOrder = async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only superadmin can delete orders' 
      });
    }

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Order deleted successfully' 
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
