// const ActivityLog = require("../models/activityLogSchema");

// // Helper function to create a log entry
// const createLog = async (userId, activityType, details = {}, req = null) => {
//     try {
//         const ipAddress = req ? (req.headers['x-forwarded-for'] || req.connection.remoteAddress) : null;
//         await ActivityLog.create({
//             userId,
//             activityType,
//             details: JSON.stringify(details), // Store details as a string (or JSON)
//             ipAddress,
//         });
//     } catch (error) {
//         console.error("❌ Failed to create activity log:", error);
//         // Do not re-throw, logging errors shouldn't break the main flow.
//     }
// };

// // ✅ Get user's login history
// const getLoginHistoryController = async (req, res) => {
//     try {
//         const userId = req.user.userId; // Assuming authMiddleware sets req.user
//         const history = await ActivityLog.find({ 
//             userId, 
//             activityType: { $in: ["LOGIN", "LOGOUT"] } 
//         })
//         .sort({ timestamp: -1 })
//         .limit(20) // Limit to 20 recent logins/logouts
//         .select("-__v -userId"); 

//         res.status(200).json({
//             success: true,
//             total: history.length,
//             data: history,
//             message: "Login history retrieved successfully"
//         });
//     } catch (err) {
//         console.error("❌ Get Login History Error:", err);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch login history",
//         });
//     }
// };

// // ✅ Get user's recent activity
// const getRecentActivityController = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const activity = await ActivityLog.find({ userId })
//         .sort({ timestamp: -1 })
//         .limit(10) // Limit to 10 recent activities of any type
//         .select("-__v -userId"); 

//         res.status(200).json({
//             success: true,
//             total: activity.length,
//             data: activity,
//             message: "Recent activity retrieved successfully"
//         });
//     } catch (err) {
//         console.error("❌ Get Recent Activity Error:", err);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch recent activity",
//         });
//     }
// };

// module.exports = {
//     createLog, // Export helper for use in other controllers (like login/user)
//     getLoginHistoryController,
//     getRecentActivityController
// };







// controllers/activityController.js
const ActivityLog = require("../models/activityLogSchema");

// Helper function to create a log entry
const createLog = async (userId, activityType, details = {}, req = null) => {
    try {
        const ipAddress = req ? (req.headers['x-forwarded-for'] || req.connection.remoteAddress) : null;
        await ActivityLog.create({
            userId,
            activityType,
            details: JSON.stringify(details),
            ipAddress,
        });
    } catch (error) {
        console.error("❌ Failed to create activity log:", error);
    }
};

// ✅ Get user's login history
const getLoginHistoryController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const history = await ActivityLog.find({ 
            userId, 
            activityType: { $in: ["LOGIN", "LOGOUT"] } 
        })
        .sort({ timestamp: -1 })
        .limit(20)
        .select("-__v -userId"); 

        res.status(200).json({
            success: true,
            total: history.length,
            data: history,
            message: "Login history retrieved successfully"
        });
    } catch (err) {
        console.error("❌ Get Login History Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch login history",
        });
    }
};

// ✅ Get user's recent activity
const getRecentActivityController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const activity = await ActivityLog.find({ userId })
        .sort({ timestamp: -1 })
        .limit(10)
        .select("-__v -userId"); 

        res.status(200).json({
            success: true,
            total: activity.length,
            data: activity,
            message: "Recent activity retrieved successfully"
        });
    } catch (err) {
        console.error("❌ Get Recent Activity Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch recent activity",
        });
    }
};

module.exports = {
    createLog,
    getLoginHistoryController,
    getRecentActivityController
};











