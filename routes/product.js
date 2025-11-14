

// import express from 'express';
// import { verifyToken } from '../middleware/auth.js';
// import {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   toggleProductStatus
// } from '../controllers/productController.js';

// const router = express.Router();

// // Role check middleware
// const allowRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }
//     next();
//   };
// };

// // All routes protected with token verification + role check
// router.get('/', verifyToken, allowRoles('superadmin', 'vendor'), getAllProducts);
// router.get('/:id', verifyToken, allowRoles('superadmin', 'vendor'), getProductById);
// router.post('/', verifyToken, allowRoles('superadmin', 'vendor'), createProduct);
// router.put('/:id', verifyToken, allowRoles('superadmin', 'vendor'), updateProduct);
// router.delete('/:id', verifyToken, allowRoles('superadmin', 'vendor'), deleteProduct);
// router.patch('/:id/toggle', verifyToken, allowRoles('superadmin', 'vendor'), toggleProductStatus);

// export default router;

// routes/product.js
import express from 'express';
import { getAllProducts, createProduct } from '../controllers/productController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getAllProducts);
router.post('/', verifyToken, createProduct);

export default router;
