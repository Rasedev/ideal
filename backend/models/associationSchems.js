// backend/models/association.model.js
// import mongoose from "mongoose";

// const associationSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, default: "Alamgir Hossain City Welfare Association" },
//     headOffice: { type: String, default: "Alamgir Hossain City, Kishoregong" },
//     description: { type: String, default: "Serving the welfare of Alamgir Hossain City community" },
//     address: String,
//     contactEmail:{ type: String,default: "alamgircitysamity@gmail.com" },
//     contactPhone: { type: [String], default: ["01911313300", "01611793221", "01734450890"] },
//     established: { type: Date, default: Date.now },
//     monthlySubscriptionAmount: { type: Number, default: 1000 },
//     logo: String,
//     members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
//     employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
//     planners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Planner" }],
//     subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
//     reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Association", associationSchema);




const mongoose = require("mongoose");

const associationSchema = new mongoose.Schema(
  {
    associationName: { 
      type: String, 
      required: true, 
      trim: true 
      // default: "Alamgir Hossain City Welfare Association" 
    },
    // headOffice: { 
    //   type: String, 
    //   trim: true 
    //   // default: "Alamgir Hossain City, Kishoreganj" 
    // },
    headOffices: [ // Renamed to plural for clarity
  {
    addressType: {
      type: String,
      enum: ['Head Office', 'Branch Office', 'Billing Address', 'Shipping Address'], // Define allowed types
      required: true,
      trim: true
    },
    streetAddress: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    // postalCode: {
    //   type: String,
    //   trim: true
    // },
    // You can add more fields like country, state, etc.
  }
],

    description: { 
      type: String, 
      trim: true, 
      // default: "Serving the welfare of Alamgir Hossain City community" 
    },
    associationAddress: String,
    officeHours: String,
    contactEmail: { 
      type: String, 
      trim: true 
      // default: "alamgircitysamity@gmail.com" 
    },
    contactPhone: { 
      type: [String], 
      trim: true 
      // default: ["01911313300", "01611793221", "01734450890"] 
    },
    
    plotNumber: { 
      type: [String], 
      trim: true 
      // default: [] 
    },
    established: { 
      type: Date, 
      trim: true,
      // default: Date.now 

    },
    monthlySubscriptionAmount: { 
      type: Number, 
      default: 1000 
    },
    logo: String,
    totalMembers: { type: Number, trim: true,  },
    totalEmployees: { type: Number, trim: true  },
    totalPlotOwners: { type: Number, trim: true  },
    isActive: { type: Boolean, trim: true }
  },
  { 
    timestamps: true 
  }
);

associationSchema.statics.getAssociation = function() {
  return this.findOneAndUpdate(
    {}, 
    {}, 
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

module.exports = mongoose.model("Association", associationSchema);

