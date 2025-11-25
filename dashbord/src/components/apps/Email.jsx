


///////////////////FINAL////////////////////////////////////

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Card,
//   List,
//   Button,
//   Input,
//   Space,
//   Tag,
//   Avatar,
//   Typography,
//   Divider,
//   Modal,
//   Form,
//   Select,
//   message,
//   Row,
//   Col,
//   Badge,
//   Tooltip,
//   Checkbox,
//   Spin,
//   Empty,
//   Popover,
//   Dropdown,
//   Menu,
//   Statistic,
//   Tabs
// } from 'antd';
// import {
//   MailOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   UserOutlined,
//   StarOutlined,
//   StarFilled,
//   ReloadOutlined,
//   EyeOutlined,
//   SendOutlined,
//   SaveOutlined,
//   ExperimentOutlined,
//   DeleteOutlined,
//   FilterOutlined,
//   MoreOutlined,
//   ExportOutlined,
//   InfoCircleOutlined,
//   TeamOutlined,
//   CheckCircleOutlined,
//   ExclamationCircleOutlined
// } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchEmails,
//   sendEmail,
//   deleteEmail,
//   bulkDeleteEmails,
//   fetchEmailStats,
//   fetchEmailUsers,
//   testEmailSystem,
//   setFilters,
//   toggleEmailSelection,
//   selectAllEmails,
//   clearSelection,
//   clearError,
//   clearSuccess,
//   // Selectors
//   selectEmails,
//   selectEmailUsers,
//   selectedEmails,
//   selectEmailStats,
//   selectEmailFilters,
//   selectEmailLoading,
//   selectEmailSending,
//   selectEmailDeleting,
//   selectEmailTesting,
//   selectEmailError,
//   selectEmailSuccess
// } from '../slices/emailSlice';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);

// const { Title, Text, Paragraph } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;
// const { TabPane } = Tabs;

// const Email = () => {
//   const dispatch = useDispatch();
//   const [messageApi, contextHolder] = message.useMessage();
  
//   // All state from Redux - NO local state for data
//   const emails = useSelector(selectEmails);
//   const emailUsers = useSelector(selectEmailUsers);
//   const selectedEmailsList = useSelector(selectedEmails);
//   const stats = useSelector(selectEmailStats);
//   const filters = useSelector(selectEmailFilters);
//   const loading = useSelector(selectEmailLoading);
//   const sending = useSelector(selectEmailSending);
//   const deleting = useSelector(selectEmailDeleting);
//   const testing = useSelector(selectEmailTesting);
//   const error = useSelector(selectEmailError);
//   const success = useSelector(selectEmailSuccess);

//   // Only UI state locally
//   const [composeVisible, setComposeVisible] = useState(false);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [activeTab, setActiveTab] = useState('inbox');
//   const [selectedRecipients, setSelectedRecipients] = useState([]);
//   const [userSearchText, setUserSearchText] = useState('');
//   const [userRoleFilter, setUserRoleFilter] = useState('');
//   const [filtersVisible, setFiltersVisible] = useState(false);

//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const currentUser = JSON.parse(localStorage.getItem('user'));
//   const [form] = Form.useForm();
//   const searchTimeoutRef = useRef(null);

//   // Effects - Dispatch Redux actions only
//   useEffect(() => {
//     dispatch(fetchEmails({ 
//       folder: activeTab, 
//       search: filters.search,
//       priority: filters.priority,
//       status: filters.status,
//       dateRange: filters.dateRange
//     }));
//     dispatch(fetchEmailStats());
//   }, [dispatch, activeTab, filters]);

//   useEffect(() => {
//     if (composeVisible) {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//       searchTimeoutRef.current = setTimeout(() => {
//         dispatch(fetchEmailUsers({ 
//           search: userSearchText, 
//           role: userRoleFilter 
//         }));
//       }, 500);
//     }
//   }, [dispatch, userSearchText, userRoleFilter, composeVisible]);

//   // Handle messages
//   useEffect(() => {
//     if (error) {
//       messageApi.error(error);
//       setTimeout(() => dispatch(clearError()), 3000);
//     }
//   }, [error, dispatch, messageApi]);

//   useEffect(() => {
//     if (success) {
//       messageApi.success(success);
//       setTimeout(() => dispatch(clearSuccess()), 3000);
//     }
//   }, [success, dispatch, messageApi]);

//   // Handlers - Dispatch Redux actions only
//   const handleSendEmail = async (values) => {
//     if (selectedRecipients.length === 0 && !values.saveAsDraft) {
//       messageApi.error('Please select at least one recipient');
//       return;
//     }

//     const emailData = {
//       ...values,
//       recipientIds: selectedRecipients,
//       isDraft: values.saveAsDraft || false
//     };
    
//     const result = await dispatch(sendEmail(emailData));
    
//     if (result.type.endsWith('/fulfilled')) {
//       setComposeVisible(false);
//       form.resetFields();
//       setSelectedRecipients([]);
//       setUserSearchText('');
//       setUserRoleFilter('');
//     }
//   };

//   const handleDeleteEmail = async (emailId, emailSubject = 'this email') => {
//     Modal.confirm({
//       title: 'Delete Email',
//       content: `Are you sure you want to delete "${emailSubject}"?`,
//       okText: 'Delete',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         const result = await dispatch(deleteEmail(emailId));
//         if (result.type.endsWith('/fulfilled')) {
//           setSelectedEmail(null);
//         }
//       }
//     });
//   };

//   const handleBulkDelete = async () => {
//     if (selectedEmailsList.length === 0) {
//       messageApi.warning('Please select emails to delete');
//       return;
//     }

//     Modal.confirm({
//       title: 'Confirm Bulk Delete',
//       content: `Are you sure you want to delete ${selectedEmailsList.length} selected email(s)?`,
//       okText: 'Yes, Delete',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         await dispatch(bulkDeleteEmails(selectedEmailsList));
//       }
//     });
//   };

//   const handleTestEmail = async () => {
//     const testData = {
//       subject: 'Email System Test - Association Communication',
//       message: `This is a test message to verify that the email system is working properly.\n\nTimestamp: ${new Date().toLocaleString()}\nUser: ${currentUser?.firstName} ${currentUser?.lastName}\nRole: ${currentUser?.role}`,
//       priority: 'medium',
//       category: 'system'
//     };
    
//     await dispatch(testEmailSystem(testData));
//   };

//   const handleSearch = (searchText) => {
//     dispatch(setFilters({ search: searchText }));
//   };

//   const handleEmailSelect = (emailId) => {
//     dispatch(toggleEmailSelection(emailId));
//   };

//   const handleSelectAll = (checked) => {
//     if (checked) {
//       dispatch(selectAllEmails());
//     } else {
//       dispatch(clearSelection());
//     }
//   };

//   const handleComposeOpen = () => {
//     setComposeVisible(true);
//     setSelectedRecipients([]);
//     setUserSearchText('');
//     setUserRoleFilter('');
//     dispatch(fetchEmailUsers({}));
//   };

//   const handleRecipientSelect = (userId) => {
//     if (!selectedRecipients.includes(userId)) {
//       setSelectedRecipients(prev => [...prev, userId]);
//     }
//   };

//   const handleRecipientRemove = (userId) => {
//     setSelectedRecipients(prev => prev.filter(id => id !== userId));
//   };

//   // UI Helpers
//   const getPriorityTag = (priority) => {
//     const config = {
//       high: { color: 'red', text: 'High', icon: <ExclamationCircleOutlined /> },
//       medium: { color: 'orange', text: 'Medium', icon: <InfoCircleOutlined /> },
//       low: { color: 'blue', text: 'Low', icon: <InfoCircleOutlined /> },
//     }[priority] || { color: 'default', text: priority, icon: null };
    
//     return (
//       <Tag color={config.color} icon={config.icon}>
//         {config.text}
//       </Tag>
//     );
//   };

//   const getStatusTag = (email) => {
//     if (!email.status || email.status === 'draft') return null;
    
//     const config = {
//       sent: { color: 'green', text: 'Sent', icon: <CheckCircleOutlined /> },
//       failed: { color: 'red', text: 'Failed', icon: <ExclamationCircleOutlined /> },
//       pending: { color: 'blue', text: 'Pending', icon: <InfoCircleOutlined /> }
//     }[email.status] || { color: 'default', text: email.status, icon: null };
    
//     return (
//       <Tag color={config.color} icon={config.icon} size="small">
//         {config.text}
//       </Tag>
//     );
//   };

//   // UI Components
//   const BulkActionsMenu = () => (
//     <Menu
//       items={[
//         {
//           key: 'delete',
//           icon: <DeleteOutlined />,
//           label: 'Delete Selected',
//           onClick: handleBulkDelete,
//           disabled: selectedEmailsList.length === 0,
//           danger: true
//         }
//       ]}
//     />
//   );

