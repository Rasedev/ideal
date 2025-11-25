
//////////////////Final1 11////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   List,
//   Input,
//   Button,
//   Space,
//   Avatar,
//   Typography,
//   Tag,
//   Modal,
//   Form,
//   Select,
//   message,
//   Row,
//   Col,
//   Divider,
//   Dropdown,
//   Badge,
// } from 'antd';
// import {
//   ContactsOutlined,
//   SearchOutlined,
//   UserOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   PlusOutlined,
//   MoreOutlined,
//   TeamOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const { Title, Text } = Typography;
// const { Option } = Select;

// const Contact = () => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [filterRole, setFilterRole] = useState('');
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchContacts();
//   }, [searchText, filterRole]);

//   const fetchContacts = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/contact/contacts', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { search: searchText, role: filterRole }
//       });

//       if (response.data.success) {
//         setContacts(response.data.contacts || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch contacts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddContact = async (values) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/apps/contacts',
//         values,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success('Contact added successfully');
//         setModalVisible(false);
//         form.resetFields();
//         fetchContacts();
//       }
//     } catch (error) {
//       message.error('Failed to add contact');
//     }
//   };

//   const getRoleTag = (role) => {
//     const roleColors = {
//       member: 'blue',
//       admin: 'red',
//       employee: 'green',
//       plotowner: 'purple',
//       hr: 'orange',
//       president: 'magenta',
//       secretary: 'cyan',
//     };

//     const color = roleColors[role?.toLowerCase()] || 'default';
//     return (
//       <Tag color={color}>
//         {role?.replace(/([A-Z])/g, ' $1').trim()}
//       </Tag>
//     );
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: { color: 'green', text: 'Active' },
//       inactive: { color: 'red', text: 'Inactive' },
//       pending: { color: 'orange', text: 'Pending' },
//     };

//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <ContactsOutlined className="mr-3" />
//               Contacts
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage member contacts and information
//             </Text>
//           </div>
//           <Button 
//             type="primary" 
//             icon={<PlusOutlined />}
//             onClick={() => setModalVisible(true)}
//           >
//             Add Contact
//           </Button>
//         </div>

//         {/* Filters */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={12} md={8}>
//             <Input
//               placeholder="Search contacts..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//             />
//           </Col>
//           <Col xs={24} sm={12} md={8}>
//             <Select
//               placeholder="Filter by Role"
//               style={{ width: '100%' }}
//               allowClear
//               value={filterRole}
//               onChange={setFilterRole}
//             >
//               <Option value="member">Member</Option>
//               <Option value="admin">Admin</Option>
//               <Option value="employee">Employee</Option>
//               <Option value="plotowner">Plot Owner</Option>
//               <Option value="hr">HR</Option>
//             </Select>
//           </Col>
//         </Row>

//         {/* Contacts List */}
//         <Row gutter={[16, 16]}>
//           {contacts.map((contact) => (
//             <Col xs={24} sm={12} md={8} lg={6} key={contact._id}>
//               <Card 
//                 className={`text-center hover:shadow-lg transition-shadow cursor-pointer ${cardClass}`}
//                 onClick={() => setSelectedContact(contact)}
//               >
//                 <Badge dot={contact.isActive} color={contact.isActive ? 'green' : 'red'}>
//                   <Avatar 
//                     size={64} 
//                     src={contact.image} 
//                     icon={<UserOutlined />}
//                     className="mb-3 mx-auto"
//                   />
//                 </Badge>
                
//                 <Title level={4} className="mb-2">
//                   {`${contact.firstName} ${contact.lastName}`}
//                 </Title>
                
//                 <div className="mb-3">
//                   {getRoleTag(contact.role)}
//                   {getStatusTag(contact.status)}
//                 </div>

//                 <div className="space-y-2 text-left">
//                   <div className="flex items-center text-gray-600">
//                     <MailOutlined className="mr-2" />
//                     <Text className="text-sm truncate">{contact.email}</Text>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <PhoneOutlined className="mr-2" />
//                     <Text className="text-sm">{contact.phone}</Text>
//                   </div>
//                 </div>

