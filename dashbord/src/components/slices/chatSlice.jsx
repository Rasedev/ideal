// // slices/chatSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import { apiService } from '../services/apiService';

// // Async thunks
// export const fetchChats = createAsyncThunk(
//   'chat/fetchChats',
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const response = await apiService.chat.getUserChats(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch chats');
//     }
//   }
// );

// export const fetchMessages = createAsyncThunk(
//   'chat/fetchMessages',
//   async (chatId, { rejectWithValue }) => {
//     try {
//       const response = await apiService.chat.getChatMessages(chatId);
//       return { chatId, ...response.data };
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
//     }
//   }
// );

// export const sendMessage = createAsyncThunk(
//   'chat/sendMessage',
//   async (messageData, { rejectWithValue }) => {
//     try {
//       const response = await apiService.chat.sendMessage(messageData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to send message');
//     }
//   }
// );

// export const getOrCreateChat = createAsyncThunk(
//   'chat/getOrCreateChat',
//   async (receiverId, { rejectWithValue }) => {
//     try {
//       const response = await apiService.chat.getOrCreateChat(receiverId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to create chat');
//     }
//   }
// );

// export const fetchAllUsers = createAsyncThunk(
//   'chat/fetchAllUsers',
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const response = await apiService.chat.getAllUsers(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
//     }
//   }
// );

// export const broadcastMessage = createAsyncThunk(
//   'chat/broadcastMessage',
//   async (messageData, { rejectWithValue }) => {
//     try {
//       const response = await apiService.chat.broadcastMessage(messageData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to send broadcast');
//     }
//   }
// );

// export const markMessagesAsRead = createAsyncThunk(
//   'chat/markMessagesAsRead',
//   async (chatId, { rejectWithValue }) => {
//     try {
//       const response = await apiService.chat.markAsRead(chatId);
//       return { chatId, ...response.data };
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to mark messages as read');
//     }
//   }
// );

// export const fetchChatStats = createAsyncThunk(
//   'chat/fetchChatStats',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiService.chat.getChatStats();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch chat stats');
//     }
//   }
// );

// // Initial state
// const initialState = {
//   chats: [],
//   activeChat: null,
//   messages: [],
//   users: [],
//   searchQuery: '',
//   connectionStatus: 'disconnected', // 'connected', 'disconnected', 'error'
//   socket: null,
//   stats: {
//     totalChats: 0,
//     unreadMessages: 0,
//     totalUsers: 0,
//     onlineUsers: 0
//   },
//   loading: {
//     chats: false,
//     messages: false,
//     users: false,
//     sending: false,
//     broadcasting: false
//   },
//   error: null,
//   success: null,
//   lastUpdated: null
// };

// // Chat slice
// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearSuccess: (state) => {
//       state.success = null;
//     },
//     setActiveChat: (state, action) => {
//       state.activeChat = action.payload;
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     setConnectionStatus: (state, action) => {
//       state.connectionStatus = action.payload;
//     },
//     setSocket: (state, action) => {
//       state.socket = action.payload;
//     },
//     addMessage: (state, action) => {
//       // Check if message already exists to avoid duplicates
//       const messageExists = state.messages.some(msg => 
//         msg._id === action.payload._id || 
//         (msg.isTemp && msg.tempId === action.payload.tempId)
//       );
      
//       if (!messageExists) {
//         state.messages.push(action.payload);
//       }
//     },
//     updateMessageStatus: (state, action) => {
//       const { tempId, newMessage } = action.payload;
//       const index = state.messages.findIndex(msg => msg.isTemp && msg.tempId === tempId);
//       if (index !== -1) {
//         state.messages[index] = { ...newMessage, isSending: false };
//       }
//     },
//     removeTempMessage: (state, action) => {
//       const { tempId } = action.payload;
//       state.messages = state.messages.filter(msg => !(msg.isTemp && msg.tempId === tempId));
//     },
//     markChatAsRead: (state, action) => {
//       const chatId = action.payload;
//       const chat = state.chats.find(c => c._id === chatId);
//       if (chat) {
//         chat.unreadCount = 0;
//       }
//     },
//     updateLastMessage: (state, action) => {
//       const { chatId, lastMessage } = action.payload;
//       const chat = state.chats.find(c => c._id === chatId);
//       if (chat) {
//         chat.lastMessage = lastMessage;
//         chat.updatedAt = new Date().toISOString();
//       }
//     },
//     addNewChat: (state, action) => {
//       const newChat = action.payload;
//       const existingChat = state.chats.find(chat => chat._id === newChat._id);
//       if (!existingChat) {
//         state.chats.unshift(newChat);
//       }
//     },
//     resetChatState: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch chats
//       .addCase(fetchChats.pending, (state) => {
//         state.loading.chats = true;
//         state.error = null;
//       })
//       .addCase(fetchChats.fulfilled, (state, action) => {
//         state.loading.chats = false;
//         state.chats = action.payload.data || [];
//         state.lastUpdated = new Date().toISOString();
//         state.error = null;
//       })
//       .addCase(fetchChats.rejected, (state, action) => {
//         state.loading.chats = false;
//         state.error = action.payload;
//       })
      
//       // Fetch messages
//       .addCase(fetchMessages.pending, (state) => {
//         state.loading.messages = true;
//         state.error = null;
//       })
//       .addCase(fetchMessages.fulfilled, (state, action) => {
//         state.loading.messages = false;
//         state.messages = action.payload.data || [];
//         state.error = null;
//       })
//       .addCase(fetchMessages.rejected, (state, action) => {
//         state.loading.messages = false;
//         state.error = action.payload;
//       })
      
//       // Send message
//       .addCase(sendMessage.pending, (state) => {
//         state.loading.sending = true;
//         state.error = null;
//         state.success = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading.sending = false;
//         state.success = action.payload.message;
//         state.lastUpdated = new Date().toISOString();
//         state.error = null;
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading.sending = false;
//         state.error = action.payload;
//         state.success = null;
//       })
      
//       // Get or create chat
//       .addCase(getOrCreateChat.fulfilled, (state, action) => {
//         const newChat = action.payload.data;
//         const existingChat = state.chats.find(chat => chat._id === newChat._id);
//         if (!existingChat) {
//           state.chats.unshift(newChat);
//         }
//         state.activeChat = newChat;
//       })
      
//       // Fetch all users
//       .addCase(fetchAllUsers.pending, (state) => {
//         state.loading.users = true;
//         state.error = null;
//       })
//       .addCase(fetchAllUsers.fulfilled, (state, action) => {
//         state.loading.users = false;
//         state.users = action.payload.data || [];
//         state.error = null;
//       })
//       .addCase(fetchAllUsers.rejected, (state, action) => {
//         state.loading.users = false;
//         state.error = action.payload;
//       })
      
//       // Broadcast message
//       .addCase(broadcastMessage.pending, (state) => {
//         state.loading.broadcasting = true;
//         state.error = null;
//         state.success = null;
//       })
//       .addCase(broadcastMessage.fulfilled, (state, action) => {
//         state.loading.broadcasting = false;
//         state.success = action.payload.message;
//         state.error = null;
//       })
//       .addCase(broadcastMessage.rejected, (state, action) => {
//         state.loading.broadcasting = false;
//         state.error = action.payload;
//         state.success = null;
//       })
      
//       // Mark messages as read
//       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
//         const chat = state.chats.find(c => c._id === action.payload.chatId);
//         if (chat) {
//           chat.unreadCount = 0;
//         }
//         state.messages = state.messages.map(msg => ({ ...msg, isRead: true }));
//       })
      
//       // Fetch chat stats
//       .addCase(fetchChatStats.fulfilled, (state, action) => {
//         state.stats = {
//           totalChats: Number(action.payload.data?.totalChats) || 0,
//           unreadMessages: Number(action.payload.data?.unreadMessages) || 0,
//           totalUsers: Number(action.payload.data?.totalUsers) || 0,
//           onlineUsers: Number(action.payload.data?.onlineUsers) || 0
//         };
//       });
//   }
// });

// // Export actions and selectors
// export const {
//   clearError,
//   clearSuccess,
//   setActiveChat,
//   setSearchQuery,
//   setConnectionStatus,
//   setSocket,
//   addMessage,
//   updateMessageStatus,
//   removeTempMessage,
//   markChatAsRead,
//   updateLastMessage,
//   addNewChat,
//   resetChatState
// } = chatSlice.actions;

// export const selectChat = (state) => state.chat;
// export const selectChats = (state) => state.chat.chats;
// export const selectActiveChat = (state) => state.chat.activeChat;
// export const selectMessages = (state) => state.chat.messages;
// export const selectChatUsers = (state) => state.chat.users;
// export const selectSearchQuery = (state) => state.chat.searchQuery;
// export const selectConnectionStatus = (state) => state.chat.connectionStatus;
// export const selectSocket = (state) => state.chat.socket;
// export const selectChatStats = (state) => state.chat.stats;
// export const selectChatLoading = (state) => state.chat.loading;
// export const selectChatError = (state) => state.chat.error;
// export const selectChatSuccess = (state) => state.chat.success;
// export const selectLastChatUpdate = (state) => state.chat.lastUpdated;

// export default chatSlice.reducer;