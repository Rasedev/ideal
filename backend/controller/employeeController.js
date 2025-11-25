


//////////////////////////////Latest Version//////////////////////

//  const Employee = require("../models/employeeSchema");
// const User = require("../models/userSchema");
// const generateEmployeeId = require("../utils/generateEmployeeId");
// const ExcelJS = require("exceljs");




// async function createEmployeeController(req, res) {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       phone,
//       fatherName,
//       birthplace,
//       dob,
//       nidNumber,
//       position,
//       educationalQualification,
//       description,
//       address,
//     } = req.body;

//     // Image
//     const profilePhoto = req.file
//       ? `http://localhost:3000/uploads/${req.file.filename}`
//       : null;

//     // Employment history
//     let employmentHistory = [];
//     if (req.body.employmentHistory) {
//       try {
//         employmentHistory =
//           typeof req.body.employmentHistory === "string"
//             ? JSON.parse(req.body.employmentHistory)
//             : req.body.employmentHistory;
//       } catch (error) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid JSON for employmentHistory",
//           error: error.message,
//         });
//       }
//     }

//     // Check duplicate email
//     const duplicateEmail = await User.findOne({ email });
//     if (duplicateEmail) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     // Validate DOB
//     if (!dob || isNaN(Date.parse(dob))) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid DOB",
//       });
//     }

//     // Generate Employee ID
//     const employeeId = await generateEmployeeId();

//     // Create employee inside USER TABLE
//     const employee = await User.create({
//       firstName,
//       lastName,
//       email,
//       phone,
//       fatherName,
//       birthplace,
//       dob,
//       nidNumber,
//       position,
//       educationalQualification,
//       description,
//       address,
//       profilePhoto,
//       employmentHistory,
//       employeeId,
//       role: "Employee", // IMPORTANT
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Employee created successfully",
//       employee,
//     });
//   } catch (error) {
//     console.error("Employee creation failed:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// }


//   async function getEmployeeByIdController(req, res){
//   try {
//     const employee = await Employee.findById(req.params.id).populate(
//       "userId",
//       "firstName lastName email role"
//     );

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     res.json({ success: true, data: employee });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// async function getAllEmployeesController(req, res){
//   try {
//     const employees = await Employee.find().populate(
//       "userId",
//       "firstName lastName email role"
//     );

//     res.json({ success: true, data: employees });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// async function updateEmployeeController(req, res){
//   try {
//     const { address, salary, ...rest } = req.body;

//     const updates = {
//       ...rest,
//       address: address || {},
//       salary: salary
//         ? {
//             basic: Number(salary.basic),
//             allowances: Number(salary.allowances),
//             deductions: Number(salary.deductions),
//             netSalary:
//               Number(salary.basic) +
//               Number(salary.allowances) -
//               Number(salary.deductions),
//           }
//         : undefined,
//     };

//     const employee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       updates,
//       { new: true }
//     ).populate("userId", "firstName lastName email role");

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     res.json({ success: true, message: "Employee updated", data: employee });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// async function deleteEmployeeController(req, res){
//   try {
//     const employee = await Employee.findById(req.params.id);

//     if (!employee) {
//       return res.status(404).json({ success: false, message: "Employee not found" });
//     }

//     await Employee.findByIdAndDelete(employee._id);

//     res.json({ success: true, message: "Employee deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// async function updateEmployeeStatusController(req, res){
//   try {
//     const { status } = req.body;

//     const employee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Status updated",
//       data: employee,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// async function getEmployeeStatsController(req, res){
//   try {
//     const total = await Employee.countDocuments();
//     const active = await Employee.countDocuments({ status: "active" });
//     const inactive = await Employee.countDocuments({ status: "inactive" });
//     const suspended = await Employee.countDocuments({ status: "suspended" });

//     res.json({
//       success: true,
//       data: { total, active, inactive, suspended },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// async function searchEmployeesController(req, res){
//   try {
//     const { q } = req.query;

