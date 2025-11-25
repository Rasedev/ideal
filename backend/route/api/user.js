
////////////////////New code///////////////////////////////

// routes/api/user.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');

// Import controllers
const { 
  createUserController, 
  updateUserStatusController, 
  getAllUserController, 
  updateUserController, 
  deleteUserController, 
  generateUserReport,
  getCurrentUser, 
  forceRefreshUserRole,
  getUserProfileController,
  updateUserProfileController,
  uploadProfilePhotoController,
  changePasswordController
} = require("../../controller/userController");

const { 
  getLoginHistoryController, 
  getRecentActivityController 
} = require("../../controller/activityController");

const { refreshTokenController } = require("../../controller/refreshTokenController"); 
const authMiddleware = require("../../middleware/authMiddleware"); 
const { requireAdmin, requireHR, authorizeRoles } = require("../../middleware/authorizeRoles");

// Import user management controllers
const {
  getUserManagement,
  createUser,
  getEmployees,
  createEmployee,
  getReports,
  getUserStatistics
} = require("../../controller/userManagementController");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Apply auth middleware to all routes
router.use(authMiddleware);

// ==================== USER MANAGEMENT ROUTES (Admin only) ====================
router.get("/admin/users", requireAdmin, getUserManagement);
router.post("/admin/users", requireAdmin, createUser);
router.get("/admin/statistics", requireAdmin, getUserStatistics);

// ==================== EMPLOYEE MANAGEMENT ROUTES (HR and above) ====================
router.get("/hr/employees", requireHR, getEmployees);
router.post("/hr/employees", requireHR, createEmployee);

// ==================== REPORTS ROUTES (SuperAdmin, Admin, HR) ====================
router.get("/reports", authorizeRoles('SuperAdmin', 'Admin', 'HR'), getReports);

// ==================== PROFILE ROUTES (All authenticated users) ====================
router.get("/profile", getUserProfileController);
router.put("/profile", updateUserProfileController);
router.put("/profile/photo", upload.single("profilePhoto"), uploadProfilePhotoController);
router.put("/change-password", changePasswordController);

// ==================== USER SELF-SERVICE ROUTES ====================
router.get("/me", getCurrentUser);
router.post("/refresh-token", refreshTokenController);
router.post("/:userId/refresh-role", forceRefreshUserRole);

// ==================== ACTIVITY LOG ROUTES ====================
router.get("/login-history", getLoginHistoryController);
router.get("/recent-activity", getRecentActivityController);

// ==================== LEGACY ROUTES (Keep for backward compatibility) ====================
router.post("/createuser", upload.single("image"), createUserController);
router.get("/alluser", getAllUserController);
router.put("/userupdate/:id", upload.single("image"), updateUserController);
router.patch("/userstatus", updateUserStatusController);
router.delete("/userdelete/:id", deleteUserController);
router.get("/userreport", generateUserReport);

module.exports = router;









//////////////////////////////////FFFFFFFFFFFFFFF3 prev code////////////////////////////


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require('path');
// const { 
//   createUserController, 
//   updateUserStatusController, 
//   getAllUserController, 
//   updateUserController, 
//   deleteUserController, 
//   generateUserReport,
//   getCurrentUser, 
//   forceRefreshUserRole ,
//   getUserProfileController,
//   updateUserProfileController,
//   uploadProfilePhotoController,
//   changePasswordController,
//   getUserRoles,
//   // getUserStatsController,
//   // updateUserStatsController 
// } = require("../../controller/userController");
// const { 
//   getLoginHistoryController, 
//   getRecentActivityController 
// } = require("../../controller/activityController");
// //  const { updateUserStatsOnLogin,getUserStatsController,getUserRoles } = require("../../controller/userStatsController");

// const { refreshTokenController } = require("../../controller/refreshTokenController"); 
// const  authMiddleware  = require("../../middleware/authMiddleware"); 

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, './uploads'),
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });




// // ✅ PROFILE ROUTES - ADD THESE
// router.get("/profile", authMiddleware, getUserProfileController);
// router.put("/profile", authMiddleware, updateUserProfileController);
// router.put("/profile/photo", authMiddleware, upload.single("profilePhoto"), uploadProfilePhotoController);
// router.put("/change-password", authMiddleware, changePasswordController);
// // router.get("/stats", authMiddleware, updateUserStatsOnLogin);
//   // router.get("/stats", authMiddleware, getUserStatsController);
//   // router.get("/roles", authMiddleware, getUserRoles);

// // ✅ Add these new routes
// router.get("/me", authMiddleware, getCurrentUser); // Get fresh user data
// router.post("/refresh-token", refreshTokenController); // Refresh token
// router.post("/:userId/refresh-role", authMiddleware, forceRefreshUserRole); // Force refresh role

// // Your existing routes
// router.post("/createuser", upload.single("image"), createUserController);
// router.get("/alluser", getAllUserController);
// router.put("/userupdate/:id", upload.single("image"), updateUserController);
// router.patch("/userstatus", updateUserStatusController);
// router.delete("/userdelete/:id", deleteUserController);
// router.get("/userreport", generateUserReport);

// // ✅ NEW ACTIVITY LOG ROUTES
// router.get("/login-history", authMiddleware, getLoginHistoryController); 
// router.get("/recent-activity", authMiddleware, getRecentActivityController); 

// module.exports = router;












