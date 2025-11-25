// models/License.js
const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Business License", "Tax Certificate", "Permit", "Accreditation", "Insurance", "Other"],
    required: true
  },
  issuingAuthority: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Active", "Expired", "Pending Renewal", "Suspended", "Revoked"],
    default: "Active"
  },
  renewalReminder: {
    enabled: { type: Boolean, default: true },
    daysBefore: { type: Number, default: 30 }
  },
  documents: [{
    name: String,
    url: String,
    fileType: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  requirements: [{
    description: String,
    dueDate: Date,
    status: { type: String, enum: ["Pending", "Completed", "Overdue"] },
    completedAt: Date
  }],
  notes: String,
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  history: [{
    action: String,
    description: String,
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model("License", licenseSchema);