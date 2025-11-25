const Application = require("../models/applicationSchema");
const PlotOwner = require("../models/plotOwnerSchema");
const User = require("../models/userSchema");

// ✅ Create a new application (PlotOwner/Member submits)
const createApplication = async (req, res) => {
  try {
    const { type, description, plotNumber } = req.body;

    if (!type || !description) {
      return res.status(400).json({
        success: false,
        message: "Type and description are required.",
      });
    }

    // For plot owners, verify they own the plot
    let plotOwner = null;
    if (plotNumber && req.user.role === "PlotOwner") {
      plotOwner = await PlotOwner.findOne({ 
        user: req.user._id, 
        plotNumber: plotNumber 
      });
      
      if (!plotOwner) {
        return res.status(400).json({
          success: false,
          message: "You don't own this plot or plot number is invalid.",
        });
      }
    }

    const application = new Application({
      type,
      description,
      applicant: plotOwner ? plotOwner._id : req.user._id,
      status: "Pending",
      receivedBy: null // Will be set when office secretary processes it
    });

    await application.save();

    // Populate the response
    const populatedApplication = await Application.findById(application._id)
      .populate("applicant", "user")
      .populate("receivedBy", "firstName lastName");

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application: populatedApplication,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting application.",
      error: error.message,
    });
  }
};

// ✅ Get all applications (Office Secretary or Admin)
const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const applications = await Application.find(filter)
      .populate({
        path: "applicant",
        populate: {
          path: "user",
          select: "firstName lastName email phone"
        }
      })
      .populate("receivedBy", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching applications.",
      error: error.message,
    });
  }
};

// ✅ Get user's applications
const getMyApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    
    if (req.user.role === "PlotOwner") {
      // For plot owners, find their plots first
      const userPlots = await PlotOwner.find({ user: req.user._id });
      filter.applicant = { $in: userPlots.map(plot => plot._id) };
    } else {
      // For regular members
      filter.applicant = req.user._id;
    }

    if (status) filter.status = status;

    const applications = await Application.find(filter)
      .populate("receivedBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching applications.",
      error: error.message,
    });
  }
};

// ✅ Update application status (Office Secretary or Admin)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Reviewed", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid status value." 
      });
    }

    const updateData = { 
      status,
      updatedAt: new Date()
    };

    // If status is being reviewed for the first time, set receivedBy
    if (status === "Reviewed" || status === "Approved" || status === "Rejected") {
      updateData.receivedBy = req.user._id;
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate({
      path: "applicant",
      populate: {
        path: "user",
        select: "firstName lastName email"
      }
    })
    .populate("receivedBy", "firstName lastName");

    if (!updatedApplication) {
      return res.status(404).json({ 
        success: false,
        message: "Application not found." 
      });
    }

    res.status(200).json({
      success: true,
      message: `Application status updated to ${status}.`,
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating application.",
      error: error.message,
    });
  }
};

// ✅ Get single application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate({
        path: "applicant",
        populate: {
          path: "user",
          select: "firstName lastName email phone"
        }
      })
      .populate("receivedBy", "firstName lastName email");

    if (!application) {
      return res.status(404).json({ 
        success: false,
        message: "Application not found." 
      });
    }

    // Check if user has permission to view this application
    if (req.user.role === "PlotOwner") {
      const userPlots = await PlotOwner.find({ user: req.user._id });
      const plotIds = userPlots.map(plot => plot._id.toString());
      
      if (!plotIds.includes(application.applicant._id.toString())) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You don't have permission to view this application."
        });
      }
    } else if (req.user.role === "Member" && application.applicant.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You don't have permission to view this application."
      });
    }

    res.status(200).json({ 
      success: true, 
      application 
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching application.",
      error: error.message,
    });
  }
};

// ✅ Get application statistics
const getApplicationStats = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: "Pending" });
    const approvedApplications = await Application.countDocuments({ status: "Approved" });
    const rejectedApplications = await Application.countDocuments({ status: "Rejected" });

    const applicationsByType = await Application.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);

    const monthlyStats = await Application.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 }
    ]);

    res.json({
      success: true,
      stats: {
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        applicationsByType,
        monthlyStats
      }
    });
  } catch (error) {
    console.error("Application stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching application statistics",
      error: error.message
    });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  updateApplicationStatus,
  getApplicationById,
  getMyApplications,
  getApplicationStats
};