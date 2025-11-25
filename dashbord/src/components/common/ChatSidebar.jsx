// import { useState, useEffect, useRef } from 'react';
// import { 
//   Card, 
//   Input, 
//   Avatar, 
//   Typography, 
//   Badge,
//   Tabs,
//   Divider,
//   Button,
//   List
// } from 'antd';
// import { 
//   SearchOutlined,
//   MessageOutlined,
//   MoreOutlined,
//   PhoneOutlined,
//   VideoCameraOutlined,
//   UserOutlined
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import "./styles.css";

// const { Text, Title } = Typography;
// const { TabPane } = Tabs;

// const ChatSidebar = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [chats, setChats] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const user = useSelector((state) => state.user.value);

//   useEffect(() => {
//     fetchChats();
//     fetchOnlineUsers();
//   }, []);

//   const fetchChats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:3000/api/v1/chat/chats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         setChats(res.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching chats:', error);
//       // Mock data for demonstration
//       setChats(mockChats);
//     }
//   };

//   const fetchOnlineUsers = async () => {
//     // Mock online users data
//     setOnlineUsers([
//       { id: 1, name: 'Mohammad Ali', role: 'President', isOnline: true },
//       { id: 2, name: 'Abdul Karim', role: 'Member', isOnline: true },
//       { id: 3, name: 'Fatima Begum', role: 'Plot Owner', isOnline: true },
//       { id: 4, name: 'Rahim Khan', role: 'Finance Secretary', isOnline: false },
//     ]);
//   };

//   // Mock data based on your screenshot
//   const mockChats = [
//     {
//       _id: '1',
//       participants: [
//         { _id: '1', firstName: 'Ashley', lastName: 'Silva', profilePhoto: null, role: 'Member' },
//         { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//       ],
//       lastMessage: {
//         message: 'Good Morning',
//         createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
//         isRead: false
//       },
//       unreadCount: new Map([[user?.id, 1]])
//     },
//     {
//       _id: '2',
//       participants: [
//         { _id: '2', firstName: 'Misty', lastName: 'Taylor', profilePhoto: null, role: 'Plot Owner' },
//         { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//       ],
//       lastMessage: {
//         message: 'Okay, Byy',
//         createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
//         isRead: true
//       },
//       unreadCount: new Map([[user?.id, 0]])
//     },
//     {
//       _id: '3',
//       participants: [
//         { _id: '3', firstName: 'Scott', lastName: 'Wilson', profilePhoto: null, role: 'Committee Member' },
//         { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//       ],
//       lastMessage: {
//         message: 'Yeah everything is fine...',
//         createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
//         isRead: false
//       },
//       unreadCount: new Map([[user?.id, 2]])
//     },
//     {
//       _id: '4',
//       participants: [
//         { _id: '4', firstName: 'Patricia', lastName: 'Wilson', profilePhoto: null, role: 'Member' },
//         { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//       ],
//       lastMessage: {
//         message: 'Hey! there I\'m available',
//         createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
//         isRead: true
//       },
//       unreadCount: new Map([[user?.id, 0]])
//     },
//     {
//       _id: '5',
//       participants: [
//         { _id: '5', firstName: 'Allyson', lastName: 'Wigfall', profilePhoto: null, role: 'Plot Owner' },
//         { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//       ],
//       lastMessage: {
//         message: 'I\'ve finished it! See you so',
//         createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
//         isRead: false
//       },
//       unreadCount: new Map([[user?.id, 1]])
//     }
//   ];

//   const getOtherParticipant = (chat) => {
//     return chat.participants.find(p => p._id !== user?.id);
//   };

//   const formatTime = (date) => {
//     const now = new Date();
//     const messageDate = new Date(date);
//     const diffInHours = (now - messageDate) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else {
//       return messageDate.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
//     }
//   };

//   const filteredChats = chats.filter(chat => {
//     const otherUser = getOtherParticipant(chat);
//     const userName = `${otherUser?.firstName} ${otherUser?.lastName}`.toLowerCase();
//     return userName.includes(searchText.toLowerCase());
//   });

//   const statsData = {
//     all: { chats: 367, conversion: 18.92 },
//     '1m': { chats: 89, conversion: 22.15 },
//     '6m': { chats: 245, conversion: 19.76 },
//     '1y': { chats: 367, conversion: 18.92 }
//   };

