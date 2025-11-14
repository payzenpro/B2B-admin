import Store from '../models/stores.js';

// Get all stores
export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().populate('ownerId', 'name email');
    res.json({ success: true, data: stores });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single store by ID
export const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate('ownerId', 'name email');
    if (!store) return res.status(404).json({ success: false, message: 'Store not found' });

    res.json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new store
export const createStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update store by ID
export const updateStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!store) return res.status(404).json({ success: false, message: 'Store not found' });

    res.json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete store by ID
export const deleteStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) return res.status(404).json({ success: false, message: 'Store not found' });

    res.json({ success: true, message: 'Store deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
