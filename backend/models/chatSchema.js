

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }],
  isGroup: { type: Boolean, default: false },
  groupName: String,
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    messageType: { type: String, enum: ["text", "image", "file"] },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now }
  }],
  lastMessage: {
    content: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sentAt: { type: Date, default: Date.now }
  },
  unreadCount: {
    type: Map,
    of: Number,
    default: {}
  }

}, { timestamps: true });

// Index for better performance
chatSchema.index({ participants: 1 });
chatSchema.index({ updatedAt: -1 });



module.exports = mongoose.model("Chat", chatSchema);








