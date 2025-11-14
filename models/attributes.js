import mongoose from 'mongoose';

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['dropdown', 'text', 'color'],
    required: true
  },
  values: [String],
  productsUsing: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

export default mongoose.model('attribute', attributeSchema);
