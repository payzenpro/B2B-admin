import Product from '../models/Product.js';


export const getAllProduct = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === 'vendor') {
      filter.vendorId = req.user.userId;
    }
   

    const products = await Product.find(filter);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (req.user.role === 'vendor' && product.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      vendorId: req.user.role === 'vendor' ? req.user.userId : null,
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (req.user.role === 'vendor' && product.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.json({ success: true, message: 'Product updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (req.user.role === 'vendor' && product.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (req.user.role === 'vendor' && product.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.json({ success: true, message: 'Product status updated', data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const listProduct = async (req,res) => {
  try {
    const products = await Product.find({}).populate('vendorId','name storeName');
    return res.json({ success:true, data: products });
  } catch(err){
    return res.status(500).json({ success:false, error: err.message });
  }
};
