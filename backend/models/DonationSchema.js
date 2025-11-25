// models/Donation.js
const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  initiative: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "WelfareInitiative" 
  },
  type: {
    type: String,
    enum: ["Cash", "Check", "Bank Transfer", "Online", "Goods", "Services"],
    required: true
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  description: String,
  status: {
    type: String,
    enum: ["Pending", "Received", "Cleared", "Returned", "Cancelled"],
    default: "Pending"
  },
  paymentDetails: {
    reference: String,
    method: String,
    transactionDate: Date,
    receiptUrl: String
  },
  anonymity: {
    isAnonymous: { type: Boolean, default: false },
    displayName: String
  },
  allocation: {
    initiativeAllocation: Number,
    generalFund: Number,
    specificUse: String
  },
  acknowledgment: {
    sent: { type: Boolean, default: false },
    sentAt: Date,
    method: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);