//                 <Divider className="my-3" />

//                 <div className="flex justify-center space-x-2">
//                   <Button 
//                     type="text" 
//                     icon={<EyeOutlined />}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedContact(contact);
//                     }}
//                   />
//                   <Button 
//                     type="text" 
//                     icon={<EditOutlined />}
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                   <Dropdown
//                     menu={{
//                       items: [
//                         { key: 'view', icon: <EyeOutlined />, label: 'View Details' },
//                         { key: 'edit', icon: <EditOutlined />, label: 'Edit Contact' },
//                         { key: 'message', icon: <MailOutlined />, label: 'Send Message' },
//                         { type: 'divider' },
//                         { key: 'delete', icon: <DeleteOutlined />, label: 'Delete', danger: true },
//                       ],
//                     }}
//                     trigger={['click']}
//                   >
//                     <Button 
//                       type="text" 
//                       icon={<MoreOutlined />}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                   </Dropdown>
//                 </div>
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         {/* Empty State */}
//         {contacts.length === 0 && !loading && (
//           <div className="text-center py-12">
//             <TeamOutlined className="text-4xl text-gray-400 mb-4" />
//             <Title level={4} className="text-gray-500">No Contacts Found</Title>
//             <Text className="text-gray-400">
//               {searchText || filterRole ? 'Try changing your search filters' : 'Get started by adding your first contact'}
//             </Text>
//           </div>
//         )}

//         {/* Add Contact Modal */}
//         <Modal
//           title="Add New Contact"
//           open={modalVisible}
//           onCancel={() => {
//             setModalVisible(false);
//             form.resetFields();
//           }}
//           footer={null}
//           width={600}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleAddContact}
//           >
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="First Name"
//                   name="firstName"
//                   rules={[{ required: true, message: 'Please enter first name' }]}
//                 >
//                   <Input placeholder="Enter first name" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Last Name"
//                   name="lastName"
//                   rules={[{ required: true, message: 'Please enter last name' }]}
//                 >
//                   <Input placeholder="Enter last name" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Email"
//                   name="email"
//                   rules={[
//                     { required: true, message: 'Please enter email' },
//                     { type: 'email', message: 'Please enter valid email' }
//                   ]}
//                 >
//                   <Input placeholder="Enter email address" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Phone"
//                   name="phone"
//                   rules={[{ required: true, message: 'Please enter phone number' }]}
//                 >
//                   <Input placeholder="Enter phone number" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Role"
//                   name="role"
//                   rules={[{ required: true, message: 'Please select role' }]}
//                 >
//                   <Select placeholder="Select role">
//                     <Option value="member">Member</Option>
//                     <Option value="admin">Admin</Option>
//                     <Option value="employee">Employee</Option>
//                     <Option value="plotowner">Plot Owner</Option>
//                     <Option value="hr">HR</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Status"
//                   name="status"
//                   initialValue="active"
//                 >
//                   <Select>
//                     <Option value="active">Active</Option>
//                     <Option value="inactive">Inactive</Option>
//                     <Option value="pending">Pending</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Address"
//                   name="address"
//                 >
//                   <Input.TextArea placeholder="Enter address" rows={3} />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Notes"
//                   name="notes"
//                 >
//                   <Input.TextArea placeholder="Enter any additional notes" rows={2} />
//                 </Form.Item>
//               </Col>
//             </Row>
//             <div className="text-right">
//               <Space>
//                 <Button onClick={() => setModalVisible(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit">
//                   Add Contact
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Modal>

//         {/* Contact Detail Modal */}
//         <Modal
//           title="Contact Details"
//           open={!!selectedContact}
//           onCancel={() => setSelectedContact(null)}
//           footer={[
//             <Button key="close" onClick={() => setSelectedContact(null)}>
//               Close
//             </Button>,
//             <Button key="edit" type="primary">
//               Edit Contact
//             </Button>,
//           ]}
//           width={600}
//         >
//           {selectedContact && (
//             <div className="space-y-4">
//               <div className="text-center">
//                 <Avatar 
//                   size={80} 
//                   src={selectedContact.image} 
//                   icon={<UserOutlined />}
//                   className="mb-3"
//                 />
//                 <Title level={3}>
//                   {`${selectedContact.firstName} ${selectedContact.lastName}`}
//                 </Title>
//                 <Space>
//                   {getRoleTag(selectedContact.role)}
//                   {getStatusTag(selectedContact.status)}
//                 </Space>
//               </div>

