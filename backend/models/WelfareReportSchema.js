// models/WelfareReport.js
const mongoose = require("mongoose");

const welfareReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  period: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  reportType: {
    type: String,
    enum: ["Monthly", "Quarterly", "Annual", "Initiative", "Impact"],
    required: true
  },
  initiativesCovered: [{
    initiative: { type: mongoose.Schema.Types.ObjectId, ref: "WelfareInitiative" },
    summary: String
  }],
   initiativesSummary: [{
      initiative: { type: mongoose.Schema.Types.ObjectId, ref: "WelfareInitiative" },
      budgetAllocated: Number,
      budgetUtilized: Number,
      beneficiariesServed: Number,
      successRate: Number
    }],
  financialSummary: {
    totalDonations: Number,
    totalDisbursed: Number,
    administrativeCosts: Number,
    balance: Number
  },
    applications: {
    total: Number,
    approved: Number,
    rejected: Number,
    pending: Number,
    approvalRate: Number
  },
  beneficiaryStats: {
    totalApplications: Number,
    approvedApplications: Number,
    uniqueBeneficiaries: Number,
    totalAmountDisbursed: Number,
    byCategory: Map,
    byDemographic: Map,
    averageSupport: Number
  },
  impactMetrics: {
    satisfactionScore: Number,
    communityImpact: Number,
    successStories: [String],
    challenges: [String]
  },
  achievements: [String],
  challenges: [String],
   recommendations: [{
     area: String,
     suggestion: String,
     priority: { type: String, enum: ["High", "Medium", "Low"] }
   }],
  generatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  isPublished: { type: Boolean, default: false },
  publishedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("WelfareReport", welfareReportSchema);