//     const employees = await Employee.find({
//       $or: [
//         { employeeId: { $regex: q, $options: "i" } },
//         { department: { $regex: q, $options: "i" } },
//       ],
//     }).populate("userId", "firstName lastName email");

//     res.json({ success: true, data: employees });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// async function exportEmployeesController(req, res){
//   try {
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet("Employees");

//     sheet.columns = [
//       { header: "Employee ID", key: "employeeId", width: 15 },
//       { header: "Name", key: "name", width: 25 },
//       { header: "Email", key: "email", width: 25 },
//       { header: "Department", key: "department", width: 20 },
//       { header: "Position", key: "position", width: 20 },
//       { header: "Status", key: "status", width: 15 },
//     ];

//     const employees = await Employee.find().populate("userId");

//     employees.forEach((emp) => {
//       sheet.addRow({
//         employeeId: emp.employeeId,
//         name: emp.userId.firstName + " " + emp.userId.lastName,
//         email: emp.userId.email,
//         department: emp.department,
//         position: emp.position,
//         status: emp.status,
//       });
//     });

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader("Content-Disposition", "attachment; filename=employees.xlsx");

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
//  async function uploadEmployeeDocumentController(req, res){
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     const employee = await Employee.findById(req.params.id);

//     employee.documents.push({
//       name: req.file.originalname,
//       fileUrl: `/uploads/documents/${req.file.filename}`,
//     });

//     await employee.save();

//     res.json({
//       success: true,
//       message: "Document uploaded successfully",
//       data: employee,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// module.exports = {
//   createEmployeeController,
//   getEmployeeByIdController,
//   getAllEmployeesController,
//   updateEmployeeController,
//   deleteEmployeeController,
//   updateEmployeeStatusController,
//   getEmployeeStatsController,
//   searchEmployeesController,
//   exportEmployeesController,
//   uploadEmployeeDocumentController,
//   // uploadEmployeeDocument
// };




// const { createObjectCsvStringifier } = require("csv-writer");
const Employee = require("../models/employeeSchema");
const generateEmployeeId = require("../utils/generateEmployeeId");

async function createEmployeeController(req, res) {
  try {
    // Log incoming data for debugging
    console.log("📦 Received form data:", req.body);
    console.log("📁 File received:", req.file);
     console.log("🔍 ALL BODY FIELDS RECEIVED:");
    Object.keys(req.body).forEach(key => {
      console.log(`  ${key}:`, req.body[key]);
    });

    // Parse form data - ALL fields should come from req.body
    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      employmentType,
      dob,
      joinDate,
      gender,
      nationality,
      educationalQualification,
      address,
      fatherName,
      nidNumber,
      birthplace,
      description
    } = req.body;

    console.log("🔍 CHECKING REQUIRED FIELDS:");
    console.log("  firstName:", firstName, !!firstName);
    console.log("  email:", email, !!email);
    console.log("  position:", position, !!position);
    console.log("  department:", department, !!department);

    // REQUIRED FIELDS VALIDATION
    if (!firstName || !email || !position || !department) {
      console.log("❌ Missing required fields:", { firstName, email, position, department });
      return res.status(400).json({
        success: false,
        message: "First name, email, position and department are required",
        missing: {
          firstName: !firstName,
          email: !email,
          position: !position,
          department: !department
        }
      });
    }

    // Check duplicate email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ 
        success: false, 
        message: "Employee email already exists" 
      });
    }

