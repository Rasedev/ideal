/////////////////////////Final//////////////////////////////

// import { Layout, Button, Space, Badge, Dropdown, Avatar, Switch } from 'antd';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   BellOutlined,
//   QuestionCircleOutlined,
//   SearchOutlined,
//   LogoutOutlined,
//   ProfileOutlined,
//   SettingOutlined,
//   BulbOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../../components/slices/themeSlice';
// import { clearCurrentUser } from '../../components/slices/userSlice';

// const { Header: AntHeader } = Layout;

// const Header = ({ onToggle, isMobile }) => {
//   const dispatch = useDispatch();
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const { currentTheme } = useSelector((state) => state.theme);
//   const userData = useSelector((state) => state.user.value);

//   const userMenuItems = [
//     {
//       key: 'profile',
//       icon: <ProfileOutlined />,
//       label: 'Profile',
//       onClick: () => console.log('Profile clicked'),
//     },
//     {
//       key: 'settings',
//       icon: <SettingOutlined />,
//       label: 'Settings',
//       onClick: () => console.log('Settings clicked'),
//     },
//     {
//       type: 'divider',
//     },
//     {
//       key: 'logout',
//       icon: <LogoutOutlined />,
//       label: 'Logout',
//       onClick: () => dispatch(clearCurrentUser()),
//     },
//   ];

//   const handleThemeToggle = (checked) => {
//     dispatch(toggleTheme());
//   };

//   return (
//     <AntHeader className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
//       <div className="flex items-center">
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={onToggle}
//           className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
//         />

//         {!isMobile && (
//           <div className="ml-4">
//             <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
//               Welcome back, {userData?.firstName}!
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Here's what's happening with your association today.
//             </p>
//           </div>
//         )}
//       </div>

//       <Space size="middle">
//         <Button type="text" icon={<SearchOutlined />} />
//         <Badge count={5} size="small">
//           <Button type="text" icon={<BellOutlined />} />
//         </Badge>
//         <Button type="text" icon={<QuestionCircleOutlined />} />

//         {/* Theme Toggle Switch */}
//         <Space className="flex items-center">
//           <BulbOutlined className="text-gray-500 dark:text-gray-400" />
//           <Switch
//             checked={currentTheme === 'dark'}
//             onChange={handleThemeToggle}
//             size="small"
//             checkedChildren="Dark"
//             unCheckedChildren="Light"
//           />
//         </Space>

//         <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
//           <Space className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-2 py-1">
//             <Avatar
//               size="small"
//               src={userData?.profilePicture}
//               icon={<UserOutlined />}
//               className="bg-gradient-to-r from-blue-500 to-purple-500"
//             />
//             {!isMobile && (
//               <span className="text-gray-700 dark:text-gray-300 text-sm">
//                 {userData?.firstName} {userData?.lastName}
//               </span>
//             )}
//           </Space>
//         </Dropdown>
//       </Space>
//     </AntHeader>
//   );
// };

// export default Header;

////////////////FINAL CODE/////////////////////

// import { Layout, Button, Space, Badge, Dropdown, Avatar, Switch, Input, List, Tag, Card, Divider } from 'antd';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   BellOutlined,
//   QuestionCircleOutlined,
//   SearchOutlined,
//   LogoutOutlined,
//   ProfileOutlined,
//   SettingOutlined,
//   BulbOutlined,
//   UserOutlined,
//   MessageOutlined,
//   CustomerServiceOutlined,
//   MailOutlined,
//   BugOutlined,
//   DownOutlined,
//   WechatOutlined,
//   // TicketOutlined,
//   EyeOutlined,
//   EditOutlined,
// } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../../components/slices/themeSlice';
// import { clearCurrentUser } from '../../components/slices/userSlice';
// import { useState, useEffect } from 'react';
// import './Header.css'; // We'll create this CSS file
// import { MdAirplaneTicket } from 'react-icons/md';

// const { Header: AntHeader } = Layout;
// const { Search } = Input;

// const Header = ({ onToggle, isMobile }) => {
//   const dispatch = useDispatch();
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const { currentTheme } = useSelector((state) => state.theme);
//   const userData = useSelector((state) => state.user.value);
//   const [notificationCount, setNotificationCount] = useState(12);
//   const [messageCount, setMessageCount] = useState(5);
//   const [supportTickets, setSupportTickets] = useState(3);

//   // Mock data - replace with actual API calls
//   const [chatStats, setChatStats] = useState({
//     unreadMessages: 8,
//     openChats: 12,
//     recentActivity: '2 new messages'
//   });

//   const [userStats, setUserStats] = useState({
//     bugsFixed: '63.2K',
//     performance: '175.5%',
//     activity: 'High'
//   });

//   useEffect(() => {
//     // Fetch user stats and notifications
//     fetchUserStats();
//     fetchNotifications();
//   }, []);

//   const fetchUserStats = async () => {
//     // Replace with actual API call
//     // const stats = await api.getUserStats(userData.id);
//     setUserStats({
//       bugsFixed: '63.2K',
//       performance: '175.5%',
//       activity: 'High'
//     });
//   };

//   const fetchNotifications = async () => {
//     // Replace with actual API call
//     // const notifications = await api.getNotifications(userData.id);
//     setNotificationCount(12);
//     setMessageCount(5);
//     setSupportTickets(3);
//   };

//   const userDropdownItems = [
//     {
//       key: 'profile',
//       icon: <ProfileOutlined />,
//       label: 'My Profile',
//       onClick: () => navigateToProfile(),
//     },
//     {
//       key: 'settings',
//       icon: <SettingOutlined />,
//       label: 'Account Settings',
//       onClick: () => navigateToSettings(),
//     },
//     {
//       type: 'divider',
//     },
//     {
//       key: 'logout',
//       icon: <LogoutOutlined />,
//       label: 'Logout',
//       danger: true,
//       onClick: () => dispatch(clearCurrentUser()),
//     },
//   ];

//   const handleThemeToggle = (checked) => {
//     dispatch(toggleTheme());
//   };

//   const navigateToProfile = () => {
//     console.log('Navigate to profile');
//     // navigation logic here
//   };

//   const navigateToSettings = () => {
//     console.log('Navigate to settings');
//     // navigation logic here
//   };

//   const handleSearch = (value) => {
//     console.log('Search:', value);
//     // Implement search functionality
//   };

//   // Custom dropdown content
//   const userDropdownContent = (
//     <div className="user-dropdown-content">
//       {/* User Profile Header */}
//       <div className="user-profile-header">
//         <div className="user-avatar-section">
//           <Avatar
//             size={64}
//             src={userData?.profilePhoto}
//             icon={<UserOutlined />}
//             className="user-avatar"
//           />
//           <div className="user-info">
//             <h3 className="user-name">{userData?.firstName} {userData?.lastName}</h3>
//             <p className="user-title">VP People Manager</p>
//             <p className="user-bio">A short profile description</p>
//           </div>
//         </div>

//         <Divider className="dropdown-divider" />

//         {/* Quick Stats */}
//         <div className="user-stats-grid">
//           <div className="stat-item">
//             <span className="stat-number">{userStats.bugsFixed}</span>
//             <span className="stat-label">Bugs Fixed</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-number">{userStats.performance}</span>
//             <span className="stat-label">Performance</span>
//           </div>
//           <div className="stat-item">
//             <Tag color={userStats.activity === 'High' ? 'green' : 'blue'}>
//               {userStats.activity} Activity
//             </Tag>
//           </div>
//         </div>
//       </div>

//       <Divider className="dropdown-divider" />

//       {/* Activity Section */}
//       <div className="dropdown-section">
//         <h4 className="section-title">ACTIVITY</h4>
//         <List
//           size="small"
//           dataSource={[
//             { icon: <WechatOutlined />, text: 'Chat', count: chatStats.unreadMessages },
//             { icon: <CustomerServiceOutlined />, text: 'Recover Password', count: null },
//             { icon: <UserOutlined />, text: 'MY ACCOUNT', count: null },
//           ]}
//           renderItem={item => (
//             <List.Item className="activity-item">
//               <div className="activity-content">
//                 <span className="activity-icon">{item.icon}</span>
//                 <span className="activity-text">{item.text}</span>
//               </div>
//               {item.count && <Badge count={item.count} size="small" />}
//             </List.Item>
//           )}
//         />
//       </div>

//       <Divider className="dropdown-divider" />

//       {/* Messages & Support */}
//       <div className="dropdown-section">
//         <div className="section-header">
//           <h4 className="section-title">MESSAGES & SUPPORT</h4>
//           <Button type="link" size="small" icon={<EyeOutlined />}>
//             View All
//           </Button>
//         </div>

//         <div className="action-buttons">
//           <Button
//             icon={<MailOutlined />}
//             block
//             className="action-btn"
//             onClick={() => console.log('Open Message Inbox')}
//           >
//             Message Inbox
//             <Badge count={messageCount} size="small" offset={[10, -5]} />
//           </Button>

//           <Button
//             icon={<MdAirplaneTicket />}
//             block
//             className="action-btn"
//             onClick={() => console.log('Open Support Tickets')}
//           >
//             Support Tickets
//             <Badge count={supportTickets} size="small" offset={[10, -5]} />
//           </Button>

//           <Button
//             icon={<MessageOutlined />}
//             type="primary"
//             block
//             className="action-btn primary"
//             onClick={() => console.log('Open Messages')}
//           >
//             Open Messages
//           </Button>
//         </div>
//       </div>

//       <Divider className="dropdown-divider" />

//       {/* Quick Actions */}
//       <div className="quick-actions">
//         <Space size="small" className="quick-actions-space">
//           <Button
//             size="small"
//             icon={<EditOutlined />}
//             onClick={navigateToProfile}
//           >
//             Edit Profile
//           </Button>
//           <Button
//             size="small"
//             icon={<SettingOutlined />}
//             onClick={navigateToSettings}
//           >
//             Settings
//           </Button>
//         </Space>
//       </div>
//     </div>
//   );

//   return (
//     <AntHeader className="app-header">
//       <div className="header-left">
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={onToggle}
//           className="sidebar-toggle-btn"
//         />

//         {!isMobile && (
//           <div className="welcome-section">
//             <h1 className="welcome-title">
//               Welcome back, {userData?.firstName}!
//             </h1>
//             <p className="welcome-subtitle">
//               Here's what's happening with your association today.
//             </p>
//           </div>
//         )}
//       </div>

//       <div className="header-center">
//         <Search
//           placeholder="Search messages, users, settings..."
//           allowClear
//           enterButton={<SearchOutlined />}
//           size="middle"
//           onSearch={handleSearch}
//           className="header-search"
//         />
//       </div>

//       <Space size="middle" className="header-actions">
//         {/* Notifications */}
//         <Dropdown
//           overlay={
//             <div className="notification-dropdown">
//               <div className="dropdown-header">
//                 <h4>Notifications</h4>
//                 <Button type="link" size="small">Mark all as read</Button>
//               </div>
//               <List
//                 size="small"
//                 dataSource={[
//                   'New message from John',
//                   'Payment received',
//                   'Meeting reminder at 3 PM',
//                 ]}
//                 renderItem={item => (
//                   <List.Item className="notification-item">
//                     {item}
//                   </List.Item>
//                 )}
//               />
//             </div>
//           }
//           trigger={['click']}
//           placement="bottomRight"
//         >
//           <Badge count={notificationCount} size="small">
//             <Button type="text" icon={<BellOutlined />} className="header-btn" />
//           </Badge>
//         </Dropdown>

//         {/* Help */}
//         <Button
//           type="text"
//           icon={<QuestionCircleOutlined />}
//           className="header-btn"
//           onClick={() => console.log('Help clicked')}
//         />

//         {/* Theme Toggle */}
//         <Space className="theme-toggle">
//           <BulbOutlined className="theme-icon" />
//           <Switch
//             checked={currentTheme === 'dark'}
//             onChange={handleThemeToggle}
//             size="small"
//             checkedChildren="🌙"
//             unCheckedChildren="☀️"
//           />
//         </Space>

//         {/* User Dropdown */}
//         <Dropdown
//           overlay={userDropdownContent}
//           trigger={['click']}
//           placement="bottomRight"
//           overlayClassName="user-profile-dropdown"
//         >
//           <Space className="user-dropdown-trigger">
//             <Avatar
//               size="small"
//               src={userData?.profilePhoto}
//               icon={<UserOutlined />}
//               className="user-avatar-small"
//             />
//             {!isMobile && (
//               <div className="user-info-small">
//                 <span className="user-name-small">
//                   {userData?.firstName} {userData?.lastName}
//                 </span>
//                 <DownOutlined className="dropdown-arrow" />
//               </div>
//             )}
//           </Space>
//         </Dropdown>
//       </Space>
//     </AntHeader>
//   );
// };

// export default Header;

///////////////Last Final////////////////////

