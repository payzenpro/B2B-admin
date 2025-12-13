import express from 'express';
import {
  getVendorReviews,
  getProductReviews,
  createReview,
  respondToReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();


router.get('/vendor/reviews', protect, getVendorReviews);
router.post('/reviews/:reviewId/respond', protect, respondToReview);
router.post('/reviews', protect, createReview);

router.get('/products/:productId/reviews', getProductReviews);

export default router;
