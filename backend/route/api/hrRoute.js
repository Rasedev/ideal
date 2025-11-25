const express = require("express");
const router = express.Router();
const {createHRProfile,getHRProfile,becomeHrController,getAllHrController,getHRStats
} = require("../../controller/hrController");
const authMiddleware = require("../../middleware/authMiddleware");
const authorizeRoles = require("../../middleware/authorizeRoles");

// HR management routes
router.post("/createhr",  createHRProfile);
router.get("/hrprofile",  getHRProfile);
router.post("/become-hr", becomeHrController);
router.get("/allhr",  getAllHrController);
router.get("/hrstats",  getHRStats);

module.exports = router;