//   return (
//     <Card 
//       className="h-full shadow-sm border-0"
//       styles={{
//         body: { 
//           padding: 0,
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column'
//         }
//       }}
//     >
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex justify-between items-center mb-4">
//           <Title level={4} className="!mb-0">Chats</Title>
//           <div className="flex space-x-2">
//             <Button type="text" icon={<PhoneOutlined />} size="small" />
//             <Button type="text" icon={<VideoCameraOutlined />} size="small" />
//             <Button type="text" icon={<MoreOutlined />} size="small" />
//           </div>
//         </div>

//         {/* Stats Tabs */}
//         <Tabs 
//           activeKey={activeTab} 
//           onChange={setActiveTab}
//           size="small"
//           className="custom-stats-tabs"
//         >
//           <TabPane tab="ALL" key="all" />
//           <TabPane tab="1M" key="1m" />
//           <TabPane tab="6M" key="6m" />
//           <TabPane tab="1Y" key="1y" />
//         </Tabs>

//         {/* Stats Numbers */}
//         <div className="flex justify-between items-center mt-3 bg-blue-50 rounded-lg p-3">
//           <div className="text-center">
//             <Text strong className="text-2xl text-blue-600 block">
//               {statsData[activeTab].chats}
//             </Text>
//             <Text type="secondary" className="text-xs">Chats</Text>
//           </div>
//           <div className="text-center">
//             <Text strong className="text-2xl text-green-600 block">
//               {statsData[activeTab].conversion}%
//             </Text>
//             <Text type="secondary" className="text-xs">Response Rate</Text>
//           </div>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="p-4 border-b border-gray-200">
//         <Input
//           placeholder="Search for..."
//           prefix={<SearchOutlined className="text-gray-400" />}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="rounded-full"
//         />
//       </div>

//       {/* Online Members */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex justify-between items-center mb-3">
//           <Text strong className="text-sm">Online Members</Text>
//           <Text type="secondary" className="text-xs">{onlineUsers.filter(u => u.isOnline).length} online</Text>
//         </div>
//         <div className="flex space-x-2 overflow-x-auto pb-2">
//           {onlineUsers.filter(u => u.isOnline).map(user => (
//             <div key={user.id} className="text-center flex-shrink-0">
//               <Badge dot color="green" offset={[-5, 5]}>
//                 <Avatar 
//                   size="large" 
//                   icon={<UserOutlined />}
//                   className="bg-gradient-to-r from-blue-400 to-purple-400 shadow-sm"
//                 />
//               </Badge>
//               <Text className="text-xs block mt-1 truncate w-12">{user.name.split(' ')[0]}</Text>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Chats */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-4">
//           <Text strong className="text-sm block mb-3">RECENT CHAT</Text>
          
//           <List
//             dataSource={filteredChats}
//             renderItem={chat => {
//               const otherUser = getOtherParticipant(chat);
//               const unreadCount = chat.unreadCount?.get(user?.id) || 0;
//               const isUnread = unreadCount > 0;
              
//               return (
//                 <List.Item 
//                   className="!px-0 !py-3 border-0 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
//                   onClick={() => {
//                     // Handle chat selection
//                     console.log('Selected chat:', chat._id);
//                   }}
//                 >
//                   <div className="flex items-start space-x-3 w-full">
//                     <Badge count={unreadCount} size="small" offset={[-5, 5]}>
//                       <Avatar 
//                         size="large"
//                         icon={<UserOutlined />}
//                         src={otherUser?.profilePhoto}
//                         className={`bg-gradient-to-r ${
//                           isUnread ? 'from-blue-500 to-purple-500' : 'from-gray-400 to-gray-500'
//                         } shadow-sm`}
//                       />
//                     </Badge>
                    
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-start">
//                         <Text strong className={`text-sm block ${isUnread ? 'text-blue-600' : 'text-gray-800'}`}>
//                           {otherUser?.firstName} {otherUser?.lastName}
//                         </Text>
//                         <Text type="secondary" className="text-xs whitespace-nowrap">
//                           {formatTime(chat.lastMessage?.createdAt)}
//                         </Text>
//                       </div>
                      