// import {
//   Layout,
//   Button,
//   Space,
//   Badge,
//   Dropdown,
//   Avatar,
//   Switch,
//   Input,
//   List,
//   Tag,
//   Divider,
// } from "antd";
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   BellOutlined,
//   QuestionCircleOutlined,
//   SearchOutlined,
//   LogoutOutlined,
//   ProfileOutlined,
//   SettingOutlined,
//   BulbOutlined,
//   UserOutlined,
//   MessageOutlined,
//   CustomerServiceOutlined,
//   MailOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DownOutlined,
//   WechatOutlined,
// } from "@ant-design/icons";
// import { MdAirplaneTicket } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { toggleTheme } from "../../components/slices/themeSlice";
// import { clearCurrentUser } from "../../components/slices/userSlice";
// import './Header.css';

// const { Header: AntHeader } = Layout;
// const { Search } = Input;

// const Header = ({ onToggle, isMobile }) => {
//   const dispatch = useDispatch();
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const { currentTheme } = useSelector((state) => state.theme);
//   const userData = useSelector((state) => state.user.value);

//   const [notificationCount, setNotificationCount] = useState(12);
//   const [messageCount, setMessageCount] = useState(5);
//   const [supportTickets, setSupportTickets] = useState(3);

//   const [chatStats] = useState({
//     unreadMessages: 8,
//     openChats: 12,
//     recentActivity: "2 new messages",
//   });

//   const [userStats, setUserStats] = useState({
//     bugsFixed: "63.2K",
//     performance: "175.5%",
//     activity: "High",
//   });

//   useEffect(() => {
//     // Simulate data load
//     setUserStats({
//       bugsFixed: "63.2K",
//       performance: "175.5%",
//       activity: "High",
//     });
//   }, []);

//   const handleThemeToggle = () => dispatch(toggleTheme());
//   const handleSearch = (value) => console.log("Search:", value);

//   const navigateToProfile = () => console.log("Navigate to profile");
//   const navigateToSettings = () => console.log("Navigate to settings");

//   /** --- Dropdown Content --- */
//   const userDropdownContent = (
//     <div
//       className={`w-80 rounded-xl shadow-xl overflow-hidden ${
//         currentTheme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white"
//       }`}
//     >
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5">
//         <div className="flex items-center gap-3">
//           <Avatar
//             size={64}
//             src={userData?.profilePhoto}
//             icon={<UserOutlined />}
//             className="border-4 border-white/30"
//           />
//           <div>
//             <h3 className="text-lg font-semibold leading-tight">
//               {userData?.firstName} {userData?.lastName}
//             </h3>
//             <p className="text-sm opacity-80">VP People Manager</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3 mt-4 text-center">
//           <div>
//             <p className="text-base font-bold">{userStats.bugsFixed}</p>
//             <span className="text-xs opacity-80">Bugs Fixed</span>
//           </div>
//           <div>
//             <p className="text-base font-bold">{userStats.performance}</p>
//             <span className="text-xs opacity-80">Performance</span>
//           </div>
//           <Tag
//             color={userStats.activity === "High" ? "green" : "blue"}
//             className="rounded-md text-xs"
//           >
//             {userStats.activity} Activity
//           </Tag>
//         </div>
//       </div>

//       <Divider className="my-2" />

//       {/* Activity */}
//       <div className="px-5 py-3">
//         <h4 className="text-xs font-semibold tracking-wide text-gray-500 uppercase mb-2">
//           Activity
//         </h4>
//         <List
//           size="small"
//           dataSource={[
//             { icon: <WechatOutlined />, text: "Chat", count: chatStats.unreadMessages },
//             { icon: <CustomerServiceOutlined />, text: "Recover Password" },
//             { icon: <UserOutlined />, text: "My Account" },
//           ]}
//           renderItem={(item) => (
//             <List.Item className="flex justify-between items-center py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-2 cursor-pointer transition">
//               <div className="flex items-center gap-2">
//                 <span className="text-gray-500">{item.icon}</span>
//                 <span className="text-sm">{item.text}</span>
//               </div>
//               {item.count && <Badge count={item.count} size="small" />}
//             </List.Item>
//           )}
//         />
//       </div>

//       <Divider className="my-2" />

//       {/* Messages & Support */}
//       <div className="px-5 py-3 space-y-2">
//         <div className="flex justify-between items-center mb-1">
//           <h4 className="text-xs font-semibold uppercase text-gray-500">
//             Messages & Support
//           </h4>
//           <Button type="link" size="small" icon={<EyeOutlined />}>
//             View All
//           </Button>
//         </div>

//         <Button
//           block
//           icon={<MailOutlined />}
//           className="flex justify-between items-center border-gray-200 dark:border-gray-600"
//         >
//           Message Inbox
//           <Badge count={messageCount} size="small" offset={[10, -5]} />
//         </Button>

//         <Button
//           block
//           icon={<MdAirplaneTicket />}
//           className="flex justify-between items-center border-gray-200 dark:border-gray-600"
//         >
//           Support Tickets
//           <Badge count={supportTickets} size="small" offset={[10, -5]} />
//         </Button>

//         <Button
//           block
//           type="primary"
//           icon={<MessageOutlined />}
//           className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium"
//         >
//           Open Messages
//         </Button>
//       </div>

//       <Divider className="my-2" />

//       {/* Quick Actions */}
//       <div
//         className={`px-5 py-3 ${
//           currentTheme === "dark" ? "bg-gray-700" : "bg-gray-50"
//         }`}
//       >
//         <Space className="w-full flex justify-between">
//           <Button size="small" icon={<EditOutlined />} onClick={navigateToProfile}>
//             Edit Profile
//           </Button>
//           <Button size="small" icon={<SettingOutlined />} onClick={navigateToSettings}>
//             Settings
//           </Button>
//         </Space>
//       </div>
//     </div>
//   );

//   return (

//     <AntHeader
//       className={`transition-all duration-300 shadow-sm px-4 flex items-center justify-between ${
//         currentTheme === "dark"
//           ? "bg-gray-900 border-b border-gray-700"
//           : "bg-white border-b border-gray-200"
//       }`}
//     >
//       {/* Left Section */}
//       <div className="flex items-center gap-3 flex-1">
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={onToggle}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-md"
//         />
//         {!isMobile && (
//           <div>
//             <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
//               Welcome back, {userData?.firstName || "User"}!
//             </h1>
//             <p className="text-xs text-gray-500">
//               Here's what's happening with your workspace today.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Center */}
//       {!isMobile && (
//         <div className="flex-1 flex justify-center">
//           <Search
//             placeholder="Search messages, users, settings..."
//             allowClear
//             enterButton={<SearchOutlined />}
//             size="middle"
//             onSearch={handleSearch}
//             className="max-w-md rounded-lg"
//           />
//         </div>
//       )}

//       {/* Right Actions */}
//       <Space size="middle" className="flex-1 justify-end">
//         {/* Notifications */}
//         <Dropdown
//           trigger={["click"]}
//           placement="bottomRight"
//           overlay={
//             <div
//               className={`w-72 rounded-lg shadow-lg ${
//                 currentTheme === "dark" ? "bg-gray-800" : "bg-white"
//               }`}
//             >
//               <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
//                 <h4 className="font-medium text-sm">Notifications</h4>
//                 <Button type="link" size="small">
//                   Mark all as read
//                 </Button>
//               </div>
//               <List
//                 size="small"
//                 dataSource={[
//                   "New message from John",
//                   "Payment received",
//                   "Meeting reminder at 3 PM",
//                 ]}
//                 renderItem={(item) => (
//                   <List.Item className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer px-3 py-2 transition">
//                     {item}
//                   </List.Item>
//                 )}
//               />
//             </div>
//           }
//         >
//           <Badge count={notificationCount} size="small">
//             <Button type="text" icon={<BellOutlined />} />
//           </Badge>
//         </Dropdown>

//         {/* Help */}
//         <Button
//           type="text"
//           icon={<QuestionCircleOutlined />}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
//         />

//         {/* Theme Toggle */}
//         {/* <div className="flex items-center gap-1">
//           <BulbOutlined className="text-gray-500 dark:text-gray-400" />
//           <Switch
//             checked={currentTheme === "dark"}
//             onChange={handleThemeToggle}
//             size="small"
//             checkedChildren="🌙"
//             unCheckedChildren="☀️"
//           />
//         </div> */}

//         {/* User Dropdown */}
//         <Dropdown
//           overlay={userDropdownContent}
//           trigger={["click"]}
//           placement="bottomRight"
//           overlayClassName="p-0"
//         >
//           <Space className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-lg transition">
//             <Avatar
//               size="small"
//               src={userData?.profilePhoto}
//               icon={<UserOutlined />}
//             />
//             {!isMobile && (
//               <>
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                   {userData?.firstName} {userData?.lastName}
//                 </span>
//                 <DownOutlined className="text-xs text-gray-400" />
//               </>
//             )}
//           </Space>
//         </Dropdown>
//       </Space>
//     </AntHeader>
//   );
// };

// export default Header;

// import { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   BellOutlined,
//   QuestionCircleOutlined,
//   SearchOutlined,
//   LogoutOutlined,
//   ProfileOutlined,
//   SettingOutlined,
//   BulbOutlined,
//   UserOutlined,
//   MessageOutlined,
//   CustomerServiceOutlined,
//   MailOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DownOutlined,
//   WechatOutlined,
//   CloseOutlined,
// } from '@ant-design/icons';
// import { MdAirplaneTicket } from 'react-icons/md';
// import {
//   Layout,
//   Button,
//   Space,
//   Badge,
//   Dropdown,
//   Avatar,
//   Switch,
//   Input,
//   List,
//   Tag,
//   Divider,
//   message as antMessage,
//   AutoComplete,
//   Spin,
// } from 'antd';
// import { toggleTheme } from '../slices/themeSlice';
// import { clearCurrentUser } from '../slices/userSlice';
// import {
//   setSearchQuery,
//   setNotifications,
//   setUserStats,
//   markAllAsRead,
//   markNotificationAsRead
// } from '../slices/headerSlice';
// import './Header.css';

// const { Header: AntHeader } = Layout;
// const { Search } = Input;

// const Header = ({ onToggle, isMobile }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchRef = useRef(null);

//   // Redux state
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const { currentTheme } = useSelector((state) => state.theme);
//   const userData = useSelector((state) => state.user.value);
//   const headerState = useSelector((state) => state.header);

//   // Local state
//   const [searchValue, setSearchValue] = useState('');
//   const [searchSuggestions, setSearchSuggestions] = useState([]);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch initial data
//   useEffect(() => {
//     fetchNotifications();
//     fetchUserStats();
//   }, []);

//   // Fetch notifications from API
//   const fetchNotifications = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:3000/api/v1/notifications', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         dispatch(setNotifications(data.data || []));
//       }
//     } catch (error) {
//       console.error('Failed to fetch notifications:', error);
//       // Fallback to mock data
//       const mockNotifications = [
//         { id: 1, message: 'New message from John Doe', time: '2 min ago', read: false, type: 'message' },
//         { id: 2, message: 'Payment received successfully', time: '1 hour ago', read: false, type: 'payment' },
//         { id: 3, message: 'Meeting reminder at 3:00 PM', time: '2 hours ago', read: true, type: 'event' },
//         { id: 4, message: 'System update completed', time: '5 hours ago', read: true, type: 'system' },
//       ];
//       dispatch(setNotifications(mockNotifications));
//     }
//   };

//   // Fetch user stats - FIXED VERSION
// // const fetchUserStats = async () => {
// //   try {
// //     const token = localStorage.getItem('token');
// //     const response = await fetch('http://localhost:3000/api/v1/user/stats', {
// //       headers: {
// //         'Authorization': `Bearer ${token}`,
// //       },
// //     });

// //     if (response.ok) {
// //       const data = await response.json();
// //       // Transform the data to match what your header expects
// //       dispatch(setUserStats({
// //         profileComplete: `${data.data.profileComplete || 0}%`,
// //         accountAge: `${data.data.accountAge || 0} days`,
// //         loginStreak: data.data.loginStreak || 0,
// //         activity: data.data.activityLevel || 'Medium',
// //         // Add these for your current header display
// //         bugsFixed: '0', // You can remove these if not needed
// //         performance: '100%'
// //       }));
// //     } else {
// //       // If API fails, use sensible defaults
// //       console.warn('Stats API failed, using defaults');
// //       dispatch(setUserStats({
// //         profileComplete: '0%',
// //         accountAge: '1 day',
// //         loginStreak: 0,
// //         activity: 'Medium',
// //         bugsFixed: '0',
// //         performance: '100%'
// //       }));
// //     }
// //   } catch (error) {
// //     console.error('Failed to fetch user stats:', error);
// //     // Fallback to basic mock data
// //     dispatch(setUserStats({
// //       profileComplete: '75%',
// //       accountAge: '30 days',
// //       loginStreak: 5,
// //       activity: 'High',
// //       bugsFixed: '0',
// //       performance: '100%'
// //     }));
// //   }
// // };

