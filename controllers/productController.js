// import Product from "../models/Product.js";
// export const getPublicProducts = async (req, res) => {
//   try {

//     const products = await Product.find({}).sort({ createdAt: -1 });
//     return res.json({
//       success: true,
//       data: products,
//       count: products.length,
//     });
//   } catch (err) {
//     console.error("getPublicProducts error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };




// // 2. Superadmin ke liye 
// // export const getProduct = async (req, res) => {
// //   try {
// //    let products;
// //       if (req.user.role === "superadmin") {
    
// //       products = await Product.find().sort({ createdAt: -1 });
// //     } else if (req.user.role === "vendor") {
     
// //       const vendorId = req.user._id || req.user.userId;
// //       // products = await Product.find({ vendorId }).sort({ createdAt: -1 });
// //     } else {
// //       return res.status(403).json({ 
// //         success: false, 
// //         message: "Access denied" 
// //       });
// //     }
// //     //  const products = await Product.find().sort({ createdAt: -1 });
// //     res.json({ success: true, data: products });
// //   } catch (err) {
// //     console.error("getProduct error:", err);
// //     res
// //       .status(500)
// //       .json({ success: false, message: "Failed to fetch products" });
// //   }
// // };
// export const getProduct = async (req, res) => {
//   try {
//     console.log("👤 User:", req.user);
    
//     let query = {};
//     if (req.user.role === "vendor") {
//       query.seller = req.user.userId || req.user._id;
//     }

//     console.log("🔍 Query:", query);
//     const products = await Product.find(query).populate('seller');
//     console.log("📦 Found products:", products.length);

//     res.json({
//       success: true,
//       data: products,  // ✅ YE IMPORTANT
//     });
//   } catch (err) {
//     console.error("❌ getProduct error:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Server error" 
//     });
//   }
// };

// // 3. Product by id
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, data: product });
//   } catch (err) {
//     console.error("getProductById error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch product" });
//   }
// };


// // export const createProduct = async (req, res) => {
// //   try {
// //     const productData = req.body;

// //     // let vendorId = null;
// //     if (req.user && req.user.role === "vendor") {
// //       vendorId = req.user._id || req.user.userId;
// //     }  else if (req.user && req.user.role === "superadmin") {
// //  vendorId = null;}

// //     const product = await Product.create({
// //       ...productData,
// //       vendorId,      
// //       isActive: true,
// //       status: "active",
// //     });

// //     res.status(201).json({ success: true, data: product });
// //   } catch (err) {
// //     console.error("createProduct error:", err);
// //     res
// //       .status(500)
// //       .json({ success: false, message: "Failed to create product" });
// //   }
// // };
// export const createProduct = async (req, res) => {
//   try {
//     console.log("createProduct body:", req.body);
//     console.log("createProduct user:", req.user);

//     // vendorId ko yahan define karo
//     let vendorId = null;

//     if (req.user?.role === "vendor") {
//       vendorId = req.user._id;
//     } else if (req.body.vendorId) {
//       vendorId = req.body.vendorId;
//     }

//     const payload = {
//       ...req.body,
//       ...(vendorId && { vendor: vendorId }),
//     };

//     const product = await Product.create(payload);

//     return res.status(201).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     console.error("createProduct error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create product",
//       error: err.message,
//     });
//   }
// };


// // 5. Product update (id se)
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, data: product });
//   } catch (err) {
//     console.error("updateProduct error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to update product" });
//   }
// };

// // 6. Product delete
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     console.error("deleteProduct error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to delete product" });
//   }
// };

// // export const getVendorProduct = async (req, res) => {
// //   try {
// //     const vendorId = req.user._id || req.user.userId; 

// //     const products = await Product.find({ vendorId }) 
// //       .sort({ createdAt: -1 });

// //     res.json({ success: true, data: products });
// //   } catch (err) {
// //     console.error("getVendorProducts error:", err);
// //     res
// //       .status(500)
// //       .json({ success: false, message: "Failed to fetch vendor products" });
// //   }
// // };
// export const getVendorProducts = async (req, res) => {
//   try {
//     console.log("getVendorProduct user:", req.user);

//     const vendorId = req.user._id;
//     const products = await Product.find({ vendor: vendorId }); // yahan schema ke field ke hisab se

//     console.log("getVendorProduct count:", products.length);

//     return res.json({
//       success: true,
//       data: products,
//     });
//   } catch (err) {
//     console.error("getVendorProduct error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };
import Product from "../models/Product.js";

// ✅ 1. PUBLIC PRODUCTS (homepage)
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

// ✅ 2. ALL PRODUCTS (superadmin = all, vendor = own only)
export const getProduct = async (req, res) => {
  try {
    console.log("👤 User:", req.user);

    let query = {};
    
    if (req.user.role === "vendor") {
      query.vendorId = req.user._id;  // ✅ vendorId (not vendor)
    }

    console.log("🔍 Query:", query);
    const products = await Product.find(query).sort({ createdAt: -1 });
    console.log("📦 Found products:", products.length);

    res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error("❌ getProduct error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ✅ 3. VENDOR PRODUCTS (specific endpoint)
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
    
    const products = await Product.find({ vendorId })  // ✅ vendorId
      .sort({ createdAt: -1 });

    console.log("✅ Vendor products count:", products.length);

    return res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error("❌ getVendorProducts error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ 4. SINGLE PRODUCT BY ID
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

// ✅ 5. CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    console.log("✅ createProduct body:", req.body);
    console.log("✅ createProduct user:", req.user);

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no user in token",
      });
    }

    let vendorId = null;

    // Vendor apne naam pe product banata hai
    if (req.user.role === "vendor") {
      vendorId = req.user._id;
    }
    // Superadmin body me vendorId bhej sakta hai
    else if (req.body.vendorId) {
      vendorId = req.body.vendorId;
    }

    // Auto-generate slug
    let slug = req.body.slug;
    if (!slug && req.body.name) {
      slug = req.body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    const payload = {
      ...req.body,
      vendorId,      // ✅ vendorId (not vendor)
      slug,
      isActive: true,
      status: "active",
    };

    console.log("✅ Final payload vendorId:", payload.vendorId);

    const product = await Product.create(payload);

    console.log("✅ Product created:", product._id);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("❌ createProduct error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: err.message,
    });
  }
};

// ✅ 6. UPDATE PRODUCT
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

// ✅ 7. DELETE PRODUCT
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

