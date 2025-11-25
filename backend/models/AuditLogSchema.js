// // models/AuditLog.js
// const mongoose = require("mongoose");

// const auditLogSchema = new mongoose.Schema({
//   action: {
//     type: String,
//     required: true,
//     enum: [
//       'LOGIN',
//       'LOGOUT',
//       'CREATE_USER',
//       'UPDATE_USER',
//       'DELETE_USER',
//       'VIEW_USERS',
//       'CHANGE_ROLE',
//       'SYSTEM_ACTION'
//     ]
//   },
//   performedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   targetUser: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   description: String,
//   ipAddress: String,
//   userAgent: String,
//   changes: mongoose.Schema.Types.Mixed,
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

// // Index for better query performance
// auditLogSchema.index({ timestamp: -1 });
// auditLogSchema.index({ performedBy: 1, timestamp: -1 });
// auditLogSchema.index({ action: 1, timestamp: -1 });

// module.exports = mongoose.model("AuditLog", auditLogSchema);





// models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  module: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userRole: String,
  ipAddress: String,
  userAgent: String,
  oldData: mongoose.Schema.Types.Mixed,
  newData: mongoose.Schema.Types.Mixed,
  resourceId: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success'
  },
  errorMessage: String
});

// Index for better query performance
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ module: 1, timestamp: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);





