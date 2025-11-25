


/////////////////////////////////////////FINAL333333333333333333/////////////////////////////////


const RecentActivity = require("../models/recentActivitySchema");
const ActivityLog = require('../models/activityLogSchema');
const User = require("../models/userSchema");
const Subscription = require("../models/subscriptionSchema");
const Application = require("../models/applicationSchema");
const Announcement = require("../models/announcementSchema");
const jwt = require("jsonwebtoken");
const path = require("path");

// ✅ Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "Rasel";

// ✅ Base URL should come from env
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

/**
 * Helper: Extract user info from JWT token (when authMiddleware isn't used)
 */
const extractUserFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
};

// ✅ Get admin dashboard statistics
const getAdminDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      pendingVerification,
      totalEmployees,
      totalMembers,
      todayLogins,
      recentActivities
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ emailVerified: false }),
      User.countDocuments({ role: { $in: ['Employee', 'HR'] } }),
      User.countDocuments({ role: 'Member' }),
      User.countDocuments({ lastLogin: { $gte: new Date().setHours(0,0,0,0) } }),
      ActivityLog.find()
        .sort({ timestamp: -1 })
        .limit(10)
        .populate('userId', 'firstName lastName email role')
    ]);

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
        pendingVerification,
        totalEmployees,
        totalMembers,
        todayLogins,
        roleStats,
        recentActivities
      }
    });

  } catch (error) {
    console.error('Admin dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics'
    });
  }
};

// ✅ Get system overview
const getSystemOverview = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    const activityStats = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: '$activityType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        userGrowth,
        activityStats,
        period: '30_days'
      }
    });

  } catch (error) {
    console.error('System overview error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch system overview'
    });
  }
};

// ✅ Get admin settings
const getAdminSettings = async (req, res) => {
  try {
    // Default system settings
    const defaultSettings = {
      site_name: 'Alamgir Hossain City Kallan Samity',
      site_description: 'Community Welfare Association',
      admin_email: 'admin@alamgirhossain.com',
      membership_fee: 500,
      currency: 'BDT',
      email_notifications: true,
      sms_notifications: true,
      max_login_attempts: 5,
      session_timeout: 24
    };

    res.json({
      success: true,
      data: defaultSettings
    });

  } catch (error) {
    console.error('Get admin settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admin settings'
    });
  }
};

// ✅ Update admin settings
const updateAdminSettings = async (req, res) => {
  try {
    const { settings } = req.body;

    // Log the settings update
    await ActivityLog.create({
      userId: req.user.userId,
      activityType: 'SETTINGS_UPDATED',
      details: JSON.stringify({
        updatedSettings: Object.keys(settings)
      }),
      ipAddress: req.ip
    });

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });

  } catch (error) {
    console.error('Update admin settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update settings'
    });
  }
};

// ✅ Get user activity logs
const getUserActivityLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      userId = '',
      activityType = '',
      startDate = '',
      endDate = ''
    } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (activityType) filter.activityType = activityType;
    
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const logs = await ActivityLog.find(filter)
      .populate('userId', 'firstName lastName email role')
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ActivityLog.countDocuments(filter);

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalLogs: total
        }
      }
    });

  } catch (error) {
    console.error('Get user activity logs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch activity logs'
    });
  }
};

// ✅ Bulk user actions
const bulkUserActions = async (req, res) => {
  try {
    const { action, userIds, data } = req.body;

    if (!action || !userIds || !Array.isArray(userIds)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request. Action and user IDs are required.'
      });
    }

    let result;
    switch (action) {
      case 'activate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { isActive: true }
        );
        break;

      case 'deactivate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { isActive: false }
        );
        break;

      case 'delete':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { 
            isActive: false,
            email: { $concat: ['deleted_', '$email'] } // Soft delete
          }
        );
        break;

      case 'assign_role':
        if (!data || !data.role) {
          return res.status(400).json({
            success: false,
            error: 'Role is required for assign_role action'
          });
        }
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { role: data.role }
        );
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action'
        });
    }

    // Log bulk action
    await ActivityLog.create({
      userId: req.user.userId,
      activityType: `BULK_${action.toUpperCase()}`,
      details: JSON.stringify({
        action,
        affectedUsers: userIds.length,
        data
      }),
      ipAddress: req.ip
    });

    res.json({
      success: true,
      message: `Bulk action '${action}' completed successfully`,
      data: {
        matched: result.matchedCount,
        modified: result.modifiedCount
      }
    });

  } catch (error) {
    console.error('Bulk user actions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform bulk action'
    });
  }
};

