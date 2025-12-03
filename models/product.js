// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: true 
//   },
//   description: String,
//   price: { 
//     type: Number, 
//     required: true 
//   },
//   category: String,
//   image: String,
//   stock: { 
//     type: Number, 
//     default: 0 
//   },
//   vendorId: {
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User'
//   },
//   isActive: { 
//     type: Boolean, 
//     default: true 
//   }
// }, { 
//   timestamps: true 
// });

// export default mongoose.model('Product', productSchema);


import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  price: { 
    type: Number, 
    required: true 
  },
  category: String,
  image: String,
  stock: { 
    type: Number, 
    default: 0 
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },

  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Product', productSchema);
