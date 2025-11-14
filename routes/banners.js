// // import express from 'express';
// // import { 
// //   getAllBanners, 
// //   getBannerById, 
// //   createBanner, 
// //   updateBanner, 
// //   deleteBanner,
// //   trackClick,
// //   trackImpression,
// //   getBannerAnalytics
// // } from '../controllers/bannerController.js';
// // import { verifyToken } from '../middleware/auth.js';

// // const router = express.Router();

// // // PUBLIC ROUTES 

// // router.get('/', getAllBanners);
// // router.get('/analytics', getBannerAnalytics);
// // router.get('/:id', getBannerById);


// // router.post('/:id/impression', trackImpression);
// // router.post('/:id/click', trackClick);

// // router.post('/', verifyToken, createBanner);
// // router.put('/:id', verifyToken, updateBanner);
// // router.delete('/:id', verifyToken, deleteBanner);

// // export default router;


// import express from 'express';
// import { verifyToken } from '../middleware/auth.js';
// import {
//   getAllBanners,
//   getBannerById,
//   createBanner,
//   updateBanner,
//   deleteBanner,
//   toggleBannerStatus
// } from '../controllers/bannerController.js';

// const router = express.Router();

// router.get('/', verifyToken, getAllBanners);
// router.get('/:id', verifyToken, getBannerById);
// router.post('/', verifyToken, createBanner);
// router.put('/:id', verifyToken, updateBanner);
// router.delete('/:id', verifyToken, deleteBanner);
// router.patch('/:id/toggle', verifyToken, toggleBannerStatus);


// export default router;


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
