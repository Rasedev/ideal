const RecentActivity = require("../models/recentActivitySchema");

exports.logActivity = async (userId, action, description, req = null) => {
  try {
    const ipAddress = req?.ip || "Unknown IP";
    const userAgent = req?.headers["user-agent"] || "Unknown device";

    await RecentActivity.create({
      user: userId,
      action,
      description,
      ipAddress,
      deviceInfo: userAgent,
    });

  } catch (error) {
    console.error("Activity logging error:", error.message);
  }
};
