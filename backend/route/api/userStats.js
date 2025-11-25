const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');

const { updateUserStatsOnLogin,getUserStatsController } = require("../../controller/userStatsController");
const  authMiddleware  = require("../../middleware/authMiddleware"); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });



router.get("/stats", authMiddleware, updateUserStatsOnLogin);
router.get("/stats/update", authMiddleware, getUserStatsController);



module.exports = router;

