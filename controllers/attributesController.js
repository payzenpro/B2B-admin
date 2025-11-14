import Attribute from '../models/attributes.js';

// Get all attributes
export const getAllAttributes = async (req, res) => {
  try {
    const attrs = await Attribute.find();
    res.json({ success: true, data: attrs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get attribute by id
export const getAttributeById = async (req, res) => {
  try {
    const attr = await Attribute.findById(req.params.id);
    if (!attr) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }
    res.json({ success: true, data: attr });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create attribute
export const createAttribute = async (req, res) => {
  try {
    const attr = new Attribute(req.body);
    await attr.save();
    res.status(201).json({ success: true, data: attr });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update attribute
export const updateAttribute = async (req, res) => {
  try {
    const attr = await Attribute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attr) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }
    res.json({ success: true, data: attr });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete attribute
export const deleteAttribute = async (req, res) => {
  try {
    const attr = await Attribute.findByIdAndDelete(req.params.id);
    if (!attr) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }
    res.json({ success: true, message: 'Attribute deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
