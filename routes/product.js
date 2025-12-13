// import express from "express";
// import {
//   getPublicProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//    getProduct,
//     getVendorProducts,
// } from "../controllers/productController.js";

// const router = express.Router();

   
// router.get("/product", getPublicProducts);  
         
// router.get("/product/:id", getProductById);

// router.get("/vendor", getVendorProducts); 

// router.post("/product", createProduct);

// router.put("/product/:id", updateProduct);
// router.delete("/product/:id", deleteProduct);

// export default router;

// // import express from "express";
// // import {
// //   getPublicProducts,
// //   getProductById,
// //   createProduct,
// //   updateProduct,
// //   deleteProduct,
// //   getProduct,
// //   getVendorProducts,
// // } from "../controllers/productController.js";
// // import { verifyToken, authorize } from "../middleware/auth.js";

// // const router = express.Router();

// // // PUBLIC
// // router.get("/product/public", getPublicProducts);

// // // VENDOR PRODUCTS
// // router.get(
// //   "/vendor",
// //   verifyToken,
// //   authorize("vendor"),
// //   getVendorProducts
// // );

// // // ADMIN/VENDOR all products (optional)
// // router.get(
// //   "/product",
// //   verifyToken,
// //   authorize("superadmin", "vendor"),
// //   getProduct
// // );

// // router.get("/product/:id", getProductById);

// // router.post(
// //   "/product",
// //   verifyToken,
// //   authorize("superadmin", "vendor"),
// //   createProduct
// // );

// // router.put(
// //   "/product/:id",
// //   verifyToken,
// //   authorize("superadmin", "vendor"),
// //   updateProduct
// // );

// // router.delete(
// //   "/product/:id",
// //   verifyToken,
// //   authorize("superadmin"),
// //   deleteProduct
// // );

// // export default router;

import express from "express";
import {
  getPublicProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getVendorProducts,
} from "../controllers/productController.js";
import { verifyToken, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/product/public", getPublicProducts); 


router.get(
  "/vendor",
  verifyToken,
  authorize("vendor"),
  getVendorProducts
);
// router.get("/vendor", getVendorProducts); 

router.get(
  "/product",
  verifyToken,
  authorize("superadmin", "vendor"),
  getProduct
);


router.get("/product/:id", getProductById);


router.post(
  "/product",
  verifyToken,
  authorize("superadmin", "vendor"),
  createProduct
);


router.put(
  "/product/:id",
  verifyToken,
  authorize("superadmin", "vendor"),
  updateProduct
);


router.delete(
  "/product/:id",
  verifyToken,
  authorize("superadmin"),
  deleteProduct
);

export default router;
