// models/FinancialReport.js
const mongoose = require("mongoose");

const financialReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  period: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  reportType: {
    type: String,
    enum: ["Monthly", "Quarterly", "Annual", "Budget", "Audit"],
    required: true
  },
  income: {
    total: Number,
    categories: {
      membershipFees: Number,
      donations: Number,
      events: Number,
      other: Number
    },
    trends: Map
  },
  expenses: {
    total: Number,
    categories: {
      administration: Number,
      welfare: Number,
      maintenance: Number,
      events: Number,
      utilities: Number,
      other: Number
    },
    trends: Map
  },
  balance: {
    opening: Number,
    closing: Number,
    netChange: Number
  },
  welfareAllocation: {
    budgeted: Number,
    utilized: Number,
    balance: Number,
    utilizationRate: Number
  },
  keyMetrics: {
    profitMargin: Number,
    expenseRatio: Number,
    liquidityRatio: Number,
    growthRate: Number
  },
  generatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  auditNotes: String
}, { timestamps: true });

module.exports = mongoose.model("FinancialReport", financialReportSchema);