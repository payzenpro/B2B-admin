// import mongoose from 'mongoose';

// const orderItemSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     image: String,
//     category: String,
//     store: String,
//   },
//   { _id: true }
// );

// const orderSchema = new mongoose.Schema(
//   {
    
//     orderId: {
//       type: String,
//       unique: true,
//        required: true,
//       default: function () {
        
//         return (
//           'ORD-' +
//           Date.now() +
//           '-' +
//           Math.floor(100 + Math.random() * 900)
//         );
//       },
//     },

//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },

//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },

//     items: {
//       type: [orderItemSchema],
//       required: true,
//       validate: (v) => Array.isArray(v) && v.length > 0,
//     },

//     paymentMethod: String,

//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'paid', 'failed'],
//       default: 'pending',
//     },

//     status: {
//       type: String,
//       enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },

//     shippingAddress: String,
//     customerNote: String,
//     adminNote: String,
//   },
//   { timestamps: true }
// );


// const Order =
//   mongoose.models.Order || mongoose.model('Order', orderSchema);

// export default Order;


import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: String
});

const trackingHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  message: String
});

const orderSchema = new mongoose.Schema({
  orderNumber: { 
    type: String, 
    unique: true,
    sparse: true
  },
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  vendor: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    default: 'pending'
  },
  shippingAddress: String,
  paymentMethod: { type: String, default: 'COD' },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  customerNote: String,
  trackingHistory: [trackingHistorySchema]
}, { timestamps: true });

// Auto-generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD${String(count + 10001).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);
