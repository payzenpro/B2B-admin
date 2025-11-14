import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  owner: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  revenue: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Vendor', VendorSchema);
