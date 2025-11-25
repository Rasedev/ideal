


const mongoose = require("mongoose");
const Chat = require("../models/chatSchema"); // ✅ Make sure this path is correct
const Message = require("../models/messageSchema"); // ✅ Make sure this path is correct
const User = require("../models/userSchema");

// Send a message
// const sendMessage = async (req, res) => {
//   try {
//     const { receiverId, message } = req.body;
//     const senderId = req.user?.userId;

//     console.log("📤 Send message request:", { senderId, receiverId, message });

//     if (!senderId || !receiverId || !message) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Sender ID, receiver ID, and message are required" 
//       });
//     }

//     // Validate ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid user ID format" 
//       });
//     }

//     // ✅ FIX: Prevent sending message to yourself with better error
//     if (senderId.toString() === receiverId.toString()) {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot send message to yourself"
//       });
//     }

//     // Rest of your existing code...
//     // Find or create chat
//     let chat = await Chat.findOne({
//       participants: { $all: [senderId, receiverId] },
//       isGroup: false
//     });

//     if (!chat) {
//       console.log("📝 Creating new chat between:", senderId, "and", receiverId);
//       chat = await Chat.create({
//         participants: [senderId, receiverId],
//         isGroup: false
//       });
//     }

//     // Create message
//     const newMessage = await Message.create({
//       sender: senderId,
//       receiver: receiverId,
//       chat: chat._id,
//       message: message.trim(),
//       messageType: "text"
//     });

//     // Update last message
//     chat.lastMessage = {
//       content: message.trim(),
//       sender: senderId,
//       sentAt: new Date()
//     };
//     chat.updatedAt = new Date();
//     await chat.save();

//     // Populate message data
//     const populatedMessage = await Message.findById(newMessage._id)
//       .populate("sender", "firstName lastName profilePhoto role")
//       .populate("receiver", "firstName lastName profilePhoto role");

//     console.log("✅ Message sent successfully:", newMessage._id);

//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       data: populatedMessage
//     });

//   } catch (error) {
//     console.error("❌ Send message error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to send message",
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user?.userId;

    console.log("📤 Send message request:", { 
      senderId, 
      receiverId, 
      message: message.substring(0, 50) + (message.length > 50 ? '...' : '') 
    });

    // Enhanced validation
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Sender ID, receiver ID, and message are required" 
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }

    // ✅ STRICT CHECK: Prevent sending message to yourself
    if (senderId.toString() === receiverId.toString()) {
      console.error("❌ Self-message attempt blocked:", { senderId, receiverId });
      return res.status(400).json({
        success: false,
        message: "Cannot send message to yourself"
      });
    }

    // ✅ Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Recipient user not found"
      });
    }

    // Find or create chat
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
      isGroup: false
    });

    if (!chat) {
      console.log("📝 Creating new chat between:", senderId, "and", receiverId);
      chat = await Chat.create({
        participants: [senderId, receiverId],
        isGroup: false
      });
    }

    // Create message
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      chat: chat._id,
      message: message.trim(),
      messageType: "text"
    });

    // Update last message
    chat.lastMessage = {
      content: message.trim(),
      sender: senderId,
      sentAt: new Date()
    };
    chat.updatedAt = new Date();
    await chat.save();

    // Populate message data
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "firstName lastName profilePhoto role")
      .populate("receiver", "firstName lastName profilePhoto role");

    console.log("✅ Message sent successfully:", {
      messageId: newMessage._id,
      chatId: chat._id,
      from: senderId,
      to: receiverId
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: populatedMessage
    });

  } catch (error) {
    console.error("❌ Send message error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user chats with pagination - FIXED VERSION
const getUserChats = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { page = 1, limit = 50 } = req.query;

    console.log("📥 Fetching chats for user:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        // message: "User ID is required"
        message: "Authentication required. Please log in again."
      });
    }

    // Validate user ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }
    // ✅ Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // ✅ FIXED: Use proper Chat model reference
    const chats = await Chat.find({ participants: userId })
      .populate("participants", "firstName lastName profilePhoto role membershipId isActive")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean(); // Use lean for better performance

    const total = await Chat.countDocuments({ participants: userId });

    console.log(`✅ Found ${chats.length} chats for user ${userId}`);

    res.status(200).json({
      success: true,
      data: chats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("❌ Get chats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get chat messages with pagination
const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user?.userId;
    const { page = 1, limit = 100 } = req.query;

    console.log("📥 Fetching messages for chat:", chatId);

    if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({
        success: false,
        message: "Valid chat ID is required"
      });
    }

    // Check if user is part of this chat
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied"
      });
    }

    // Get messages for this chat
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "firstName lastName profilePhoto role membershipId")
      .populate("receiver", "firstName lastName profilePhoto role membershipId")
      .sort({ createdAt: 1 }) // Sort by oldest first for proper display
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Mark messages as read
    await Message.updateMany(
      {
        chat: chatId,
        receiver: userId,
        isRead: false
      },
      { 
        isRead: true, 
        readAt: new Date() 
      }
    );

    const total = await Message.countDocuments({ chat: chatId });

    console.log(`✅ Found ${messages.length} messages for chat ${chatId}`);

    res.status(200).json({
      success: true,
      data: messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("❌ Get messages error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all users except current user
const getAllUsersForChat = async (req, res) => {
  try {
    const currentUserId = req.user?.userId;

    console.log("👥 Fetching all users except:", currentUserId);

    // ✅ Check if user is authenticated
    if (!currentUserId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in again."
      });
    }

    // ✅ Validate user ID format
    if (!mongoose.Types.ObjectId.isValid(currentUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    const users = await User.find(
      { 
        _id: { $ne: currentUserId },
        isActive: true 
      },
      "firstName lastName email role designation profilePhoto isActive membershipId"
    )
    .sort({ firstName: 1, lastName: 1 })
    .lean();

    console.log(`✅ Found ${users.length} users for chat`);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error("❌ Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get or create chat between two users
const getOrCreateChat = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.userId;

    console.log("🔍 Get or create chat:", { senderId, receiverId });

    // ✅ Comprehensive validation
    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "Cannot create chat with yourself"
      });
    }

    // ✅ Check if users exist
    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId)
    ]);

    if (!sender || !receiver) {
      return res.status(404).json({
        success: false,
        message: "One or both users not found"
      });
    }

    // ✅ Check if chat already exists
    let chat = await Chat.findOne({
      isGroup: false,
      participants: { 
        $all: [senderId, receiverId],
        $size: 2 
      }
    })
    .populate('participants', 'firstName lastName profilePhoto email role membershipId')
    .populate('lastMessage')
    .lean();

    if (chat) {
      console.log("✅ Existing chat found:", chat._id);
      return res.status(200).json({
        success: true,
        message: "Chat retrieved successfully",
        data: chat
      });
    }

    // ✅ Create new chat
    console.log("📝 Creating new chat between:", senderId, "and", receiverId);
    
    chat = await Chat.create({
      participants: [senderId, receiverId],
      isGroup: false
    });

    // ✅ Populate the created chat
    chat = await Chat.findById(chat._id)
      .populate('participants', 'firstName lastName profilePhoto email role membershipId')
      .populate('lastMessage')
      .lean();

    console.log("✅ New chat created:", chat._id);

    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      data: chat
    });

  } catch (error) {
    console.error("❌ Get or create chat error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating or retrieving chat",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Chat statistics
const getChatStats = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const totalChats = await Chat.countDocuments({ participants: userId });
    const userMessages = await Message.countDocuments({ sender: userId });
    const receivedMessages = await Message.countDocuments({ receiver: userId });

    const responseRate = userMessages > 0
      ? ((receivedMessages / userMessages) * 100).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalChats,
        responseRate: parseFloat(responseRate),
        totalMessages: userMessages + receivedMessages,
        sentMessages: userMessages,
        receivedMessages: receivedMessages
      }
    });

  } catch (error) {
    console.error("❌ Get chat stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat statistics",
      error: error.message
    });
  }
};

