import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  
  // Status
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  verified: { type: Boolean, default: false },
  
  joinedDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Customer', CustomerSchema);
