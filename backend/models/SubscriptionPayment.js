// models/SubscriptionPayment.js
const mongoose = require('mongoose');

const SubscriptionPaymentSchema = new mongoose.Schema({
  // Member Information (ALL users including admin, hr, etc.)
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Payment Period
  paymentMonth: {
    type: String, // Format: "January-2024"
    required: true
  },
  paymentYear: {
    type: Number,
    required: true
  },
  
  // Payment Details
  amount: {
    type: Number,
    required: true,
    default: 500 // Default monthly amount for ALL members
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  
  // Payment Method & Details
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'bkash', 'nagad', 'rocket', 'cash'],
    required: true
  },
  
  // Transaction Details
  transactionId: {
    type: String,
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  
  // Bank Transfer Details
  bankName: String,
  accountNumber: String,
  branchName: String,
  
  // Mobile Banking Details
  senderPhone: String,
  receiverPhone: String,
  
  // Verification
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  rejectionReason: String,
  
  // Proof Document
  paymentProof: {
    filename: String,
    originalName: String,
    url: String,
    uploadedAt: Date
  },
  
  // Auto-generated fields
  dueDate: {
    type: Date,
    default: function() {
      // Set due date to 10th of the payment month
      const [month, year] = this.paymentMonth.split('-');
      const monthIndex = new Date(Date.parse(month + " 1, 2012")).getMonth();
      return new Date(this.paymentYear, monthIndex, 10);
    }
  },
  
  // Timestamps
  paidAt: Date
}, {
  timestamps: true
});

// Prevent duplicate payments for same member and month
SubscriptionPaymentSchema.index({ member: 1, paymentMonth: 1, paymentYear: 1 }, { unique: true });

// Index for performance
SubscriptionPaymentSchema.index({ status: 1 });
SubscriptionPaymentSchema.index({ paymentMethod: 1 });
SubscriptionPaymentSchema.index({ paymentYear: 1 });

// Virtual for overdue status
SubscriptionPaymentSchema.virtual('isOverdue').get(function() {
  return this.status === 'pending' && new Date() > this.dueDate;
});

module.exports = mongoose.model('SubscriptionPayment', SubscriptionPaymentSchema);