//               <Divider />

//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <div className="space-y-2">
//                     <Text strong>Email:</Text>
//                     <br />
//                     <Text>{selectedContact.email}</Text>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div className="space-y-2">
//                     <Text strong>Phone:</Text>
//                     <br />
//                     <Text>{selectedContact.phone}</Text>
//                   </div>
//                 </Col>
//                 <Col span={24}>
//                   <div className="space-y-2">
//                     <Text strong>Address:</Text>
//                     <br />
//                     <Text>{selectedContact.address || 'No address provided'}</Text>
//                   </div>
//                 </Col>
//                 {selectedContact.membershipId && (
//                   <Col span={12}>
//                     <div className="space-y-2">
//                       <Text strong>Membership ID:</Text>
//                       <br />
//                       <Text>{selectedContact.membershipId}</Text>
//                     </div>
//                   </Col>
//                 )}
//                 {selectedContact.department && (
//                   <Col span={12}>
//                     <div className="space-y-2">
//                       <Text strong>Department:</Text>
//                       <br />
//                       <Text>{selectedContact.department}</Text>
//                     </div>
//                   </Col>
//                 )}
//               </Row>

//               {selectedContact.notes && (
//                 <>
//                   <Divider />
//                   <div className="space-y-2">
//                     <Text strong>Notes:</Text>
//                     <br />
//                     <Text>{selectedContact.notes}</Text>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default Contact;





/////////////////////FINAL////////////////////////


// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   Row,
//   Col,
//   Input,
//   Button,
//   Space,
//   Avatar,
//   Typography,
//   Tag,
//   Modal,
//   Form,
//   Select,
//   message,
//   Divider,
//   Dropdown,
//   Badge,
//   Tabs,
//   Table,
//   Statistic,
//   Progress,
//   Upload,
//   DatePicker,
//   Tooltip
// } from 'antd';
// import {
//   ContactsOutlined,
//   SearchOutlined,
//   UserOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   PlusOutlined,
//   MoreOutlined,
//   TeamOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   GlobalOutlined,
//   ImportOutlined,
//   ExportOutlined,
//   SyncOutlined,
//   FilterOutlined,
//   WhatsAppOutlined,
//   MessageOutlined,
//   VideoCameraOutlined
// } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchContacts,
//   fetchContactDetails,
//   addContact,
//   updateContact,
//   syncGlobalContacts,
//   setFilters,
//   clearFilters
// } from '../slices/contactSlice';
// import { apiService } from '../../services/apiService';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TabPane } = Tabs;

// const Contact = () => {
//   const dispatch = useDispatch();
//   const {
//     items: contacts,
//     currentContact,
//     globalContacts,
//     loading,
//     error,
//     pagination,
//     filters
//   } = useSelector((state) => state.contacts);

//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [importModalVisible, setImportModalVisible] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [activeTab, setActiveTab] = useState('local');
//   const [form] = Form.useForm();

//   useEffect(() => {
//     loadContacts();
//   }, [filters, activeTab]);

//   useEffect(() => {
//     if (error) {
//       message.error(error.message || 'Something went wrong');
//     }
//   }, [error]);

//   const loadContacts = () => {
//     if (activeTab === 'local') {
//       dispatch(fetchContacts(filters));
//     } else {
//       dispatch(syncGlobalContacts({
//         countries: filters.country ? [filters.country] : [],
//         roles: filters.role ? [filters.role] : []
//       }));
//     }
//   };

//   const handleSearch = (value) => {
//     dispatch(setFilters({ search: value }));
//   };

//   const handleRoleFilter = (value) => {
//     dispatch(setFilters({ role: value }));
//   };

