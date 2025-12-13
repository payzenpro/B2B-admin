import Chat from '../models/chat.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const getVendorChats = async (req, res) => {
  try {
    const { status = 'active', page = 1, limit = 20 } = req.query;
    
    const query = { vendor: req.user.userId };
    if (status) query.status = status;
    
    const chats = await Chat.find(query)
      .populate('customer', 'name email avatar phone')
      .populate('product', 'name images price')
      .populate('order', 'orderId status')
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const totalChats = await Chat.countDocuments(query);
    const totalUnread = chats.reduce((sum, chat) => sum + (chat.unreadCount?.vendor || 0), 0);
    
    res.json({
      success: true,
      data: chats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalChats,
        pages: Math.ceil(totalChats / parseInt(limit))
      },
      totalUnread
    });
  } catch (err) {
    console.error('Get vendor chats error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getCustomerChats = async (req, res) => {
  try {
    const { status = 'active', page = 1, limit = 20 } = req.query;
    
    const query = { customer: req.user.userId };
    if (status) query.status = status;
    
    const chats = await Chat.find(query)
      .populate('vendor', 'name email avatar phone businessName')
      .populate('product', 'name images price')
      .populate('order', 'orderId status')
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const totalChats = await Chat.countDocuments(query);
    const totalUnread = chats.reduce((sum, chat) => sum + (chat.unreadCount?.customer || 0), 0);
    
    res.json({
      success: true,
      data: chats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalChats,
        pages: Math.ceil(totalChats / parseInt(limit))
      },
      totalUnread
    });
  } catch (err) {
    console.error('Get customer chats error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('customer', 'name email avatar phone')
      .populate('vendor', 'name email avatar phone businessName')
      .populate('product', 'name images price')
      .populate('order', 'orderId status total');
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }
    
    const userId = req.user.userId;
    if (chat.vendor.toString() !== userId && chat.customer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    

    const userRole = req.user.role === 'vendor' ? 'vendor' : 'customer';
    await chat.markMessagesAsRead(userRole);
    
    res.json({
      success: true,
      data: chat
    });
  } catch (err) {
    console.error('Get chat by ID error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


export const createChat = async (req, res) => {
  try {
    const { vendorId, productId, orderId, message, images } = req.body;
   
    if (!vendorId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Vendor ID and message are required'
      });
    }
    
   
    const vendor = await User.findOne({ _id: vendorId, role: 'vendor' });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
    }
    
    const existingChat = await Chat.findOne({
      vendor: vendorId,
      customer: req.user.userId,
      product: productId || null,
      status: { $in: ['active', 'closed'] }
    });
    
    if (existingChat) {
      return res.json({
        success: true,
        data: existingChat,
        message: 'Chat already exists',
        isExisting: true
      });
    }
    
   
    const chat = await Chat.create({
      vendor: vendorId,
      customer: req.user.userId,
      product: productId || null,
      order: orderId || null,
      messages: [{
        sender: req.user.userId,
        senderRole: 'customer',
        text: message,
        images: images || [],
        isRead: false
      }],
      lastMessage: {
        text: message,
        sender: req.user.userId,
        senderRole: 'customer',
        timestamp: new Date()
      },
      unreadCount: {
        vendor: 1,
        customer: 0
      },
      status: 'active'
    });
    
    await chat.populate('customer', 'name email avatar phone');
    await chat.populate('vendor', 'name email avatar phone businessName');
    if (productId) {
      await chat.populate('product', 'name images price');
    }
    
    res.status(201).json({
      success: true,
      data: chat,
      message: 'Chat created successfully',
      isExisting: false
    });
  } catch (err) {
    console.error('Create chat error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, images } = req.body;
    const chatId = req.params.id;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message text is required'
      });
    }
    
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }
    
  
    const userId = req.user.userId;
    if (chat.vendor.toString() !== userId && chat.customer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
  
    const senderRole = req.user.role === 'vendor' ? 'vendor' : 'customer';
    const newMessage = {
      sender: userId,
      senderRole,
      text: text.trim(),
      images: images || [],
      isRead: false
    };
    
    chat.messages.push(newMessage);
    
    chat.lastMessage = {
      text: text.trim(),
      sender: userId,
      senderRole,
      timestamp: new Date()
    };
    
    if (senderRole === 'vendor') {
      chat.unreadCount.customer += 1;
    } else {
      chat.unreadCount.vendor += 1;
    }
    
    chat.status = 'active';
    
    await chat.save();
    
    await chat.populate('customer', 'name email avatar phone');
    await chat.populate('vendor', 'name email avatar phone businessName');
    await chat.populate('product', 'name images price');
    
    res.json({
      success: true,
      data: chat,
      message: 'Message sent successfully'
    });
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
export const markAsRead = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }
    
  
    const userId = req.user.userId;
    if (chat.vendor.toString() !== userId && chat.customer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    const userRole = req.user.role === 'vendor' ? 'vendor' : 'customer';
    await chat.markMessagesAsRead(userRole);
    
    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (err) {
    console.error('Mark as read error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


export const updateChatStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'closed', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const chat = await Chat.findById(req.params.id);
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }
    
    const userId = req.user.userId;
    if (chat.vendor.toString() !== userId && chat.customer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    chat.status = status;
    await chat.save();
    
    res.json({
      success: true,
      data: chat,
      message: `Chat ${status} successfully`
    });
  } catch (err) {
    console.error('Update chat status error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }
    
  
    if (chat.vendor.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Only vendor can delete chat'
      });
    }
    
    await chat.deleteOne();
    
    res.json({
      success: true,
      message: 'Chat deleted successfully'
    });
  } catch (err) {
    console.error('Delete chat error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
