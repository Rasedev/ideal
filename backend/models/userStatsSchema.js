const mongoose = require("mongoose");

const userStatsSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true // ✅ keeps uniqueness constraint (no duplicate stats per user)
  },
  profileComplete: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 100 
  },
  accountAge: { 
    type: Number, 
    default: 0
  },
  loginStreak: { 
    type: Number, 
    default: 0 
  },
  thisMonthLogins: { 
    type: Number, 
    default: 0 
  },
  totalLogins: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  activityScore: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

// ✅ Define a single explicit index (optional but helps performance)
userStatsSchema.index({ user: 1 });

// ✅ Prevent model overwrite errors in dev (nodemon reloads)
module.exports = mongoose.models.UserStats || mongoose.model("UserStats", userStatsSchema);
