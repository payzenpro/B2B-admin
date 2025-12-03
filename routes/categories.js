


import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import * as categoriesController from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/categories', verifyToken, categoriesController.getAllCategories);
router.post('/categories', verifyToken, categoriesController.createCategories);
router.put('/categories/:id', verifyToken, categoriesController.updateCategories);
router.delete('/categories/:id', verifyToken, categoriesController.deleteCategories);

export default router;
