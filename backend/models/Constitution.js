// models/Constitution.js
const mongoose = require("mongoose");

const constitutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  version: { type: String, required: true },
  content: { type: String, required: true },
  effectiveDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Draft", "Active", "Archived", "Under Review"],
    default: "Draft"
  },
  sections: [{
    title: String,
    content: String,
    sectionNumber: String,
    subSections: [{
      title: String,
      content: String,
      subSectionNumber: String
    }]
  }],
  amendments: [{
    amendmentNumber: String,
    description: String,
    effectiveDate: Date,
    changedSections: [String],
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date
  }],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approvalHistory: [{
    action: String,
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: String,
    timestamp: { type: Date, default: Date.now }
  }],
  attachments: [{
    name: String,
    url: String,
    fileType: String,
    uploadedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });
