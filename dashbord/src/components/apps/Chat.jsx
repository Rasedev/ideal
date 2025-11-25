// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Card,
//   List,
//   Input,
//   Button,
//   Space,
//   Avatar,
//   Typography,
//   Divider,
//   Badge,
//   Dropdown,
//   message,
//   Row,
//   Col,
// } from 'antd';
// import {
//   MessageOutlined,
//   SearchOutlined,
//   UserOutlined,
//   PaperClipOutlined,
//   SendOutlined,
//   MoreOutlined,
//   VideoCameraOutlined,
//   PhoneOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { TextArea } = Input;

// const Chat = () => {
//   const [chats, setChats] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     fetchChats();
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (activeChat) {
//       fetchMessages(activeChat._id);
//     }
//   }, [activeChat]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchChats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/apps/chats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setChats(response.data.chats || []);
//         if (response.data.chats.length > 0 && !activeChat) {
//           setActiveChat(response.data.chats[0]);
//         }
//       }
//     } catch (error) {
//       message.error('Failed to fetch chats');
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/apps/users', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setUsers(response.data.users || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch users');
//     }
//   };

//   const fetchMessages = async (chatId) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`http://localhost:3000/api/v1/apps/chats/${chatId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setMessages(response.data.messages || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch messages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !activeChat) return;

