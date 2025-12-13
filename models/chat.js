import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderRole: {
    type: String,
    enum: ['customer', 'vendor'],
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 1000,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
});

const chatSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  messages: [messageSchema],
  lastMessage: {
    text: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    senderRole: {
      type: String,
      enum: ['customer', 'vendor']
    },
    timestamp: Date
  },
  unreadCount: {
    vendor: {
      type: Number,
      default: 0
    },
    customer: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true
});

chatSchema.index({ vendor: 1, status: 1, updatedAt: -1 });
chatSchema.index({ customer: 1, status: 1, updatedAt: -1 });
chatSchema.index({ vendor: 1, customer: 1, product: 1 });

chatSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

chatSchema.methods.markMessagesAsRead = function(userRole) {
  const now = new Date();
  
  this.messages.forEach(msg => {
    if (msg.senderRole !== userRole && !msg.isRead) {
      msg.isRead = true;
      msg.readAt = now;
    }
  });
  
  if (userRole === 'vendor') {
    this.unreadCount.vendor = 0;
  } else {
    this.unreadCount.customer = 0;
  }
  
  return this.save();
};

export default mongoose.model('Chat', chatSchema);
