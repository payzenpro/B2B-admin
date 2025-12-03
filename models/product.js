// // import mongoose from 'mongoose';

// // const productSchema = new mongoose.Schema({
// //   name: { 
// //     type: String, 
// //     required: true 
// //   },
// //   description: String,
// //   price: { 
// //     type: Number, 
// //     required: true 
// //   },
// //   category: String,
// //   image: String,
// //   stock: { 
// //     type: Number, 
// //     default: 0 
// //   },
// //   vendorId: {
// //     type: mongoose.Schema.Types.ObjectId, 
// //     ref: 'User'
// //   },
// //   isActive: { 
// //     type: Boolean, 
// //     default: true 
// //   },
// //   status: {
// //     type: String,
// //     enum: ['pending', 'approved', 'rejected'],
// //     default: 'pending'
// //   }
// // }, { 
// //   timestamps: true 
// // });

// // export default mongoose.model('Product', productSchema);


// // backend/models/Product.js

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     stock: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },
//     image: {
//       type: String, 
//     },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;

// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    image: {
      type: String,
    },
    
    sizes: [String],
    colors: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
