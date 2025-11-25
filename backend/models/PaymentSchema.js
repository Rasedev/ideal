


const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  // Basic Payment Information
  member: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  subscription: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subscription' 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    default: 'BDT' 
  },
  paymentType: {
    type: String,
    enum: ['subscription', 'due', 'fine', 'donation', 'other'],
    required: true
  },
  transactionId: { 
  type: String, 
  unique: true,
  sparse: true
},

  // Payment Method Details
  paymentMethod: {
    type: String,
    enum: ['Bank', 'bKash', 'Nagad', 'Rocket', 'Cash', 'Card', 'Online'],
    required: true
  },
  
  // Bank Transfer Details
  bankDetails: {
    bankName: String,
    accountNumber: String,
    accountHolder: String,
    branch: String,
    transactionDate: Date,
    slipNumber: String,
    routingNumber: String
  },
  
  // Mobile Banking Details
  mobileBankingDetails: {
    provider: String,
    senderNumber: String,
    transactionId: String,
    reference: String,
    senderName: String
  },
  
  // Cash Payment Details
  cashDetails: {
    receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiptNumber: String,
    receivedAt: Date,
    location: String
  },
  
  // Card/Online Payment Details
  cardDetails: {
    cardType: String,
    lastFour: String,
    transactionId: String,
    authorizationCode: String,
    gateway: String
  },
  
  // Payment Status and Tracking
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  transactionId: { 
    type: String, 
    unique: true,
    sparse: true
  },
  externalTransactionId: String,
  
  // Timestamps
  paidAt: Date,
  processedAt: Date,
  failedAt: Date,
  refundedAt: Date,
  
  // Verification and Approval
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: Date,
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: Date,
  
  // Additional Information
  description: String,
  notes: String,
  metadata: mongoose.Schema.Types.Mixed,
  
  // File Attachments
  attachments: [{
    filename: String,
    originalName: String,
    url: String,
    fileType: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  
  // Audit Trail
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { 
  timestamps: true 
});

// Indexes for better performance
PaymentSchema.index({ member: 1, createdAt: -1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ paymentMethod: 1 });
PaymentSchema.index({ paymentType: 1 });
// PaymentSchema.index({ createdAt: -1 });

// Virtual for payment age in days
PaymentSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for isOverdue (payments pending for more than 3 days)
PaymentSchema.virtual('isOverdue').get(function() {
  return this.status === 'pending' && this.ageInDays > 3;
});

// Static method to get payment statistics
PaymentSchema.statics.getPaymentStats = async function(timeframe = 'month') {
  const now = new Date();
  let startDate;
  
  switch(timeframe) {
    case 'day':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  const stats = await this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' }
      }
    }
  ]);
  
  return stats;
};

// Instance method to update payment status
PaymentSchema.methods.updateStatus = function(newStatus, updatedBy, notes = '') {
  this.status = newStatus;
  this.updatedBy = updatedBy;
  
  // Set appropriate timestamp
  const now = new Date();
  switch(newStatus) {
    case 'completed':
      this.paidAt = this.paidAt || now;
      break;
    case 'failed':
      this.failedAt = now;
      break;
    case 'refunded':
      this.refundedAt = now;
      break;
  }
  
  if (notes) {
    this.notes = this.notes ? `${this.notes}\n${notes}` : notes;
  }
  
  return this.save();
};

// Pre-save middleware to generate transaction ID if not provided
PaymentSchema.pre('save', function(next) {
  if (!this.transactionId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.transactionId = `TXN${timestamp}${random}`.toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Payment', PaymentSchema);



// const mongoose = require('mongoose');

// const SubscriptionPaymentSchema = new mongoose.Schema({
//   // Member Information
//   member: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  
//   // Payment Period
//   paymentMonth: {
//     type: String, // Format: "January-2024"
//     required: true
//   },
//   paymentYear: {
//     type: Number,
//     required: true
//   },
  
//   // Payment Details
//   amount: {
//     type: Number,
//     required: true,
//     default: 500
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'paid', 'verified', 'rejected', 'overdue'],
//     default: 'pending'
//   },
  
//   // Payment Method & Details
//   paymentMethod: {
//     type: String,
//     enum: ['bank_transfer', 'bkash', 'nagad', 'rocket', 'cash'],
//     required: true
//   },
  
//   // Transaction Details
//   transactionId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   transactionDate: {
//     type: Date,
//     required: true
//   },
  
//   // Bank Transfer Details
//   bankName: String,
//   accountNumber: String,
//   branchName: String,
  
//   // Mobile Banking Details
//   senderPhone: String,
//   receiverPhone: String,
  
//   // Verification
//   verifiedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   verifiedAt: Date,
//   rejectionReason: String,
  
//   // Proof Document
//   paymentProof: {
//     filename: String,
//     originalName: String,
//     url: String,
//     uploadedAt: Date
//   },
  
//   // Timestamps
//   paidAt: Date,
//   dueDate: Date
// }, {
//   timestamps: true
// });

// // Indexes for performance
// SubscriptionPaymentSchema.index({ member: 1, paymentMonth: 1, paymentYear: 1 });
// SubscriptionPaymentSchema.index({ status: 1 });
// SubscriptionPaymentSchema.index({ transactionId: 1 });

// module.exports = mongoose.model('SubscriptionPayment', SubscriptionPaymentSchema);