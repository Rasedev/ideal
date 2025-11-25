const UserStats = require("../models/userStatsSchema");
const User = require("../models/userSchema");
const mongoose = require("mongoose");


const getUserStatsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get basic user stats
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Calculate basic stats (you can expand this based on your needs)
    const stats = {
      profileComplete: calculateProfileComplete(user),
      accountAge: calculateAccountAge(user.createdAt),
      totalLogins: user.loginCount || 0,
      lastLogin: user.lastLogin,
      memberSince: user.createdAt,
      activityLevel: getActivityLevel(user.lastLogin)
    };

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error("❌ Get user stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user statistics",
      error: error.message
    });
  }
};

const updateUserStatsOnLogin = async (userId) => {
  try {
    console.log("🔄 Updating stats for user ID:", userId);

    // Validate user ID
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.error("❌ Invalid user ID:", userId);
      return null;
    }

    let userStats = await UserStats.findOne({ user: userId });
    const user = await User.findById(userId);

    if (!user) {
      console.error("❌ User not found for stats update:", userId);
      return null;
    }

    if (!userStats) {
      console.log("📝 Creating new stats record for user:", userId);
      userStats = new UserStats({ 
        user: userId, // ✅ Just the ID string
        profileComplete: calculateProfileComplete(user),
        accountAge: calculateAccountAge(user.createdAt),
        totalLogins: 0,
        thisMonthLogins: 0,
        loginStreak: 0
      });
    }

    // Update login counts
    userStats.totalLogins += 1;
    userStats.thisMonthLogins += 1;
    userStats.lastLogin = new Date();

    // Update login streak
    await updateLoginStreak(userStats);

    // Recalculate stats
    userStats.profileComplete = calculateProfileComplete(user);
    userStats.accountAge = calculateAccountAge(user.createdAt);
    userStats.activityScore = calculateActivityScore(userStats);
    
    await userStats.save();
    console.log("✅ Stats updated successfully for user:", userId);
    
    return userStats;

  } catch (error) {
    console.error("❌ Update stats on login error:", error);
    return null;
  }
};

const calculateProfileComplete = (user) => {
  if (!user) return 0;
  
  let complete = 0;
  const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
  const optionalFields = ['address', 'profilePhoto', 'dob', 'gender'];
  
  // Required fields (60% weight)
  requiredFields.forEach(field => {
    if (user[field] && user[field].toString().trim() !== '') {
      complete += 15; // 15% per required field
    }
  });
  
  // Optional fields (40% weight)
  optionalFields.forEach(field => {
    if (user[field] && user[field].toString().trim() !== '') {
      complete += 5; // 5% per optional field
    }
  });
  
  return Math.min(100, complete);
};

const calculateAccountAge = (createdAt) => {
  if (!createdAt) return 0;
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Return days
};

const updateLoginStreak = async (userStats) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastLogin = userStats.lastLogin ? new Date(userStats.lastLogin) : null;
  if (lastLogin) lastLogin.setHours(0, 0, 0, 0);

  if (!lastLogin) {
    userStats.loginStreak = 1;
    return;
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastLogin.getTime() === yesterday.getTime()) {
    userStats.loginStreak += 1;
  } else if (lastLogin.getTime() !== today.getTime()) {
    userStats.loginStreak = 1;
  }
};

const calculateActivityScore = (userStats) => {
  let score = 50;
  score += Math.min(userStats.loginStreak * 2, 20);
  score += Math.min(userStats.thisMonthLogins, 20);
  score += (userStats.profileComplete / 100) * 10;
  return Math.min(100, Math.round(score));
};

const getActivityLevel = (lastLogin) => {
  if (!lastLogin) return 'Inactive';
  
  const lastLoginDate = new Date(lastLogin);
  const now = new Date();
  const daysSinceLogin = Math.floor((now - lastLoginDate) / (1000 * 60 * 60 * 24));
  
  if (daysSinceLogin <= 1) return 'High';
  if (daysSinceLogin <= 7) return 'Medium';
  return 'Low';
};
const getUserRoles = async (req, res) => {
  try {
    const roles = await User.distinct("role");
    res.json({ success: true, roles });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

module.exports = {
  getUserStatsController,
  updateUserStatsOnLogin,
  getUserRoles
};
































