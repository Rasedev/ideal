// components/employees/EmployeeManagement.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Tag,
//   Space,
//   Input,
//   Select,
//   DatePicker,
//   Modal,
//   Form,
//   message,
//   Popconfirm,
//   Tooltip,
//   Badge,
//   Avatar,
//   Typography
// } from 'antd';
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   SearchOutlined,
//   FilterOutlined,
//   UserAddOutlined,
//   TeamOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const EmployeeManagement = () => {
//   const [loading, setLoading] = useState(false);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//     total: 0
//   });
//   const [filters, setFilters] = useState({
//     search: '',
//     department: '',
//     status: '',
//     dateRange: []
//   });
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEmployees();
//   }, [pagination.current, pagination.pageSize]);

//   useEffect(() => {
//     filterEmployees();
//   }, [employees, filters]);

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/employee/list', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           page: pagination.current,
//           limit: pagination.pageSize
//         }
//       });

//       if (response.data.success) {
//         setEmployees(response.data.data.employees || []);
//         setPagination(prev => ({
//           ...prev,
//           total: response.data.data.totalCount || 0
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       message.error('Failed to fetch employees');
//       // Mock data for demonstration
//       setEmployees([
//         {
//           id: 1,
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john.doe@association.com',
//           telephone: '+1 234 567 8900',
//           department: 'IT',
//           position: 'Software Developer',
//           status: 'active',
//           joinDate: '2023-01-15',
//           salary: 75000,
//           profilePhoto: null
//         },
//         {
//           id: 2,
//           firstName: 'Sarah',
//           lastName: 'Wilson',
//           email: 'sarah.wilson@association.com',
//           telephone: '+1 234 567 8901',
//           department: 'HR',
//           position: 'HR Manager',
//           status: 'active',
//           joinDate: '2022-08-20',
//           salary: 65000,
//           profilePhoto: null
//         },
//         {
//           id: 3,
//           firstName: 'Mike',
//           lastName: 'Johnson',
//           email: 'mike.johnson@association.com',
//           telephone: '+1 234 567 8902',
//           department: 'Finance',
//           position: 'Accountant',
//           status: 'inactive',
//           joinDate: '2023-03-10',
//           salary: 55000,
//           profilePhoto: null
//         }
//       ]);
//       setPagination(prev => ({ ...prev, total: 3 }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterEmployees = () => {
//     let filtered = [...employees];

