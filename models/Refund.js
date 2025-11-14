import mongoose from 'mongoose';

const refundSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true 
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: String,
  customerEmail: String,
  reason: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'requested', 'approved', 'rejected', 'processed'],
    default: 'pending' 
  },
  requestedAt: { 
    type: Date, 
    default: Date.now 
  },
  processedAt: Date,
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminNote: String
}, { 
  timestamps: true 
});

export default mongoose.model('Refund', refundSchema);
