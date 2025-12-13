import Order from '../models/Order.js';
import Product from '../models/Product.js'; 
export const createOrder = async (req, res) => {
  try {
    const customerId = req.user._id || req.user.userId; 
    const {
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
      status,
      vendorId
    } = req.body;

    const order = await Order.create({
      customerId,     
      vendorId,
      items,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentStatus || "pending",
      status: status || "pending",
      vendorId: vendorId || null,
    });

    return res
      .status(201)
      .json({ success: true, message: "Order created", data: order });
  } catch (err) {
    console.error("createOrder error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create order" });
  }
};




export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('customerId', 'name email')
      .populate('vendorId', 'name email');

    return res.json({ success: true, data: orders });
  } catch (err) {
    console.error('Get all orders error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.user.userId; 

    const orders = await Order.find({ vendorId })
      .sort({ createdAt: -1 })
      .populate('customerId', 'name email');
    const mapped = orders.map((o) => ({
      _id: o._id,
      orderNumber: o.orderNumber,
      customerId: o.customerId, 
      customerName: o.customerId?.name || o.customerId?.email || 'N/A',
      totalAmount: o.totalAmount,
      status: o.status,
      createdAt: o.createdAt,
    }));

    return res.json({ success: true, data: mapped });
  } catch (err) {
    console.error('Get vendor orders error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'name email')
      .populate('vendorId', 'name email');

    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: 'Order not found' });
    }

    return res.json({ success: true, data: order });
  } catch (err) {
    console.error('Get order by id error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: 'Order not found' });
    }

    return res.json({ success: true, data: order });
  } catch (err) {
    console.error('Update order status error:', err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: 'Order not found' });
    }

    return res.json({ success: true, message: 'Order deleted' });
  } catch (err) {
    console.error('Delete order error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};




//add 

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;          
    const user = req.user;             

    let order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

   
    if (user.role === 'superadmin') {
    
    }
    else if (user.role === 'vendor') {
      const tokenVendorId = user.raw.vendorId || user.raw.vendor || user.raw.vendor_id;

      if (!tokenVendorId || order.vendorId.toString() !== String(tokenVendorId)) {
        return res.status(403).json({ success: false, message: 'This order does not belong to you' });
      }
    }
    else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const { status, totalAmount } = req.body;

    if (status) order.status = status;
    if (totalAmount) order.totalAmount = totalAmount;

    await order.save();

    return res.json({ success: true, order });
  } catch (err) {
    console.error('updateOrder error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};




export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const orders = await Order.find({ customerId: userId }).sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (err) {
    console.error('getMyOrders error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};



//add /
export const getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.user._id || req.user.userId;
    console.log("customerId used for query:", customerId);

    const orders = await Order.find({ customerId })
      .sort({ createdAt: -1 })
      .populate("items.productId", "name image price");

    console.log("Found orders count:", orders.length);

    return res.json({ success: true, data: orders });
  } catch (err) {
    console.error("getCustomerOrders error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders" });
  }
};
