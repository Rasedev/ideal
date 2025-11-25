
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "PlotOwner", 
    required: true 
  },
  type: {
    type: String,
    enum: ["Construction", "Water", "Electricity", "Maintenance", "Transfer", "NewConnection", "Renovation"],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  plotNumber: {
    type: String,
    required: true
  },
  plotSize: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  status: { 
    type: String, 
    enum: ["Pending", "UnderReview", "Approved", "Rejected", "Completed"], 
    default: "Pending" 
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Medium"
  },
  receivedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }, // Office Secretary or Admin
  reviewedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  approvedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }, // For assigning to specific committee members
  documents: [{
    name: String,
    fileUrl: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  fees: {
    amount: {
      type: Number,
      default: 0
    },
    paid: {
      type: Boolean,
      default: false
    },
    paidAt: Date,
    transactionId: String
  },
  reviewComments: [{
    comment: String,
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    commentedAt: {
      type: Date,
      default: Date.now
    },
    internal: {
      type: Boolean,
      default: false
    } // Internal comments not visible to applicant
  }],
  estimatedCompletionDate: Date,
  actualCompletionDate: Date,
  meetingSchedule: {
    date: Date,
    time: String,
    location: String,
    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  // For construction applications
  constructionDetails: {
    buildingType: {
      type: String,
      enum: ["Residential", "Commercial", "Industrial", "Mixed", "Other"]
    },
    floors: Number,
    totalArea: String,
    estimatedCost: Number,
    architectName: String,
    contractorName: String
  },
  // For utility applications
  utilityDetails: {
    connectionType: String,
    loadRequired: String,
    existingConnection: Boolean,
    meterNumber: String
  },
  // For transfer applications
  transferDetails: {
    previousOwner: String,
    newOwner: String,
    transferReason: String,
    deedNumber: String,
    transferDate: Date
  },
  notifications: {
    applicantNotified: {
      type: Boolean,
      default: false
    },
    lastNotified: Date,
    notificationCount: {
      type: Number,
      default: 0
    }
  },
  timeline: [{
    action: String,
    description: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    performedAt: {
      type: Date,
      default: Date.now
    },
    previousStatus: String,
    newStatus: String
  }]
}, { 
  timestamps: true 
});

// Index for better query performance
applicationSchema.index({ applicant: 1, createdAt: -1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ type: 1 });
applicationSchema.index({ plotNumber: 1 });

// Pre-save middleware to add timeline entries
applicationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (!this.timeline) {
      this.timeline = [];
    }
    
    this.timeline.push({
      action: 'STATUS_CHANGE',
      description: `Status changed from ${this.previousStatus || 'N/A'} to ${this.status}`,
      performedBy: this.reviewedBy || this.receivedBy,
      previousStatus: this.previousStatus,
      newStatus: this.status
    });
  }
  
  // Store the previous status for the next save
  this.previousStatus = this.status;
  next();
});

// Static method to get application statistics
applicationSchema.statics.getApplicationStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  return stats;
};

// Instance method to add comment
applicationSchema.methods.addComment = function(comment, commentedBy, internal = false) {
  this.reviewComments.push({
    comment,
    commentedBy,
    internal,
    commentedAt: new Date()
  });
  
  return this.save();
};

// Instance method to update status with comment
applicationSchema.methods.updateStatus = function(newStatus, updatedBy, comment = null) {
  this.status = newStatus;
  this.reviewedBy = updatedBy;
  
  if (comment) {
    this.reviewComments.push({
      comment,
      commentedBy: updatedBy,
      commentedAt: new Date()
    });
  }
  
  return this.save();
};

// Virtual for application age in days
applicationSchema.virtual('ageInDays').get(function() {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffTime = Math.abs(now - created);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for isOverdue (applications pending for more than 30 days)
applicationSchema.virtual('isOverdue').get(function() {
  return this.status === 'Pending' && this.ageInDays > 30;
});

// Ensure virtual fields are serialized when converted to JSON
applicationSchema.set('toJSON', { virtuals: true });
applicationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Application", applicationSchema);