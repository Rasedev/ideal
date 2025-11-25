// models/UserManagement.js
const mongoose = require('mongoose');

const userManagementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'active'
  },
  lastActive: Date,
  loginHistory: [{
    loginAt: Date,
    ipAddress: String,
    userAgent: String,
    location: String
  }],
  permissions: [{
    module: String,
    actions: [String] // ['read', 'write', 'delete', 'manage']
  }],
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('UserManagement', userManagementSchema);