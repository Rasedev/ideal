
/////////////////////আগের কোড////////////////////////

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path'); 
// const fs = require("fs");
// const authMiddleware = require("../../middleware/authMiddleware");
// const authorizeRoles = require("../../middleware/authorizeRoles");
// const { getAdminProfileController, profilePhotoController,assignRoleController,getAllUsersController, updateUserStatusController,
//     getDashboardStatsController,getRecentActivitiesController} = require('../../controller/adminController');


// // ✅ 1. Ensure uploads folder exists

// const uploadDir = path.join(__dirname, "../../uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log("✅ Created uploads directory at:", uploadDir);
// }

// // ✅ 2. Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}${path.extname(file.originalname)}`;
//     cb(null, uniqueName);
//   },
// });

// // ✅ 3. File filter (restrict to images only)
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowed = /jpeg|jpg|png|gif/;
//     const extname = allowed.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = allowed.test(file.mimetype);

//     if (extname && mimetype) {
//       cb(null, true);
//     } else {
//       req.fileValidationError = "Only images (jpeg, jpg, png, gif) are allowed!";
//       cb(null, false);
//     }
//   },
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
// });




// // --- Admin Profile Routes ---
// router.get('/profile', getAdminProfileController);
// router.put('/profilephoto/:id', upload.single('profilePhoto'), profilePhotoController);
// // router.get('/profile',  authMiddleware,  authorizeRoles(["Admin", "HR"]),getAdminProfileController);
// // router.put('/profilephoto/:id',  authMiddleware, authorizeRoles(["Admin", "HR", "Employee"]), upload.single('profilePhoto'), profilePhotoController);
// // --- User Management Routes (Requires Admin/HR) ---

// router.put('/assignrole/:id/role', authMiddleware,  assignRoleController); 
// router.get('/Allusers',  authMiddleware, getAllUsersController);
// // Note: The controller expects 'userId' in req.params, but the route uses ':id'
// router.put("/updateuser/:id/status", authMiddleware, updateUserStatusController); 

// // --- Dashboard Routes (Requires Admin/HR) ---
// router.get("/getdashboard/stats", authMiddleware, getDashboardStatsController);
// router.get("/recent-activities",  authMiddleware, getRecentActivitiesController);

// module.exports = router;




/////////////////////////////নতুন কোড//////////////////////////


// routes/api/admin.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireAdmin } = require('../../middleware/authorizeRoles');

// Import admin controllers
const {
  getAdminProfileController,
  profilePhotoController,
  assignRoleController,
  getAllUsersController,
  updateUserStatusController,
  getDashboardStatsController,
  getRecentActivitiesController,
  getAdminDashboardStats,
  getSystemOverview,
  getAdminSettings,
  updateAdminSettings,
  getUserActivityLogs,
  bulkUserActions,
  getAdminNotifications
} = require('../../controller/adminController');

const User = require('../../models/userSchema');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Apply auth middleware to all admin routes
router.use(authMiddleware);
router.use(requireAdmin); // All routes below require admin role

// ==================== PROFILE ROUTES ====================
router.get('/profile', getAdminProfileController);
router.put('/profilephoto/:id', upload.single('profilePhoto'), profilePhotoController);

// ==================== USER MANAGEMENT ROUTES ====================
router.get('/Allusers', getAllUsersController);
router.put('/assignrole/:id/role', assignRoleController);
router.put('/updateuser/:id/status', updateUserStatusController);
router.post('/users/bulk-actions', bulkUserActions);

// ==================== DASHBOARD ROUTES ====================
router.get('/getdashboard/stats', getDashboardStatsController);
router.get('/dashboard/stats', getAdminDashboardStats);
router.get('/system/overview', getSystemOverview);
router.get('/recent-activities', getRecentActivitiesController);
router.get('/notifications', getAdminNotifications);

// ==================== SETTINGS ROUTES ====================
router.get('/settings', getAdminSettings);
router.put('/settings', updateAdminSettings);

// ==================== ACTIVITY LOGS ROUTES ====================
router.get('/activity-logs', getUserActivityLogs);

// ==================== ADDITIONAL ADMIN ROUTES ====================

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
});

// Get system statistics
router.get('/statistics', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const todayLogins = await User.countDocuments({
      lastLogin: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    const roleStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        todayLogins,
        roleStats
      }
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

// Export users
router.get('/export-users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    // Simple CSV export
    const csvData = users.map(user => ({
      Name: `${user.firstName} ${user.lastName}`,
      Email: user.email,
      Role: user.role,
      Status: user.isActive ? 'Active' : 'Inactive',
      'Last Login': user.lastLogin || 'Never',
      'Join Date': user.createdAt
    }));

    res.json({
      success: true,
      data: csvData,
      message: 'Users data ready for export'
    });
  } catch (error) {
    console.error('Export users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export users'
    });
  }
});

module.exports = router;

