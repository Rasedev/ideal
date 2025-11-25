

// models/activityLogSchema.js
const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    activityType: {
        type: String,
        enum: ["LOGIN", "LOGOUT", "USER_CREATED", "USER_UPDATED", "STATUS_CHANGE", "ROLE_CHANGE", "REPORT_GEN"],
        required: true,
    },
    ipAddress: {
        type: String,
        trim: true,
    },
    details: {
        type: String,
        default: 'No additional details.',
        maxlength: 500
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});

ActivityLogSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);








