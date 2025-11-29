import Order from '../models/Order.js';


export const createOrder = async (req, res) => {
  try {
    const {customerId,vendorId,items,totalAmount,status,shippingAddress,paymentMethod,paymentStatus,customerNote,} = req.body;

    const order = await Order.create({
      customerId,vendorId,items,totalAmount,status: status || 'unassigned',
       shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentStatus || 'pending',
      customerNote,
    });

    return res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(400).json({ success: false, error: err.message });
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
