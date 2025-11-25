//  const Employee = require("../models/employeeSchema");
//  const Hr = require("../models/hrSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Create HR profile (usually done by Admin)
const createHRProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      telephone,
      address,
      city,
      postCode,
      division,
      district,
    } = req.body;

    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields" 
      });
    }

    const existingHR = await User.findOne({ email });
    if (existingHR) {
      return res.status(400).json({
        success: false,
        message: "HR with this email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newHR = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      telephone,
      address,
      city,
      postCode,
      division,
      district,
      role: "HR",
      isActive: true
    });

    await newHR.save();

    res.status(201).json({
      success: true,
      message: "HR profile created successfully",
      hr: {
        id: newHR._id,
        name: `${newHR.firstName} ${newHR.lastName}`,
        email: newHR.email,
        role: newHR.role
      }
    });
  } catch (err) {
    console.error("Create HR error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ✅ Get HR profile (for logged-in HR user)
const getHRProfile = async (req, res) => {
  try {
    const hr = await User.findOne({ 
      _id: req.user._id, 
      role: "HR" 
    }).select("-password");

    if (!hr) {
      return res.status(404).json({
        success: false,
        message: "HR profile not found"
      });
    }

    res.status(200).json({
      success: true,
      profile: hr
    });
  } catch (err) {
    console.error("Get HR Profile error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ✅ Become HR Controller
async function becomeHrController(req, res) {
  try {
    const {
      batch,
      employeeId,
      email,
      phoneNumber,
      address,
      HR,
    } = req.body;

    const existingHr = await Hr.findOne({ employeeId });
    if (existingHr) {
      return res.status(400).json({
        success: false,
        error: "HR with this employeeId already exists."
      });
    }

    const hr = new Hr({
      batch,
      employeeId,
      email,
      phoneNumber,
      address,
      HR,
    });

    await hr.save();

    // Update user role to HR
    await User.findByIdAndUpdate(
      HR, 
      { role: "HR" }, 
      { new: true }
    );

    res.json({
      success: true,
      message: "Congratulations! You are now an HR personnel.",
      hr
    });
  } catch (error) {
    console.error("Error creating HR personnel:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create HR personnel."
    });
  }
}

// ✅ Get All HR Personnel
async function getAllHrController(req, res) {
  try {
    const hrPersonnel = await Hr.find({})
      .populate("HR", "firstName lastName email")
      .sort({ batch: 1 });

    res.status(200).json({
      success: true,
      hrPersonnel
    });
  } catch (error) {
    console.error("Error fetching HR personnel:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch HR personnel."
    });
  }
}

// ✅ Get HR Statistics
const getHRStats = async (req, res) => {
  try {
    const totalHR = await User.countDocuments({ role: "HR" });
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: "approved" });
    const pendingEmployees = await Employee.countDocuments({ status: "waiting" });

    const recentHires = await Employee.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      stats: {
        totalHR,
        totalEmployees,
        activeEmployees,
        pendingEmployees,
        recentHires
      }
    });
  } catch (error) {
    console.error("HR stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching HR statistics",
      error: error.message
    });
  }
};

module.exports = {
  createHRProfile,
  getHRProfile,
  becomeHrController,
  getAllHrController,
  getHRStats
};