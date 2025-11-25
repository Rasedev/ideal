const express = require("express");
const router = express.Router();
const multer  = require('multer');
const {
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getMemberStats,
  createMemberController,
  getPendingRegistrations,
  approveMemberRegistration,
  rejectMemberRegistration,
} = require("../../controller/memberController");
// const authMiddleware = require("../../middleware/authMiddleware");
// const authorizeRoles = require("../../middleware/authorizeRoles");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split('.')[1]}`)
    //console.log('first', file.originalname.split('.')[1] ); 
    }   
  })
const upload = multer({ storage: storage });



// Member management routes
router.post('/createmember',upload.single('image'), createMemberController);
router.get("/allmember",    getAllMembers);
router.get("/Memberid/:id",  getMemberById);
router.put("/updatemember/:id",  updateMember);
router.delete("/deletemember/:id",  deleteMember);
router.get("/memberstats/overview",  getMemberStats);
router.get("/registrations", getPendingRegistrations);
router.put("/approve/:id", approveMemberRegistration);
router.put("/reject/:id", rejectMemberRegistration);




module.exports = router;