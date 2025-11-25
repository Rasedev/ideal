// controllers/admin/userManagementController.js
// const User = require('../models/userSchema');
// const UserManagement = require('../models/UserManagement');
// const AuditLog = require('../models/AuditLogSchema');

// class UserManagementController {
  
//   // Get all users with pagination and filters
//   async getAllUsers(req, res) {
//     try {
//       const {
//         page = 1,
//         limit = 10,
//         search = '',
//         role = '',
//         status = '',
//         sortBy = 'createdAt',
//         sortOrder = 'desc'
//       } = req.query;

//       // Build filter object
//       const filter = {};
      
//       if (search) {
//         filter.$or = [
//           { firstName: { $regex: search, $options: 'i' } },
//           { lastName: { $regex: search, $options: 'i' } },
//           { email: { $regex: search, $options: 'i' } },
//           { phone: { $regex: search, $options: 'i' } }
//         ];
//       }
      
//       if (role) filter.role = role;
//       if (status) filter.isActive = status === 'active';

//       // Get users with pagination
//       const users = await User.find(filter)
//         .select('-password -verificationToken -resetPasswordToken')
//         .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .lean();

//       // Get total count for pagination
//       const total = await User.countDocuments(filter);

//       // Log the action
//       await AuditLog.create({
//         action: 'GET_ALL_USERS',
//         module: 'UserManagement',
//         userId: req.user.userId,
//         userRole: req.user.role,
//         ipAddress: req.ip,
//         userAgent: req.get('User-Agent')
//       });

//       res.json({
//         success: true,
//         data: {
//           users,
//           pagination: {
//             currentPage: parseInt(page),
//             totalPages: Math.ceil(total / limit),
//             totalUsers: total,
//             hasNext: page * limit < total,
//             hasPrev: page > 1
//           }
//         }
//       });

//     } catch (error) {
//       console.error('Get all users error:', error);
//       res.status(500).json({
//         success: false,
//         error: 'Failed to fetch users'
//       });
//     }
//   }

//   // Get user by ID
//   async getUserById(req, res) {
//     try {
//       const { id } = req.params;

//       const user = await User.findById(id)
//         .select('-password -verificationToken -resetPasswordToken')
//         .lean();

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           error: 'User not found'
//         });
//       }

//       // Get user management data
//       const userManagement = await UserManagement.findOne({ userId: id });

//       res.json({
//         success: true,
//         data: {
//           user,
//           management: userManagement
//         }
//       });

//     } catch (error) {
//       console.error('Get user by ID error:', error);
//       res.status(500).json({
//         success: false,
//         error: 'Failed to fetch user'
//       });
//     }
//   }

//   // Update user status
//   async updateUserStatus(req, res) {
//     try {
//       const { id } = req.params;
//       const { status, notes } = req.body;

//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           error: 'User not found'
//         });
//       }

//       // Prevent self-deactivation
//       if (id === req.user.userId && status === false) {
//         return res.status(400).json({
//           success: false,
//           error: 'Cannot deactivate your own account'
//         });
//       }

//       // Update user status
//       user.isActive = status;
//       await user.save();

//       // Update user management record
//       await UserManagement.findOneAndUpdate(
//         { userId: id },
//         {
//           status: status ? 'active' : 'inactive',
//           notes,
//           assignedBy: req.user.userId
//         },
//         { upsert: true, new: true }
//       );

//       // Log the action
//       await AuditLog.create({
//         action: 'UPDATE_USER_STATUS',
//         module: 'UserManagement',
//         userId: req.user.userId,
//         userRole: req.user.role,
//         ipAddress: req.ip,
//         userAgent: req.get('User-Agent'),
//         resourceId: id,
//         oldData: { isActive: !status },
//         newData: { isActive: status }
//       });

//       res.json({
//         success: true,
//         message: `User ${status ? 'activated' : 'deactivated'} successfully`,
//         data: { user }
//       });

//     } catch (error) {
//       console.error('Update user status error:', error);
//       res.status(500).json({
//         success: false,
//         error: 'Failed to update user status'
//       });
//     }
//   }

