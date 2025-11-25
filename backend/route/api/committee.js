// routes/committee.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { authorizeRoles } = require('../../middleware/authorizeRoles');
const committeeController = require('../../controller/committeeController');

// All routes protected and require Admin/HR roles
router.use(authMiddleware);
router.use(authorizeRoles('Admin', 'HR', 'ExecutiveMember'));

// Committee members routes
router.get('/members', authorizeRoles('Admin', 'HR', 'ExecutiveMember'), committeeController.getAllCommitteeMembers);
router.get('/members/search', authorizeRoles('Admin', 'HR', 'ExecutiveMember'), committeeController.searchMembers);
router.get('/members/stats', authorizeRoles('Admin', 'HR', 'ExecutiveMember'), committeeController.getCommitteeStats);
router.get('/members/:id', authorizeRoles('Admin', 'HR', 'ExecutiveMember'), committeeController.getCommitteeMemberById);
router.post('/members', authorizeRoles('Admin', 'HR'), committeeController.addCommitteeMember);
router.put('/members/:id', authorizeRoles('Admin', 'HR'), committeeController.updateCommitteeMember);
router.delete('/members/:id', authorizeRoles('Admin', 'HR'), committeeController.removeCommitteeMember);

module.exports = router;











