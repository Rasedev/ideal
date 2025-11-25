// // controllers/smsController.js
// const SMSMessage = require("../models/smsSchema");
// const User = require("../models/userSchema");
// const mongoose = require("mongoose");

// // Send single SMS
// const sendSMS = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { phoneNumber, message, messageType = "notification" } = req.body;
//     const senderId = req.user.userId;

//     // Validation
//     if (!phoneNumber || !message?.trim()) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         success: false,
//         message: "Phone number and message are required"
//       });
//     }

//     // Validate phone number format (basic validation)
//     const phoneRegex = /^[0-9+\-\s()]{10,}$/;
//     if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         success: false,
//         message: "Invalid phone number format"
//       });
//     }

//     // Create SMS record
//     const sms = new SMSMessage({
//       recipientPhone: phoneNumber,
//       message: message.trim(),
//       messageType,
//       sentBy: senderId,
//       status: "pending"
//     });

//     await sms.save({ session });

//     // 🔥 INTEGRATION: Send to actual SMS gateway (Twilio, etc.)
//     const gatewayResult = await sendToSMSGateway(phoneNumber, message.trim());
    
//     // Update SMS status based on gateway response
//     sms.status = gatewayResult.success ? "sent" : "failed";
//     sms.sentAt = new Date();
//     sms.gatewayResponse = gatewayResult;
//     sms.cost = gatewayResult.cost || 0;

//     await sms.save({ session });
//     await session.commitTransaction();

//     res.status(201).json({
//       success: true,
//       message: `SMS ${gatewayResult.success ? 'sent' : 'failed'} successfully`,
//       data: {
//         smsId: sms._id,
//         recipient: phoneNumber,
//         status: sms.status,
//         cost: sms.cost,
//         gatewayResponse: gatewayResult
//       }
//     });

//   } catch (error) {
//     await session.abortTransaction();
//     console.error("Send SMS error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send SMS",
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   } finally {
//     session.endSession();
//   }
// };

// // Send bulk SMS to multiple users
// const sendBulkSMS = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { userIds, message, messageType = "announcement" } = req.body;
//     const senderId = req.user.userId;

//     if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         success: false,
//         message: "User IDs array is required"
//       });
//     }

//     if (!message?.trim()) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         success: false,
//         message: "Message is required"
//       });
//     }

//     // Get users with phone numbers
//     const users = await User.find({
//       _id: { $in: userIds },
//       phone: { $exists: true, $ne: "" }
//     }).select("firstName lastName phone").session(session);

//     if (users.length === 0) {
//       await session.abortTransaction();
//       return res.status(404).json({
//         success: false,
//         message: "No users with valid phone numbers found"
//       });
//     }

//     const smsPromises = users.map(user => 
//       new SMSMessage({
//         recipientPhone: user.phone,
//         recipientName: `${user.firstName} ${user.lastName}`,
//         message: message.trim(),
//         messageType,
//         sentBy: senderId,
//         status: "pending"
//       }).save({ session })
//     );

//     const smsRecords = await Promise.all(smsPromises);

//     // Send to SMS gateway in batches (to avoid rate limiting)
//     const BATCH_SIZE = 10;
//     const results = [];

//     for (let i = 0; i < smsRecords.length; i += BATCH_SIZE) {
//       const batch = smsRecords.slice(i, i + BATCH_SIZE);
//       const batchPromises = batch.map(async (sms) => {
//         try {
//           const gatewayResult = await sendToSMSGateway(sms.recipientPhone, sms.message);
          
//           sms.status = gatewayResult.success ? "sent" : "failed";
//           sms.sentAt = new Date();
//           sms.gatewayResponse = gatewayResult;
//           sms.cost = gatewayResult.cost || 0;

//           await sms.save({ session });
//           return { success: true, smsId: sms._id, status: sms.status };
//         } catch (error) {
//           sms.status = "failed";
//           sms.gatewayResponse = { error: error.message };
//           await sms.save({ session });
//           return { success: false, smsId: sms._id, error: error.message };
//         }
//       });

//       const batchResults = await Promise.all(batchPromises);
//       results.push(...batchResults);

//       // Add delay between batches to avoid rate limiting
//       if (i + BATCH_SIZE < smsRecords.length) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       }
//     }

//     await session.commitTransaction();

//     const successCount = results.filter(r => r.success).length;
//     const failedCount = results.length - successCount;

//     res.status(201).json({
//       success: true,
//       message: `Bulk SMS completed: ${successCount} sent, ${failedCount} failed`,
//       data: {
//         total: results.length,
//         successful: successCount,
//         failed: failedCount,
//         results
//       }
//     });

//   } catch (error) {
//     await session.abortTransaction();
//     console.error("Send bulk SMS error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send bulk SMS",
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   } finally {
//     session.endSession();
//   }
// };

// // Get SMS history with filters
// const getSMSHistory = async (req, res) => {
//   try {
//     const { page = 1, limit = 50, status, messageType, startDate, endDate } = req.query;
//     const senderId = req.user.userId;

//     const filter = { sentBy: senderId };

//     // Add filters
//     if (status) filter.status = status;
//     if (messageType) filter.messageType = messageType;
//     if (startDate || endDate) {
//       filter.createdAt = {};
//       if (startDate) filter.createdAt.$gte = new Date(startDate);
//       if (endDate) filter.createdAt.$lte = new Date(endDate);
//     }

//     const smsMessages = await SMSMessage.find(filter)
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .lean();

//     const total = await SMSMessage.countDocuments(filter);
//     const totalCost = await SMSMessage.aggregate([
//       { $match: filter },
//       { $group: { _id: null, total: { $sum: "$cost" } } }
//     ]);

//     res.status(200).json({
//       success: true,
//       data: smsMessages,
//       summary: {
//         totalCost: totalCost[0]?.total || 0,
//         totalSent: await SMSMessage.countDocuments({ ...filter, status: "sent" }),
//         totalFailed: await SMSMessage.countDocuments({ ...filter, status: "failed" })
//       },
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });

