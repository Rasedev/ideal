// models/messageSchema.js - Add broadcast field
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "call", "broadcast"],
      default: "text"
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date
    },
    isSending: {
      type: Boolean,
      default: false
    },
    isBroadcast: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("Message", messageSchema);



