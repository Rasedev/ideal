// const mongoose = require("mongoose");

// const dashboardStatsSchema = new mongoose.Schema(
//   {
//     totalMembers: { type: Number, default: 0 },
//     pendingApprovals: { type: Number, default: 0 },
//     totalApplications: { type: Number, default: 0 },
//     totalIncome: { type: Number, default: 0 },
//     monthlySubscriptionAmount: { type: Number, default: 0 },
//     lastUpdated: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("DashboardStats", dashboardStatsSchema);






const mongoose = require("mongoose");

const dashboardStatsSchema = new mongoose.Schema(
  {
    // Member Statistics
    totalMembers: { type: Number, default: 0 },
    activeMembers: { type: Number, default: 0 },
    newMembersThisMonth: { type: Number, default: 0 },
    pendingApprovals: { type: Number, default: 0 },
    suspendedMembers: { type: Number, default: 0 },
    
    // Financial Statistics
    totalIncome: { type: Number, default: 0 },
    monthlySubscriptionAmount: { type: Number, default: 0 },
    currentMonthCollection: { type: Number, default: 0 },
    pendingDues: { type: Number, default: 0 },
    totalExpenses: { type: Number, default: 0 },
    netBalance: { type: Number, default: 0 },
    
    // Application & Request Statistics
    totalApplications: { type: Number, default: 0 },
    pendingApplications: { type: Number, default: 0 },
    approvedApplications: { type: Number, default: 0 },
    rejectedApplications: { type: Number, default: 0 },
    
    // Event & Activity Statistics
    upcomingEvents: { type: Number, default: 0 },
    totalEventsThisMonth: { type: Number, default: 0 },
    activeProjects: { type: Number, default: 0 },
    
    // Committee & Leadership
    totalCommitteeMembers: { type: Number, default: 0 },
    executiveMembers: { type: Number, default: 0 },
    
    // System Statistics
    totalUsers: { type: Number, default: 0 },
    onlineUsers: { type: Number, default: 0 },
    
    // Performance Metrics
    memberGrowthRate: { type: Number, default: 0 }, // Percentage
    collectionEfficiency: { type: Number, default: 0 }, // Percentage
    averageProcessingTime: { type: Number, default: 0 }, // Days
    
    // Timestamps
    lastUpdated: { type: Date, default: Date.now },
    dataAsOf: { type: Date, default: Date.now },
    
    // Metadata
    isAutoUpdated: { type: Boolean, default: true },
    updateFrequency: { type: String, enum: ['realtime', 'hourly', 'daily'], default: 'daily' }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for financial health score
dashboardStatsSchema.virtual('financialHealthScore').get(function() {
  const collectionRate = this.currentMonthCollection / this.monthlySubscriptionAmount;
  const debtRatio = this.pendingDues / this.totalIncome;
  
  let score = 80; // Base score
  
  // Adjust based on collection rate
  if (collectionRate >= 0.9) score += 15;
  else if (collectionRate >= 0.7) score += 5;
  else if (collectionRate < 0.5) score -= 20;
  
  // Adjust based on debt ratio
  if (debtRatio > 0.3) score -= 15;
  if (debtRatio > 0.5) score -= 25;
  
  return Math.max(0, Math.min(100, score));
});

// Index for efficient queries
dashboardStatsSchema.index({ lastUpdated: -1 });
dashboardStatsSchema.index({ isAutoUpdated: 1 });

module.exports = mongoose.model("DashboardStats", dashboardStatsSchema);