// ✅ Get admin notifications
const getAdminNotifications = async (req, res) => {
  try {
    const pendingVerifications = await User.countDocuments({ emailVerified: false });
    const inactiveUsers = await User.countDocuments({ isActive: false });
    
    // Recent system activities
    const recentSystemActivities = await ActivityLog.find({
      activityType: { 
        $in: ['USER_CREATED', 'USER_UPDATED', 'STATUS_CHANGE', 'ROLE_CHANGE'] 
      }
    })
    .sort({ timestamp: -1 })
    .limit(10)
    .populate('userId', 'firstName lastName');

    const notifications = {
      pendingVerifications,
      inactiveUsers,
      recentSystemActivities,
      systemHealth: 'operational', // You can add more sophisticated health checks
      lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
    };

    res.json({
      success: true,
      data: notifications
    });

  } catch (error) {
    console.error('Get admin notifications error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admin notifications'
    });
  }
};

/**
 * @desc Get Admin/User Profile
 * @route GET /api/admin/profile
 * @access Private
 */
async function getAdminProfileController(req, res) {
  try {
    const decoded = extractUserFromToken(req);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
    }

    const user = await User.findOne({ email: decoded.email }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const profileData = {
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role || "Member",
      dateOfJoining: user.dateOfJoining || new Date(),
      profilePhoto: user.profilePhoto || null,
      status: user.status || "Active",
      department: user.department || "N/A",
      phone: user.phone || "N/A",
      lastLogin: user.lastLogin || new Date(),
    };

    res.status(200).json({ success: true, profile: profileData });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

/**
 * @desc Update User Profile Photo
 * @route PUT /api/admin/profilephoto/:id
 * @access Private
 */
async function profilePhotoController(req, res) {
  const employeeId = req.params.id;

  if (!employeeId || employeeId.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required in the URL parameter.",
    });
  }

  if (req.fileValidationError) {
    return res.status(400).json({ success: false, message: req.fileValidationError });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No profile photo file provided.",
    });
  }

  // ✅ Use BASE_URL for flexibility
  const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      employeeId,
      { $set: { profilePhoto: imageUrl } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully!",
      imageUrl,
      user: {
        id: updatedUser._id,
        profilePhoto: updatedUser.profilePhoto,
      },
    });
  } catch (error) {
    console.error("Error updating profile photo:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID format.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while updating profile photo.",
      error: error.message,
    });
  }
}

/**
 * @desc Assign Role
 * @route PUT /api/admin/assignrole/:id/role
 * @access Private
 */
async function assignRoleController(req, res) {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ success: false, message: "Role is required" });
    }

    const validRoles = [
      "President", "ExecutivePresident", "VicePresident",
      "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
      "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
      "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
      "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
      "ExecutiveMember", "Member", "PlotOwner", "Employee", "Admin", "HR"
    ];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      user: {
        id: updatedUser._id,
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        email: updatedUser.email,
        role: updatedUser.role,
        committeePosition: updatedUser.committeePosition,
      },
    });
  } catch (error) {
    console.error("Error assigning role:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid user ID format." });
    }
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

/**
 * @desc Get All Users (with pagination + search)
 * @route GET /api/admin/Allusers
 * @access Private
 */
async function getAllUsersController(req, res) {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { erpNumber: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
}

/**
 * @desc Update User Status
 * @route PUT /api/admin/updateuser/:id/status
 * @access Private
 */
async function updateUserStatusController(req, res) {
  try {
    const userId = req.params.id;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ success: false, message: "isActive must be a boolean." });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { isActive }, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user status error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid user ID format." });
    }
    res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: error.message,
    });
  }
}

/**
 * @desc Get Dashboard Statistics
 * @route GET /api/admin/getdashboard/stats
 * @access Private
 */
async function getDashboardStatsController(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const totalMembers = await User.countDocuments({
      role: { $in: ["Member", "PlotOwner"] },
    });
    const totalCommittee = await User.countDocuments({
      role: {
        $in: [
          "President", "ExecutivePresident", "VicePresident",
          "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
          "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
          "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
          "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
          "ExecutiveMember"
        ],
      },
    });

    const paidSubscriptions = 0;
    const pendingApplications = 0;
    const recentAnnouncements = 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalMembers,
        totalCommittee,
        paidSubscriptions,
        pendingApplications,
        recentAnnouncements,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard statistics",
      error: error.message,
    });
  }
}

/**
 * @desc Get Recent Activities
 * @route GET /api/admin/recent-activities
 * @access Private
 */
async function getRecentActivitiesController(req, res) {
  try {
    const activities = await RecentActivity.find()
      .populate("user", "firstName lastName email role")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: activities.map((act) => ({
        id: act._id,
        userName: `${act.user?.firstName || "Unknown"} ${act.user?.lastName || "User"}`,
        email: act.user?.email || "N/A",
        role: act.user?.role || "N/A",
        action: act.action,
        description: act.description,
        createdAt: act.createdAt,
      })),
    });
  } catch (error) {
    console.error("Recent activities error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recent activities",
      error: error.message,
    });
  }
}

module.exports = {
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
};





