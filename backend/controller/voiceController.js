// controllers/voiceController.js
const VoiceCall = require('../models/voiceCallSchema');
const User = require('../models/userSchema');

// Professional Voice Gateway Integration
class VoiceGateway {
  constructor() {
    this.gateways = {
      twilio: this.twilioGateway,
      plivo: this.plivoGateway,
      mock: this.mockGateway
    };
  }

  async twilioGateway(phoneNumber, config) {
    const twilio = require('twilio');
    const client = twilio(config.accountSid, config.authToken);

    try {
      const call = await client.calls.create({
        url: config.webhookUrl, // TwiML URL for call handling
        to: phoneNumber,
        from: config.phoneNumber
      });

      return {
        success: true,
        callId: call.sid,
        status: call.status,
        cost: 0.05, // Example cost per minute
        gateway: "twilio",
        response: call
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        gateway: "twilio"
      };
    }
  }

  async mockGateway(phoneNumber, config) {
    console.log(`📞 [VOICE MOCK] Calling ${phoneNumber}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const success = Math.random() > 0.1;
    const status = success ? 
      (Math.random() > 0.3 ? "answered" : "no-answer") : 
      "failed";

    return {
      success: status === "answered",
      callId: `mock_call_${Date.now()}`,
      status,
      cost: status === "answered" ? 0.05 : 0,
      gateway: "mock",
      duration: status === "answered" ? Math.floor(Math.random() * 300) + 30 : 0
    };
  }

  async makeCall(phoneNumber, gatewayName = 'mock') {
    const gateway = this.gateways[gatewayName];
    if (!gateway) {
      throw new Error(`Voice gateway '${gatewayName}' not supported`);
    }

    const config = {
      twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER,
        webhookUrl: process.env.TWILIO_VOICE_WEBHOOK_URL
      },
      mock: {}
    };

    return await gateway(phoneNumber, config[gatewayName]);
  }
}

const voiceGateway = new VoiceGateway();

// Make a voice call
const makeCall = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { phoneNumber, recipientId, notes, gateway = 'mock' } = req.body;
    const senderId = req.user.userId;

    if (!req.user.permissions.canMakeCalls) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: "You don't have permission to make calls"
      });
    }

    let recipientInfo = {};

    if (recipientId) {
      const user = await User.findById(recipientId).session(session);
      if (!user) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: "Recipient not found"
        });
      }

      if (!user.contactPreferences.callEnabled) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: "Recipient has call notifications disabled"
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
        name: `${user.firstName} ${user.lastName}`,
        phoneNumber: primaryPhone
      };
    } else {
      if (!phoneNumber) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: "Phone number or recipient ID is required"
        });
      }
      recipientInfo = { phoneNumber };
    }

    // Create call record
    const voiceCall = new VoiceCall({
      recipient: {
        userId: recipientInfo.userId,
        phoneNumber: recipientInfo.phoneNumber,
        name: recipientInfo.name
      },
      sender: senderId,
      callType: "outbound",
      status: "initiated",
      initiatedAt: new Date(),
      notes
    });

    await voiceCall.save({ session });

    // Make the call
    const gatewayResult = await voiceGateway.makeCall(
      recipientInfo.phoneNumber,
      gateway
    );

    // Update call record
    voiceCall.status = gatewayResult.status;
    voiceCall.cost = gatewayResult.cost;
    voiceCall.gatewayResponse = gatewayResult;

    if (gatewayResult.status === "answered") {
      voiceCall.answeredAt = new Date();
      voiceCall.duration = gatewayResult.duration;
      
      // Simulate call ending after duration
      setTimeout(() => {
        voiceCall.status = "completed";
        voiceCall.endedAt = new Date();
        voiceCall.save();
      }, gatewayResult.duration * 1000);
    }

    await voiceCall.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      success: gatewayResult.success,
      message: `Call ${gatewayResult.status}`,
      data: {
        callId: voiceCall._id,
        recipient: recipientInfo.name || recipientInfo.phoneNumber,
        status: voiceCall.status,
        cost: voiceCall.cost,
        duration: voiceCall.duration
      }
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("Make call error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to make call",
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

// Get call history
const getCallHistory = async (req, res) => {
  try {
    const { page = 1, limit = 50, status } = req.query;
    const senderId = req.user.userId;

    const filter = { sender: senderId };
    if (status) filter.status = status;

    const calls = await VoiceCall.find(filter)
      .populate('recipient.userId', 'firstName lastName email role')
      .populate('sender', 'firstName lastName')
      .sort({ initiatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await VoiceCall.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: calls,
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
      message: "Failed to fetch call history",
      error: error.message
    });
  }
};

module.exports = {
  makeCall,
  makeBroadcastCall: async (req, res) => {
    // Similar to SMS campaign but for voice calls
    res.status(501).json({
      success: false,
      message: "Broadcast calls feature coming soon"
    });
  },
  getCallHistory,
  getVoiceStats: async (req, res) => {
    try {
      const senderId = req.user.userId;
      
      const stats = await VoiceCall.aggregate([
        { $match: { sender: mongoose.Types.ObjectId(senderId) } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalDuration: { $sum: "$duration" },
            totalCost: { $sum: "$cost" }
          }
        }
      ]);

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch voice stats",
        error: error.message
      });
    }
  }
};