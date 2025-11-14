// import mongoose from 'mongoose';

// const bannerSchema = new mongoose.Schema({
 
//   title: { 
//     type: String, 
//     required: true,
//     trim: true
//   },
//   description: { 
//     type: String, 
//     required: true,
//     trim: true
//   },
//   image: { 
//     type: String, 
//     required: true 
//   },
//   imagePreview: { 
//     type: String,
//     default: '🖼️'
//   },
  
//   type: { 
//     type: String, 
//     enum: ['promotional', 'flash-sale', 'category', 'brand', 'seasonal'],
//     required: true 
//   },
  
  
//   zone: { 
//     type: String, 
//     enum: ['all', 'south', 'north', 'east', 'west', 'ncr'],
//     required: true,
//     default: 'all'
//   },
//   store: { 
//     type: String, 
//     enum: ['all', 'grocery', 'electronics', 'fashion', 'pharmacy'],
//     required: true,
//     default: 'all'
//   },

//   position: { 
//     type: String, 
//     enum: ['home-top', 'home-middle', 'home-bottom', 'products-page', 'sidebar', 'mobile-top'],
//     required: true 
//   },
  
//   // Link & Navigation
//   link: { 
//     type: String, 
//     required: true 
//   },
  
//   // Status & Scheduling
//   status: { 
//     type: String, 
//     enum: ['active', 'scheduled', 'inactive'],
//     default: 'active',
//    // uppercase: true
//   },
//   startDate: { 
//     type: Date,
//     default: Date.now
//   },
//   endDate: { 
//     type: Date 
//   },
  
//   // Performance Metrics
//   impressions: { 
//     type: Number, 
//     default: 0,
//     min: 0
//   },
//   clicks: { 
//     type: Number, 
//     default: 0,
//     min: 0
//   },
  
//   // Metadata
//   createdBy: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User'
//   },
  
// }, { 
//   timestamps: true 
// });

// // Virtual for CTR (Click-Through Rate)
// bannerSchema.virtual('ctr').get(function() {
//   if (this.impressions === 0) return 0;
//   return ((this.clicks / this.impressions) * 100).toFixed(2);
// });

// // Method to increment impressions
// bannerSchema.methods.trackImpression = async function() {
//   this.impressions += 1;
//   return await this.save();
// };

// // Method to increment clicks
// bannerSchema.methods.trackClick = async function() {
//   this.clicks += 1;
//   return await this.save();
// };

// // Index for better query performance
// bannerSchema.index({ status: 1, zone: 1, store: 1 });
// bannerSchema.index({ startDate: 1, endDate: 1 });

// export default mongoose.model('Banner', bannerSchema);


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