//   const handleStatusFilter = (value) => {
//     dispatch(setFilters({ status: value }));
//   };

//   const handleCountryFilter = (value) => {
//     dispatch(setFilters({ country: value }));
//   };

//   const handleAddContact = async (values) => {
//     try {
//       await dispatch(addContact(values)).unwrap();
//       message.success('Contact added successfully');
//       setModalVisible(false);
//       form.resetFields();
//     } catch (error) {
//       message.error('Failed to add contact');
//     }
//   };

//   const handleContactClick = async (contact) => {
//     try {
//       await dispatch(fetchContactDetails(contact._id)).unwrap();
//       setSelectedContact(contact);
//       setDetailModalVisible(true);
//     } catch (error) {
//       message.error('Failed to load contact details');
//     }
//   };

//   const handleImportContacts = async (file) => {
//     // Implement CSV/Excel import logic
//     console.log('Importing contacts from:', file);
//   };

//   const getRoleTag = (role) => {
//     const roleColors = {
//       SuperAdmin: 'red',
//       Admin: 'volcano',
//       HR: 'orange',
//       Manager: 'gold',
//       President: 'magenta',
//       VicePresident: 'purple',
//       Secretary: 'cyan',
//       Treasurer: 'blue',
//       ExecutiveMember: 'geekblue',
//       Member: 'green',
//       PlotOwner: 'lime',
//       Employee: 'gray'
//     };

//     const color = roleColors[role] || 'default';
//     return (
//       <Tag color={color} style={{ textTransform: 'capitalize' }}>
//         {role?.replace(/([A-Z])/g, ' $1').trim()}
//       </Tag>
//     );
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: { color: 'green', text: 'Active' },
//       inactive: { color: 'red', text: 'Inactive' },
//       suspended: { color: 'orange', text: 'Suspended' },
//       pending: { color: 'blue', text: 'Pending' }
//     };

//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   const contactActions = [
//     {
//       key: 'whatsapp',
//       icon: <WhatsAppOutlined />,
//       label: 'WhatsApp',
//       color: '#25D366'
//     },
//     {
//       key: 'sms',
//       icon: <MessageOutlined />,
//       label: 'SMS',
//       color: '#1890ff'
//     },
//     {
//       key: 'call',
//       icon: <PhoneOutlined />,
//       label: 'Call',
//       color: '#52c41a'
//     },
//     {
//       key: 'video',
//       icon: <VideoCameraOutlined />,
//       label: 'Video Call',
//       color: '#eb2f96'
//     }
//   ];

//   const columns = [
//     {
//       title: 'Contact',
//       dataIndex: 'firstName',
//       key: 'name',
//       render: (text, record) => (
//         <Space>
//           <Avatar src={record.profilePhoto} icon={<UserOutlined />} />
//           <div>
//             <Text strong>{`${record.firstName} ${record.lastName}`}</Text>
//             <br />
//             <Text type="secondary">{record.email}</Text>
//           </div>
//         </Space>
//       )
//     },
//     {
//       title: 'Phone',
//       dataIndex: 'phones',
//       key: 'phone',
//       render: (phones) => (
//         phones?.find(p => p.isPrimary) ? 
//           `${phones.find(p => p.isPrimary).countryCode}${phones.find(p => p.isPrimary).number}` 
//           : 'N/A'
//       )
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       render: (role) => getRoleTag(role)
//     },
//     {
//       title: 'Status',
//       dataIndex: 'membershipStatus',
//       key: 'status',
//       render: (status) => getStatusTag(status)
//     },
//     {
//       title: 'Country',
//       dataIndex: 'address',
//       key: 'country',
//       render: (address) => address?.country || 'N/A'
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="View Details">
//             <Button 
//               icon={<EyeOutlined />}
//               onClick={() => handleContactClick(record)}
//             />
//           </Tooltip>
//           <Dropdown
//             menu={{
//               items: contactActions.map(action => ({
//                 key: action.key,
//                 icon: action.icon,
//                 label: action.label,
//                 style: { color: action.color }
//               }))
//             }}
//           >
//             <Button icon={<MoreOutlined />} />
//           </Dropdown>
//         </Space>
//       )
//     }
//   ];