//   const EmailFilters = () => (
//     <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div>
//           <Text strong className="text-sm">Priority</Text>
//           <Select
//             value={filters.priority}
//             onChange={(value) => dispatch(setFilters({ priority: value }))}
//             style={{ width: '100%' }}
//             placeholder="All priorities"
//             allowClear
//           >
//             <Option value="high">High Priority</Option>
//             <Option value="medium">Medium Priority</Option>
//             <Option value="low">Low Priority</Option>
//           </Select>
//         </div>
        
//         <div>
//           <Text strong className="text-sm">Status</Text>
//           <Select
//             value={filters.status}
//             onChange={(value) => dispatch(setFilters({ status: value }))}
//             style={{ width: '100%' }}
//             placeholder="All statuses"
//             allowClear
//           >
//             <Option value="sent">Sent</Option>
//             <Option value="draft">Draft</Option>
//             <Option value="failed">Failed</Option>
//           </Select>
//         </div>
        
//         <div>
//           <Text strong className="text-sm">Date Range</Text>
//           <Select
//             value={filters.dateRange}
//             onChange={(value) => dispatch(setFilters({ dateRange: value }))}
//             style={{ width: '100%' }}
//             placeholder="All time"
//             allowClear
//           >
//             <Option value="today">Today</Option>
//             <Option value="week">This Week</Option>
//             <Option value="month">This Month</Option>
//           </Select>
//         </div>
        
//         <div className="flex items-end">
//           <Button 
//             onClick={() => dispatch(setFilters({ priority: '', status: '', dateRange: '' }))}
//             disabled={!filters.priority && !filters.status && !filters.dateRange}
//           >
//             Clear Filters
//           </Button>
//         </div>
//       </div>
//     </div>
//   );

//   const StatisticsOverview = () => (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//       <Card size="small" className="text-center">
//         <Statistic 
//           title="Total Communications" 
//           value={stats.totalSent || 0} 
//           prefix={<MailOutlined />} 
//         />
//       </Card>
//       <Card size="small" className="text-center">
//         <Statistic 
//           title="Successful Deliveries" 
//           value={stats.delivered || 0} 
//           prefix={<CheckCircleOutlined />} 
//         />
//       </Card>
//       <Card size="small" className="text-center">
//         <Statistic 
//           title="Failed Deliveries" 
//           value={stats.failed || 0} 
//           prefix={<ExclamationCircleOutlined />} 
//         />
//       </Card>
//       <Card size="small" className="text-center">
//         <Statistic 
//           title="Open Rate" 
//           value={stats.openRate || 0} 
//           suffix="%" 
//         />
//       </Card>
//     </div>
//   );

//   const UserSelectionContent = () => (
//     <div style={{ width: 500 }}>
//       <div className="p-3 border-b space-y-3">
//         <Input
//           placeholder="Search users by name, email, or membership ID..."
//           value={userSearchText}
//           onChange={(e) => setUserSearchText(e.target.value)}
//           allowClear
//         />
        
//         <Select
//           placeholder="Filter by role"
//           value={userRoleFilter}
//           onChange={setUserRoleFilter}
//           style={{ width: '100%' }}
//           allowClear
//         >
//           <Option value="Member">Member</Option>
//           <Option value="Admin">Admin</Option>
//           <Option value="HR">HR</Option>
//           <Option value="Employee">Employee</Option>
//         </Select>
//       </div>
      
//       <div style={{ maxHeight: 300, overflowY: 'auto' }}>
//         {emailUsers.map(user => (
//           <div
//             key={user._id}
//             className={`p-3 border-b cursor-pointer transition-colors ${
//               selectedRecipients.includes(user._id) 
//                 ? 'bg-blue-50 dark:bg-blue-900/20' 
//                 : 'hover:bg-gray-50 dark:hover:bg-gray-700'
//             }`}
//             onClick={() => handleRecipientSelect(user._id)}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center flex-1">
//                 <Avatar 
//                   size="default" 
//                   src={user.profilePhoto} 
//                   icon={<UserOutlined />} 
//                   className="mr-3" 
//                 />
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Text strong className="text-sm truncate">
//                       {user.firstName} {user.lastName}
//                     </Text>
//                     <Tag color="blue" size="small">{user.role}</Tag>
//                   </div>
//                   <Text type="secondary" className="text-xs block truncate">
//                     {user.email}
//                   </Text>
//                 </div>
//               </div>
//               {selectedRecipients.includes(user._id) && (
//                 <CheckCircleOutlined className="text-green-500" />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const SelectedRecipientsDisplay = () => (
//     <div className="mt-2">
//       <Text strong className="text-sm">
//         Selected Recipients ({selectedRecipients.length})
//       </Text>
//       <div className="flex flex-wrap gap-2 mt-2">
//         {selectedRecipients.map(userId => {
//           const user = emailUsers.find(u => u._id === userId);
//           return (
//             <Tag
//               key={userId}
//               closable
//               onClose={() => handleRecipientRemove(userId)}
//               className="flex items-center gap-1 py-1"
//               color="blue"
//             >
//               <Avatar size="small" src={user?.profilePhoto} icon={<UserOutlined />} />
//               {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
//             </Tag>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white border-gray-200';

//   const textClass = currentTheme === 'dark' ? 'text-white' : 'text-gray-800';

//   return (
//     <>
//       {contextHolder}
//       <div className="min-h-screen p-4">
//         <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//             <div>
//               <Title level={2} className={textClass}>
//                 <MailOutlined className="mr-3" />
//                 Association Email System
//               </Title>
//               <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//                 Professional Communication Platform
//               </Text>
//             </div>
           
//             <Space>
//               <Tooltip title="Test Email System">
//                 <Button 
//                   icon={<ExperimentOutlined />}
//                   onClick={handleTestEmail}
//                   loading={testing}
//                 >
//                   System Test
//                 </Button>
//               </Tooltip>
//               <Button 
//                 icon={<ReloadOutlined />}
//                 onClick={() => dispatch(fetchEmails({ folder: activeTab }))}
//                 loading={loading}
//               >
//                 Refresh
//               </Button>
//               <Button 
//                 type="primary" 
//                 icon={<PlusOutlined />}
//                 onClick={handleComposeOpen}
//                 disabled={!['Admin', 'HR', 'Manager', 'Executive'].includes(currentUser?.role)}
//               >
//                 Compose
//               </Button>
//             </Space>
//           </div>

//           <StatisticsOverview />

//           <Row gutter={[16, 16]}>
//             {/* Sidebar */}
//             <Col xs={24} md={6}>
//               <Card className={`mb-4 ${cardClass}`}>
//                 <Tabs 
//                   activeKey={activeTab} 
//                   onChange={setActiveTab}
//                   tabPosition="top"
//                   type="card"
//                 >
//                   <TabPane 
//                     tab={
//                       <span>
//                         <MailOutlined />
//                         Inbox
//                         <Badge count={stats.inbox || 0} offset={[10, 0]} />
//                       </span>
//                     } 
//                     key="inbox" 
//                   />
//                   <TabPane 
//                     tab={
//                       <span>
//                         <SendOutlined />
//                         Sent
//                         <Badge count={stats.sent || 0} offset={[10, 0]} />
//                       </span>
//                     } 
//                     key="sent" 
//                   />
//                   <TabPane 
//                     tab={
//                       <span>
//                         <SaveOutlined />
//                         Drafts
//                         <Badge count={stats.drafts || 0} offset={[10, 0]} />
//                       </span>
//                     } 
//                     key="draft" 
//                   />
//                 </Tabs>

//                 <Divider />

//                 <div className="space-y-2">
//                   <Text strong className="text-sm">Quick Actions</Text>
//                   <Button 
//                     icon={<FilterOutlined />}
//                     onClick={() => setFiltersVisible(!filtersVisible)}
//                     block
//                     type="text"
//                     className="text-left"
//                   >
//                     Advanced Filters
//                   </Button>
//                 </div>
//               </Card>
//             </Col>

//             {/* Email List */}
//             <Col xs={24} md={18}>
//               <Card className={cardClass}>
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                   <div className="flex items-center gap-4 flex-1">
//                     <Input
//                       placeholder="Search emails by subject, sender, or content..."
//                       prefix={<SearchOutlined />}
//                       value={filters.search}
//                       onChange={(e) => handleSearch(e.target.value)}
//                       allowClear
//                       style={{ width: 400 }}
//                     />
                    
//                     {emails.length > 0 && (
//                       <Checkbox
//                         indeterminate={selectedEmailsList.length > 0 && selectedEmailsList.length < emails.length}
//                         checked={selectedEmailsList.length === emails.length && emails.length > 0}
//                         onChange={(e) => handleSelectAll(e.target.checked)}
//                       >
//                         Select All
//                       </Checkbox>
//                     )}
//                   </div>

//                   <Space>
//                     {selectedEmailsList.length > 0 && (
//                       <>
//                         <Text type="secondary">
//                           {selectedEmailsList.length} selected
//                         </Text>
//                         <Dropdown overlay={BulkActionsMenu} placement="bottomRight">
//                           <Button icon={<MoreOutlined />}>
//                             Actions
//                           </Button>
//                         </Dropdown>
//                       </>
//                     )}
//                   </Space>
//                 </div>

