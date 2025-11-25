// models/Discussion.js
const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  category: {
    type: String,
    enum: ["General", "Maintenance", "Events", "Complaints", "Suggestions", "Security"],
    default: "General"
  },
  tags: [String],
  isPinned: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  replies: [{
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isSolution: { type: Boolean, default: false },
    parentReply: { type: mongoose.Schema.Types.ObjectId, ref: "Reply" }
  }, { timestamps: true }]
}, { timestamps: true });

module.exports = mongoose.model("Discussion", discussionSchema);