//   return (
//     <div className="min-h-screen p-6">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header with Stats */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <ContactsOutlined className="mr-3" />
//               Contact Management
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage local and global contacts with advanced communication tools
//             </Text>
//           </div>
          
//           <Space>
//             <Button 
//               icon={<ImportOutlined />}
//               onClick={() => setImportModalVisible(true)}
//             >
//               Import
//             </Button>
//             <Button icon={<ExportOutlined />}>
//               Export
//             </Button>
//             <Button 
//               type="primary" 
//               icon={<PlusOutlined />}
//               onClick={() => setModalVisible(true)}
//             >
//               Add Contact
//             </Button>
//           </Space>
//         </div>

//         {/* Quick Stats */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={12} sm={6}>
//             <Card size="small">
//               <Statistic title="Total Contacts" value={pagination.total} prefix={<TeamOutlined />} />
//             </Card>
//           </Col>
//           <Col xs={12} sm={6}>
//             <Card size="small">
//               <Statistic title="Active" value={contacts.filter(c => c.membershipStatus === 'active').length} />
//             </Card>
//           </Col>
//           <Col xs={12} sm={6}>
//             <Card size="small">
//               <Statistic title="Verified Phones" value={contacts.filter(c => c.phones?.some(p => p.verified)).length} />
//             </Card>
//           </Col>
//           <Col xs={12} sm={6}>
//             <Card size="small">
//               <Statistic title="Countries" value={new Set(contacts.map(c => c.address?.country)).size} />
//             </Card>
//           </Col>
//         </Row>

//         {/* Tabs and Filters */}
//         <Tabs 
//           activeKey={activeTab} 
//           onChange={setActiveTab}
//           tabBarExtraContent={
//             <Space>
//               <Input
//                 placeholder="Search contacts..."
//                 prefix={<SearchOutlined />}
//                 value={filters.search}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 style={{ width: 250 }}
//                 allowClear
//               />
//               <Select
//                 placeholder="Role"
//                 value={filters.role}
//                 onChange={handleRoleFilter}
//                 style={{ width: 120 }}
//                 allowClear
//               >
//                 <Option value="Member">Member</Option>
//                 <Option value="Admin">Admin</Option>
//                 <Option value="Employee">Employee</Option>
//                 <Option value="PlotOwner">Plot Owner</Option>
//               </Select>
//               <Select
//                 placeholder="Country"
//                 value={filters.country}
//                 onChange={handleCountryFilter}
//                 style={{ width: 120 }}
//                 allowClear
//               >
//                 <Option value="Bangladesh">Bangladesh</Option>
//                 <Option value="USA">USA</Option>
//                 <Option value="UK">UK</Option>
//                 <Option value="Canada">Canada</Option>
//               </Select>
//               <Button 
//                 icon={<SyncOutlined />} 
//                 onClick={loadContacts}
//                 loading={loading}
//               >
//                 Refresh
//               </Button>
//             </Space>
//           }
//         >
//           <TabPane tab="Local Contacts" key="local">
//             <Table
//               columns={columns}
//               dataSource={contacts}
//               loading={loading}
//               pagination={{
//                 current: pagination.page,
//                 pageSize: pagination.limit,
//                 total: pagination.total,
//                 showSizeChanger: true,
//                 showQuickJumper: true
//               }}
//               rowKey="_id"
//             />
//           </TabPane>
          
//           <TabPane tab="Global Contacts" key="global">
//             <Table
//               columns={columns}
//               dataSource={globalContacts}
//               loading={loading}
//               pagination={false}
//               rowKey="_id"
//             />
//           </TabPane>
//         </Tabs>