//  const fetchUserStats = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     console.log("🔄 Fetching user stats...");

//     const response = await fetch('http://localhost:3000/api/v1/user/stats', {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
//     console.log("📊 Stats API response:", data);

//     if (response.ok && data.success) {
//       dispatch(setUserStats({
//         bugsFixed: data.data.bugsFixed || '0',
//         performance: data.data.performance || '100%',
//         activity: data.data.activity || 'Medium',
//         // Your actual stats
//         profileComplete: data.data.profileComplete,
//         accountAge: data.data.accountAge,
//         loginStreak: data.data.loginStreak
//       }));
//     } else {
//       throw new Error(data.message || 'Failed to fetch stats');
//     }
//   } catch (error) {
//     console.error('Failed to fetch user stats:', error);
//     // Use basic fallback
//     dispatch(setUserStats({
//       bugsFixed: '0',
//       performance: '100%',
//       activity: 'Medium',
//       profileComplete: 0,
//       accountAge: 0,
//       loginStreak: 0
//     }));
//   }
// };

//   // Handle search with API integration
//   const handleSearch = async (value) => {
//     if (!value.trim()) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:3000/api/v1/search/global', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ query: value }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         dispatch(setSearchQuery(value));
//         antMessage.success(`Found ${data.totalResults} results`);

//         // Navigate to search results page or handle results
//         console.log('Search results:', data.data);
//       } else {
//         antMessage.error('Search failed');
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       antMessage.error('Search failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get search suggestions
//   const handleSearchChange = async (value) => {
//     setSearchValue(value);

//     if (value.length < 2) {
//       setSearchSuggestions([]);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:3000/api/v1/search/suggestions?query=${encodeURIComponent(value)}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSearchSuggestions(data.data.recentSearches || []);
//       }
//     } catch (error) {
//       console.error('Failed to get suggestions:', error);
//     }
//   };

//   // Handle notification actions
//   const handleMarkAllAsRead = () => {
//     dispatch(markAllAsRead());
//     setIsNotificationOpen(false);
//     antMessage.success('All notifications marked as read');
//   };

//   const handleNotificationClick = (notificationId) => {
//     dispatch(markNotificationAsRead(notificationId));
//     // Handle notification click based on type
//     const notification = headerState.notifications.find(n => n.id === notificationId);
//     if (notification) {
//       switch (notification.type) {
//         case 'message':
//           navigate('/chat');
//           break;
//         case 'payment':
//           navigate('/paymentshistory');
//           break;
//         case 'event':
//           navigate('/events');
//           break;
//         default:
//           break;
//       }
//     }
//     setIsNotificationOpen(false);
//   };

//   // Handle profile actions
//   const handleProfileAction = (action) => {
//     switch (action) {
//       case 'profile':
//         navigate('/settings/profile');
//         break;
//       case 'settings':
//         navigate('/settings/general');
//         break;
//       case 'chat':
//         navigate('/chat');
//         break;
//       case 'recover-password':
//         navigate('/forgot-password');
//         break;
//       case 'my-account':
//         navigate('/settings/profile');
//         break;
//       case 'message-inbox':
//         navigate('/chat');
//         break;
//       case 'support-tickets':
//         antMessage.info('Support tickets feature coming soon');
//         break;
//       case 'open-messages':
//         navigate('/chat');
//         break;
//       case 'edit-profile':
//         navigate('/settings/profile');
//         break;
//       case 'logout':
//         handleLogout();
//         break;
//       default:
//         break;
//     }
//     setIsProfileOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(clearCurrentUser());
//     localStorage.removeItem('token');
//     localStorage.removeItem('currentUser');
//     navigate('/login');
//     antMessage.success('Logged out successfully');
//   };

//   // const handleThemeToggle = () => {
//   //   dispatch(toggleTheme());
//   // };

//   // Notifications Dropdown Content

//   const NotificationsDropdown = () => (
//     <div className={`w-80 rounded-xl shadow-xl border ${
//       currentTheme === 'dark'
//         ? 'bg-gray-800 border-gray-700 text-gray-100'
//         : 'bg-white border-gray-200'
//     }`}>
//       <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex justify-between items-center">
//           <h4 className="font-semibold text-gray-900 dark:text-white">Notifications</h4>
//           <Button
//             type="link"
//             size="small"
//             onClick={handleMarkAllAsRead}
//             className="text-blue-600 dark:text-blue-400"
//           >
//             Mark all as read
//           </Button>
//         </div>
//       </div>

//       <div className="max-h-96 overflow-y-auto">
//         {headerState.notifications.length > 0 ? (
//           headerState.notifications.map((notification) => (
//             <div
//               key={notification.id}
//               onClick={() => handleNotificationClick(notification.id)}
//               className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
//                 notification.read
//                   ? 'bg-white dark:bg-gray-800'
//                   : 'bg-blue-50 dark:bg-blue-900/20'
//               } hover:bg-gray-50 dark:hover:bg-gray-700`}
//             >
//               <div className="flex items-start space-x-3">
//                 <div className={`w-2 h-2 mt-2 rounded-full ${
//                   notification.read ? 'bg-gray-300' : 'bg-blue-500'
//                 }`}></div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-gray-900 dark:text-white">
//                     {notification.message}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     {notification.time}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="p-8 text-center">
//             <BellOutlined className="text-4xl text-gray-300 dark:text-gray-600 mb-2" />
//             <p className="text-gray-500 dark:text-gray-400">No notifications</p>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//         <button
//           onClick={() => navigate('/notifications')}
//           className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//         >
//           View All Notifications
//         </button>
//       </div>
//     </div>
//   );

//   // User Profile Dropdown Content
//   const UserDropdownContent = () => (
//     <div className={`w-80 rounded-xl shadow-xl overflow-hidden ${
//       currentTheme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'
//     }`}>
//       {/* Header Section */}
//       {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6"> */}
//        <div
//         className="relative bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white p-6"
//         style={{
//           backgroundImage: `url('/images/city3.jpg')`, // Replace with your image path
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundBlendMode: 'overlay'
//         }}
//       >
//         {/* Optional: Add overlay for better text readability */}
//         <div className="absolute inset-0 bg-black/20 rounded-t-xl"></div>

//         <div className="flex items-center space-x-4">
//           <Avatar
//             size={64}
//             src={userData?.profilePhoto}
//             icon={<UserOutlined />}
//             className="border-4 border-white/30 shadow-lg"
//           />
//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg font-semibold truncate">
//               {userData?.firstName} {userData?.lastName}
//             </h3>
//             <p className="text-blue-100 text-sm truncate">VP People Manager</p>
//             <p className="text-blue-200 text-xs truncate mt-1">A short profile description</p>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
//           <div className="text-center">
//             <div className="text-lg font-bold">{headerState.userStats.bugsFixed}</div>
//             <div className="text-xs text-blue-100">Bugs Fixed</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg font-bold">{headerState.userStats.performance}</div>
//             <div className="text-xs text-blue-100">Performance</div>
//           </div>
//           <div className="text-center">
//             <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//               headerState.userStats.activity === 'High'
//                 ? 'bg-green-500/20 text-green-100'
//                 : 'bg-blue-500/20 text-blue-100'
//             }`}>
//               {headerState.userStats.activity} Activity
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Activity Section */}
//       <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//         <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
//           ACTIVITY
//         </h4>
//         <div className="space-y-2">
//           {[
//             { icon: <WechatOutlined />, label: 'Chat', action: 'chat' },
//             { icon: <CustomerServiceOutlined />, label: 'Recover Password', action: 'recover-password' },
//             { icon: <UserOutlined />, label: 'MY ACCOUNT', action: 'my-account' },
//           ].map((item, index) => (
//             <div
//               key={index}
//               onClick={() => handleProfileAction(item.action)}
//               className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="text-gray-600 dark:text-gray-400">
//                   {item.icon}
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   {item.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Messages & Support Section */}
//       <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center justify-between mb-3">
//           <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
//             MESSAGES & SUPPORT
//           </h4>
//           <button
//             onClick={() => handleProfileAction('message-inbox')}
//             className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//           >
//             View All
//           </button>
//         </div>

//         <div className="space-y-2">
//           <button
//             onClick={() => handleProfileAction('message-inbox')}
//             className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
//           >
//             <div className="flex items-center space-x-3">
//               <MailOutlined className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Message Inbox</span>
//             </div>
//             <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
//               {headerState.notifications.filter(n => n.type === 'message' && !n.read).length}
//             </span>
//           </button>

//           <button
//             onClick={() => handleProfileAction('support-tickets')}
//             className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all group"
//           >
//             <div className="flex items-center space-x-3">
//               <MdAirplaneTicket className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Support Tickets</span>
//             </div>
//             <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//               {headerState.notifications.filter(n => n.type === 'system' && !n.read).length}
//             </span>
//           </button>

//           <button
//             onClick={() => handleProfileAction('open-messages')}
//             className="w-full flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all shadow-lg hover:shadow-xl"
//           >
//             <MessageOutlined className="mr-2" />
//             Open Messages
//           </button>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="p-4 bg-gray-50 dark:bg-gray-900">
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleProfileAction('edit-profile')}
//             className="flex-1 flex items-center justify-center py-2 px-3 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//           >
//             <EditOutlined className="mr-2" />
//             Edit Profile
//           </button>
//           <button
//             onClick={() => handleProfileAction('settings')}
//             className="flex-1 flex items-center justify-center py-2 px-3 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//           >
//             <SettingOutlined className="mr-2" />
//             Settings
//           </button>
//         </div>
//       </div>

//       {/* Logout */}
//       <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//         <button
//           onClick={() => handleProfileAction('logout')}
//           className="w-full flex items-center justify-center py-2 px-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
//         >
//           <LogoutOutlined className="mr-2" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <AntHeader className={`
//       transition-all duration-300 shadow-sm px-4 flex items-center justify-start h-[90px]
//       ${currentTheme === 'dark'
//         ? 'bg-gray-900 border-b border-gray-700 text-gray-100'
//         : 'bg-white border-b border-gray-200 text-gray-900'
//       }
//     `}>
//       {/* Left Section */}
//       <div className="flex  items-center gap-4 flex-[1] min-w-0">
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={onToggle}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg"
//         />

//         {!isMobile && (
//           <div className="truncate">
//             <h1 className="text-lg font-semibold">
//               Welcome back, {userData?.firstName}!
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
//               Here's what's happening with your association today.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Center - Search Bar */}
//       {!isMobile && (
//         <div className="flex-[1] max-w-md mx-4">
//           <div className="relative">
//             <AutoComplete
//               options={searchSuggestions.map(suggestion => ({
//                 value: suggestion,
//                 label: suggestion,
//               }))}
//               onSelect={(value) => {
//                 setSearchValue(value);
//                 handleSearch(value);
//               }}
//               onSearch={handleSearchChange}
//               value={searchValue}
//               className="w-full"
//             >
//               <Input
//                 ref={searchRef}
//                 placeholder="Search messages, users, settings..."
//                 prefix={<SearchOutlined className="text-gray-400" />}
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 onPressEnter={() => handleSearch(searchValue)}
//                 onFocus={() => setIsSearchFocused(true)}
//                 onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
//                 className="rounded-lg"
//                 suffix={loading ? <Spin size="small" /> : null}
//               />
//             </AutoComplete>

//             {isSearchFocused && searchValue && (
//               <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-xl border z-50 ${
//                 currentTheme === 'dark'
//                   ? 'bg-gray-800 border-gray-700'
//                   : 'bg-white border-gray-200'
//               }`}>
//                 <div className="p-3">
//                   <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                     Press Enter to search for "{searchValue}"
//                   </div>
//                   {searchSuggestions.length > 0 && (
//                     <div>
//                       <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
//                         Recent Searches
//                       </div>
//                       {searchSuggestions.map((suggestion, index) => (
//                         <div
//                           key={index}
//                           className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
//                           onClick={() => {
//                             setSearchValue(suggestion);
//                             handleSearch(suggestion);
//                           }}
//                         >
//                           {suggestion}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Right Actions */}
//       <Space size="middle" className="flex items-center justify-center gap-3 flex-[1] min-w-0">
//         {/* Notifications */}
//         <div className="relative">
//           <Dropdown
//             menu={<NotificationsDropdown />}
//             trigger={['click']}
//             open={isNotificationOpen}
//             onOpenChange={setIsNotificationOpen}
//             placement="bottomRight"
//           >
//             <Badge count={headerState.unreadCount} size="small">
//               <Button
//                 type="text"
//                 icon={<BellOutlined />}
//                 className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//               />
//             </Badge>
//           </Dropdown>
//         </div>

//         {/* Help */}
//         <Button
//           type="text"
//           icon={<QuestionCircleOutlined />}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//           onClick={() => navigate('/help')}
//         />

