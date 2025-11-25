const User = require("../models/userSchema");
const PlotOwner = require("../models/plotOwnerSchema");
const Application = require("../models/applicationSchema");


const createPlotOwner = async (req, res) => {
  try {
    const { ownerName, phone, plotNumber, block } = req.body;

    if (!ownerName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Owner name and phone are required",
      });
    }

    const newOwner = new User({
      firstName: ownerName,
      phone,
      role: "PlotOwner",
      address: block,
      plotNumber
    });

    await newOwner.save();

    res.status(201).json({
      success: true,
      message: "Plot owner created successfully",
      owner: newOwner,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error creating plot owner",
      error: error.message,
    });
  }
};


// ✅ Get all Plot Owners
const getAllPlotOwners = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    let filter = { role: "PlotOwner" };
    
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const plotOwners = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    if (!plotOwners || plotOwners.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No plot owners found in the system.",
      });
    }

    return res.status(200).json({
      success: true,
      count: plotOwners.length,
      total,
      plotOwners,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching plot owners:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching plot owners.",
      error: error.message,
    });
  }
};

// ✅ Get single Plot Owner by ID
const getPlotOwnerById = async (req, res) => {
  try {
    const owner = await User.findOne({ 
      _id: req.params.id, 
      role: "PlotOwner" 
    }).select("-password");

    if (!owner) {
      return res.status(404).json({ 
        success: false, 
        message: "Plot Owner not found." 
      });
    }

    // Get plot details
    const plotDetails = await PlotOwner.find({ user: owner._id })
      .populate("applications");

    // Get recent applications
    const recentApplications = await Application.find({ 
      applicant: { $in: plotDetails.map(plot => plot._id) } 
    })
    .sort({ createdAt: -1 })
    .limit(5);

    res.status(200).json({ 
      success: true, 
      owner: {
        ...owner.toObject(),
        plotDetails,
        recentApplications
      }
    });
  } catch (error) {
    console.error("Error fetching plot owner:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching plot owner details.",
      error: error.message,
    });
  }
};

// ✅ Update Plot Owner details
const updatePlotOwner = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { _id: req.params.id, role: "PlotOwner" },
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Plot Owner not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plot Owner updated successfully.",
      updated,
    });
  } catch (error) {
    console.error("Error updating plot owner:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating plot owner.",
      error: error.message,
    });
  }
};

// ✅ Delete Plot Owner
const deletePlotOwner = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({
      _id: req.params.id,
      role: "PlotOwner",
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Plot Owner not found.",
      });
    }

    // Also delete plot owner records
    await PlotOwner.deleteMany({ user: req.params.id });

    res.status(200).json({
      success: true,
      message: "Plot Owner deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting plot owner:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting plot owner.",
      error: error.message,
    });
  }
};

// ✅ Get plot owner statistics
const getPlotOwnerStats = async (req, res) => {
  try {
    const totalPlotOwners = await User.countDocuments({ role: "PlotOwner" });
    const activePlotOwners = await User.countDocuments({ 
      role: "PlotOwner", 
      isActive: true 
    });

    const totalPlots = await PlotOwner.countDocuments();
    const pendingApplications = await Application.countDocuments({
      status: "Pending",
      type: { $in: ["Construction", "Water", "Electricity", "Maintenance", "Transfer"] }
    });

    const currentMonth = new Date().toISOString().slice(0, 7);
    const paidSubscriptions = await Application.countDocuments({
      month: currentMonth,
      status: "Completed"
    });

    res.json({
      success: true,
      stats: {
        totalPlotOwners,
        activePlotOwners,
        totalPlots,
        pendingApplications,
        paidSubscriptions
      }
    });
  } catch (error) {
    console.error("Plot owner stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching plot owner statistics",
      error: error.message
    });
  }
};

module.exports = {
  getAllPlotOwners,
  getPlotOwnerById,
  updatePlotOwner,
  deletePlotOwner,
  getPlotOwnerStats,
  createPlotOwner
};