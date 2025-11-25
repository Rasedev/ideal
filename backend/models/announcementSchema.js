// // models/announcementSchema.js
// const mongoose = require("mongoose");

// const announcementSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   message: { type: String, required: true },
//   sender: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User", 
//     required: true 
//   },
//   recipients: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     read: { type: Boolean, default: false },
//     readAt: Date
//   }],
//   recipientType: {
//     type: String,
//     enum: ["All", "Members", "PlotOwners", "Employees", "Specific"],
//     required: true
//   },
//   priority: {
//     type: String,
//     enum: ["Low", "Medium", "High", "Urgent"],
//     default: "Medium"
//   },
//   meetingDate: Date,
//   meetingLocation: String
// }, { timestamps: true });

// module.exports = mongoose.model("Announcement", announcementSchema);



const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  recipients: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    read: { type: Boolean, default: false },
    readAt: Date
  }],
  recipientType: {
    type: String,
    enum: ["All", "Members", "PlotOwners", "Employees", "Committee", "Specific"],
    required: true
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Medium"
  },
  meetingDate: Date,
  meetingLocation: String
}, { timestamps: true });

module.exports = mongoose.model("Announcement", announcementSchema);










