// const User = require("../models/userSchema");
// const Subscription = require("../models/subscriptionSchema");



// async function createMemberController(req, res) {
//   try {
//     const {
//       firstName,
//       email,
//       address,
//       telephone,
//       fatherName,
//       birthplace,
//       dob,
//       IdCardNumber,
//       description,
//       store,
//       educationalQualification,
//     } = req.body;
//     //  console.log("Rasel", req.file);

//     const image = `http://localhost:3000/uploads/${req.file.filename}`;

//     // Parse employmentHistory first
//     // let employmentHistory = [];
//     // if (req.body.employmentHistory) {
//     //   try {
//     //     employmentHistory =
//     //       typeof req.body.employmentHistory === "string"
//     //         ? JSON.parse(req.body.employmentHistory)
//     //         : req.body.employmentHistory;
//     //   } catch (err) {
//     //     return res.status(400).json({
//     //       success: false,
//     //       message: "Invalid JSON for employmentHistory",
//     //       error: err.message,
//     //     });
//     //   }
//     // }

//     // Remove employmentHistory from body to prevent override
//     // const { employmentHistory: _, ...bodyWithoutHistory } = req.body;

//     // Check duplicates
//     const duplicateEmail = await User.findOne({
//       email: bodyWithoutHistory.email,
//     });
//     const duplicateERP = await User.findOne({
//       erpNumber: bodyWithoutHistory.erpNumber,
//     });

//     if (duplicateEmail)
//       return res.status(400).json({ error: "Email already exists" });
//     if (duplicateERP)
//       return res.status(400).json({ error: "ERP number already exists" });

//     if (!dob || isNaN(Date.parse(dob))) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing 'dob'. Please provide a valid date.",
//       });
//     }

//     const employee = new User({
//       firstName,
//       email,
//       address,
//       telephone,
//       fatherName,
//       birthplace,
//       dob: new Date(dob),
//       IdCardNumber,
//       educationalQualification,
//       description,
//       store,
//       image,
//     });

//     await employee.save();

//     res.status(201).json({
//       success: true,
//       message: "Employee created successfully!",
//       employee,
//     });
//   } catch (error) {
//     console.error("Employee creation failed:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while creating employee",
//       error: error.message,
//     });
//   }
// }

// // ✅ Get all members
// const getAllMembers = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search, status } = req.query;
//     const skip = (page - 1) * limit;

//     let filter = { 
//       role: { 
//         $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
//               "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
//               "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
//               "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
//               "EnvironmentalSecretary", "ExecutiveMember"] 
//       } 
//     };

//     if (search) {
//       filter.$or = [
//         { firstName: { $regex: search, $options: 'i' } },
//         { lastName: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } },
//         { membershipId: { $regex: search, $options: 'i' } }
//       ];
//     }

//     if (status) {
//       filter.isActive = status === 'active';
//     }

//     const members = await User.find(filter)
//       .select("-password")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await User.countDocuments(filter);

//     if (!members || members.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No members found in the system",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       count: members.length,
//       total,
//       members,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (err) {
//     console.error("Error fetching members:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while fetching members",
//       error: err.message,
//     });
//   }
// };

// // ✅ Get member by ID
// const getMemberById = async (req, res) => {
//   try {
//     const member = await User.findOne({
//       _id: req.params.id,
//       role: { 
//         $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
//               "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
//               "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
//               "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
//               "EnvironmentalSecretary", "ExecutiveMember"] 
//       }
//     }).select("-password");

//     if (!member) {
//       return res.status(404).json({
//         success: false,
//         message: "Member not found.",
//       });
//     }

//     // Get subscription history
//     const subscriptions = await Subscription.find({ member: member._id })
//       .sort({ month: -1 })
//       .limit(12);

//     res.status(200).json({
//       success: true,
//       member: {
//         ...member.toObject(),
//         subscriptionHistory: subscriptions
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching member:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching member details.",
//       error: error.message,
//     });
//   }
// };

// // ✅ Update member details
// const updateMember = async (req, res) => {
//   try {
//     const updated = await User.findOneAndUpdate(
//       { 
//         _id: req.params.id,
//         role: { 
//           $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
//                 "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
//                 "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
//                 "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
//                 "EnvironmentalSecretary", "ExecutiveMember"] 
//         }
//       },
//       req.body,
//       { new: true, runValidators: true }
//     ).select("-password");

