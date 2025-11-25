

// const express = require("express");
// const router = express.Router();
// const {createSubscription,verifySubscription,getPaymentStats,getMySubscriptions,getAllSubscriptions
// } = require("../../controller/subscriptionController");
// const { protect, authorize } = require("../../middleware/authMiddleware");
// const authorizeRoles = require("../../middleware/authorizeRoles");

// // Member routes
// router.post("/pay",  createSubscription);
// router.get("/my-subscriptions", getMySubscriptions);

// // Admin/Finance Secretary routes
// router.get("/allsubscriptions", getAllSubscriptions);
// router.patch("/verifysubscriptions/:subscriptionId",  verifySubscription);
// router.get("/statssubscriptions", getPaymentStats);

// module.exports = router;





// routes/payment/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const {
  getSubscriptions,
  submitPayment,
  verifyPayment,
  getSubscriptionStats
} = require('../../controller/subscriptionController');
const authMiddleware = require('../../middleware/authMiddleware');
const upload = require('../../middleware/uploadMiddleware');

// Member routes
router.get('/my-subscriptions', authMiddleware, getSubscriptions);
router.post('/submit', authMiddleware, upload.single('proofDocument'), submitPayment);

// Finance Secretary/Admin routes
router.get('/', authMiddleware, getSubscriptions);
router.patch('/verify/:subscriptionId', authMiddleware, verifyPayment);
router.get('/stats', authMiddleware, getSubscriptionStats);

module.exports = router;








