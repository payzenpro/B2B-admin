import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {getVendorChats,getCustomerChats,getChatById,createChat,sendMessage,markAsRead,updateChatStatus,deleteChat} from '../controllers/chatController.js';

const router = express.Router();

router.get('/vendor/chats', verifyToken, getVendorChats);


router.get('/customer/chats', verifyToken, getCustomerChats);

router.get('/chats/:id', verifyToken, getChatById);
router.post('/chats', verifyToken, createChat);
router.post('/chats/:id/messages', verifyToken, sendMessage);
router.put('/chats/:id/read', verifyToken, markAsRead);
router.put('/chats/:id/status', verifyToken, updateChatStatus);
router.delete('/chats/:id', verifyToken, deleteChat);

export default router;