//                       <Text 
//                         className={`text-xs block mt-1 truncate ${
//                           isUnread ? 'text-gray-800 font-medium' : 'text-gray-600'
//                         }`}
//                       >
//                         {chat.lastMessage?.message}
//                       </Text>
                      
//                       <div className="flex items-center justify-between mt-1">
//                         <Text type="secondary" className="text-xs capitalize">
//                           {otherUser?.role}
//                         </Text>
//                         {isUnread && (
//                           <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </List.Item>
//               );
//             }}
//             locale={{
//               emptyText: (
//                 <div className="text-center py-8">
//                   <MessageOutlined className="text-3xl text-gray-300 mb-2" />
//                   <Text type="secondary" className="block">No conversations yet</Text>
//                 </div>
//               )
//             }}
//           />
//         </div>
//       </div>

//       {/* Quick Actions Footer */}
//       <div className="p-4 border-t border-gray-200 bg-gray-50">
//         <div className="grid grid-cols-3 gap-2">
//           <Button 
//             size="small" 
//             className="text-xs h-8 bg-white border-gray-300"
//             onClick={() => setActiveTab('all')}
//           >
//             All Chats
//           </Button>
//           <Button 
//             size="small" 
//             className="text-xs h-8 bg-white border-gray-300"
//             onClick={() => {
//               // Start new group chat
//             }}
//           >
//             New Group
//           </Button>
//           <Button 
//             size="small" 
//             type="primary"
//             className="text-xs h-8 bg-blue-600 border-0"
//             onClick={() => {
//               // Start new chat
//             }}
//           >
//             New Chat
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default ChatSidebar;



////////////////////////////Final ??????///////////////////////////



// import { useState, useEffect } from 'react';
// import { 
//   Card, 
//   Input, 
//   Avatar, 
//   Typography, 
//   Badge,
//   List
// } from 'antd';
// import { 
//   SearchOutlined,
//   UserOutlined
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import "./styles.css";

// const { Text, Title } = Typography;

// const ChatSidebar = () => {
//   const [searchText, setSearchText] = useState('');
//   const [chats, setChats] = useState([]);
//   const user = useSelector((state) => state.user.value);

//   useEffect(() => {
//     // Mock data based on your screenshot
//     setChats([
//       {
//         _id: '1',
//         participants: [
//           { _id: '1', firstName: 'Ashley', lastName: 'Silva', profilePhoto: null, role: 'Member' },
//           { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//         ],
//         lastMessage: {
//           message: 'Good Morning',
//           createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
//           isRead: false
//         },
//         unreadCount: 1
//       },
//       {
//         _id: '2',
//         participants: [
//           { _id: '2', firstName: 'Misty', lastName: 'Taylor', profilePhoto: null, role: 'Plot Owner' },
//           { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//         ],
//         lastMessage: {
//           message: 'Okay, Byy',
//           createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
//           isRead: true
//         },
//         unreadCount: 0
//       },
//       {
//         _id: '3',
//         participants: [
//           { _id: '3', firstName: 'Scott', lastName: 'Wilson', profilePhoto: null, role: 'Committee Member' },
//           { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//         ],
//         lastMessage: {
//           message: 'Yeah everything is fine...',
//           createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
//           isRead: false
//         },
//         unreadCount: 2
//       },
//       {
//         _id: '4',
//         participants: [
//           { _id: '4', firstName: 'Patricia', lastName: 'Wilson', profilePhoto: null, role: 'Member' },
//           { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//         ],
//         lastMessage: {
//           message: 'Hey! there I\'m available',
//           createdAt: new Date(Date.now() - 30 * 60 * 1000),
//           isRead: true
//         },
//         unreadCount: 0
//       },
//       {
//         _id: '5',
//         participants: [
//           { _id: '5', firstName: 'Allyson', lastName: 'Wigfall', profilePhoto: null, role: 'Plot Owner' },
//           { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//         ],
//         lastMessage: {
//           message: 'I\'ve finished it! See you so',
//           createdAt: new Date(Date.now() - 15 * 60 * 1000),
//           isRead: false
//         },
//         unreadCount: 1
//       },
//       {
//         _id: '6',
//         participants: [
//           { _id: '6', firstName: 'Martha', lastName: 'Griffin', profilePhoto: null, role: 'Member' },
//           { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//         ],
//         lastMessage: {
//           message: 'Wow that\'s great',
//           createdAt: new Date('2024-11-16'),
//           isRead: true
//         },
//         unreadCount: 0
//       },
//       {
//         _id: '7',
//         participants: [
//           { _id: '7', firstName: 'Mark', lastName: 'Sargent', profilePhoto: null, role: 'Committee Member' },
//           { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName }
//         ],
//         lastMessage: {
//           message: 'Nice to meet you',
//           createdAt: new Date('2024-11-16'),
//           isRead: true
//         },
//         unreadCount: 0
//       }
//     ]);
//   }, [user]);

