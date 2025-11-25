// routes/smsRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const smsController = require('../../controller/smsController');

router.post('/send', authMiddleware, smsController.sendSMS);
router.post('/bulk-send', authMiddleware, smsController.sendBulkSMS);
router.get('/history', authMiddleware, smsController.getSMSHistory);
router.get('/stats', authMiddleware, smsController.getSMSStats);

module.exports = router;