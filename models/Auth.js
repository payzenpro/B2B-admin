import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: String,
  role: {
    type: String,
    enum: ['superadmin', 'vendor', 'customer'],
    default: 'customer'
  },
  permissions: {
    canViewUsers: { type: Boolean, default: false },
    canCreateProduct: { type: Boolean, default: false },
    canViewOrders: { type: Boolean, default: false },
    canManageVendors: { type: Boolean, default: false },
    canViewAnalytics: { type: Boolean, default: false }
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  storeName: String,
  gstNumber: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  if (this.role === 'superadmin') {
    this.permissions = {
      canViewUsers: true,
      canCreateProduct: true,
      canViewOrders: true,
      canManageVendors: true,
      canViewAnalytics: true
    };
  } else if (this.role === 'vendor') {
    this.permissions = {
      canViewUsers: false,
      canCreateProduct: true,
      canViewOrders: true,
      canManageVendors: false,
      canViewAnalytics: true
    };
  } else if (this.role === 'customer') {
    this.permissions = {
      canViewUsers: false,
      canCreateProduct: false,
      canViewOrders: true,
      canManageVendors: false,
      canViewAnalytics: false
    };
  }
  next();
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
