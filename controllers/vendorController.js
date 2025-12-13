import Vendor from '../models/Vendor.js';
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json({ success: true, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Vendor deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const orders = await Order.find({ vendorId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// controllers/vendorController.js ya orderController.js me
export const getVendorStores = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    
    const stores = await Product.find({ vendorId })
      .select('name price description images storeName category')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ 
      success: true, 
      data: stores 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch stores' 
    });
  }
};
