// models/Poll.js
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{
    question: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["single", "multiple", "text"],
      default: "single" 
    },
    options: [{
      text: String,
      votes: { type: Number, default: 0 }
    }]
  }],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  recipientType: {
    type: String,
    enum: ["All", "Members", "PlotOwners", "Employees", "Committee", "Specific"],
    required: true
  },
  specificRecipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  isActive: { type: Boolean, default: true },
  resultsVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Poll", pollSchema);