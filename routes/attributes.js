import express from 'express';
import {
  getAllAttributes,
  getAttributeById,
  createAttribute,
  updateAttribute,
  deleteAttribute
} from '../controllers/attributesController.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllAttributes);
router.get('/:id', getAttributeById);
router.post('/', verifyToken, createAttribute);
router.put('/:id', verifyToken, updateAttribute);
router.delete('/:id', verifyToken, deleteAttribute);

export default router;

