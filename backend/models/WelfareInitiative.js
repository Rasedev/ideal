// models/WelfareInitiative.js
const mongoose = require("mongoose");

const welfareInitiativeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Financial Aid", "Healthcare", "Education", "Emergency", "Elderly Care", "Children Welfare", "Disability Support"],
    required: true
  },
  status: {
    type: String,
    enum: ["Planning", "Active", "Paused", "Completed", "Cancelled"],
    default: "Planning"
  },
  startDate: { type: Date, required: true },
  endDate: Date,
  budget: {
    allocated: { type: Number, default: 0 },
    utilized: { type: Number, default: 0 }
  },
  eligibilityCriteria: {
    minAge: Number,
    maxAge: Number,
    memberType: [{
      type: String,
      enum: ["All", "PlotOwners", "Employees", "Committee", "Specific"]
    }],
    incomeLimit: Number,
    specialConditions: String
  },
  benefits: [{
    type: { type: String, required: true },
    amount: Number,
    description: String
  }],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  coordinators: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: String
  }],
  documents: [{
    name: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  metrics: {
    targetBeneficiaries: Number,
    actualBeneficiaries: { type: Number, default: 0 },
    successRate: Number
  }
}, { timestamps: true });

module.exports = mongoose.model("WelfareInitiative", welfareInitiativeSchema);