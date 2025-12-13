import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
