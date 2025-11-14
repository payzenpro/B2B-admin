import Flashsale from '../models/flashsale.js';

// Get all flashsales
export const getAllFlashsales = async (req, res) => {
  try {
    const flashsales = await Flashsale.find().populate('products');
    res.json({ success: true, data: flashsales });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get flashsale by ID
export const getFlashsaleById = async (req, res) => {
  try {
    const flashsale = await Flashsale.findById(req.params.id).populate('products');
    if (!flashsale) return res.status(404).json({ success: false, message: 'Flashsale not found' });
    res.json({ success: true, data: flashsale });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new flashsale
export const createFlashsale = async (req, res) => {
  try {
    const flashsale = new Flashsale(req.body);
    await flashsale.save();
    res.status(201).json({ success: true, data: flashsale });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update flashsale
export const updateFlashsale = async (req, res) => {
  try {
    const flashsale = await Flashsale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flashsale) return res.status(404).json({ success: false, message: 'Flashsale not found' });
    res.json({ success: true, data: flashsale });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete flashsale
export const deleteFlashsale = async (req, res) => {
  try {
    const flashsale = await Flashsale.findByIdAndDelete(req.params.id);
    if (!flashsale) return res.status(404).json({ success: false, message: 'Flashsale not found' });
    res.json({ success: true, message: 'Flashsale deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