//     if (!updated) {
//       return res.status(404).json({
//         success: false,
//         message: "Member not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Member updated successfully.",
//       member: updated,
//     });
//   } catch (error) {
//     console.error("Error updating member:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while updating member.",
//       error: error.message,
//     });
//   }
// };

// // ✅ Delete member
// const deleteMember = async (req, res) => {
//   try {
//     const deleted = await User.findOneAndDelete({
//       _id: req.params.id,
//       role: { 
//         $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
//               "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
//               "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
//               "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
//               "EnvironmentalSecretary", "ExecutiveMember"] 
//       }
//     });

//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Member not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Member deleted successfully.",
//     });
//   } catch (error) {
//     console.error("Error deleting member:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while deleting member.",
//       error: error.message,
//     });
//   }
// };

// // ✅ Get member statistics
// const getMemberStats = async (req, res) => {
//   try {
//     const totalMembers = await User.countDocuments({
//       role: { 
//         $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
//               "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
//               "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
//               "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
//               "EnvironmentalSecretary", "ExecutiveMember"] 
//       }
//     });

//     const activeMembers = await User.countDocuments({
//       role: { 
//         $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
//               "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
//               "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
//               "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
//               "EnvironmentalSecretary", "ExecutiveMember"] 
//       },
//       isActive: true
//     });

//     const newMembersThisMonth = await User.countDocuments({
//       role: { 
//         $in: ["Member", "PlotOwner"] 
//       },
//       createdAt: {
//         $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
//       }
//     });

//     const currentMonth = new Date().toISOString().slice(0, 7);
//     const paidSubscriptions = await Subscription.countDocuments({
//       month: currentMonth,
//       status: "Completed"
//     });

//     res.json({
//       success: true,
//       stats: {
//         totalMembers,
//         activeMembers,
//         inactiveMembers: totalMembers - activeMembers,
//         newMembersThisMonth,
//         paidSubscriptions,
//         paymentRate: totalMembers > 0 ? ((paidSubscriptions / totalMembers) * 100).toFixed(1) : 0
//       }
//     });
//   } catch (error) {
//     console.error("Member stats error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching member statistics",
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   createMemberController,
//   getAllMembers,
//   getMemberById,
//   updateMember,
//   deleteMember,
//   getMemberStats
// };




const User = require("../models/userSchema");
const Subscription = require("../models/subscriptionSchema");

// async function createMemberController(req, res) {
//   try {
//     const {
//       firstName,
//       lastName, // ✅ Added missing field
//       email,
//       address,
//       telephone,
//       fatherName,
//       birthplace,
//       dob,
//       IdCardNumber,
//       description,
//       store,
//       educationalQualification,
//       role = "Member", // ✅ Added role with default
//       password = "123456", // ✅ Added default password
//     } = req.body;

//     // ✅ Check if file exists
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Profile image is required",
//       });
//     }

//     const image = `http://localhost:3000/uploads/${req.file.filename}`;

//     // ✅ Check for duplicate email
//     const duplicateEmail = await User.findOne({ email });
//     if (duplicateEmail) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Email already exists" 
//       });
//     }
    

//     // ✅ Validate required fields
//     if (!firstName || !email || !telephone) {
//       return res.status(400).json({
//         success: false,
//         message: "First name, email, and phone are required fields",
//       });
//     }

//     // ✅ Validate date
//     if (dob && isNaN(Date.parse(dob))) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid date format for 'dob'",
//       });
//     }

//     // ✅ Create new member
//     const member = new User({
//       firstName,
//       // lastName: lastName || "", 
//       lastName, 
//       email,
//       address: address || "",
//       phone: String,

//       // phone: [{
//       //   number: telephone,
//       //   type: 'mobile',
//       //   isPrimary: true,
//       //   countryCode: '+880', // ✅ Default for Bangladesh
//       //   verified: false
//       // }],
//       fatherName: fatherName || "",
//       birthplace: birthplace || "",
//       dateOfBirth: dob ? new Date(dob) : undefined,
//       IdCardNumber: IdCardNumber || "",
//       educationalQualification: educationalQualification || "",
//       description: description || "",
//       store: store || "",
//       role: role,
//       password: password, // ✅ In production, hash this password
//       profilePhoto: image,
//       membershipStatus: "active",
//       isActive: true,
//       contactPreferences: {
//         smsEnabled: true,
//         emailEnabled: true,
//         callEnabled: true,
//         preferredContactMethod: "sms"
//       }
//     });
//     member.membershipId = await User.generateMembershipId();


