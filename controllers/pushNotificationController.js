import PushNotification from '../models/PushNotification.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await PushNotification.find().sort({ createdAt: -1 });
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = new PushNotification(req.body);
    await notification.save();
    res.json({ success: true, data: notification });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const updateNotification = async (req, res) => {
  try {
    const notification = await PushNotification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notification) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: notification });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const deleteNotification = async (req, res) => {
  try {
    const notification = await PushNotification.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
