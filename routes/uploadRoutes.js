import express from 'express';
import upload from '../middleware/multer.js';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage
} from '../controllers/uploadController.js';

const router = express.Router();

// Routes
router.post('/image', upload.single('image'), uploadImage);
router.post('/images', upload.array('images', 10), uploadMultipleImages);
router.delete('/image', deleteImage);

export default router;
