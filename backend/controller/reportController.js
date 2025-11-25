// controllers/reportController.js
const MembershipReport = require("../models/MembershipReport");
const FinancialReport = require("../models/FinancialReport");
const WelfareReport = require("../models/WelfareReportSchema");
const User = require("../models/userSchema");
const Donation = require("../models/DonationSchema");
const WelfareInitiative = require("../models/WelfareInitiative");
const AidApplication = require("../models/AidApplicationSchema");

// Dashboard Statistics
exports.getReportsDashboard = async (req, res) => {
  try {
    const [
      membershipReports,
      financialReports,
      welfareReports,
      recentReports,
      quickStats
    ] = await Promise.all([
      MembershipReport.countDocuments(),
      FinancialReport.countDocuments(),
      WelfareReport.countDocuments(),
      MembershipReport.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title reportType period createdAt'),
      getQuickStats()
    ]);

    res.json({
      stats: {
        membershipReports,
        financialReports,
        welfareReports,
        totalReports: membershipReports + financialReports + welfareReports
      },
      recentReports,
      quickStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membership Reports
exports.createMembershipReport = async (req, res) => {
  try {
    const reportData = await generateMembershipReportData(req.body.period);
    const report = new MembershipReport({
      ...req.body,
      ...reportData,
      generatedBy: req.user.id
    });
    
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMembershipReports = async (req, res) => {
  try {
    const { reportType, page = 1, limit = 10 } = req.query;
    const query = {};
    if (reportType) query.reportType = reportType;

    const reports = await MembershipReport.find(query)
      .populate("generatedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await MembershipReport.countDocuments(query);
    
    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Financial Reports
exports.createFinancialReport = async (req, res) => {
  try {
    const reportData = await generateFinancialReportData(req.body.period);
    const report = new FinancialReport({
      ...req.body,
      ...reportData,
      generatedBy: req.user.id
    });
    
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFinancialReports = async (req, res) => {
  try {
    const { reportType, page = 1, limit = 10 } = req.query;
    const query = {};
    if (reportType) query.reportType = reportType;

    const reports = await FinancialReport.find(query)
      .populate("generatedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await FinancialReport.countDocuments(query);
    
    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Welfare Reports
exports.createWelfareReport = async (req, res) => {
  try {
    const reportData = await generateWelfareReportData(req.body.period);
    const report = new WelfareReport({
      ...req.body,
      ...reportData,
      generatedBy: req.user.id
    });
    
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWelfareReports = async (req, res) => {
  try {
    const { reportType, page = 1, limit = 10 } = req.query;
    const query = {};
    if (reportType) query.reportType = reportType;

    const reports = await WelfareReport.find(query)
      .populate("generatedBy", "name email")
      .populate("initiativesSummary.initiative", "title category")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WelfareReport.countDocuments(query);
    
    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export Reports
exports.exportReport = async (req, res) => {
  try {
    const { type, format, reportId } = req.query;
    let data;

    switch (type) {
      case 'membership':
        data = await MembershipReport.findById(reportId);
        break;
      case 'financial':
        data = await FinancialReport.findById(reportId);
        break;
      case 'welfare':
        data = await WelfareReport.findById(reportId).populate('initiativesSummary.initiative');
        break;
      default:
        return res.status(400).json({ error: "Invalid report type" });
    }

    if (format === 'pdf') {
      // Generate PDF logic would go here
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=report-${Date.now()}.pdf`);
      return res.send(generatePDF(data));
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper Functions
async function generateMembershipReportData(period) {
  const [totalMembers, newMembers, activeMembers, roleDistribution, activityMetrics] = await Promise.all([
    User.countDocuments({ isActive: true }),
    User.countDocuments({ 
      joinDate: { 
        $gte: new Date(period.start), 
        $lte: new Date(period.end) 
      } 
    }),
    User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
    User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    calculateActivityMetrics(period)
  ]);

  return {
    summary: {
      totalMembers,
      newMembers,
      activeMembers,
      inactiveMembers: totalMembers - activeMembers,
      membershipGrowth: ((newMembers / totalMembers) * 100).toFixed(2)
    },
    demographicData: {
      byRole: Object.fromEntries(roleDistribution.map(r => [r._id, r.count])),
      activityMetrics
    }
  };
}

async function generateFinancialReportData(period) {
  const [donations, expenses, welfareAllocation] = await Promise.all([
    Donation.aggregate([
      { $match: { createdAt: { $gte: new Date(period.start), $lte: new Date(period.end) } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    calculateExpenses(period),
    WelfareInitiative.aggregate([
      { $match: { status: "Active" } },
      { $group: { _id: null, allocated: { $sum: "$budget.allocated" }, utilized: { $sum: "$budget.utilized" } } }
    ])
  ]);

  return {
    income: {
      total: donations[0]?.total || 0,
      categories: {
        donations: donations[0]?.total || 0,
        membershipFees: 0, // Would come from membership model
        events: 0,
        other: 0
      }
    },
    expenses: expenses,
    welfareAllocation: {
      budgeted: welfareAllocation[0]?.allocated || 0,
      utilized: welfareAllocation[0]?.utilized || 0,
      balance: (welfareAllocation[0]?.allocated || 0) - (welfareAllocation[0]?.utilized || 0),
      utilizationRate: welfareAllocation[0]?.allocated ? 
        ((welfareAllocation[0]?.utilized / welfareAllocation[0]?.allocated) * 100).toFixed(2) : 0
    }
  };
}

async function generateWelfareReportData(period) {
  const [applications, initiatives, donations, beneficiaries] = await Promise.all([
    AidApplication.aggregate([
      { $match: { createdAt: { $gte: new Date(period.start), $lte: new Date(period.end) } } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    WelfareInitiative.find({ status: "Active" }).select('title budget category metrics'),
    Donation.aggregate([
      { $match: { createdAt: { $gte: new Date(period.start), $lte: new Date(period.end) } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    AidApplication.distinct("applicant", { status: "Approved" })
  ]);

  const applicationStats = {
    total: applications.reduce((sum, app) => sum + app.count, 0),
    approved: applications.find(app => app._id === "Approved")?.count || 0,
    rejected: applications.find(app => app._id === "Rejected")?.count || 0,
    pending: applications.find(app => app._id === "Pending" || app._id === "Under Review")?.count || 0
  };

  return {
    applications: {
      ...applicationStats,
      approvalRate: applicationStats.total > 0 ? 
        ((applicationStats.approved / applicationStats.total) * 100).toFixed(2) : 0
    },
    initiativesSummary: initiatives.map(initiative => ({
      initiative: initiative._id,
      budgetAllocated: initiative.budget.allocated,
      budgetUtilized: initiative.budget.utilized,
      beneficiariesServed: initiative.metrics.actualBeneficiaries,
      successRate: initiative.metrics.successRate
    })),
    financials: {
      totalDonations: donations[0]?.total || 0,
      totalDisbursed: initiatives.reduce((sum, init) => sum + init.budget.utilized, 0),
      administrativeCosts: 0, // Would come from expense tracking
      availableBalance: (donations[0]?.total || 0) - initiatives.reduce((sum, init) => sum + init.budget.utilized, 0)
    },
    beneficiaryStats: {
      totalBeneficiaries: beneficiaries.length
    }
  };
}

async function getQuickStats() {
  const [totalMembers, activeInitiatives, totalDonations, pendingApplications] = await Promise.all([
    User.countDocuments({ isActive: true }),
    WelfareInitiative.countDocuments({ status: "Active" }),
    Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
    AidApplication.countDocuments({ status: { $in: ["Submitted", "Under Review"] } })
  ]);

  return {
    totalMembers,
    activeInitiatives,
    totalDonations: totalDonations[0]?.total || 0,
    pendingApplications
  };
}

function calculateActivityMetrics(period) {
  // Implementation for activity metrics calculation
  return {
    averageEngagement: 75,
    activeParticipants: 150,
    newRegistrations: 25,
    retentionRate: 85
  };
}

function calculateExpenses(period) {
  // Implementation for expense calculation
  return {
    total: 50000,
    categories: {
      administration: 15000,
      welfare: 25000,
      maintenance: 5000,
      events: 3000,
      utilities: 2000
    }
  };
}