// Generate employee ID
    const employeeId = await generateEmployeeId();
    console.log("🆔 Final Employee ID to use:", employeeId);

    // Double-check if this ID already exists (safety net)
    const existingId = await Employee.findOne({ employeeId });
    if (existingId) {
      console.log("⚠️  Generated ID already exists, generating new one...");
      // Generate a different ID using timestamp
      employeeId = `EMP${Date.now().toString().slice(-8)}`;
      console.log("🆔 Using fallback ID:", employeeId);
    }

    // Build employee data
    const employeeData = {
      employeeId,
      firstName: firstName.trim(),
      lastName: (lastName || "").trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      department: department.trim(),
      position: position.trim(),
      employmentType: employmentType || "full-time",
      dob: dob ? new Date(dob) : null,
      joinDate: joinDate ? new Date(joinDate) : new Date(),
      educationalQualification: (educationalQualification || "").trim(),
      address: (address || "").trim(),
      fatherName: (fatherName || "").trim(),
      nidNumber: (nidNumber || "").trim(),
      birthplace: (birthplace || "").trim(),
      description: (description || "").trim(),
      status: "active"
    };

    // Add image if uploaded
    if (req.file) {
      employeeData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      console.log("🖼️ Image URL set to:", employeeData.image);
    }

    console.log("✅ Creating employee with data:", employeeData);

    // Create employee
    const newEmployee = await Employee.create(employeeData);

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: newEmployee
    });

  } catch (error) {
    console.error("❌ Employee creation failed:", error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      
      if (field === 'employeeId') {
        return res.status(400).json({
          success: false,
          message: `Employee ID ${value} already exists. Please try again.`,
          duplicateField: field
        });
      } else if (field === 'email') {
        return res.status(400).json({
          success: false,
          message: `Email ${value} already exists.`,
          duplicateField: field
        });
      }
    }
    
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors: messages 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

// Get all employees
async function getAllEmployeesController(req, res) {
  try {
    const employees = await Employee.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    // Calculate stats
    const total = employees.length;
    const active = employees.filter(emp => emp.status === 'active').length;
    const inactive = employees.filter(emp => emp.status === 'inactive').length;
    const terminated = employees.filter(emp => emp.status === 'terminated').length;

    res.status(200).json({
      success: true,
      data: {
        employees,
        summary: {
          total,
          active,
          inactive,
          terminated
        }
      }
    });
  } catch (error) {
    console.error("Get employees error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch employees" 
    });
  }
}

// async function getEmployeeByIdController(req, res) {
//   try {
//     const { id } = req.params;
    
//     const employee = await Employee.findById(id);
    
//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: employee
//     });
//   } catch (error) {
//     console.error("Get employee by ID error:", error);
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid employee ID"
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch employee details"
//     });
//   }
// }

// Update Employee

// In your employeeController.js - Update getEmployeeByIdController


async function getEmployeeByIdController(req, res) {
  try {
    const { id } = req.params;
    
    // ✅ ADD VALIDATION FOR OBJECTID
    if (!id || id === 'attendance' || id === 'stats' || id === 'search' || id === 'export') {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }

    // ✅ PROPER OBJECTID VALIDATION
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID format"
      });
    }
    
    const employee = await Employee.findById(id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error("Get employee by ID error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee details"
    });
  }
}


async function updateEmployeeController(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log("🔄 Updating employee:", id);
    console.log("📝 Update data:", updates);

    // Remove fields that shouldn't be updated directly
    delete updates.employeeId;
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;

    // Handle image update
    if (req.file) {
      updates.image = `${req.protocol}://${req.get("host")}/uploads/employees/${req.file.filename}`;
    }

    // Parse dates if they exist
    if (updates.dob) updates.dob = new Date(updates.dob);
    if (updates.joinDate) updates.joinDate = new Date(updates.joinDate);

    // Parse employment history if it's a string
    if (updates.employmentHistory && typeof updates.employmentHistory === 'string') {
      try {
        updates.employmentHistory = JSON.parse(updates.employmentHistory);
      } catch (parseError) {
        console.error("Error parsing employment history:", parseError);
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updates,
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee
    });
  } catch (error) {
    console.error("Update employee error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update employee"
    });
  }
}

