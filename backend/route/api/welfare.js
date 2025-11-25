// routes/welfare.js
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/authMiddleware");
const roleAuthorize = require("../../middleware/authorizeRoles");

const welfareInitiativeController = require("../../controller/WelfareController");
const aidApplicationController = require("../../controller/aidApplicationController");
const donationController = require("../../controller/donationController");
const welfareReportController = require("../../controller/welfareReportController");

// Welfare Initiatives
router.get("/initiatives", welfareInitiativeController.getInitiatives);
router.post("/initiatives",  welfareInitiativeController.createInitiative);
router.put("/initiatives/:id",  welfareInitiativeController.updateInitiative);

// Aid Applications
router.get("/applications", aidApplicationController.getApplications);
router.post("/applications", aidApplicationController.createApplication);
router.patch("/applications/:id/status",  aidApplicationController.updateApplicationStatus);

// Donations
router.get("/donations", donationController.getDonations);
router.post("/donations", donationController.createDonation);
router.get("/donations/stats", donationController.getDonationStats);

// Reports
router.get("/reports", welfareReportController.getReports);
router.post("/reports",  welfareReportController.createReport);
router.patch("/reports/:id/publish",  welfareReportController.publishReport);

module.exports = router;