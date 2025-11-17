import mongoose from 'mongoose';

const pushNotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  audience: { type: String, required: true }, 
  status: { type: String, enum: ['sent', 'scheduled', 'draft', 'failed'], default: 'draft' },
  sentDate: { type: Date },          
  sendDate: { type: Date },          
  recipients: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('PushNotification', pushNotificationSchema);
