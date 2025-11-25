// routes/duesRoutes.js
const express = require('express');
const router = express.Router();
const {
  createDues,
  getAllDues,
  getMyDues,
  updateDuesStatus,
  sendDueReminder,
  getDuesStats,
  deleteDues
} = require('../../controller/duesController');
const authMiddleware = require('../../middleware/authMiddleware');
const {authorizeRoles} = require('../../middleware/authorizeRoles');

// Member routes
router.get('/my-dues', authMiddleware, getMyDues);

// Admin/Finance Secretary routes
router.post('/', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), createDues);
router.get('/', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), getAllDues);
router.get('/stats', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), getDuesStats);
router.patch('/:duesId/status', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), updateDuesStatus);
router.post('/:duesId/reminder', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), sendDueReminder);
router.delete('/:duesId', authMiddleware, authorizeRoles('admin', 'FinanceSecretary'), deleteDues);

module.exports = router;