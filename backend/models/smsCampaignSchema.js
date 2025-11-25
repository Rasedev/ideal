// models/smsCampaignSchema.js
const mongoose = require("mongoose");

const smsCampaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    recipientType: {
      type: String,
      enum: ["specific", "role", "all", "custom"],
      required: true
    },
    recipients: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      phoneNumber: String,
      name: String,
      status: {
        type: String,
        enum: ["pending", "sent", "delivered", "failed"],
        default: "pending"
      },
      cost: Number,
      messageId: String,
      deliveredAt: Date,
      error: String
    }],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "sending", "completed", "cancelled"],
      default: "draft"
    },
    scheduledAt: Date,
    sentAt: Date,
    completedAt: Date,
    totalRecipients: Number,
    successfulSends: { type: Number, default: 0 },
    failedSends: { type: Number, default: 0 },
    totalCost: { type: Number, default: 0 },
    gateway: {
      name: String,
      response: mongoose.Schema.Types.Mixed
    },
    urgency: {
      type: String,
      enum: ["low", "normal", "high", "critical"],
      default: "normal"
    }
  },
  {
    timestamps: true
  }
);

// Indexes
smsCampaignSchema.index({ sender: 1, createdAt: -1 });
smsCampaignSchema.index({ status: 1 });
smsCampaignSchema.index({ scheduledAt: 1 });
smsCampaignSchema.index({ urgency: 1 });

// module.exports = mongoose.model("SmsCampaign", smsCampaignSchema);

const SmsCampaign = mongoose.models.SmsCampaign || mongoose.model('SmsCampaign', smsCampaignSchema);

module.exports = SmsCampaign;

