// import express from 'express';
// import {
//   getAllCategories,
//   getCategoriesById,
//   createCategories,
//   updateCategories,
//   deleteCategories
// } from '../controllers/categoriesController.js';

// import { verifyToken } from '../middleware/auth.js';

// const router = express.Router();

// router.get('/', getAllCategories);
// router.get('/:id', getCategoriesById);
// router.post('/', verifyToken, createCategories);
// router.put('/:id', verifyToken, updateCategories);
// router.delete('/:id', verifyToken, deleteCategories);

// export default router;


import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import * as categoriesController from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/categories', verifyToken, categoriesController.getAllCategories);
router.post('/categories', verifyToken, categoriesController.createCategories);
router.put('/categories/:id', verifyToken, categoriesController.updateCategories);
router.delete('/categories/:id', verifyToken, categoriesController.deleteCategories);

export default router;
