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
import storeRoutes from './routes/stores.js';
import pushNotificationRoutes from './routes/pushNotificationRoutes.js';
import cartRoutes from './routes/cart.js';
 import profileRoutes from './routes/profile.js';
 import shopRoutes from "./routes/shop.js";
  import reviewRoutes from "./routes/review.js";
   import chatRoutes from "./routes/chat.js";
   import uploadRoutes from './routes/uploadRoutes.js';
    import AddressRoutes from './routes/address.js'; 


dotenv.config();

const app = express();
app.use = cors;


const MONGO_URI = 'mongodb://localhost:27017/ecommerce-admin';

mongoose.connect(MONGO_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error(' MongoDB Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/refunds', refundRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/banners', bannerRoutes);

app.use('/api', productRoutes); 
app.use('/api/customers', customerRoutes); 
app.use('/api/vendor', vendorRoutes); 
app.use('/api/categories', categoriesRoutes);
app.use('/api/attributes', attributesRoutes);
app.use('/api/stores', storeRoutes);


app.use('/api/pushNotifications', pushNotificationRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', profileRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/chat', chatRoutes);

app.use('/api/vendor', shopRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/address', AddressRoutes);




const PORT = 4000;
app.listen(PORT, () => {
  console.log(` SERVER ON http://localhost:${PORT}`);
});
