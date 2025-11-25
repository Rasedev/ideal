const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const User = require("../models/userSchema");
const Association = require("../models/associationSchems");

const generateNoticePDF = async (req, res) => {
  try {
    const { title, message, recipientIds, noticeType, meetingDate, meetingLocation } = req.body;
    const senderId = req.user.id;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required"
      });
    }

    // Get sender and association info
    const sender = await User.findById(senderId);
    const association = await Association.findOne();

    // Create PDF
    const doc = new PDFDocument();
    const filename = `notice_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../uploads/notices', filename);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Pipe PDF to file
    doc.pipe(fs.createWriteStream(filePath));

    // Header
    doc.fillColor('#1890ff')
       .fontSize(20)
       .text(association?.name || 'Alamgir Hossain Kalyan Samity', 50, 50, { align: 'center' });
    
    doc.fillColor('#000000')
       .fontSize(12)
       .text(association?.headOffice || 'Alamgir Hossain City, Kishoreganj', 50, 80, { align: 'center' });

    // Title
    doc.fontSize(16)
       .text('OFFICIAL NOTICE', 50, 120, { align: 'center', underline: true });

    // Notice details
    doc.fontSize(12)
       .text(`Title: ${title}`, 50, 160)
       .text(`Notice Type: ${noticeType || 'General'}`, 50, 180)
       .text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 50, 200);

    if (meetingDate) {
      doc.text(`Meeting Date: ${new Date(meetingDate).toLocaleDateString('en-GB')}`, 50, 220);
    }
    if (meetingLocation) {
      doc.text(`Meeting Location: ${meetingLocation}`, 50, 240);
    }

    // Message content
    doc.text('Message:', 50, 280)
       .fontSize(10)
       .text(message, 50, 300, { 
         width: 500,
         align: 'justify'
       });

    // Footer
    const yPosition = doc.y + 50;
    doc.fontSize(10)
       .text(`Issued By: ${sender.firstName} ${sender.lastName}`, 50, yPosition)
       .text(`Designation: ${sender.committeePosition || sender.role}`, 50, yPosition + 20)
       .text(`Contact: ${association?.contactEmail || 'alamgircitysamity@gmail.com'}`, 50, yPosition + 40);

    doc.end();

    // Wait for PDF to be generated
    await new Promise((resolve) => {
      doc.on('end', resolve);
    });

    res.status(201).json({
      success: true,
      message: "Notice generated successfully",
      data: {
        filename,
        filePath: `/uploads/notices/${filename}`,
        downloadUrl: `http://localhost:3000/uploads/notices/${filename}`
      }
    });

  } catch (error) {
    console.error("Generate notice error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate notice",
      error: error.message
    });
  }
};

const sendBulkNotice = async (req, res) => {
  try {
    const { title, message, recipientType, recipientIds, noticeType, meetingDate, meetingLocation } = req.body;
    const senderId = req.user.id;

    // Generate PDF first
    const pdfResult = await generateNoticePDF(req, res, true);

    // Here you would typically:
    // 1. Save notice to database
    // 2. Send emails with PDF attachment
    // 3. Create notifications for users
    // 4. Store in announcement collection

    res.status(201).json({
      success: true,
      message: "Bulk notice sent successfully",
      data: pdfResult.data
    });

  } catch (error) {
    console.error("Send bulk notice error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send bulk notice",
      error: error.message
    });
  }
};

module.exports = {
  generateNoticePDF,
  sendBulkNotice
};