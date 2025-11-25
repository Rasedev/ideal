// routes/legal.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleAuth = require("../middleware/roleAuth");
const legalController = require("../controllers/legalController");

// Dashboard
router.get("/dashboard", auth, roleAuth(["admin"]), legalController.getLegalDashboard);

// Constitution
router.get("/constitution", auth, legalController.getConstitution);
router.post("/constitution", auth, roleAuth(["admin"]), legalController.createConstitution);
router.put("/constitution/:id", auth, roleAuth(["admin"]), legalController.updateConstitution);

// Licenses
router.get("/licenses", auth, legalController.getLicenses);
router.post("/licenses", auth, roleAuth(["admin"]), legalController.createLicense);
router.put("/licenses/:id", auth, roleAuth(["admin"]), legalController.updateLicense);

// Agreements
router.get("/agreements", auth, legalController.getAgreements);
router.post("/agreements", auth, roleAuth(["admin"]), legalController.createAgreement);
router.put("/agreements/:id", auth, roleAuth(["admin"]), legalController.updateAgreement);

module.exports = router;