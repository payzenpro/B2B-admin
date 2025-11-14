import Refund from '../models/Refund.js';

// Get all refunds
export const getAllRefunds = async (req, res) => {
  try {
    let filter = {};
    
    if (req.user.role === 'vendor') {
      filter.vendorId = req.user.userId;
    } else if (req.user.role === 'customer') {
      filter.customerId = req.user.userId;
    }

    const refunds = await Refund.find(filter)
      .sort({ createdAt: -1 })
      .populate('customerId', 'name email');

    res.json({ 
      success: true, 
      data: refunds,
      count: refunds.length 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single refund
export const getRefundById = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id)
      .populate('customerId', 'name email');
    
    if (!refund) {
      return res.status(404).json({ success: false, message: 'Refund not found' });
    }

    res.json({ success: true, data: refund });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create refund
export const createRefund = async (req, res) => {
  try {
    const refundData = {
      ...req.body,
      customerId: req.user.userId,
      customerName: req.user.name,
      customerEmail: req.user.email,
      status: 'pending'
    };

    const refund = new Refund(refundData);
    await refund.save();

    res.status(201).json({ 
      success: true, 
      message: 'Refund request created',
      data: refund 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update refund
export const updateRefund = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id);
    
    if (!refund) {
      return res.status(404).json({ success: false, message: 'Refund not found' });
    }

    if (req.user.role === 'customer' && refund.customerId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const updated = await Refund.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      message: 'Refund updated',
      data: updated 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Approve refund
export const approveRefund = async (req, res) => {
  try {
    if (req.user.role !== 'superadmin' && req.user.role !== 'vendor') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only admins can approve refunds' 
      });
    }

    const refund = await Refund.findById(req.params.id);
    
    if (!refund) {
      return res.status(404).json({ success: false, message: 'Refund not found' });
    }

    refund.status = 'approved';
    refund.processedAt = new Date();
    refund.processedBy = req.user.userId;
    await refund.save();

    res.json({ 
      success: true, 
      message: 'Refund approved',
      data: refund 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reject refund
export const rejectRefund = async (req, res) => {
  try {
    if (req.user.role !== 'superadmin' && req.user.role !== 'vendor') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only admins can reject refunds' 
      });
    }

    const refund = await Refund.findById(req.params.id);
    
    if (!refund) {
      return res.status(404).json({ success: false, message: 'Refund not found' });
    }

    refund.status = 'rejected';
    refund.processedAt = new Date();
    refund.processedBy = req.user.userId;
    if (req.body.reason) refund.adminNote = req.body.reason;
    await refund.save();

    res.json({ 
      success: true, 
      message: 'Refund rejected',
      data: refund 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete refund
export const deleteRefund = async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only superadmin can delete' 
      });
    }

    await Refund.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Refund deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get my refunds (for customers)
export const getMyRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find({ customerId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      data: refunds,
      count: refunds.length 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
