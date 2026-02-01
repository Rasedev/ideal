

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, required: true, trim: true },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     trim: true,
//     lowercase: true 
//   },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: [
//       "President", "ExecutivePresident", "VicePresident", 
//       "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
//       "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
//       "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
//       "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
//       "ExecutiveMember", "Member", "PlotOwner", "Employee", "Admin", "HR"
//     ],
//     default: "Member"
//   },
//   phone: { type: String, trim: true },
//   address: { type: String, trim: true },
//   nidNumber: { type: String, trim: true },
//   birthplace: { type: String },
//   fatherName: { type: String },
//   motherName: { type: String },
//   dob: { type: Date },
//   city: String,
//   postCode: String,
//   lastLogin: Date,
//   image: { type: String },
//   token: { type: String },
//   status: {
//       type: String,
//       enum: ["waiting", "approved", "rejected"],
//       default: "waiting",
//     },
//   division: {
//       type: String,
//     },
//     district: String,
//   profilePhoto: String,
//   isActive: { type: Boolean, default: true },
//   dateJoined: { type: Date, default: Date.now },
//   emailverified: {
//   type: Boolean,
//   default: false
// },
// // resetPasswordToken: String,
//   resetPasswordExpires: Date,
//   membershipId: { 
//     type: String, 
//     unique: true,
//     sparse: true, // This allows multiple null values
//     trim: true 
//   },
//   committeePosition: String
// }, { 
//   timestamps: true 
// });

// // Compound indexes only
// userSchema.index({ role: 1, isActive: 1 });
// userSchema.index({ createdAt: -1 });

// // Auto-generate committeePosition and membershipId
// userSchema.pre('save', function(next) {
//   // Generate committee position
//   if (this.role && !this.committeePosition) {
//     const positionMap = {
//       'President': 'President',
//       'ExecutivePresident': 'Executive President', 
//       'VicePresident': 'Vice President',
//       'GeneralSecretary': 'General Secretary',
//       'JointSecretary': 'Joint General Secretary',
//       'OrganizingSecretary': 'Organizing Secretary',
//       'FinanceSecretary': 'Finance Secretary',
//       'PublicitySecretary': 'Publicity and Publication Secretary',
//       'OfficeSecretary': 'Office Secretary',
//       'SocialWelfareSecretary': 'Social Welfare Affairs Secretary',
//       'LegalSecretary': 'Legal Affairs Secretary',
//       'ReligiousSecretary': 'Religious Affairs Secretary',
//       'CulturalSecretary': 'Cultural Affairs Secretary',
//       'WomenAffairsSecretary': "Women's Affairs Secretary",
//       'EnvironmentalSecretary': 'Environmental Affairs Secretary',
//       'ExecutiveMember': 'Executive/Working Member'
//     };
    
//     this.committeePosition = positionMap[this.role] || this.role;
//   }

//   // Generate membership ID if not provided
//   if (!this.membershipId) {
//     const prefix = this.role === 'PlotOwner' ? 'PLOT' : 
//                   this.role === 'Employee' ? 'EMP' : 'MEM';
//     this.membershipId = `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
//   }

//   next();
// });

// module.exports = mongoose.model("User", userSchema);




///////////////////////// prev version//////////////////////////


// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// // Permission matrix for RBAC
// const permissionsSchema = new Schema({
//   canManageUsers: { type: Boolean, default: false },
//   canSendMessages: { type: Boolean, default: false },
//   canMakeCalls: { type: Boolean, default: false },
//   canManageContacts: { type: Boolean, default: false },
//   canViewReports: { type: Boolean, default: false },
//   canManageSettings: { type: Boolean, default: false }
// }, { _id: false });

// // Contact preferences schema
// const contactPreferencesSchema = new Schema({
//   smsEnabled: { type: Boolean, default: true },
//   callEnabled: { type: Boolean, default: true },
//   emailEnabled: { type: Boolean, default: true },
//   preferredContactMethod: { 
//     type: String, 
//     enum: ["sms", "call", "email", "whatsapp"],
//     default: "sms"
//   },
//   officeHoursOnly: { type: Boolean, default: true },
//   emergencyContact: { type: Boolean, default: false }
// }, { _id: false });

// // Phone number schema with validation
// const phoneSchema = new Schema({
//   number: { 
//     type: String, 
//     required: true,
//     validate: {
//       validator: function(v) {
//         return /^\+?[\d\s\-\(\)]{10,}$/.test(v);
//       },
//       message: 'Invalid phone number format'
//     }
//   },
//   type: {
//     type: String,
//     enum: ["mobile", "home", "work", "emergency", "other"],
//     default: "mobile"
//   },
//   isPrimary: { type: Boolean, default: false },
//   countryCode: { type: String, default: "+1" },
//   verified: { type: Boolean, default: false },
//   verifiedAt: Date
// }, { _id: false });

// const userSchema = new Schema({
//   // Basic Info
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, required: true, trim: true },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
//   },
  
//   // Authentication
//   password: { type: String, required: true },
  
//   // RBAC System
//   role: {
//     type: String,
//     enum: [
//       "SuperAdmin", "Admin", "HR", "Manager", 
//       "President", "VicePresident", "Secretary", "Treasurer",
//       "ExecutiveMember", "Member", "PlotOwner", "employee"
//     ],
//     default: "Member"
//   },
//   permissions: permissionsSchema,
  
//   // Contact Information
//   phones: [phoneSchema],
//   contactPreferences: contactPreferencesSchema,
  
//   // Profile Information
//   profilePhoto: String,
//   dateOfBirth: Date,
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     country: { type: String, default: "Bangladesh" },
//     postalCode: String
//   },
  
