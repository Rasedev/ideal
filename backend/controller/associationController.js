const Association = require("../models/associationSchems");


async function createAssociationController(req, res) {
  try {
    // Check if an association already exists
    const existingAssociation = await Association.findOne();
    if (existingAssociation) {
      return res.status(400).json({
        success: false,
        message: "Association already exists",
        data: existingAssociation,
      });
    }

    // Destructure allowed fields from req.body
    const {
      associationName,
      headOffice,
      description,
      associationAddress,
      contactEmail,
      contactPhone,
      memberNumber,
      plotNumber,
      established,
      monthlySubscriptionAmount,
      logo,
      officeHours,
      totalMembers,
      totalEmployees,
      totalPlotOwners,
      isActive
    } = req.body;

    // Create a new association document
    const newAssociation = await Association.create({
      associationName,
      headOffice,
      description,
      associationAddress,
      contactEmail,
      contactPhone,
      memberNumber,
      plotNumber,
      established,
      monthlySubscriptionAmount,
      logo,
      officeHours,
      totalMembers,
      totalEmployees,
      totalPlotOwners,
      isActive
    });

    res.status(201).json({
      success: true,
      message: "Association created successfully",
      data: newAssociation,
    });
  } catch (error) {
    console.error("Create Association Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating association",
    });
  }
}

async function getAssociationController(req, res) {
  try {
    const association = await Association.findOne(); // or .getAssociation() if you have that static method
    if (!association) {
      return res.status(404).json({ success: false, message: "No association found" });
    }

    res.status(200).json({
      success: true,
      data: association,
    });
  } catch (error) {
    console.error("Get Association Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching association",
    });
  }
}

async function updateAssociationController(req, res) {
  try {
    const association = await Association.findOne();
    if (!association) {
      return res.status(404).json({ success: false, message: "No association found" });
    }

    // Destructure the allowed fields from req.body
    const {
      associationName,
      headOffice,
      description,
      address,
      contactEmail,
      contactPhone,
      memberNumber,
      plotNumber,
      established,
      monthlySubscriptionAmount,
      logo,
      officeHours,
      totalMembers,
      totalEmployees,
      totalPlotOwners,
      isActive
    } = req.body;

    // Build an update object dynamically
    const updateData = {
      associationName,
      headOffice,
      description,
      address,
      contactEmail,
      contactPhone,
      memberNumber,
      plotNumber,
      established,
      monthlySubscriptionAmount,
      logo,
      officeHours,
      totalMembers,
      totalEmployees,
      totalPlotOwners,
      isActive
    };

    // Remove undefined fields so they don't overwrite existing data
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedAssociation = await Association.findByIdAndUpdate(
      association._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Association updated successfully",
      data: updatedAssociation,
    });
  } catch (error) {
    console.error("Update Association Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating association",
    });
  }
}


module.exports = {createAssociationController, getAssociationController, updateAssociationController };








