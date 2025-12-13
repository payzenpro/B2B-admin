
import express from "express";
import { verifyToken, authorize } from "../middleware/auth.js";
import {
  getMyShop,
  upsertMyShop,
  getShopBySlug,
} from "../controllers/shopController.js";

const router = express.Router();


router.get(
  "/vendor/shop",
  verifyToken,
  authorize("vendor"),
  getMyShop
);

router.put(
  "/vendor/shop",
  verifyToken,
  authorize("vendor"),
  upsertMyShop
);

export default router;