//         {/* Theme Toggle */}
//         {/* <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
//           <BulbOutlined className="text-gray-500 dark:text-gray-400" />
//           <Switch
//             checked={currentTheme === 'dark'}
//             onChange={handleThemeToggle}
//             size="small"
//             checkedChildren="🌙"
//             unCheckedChildren="☀️"
//           />
//         </div> */}

//         {/* User Profile */}
//         <div className="relative">
//           <Dropdown
//             menu={<UserDropdownContent />}
//             trigger={['click']}
//             open={isProfileOpen}
//             onOpenChange={setIsProfileOpen}
//             placement="bottomRight"
//           >
//             <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
//               {/* <Avatar
//                  size={50}
//                 src={userData?.profilePhoto}
//                 icon={<UserOutlined />}
//                 className="border-2 "
//               /> */}
//              <div className="w-[50px] h-[50px] rounded-full border-2 overflow-hidden flex items-center justify-center bg-gray-100">
//   <img
//     src={userData?.profilePhoto || '/default.png'}
//     alt="Profile"
//     className="w-full h-full object-cover object-[50%_30%]"  // 👈 focus more on the face area
//   />
// </div>

//               {!isMobile && (
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-medium">
//                     {userData?.firstName} {userData?.lastName}
//                   </span>
//                   <DownOutlined className="text-xs text-gray-400" />
//                 </div>
//               )}
//             </div>
//           </Dropdown>
//         </div>
//       </Space>
//     </AntHeader>
//   );
// };

// export default Header;

// import { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   BellOutlined,
//   QuestionCircleOutlined,
//   SearchOutlined,
//   LogoutOutlined,
//   ProfileOutlined,
//   SettingOutlined,
//   BulbOutlined,
//   UserOutlined,
//   MessageOutlined,
//   CustomerServiceOutlined,
//   MailOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DownOutlined,
//   WechatOutlined,
//   CloseOutlined,
// } from "@ant-design/icons";
// import { MdAirplaneTicket } from "react-icons/md";
// import {
//   Layout,
//   Button,
//   Space,
//   Badge,
//   Dropdown,
//   Avatar,
//   Switch,
//   Input,
//   List,
//   Tag,
//   Divider,
//   message as antMessage,
//   AutoComplete,
//   Spin,
// } from "antd";
// import { toggleTheme } from "../slices/themeSlice";
// import { clearCurrentUser } from "../slices/userSlice";
// import {
//   setSearchQuery,
//   setNotifications,
//   setUserStats,
//   markAllAsRead,
//   markNotificationAsRead,
// } from "../slices/headerSlice";
// import { motion } from "framer-motion";
// import "./Header.css";


// const { Header: AntHeader } = Layout;
// const { Search } = Input;

// const Header = ({ onToggle, isMobile }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchRef = useRef(null);

//   // Redux state
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const { currentTheme } = useSelector((state) => state.theme);
//   const userData = useSelector((state) => state.user.value);
//   const headerState = useSelector((state) => state.header);

//   // Local state
//   const [searchValue, setSearchValue] = useState("");
//   const [searchSuggestions, setSearchSuggestions] = useState([]);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch initial data
//   useEffect(() => {
//     fetchNotifications();
//     fetchUserStats();
//   }, []);

//   // Fetch notifications from API
//   const fetchNotifications = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:3000/api/v1/notifications",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         dispatch(setNotifications(data.data || []));
//       }
//     } catch (error) {
//       console.error("Failed to fetch notifications:", error);
//       // Fallback to mock data
//       const mockNotifications = [
//         {
//           id: 1,
//           message: "New message from John Doe",
//           time: "2 min ago",
//           read: false,
//           type: "message",
//         },
//         {
//           id: 2,
//           message: "Payment received successfully",
//           time: "1 hour ago",
//           read: false,
//           type: "payment",
//         },
//         {
//           id: 3,
//           message: "Meeting reminder at 3:00 PM",
//           time: "2 hours ago",
//           read: true,
//           type: "event",
//         },
//         {
//           id: 4,
//           message: "System update completed",
//           time: "5 hours ago",
//           read: true,
//           type: "system",
//         },
//       ];
//       dispatch(setNotifications(mockNotifications));
//     }
//   };

//   // Fetch user stats
//   const fetchUserStats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("🔄 Fetching user stats...");

//       const response = await fetch("http://localhost:3000/api/v1/user/stats", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       console.log("📊 Stats API response:", data);

//       if (response.ok && data.success) {
//         dispatch(
//           setUserStats({
//             bugsFixed: data.data.bugsFixed || "0",
//             performance: data.data.performance || "100%",
//             activity: data.data.activity || "Medium",
//             profileComplete: data.data.profileComplete,
//             accountAge: data.data.accountAge,
//             loginStreak: data.data.loginStreak,
//           })
//         );
//       } else {
//         throw new Error(data.message || "Failed to fetch stats");
//       }
//     } catch (error) {
//       console.error("Failed to fetch user stats:", error);
//       // Use basic fallback
//       dispatch(
//         setUserStats({
//           bugsFixed: "0",
//           performance: "100%",
//           activity: "Medium",
//           profileComplete: 0,
//           accountAge: 0,
//           loginStreak: 0,
//         })
//       );
//     }
//   };

//   // Handle search with API integration
//   const handleSearch = async (value) => {
//     if (!value.trim()) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:3000/api/v1/search/global",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ query: value }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         dispatch(setSearchQuery(value));
//         antMessage.success(`Found ${data.totalResults} results`);

//         console.log("Search results:", data.data);
//       } else {
//         antMessage.error("Search failed");
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//       antMessage.error("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get search suggestions
//   const handleSearchChange = async (value) => {
//     setSearchValue(value);

//     if (value.length < 2) {
//       setSearchSuggestions([]);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3000/api/v1/search/suggestions?query=${encodeURIComponent(
//           value
//         )}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setSearchSuggestions(data.data.recentSearches || []);
//       }
//     } catch (error) {
//       console.error("Failed to get suggestions:", error);
//     }
//   };

//   // Handle notification actions
//   const handleMarkAllAsRead = () => {
//     dispatch(markAllAsRead());
//     setIsNotificationOpen(false);
//     antMessage.success("All notifications marked as read");
//   };

//   const handleNotificationClick = (notificationId) => {
//     dispatch(markNotificationAsRead(notificationId));
//     const notification = headerState.notifications.find(
//       (n) => n.id === notificationId
//     );
//     if (notification) {
//       switch (notification.type) {
//         case "message":
//           navigate("/chat");
//           break;
//         case "payment":
//           navigate("/paymentshistory");
//           break;
//         case "event":
//           navigate("/events");
//           break;
//         default:
//           break;
//       }
//     }
//     setIsNotificationOpen(false);
//   };

//   // Handle profile actions
//   const handleProfileAction = (action) => {
//     switch (action) {
//       case "profile":
//         navigate("/settings/profile");
//         break;
//       case "settings":
//         navigate("/settings/general");
//         break;
//       case "chat":
//         navigate("/chat");
//         break;
//       case "recover-password":
//         navigate("/forgot-password");
//         break;
//       case "my-account":
//         navigate("/settings/profile");
//         break;
//       case "message-inbox":
//         navigate("/chat");
//         break;
//       case "support-tickets":
//         antMessage.info("Support tickets feature coming soon");
//         break;
//       case "open-messages":
//         navigate("/chat");
//         break;
//       case "edit-profile":
//         navigate("/settings/profile");
//         break;
//       case "logout":
//         handleLogout();
//         break;
//       default:
//         break;
//     }
//     setIsProfileOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(clearCurrentUser());
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//     antMessage.success("Logged out successfully");
//   };

//   // ✅ FIXED: Notifications Dropdown Menu Items
//   const notificationMenuItems = {
//     items: [
//       {
//         key: "notifications-header",
//         label: (
//           <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold text-gray-900 dark:text-white">
//                 Notifications
//               </h4>
//               <Button
//                 type="link"
//                 size="small"
//                 onClick={handleMarkAllAsRead}
//                 className="text-blue-600 dark:text-blue-400"
//               >
//                 Mark all as read
//               </Button>
//             </div>
//           </div>
//         ),
//         disabled: true,
//       },
//       {
//         key: "notifications-list",
//         label: (
//           <div className="max-h-96 overflow-y-auto">
//             {headerState.notifications.length > 0 ? (
//               headerState.notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   onClick={() => handleNotificationClick(notification.id)}
//                   className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
//                     notification.read
//                       ? "bg-white dark:bg-gray-800"
//                       : "bg-blue-50 dark:bg-blue-900/20"
//                   } hover:bg-gray-50 dark:hover:bg-gray-700`}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <div
//                       className={`w-2 h-2 mt-2 rounded-full ${
//                         notification.read ? "bg-gray-300" : "bg-blue-500"
//                       }`}
//                     ></div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm text-gray-900 dark:text-white">
//                         {notification.message}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         {notification.time}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-8 text-center">
//                 <BellOutlined className="text-4xl text-gray-300 dark:text-gray-600 mb-2" />
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No notifications
//                 </p>
//               </div>
//             )}
//           </div>
//         ),
//         disabled: true,
//       },
//       {
//         key: "notifications-footer",
//         label: (
//           <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//             <button
//               onClick={() => navigate("/notifications")}
//               className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//             >
//               View All Notifications
//             </button>
//           </div>
//         ),
//         disabled: true,
//       },
//     ],
//   };

//   // ✅ FIXED: User Profile Dropdown Menu Items 1111111111111111111
//   // const userMenuItems = {
//   //   items: [
//   //     {
//   //       key: "profile-header",
//   //       label: (
//   //         <div
//   //           className="relative bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white p-4 w-full"
//   //           style={{
//   //             backgroundImage: `url('/images/city3.jpg')`,
//   //             backgroundSize: "cover",
//   //             backgroundPosition: "center",
//   //             backgroundBlendMode: "overlay",
//   //             backgroundColor: "#16aaff",
//   //             opacity: "1",
//   //             borderTopLeftRadius: "10px",
//   //             borderTopRightRadius: "10px"
//   //           }}
//   //         >
//   //           <div className="absolute inset-0 bg-black/20 rounded-t-xl"></div>
//   //           <div className="flex items-center justify-start space-x-4 relative z-10 pr-19">
//   //             <Avatar
//   //               size={60}
//   //               src={userData?.profilePhoto}
//   //               icon={<UserOutlined />}
//   //               className="border-4 border-white/30 shadow-lg"
//   //             />
//   //             <div className="flex-1 min-w-0">
//   //               <h3 className="text-base font-semibold truncate">
//   //                 {userData?.firstName} {userData?.lastName}
//   //               </h3>
//   //               <p className="text-blue-100 text-sm truncate">
//   //                 {userData?.role} / FinanceSecretary 
//   //               </p>
              
//   //             </div>
//   //           </div>

//   //           {/* <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20 relative z-10">
//   //             <div className="text-center">
//   //               <div className="text-lg font-bold">
//   //                 {headerState.userStats.bugsFixed}
//   //               </div>
//   //               <div className="text-xs text-blue-100">Bugs Fixed</div>
//   //             </div>
//   //             <div className="text-center">
//   //               <div className="text-lg font-bold">
//   //                 {headerState.userStats.performance}
//   //               </div>
//   //               <div className="text-xs text-blue-100">Performance</div>
//   //             </div>
//   //             <div className="text-center">
//   //               <div
//   //                 className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//   //                   headerState.userStats.activity === "High"
//   //                     ? "bg-green-500/20 text-green-100"
//   //                     : "bg-blue-500/20 text-blue-100"
//   //                 }`}
//   //               >
//   //                 {headerState.userStats.activity} Activity
//   //               </div>
//   //             </div>
//   //           </div> */}
//   //         </div>
//   //       ),
//   //       disabled: true,
//   //     },
//   //     {
//   //       key: "activity-section",
//   //       label: (
//   //         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//   //           <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
//   //             ACTIVITY
//   //           </h4>
//   //           <div className="space-y-2">
//   //             {[
//   //               { icon: <WechatOutlined />, label: "Chat", action: "chat" },
//   //               {
//   //                 icon: <CustomerServiceOutlined />,
//   //                 label: "Recover Password",
//   //                 action: "recover-password",
//   //               },
//   //               {
//   //                 icon: <UserOutlined />,
//   //                 label: "MY ACCOUNT",
//   //                 action: "my-account",
//   //               },
//   //             ].map((item, index) => (
//   //               <div
//   //                 key={index}
//   //                 onClick={() => handleProfileAction(item.action)}
//   //                 className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
//   //               >
//   //                 <div className="flex items-center space-x-3">
//   //                   <div className="text-gray-600 dark:text-gray-400">
//   //                     {item.icon}
//   //                   </div>
//   //                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//   //                     {item.label}
//   //                   </span>
//   //                 </div>
//   //               </div>
//   //             ))}
//   //           </div>
//   //         </div>
//   //       ),
//   //       disabled: true,
//   //     },
//   //     {
//   //       key: "messages-section",
//   //       label: (
//   //         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//   //           <div className="flex items-center justify-between mb-3">
//   //             <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
//   //               MESSAGES & SUPPORT
//   //             </h4>
//   //             <button
//   //               onClick={() => handleProfileAction("message-inbox")}
//   //               className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//   //             >
//   //               View All
//   //             </button>
//   //           </div>

