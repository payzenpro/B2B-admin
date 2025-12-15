import express from 'express';
import Product from '../models/Product.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();


router.get('/products', async (req, res) => {
  try {
    console.log(' GET /api/products');
    
    const products = await Product.find().sort({ createdAt: -1 });
    
    console.log(` Found ${products.length} products`);
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error(' Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
router.get('/product/public', async (req, res) => {
  try {
    const { category } = req.query;
    console.log(' GET /api/product/public - Category:', category);
    
    let filter = { isActive: true, status: 'active' };
    
    if (category) {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    
    console.log(` Found ${products.length} products`);
    
    res.json({
      success: true,
      data: products,
      count: products.length,
      category: category || 'all'
    });
  } catch (error) {
    console.error(' Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


router.post('/products', verifyToken, async (req, res) => {
  try {
    console.log(' POST /api/products');
    console.log(' User:', req.user);
    
    if (req.user.role !== 'superadmin' && req.user.role !== 'vendor') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    const productData = { ...req.body };
    
    if (req.user.role === 'vendor') {
      productData.vendorId = req.user.userId;
    } else {
      delete productData.vendorId;
    }
    
    const product = new Product(productData);
    await product.save();
    
    console.log(' Product created:', product._id);
    
    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


router.put('/products/:id', verifyToken, async (req, res) => {
  try {
    console.log(' PUT /api/products/:id');
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    console.log(' Product updated');
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(' Error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


router.delete('/products/:id', verifyToken, async (req, res) => {
  try {
    console.log(' DELETE /api/products/:id');
    
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    console.log(' Product deleted');
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error(' Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
