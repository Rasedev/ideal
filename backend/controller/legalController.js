// controllers/legalController.js
const Constitution = require("../models/Constitution");
const License = require("../models/License");
const Agreement = require("../models/Agreement");

// Dashboard Statistics
exports.getLegalDashboard = async (req, res) => {
  try {
    const [
      activeConstitution,
      totalLicenses,
      expiringLicenses,
      totalAgreements,
      expiringAgreements,
      recentActivities
    ] = await Promise.all([
      Constitution.findOne({ status: "Active" }).select('title version effectiveDate'),
      License.countDocuments(),
      License.countDocuments({ 
        expirationDate: { 
          $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          $gte: new Date() 
        },
        status: "Active"
      }),
      Agreement.countDocuments(),
      Agreement.countDocuments({ 
        expirationDate: { 
          $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          $gte: new Date() 
        },
        status: "Active"
      }),
      getRecentLegalActivities()
    ]);

    res.json({
      stats: {
        activeConstitution: activeConstitution ? 1 : 0,
        totalLicenses,
        expiringLicenses,
        totalAgreements,
        expiringAgreements
      },
      activeConstitution,
      recentActivities
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Constitution Management
exports.getConstitution = async (req, res) => {
  try {
    const constitution = await Constitution.findOne({ status: "Active" })
      .populate("createdBy", "name email")
      .populate("lastModifiedBy", "name email")
      .populate("amendments.approvedBy", "name");

    if (!constitution) {
      return res.status(404).json({ error: "No active constitution found" });
    }

    res.json(constitution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createConstitution = async (req, res) => {
  try {
    // Archive current active constitution if exists
    await Constitution.updateMany(
      { status: "Active" },
      { status: "Archived" }
    );

    const constitution = new Constitution({
      ...req.body,
      createdBy: req.user.id,
      lastModifiedBy: req.user.id
    });

    await constitution.save();
    res.status(201).json(constitution);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateConstitution = async (req, res) => {
  try {
    const constitution = await Constitution.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        lastModifiedBy: req.user.id
      },
      { new: true, runValidators: true }
    );

    if (!constitution) {
      return res.status(404).json({ error: "Constitution not found" });
    }

    res.json(constitution);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// License Management
exports.getLicenses = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (type) query.type = type;

    const licenses = await License.find(query)
      .populate("createdBy", "name email")
      .sort({ expirationDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await License.countDocuments(query);
    
    res.json({
      licenses,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLicense = async (req, res) => {
  try {
    const license = new License({
      ...req.body,
      createdBy: req.user.id
    });

    await license.save();
    res.status(201).json(license);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateLicense = async (req, res) => {
  try {
    const license = await License.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!license) {
      return res.status(404).json({ error: "License not found" });
    }

    res.json(license);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Agreement Management
exports.getAgreements = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (type) query.type = type;

    const agreements = await Agreement.find(query)
      .populate("createdBy", "name email")
      .populate("approvalWorkflow.approver", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Agreement.countDocuments(query);
    
    res.json({
      agreements,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAgreement = async (req, res) => {
  try {
    const agreement = new Agreement({
      ...req.body,
      createdBy: req.user.id
    });

    await agreement.save();
    res.status(201).json(agreement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAgreement = async (req, res) => {
  try {
    const agreement = await Agreement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!agreement) {
      return res.status(404).json({ error: "Agreement not found" });
    }

    res.json(agreement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper Functions
async function getRecentLegalActivities() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [recentLicenses, recentAgreements, constitutionUpdates] = await Promise.all([
    License.find({ createdAt: { $gte: oneWeekAgo } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name type status createdAt'),
    Agreement.find({ createdAt: { $gte: oneWeekAgo } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title type status createdAt'),
    Constitution.find({ updatedAt: { $gte: oneWeekAgo } })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title version status updatedAt')
  ]);

  return {
    licenses: recentLicenses,
    agreements: recentAgreements,
    constitution: constitutionUpdates
  };
}