//                 {filtersVisible && <EmailFilters />}

//                 {loading ? (
//                   <div className="flex justify-center items-center py-12">
//                     <Spin size="large" />
//                   </div>
//                 ) : emails.length === 0 ? (
//                   <Empty 
//                     description="No emails found" 
//                     image={Empty.PRESENTED_IMAGE_SIMPLE}
//                   >
//                     <Button type="primary" onClick={handleComposeOpen}>
//                       Compose Your First Email
//                     </Button>
//                   </Empty>
//                 ) : (
//                   <List
//                     dataSource={emails}
//                     renderItem={(email) => (
//                       <List.Item
//                         className={`p-4 border-b cursor-pointer transition-all ${
//                           currentTheme === 'dark' 
//                             ? 'hover:bg-gray-700' 
//                             : 'hover:bg-blue-50'
//                         } ${selectedEmailsList.includes(email._id) ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}
//                         onClick={() => setSelectedEmail(email)}
//                         actions={[
//                           <Checkbox
//                             checked={selectedEmailsList.includes(email._id)}
//                             onChange={(e) => {
//                               e.stopPropagation();
//                               handleEmailSelect(email._id);
//                             }}
//                           />,
//                           <Tooltip title="View Details">
//                             <Button 
//                               type="text" 
//                               icon={<EyeOutlined />}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setSelectedEmail(email);
//                               }}
//                             />
//                           </Tooltip>,
//                           <Tooltip title="Delete Email">
//                             <Button 
//                               type="text" 
//                               icon={<DeleteOutlined />}
//                               danger
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleDeleteEmail(email._id, email.subject);
//                               }}
//                             />
//                           </Tooltip>
//                         ]}
//                       >
//                         <div className="flex items-start w-full">
//                           <Badge dot={!email.isRead && activeTab === 'inbox'}>
//                             <Avatar 
//                               size="large"
//                               src={activeTab === 'sent' ? currentUser?.profilePhoto : email.sender?.profilePhoto} 
//                               icon={<UserOutlined />} 
//                               className="mr-4"
//                             />
//                           </Badge>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center justify-between mb-2">
//                               <div className="flex items-center gap-2 flex-wrap">
//                                 <Text strong className={textClass}>
//                                   {activeTab === 'sent' ? 'You' : `${email.sender?.firstName} ${email.sender?.lastName}`}
//                                 </Text>
//                                 {getPriorityTag(email.priority)}
//                                 {getStatusTag(email)}
//                                 {email.isImportant && <StarFilled className="text-yellow-500" />}
//                               </div>
//                               <Text type="secondary" className="text-sm">
//                                 {dayjs(email.sentAt || email.createdAt).fromNow()}
//                               </Text>
//                             </div>
//                             <Text className={`block font-semibold text-lg mb-2 ${textClass}`}>
//                               {email.subject}
//                             </Text>
//                             <Paragraph 
//                               ellipsis={{ rows: 2, tooltip: email.message }}
//                               className="text-sm text-gray-600 dark:text-gray-300 mb-2"
//                             >
//                               {email.message}
//                             </Paragraph>
//                           </div>
//                         </div>
//                       </List.Item>
//                     )}
//                   />
//                 )}
//               </Card>
//             </Col>
//           </Row>

//           {/* Compose Modal */}
//           <Modal
//             title="Compose New Email"
//             open={composeVisible}
//             onCancel={() => {
//               setComposeVisible(false);
//               form.resetFields();
//               setSelectedRecipients([]);
//               setUserSearchText('');
//             }}
//             footer={null}
//             width={700}
//             destroyOnClose
//           >
//             <Form
//               form={form}
//               layout="vertical"
//               onFinish={handleSendEmail}
//               initialValues={{
//                 priority: 'medium',
//                 category: 'notification'
//               }}
//             >
//               <Form.Item
//                 label="Recipients"
//                 required
//               >
//                 <div className="space-y-3">
//                   <Popover
//                     content={<UserSelectionContent />}
//                     trigger="click"
//                     placement="bottomLeft"
//                   >
//                     <Button 
//                       type="dashed" 
//                       block 
//                       icon={<UserOutlined />}
//                       className="h-12 text-left"
//                     >
//                       {userSearchText ? `Searching...` : 'Select recipients'}
//                     </Button>
//                   </Popover>
                  
//                   {selectedRecipients.length > 0 && <SelectedRecipientsDisplay />}
//                 </div>
//               </Form.Item>

//               <Form.Item
//                 label="Subject"
//                 name="subject"
//                 rules={[{ required: true, message: 'Please enter subject' }]}
//               >
//                 <Input placeholder="Enter email subject..." />
//               </Form.Item>

//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <Form.Item label="Priority" name="priority">
//                   <Select>
//                     <Option value="low">Low Priority</Option>
//                     <Option value="medium">Medium Priority</Option>
//                     <Option value="high">High Priority</Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Category" name="category">
//                   <Select>
//                     <Option value="announcement">Announcement</Option>
//                     <Option value="notification">Notification</Option>
//                     <Option value="newsletter">Newsletter</Option>
//                     <Option value="system">System</Option>
//                   </Select>
//                 </Form.Item>
//               </div>

//               <Form.Item
//                 label="Message"
//                 name="message"
//                 rules={[{ required: true, message: 'Please enter your message' }]}
//               >
//                 <TextArea 
//                   rows={8} 
//                   placeholder="Type your message here..." 
//                   showCount 
//                   maxLength={5000}
//                 />
//               </Form.Item>

//               <div className="flex justify-between items-center pt-4 border-t">
//                 <Form.Item name="saveAsDraft" valuePropName="checked" noStyle>
//                   <Checkbox>Save as draft</Checkbox>
//                 </Form.Item>
//                 <Space>
//                   <Button 
//                     onClick={() => setComposeVisible(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     type="primary" 
//                     icon={<SendOutlined />} 
//                     htmlType="submit"
//                     disabled={selectedRecipients.length === 0}
//                     loading={sending}
//                   >
//                     Send Email
//                   </Button>
//                 </Space>
//               </div>
//             </Form>
//           </Modal>

//           {/* Email Detail Modal */}
//           <Modal
//             title={selectedEmail?.subject}
//             open={!!selectedEmail}
//             onCancel={() => setSelectedEmail(null)}
//             footer={[
//               <Button 
//                 key="delete"
//                 danger 
//                 icon={<DeleteOutlined />}
//                 onClick={() => {
//                   if (selectedEmail) {
//                     handleDeleteEmail(selectedEmail._id, selectedEmail.subject);
//                     setSelectedEmail(null);
//                   }
//                 }}
//               >
//                 Delete
//               </Button>,
//               <Button key="close" onClick={() => setSelectedEmail(null)}>
//                 Close
//               </Button>
//             ]}
//             width={700}
//           >
//             {selectedEmail && (
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     <Avatar 
//                       size="large"
//                       src={activeTab === 'sent' ? currentUser?.profilePhoto : selectedEmail.sender?.profilePhoto} 
//                       className="mr-3" 
//                     />
//                     <div>
//                       <Text strong>
//                         {activeTab === 'sent' ? 'You' : `${selectedEmail.sender?.firstName} ${selectedEmail.sender?.lastName}`}
//                       </Text>
//                       <br />
//                       <Text type="secondary">{selectedEmail.sender?.email}</Text>
//                     </div>
//                   </div>
//                   <Text type="secondary">
//                     {dayjs(selectedEmail.sentAt || selectedEmail.createdAt).format('MMM D, YYYY [at] h:mm A')}
//                   </Text>
//                 </div>
                
//                 <div className="flex gap-4 mb-4">
//                   {getPriorityTag(selectedEmail.priority)}
//                   {getStatusTag(selectedEmail)}
//                   {selectedEmail.category && (
//                     <Tag color="purple">{selectedEmail.category}</Tag>
//                   )}
//                 </div>
                
//                 <Divider />
//                 <div className="whitespace-pre-wrap leading-relaxed">
//                   {selectedEmail.message}
//                 </div>
//               </div>
//             )}
//           </Modal>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default Email;




///////////////correct////////////////////


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Card,
//   List,
//   Button,
//   Input,
//   Space,
//   Tag,
//   Avatar,
//   Typography,
//   Divider,
//   Modal,
//   Form,
//   Select,
//   message,
//   Row,
//   Col,
//   Badge,
//   Tooltip,
//   Checkbox,
//   Spin,
//   Empty,
//   Popover
// } from 'antd';
// import {
//   MailOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   UserOutlined,
//   StarOutlined,
//   StarFilled,
//   ReloadOutlined,
//   EyeOutlined,
//   SendOutlined,
//   SaveOutlined,
//   ExperimentOutlined
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import { apiService } from '../../services/apiService';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);

