// models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  category: {
    type: String,
    enum: ["General", "Maintenance", "Security", "Administrative", "Events", "Facilities", "Other"],
    required: true
  },
  submittedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  status: {
    type: String,
    enum: ["Pending", "Under Review", "Approved", "Rejected", "Completed"],
    default: "Pending"
  },
  adminResponse: String,
  respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  respondedAt: Date,
  isAnonymous: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);