
// import Flashsale from '../models/flashsale.js';


// export const getFlashsales = async (req, res) => {
//   try {
//     const user = req.user; 

//     let filter = {};
//     if (user.role === 'vendor') {
//       filter.vendor = user._id;
//     }

//     const flashsales = await Flashsale.find(filter).populate('products');
//     res.json({ success: true, data: flashsales });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const createFlashsale = async (req, res) => {
//   try {
//     const user = req.user;
//     let data = req.body;
//     if (user.role === 'vendor') {
//       data.vendor = user._id;
//     }
//     const flashsale = new Flashsale(data);
//     await flashsale.save();
//     res.status(201).json({ success: true, data: flashsale });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const updateFlashsale = async (req, res) => {
//   try {
//     const flashsale = await Flashsale.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!flashsale) return res.status(404).json({ success: false, message: 'Not found' });
//     res.json({ success: true, data: flashsale });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const deleteFlashsale = async (req, res) => {
//   try {
//     const flashsale = await Flashsale.findByIdAndDelete(req.params.id);
//     if (!flashsale) return res.status(404).json({ success: false, message: 'Not found' });
//     res.json({ success: true, message: 'Deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// backend/controllers/flashsaleController.js
import Flashsale from '../models/Flashsale.js';

// Get all flash sales
export const getAllFlashsales = async (req, res) => {
  try {
    const flashsales = await Flashsale.find().populate('products').sort({ createdAt: -1 });
    res.json({ success: true, data: flashsales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single flash sale by ID
export const getFlashsaleById = async (req, res) => {
  try {
    const flashsale = await Flashsale.findById(req.params.id).populate('products');
    if (!flashsale) {
      return res.status(404).json({ success: false, message: 'Flash sale not found' });
    }
    res.json({ success: true, data: flashsale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create flash sale
export const createFlashsale = async (req, res) => {
  try {
    const flashsale = new Flashsale({
      ...req.body,
      vendor: req.user.id // Token se vendor ID
    });
    await flashsale.save();
    res.status(201).json({ success: true, data: flashsale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update flash sale
export const updateFlashsale = async (req, res) => {
  try {
    const flashsale = await Flashsale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!flashsale) {
      return res.status(404).json({ success: false, message: 'Flash sale not found' });
    }
    res.json({ success: true, data: flashsale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete flash sale
export const deleteFlashsale = async (req, res) => {
  try {
    const flashsale = await Flashsale.findByIdAndDelete(req.params.id);
    if (!flashsale) {
      return res.status(404).json({ success: false, message: 'Flash sale not found' });
    }
    res.json({ success: true, message: 'Flash sale deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
