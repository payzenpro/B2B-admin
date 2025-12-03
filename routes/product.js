import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});


router.post("/", async (req, res) => {
  try {

    console.log("Create product body:", req.body);
    const { name, category, price, stock, status, image } = req.body;

    if (!name || !category || price == null || stock == null || !status) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const product = new Product({
      name,
      category,
      price,
      stock,
      status,
      image,
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
});



// GET /api/product/public - Public products fetch
router.get('/public', async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' })
      .select('-password') // Sensitive fields exclude
      .limit(20)
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});


export default router;
