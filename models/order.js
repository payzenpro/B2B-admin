
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
        size: String,
        color: String,
        image: String,
      },
    ],
    totalAmount: Number,
    paymentMethod: String,
    paymentStatus: String,
    status: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order; 
