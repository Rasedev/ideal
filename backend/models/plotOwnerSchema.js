
const mongoose = require("mongoose");

const plotOwnerSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  plotNumber: { 
    type: String, 
    required: true,
    trim: true
  },
  plotSize: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  sector: {
    type: String,
    trim: true
  },
  block: {
    type: String,
    trim: true
  },
  road: {
    type: String,
    trim: true
  },
  plotType: {
    type: String,
    enum: ["Residential", "Commercial", "Industrial", "Agricultural", "Mixed"],
    default: "Residential"
  },
  ownershipType: {
    type: String,
    enum: ["Freehold", "Leasehold", "Joint", "Inherited"],
    default: "Freehold"
  },
  ownershipProof: {
    documentType: String,
    documentNumber: String,
    fileUrl: String,
    verified: {
      type: Boolean,
      default: false
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    verifiedAt: Date
  },
  purchaseDate: Date,
  registeredDate: {
    type: Date,
    default: Date.now
  },
  currentValue: Number,
  taxInformation: {
    taxNumber: String,
    lastPaid: Date,
    dueAmount: Number
  },
  applications: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Application" 
  }],
  status: {
    type: String,
    enum: ["Active", "Inactive", "UnderDispute", "Transferred"],
    default: "Active"
  },
  notes: {
    type: String,
    trim: true
  }
}, { 
  timestamps: true 
});

// Only define indexes for fields without unique constraints
// plotOwnerSchema.index({ user: 1 });
plotOwnerSchema.index({ plotNumber: 1 });
plotOwnerSchema.index({ location: 1 });
plotOwnerSchema.index({ status: 1 });

// Virtual for total applications count
plotOwnerSchema.virtual('totalApplications').get(function() {
  return this.applications ? this.applications.length : 0;
});

plotOwnerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("PlotOwner", plotOwnerSchema);