//         {/* Add Contact Modal */}
//         <Modal
//           title="Add New Contact"
//           open={modalVisible}
//           onCancel={() => {
//             setModalVisible(false);
//             form.resetFields();
//           }}
//           footer={null}
//           width={700}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleAddContact}
//           >
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="First Name"
//                   name="firstName"
//                   rules={[{ required: true, message: 'Please enter first name' }]}
//                 >
//                   <Input placeholder="Enter first name" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Last Name"
//                   name="lastName"
//                   rules={[{ required: true, message: 'Please enter last name' }]}
//                 >
//                   <Input placeholder="Enter last name" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Email"
//                   name="email"
//                   rules={[
//                     { required: true, message: 'Please enter email' },
//                     { type: 'email', message: 'Please enter valid email' }
//                   ]}
//                 >
//                   <Input placeholder="Enter email address" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Phone"
//                   name="phone"
//                   rules={[{ required: true, message: 'Please enter phone number' }]}
//                 >
//                   <Input placeholder="Enter phone number" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Role"
//                   name="role"
//                   rules={[{ required: true, message: 'Please select role' }]}
//                 >
//                   <Select placeholder="Select role">
//                     <Option value="Member">Member</Option>
//                     <Option value="Admin">Admin</Option>
//                     <Option value="Employee">Employee</Option>
//                     <Option value="PlotOwner">Plot Owner</Option>
//                     <Option value="HR">HR</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Country"
//                   name="country"
//                 >
//                   <Select placeholder="Select country" showSearch>
//                     <Option value="Bangladesh">Bangladesh</Option>
//                     <Option value="USA">United States</Option>
//                     <Option value="UK">United Kingdom</Option>
//                     <Option value="Canada">Canada</Option>
//                     <Option value="Australia">Australia</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>
//             <div className="text-right">
//               <Space>
//                 <Button onClick={() => setModalVisible(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit" loading={loading}>
//                   Add Contact
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Modal>

//         {/* Contact Detail Modal */}
//         <Modal
//           title="Contact Details"
//           open={detailModalVisible}
//           onCancel={() => setDetailModalVisible(false)}
//           footer={[
//             <Button key="close" onClick={() => setDetailModalVisible(false)}>
//               Close
//             </Button>,
//             <Button key="edit" type="primary" icon={<EditOutlined />}>
//               Edit Contact
//             </Button>,
//           ]}
//           width={700}
//         >
//           {currentContact && (
//             <div className="space-y-6">
//               <div className="text-center">
//                 <Avatar 
//                   size={100} 
//                   src={currentContact.profilePhoto} 
//                   icon={<UserOutlined />}
//                   className="mb-4"
//                 />
//                 <Title level={3}>
//                   {`${currentContact.firstName} ${currentContact.lastName}`}
//                 </Title>
//                 <Space>
//                   {getRoleTag(currentContact.role)}
//                   {getStatusTag(currentContact.membershipStatus)}
//                 </Space>
//               </div>

//               <Divider />

//               <Row gutter={[24, 16]}>
//                 <Col span={12}>
//                   <div className="space-y-2">
//                     <Text strong>Email:</Text>
//                     <br />
//                     <Text>{currentContact.email}</Text>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div className="space-y-2">
//                     <Text strong>Membership ID:</Text>
//                     <br />
//                     <Text>{currentContact.membershipId || 'N/A'}</Text>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div className="space-y-2">
//                     <Text strong>Phone Numbers:</Text>
//                     <br />
//                     {currentContact.phones?.map((phone, index) => (
//                       <div key={index} className="flex items-center gap-2 mb-1">
//                         <PhoneOutlined />
//                         <Text>
//                           {phone.countryCode}{phone.number} 
//                           {phone.isPrimary && <Tag color="blue" className="ml-2">Primary</Tag>}
//                           {phone.verified && <Tag color="green" className="ml-1">Verified</Tag>}
//                         </Text>
//                       </div>
//                     )) || 'No phone numbers'}
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div className="space-y-2">
//                     <Text strong>Contact Preferences:</Text>
//                     <br />
//                     {currentContact.contactPreferences && (
//                       <Space direction="vertical" size="small">
//                         <Text>Preferred: {currentContact.contactPreferences.preferredContactMethod}</Text>
//                         <Text>SMS: {currentContact.contactPreferences.smsEnabled ? 'Enabled' : 'Disabled'}</Text>
//                         <Text>Email: {currentContact.contactPreferences.emailEnabled ? 'Enabled' : 'Disabled'}</Text>
//                         <Text>Calls: {currentContact.contactPreferences.callEnabled ? 'Enabled' : 'Disabled'}</Text>
//                       </Space>
//                     )}
//                   </div>
//                 </Col>
//                 {currentContact.address && (
//                   <Col span={24}>
//                     <div className="space-y-2">
//                       <Text strong>Address:</Text>
//                       <br />
//                       <Text>
//                         {[
//                           currentContact.address.street,
//                           currentContact.address.city,
//                           currentContact.address.state,
//                           currentContact.address.country,
//                           currentContact.address.postalCode
//                         ].filter(Boolean).join(', ')}
//                       </Text>
//                     </div>
//                   </Col>
//                 )}
//               </Row>

