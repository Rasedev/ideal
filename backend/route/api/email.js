// const express = require('express');
// const router = express.Router();
// const { createEmailController,getAllEmailsController,updateEmailController } = require('../../controller/emailController');

// // POST /api/v1/email — Create new email
// router.post('/createEmail', createEmailController);

// // GET /api/v1/email — Get all emails
// router.get('/getAllEmails', getAllEmailsController);
// router.put('/updateEmail', updateEmailController);

// module.exports = router;




const express = require('express');
const router = express.Router();
const {
  sendEmailController,
  getAllEmailsController,
  getEmailStatsController,
  getEmailUsersController,
  updateEmailController,
  // testEmailController,
  quickTestController,
  deleteEmailController,
  bulkDeleteEmailsController
} = require('../../controller/emailController');
const authMiddleware = require('../../middleware/authMiddleware');

// All routes require authentication
router.post('/send', authMiddleware, sendEmailController);
router.get('/', authMiddleware, getAllEmailsController);
router.get('/stats', authMiddleware, getEmailStatsController);
router.get('/users', authMiddleware, getEmailUsersController);
router.put('/:id', authMiddleware, updateEmailController);
// router.post('/test', authMiddleware, testEmailController);
router.get('/quick-test', authMiddleware, quickTestController);
router.delete('/delete:id', authMiddleware, deleteEmailController);                    
router.post('/bulk-delete', authMiddleware, bulkDeleteEmailsController);

module.exports = router;






