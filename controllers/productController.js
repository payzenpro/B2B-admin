import Product from "../models/Product.js";

export const getPublicProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (err) {
    console.error("getPublicProducts error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const getProduct = async (req, res) => {
  try {
    console.log(" User:", req.user);

    let query = {};
    
    if (req.user.role === "vendor") {
      query.vendorId = req.user._id;  
    }

    console.log(" Query:", query);
    const products = await Product.find(query).sort({ createdAt: -1 });
    console.log(" Found products:", products.length);

    res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error(" getProduct error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


export const getVendorProducts = async (req, res) => {
  try {
    console.log(" getVendorProducts user:", req.user);

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const vendorId = req.user._id;
    
    const products = await Product.find({ vendorId }) 
      .sort({ createdAt: -1 });

    console.log(" Vendor products count:", products.length);

    return res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error(" getVendorProducts error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    console.error("getProductById error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};


export const createProduct = async (req, res) => {
  try {
    console.log(" createProduct body:", req.body);
    console.log("createProduct user:", req.user);

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no user in token",
      });
    }

    let vendorId = null;
    if (req.user.role === "vendor") {
      vendorId = req.user._id;
    }
    else if (req.body.vendorId) {
      vendorId = req.body.vendorId;
    }
    let slug = req.body.slug;
    if (!slug && req.body.name) {
      slug = req.body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    const payload = {
      ...req.body,
      vendorId,    
      slug,
      isActive: true,
      status: "active",
    };

    console.log(" Final payload vendorId:", payload.vendorId);

    const product = await Product.create(payload);

    console.log("Product created:", product._id);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error(" createProduct error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: err.message,
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    console.error("updateProduct error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: err.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    console.error("deleteProduct error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err.message,
    });
  }
};