//               <Divider />

//               {/* Communication Actions */}
//               <div className="text-center">
//                 <Title level={5}>Quick Actions</Title>
//                 <Space size="large" className="mt-4">
//                   {contactActions.map(action => (
//                     <Tooltip key={action.key} title={action.label}>
//                       <Button 
//                         type="primary" 
//                         shape="circle" 
//                         size="large"
//                         icon={action.icon}
//                         style={{ backgroundColor: action.color, borderColor: action.color }}
//                         onClick={() => {
//                           // Implement communication action
//                           message.info(`Initiating ${action.label}...`);
//                         }}
//                       />
//                     </Tooltip>
//                   ))}
//                 </Space>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default Contact;


///////////////Correct version//////////////////////

import React, { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Button,
  Space,
  Avatar,
  Typography,
  Tag,
  Modal,
  Form,
  Select,
  message,
  Row,
  Col,
  Divider,
  Dropdown,
  Badge,
} from 'antd';
import {
  ContactsOutlined,
  SearchOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  MoreOutlined,
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { apiService } from '../../services/apiService';

const { Title, Text } = Typography;
const { Option } = Select;

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContacts();
  }, [searchText, filterRole]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await apiService.contact.getContacts({
        search: searchText,
        role: filterRole
      });
      setContacts(response.data.data || []);
    } catch (error) {
      message.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (values) => {
    try {
      const response = await apiService.contact.createContact(values);
      if (response.data.success) {
        message.success('Contact added successfully');
        setModalVisible(false);
        form.resetFields();
        fetchContacts();
      }
    } catch (error) {
      message.error('Failed to add contact');
    }
  };

  const handleContactClick = async (contact) => {
    try {
      const response = await apiService.contact.getContactDetails(contact._id);
      setSelectedContact(response.data.data);
    } catch (error) {
      message.error('Failed to load contact details');
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await apiService.contact.deleteContact(contactId);
      message.success('Contact deleted successfully');
      fetchContacts();
    } catch (error) {
      message.error('Failed to delete contact');
    }
  };

  const getRoleTag = (role) => {
    const roleColors = {
      SuperAdmin: 'red',
      Admin: 'volcano',
      HR: 'orange',
      Manager: 'gold',
      President: 'magenta',
      Member: 'green',
      PlotOwner: 'lime',
      Employee: 'gray'
    };
    const color = roleColors[role] || 'blue';
    return <Tag color={color}>{role}</Tag>;
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      active: { color: 'green', text: 'Active' },
      inactive: { color: 'red', text: 'Inactive' },
      pending: { color: 'orange', text: 'Pending' },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPrimaryPhone = (contact) => {
    if (!contact.phones || contact.phones.length === 0) return 'No phone';
    const primaryPhone = contact.phones.find(phone => phone.isPrimary) || contact.phones[0];
    return `${primaryPhone.countryCode || ''}${primaryPhone.number}`;
  };

  const dropdownMenuItems = (contact) => [
    { 
      key: 'view', 
      icon: <EyeOutlined />, 
      label: 'View Details',
      onClick: () => handleContactClick(contact)
    },
    { type: 'divider' },
    { 
      key: 'delete', 
      icon: <DeleteOutlined />, 
      label: 'Delete', 
      danger: true,
      onClick: () => handleDeleteContact(contact._id)
    },
  ];

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <ContactsOutlined className="mr-3" />
              Contacts
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Manage member contacts and information
            </Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Add Contact
          </Button>
        </div>

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search contacts..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Filter by Role"
              style={{ width: '100%' }}
              allowClear
              value={filterRole}
              onChange={setFilterRole}
            >
              <Option value="Member">Member</Option>
              <Option value="Admin">Admin</Option>
              <Option value="Employee">Employee</Option>
              <Option value="PlotOwner">Plot Owner</Option>
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {contacts.map((contact) => (
            <Col xs={24} sm={12} md={8} lg={6} key={contact._id}>
              <Card 
                className={`text-center hover:shadow-lg transition-shadow cursor-pointer ${cardClass}`}
                onClick={() => handleContactClick(contact)}
              >
                <Badge dot status={contact.isActive ? 'success' : 'error'}>
                  <Avatar 
                    size={64} 
                    src={contact.profilePhoto} 
                    icon={<UserOutlined />}
                    className="mb-3 mx-auto"
                  />
                </Badge>
                
                <Title level={4} className="mb-2">
                  {`${contact.firstName} ${contact.lastName}`}
                </Title>
                
                <div className="mb-3">
                  {getRoleTag(contact.role)}
                  {getStatusTag(contact.membershipStatus)}
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex items-center text-gray-600">
                    <MailOutlined className="mr-2" />
                    <Text className="text-sm truncate">{contact.email}</Text>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <PhoneOutlined className="mr-2" />
                    <Text className="text-sm">{getPrimaryPhone(contact)}</Text>
                  </div>
                </div>

                <Divider className="my-3" />

                <div className="flex justify-center space-x-2">
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactClick(contact);
                    }}
                  />
                  <Dropdown
                    menu={{ items: dropdownMenuItems(contact) }}
                    trigger={['click']}
                  >
                    <Button 
                      type="text" 
                      icon={<MoreOutlined />}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Dropdown>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {contacts.length === 0 && !loading && (
          <div className="text-center py-12">
            <TeamOutlined className="text-4xl text-gray-400 mb-4" />
            <Title level={4} className="text-gray-500">No Contacts Found</Title>
            <Text className="text-gray-400">
              {searchText || filterRole ? 'Try changing your search filters' : 'Get started by adding your first contact'}
            </Text>
          </div>
        )}

        <Modal
          title="Add New Contact"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleAddContact}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter last name' }]}
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter valid email' }
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: 'Please select role' }]}
                >
                  <Select placeholder="Select role">
                    <Option value="Member">Member</Option>
                    <Option value="Admin">Admin</Option>
                    <Option value="Employee">Employee</Option>
                    <Option value="PlotOwner">Plot Owner</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="membershipStatus"
                  initialValue="active"
                >
                  <Select>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                    <Option value="pending">Pending</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right">
              <Space>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit">Add Contact</Button>
              </Space>
            </div>
          </Form>
        </Modal>

        <Modal
          title="Contact Details"
          open={!!selectedContact}
          onCancel={() => setSelectedContact(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedContact(null)}>Close</Button>,
          ]}
          width={600}
        >
          {selectedContact && (
            <div className="space-y-4">
              <div className="text-center">
                <Avatar 
                  size={80} 
                  src={selectedContact.profilePhoto} 
                  icon={<UserOutlined />}
                  className="mb-3"
                />
                <Title level={3}>
                  {`${selectedContact.firstName} ${selectedContact.lastName}`}
                </Title>
                <Space>
                  {getRoleTag(selectedContact.role)}
                  {getStatusTag(selectedContact.membershipStatus)}
                </Space>
              </div>

              <Divider />

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Email:</Text>
                  <br />
                  <Text>{selectedContact.email}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Phone:</Text>
                  <br />
                  <Text>{getPrimaryPhone(selectedContact)}</Text>
                </Col>
                {selectedContact.membershipId && (
                  <Col span={24}>
                    <Text strong>Membership ID:</Text>
                    <br />
                    <Text>{selectedContact.membershipId}</Text>
                  </Col>
                )}
              </Row>
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default Contact;
