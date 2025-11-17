import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartcontroller.js';

const router = express.Router();

router.get('/cart', verifyToken, getCart);
router.post('/cart', verifyToken, addToCart);
router.put('/cart/item', verifyToken, updateCartItem);
router.delete('/cart/item/:itemId', verifyToken, removeFromCart);
router.delete('/cart', verifyToken, clearCart);

export default router;
