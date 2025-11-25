// models/AidApplication.js
const mongoose = require("mongoose");

const aidApplicationSchema = new mongoose.Schema({
  applicant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  initiative: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "WelfareInitiative", 
    required: true 
  },
  category: {
    type: String,
    enum: ["Financial Aid", "Healthcare", "Education", "Emergency", "Elderly Care", "Children Welfare", "Disability Support"],
    required: true
  },
  reason: { type: String, required: true },
  amountRequested: { type: Number, required: true },
  urgency: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium"
  },
  status: {
    type: String,
    enum: ["Draft", "Submitted", "Under Review", "Approved", "Rejected", "Disbursed"],
    default: "Draft"
  },
  supportingDocuments: [{
    name: String,
    url: String,
    type: String
  }],
  reviewDetails: {
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    comments: String,
    approvedAmount: Number,
    disbursementDate: Date
  },
  familyDetails: {
    totalMembers: Number,
    dependents: Number,
    monthlyIncome: Number,
    expenses: Number
  },
  history: [{
    action: String,
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model("AidApplication", aidApplicationSchema);