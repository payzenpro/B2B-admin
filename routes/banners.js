import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus
} from '../controllers/bannerController.js';

const router = express.Router();

// Role check middleware
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
  };
};


router.get('/', verifyToken, allowRoles('superadmin', 'vendor'), getAllBanners);
router.get('/:id', verifyToken, allowRoles('superadmin', 'vendor'), getBannerById);
router.post('/', verifyToken, allowRoles('superadmin', 'vendor'), createBanner);
router.put('/:id', verifyToken, allowRoles('superadmin', 'vendor'), updateBanner);
router.delete('/:id', verifyToken, allowRoles('superadmin', 'vendor'), deleteBanner);
router.patch('/:id/toggle', verifyToken, allowRoles('superadmin', 'vendor'), toggleBannerStatus);

export default router;