//   const getOtherParticipant = (chat) => {
//     return chat.participants.find(p => p._id !== user?.id);
//   };

//   const formatTime = (date) => {
//     const now = new Date();
//     const messageDate = new Date(date);
//     const diffInHours = (now - messageDate) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return messageDate.toLocaleTimeString([], { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       }).toLowerCase();
//     } else {
//       return messageDate.toLocaleDateString([], { 
//         month: 'numeric', 
//         day: 'numeric' 
//       });
//     }
//   };

//   const filteredChats = chats.filter(chat => {
//     const otherUser = getOtherParticipant(chat);
//     const userName = `${otherUser?.firstName} ${otherUser?.lastName}`.toLowerCase();
//     return userName.includes(searchText.toLowerCase());
//   });

//   return (
//     <Card 
//       className="h-full shadow-sm border-0 chat-sidebar"
//       styles={{
//         body: { 
//           padding: 0,
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column'
//         }
//       }}
//     >
//       {/* Header with Stats */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex justify-between items-center mb-3">
//           <Title level={4} className="!mb-0 !text-gray-800">Chats</Title>
//           <div className="flex items-center space-x-2 text-sm">
//             <span className="text-gray-600">367</span>
//             <span className="text-gray-400">|</span>
//             <span className="text-green-600 font-medium">18.92%</span>
//           </div>
//         </div>

//         {/* Simple Stats Row like screenshot */}
//         <div className="flex justify-between text-xs text-gray-500 mb-2">
//           <span>Refunds</span>
//           <span>Conversion Ratio</span>
//         </div>

//         <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
//           {['ALL', '1M', '6M', '1Y'].map((tab) => (
//             <button
//               key={tab}
//               className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
//                 tab === 'ALL' 
//                   ? 'bg-white text-blue-600 shadow-sm' 
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Recent Chat Header */}
//       <div className="p-4 border-b border-gray-200">
//         <Text strong className="text-sm text-gray-700">RECENT CHAT</Text>
        
//         {/* Online Users Row */}
//         <div className="flex space-x-2 mt-3 overflow-x-auto">
//           {['Ashley', 'Misty', 'Scott', 'Patricia', 'Allyson'].map((name, index) => (
//             <div key={index} className="flex flex-col items-center flex-shrink-0">
//               <Badge dot color="green" offset={[-5, 5]}>
//                 <Avatar 
//                   size="default"
//                   icon={<UserOutlined />}
//                   className="bg-gradient-to-r from-blue-400 to-purple-400"
//                 />
//               </Badge>
//               <Text className="text-xs mt-1">{name}</Text>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search */}
//       <div className="p-4 border-b border-gray-200">
//         <Input
//           placeholder="Search for ..."
//           prefix={<SearchOutlined className="text-gray-400" />}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="rounded-lg"
//         />
//       </div>

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         <List
//           dataSource={filteredChats}
//           renderItem={chat => {
//             const otherUser = getOtherParticipant(chat);
//             const unreadCount = chat.unreadCount || 0;
//             const isUnread = unreadCount > 0;
            