//   //           <div className="space-y-2">
//   //             <button
//   //               onClick={() => handleProfileAction("message-inbox")}
//   //               className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
//   //             >
//   //               <div className="flex items-center space-x-3">
//   //                 <MailOutlined className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
//   //                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//   //                   Message Inbox
//   //                 </span>
//   //               </div>
//   //               <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
//   //                 {
//   //                   headerState.notifications.filter(
//   //                     (n) => n.type === "message" && !n.read
//   //                   ).length
//   //                 }
//   //               </span>
//   //             </button>

//   //             <button
//   //               onClick={() => handleProfileAction("support-tickets")}
//   //               className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all group"
//   //             >
//   //               <div className="flex items-center space-x-3">
//   //                 <MdAirplaneTicket className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
//   //                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//   //                   Support Tickets
//   //                 </span>
//   //               </div>
//   //               <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//   //                 {
//   //                   headerState.notifications.filter(
//   //                     (n) => n.type === "system" && !n.read
//   //                   ).length
//   //                 }
//   //               </span>
//   //             </button>

//   //             <button
//   //               onClick={() => handleProfileAction("open-messages")}
//   //               className="w-full flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all shadow-lg hover:shadow-xl"
//   //             >
//   //               <MessageOutlined className="mr-2" />
//   //               Open Messages
//   //             </button>
//   //           </div>
//   //         </div>
//   //       ),
//   //       disabled: true,
//   //     },
//   //     {
//   //       key: "quick-actions",
//   //       label: (
//   //         <div className="p-4 bg-gray-50 dark:bg-gray-900">
//   //           <div className="flex space-x-2">
//   //             <button
//   //               onClick={() => handleProfileAction("edit-profile")}
//   //               className="flex-1 flex items-center justify-center py-2 px-3 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//   //             >
//   //               <EditOutlined className="mr-2" />
//   //               Edit Profile
//   //             </button>
//   //             <button
//   //               onClick={() => handleProfileAction("settings")}
//   //               className="flex-1 flex items-center justify-center py-2 px-3 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//   //             >
//   //               <SettingOutlined className="mr-2" />
//   //               Settings
//   //             </button>
//   //           </div>
//   //         </div>
//   //       ),
//   //       disabled: true,
//   //     },
//   //     {
//   //       key: "logout",
//   //       label: (
//   //         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//   //           <button
//   //             onClick={() => handleProfileAction("logout")}
//   //             className="w-full flex items-center justify-center py-2 px-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
//   //           >
//   //             <LogoutOutlined className="mr-2" />
//   //             Logout
//   //           </button>
//   //         </div>
//   //       ),
//   //       disabled: true,
//   //     },
//   //   ],
//   // };

//   // ✅ UPDATED: User Profile Dropdown Menu Items to match screenshot design22222222222
// // const userMenuItems = {
// //   items: [
// //     {
// //       key: "profile-header",
// //       label: (
// //         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //           <div className="flex items-center justify-between">
// //             {/* Left side - Avatar and user info */}
// //             <div className="flex items-center space-x-3">
// //               <Avatar
// //                 size={48}
// //                 src={userData?.profilePhoto}
// //                 icon={<UserOutlined />}
// //                 className="border-2 border-gray-300 dark:border-gray-600"
// //               />
// //               <div className="flex-1 min-w-0">
// //                 <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
// //                   {userData?.firstName} {userData?.lastName}
// //                 </h3>
// //                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
// //                   {userData?.role} / FinanceSecretary
// //                 </p>
// //                 {/* Short profile description as shown in screenshot */}
// //                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
// //                   A short profile description
// //                 </p>
// //               </div>
// //             </div>
            
// //             {/* Right side - Logout button */}
// //             <Button
// //               type="text"
// //               icon={<LogoutOutlined />}
// //               onClick={() => handleProfileAction("logout")}
// //               className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
// //               title="Logout"
// //             />
// //           </div>
// //         </div>
// //       ),
// //       disabled: true,
// //     },
// //     {
// //       key: "my-account-section",
// //       label: (
// //         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //           <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
// //             MY ACCOUNT
// //           </h4>
// //           <div className="space-y-2">
// //             {[
// //               { icon: <SettingOutlined />, label: "Settings", action: "settings" },
// //               { icon: <MessageOutlined />, label: "Messages", action: "message-inbox" },
// //               { icon: <EyeOutlined />, label: "Logs", action: "logs" },
// //             ].map((item, index) => (
// //               <div
// //                 key={index}
// //                 onClick={() => handleProfileAction(item.action)}
// //                 className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
// //               >
// //                 <div className="flex items-center space-x-3">
// //                   <div className="text-gray-600 dark:text-gray-400">
// //                     {item.icon}
// //                   </div>
// //                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     {item.label}
// //                   </span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       ),
// //       disabled: true,
// //     },
// //     {
// //       key: "new-section",
// //       label: (
// //         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //           <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
// //             NEW
// //           </h4>
// //           <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
// //             <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">512</div>
// //             <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">New Items</div>
// //           </div>
// //         </div>
// //       ),
// //       disabled: true,
// //     },
// //     {
// //       key: "messages-support-section",
// //       label: (
// //         <div className="p-4">
// //           <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
// //             MESSAGES & SUPPORT
// //           </h4>
// //           <div className="space-y-2">
// //             <button
// //               onClick={() => handleProfileAction("message-inbox")}
// //               className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
// //             >
// //               <div className="flex items-center space-x-3">
// //                 <MailOutlined className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
// //                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Message Inbox
// //                 </span>
// //               </div>
// //               <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
// //                 {
// //                   headerState.notifications.filter(
// //                     (n) => n.type === "message" && !n.read
// //                   ).length
// //                 }
// //               </span>
// //             </button>

// //             <button
// //               onClick={() => handleProfileAction("support-tickets")}
// //               className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all group"
// //             >
// //               <div className="flex items-center space-x-3">
// //                 <MdAirplaneTicket className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
// //                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Support Tickets
// //                 </span>
// //               </div>
// //               <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
// //                 {
// //                   headerState.notifications.filter(
// //                     (n) => n.type === "system" && !n.read
// //                   ).length
// //                 }
// //               </span>
// //             </button>
// //           </div>
          
// //           {/* Open Messages Button */}
// //           <button
// //             onClick={() => handleProfileAction("open-messages")}
// //             className="w-full flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all shadow-lg hover:shadow-xl mt-3"
// //           >
// //             <MessageOutlined className="mr-2" />
// //             Open Messages
// //           </button>
// //         </div>
// //       ),
// //       disabled: true,
// //     },
// //   ],
// // };
    
//     // ✅ UPDATED: User Profile Dropdown Menu Items - ONLY moved logout button333333333333
// // const userMenuItems = {
// //   items: [
// //    {
// //   key: "profile-header",
// //   label: (
// //     <div
// //       className="relative bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white p-4 w-full"
// //       style={{
// //         backgroundImage: `url('/images/city3.jpg')`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundBlendMode: "overlay",
// //         backgroundColor: "#16aaff",
// //         margin: "0", // ← NO margin
// //         padding: "0", // ← NO padding
// //         borderTopLeftRadius: "0px", // ← Remove border radius if you want sharp corners
// //         borderTopRightRadius: "0px", // ← Remove border radius if you want sharp corners
// //       }}
// //     >
// //       <div className="absolute inset-0 bg-black/20"></div> {/* Remove rounded-t-xl */}
// //       <div className="flex items-center justify-between relative z-10 p-4"> {/* Add padding to content instead */}
// //         {/* Left side - Avatar and user info */}
// //         <div className="flex items-center space-x-4">
// //           <Avatar
// //             size={60}
// //             src={userData?.profilePhoto}
// //             icon={<UserOutlined />}
// //             className="border-4 border-white/30 shadow-lg"
// //           />
// //           <div className="flex-1 min-w-0">
// //             <h3 className="text-base font-semibold truncate">
// //               {userData?.firstName} {userData?.lastName}
// //             </h3>
// //             <p className="text-blue-100 text-sm truncate">
// //               {userData?.role} / FinanceSecretary 
// //             </p>
// //             <p className="text-blue-100 text-xs mt-1 opacity-90">
// //               A short profile description
// //             </p>
// //           </div>
// //         </div>
        
// //         {/* Right side - Logout button */}
// //         <Button
// //           type="text"
// //           icon={<LogoutOutlined />}
// //           onClick={(e) => {
// //             e.stopPropagation();
// //             handleProfileAction("logout");
// //           }}
// //           className="text-white hover:bg-white/20 transition-colors rounded-lg"
// //           title="Logout"
// //         />
// //       </div>
// //     </div>
// //   ),
// //   disabled: true,
// // },
// //     // KEEP ALL OTHER SECTIONS EXACTLY THE SAME AS BEFORE
// //     {
// //       key: "activity-section",
// //       label: (
// //         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //           <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
// //             ACTIVITY
// //           </h4>
// //           <div className="space-y-2">
// //             {[
// //               { icon: <WechatOutlined />, label: "Chat", action: "chat" },
// //               {
// //                 icon: <CustomerServiceOutlined />,
// //                 label: "Recover Password",
// //                 action: "recover-password",
// //               },
// //               {
// //                 icon: <UserOutlined />,
// //                 label: "MY ACCOUNT",
// //                 action: "my-account",
// //               },
// //             ].map((item, index) => (
// //               <div
// //                 key={index}
// //                 onClick={() => handleProfileAction(item.action)}
// //                 className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
// //               >
// //                 <div className="flex items-center space-x-3">
// //                   <div className="text-gray-600 dark:text-gray-400">
// //                     {item.icon}
// //                   </div>
// //                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     {item.label}
// //                   </span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       ),
// //       disabled: true,
// //     },
// //     {
// //       key: "messages-section",
// //       label: (
// //         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //           <div className="flex items-center justify-between mb-3">
// //             <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
// //               MESSAGES & SUPPORT
// //             </h4>
// //             <button
// //               onClick={() => handleProfileAction("message-inbox")}
// //               className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
// //             >
// //               View All
// //             </button>
// //           </div>

// //           <div className="space-y-2">
// //             <button
// //               onClick={() => handleProfileAction("message-inbox")}
// //               className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
// //             >
// //               <div className="flex items-center space-x-3">
// //                 <MailOutlined className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
// //                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Message Inbox
// //                 </span>
// //               </div>
// //               <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
// //                 {
// //                   headerState.notifications.filter(
// //                     (n) => n.type === "message" && !n.read
// //                   ).length
// //                 }
// //               </span>
// //             </button>

// //             <button
// //               onClick={() => handleProfileAction("support-tickets")}
// //               className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all group"
// //             >
// //               <div className="flex items-center space-x-3">
// //                 <MdAirplaneTicket className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
// //                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Support Tickets
// //                 </span>
// //               </div>
// //               <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
// //                 {
// //                   headerState.notifications.filter(
// //                     (n) => n.type === "system" && !n.read
// //                   ).length
// //                 }
// //               </span>
// //             </button>

// //             <button
// //               onClick={() => handleProfileAction("open-messages")}
// //               className="w-full flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all shadow-lg hover:shadow-xl"
// //             >
// //               <MessageOutlined className="mr-2" />
// //               Open Messages
// //             </button>
// //           </div>
// //         </div>
// //       ),
// //       disabled: true,
// //     },
// //     {
// //       key: "quick-actions",
// //       label: (
// //         <div className="p-4 bg-gray-50 dark:bg-gray-900">
// //           <div className="flex space-x-2">
// //             <button
// //               onClick={() => handleProfileAction("edit-profile")}
// //               className="flex-1 flex items-center justify-center py-2 px-3 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
// //             >
// //               <EditOutlined className="mr-2" />
// //               Edit Profile
// //             </button>
// //             <button
// //               onClick={() => handleProfileAction("settings")}
// //               className="flex-1 flex items-center justify-center py-2 px-3 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
// //             >
// //               <SettingOutlined className="mr-2" />
// //               Settings
// //             </button>
// //           </div>
// //         </div>
// //       ),
// //       disabled: true,
// //     },
// //     // REMOVE THE SEPARATE LOGOUT SECTION SINCE IT'S NOW AT THE TOP
// //   ],
// // };
// // ✅ Professional, Responsive & Dynamic User Profile Dropdown