//     await member.save();

//     // ✅ Remove password from response
//     const memberResponse = member.toObject();
//     delete memberResponse.password;

//     res.status(201).json({
//       success: true,
//       message: "Member created successfully!",
//       member: memberResponse,
//     });
//   } catch (error) {
//     console.error("Member creation failed:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while creating member",
//       error: error.message,
//     });
//   }
// }

// ✅ Get all members



async function createMemberController(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      telephone,
      fatherName,
      birthplace,
      dob,
      IdCardNumber,
      description,
      store,
      educationalQualification,
      role = "Member",
      password = "123456"
    } = req.body;

    // ---------------------------------------------------------
    // 1. Validate profile image
    // ---------------------------------------------------------
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    const profilePhoto = `http://localhost:3000/uploads/${req.file.filename}`;

    // ---------------------------------------------------------
    // 2. Check duplicate email
    // ---------------------------------------------------------
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ---------------------------------------------------------
    // 3. Validate required fields
    // ---------------------------------------------------------
    if (!firstName || !email || !telephone || !dob) {
      return res.status(400).json({
        success: false,
        message:
          "First name, email, phone, and date of birth are required fields.",
      });
    }

    // ---------------------------------------------------------
    // 4. Validate DOB format
    // ---------------------------------------------------------
    const dateOfBirth = new Date(dob);
    if (isNaN(dateOfBirth.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format for DOB. Use YYYY-MM-DD.",
      });
    }

    // ---------------------------------------------------------
    // 5. Committee roles lookup table
    // ---------------------------------------------------------
    const committeeRoles = [
      'President',
      'ExecutivePresident',
      'VicePresident',
      'GeneralSecretary',
      'JointGeneralSecretary',
      'OrganizingSecretary',
      'FinanceSecretary',
      'PublicityAndPublicationSecretary',
      'OfficeSecretary',
      'SocialWelfareAffairsSecretary',
      'LegalAffairsSecretary',
      'ReligiousAffairsSecretary',
      'PriyaAndCulturalAffairsSecretary',
      'WomensAffairsSecretary',
      'EnvironmentalAffairsSecretary',
      'ExecutiveWorkingMember'
    ];

    let committeePosition = undefined; 
    if (committeeRoles.includes(role)) {
      committeePosition = role;
    }

    // ---------------------------------------------------------
    // 6. Create new user instance
    // ---------------------------------------------------------
    const member = new User({
      firstName,
      lastName,
      email,
      phone: telephone,
      fatherName,
      birthplace,
      dob: dateOfBirth,
      IdCardNumber,
      educationalQualification,
      address: {
    street: address || "",
    city: city || "",
    state: state || "",
    country: country || "Bangladesh",
    postalCode: postalCode || "",
  },
      description,
      store,
      role,
      committeePosition,
      password,
      profilePhoto,
      isActive: true,
      status: "active"
    });

    // ---------------------------------------------------------
    // 7. Auto-generate membership ID (Members + PlotOwners)
    // ---------------------------------------------------------
    if (role === "Member" || role === "PlotOwner") {
      member.membershipId = await User.generateMembershipId();
    }

    // ---------------------------------------------------------
    // 8. Save to DB
    // ---------------------------------------------------------
    await member.save();

    // Remove password before sending response
    const responseData = member.toObject();
    delete responseData.password;

    res.status(201).json({
      success: true,
      message: "Member created successfully!",
      member: responseData,
    });
  } catch (error) {
    console.error("Member creation failed:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating member",
      error: error.message,
    });
  }
}


const getAllMembers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    const skip = (page - 1) * limit;

    let filter = { 
      role: { 
        $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
              "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
              "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
              "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
              "EnvironmentalSecretary", "ExecutiveMember"] 
      } 
    };

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { membershipId: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      filter.isActive = status === 'active';
    }

    const members = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    if (!members || members.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No members found in the system",
      });
    }

    return res.status(200).json({
      success: true,
      count: members.length,
      total,
      members,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("Error fetching members:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching members",
      error: err.message,
    });
  }
};

