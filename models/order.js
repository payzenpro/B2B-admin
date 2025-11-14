import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
   // required: true, 
    unique: true ,
     default: function () {
      return 'ORD-' + Math.floor(1000 + Math.random() * 9000);
  },
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  items: [{
    productId: String,
    productName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending' 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  shippingAddress: String,
  customerNote: String,
  adminNote: String
}}, { 
  timestamps: true 
});

export default mongoose.model('Order', orderSchema);