// const { Title, Text } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// const Email = () => {
//   const [messageApi, contextHolder] = message.useMessage();
  
//   // State Management
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [composeVisible, setComposeVisible] = useState(false);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [activeTab, setActiveTab] = useState('inbox');
//   const [emailUsers, setEmailUsers] = useState([]);
//   const [usersLoading, setUsersLoading] = useState(false);
//   const [stats, setStats] = useState({});
//   const [selectedRecipients, setSelectedRecipients] = useState([]);
//   const [userSearchText, setUserSearchText] = useState('');
//   const [sendingEmail, setSendingEmail] = useState(false);
//   const [testingEmail, setTestingEmail] = useState(false);
  
//   // New professional state variables
//   const [userFilters, setUserFilters] = useState({
//     role: '',
//     department: ''
//   });
//   const [sendingBroadcast, setSendingBroadcast] = useState(false);

//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const currentUser = JSON.parse(localStorage.getItem('user'));
//   const [form] = Form.useForm();
//   const searchTimeoutRef = useRef(null);

//   // Effects
//   useEffect(() => {
//     fetchEmails();
//     fetchEmailStats();
//   }, [activeTab, searchText]);

//   useEffect(() => {
//     if (composeVisible) {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//       searchTimeoutRef.current = setTimeout(() => {
//         fetchEmailUsers(userSearchText, userFilters);
//       }, 300);
//     }
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   }, [userSearchText, composeVisible, userFilters]);

//   // API Functions
//   const fetchEmails = async () => {
//     setLoading(true);
//     try {
//       const response = await apiService.email.getEmails({
//         folder: activeTab,
//         search: searchText,
//         page: 1,
//         limit: 50
//       });

//       if (response.data?.success) {
//         setEmails(response.data.data || []);
//       } else {
//         showMessage('error', response?.data?.message || 'Failed to fetch emails');
//       }
//     } catch (error) {
//       console.error('Fetch emails error:', error);
//       showMessage('error', 'Failed to fetch emails');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmailStats = async () => {
//     try {
//       const response = await apiService.email.getStats();
//       if (response.data?.success) {
//         setStats(response.data.data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch email stats:', error);
//     }
//   };

//   const fetchEmailUsers = async (search = '', filters = {}) => {
//     setUsersLoading(true);
//     try {
//       const params = { search, ...filters };
//       const response = await apiService.email.getUsers(params);
      
//       if (response.data?.success) {
//         setEmailUsers(response.data.data || []);
//       } else {
//         showMessage('error', response?.data?.message || 'Failed to fetch users');
//       }
//     } catch (error) {
//       console.error('Fetch users error:', error);
//       showMessage('error', 'Failed to fetch users');
//     } finally {
//       setUsersLoading(false);
//     }
//   };

//   // Helper Functions
//   const showMessage = (type, content) => {
//     try {
//       messageApi[type](content);
//     } catch (error) {
//       console.error('Message error:', error);
//     }
//   };

//   const handleSendEmail = async (values) => {
//     setSendingEmail(true);
//     try {
//       const { subject, message: emailMessage, priority, category, saveAsDraft } = values;

//       if (selectedRecipients.length === 0 && !saveAsDraft) {
//         showMessage('error', 'Please select at least one recipient');
//         return;
//       }

//       const emailData = {
//         recipientIds: selectedRecipients,
//         subject,
//         message: emailMessage,
//         priority,
//         category,
//         isDraft: saveAsDraft || false
//       };

//       const response = await apiService.email.send(emailData);

//       if (response?.data?.success) {
//         showMessage('success', response.data.message);
//         setComposeVisible(false);
//         form.resetFields();
//         setSelectedRecipients([]);
//         setUserSearchText('');
//         fetchEmails();
//         fetchEmailStats();
//       } else {
//         showMessage('error', response?.data?.message || 'Failed to send email');
//       }
//     } catch (error) {
//       console.error('Send email error:', error);
//       showMessage('error', error.response?.data?.message || 'Failed to send email');
//     } finally {
//       setSendingEmail(false);
//     }
//   };

//   const handleTestEmail = async () => {
//     setTestingEmail(true);
//     try {
//       const testData = {
//         subject: 'Email System Test',
//         message: 'This is a test message to verify that the email system is working properly.',
//         priority: 'medium',
//         category: 'notification'
//       };

//       const response = await apiService.email.test(testData);

//       if (response?.data?.success) {
//         showMessage('success', response.data.message);
//       } else {
//         showMessage('warning', response?.data?.message || 'Test failed');
//       }
//     } catch (error) {
//       console.error('Test email error:', error);
//       showMessage('error', error.response?.data?.message || 'Test failed');
//     } finally {
//       setTestingEmail(false);
//     }
//   };

//   const handleRecipientSelect = (userId) => {
//     if (!selectedRecipients.includes(userId)) {
//       setSelectedRecipients(prev => [...prev, userId]);
//     }
//   };

//   const handleRecipientRemove = (userId) => {
//     setSelectedRecipients(prev => prev.filter(id => id !== userId));
//   };

//   const handleComposeOpen = () => {
//     setComposeVisible(true);
//     setSelectedRecipients([]);
//     setUserSearchText('');
//     setUserFilters({ role: '', department: '' });
//     fetchEmailUsers('', {});
//   };

