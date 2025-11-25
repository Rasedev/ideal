// const mongoose = require('mongoose');

// const MemberProfileSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   fatherName: String,
//   birthDate: Date,
//   nationality: String,
//   occupation: String,
//   permanentAddress: String,
//   presentAddress: String,
//   phone: String,
//   // membership registration form fields (from your uploaded image)
//   photo: String, // uploaded photo url
//   documents: [{ filename: String, url: String }],
// }, { timestamps: true });

// module.exports = mongoose.model('MemberProfile', MemberProfileSchema);


const mongoose = require('mongoose');

const MemberProfileSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  // Personal Information
  fatherName: { type: String, trim: true },
  motherName: { type: String, trim: true },
  birthDate: Date,
  nationality: { type: String, default: 'Bangladeshi' },
  occupation: { type: String, trim: true },
  company: { type: String, trim: true },
  designation: { type: String, trim: true },
  
  // Address Information
  permanentAddress: { type: String, trim: true },
  presentAddress: { type: String, trim: true },
  emergencyContact: {
    name: { type: String, trim: true },
    relationship: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true }
  },
  
  // Contact Information
  phone: { type: String, trim: true },
  alternatePhone: { type: String, trim: true },
  
  // Membership Details
  membershipType: {
    type: String,
    enum: ['General', 'Life', 'Honorary', 'Associate'],
    default: 'General'
  },
  membershipDate: { type: Date, default: Date.now },
  membershipStatus: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended', 'Terminated'],
    default: 'Active'
  },
  
  // Plot Information (for plot owners)
  plotInfo: {
    plotNumber: { type: String, trim: true },
    plotSize: { type: String, trim: true },
    location: { type: String, trim: true },
    sector: { type: String, trim: true },
    block: { type: String, trim: true }
  },
  
  // Documents
  photo: { type: String }, // uploaded photo url
  nidCopy: { type: String },
  documents: [{
    type: { type: String, trim: true },
    filename: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  
  // Payment Preferences
  preferredPaymentMethod: {
    type: String,
    enum: ["Bank", "bKash", "Nagad", "Rocket", "Cash"],
    default: "bKash"
  },
  bankAccount: {
    bankName: String,
    accountNumber: String,
    accountHolder: String,
    branch: String
  },
  mobileBanking: {
    bKash: String,
    nagad: String,
    rocket: String
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('MemberProfile', MemberProfileSchema);
