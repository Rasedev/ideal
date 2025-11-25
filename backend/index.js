
/////////////////////////final111111111111///////////////////////////


// const express = require('express');
// var cors = require('cors');
// var bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv').config();
// const dbConnection = require('./config/dbConnection');
// const route = require('./route');




// const app = express();
// const port = 3000;

// // Fix EventEmitter memory leak warning
// require('events').EventEmitter.defaultMaxListeners = 20;

// dbConnection();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(route);

// // 404 Handler
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err,err.stack);
//   res.status(500).json({ message: "Something went wrong!", error: err.message });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
//   // console.log(`🚀 Server running on http://localhost:${port}`);
// });



///////////////////FINAL2222222222222222222222//////////////////////////



// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv').config();
// const http = require('http');
// const { Server } = require('socket.io');
// const dbConnection = require('./config/dbConnection');
// const route = require('./route');

// // Fix EventEmitter memory leak warning
// require('events').EventEmitter.defaultMaxListeners = 20;

// const app = express();
// const server = http.createServer(app); // ✅ Socket.io needs http server
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });

// const port = 3000;

// // Connect DB
// dbConnection();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use(route);

// // 404 Handler
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err, err.stack);
//   res.status(500).json({ message: "Something went wrong!", error: err.message });
// });

// // ✅ SOCKET.IO SETUP
// io.on('connection', (socket) => {
//   console.log('⚡ New client connected:', socket.id);

//   socket.on('setup', (userData) => {
//     socket.join(userData._id);
//     socket.emit('connected');
//     console.log(`✅ User ${userData._id} connected`);
//   });

//   socket.on('join chat', (room) => {
//     socket.join(room);
//     console.log(`📦 User joined chat: ${room}`);
//   });

//   socket.on('new message', (messageData) => {
//     const chat = messageData.chat;
//     if (!chat.participants) return console.log("Chat participants not found");

//     chat.participants.forEach((user) => {
//       if (user._id === messageData.sender._id) return;
//       socket.to(user._id).emit('message received', messageData);
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('❌ Client disconnected:', socket.id);
//   });
// });

// // Start Server
// server.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });




//////////////////////FINAL33333333333333333333////////////////////////////////



// server.js
const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const path = require('path');
// require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '.env') });
const http = require('http');
const { Server } = require('socket.io');
const dbConnection = require('./config/dbConnection');
const route = require('./route');

const app = express();
const port = 3000;

// Fix EventEmitter memory leak warning
require('events').EventEmitter.defaultMaxListeners = 20;

dbConnection();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(route);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "API endpoint or Route not found" });
});


// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// ✅ Create HTTP server for socket.io
const server = http.createServer(app);

// ✅ Initialize Socket.IO with proper CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
  },
  transports: ['websocket', 'polling']
});

// Store online users
const onlineUsers = new Map();

// ✅ BETTER Socket.IO Connection Handler with error handling
io.on("connection", (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  // User joins their personal room
  socket.on("join", (userId) => {
    if (!userId) {
      console.log('❌ No userId provided for join');
      return;
    }
    socket.join(userId.toString());
    onlineUsers.set(userId.toString(), socket.id);
    console.log(`👤 User ${userId} joined their private room`);
  });

  // Handle sending messages
  socket.on("sendMessage", (data) => {
    try {
      const { senderId, receiverId, message, chatId, senderName, senderPhoto } = data;

      console.log(`📩 Message from ${senderId} → ${receiverId}`);

      // Validate data
      if (!senderId || !receiverId || !message) {
        console.log('❌ Invalid message data:', data);
        return;
      }

      // Emit to receiver's room with enhanced data
      io.to(receiverId.toString()).emit("receiveMessage", {
        senderId,
        receiverId,
        chatId,
        message,
        senderName,
        senderPhoto,
        createdAt: new Date(),
      });

      console.log(`✅ Message delivered: ${senderId} → ${receiverId}: ${message}`);
    } catch (error) {
      console.error('❌ Socket sendMessage error:', error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`🔴 User disconnected: ${socket.id} - Reason: ${reason}`);
    // Remove from online users
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`👤 User ${userId} went offline`);
        break;
      }
    }
  });

  // ✅ Better socket error handling
  socket.on("error", (err) => {
    console.error("❌ Socket error:", err);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  // console.log(`📊 Health check: http://localhost:${port}/api/health`);
});

