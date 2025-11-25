const express = require('express');
const router = express.Router();
const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require('../../controller/notificationController');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', authMiddleware, getUserNotifications);
router.patch('/:notificationId/read', authMiddleware, markAsRead);
router.patch('/read-all', authMiddleware, markAllAsRead);
router.delete('/:notificationId', authMiddleware, deleteNotification);

module.exports = router;