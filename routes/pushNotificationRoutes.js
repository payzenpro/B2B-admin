import express from 'express';
import { getNotifications, createNotification, updateNotification, deleteNotification } from '../controllers/pushNotificationController.js';

const router = express.Router();

router.get('/pushNotifications', getNotifications);
router.post('/pushNotifications', createNotification);
router.put('/pushNotifications/:id', updateNotification);
router.delete('/pushNotifications/:id', deleteNotification);

export default router;