//   // Update user role
//   async updateUserRole(req, res) {
//     try {
//       const { id } = req.params;
//       const { role } = req.body;

//       const allowedRoles = ['Admin', 'HR', 'Manager', 'Member', 'Employee', 'ExecutiveMember', 'PlotOwner'];
      
//       if (!allowedRoles.includes(role)) {
//         return res.status(400).json({
//           success: false,
//           error: 'Invalid role specified'
//         });
//       }

//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           error: 'User not found'
//         });
//       }

//       const oldRole = user.role;
//       user.role = role;
//       await user.save();

//       // Log the action
//       await AuditLog.create({
//         action: 'UPDATE_USER_ROLE',
//         module: 'UserManagement',
//         userId: req.user.userId,
//         userRole: req.user.role,
//         ipAddress: req.ip,
//         userAgent: req.get('User-Agent'),
//         resourceId: id,
//         oldData: { role: oldRole },
//         newData: { role }
//       });

//       res.json({
//         success: true,
//         message: `User role updated to ${role} successfully`,
//         data: { user }
//       });

//     } catch (error) {
//       console.error('Update user role error:', error);
//       res.status(500).json({
//         success: false,
//         error: 'Failed to update user role'
//       });
//     }
//   }

//   // Delete user (soft delete)
//   async deleteUser(req, res) {
//     try {
//       const { id } = req.params;

//       // Prevent self-deletion
//       if (id === req.user.userId) {
//         return res.status(400).json({
//           success: false,
//           error: 'Cannot delete your own account'
//         });
//       }

//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           error: 'User not found'
//         });
//       }

//       // Soft delete - mark as inactive and add deleted flag
//       user.isActive = false;
//       user.email = `deleted_${Date.now()}_${user.email}`;
//       await user.save();

//       // Log the action
//       await AuditLog.create({
//         action: 'DELETE_USER',
//         module: 'UserManagement',
//         userId: req.user.userId,
//         userRole: req.user.role,
//         ipAddress: req.ip,
//         userAgent: req.get('User-Agent'),
//         resourceId: id
//       });

//       res.json({
//         success: true,
//         message: 'User deleted successfully'
//       });

//     } catch (error) {
//       console.error('Delete user error:', error);
//       res.status(500).json({
//         success: false,
//         error: 'Failed to delete user'
//       });
//     }
//   }

//   // Get user statistics
//   async getUserStatistics(req, res) {
//     try {
//       const totalUsers = await User.countDocuments();
//       const activeUsers = await User.countDocuments({ isActive: true });
//       const pendingVerification = await User.countDocuments({ emailVerified: false });
      
//       const roleStats = await User.aggregate([
//         {
//           $group: {
//             _id: '$role',
//             count: { $sum: 1 }
//           }
//         }
//       ]);

//       const monthlyGrowth = await User.aggregate([
//         {
//           $group: {
//             _id: {
//               year: { $year: '$createdAt' },
//               month: { $month: '$createdAt' }
//             },
//             count: { $sum: 1 }
//           }
//         },
//         { $sort: { '_id.year': -1, '_id.month': -1 } },
//         { $limit: 6 }
//       ]);

//       res.json({
//         success: true,
//         data: {
//           totalUsers,
//           activeUsers,
//           pendingVerification,
//           roleStats,
//           monthlyGrowth
//         }
//       });

//     } catch (error) {
//       console.error('Get user statistics error:', error);
//       res.status(500).json({
//         success: false,
//         error: 'Failed to fetch user statistics'
//       });
//     }
//   }
// }

// module.exports = new UserManagementController();







// controllers/userManagementController.js
const User = require('../models/userSchema');
const ActivityLog = require('../models/activityLogSchema');

// ✅ Get all users with advanced filtering (Admin only)
const getUserManagement = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      role = '',
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) filter.role = role;
    if (status) {
      if (status === 'active') filter.isActive = true;
      else if (status === 'inactive') filter.isActive = false;
      else if (status === 'pending') filter.emailVerified = false;
    }

    // Get users with pagination
    const users = await User.find(filter)
      .select('-password -verificationToken -resetPasswordToken')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const total = await User.countDocuments(filter);

    // Log the action
    await ActivityLog.create({
      userId: req.user.userId,
      activityType: 'USER_MANAGEMENT_VIEW',
      details: JSON.stringify({
        filter,
        page,
        limit
      }),
      ipAddress: req.ip
    });

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalUsers: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get user management error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
};

