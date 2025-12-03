// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const { getProfile } = require('../controllers/profileController');

// // GET /api/profile
// router.get('/profile', auth, getProfile);

// // module.exports = router;
// export default router;


import express from 'express';
import verifyToken from '../middleware/auth.js';
import { getProfile } from '../controllers/profileController.js';

const router = express.Router();
router.get('/profile', verifyToken, getProfile);

export default router;