// const userMenuItems = {
//   items: [
//     // ───────────────────────────── HEADER ─────────────────────────────
//     {
//       key: "profile-header",
//       label: (
//         <div
//           className="relative text-white w-full"
//           style={{
//             backgroundImage: `linear-gradient(to right, rgba(37,99,235,0.85), rgba(147,51,234,0.85)), url('/images/city3.jpg')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="p-6 flex items-center justify-between">
//             {/* Avatar + Info */}
//             <div className="flex items-center gap-4 flex-1 min-w-0">
//               <Avatar
//                 size={56}
//                 src={userData?.profilePhoto}
//                 icon={<UserOutlined />}
//                 className="border-4 border-white/40 shadow-md flex-shrink-0"
//               />
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-lg font-semibold truncate text-white">
//                   {userData?.firstName} {userData?.lastName}
//                 </h3>
//                 <p className="text-blue-100 text-sm font-medium truncate">
//                   {userData?.role} / Finance Secretary
//                 </p>
//                 <p className="text-blue-100/90 text-xs mt-1 opacity-80 truncate">
//                   Empowering financial transparency
//                 </p>
//               </div>
//             </div>

//             {/* Logout */}
//             <Button
//               type="text"
//               icon={<LogoutOutlined />}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleProfileAction("logout");
//               }}
//               className="text-white hover:bg-white/20 p-2 rounded-lg transition flex-shrink-0 ml-2"
//               title="Logout"
//             />
//           </div>
//         </div>
//       ),
//       disabled: true,
//     },

//     // ───────────────────────────── ACTIVITY ─────────────────────────────
//     {
//       key: "activity-section",
//       label: (
//         <div className="p-6 border-b border-gray-100 dark:border-gray-700">
//           <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
//             Recent Activity
//           </h4>
//           <div className="space-y-3">
//             {[
//               {
//                 icon: <WechatOutlined className="text-blue-600 text-lg" />,
//                 label: "Chat",
//                 action: "chat",
//                 description: "Connect with your team",
//               },
//               {
//                 icon: <CustomerServiceOutlined className="text-green-600 text-lg" />,
//                 label: "Recover Password",
//                 action: "recover-password",
//                 description: "Reset your credentials",
//               },
//               {
//                 icon: <UserOutlined className="text-purple-600 text-lg" />,
//                 label: "My Account",
//                 action: "my-account",
//                 description: "Update profile info",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 onClick={() => handleProfileAction(item.action)}
//                 className="flex items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
//               >
//                 <div className="flex items-center gap-4 flex-1">
//                   <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
//                     {item.icon}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
//                       {item.label}
//                     </span>
//                     <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {item.description}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ),
//       disabled: true,
//     },

//     // ───────────────────────────── MESSAGES & SUPPORT ─────────────────────────────
//     {
//       key: "messages-section",
//       label: (
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//               Messages & Support
//             </h4>
//             <button
//               onClick={() => handleProfileAction("message-inbox")}
//               className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
//             >
//               View All
//             </button>
//           </div>

//           <div className="space-y-3">
//             {/* Inbox */}
//             <button
//               onClick={() => handleProfileAction("message-inbox")}
//               className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all bg-white dark:bg-gray-800 hover:shadow-sm"
//             >
//               <div className="flex items-center gap-4 flex-1 min-w-0">
//                 <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
//                   <MailOutlined className="text-blue-600 dark:text-blue-400 text-lg" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
//                     Message Inbox
//                   </span>
//                   <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
//                     Check your messages
//                   </span>
//                 </div>
//               </div>
//               <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0 ml-2">
//                 {
//                   headerState.notifications.filter(
//                     (n) => n.type === "message" && !n.read
//                   ).length
//                 }
//               </span>
//             </button>

//             {/* Tickets */}
//             <button
//               onClick={() => handleProfileAction("support-tickets")}
//               className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 transition-all bg-white dark:bg-gray-800 hover:shadow-sm"
//             >
//               <div className="flex items-center gap-4 flex-1 min-w-0">
//                 <div className="w-10 h-10 flex items-center justify-center bg-green-50 dark:bg-green-900/30 rounded-lg flex-shrink-0">
//                   <MdAirplaneTicket className="text-green-600 dark:text-green-400 text-lg" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
//                     Support Tickets
//                   </span>
//                   <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
//                     Get help and support
//                   </span>
//                 </div>
//               </div>
//               <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0 ml-2">
//                 {
//                   headerState.notifications.filter(
//                     (n) => n.type === "system" && !n.read
//                   ).length
//                 }
//               </span>
//             </button>

//             {/* CTA Button */}
//             <button
//               onClick={() => handleProfileAction("open-messages")}
//               className="w-full flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all shadow-sm hover:shadow-md mt-2"
//             >
//               <MessageOutlined className="mr-2 text-lg" />
//               Open Messages
//             </button>
//           </div>
//         </div>
//       ),
//       disabled: true,
//     },
//   ],
// };

//   // ✅ FIXED: Dropdown props for Ant Design v5
//   const dropdownProps = {
//     trigger: ["click"],
//     placement: "bottomRight",
//   };

//   return (
//     <AntHeader
//       className={`
//       transition-all duration-300 shadow-sm px-4 flex items-center justify-start h-[90px]
//       ${
//         currentTheme === "dark"
//           ? "bg-gray-900 border-b border-gray-700 text-gray-100"
//           : "bg-white border-b border-gray-200 text-gray-900"
//       }
//     `}
//     >
//       {/* Left Section */}
//       <div className="flex items-center gap-4 flex-[1] min-w-0">
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={onToggle}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg"
//         />

//         {!isMobile && (
//           <div className="truncate">
//             <h1 className="text-lg font-semibold">
//               Welcome back, {userData?.firstName}!
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
//               Here's what's happening with your association today.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Center - Search Bar */}
//       {!isMobile && (
//         <div className="flex-[1] max-w-md mx-4">
//           <div className="relative">
//             <AutoComplete
//               options={searchSuggestions.map((suggestion) => ({
//                 value: suggestion,
//                 label: suggestion,
//               }))}
//               onSelect={(value) => {
//                 setSearchValue(value);
//                 handleSearch(value);
//               }}
//               onSearch={handleSearchChange}
//               value={searchValue}
//               className="w-full"
//             >
//               <Input
//                 ref={searchRef}
//                 placeholder="Search messages, users, settings..."
//                 prefix={<SearchOutlined className="text-gray-400" />}
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 onPressEnter={() => handleSearch(searchValue)}
//                 onFocus={() => setIsSearchFocused(true)}
//                 onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
//                 className="rounded-lg"
//                 suffix={loading ? <Spin size="small" /> : null}
//               />
//             </AutoComplete>

//             {isSearchFocused && searchValue && (
//               <div
//                 className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-xl border z-50 ${
//                   currentTheme === "dark"
//                     ? "bg-gray-800 border-gray-700"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <div className="p-3">
//                   <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                     Press Enter to search for "{searchValue}"
//                   </div>
//                   {searchSuggestions.length > 0 && (
//                     <div>
//                       <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
//                         Recent Searches
//                       </div>
//                       {searchSuggestions.map((suggestion, index) => (
//                         <div
//                           key={index}
//                           className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
//                           onClick={() => {
//                             setSearchValue(suggestion);
//                             handleSearch(suggestion);
//                           }}
//                         >
//                           {suggestion}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Right Actions */}
//       <Space
//         size="middle"
//         className="flex items-center justify-center gap-3 flex-[1] min-w-0"
//       >
//         {/* Notifications */}
//         {/* <div className="relative">
//           <Dropdown
//             {...dropdownProps}
//             menu={notificationMenuItems}
//             open={isNotificationOpen}
//             onOpenChange={setIsNotificationOpen}
//              getPopupContainer={(trigger) => trigger.parentElement}
//           >
//             <Badge count={headerState.unreadCount} size="small">
//               <Button
//                 type="text"
//                 icon={<BellOutlined />}
//                 className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//               />
//             </Badge>
//           </Dropdown>
//         </div> */}

//         <Dropdown
//           {...dropdownProps}
//           menu={notificationMenuItems}
//           open={isNotificationOpen}
//           onOpenChange={setIsNotificationOpen}
//           getPopupContainer={(triggerNode) =>
//             triggerNode?.parentElement || document.body
//           }
//           dropdownRender={(menu) => (
//             <motion.div
//               initial={{ opacity: 0, translateY: -8 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               exit={{ opacity: 0, translateY: -6 }}
//               transition={{ duration: 0.12 }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div
//                 className="max-h-[70vh] overflow-y-auto"
//                 onMouseDown={(e) => e.stopPropagation()}
//               >
//                 {menu}
//               </div>
//             </motion.div>
//           )}
//         >
//           <Badge count={headerState.unreadCount} size="small">
//             <Button
//               type="text"
//               icon={<BellOutlined />}
//               className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//               onMouseDown={(e) => e.preventDefault()} // prevents focus scroll
//             />
//           </Badge>
//         </Dropdown>

//         {/* Help */}
//         <Button
//           type="text"
//           icon={<QuestionCircleOutlined />}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//           onClick={() => navigate("/help")}
//         />

//         {/* User Profile */}
//         <div className="relative">
//           <Dropdown
//             {...dropdownProps}
//             menu={userMenuItems}
//             open={isProfileOpen}
//             onOpenChange={setIsProfileOpen}
//             // anchor the popup to the header/button wrapper so it doesn't affect body flow
//             getPopupContainer={(triggerNode) =>
//               triggerNode?.parentElement || document.body
//             }
//             // don't let the popup change layout — make content scrollable internally
//             dropdownRender={(menu) => (
//               <motion.div
//                 initial={{ opacity: 0, translateY: -8 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 exit={{ opacity: 0, translateY: -6 }}
//                 transition={{ duration: 0.14 }}
//                 style={{ borderRadius: 12, overflow: "hidden" }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div
//                   // className={`max-h-[80vh] overflow-y-auto`}
//                   className="dropdown-container max-h-[80vh] overflow-y-auto mt-2.5 border-2 border-gray-400"
//                   // clicking inside should not bubble up and cause layout changes
//                   onMouseDown={(e) => e.stopPropagation()}
//                 >
//                   {menu}
//                 </div>
//               </motion.div>
//             )}
//           >
//             {/* trigger: prevent focus scroll by preventing default on mouseDown */}
//             <div
//               className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
//               onMouseDown={(e) => e.preventDefault()}
//               onClick={(e) => e.stopPropagation()}
//               role="button"
//               tabIndex={-1}
//             >
//               <div className="w-[50px] h-[50px] rounded-full border-2 overflow-hidden flex items-center justify-center bg-gray-100">
//                 <img
//                   src={userData?.profilePhoto || "/default.png"}
//                   alt="Profile"
//                   className="w-full h-full object-cover object-[50%_30%]"
//                 />
//               </div>
//               {!isMobile && (
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-medium">
//                     {userData?.firstName} {userData?.lastName}
//                   </span>
//                   <DownOutlined className="text-xs text-gray-400" />
//                 </div>
//               )}
//             </div>
//           </Dropdown>
//         </div>
//       </Space>
//     </AntHeader>
//   );
// };

// export default Header;





/////////////////  ALL FIXED VERSION//////////////////////////////

// import { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   BellOutlined,
//   QuestionCircleOutlined,
//   SearchOutlined,
//   LogoutOutlined,
//   UserOutlined,
//   MessageOutlined,
//   CustomerServiceOutlined,
//   MailOutlined,
//   EditOutlined,
//   SettingOutlined,
//   DownOutlined,
//   WechatOutlined,
// } from "@ant-design/icons";
// import { MdAirplaneTicket } from "react-icons/md";
// import {
//   Layout,
//   Button,
//   Space,
//   Badge,
//   Dropdown,
//   Avatar,
//   Input,
//   AutoComplete,
//   Spin,
// } from "antd";
// import { clearCurrentUser } from "../slices/userSlice";
// import {
//   setSearchQuery,
//   setNotifications,
//   setUserStats,
//   markAllAsRead,
//   markNotificationAsRead,
// } from "../slices/headerSlice";
// import { motion } from "framer-motion";
// import { chatAPI, searchAPI, notificationAPI, userAPI } from '../../services/apiService';
// import "./Header.css";

// const { Header: AntHeader } = Layout;

// const Header = ({ onToggle, isMobile }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchRef = useRef(null);

//   // Redux state
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const { currentTheme } = useSelector((state) => state.theme);
//   const userData = useSelector((state) => state.user.value);
//   const headerState = useSelector((state) => state.header);

//   // Local state
//   const [searchValue, setSearchValue] = useState("");
//   const [searchSuggestions, setSearchSuggestions] = useState([]);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch initial data
//   useEffect(() => {
//     fetchNotifications();
//     fetchUserStats();
//   }, []);

//   // Helper function to format time
//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);
    
