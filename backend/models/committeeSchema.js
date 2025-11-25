// models/committeeSchema.js
const mongoose = require("mongoose");

const committeeTermSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  isCurrent: {
    type: Boolean,
    default: true
  }
});

const committeeMemberSchema = new mongoose.Schema({
  // Reference to User or Employee
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'memberModel'
  },
  memberModel: {
    type: String,
    required: true,
    enum: ['User', 'Employee']
  },
  
  // Committee Role Information
  committeeRole: {
    type: String,
    required: true,
    enum: [
      'President',
      'ExecutivePresident', 
      'VicePresident',
      'GeneralSecretary',
      'JointGeneralSecretary',
      'OrganizingSecretary',
      'FinanceSecretary',
      'PublicityAndPublicationSecretary',
      'OfficeSecretary',
      'SocialWelfareAffairsSecretary',
      'LegalAffairsSecretary',
      'ReligiousAffairsSecretary',
      'PriyaAndCulturalAffairsSecretary',
      'WomensAffairsSecretary',
      'EnvironmentalAffairsSecretary',
      'ExecutiveWorkingMember'
    ]
  },
  
  // Term Information
  term: committeeTermSchema,
  
  // Committee Details
  responsibilities: {
    type: String,
    trim: true
  },
  committeeStatus: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'completed'],
    default: 'active'
  },
  
  // Voting Information
  votingRights: {
    type: Boolean,
    default: true
  },
  canChairMeetings: {
    type: Boolean,
    default: false
  },
  
  // Audit Fields
  appointedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentDate: {
    type: Date,
    default: Date.now
  },
  
  // Metadata
  priority: {
    type: Number,
    default: 0 // For ordering in lists
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
committeeMemberSchema.index({ memberId: 1, memberModel: 1 });
committeeMemberSchema.index({ committeeRole: 1 });
committeeMemberSchema.index({ 'term.isCurrent': 1 });
committeeMemberSchema.index({ committeeStatus: 1 });
committeeMemberSchema.index({ createdAt: -1 });

// Virtual for full name
committeeMemberSchema.virtual('memberInfo', {
  ref: function() {
    return this.memberModel;
  },
  localField: 'memberId',
  foreignField: '_id',
  justOne: true
});

// Method to check if term is active
committeeMemberSchema.methods.isTermActive = function() {
  const now = new Date();
  return this.term.startDate <= now && 
         (!this.term.endDate || this.term.endDate >= now);
};

// Static method to get current committee
committeeMemberSchema.statics.getCurrentCommittee = function() {
  return this.find({
    committeeStatus: 'active',
    'term.isCurrent': true
  }).populate('memberInfo');
};

// Pre-save middleware to update term status
committeeMemberSchema.pre('save', function(next) {
  const now = new Date();
  this.term.isCurrent = this.term.startDate <= now && 
                       (!this.term.endDate || this.term.endDate >= now);
  next();
});

module.exports = mongoose.model("CommitteeMember", committeeMemberSchema);