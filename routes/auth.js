import express from 'express';
import { register, login, getAllUsers } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all-users', verifyToken, getAllUsers);

export default router;
