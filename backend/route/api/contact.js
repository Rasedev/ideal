


// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../../middleware/authMiddleware');
// const contactController = require('../../controller/contactController');
// const smsController = require('../../controller/smsController');
// const voiceController = require('../../controller/voiceController');

// // Contact routes
// router.get('/contactusers', authMiddleware, contactController.getUsersWithContacts);
// router.get('/users/:role', authMiddleware, contactController.getUsersByRole);
// router.get('/contacts/:userId', authMiddleware, contactController.getUserContacts);
// router.put('/contact-preferences/:userId', authMiddleware, contactController.updateContactPreferences);

// // SMS routes
// router.post('/sms/send', authMiddleware, smsController.sendSMS);
// router.post('/sms/bulk-send', authMiddleware, smsController.sendBulkSMS);
// router.post('/sms/campaign', authMiddleware, smsController.createSmsCampaign);
// router.get('/sms/campaigns', authMiddleware, smsController.getSmsCampaigns);
// router.get('/sms/campaign/:id', authMiddleware, smsController.getCampaignDetails);
// router.get('/sms/history', authMiddleware, smsController.getSMSHistory);
// router.get('/sms/stats', authMiddleware, smsController.getSMSStats);

// // Voice call routes
// router.post('/voice/call', authMiddleware, voiceController.makeCall);
// router.post('/voice/broadcast', authMiddleware, voiceController.makeBroadcastCall);
// router.get('/voice/calls', authMiddleware, voiceController.getCallHistory);
// router.get('/voice/stats', authMiddleware, voiceController.getVoiceStats);

// module.exports = router;






// route/api/contact.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const contactController = require('../../controller/contactController');
const smsController = require('../../controller/smsController');
const voiceController = require('../../controller/voiceController');

// =============================================
// CONTACT ROUTES (Matching your contact.jsx needs)
// =============================================

// Main contact routes used by contact.jsx
router.get('/contacts', authMiddleware, contactController.getContacts);
router.post('/contacts', authMiddleware, contactController.createContact);
router.get('/contacts/:id', authMiddleware, contactController.getContactById);
router.put('/contacts/:id', authMiddleware, contactController.updateContact);
router.delete('/contacts/:id', authMiddleware, contactController.deleteContact);

// Original routes (for backward compatibility)
router.get('/contactusers', authMiddleware, contactController.getUsersWithContacts);
router.get('/users/:role', authMiddleware, contactController.getUsersByRole);
router.get('/contacts/user/:userId', authMiddleware, contactController.getUserContacts);
router.put('/contact-preferences/:userId', authMiddleware, contactController.updateContactPreferences);

// Bulk operations
router.post('/contacts/import', authMiddleware, contactController.importContacts);

// Analytics and search
router.get('/contacts/analytics/summary', authMiddleware, contactController.getContactAnalytics);
router.post('/contacts/search/global', authMiddleware, contactController.searchGlobalContacts);

// =============================================
// SMS ROUTES (Ensure these controllers exist)
// =============================================

// Basic SMS routes
router.post('/sms/send', authMiddleware, smsController.sendSMS);
router.post('/sms/bulk-send', authMiddleware, smsController.sendBulkSMS);
router.get('/sms/history', authMiddleware, smsController.getSMSHistory);
router.get('/sms/stats', authMiddleware, smsController.getSMSStats);

// SMS Campaign routes (add these functions to smsController)
router.post('/sms/campaign', authMiddleware, smsController.createSmsCampaign || ((req, res) => res.status(501).json({ success: false, message: "Not implemented" })));
router.get('/sms/campaigns', authMiddleware, smsController.getSmsCampaigns || ((req, res) => res.status(501).json({ success: false, message: "Not implemented" })));
router.get('/sms/campaign/:id', authMiddleware, smsController.getCampaignDetails || ((req, res) => res.status(501).json({ success: false, message: "Not implemented" })));

// =============================================
// VOICE ROUTES (Ensure these controllers exist)
// =============================================

// Basic Voice routes
router.post('/voice/call', authMiddleware, voiceController.makeCall);
router.post('/voice/broadcast', authMiddleware, voiceController.makeBroadcastCall);
router.get('/voice/calls', authMiddleware, voiceController.getCallHistory);
router.get('/voice/stats', authMiddleware, voiceController.getVoiceStats);

module.exports = router;
