import Review from '../models/review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getVendorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ vendor: req.user._id })
      .populate('customer', 'name email')
      .populate('product', 'name images')
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;
    const avgRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    };

    res.json({
      success: true,
      data: reviews,
      stats: {
        totalReviews,
        avgRating,
        ratingDistribution
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('customer', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const createReview = async (req, res) => {
  try {
    const { productId, orderId, rating, comment, images } = req.body;
    
    const order = await Order.findOne({
      _id: orderId,
      customer: req.user._id,
      status: 'delivered'
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'You can only review purchased products'
      });
    }
   
    const existingReview = await Review.findOne({
      product: productId,
      customer: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    const product = await Product.findById(productId);

    const review = new Review({
      product: productId,
      vendor: product.vendor,
      customer: req.user._id,
      order: orderId,
      rating,
      comment,
      images: images || [],
      isVerifiedPurchase: true
    });

    await review.save();

    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      data: review,
      message: 'Review submitted successfully'
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const respondToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { message } = req.body;

    const review = await Review.findOne({
      _id: reviewId,
      vendor: req.user._id
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.vendorResponse = {
      message,
      respondedAt: new Date()
    };

    await review.save();

    res.json({
      success: true,
      data: review,
      message: 'Response added successfully'
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


async function updateProductRating(productId) {
  const reviews = await Review.find({ product: productId });
  
  if (reviews.length > 0) {
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(productId, {
      rating: avgRating.toFixed(1),
      reviewCount: reviews.length
    });
  }
}
