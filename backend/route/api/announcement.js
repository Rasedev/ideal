// // routes/announcementRoute.js
// const express = require("express");
// const router = express.Router();
// const {
//   createAnnouncement,
//   getUserAnnouncements,
//   getAnnouncementById,
//   getAnnouncementStats
// } = require("../../controller/announcementController");
// const authMiddleware = require("../../middleware/authMiddleware");
// const authorizeRoles = require("../../middleware/authorizeRoles");

// // All authenticated users can read announcements
// router.get("/my-announcements", authMiddleware, getUserAnnouncements);
// router.get("/:id", authMiddleware, getAnnouncementById);

// // Committee members can create announcements
// router.post("/create", 
//   authMiddleware, 
//   authorizeRoles(
//     "President", "ExecutivePresident", "VicePresident", 
//     "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
//     "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
//     "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
//     "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
//     "ExecutiveMember", "Admin"
//   ), 
//   createAnnouncement
// );

// // Stats for senders
// router.get("/stats/my-stats", 
//   authMiddleware, 
//   authorizeRoles(
//     "President", "ExecutivePresident", "VicePresident", 
//     "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
//     "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
//     "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
//     "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
//     "ExecutiveMember", "Admin"
//   ), 
//   getAnnouncementStats
// );

// module.exports = router;


const express = require("express");
const router = express.Router();
const {createAnnouncement, getUserAnnouncements,getAnnouncementById,getAnnouncementStats
} = require("../../controller/announcementController");
const { protect } = require("../../middleware/authMiddleware");
const authorizeRoles = require("../../middleware/authorizeRoles");




router.get("/my-announcements",  getUserAnnouncements);
router.get("/:id",  getAnnouncementById);
router.post("/create",createAnnouncement);
router.get("/stats/my-stats",  getAnnouncementStats);

module.exports = router;