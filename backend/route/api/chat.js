

// const express = require("express");
// const router = express.Router();
// const {
//   sendMessage,
//   getUserChats,
//   getChatMessages,
//   initiateCall,
//   getChatStats
// } = require("../../controller/chatController");
// const authMiddleware = require("../../middleware/authMiddleware");

// router.post("/send", authMiddleware, sendMessage);
// router.get("/chats", authMiddleware, getUserChats);
// router.get("/messages/:chatId", authMiddleware, getChatMessages);
// router.post("/call/initiate", authMiddleware, initiateCall);
// router.get("/stats", authMiddleware, getChatStats);

// module.exports = router;


///////////////////Final///////////////


// const express = require("express");
// const router = express.Router();
// const {sendMessage,getUserChats, getChatMessages,initiateCall,getChatStats,getAllUsersForChat,getUserById,getOrCreateChat
// } = require("../../controller/chatController");
// const authMiddleware = require("../../middleware/authMiddleware");


// router.post("/send",  sendMessage);
// router.get("/chats",  getUserChats);
// router.get("/messages/:chatId",  getChatMessages);
// router.post("/call/initiate",  initiateCall);
// router.post("/open",authMiddleware,  getOrCreateChat);
// router.get("/users",  getAllUsersForChat);
// router.get("/stats",  getChatStats);
// router.get("/user/:userId",  getUserById);


// module.exports = router;




// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getUserChats, 
  getChatMessages,
  initiateCall,
  getChatStats,
  getAllUsersForChat,
  getUserById,
  getOrCreateChat,
  broadcastMessage
} = require("../../controller/chatController");
const authMiddleware = require("../../middleware/authMiddleware");

// ✅ ALL routes should have authMiddleware
router.post("/send", authMiddleware, sendMessage);
router.get("/chats", authMiddleware, getUserChats);
router.get("/messages/:chatId", authMiddleware, getChatMessages);
router.post("/call/initiate", authMiddleware, initiateCall);
router.post("/open", authMiddleware, getOrCreateChat);
router.get("/users", authMiddleware, getAllUsersForChat);
router.get("/stats", authMiddleware, getChatStats);
router.get("/user/:userId", authMiddleware, getUserById);
router.post("/broadcast", authMiddleware, broadcastMessage);

module.exports = router;





