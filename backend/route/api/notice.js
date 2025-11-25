const express = require("express");
const router = express.Router();
const {
  generateNoticePDF,
  sendBulkNotice
} = require("../../controller/noticeController");
const { protect, authorize } = require("../../middleware/authMiddleware");


router.post("/generate", generateNoticePDF);
router.post("/send-bulk", sendBulkNotice);

module.exports = router;