//             return (
//               <List.Item 
//                 className="!px-4 !py-3 border-0 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
//                 onClick={() => {
//                   console.log('Selected chat:', chat._id);
//                 }}
//               >
//                 <div className="flex items-start space-x-3 w-full">
//                   <Badge count={unreadCount} size="small" offset={[-5, 5]}>
//                     <Avatar 
//                       size="default"
//                       icon={<UserOutlined />}
//                       src={otherUser?.profilePhoto}
//                       className={`${
//                         isUnread ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-400'
//                       } shadow-sm`}
//                     />
//                   </Badge>
                  
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between items-start">
//                       <Text strong className={`text-sm block ${isUnread ? 'text-blue-600' : 'text-gray-800'}`}>
//                         {otherUser?.firstName} {otherUser?.lastName}
//                       </Text>
//                       <Text type="secondary" className="text-xs whitespace-nowrap ml-2">
//                         {formatTime(chat.lastMessage?.createdAt)}
//                       </Text>
//                     </div>
                    
//                     <Text 
//                       className={`text-xs block mt-1 truncate ${
//                         isUnread ? 'text-gray-800 font-medium' : 'text-gray-600'
//                       }`}
//                     >
//                       {chat.lastMessage?.message}
//                     </Text>
//                   </div>
//                 </div>
//               </List.Item>
//             );
//           }}
//           locale={{
//             emptyText: (
//               <div className="text-center py-8">
//                 <Text type="secondary">No conversations yet</Text>
//               </div>
//             )
//           }}
//         />
//       </div>

//       {/* Pagination Footer - Like screenshot */}
//       {/* <div className="p-4 border-t border-gray-200 bg-gray-50">
//         <div className="flex justify-center items-center space-x-2 text-sm text-gray-600">
//           <span className="cursor-pointer hover:text-blue-600">‹ seven</span>
//           <span className="cursor-pointer hover:text-blue-600">eight</span>
//           <span className="cursor-pointer hover:text-blue-600">nine</span>
//           <span className="font-medium text-blue-600">ten</span>
//           <span className="cursor-pointer hover:text-blue-600">eleven</span>
//           <span className="cursor-pointer hover:text-blue-600">twelve</span>
//           <span className="cursor-pointer hover:text-blue-600">›</span>
//         </div>
//       </div> */}
//     </Card>
//   );
// };

// export default ChatSidebar;




