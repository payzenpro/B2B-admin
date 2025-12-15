
import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    mrp: { type: Number, required: true },        
    sellingPrice: { type: Number, required: true },
    discountPercent: { type: Number },          
  },
  { _id: false }
);

const sizeOptionSchema = new mongoose.Schema(
  {
    label: String,         
    chest: String,        
    length: String,        
    stock: Number,       
  },
  { _id: false }
);

const offerSchema = new mongoose.Schema(
  {
    title: String,         
    description: String,  
    type: String,         
  },
  { _id: false }
);

const policySchema = new mongoose.Schema(
  {
    returnDays: Number,    
    returnPolicyText: String, 
    warrantyText: String,     
  },
  { _id: false }
);

const specSchema = new mongoose.Schema(
  {
    key: String,          
    value: String,        
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true ,lowercase: true },        
    slug: { type: String, unique: true },
    // brand: { type: String, required: true },       
    category: { type: String, required: true },   
    subCategory: { type: String },                

    description: { type: String },

    images: [String],                            
    thumbnail: String,                              

    colors: [String],                             
    sizes: [sizeOptionSchema],                      

    priceInfo: priceSchema,                    
    stock: { type: Number, default: 0 },           

    rating: { type: Number, default: 0 },          
    ratingCount: { type: Number, default: 0 },      
    reviewCount: { type: Number, default: 0 },      

    offers: [offerSchema],                          
    policy: policySchema,                           

    specifications: [specSchema],  
    
      vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    seller: {
     
      name: String,                                 
      rating: Number,                               
    },

    services: {
      codAvailable: { type: Boolean, default: true },
      fastDelivery: { type: Boolean, default: false },
    },

    isActive: { type: Boolean, default: true },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
