
import Coupon from '../models/Coupon.js';


export const getAllCoupons = async (req, res) => {
  try {
    let filter = {};
    
    if (req.user.role === 'vendor') {
      filter = {
        $or: [
          { vendorId: req.user.userId },
          { vendorId: null }
        ]
      };
    }

    const coupons = await Coupon.find(filter).sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      data: coupons,
      count: coupons.length 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    res.json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const createCoupon = async (req, res) => {
  try {
    const couponData = {
      ...req.body,
      vendorId: req.user.role === 'vendor' ? req.user.userId : null
    };

    const coupon = new Coupon(couponData);
    await coupon.save();

    res.status(201).json({ 
      success: true, 
      message: 'Coupon created',
      data: coupon 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    if (req.user.role === 'vendor' && coupon.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const updated = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      message: 'Coupon updated',
      data: updated 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    if (req.user.role === 'vendor' && coupon.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await Coupon.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const verifyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(),
      isActive: true,
      validUntil: { $gte: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invalid or expired coupon' 
      });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ 
        success: false, 
        message: 'Coupon usage limit reached' 
      });
    }

    res.json({ 
      success: true, 
      data: coupon 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(),
      isActive: true,
      validUntil: { $gte: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invalid coupon' 
      });
    }

    if (orderAmount < coupon.minOrderValue) {
      return res.status(400).json({ 
        success: false, 
        message: `Minimum order value is ₹${coupon.minOrderValue}` 
      });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (orderAmount * coupon.discount) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.discount;
    }

    coupon.usedCount += 1;
    await coupon.save();

    res.json({ 
      success: true, 
      discount,
      finalAmount: orderAmount - discount,
      message: 'Coupon applied successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getActiveCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({
      isActive: true,
      validUntil: { $gte: new Date() }
    }).sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      data: coupons,
      count: coupons.length 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCouponStats = async (req, res) => {
  try {
    const totalCoupons = await Coupon.countDocuments();
    const activeCoupons = await Coupon.countDocuments({ isActive: true });
    const expiredCoupons = await Coupon.countDocuments({ 
      validUntil: { $lt: new Date() } 
    });

    res.json({
      success: true,
      data: {
        totalCoupons,
        activeCoupons,
        expiredCoupons
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

