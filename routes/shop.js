// routes/vendorShopRoutes.js
import express from "express";
import { verifyToken, authorize } from "../middleware/auth.js";
import {
  getMyShop,
  upsertMyShop,
  getShopBySlug,
} from "../controllers/shopController.js";

const router = express.Router();

// Vendor ke liye – apni shop dekhna
router.get(
  "/vendor/shop",
  verifyToken,
  authorize("vendor"),
  getMyShop
);

// Vendor ke liye – create / update shop
router.put(
  "/vendor/shop",
  verifyToken,
  authorize("vendor"),
  upsertMyShop
);

// public route – koi bhi customer slug se shop dekh sakta h
// router.get("/shops/:slug", getShopBySlug);

export default router;
