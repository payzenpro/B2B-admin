import Categories from '../models/categories.js';


export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getCategoriesById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const createCategories = async (req, res) => {
  try {
    const category = new Categories(req.body);
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const updateCategories = async (req, res) => {
  try {
    const category = await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const deleteCategories = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




  

// export const getPublicProducts = async (req, res) => {
//   try {
//     const { category } = req.query;

    
//     const filter = { 
//       isActive: true, 
//       status: "active" 
//     };

  
//     if (category && category.trim() !== '') {
//       filter.category = { 
//         $regex: new RegExp(category.trim(), 'i')  
//       };
//     }

//     console.log(' Filter:', filter);

//     const products = await Product.find(filter).populate('vendor', 'name email');

//     res.json({ 
//       success: true, 
//       data: products,
//       count: products.length 
//     });
//   } catch (err) {
//     console.error(" getPublicProducts error:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch products" 
//     });
//   }
// };