//   } catch (error) {
//     console.error("Get SMS history error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch SMS history",
//       error: error.message
//     });
//   }
// };

// // SMS statistics
// const getSMSStats = async (req, res) => {
//   try {
//     const senderId = req.user.userId;
//     const { days = 30 } = req.query;

//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - parseInt(days));

//     const stats = await SMSMessage.aggregate([
//       {
//         $match: {
//           sentBy: mongoose.Types.ObjectId(senderId),
//           createdAt: { $gte: startDate }
//         }
//       },
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//           totalCost: { $sum: "$cost" }
//         }
//       }
//     ]);

//     const totalStats = await SMSMessage.aggregate([
//       {
//         $match: { sentBy: mongoose.Types.ObjectId(senderId) }
//       },
//       {
//         $group: {
//           _id: null,
//           totalMessages: { $sum: 1 },
//           totalCost: { $sum: "$cost" }
//         }
//       }
//     ]);

//     const formattedStats = {
//       sent: 0,
//       failed: 0,
//       pending: 0,
//       totalCost: 0
//     };

//     stats.forEach(stat => {
//       formattedStats[stat._id] = stat.count;
//       formattedStats.totalCost += stat.totalCost;
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         period: `${days} days`,
//         ...formattedStats,
//         totalMessages: totalStats[0]?.totalMessages || 0,
//         overallCost: totalStats[0]?.totalCost || 0
//       }
//     });

//   } catch (error) {
//     console.error("Get SMS stats error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch SMS statistics",
//       error: error.message
//     });
//   }
// };

// // 🔥 SMS Gateway Integration (Example with Twilio)
// const sendToSMSGateway = async (phoneNumber, message) => {
//   try {
//     // Example with Twilio (install: npm install twilio)
//     /*
//     const twilio = require('twilio');
//     const client = twilio(
//       process.env.TWILIO_ACCOUNT_SID,
//       process.env.TWILIO_AUTH_TOKEN
//     );

//     const result = await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phoneNumber
//     });

//     return {
//       success: true,
//       messageId: result.sid,
//       cost: result.price ? parseFloat(result.price) * -1 : 0.05, // Example cost
//       gateway: "twilio",
//       response: result
//     };
//     */

