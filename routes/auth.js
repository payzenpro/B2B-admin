import express from 'express';
import { register, login, getAllUsers,getAnalytics,getVendorDashboard } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all-users', verifyToken, getAllUsers);
 router.get('/analytics', verifyToken, getAnalytics);
  router.get('/vendor-dashboard', verifyToken, getVendorDashboard); 

export default router;
