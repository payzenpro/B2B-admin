import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    url: String,
    publicId: String
  }],
  vendorResponse: {
    message: String,
    respondedAt: Date
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: true
  },
  helpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews
reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
