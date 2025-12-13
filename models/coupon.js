
import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },

  discount: { type: Number, required: true },

  discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  minOrderValue: { type: Number, default: 0 },
  maxDiscount: { type: Number },
  vendorId: {  
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  validFrom: { type: Date, default: Date.now },
  validUntil: { type: Date, required: true },
  usageLimit: { type: Number, default: 1 },
  usedCount: { type: Number, default: 0 },
    status: { 
    type: String,
    enum: ['active', 'scheduled', 'ended', 'inactive'],
    default: 'active'
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