//     // Mock implementation for development
//     console.log(`📱 [SMS GATEWAY MOCK] Sending to ${phoneNumber}: ${message}`);
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     // Simulate 90% success rate for testing
//     const success = Math.random() > 0.1;
    
//     return {
//       success,
//       messageId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       cost: success ? 0.05 : 0, // $0.05 per SMS
//       gateway: "mock",
//       response: {
//         status: success ? "delivered" : "failed",
//         error: success ? null : "Mock gateway failure"
//       }
//     };

//   } catch (error) {
//     console.error("SMS gateway error:", error);
//     return {
//       success: false,
//       error: error.message,
//       cost: 0
//     };
//   }
// };

// module.exports = {
//   sendSMS,
//   sendBulkSMS,
//   getSMSHistory,
//   getSMSStats
// };









// controllers/smsController.js




const SMSMessage = require('../models/smsSchema');
const SmsCampaign = require('../models/smsCampaignSchema');
const User = require('../models/userSchema');

// Professional SMS Gateway Integration
class SMSGateway {
  constructor() {
    this.gateways = {
      twilio: this.twilioGateway,
      plivo: this.plivoGateway,
      bandwidth: this.bandwidthGateway,
      mock: this.mockGateway // For development
    };
  }

  // Twilio Integration
  async twilioGateway(phoneNumber, message, config) {
    const twilio = require('twilio');
    const client = twilio(config.accountSid, config.authToken);

    try {
      const result = await client.messages.create({
        body: message,
        from: config.phoneNumber,
        to: phoneNumber
      });

      return {
        success: true,
        messageId: result.sid,
        status: result.status,
        cost: result.price ? parseFloat(result.price) * -1 : 0.05,
        gateway: "twilio",
        response: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        gateway: "twilio"
      };
    }
  }

  // Plivo Integration
  async plivoGateway(phoneNumber, message, config) {
    const plivo = require('plivo');
    const client = new plivo.Client(config.authId, config.authToken);

    try {
      const result = await client.messages.create(
        config.sourceNumber,
        phoneNumber,
        message
      );

      return {
        success: true,
        messageId: result.messageUuid[0],
        status: 'sent',
        cost: 0.03, // Example cost
        gateway: "plivo",
        response: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        gateway: "plivo"
      };
    }
  }

