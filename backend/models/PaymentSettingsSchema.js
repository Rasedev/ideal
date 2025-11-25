
const mongoose = require('mongoose');

const PaymentSettingsSchema = new mongoose.Schema({
  monthlySubscriptionAmount: {
    type: Number,
    required: true,
    default: 500
  },
  dueDateDay: {
    type: Number, // 1-31
    required: true,
    default: 10
  },
  lateFee: {
    type: Number,
    default: 50
  },
  gracePeriod: {
    type: Number, // days
    default: 5
  },
  bankAccounts: [{
    bankName: String,
    accountNumber: String,
    accountHolder: String,
    branch: String,
    routingNumber: String,
    isActive: { type: Boolean, default: true }
  }],
  mobileBanking: [{
    provider: String, // bKash, Nagad, Rocket
    number: String,
    name: String,
    isActive: { type: Boolean, default: true }
  }],
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PaymentSettings', PaymentSettingsSchema);