//     // Search filter
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       filtered = filtered.filter(emp =>
//         emp.firstName.toLowerCase().includes(searchLower) ||
//         emp.lastName.toLowerCase().includes(searchLower) ||
//         emp.email.toLowerCase().includes(searchLower) ||
//         emp.position.toLowerCase().includes(searchLower)
//       );
//     }

//     // Department filter
//     if (filters.department) {
//       filtered = filtered.filter(emp => emp.department === filters.department);
//     }

//     // Status filter
//     if (filters.status) {
//       filtered = filtered.filter(emp => emp.status === filters.status);
//     }

//     // Date range filter
//     if (filters.dateRange && filters.dateRange.length === 2) {
//       const [start, end] = filters.dateRange;
//       filtered = filtered.filter(emp => {
//         const joinDate = dayjs(emp.joinDate);
//         return joinDate.isAfter(start) && joinDate.isBefore(end);
//       });
//     }

//     setFilteredEmployees(filtered);
//   };

//   const handleTableChange = (newPagination) => {
//     setPagination(newPagination);
//   };

//   const handleAddEmployee = () => {
//     navigate('/hr/employees/add');
//   };

//   const handleEditEmployee = (employee) => {
//     setSelectedEmployee(employee);
//     form.setFieldsValue({
//       ...employee,
//       joinDate: employee.joinDate ? dayjs(employee.joinDate) : null
//     });
//     setIsModalVisible(true);
//   };

//   const handleDeleteEmployee = async (employeeId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3000/api/v1/employee/${employeeId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       message.success('Employee deleted successfully');
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//       message.error('Failed to delete employee');
//     }
//   };

//   const handleModalOk = async () => {
//     try {
//       const values = await form.validateFields();
//       const token = localStorage.getItem('token');

//       if (selectedEmployee) {
//         // Update existing employee
//         await axios.put(`http://localhost:3000/api/v1/employee/${selectedEmployee.id}`, values, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         message.success('Employee updated successfully');
//       } else {
//         // Add new employee
//         await axios.post('http://localhost:3000/api/v1/employee', values, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         message.success('Employee added successfully');
//       }

//       setIsModalVisible(false);
//       form.resetFields();
//       setSelectedEmployee(null);
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error saving employee:', error);
//       message.error('Failed to save employee');
//     }
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//     setSelectedEmployee(null);
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
//       title: 'Employee',
//       dataIndex: 'firstName',
//       key: 'employee',
//       render: (text, record) => (
//         <Space>
//           <Avatar 
//             size="small" 
//             src={record.profilePhoto}
//             icon={<UserOutlined />}
//           />
//           <div>
//             <div className="font-medium">{record.firstName} {record.lastName}</div>
//             <div className="text-xs text-gray-500">{record.position}</div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Contact',
//       dataIndex: 'email',
//       key: 'contact',
//       render: (email, record) => (
//         <div>
//           <div className="flex items-center text-sm">
//             <MailOutlined className="mr-1 text-gray-400" />
//             {email}
//           </div>
//           <div className="flex items-center text-xs text-gray-500">
//             <PhoneOutlined className="mr-1" />
//             {record.telephone}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Department',
//       dataIndex: 'department',
//       key: 'department',
//       render: (department) => (
//         <Tag color="blue">{department}</Tag>
//       ),
//     },
//     {
//       title: 'Join Date',
//       dataIndex: 'joinDate',
//       key: 'joinDate',
//       render: (date) => dayjs(date).format('MMM D, YYYY'),
//       sorter: (a, b) => dayjs(a.joinDate).unix() - dayjs(b.joinDate).unix(),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getStatusTag(status),
//       filters: [
//         { text: 'Active', value: 'active' },
//         { text: 'Inactive', value: 'inactive' },
//         { text: 'Pending', value: 'pending' },
//       ],
//       onFilter: (value, record) => record.status === value,
//     },
//     {
//       title: 'Salary',
//       dataIndex: 'salary',
//       key: 'salary',
//       render: (salary) => `$${salary?.toLocaleString()}`,
//       sorter: (a, b) => a.salary - b.salary,
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button 
//               type="link" 
//               icon={<EyeOutlined />} 
//               onClick={() => navigate(`/hr/employees/${record.id}`)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit">
//             <Button 
//               type="link" 
//               icon={<EditOutlined />} 
//               onClick={() => handleEditEmployee(record)}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Are you sure to delete this employee?"
//             onConfirm={() => handleDeleteEmployee(record.id)}
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

//   const departments = ['IT', 'HR', 'Finance', 'Operations', 'Marketing', 'Sales'];

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <Title level={2} className="!mb-2">
//             <TeamOutlined className="text-blue-500 mr-3" />
//             Employee Management
//           </Title>
//           <Text className="text-gray-600">
//             Manage your organization's employees and their information
//           </Text>
//         </div>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           size="large"
//           onClick={handleAddEmployee}
//           className="mt-4 sm:mt-0"
//         >
//           Add Employee
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card className="shadow-sm border-0">
//         <Row gutter={[16, 16]} align="middle">
//           <Col xs={24} sm={8}>
//             <Input
//               placeholder="Search employees..."
//               prefix={<SearchOutlined />}
//               value={filters.search}
//               onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//               allowClear
//             />
//           </Col>
//           <Col xs={24} sm={6}>
//             <Select
//               placeholder="Department"
//               style={{ width: '100%' }}
//               value={filters.department}
//               onChange={(value) => setFilters(prev => ({ ...prev, department: value }))}
//               allowClear
//             >
//               {departments.map(dept => (
//                 <Option key={dept} value={dept}>{dept}</Option>
//               ))}
//             </Select>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Select
//               placeholder="Status"
//               style={{ width: '100%' }}
//               value={filters.status}
//               onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
//               allowClear
//             >
//               <Option value="active">Active</Option>
//               <Option value="inactive">Inactive</Option>
//               <Option value="pending">Pending</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={4}>
//             <Button 
//               icon={<FilterOutlined />}
//               onClick={() => setFilters({ search: '', department: '', status: '', dateRange: [] })}
//               block
//             >
//               Clear Filters
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       {/* Statistics */}
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={6}>
//           <Card className="text-center border-0 shadow-sm">
//             <Title level={3} className="!text-blue-600 !mb-2">
//               {employees.length}
//             </Title>
//             <Text className="text-gray-600">Total Employees</Text>
//           </Card>
//         </Col>
//         <Col xs={24} sm={6}>
//           <Card className="text-center border-0 shadow-sm">
//             <Title level={3} className="!text-green-600 !mb-2">
//               {employees.filter(emp => emp.status === 'active').length}
//             </Title>
//             <Text className="text-gray-600">Active</Text>
//           </Card>
//         </Col>
//         <Col xs={24} sm={6}>
//           <Card className="text-center border-0 shadow-sm">
//             <Title level={3} className="!text-orange-600 !mb-2">
//               {employees.filter(emp => emp.status === 'pending').length}
//             </Title>
//             <Text className="text-gray-600">Pending</Text>
//           </Card>
//         </Col>
//         <Col xs={24} sm={6}>
//           <Card className="text-center border-0 shadow-sm">
//             <Title level={3} className="!text-red-600 !mb-2">
//               {employees.filter(emp => emp.status === 'inactive').length}
//             </Title>
//             <Text className="text-gray-600">Inactive</Text>
//           </Card>
//         </Col>
//       </Row>

//       {/* Employees Table */}
//       <Card 
//         title={`Employees (${filteredEmployees.length})`}
//         className="shadow-sm border-0"
//         extra={
//           <Text className="text-gray-500">
//             Showing {filteredEmployees.length} of {pagination.total} employees
//           </Text>
//         }
//       >
//         <Table
//           columns={columns}
//           dataSource={filteredEmployees}
//           rowKey="id"
//           loading={loading}
//           pagination={{
//             current: pagination.current,
//             pageSize: pagination.pageSize,
//             total: pagination.total,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) => 
//               `${range[0]}-${range[1]} of ${total} employees`,
//           }}
//           onChange={handleTableChange}
//           scroll={{ x: 800 }}
//         />
//       </Card>

//       {/* Add/Edit Employee Modal */}
//       <Modal
//         title={selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
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

//           <Row gutter={16}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="email"
//                 label="Email"
//                 rules={[
//                   { required: true, message: 'Please enter email' },
//                   { type: 'email', message: 'Please enter valid email' }
//                 ]}
//               >
//                 <Input placeholder="Email address" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="telephone"
//                 label="Phone"
//                 rules={[{ required: true, message: 'Please enter phone number' }]}
//               >
//                 <Input placeholder="Phone number" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="department"
//                 label="Department"
//                 rules={[{ required: true, message: 'Please select department' }]}
//               >
//                 <Select placeholder="Select department">
//                   {departments.map(dept => (
//                     <Option key={dept} value={dept}>{dept}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="position"
//                 label="Position"
//                 rules={[{ required: true, message: 'Please enter position' }]}
//               >
//                 <Input placeholder="Job position" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="joinDate"
//                 label="Join Date"
//                 rules={[{ required: true, message: 'Please select join date' }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="salary"
//                 label="Salary"
//                 rules={[{ required: true, message: 'Please enter salary' }]}
//               >
//                 <Input type="number" placeholder="Annual salary" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             name="status"
//             label="Status"
//             initialValue="active"
//           >
//             <Select>
//               <Option value="active">Active</Option>
//               <Option value="inactive">Inactive</Option>
//               <Option value="pending">Pending</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default EmployeeManagement;




//////////////////FINAL CODE////////////////////


// import React, { useState, useEffect } from 'react';
// import {
//   Row,
//   Col,
//   Card,
//   Statistic,
//   Button,
//   Typography,
//   Space,
//   Progress,
//   List,
//   Tag,
//   Avatar,
//   Badge,
// } from 'antd';
// import {
//   TeamOutlined,
//   UserAddOutlined,
//   BarChartOutlined,
//   ClockCircleOutlined,
//   RiseOutlined,
//   EyeOutlined,
//   ArrowUpOutlined,
//   ArrowDownOutlined,
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { employeeAPI } from '../../services/apiService';
// import { useSelector } from 'react-redux';

// const { Title, Text } = Typography;

// const EmployeeManagement = () => {
//   const [stats, setStats] = useState({});
//   const [recentEmployees, setRecentEmployees] = useState([]);
//   const [departmentStats, setDepartmentStats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       // Fetch employee stats
//       const statsResponse = await employeeAPI.getStats();
//       if (statsResponse.data.success) {
//         setStats(statsResponse.data.data);
//       }

//       // Fetch recent employees
//       const employeesResponse = await employeeAPI.getAll({ 
//         page: 1, 
//         limit: 5,
//         sortBy: 'createdAt',
//         sortOrder: 'desc'
//       });
//       if (employeesResponse.data.success) {
//         setRecentEmployees(employeesResponse.data.data?.employees || []);
//       }

//       // Calculate department distribution
//       if (statsResponse.data.data?.departmentStats) {
//         setDepartmentStats(statsResponse.data.data.departmentStats);
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   const getStatusColor = (status) => {
//     const colors = {
//       active: 'green',
//       inactive: 'red',
//       suspended: 'orange',
//       pending: 'blue'
//     };
//     return colors[status] || 'default';
//   };

//   const getDepartmentColor = (department) => {
//     const colors = {
//       'HR': 'pink',
//       'Finance': 'green',
//       'IT': 'blue',
//       'Marketing': 'orange',
//       'Sales': 'purple',
//       'Operations': 'red',
//       'Administration': 'cyan'
//     };
//     return colors[department] || 'default';
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <Title level={2} className="!mb-2">
//             <TeamOutlined className="text-blue-500 mr-3" />
//             Employee Management
//           </Title>
//           <Text className="text-gray-600">
//             Overview of your organization's workforce
//           </Text>
//         </div>
//         <Space>
//           <Button 
//             icon={<BarChartOutlined />}
//             onClick={() => navigate('/allemployees')}
//           >
//             View All Employees
//           </Button>
//           <Button 
//             type="primary" 
//             icon={<UserAddOutlined />}
//             onClick={() => navigate('/hr/employees/add')}
//           >
//             Add Employee
//           </Button>
//         </Space>
//       </div>

//       {/* Key Statistics */}
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={6}>
//           <Card className={`text-center border-0 shadow-sm ${cardClass}`} loading={loading}>
//             <Statistic
//               title="Total Employees"
//               value={stats.totalEmployees || 0}
//               prefix={<TeamOutlined />}
//               valueStyle={{ color: '#1890ff' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className={`text-center border-0 shadow-sm ${cardClass}`} loading={loading}>
//             <Statistic
//               title="Active Employees"
//               value={stats.activeEmployees || 0}
//               valueStyle={{ color: '#52c41a' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className={`text-center border-0 shadow-sm ${cardClass}`} loading={loading}>
//             <Statistic
//               title="New This Month"
//               value={stats.newHiresThisMonth || 0}
//               prefix={<RiseOutlined />}
//               valueStyle={{ color: '#722ed1' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className={`text-center border-0 shadow-sm ${cardClass}`} loading={loading}>
//             <Statistic
//               title="Attendance Rate"
//               value={stats.attendanceRate || 0}
//               suffix="%"
//               valueStyle={{ color: '#fa8c16' }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         {/* Department Distribution */}
//         <Col xs={24} lg={12}>
//           <Card 
//             title={
//               <Space>
//                 <BarChartOutlined />
//                 Department Distribution
//               </Space>
//             }
//             className={cardClass}
//             loading={loading}
//           >
//             {departmentStats.map((dept, index) => (
//               <div key={dept._id} className="mb-4">
//                 <div className="flex justify-between mb-2">
//                   <Text strong>{dept._id}</Text>
//                   <Text>{dept.count} employees</Text>
//                 </div>
//                 <Progress 
//                   percent={Math.round((dept.count / stats.totalEmployees) * 100)}
//                   strokeColor={getDepartmentColor(dept._id)}
//                   showInfo={false}
//                 />
//               </div>
//             ))}
//           </Card>
//         </Col>

//         {/* Recent Employees */}
//         <Col xs={24} lg={12}>
//           <Card 
//             title={
//               <Space>
//                 <ClockCircleOutlined />
//                 Recent Employees
//               </Space>
//             }
//             className={cardClass}
//             loading={loading}
//             extra={
//               <Button 
//                 type="link" 
//                 icon={<EyeOutlined />}
//                 onClick={() => navigate('/hr/employees')}
//               >
//                 View All
//               </Button>
//             }
//           >
//             <List
//               dataSource={recentEmployees}
//               renderItem={(employee) => (
//                 <List.Item>
//                   <List.Item.Meta
//                     avatar={
//                       <Avatar src={employee.profilePhoto} icon={<TeamOutlined />} />
//                     }
//                     title={
//                       <Space>
//                         <Text>{`${employee.firstName} ${employee.lastName}`}</Text>
//                         <Tag color={getStatusColor(employee.status)} size="small">
//                           {employee.status}
//                         </Tag>
//                       </Space>
//                     }
//                     description={
//                       <Space direction="vertical" size={0}>
//                         <Text type="secondary">{employee.position}</Text>
//                         <Text type="secondary" className="text-xs">
//                           {employee.department} • {employee.employeeId}
//                         </Text>
//                       </Space>
//                     }
//                   />
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Quick Actions */}
//       <Row gutter={[16, 16]}>
//         <Col xs={24}>
//           <Card 
//             title="Quick Actions"
//             className={cardClass}
//           >
//             <Row gutter={[16, 16]}>
//               <Col xs={24} sm={8} md={6}>
//                 <Card 
//                   className="text-center cursor-pointer hover:shadow-lg transition-shadow"
//                   onClick={() => navigate('/hr/employees/add')}
//                 >
//                   <UserAddOutlined className="text-2xl text-blue-500 mb-2" />
//                   <Text strong>Add Employee</Text>
//                 </Card>
//               </Col>
//               <Col xs={24} sm={8} md={6}>
//                 <Card 
//                   className="text-center cursor-pointer hover:shadow-lg transition-shadow"
//                   onClick={() => navigate('/hr/employees')}
//                 >
//                   <TeamOutlined className="text-2xl text-green-500 mb-2" />
//                   <Text strong>View All</Text>
//                 </Card>
//               </Col>
//               <Col xs={24} sm={8} md={6}>
//                 <Card 
//                   className="text-center cursor-pointer hover:shadow-lg transition-shadow"
//                   onClick={() => navigate('/hr/attendance')}
//                 >
//                   <BarChartOutlined className="text-2xl text-orange-500 mb-2" />
//                   <Text strong>Attendance</Text>
//                 </Card>
//               </Col>
//               <Col xs={24} sm={8} md={6}>
//                 <Card 
//                   className="text-center cursor-pointer hover:shadow-lg transition-shadow"
//                   onClick={() => navigate('/hr/performance')}
//                 >
//                   <RiseOutlined className="text-2xl text-purple-500 mb-2" />
//                   <Text strong>Performance</Text>
//                 </Card>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default EmployeeManagement;



////////////////////////////CREATED BY SLICES/////////////////////


import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  Input,
  Select,
  Button,
  Space,
  Tag,
  Avatar,
  Row,
  Col,
  Typography,
  Statistic,
  Modal,
  Form,
  DatePicker,
  Upload,
  message,
  Dropdown,
  Menu,
  Badge
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  MoreOutlined,
  UploadOutlined,
  BarChartOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import { useEmployees } from '../hooks/useEmployees';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const EmployeeManagement = () => {
  const {
    // State
    employees,
    loading,
    selectedEmployee,
    
    // Actions
    loadEmployees,
    createEmployee,
    editEmployee,
    removeEmployee,
    selectEmployee,
    clearSelected,
    
    // Helper Functions
    getFilteredEmployees,
    getDepartments
  } = useEmployees();

  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Get filtered employees
  const filteredEmployees = useMemo(() => {
    return getFilteredEmployees({
      searchText,
      department: departmentFilter,
      status: statusFilter
    });
  }, [getFilteredEmployees, searchText, departmentFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(emp => emp.status === 'active').length;
    const departments = employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});
    
    const largestDept = Object.entries(departments).sort((a, b) => b[1] - a[1])[0];

    return {
      total,
      active,
      inactive: total - active,
      activePercentage: total > 0 ? ((active / total) * 100).toFixed(1) : 0,
      largestDepartment: largestDept ? `${largestDept[0]} (${largestDept[1]})` : 'N/A',
      departments
    };
  }, [employees]);

  // Handlers
  const handleAddEmployee = () => {
    setIsEditing(false);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditEmployee = (employee) => {
    setIsEditing(true);
    selectEmployee(employee);
    form.setFieldsValue({
      ...employee,
      dob: employee.dob ? dayjs(employee.dob) : null,
      joinDate: employee.joinDate ? dayjs(employee.joinDate) : null,
    });
    setModalVisible(true);
  };

  const handleViewEmployee = (employee) => {
    selectEmployee(employee);
    setViewModalVisible(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this employee?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => removeEmployee(employeeId),
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          if (values[key] instanceof dayjs) {
            formData.append(key, values[key].format('YYYY-MM-DD'));
          } else if (key === 'image' && values[key]?.fileList?.[0]) {
            formData.append('image', values[key].fileList[0].originFileObj);
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      if (isEditing && selectedEmployee) {
        await editEmployee(selectedEmployee._id, formData);
      } else {
        await createEmployee(formData);
      }
      
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(`Failed to ${isEditing ? 'update' : 'create'} employee`);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'green',
      inactive: 'red',
      terminated: 'volcano'
    };
    return colors[status] || 'default';
  };

  const getDepartmentColor = (department) => {
    const colors = {
      HR: 'pink',
      IT: 'blue',
      Finance: 'green',
      Marketing: 'orange',
      Sales: 'cyan',
      Operations: 'purple',
      Administration: 'red'
    };
    return colors[department] || 'default';
  };

  const columns = [
    {
      title: 'Employee',
      key: 'employee',
      width: 280,
      render: (record) => (
        <Space>
          <Badge dot color={getStatusColor(record.status)} offset={[-5, 35]}>
            <Avatar
              src={record.image}
              icon={<UserOutlined />}
              size="large"
              style={{ backgroundColor: '#87d068' }}
            />
          </Badge>
          <div>
            <div className="font-semibold">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <MailOutlined className="mr-1" />
              {record.email}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <IdcardOutlined className="mr-1" />
              {record.employeeId}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position) => <Text strong>{position}</Text>,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department) => (
        <Tag color={getDepartmentColor(department)} className="font-medium">
          {department}
        </Tag>
      ),
    },
    {
      title: 'Employment Type',
      dataIndex: 'employmentType',
      key: 'employmentType',
      render: (type) => (
        <Tag color={type === 'full-time' ? 'blue' : 'orange'}>
          {type?.replace('-', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => (
        <div className="flex items-center text-gray-600">
          <CalendarOutlined className="mr-1" />
          {date ? dayjs(date).format('MMM DD, YYYY') : 'Not set'}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)} className="font-semibold">
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="view"
                icon={<EyeOutlined />}
                onClick={() => handleViewEmployee(record)}
              >
                View Details
              </Menu.Item>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => handleEditEmployee(record)}
              >
                Edit
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteEmployee(record._id)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} className="hover:bg-gray-100" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <Title level={2} className="flex items-center">
              <TeamOutlined className="mr-3 text-blue-600" />
              Employee Management
            </Title>
            <Text type="secondary" className="text-lg">
              Manage your team members and their information
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddEmployee}
          >
            Add Employee
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Total Employees"
              value={stats.total}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Active Employees"
              value={stats.active}
              valueStyle={{ color: '#52c41a' }}
              suffix={`/ ${stats.total}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Active Rate"
              value={stats.activePercentage}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Largest Department"
              value={stats.largestDepartment}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#fa8c16', fontSize: '16px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters Section */}
      <Card className="mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search employees by name, email, or ID..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
            />
          </div>
          <Select
            placeholder="Department"
            size="large"
            style={{ width: 200 }}
            value={departmentFilter}
            onChange={setDepartmentFilter}
          >
            <Option value="all">All Departments</Option>
            {getDepartments.map(dept => (
              <Option key={dept} value={dept}>{dept}</Option>
            ))}
          </Select>
          <Select
            placeholder="Status"
            size="large"
            style={{ width: 150 }}
            value={statusFilter}
            onChange={setStatusFilter}
          >
            <Option value="all">All Status</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="terminated">Terminated</Option>
          </Select>
        </div>
      </Card>

      {/* Employees Table */}
      <Card 
        title={
          <Space>
            <TeamOutlined />
            <span>Employees List</span>
            <Tag color="blue">{filteredEmployees.length}</Tag>
          </Space>
        }
        className="shadow-sm"
      >
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1000 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} employees`
          }}
        />
      </Card>

      {/* Add/Edit Employee Modal */}
      <Modal
        title={isEditing ? 'Edit Employee' : 'Add New Employee'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          clearSelected();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
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
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: 'Please enter position' }]}
              >
                <Input placeholder="Enter job position" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: 'Please select department' }]}
              >
                <Select placeholder="Select department">
                  {getDepartments.map(dept => (
                    <Option key={dept} value={dept}>{dept}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="employmentType" label="Employment Type">
                <Select placeholder="Select employment type">
                  <Option value="full-time">Full Time</Option>
                  <Option value="part-time">Part Time</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="intern">Intern</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status">
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="terminated">Terminated</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dob" label="Date of Birth">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="joinDate" label="Join Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" label="Address">
                <TextArea rows={3} placeholder="Enter address" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="image" label="Profile Image">
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  listType="picture"
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <div className="text-right">
            <Space>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {isEditing ? 'Update Employee' : 'Add Employee'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* View Employee Modal */}
      <Modal
        title="Employee Details"
        open={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
          clearSelected();
        }}
        footer={[
          <Button key="edit" onClick={() => {
            setViewModalVisible(false);
            handleEditEmployee(selectedEmployee);
          }}>
            Edit
          </Button>,
          <Button key="close" type="primary" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar
                src={selectedEmployee.image}
                icon={<UserOutlined />}
                size={80}
                style={{ backgroundColor: '#87d068' }}
              />
              <div>
                <Title level={3}>{selectedEmployee.firstName} {selectedEmployee.lastName}</Title>
                <Text type="secondary">{selectedEmployee.employeeId}</Text>
              </div>
            </div>
            
            <Row gutter={16}>
              <Col span={12}>
                <div className="mb-3">
                  <Text strong>Email:</Text>
                  <div className="flex items-center text-gray-600">
                    <MailOutlined className="mr-2" />
                    {selectedEmployee.email}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-3">
                  <Text strong>Phone:</Text>
                  <div className="flex items-center text-gray-600">
                    <PhoneOutlined className="mr-2" />
                    {selectedEmployee.phone || 'Not provided'}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-3">
                  <Text strong>Position:</Text>
                  <div>{selectedEmployee.position}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-3">
                  <Text strong>Department:</Text>
                  <div>
                    <Tag color={getDepartmentColor(selectedEmployee.department)}>
                      {selectedEmployee.department}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-3">
                  <Text strong>Employment Type:</Text>
                  <div>
                    <Tag color={selectedEmployee.employmentType === 'full-time' ? 'blue' : 'orange'}>
                      {selectedEmployee.employmentType?.replace('-', ' ').toUpperCase()}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-3">
                  <Text strong>Status:</Text>
                  <div>
                    <Tag color={getStatusColor(selectedEmployee.status)}>
                      {selectedEmployee.status?.toUpperCase()}
                    </Tag>
                  </div>
                </div>
              </Col>
              {selectedEmployee.address && (
                <Col span={24}>
                  <div className="mb-3">
                    <Text strong>Address:</Text>
                    <div className="flex items-center text-gray-600">
                      <EnvironmentOutlined className="mr-2" />
                      {selectedEmployee.address}
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeManagement;

