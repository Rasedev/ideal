const DashboardStats = require("../models/dashboardStatsSchema");
const DashboardAction = require("../models/dashboardActionsSchema");

async function getDashboardStats(req, res) {
  try {
    let stats = await DashboardStats.findOne().sort({ updatedAt: -1 });

    if (!stats) {
      // Create default stats if none exist
      stats = await DashboardStats.create({
        totalMembers: 0,
        pendingApprovals: 0,
        totalApplications: 0,
        totalIncome: 0,
        monthlySubscriptionAmount: 0
      });
    }

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get Dashboard Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
}
async function getDashboardActions(req, res) {
  try {
    const actions = await DashboardAction.find({}); // remove role filtering
    res.status(200).json({
      success: true,
      data: actions,
    });
  } catch (error) {
    console.error("Get Dashboard Actions Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard actions",
      error: error.message,
    });
  }
}

module.exports = {getDashboardStats, getDashboardActions} ;





// const DashboardStats = require("../models/dashboardStatsSchema");
// const DashboardAction = require("../models/dashboardActionsSchema");
// const User = require("../models/userSchema");

// async function getDashboardStats(req, res) {
//   try {
//     const userRole = req.user?.role; // From JWT middleware
    
//     let stats = await DashboardStats.findOne().sort({ updatedAt: -1 });

//     if (!stats) {
//       // Calculate initial stats from existing data
//       const totalMembers = await User.countDocuments({ 
//         role: { $in: ['Member', 'ExecutiveMember', 'President', 'GeneralSecretary'] } 
//       });
//       const pendingApprovals = await User.countDocuments({ 
//         emailverified: false 
//       });
//       const activeMembers = await User.countDocuments({ 
//         isActive: true 
//       });

//       stats = await DashboardStats.create({
//         totalMembers,
//         activeMembers,
//         pendingApprovals,
//         totalApplications: pendingApprovals,
//         totalCommitteeMembers: await User.countDocuments({ 
//           role: { $ne: 'Member' } 
//         }),
//         // Add more calculated fields as needed
//       });
//     }

//     // Role-based data filtering
//     const filteredStats = filterStatsByRole(stats, userRole);

//     res.status(200).json({
//       success: true,
//       data: filteredStats,
//       lastUpdated: stats.updatedAt
//     });
//   } catch (error) {
//     console.error("Get Dashboard Stats Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch dashboard stats",
//       error: error.message,
//     });
//   }
// }

// async function getDashboardActions(req, res) {
//   try {
//     const userRole = req.user?.role;
    
//     const actions = await DashboardAction.find({ 
//       isActive: true,
//       $or: [
//         { rolesAllowed: { $in: [userRole] } },
//         { rolesAllowed: { $size: 0 } }
//       ]
//     }).sort({ priority: -1, category: 1 });

//     // Group by category for better organization
//     const groupedActions = actions.reduce((acc, action) => {
//       if (!acc[action.category]) {
//         acc[action.category] = [];
//       }
//       acc[action.category].push(action);
//       return acc;
//     }, {});

//     res.status(200).json({
//       success: true,
//       data: actions,
//       grouped: groupedActions,
//       userRole: userRole
//     });
//   } catch (error) {
//     console.error("Get Dashboard Actions Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch dashboard actions",
//       error: error.message,
//     });
//   }
// }

// // Helper function to filter stats based on user role
// function filterStatsByRole(stats, userRole) {
//   const baseStats = {
//     totalMembers: stats.totalMembers,
//     activeMembers: stats.activeMembers,
//     upcomingEvents: stats.upcomingEvents
//   };

//   const roleBasedStats = {
//     // Admin sees everything
//     Admin: stats.toObject(),
    
//     // Finance Secretary sees financial data
//     FinanceSecretary: {
//       ...baseStats,
//       totalIncome: stats.totalIncome,
//       currentMonthCollection: stats.currentMonthCollection,
//       pendingDues: stats.pendingDues,
//       collectionEfficiency: stats.collectionEfficiency
//     },
    
//     // General Secretary sees member and application data
//     GeneralSecretary: {
//       ...baseStats,
//       pendingApprovals: stats.pendingApprovals,
//       totalApplications: stats.totalApplications,
//       newMembersThisMonth: stats.newMembersThisMonth,
//       memberGrowthRate: stats.memberGrowthRate
//     },
    
//     // Regular members see limited info
//     Member: baseStats
//   };

//   return roleBasedStats[userRole] || baseStats;
// }

// module.exports = { getDashboardStats, getDashboardActions };



