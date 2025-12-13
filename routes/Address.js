
import express from "express";
import {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();


router.get("/", getMyAddresses);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;  
