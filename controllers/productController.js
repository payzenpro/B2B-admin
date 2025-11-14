
// import Product from '../models/product.js';
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json({ success: true, data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// // Get single product
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     res.json({ success: true, data: product });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// export const createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json({ success: true, data: product });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Update product
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     if (req.user.role === 'vendor' && product.vendorId?.toString() !== req.user.userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     res.json({ 
//       success: true, 
//       message: 'Product updated',
//       data: updated 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Delete product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     if (req.user.role === 'vendor' && product.vendorId?.toString() !== req.user.userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     await Product.findByIdAndDelete(req.params.id);

//     res.json({ success: true, message: 'Product deleted' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Toggle product status
// export const toggleProductStatus = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     product.isActive = !product.isActive;
//     await product.save();

//     res.json({ 
//       success: true, 
//       message: 'Product status updated',
//       data: product 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

import Product from '../models/product.js';

// Get all products: Superadmin all products dekhega, Vendor apne products
export const getAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === 'vendor') {
      filter.vendorId = req.user.userId;
    }
    // superadmin ke liye filter empty rahega

    const products = await Product.find(filter);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single product by ID with authorization check
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Vendor access check
    if (req.user.role === 'vendor' && product.vendorId?.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create product with vendorId set if user is vendor
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

// Update product with vendor authorization check
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

// Delete product with vendor authorization check
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

// Toggle product status (Active/Inactive) with authorization
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
