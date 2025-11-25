// routes/reports.js
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/authMiddleware");
const roleAuthorize = require("../../middleware/authorizeRoles");
const reportController = require("../../controller/reportController");

// Dashboard
router.get("/dashboard",  reportController.getReportsDashboard);

// Membership Reports
router.get("/membership",  reportController.getMembershipReports);
router.post("/membership",  reportController.createMembershipReport);

// Financial Reports
router.get("/financial",  reportController.getFinancialReports);
router.post("/financial",  reportController.createFinancialReport);

// Welfare Reports
router.get("/welfare",  reportController.getWelfareReports);
router.post("/welfare",  reportController.createWelfareReport);

// Export
router.get("/export",  reportController.exportReport);

module.exports = router;