//     if (diffInSeconds < 60) return 'Just now';
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour ago`;
//     return `${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   // Fetch notifications from API
//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const response = await notificationAPI.getNotifications({ limit: 50 });
      
//       if (response.data.success) {
//         const notifications = response.data.data.map(notification => ({
//           id: notification._id,
//           message: notification.message,
//           time: formatTimeAgo(notification.createdAt),
//           read: notification.read,
//           type: notification.type
//         }));
        
//         dispatch(setNotifications(notifications));
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch notifications');
//       }
//     } catch (error) {
//       console.error('Failed to fetch notifications:', error);
//       // Fallback to mock data
//       const mockNotifications = [
//         {
//           id: 1,
//           message: "New message from John Doe",
//           time: "2 min ago",
//           read: false,
//           type: "message",
//         },
//         {
//           id: 2,
//           message: "Payment received successfully",
//           time: "1 hour ago",
//           read: false,
//           type: "payment",
//         },
//       ];
//       dispatch(setNotifications(mockNotifications));
//     } finally {
//       setLoading(false);
//     }
//   };

// // In your Header.jsx - Add request cancellation
// const fetchUserStats = async () => {
//   const abortController = new AbortController();
//   const timeoutId = setTimeout(() => {
//     abortController.abort();
//     console.log('⏰ Client-side request timeout');
//   }, 8000); // 8 second timeout

//   try {
//     setLoading(true);
    
//     const response = await userAPI.getUserStats({
//       signal: abortController.signal
//     });

//     clearTimeout(timeoutId);

//     if (response.data.success) {
//       dispatch(
//         setUserStats({
//           bugsFixed: response.data.data.bugsFixed || "0",
//           performance: response.data.data.performance || "100%",
//           activity: response.data.data.activity || "Medium",
//           profileComplete: response.data.data.profileComplete,
//           accountAge: response.data.data.accountAge,
//           loginStreak: response.data.data.loginStreak,
//         })
//       );
//     }
//   } catch (error) {
//     clearTimeout(timeoutId);
    
//     // Don't show errors for aborted requests
//     if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
//       console.log('Request was aborted normally');
//       return;
//     }
    
//     if (error.response?.status === 408) {
//       console.log('Request timeout from server');
//       return;
//     }
    
//     console.error("Failed to fetch user stats:", error);
//     // Use basic fallback
//     dispatch(
//       setUserStats({
//         bugsFixed: "0",
//         performance: "100%",
//         activity: "Medium",
//         profileComplete: 0,
//         accountAge: 0,
//         loginStreak: 0,
//       })
//     );
//   } finally {
//     setLoading(false);
//   }
// };
//   // Handle search with API integration
//   const handleSearch = async (value) => {
//     if (!value.trim()) return;

//     setLoading(true);
//     try {
//       const response = await searchAPI.globalSearch(value);
      
//       if (response.data.success) {
//         dispatch(setSearchQuery(value));
//         antMessage.success(`Found ${response.data.totalResults} results`);
//       } else {
//         antMessage.error(response.data.message || "Search failed");
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//       antMessage.error("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get search suggestions
//   const handleSearchChange = async (value) => {
//     setSearchValue(value);

//     if (value.length < 2) {
//       setSearchSuggestions([]);
//       return;
//     }

//     try {
//       const response = await searchAPI.getSuggestions(value);
      
//       if (response.data.success) {
//         setSearchSuggestions(response.data.data.recentSearches || []);
//       }
//     } catch (error) {
//       console.error("Failed to get suggestions:", error);
//       setSearchSuggestions([]);
//     }
//   };

//   // Handle chat navigation
//   const handleChatNavigation = async () => {
//     try {
//       setLoading(true);
      
//       // First, try to get user's existing chats
//       const response = await chatAPI.getUserChats({ limit: 1 });
      
//       if (response.data.success && response.data.data.length > 0) {
//         // If user has existing chats, navigate to the most recent one
//         const recentChat = response.data.data[0];
//         navigate(`/chat/${recentChat._id}`);
//       } else {
//         // If no existing chats, navigate to general chat page
//         navigate('/chat');
//       }
      
//     } catch (error) {
//       console.error('Chat navigation error:', error);
//       // Even if API fails, still navigate to chat page
//       navigate('/chat');
//     } finally {
//       setLoading(false);
//       setIsProfileOpen(false);
//     }
//   };

//   // Handle profile actions
//   const handleProfileAction = (action) => {
//     switch (action) {
//       case "profile":
//         navigate("/settings/profile");
//         break;
//       case "settings":
//         navigate("/settings/general");
//         break;
//       case "chat":
//       case "message-inbox":
//       case "open-messages":
//         handleChatNavigation();
//         break;
//       case "recover-password":
//         navigate("/forgot-password");
//         break;
//       case "my-account":
//         navigate("/settings/profile");
//         break;
//       case "support-tickets":
//         antMessage.info("Support tickets feature coming soon");
//         break;
//       case "edit-profile":
//         navigate("/settings/profile");
//         break;
//       case "logout":
//         handleLogout();
//         break;
//       default:
//         break;
//     }
//     setIsProfileOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(clearCurrentUser());
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//     antMessage.success("Logged out successfully");
//   };

//   // Handle notification actions
//   const handleMarkAllAsRead = () => {
//     dispatch(markAllAsRead());
//     setIsNotificationOpen(false);
//     antMessage.success("All notifications marked as read");
//   };

//   const handleNotificationClick = (notificationId) => {
//     dispatch(markNotificationAsRead(notificationId));
//     const notification = headerState.notifications.find(
//       (n) => n.id === notificationId
//     );
//     if (notification) {
//       switch (notification.type) {
//         case "message":
//           handleChatNavigation();
//           break;
//         case "payment":
//           navigate("/paymentshistory");
//           break;
//         case "event":
//           navigate("/events");
//           break;
//         default:
//           break;
//       }
//     }
//     setIsNotificationOpen(false);
//   };

//   // Notifications Dropdown Menu Items
//   const notificationMenuItems = {
//     items: [
//       {
//         key: "notifications-header",
//         label: (
//           <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold text-gray-900 dark:text-white">
//                 Notifications
//               </h4>
//               <Button
//                 type="link"
//                 size="small"
//                 onClick={handleMarkAllAsRead}
//                 className="text-blue-600 dark:text-blue-400"
//               >
//                 Mark all as read
//               </Button>
//             </div>
//           </div>
//         ),
//         disabled: true,
//       },
//       {
//         key: "notifications-list",
//         label: (
//           <div className="max-h-96 overflow-y-auto">
//             {headerState.notifications.length > 0 ? (
//               headerState.notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   onClick={() => handleNotificationClick(notification.id)}
//                   className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
//                     notification.read
//                       ? "bg-white dark:bg-gray-800"
//                       : "bg-blue-50 dark:bg-blue-900/20"
//                   } hover:bg-gray-50 dark:hover:bg-gray-700`}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <div
//                       className={`w-2 h-2 mt-2 rounded-full ${
//                         notification.read ? "bg-gray-300" : "bg-blue-500"
//                       }`}
//                     ></div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm text-gray-900 dark:text-white">
//                         {notification.message}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         {notification.time}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-8 text-center">
//                 <BellOutlined className="text-4xl text-gray-300 dark:text-gray-600 mb-2" />
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No notifications
//                 </p>
//               </div>
//             )}
//           </div>
//         ),
//         disabled: true,
//       },
//       {
//         key: "notifications-footer",
//         label: (
//           <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//             <button
//               onClick={() => navigate("/notifications")}
//               className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//             >
//               View All Notifications
//             </button>
//           </div>
//         ),
//         disabled: true,
//       },
//     ],
//   };

//   // User Profile Dropdown Menu Items
//   const userMenuItems = {
//     items: [
//       {
//         key: "profile-header",
//         label: (
//           <div
//             className="relative text-white w-full"
//             style={{
//               backgroundImage: `linear-gradient(to right, rgba(37,99,235,0.85), rgba(147,51,234,0.85)), url('/images/city3.jpg')`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             <div className="p-6 flex items-center justify-between">
//               {/* Avatar + Info */}
//               <div className="flex items-center gap-4 flex-1 min-w-0">
//                 <Avatar
//                   size={56}
//                   src={userData?.profilePhoto}
//                   icon={<UserOutlined />}
//                   className="border-4 border-white/40 shadow-md flex-shrink-0"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-lg font-semibold truncate text-white">
//                     {userData?.firstName} {userData?.lastName}
//                   </h3>
//                   <p className="text-blue-100 text-sm font-medium truncate">
//                     {userData?.role} / Finance Secretary
//                   </p>
//                   <p className="text-blue-100/90 text-xs mt-1 opacity-80 truncate">
//                     Empowering financial transparency
//                   </p>
//                 </div>
//               </div>

//               {/* Logout */}
//               <Button
//                 type="text"
//                 icon={<LogoutOutlined />}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleProfileAction("logout");
//                 }}
//                 className="text-white hover:bg-white/20 p-2 rounded-lg transition flex-shrink-0 ml-2"
//                 title="Logout"
//               />
//             </div>
//           </div>
//         ),
//         disabled: true,
//       },
//       {
//         key: "activity-section",
//         label: (
//           <div className="p-6 border-b border-gray-100 dark:border-gray-700">
//             <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
//               Recent Activity
//             </h4>
//             <div className="space-y-3">
//               {[
//                 {
//                   icon: <WechatOutlined className="text-blue-600 text-lg" />,
//                   label: "Chat",
//                   action: "chat",
//                   description: "Connect with your team",
//                 },
//                 {
//                   icon: <CustomerServiceOutlined className="text-green-600 text-lg" />,
//                   label: "Recover Password",
//                   action: "recover-password",
//                   description: "Reset your credentials",
//                 },
//                 {
//                   icon: <UserOutlined className="text-purple-600 text-lg" />,
//                   label: "My Account",
//                   action: "my-account",
//                   description: "Update profile info",
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   onClick={() => handleProfileAction(item.action)}
//                   className="flex items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
//                 >
//                   <div className="flex items-center gap-4 flex-1">
//                     <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
//                       {item.icon}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
//                         {item.label}
//                       </span>
//                       <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
//                         {item.description}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ),
//         disabled: true,
//       },
//       {
//         key: "messages-section",
//         label: (
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Messages & Support
//               </h4>
//               <button
//                 onClick={() => handleProfileAction("message-inbox")}
//                 className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
//               >
//                 View All
//               </button>
//             </div>

//             <div className="space-y-3">
//               <button
//                 onClick={() => handleProfileAction("message-inbox")}
//                 className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all bg-white dark:bg-gray-800 hover:shadow-sm"
//               >
//                 <div className="flex items-center gap-4 flex-1 min-w-0">
//                   <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
//                     <MailOutlined className="text-blue-600 dark:text-blue-400 text-lg" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
//                       Message Inbox
//                     </span>
//                     <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
//                       Check your messages
//                     </span>
//                   </div>
//                 </div>
//                 <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0 ml-2">
//                   {
//                     headerState.notifications.filter(
//                       (n) => n.type === "message" && !n.read
//                     ).length
//                   }
//                 </span>
//               </button>

//               <button
//                 onClick={() => handleProfileAction("support-tickets")}
//                 className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 transition-all bg-white dark:bg-gray-800 hover:shadow-sm"
//               >
//                 <div className="flex items-center gap-4 flex-1 min-w-0">
//                   <div className="w-10 h-10 flex items-center justify-center bg-green-50 dark:bg-green-900/30 rounded-lg flex-shrink-0">
//                     <MdAirplaneTicket className="text-green-600 dark:text-green-400 text-lg" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
//                       Support Tickets
//                     </span>
//                     <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
//                       Get help and support
//                     </span>
//                   </div>
//                 </div>
//                 <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0 ml-2">
//                   {
//                     headerState.notifications.filter(
//                       (n) => n.type === "system" && !n.read
//                     ).length
//                   }
//                 </span>
//               </button>

//               <button
//                 onClick={() => handleProfileAction("open-messages")}
//                 className="w-full flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all shadow-sm hover:shadow-md mt-2"
//               >
//                 <MessageOutlined className="mr-2 text-lg" />
//                 Open Messages
//               </button>
//             </div>
//           </div>
//         ),
//         disabled: true,
//       },
//     ],
//   };

//   // Dropdown props for Ant Design v5
//   const dropdownProps = {
//     trigger: ["click"],
//     placement: "bottomRight",
//   };

//   return (
//     <AntHeader
//       className={`
//       transition-all duration-300 shadow-sm px-4 flex items-center justify-start h-[90px]
//       ${
//         currentTheme === "dark"
//           ? "bg-gray-900 border-b border-gray-700 text-gray-100"
//           : "bg-white border-b border-gray-200 text-gray-900"
//       }
//     `}
//     >
//       {/* Left Section */}
//       <div className="flex items-center gap-4 flex-[1] min-w-0">
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={onToggle}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg"
//         />

//         {!isMobile && (
//           <div className="truncate">
//             <h1 className="text-lg font-semibold">
//               Welcome back, {userData?.firstName}!
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
//               Here's what's happening with your association today.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Center - Search Bar */}
//       {!isMobile && (
//         <div className="flex-[1] max-w-md mx-4">
//           <div className="relative">
//             <AutoComplete
//               options={searchSuggestions.map((suggestion) => ({
//                 value: suggestion,
//                 label: suggestion,
//               }))}
//               onSelect={(value) => {
//                 setSearchValue(value);
//                 handleSearch(value);
//               }}
//               onSearch={handleSearchChange}
//               value={searchValue}
//               className="w-full"
//             >
//               <Input
//                 ref={searchRef}
//                 placeholder="Search messages, users, settings..."
//                 prefix={<SearchOutlined className="text-gray-400" />}
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 onPressEnter={() => handleSearch(searchValue)}
//                 onFocus={() => setIsSearchFocused(true)}
//                 onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
//                 className="rounded-lg"
//                 suffix={loading ? <Spin size="small" /> : null}
//               />
//             </AutoComplete>

//             {isSearchFocused && searchValue && (
//               <div
//                 className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-xl border z-50 ${
//                   currentTheme === "dark"
//                     ? "bg-gray-800 border-gray-700"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <div className="p-3">
//                   <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                     Press Enter to search for "{searchValue}"
//                   </div>
//                   {searchSuggestions.length > 0 && (
//                     <div>
//                       <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
//                         Recent Searches
//                       </div>
//                       {searchSuggestions.map((suggestion, index) => (
//                         <div
//                           key={index}
//                           className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
//                           onClick={() => {
//                             setSearchValue(suggestion);
//                             handleSearch(suggestion);
//                           }}
//                         >
//                           {suggestion}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Right Actions */}
//       <Space
//         size="middle"
//         className="flex items-center justify-center gap-3 flex-[1] min-w-0"
//       >
//         {/* Notifications */}
//         <Dropdown
//           {...dropdownProps}
//           menu={notificationMenuItems}
//           open={isNotificationOpen}
//           onOpenChange={setIsNotificationOpen}
//           getPopupContainer={(triggerNode) =>
//             triggerNode?.parentElement || document.body
//           }
//           dropdownRender={(menu) => (
//             <motion.div
//               initial={{ opacity: 0, translateY: -8 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               exit={{ opacity: 0, translateY: -6 }}
//               transition={{ duration: 0.12 }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div
//                 className="max-h-[70vh] overflow-y-auto"
//                 onMouseDown={(e) => e.stopPropagation()}
//               >
//                 {menu}
//               </div>
//             </motion.div>
//           )}
//         >
//           <Badge count={headerState.unreadCount} size="small">
//             <Button
//               type="text"
//               icon={<BellOutlined />}
//               className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//               onMouseDown={(e) => e.preventDefault()}
//             />
//           </Badge>
//         </Dropdown>

//         {/* Help */}
//         <Button
//           type="text"
//           icon={<QuestionCircleOutlined />}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//           onClick={() => navigate("/help")}
//         />

//         {/* User Profile */}
//         <div className="relative">
//           <Dropdown
//             {...dropdownProps}
//             menu={userMenuItems}
//             open={isProfileOpen}
//             onOpenChange={setIsProfileOpen}
//             getPopupContainer={(triggerNode) =>
//               triggerNode?.parentElement || document.body
//             }
//             dropdownRender={(menu) => (
//               <motion.div
//                 initial={{ opacity: 0, translateY: -8 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 exit={{ opacity: 0, translateY: -6 }}
//                 transition={{ duration: 0.14 }}
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div
//                   className="max-h-[80vh] overflow-y-auto"
//                   onMouseDown={(e) => e.stopPropagation()}
//                 >
//                   {menu}
//                 </div>
//               </motion.div>
//             )}
//           >
//             <div
//               className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
//               onMouseDown={(e) => e.preventDefault()}
//               onClick={(e) => e.stopPropagation()}
//               role="button"
//               tabIndex={-1}
//             >
//               <div className="w-[50px] h-[50px] rounded-full border-2 overflow-hidden flex items-center justify-center bg-gray-100">
//                 <img
//                   src={userData?.profilePhoto || "/default.png"}
//                   alt="Profile"
//                   className="w-full h-full object-cover object-[50%_30%]"
//                 />
//               </div>
//               {!isMobile && (
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-medium">
//                     {userData?.firstName} {userData?.lastName}
//                   </span>
//                   <DownOutlined className="text-xs text-gray-400" />
//                 </div>
//               )}
//             </div>
//           </Dropdown>
//         </div>
//       </Space>
//     </AntHeader>
//   );
// };

// export default Header;

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  LogoutOutlined,
  UserOutlined,
  MessageOutlined,
  CustomerServiceOutlined,
  EditOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Button,
  Space,
  Badge,
  Dropdown,
  Avatar,
  Input,
  AutoComplete,
  Spin,
  message as antMessage,
} from "antd";
import { clearCurrentUser } from "../slices/userSlice";
import {
  setSearchQuery,
  setNotifications,
  setUserStats,
  markAllAsRead,
  markNotificationAsRead,
} from "../slices/headerSlice";
import { motion } from "framer-motion";
import { apiService } from '../../services/apiService';
import "./Header.css";

