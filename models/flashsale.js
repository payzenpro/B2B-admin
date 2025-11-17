
// import mongoose from 'mongoose';

// const flashsaleSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   description: String,
//   discount: { type: Number, required: true, min: 0, max: 100 },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   startTime: String,
//   endTime: String,
//   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
//   totalSold: { type: Number, default: 0 },
//   totalRevenue: { type: Number, default: 0 },
//   status: { type: String, enum: ['upcoming', 'active', 'ended'], default: 'upcoming' },
//   vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }  // Link vendor for role-based filtering
// }, { timestamps: true });

// export default mongoose.model('Flashsale', flashsaleSchema);

// backend/models/Flashsale.js
import mongoose from 'mongoose';

const flashsaleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  startTime: { type: String, default: '00:00' },
  endTime: { type: String, default: '23:59' },
  status: { type: String, enum: ['active', 'upcoming', 'ended'], default: 'upcoming' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalSold: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Flashsale', flashsaleSchema);
