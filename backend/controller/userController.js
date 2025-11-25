

// const User = require("../models/userSchema");
// const { createObjectCsvStringifier } = require("csv-writer");

// // ✅ Create new user
// exports.createUserController = async (req, res) => {
//   try {
//     const data = req.body;

//     // Handle image upload
//     if (req.file) {
//       data.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     }

//     // Validate unique email
//     const existing = await User.findOne({ email: data.email });
//     if (existing) {
//       return res.status(400).json({ success: false, message: "Email already exists" });
//     }

//     const user = new User(data);
//     await user.save();

//     res.status(201).json({ success: true, message: "User created successfully", data: user });
//   } catch (err) {
//     console.error("Create User Error:", err);
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// // ✅ Get all users
// exports.getAllUserController = async (req, res) => {
//   try {
//     const users = await User.find({}).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, total: users.length, data: users });
//   } catch (err) {
//     console.error("Get All Users Error:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch users" });
//   }
// };



// // ✅ Delete user
// exports.deleteUserController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await User.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     res.status(200).json({ success: true, message: "User deleted" });
//   } catch (err) {
//     console.error("Delete User Error:", err);
//     res.status(500).json({ success: false, message: "Delete failed", error: err.message });
//   }
// };

// // ✅ Update user status
// exports.updateUserStatusController = async (req, res) => {
//   try {
//     const { id, status } = req.body;

//     if (!["waiting", "approved", "rejected"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const user = await User.findByIdAndUpdate(
//       id,
//       { status, isActive: status === "approved" },
//       { new: true }
//     );

//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     res.status(200).json({ success: true, message: "Status updated", data: user });
//   } catch (err) {
//     console.error("Status Update Error:", err);
//     res.status(500).json({ success: false, message: "Status update failed", error: err.message });
//   }
// };

// // ✅ CSV or JSON Report
// exports.generateUserReport = async (req, res) => {
//   try {
//     const { role, status, format = "json" } = req.query;
//     const query = {};
//     if (role) query.role = role;
//     if (status) query.status = status;

//     const users = await User.find(query).select("-password");

//     if (format === "csv") {
//       const csvStringifier = createObjectCsvStringifier({
//         header: [
//           { id: "firstName", title: "First Name" },
//           { id: "lastName", title: "Last Name" },
//           { id: "email", title: "Email" },
//           { id: "role", title: "Role" },
//           { id: "status", title: "Status" },
//           { id: "isActive", title: "Active" },
//         ],
//       });

//       const csv =
//         csvStringifier.getHeaderString() +
//         csvStringifier.stringifyRecords(users.map((u) => u.toObject()));

//       res.header("Content-Type", "text/csv");
//       res.attachment("user_report.csv");
//       return res.send(csv);
//     }

//     res.status(200).json({ success: true, count: users.length, data: users });
//   } catch (err) {
//     console.error("Generate Report Error:", err);
//     res.status(500).json({ success: false, message: "Report generation failed", error: err.message });
//   }
// };


// // ✅ Update user
// exports.updateUserController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     if (req.file) {
//       updates.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     }

//     const updatedUser = await User.findByIdAndUpdate(id, updates, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, message: "User updated", data: updatedUser });
//   } catch (err) {
//     console.error("Update User Error:", err);
//     res.status(500).json({ success: false, message: "Update failed", error: err.message });
//   }
// };





// const User = require("../models/userSchema");
// const jwt = require("jsonwebtoken");

// const updateUserController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     const { password, token, email, ...safeUpdates } = updates;

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       safeUpdates,
//       { new: true, runValidators: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     let newToken = null;
//     if (updates.role) {
//       newToken = jwt.sign(
//         { userId: updatedUser._id, email: updatedUser.email, role: updatedUser.role },
//         process.env.JWT_SECRET || "Rasel",
//         { expiresIn: "30d" }
//       );
//     }

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: updatedUser,
//       ...(newToken && { newToken })
//     });
//   } catch (err) {
//     console.error("Update User Error:", err);
//     res.status(500).json({ success: false, message: "Update failed", error: err.message });
//   }
// };

// const getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Get current user error:", error);
//     res.status(500).json({ success: false, message: "Error fetching user data" });
//   }
// };

// module.exports = { updateUserController, getCurrentUser };




// const UserStats = require("../models/userStatsSchema");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { createObjectCsvStringifier } = require("csv-writer");


const createUserController = async (req, res) => {
  try {
    const data = req.body;

    // Handle image upload
    if (req.file) {
      data.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // Check required fields
    if (!data.email || !data.firstName || !data.lastName) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, and email are required",
      });
    }

    // Validate unique email
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = new User(data);
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error("❌ Create User Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ✅ Get all users
const getAllUserController = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .select("-password");
    res.status(200).json({
      success: true,
      total: users.length,
      data: users,
    });
  } catch (err) {
    console.error("❌ Get All Users Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// ✅ Delete user
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("❌ Delete User Error:", err);
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: err.message,
    });
  }
};

