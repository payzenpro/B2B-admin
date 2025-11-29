// import express from 'express';
// import {
//   getAllStores,
//   getStoreById,
//   createStore,
//   updateStore,
//   deleteStore
// } from '../controllers/storeController.js';
// import { verifyToken } from '../middleware/auth.js'; 

// const router = express.Router();

// router.get('/', getAllStores);
// router.get('/:id', getStoreById);
// router.post('/', createStore);
// router.put('/:id', updateStore);
// router.delete('/:id', deleteStore);

// export default router;

import express from 'express';
import Store from '../models/stores.js';
import { verifyToken, authorize } from '../middleware/auth.js';

const router = express.Router();

async function getAllStores(req, res) {
  try {
    const stores = await Store.find();
    res.json({ success: true, data: stores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getStoreById(req, res) {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    res.json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createStore(req, res) {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json({ success: true, data: store });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function updateStore(req, res) {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    res.json({ success: true, data: store });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function deleteStore(req, res) {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Role-based filtered stores
router.get('/stores', verifyToken, authorize('superadmin', 'vendor'), async (req, res) => {
  try {
    let stores;

    if (req.user.role === 'superadmin') {
      stores = await Store.find();
    } else if (req.user.role === 'vendor') {
      stores = await Store.find({ vendor: req.user.userId });  
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: stores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CRUD routes
router.get('/', verifyToken, getAllStores);
router.get('/:id', verifyToken, getStoreById);
router.post('/', verifyToken, createStore);
router.put('/:id', verifyToken, updateStore);
router.delete('/:id', verifyToken, deleteStore);

export default router;
