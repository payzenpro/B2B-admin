import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: String,
  vendorId: {  
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);
