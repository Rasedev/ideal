

// backend/models/employeeSchema.js
// const mongoose = require("mongoose");

// const employmentHistorySchema = new mongoose.Schema({
//   companyName: { type: String, trim: true },
//   position: { type: String, trim: true },
//   startDate: Date,
//   endDate: Date,
//   responsibilities: { type: String, trim: true },
// });
// const documentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   fileUrl: { type: String, required: true },
//   uploadDate: { type: Date, default: Date.now },
//   documentType: { 
//     type: String, 
//     enum: ['nid', 'certificate', 'contract', 'resume', 'other'],
//     default: 'other'
//   }
// });

// const employeeSchema = new mongoose.Schema(
//   {
//     // Auto-generated Employee ID
//     employeeId: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//    documents: [documentSchema],
//     // Personal Information
//     firstName: {
//       type: String,
//       required: [true, "First name is required"],
//       trim: true,
//       maxlength: 50,
//     },

//     lastName: {
//       type: String,
//       trim: true,
//       maxlength: 50,
//       default: "" // Optional field
//     },

//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       trim: true,
//       lowercase: true,
//       match: [
//         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//         "Please provide a valid email",
//       ],
//     },

//     phone: {
//       type: String,
//       trim: true,
//     },

//     // Personal Details
//     fatherName: { type: String, trim: true },
//     birthplace: { type: String, trim: true },
//     dob: {
//       type: Date,
//       required: true,
//     },
//     nidNumber: {
//       type: String,
//       trim: true,
//     },
//     address: {
//       type: String,
//       trim: true,
//     },

//     // Employment Details
//     position: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     department: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     employmentType: {
//       type: String,
//       enum: ['full-time', 'part-time', 'contract', 'intern'],
//       default: 'full-time'
//     },
//     joinDate: {
//       type: Date,
//       default: Date.now
//     },

//     // Professional Details
//     educationalQualification: {
//       type: String,
//       trim: true,
//     },
//     description: {
//       type: String, // Tiptap HTML
//     },
//     image: {
//       type: String, // URL
//     },

//     // Employment history
//     employmentHistory: [employmentHistorySchema],

//     // Status - No user account needed
//     status: {
//       type: String,
//       enum: ["active", "inactive", "terminated"],
//       default: "active",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Employee", employeeSchema);





const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  fileUrl: { 
    type: String, 
    required: true 
  },
  uploadDate: { 
    type: Date, 
    default: Date.now 
  },
  documentType: { 
    type: String, 
    enum: ['nid', 'certificate', 'contract', 'resume', 'other'],
    default: 'other'
  },
  fileSize: {
    type: Number,
    default: 0
  },
  mimeType: {
    type: String,
    default: ''
  }
});

const employmentHistorySchema = new mongoose.Schema({
  companyName: { type: String, trim: true },
  position: { type: String, trim: true },
  startDate: Date,
  endDate: Date,
  responsibilities: { type: String, trim: true },
});


const employeeSchema = new mongoose.Schema(
  {
    // Auto-generated Employee ID
    employeeId: {
      type: String,
      unique: true,
      required: true,
    },

    // Personal Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: 50,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
      default: ""
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },

    phone: {
      type: String,
      trim: true,
    },

    // Personal Details
    fatherName: { type: String, trim: true },
    birthplace: { type: String, trim: true },
    dob: {
      type: Date,
      required: true,
    },
    nidNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },

    // Employment Details
    position: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'intern'],
      default: 'full-time'
    },
    joinDate: {
      type: Date,
      default: Date.now
    },

    // Professional Details
    educationalQualification: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },

    // Employment history
    employmentHistory: [employmentHistorySchema],

    // Documents array
    documents: [documentSchema],


    // Status
    status: {
      type: String,
      enum: ["active", "inactive", "terminated"],
      default: "active",
    },
  },
  


  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);





