



const express = require("express");
const router = express.Router();
const { createAssociationController,
  getAssociationController, 
  updateAssociationController 
} = require("../../controller/associationController");

// ✅ POSTMAN test: http://localhost:3000/api/v1/association/getassociation

router.post("/associationtest",  createAssociationController);
router.get("/getassociation", getAssociationController);
router.put("/updateassociation", updateAssociationController);

module.exports = router;

