// const mongoose = require("mongoose");

// const dashboardActionsSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   icon: { type: String, required: true }, // e.g. 'FileTextOutlined'
//   path: { type: String, required: true },
//   rolesAllowed: [{ type: String, default: ["Admin", "Member"] }], // restrict per role
// });

// module.exports = mongoose.model("DashboardAction", dashboardActionsSchema);





const mongoose = require("mongoose");

const dashboardActionsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  icon: { 
    type: String, 
    required: true 
  },
  path: { 
    type: String, 
    required: true 
  },
  category: {
    type: String,
    enum: [
      'member-management',
      'financial',
      'events',
      'reports',
      'communications',
      'settings',
      'quick-access'
    ],
    default: 'quick-access'
  },
  rolesAllowed: [{ 
    type: String 
  }],
  permissionsRequired: [{ 
    type: String 
  }],
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  badgeCount: {
    type: Number,
    default: 0
  },
  colorScheme: {
    primary: { type: String, default: '#1890ff' },
    secondary: { type: String, default: '#f0f8ff' }
  },
  requiresConfirmation: {
    type: Boolean,
    default: false
  },
  confirmationMessage: String,
  analyticsEvent: String,
  // For role-based dynamic actions
  dynamicConditions: {
    minMembers: { type: Number, default: 0 },
    maxMembers: { type: Number, default: 10000 },
    financialThreshold: { type: Number, default: 0 }
  }
}, { 
  timestamps: true 
});

// Compound index for efficient role-based queries
dashboardActionsSchema.index({ 
  rolesAllowed: 1, 
  isActive: 1, 
  priority: -1 
});

dashboardActionsSchema.index({ 
  category: 1, 
  isActive: 1 
});

module.exports = mongoose.model("DashboardAction", dashboardActionsSchema);