  // Mock Gateway for Development
  async mockGateway(phoneNumber, message, config) {
    console.log(`📱 [SMS MOCK] Sending to ${phoneNumber}: ${message}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate 95% success rate for testing
    const success = Math.random() > 0.05;
    
    return {
      success,
      messageId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      cost: success ? 0.02 : 0,
      gateway: "mock",
      status: success ? "delivered" : "failed",
      response: {
        status: success ? "delivered" : "failed",
        error: success ? null : "Mock gateway failure"
      }
    };
  }

  // Main send method
  async send(phoneNumber, message, gatewayName = 'mock') {
    const gateway = this.gateways[gatewayName];
    if (!gateway) {
      throw new Error(`SMS gateway '${gatewayName}' not supported`);
    }

    const config = {
      twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER
      },
      plivo: {
        authId: process.env.PLIVO_AUTH_ID,
        authToken: process.env.PLIVO_AUTH_TOKEN,
        sourceNumber: process.env.PLIVO_SOURCE_NUMBER
      },
      mock: {}
    };

    return await gateway(phoneNumber, message, config[gatewayName]);
  }
}

const smsGateway = new SMSGateway();

// Send single SMS
const sendSMS = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { phoneNumber, message, recipientId, gateway = 'mock' } = req.body;
    const senderId = req.user.userId;

    // Validate permissions
    if (!req.user.permissions.canSendMessages) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: "You don't have permission to send SMS"
      });
    }

    let recipientInfo = {};

    // If recipientId is provided, get user details
    if (recipientId) {
      const user = await User.findById(recipientId).session(session);
      if (!user) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: "Recipient not found"
        });
      }

      // Check recipient's contact preferences
      if (!user.contactPreferences.smsEnabled) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: "Recipient has SMS notifications disabled"
        });
      }

      const primaryPhone = user.getPrimaryPhone();
      if (!primaryPhone) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: "Recipient has no verified phone number"
        });
      }

      recipientInfo = {
        userId: user._id,
        recipientName: `${user.firstName} ${user.lastName}`,
        phoneNumber: primaryPhone
      };
    } else {
      // Direct phone number provided
      if (!phoneNumber) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: "Phone number or recipient ID is required"
        });
      }
      recipientInfo = { phoneNumber };
    }

    // Create SMS record
    const sms = new SMSMessage({
      recipientPhone: recipientInfo.phoneNumber,
      recipientName: recipientInfo.recipientName,
      recipientId: recipientInfo.userId,
      message: message.trim(),
      messageType: "manual",
      sentBy: senderId,
      status: "pending",
      gateway
    });

    await sms.save({ session });

    // Send via SMS gateway
    const gatewayResult = await smsGateway.send(
      recipientInfo.phoneNumber, 
      message.trim(), 
      gateway
    );
    
    // Update SMS status
    sms.status = gatewayResult.success ? "sent" : "failed";
    sms.sentAt = new Date();
    sms.gatewayResponse = gatewayResult;
    sms.cost = gatewayResult.cost || 0;

    if (gatewayResult.success) {
      sms.deliveredAt = new Date();
    }

    await sms.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: `SMS ${gatewayResult.success ? 'sent' : 'failed'} successfully`,
      data: {
        smsId: sms._id,
        recipient: recipientInfo.recipientName || recipientInfo.phoneNumber,
        phoneNumber: recipientInfo.phoneNumber,
        status: sms.status,
        cost: sms.cost,
        gateway: gatewayResult.gateway
      }
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("Send SMS error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send SMS",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    session.endSession();
  }
};

// Send bulk SMS to multiple users
const sendBulkSMS = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userIds, message, messageType = "announcement" } = req.body;
    const senderId = req.user.userId;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "User IDs array is required"
      });
    }

    if (!message?.trim()) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    // Get users with phone numbers
    const users = await User.find({
      _id: { $in: userIds },
      phone: { $exists: true, $ne: "" }
    }).select("firstName lastName phone").session(session);

    if (users.length === 0) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "No users with valid phone numbers found"
      });
    }

    const smsPromises = users.map(user => 
      new SMSMessage({
        recipientPhone: user.phone,
        recipientName: `${user.firstName} ${user.lastName}`,
        message: message.trim(),
        messageType,
        sentBy: senderId,
        status: "pending"
      }).save({ session })
    );

    const smsRecords = await Promise.all(smsPromises);

    // Send to SMS gateway in batches (to avoid rate limiting)
    const BATCH_SIZE = 10;
    const results = [];

    for (let i = 0; i < smsRecords.length; i += BATCH_SIZE) {
      const batch = smsRecords.slice(i, i + BATCH_SIZE);
      const batchPromises = batch.map(async (sms) => {
        try {
          const gatewayResult = await sendToSMSGateway(sms.recipientPhone, sms.message);
          
          sms.status = gatewayResult.success ? "sent" : "failed";
          sms.sentAt = new Date();
          sms.gatewayResponse = gatewayResult;
          sms.cost = gatewayResult.cost || 0;

          await sms.save({ session });
          return { success: true, smsId: sms._id, status: sms.status };
        } catch (error) {
          sms.status = "failed";
          sms.gatewayResponse = { error: error.message };
          await sms.save({ session });
          return { success: false, smsId: sms._id, error: error.message };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < smsRecords.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    await session.commitTransaction();

    const successCount = results.filter(r => r.success).length;
    const failedCount = results.length - successCount;

    res.status(201).json({
      success: true,
      message: `Bulk SMS completed: ${successCount} sent, ${failedCount} failed`,
      data: {
        total: results.length,
        successful: successCount,
        failed: failedCount,
        results
      }
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("Send bulk SMS error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send bulk SMS",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    session.endSession();
  }
};

// Get SMS history with filters
const getSMSHistory = async (req, res) => {
  try {
    const { page = 1, limit = 50, status, messageType, startDate, endDate } = req.query;
    const senderId = req.user.userId;

    const filter = { sentBy: senderId };

    // Add filters
    if (status) filter.status = status;
    if (messageType) filter.messageType = messageType;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const smsMessages = await SMSMessage.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await SMSMessage.countDocuments(filter);
    const totalCost = await SMSMessage.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: "$cost" } } }
    ]);

    res.status(200).json({
      success: true,
      data: smsMessages,
      summary: {
        totalCost: totalCost[0]?.total || 0,
        totalSent: await SMSMessage.countDocuments({ ...filter, status: "sent" }),
        totalFailed: await SMSMessage.countDocuments({ ...filter, status: "failed" })
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Get SMS history error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch SMS history",
      error: error.message
    });
  }
};
// SMS statistics
const getSMSStats = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const stats = await SMSMessage.aggregate([
      {
        $match: {
          sentBy: mongoose.Types.ObjectId(senderId),
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalCost: { $sum: "$cost" }
        }
      }
    ]);

    const totalStats = await SMSMessage.aggregate([
      {
        $match: { sentBy: mongoose.Types.ObjectId(senderId) }
      },
      {
        $group: {
          _id: null,
          totalMessages: { $sum: 1 },
          totalCost: { $sum: "$cost" }
        }
      }
    ]);

    const formattedStats = {
      sent: 0,
      failed: 0,
      pending: 0,
      totalCost: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
      formattedStats.totalCost += stat.totalCost;
    });

    res.status(200).json({
      success: true,
      data: {
        period: `${days} days`,
        ...formattedStats,
        totalMessages: totalStats[0]?.totalMessages || 0,
        overallCost: totalStats[0]?.totalCost || 0
      }
    });

  } catch (error) {
    console.error("Get SMS stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch SMS statistics",
      error: error.message
    });
  }
};

// Create SMS campaign for bulk messaging
const createSmsCampaign = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { 
      name, 
      message, 
      recipientType, 
      recipientRoles, 
      specificUserIds, 
      urgency = "normal",
      scheduledAt,
      gateway = 'mock'
    } = req.body;

    const senderId = req.user.userId;

    if (!req.user.permissions.canSendMessages) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: "You don't have permission to send bulk SMS"
      });
    }

    // Build recipient list based on type
    let recipients = [];

    switch (recipientType) {
      case 'role':
        if (!recipientRoles || !Array.isArray(recipientRoles)) {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            message: "Recipient roles are required for role-based campaigns"
          });
        }

        const users = await User.find({
          role: { $in: recipientRoles },
          isActive: true,
          membershipStatus: "active",
          "phones.verified": true,
          "contactPreferences.smsEnabled": true
        }).session(session);

        recipients = users.map(user => ({
          userId: user._id,
          phoneNumber: user.getPrimaryPhone(),
          name: `${user.firstName} ${user.lastName}`
        }));
        break;

      case 'specific':
        if (!specificUserIds || !Array.isArray(specificUserIds)) {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            message: "Specific user IDs are required"
          });
        }

        const specificUsers = await User.find({
          _id: { $in: specificUserIds },
          isActive: true,
          "phones.verified": true,
          "contactPreferences.smsEnabled": true
        }).session(session);

        recipients = specificUsers.map(user => ({
          userId: user._id,
          phoneNumber: user.getPrimaryPhone(),
          name: `${user.firstName} ${user.lastName}`
        }));
        break;

      case 'all':
        const allUsers = await User.find({
          isActive: true,
          membershipStatus: "active",
          "phones.verified": true,
          "contactPreferences.smsEnabled": true
        }).session(session);

        recipients = allUsers.map(user => ({
          userId: user._id,
          phoneNumber: user.getPrimaryPhone(),
          name: `${user.firstName} ${user.lastName}`
        }));
        break;

      default:
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: "Invalid recipient type"
        });
    }

    // Filter out users without phone numbers
    recipients = recipients.filter(recipient => recipient.phoneNumber);

    if (recipients.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "No valid recipients found with verified phone numbers and SMS enabled"
      });
    }

    // Create campaign
    const campaign = new SmsCampaign({
      name,
      message: message.trim(),
      recipientType,
      recipients,
      sender: senderId,
      status: scheduledAt ? "scheduled" : "draft",
      scheduledAt,
      urgency,
      totalRecipients: recipients.length,
      gateway
    });

    await campaign.save({ session });
    await session.commitTransaction();

    // If not scheduled, send immediately
    if (!scheduledAt) {
      processSmsCampaign(campaign._id);
    }

    res.status(201).json({
      success: true,
      message: `SMS campaign created with ${recipients.length} recipients`,
      data: {
        campaignId: campaign._id,
        name: campaign.name,
        recipientCount: campaign.totalRecipients,
        status: campaign.status,
        scheduledAt: campaign.scheduledAt
      }
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("Create SMS campaign error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create SMS campaign",
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

// Process SMS campaign (background job)
const processSmsCampaign = async (campaignId) => {
  const session = await mongoose.startSession();
  
  try {
    await session.startTransaction();
    
    const campaign = await SmsCampaign.findById(campaignId).session(session);
    if (!campaign || campaign.status !== 'draft') {
      await session.abortTransaction();
      return;
    }

    campaign.status = 'sending';
    campaign.sentAt = new Date();
    await campaign.save({ session });

    // Process in batches to avoid rate limiting
    const BATCH_SIZE = 10;
    let successfulSends = 0;
    let failedSends = 0;
    let totalCost = 0;

    for (let i = 0; i < campaign.recipients.length; i += BATCH_SIZE) {
      const batch = campaign.recipients.slice(i, i + BATCH_SIZE);
      
      const batchPromises = batch.map(async (recipient) => {
        try {
          const gatewayResult = await smsGateway.send(
            recipient.phoneNumber, 
            campaign.message,
            campaign.gateway
          );

          recipient.status = gatewayResult.success ? 'sent' : 'failed';
          recipient.cost = gatewayResult.cost || 0;
          recipient.messageId = gatewayResult.messageId;
          
          if (gatewayResult.success) {
            recipient.deliveredAt = new Date();
            successfulSends++;
            totalCost += recipient.cost;
          } else {
            recipient.error = gatewayResult.error;
            failedSends++;
          }

          return recipient;
        } catch (error) {
          recipient.status = 'failed';
          recipient.error = error.message;
          failedSends++;
          return recipient;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      
      // Update campaign with batch results
      for (let j = 0; j < batchResults.length; j++) {
        campaign.recipients[i + j] = batchResults[j];
      }

      await campaign.save({ session });

      // Rate limiting delay
      if (i + BATCH_SIZE < campaign.recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    campaign.status = 'completed';
    campaign.completedAt = new Date();
    campaign.successfulSends = successfulSends;
    campaign.failedSends = failedSends;
    campaign.totalCost = totalCost;

    await campaign.save({ session });
    await session.commitTransaction();

    console.log(`✅ SMS campaign ${campaignId} completed: ${successfulSends} sent, ${failedSends} failed`);

  } catch (error) {
    await session.abortTransaction();
    console.error(`❌ SMS campaign ${campaignId} failed:`, error);
    
    // Update campaign status to failed
    await SmsCampaign.findByIdAndUpdate(campaignId, {
      status: 'failed',
      gatewayResponse: { error: error.message }
    });
  } finally {
    session.endSession();
  }
};

// Get SMS campaigns
const getSmsCampaigns = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const senderId = req.user.userId;

    const filter = { sender: senderId };
    if (status) filter.status = status;

    const campaigns = await SmsCampaign.find(filter)
      .populate('sender', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SmsCampaign.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: campaigns,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch SMS campaigns",
      error: error.message
    });
  }
};

// Other controller methods (getSMSHistory, getSMSStats, etc.) remain similar but enhanced

module.exports = {
  sendSMS,
  sendBulkSMS,
  createSmsCampaign,
  getSmsCampaigns,
  getCampaignDetails: async (req, res) => {
    try {
      const campaign = await SmsCampaign.findById(req.params.id)
        .populate('sender', 'firstName lastName')
        .populate('recipients.userId', 'firstName lastName email role');

      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: "Campaign not found"
        });
      }

      res.status(200).json({
        success: true,
        data: campaign
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch campaign details",
        error: error.message
      });
    }
  },
  getSMSHistory,
  getSMSStats
};

















