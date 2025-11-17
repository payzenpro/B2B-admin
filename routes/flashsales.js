// import express from 'express';
// import {
//   getAllFlashsales,
//   getFlashsaleById,
//   createFlashsale,
//   updateFlashsale,
//   deleteFlashsale
// } from '../controllers/flashsaleController.js';
// import { verifyToken } from '../middleware/auth.js';

// const router = express.Router();

// router.get('/', getAllFlashsales);
// router.get('/:id', getFlashsaleById);
// router.post('/', createFlashsale);
// router.put('/:id', updateFlashsale);
// router.delete('/:id', deleteFlashsale);

// export default router;

// import express from 'express';
// import { getFlashsales, createFlashsale, updateFlashsale, deleteFlashsale } from '../controllers/flashsaleController.js';
// import { verifyToken, authorize } from '../middleware/auth.js';

// const router = express.Router();

// router.use(verifyToken);

// router.get('/flashsales', getFlashsales);
// router.post('/flashsales', createFlashsale);
// router.put('/flashsales/:id', updateFlashsale);
// router.delete('/flashsales/:id', deleteFlashsale);

// export default router;
// backend/routes/flashsales.js
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllFlashsales,
  getFlashsaleById,
  createFlashsale,
  updateFlashsale,
  deleteFlashsale
} from '../controllers/flashsaleController.js';

const router = express.Router();

router.get('/flashsales', verifyToken, getAllFlashsales);
router.get('/flashsales/:id', verifyToken, getFlashsaleById);
router.post('/flashsales', verifyToken, createFlashsale);
router.put('/flashsales/:id', verifyToken, updateFlashsale);
router.delete('/flashsales/:id', verifyToken, deleteFlashsale);

export default router;
