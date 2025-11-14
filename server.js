import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.js';
import refundRoutes from './routes/refund.js';
import couponRoutes from './routes/coupon.js';
import bannerRoutes from './routes/banners.js';
import orderRoutes from './routes/order.js';
import productRoutes from './routes/product.js'; 
import customerRoutes from './routes/customers.js'; 
import vendorRoutes from './routes/vendor.js'; 
import categoriesRoutes from './routes/categories.js'; 
import attributesRoutes from './routes/attributes.js';
import storesRoutes from './routes/stores.js'; 
import flashsalesRoutes from './routes/flashsales.js';




dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


const MONGO_URI = 'mongodb://localhost:27017/ecommerce-admin';

mongoose.connect(MONGO_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error(' MongoDB Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/refunds', refundRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes); 
app.use('/api/customers', customerRoutes); 
app.use('/api/vendor', vendorRoutes); 
app.use('/api/categories', categoriesRoutes);
app.use('/api/attributes', attributesRoutes);
app.use('/api/stores', storesRoutes);
app.use('/api/flashsales', flashsalesRoutes);




const PORT = 4000;
app.listen(PORT, () => {
  console.log(` SERVER ON http://localhost:${PORT}`);
});
