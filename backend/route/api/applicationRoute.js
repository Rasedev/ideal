const express = require("express");
const router = express.Router();
const {createApplication,getAllApplications,updateApplicationStatus, getApplicationById,getMyApplications,getApplicationStats
} = require("../../controller/applicationController");
const { protect } = require("../../middleware/authMiddleware");
const authorizeRoles = require("../../middleware/authorizeRoles");

// Application routes
router.post("/create", createApplication);
router.get("/my-applications", getMyApplications);
router.get("/all",  getAllApplications);
router.get("/:id",  getApplicationById);
router.put("/update-status/:id", updateApplicationStatus);
router.get("/stats/overview", getApplicationStats);

module.exports = router;