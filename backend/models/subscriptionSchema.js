


// const mongoose = require("mongoose");

// const subscriptionSchema = new mongoose.Schema({
//   member: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User", 
//     required: true 
//   },
//   amount: { 
//     type: Number, 
//     required: true 
//   },
//   currency: { 
//     type: String, 
//     default: 'BDT' 
//   },
//   period: { 
//     type: String, 
//     enum: ['monthly','quarterly','yearly'], 
//     default: 'monthly' 
//   },
//   month: { 
//     type: String, 
//     required: true 
//   },
//   year: {
//     type: String,
//     required: true
//   },
//   paymentMethod: {
//     type: String,
//     enum: ["Bank", "bKash", "Nagad", "Rocket", "Cash", "Manual"],
//     required: true
//   },
//   bankDetails: {
//     bankName: String,
//     accountNumber: String,
//     branch: String,
//     transactionDate: Date,
//     slipNumber: String
//   },
//   mobileBankingDetails: {
//     provider: String,
//     senderNumber: String,
//     transactionId: String,
//     reference: String
//   },
//   cashDetails: {
//     receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     receiptNumber: String,
//     receivedAt: Date
//   },
//   transactionId: { 
//     type: String, 
//     required: true,
//     unique: true 
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed", "Verified", "UnderReview"],
//     default: "Pending"
//   },
//   paidAt: Date,
//   verifiedBy: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User" 
//   },
//   verifiedAt: Date,
//   proofDocument: {
//     filename: String,
//     url: String,
//     uploadedAt: Date
//   },
//   notes: String,
//   autoVerified: {
//     type: Boolean,
//     default: false
//   }
// }, { 
//   timestamps: true 
// });

// // ✅ ONLY THESE INDEXES - No duplicates
// subscriptionSchema.index({ status: 1 });
// subscriptionSchema.index({ paymentMethod: 1 });
// subscriptionSchema.index({ createdAt: -1 });
// subscriptionSchema.index({ member: 1, createdAt: -1 }); // For member payment history

// // ✅ Single unique compound index - prevents duplicate subscriptions
// subscriptionSchema.index({ 
//   member: 1, 
//   month: 1, 
//   year: 1 
// }, { 
//   unique: true,
//   name: "unique_member_month_year" 
// });

// module.exports = mongoose.model("Subscription", subscriptionSchema);







const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: String,
    required: true, // Format: "2024-01"
    match: [/^\d{4}-\d{2}$/, 'Please use YYYY-MM format']
  },
  year: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 500 // Default monthly subscription amount
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'verified', 'overdue', 'cancelled'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: true
  },
  paidAt: Date,
  
  // Payment Method Details
  paymentMethod: {
    type: String,
    enum: ['bank', 'bkash', 'nagad', 'rocket', 'cash', 'card'],
    required: function() { return this.status === 'paid'; }
  },
  
  // Bank Transfer Details
  bankDetails: {
    bankName: String,
    accountNumber: String,
    transactionId: String,
    branch: String,
    slipNumber: String,
    transactionDate: Date
  },
  
  // Mobile Banking Details
  mobileBankingDetails: {
    provider: String,
    senderNumber: String,
    transactionId: String,
    reference: String
  },
  
  // Verification Details
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  
  // File attachments
  proofDocument: {
    filename: String,
    url: String,
    uploadedAt: Date
  },
  
  notes: String,
  reminderCount: {
    type: Number,
    default: 0
  },
  lastReminder: Date
}, {
  timestamps: true
});

// Compound index to prevent duplicate subscriptions
SubscriptionSchema.index({ member: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);