// ✅ Create new user (Admin only)
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'User with this email already exists' 
      });
    }

    // Set createdBy field
    userData.createdBy = req.user.userId;

    const newUser = new User(userData);
    await newUser.save();

    // Log the action
    await ActivityLog.create({
      userId: req.user.userId,
      activityType: 'USER_CREATED',
      details: JSON.stringify({
        newUserId: newUser._id,
        email: newUser.email,
        role: newUser.role
      }),
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create user' 
    });
  }
};

// ✅ Get employees (HR and above)
const getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, department = '' } = req.query;
    
    const filter = { 
      role: { $in: ['Employee', 'HR', 'Manager'] } 
    };
    
    if (department) {
      filter.department = department;
    }

    const employees = await User.find(filter)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: {
        employees,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalEmployees: total
        }
      }
    });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch employees' 
    });
  }
};

// ✅ Create employee (HR and above)
const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    
    // Check if employee already exists
    const existingEmployee = await User.findOne({ email: employeeData.email });
    if (existingEmployee) {
      return res.status(400).json({ 
        success: false, 
        error: 'Employee with this email already exists' 
      });
    }

    const newEmployee = new User({
      ...employeeData,
      role: employeeData.role || 'Employee',
      createdBy: req.user.userId
    });
    
    await newEmployee.save();

    // Log the action
    await ActivityLog.create({
      userId: req.user.userId,
      activityType: 'EMPLOYEE_CREATED',
      details: JSON.stringify({
        employeeId: newEmployee._id,
        email: newEmployee.email,
        role: newEmployee.role
      }),
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: newEmployee
    });
  } catch (error) {
    console.error('Create employee error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create employee' 
    });
  }
};

// ✅ Get reports (SuperAdmin, Admin, HR)
const getReports = async (req, res) => {
  try {
    const { reportType = 'user_stats', startDate, endDate } = req.query;

    let reportData = {};

    switch (reportType) {
      case 'user_stats':
        const userStats = await User.aggregate([
          {
            $group: {
              _id: '$role',
              count: { $sum: 1 },
              active: {
                $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
              }
            }
          }
        ]);

        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const newUsersThisMonth = await User.countDocuments({
          createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
        });

        reportData = {
          userStats,
          summary: {
            totalUsers,
            activeUsers,
            newUsersThisMonth,
            inactiveUsers: totalUsers - activeUsers
          }
        };
        break;

      case 'activity_report':
        const dateFilter = {};
        if (startDate) dateFilter.$gte = new Date(startDate);
        if (endDate) dateFilter.$lte = new Date(endDate);

        const activityReport = await ActivityLog.aggregate([
          {
            $match: dateFilter ? { timestamp: dateFilter } : {}
          },
          {
            $group: {
              _id: '$activityType',
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          }
        ]);

        reportData = { activityReport };
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid report type'
        });
    }

    // Log report generation
    await ActivityLog.create({
      userId: req.user.userId,
      activityType: 'REPORT_GENERATED',
      details: JSON.stringify({
        reportType,
        startDate,
        endDate
      }),
      ipAddress: req.ip
    });

    res.json({
      success: true,
      data: {
        reportType,
        generatedAt: new Date(),
        ...reportData
      }
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate reports' 
    });
  }
};

// ✅ Get user statistics for dashboard
const getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const pendingVerification = await User.countDocuments({ emailVerified: false });
    
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const monthlyGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) } // Last 6 months
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        pendingVerification,
        roleStats,
        monthlyGrowth
      }
    });

  } catch (error) {
    console.error('Get user statistics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user statistics'
    });
  }
};

module.exports = {
  getUserManagement,
  createUser,
  getEmployees,
  createEmployee,
  getReports,
  getUserStatistics
};












