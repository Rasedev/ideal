// models/DuesSchema.js
const mongoose = require('mongoose');

const DuesSchema = new mongoose.Schema({
  // Member Information
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Dues Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueType: {
    type: String,
    enum: ['monthly_subscription', 'annual_fee', 'fine', 'donation', 'event_fee', 'maintenance', 'other'],
    required: true
  },
  
  // Payment Period
  dueDate: {
    type: Date,
    required: true
  },
  gracePeriod: {
    type: Number, // days
    default: 7
  },
  
  // Status & Tracking
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'cancelled', 'partially_paid'],
    default: 'pending'
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  remainingAmount: {
    type: Number
  },
  
  // Payment Details (when paid)
  paidAt: Date,
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'bkash', 'nagad', 'rocket', 'cash', 'online']
  },
  transactionId: String,
  
  // Reminder System
  reminderCount: {
    type: Number,
    default: 0
  },
  lastReminderSent: Date,
  nextReminderDate: Date,
  
  // Late Fees & Penalties
  lateFee: {
    type: Number,
    default: 0
  },
  totalAmountWithPenalty: {
    type: Number
  },
  
  // Verification
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  
  // Notes & Metadata
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Auto-calculate remaining amount
}, {
  timestamps: true
});

// Calculate remaining amount before save
DuesSchema.pre('save', function(next) {
  this.remainingAmount = this.amount - this.paidAmount;
  this.totalAmountWithPenalty = this.amount + this.lateFee;
  next();
});

// Indexes for performance
DuesSchema.index({ member: 1, dueDate: -1 });
DuesSchema.index({ status: 1 });
DuesSchema.index({ dueType: 1 });
DuesSchema.index({ dueDate: 1 });
DuesSchema.index({ member: 1, status: 1 });

// Virtual for overdue status
DuesSchema.virtual('isOverdue').get(function() {
  return this.status === 'pending' && new Date() > this.dueDate;
});

// Virtual for days overdue
DuesSchema.virtual('daysOverdue').get(function() {
  if (this.status !== 'pending' || new Date() <= this.dueDate) return 0;
  return Math.floor((new Date() - this.dueDate) / (1000 * 60 * 60 * 24));
});

// Static method to get overdue dues
DuesSchema.statics.getOverdueDues = function() {
  return this.find({
    status: 'pending',
    dueDate: { $lt: new Date() }
  }).populate('member', 'firstName lastName email phone membershipId');
};

module.exports = mongoose.model('Dues', DuesSchema);