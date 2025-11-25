// controllers/welfareController.js
const WelfareInitiative = require("../models/WelfareInitiative");
const AidApplication = require("../models/AidApplicationSchema");
const Donation = require("../models/DonationSchema");
const WelfareReport = require("../models/WelfareReportSchema");

// Dashboard Statistics
exports.getWelfareStats = async (req, res) => {
  try {
    const [
      totalInitiatives,
      activeInitiatives,
      totalApplications,
      pendingApplications,
      totalDonations,
      totalBeneficiaries,
      recentApplications,
      upcomingDeadlines
    ] = await Promise.all([
      WelfareInitiative.countDocuments(),
      WelfareInitiative.countDocuments({ status: "Active" }),
      AidApplication.countDocuments(),
      AidApplication.countDocuments({ status: { $in: ["Submitted", "Under Review"] } }),
      Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
      AidApplication.distinct("applicant", { status: "Approved" }),
      AidApplication.find({ status: "Submitted" })
        .populate("applicant", "name")
        .populate("initiative", "title")
        .sort({ createdAt: -1 })
        .limit(5),
      WelfareInitiative.find({ 
        endDate: { $gte: new Date() },
        status: "Active"
      })
      .sort({ endDate: 1 })
      .limit(5)
    ]);

    res.json({
      stats: {
        totalInitiatives,
        activeInitiatives,
        totalApplications,
        pendingApplications,
        totalDonations: totalDonations[0]?.total || 0,
        totalBeneficiaries: totalBeneficiaries.length
      },
      recentApplications,
      upcomingDeadlines
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Initiative Management
exports.createInitiative = async (req, res) => {
  try {
    const initiative = new WelfareInitiative({
      ...req.body,
      createdBy: req.user.id
    });
    await initiative.save();
    
    await initiative.populate("createdBy", "name email");
    await initiative.populate("coordinators.user", "name email");
    
    res.status(201).json(initiative);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getInitiatives = async (req, res) => {
  try {
    const { status, category, featured, page = 1, limit = 9 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (featured !== undefined) query.isFeatured = featured === 'true';

    const initiatives = await WelfareInitiative.find(query)
      .populate("createdBy", "name email")
      .populate("coordinators.user", "name email")
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WelfareInitiative.countDocuments(query);
    
    res.json({
      initiatives,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInitiativeById = async (req, res) => {
  try {
    const initiative = await WelfareInitiative.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("coordinators.user", "name email role");

    if (!initiative) {
      return res.status(404).json({ error: "Initiative not found" });
    }

    res.json(initiative);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInitiative = async (req, res) => {
  try {
    const initiative = await WelfareInitiative.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    )
    .populate("createdBy", "name email")
    .populate("coordinators.user", "name email");

    if (!initiative) {
      return res.status(404).json({ error: "Initiative not found" });
    }

    res.json(initiative);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Application Management
exports.createApplication = async (req, res) => {
  try {
    const application = new AidApplication({
      ...req.body,
      applicant: req.user.id
    });
    await application.save();
    
    await application.populate("applicant", "name email phone");
    await application.populate("initiative", "title category");
    
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    
    if (req.user.role !== "admin" && req.user.role !== "hr") {
      query.applicant = req.user.id;
    }

    const applications = await AidApplication.find(query)
      .populate("applicant", "name email phone")
      .populate("initiative", "title category")
      .populate("reviewDetails.reviewedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await AidApplication.countDocuments(query);
    
    res.json({
      applications,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Donation Management
exports.createDonation = async (req, res) => {
  try {
    const donation = new Donation({
      ...req.body,
      donor: req.user.id
    });
    await donation.save();
    
    await donation.populate("donor", "name email");
    await donation.populate("initiative", "title");
    
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (type) query.type = type;

    if (req.user.role !== "admin" && req.user.role !== "hr") {
      query.donor = req.user.id;
    }

    const donations = await Donation.find(query)
      .populate("donor", "name email")
      .populate("initiative", "title")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Donation.countDocuments(query);
    
    res.json({
      donations,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Report Management
exports.createReport = async (req, res) => {
  try {
    const report = new WelfareReport({
      ...req.body,
      generatedBy: req.user.id
    });
    await report.save();
    
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const { type, isPublished, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (type) query.type = type;
    if (isPublished !== undefined) query.isPublished = isPublished === 'true';

    const reports = await WelfareReport.find(query)
      .populate("generatedBy", "name email")
      .populate("initiativesCovered.initiative", "title category")
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