// // components/admin/UserManagement.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   Card,
//   Button,
//   Space,
//   Tag,
//   Input,
//   Select,
//   Modal,
//   Form,
//   message,
//   Popconfirm,
//   Tooltip,
//   Avatar,
//   Badge,
//   Row,
//   Col,
//   Typography,
//   Divider,
//   Switch
// } from 'antd';
// import {
//   UserOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   TeamOutlined,
//   FilterOutlined,
//   ReloadOutlined,
//   LockOutlined,
//   UnlockOutlined
// } from '@ant-design/icons';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;

// /**
//  * User Management Component
//  * Admin interface for managing all users in the system
//  */
// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//     total: 0
//   });
//   const [filters, setFilters] = useState({
//     search: '',
//     role: '',
//     status: '',
//     emailVerified: ''
//   });
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchUsers();
//   }, [pagination.current, pagination.pageSize]);

//   useEffect(() => {
//     filterUsers();
//   }, [users, filters]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/admin/users', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           page: pagination.current,
//           limit: pagination.pageSize
//         }
//       });

//       if (response.data.success) {
//         setUsers(response.data.data.users || []);
//         setPagination(prev => ({
//           ...prev,
//           total: response.data.data.totalCount || 0
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       message.error('Failed to fetch users');
//       // Mock data for demonstration
//       const mockUsers = [
//         {
//           id: 1,
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john.doe@association.com',
//           telephone: '+1 234 567 8900',
//           role: 'admin',
//           status: 'active',
//           emailVerified: true,
//           createdAt: '2023-01-15T00:00:00.000Z',
//           lastLogin: '2024-01-20T10:30:00.000Z',
//           profilePhoto: null
//         },
//         {
//           id: 2,
//           firstName: 'Sarah',
//           lastName: 'Wilson',
//           email: 'sarah.wilson@association.com',
//           telephone: '+1 234 567 8901',
//           role: 'hr',
//           status: 'active',
//           emailVerified: true,
//           createdAt: '2023-03-20T00:00:00.000Z',
//           lastLogin: '2024-01-19T14:20:00.000Z',
//           profilePhoto: null
//         },
//         {
//           id: 3,
//           firstName: 'Mike',
//           lastName: 'Johnson',
//           email: 'mike.johnson@association.com',
//           telephone: '+1 234 567 8902',
//           role: 'employee',
//           status: 'inactive',
//           emailVerified: true,
//           createdAt: '2023-05-10T00:00:00.000Z',
//           lastLogin: '2024-01-15T09:15:00.000Z',
//           profilePhoto: null
//         },
//         {
//           id: 4,
//           firstName: 'Emily',
//           lastName: 'Brown',
//           email: 'emily.brown@gmail.com',
//           telephone: '+1 234 567 8903',
//           role: 'member',
//           status: 'active',
//           emailVerified: false,
//           createdAt: '2024-01-10T00:00:00.000Z',
//           lastLogin: null,
//           profilePhoto: null
//         }
//       ];
//       setUsers(mockUsers);
//       setPagination(prev => ({ ...prev, total: mockUsers.length }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterUsers = () => {
//     let filtered = [...users];