//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         `http://localhost:3000/api/v1/apps/chats/${activeChat._id}/messages`,
//         { message: newMessage },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setNewMessage('');
//         fetchMessages(activeChat._id);
//         fetchChats(); // Refresh chat list to update last message
//       }
//     } catch (error) {
//       message.error('Failed to send message');
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const getOtherParticipant = (chat) => {
//     if (chat.isGroup) return chat;
//     const currentUser = JSON.parse(localStorage.getItem('user'));
//     return chat.participants.find(p => p._id !== currentUser._id);
//   };

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="mb-6">
//           <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//             <MessageOutlined className="mr-3" />
//             Chat
//           </Title>
//           <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//             Real-time messaging system
//           </Text>
//         </div>

//         <Row gutter={[16, 16]} className="h-[600px]">
//           {/* Chat List */}
//           <Col xs={24} md={8}>
//             <Card className={`h-full ${cardClass}`}>
//               <div className="mb-4">
//                 <Input
//                   placeholder="Search chats..."
//                   prefix={<SearchOutlined />}
//                 />
//               </div>
              
//               <List
//                 dataSource={chats}
//                 renderItem={(chat) => {
//                   const otherParticipant = getOtherParticipant(chat);
//                   return (
//                     <List.Item
//                       className={`p-3 cursor-pointer border-b ${
//                         activeChat?._id === chat._id ? 'bg-blue-50' : 'hover:bg-gray-50'
//                       } ${currentTheme === 'dark' ? 'hover:bg-gray-700' : ''}`}
//                       onClick={() => setActiveChat(chat)}
//                     >
//                       <div className="flex items-center w-full">
//                         <Badge dot={chat.unreadCount > 0} color="green">
//                           <Avatar 
//                             src={otherParticipant?.image} 
//                             icon={<UserOutlined />}
//                             className="mr-3"
//                           />
//                         </Badge>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex justify-between items-start">
//                             <Text strong className="block truncate">
//                               {chat.isGroup ? chat.groupName : `${otherParticipant?.firstName} ${otherParticipant?.lastName}`}
//                             </Text>
//                             <Text type="secondary" className="text-xs">
//                               {dayjs(chat.updatedAt).format('HH:mm')}
//                             </Text>
//                           </div>
//                           <Text type="secondary" className="text-xs truncate block">
//                             {chat.lastMessage?.message || 'No messages yet'}
//                           </Text>
//                         </div>
//                       </div>
//                     </List.Item>
//                   );
//                 }}
//               />
//             </Card>
//           </Col>

//           {/* Chat Area */}
//           <Col xs={24} md={16}>
//             <Card className={`h-full flex flex-col ${cardClass}`}>
//               {activeChat ? (
//                 <>
//                   {/* Chat Header */}
//                   <div className="flex items-center justify-between p-4 border-b">
//                     <div className="flex items-center">
//                       <Avatar 
//                         src={getOtherParticipant(activeChat)?.image} 
//                         icon={<UserOutlined />}
//                         className="mr-3"
//                       />
//                       <div>
//                         <Text strong>
//                           {activeChat.isGroup ? activeChat.groupName : 
//                             `${getOtherParticipant(activeChat)?.firstName} ${getOtherParticipant(activeChat)?.lastName}`}
//                         </Text>
//                         <br />
//                         <Text type="secondary" className="text-xs">
//                           {activeChat.isGroup ? 
//                             `${activeChat.participants.length} participants` : 
//                             'Online'}
//                         </Text>
//                       </div>
//                     </div>
//                     <Space>
//                       <Button type="text" icon={<PhoneOutlined />} />
//                       <Button type="text" icon={<VideoCameraOutlined />} />
//                       <Dropdown
//                         menu={{
//                           items: [
//                             { key: 'profile', label: 'View Profile' },
//                             { key: 'clear', label: 'Clear Chat' },
//                             { key: 'block', label: 'Block User', danger: true },
//                           ],
//                         }}
//                         trigger={['click']}
//                       >
//                         <Button type="text" icon={<MoreOutlined />} />
//                       </Dropdown>
//                     </Space>
//                   </div>

//                   {/* Messages */}
//                   <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     {messages.map((message) => (
//                       <div
//                         key={message._id}
//                         className={`flex ${
//                           message.sender._id === JSON.parse(localStorage.getItem('user'))._id 
//                             ? 'justify-end' 
//                             : 'justify-start'
//                         }`}
//                       >
//                         <div
//                           className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                             message.sender._id === JSON.parse(localStorage.getItem('user'))._id
//                               ? 'bg-blue-500 text-white'
//                               : currentTheme === 'dark' 
//                                 ? 'bg-gray-700 text-white'
//                                 : 'bg-gray-100 text-gray-800'
//                           }`}
//                         >
//                           <Text>{message.message}</Text>
//                           <div className={`text-xs mt-1 ${
//                             message.sender._id === JSON.parse(localStorage.getItem('user'))._id
//                               ? 'text-blue-100'
//                               : 'text-gray-500'
//                           }`}>
//                             {dayjs(message.createdAt).format('HH:mm')}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                   </div>

//                   {/* Message Input */}
//                   <div className="p-4 border-t">
//                     <Space.Compact style={{ width: '100%' }}>
//                       <Button type="text" icon={<PaperClipOutlined />} />
//                       <TextArea
//                         placeholder="Type a message..."
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onPressEnter={(e) => {
//                           if (!e.shiftKey) {
//                             e.preventDefault();
//                             sendMessage();
//                           }
//                         }}
//                         autoSize={{ minRows: 1, maxRows: 4 }}
//                       />
//                       <Button 
//                         type="primary" 
//                         icon={<SendOutlined />}
//                         onClick={sendMessage}
//                         disabled={!newMessage.trim()}
//                       >
//                         Send
//                       </Button>
//                     </Space.Compact>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-gray-500">
//                   <div className="text-center">
//                     <MessageOutlined className="text-4xl mb-4" />
//                     <Text>Select a chat to start messaging</Text>
//                   </div>
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default Chat;




/////////////////////FINAL///////////////////////////////



// import io from "socket.io-client";
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Card,
//   List,
//   Input,
//   Button,
//   Space,
//   Avatar,
//   Typography,
//   Badge,
//   Dropdown,
//   message,
//   Row,
//   Col,
//   Spin,
// } from 'antd';
// import {
//   MessageOutlined,
//   SearchOutlined,
//   UserOutlined,
//   PaperClipOutlined,
//   SendOutlined,
//   MoreOutlined,
//   VideoCameraOutlined,
//   PhoneOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { TextArea } = Input;

// const Chat = () => {
//   const [socket, setSocket] = useState(null);
//   const currentUser = JSON.parse(localStorage.getItem('user'));
//   const [chats, setChats] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     fetchChats();
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (activeChat) {
//       fetchMessages(activeChat._id);
//     }
//   }, [activeChat]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);


//   useEffect(() => {
//   const newSocket = io("http://localhost:3000");
//   setSocket(newSocket);

//   // Join user’s private room
//   newSocket.emit("join", currentUser?._id);

//   // Listen for incoming messages
//   newSocket.on("receiveMessage", (data) => {
//     console.log("📥 New message received:", data);
//     if (activeChat && data.senderId === getOtherParticipant(activeChat)?._id) {
//       setMessages((prev) => [...prev, data]);
//     }
//     // Optionally show notification if not active
//   });

//   return () => {
//     newSocket.disconnect();
//   };
// }, []);



//   const fetchChats = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/chat/chats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setChats(response.data.data || []);
//         if (response.data.data.length > 0 && !activeChat) {
//           setActiveChat(response.data.data[0]);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch chats:', error);
//       message.error('Failed to load chats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/chat/users', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setUsers(response.data.data || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch users:', error);
//     }
//   };

//   const fetchMessages = async (chatId) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`http://localhost:3000/api/v1/chat/messages/${chatId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setMessages(response.data.data || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch messages:', error);
//       message.error('Failed to load messages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !activeChat) return;

//     try {
//       const token = localStorage.getItem('token');
//       const receiverId = getOtherParticipant(activeChat)?._id;

//       const response = await axios.post(
//         'http://localhost:3000/api/v1/chat/send',
//         { 
//           receiverId: getOtherParticipant(activeChat)?._id,
//           message: newMessage 
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//          const sentMsg = response.data.data;
//          setMessages((prev) => [...prev, sentMsg]);
//         setNewMessage('');
//         fetchMessages(activeChat._id);
//         fetchChats(); // Refresh chat list to update last message
//          socket.emit("sendMessage", {
//         senderId: currentUser._id,
//         receiverId,
//         message: newMessage,
//       });
//       }
//     } catch (error) {
//       console.error('Failed to send message:', error);
//       message.error('Failed to send message');
//     }
//   };

//   const startNewChat = async (userId) => {
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/chat/open.getOrCreateChat(userId)',
        
//         { receiverId: userId },
//         { headers: { Authorization: `Bearer ${token}` } }

//       );

//       if (response.data.success) {
//         setActiveChat(response.data.data);
//         fetchChats(); // Refresh chat list
//         message.success('Chat started successfully');
//       }
//     } catch (error) {
//       console.error('Failed to start chat:', error);
//       message.error('Failed to start chat');
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const getOtherParticipant = (chat) => {
//     if (chat.isGroup) return chat;
//     const currentUser = JSON.parse(localStorage.getItem('user'));
//     return chat.participants?.find(p => p._id !== currentUser?._id);
//   };

//   const filteredChats = chats.filter(chat => {
//     if (!searchQuery) return true;
    
//     const otherParticipant = getOtherParticipant(chat);
//     const searchTerm = searchQuery.toLowerCase();
    
//     if (chat.isGroup) {
//       return chat.groupName?.toLowerCase().includes(searchTerm);
//     } else {
//       return (
//         otherParticipant?.firstName?.toLowerCase().includes(searchTerm) ||
//         otherParticipant?.lastName?.toLowerCase().includes(searchTerm) ||
//         otherParticipant?.email?.toLowerCase().includes(searchTerm)
//       );
//     }
//   });

//   const filteredUsers = users.filter(user => {
//     if (!searchQuery) return false; // Only show users when searching
    
//     const searchTerm = searchQuery.toLowerCase();
//     return (
//       user.firstName?.toLowerCase().includes(searchTerm) ||
//       user.lastName?.toLowerCase().includes(searchTerm) ||
//       user.email?.toLowerCase().includes(searchTerm)
//     );
//   });

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white border-gray-200';

//   const textClass = currentTheme === 'dark' ? 'text-white' : 'text-gray-800';
//   const textSecondaryClass = currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="mb-6">
//           <Title level={2} className={textClass}>
//             <MessageOutlined className="mr-3" />
//             Chat
//           </Title>
//           <Text className={textSecondaryClass}>
//             Real-time messaging system
//           </Text>
//         </div>

//         <Row gutter={[16, 16]} className="h-[600px]">
//           {/* Chat List */}
//           <Col xs={24} md={8}>
//             <Card className={`h-full ${cardClass}`}>
//               <div className="mb-4">
//                 <Input
//                   placeholder="Search chats or users..."
//                   prefix={<SearchOutlined />}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   allowClear
//                 />
//               </div>
              
//               {loading ? (
//                 <div className="flex justify-center items-center h-32">
//                   <Spin size="large" />
//                 </div>
//               ) : (
//                 <>
//                   {/* User Search Results */}
//                   {searchQuery && filteredUsers.length > 0 && (
//                     <div className="mb-4">
//                       <Text strong className={textClass}>Start New Chat</Text>
//                       <List
//                         dataSource={filteredUsers}
//                         renderItem={(user) => (
//                           <List.Item
//                             className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
//                             onClick={() => startNewChat(user._id)}
//                           >
//                             <div className="flex items-center w-full">
//                               <Avatar 
//                                 src={user.profilePhoto} 
//                                 icon={<UserOutlined />}
//                                 className="mr-3"
//                               />
//                               <div className="flex-1 min-w-0">
//                                 <Text strong className={`block truncate ${textClass}`}>
//                                   {user.firstName} {user.lastName}
//                                 </Text>
//                                 <Text type="secondary" className="text-xs truncate block">
//                                   {user.email}
//                                 </Text>
//                               </div>
//                             </div>
//                           </List.Item>
//                         )}
//                       />
//                     </div>
//                   )}

//                   {/* Chat List */}
//                   <List
//                     dataSource={filteredChats}
//                     renderItem={(chat) => {
//                       const otherParticipant = getOtherParticipant(chat);
//                       return (
//                         <List.Item
//                           className={`p-3 cursor-pointer border-b border-gray-200 dark:border-gray-600 ${
//                             activeChat?._id === chat._id 
//                               ? 'bg-blue-50 dark:bg-blue-900/20' 
//                               : 'hover:bg-gray-50 dark:hover:bg-gray-700'
//                           }`}
//                           onClick={() => setActiveChat(chat)}
//                         >
//                           <div className="flex items-center w-full">
//                             <Badge dot={chat.unreadCount > 0} color="green">
//                               <Avatar 
//                                 src={otherParticipant?.profilePhoto} 
//                                 icon={<UserOutlined />}
//                                 className="mr-3"
//                               />
//                             </Badge>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex justify-between items-start">
//                                 <Text strong className={`block truncate ${textClass}`}>
//                                   {chat.isGroup ? chat.groupName : `${otherParticipant?.firstName} ${otherParticipant?.lastName}`}
//                                 </Text>
//                                 <Text type="secondary" className="text-xs">
//                                   {dayjs(chat.updatedAt).format('HH:mm')}
//                                 </Text>
//                               </div>
//                               <Text type="secondary" className="text-xs truncate block">
//                                 {chat.lastMessage?.message || 'No messages yet'}
//                               </Text>
//                             </div>
//                           </div>
//                         </List.Item>
//                       );
//                     }}
//                     locale={{
//                       emptyText: searchQuery ? 'No chats or users found' : 'No conversations yet'
//                     }}
//                   />
//                 </>
//               )}
//             </Card>
//           </Col>

//           {/* Chat Area */}
//           <Col xs={24} md={16}>
//             <Card className={`h-full flex flex-col ${cardClass}`}>
//               {activeChat ? (
//                 <>
//                   {/* Chat Header */}
//                   <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
//                     <div className="flex items-center">
//                       <Avatar 
//                         src={getOtherParticipant(activeChat)?.profilePhoto} 
//                         icon={<UserOutlined />}
//                         className="mr-3"
//                       />
//                       <div>
//                         <Text strong className={textClass}>
//                           {activeChat.isGroup ? activeChat.groupName : 
//                             `${getOtherParticipant(activeChat)?.firstName} ${getOtherParticipant(activeChat)?.lastName}`}
//                         </Text>
//                         <br />
//                         <Text type="secondary" className="text-xs">
//                           {activeChat.isGroup ? 
//                             `${activeChat.participants?.length || 0} participants` : 
//                             'Online'}
//                         </Text>
//                       </div>
//                     </div>
//                     <Space>
//                       <Button type="text" icon={<PhoneOutlined />} />
//                       <Button type="text" icon={<VideoCameraOutlined />} />
//                       <Dropdown
//                         menu={{
//                           items: [
//                             { key: 'profile', label: 'View Profile' },
//                             { key: 'clear', label: 'Clear Chat' },
//                             { key: 'block', label: 'Block User', danger: true },
//                           ],
//                         }}
//                         trigger={['click']}
//                       >
//                         <Button type="text" icon={<MoreOutlined />} />
//                       </Dropdown>
//                     </Space>
//                   </div>

//                   {/* Messages */}
//                   <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     {messages.length > 0 ? (
//                       messages.map((message) => (
//                         <div
//                           key={message._id}
//                           className={`flex ${
//                             message.sender?._id === JSON.parse(localStorage.getItem('user'))?._id 
//                               ? 'justify-end' 
//                               : 'justify-start'
//                           }`}
//                         >
//                           <div
//                             className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                               message.sender?._id === JSON.parse(localStorage.getItem('user'))?._id
//                                 ? 'bg-blue-500 text-white'
//                                 : currentTheme === 'dark' 
//                                   ? 'bg-gray-700 text-white'
//                                   : 'bg-gray-100 text-gray-800'
//                             }`}
//                           >
//                             <Text>{message.message}</Text>
//                             <div className={`text-xs mt-1 ${
//                               message.sender?._id === JSON.parse(localStorage.getItem('user'))?._id
//                                 ? 'text-blue-100'
//                                 : 'text-gray-500'
//                             }`}>
//                               {dayjs(message.createdAt).format('HH:mm')}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="flex items-center justify-center h-32 text-gray-500">
//                         <div className="text-center">
//                           <MessageOutlined className="text-2xl mb-2" />
//                           <Text>No messages yet. Start the conversation!</Text>
//                         </div>
//                       </div>
//                     )}
//                     <div ref={messagesEndRef} />
//                   </div>

//                   {/* Message Input */}
//                   <div className="p-4 border-t border-gray-200 dark:border-gray-600">
//                     <Space.Compact style={{ width: '100%' }}>
//                       <Button type="text" icon={<PaperClipOutlined />} />
//                       <TextArea
//                         placeholder="Type a message..."
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onPressEnter={(e) => {
//                           if (!e.shiftKey) {
//                             e.preventDefault();
//                             sendMessage();
//                           }
//                         }}
//                         autoSize={{ minRows: 1, maxRows: 4 }}
//                       />
//                       <Button 
//                         type="primary" 
//                         icon={<SendOutlined />}
//                         onClick={sendMessage}
//                         disabled={!newMessage.trim()}
//                       >
//                         Send
//                       </Button>
//                     </Space.Compact>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-gray-500">
//                   <div className="text-center">
//                     <MessageOutlined className="text-4xl mb-4" />
//                     <Text>Select a chat to start messaging</Text>
//                   </div>
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default Chat;



// components/Chat.jsx


// import { io } from "socket.io-client";
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// // import { MailOutlined } from '@ant-design/icons';
// import {
//   Card,
//   List,
//   Input,
//   Button,
//   Space,
//   Avatar,
//   Typography,
//   Badge,
//   Dropdown,
//   message,
//   Row,
//   Col,
//   Spin,
//   Modal,
//   Form,
//   Select,
//   Tag,
// } from 'antd';
// import {
//   MessageOutlined,
//   SearchOutlined,
//   UserOutlined,
//   PaperClipOutlined,
//   SendOutlined,
//   MoreOutlined,
//   VideoCameraOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   NotificationOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import { apiService } from '../../services/apiService';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// const Chat = () => {
//   const [socket, setSocket] = useState(null);
//   const currentUser = JSON.parse(localStorage.getItem('user'));
//   const [chats, setChats] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [composeModalVisible, setComposeModalVisible] = useState(false);
//   const [sendingSMS, setSendingSMS] = useState(false);
//   const [composeForm] = Form.useForm();

//   const [broadcastModalVisible, setBroadcastModalVisible] = useState(false);
//   const [broadcastMessage, setBroadcastMessage] = useState('');
//   const [sendingBroadcast, setSendingBroadcast] = useState(false);

//   const isAdmin = currentUser?.role === 'Admin';

  
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const messagesEndRef = useRef(null);

//   const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
//   const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";


//   // Socket.io connection - RUNS ONLY ONCE
//   useEffect(() => {
//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket', 'polling']
//     });
    
//     setSocket(newSocket);

//     // Join user's private room
//     if (currentUser?._id) {
//       newSocket.emit("join", currentUser._id);
//     }

//     // Listen for incoming messages
//     newSocket.on("receiveMessage", (data) => {
//       console.log("📥 New real-time message:", data);
      
//       // If this message belongs to active chat, add it
//       if (activeChat && data.chatId === activeChat._id) {
//         setMessages(prev => [...prev, formatMessage(data)]);
//       }
      
//       // Refresh chats to update last message
//       fetchChats();
//     });

//     newSocket.on("connect", () => {
//       console.log("✅ Connected to chat server");
//     });

//     newSocket.on("disconnect", () => {
//       console.log("🔌 Disconnected from chat server");
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [currentUser?._id]); // Only depend on user ID, not activeChat

//   // Format message for display
//   const formatMessage = (msg) => ({
//     _id: msg._id || `temp_${Date.now()}`,
//     sender: {
//       _id: msg.senderId,
//       firstName: msg.senderName?.split(' ')[0] || 'User',
//       lastName: msg.senderName?.split(' ')[1] || '',
//       profilePhoto: msg.senderPhoto
//     },
//     message: msg.message,
//     createdAt: msg.createdAt || new Date(),
//     isRead: msg.isRead || false
//   });

//   // Fetch initial data - RUNS ONLY ONCE
//   useEffect(() => {
//     fetchChats();
//     fetchUsers();
//   }, []);

//   // Add this useEffect to debug chat selection
// useEffect(() => {
//   if (activeChat) {
//     console.log("🔍 Active Chat Debug:", {
//       chatId: activeChat._id,
//       participants: activeChat.participants?.map(p => ({
//         id: p._id,
//         name: `${p.firstName} ${p.lastName}`,
//         isCurrentUser: p._id === currentUser?._id
//       })),
//       otherParticipant: getOtherParticipant(activeChat)
//     });
//   }
// }, [activeChat]);

// // Improved startNewChat function
// const startNewChat = async (user) => {
//   try {
//     const response = await apiService.chat.getOrCreateChat(user._id);
//     if (response.data.success) {
//       let newChat = response.data.data;

//       // ✅ Ensure the selected user is in the participants list
//       if (!newChat.participants) newChat.participants = [];
//       const hasOther = newChat.participants.some(p => p._id === user._id);
//       if (!hasOther) newChat.participants.push(user);
      
//       const hasCurrent = newChat.participants.some(p => p._id === currentUser._id);
//       if (!hasCurrent) newChat.participants.push(currentUser);

//       setActiveChat(newChat);
//       fetchChats();
//       fetchMessages(newChat._id);
//       message.success(`Chat started with ${user.firstName} ${user.lastName}`);
//     }
//   } catch (error) {
//     console.error('Failed to start chat:', error);
//     message.error('Failed to start chat');
//   }
// };


//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Broadcast message function

// const sendBroadcastMessage = async () => {
//   if (!broadcastMessage.trim()) {
//     message.error('Please enter a broadcast message');
//     return;
//   }

//   setSendingBroadcast(true);
//   try {
//     const response = await apiService.chat.broadcastMessage({
//       message: broadcastMessage.trim(),
//       messageType: 'text'
//     });

//     if (response.data.success) {
//       message.success(response.data.message);
//       setBroadcastModalVisible(false);
//       setBroadcastMessage('');
//       fetchChats(); // Refresh chats to show broadcast messages
      
//       // Show detailed results
//       if (response.data.data.failed > 0) {
//         message.warning(`${response.data.data.successful} sent, ${response.data.data.failed} failed`);
//       }
//     }
//   } catch (error) {
//     console.error('Failed to send broadcast:', error);
//     message.error(error.response?.data?.message || 'Failed to send broadcast');
//   } finally {
//     setSendingBroadcast(false);
//   }
// };

// const fetchChats = async () => {
//   try {
//     setLoading(true);
//     const response = await apiService.chat.getUserChats();

//     if (response.data.success) {
//       setChats(response.data.data || []);
//       // Set first chat as active if none selected
//       if (response.data.data.length > 0 && !activeChat) {
//         setActiveChat(response.data.data[0]);
//       }
//     } else {
//       message.error(response.data.message || 'Failed to load chats');
//     }
//   } catch (error) {
//     console.error('Failed to fetch chats:', error);
//     // Don't show error message for initial load, only for user actions
//     if (chats.length === 0) {
//       message.error('Failed to load chats');
//     }
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchUsers = async () => {
//   try {
//     const response = await apiService.chat.getAllUsers();
//     if (response.data.success) {
//       setUsers(response.data.data || []);
//     }
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//     // Silent fail for users list
//   }
// };

//   const fetchMessages = async (chatId) => {
//     setLoading(true);
//     try {
//       const response = await apiService.chat.getChatMessages(chatId);
//       if (response.data.success) {
//         setMessages(response.data.data || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch messages:', error);
//       message.error('Failed to load messages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Real-time message sending

// // const sendMessage = async () => {
// //   if (!newMessage.trim() || !activeChat || !socket) return;

// //   // ✅ FIX: Get the correct receiver ID
// //   const receiver = getOtherParticipant(activeChat);
// //   if (!receiver || !receiver._id) {
// //     message.error('Cannot determine message recipient');
// //     return;
// //   }

// //   const receiverId = receiver._id;

// //   // ✅ FIX: Prevent sending to yourself
// //   if (receiverId === currentUser._id) {
// //     message.error('Cannot send message to yourself');
// //     return;
// //   }

// //   const tempMessage = {
// //     _id: `temp_${Date.now()}`,
// //     sender: {
// //       _id: currentUser._id,
// //       firstName: currentUser.firstName,
// //       lastName: currentUser.lastName,
// //       profilePhoto: currentUser.profilePhoto
// //     },
// //     message: newMessage.trim(),
// //     createdAt: new Date(),
// //     isRead: false,
// //     isSending: true
// //   };

// //   // Optimistically add message to UI
// //   setMessages(prev => [...prev, tempMessage]);
// //   setNewMessage('');

// //   try {
// //     const response = await apiService.chat.sendMessage({
// //       receiverId: receiverId, // ✅ Use the correct receiver ID
// //       message: newMessage.trim()
// //     });

// //     if (response.data.success) {
// //       const sentMessage = response.data.data;
      
// //       // Replace temp message with real one
// //       setMessages(prev => 
// //         prev.map(msg => 
// //           msg._id === tempMessage._id ? { ...sentMessage, isSending: false } : msg
// //         )
// //       );

// //       // Emit socket event for real-time delivery
// //       socket.emit("sendMessage", {
// //         senderId: currentUser._id,
// //         senderName: `${currentUser.firstName} ${currentUser.lastName}`,
// //         senderPhoto: currentUser.profilePhoto,
// //         receiverId: receiverId, // ✅ Use the correct receiver ID
// //         chatId: activeChat._id,
// //         message: newMessage.trim(),
// //         createdAt: new Date()
// //       });

// //       // Refresh chats to update last message
// //       fetchChats();
// //     }
// //   } catch (error) {
// //     console.error('Failed to send message:', error);
// //     message.error(error.response?.data?.message || 'Failed to send message');
    
// //     // Remove temp message on error
// //     setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
// //     setNewMessage(newMessage);
// //   }
// // };

//   // SMS sending functionality
//   const sendSMS = async (values) => {
//     setSendingSMS(true);
//     try {
//       const response = await apiService.sms.sendSMS(values);
//       if (response.data.success) {
//         message.success('SMS sent successfully!');
//         setComposeModalVisible(false);
//         composeForm.resetFields();
//       } else {
//         throw new Error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Failed to send SMS:', error);
//       message.error(error.response?.data?.message || 'Failed to send SMS');
//     } finally {
//       setSendingSMS(false);
//     }
//   };

//   // const startNewChat = async (userId) => {
//   //   try {
//   //     const response = await apiService.chat.getOrCreateChat(userId);
//   //     if (response.data.success) {
//   //       setActiveChat(response.data.data);
//   //       fetchChats();
//   //       message.success('Chat started successfully');
//   //     }
//   //   } catch (error) {
//   //     console.error('Failed to start chat:', error);
//   //     message.error('Failed to start chat');
//   //   }
//   // };

//          // Chat.jsx - Improve user selection and chat creation
// // const startNewChat = async (user) => {
// //   try {
// //     console.log("💬 Starting new chat with:", {
// //       userId: user._id,
// //       userName: `${user.firstName} ${user.lastName}`,
// //       userEmail: user.email
// //     });

// //     const response = await apiService.chat.getOrCreateChat(user._id);

// //     if (response.data.success) {
// //       setActiveChat(response.data.data);
// //       fetchChats();
// //       message.success(`Chat started with ${user.firstName} ${user.lastName}`);
      
// //       // Fetch messages for the new chat
// //       fetchMessages(response.data.data._id);
// //     }
// //   } catch (error) {
// //     console.error('Failed to start chat:', error);
// //     message.error('Failed to start chat');
// //   }
// // };


//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

// // In your Chat.jsx - Fix the getOtherParticipant function
// const getOtherParticipant = (chat) => {
//   if (!chat || !chat.participants) return null;
  
//   if (chat.isGroup) {
//     return {
//       _id: chat._id,
//       firstName: chat.groupName,
//       lastName: '',
//       profilePhoto: null,
//       isGroup: true
//     };
//   }
  
//   // ✅ FIX: Properly find the other participant
//   const otherParticipant = chat.participants?.find(p => {
//     // Compare string IDs to ensure accuracy
//     return p._id.toString() !== currentUser?._id?.toString();
//   });
  
//   console.log("🔍 getOtherParticipant result:", {
//     chatId: chat._id,
//     participants: chat.participants?.map(p => ({ id: p._id, name: `${p.firstName} ${p.lastName}` })),
//     currentUser: currentUser?._id,
//     foundParticipant: otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'None'
//   });
  
//   return otherParticipant || null;
// };

// // ✅ FIX: Improved sendMessage function
// const sendMessage = async () => {
//   if (!newMessage.trim() || !activeChat || !socket) {
//     message.error('Cannot send empty message');
//     return;
//   }

//   // ✅ Get the correct receiver with better validation
//   const receiver = getOtherParticipant(activeChat);
  
//   if (!receiver || !receiver._id) {
//     console.error("❌ No receiver found:", { activeChat, receiver });
//     message.error('Cannot determine message recipient. Please select a valid chat.');
//     return;
//   }

//   const receiverId = receiver._id;

//   // ✅ Double-check: Prevent sending to yourself
//   if (receiverId.toString() === currentUser._id.toString()) {
//     console.error("❌ Self-message attempt:", {
//       sender: currentUser._id,
//       receiver: receiverId,
//       receiverName: `${receiver.firstName} ${receiver.lastName}`
//     });
//     message.error('Cannot send message to yourself');
//     return;
//   }

//   console.log("📤 Sending message:", {
//     from: currentUser._id,
//     to: receiverId,
//     toName: `${receiver.firstName} ${receiver.lastName}`,
//     message: newMessage.trim()
//   });

//   const tempMessage = {
//     _id: `temp_${Date.now()}`,
//     sender: {
//       _id: currentUser._id,
//       firstName: currentUser.firstName,
//       lastName: currentUser.lastName,
//       profilePhoto: currentUser.profilePhoto
//     },
//     message: newMessage.trim(),
//     createdAt: new Date(),
//     isRead: false,
//     isSending: true
//   };

//   // Optimistically add message to UI
//   setMessages(prev => [...prev, tempMessage]);
//   const originalMessage = newMessage;
//   setNewMessage('');

//   try {
//     const response = await apiService.chat.sendMessage({
//       receiverId: receiverId,
//       message: originalMessage.trim()
//     });

//     if (response.data.success) {
//       const sentMessage = response.data.data;
      
//       // Replace temp message with real one
//       setMessages(prev => 
//         prev.map(msg => 
//           msg._id === tempMessage._id ? { ...sentMessage, isSending: false } : msg
//         )
//       );

//       // Emit socket event for real-time delivery
//       socket.emit("sendMessage", {
//         senderId: currentUser._id,
//         senderName: `${currentUser.firstName} ${currentUser.lastName}`,
//         senderPhoto: currentUser.profilePhoto,
//         receiverId: receiverId,
//         chatId: activeChat._id,
//         message: originalMessage.trim(),
//         createdAt: new Date()
//       });

//       // Refresh chats to update last message
//       fetchChats();
      
//       console.log("✅ Message sent successfully");
//     }
//   } catch (error) {
//     console.error('❌ Failed to send message:', error);
//     const errorMsg = error.response?.data?.message || 'Failed to send message';
//     message.error(errorMsg);
    
//     // Remove temp message on error
//     setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
//     setNewMessage(originalMessage);
//   }
// };

//   const filteredChats = chats.filter(chat => {
//     if (!searchQuery) return true;
    
//     const otherParticipant = getOtherParticipant(chat);
//     const searchTerm = searchQuery.toLowerCase();
    
//     if (chat.isGroup) {
//       return chat.groupName?.toLowerCase().includes(searchTerm);
//     } else {
//       return (
//         otherParticipant?.firstName?.toLowerCase().includes(searchTerm) ||
//         otherParticipant?.lastName?.toLowerCase().includes(searchTerm) ||
//         otherParticipant?.email?.toLowerCase().includes(searchTerm)
//       );
//     }
//   });

//   const filteredUsers = users.filter(user => {
//     if (!searchQuery) return false;
    
//     const searchTerm = searchQuery.toLowerCase();
//     return (
//       user.firstName?.toLowerCase().includes(searchTerm) ||
//       user.lastName?.toLowerCase().includes(searchTerm) ||
//       user.email?.toLowerCase().includes(searchTerm)
//     );
//   });

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white border-gray-200';

//   const textClass = currentTheme === 'dark' ? 'text-white' : 'text-gray-800';
//   const textSecondaryClass = currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         <div className="mb-6 flex justify-between items-center">
//           <div>
//             <Title level={2} className={textClass}>
//               <MessageOutlined className="mr-3" />
//               Association Communications
//             </Title>
//             <Text className={textSecondaryClass}>
//               Real-time chat & SMS notifications
//             </Text>
//           </div>
          

//           <Button 
//             type="primary" 
//             icon={<MailOutlined />}
//             onClick={() => setComposeModalVisible(true)}
//           >
//             Send SMS
//           </Button>

//              <Space>
//     {/* Broadcast Button for Admin */}
//     {isAdmin && (
//       <Button 
//         type="primary" 
//         icon={<NotificationOutlined />}
//         onClick={() => setBroadcastModalVisible(true)}
//       >
//         Broadcast to All
//       </Button>
//     )}
    
//     {/* SMS Button */}
//     <Button 
//       type="primary" 
//       icon={<MailOutlined />}
//       onClick={() => setComposeModalVisible(true)}
//     >
//       Send SMS
//     </Button>
//   </Space>



//         </div>

//         <Row gutter={[16, 16]} className="h-[600px]">
//           {/* Chat List */}
//           <Col xs={24} md={8}>
//             <Card className={`h-full ${cardClass}`}>
//               <div className="mb-4">
//                 <Input
//                   placeholder="Search chats or users..."
//                   prefix={<SearchOutlined />}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   allowClear
//                 />
//               </div>
              
//               {loading ? (
//                 <div className="flex justify-center items-center h-32">
//                   <Spin size="large" />
//                 </div>
//               ) : (
//                 <>
//                   {/* {searchQuery && filteredUsers.length > 0 && (
//                     <div className="mb-4">
//                       <Text strong className={textClass}>Start New Chat</Text>
//                       <List
//                         dataSource={filteredUsers}
//                         renderItem={(user) => (
//                           <List.Item
//                             className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
//                             onClick={() => startNewChat(user._id)}
//                           >
//                             <div className="flex items-center w-full">
//                               <Avatar 
//                                 src={user.profilePhoto} 
//                                 icon={<UserOutlined />}
//                                 className="mr-3"
//                               />
//                               <div className="flex-1 min-w-0">
//                                 <Text strong className={`block truncate ${textClass}`}>
//                                   {user.firstName} {user.lastName}
//                                 </Text>
//                                 <Text type="secondary" className="text-xs truncate block">
//                                   {user.email}
//                                 </Text>
//                               </div>
//                             </div>
//                           </List.Item>
//                         )}
//                       />
//                     </div>
//                   )} */}
//                   {/* // Improved user list with better information */}
// {searchQuery && filteredUsers.length > 0 && (
//   <div className="mb-4">
//     <Text strong className={textClass}>Start New Chat</Text>
//     <List
//       dataSource={filteredUsers}
//       renderItem={(user) => (
//         <List.Item
//           className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
//           onClick={() => startNewChat(user)}
//         >
//           <div className="flex items-center w-full">
//             <Avatar 
//               src={user.profilePhoto} 
//               icon={<UserOutlined />}
//               className="mr-3"
//             />
//             <div className="flex-1 min-w-0">
//               <Text strong className={`block truncate ${textClass}`}>
//                 {user.firstName} {user.lastName}
//               </Text>
//               <div className="flex justify-between items-center">
//                 <Text type="secondary" className="text-xs truncate block flex-1">
//                   {user.email}
//                 </Text>
//                 <Tag color="blue" className="text-xs ml-2">
//                   {user.role}
//                 </Tag>
//               </div>
//             </div>
//           </div>
//         </List.Item>
//       )}
//     />
//   </div>
// )}

//                   <List
//                     dataSource={filteredChats}
//                     renderItem={(chat) => {
//                       const otherParticipant = getOtherParticipant(chat);
//                       return (
//                         <List.Item
//                           className={`p-3 cursor-pointer border-b border-gray-200 dark:border-gray-600 ${
//                             activeChat?._id === chat._id 
//                               ? 'bg-blue-50 dark:bg-blue-900/20' 
//                               : 'hover:bg-gray-50 dark:hover:bg-gray-700'
//                           }`}
//                           onClick={() => setActiveChat(chat)}
//                         >
//                           <div className="flex items-center w-full">
//                             <Badge dot={chat.unreadCount > 0} color="green">
//                               <Avatar 
//                                 src={otherParticipant?.profilePhoto} 
//                                 icon={<UserOutlined />}
//                                 className="mr-3"
//                               />
//                             </Badge>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex justify-between items-start">
//                                 <Text strong className={`block truncate ${textClass}`}>
//                                   {chat.isGroup ? chat.groupName : `${otherParticipant?.firstName} ${otherParticipant?.lastName}`}
//                                 </Text>
//                                 <Text type="secondary" className="text-xs">
//                                   {dayjs(chat.updatedAt).format('HH:mm')}
//                                 </Text>
//                               </div>
//                               <Text type="secondary" className="text-xs truncate block">
//                                 {chat.lastMessage?.message || 'No messages yet'}
//                               </Text>
//                             </div>
//                           </div>
//                         </List.Item>
//                       );
//                     }}
//                     locale={{
//                       emptyText: searchQuery ? 'No chats or users found' : 'No conversations yet'
//                     }}
//                   />
//                 </>
//               )}
//             </Card>
//           </Col>

//           {/* Chat Area */}
//           <Col xs={24} md={16}>
//             <Card className={`h-full flex flex-col ${cardClass}`}>
//               {activeChat ? (
//                 <>
//                   <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
//                     <div className="flex items-center">
//                       <Avatar 
//                         src={getOtherParticipant(activeChat)?.profilePhoto} 
//                         icon={<UserOutlined />}
//                         className="mr-3"
//                       />
//                       <div>
//                         <Text strong className={textClass}>
//                           {activeChat.isGroup ? activeChat.groupName : 
//                             `${getOtherParticipant(activeChat)?.firstName} ${getOtherParticipant(activeChat)?.lastName}`}
//                         </Text>
//                         <br />
//                         <Text type="secondary" className="text-xs">
//                           {activeChat.isGroup ? 
//                             `${activeChat.participants?.length || 0} participants` : 
//                             'Online'}
//                         </Text>
//                       </div>
//                     </div>
//                     <Space>
//                       <Button type="text" icon={<PhoneOutlined />} />
//                       <Button type="text" icon={<VideoCameraOutlined />} />
//                       <Dropdown
//                         menu={{
//                           items: [
//                             { key: 'profile', label: 'View Profile' },
//                             { key: 'clear', label: 'Clear Chat' },
//                             { key: 'block', label: 'Block User', danger: true },
//                           ],
//                         }}
//                         trigger={['click']}
//                       >
//                         <Button type="text" icon={<MoreOutlined />} />
//                       </Dropdown>
//                     </Space>
//                   </div>

//                   <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     {messages.length > 0 ? (
//                       messages.map((msg) => (
//                         <div
//                           key={msg._id}
//                           className={`flex ${
//                             msg.sender?._id === currentUser?._id 
//                               ? 'justify-end' 
//                               : 'justify-start'
//                           }`}
//                         >
//                           <div
//                             className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                               msg.sender?._id === currentUser?._id
//                                 ? 'bg-blue-500 text-white'
//                                 : currentTheme === 'dark' 
//                                   ? 'bg-gray-700 text-white'
//                                   : 'bg-gray-100 text-gray-800'
//                             } ${msg.isSending ? 'opacity-70' : ''}`}
//                           >
//                             {msg.isSending && (
//                               <div className="text-xs text-blue-200 mb-1">Sending...</div>
//                             )}
//                             <Text>{msg.message}</Text>
//                             <div className={`text-xs mt-1 ${
//                               msg.sender?._id === currentUser?._id
//                                 ? 'text-blue-100'
//                                 : 'text-gray-500'
//                             }`}>
//                               {dayjs(msg.createdAt).format('HH:mm')}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="flex items-center justify-center h-32 text-gray-500">
//                         <div className="text-center">
//                           <MessageOutlined className="text-2xl mb-2" />
//                           <Text>No messages yet. Start the conversation!</Text>
//                         </div>
//                       </div>
//                     )}
//                     <div ref={messagesEndRef} />
//                   </div>

//                   <div className="p-4 border-t border-gray-200 dark:border-gray-600">
//                     <Space.Compact style={{ width: '100%' }}>
//                       <Button type="text" icon={<PaperClipOutlined />} />
//                       <TextArea
//                         placeholder="Type a message..."
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onPressEnter={(e) => {
//                           if (!e.shiftKey) {
//                             e.preventDefault();
//                             sendMessage();
//                           }
//                         }}
//                         autoSize={{ minRows: 1, maxRows: 4 }}
//                       />
//                       <Button 
//                         type="primary" 
//                         icon={<SendOutlined />}
//                         onClick={sendMessage}
//                         disabled={!newMessage.trim()}
//                         loading={loading}
//                       >
//                         Send
//                       </Button>
//                     </Space.Compact>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-gray-500">
//                   <div className="text-center">
//                     <MessageOutlined className="text-4xl mb-4" />
//                     <Text>Select a chat to start messaging</Text>
//                   </div>
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Card>

//       <Modal
//         title="Send SMS Notification"
//         open={composeModalVisible}
//         onCancel={() => {
//           setComposeModalVisible(false);
//           composeForm.resetFields();
//         }}
//         footer={null}
//         width={600}
//       >
//         <Form
//           form={composeForm}
//           layout="vertical"
//           onFinish={sendSMS}
//         >
//           <Form.Item
//             name="messageType"
//             label="Message Type"
//             initialValue="notification"
//             rules={[{ required: true, message: 'Please select message type' }]}
//           >
//             <Select>
//               <Option value="notification">General Notification</Option>
//               <Option value="alert">Alert</Option>
//               <Option value="reminder">Reminder</Option>
//               <Option value="announcement">Announcement</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="phoneNumber"
//             label="Phone Number"
//             rules={[
//               { required: true, message: 'Please enter phone number' },
//               { pattern: /^[0-9+\-\s()]{10,}$/, message: 'Please enter valid phone number' }
//             ]}
//           >
//             <Input placeholder="Enter recipient phone number" />
//           </Form.Item>

//           <Form.Item
//             name="message"
//             label="Message"
//             rules={[
//               { required: true, message: 'Please enter message' },
//               { max: 160, message: 'Message must be less than 160 characters' }
//             ]}
//           >
//             <TextArea
//               rows={4}
//               placeholder="Enter your SMS message (max 160 characters)"
//               showCount
//               maxLength={160}
//             />
//           </Form.Item>

//           <Form.Item>
//             <Space>
//               <Button 
//                 type="primary" 
//                 htmlType="submit" 
//                 loading={sendingSMS}
//                 icon={<MailOutlined />}
//               >
//                 Send SMS
//               </Button>
//               <Button 
//                 onClick={() => setComposeModalVisible(false)}
//               >
//                 Cancel
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Modal>
//       <Modal
//   title="📢 Broadcast Message to All Users"
//   open={broadcastModalVisible}
//   onCancel={() => {
//     setBroadcastModalVisible(false);
//     setBroadcastMessage('');
//   }}
//   footer={[
//     <Button key="cancel" onClick={() => setBroadcastModalVisible(false)}>
//       Cancel
//     </Button>,
//     <Button 
//       key="send"
//       type="primary" 
//       loading={sendingBroadcast}
//       onClick={sendBroadcastMessage}
//       disabled={!broadcastMessage.trim()}
//     >
//       Send Broadcast
//     </Button>,
//   ]}
//   width={600}
// >
//   <div className="p-4">
//     <Text className="block mb-2">
//       This message will be sent to all active users in the system.
//     </Text>
//     <TextArea
//       placeholder="Enter your broadcast message here..."
//       value={broadcastMessage}
//       onChange={(e) => setBroadcastMessage(e.target.value)}
//       rows={4}
//       maxLength={500}
//       showCount
//     />
//     <div className="mt-3 p-3 bg-blue-50 rounded-lg">
//       <Text strong className="text-blue-700">
//         💡 Broadcast Tips:
//       </Text>
//       <ul className="text-blue-600 text-sm mt-1 list-disc list-inside">
//         <li>This will create individual chat threads with each user</li>
//         <li>Users will receive real-time notifications</li>
//         <li>Each user can reply to the broadcast individually</li>
//       </ul>
//     </div>
//   </div>
//       </Modal>
//     </div>
//   );
// };

// export default Chat;


import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  List,
  Input,
  Button,
  Space,
  Avatar,
  Typography,
  Badge,
  Dropdown,
  message,
  Row,
  Col,
  Spin,
  Modal,
  Form,
  Select,
  Tag,
} from 'antd';
import {
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
  PaperClipOutlined,
  SendOutlined,
  MoreOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MailOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { apiService } from '../../services/apiService';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [composeModalVisible, setComposeModalVisible] = useState(false);
  const [sendingSMS, setSendingSMS] = useState(false);
  const [composeForm] = Form.useForm();

  const [broadcastModalVisible, setBroadcastModalVisible] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [sendingBroadcast, setSendingBroadcast] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const isAdmin = currentUser?.role === 'Admin';
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const messagesEndRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";


   const debugChatData = () => {
  console.log('🔍 DEBUG CHAT DATA:');
  console.log('Current User:', currentUser);
  console.log('Active Chat:', activeChat);
  if (activeChat) {
    console.log('Participants:', activeChat.participants);
    const receiver = getOtherParticipant(activeChat);
    console.log('Other Participant:', receiver);
    console.log('Can send message?', receiver && receiver._id !== currentUser._id);
  }
};

// Call this when activeChat changes
useEffect(() => {
  if (activeChat) {
    debugChatData();
  }
}, [activeChat]);


// ✅ FIXED: Socket.io connection with proper configuration
useEffect(() => {
  const newSocket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    withCredentials: true,
    // reconnection: true,
    // reconnectionAttempts: 5,
    // reconnectionDelay: 1000,
  });
  
  setSocket(newSocket);

  // Join user's private room
  if (currentUser?._id) {
    console.log('🟢 Joining user room:', currentUser._id);
    newSocket.emit("join", currentUser._id);
  }

  // Listen for incoming messages
  newSocket.on("receiveMessage", (data) => {
    console.log("📥 New real-time message:", data);
    
    if (activeChat && data.chatId === activeChat._id) {
      setMessages(prev => [...prev, formatMessage(data)]);
    }
    
    fetchChats();
  });

  newSocket.on("connect", () => {
    console.log("✅ Connected to chat server");
    setConnectionStatus('connected');
  });

  newSocket.on("disconnect", () => {
    console.log("🔌 Disconnected from chat server");
    setConnectionStatus('disconnected');
  });

  newSocket.on("connect_error", (error) => {
    console.error("❌ Socket connection error:", error);
    setConnectionStatus('error');
  });

  return () => {
    console.log("🧹 Cleaning up socket connection");
    newSocket.disconnect();
  };
}, [currentUser?._id]);

  // Format message for display
  const formatMessage = (msg) => ({
    _id: msg._id || `temp_${Date.now()}`,
    sender: {
      _id: msg.senderId,
      firstName: msg.senderName?.split(' ')[0] || 'User',
      lastName: msg.senderName?.split(' ')[1] || '',
      profilePhoto: msg.senderPhoto
    },
    message: msg.message,
    createdAt: msg.createdAt || new Date(),
    isRead: msg.isRead || false
  });

  // Fetch initial data
  useEffect(() => {
    fetchChats();
    fetchUsers();
  }, []);

// Get the other participant in chat - IMPROVED VERSION
const getOtherParticipant = (chat) => {
  if (!chat || !chat.participants || !Array.isArray(chat.participants)) return null;
  
  if (chat.isGroup) {
    return {
      _id: chat._id,
      firstName: chat.groupName,
      lastName: '',
      profilePhoto: null,
      isGroup: true
    };
  }
  
  // ✅ FIX: Properly find the other participant
  const otherParticipant = chat.participants.find(p => {
    // Handle both object and string IDs
    const participantId = p._id || p;
    return participantId !== currentUser?._id;
  });
  
  console.log('🔍 getOtherParticipant debug:', {
    currentUserId: currentUser?.id,
    participants: chat.participants,
    foundParticipant: otherParticipant
  });
  
  return otherParticipant || null;
};


// Send message function - FIXED VERSION
const sendMessage = async () => {
  if (!newMessage.trim() || !activeChat || !socket) {
    message.error('Please enter a message');
    return;
  }

  // ✅ FIX: Get the correct receiver from activeChat participants
  const receiver = activeChat.participants?.find(p => {
    const participantId = p._id || p;
    return participantId !== currentUser?.id; // Use currentUser.id
  });
  
  if (!receiver || !receiver._id) {
    console.error('❌ Cannot determine message recipient:', {
      currentUser: currentUser?.id,
      participants: activeChat.participants,
      receiver
    });
    message.error('Cannot determine message recipient');
    return;
  }

  // ✅ FIX: Double-check we're not sending to ourselves
  if (receiver._id === currentUser.id) {
    console.error('❌ Attempting to send to self:', {
      currentUser: currentUser.id,
      receiver: receiver._id
    });
    message.error('Cannot send message to yourself');
    return;
  }

  console.log('📤 Sending message to:', {
    from: currentUser.id,
    to: receiver._id,
    message: newMessage.trim()
  });

  // Create temporary message for optimistic UI
  const tempMessage = {
    _id: `temp_${Date.now()}`,
    sender: {
      _id: currentUser.id, // Use currentUser.id
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      profilePhoto: currentUser.profilePhoto
    },
    message: newMessage.trim(),
    createdAt: new Date(),
    isRead: false,
    isSending: true
  };

  // Optimistically add message to UI
  setMessages(prev => [...prev, tempMessage]);
  const originalMessage = newMessage;
  setNewMessage('');

  try {
    const response = await apiService.chat.sendMessage({
      receiverId: receiver._id, // ✅ This should now be the correct receiver
      message: originalMessage.trim()
    });

    if (response.data.success) {
      const sentMessage = response.data.data;
      
      // Replace temp message with real one
      setMessages(prev => 
        prev.map(msg => 
          msg._id === tempMessage._id ? { ...sentMessage, isSending: false } : msg
        )
      );

      // Emit socket event for real-time delivery
      socket.emit("sendMessage", {
        senderId: currentUser.id, // Use currentUser.id
        senderName: `${currentUser.firstName} ${currentUser.lastName}`,
        senderPhoto: currentUser.profilePhoto,
        receiverId: receiver._id,
        chatId: activeChat._id,
        message: originalMessage.trim(),
        createdAt: new Date()
      });

      // Refresh chats to update last message
      fetchChats();
      
      message.success('Message sent successfully!');
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    message.error('Failed to send message');
    
    // Remove temp message on error
    setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
    setNewMessage(originalMessage);
  }
};

// ✅ FIXED: Start new chat with user
const startNewChat = async (user) => {
  try {
    // ✅ FIX: Validate we're not creating chat with ourselves
    if (user._id === currentUser.id) { // Use currentUser.id
      message.error('Cannot create chat with yourself');
      return;
    }

    console.log('🆕 Starting new chat with:', {
      currentUser: currentUser.id,
      targetUser: user._id
    });

    const response = await apiService.chat.getOrCreateChat(user._id);

    if (response.data.success) {
      const newChat = response.data.data;
      setActiveChat(newChat);
      fetchChats();
      fetchMessages(newChat._id);
      message.success(`Chat started with ${user.firstName} ${user.lastName}`);
    }
  } catch (error) {
    console.error('Failed to start chat:', error);
    message.error('Failed to start chat');
  }
};

  // Fetch chats
  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await apiService.chat.getUserChats();

      if (response.data.success) {
        setChats(response.data.data || []);
        if (response.data.data.length > 0 && !activeChat) {
          setActiveChat(response.data.data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users for new chat
  const fetchUsers = async () => {
    try {
      const response = await apiService.chat.getAllUsers();
      if (response.data.success) {
        setUsers(response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  // Fetch messages for active chat
  const fetchMessages = async (chatId) => {
    setLoading(true);
    try {
      const response = await apiService.chat.getChatMessages(chatId);
      if (response.data.success) {
        setMessages(response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Broadcast message
  const sendBroadcastMessage = async () => {
    if (!broadcastMessage.trim()) {
      message.error('Please enter a broadcast message');
      return;
    }

    setSendingBroadcast(true);
    try {
      const response = await apiService.chat.broadcastMessage({
        message: broadcastMessage.trim(),
        messageType: 'text'
      });

      if (response.data.success) {
        message.success(response.data.message);
        setBroadcastModalVisible(false);
        setBroadcastMessage('');
        fetchChats();
      }
    } catch (error) {
      console.error('Failed to send broadcast:', error);
      message.error('Failed to send broadcast');
    } finally {
      setSendingBroadcast(false);
    }
  };

  // SMS sending
  const sendSMS = async (values) => {
    setSendingSMS(true);
    try {
      const response = await apiService.sms.sendSMS(values);
      if (response.data.success) {
        message.success('SMS sent successfully!');
        setComposeModalVisible(false);
        composeForm.resetFields();
      }
    } catch (error) {
      console.error('Failed to send SMS:', error);
      message.error('Failed to send SMS');
    } finally {
      setSendingSMS(false);
    }
  };

  // Filter chats and users for search
  const filteredChats = chats.filter(chat => {
    if (!searchQuery) return true;
    const otherParticipant = getOtherParticipant(chat);
    const searchTerm = searchQuery.toLowerCase();
    
    if (chat.isGroup) {
      return chat.groupName?.toLowerCase().includes(searchTerm);
    } else {
      return (
        otherParticipant?.firstName?.toLowerCase().includes(searchTerm) ||
        otherParticipant?.lastName?.toLowerCase().includes(searchTerm) ||
        otherParticipant?.email?.toLowerCase().includes(searchTerm)
      );
    }
  });

  const filteredUsers = users.filter(user => {
    if (!searchQuery) return false;
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(searchTerm) ||
      user.lastName?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm)
    );
  });

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  const textClass = currentTheme === 'dark' ? 'text-white' : 'text-gray-800';
  const textSecondaryClass = currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        <div className="mb-6 flex justify-between items-center">
          <div>
            <div className="flex items-center mb-2">
  <div className={`w-3 h-3 rounded-full mr-2 ${
    connectionStatus === 'connected' ? 'bg-green-500' : 
    connectionStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
  }`} />
  <Text className="text-sm">
    {connectionStatus === 'connected' ? 'Connected' : 
     connectionStatus === 'error' ? 'Connection Error' : 'Connecting...'}
  </Text>
</div>
            <Title level={2} className={textClass}>
              <MessageOutlined className="mr-3" />
              Association Communications
            </Title>
            <Text className={textSecondaryClass}>
              Real-time chat & SMS notifications
            </Text>
          </div>
          
          <Space>
            {isAdmin && (
              <Button 
                type="primary" 
                icon={<NotificationOutlined />}
                onClick={() => setBroadcastModalVisible(true)}
              >
                Broadcast to All
              </Button>
            )}
            <Button 
              type="primary" 
              icon={<MailOutlined />}
              onClick={() => setComposeModalVisible(true)}
            >
              Send SMS
            </Button>
          </Space>
        </div>

        <Row gutter={[16, 16]} className="h-[600px]">
          {/* Chat List Sidebar */}
          <Col xs={24} md={8}>
            <Card className={`h-full ${cardClass}`}>
              <div className="mb-4">
                <Input
                  placeholder="Search chats or users..."
                  prefix={<SearchOutlined />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                />
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <Spin size="large" />
                </div>
              ) : (
                <>
                  {/* Start New Chat Section */}
                  {searchQuery && filteredUsers.length > 0 && (
                    <div className="mb-4">
                      <Text strong className={textClass}>Start New Chat</Text>
                      <List
                        dataSource={filteredUsers}
                        renderItem={(user) => (
                          <List.Item
                            className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
                            onClick={() => startNewChat(user)}
                          >
                            <div className="flex items-center w-full">
                              <Avatar 
                                src={user.profilePhoto} 
                                icon={<UserOutlined />}
                                className="mr-3"
                              />
                              <div className="flex-1 min-w-0">
                                <Text strong className={`block truncate ${textClass}`}>
                                  {user.firstName} {user.lastName}
                                </Text>
                                <div className="flex justify-between items-center">
                                  <Text type="secondary" className="text-xs truncate block flex-1">
                                    {user.email}
                                  </Text>
                                  <Tag color="blue" className="text-xs ml-2">
                                    {user.role}
                                  </Tag>
                                </div>
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                    </div>
                  )}

                  {/* Existing Chats List */}
                  <List
                    dataSource={filteredChats}
                    renderItem={(chat) => {
                      const otherParticipant = getOtherParticipant(chat);
                      return (
                        <List.Item
                          className={`p-3 cursor-pointer border-b border-gray-200 dark:border-gray-600 ${
                            activeChat?._id === chat._id 
                              ? 'bg-blue-50 dark:bg-blue-900/20' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setActiveChat(chat)}
                        >
                          <div className="flex items-center w-full">
                            <Badge dot={chat.unreadCount > 0} color="green">
                              <Avatar 
                                src={otherParticipant?.profilePhoto} 
                                icon={<UserOutlined />}
                                className="mr-3"
                              />
                            </Badge>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <Text strong className={`block truncate ${textClass}`}>
                                  {chat.isGroup ? chat.groupName : `${otherParticipant?.firstName} ${otherParticipant?.lastName}`}
                                </Text>
                                <Text type="secondary" className="text-xs">
                                  {dayjs(chat.updatedAt).format('HH:mm')}
                                </Text>
                              </div>
                              <Text type="secondary" className="text-xs truncate block">
                                {chat.lastMessage?.message || 'No messages yet'}
                              </Text>
                            </div>
                          </div>
                        </List.Item>
                      );
                    }}
                    locale={{
                      emptyText: searchQuery ? 'No chats or users found' : 'No conversations yet'
                    }}
                  />
                </>
              )}
            </Card>
          </Col>

          {/* Chat Area */}
          <Col xs={24} md={16}>
            <Card className={`h-full flex flex-col ${cardClass}`}>
              {activeChat ? (
                <>
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center">
                      <Avatar 
                        src={getOtherParticipant(activeChat)?.profilePhoto} 
                        icon={<UserOutlined />}
                        className="mr-3"
                      />
                      <div>
                        <Text strong className={textClass}>
                          {activeChat.isGroup ? activeChat.groupName : 
                            `${getOtherParticipant(activeChat)?.firstName} ${getOtherParticipant(activeChat)?.lastName}`}
                        </Text>
                        <br />
                        <Text type="secondary" className="text-xs">
                          {activeChat.isGroup ? 
                            `${activeChat.participants?.length || 0} participants` : 
                            'Online'}
                        </Text>
                      </div>
                    </div>
                    <Space>
                      <Button type="text" icon={<PhoneOutlined />} />
                      <Button type="text" icon={<VideoCameraOutlined />} />
                      <Dropdown
                        menu={{
                          items: [
                            { key: 'profile', label: 'View Profile' },
                            { key: 'clear', label: 'Clear Chat' },
                            { key: 'block', label: 'Block User', danger: true },
                          ],
                        }}
                        trigger={['click']}
                      >
                        <Button type="text" icon={<MoreOutlined />} />
                      </Dropdown>
                    </Space>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length > 0 ? (
                      messages.map((msg) => (
                        <div
                          key={msg._id}
                          className={`flex ${
                            msg.sender?._id === currentUser?._id 
                              ? 'justify-end' 
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.sender?._id === currentUser?._id
                                ? 'bg-blue-500 text-white'
                                : currentTheme === 'dark' 
                                  ? 'bg-gray-700 text-white'
                                  : 'bg-gray-100 text-gray-800'
                            } ${msg.isSending ? 'opacity-70' : ''}`}
                          >
                            {msg.isSending && (
                              <div className="text-xs text-blue-200 mb-1">Sending...</div>
                            )}
                            <Text>{msg.message}</Text>
                            <div className={`text-xs mt-1 ${
                              msg.sender?._id === currentUser?._id
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}>
                              {dayjs(msg.createdAt).format('HH:mm')}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-32 text-gray-500">
                        <div className="text-center">
                          <MessageOutlined className="text-2xl mb-2" />
                          <Text>No messages yet. Start the conversation!</Text>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                    <Space.Compact style={{ width: '100%' }}>
                      <Button type="text" icon={<PaperClipOutlined />} />
                      <TextArea
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onPressEnter={(e) => {
                          if (!e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        autoSize={{ minRows: 1, maxRows: 4 }}
                      />
                      <Button 
                        type="primary" 
                        icon={<SendOutlined />}
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        loading={loading}
                      >
                        Send
                      </Button>
                    </Space.Compact>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <MessageOutlined className="text-4xl mb-4" />
                    <Text>Select a chat to start messaging</Text>
                  </div>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Card>

      {/* SMS Modal */}
      <Modal
        title="Send SMS Notification"
        open={composeModalVisible}
        onCancel={() => {
          setComposeModalVisible(false);
          composeForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={composeForm}
          layout="vertical"
          onFinish={sendSMS}
        >
          <Form.Item
            name="messageType"
            label="Message Type"
            initialValue="notification"
          >
            <Select>
              <Option value="notification">General Notification</Option>
              <Option value="alert">Alert</Option>
              <Option value="reminder">Reminder</Option>
              <Option value="announcement">Announcement</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter phone number' },
            ]}
          >
            <Input placeholder="Enter recipient phone number" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[
              { required: true, message: 'Please enter message' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter your SMS message"
              showCount
              maxLength={160}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={sendingSMS}
                icon={<MailOutlined />}
              >
                Send SMS
              </Button>
              <Button 
                onClick={() => setComposeModalVisible(false)}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Broadcast Modal */}
      <Modal
        title="📢 Broadcast Message to All Users"
        open={broadcastModalVisible}
        onCancel={() => {
          setBroadcastModalVisible(false);
          setBroadcastMessage('');
        }}
        footer={[
          <Button key="cancel" onClick={() => setBroadcastModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="send"
            type="primary" 
            loading={sendingBroadcast}
            onClick={sendBroadcastMessage}
            disabled={!broadcastMessage.trim()}
          >
            Send Broadcast
          </Button>,
        ]}
        width={600}
      >
        <div className="p-4">
          <Text className="block mb-2">
            This message will be sent to all active users in the system.
          </Text>
          <TextArea
            placeholder="Enter your broadcast message here..."
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            rows={4}
            maxLength={500}
            showCount
          />
        </div>
      </Modal>
    </div>
  );
};

export default Chat;