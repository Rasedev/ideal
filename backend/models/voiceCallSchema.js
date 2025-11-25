
const mongoose = require("mongoose");

const voiceCallSchema = new mongoose.Schema(
  {
    recipient: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      phoneNumber: {
        type: String,
        required: true
      },
      name: String
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    callType: {
      type: String,
      enum: ["outbound", "inbound", "conference", "broadcast"],
      default: "outbound"
    },
    status: {
      type: String,
      enum: ["initiated", "ringing", "answered", "completed", "failed", "busy", "no-answer"],
      default: "initiated"
    },
    duration: Number, // in seconds
    recordingUrl: String,
    cost: Number,
    initiatedAt: Date,
    answeredAt: Date,
    endedAt: Date,
    notes: String,
    gatewayResponse: mongoose.Schema.Types.Mixed
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("VoiceCall", voiceCallSchema);