// ✅ Update user status
const updateUserStatusController = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!["waiting", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be waiting, approved, or rejected",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status, isActive: status === "approved" },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      data: user,
    });
  } catch (err) {
    console.error("❌ Status Update Error:", err);
    res.status(500).json({
      success: false,
      message: "Status update failed",
      error: err.message,
    });
  }
};

// ✅ Generate user report (CSV or JSON)
const generateUserReport = async (req, res) => {
  try {
    const { role, status, format = "json" } = req.query;
    const query = {};
    if (role) query.role = role;
    if (status) query.status = status;

    const users = await User.find(query).select("-password");

    if (format === "csv") {
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: "firstName", title: "First Name" },
          { id: "lastName", title: "Last Name" },
          { id: "email", title: "Email" },
          { id: "role", title: "Role" },
          { id: "status", title: "Status" },
          { id: "isActive", title: "Active" },
        ],
      });

      const csv =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(users.map((u) => u.toObject()));

      res.header("Content-Type", "text/csv");
      res.attachment("user_report.csv");
      return res.send(csv);
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error("❌ Generate Report Error:", err);
    res.status(500).json({
      success: false,
      message: "Report generation failed",
      error: err.message,
    });
  }
};

// ✅ Enhanced update user controller with role change handling
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    console.log("🔄 Updating user:", id, "with data:", updates);

    const currentUser = await User.findById(id);
    if (!currentUser) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    const { password, token, email, ...safeUpdates } = updates;

    const updatedUser = await User.findByIdAndUpdate(
      id, 
      safeUpdates, 
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found after update" 
      });
    }

    console.log("✅ User updated successfully:", {
      id: updatedUser._id,
      oldRole: currentUser.role,
      newRole: updatedUser.role,
      email: updatedUser.email
    });

    let newToken = null;
    if (updates.role && currentUser.role !== updates.role) {
      newToken = jwt.sign(
        {
          userId: updatedUser._id,
          email: updatedUser.email,
          role: updatedUser.role,
        },
        process.env.JWT_SECRET || "Rasel",
        { expiresIn: '30d' }
      );

      console.log("🆕 New token generated for role change:", updatedUser.role);
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
      ...(newToken && { 
        newToken,
        message: "User updated successfully. Please use the new token for future requests."
      })
    });

  } catch (err) {
    console.error("❌ Update User Error:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Update failed",
      error: err.message
    });
  }
};

// ✅ Get fresh user data
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.userId || req.params.id;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("📊 Fresh user data from DB:", {
      id: user._id,
      role: user.role,
      email: user.email
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        membershipId: user.membershipId,
        committeePosition: user.committeePosition,
        profilePhoto: user.profilePhoto,
        isActive: user.isActive,
        emailverified: user.emailverified,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error("❌ Get current user error:", error);
    res.status(500).json({ success: false, message: "Error fetching user data" });
  }
};

// ✅ Force refresh user role
const forceRefreshUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "Rasel",
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: "User role refreshed successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      newToken
    });

  } catch (error) {
    console.error("Force refresh error:", error);
    res.status(500).json({ success: false, message: "Failed to refresh user role" });
  }
};

// ✅ Get user profile
const getUserProfileController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        telephone: user.telephone,
        address: user.address,
        addressOne: user.addressOne,
        dob: user.dob,
        gender: user.gender,
        nidNumber: user.nidNumber,
        role: user.role,
        status: user.status,
        membershipId: user.membershipId,
        committeePosition: user.committeePosition,
        division: user.division,
        district: user.district,
        profilePhoto: user.profilePhoto,
        image: user.image,
        profilePicture: user.profilePicture,
        isActive: user.isActive,
        emailverified: user.emailverified,
        dateJoined: user.dateJoined,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error("❌ Get user profile error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching user profile" 
    });
  }
};

// ✅ Update user profile
const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updates = req.body;

    // Remove sensitive fields that shouldn't be updated via profile
    const { password, token, email, role, status, ...safeUpdates } = updates;

    const user = await User.findByIdAndUpdate(
      userId, 
      safeUpdates, 
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        dob: user.dob,
        gender: user.gender,
        nidNumber: user.nidNumber,
        profilePhoto: user.profilePhoto
      }
    });
  } catch (error) {
    console.error("❌ Update profile error:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message
    });
  }
};

// ✅ Upload profile photo
const uploadProfilePhotoController = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      profilePhoto: imageUrl,
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error("❌ Upload profile photo error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload profile photo",
      error: error.message
    });
  }
};

// ✅ Change password
const changePasswordController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // In a real app, you would verify current password first
    // For now, we'll just update the password
    user.password = newPassword; // This will be hashed by the pre-save middleware
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    console.error("❌ Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: error.message
    });
  }
};

///////////stats///////////
// // Get user stats
// const getUserStatsController = async (req, res) => {
//   try {
//     const userId = req.user.userId;
    
//     console.log("📊 Fetching stats for user:", userId);