const { Header: AntHeader } = Layout;

const Header = ({ onToggle, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Redux state
  const { collapsed } = useSelector((state) => state.sidebar);
  const { currentTheme } = useSelector((state) => state.theme);
  const userData = useSelector((state) => state.user.value);
  const headerState = useSelector((state) => state.header);

  // Local state
  const [searchValue, setSearchValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Common dropdown props
  const dropdownProps = {
    trigger: ['click'],
    placement: "bottomRight",
  };

  // Fetch initial data - RUNS ONLY ONCE
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch notifications
        const notificationsResponse = await apiService.notification.getNotifications({ limit: 50 });
        if (notificationsResponse.data.success) {
          const notifications = notificationsResponse.data.data.map(notification => ({
            id: notification._id,
            message: notification.message,
            time: formatTimeAgo(notification.createdAt),
            read: notification.read,
            type: notification.type
          }));
          dispatch(setNotifications(notifications));
        }

        // Fetch user stats
        const userStatsResponse = await apiService.user.getUserStats();
        if (userStatsResponse.data.success) {
          dispatch(setUserStats({
            bugsFixed: userStatsResponse.data.data.bugsFixed || "0",
            performance: userStatsResponse.data.data.performance || "100%",
            activity: userStatsResponse.data.data.activity || "Medium",
          }));
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        // Set fallback data
        dispatch(setNotifications([
          {
            id: 1,
            message: "Welcome to the platform!",
            time: "Just now",
            read: false,
            type: "system"
          }
        ]));
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [dispatch]); // Only depends on dispatch

  // Helper function to format time
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Handle search
  const handleSearch = async (value) => {
    if (!value.trim()) return;

    setLoading(true);
    try {
      const response = await apiService.search.globalSearch(value);
      if (response.data.success) {
        dispatch(setSearchQuery(value));
        antMessage.success(`Found ${response.data.totalResults} results`);
      }
    } catch (error) {
      antMessage.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Get search suggestions
  const handleSearchChange = async (value) => {
    setSearchValue(value);
    if (value.length < 2) {
      setSearchSuggestions([]);
      return;
    }

    try {
      const response = await apiService.search.getSuggestions(value);
      if (response.data.success) {
        setSearchSuggestions(response.data.data.recentSearches || []);
      }
    } catch (error) {
      setSearchSuggestions([]);
    }
  };

  // Handle chat navigation
  const handleChatNavigation = async () => {
    try {
      setLoading(true);
      const response = await apiService.chat.getUserChats({ limit: 1 });
      if (response.data.success && response.data.data.length > 0) {
        navigate(`/chat/${response.data.data[0]._id}`);
      } else {
        navigate('/chat');
      }
    } catch (error) {
      navigate('/chat');
    } finally {
      setLoading(false);
      setIsProfileOpen(false);
    }
  };

  // Handle profile actions
  const handleProfileAction = (action) => {
    switch (action) {
      case "profile":
      case "edit-profile":
      case "my-account":
        navigate("/settings/profile");
        break;
      case "settings":
        navigate("/settings/general");
        break;
      case "chat":
      case "messages":
        handleChatNavigation();
        break;
      case "support-tickets":
        antMessage.info("Support tickets feature coming soon");
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearCurrentUser());
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
    antMessage.success("Logged out successfully");
  };

  // Handle notification actions
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
    setIsNotificationOpen(false);
    antMessage.success("All notifications marked as read");
  };

  const handleNotificationClick = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
    setIsNotificationOpen(false);
  };

  // Menu items definitions
  const notificationMenuItems = {
    items: [
      {
        key: 'header',
        label: (
          <div className="flex justify-between items-center p-2">
            <span className="font-semibold">Notifications</span>
            <Button 
              type="link" 
              size="small" 
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          </div>
        ),
        disabled: true,
      },
      {
        type: 'divider',
      },
      ...(headerState.notifications.length > 0 ? headerState.notifications.map(notification => ({
        key: notification.id,
        label: (
          <div 
            className={`p-2 rounded-lg transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium flex-1">{notification.message}</span>
              <Badge dot={!notification.read} />
            </div>
            <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
          </div>
        ),
      })) : [{
        key: 'no-notifications',
        label: (
          <div className="text-center py-4 text-gray-500">
            <BellOutlined className="text-2xl mb-2" />
            <div>No notifications</div>
          </div>
        ),
        disabled: true,
      }]),
    ],
  };

  const userMenuItems = {
    items: [
      {
        key: 'user-info',
        label: (
          <div className="p-3 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <Avatar 
                size={48} 
                src={userData?.profilePhoto} 
                icon={<UserOutlined />}
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">
                  {userData?.firstName} {userData?.lastName}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {userData?.email}
                </div>
              </div>
            </div>
          </div>
        ),
        disabled: true,
      },
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'My Profile',
        onClick: () => handleProfileAction('profile'),
      },
      {
        key: 'edit-profile',
        icon: <EditOutlined />,
        label: 'Edit Profile',
        onClick: () => handleProfileAction('edit-profile'),
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Settings',
        onClick: () => handleProfileAction('settings'),
      },
      {
        type: 'divider',
      },
      {
        key: 'messages',
        icon: <MessageOutlined />,
        label: 'Messages',
        onClick: () => handleProfileAction('messages'),
      },
      {
        key: 'support-tickets',
        icon: <CustomerServiceOutlined />,
        label: 'Support Tickets',
        onClick: () => handleProfileAction('support-tickets'),
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        danger: true,
        onClick: () => handleProfileAction('logout'),
      },
    ],
  };

  return (
    <AntHeader
      className={`
      transition-all duration-300 shadow-sm px-4 flex items-center justify-start h-[90px]
      ${
        currentTheme === "dark"
          ? "bg-gray-900 border-b border-gray-700 text-gray-100"
          : "bg-white border-b border-gray-200 text-gray-900"
      }
    `}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-[1] min-w-0">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg"
        />

        {!isMobile && (
          <div className="truncate">
            <h1 className="text-lg font-semibold">
              Welcome back, {userData?.firstName}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
              Here's what's happening with your association today.
            </p>
          </div>
        )}
      </div>

      {/* Center - Search Bar */}
      {!isMobile && (
        <div className="flex-[1] max-w-md mx-4">
          <div className="relative">
            <AutoComplete
              options={searchSuggestions.map((suggestion) => ({
                value: suggestion,
                label: suggestion,
              }))}
              onSelect={(value) => {
                setSearchValue(value);
                handleSearch(value);
              }}
              onSearch={handleSearchChange}
              value={searchValue}
              className="w-full"
            >
              <Input
                ref={searchRef}
                placeholder="Search messages, users, settings..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onPressEnter={() => handleSearch(searchValue)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="rounded-lg"
                suffix={loading ? <Spin size="small" /> : null}
              />
            </AutoComplete>
          </div>
        </div>
      )}

      {/* Right Actions */}
      <Space
        size="middle"
        className="flex items-center justify-center gap-3 flex-[1] min-w-0"
      >
        {/* Notifications */}
        <Dropdown
          {...dropdownProps}
          menu={notificationMenuItems}
          open={isNotificationOpen}
          onOpenChange={setIsNotificationOpen}
        >
          <Badge count={headerState.unreadCount} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            />
          </Badge>
        </Dropdown>

        {/* Help */}
        <Button
          type="text"
          icon={<QuestionCircleOutlined />}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          onClick={() => navigate("/help")}
        />

        {/* User Profile */}
        <Dropdown
          {...dropdownProps}
          menu={userMenuItems}
          open={isProfileOpen}
          onOpenChange={setIsProfileOpen}
        >
          <div
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          >
            <Avatar 
              size={40}
              src={userData?.profilePhoto} 
              icon={<UserOutlined />}
            />
            {!isMobile && (
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">
                  {userData?.firstName} {userData?.lastName}
                </span>
                <DownOutlined className="text-xs text-gray-400" />
              </div>
            )}
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;


