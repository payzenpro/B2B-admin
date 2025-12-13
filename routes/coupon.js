import express from 'express';
import { 
  getAllCoupons, 
  getCouponById, 
  createCoupon, 
  updateCoupon, 
  deleteCoupon,
  verifyCoupon,
  applyCoupon,
  getActiveCoupons,
  getCouponStats
} from '../controllers/couponController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
router.get('/active', getActiveCoupons);
router.post('/verify', verifyToken, verifyCoupon);
router.post('/apply', verifyToken, applyCoupon);
 
router.get('/', verifyToken, getAllCoupons);
router.get('/stats', verifyToken, getCouponStats);
router.get('/:id', verifyToken, getCouponById);
router.post('/', verifyToken, createCoupon);
router.put('/:id', verifyToken, updateCoupon);
router.delete('/:id', verifyToken, deleteCoupon);

export default router;