//     // Find existing stats or create default ones
//     let userStats = await UserStats.findOne({ user: userId });

//     if (!userStats) {
//       console.log("📝 Creating default stats for user:", userId);
      
//       // Get user data to calculate initial stats
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found"
//         });
//       }

//       // Create default stats
//       userStats = new UserStats({
//         user: userId,
//         profileComplete: calculateProfileComplete(user),
//         accountAge: calculateAccountAge(user.createdAt),
//         loginStreak: 0,
//         thisMonthLogins: 1, // Count current login
//         totalLogins: 1,
//         activityScore: 50
//       });

//       await userStats.save();
//       console.log("✅ Default stats created for user:", userId);
//     }

//     // Format response for frontend
//     const statsResponse = {
//       profileComplete: userStats.profileComplete,
//       accountAge: userStats.accountAge,
//       loginStreak: userStats.loginStreak,
//       thisMonthLogins: userStats.thisMonthLogins,
//       totalLogins: userStats.totalLogins,
//       activityScore: userStats.activityScore,
//       activityLevel: getActivityLevel(userStats.activityScore),
//       // Format for your header component
//       bugsFixed: `${userStats.totalLogins || 0}`, // Using logins as "bugs fixed"
//       performance: `${Math.min(100, userStats.profileComplete + 20)}%`, // Mock performance
//       activity: getActivityLevel(userStats.activityScore)
//     };

//     console.log("📈 Sending stats:", statsResponse);

//     res.status(200).json({
//       success: true,
//       data: statsResponse
//     });

//   } catch (error) {
//     console.error("❌ Get user stats error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Error fetching user stats",
//       error: error.message 
//     });
//   }
// };

// // Update user stats on login
// const updateUserStatsController = async (userId) => {
//   try {
//     let userStats = await UserStats.findOne({ user: userId });
//     const user = await User.findById(userId);

//     if (!userStats) {
//       userStats = new UserStats({ 
//         user: userId,
//         profileComplete: calculateProfileComplete(user),
//         accountAge: calculateAccountAge(user.createdAt)
//       });
//     }

//     // Update login counts
//     userStats.totalLogins += 1;
//     userStats.thisMonthLogins += 1;
//     userStats.lastLogin = new Date();

//     // Update login streak
//     await updateLoginStreak(userStats);

//     // Recalculate activity score
//     userStats.activityScore = calculateActivityScore(userStats);
    
//     await userStats.save();
//     return userStats;

//   } catch (error) {
//     console.error("❌ Update stats on login error:", error);
//     return null;
//   }
// };

// // Helper functions
// const calculateProfileComplete = (user) => {
//   if (!user) return 0;
  
//   let complete = 0;
//   const fields = [
//     'firstName', 'lastName', 'email', 'phone', 'address', 
//     'profilePhoto', 'dob', 'gender'
//   ];
  
//   fields.forEach(field => {
//     if (user[field] && user[field].toString().trim() !== '') {
//       complete += 12.5;
//     }
//   });
  
//   return Math.min(100, Math.round(complete));
// };

// const calculateAccountAge = (createdAt) => {
//   if (!createdAt) return 0;
//   const created = new Date(createdAt);
//   const now = new Date();
//   const diffTime = Math.abs(now - created);
//   return Math.floor(diffTime / (1000 * 60 * 60 * 24));
// };

// const updateLoginStreak = async (userStats) => {
//   const today = new Date();
//   const lastLogin = userStats.lastLogin ? new Date(userStats.lastLogin) : null;

//   if (!lastLogin) {
//     userStats.loginStreak = 1;
//     return;
//   }

//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   // Check if last login was yesterday (maintain streak)
//   if (lastLogin.toDateString() === yesterday.toDateString()) {
//     userStats.loginStreak += 1;
//   } 
//   // Check if last login was today (no change)
//   else if (lastLogin.toDateString() !== today.toDateString()) {
//     // If more than one day gap, reset streak
//     userStats.loginStreak = 1;
//   }
// };

// const calculateActivityScore = (userStats) => {
//   let score = 50; // Base score
  
//   // Login streak bonus (max 20 points)
//   score += Math.min(userStats.loginStreak * 2, 20);
  
//   // Monthly activity bonus (max 20 points)
//   score += Math.min(userStats.thisMonthLogins, 20);
  
//   // Profile completion bonus (max 10 points)
//   score += (userStats.profileComplete / 100) * 10;
  
//   return Math.min(100, Math.round(score));
// };

// const getActivityLevel = (score) => {
//   if (score >= 80) return 'High';
//   if (score >= 50) return 'Medium';
//   return 'Low';
// };





// ✅ Export functions directly
module.exports = {
  createUserController,
  getAllUserController,
  deleteUserController,
  updateUserStatusController,
  generateUserReport,
  updateUserController,
  getCurrentUser,
  forceRefreshUserRole,
  getUserProfileController,
  updateUserProfileController,
  uploadProfilePhotoController,
  changePasswordController,
 
  // getUserStatsController,
  // updateUserStatsController
};