//   // Membership
//   membershipId: { 
//     type: String, 
//     unique: true,
//     sparse: true,
//     trim: true 
//   },
//   membershipStatus: {
//     type: String,
//     enum: ["active", "inactive", "suspended", "pending"],
//     default: "pending"
//   },
//   // Approval tracking
//   approvedAt: Date,
//   approvedBy: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User" 
//   },
//   rejectedAt: Date,
//   rejectedBy: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User" 
//   },
//   rejectionReason: String,
  
//   // System
//   isActive: { type: Boolean, default: true },
//   lastLogin: Date,
//   emailVerified: { type: Boolean, default: false },
//   phoneVerified: { type: Boolean, default: false },
  
//   // Timestamps
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// }, { 
//   timestamps: true 
// });

// // Indexes for performance
// userSchema.index({ role: 1, isActive: 1 });
// userSchema.index({ "phones.number": 1 });
// userSchema.index({ membershipStatus: 1 });
// userSchema.index({ email: 1 });
// userSchema.index({ createdAt: -1 });

// // Pre-save middleware to set permissions based on role
// userSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
  
//   // Set permissions based on role
//   const rolePermissions = {
//     SuperAdmin: {
//       canManageUsers: true,
//       canSendMessages: true,
//       canMakeCalls: true,
//       canManageContacts: true,
//       canViewReports: true,
//       canManageSettings: true
//     },
//     Admin: {
//       canManageUsers: true,
//       canSendMessages: true,
//       canMakeCalls: true,
//       canManageContacts: true,
//       canViewReports: true,
//       canManageSettings: false
//     },
//     HR: {
//       canManageUsers: true,
//       canSendMessages: true,
//       canMakeCalls: true,
//       canManageContacts: true,
//       canViewReports: true,
//       canManageSettings: false
//     },
//     Manager: {
//       canManageUsers: false,
//       canSendMessages: true,
//       canMakeCalls: true,
//       canManageContacts: true,
//       canViewReports: true,
//       canManageSettings: false
//     },
//     President: {
//       canManageUsers: false,
//       canSendMessages: true,
//       canMakeCalls: true,
//       canManageContacts: true,
//       canViewReports: true,
//       canManageSettings: false
//     }
//     // Other roles will have default permissions (mostly false)
//   };

//   if (rolePermissions[this.role]) {
//     this.permissions = rolePermissions[this.role];
//   }

//   // Generate membership ID if not exists
//   if (!this.membershipId) {
//     const prefix = this.role === 'PlotOwner' ? 'PLOT' : 
//                   this.role === 'Employee' ? 'EMP' : 'MEM';
//     this.membershipId = `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
//   }

//   next();
// });

// // Method to get primary phone number
// userSchema.methods.getPrimaryPhone = function() {
//   const primary = this.phones.find(phone => phone.isPrimary);
//   return primary ? `${primary.countryCode}${primary.number}` : null;
// };

// // Method to get all verified phone numbers
// userSchema.methods.getVerifiedPhones = function() {
//   return this.phones
//     .filter(phone => phone.verified)
//     .map(phone => `${phone.countryCode}${phone.number}`);
// };

// // Static method to find users by role with contact info
// userSchema.statics.findByRoleWithContacts = function(role) {
//   return this.find({ 
//     role, 
//     isActive: true,
//     membershipStatus: "active",
//     "phones.verified": true 
//   }).select('firstName lastName email phones membershipId role contactPreferences');
// };

// module.exports = mongoose.model("User", userSchema);





/////////////////////latest version/////////////////////


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [50, "First name cannot exceed 50 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
  },
 phone: String,
  // Authentication
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false
  },
  fatherName: String,
   birthplace: String,
    nidNumber: { type: String, trim: true },
  dob: {
    type: Date,
     required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
   district: String,
  nationality: String,
  department: {
    type: String,
  },
   jobTitle: String,
   employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'intern'],
    default: 'full-time'
  },
  joinDate: {
    type: Date,
  default: Date.now 
  },
  reportingManager: String,
  documents: [{
    name: String,
    fileUrl: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'terminated'],
    default: 'active'
  },
  // RBAC System
  role: {
    type: String,
    enum: {
      values: ["SuperAdmin", "Admin", "HR", "Manager", "Member", "Employee", "ExecutiveMember", "PlotOwner"],
      message: "Invalid role provided"
    },
    default: "Member"
  },
  committeePosition: {
  type: String,
  enum: [
     'Member',
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
  ],
 default: undefined,   // <-- IMPORTANT FIX
  required: false
},

  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },

  // Role-specific fields
  membershipId: {
    type: String,
    sparse: true
  },
  nidNumber: { type: String, trim: true },
   position: String,
  employeeId: String,
  plotNumbers: [String],

  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
   educationalQualification: String,
  verificationToken: String,
  verificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // Profile
  profilePhoto: String,
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: "Bangladesh"
    },
    postalCode: String
  },
   division: {
      type: String,
    },
  // Audit Fields
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.verificationToken;
      delete ret.resetPasswordToken;
      return ret;
    }
  }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ emailVerified: 1 });
// userSchema.index({ membershipId: 1 });
userSchema.index(
  { membershipId: 1 },
   {  
    sparse: true,
    partialFilterExpression: { 
      membershipId: { $type: "string", $ne: null } 
    }  }
);


// Pre-save middleware for password hashing
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method for password comparison
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to generate membership ID
userSchema.statics.generateMembershipId = async function() {
  const count = await this.countDocuments({ role: 'Member' });
  return `AHM${String(count + 1).padStart(4, '0')}`;
};

module.exports = mongoose.model("User", userSchema);

