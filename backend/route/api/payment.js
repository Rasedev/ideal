

// // routes/paymentRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//   submitPayment,
//   getAllPayments,
//   getMyPayments,
//   verifyPayment,
//   getPaymentStats
// } = require('../../controller/paymentController');
// const authMiddleware = require('../../middleware/authMiddleware');
// const authorizeRoles = require('../../middleware/authorizeRoles');
// const upload = require('../../middleware/uploadMiddleware');

// // Member routes
// router.post('/submit', authMiddleware, upload.single('paymentProof'), submitPayment);
// router.get('/my-payments', authMiddleware, getMyPayments);

// // Admin/Finance Secretary routes
// // router.get('/', authMiddleware, authorizeRoles(['admin', 'FinanceSecretary']), getAllPayments);
// router.get('/', authMiddleware, getAllPayments);
// router.patch('/verify/:paymentId', authMiddleware, verifyPayment);
// router.get('/stats', authMiddleware,  getPaymentStats);

// module.exports = router;





// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const {submitPayment,getAllPayments,getPaymentOverview,getMyPayments,
  verifyPayment,getPaymentStats} = require('../../controller/paymentController');
const authMiddleware = require('../../middleware/authMiddleware');
const {authorizeRoles} = require('../../middleware/authorizeRoles');
const upload = require('../../middleware/uploadMiddleware');

// All authenticated users can submit payments and view their own
router.post('/submit', authMiddleware, upload.single('paymentProof'), submitPayment);
router.get('/my-payments', authMiddleware, getMyPayments);

// Admin/Finance Secretary routes - can see ALL members' payments
router.get('/', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), getAllPayments);
router.get('/overview', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), getPaymentOverview);
router.patch('/verify/:paymentId', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), verifyPayment);
router.get('/stats', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), getPaymentStats);

module.exports = router;



// 📁 BACKEND:
// ✅ models/DuesSchema.js
// ✅ controllers/duesController.js  
// ✅ routes/duesRoutes.js

// 📁 FRONTEND:
// ✅ slices/duesSlice.js
// ✅ hooks/useDues.js
// ✅ components/dues/PendingDues.jsx
