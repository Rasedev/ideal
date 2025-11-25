// controllers/announcementController.js
const Announcement = require("../models/announcementSchema");
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");

// Create announcement
const createAnnouncement = async (req, res) => {
  try {
    const { title, message, recipientType, priority, meetingDate, meetingLocation } = req.body;

    // Validate required fields
    if (!title || !message || !recipientType) {
      return res.status(400).json({
        success: false,
        message: "Title, message, and recipient type are required"
      });
    }

    // Get recipients based on type
    let recipients = [];
    let query = { isActive: true };
    
    switch (recipientType) {
      case "All":
        // All active users except specific roles if needed
        break;
      case "Members":
        query.role = { $in: ["Member", "PlotOwner", "President", "ExecutivePresident", "VicePresident", "GeneralSecretary", "JointSecretary", "OrganizingSecretary", "FinanceSecretary", "PublicitySecretary", "OfficeSecretary", "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary", "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary", "ExecutiveMember"] };
        break;
      case "Employees":
        query.role = "Employee";
        break;
      case "PlotOwners":
        query.role = "PlotOwner";
        break;
      case "Committee":
        query.role = { 
          $in: [
            "President", "ExecutivePresident", "VicePresident", 
            "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
            "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
            "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
            "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
            "ExecutiveMember"
          ] 
        };
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid recipient type"
        });
    }

    const users = await User.find(query).select("_id email firstName lastName");
    recipients = users.map(user => ({ user: user._id }));

    const announcement = new Announcement({
      title,
      message,
      sender: req.user._id,
      recipients,
      recipientType,
      priority: priority || "Medium",
      meetingDate: meetingDate || null,
      meetingLocation: meetingLocation || null
    });

    await announcement.save();

    // Send email notifications (in background - don't await)
    sendBulkEmails(announcement, users).catch(err => 
      console.error("Background email error:", err)
    );

    // Populate the response
    const populatedAnnouncement = await Announcement.findById(announcement._id)
      .populate("sender", "firstName lastName committeePosition");

    res.status(201).json({
      success: true,
      message: "Announcement created and sent successfully",
      announcement: populatedAnnouncement
    });
  } catch (error) {
    console.error("Announcement creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating announcement",
      error: error.message
    });
  }
};

// Email sending function
const sendBulkEmails = async (announcement, recipients) => {
  // Check if email configuration exists
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("Email configuration missing - skipping email sending");
    return;
  }

  try {
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const sender = await User.findById(announcement.sender);
    
    // Send emails in batches to avoid rate limiting
    const batchSize = 10;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      
      const emailPromises = batch.map(async (user) => {
        if (user.email) {
          try {
            await transporter.sendMail({
              from: `"Association Management" <${process.env.EMAIL_USER}>`,
              to: user.email,
              subject: `[${announcement.priority}] ${announcement.title}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">Association Announcement</h1>
                  </div>
                  <div style="padding: 20px;">
                    <h2 style="color: #1890ff; margin-bottom: 16px;">${announcement.title}</h2>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                      <p style="margin: 0; line-height: 1.6; font-size: 16px;">${announcement.message}</p>
                    </div>
                    ${announcement.meetingDate ? `
                      <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h3 style="color: #1890ff; margin-top: 0;">Meeting Information:</h3>
                        <p style="margin: 8px 0;"><strong>Date:</strong> ${new Date(announcement.meetingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        ${announcement.meetingLocation ? `<p style="margin: 8px 0;"><strong>Location:</strong> ${announcement.meetingLocation}</p>` : ''}
                      </div>
                    ` : ''}
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                    <p style="color: #666; font-size: 14px;">
                      <strong>Sent by:</strong> ${sender.firstName} ${sender.lastName}${sender.committeePosition ? ` (${sender.committeePosition})` : ''}<br>
                      <strong>Priority:</strong> <span style="color: ${
                        announcement.priority === 'High' ? '#f5222d' : 
                        announcement.priority === 'Urgent' ? '#cf1322' : '#1890ff'
                      };">${announcement.priority}</span>
                    </p>
                  </div>
                </div>
              `
            });
            console.log(`Email sent to: ${user.email}`);
          } catch (emailError) {
            console.error(`Failed to send email to ${user.email}:`, emailError);
          }
        }
      });

      await Promise.allSettled(emailPromises);
      
      // Small delay between batches to avoid rate limiting
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.error("Email sending setup error:", error);
  }
};

// Get user's announcements
const getUserAnnouncements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const announcements = await Announcement.find({
      "recipients.user": req.user._id
    })
    .populate("sender", "firstName lastName committeePosition")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Announcement.countDocuments({
      "recipients.user": req.user._id
    });

    // Mark as read when fetched
    await Announcement.updateMany(
      {
        "recipients.user": req.user._id,
        "recipients.read": false
      },
      {
        $set: { 
          "recipients.$.read": true,
          "recipients.$.readAt": new Date()
        }
      }
    );

    res.json({
      success: true,
      announcements,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get announcements error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching announcements",
      error: error.message
    });
  }
};

// Get single announcement by ID
const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findOne({
      _id: req.params.id,
      "recipients.user": req.user._id
    }).populate("sender", "firstName lastName committeePosition");

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
    }

    // Mark as read
    await Announcement.updateOne(
      {
        _id: req.params.id,
        "recipients.user": req.user._id
      },
      {
        $set: { 
          "recipients.$.read": true,
          "recipients.$.readAt": new Date()
        }
      }
    );

    res.json({
      success: true,
      announcement
    });
  } catch (error) {
    console.error("Get announcement error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching announcement",
      error: error.message
    });
  }
};

// Get announcement statistics
const getAnnouncementStats = async (req, res) => {
  try {
    const totalAnnouncements = await Announcement.countDocuments({
      sender: req.user._id
    });
    
    const readStats = await Announcement.aggregate([
      { $match: { sender: req.user._id } },
      { $unwind: "$recipients" },
      {
        $group: {
          _id: null,
          totalRecipients: { $sum: 1 },
          readRecipients: { 
            $sum: { $cond: ["$recipients.read", 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalAnnouncements,
        totalRecipients: readStats[0]?.totalRecipients || 0,
        readRecipients: readStats[0]?.readRecipients || 0,
        readRate: readStats[0] ? 
          ((readStats[0].readRecipients / readStats[0].totalRecipients) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error("Announcement stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching announcement stats",
      error: error.message
    });
  }
};
// Mark announcement as read by user
const markAsRead = async (req, res) => {
  try {
    const announcementId = req.params.id;
    const userId = req.user._id;

    const announcement = await Announcement.findOne({
      _id: announcementId,
      "recipients.user": userId
    });

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found or not accessible"
      });
    }

    // Mark as read
    await Announcement.updateOne(
      { _id: announcementId, "recipients.user": userId },
      {
        $set: {
          "recipients.$.read": true,
          "recipients.$.readAt": new Date()
        }
      }
    );

    res.json({
      success: true,
      message: "Announcement marked as read"
    });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({
      success: false,
      message: "Error marking announcement as read",
      error: error.message
    });
  }
};


module.exports = {
  createAnnouncement,
  getUserAnnouncements,
  getAnnouncementById,
  getAnnouncementStats,
  sendBulkEmails,
  markAsRead
};