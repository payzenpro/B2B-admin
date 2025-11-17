// import Cart from '../models/cart.js';

// // Get user cart
// export const getCart = async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
//     if (!cart) {
//       cart = await Cart.create({ user: req.user.id, items: [] });
//     }
//     res.json({ success: true, data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Add item to cart
// export const addToCart = async (req, res) => {
//   try {
//     const { product, name, price, quantity, image, category, store } = req.body;
    
//     let cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) {
//       cart = await Cart.create({ user: req.user.id, items: [] });
//     }

//     // Check if item already exists
//     const existingItem = cart.items.find(item => item.product.toString() === product);
    
//     if (existingItem) {
//       existingItem.quantity += quantity || 1;
//     } else {
//       cart.items.push({ product, name, price, quantity, image, category, store });
//     }

//     await cart.save();
//     res.json({ success: true, data: cart });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Update cart item quantity
// export const updateCartItem = async (req, res) => {
//   try {
//     const { itemId, quantity } = req.body;
    
//     const cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) {
//       return res.status(404).json({ success: false, message: 'Cart not found' });
//     }

//     const item = cart.items.id(itemId);
//     if (!item) {
//       return res.status(404).json({ success: false, message: 'Item not found' });
//     }

//     item.quantity = quantity;
//     await cart.save();
    
//     res.json({ success: true, data: cart });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Remove item from cart
// export const removeFromCart = async (req, res) => {
//   try {
//     const { itemId } = req.params;
    
//     const cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) {
//       return res.status(404).json({ success: false, message: 'Cart not found' });
//     }

//     cart.items = cart.items.filter(item => item._id.toString() !== itemId);
//     await cart.save();
    
//     res.json({ success: true, data: cart });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Clear cart
// export const clearCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) {
//       return res.status(404).json({ success: false, message: 'Cart not found' });
//     }

//     cart.items = [];
//     await cart.save();
    
//     res.json({ success: true, data: cart });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };


import Cart from '../models/cart.js';

// Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;   // ✅ yaha se lo

    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error('getCart error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;   // ✅
    const { product, name, price, quantity, image, category, store } = req.body;
    
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === product
    );
    
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product, name, price, quantity, image, category, store });
    }

    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error('addToCart error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;   // ✅
    const { itemId, quantity } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    item.quantity = quantity;
    await cart.save();
    
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error('updateCartItem error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;   // ✅
    const { itemId } = req.params;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error('removeFromCart error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;   // ✅
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error('clearCart error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