//     // Search filter
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       filtered = filtered.filter(user =>
//         user.firstName.toLowerCase().includes(searchLower) ||
//         user.lastName.toLowerCase().includes(searchLower) ||
//         user.email.toLowerCase().includes(searchLower) ||
//         user.role.toLowerCase().includes(searchLower)
//       );
//     }

//     // Role filter
//     if (filters.role) {
//       filtered = filtered.filter(user => user.role === filters.role);
//     }

//     // Status filter
//     if (filters.status) {
//       filtered = filtered.filter(user => user.status === filters.status);
//     }

//     // Email verified filter
//     if (filters.emailVerified !== '') {
//       filtered = filtered.filter(user => user.emailVerified === (filters.emailVerified === 'true'));
//     }

//     setFilteredUsers(filtered);
//   };

//   const handleTableChange = (newPagination) => {
//     setPagination(newPagination);
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     form.setFieldsValue({
//       ...user,
//       // Format dates if needed
//     });
//     setIsModalVisible(true);
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3000/api/v1/admin/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       message.success('User deleted successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       message.error('Failed to delete user');
//     }
//   };

//   const handleToggleStatus = async (userId, currentStatus) => {
//     try {
//       const token = localStorage.getItem('token');
//       const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
//       await axios.patch(
//         `http://localhost:3000/api/v1/admin/users/${userId}/status`,
//         { status: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       message.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating user status:', error);
//       message.error('Failed to update user status');
//     }
//   };

//   const handleModalOk = async () => {
//     try {
//       const values = await form.validateFields();
//       const token = localStorage.getItem('token');

//       if (selectedUser) {
//         // Update existing user
//         await axios.put(`http://localhost:3000/api/v1/admin/users/${selectedUser.id}`, values, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         message.success('User updated successfully');
//       } else {
//         // Create new user
//         await axios.post('http://localhost:3000/api/v1/admin/users', values, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         message.success('User created successfully');
//       }

//       setIsModalVisible(false);
//       form.resetFields();
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error saving user:', error);
//       message.error('Failed to save user');
//     }
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//     setSelectedUser(null);
//   };

//   const getRoleTag = (role) => {
//     const roleConfig = {
//       admin: { color: 'red', text: 'ADMIN' },
//       hr: { color: 'blue', text: 'HR' },
//       employee: { color: 'green', text: 'EMPLOYEE' },
//       member: { color: 'orange', text: 'MEMBER' }
//     };
//     const config = roleConfig[role] || { color: 'default', text: role };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: { color: 'green', text: 'ACTIVE' },
//       inactive: { color: 'red', text: 'INACTIVE' },
//       pending: { color: 'orange', text: 'PENDING' }
//     };
//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'firstName',
//       key: 'user',
//       render: (text, record) => (
//         <Space>
//           <Avatar 
//             size="small" 
//             src={record.profilePhoto}
//             icon={<UserOutlined />}
//           />
//           <div>
//             <div className="font-medium">{record.firstName} {record.lastName}</div>
//             <div className="text-xs text-gray-500">{record.email}</div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Contact',
//       dataIndex: 'telephone',
//       key: 'contact',
//       render: (telephone, record) => (
//         <div>
//           <div className="flex items-center text-sm">
//             <PhoneOutlined className="mr-1 text-gray-400" />
//             {telephone || 'N/A'}
//           </div>
//           <div className="flex items-center text-xs text-gray-500">
//             <MailOutlined className="mr-1" />
//             {record.emailVerified ? 'Verified' : 'Not Verified'}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       render: (role) => getRoleTag(role),
//       filters: [
//         { text: 'Admin', value: 'admin' },
//         { text: 'HR', value: 'hr' },
//         { text: 'Employee', value: 'employee' },
//         { text: 'Member', value: 'member' },
//       ],
//       onFilter: (value, record) => record.role === value,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status, record) => (
//         <Space>
//           {getStatusTag(status)}
//           <Switch
//             size="small"
//             checked={status === 'active'}
//             onChange={() => handleToggleStatus(record.id, status)}
//             checkedChildren={<UnlockOutlined />}
//             unCheckedChildren={<LockOutlined />}
//           />
//         </Space>
//       ),
//       filters: [
//         { text: 'Active', value: 'active' },
//         { text: 'Inactive', value: 'inactive' },
//       ],
//       onFilter: (value, record) => record.status === value,
//     },
//     {
//       title: 'Joined',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => dayjs(date).format('MMM D, YYYY'),
//       sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
//     },
//     {
//       title: 'Last Login',
//       dataIndex: 'lastLogin',
//       key: 'lastLogin',
//       render: (date) => date ? dayjs(date).format('MMM D, YYYY HH:mm') : 'Never',
//       sorter: (a, b) => {
//         if (!a.lastLogin) return 1;
//         if (!b.lastLogin) return -1;
//         return dayjs(a.lastLogin).unix() - dayjs(b.lastLogin).unix();
//       },
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       fixed: 'right',
//       width: 150,
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button 
//               type="link" 
//               icon={<EyeOutlined />} 
//               onClick={() => handleViewUser(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit">
//             <Button 
//               type="link" 
//               icon={<EditOutlined />} 
//               onClick={() => handleEditUser(record)}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Are you sure to delete this user?"
//             description="This action cannot be undone."
//             onConfirm={() => handleDeleteUser(record.id)}
//             okText="Yes"
//             cancelText="No"
//             okType="danger"
//           >
//             <Tooltip title="Delete">
//               <Button type="link" danger icon={<DeleteOutlined />} />
//             </Tooltip>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   const handleViewUser = (user) => {
//     Modal.info({
//       title: 'User Details',
//       width: 600,
//       content: (
//         <div className="space-y-4">
//           <Row gutter={16}>
//             <Col span={12}>
//               <Text strong>Full Name:</Text>
//               <div>{user.firstName} {user.lastName}</div>
//             </Col>
//             <Col span={12}>
//               <Text strong>Email:</Text>
//               <div>{user.email}</div>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Text strong>Phone:</Text>
//               <div>{user.telephone || 'N/A'}</div>
//             </Col>
//             <Col span={12}>
//               <Text strong>Role:</Text>
//               <div>{getRoleTag(user.role)}</div>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Text strong>Status:</Text>
//               <div>{getStatusTag(user.status)}</div>
//             </Col>
//             <Col span={12}>
//               <Text strong>Email Verified:</Text>
//               <div>
//                 <Badge 
//                   status={user.emailVerified ? 'success' : 'error'} 
//                   text={user.emailVerified ? 'Verified' : 'Not Verified'} 
//                 />
//               </div>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Text strong>Member Since:</Text>
//               <div>{dayjs(user.createdAt).format('MMM D, YYYY')}</div>
//             </Col>
//             <Col span={12}>
//               <Text strong>Last Login:</Text>
//               <div>{user.lastLogin ? dayjs(user.lastLogin).format('MMM D, YYYY HH:mm') : 'Never'}</div>
//             </Col>
//           </Row>
//         </div>
//       ),
//       onOk() {},
//     });
//   };

//   const userStats = {
//     total: users.length,
//     active: users.filter(user => user.status === 'active').length,
//     inactive: users.filter(user => user.status === 'inactive').length,
//     admins: users.filter(user => user.role === 'admin').length,
//     pending: users.filter(user => !user.emailVerified).length
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <Title level={2} className="!mb-2">
//             <TeamOutlined className="text-blue-500 mr-3" />
//             User Management
//           </Title>
//           <Text className="text-gray-600">
//             Manage all users and their permissions in the system
//           </Text>
//         </div>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           size="large"
//           onClick={() => {
//             setSelectedUser(null);
//             form.resetFields();
//             setIsModalVisible(true);
//           }}
//           className="mt-4 sm:mt-0"
//         >
//           Add User
//         </Button>
//       </div>

//       {/* Statistics */}
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={6}>
//           <Card className="text-center border-0 shadow-sm">
//             <Title level={3} className="!text-blue-600 !mb-2">
//               {userStats.total}
//             </Title>
//             <Text className="text-gray-600">Total Users</Text>
//           </Card>
//         </Col>
//         <Col xs={24} sm={6}>
//           <Card className="text-center border-0 shadow-sm">
//             <Title level={3} className="!text-green-600 !mb-2">
//               {userStats.active}
//             </Title>
//             <Text className="text-gray-600">Active</Text>
//           </Card>
//         </Col>
//         <Col xs={24} sm={6}>
//           <Card className="text-center border-0 shadow-sm">
//             <Title level={3} className="!text-red-600 !mb-2">
//               {userStats.admins}
//             </Title>
//             <Text className="text-gray-600">Admins</Text>
//           </Card>
//         </Col>
//         <Col xs={24} sm={6}>
//           <Card className="text-center border-0 shadow-sm">
//             <Title level={3} className="!text-orange-600 !mb-2">
//               {userStats.pending}
//             </Title>
//             <Text className="text-gray-600">Pending Verification</Text>
//           </Card>
//         </Col>
//       </Row>

//       {/* Filters */}
//       <Card className="shadow-sm border-0">
//         <Row gutter={[16, 16]} align="middle">
//           <Col xs={24} sm={8}>
//             <Input
//               placeholder="Search users..."
//               prefix={<SearchOutlined />}
//               value={filters.search}
//               onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//               allowClear
//             />
//           </Col>
//           <Col xs={24} sm={4}>
//             <Select
//               placeholder="Role"
//               style={{ width: '100%' }}
//               value={filters.role}
//               onChange={(value) => setFilters(prev => ({ ...prev, role: value }))}
//               allowClear
//             >
//               <Option value="admin">Admin</Option>
//               <Option value="hr">HR</Option>
//               <Option value="employee">Employee</Option>
//               <Option value="member">Member</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={4}>
//             <Select
//               placeholder="Status"
//               style={{ width: '100%' }}
//               value={filters.status}
//               onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
//               allowClear
//             >
//               <Option value="active">Active</Option>
//               <Option value="inactive">Inactive</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={4}>
//             <Select
//               placeholder="Email Verified"
//               style={{ width: '100%' }}
//               value={filters.emailVerified}
//               onChange={(value) => setFilters(prev => ({ ...prev, emailVerified: value }))}
//               allowClear
//             >
//               <Option value="true">Verified</Option>
//               <Option value="false">Not Verified</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={4}>
//             <Button 
//               icon={<ReloadOutlined />}
//               onClick={() => {
//                 setFilters({ search: '', role: '', status: '', emailVerified: '' });
//                 fetchUsers();
//               }}
//               block
//             >
//               Reset
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       {/* Users Table */}
//       <Card 
//         title={`Users (${filteredUsers.length})`}
//         className="shadow-sm border-0"
//         extra={
//           <Text className="text-gray-500">
//             Showing {filteredUsers.length} of {pagination.total} users
//           </Text>
//         }
//       >
//         <Table
//           columns={columns}
//           dataSource={filteredUsers}
//           rowKey="id"
//           loading={loading}
//           pagination={{
//             current: pagination.current,
//             pageSize: pagination.pageSize,
//             total: pagination.total,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) => 
//               `${range[0]}-${range[1]} of ${total} users`,
//           }}
//           onChange={handleTableChange}
//           scroll={{ x: 1000 }}
//         />
//       </Card>

//       {/* Add/Edit User Modal */}
//       <Modal
//         title={selectedUser ? 'Edit User' : 'Add New User'}
//         open={isModalVisible}
//         onOk={handleModalOk}
//         onCancel={handleModalCancel}
//         width={600}
//         confirmLoading={loading}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           requiredMark={false}
//         >
//           <Row gutter={16}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="firstName"
//                 label="First Name"
//                 rules={[{ required: true, message: 'Please enter first name' }]}
//               >
//                 <Input placeholder="First name" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="lastName"
//                 label="Last Name"
//                 rules={[{ required: true, message: 'Please enter last name' }]}
//               >
//                 <Input placeholder="Last name" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[
//               { required: true, message: 'Please enter email' },
//               { type: 'email', message: 'Please enter valid email' }
//             ]}
//           >
//             <Input placeholder="Email address" />
//           </Form.Item>

//           <Form.Item
//             name="telephone"
//             label="Phone"
//             rules={[{ required: true, message: 'Please enter phone number' }]}
//           >
//             <Input placeholder="Phone number" />
//           </Form.Item>

//           <Form.Item
//             name="role"
//             label="Role"
//             rules={[{ required: true, message: 'Please select role' }]}
//           >
//             <Select placeholder="Select role">
//               <Option value="member">Member</Option>
//               <Option value="employee">Employee</Option>
//               <Option value="hr">HR Manager</Option>
//               <Option value="admin">Administrator</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="status"
//             label="Status"
//             initialValue="active"
//           >
//             <Select>
//               <Option value="active">Active</Option>
//               <Option value="inactive">Inactive</Option>
//             </Select>
//           </Form.Item>

//           {!selectedUser && (
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 { required: true, message: 'Please enter password' },
//                 { min: 6, message: 'Password must be at least 6 characters' }
//               ]}
//             >
//               <Input.Password placeholder="Set initial password" />
//             </Form.Item>
//           )}
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default UserManagement;







// components/admin/UserManagement.jsx2

// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   Table,
//   Button,
//   Space,
//   Tag,
//   Modal,
//   Form,
//   Input,
//   Select,
//   message,
//   Tooltip,
//   Popconfirm,
//   Row,
//   Col,
//   Avatar,
//   Badge,
//   InputNumber
// } from 'antd';
// import {
//   UserOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   SearchOutlined,
//   FilterOutlined,
//   PlusOutlined,
//   ReloadOutlined
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const { Option } = Select;
// const { Search } = Input;

// const UserManagement = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [filters, setFilters] = useState({
//     role: '',
//     status: '',
//     search: ''
//   });
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//     total: 0
//   });
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchUsers();
//   }, [filters, pagination.current]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         page: pagination.current,
//         limit: pagination.pageSize,
//         ...filters
//       });

//       const response = await fetch(`/api/admin/users?${queryParams}`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       const data = await response.json();
      
//       setUsers(data.users || []);
//       setPagination(prev => ({
//         ...prev,
//         total: data.total
//       }));
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       message.error('Failed to load users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateUser = async (values) => {
//     try {
//       const url = editingUser ? 
//         `/api/admin/users/${editingUser._id}` : 
//         '/api/admin/users';
      
//       const method = editingUser ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(values)
//       });

//       if (response.ok) {
//         message.success(editingUser ? 'User updated successfully' : 'User created successfully');
//         setModalVisible(false);
//         form.resetFields();
//         fetchUsers();
//       } else {
//         throw new Error('Failed to update user');
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       const response = await fetch(`/api/admin/users/${userId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });

//       if (response.ok) {
//         message.success('User deleted successfully');
//         fetchUsers();
//       } else {
//         throw new Error('Failed to delete user');
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       'approved': 'green',
//       'waiting': 'orange',
//       'rejected': 'red'
//     };
//     return colors[status] || 'default';
//   };

//   const getRoleColor = (role) => {
//     const colors = {
//       'Admin': 'red',
//       'HR': 'blue',
//       'President': 'green',
//       'Member': 'cyan',
//       'Employee': 'orange',
//       'PlotOwner': 'purple'
//     };
//     return colors[role] || 'default';
//   };

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'firstName',
//       key: 'user',
//       render: (text, record) => (
//         <Space>
//           <Avatar 
//             src={record.profilePhoto} 
//             icon={<UserOutlined />}
//             style={{ backgroundColor: getRoleColor(record.role) }}
//           />
//           <div>
//             <div style={{ fontWeight: 500 }}>
//               {record.firstName} {record.lastName}
//             </div>
//             <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
//               {record.email}
//             </div>
//           </div>
//         </Space>
//       )
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       render: (role) => (
//         <Tag color={getRoleColor(role)}>
//           {role}
//         </Tag>
//       )
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status, record) => (
//         <Space>
//           <Tag color={getStatusColor(status)}>
//             {status?.charAt(0).toUpperCase() + status?.slice(1)}
//           </Tag>
//           {record.isActive ? (
//             <Badge status="success" text="Active" />
//           ) : (
//             <Badge status="default" text="Inactive" />
//           )}
//         </Space>
//       )
//     },
//     {
//       title: 'Membership ID',
//       dataIndex: 'membershipId',
//       key: 'membershipId',
//       render: (id) => id || '-'
//     },
//     {
//       title: 'Join Date',
//       dataIndex: 'dateJoined',
//       key: 'dateJoined',
//       render: (date) => new Date(date).toLocaleDateString()
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 150,
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button 
//               type="link" 
//               icon={<EyeOutlined />}
//               onClick={() => navigate(`/admin/users/${record._id}`)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit User">
//             <Button 
//               type="link" 
//               icon={<EditOutlined />}
//               onClick={() => handleEditUser(record)}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Delete User"
//             description="Are you sure you want to delete this user?"
//             onConfirm={() => handleDeleteUser(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Tooltip title="Delete User">
//               <Button 
//                 type="link" 
//                 danger 
//                 icon={<DeleteOutlined />}
//                 disabled={record.role === 'Admin'} // Prevent deleting admin users
//               />
//             </Tooltip>
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ];

//   const handleEditUser = (user) => {
//     setEditingUser(user);
//     form.setFieldsValue({
//       ...user,
//       // Convert dates if needed
//     });
//     setModalVisible(true);
//   };

//   const handleTableChange = (newPagination) => {
//     setPagination(newPagination);
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setPagination(prev => ({ ...prev, current: 1 }));
//   };

//   return (
//     <div style={{ padding: '24px', background: 'transparent', minHeight: '100vh' }}>
//       <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
//         {/* Header */}
//         <Card
//           title={
//             <Space>
//               <UserOutlined />
//               User Management
//             </Space>
//           }
//           extra={
//             <Space>
//               <Button 
//                 icon={<ReloadOutlined />}
//                 onClick={fetchUsers}
//                 loading={loading}
//               >
//                 Refresh
//               </Button>
//               <Button 
//                 type="primary" 
//                 icon={<PlusOutlined />}
//                 onClick={() => {
//                   setEditingUser(null);
//                   setModalVisible(true);
//                   form.resetFields();
//                 }}
//               >
//                 Add User
//               </Button>
//             </Space>
//           }
//         >
//           {/* Filters */}
//           <Card 
//             size="small" 
//             style={{ marginBottom: '16px' }}
//             title={
//               <Space>
//                 <FilterOutlined />
//                 Filters
//               </Space>
//             }
//           >
//             <Row gutter={[16, 16]} align="middle">
//               <Col xs={24} sm={8} md={6}>
//                 <Search
//                   placeholder="Search users..."
//                   value={filters.search}
//                   onChange={(e) => handleFilterChange('search', e.target.value)}
//                   onSearch={fetchUsers}
//                   allowClear
//                 />
//               </Col>
//               <Col xs={12} sm={8} md={4}>
//                 <Select
//                   placeholder="Role"
//                   value={filters.role}
//                   onChange={(value) => handleFilterChange('role', value)}
//                   style={{ width: '100%' }}
//                   allowClear
//                 >
//                   <Option value="Admin">Admin</Option>
//                   <Option value="HR">HR</Option>
//                   <Option value="Member">Member</Option>
//                   <Option value="Employee">Employee</Option>
//                   <Option value="PlotOwner">Plot Owner</Option>
//                 </Select>
//               </Col>
//               <Col xs={12} sm={8} md={4}>
//                 <Select
//                   placeholder="Status"
//                   value={filters.status}
//                   onChange={(value) => handleFilterChange('status', value)}
//                   style={{ width: '100%' }}
//                   allowClear
//                 >
//                   <Option value="approved">Approved</Option>
//                   <Option value="waiting">Pending</Option>
//                   <Option value="rejected">Rejected</Option>
//                 </Select>
//               </Col>
//             </Row>
//           </Card>

//           {/* Users Table */}
//           <Table
//             columns={columns}
//             dataSource={users}
//             loading={loading}
//             rowKey="_id"
//             pagination={{
//               current: pagination.current,
//               pageSize: pagination.pageSize,
//               total: pagination.total,
//               showSizeChanger: true,
//               showQuickJumper: true,
//               showTotal: (total, range) => 
//                 `${range[0]}-${range[1]} of ${total} users`
//             }}
//             onChange={handleTableChange}
//             scroll={{ x: 800 }}
//           />
//         </Card>

//         {/* User Modal */}
//         <Modal
//           title={editingUser ? "Edit User" : "Create New User"}
//           open={modalVisible}
//           onCancel={() => {
//             setModalVisible(false);
//             setEditingUser(null);
//           }}
//           footer={null}
//           width={600}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleUpdateUser}
//           >
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   name="firstName"
//                   label="First Name"
//                   rules={[{ required: true, message: 'Please enter first name' }]}
//                 >
//                   <Input placeholder="Enter first name" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   name="lastName"
//                   label="Last Name"
//                   rules={[{ required: true, message: 'Please enter last name' }]}
//                 >
//                   <Input placeholder="Enter last name" />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[
//                 { required: true, message: 'Please enter email' },
//                 { type: 'email', message: 'Please enter valid email' }
//               ]}
//             >
//               <Input placeholder="Enter email" />
//             </Form.Item>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   name="role"
//                   label="Role"
//                   rules={[{ required: true, message: 'Please select role' }]}
//                 >
//                   <Select placeholder="Select role">
//                     <Option value="Admin">Admin</Option>
//                     <Option value="HR">HR</Option>
//                     <Option value="Member">Member</Option>
//                     <Option value="Employee">Employee</Option>
//                     <Option value="PlotOwner">Plot Owner</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   name="status"
//                   label="Status"
//                   rules={[{ required: true, message: 'Please select status' }]}
//                 >
//                   <Select placeholder="Select status">
//                     <Option value="approved">Approved</Option>
//                     <Option value="waiting">Pending</Option>
//                     <Option value="rejected">Rejected</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   name="phone"
//                   label="Phone"
//                 >
//                   <Input placeholder="Enter phone number" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   name="isActive"
//                   label="Active Status"
//                   valuePropName="checked"
//                 >
//                   <Select placeholder="Select status">
//                     <Option value={true}>Active</Option>
//                     <Option value={false}>Inactive</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item>
//               <Space>
//                 <Button type="primary" htmlType="submit">
//                   {editingUser ? 'Update User' : 'Create User'}
//                 </Button>
//                 <Button onClick={() => {
//                   setModalVisible(false);
//                   setEditingUser(null);
//                 }}>
//                   Cancel
//                 </Button>
//               </Space>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;





//////////////FINAL////////////////

import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tooltip,
  Popconfirm,
  Row,
  Col,
  Avatar,
  Badge
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [form] = Form.useForm();

  // Available roles from your backend
  const availableRoles = [
    "President", "ExecutivePresident", "VicePresident", 
    "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
    "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
    "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
    "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
    "ExecutiveMember", "Member", "PlotOwner", "Employee", "Admin", "HR"
  ];

  useEffect(() => {
    fetchUsers();
  }, [filters, pagination.current]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: pagination.current,
        limit: pagination.pageSize,
        ...filters
      });

      const response = await fetch(`http://localhost:3000/api/v1/admin/users?${queryParams}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users || []);
        setPagination(prev => ({
          ...prev,
          total: data.pagination?.total || data.users?.length || 0
        }));
      } else {
        throw new Error(data.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error(error.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const url = editingUser ? 
        `http://localhost:3000/api/v1/admin/users/${editingUser._id}/role` : 
        'http://localhost:3000/api/v1/admin/users';
      
      const method = editingUser ? 'PUT' : 'POST';

      const payload = editingUser ? 
        { role: values.role } : // For existing user, only update role
        values; // For new user, send all data

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        message.success(editingUser ? 'User updated successfully' : 'User created successfully');
        setModalVisible(false);
        form.resetFields();
        setEditingUser(null);
        fetchUsers(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Update user error:', error);
      message.error(error.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        message.success('User deleted successfully');
        fetchUsers();
      } else {
        throw new Error(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      message.error(error.message || 'Failed to delete user');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'approved': 'green',
      'waiting': 'orange',
      'rejected': 'red'
    };
    return colors[status] || 'default';
  };

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'red',
      'HR': 'blue',
      'President': 'green',
      'Member': 'cyan',
      'Employee': 'orange',
      'PlotOwner': 'purple'
    };
    return colors[role] || 'default';
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'firstName',
      key: 'user',
      render: (text, record) => (
        <Space>
          <Avatar 
            src={record.profilePhoto} 
            icon={<UserOutlined />}
            style={{ backgroundColor: getRoleColor(record.role) }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>
              {record.firstName} {record.lastName}
            </div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
              {record.email}
            </div>
          </div>
        </Space>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {role}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Space>
          <Tag color={getStatusColor(status)}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </Tag>
          {record.isActive ? (
            <Badge status="success" text="Active" />
          ) : (
            <Badge status="default" text="Inactive" />
          )}
        </Space>
      )
    },
    {
      title: 'Membership ID',
      dataIndex: 'membershipId',
      key: 'membershipId',
      render: (id) => id || '-'
    },
    {
      title: 'Join Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => date ? new Date(date).toLocaleDateString() : '-'
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit User">
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEditUser(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            disabled={record.role === 'Admin'}
          >
            <Tooltip title={record.role === 'Admin' ? "Cannot delete Admin" : "Delete User"}>
              <Button 
                type="link" 
                danger 
                icon={<DeleteOutlined />}
                disabled={record.role === 'Admin'}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleEditUser = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      role: user.role,
      isActive: user.isActive
    });
    setModalVisible(true);
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  return (
    <div style={{ padding: '24px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Card
          title={
            <Space>
              <UserOutlined />
              User Management
            </Space>
          }
          extra={
            <Space>
              <Button 
                icon={<ReloadOutlined />}
                onClick={fetchUsers}
                loading={loading}
              >
                Refresh
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingUser(null);
                  setModalVisible(true);
                  form.resetFields();
                }}
              >
                Add User
              </Button>
            </Space>
          }
        >
          {/* Filters */}
          <Card 
            size="small" 
            style={{ marginBottom: '16px' }}
            title={
              <Space>
                <FilterOutlined />
                Filters
              </Space>
            }
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={8} md={6}>
                <Search
                  placeholder="Search users..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  onSearch={fetchUsers}
                  allowClear
                />
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Select
                  placeholder="Role"
                  value={filters.role}
                  onChange={(value) => handleFilterChange('role', value)}
                  style={{ width: '100%' }}
                  allowClear
                >
                  {availableRoles.map(role => (
                    <Option key={role} value={role}>{role}</Option>
                  ))}
                </Select>
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Select
                  placeholder="Status"
                  value={filters.status}
                  onChange={(value) => handleFilterChange('status', value)}
                  style={{ width: '100%' }}
                  allowClear
                >
                  <Option value="approved">Approved</Option>
                  <Option value="waiting">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                </Select>
              </Col>
            </Row>
          </Card>

          {/* Users Table */}
          <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey="_id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} users`
            }}
            onChange={handleTableChange}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* User Modal */}
        <Modal
          title={editingUser ? "Edit User Role" : "Create New User"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingUser(null);
            form.resetFields();
          }}
          footer={null}
          width={500}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateUser}
          >
            {editingUser ? (
              // Edit existing user - only role update
              <>
                <Form.Item
                  name="role"
                  label="User Role"
                  rules={[{ required: true, message: 'Please select role' }]}
                >
                  <Select placeholder="Select role">
                    {availableRoles.map(role => (
                      <Option key={role} value={role}>{role}</Option>
                    ))}
                  </Select>
                </Form.Item>
                
                <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
                  <strong>Editing:</strong> {editingUser.firstName} {editingUser.lastName}
                  <br />
                  <strong>Email:</strong> {editingUser.email}
                </div>
              </>
            ) : (
              // Create new user - full form
              <>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                      <Input placeholder="Enter first name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                      <Input placeholder="Enter last name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter valid email' }
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: 'Please select role' }]}
                >
                  <Select placeholder="Select role">
                    {availableRoles.map(role => (
                      <Option key={role} value={role}>{role}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: 'Please enter password' },
                    { min: 6, message: 'Password must be at least 6 characters' }
                  ]}
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
                <Button onClick={() => {
                  setModalVisible(false);
                  setEditingUser(null);
                  form.resetFields();
                }}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default UserManagement;




