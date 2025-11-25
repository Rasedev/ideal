// routes/development.js
const express = require('express');
const router = express.Router();
const CommunicationController = require('../../controller/communicationController');

// Test SMS endpoint
router.post('/test/sms', async (req, res) => {
  const { phoneNumber = '+15558675309', message = 'Test message from development' } = req.body;
  
  const result = await CommunicationController.sendSMS({
    body: { phoneNumber, message, gateway: 'mock' },
    user: { permissions: { canSendMessages: true } }
  }, res);
});

// Test voice call endpoint  
router.post('/test/voice', async (req, res) => {
  const { phoneNumber = '+15558675309' } = req.body;
  
  const result = await CommunicationController.makeCall({
    body: { phoneNumber, gateway: 'mock' },
    user: { permissions: { canMakeCalls: true } }
  }, res);
});

// Test bulk SMS
router.post('/test/bulk-sms', async (req, res) => {
  const recipients = [
    { phone: '+15558675309', name: 'Test User 1' },
    { phone: '+15558675308', name: 'Test User 2' },
    { phone: '+15558675307', name: 'Test User 3' }
  ];
  
  const result = await CommunicationController.sendBulkSMS({
    body: { recipients, message: 'Test bulk message', gateway: 'mock' },
    user: { permissions: { canSendMessages: true } }
  }, res);
});

module.exports = router;