// Update Employee Status
async function updateEmployeeStatusController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['active', 'inactive', 'terminated'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required (active, inactive, terminated)"
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `Employee status updated to ${status}`,
      data: updatedEmployee
    });
  } catch (error) {
    console.error("Update employee status error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update employee status"
    });
  }
}

// Delete Employee
async function deleteEmployeeController(req, res) {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: deletedEmployee
    });
  } catch (error) {
    console.error("Delete employee error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete employee"
    });
  }
}

// Get Employee Statistics
async function getEmployeeStatsController(req, res) {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'active' });
    const inactiveEmployees = await Employee.countDocuments({ status: 'inactive' });
    const terminatedEmployees = await Employee.countDocuments({ status: 'terminated' });

    // Department statistics
    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Employment type statistics
    const employmentTypeStats = await Employee.aggregate([
      {
        $group: {
          _id: '$employmentType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent hires (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentHires = await Employee.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        summary: {
          total: totalEmployees,
          active: activeEmployees,
          inactive: inactiveEmployees,
          terminated: terminatedEmployees,
          recentHires
        },
        departments: departmentStats,
        employmentTypes: employmentTypeStats
      }
    });
  } catch (error) {
    console.error("Get employee stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee statistics"
    });
  }
}

// Search Employees
async function searchEmployeesController(req, res) {
  try {
    const { q, department, status, employmentType } = req.query;
    
    let filter = {};

    // Text search across multiple fields
    if (q) {
      filter.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { position: { $regex: q, $options: 'i' } },
        { employeeId: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by department
    if (department) {
      filter.department = department;
    }

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by employment type
    if (employmentType) {
      filter.employmentType = employmentType;
    }

    const employees = await Employee.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      data: {
        employees,
        total: employees.length,
        filters: {
          query: q,
          department,
          status,
          employmentType
        }
      }
    });
  } catch (error) {
    console.error("Search employees error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search employees"
    });
  }
}

// Export Employees
async function exportEmployeesController(req, res) {
  try {
    const employees = await Employee.find()
      .sort({ createdAt: -1 })
      .select('-__v -description');

    // Convert to CSV format (simplified)
    const csvData = employees.map(emp => ({
      EmployeeID: emp.employeeId,
      FirstName: emp.firstName,
      LastName: emp.lastName,
      Email: emp.email,
      Phone: emp.phone,
      Position: emp.position,
      Department: emp.department,
      EmploymentType: emp.employmentType,
      Status: emp.status,
      JoinDate: emp.joinDate,
      DateOfBirth: emp.dob
    }));

    res.status(200).json({
      success: true,
      data: csvData,
      message: "Employee data ready for export",
      total: employees.length
    });

  } catch (error) {
    console.error("Export employees error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export employee data"
    });
  }
}

// Upload Employee Document
async function uploadEmployeeDocumentController(req, res) {
  try {
    const { id } = req.params;
    const { documentType } = req.body;

    console.log("📄 Document upload request:", { id, documentType });
    console.log("📁 File received:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No document file provided"
      });
    }

    // Check if employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    const documentUrl = `${req.protocol}://${req.get("host")}/uploads/documents/${req.file.filename}`;

    // Create document object
    const newDocument = {
      name: documentType || req.file.originalname,
      fileUrl: documentUrl,
      uploadDate: new Date(),
      documentType: documentType || 'other'
    };

    // Update employee with document info
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $push: {
          documents: newDocument
        }
      },
      { new: true }
    );

    console.log("✅ Document uploaded successfully:", newDocument);

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      data: {
        document: newDocument,
        employee: {
          id: updatedEmployee._id,
          name: `${updatedEmployee.firstName} ${updatedEmployee.lastName}`
        }
      }
    });
  } catch (error) {
    console.error("❌ Upload document error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to upload document"
    });
  }
}


module.exports = {
  createEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController,
  updateEmployeeStatusController,
  deleteEmployeeController,
  getEmployeeStatsController,
  searchEmployeesController,
  exportEmployeesController,
  uploadEmployeeDocumentController
};