// ✅ Get member by ID
const getMemberById = async (req, res) => {
  try {
    const member = await User.findOne({
      _id: req.params.id,
      role: { 
        $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
              "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
              "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
              "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
              "EnvironmentalSecretary", "ExecutiveMember"] 
      }
    }).select("-password");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found.",
      });
    }

    // Get subscription history
    const subscriptions = await Subscription.find({ member: member._id })
      .sort({ month: -1 })
      .limit(12);

    res.status(200).json({
      success: true,
      member: {
        ...member.toObject(),
        subscriptionHistory: subscriptions
      }
    });
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching member details.",
      error: error.message,
    });
  }
};

// ✅ Update member details
const updateMember = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { 
        _id: req.params.id,
        role: { 
          $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
                "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
                "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
                "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
                "EnvironmentalSecretary", "ExecutiveMember"] 
        }
      },
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Member not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully.",
      member: updated,
    });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating member.",
      error: error.message,
    });
  }
};

// ✅ Delete member
const deleteMember = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({
      _id: req.params.id,
      role: { 
        $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
              "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
              "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
              "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
              "EnvironmentalSecretary", "ExecutiveMember"] 
      }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Member not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting member.",
      error: error.message,
    });
  }
};

// ✅ Get member statistics
const getMemberStats = async (req, res) => {
  try {
    const totalMembers = await User.countDocuments({
      role: { 
        $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
              "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
              "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
              "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
              "EnvironmentalSecretary", "ExecutiveMember"] 
      }
    });

    const activeMembers = await User.countDocuments({
      role: { 
        $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", 
              "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", 
              "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", 
              "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", 
              "EnvironmentalSecretary", "ExecutiveMember"] 
      },
      isActive: true
    });

    const newMembersThisMonth = await User.countDocuments({
      role: { 
        $in: ["Member", "PlotOwner"] 
      },
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    const currentMonth = new Date().toISOString().slice(0, 7);
    const paidSubscriptions = await Subscription.countDocuments({
      month: currentMonth,
      status: "Completed"
    });

    res.json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        inactiveMembers: totalMembers - activeMembers,
        newMembersThisMonth,
        paidSubscriptions,
        paymentRate: totalMembers > 0 ? ((paidSubscriptions / totalMembers) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error("Member stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching member statistics",
      error: error.message
    });
  }
};
// ✅ Get pending registration requests
const getPendingRegistrations = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    let filter = { 
      membershipStatus: "pending", // Only pending approvals
      role: { 
        $in: ["Member", "PlotOwner"] // Only regular members and plot owners
      } 
    };

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const registrations = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      registrations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching pending registrations:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching registration requests",
      error: error.message,
    });
  }
};

// ✅ Approve member registration
const approveMemberRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await User.findOneAndUpdate(
      { 
        _id: id,
        membershipStatus: "pending" // Only approve pending members
      },
      { 
        membershipStatus: "active",
        isActive: true,
        approvedAt: new Date(),
        approvedBy: req.user.userId
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Pending member registration not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member registration approved successfully.",
      member,
    });
  } catch (error) {
    console.error("Error approving member:", error);
    res.status(500).json({
      success: false,
      message: "Server error while approving member registration.",
      error: error.message,
    });
  }
};

// ✅ Reject member registration
const rejectMemberRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await User.findOneAndUpdate(
      { 
        _id: id,
        membershipStatus: "pending" // Only reject pending members
      },
      { 
        membershipStatus: "rejected",
        isActive: false,
        rejectedAt: new Date(),
        rejectedBy: req.user.userId,
        rejectionReason: req.body.reason || "No reason provided"
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Pending member registration not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member registration rejected successfully.",
      member,
    });
  } catch (error) {
    console.error("Error rejecting member:", error);
    res.status(500).json({
      success: false,
      message: "Server error while rejecting member registration.",
      error: error.message,
    });
  }
};



module.exports = {
  createMemberController,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getMemberStats,
  getPendingRegistrations,
  approveMemberRegistration,
  rejectMemberRegistration
};





