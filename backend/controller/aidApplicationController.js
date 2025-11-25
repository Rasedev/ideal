// controllers/aidApplicationController.js
const AidApplication = require("../models/AidApplicationSchema");
const WelfareInitiative = require("../models/WelfareInitiative");

exports.createApplication = async (req, res) => {
  try {
    // Check if initiative is active
    const initiative = await WelfareInitiative.findById(req.body.initiative);
    if (!initiative || initiative.status !== "Active") {
      return res.status(400).json({ error: "Initiative is not active" });
    }

    const application = new AidApplication({
      ...req.body,
      applicant: req.user.id
    });
    await application.save();
    
    await application.populate("initiative", "title category");
    await application.populate("applicant", "name email");
    
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
    
    // Regular users can only see their own applications
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
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, comments, approvedAmount } = req.body;
    
    const application = await AidApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    application.status = status;
    application.reviewDetails = {
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      comments,
      approvedAmount: approvedAmount || application.amountRequested
    };

    // Add to history
    application.history.push({
      action: `Status changed to ${status}`,
      performedBy: req.user.id,
      comments
    });

    await application.save();
    await application.populate("reviewDetails.reviewedBy", "name email");
    
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};