const mongoose = require("mongoose");

const recentActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "LOGIN",
        "LOGOUT",
        "PROFILE_UPDATE",
        "ROLE_ASSIGN",
        "USER_CREATED",
        "USER_DELETED",
        "STATUS_UPDATE",
        "PHOTO_UPLOAD",
        "APPLICATION_APPROVED",
        "APPLICATION_REJECTED",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    ipAddress: String,
    deviceInfo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecentActivity", recentActivitySchema);
