

// import { useState, useEffect, useRef } from 'react';
// import { 
//   Card, 
//   Input, 
//   Button, 
//   Avatar, 
//   Typography, 
//   Spin,
//   Empty,
//   Badge,
//   FloatButton
// } from 'antd';
// import { 
//   MessageOutlined,
//   SendOutlined,
//   UserOutlined,
//   CloseOutlined,
//   MinusOutlined
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const { Text } = Typography;
// const { TextArea } = Input;

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const user = useSelector((state) => state.user.value);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (isOpen) {
//       fetchChats();
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

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
//     }
//   };

//   const fetchMessages = async (chatId) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:3000/api/v1/chat/messages/${chatId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         setMessages(res.data.data);
//         setSelectedChat(chatId);
//       }
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedChat) return;

//     try {
//       const token = localStorage.getItem('token');
//       const receiver = chats.find(chat => chat._id === selectedChat)
//         ?.participants.find(p => p._id !== user.id);

//       const res = await axios.post('http://localhost:3000/api/v1/chat/send', {
//         receiverId: receiver?._id,
//         message: newMessage
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         setNewMessage('');
//         fetchMessages(selectedChat);
//         fetchChats();
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const getOtherParticipant = (chat) => {
//     return chat.participants.find(p => p._id !== user.id);
//   };

//   if (!isOpen) {
//     return (
//       <FloatButton
//         icon={<MessageOutlined />}
//         type="primary"
//         style={{ right: 24, bottom: 24 }}
//         onClick={() => setIsOpen(true)}
//         badge={{ count: 3, color: 'red' }}
//       />
//     );
//   }

//   return (
//     <Card
//       className="w-80 h-96 shadow-2xl border-0"
//       styles={{
//         body: { 
//           padding: 0,
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column'
//         }
//       }}
//       title={
//         <div className="flex justify-between items-center p-3 border-b">
//           <div className="flex items-center space-x-2">
//             <MessageOutlined className="text-blue-500" />
//             <Text strong>Messages</Text>
//             <Badge count={3} size="small" />
//           </div>
//           <div className="flex space-x-1">
//             <Button 
//               type="text" 
//               size="small" 
//               icon={<MinusOutlined />}
//               onClick={() => setIsOpen(false)}
//             />
//             <Button 
//               type="text" 
//               size="small" 
//               icon={<CloseOutlined />}
//               onClick={() => setIsOpen(false)}
//             />
//           </div>
//         </div>
//       }
//     >
//       <div className="flex-1 flex">
//         {/* Chat List */}
//         <div className="w-1/3 border-r">
//           <div className="h-full overflow-y-auto">
//             {chats.map(chat => {
//               const otherUser = getOtherParticipant(chat);
//               const unreadCount = chat.unreadCount?.get(user.id) || 0;
              
//               return (
//                 <div 
//                   key={chat._id}
//                   className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
//                     selectedChat === chat._id ? 'bg-blue-50 border-blue-200' : ''
//                   }`}
//                   onClick={() => fetchMessages(chat._id)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Badge count={unreadCount} size="small" offset={[-5, 5]}>
//                       <Avatar 
//                         size="small" 
//                         src={otherUser?.profilePhoto}
//                         icon={<UserOutlined />}
//                         className="bg-gradient-to-r from-blue-400 to-purple-400"
//                       />
//                     </Badge>
//                     <div className="flex-1 min-w-0">
//                       <Text strong className="text-xs block truncate">
//                         {otherUser?.firstName} {otherUser?.lastName}
//                       </Text>
//                       <Text type="secondary" className="text-xs block truncate">
//                         {chat.lastMessage?.message || 'No messages'}
//                       </Text>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//             {chats.length === 0 && (
//               <div className="p-4">
//                 <Empty 
//                   image={Empty.PRESENTED_IMAGE_SIMPLE} 
//                   description="No conversations"
//                   className="text-xs"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 flex flex-col">
//           {selectedChat ? (
//             <>
//               <div className="flex-1 overflow-y-auto p-3 space-y-2">
//                 {messages.map(message => (
//                   <div
//                     key={message._id}
//                     className={`flex ${
//                       message.sender._id === user.id ? 'justify-end' : 'justify-start'
//                     }`}
//                   >
//                     <div
//                       className={`max-w-[80%] px-3 py-2 rounded-2xl ${
//                         message.sender._id === user.id
//                           ? 'bg-blue-500 text-white rounded-br-none'
//                           : 'bg-gray-100 text-gray-800 rounded-bl-none'
//                       }`}
//                     >
//                       <Text className={message.sender._id === user.id ? 'text-white' : 'text-gray-800'}>
//                         {message.message}
//                       </Text>
//                       <div className={`text-xs mt-1 ${
//                         message.sender._id === user.id ? 'text-blue-100' : 'text-gray-500'
//                       }`}>
//                         {new Date(message.createdAt).toLocaleTimeString([], { 
//                           hour: '2-digit', 
//                           minute: '2-digit' 
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 {loading && (
//                   <div className="flex justify-center">
//                     <Spin size="small" />
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Message Input */}
//               <div className="border-t p-3">
//                 <div className="flex space-x-2">
//                   <TextArea
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type a message..."
//                     autoSize={{ minRows: 1, maxRows: 3 }}
//                     onPressEnter={(e) => {
//                       if (!e.shiftKey) {
//                         e.preventDefault();
//                         sendMessage();
//                       }
//                     }}
//                     className="text-sm"
//                   />
//                   <Button
//                     type="primary"
//                     icon={<SendOutlined />}
//                     onClick={sendMessage}
//                     disabled={!newMessage.trim()}
//                     className="bg-blue-500 border-0"
//                   />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center">
//               <Empty 
//                 description="Select a conversation"
//                 image={Empty.PRESENTED_IMAGE_SIMPLE}
//                 className="text-xs"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default ChatWidget;





import { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Input, 
  Button, 
  Avatar, 
  Typography, 
  Spin,
  Empty,
  Badge,
  FloatButton,
  Dropdown
} from 'antd';
import { 
  MessageOutlined,
  SendOutlined,
  UserOutlined,
  CloseOutlined,
  MinusOutlined,
  MoreOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "./styles.css";

const { Text } = Typography;
const { TextArea } = Input;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.value);
  const messagesEndRef = useRef(null);

  // Mock messages data based on your screenshot
  const mockMessages = [
    {
      _id: '1',
      sender: { _id: '1', firstName: 'Ashley', lastName: 'Silva', profilePhoto: null, role: 'Member' },
      receiver: { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName },
      message: 'Good Morning',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true
    },
    {
      _id: '2',
      sender: { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName },
      receiver: { _id: '1', firstName: 'Ashley', lastName: 'Silva', profilePhoto: null, role: 'Member' },
      message: 'Good Morning! How are you doing today?',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: true
    },
    {
      _id: '3',
      sender: { _id: '1', firstName: 'Ashley', lastName: 'Silva', profilePhoto: null, role: 'Member' },
      receiver: { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName },
      message: 'I am doing great! Just wanted to discuss the upcoming committee meeting.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    }
  ];

  useEffect(() => {
    if (selectedChat && isOpen) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (chatId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/v1/chat/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Use mock data for demonstration
      setMessages(mockMessages);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/v1/chat/send', {
        receiverId: selectedChat,
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setNewMessage('');
        fetchMessages(selectedChat);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add message to local state for demo
      const newMsg = {
        _id: Date.now().toString(),
        sender: { _id: user?.id, firstName: user?.firstName, lastName: user?.lastName },
        receiver: { _id: selectedChat, firstName: 'Ashley', lastName: 'Silva' },
        message: newMessage,
        createdAt: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const chatActions = [
    {
      key: 'profile',
      icon: <InfoCircleOutlined />,
      label: 'View Profile',
    },
    {
      key: 'call',
      icon: <PhoneOutlined />,
      label: 'Voice Call',
    },
    {
      key: 'video',
      icon: <VideoCameraOutlined />,
      label: 'Video Call',
    },
  ];

  if (!isOpen) {
    return (
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24 }}
        onClick={() => setIsOpen(true)}
        badge={{ count: 3, color: 'red' }}
      />
    );
  }

  if (isMinimized) {
    return (
      <Card
        className="w-80 shadow-2xl border-0"
        styles={{ body: { padding: 0 } }}
        title={
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center space-x-2">
              <Avatar size="small" icon={<UserOutlined />} />
              <Text strong>Ashley Silva</Text>
            </div>
            <div className="flex space-x-1">
              <Button 
                type="text" 
                size="small" 
                icon={<MinusOutlined />}
                onClick={() => setIsMinimized(false)}
              />
              <Button 
                type="text" 
                size="small" 
                icon={<CloseOutlined />}
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        }
      >
        <div className="p-4 text-center">
          <Text type="secondary">Chat minimized</Text>
          <Button 
            type="link" 
            onClick={() => setIsMinimized(false)}
            className="mt-2"
          >
            Restore Chat
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="w-80 h-96 shadow-2xl border-0"
      styles={{
        body: { 
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
      title={
        <div className="flex justify-between items-center p-3 border-b">
          <div className="flex items-center space-x-2">
            <Avatar 
              size="small" 
              icon={<UserOutlined />}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            />
            <div>
              <Text strong>Ashley Silva</Text>
              <Text type="secondary" className="text-xs block">Member • Online</Text>
            </div>
          </div>
          <div className="flex space-x-1">
            <Dropdown menu={{ items: chatActions }} trigger={['click']}>
              <Button type="text" size="small" icon={<MoreOutlined />} />
            </Dropdown>
            <Button 
              type="text" 
              size="small" 
              icon={<MinusOutlined />}
              onClick={() => setIsMinimized(true)}
            />
            <Button 
              type="text" 
              size="small" 
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      }
    >
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map(message => (
            <div
              key={message._id}
              className={`flex ${
                message.sender._id === user?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                  message.sender._id === user?.id
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <Text className={message.sender._id === user?.id ? 'text-white' : 'text-gray-800'}>
                  {message.message}
                </Text>
                <div className={`text-xs mt-1 ${
                  message.sender._id === user?.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(message.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center">
              <Spin size="small" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-3">
          <div className="flex space-x-2">
            <TextArea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              autoSize={{ minRows: 1, maxRows: 3 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="text-sm"
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-500 border-0"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatWidget;





