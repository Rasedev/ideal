


// backend/utils/generateEmployeeId.js - ALTERNATIVE VERSION
const Employee = require('../models/employeeSchema');

module.exports = async function generateEmployeeId() {
  try {
    const prefix = "EMP";
    const year = new Date().getFullYear().toString().slice(-2);

    // Get all employees with current year prefix and sort by sequence number
    const employees = await Employee.find(
      { 
        employeeId: { $regex: `^${prefix}${year}` } 
      },
      { employeeId: 1 }
    ).sort({ employeeId: -1 }).limit(1);

    let nextSequence = 1;

    if (employees.length > 0) {
      const lastEmployeeId = employees[0].employeeId;
      console.log("📊 Last Employee ID:", lastEmployeeId);
      
      // Extract sequence number (last 4 digits)
      const sequencePart = lastEmployeeId.slice(5); // Remove "EMP24"
      const lastSequence = parseInt(sequencePart);
      
      if (!isNaN(lastSequence)) {
        nextSequence = lastSequence + 1;
      }
    }

    const newEmployeeId = `${prefix}${year}${String(nextSequence).padStart(4, "0")}`;
    
    console.log("🆔 Generated New Employee ID:", newEmployeeId);
    return newEmployeeId;

  } catch (error) {
    console.error("❌ Error generating employee ID:", error);
    // Emergency fallback
    return `EMP${year}${Date.now().toString().slice(-4)}`;
  }
};