import { useState, useEffect } from 'react';
import { 
  Card, 
  Input, 
  Avatar, 
  Typography, 
  Badge,
  List,
  Spin,
  Empty,
  message
} from 'antd';
import { 
  SearchOutlined,
  UserOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "./styles.css";

const { Text, Title } = Typography;

const ChatSidebar = () => {
  const [searchText, setSearchText] = useState('');
  const [chats, setChats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalChats: 367, conversionRate: 18.92 });
  const user = useSelector((state) => state.user.value); 
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    // fetchUserChats();
    fetchAllUsers();
  // }, [user]);
  }, []);

  const fetchUserChats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/chat/chats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setChats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      message.error('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/chat/users', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setAllUsers(response.data.data);
      } else {
      message.error("Failed to load users");

    }
    } catch (error) {
      console.error('Error fetching users:', error);
     message.error("Failed to load users");

      // fetchUsersFallback();
    }
  };

  const fetchUsersFallback = async () => {
    try {
      const token = localStorage.getItem('token');
      // Try different endpoints that might return users
      const endpoints = [
        '/api/v1/member/all',
        '/api/v1/plot-owner/all',
        '/api/v1/admin/users'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(`http://localhost:3000${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.success && response.data.data) {
            setAllUsers(response.data.data);
            break;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (error) {
      console.error('All user fetch attempts failed:', error);
    }
  };

//   const openChat = async (chatId) => {
//   try {
//     const token = localStorage.getItem('token');
//     const res = await axios.get(
//       `http://localhost:3000/api/v1/chat/messages/${chatId}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     if (res.data.success) {
//       console.log("Messages:", res.data.data);
//       // TODO: set state to show in chat window
//     }
//   } catch (error) {
//     console.error("Failed to open chat:", error);
//     message.error("Could not load chat messages");
//   }
// };

const openChat = async (receiverId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3000/api/v1/chat/open",
      { receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      const chat = res.data.data;
      setSelectedChat(chat);
      fetchMessages(chat._id);
    } else {
      message.error("Failed to open chat");
    }
  } catch (error) {
    console.error("Error opening chat:", error);
    message.error("Could not open chat");
  }
};


const fetchMessages = async (chatId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:3000/api/v1/chat/messages/${chatId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      setMessages(res.data.data);
      console.log("Messages:", res.data.data);
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};
    const sendMessage = async () => {
  if (!newMessage.trim()) return;
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3000/api/v1/chat/send",
      {
        receiverId: selectedChat.participants.find(
          (p) => p._id !== user._id
        )._id,
        message: newMessage,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      setMessages((prev) => [...prev, res.data.data]);
      setNewMessage("");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


  const startNewChat = async (receiverId) => {
    try {
      const token = localStorage.getItem('token');
      // Send a welcome message to start the chat
      await axios.post('http://localhost:3000/api/v1/chat/send', {
        receiverId,
        message: 'Hello! 👋'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success('Chat started successfully!');
      fetchUserChats(); // Refresh chats list
    } catch (error) {
      console.error('Error starting chat:', error);
      message.error('Failed to start chat');
    }
  };

  const getOtherParticipant = (chat) => {
    return chat.participants.find(p => p._id !== user?.id);
  };

  const formatTime = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }).toLowerCase().replace(' ', '.');
    } else {
      return messageDate.toLocaleDateString([], { 
        month: 'numeric', 
        day: 'numeric' 
      });
    }
  };

  const getOnlineUsers = () => {
    // For demo, show first 5 users as online
    return allUsers.slice(0, 5).map(user => ({
      ...user,
      isOnline: Math.random() > 0.3 // Random online status for demo
    }));
  };

  const getAvailableUsers = () => {
    // Filter out current user and users already in chats
    const chatUserIds = new Set(
      chats.flatMap(chat => 
        chat.participants.map(p => p._id.toString())
      )
    );

    return allUsers.filter(u => 
      u._id !== user?.id && 
      !chatUserIds.has(u._id.toString()) &&
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // const getUnreadCount = (chat) => {
  //   if (!chat.unreadCount) return 0;
  //   return chat.unreadCount.get(user?.id?.toString()) || 0;
  // };
  const getUnreadCount = (chat, userId) => {
  if (!chat || !chat.unreadCount) return 0;

  try {
    if (typeof chat.unreadCount.get === "function") {
      return chat.unreadCount.get(userId) || 0;
    }
    return chat.unreadCount[userId] || 0;
  } catch (err) {
    console.warn("Unread count error:", err);
    return 0;
  }
};


//   const getUnreadCount = (chat, userId) => {
//   if (!chat.unreadCount) return 0;
//   if (typeof chat.unreadCount.get === "function") {
//     return chat.unreadCount.get(userId) || 0;
//   }
//   return chat.unreadCount[userId] || 0;
// };




  return (
    <Card 
      className="h-full shadow-sm border-0 chat-sidebar"
      styles={{
        body: { 
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {/* Header with Stats */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <Title level={4} className="!mb-0 !text-gray-800">Chats</Title>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600">{stats.totalChats}</span>
            <span className="text-gray-400">|</span>
            <span className="text-green-600 font-medium">{stats.conversionRate}%</span>
          </div>
        </div>

        {/* Simple Stats Row like screenshot */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Total Chats</span>
          <span>Response Rate</span>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {['ALL', '1M', '6M', '1Y'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                tab === 'ALL' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <form
  onSubmit={(e) => {
    e.preventDefault();
    sendMessage();
  }}
  className="flex mt-2"
>
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type a message..."
    className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white"
  />
  <button
    type="submit"
    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
  >
    Send
  </button>
</form>


      {/* Recent Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <Text strong className="text-sm text-gray-700">RECENT CHAT</Text>
        
        {/* Online Users Row */}
        <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
          {getOnlineUsers().map((onlineUser, index) => (
            <div key={onlineUser._id || index} className="flex flex-col items-center flex-shrink-0">
              <Badge dot color={onlineUser.isOnline ? "green" : "default"} offset={[-5, 5]}>
                <Avatar 
                  size="default"
                  icon={<UserOutlined />}
                  src={onlineUser.profilePhoto}
                  className="bg-gradient-to-r from-blue-400 to-purple-400 cursor-pointer"
                  onClick={() => startNewChat(onlineUser._id)}
                />
              </Badge>
              <Text className="text-xs mt-1 max-w-12 truncate">
                {onlineUser.firstName}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <Input
          placeholder="Search for ..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="rounded-lg"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Existing Chats */}
            <List
              dataSource={chats.filter(chat => {
                const otherUser = getOtherParticipant(chat);
                const userName = `${otherUser?.firstName} ${otherUser?.lastName}`.toLowerCase();
                return userName.includes(searchText.toLowerCase());
              })}
              renderItem={chat => {
                const otherUser = getOtherParticipant(chat);
                const unreadCount = getUnreadCount(chat);
                const isUnread = unreadCount > 0;
                
                return (
                  <List.Item 
                    className="!px-4 !py-3 border-0 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 
                    last:border-b-0"
                    onClick={() => {
                      openChat(chat._id);
                      // Handle chat selection - you can implement this
                      console.log('Selected chat:', chat._id);
                      message.info(`Opening chat with ${otherUser.firstName} ${otherUser.lastName}`);
                    }}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <Badge count={unreadCount} size="small" offset={[-5, 5]}>
                        <Avatar 
                          size="default"
                          icon={<UserOutlined />}
                          src={otherUser?.profilePhoto}
                          className={`${
                            isUnread ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-400'
                          } shadow-sm`}
                        />
                      </Badge>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <Text strong className={`text-sm block ${isUnread ? 'text-blue-600' : 'text-gray-800'}`}>
                            {otherUser?.firstName} {otherUser?.lastName}
                          </Text>
                          <Text type="secondary" className="text-xs whitespace-nowrap ml-2">
                            {formatTime(chat.lastMessage?.createdAt)}
                          </Text>
                        </div>
                        
                        <Text 
                          className={`text-xs block mt-1 truncate ${
                            isUnread ? 'text-gray-800 font-medium' : 'text-gray-600'
                          }`}
                        >
                          {chat.lastMessage?.message || 'No messages yet'}
                        </Text>
                        
                        <div className="flex items-center justify-between mt-1">
                          <Text type="secondary" className="text-xs capitalize">
                            {otherUser?.role}
                          </Text>
                          {otherUser?.membershipId && (
                            <Text type="secondary" className="text-xs">
                              {otherUser.membershipId}
                            </Text>
                          )}
                        </div>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
              locale={{
                emptyText: (
                  <div className="text-center py-8">
                    <MessageOutlined className="text-3xl text-gray-300 mb-2" />
                    <Text type="secondary" className="block">No conversations yet</Text>
                  </div>
                )
              }}
            />

            {/* Available Users for New Chat */}
            {searchText && getAvailableUsers().length > 0 && (
              <div className="border-t border-gray-200">
                <div className="p-3 bg-blue-50">
                  <Text strong className="text-sm text-blue-700">Start New Chat</Text>
                </div>
                {/* <List
                  dataSource={getAvailableUsers()}
                  renderItem={availableUser => (
                    <List.Item 
                      className="!px-4 !py-3 border-0 cursor-pointer hover:bg-green-50 transition-colors border-b border-gray-100"
                      onClick={() => startNewChat(availableUser._id)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <Avatar 
                          size="default"
                          icon={<UserOutlined />}
                          src={availableUser.profilePhoto}
                          className="bg-gradient-to-r from-green-400 to-blue-400"
                        />
                        <div className="flex-1 min-w-0">
                          <Text strong className="text-sm block text-gray-800">
                            {availableUser.firstName} {availableUser.lastName}
                          </Text>
                          <Text type="secondary" className="text-xs block capitalize">
                            {availableUser.role} • Click to start chatting
                          </Text>
                        </div>
                      </div>
                    </List.Item> */}
 

                  <List
  dataSource={allUsers}
  renderItem={(user) => (
    <List.Item
      key={user._id}
      onClick={() => openChat(user._id)}
      className="cursor-pointer hover:bg-gray-700 rounded-lg p-2"
    >
      <div className="flex items-center">
        <Avatar src={user.profilePhoto}>
          {user.firstName?.[0] || "?"}
        </Avatar>
        <div className="ml-2">
          <div className="font-semibold text-sm text-white">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xs text-gray-400">{user.role}</div>
        </div>
      </div>
    </List.Item>











                  )}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default ChatSidebar;