//   // UI Helper Functions
//   const getPriorityTag = (priority) => {
//     const config = {
//       high: { color: 'red', text: 'High' },
//       medium: { color: 'orange', text: 'Medium' },
//       low: { color: 'blue', text: 'Low' },
//     }[priority] || { color: 'default', text: priority };
    
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getStatusTag = (email) => {
//     if (!email.status || email.status === 'draft') return null;
    
//     const config = {
//       sent: { color: 'green', text: 'Sent' },
//       partial: { color: 'orange', text: 'Partial' },
//       failed: { color: 'red', text: 'Failed' },
//       pending: { color: 'blue', text: 'Pending' }
//     }[email.status] || { color: 'default', text: email.status };
    
//     return <Tag color={config.color} size="small">{config.text}</Tag>;
//   };

//   // UI Components
//   const UserSelectionContent = () => (
//     <div style={{ width: 500 }}>
//       <div className="p-3 border-b space-y-3">
//         <Input
//           placeholder="Search users by name, email, or membership ID..."
//           value={userSearchText}
//           onChange={(e) => setUserSearchText(e.target.value)}
//           allowClear
//         />
        
//         <Select
//           placeholder="Filter by role"
//           value={userFilters.role}
//           onChange={(value) => setUserFilters(prev => ({ ...prev, role: value }))}
//           style={{ width: '100%' }}
//           allowClear
//         >
//           <Option value="Member">Member</Option>
//           <Option value="Admin">Admin</Option>
//           <Option value="HR">HR</Option>
//           <Option value="Employee">Employee</Option>
//           <Option value="PlotOwner">Plot Owner</Option>
//         </Select>
//       </div>
      
//       {usersLoading ? (
//         <div className="flex justify-center items-center py-8">
//           <Spin size="default" />
//         </div>
//       ) : (
//         <div style={{ maxHeight: 300, overflowY: 'auto' }}>
//           {emailUsers.map(user => (
//             <div
//               key={user._id}
//               className={`p-3 border-b cursor-pointer transition-colors ${
//                 selectedRecipients.includes(user._id) 
//                   ? 'bg-blue-50 dark:bg-blue-900/20' 
//                   : 'hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`}
//               onClick={() => handleRecipientSelect(user._id)}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center flex-1">
//                   <Avatar 
//                     size="default" 
//                     src={user.profilePhoto} 
//                     icon={<UserOutlined />} 
//                     className="mr-3" 
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <Text strong className="text-sm truncate">
//                         {user.firstName} {user.lastName}
//                       </Text>
//                       <Tag color="blue" size="small">{user.role}</Tag>
//                     </div>
//                     <Text type="secondary" className="text-xs block truncate">
//                       {user.email}
//                     </Text>
//                   </div>
//                 </div>
//                 {selectedRecipients.includes(user._id) && (
//                   <div className="text-green-500">✓</div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const SelectedRecipientsDisplay = () => (
//     <div className="mt-2">
//       <Text strong className="text-sm">
//         Selected Recipients ({selectedRecipients.length})
//       </Text>
//       <div className="flex flex-wrap gap-2 mt-2">
//         {selectedRecipients.map(userId => {
//           const user = emailUsers.find(u => u._id === userId);
//           return (
//             <Tag
//               key={userId}
//               closable
//               onClose={() => handleRecipientRemove(userId)}
//               className="flex items-center gap-1 py-1"
//               color="blue"
//             >
//               <Avatar size="small" src={user?.profilePhoto} icon={<UserOutlined />} />
//               {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
//             </Tag>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white border-gray-200';

//   const textClass = currentTheme === 'dark' ? 'text-white' : 'text-gray-800';

//   const tabs = [
//     { key: 'inbox', label: 'Inbox', count: stats.inbox || 0 },
//     { key: 'sent', label: 'Sent', count: stats.sent || 0 },
//     { key: 'draft', label: 'Draft', count: stats.drafts || 0 },
//     { key: 'important', label: 'Important', count: stats.important || 0 },
//   ];

//   return (
//     <>
//       {contextHolder}
//       <div className="min-h-screen p-4">
//         <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//             <div>
//               <Title level={2} className={textClass}>
//                 <MailOutlined className="mr-3" />
//                 Association Email System
//               </Title>
//               <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//                 Professional communication platform
//               </Text>
//             </div>
           
//             <Space>
//               <Button 
//                 icon={<ReloadOutlined />}
//                 onClick={fetchEmails}
//                 loading={loading}
//               >
//                 Refresh
//               </Button>
//               <Button 
//                 type="primary" 
//                 icon={<PlusOutlined />}
//                 onClick={handleComposeOpen}
//                 disabled={!['Admin', 'HR', 'Manager', 'Executive'].includes(currentUser?.role)}
//               >
//                 Compose
//               </Button>
//             </Space>
//           </div>

//           <Row gutter={[16, 16]}>
//             {/* Sidebar */}
//             <Col xs={24} md={6}>
//               <Card className={`mb-4 ${cardClass}`}>
//                 <div className="space-y-2">
//                   {tabs.map(tab => (
//                     <Button
//                       key={tab.key}
//                       type={activeTab === tab.key ? 'primary' : 'text'}
//                       block
//                       className="text-left flex justify-between items-center h-12"
//                       onClick={() => setActiveTab(tab.key)}
//                     >
//                       <span>{tab.label}</span>
//                       <Badge count={tab.count} showZero={false} />
//                     </Button>
//                   ))}
//                 </div>
//               </Card>
//             </Col>

//             {/* Email List */}
//             <Col xs={24} md={18}>
//               <Card className={cardClass}>
//                 <div className="flex items-center gap-4 mb-6">
//                   <Input
//                     placeholder="Search emails..."
//                     prefix={<SearchOutlined />}
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                     allowClear
//                     style={{ width: 400 }}
//                   />
//                 </div>

//                 {loading ? (
//                   <div className="flex justify-center items-center py-12">
//                     <Spin size="large" />
//                   </div>
//                 ) : emails.length === 0 ? (
//                   <Empty description="No emails found" />
//                 ) : (
//                   <List
//                     dataSource={emails}
//                     renderItem={(email) => (
//                       <List.Item
//                         className={`p-4 border-b cursor-pointer transition-all ${
//                           currentTheme === 'dark' 
//                             ? 'hover:bg-gray-700' 
//                             : 'hover:bg-blue-50'
//                         }`}
//                         onClick={() => setSelectedEmail(email)}
//                       >
//                         <div className="flex items-start w-full">
//                           <Badge dot={!email.isRead}>
//                             <Avatar 
//                               size="large"
//                               src={activeTab === 'sent' ? currentUser?.profilePhoto : email.sender?.profilePhoto} 
//                               icon={<UserOutlined />} 
//                               className="mr-4"
//                             />
//                           </Badge>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center justify-between mb-2">
//                               <div className="flex items-center gap-2 flex-wrap">
//                                 <Text strong className={textClass}>
//                                   {activeTab === 'sent' ? 'You' : `${email.sender?.firstName} ${email.sender?.lastName}`}
//                                 </Text>
//                                 {getPriorityTag(email.priority)}
//                                 {getStatusTag(email)}
//                               </div>
//                               <Text type="secondary" className="text-sm">
//                                 {dayjs(email.sentAt || email.createdAt).fromNow()}
//                               </Text>
//                             </div>
//                             <Text className={`block font-semibold text-lg mb-2 ${textClass}`}>
//                               {email.subject}
//                             </Text>
//                             <Text className="text-sm line-clamp-2">
//                               {email.message}
//                             </Text>
//                           </div>
//                         </div>
//                       </List.Item>
//                     )}
//                   />
//                 )}
//               </Card>
//             </Col>
//           </Row>

//           {/* Compose Modal */}
//           <Modal
//             title="Compose New Email"
//             open={composeVisible}
//             onCancel={() => {
//               setComposeVisible(false);
//               form.resetFields();
//               setSelectedRecipients([]);
//               setUserSearchText('');
//             }}
//             footer={null}
//             width={700}
//             destroyOnClose
//           >
//             <Form
//               form={form}
//               layout="vertical"
//               onFinish={handleSendEmail}
//               initialValues={{
//                 priority: 'medium',
//                 category: 'notification'
//               }}
//             >
//               <Form.Item
//                 label="Recipients"
//                 required
//               >
//                 <div className="space-y-3">
//                   <Popover
//                     content={<UserSelectionContent />}
//                     trigger="click"
//                     placement="bottomLeft"
//                   >
//                     <Button 
//                       type="dashed" 
//                       block 
//                       icon={<UserOutlined />}
//                       className="h-12 text-left"
//                     >
//                       {userSearchText ? `Searching...` : 'Select recipients'}
//                     </Button>
//                   </Popover>
                  
//                   {selectedRecipients.length > 0 && <SelectedRecipientsDisplay />}
//                 </div>
//               </Form.Item>

//               <Form.Item
//                 label="Subject"
//                 name="subject"
//                 rules={[{ required: true, message: 'Please enter subject' }]}
//               >
//                 <Input placeholder="Enter email subject..." />
//               </Form.Item>

//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <Form.Item label="Priority" name="priority">
//                   <Select>
//                     <Option value="low">Low Priority</Option>
//                     <Option value="medium">Medium Priority</Option>
//                     <Option value="high">High Priority</Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Category" name="category">
//                   <Select>
//                     <Option value="announcement">Announcement</Option>
//                     <Option value="notification">Notification</Option>
//                     <Option value="newsletter">Newsletter</Option>
//                   </Select>
//                 </Form.Item>
//               </div>

//               <Form.Item
//                 label="Message"
//                 name="message"
//                 rules={[{ required: true, message: 'Please enter your message' }]}
//               >
//                 <TextArea 
//                   rows={8} 
//                   placeholder="Type your message here..." 
//                   showCount 
//                   maxLength={5000}
//                 />
//               </Form.Item>

//               <div className="flex justify-between items-center pt-4 border-t">
//                 <Form.Item name="saveAsDraft" valuePropName="checked" noStyle>
//                   <Checkbox>Save as draft</Checkbox>
//                 </Form.Item>
//                 <Space>
//                   <Button 
//                     onClick={() => setComposeVisible(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     icon={<ExperimentOutlined />}
//                     onClick={handleTestEmail}
//                     loading={testingEmail}
//                   >
//                     Test
//                   </Button>
//                   <Button 
//                     type="primary" 
//                     icon={<SendOutlined />} 
//                     htmlType="submit"
//                     disabled={selectedRecipients.length === 0}
//                     loading={sendingEmail}
//                   >
//                     Send Email
//                   </Button>
//                 </Space>
//               </div>
//             </Form>
//           </Modal>

//           {/* Email Detail Modal */}
//           <Modal
//             title={selectedEmail?.subject}
//             open={!!selectedEmail}
//             onCancel={() => setSelectedEmail(null)}
//             footer={[
//               <Button key="close" onClick={() => setSelectedEmail(null)}>
//                 Close
//               </Button>
//             ]}
//             width={700}
//           >
//             {selectedEmail && (
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     <Avatar 
//                       size="large"
//                       src={activeTab === 'sent' ? currentUser?.profilePhoto : selectedEmail.sender?.profilePhoto} 
//                       className="mr-3" 
//                     />
//                     <div>
//                       <Text strong>
//                         {activeTab === 'sent' ? 'You' : `${selectedEmail.sender?.firstName} ${selectedEmail.sender?.lastName}`}
//                       </Text>
//                       <br />
//                       <Text type="secondary">{selectedEmail.sender?.email}</Text>
//                     </div>
//                   </div>
//                   <Text type="secondary">
//                     {dayjs(selectedEmail.sentAt || selectedEmail.createdAt).format('MMM D, YYYY [at] h:mm A')}
//                   </Text>
//                 </div>
//                 <Divider />
//                 <div className="whitespace-pre-wrap leading-relaxed">
//                   {selectedEmail.message}
//                 </div>
//               </div>
//             )}
//           </Modal>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default Email;





///////////////////////////////LAST VERSION////////////////////////////////


import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  List,
  Button,
  Input,
  Space,
  Tag,
  Avatar,
  Typography,
  Divider,
  Modal,
  Form,
  Select,
  message,
  Row,
  Col,
  Badge,
  Tooltip,
  Checkbox,
  Spin,
  Empty,
  Popover,
  Dropdown,
  Menu,
  Statistic,
  Tabs
} from 'antd';
import {
  MailOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  StarOutlined,
  StarFilled,
  ReloadOutlined,
  EyeOutlined,
  SendOutlined,
  SaveOutlined,
  ExperimentOutlined,
  DeleteOutlined,
  FilterOutlined,
  MoreOutlined,
  ExportOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { apiService } from '../../services/apiService';
import {
  fetchEmails,
  sendEmail,
  deleteEmail,
  bulkDeleteEmails,
  fetchEmailStats,
  fetchEmailUsers,
  testEmailSystem,
  setFilters,
  setSelectedEmails,
  toggleEmailSelection,
  selectAllEmails,
  clearSelection,
  clearError,
  clearSuccess,
  selectEmails,
  selectEmailUsers,
  selectedEmails,
  selectEmailStats,
  selectEmailFilters,
  selectEmailLoading,
  selectEmailSending,
  selectEmailDeleting,
  selectEmailTesting,
  selectEmailError,
  selectEmailSuccess
} from '../slices/emailSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const Email = () => {
  const [messageApi, contextHolder] = message.useMessage();
  
  // State Management
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [composeVisible, setComposeVisible] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');
  const [emailUsers, setEmailUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSent: 0,
    inbox: 0,
    sent: 0,
    drafts: 0,
    important: 0,
    delivered: 0,
    failed: 0,
    openRate: 0
  });
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [userSearchText, setUserSearchText] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  
  // Enhanced state variables
  const [userFilters, setUserFilters] = useState({
    role: '',
    department: ''
  });
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [emailFilters, setEmailFilters] = useState({
    priority: '',
    status: '',
    dateRange: ''
  });

  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [form] = Form.useForm();
  const searchTimeoutRef = useRef(null);

  // Effects
  useEffect(() => {
    fetchEmails();
    fetchEmailStats();
  }, [activeTab, searchText, emailFilters]);

  useEffect(() => {
    if (composeVisible) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        fetchEmailUsers(userSearchText, userFilters);
      }, 300);
    }
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [userSearchText, composeVisible, userFilters]);

  // API Functions
  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await apiService.email.getEmails({
        folder: activeTab,
        search: searchText,
        filters: emailFilters,
        page: 1,
        limit: 50
      });

      if (response.data?.success) {
        setEmails(response.data.data || []);
      } else {
        showMessage('error', response?.data?.message || 'Failed to fetch emails');
      }
    } catch (error) {
      console.error('Fetch emails error:', error);
      showMessage('error', 'Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailStats = async () => {
    try {
      const response = await apiService.email.getStats();
      if (response.data?.success) {
        // Ensure all stat values are numbers and set defaults
        setStats({
          totalSent: Number(response.data.data?.totalSent) || 0,
          inbox: Number(response.data.data?.inbox) || 0,
          sent: Number(response.data.data?.sent) || 0,
          drafts: Number(response.data.data?.drafts) || 0,
          important: Number(response.data.data?.important) || 0,
          delivered: Number(response.data.data?.delivered) || 0,
          failed: Number(response.data.data?.failed) || 0,
          openRate: Number(response.data.data?.openRate) || 0
        });
      } else {
        // Set default stats if API fails
        setStats({
          totalSent: 0,
          inbox: 0,
          sent: 0,
          drafts: 0,
          important: 0,
          delivered: 0,
          failed: 0,
          openRate: 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch email stats:', error);
      // Set default stats on error
      setStats({
        totalSent: 0,
        inbox: 0,
        sent: 0,
        drafts: 0,
        important: 0,
        delivered: 0,
        failed: 0,
        openRate: 0
      });
    }
  };

  // DELETE FUNCTIONALITY FOR SENT MESSAGES
  const handleDeleteEmail = async (emailId, isBulk = false) => {
    try {
      const response = await apiService.email.deleteEmail(emailId);
      
      if (response.data?.success) {
        if (!isBulk) {
          showMessage('success', 'Email deleted successfully');
        }
        
        // Refresh the emails list and stats
        fetchEmails();
        fetchEmailStats();
        
        // Clear selection if this was part of bulk delete
        if (isBulk) {
          setSelectedEmails([]);
        }
        
        // Close detail modal if open
        if (selectedEmail && selectedEmail._id === emailId) {
          setSelectedEmail(null);
        }
        
        return true;
      } else {
        showMessage('error', response?.data?.message || 'Failed to delete email');
        return false;
      }
    } catch (error) {
      console.error('Delete email error:', error);
      showMessage('error', error.response?.data?.message || 'Failed to delete email');
      return false;
    }
  };

  const handleBulkDelete = async () => {
    if (selectedEmails.length === 0) {
      showMessage('warning', 'Please select emails to delete');
      return;
    }

    Modal.confirm({
      title: 'Confirm Bulk Delete',
      content: `Are you sure you want to delete ${selectedEmails.length} selected email(s)? This action cannot be undone.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setBulkActionLoading(true);
        try {
          let successCount = 0;
          let failCount = 0;

          // Delete emails one by one
          for (const emailId of selectedEmails) {
            const success = await handleDeleteEmail(emailId, true);
            if (success) {
              successCount++;
            } else {
              failCount++;
            }
          }

          // Show summary message
          if (failCount === 0) {
            showMessage('success', `Successfully deleted ${successCount} email(s)`);
          } else if (successCount > 0) {
            showMessage('warning', `Deleted ${successCount} email(s), failed to delete ${failCount} email(s)`);
          } else {
            showMessage('error', 'Failed to delete all selected emails');
          }
        } catch (error) {
          console.error('Bulk delete error:', error);
          showMessage('error', 'Failed to delete emails');
        } finally {
          setBulkActionLoading(false);
        }
      }
    });
  };

  const handleSingleDelete = (emailId, emailSubject) => {
    Modal.confirm({
      title: 'Delete Email',
      content: `Are you sure you want to delete "${emailSubject || 'this email'}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => handleDeleteEmail(emailId)
    });
  };

  // Rest of your existing functions remain the same...
  const fetchEmailUsers = async (search = '', filters = {}) => {
    setUsersLoading(true);
    try {
      const params = { search, ...filters };
      const response = await apiService.email.getUsers(params);
      
      if (response.data?.success) {
        setEmailUsers(response.data.data || []);
      } else {
        showMessage('error', response?.data?.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Fetch users error:', error);
      showMessage('error', 'Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  const showMessage = (type, content) => {
    try {
      messageApi[type](content);
    } catch (error) {
      console.error('Message error:', error);
    }
  };

  const handleSendEmail = async (values) => {
    setSendingEmail(true);
    try {
      const { subject, message: emailMessage, priority, category, saveAsDraft } = values;

      if (selectedRecipients.length === 0 && !saveAsDraft) {
        showMessage('error', 'Please select at least one recipient');
        return;
      }

      const emailData = {
        recipientIds: selectedRecipients,
        subject,
        message: emailMessage,
        priority,
        category,
        isDraft: saveAsDraft || false
      };

      const response = await apiService.email.send(emailData);

      if (response?.data?.success) {
        showMessage('success', response.data.message);
        setComposeVisible(false);
        form.resetFields();
        setSelectedRecipients([]);
        setUserSearchText('');
        fetchEmails();
        fetchEmailStats();
      } else {
        showMessage('error', response?.data?.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Send email error:', error);
      showMessage('error', error.response?.data?.message || 'Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleTestEmail = async () => {
    setTestingEmail(true);
    try {
      const testData = {
        subject: 'Email System Test - Association Communication',
        message: `This is a test message to verify that the email system is working properly.\n\nTimestamp: ${new Date().toLocaleString()}\nUser: ${currentUser?.firstName} ${currentUser?.lastName}\nRole: ${currentUser?.role}\n\nIf you receive this email, please ignore it as it is only a system test.`,
        priority: 'medium',
        category: 'system'
      };

      const response = await apiService.email.test(testData);

      if (response?.data?.success) {
        showMessage('success', response.data.message || 'Email system test completed successfully');
      } else {
        showMessage('warning', response?.data?.message || 'Test completed with warnings');
      }
    } catch (error) {
      console.error('Test email error:', error);
      showMessage('error', error.response?.data?.message || 'Email system test failed. Please check your configuration.');
    } finally {
      setTestingEmail(false);
    }
  };

  const handleBulkMarkAsRead = async () => {
    if (selectedEmails.length === 0) return;

    setBulkActionLoading(true);
    try {
      const response = await apiService.email.bulkMarkAsRead(selectedEmails);
      if (response.data?.success) {
        showMessage('success', `Marked ${selectedEmails.length} email(s) as read`);
        setSelectedEmails([]);
        fetchEmails();
      }
    } catch (error) {
      console.error('Bulk mark as read error:', error);
      showMessage('error', 'Failed to update emails');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleExportEmails = async () => {
    try {
      const exportData = {
        folder: activeTab,
        filters: emailFilters,
        selectedIds: selectedEmails.length > 0 ? selectedEmails : undefined
      };

      const response = await apiService.email.export(exportData);
      
      if (response.data?.success) {
        showMessage('success', 'Email export initiated successfully');
      } else {
        showMessage('error', response?.data?.message || 'Failed to export emails');
      }
    } catch (error) {
      console.error('Export error:', error);
      showMessage('error', 'Export functionality is currently unavailable');
    }
  };

  const handleRecipientSelect = (userId) => {
    if (!selectedRecipients.includes(userId)) {
      setSelectedRecipients(prev => [...prev, userId]);
    }
  };

  const handleRecipientRemove = (userId) => {
    setSelectedRecipients(prev => prev.filter(id => id !== userId));
  };

  const handleEmailSelect = (emailId, checked) => {
    if (checked) {
      setSelectedEmails(prev => [...prev, emailId]);
    } else {
      setSelectedEmails(prev => prev.filter(id => id !== emailId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmails(emails.map(email => email._id));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleComposeOpen = () => {
    setComposeVisible(true);
    setSelectedRecipients([]);
    setUserSearchText('');
    setUserFilters({ role: '', department: '' });
    fetchEmailUsers('', {});
  };

  // UI Helper Functions
  const getPriorityTag = (priority) => {
    const config = {
      high: { color: 'red', text: 'High', icon: <ExclamationCircleOutlined /> },
      medium: { color: 'orange', text: 'Medium', icon: <InfoCircleOutlined /> },
      low: { color: 'blue', text: 'Low', icon: <InfoCircleOutlined /> },
    }[priority] || { color: 'default', text: priority, icon: null };
    
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getStatusTag = (email) => {
    if (!email.status || email.status === 'draft') return null;
    
    const config = {
      sent: { color: 'green', text: 'Sent', icon: <CheckCircleOutlined /> },
      partial: { color: 'orange', text: 'Partial', icon: <ExclamationCircleOutlined /> },
      failed: { color: 'red', text: 'Failed', icon: <ExclamationCircleOutlined /> },
      pending: { color: 'blue', text: 'Pending', icon: <InfoCircleOutlined /> }
    }[email.status] || { color: 'default', text: email.status, icon: null };
    
    return (
      <Tag color={config.color} icon={config.icon} size="small">
        {config.text}
      </Tag>
    );
  };

  // UI Components
  const BulkActionsMenu = () => (
    <Menu
      items={[
        {
          key: 'mark-read',
          icon: <CheckCircleOutlined />,
          label: 'Mark as Read',
          onClick: handleBulkMarkAsRead,
          disabled: selectedEmails.length === 0 || activeTab !== 'inbox'
        },
        {
          key: 'delete',
          icon: <DeleteOutlined />,
          label: 'Delete Selected',
          onClick: handleBulkDelete,
          disabled: selectedEmails.length === 0,
          danger: true
        },
        {
          key: 'export',
          icon: <ExportOutlined />,
          label: 'Export Selection',
          onClick: handleExportEmails,
          disabled: selectedEmails.length === 0
        }
      ]}
    />
  );

  const EmailFilters = () => (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Text strong className="text-sm">Priority</Text>
          <Select
            value={emailFilters.priority}
            onChange={(value) => setEmailFilters(prev => ({ ...prev, priority: value }))}
            style={{ width: '100%' }}
            placeholder="All priorities"
            allowClear
          >
            <Option value="high">High Priority</Option>
            <Option value="medium">Medium Priority</Option>
            <Option value="low">Low Priority</Option>
          </Select>
        </div>
        
        <div>
          <Text strong className="text-sm">Status</Text>
          <Select
            value={emailFilters.status}
            onChange={(value) => setEmailFilters(prev => ({ ...prev, status: value }))}
            style={{ width: '100%' }}
            placeholder="All statuses"
            allowClear
          >
            <Option value="sent">Sent</Option>
            <Option value="draft">Draft</Option>
            <Option value="failed">Failed</Option>
            <Option value="pending">Pending</Option>
          </Select>
        </div>
        
        <div>
          <Text strong className="text-sm">Date Range</Text>
          <Select
            value={emailFilters.dateRange}
            onChange={(value) => setEmailFilters(prev => ({ ...prev, dateRange: value }))}
            style={{ width: '100%' }}
            placeholder="All time"
            allowClear
          >
            <Option value="today">Today</Option>
            <Option value="week">This Week</Option>
            <Option value="month">This Month</Option>
            <Option value="quarter">This Quarter</Option>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button 
            onClick={() => setEmailFilters({ priority: '', status: '', dateRange: '' })}
            disabled={!emailFilters.priority && !emailFilters.status && !emailFilters.dateRange}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );

  const StatisticsOverview = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card size="small" className="text-center">
        <Statistic 
          title="Total Communications" 
          value={stats.totalSent || 0} 
          prefix={<MailOutlined />} 
        />
      </Card>
      <Card size="small" className="text-center">
        <Statistic 
          title="Successful Deliveries" 
          value={stats.delivered || 0} 
          prefix={<CheckCircleOutlined />} 
        />
      </Card>
      <Card size="small" className="text-center">
        <Statistic 
          title="Failed Deliveries" 
          value={stats.failed || 0} 
          prefix={<ExclamationCircleOutlined />} 
        />
      </Card>
      <Card size="small" className="text-center">
        <Statistic 
          title="Open Rate" 
          value={stats.openRate || 0} 
          suffix="%" 
        />
      </Card>
    </div>
  );

  const UserSelectionContent = () => (
    <div style={{ width: 500 }}>
      <div className="p-3 border-b space-y-3">
        <Input
          placeholder="Search users by name, email, or membership ID..."
          value={userSearchText}
          onChange={(e) => setUserSearchText(e.target.value)}
          allowClear
        />
        
        <Select
          placeholder="Filter by role"
          value={userFilters.role}
          onChange={(value) => setUserFilters(prev => ({ ...prev, role: value }))}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="Member">Member</Option>
          <Option value="Admin">Admin</Option>
          <Option value="HR">HR</Option>
          <Option value="Employee">Employee</Option>
          <Option value="PlotOwner">Plot Owner</Option>
        </Select>
      </div>
      
      {usersLoading ? (
        <div className="flex justify-center items-center py-8">
          <Spin size="default" />
        </div>
      ) : (
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          {emailUsers.map(user => (
            <div
              key={user._id}
              className={`p-3 border-b cursor-pointer transition-colors ${
                selectedRecipients.includes(user._id) 
                  ? 'bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleRecipientSelect(user._id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <Avatar 
                    size="default" 
                    src={user.profilePhoto} 
                    icon={<UserOutlined />} 
                    className="mr-3" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Text strong className="text-sm truncate">
                        {user.firstName} {user.lastName}
                      </Text>
                      <Tag color="blue" size="small">{user.role}</Tag>
                    </div>
                    <Text type="secondary" className="text-xs block truncate">
                      {user.email}
                    </Text>
                  </div>
                </div>
                {selectedRecipients.includes(user._id) && (
                  <div className="text-green-500">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const SelectedRecipientsDisplay = () => (
    <div className="mt-2">
      <Text strong className="text-sm">
        Selected Recipients ({selectedRecipients.length})
      </Text>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedRecipients.map(userId => {
          const user = emailUsers.find(u => u._id === userId);
          return (
            <Tag
              key={userId}
              closable
              onClose={() => handleRecipientRemove(userId)}
              className="flex items-center gap-1 py-1"
              color="blue"
            >
              <Avatar size="small" src={user?.profilePhoto} icon={<UserOutlined />} />
              {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
            </Tag>
          );
        })}
      </div>
    </div>
  );

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  const textClass = currentTheme === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <>
      {contextHolder}
      <div className="min-h-screen p-4">
        <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <Title level={2} className={textClass}>
                <MailOutlined className="mr-3" />
                Association Email System
              </Title>
              <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Total Professional Communication Platform
              </Text>
            </div>
           
            <Space>
              <Tooltip title="Test Email System">
                <Button 
                  icon={<ExperimentOutlined />}
                  onClick={handleTestEmail}
                  loading={testingEmail}
                >
                  System Test
                </Button>
              </Tooltip>
              <Button 
                icon={<ReloadOutlined />}
                onClick={fetchEmails}
                loading={loading}
              >
                Refresh
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleComposeOpen}
                disabled={!['Admin', 'HR', 'Manager', 'Executive'].includes(currentUser?.role)}
              >
                Compose
              </Button>
            </Space>
          </div>

          {/* Statistics Overview - Now shows zeros properly */}
          <StatisticsOverview />

          <Row gutter={[16, 16]}>
            {/* Sidebar */}
            <Col xs={24} md={6}>
              <Card className={`mb-4 ${cardClass}`}>
                <Tabs 
                  activeKey={activeTab} 
                  onChange={setActiveTab}
                  tabPosition="top"
                  type="card"
                >
                  <TabPane 
                    tab={
                      <span>
                        <MailOutlined />
                        Inbox
                        <Badge count={stats.inbox || 0} offset={[10, 0]} />
                      </span>
                    } 
                    key="inbox" 
                  />
                  <TabPane 
                    tab={
                      <span>
                        <SendOutlined />
                        Sent
                        <Badge count={stats.sent || 0} offset={[10, 0]} />
                      </span>
                    } 
                    key="sent" 
                  />
                  <TabPane 
                    tab={
                      <span>
                        <SaveOutlined />
                        Drafts
                        <Badge count={stats.drafts || 0} offset={[10, 0]} />
                      </span>
                    } 
                    key="draft" 
                  />
                  <TabPane 
                    tab={
                      <span>
                        <StarOutlined />
                        Important
                        <Badge count={stats.important || 0} offset={[10, 0]} />
                      </span>
                    } 
                    key="important" 
                  />
                </Tabs>

                <Divider />

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Text strong className="text-sm">Quick Actions</Text>
                  <Button 
                    icon={<FilterOutlined />}
                    onClick={() => setFiltersVisible(!filtersVisible)}
                    block
                    type="text"
                    className="text-left"
                  >
                    Advanced Filters
                  </Button>
                  <Button 
                    icon={<ExportOutlined />}
                    onClick={handleExportEmails}
                    block
                    type="text"
                    className="text-left"
                  >
                    Export Emails
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Email List */}
            <Col xs={24} md={18}>
              <Card className={cardClass}>
                {/* Header with Bulk Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4 flex-1">
                    <Input
                      placeholder="Search emails by subject, sender, or content..."
                      prefix={<SearchOutlined />}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      allowClear
                      style={{ width: 400 }}
                    />
                    
                    {emails.length > 0 && (
                      <Checkbox
                        indeterminate={selectedEmails.length > 0 && selectedEmails.length < emails.length}
                        checked={selectedEmails.length === emails.length && emails.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      >
                        Select All
                      </Checkbox>
                    )}
                  </div>

                  <Space>
                    {selectedEmails.length > 0 && (
                      <>
                        <Text type="secondary">
                          {selectedEmails.length} selected
                        </Text>
                        <Dropdown overlay={BulkActionsMenu} placement="bottomRight">
                          <Button 
                            icon={<MoreOutlined />}
                            loading={bulkActionLoading}
                          >
                            Actions
                          </Button>
                        </Dropdown>
                      </>
                    )}
                  </Space>
                </div>

                {/* Advanced Filters */}
                {filtersVisible && <EmailFilters />}

                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Spin size="large" />
                  </div>
                ) : emails.length === 0 ? (
                  <Empty 
                    description="No emails found" 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Button type="primary" onClick={handleComposeOpen}>
                      Compose Your First Email
                    </Button>
                  </Empty>
                ) : (
                  <List
                    dataSource={emails}
                    renderItem={(email) => (
                      <List.Item
                        className={`p-4 border-b cursor-pointer transition-all ${
                          currentTheme === 'dark' 
                            ? 'hover:bg-gray-700' 
                            : 'hover:bg-blue-50'
                        } ${selectedEmails.includes(email._id) ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}
                        onClick={() => setSelectedEmail(email)}
                        actions={[
                          <Checkbox
                            checked={selectedEmails.includes(email._id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleEmailSelect(email._id, e.target.checked);
                            }}
                          />,
                          <Tooltip title="View Details">
                            <Button 
                              type="text" 
                              icon={<EyeOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEmail(email);
                              }}
                            />
                          </Tooltip>,
                          <Tooltip title="Delete Email">
                            <Button 
                              type="text" 
                              icon={<DeleteOutlined />}
                              danger
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSingleDelete(email._id, email.subject);
                              }}
                            />
                          </Tooltip>
                        ]}
                      >
                        <div className="flex items-start w-full">
                          <Badge dot={!email.isRead && activeTab === 'inbox'}>
                            <Avatar 
                              size="large"
                              src={activeTab === 'sent' ? currentUser?.profilePhoto : email.sender?.profilePhoto} 
                              icon={<UserOutlined />} 
                              className="mr-4"
                            />
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Text strong className={textClass}>
                                  {activeTab === 'sent' ? 'You' : `${email.sender?.firstName} ${email.sender?.lastName}`}
                                </Text>
                                {getPriorityTag(email.priority)}
                                {getStatusTag(email)}
                                {email.isImportant && <StarFilled className="text-yellow-500" />}
                              </div>
                              <Text type="secondary" className="text-sm">
                                {dayjs(email.sentAt || email.createdAt).fromNow()}
                              </Text>
                            </div>
                            <Text className={`block font-semibold text-lg mb-2 ${textClass}`}>
                              {email.subject}
                            </Text>
                            <Paragraph 
                              ellipsis={{ rows: 2, tooltip: email.message }}
                              className="text-sm text-gray-600 dark:text-gray-300 mb-2"
                            >
                              {email.message}
                            </Paragraph>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <TeamOutlined />
                              <Text type="secondary">
                                {email.recipientCount || 1} recipient{email.recipientCount > 1 ? 's' : ''}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Col>
          </Row>

          {/* Compose Modal */}
          <Modal
            title="Compose New Email"
            open={composeVisible}
            onCancel={() => {
              setComposeVisible(false);
              form.resetFields();
              setSelectedRecipients([]);
              setUserSearchText('');
            }}
            footer={null}
            width={700}
            destroyOnClose
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSendEmail}
              initialValues={{
                priority: 'medium',
                category: 'notification'
              }}
            >
              <Form.Item
                label="Recipients"
                required
              >
                <div className="space-y-3">
                  <Popover
                    content={<UserSelectionContent />}
                    trigger="click"
                    placement="bottomLeft"
                  >
                    <Button 
                      type="dashed" 
                      block 
                      icon={<UserOutlined />}
                      className="h-12 text-left"
                    >
                      {userSearchText ? `Searching...` : 'Select recipients'}
                    </Button>
                  </Popover>
                  
                  {selectedRecipients.length > 0 && <SelectedRecipientsDisplay />}
                </div>
              </Form.Item>

              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: 'Please enter subject' }]}
              >
                <Input placeholder="Enter email subject..." />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <Form.Item label="Priority" name="priority">
                  <Select>
                    <Option value="low">Low Priority</Option>
                    <Option value="medium">Medium Priority</Option>
                    <Option value="high">High Priority</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Category" name="category">
                  <Select>
                    <Option value="announcement">Announcement</Option>
                    <Option value="notification">Notification</Option>
                    <Option value="newsletter">Newsletter</Option>
                    <Option value="system">System</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  rows={8} 
                  placeholder="Type your message here..." 
                  showCount 
                  maxLength={5000}
                />
              </Form.Item>

              <div className="flex justify-between items-center pt-4 border-t">
                <Form.Item name="saveAsDraft" valuePropName="checked" noStyle>
                  <Checkbox>Save as draft</Checkbox>
                </Form.Item>
                <Space>
                  <Button 
                    onClick={() => setComposeVisible(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    icon={<ExperimentOutlined />}
                    onClick={handleTestEmail}
                    loading={testingEmail}
                  >
                    Test
                  </Button>
                  <Button 
                    type="primary" 
                    icon={<SendOutlined />} 
                    htmlType="submit"
                    disabled={selectedRecipients.length === 0}
                    loading={sendingEmail}
                  >
                    Send Email
                  </Button>
                </Space>
              </div>
            </Form>
          </Modal>

          {/* Email Detail Modal */}
          <Modal
            title={selectedEmail?.subject}
            open={!!selectedEmail}
            onCancel={() => setSelectedEmail(null)}
            footer={[
              <Button 
                key="delete"
                danger 
                icon={<DeleteOutlined />}
                onClick={() => {
                  if (selectedEmail) {
                    handleSingleDelete(selectedEmail._id, selectedEmail.subject);
                    setSelectedEmail(null);
                  }
                }}
              >
                Delete
              </Button>,
              <Button key="close" onClick={() => setSelectedEmail(null)}>
                Close
              </Button>
            ]}
            width={700}
          >
            {selectedEmail && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar 
                      size="large"
                      src={activeTab === 'sent' ? currentUser?.profilePhoto : selectedEmail.sender?.profilePhoto} 
                      className="mr-3" 
                    />
                    <div>
                      <Text strong>
                        {activeTab === 'sent' ? 'You' : `${selectedEmail.sender?.firstName} ${selectedEmail.sender?.lastName}`}
                      </Text>
                      <br />
                      <Text type="secondary">{selectedEmail.sender?.email}</Text>
                    </div>
                  </div>
                  <Text type="secondary">
                    {dayjs(selectedEmail.sentAt || selectedEmail.createdAt).format('MMM D, YYYY [at] h:mm A')}
                  </Text>
                </div>
                
                <div className="flex gap-4 mb-4">
                  {getPriorityTag(selectedEmail.priority)}
                  {getStatusTag(selectedEmail)}
                  {selectedEmail.category && (
                    <Tag color="purple">{selectedEmail.category}</Tag>
                  )}
                </div>
                
                <Divider />
                <div className="whitespace-pre-wrap leading-relaxed">
                  {selectedEmail.message}
                </div>
              </div>
            )}
          </Modal>
        </Card>
      </div>
    </>
  );
};

export default Email;



