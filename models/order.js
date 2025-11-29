import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: String,
  },
  { _id: false }
);

const trackingHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    message: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Items are required',
      },
    },

    totalAmount: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      enum: [
        'unassigned',
        'accepted',
        'packaging',
        'out_for_delivery',
        'delivered',
        'canceled',
        'refunded',
      ],
      default: 'unassigned',
    },

    shippingAddress: String,
    paymentMethod: { type: String, default: 'COD' },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },

    customerNote: String,
    trackingHistory: [trackingHistorySchema],
  },
  { timestamps: true }
);

orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD${String(count + 10001).padStart(6, '0')}`;
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
