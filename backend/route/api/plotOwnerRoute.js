const express = require("express");
const router = express.Router();
const {getAllPlotOwners,getPlotOwnerById,updatePlotOwner,deletePlotOwner,getPlotOwnerStats,createPlotOwner
} = require("../../controller/plotOwnerController");
const authMiddleware = require("../../middleware/authMiddleware");
const authorizeRoles = require("../../middleware/authorizeRoles");




// Plot owner management routes
router.post("/create", createPlotOwner);
router.get("/allplotowner",  getAllPlotOwners);
router.get("/plotownerid/:id",  getPlotOwnerById);
router.put("/updateplotowner/:id",  updatePlotOwner);
router.delete("/deleteplotowner/:id",  deletePlotOwner);
// router.put("/updateplotowner/:id",  authMiddleware("Admin", "HR"), updatePlotOwner);
// router.delete("/deleteplotowner/:id",  authMiddleware("Admin"), deletePlotOwner);
router.get("/plotownerstats/overview",  getPlotOwnerStats);

module.exports = router;