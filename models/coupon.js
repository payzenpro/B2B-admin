// import mongoose from 'mongoose';

// const couponSchema = new mongoose.Schema({
//   code: { type: String, required: true, unique: true, uppercase: true },
//   description: { type: String, required: true },
//   discountType: { type: String, enum: ['percent', 'fixed'], required: true },
//   discountValue: { type: Number, required: true, min: 0 },
//   minPurchase: { type: Number, required: true, default: 0 },
//   maxDiscount: { type: Number, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   usageLimit: { type: Number, required: true, default: 100 },
//   used: { type: Number, default: 0 },
//   applicableOn: { type: String, enum: ['all', 'electronics', 'fashion', 'grocery', 'pharmacy'], default: 'all' },
//   status: { type: String, enum: ['active', 'scheduled', 'ended', 'inactive'], default: 'active' },

  
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// }, { timestamps: true });

// couponSchema.set('toJSON', { virtuals: true });
// export default mongoose.model('Coupon', couponSchema);

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
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
