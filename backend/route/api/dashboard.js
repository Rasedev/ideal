// const express = require("express");
// const {discountController, getDiscountController} = require("../../controller/discountController");

// const router = express.Router();

// router.post("/creatediscount", discountController);
// router.get("/getdiscounts", getDiscountController);
 
// module.exports = router; 



const express = require("express");
const router = express.Router();
const { getDashboardStats, getDashboardActions } = require("../../controller/dashboardController");
//const verifyToken = require("../../middleware/verifyToken"); // optional

router.get("/stats",  getDashboardStats);
router.get("/actions",  getDashboardActions);

module.exports = router;





