// models/MembershipReport.js
const mongoose = require("mongoose");

const membershipReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  period: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  reportType: {
    type: String,
    enum: ["Monthly", "Quarterly", "Annual", "Custom"],
    required: true
  },
  summary: {
    totalMembers: Number,
    newMembers: Number,
    activeMembers: Number,
    inactiveMembers: Number,
    membershipGrowth: Number
  },
  demographicData: {
    byRole: Map,
    byAgeGroup: Map,
    byJoinDate: Map,
    byLocation: Map
  },
  activityMetrics: {
    averageEngagement: Number,
    activeParticipants: Number,
    newRegistrations: Number,
    retentionRate: Number
  },
  trends: [{
    metric: String,
    currentValue: Number,
    previousValue: Number,
    change: Number,
    trend: { type: String, enum: ["up", "down", "stable"] }
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
  publishedAt: Date,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model("MembershipReport", membershipReportSchema);