// - Fix broadcastMessage function

const broadcastMessage = async (req, res) => {
  try {
    const { message, messageType = "text" } = req.body;
    const senderId = req.user?.userId;

    console.log("📢 Broadcast message request:", { senderId, message, messageType });

    // ✅ Check if user is admin
    const sender = await User.findById(senderId);
    if (!sender || sender.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can send broadcast messages"
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required for broadcast"
      });
    }

    // ✅ Get all active users except admin
    const allUsers = await User.find(
      { 
        _id: { $ne: senderId },
        isActive: true 
      },
      "_id email firstName lastName profilePhoto"
    );

    console.log(`📢 Broadcasting to ${allUsers.length} users`);

    let successfulSends = 0;
    let failedSends = 0;
    const failedUsers = [];

    // ✅ Create individual chats/messages for each user
    for (const user of allUsers) {
      try {
        // Find or create chat with each user
        let chat = await Chat.findOne({
          participants: { $all: [senderId, user._id] },
          isGroup: false
        });

        if (!chat) {
          chat = await Chat.create({
            participants: [senderId, user._id],
            isGroup: false
          });
        }

        // Create broadcast message
        await Message.create({
          sender: senderId,
          receiver: user._id,
          chat: chat._id,
          message: message.trim(),
          messageType: "text",
          isBroadcast: true
        });

        // Update last message
        chat.lastMessage = {
          content: message.trim(),
          sender: senderId,
          sentAt: new Date()
        };
        chat.updatedAt = new Date();
        await chat.save();

        successfulSends++;

        // ✅ Emit socket event for real-time delivery
        // Get the io instance properly
        const io = req.app.get('io');
        if (io) {
          io.to(user._id.toString()).emit("receiveMessage", {
            senderId: senderId,
            senderName: `${sender.firstName} ${sender.lastName}`,
            senderPhoto: sender.profilePhoto,
            receiverId: user._id,
            chatId: chat._id,
            message: message.trim(),
            createdAt: new Date(),
            isBroadcast: true
          });
        }

      } catch (userError) {
        console.error(`❌ Failed to send to user ${user._id}:`, userError);
        failedSends++;
        failedUsers.push({
          userId: user._id,
          email: user.email,
          error: userError.message
        });
      }
    }

    console.log(`✅ Broadcast completed: ${successfulSends} successful, ${failedSends} failed`);

    res.status(200).json({
      success: true,
      message: `Broadcast sent to ${successfulSends} users${failedSends > 0 ? `, ${failedSends} failed` : ''}`,
      data: {
        totalUsers: allUsers.length,
        successful: successfulSends,
        failed: failedSends,
        failedUsers: failedSends > 0 ? failedUsers : undefined
      }
    });

  } catch (error) {
    console.error("❌ Broadcast message error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send broadcast message",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  sendMessage,
  getUserChats,
  getChatMessages,
  broadcastMessage,
  initiateCall: async (req, res) => {
    try {
      // Your existing initiateCall logic
      res.status(200).json({ success: true, message: "Call feature coming soon" });
    } catch (error) {
      console.error("Initiate call error:", error);
      res.status(500).json({ success: false, message: "Call feature not available" });
    }
  },
  getChatStats,
  getAllUsersForChat,
  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId)
        .select("firstName lastName profilePhoto role membershipId email phone isActive createdAt");
      if (!user)
        return res.status(404).json({ success: false, message: "User not found" });
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error("Get user by ID error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch user details" });
    }
  },
  getOrCreateChat
};









