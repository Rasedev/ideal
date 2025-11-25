/////////////////////////FINAL CODE BELOW/////////////////////////

// import React, { useState, useEffect } from "react";
// import {
//   Layout,
//   Table,
//   Card,
//   Row,
//   Col,
//   Typography,
//   Tag,
//   Button,
//   Space,
//   Spin,
//   message
// } from "antd";
// import { UserOutlined, PlusOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const { Title, Text } = Typography;
// const { Header, Content } = Layout;

// export default function AllEmployees() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:3000/api/v1/employee/allemployee",
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (response.data.success) {
//         setEmployees(response.data.data.employees);
//       }
//     } catch (error) {
//       console.error("Fetch employees error:", error);
//       message.error("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const columns = [
//     {
//       title: "Employee ID",
//       dataIndex: "employeeId",
//       key: "employeeId",
//       render: (id) => <Text strong>{id}</Text>,
//     },
//     {
//       title: "Name",
//       key: "name",
//       render: (record) => (
//         <Space>
//           <UserOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
//           <Text>{record.firstName} {record.lastName}</Text>
//         </Space>
//       ),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Position",
//       dataIndex: "position",
//       key: "position",
//     },
//     {
//       title: "Department",
//       dataIndex: "department",
//       key: "department",
//       render: (dept) => dept || "Not specified",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag color={status === 'active' ? 'green' : 'red'}>
//           {status?.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Join Date",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (date) => new Date(date).toLocaleDateString(),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="link"
//             onClick={() => navigate(`/hr/employees/${record._id}`)}
//           >
//             View
//           </Button>
//           <Button
//             type="link"
//             onClick={() => navigate(`/hr/employees/edit/${record._id}`)}
//           >
//             Edit
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Header style={{
//         // background: "#fff",
//         padding: "0 24px",
//         boxShadow: "0 2px 8px #f0f1f2"
//       }}>
//         <Row justify="space-between" align="middle">
//           <Col>
//             <Title level={3} style={{ margin: 0, lineHeight: "64px" }}>
//               All Employees
//             </Title>
//           </Col>
//           <Col>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => navigate("/hr/employees/add")}
//             >
//               Add Employee
//             </Button>
//           </Col>
//         </Row>
//       </Header>

//       <Content style={{ padding: "24px" }}>
//         <Card>
//           {loading ? (
//             <div style={{ textAlign: "center", padding: "50px" }}>
//               <Spin size="large" />
//             </div>
//           ) : (
//             <Table
//               columns={columns}
//               dataSource={employees}
//               rowKey="_id"
//               pagination={{
//                 pageSize: 10,
//                 showSizeChanger: true,
//                 showTotal: (total, range) =>
//                   `${range[0]}-${range[1]} of ${total} employees`
//               }}
//             />
//           )}
//         </Card>
//       </Content>
//     </Layout>
//   );
// }

////////////////////TOP FINAL CODE /////////////////////////



// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Layout,
//   Table,
//   Card,
//   Row,
//   Col,
//   Typography,
//   Tag,
//   Button,
//   Space,
//   Spin,
//   message,
//   Input,
//   Select,
//   Avatar,
//   Badge,
//   Statistic,
//   Tooltip,
//   Dropdown,
//   Menu,
//   Modal,
//   Form,
//   Upload,
//   DatePicker,
// } from "antd";
// import {
//   UserOutlined,
//   PlusOutlined,
//   SearchOutlined,
//   FilterOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   MoreOutlined,
//   TeamOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   BarChartOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import dayjs from "dayjs";


// const { Title, Text } = Typography;
// const { Header, Content } = Layout;
// const { Option } = Select;
// const { Search } = Input;

// export default function AllEmployees() {

//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const [departmentFilter, setDepartmentFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [documentModalVisible, setDocumentModalVisible] = useState(false);
//   const [uploadLoading, setUploadLoading] = useState(false);
//   const [editForm] = Form.useForm();
//   const [documentForm] = Form.useForm();
//   const navigate = useNavigate();



//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:3000/api/v1/employee/allemployee",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.success) {
//         const employeesData = response.data.data.employees || [];
//         setEmployees(employeesData);
//         setFilteredEmployees(employeesData);
//       }
//     } catch (error) {
//       console.error("Fetch employees error:", error);
//       message.error("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Filter employees based on search and filters

//    useEffect(() => {
//     let filtered = employees;

//     if (searchText) {
//       filtered = filtered.filter(
//         (emp) =>
//           emp.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
//           emp.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
//           emp.email?.toLowerCase().includes(searchText.toLowerCase()) ||
//           emp.position?.toLowerCase().includes(searchText.toLowerCase()) ||
//           emp.employeeId?.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }

//     if (departmentFilter !== "all") {
//       filtered = filtered.filter((emp) => emp.department === departmentFilter);
//     }

//     if (statusFilter !== "all") {
//       filtered = filtered.filter((emp) => emp.status === statusFilter);
//     }

//     setFilteredEmployees(filtered);
//   }, [searchText, departmentFilter, statusFilter, employees]);

//   const getStatusColor = (status) => {
//     const colors = {
//       active: "green",
//       inactive: "red",
//       terminated: "volcano",
//     };
//     return colors[status] || "default";
//   };

//   const getDepartmentColor = (department) => {
//     const colors = {
//       HR: "pink",
//       IT: "blue",
//       Finance: "green",
//       Marketing: "orange",
//       Sales: "purple",
//       Operations: "red",
//       Administration: "cyan",
//     };
//     return colors[department] || "default";
//   };

//   // Edit Employee
//   const handleEdit = (employee) => {
//     setSelectedEmployee(employee);
//     editForm.setFieldsValue({
//       ...employee,
//       dob: employee.dob ? dayjs(employee.dob) : null,
//       joinDate: employee.joinDate ? dayjs(employee.joinDate) : null,
//     });
//     setEditModalVisible(true);
//   };

//   const handleEditSubmit = async (values) => {
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       // Add all form fields
//       Object.keys(values).forEach((key) => {
//         if (values[key] !== undefined && values[key] !== null) {
//           if (values[key] instanceof dayjs) {
//             formData.append(key, values[key].format("YYYY-MM-DD"));
//           } else {
//             formData.append(key, values[key]);
//           }
//         }
//       });

//       const response = await axios.put(
//         `http://localhost:3000/api/v1/employee/update/${selectedEmployee._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         message.success("Employee updated successfully!");
//         setEditModalVisible(false);
//         editForm.resetFields();
//         fetchEmployees();
//       }
//     } catch (error) {
//       console.error("Update employee error:", error);
//       message.error(
//         error.response?.data?.message || "Failed to update employee"
//       );
//     }
//   };

//   // Delete Employee
//   const handleDelete = async (employeeId) => {
//     Modal.confirm({
//       title: "Are you sure you want to delete this employee?",
//       content: "This action cannot be undone.",
//       okText: "Yes, Delete",
//       okType: "danger",
//       cancelText: "Cancel",
//       onOk: async () => {
//         // try {
//         //   const token = localStorage.getItem("token");
//         //   const response = await axios.delete(
//         //     `http://localhost:3000/api/v1/employee/delete/${employeeId}`,
//         //     {
//         //       headers: { Authorization: `Bearer ${token}` },
//         //     }
//         //   );

//         //   if (response.data.success) {
//         //     message.success("Employee deleted successfully!");
//         //     fetchEmployees();
//         //   }
//         // } catch (error) {
//         //   console.error("Delete employee error:", error);
//         //   message.error(
//         //     error.response?.data?.message || "Failed to delete employee"
//         //   );
//         // }
//          try {
//           await removeEmployee(employeeId);
//         } catch (error) {
//            console.error("Delete employee error:", error);
//           message.error(
//             error.response?.data?.message || "Failed to delete employee"
//           );
//         }
//       },
//     });
//   };

//   // Upload Document
//   // In your AllEmployees component - Fix the handleDocumentUpload function
//   const handleDocumentUpload = async (values) => {
//     try {
//       setUploadLoading(true);
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       console.log("📄 Frontend - Document upload values:", values);

//       // Add document type
//       formData.append("documentType", values.documentType);

//       // Add the file - FIXED: Get the actual file object
//       if (values.document && values.document.length > 0) {
//         const file = values.document[0].originFileObj;
//         console.log("📁 Frontend - File to upload:", file);
//         formData.append("document", file);
//       } else {
//         message.error("Please select a document file");
//         setUploadLoading(false);
//         return;
//       }

//       // Debug: Log FormData contents
//       console.log("📦 Frontend - FormData contents:");
//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const response = await axios.post(
//         `http://localhost:3000/api/v1/employee/${selectedEmployee._id}/documents`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         message.success("Document uploaded successfully!");
//         setDocumentModalVisible(false);
//         documentForm.resetFields();
//         fetchEmployees();
//       }
//     } catch (error) {
//       console.error("Upload document error:", error);
//       message.error(
//         error.response?.data?.message || "Failed to upload document"
//       );
//     } finally {
//       setUploadLoading(false);
//     }
//   };

//   const columns = [
//     // {
//     //   title: "Employee",
//     //   key: "employee",
//     //   width: 250,
//     //   render: (record) => (
//     //     <Space>
//     //       <Badge dot color={getStatusColor(record.status)} offset={[-5, 35]}>
//     //         <Avatar
//     //           src={record.image}
//     //           icon={<UserOutlined />}
//     //           size="large"
//     //           className="shadow-sm"
//     //         />
//     //       </Badge>
//     //       <div>
//     //         <div className="font-semibold">
//     //           {record.firstName} {record.lastName}
//     //         </div>
//     //         <div className="text-xs text-gray-500 flex items-center">
//     //           <MailOutlined className="mr-1" />
//     //           {record.email}
//     //         </div>
//     //         <div className="text-xs text-gray-500 flex items-center">
//     //           <PhoneOutlined className="mr-1" />
//     //           {record.phone || "Not provided"}
//     //         </div>
//     //       </div>
//     //     </Space>
//     //   ),
//     // },

//      {
//     title: "Employee",
//     key: "employee",
//     width: 250,
//     render: (record) => (
//       <Space>
//         <Badge dot color={getStatusColor(record.status)} offset={[-5, 35]}>
//           <Avatar
//             src={record.image ? `${record.image}` : null}
//             icon={<UserOutlined />}
//             size="large"
//             className="shadow-sm"
//             onError={() => {
//               // If image fails to load, it will show the icon
//               console.log("Image failed to load:", record.image);
//             }}
//           />
//         </Badge>
//         <div>
//           <div className="font-semibold">
//             {record.firstName} {record.lastName}
//           </div>
//           <div className="text-xs text-gray-500 flex items-center">
//             <MailOutlined className="mr-1" />
//             {record.email}
//           </div>
//           <div className="text-xs text-gray-500 flex items-center">
//             <PhoneOutlined className="mr-1" />
//             {record.phone || "Not provided"}
//           </div>
//         </div>
//       </Space>
//     ),
//   },


//     {
//       title: "Employee ID",
//       dataIndex: "employeeId",
//       key: "employeeId",
//       render: (id) => (
//         <Text strong className="text-blue-600">
//           {id}
//         </Text>
//       ),
//     },
//     {
//       title: "Position",
//       dataIndex: "position",
//       key: "position",
//       render: (position) => <Text>{position}</Text>,
//     },
//     {
//       title: "Department",
//       dataIndex: "department",
//       key: "department",
//       render: (department) => (
//         <Tag color={getDepartmentColor(department)} className="font-medium">
//           {department}
//         </Tag>
//       ),
//     },
//     {
//       title: "Employment Type",
//       dataIndex: "employmentType",
//       key: "employmentType",
//       render: (type) => (
//         <Tag color={type === "full-time" ? "blue" : "orange"}>
//           {type?.replace("-", " ").toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Join Date",
//       dataIndex: "joinDate",
//       key: "joinDate",
//       render: (date) => (
//         <Text className="text-gray-600">
//           {date ? dayjs(date).format("MMM DD, YYYY") : "Not set"}
//         </Text>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag color={getStatusColor(status)} className="font-semibold">
//           {status?.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       width: 120,
//       render: (_, record) => (
//         <Dropdown
//           overlay={
//             <Menu>
//               <Menu.Item
//                 key="view"
//                 icon={<EyeOutlined />}
//                 onClick={() => navigate(`/employee/${record._id}`)}
//               >
//                 View Details
//               </Menu.Item>
//               <Menu.Item
//                 key="edit"
//                 icon={<EditOutlined />}
//                 onClick={() => handleEdit(record)}
//               >
//                 Edit
//               </Menu.Item>
//               <Menu.Item
//                 key="document"
//                 icon={<UploadOutlined />}
//                 onClick={() => {
//                   setSelectedEmployee(record);
//                   setDocumentModalVisible(true);
//                 }}
//               >
//                 Upload Document
//               </Menu.Item>
//               <Menu.Divider />
//               <Menu.Item
//                 key="delete"
//                 icon={<DeleteOutlined />}
//                 danger
//                 onClick={() => handleDelete(record._id)}
//               >
//                 Delete
//               </Menu.Item>
//             </Menu>
//           }
//           trigger={["click"]}
//         >
//           <Button
//             type="text"
//             icon={<MoreOutlined />}
//             className="hover:bg-gray-100"
//           />
//         </Dropdown>
//       ),
//     },
//   ];

//   const stats = useMemo(() => {
//     const total = employees.length;
//     const active = employees.filter((emp) => emp.status === "active").length;
//     const inactive = employees.filter(
//       (emp) => emp.status === "inactive"
//     ).length;
//     const terminated = employees.filter(
//       (emp) => emp.status === "terminated"
//     ).length;

//     const departmentCount = employees.reduce((acc, emp) => {
//       acc[emp.department] = (acc[emp.department] || 0) + 1;
//       return acc;
//     }, {});

//     const largestDepartment = Object.entries(departmentCount).sort(
//       (a, b) => b[1] - a[1]
//     )[0];

//     return {
//       total,
//       active,
//       inactive,
//       terminated,
//       activePercentage: total > 0 ? ((active / total) * 100).toFixed(1) : 0,
//       largestDepartment: largestDepartment
//         ? `${largestDepartment[0]} (${largestDepartment[1]})`
//         : "N/A",
//     };
//   }, [employees]);

//   return (
//     <Layout style={{ minHeight: "100vh", background: "#f8f9fa" }}>
//       <Header
//         style={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           padding: "0 24px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Row justify="space-between" align="middle" style={{ height: 64 }}>
//           <Col>
//             <Space>
//               <TeamOutlined style={{ fontSize: 24, color: "white" }} />
//               <Title level={3} style={{ margin: 0, color: "white" }}>
//                 Employee Directory
//               </Title>
//             </Space>
//           </Col>
//           <Col>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               size="large"
//               onClick={() => navigate("/hr/employees/add")}
//               style={{
//                 background: "rgba(255,255,255,0.2)",
//                 border: "1px solid rgba(255,255,255,0.3)",
//                 fontWeight: 600,
//               }}
//             >
//               Add Employee
//             </Button>
//           </Col>
//         </Row>
//       </Header>

//       <Content style={{ padding: "24px" }}>
//         {/* Statistics Cards */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={12} md={6}>
//             <Card
//               className="text-center shadow-sm border-0"
//               styles={{ padding: "20px" }}
//             >
//               <Statistic
//                 title="Total Employees"
//                 value={stats.total}
//                 prefix={<TeamOutlined />}
//                 valueStyle={{ color: "#1890ff" }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card
//               className="text-center shadow-sm border-0"
//               styles={{ padding: "20px" }}
//             >
//               <Statistic
//                 title="Active Employees"
//                 value={stats.active}
//                 valueStyle={{ color: "#52c41a" }}
//                 suffix={`/ ${stats.total}`}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card
//               className="text-center shadow-sm border-0"
//               styles={{ padding: "20px" }}
//             >
//               <Statistic
//                 title="Active Rate"
//                 value={stats.activePercentage}
//                 suffix="%"
//                 valueStyle={{ color: "#722ed1" }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card
//               className="text-center shadow-sm border-0"
//               styles={{ padding: "20px" }}
//             >
//               <Statistic
//                 title="Largest Department"
//                 value={stats.largestDepartment}
//                 prefix={<BarChartOutlined />}
//                 valueStyle={{ color: "#fa8c16", fontSize: "16px" }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Filters and Search */}
//         <Card className="shadow-sm border-0 mb-6">
//           <Row gutter={[16, 16]} align="middle">
//             <Col xs={24} md={8}>
//               <Search
//                 placeholder="Search employees..."
//                 allowClear
//                 size="large"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 prefix={<SearchOutlined />}
//               />
//             </Col>
//             <Col xs={12} md={4}>
//               <Select
//                 placeholder="Department"
//                 size="large"
//                 style={{ width: "100%" }}
//                 value={departmentFilter}
//                 onChange={setDepartmentFilter}
//                 suffixIcon={<FilterOutlined />}
//               >
//                 <Option value="all">All Departments</Option>
//                 <Option value="HR">HR</Option>
//                 <Option value="IT">IT</Option>
//                 <Option value="Finance">Finance</Option>
//                 <Option value="Marketing">Marketing</Option>
//                 <Option value="Sales">Sales</Option>
//                 <Option value="Operations">Operations</Option>
//               </Select>
//             </Col>
//             <Col xs={12} md={4}>
//               <Select
//                 placeholder="Status"
//                 size="large"
//                 style={{ width: "100%" }}
//                 value={statusFilter}
//                 onChange={setStatusFilter}
//                 suffixIcon={<FilterOutlined />}
//               >
//                 <Option value="all">All Status</Option>
//                 <Option value="active">Active</Option>
//                 <Option value="inactive">Inactive</Option>
//                 <Option value="terminated">Terminated</Option>
//               </Select>
//             </Col>
//             <Col xs={24} md={8} className="text-right">
//               <Text type="secondary">
//                 Showing {filteredEmployees.length} of {employees.length}{" "}
//                 employees
//               </Text>
//             </Col>
//           </Row>
//         </Card>

//         {/* Employees Table */}
//         <Card
//           className="shadow-sm border-0"
//           styles={{ padding: 0 }}
//           title={
//             <Space>
//               <TeamOutlined />
//               <span>Employees List</span>
//               <Tag color="blue">{filteredEmployees.length}</Tag>
//             </Space>
//           }
//           extra={
//             <Button
//               icon={<BarChartOutlined />}
//               onClick={() => navigate("/hr/analytics")}
//             >
//               Analytics
//             </Button>
//           }
//         >
//           {loading ? (
//             <div style={{ textAlign: "center", padding: "50px" }}>
//               <Spin size="large" />
//               <div style={{ marginTop: 16 }}>
//                 <Text type="secondary">Loading employees...</Text>
//               </div>
//             </div>
//           ) : (
//             <Table
//               columns={columns}
//               dataSource={filteredEmployees}
//               rowKey="_id"
//               pagination={{
//                 pageSize: 10,
//                 showSizeChanger: true,
//                 showQuickJumper: true,
//                 showTotal: (total, range) =>
//                   `${range[0]}-${range[1]} of ${total} employees`,
//                 size: "default",
//               }}
//               scroll={{ x: 1000 }}
//               className="responsive-table"
//             />
//           )}
//         </Card>
//       </Content>

//       {/* Edit Employee Modal */}
//       <Modal
//         title="Edit Employee"
//         open={editModalVisible}
//         onCancel={() => {
//           setEditModalVisible(false);
//           editForm.resetFields();
//         }}
//         footer={null}
//         width={800}
//       >
//         <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="firstName"
//                 label="First Name"
//                 rules={[{ required: true, message: "Please enter first name" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="lastName" label="Last Name">
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="email"
//                 label="Email"
//                 rules={[
//                   { required: true, message: "Please enter email" },
//                   { type: "email", message: "Please enter valid email" },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="phone" label="Phone">
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="position"
//                 label="Position"
//                 rules={[{ required: true, message: "Please enter position" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="department"
//                 label="Department"
//                 rules={[
//                   { required: true, message: "Please select department" },
//                 ]}
//               >
//                 <Select>
//                   <Option value="HR">HR</Option>
//                   <Option value="IT">IT</Option>
//                   <Option value="Finance">Finance</Option>
//                   <Option value="Marketing">Marketing</Option>
//                   <Option value="Sales">Sales</Option>
//                   <Option value="Operations">Operations</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="employmentType" label="Employment Type">
//                 <Select>
//                   <Option value="full-time">Full Time</Option>
//                   <Option value="part-time">Part Time</Option>
//                   <Option value="contract">Contract</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="status" label="Status">
//                 <Select>
//                   <Option value="active">Active</Option>
//                   <Option value="inactive">Inactive</Option>
//                   <Option value="terminated">Terminated</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="dob" label="Date of Birth">
//                 <DatePicker style={{ width: "100%" }} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="joinDate" label="Join Date">
//                 <DatePicker style={{ width: "100%" }} />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item name="address" label="Address">
//                 <Input.TextArea rows={3} />
//               </Form.Item>
//             </Col>
//           </Row>
//           <div className="text-right">
//             <Space>
//               <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
//               <Button type="primary" htmlType="submit">
//                 Update Employee
//               </Button>
//             </Space>
//           </div>
//         </Form>
//       </Modal>

//       {/* Upload Document Modal */}
//       <Modal
//         title={`Upload Document for ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`}
//         open={documentModalVisible}
//         onCancel={() => {
//           setDocumentModalVisible(false);
//           documentForm.resetFields();
//         }}
//         footer={null}
//       >
//         <Form
//           form={documentForm}
//           layout="vertical"
//           onFinish={handleDocumentUpload}
//         >
//           <Form.Item
//             name="documentType"
//             label="Document Type"
//             rules={[{ required: true, message: "Please select document type" }]}
//           >
//             <Select placeholder="Select document type">
//               <Option value="nid">National ID</Option>
//               <Option value="certificate">Certificate</Option>
//               <Option value="contract">Contract</Option>
//               <Option value="resume">Resume</Option>
//               <Option value="other">Other</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="document"
//             label="Document File"
//             rules={[
//               {
//                 required: true,
//                 message: "Please upload a document",
//               },
//             ]}
//             valuePropName="fileList"
//             getValueFromEvent={(e) => {
//               // Return only the file list
//               if (Array.isArray(e)) {
//                 return e;
//               }
//               return e && e.fileList;
//             }}
//           >
//             <Upload
//               beforeUpload={(file) => {
//                 // Prevent auto upload
//                 return false;
//               }}
//               maxCount={1}
//               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
//               onRemove={() => {
//                 // Clear the file when removed
//                 documentForm.setFieldValue("document", []);
//               }}
//             >
//               <Button icon={<UploadOutlined />}>Select Document</Button>
//             </Upload>
//           </Form.Item>
//           <div className="text-right">
//             <Space>
//               <Button onClick={() => setDocumentModalVisible(false)}>
//                 Cancel
//               </Button>
//               <Button type="primary" htmlType="submit" loading={uploadLoading}>
//                 Upload Document
//               </Button>
//             </Space>
//           </div>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// }




import React, { useState, useEffect, useMemo } from "react";
import {
  Layout,
  Table,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Spin,
  message,
  Input,
  Select,
  Avatar,
  Badge,
  Statistic,
  Dropdown,
  Menu,
  Modal,
  Form,
  Upload,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  TeamOutlined,
  MailOutlined,
  PhoneOutlined,
  BarChartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useEmployees } from "../hooks/useEmployees";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;
const { Search } = Input;

export default function AllEmployees() {
  const { 
    employees, 
    loading, 
    loadEmployees, 
    removeEmployee, 
    selectEmployee 
  } = useEmployees();
  
  const [searchText, setSearchText] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [editForm] = Form.useForm();
  const [documentForm] = Form.useForm();
  const navigate = useNavigate();

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    if (searchText) {
      filtered = filtered.filter(
        (emp) =>
          emp.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
          emp.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
          emp.email?.toLowerCase().includes(searchText.toLowerCase()) ||
          emp.position?.toLowerCase().includes(searchText.toLowerCase()) ||
          emp.employeeId?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((emp) => emp.department === departmentFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((emp) => emp.status === statusFilter);
    }

    return filtered;
  }, [searchText, departmentFilter, statusFilter, employees]);

  // Helper functions
  const getStatusColor = (status) => {
    const colors = {
      active: "green",
      inactive: "red",
      terminated: "volcano",
    };
    return colors[status] || "default";
  };

  const getDepartmentColor = (department) => {
    const colors = {
      HR: "pink",
      IT: "blue",
      Finance: "green",
      Marketing: "orange",
      Sales: "purple",
      Operations: "red",
      Administration: "cyan",
    };
    return colors[department] || "default";
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    editForm.setFieldsValue({
      ...employee,
      dob: employee.dob ? dayjs(employee.dob) : null,
      joinDate: employee.joinDate ? dayjs(employee.joinDate) : null,
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (values[key] !== undefined && values[key] !== null) {
          if (values[key] instanceof dayjs) {
            formData.append(key, values[key].format("YYYY-MM-DD"));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      const response = await fetch(
        `http://localhost:3000/api/v1/employee/update/${selectedEmployee._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        message.success("Employee updated successfully!");
        setEditModalVisible(false);
        editForm.resetFields();
        loadEmployees(); // Refresh the list
      }
    } catch (error) {
      console.error("Update employee error:", error);
      message.error("Failed to update employee");
    }
  };

  // Delete Employee
  const handleDelete = async (employeeId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this employee?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await removeEmployee(employeeId);
        } catch (error) {
          console.error("Delete employee error:", error);
        }
      },
    });
  };

  // Upload Document
  const handleDocumentUpload = async (values) => {
    try {
      setUploadLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("documentType", values.documentType);

      if (values.document && values.document.length > 0) {
        const file = values.document[0].originFileObj;
        formData.append("document", file);
      } else {
        message.error("Please select a document file");
        setUploadLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/employee/${selectedEmployee._id}/documents`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        message.success("Document uploaded successfully!");
        setDocumentModalVisible(false);
        documentForm.resetFields();
        loadEmployees(); // Refresh the list
      }
    } catch (error) {
      console.error("Upload document error:", error);
      message.error("Failed to upload document");
    } finally {
      setUploadLoading(false);
    }
  };

  // Table Columns
  const columns = [
    {
      title: "Employee",
      key: "employee",
      width: 250,
      render: (record) => (
        <Space>
          <Badge dot color={getStatusColor(record.status)} offset={[-5, 35]}>
            <Avatar
              src={record.image ? `${record.image}` : null}
              icon={<UserOutlined />}
              size="large"
              className="shadow-sm"
              onError={() => {
                console.log("Image failed to load:", record.image);
              }}
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
              <PhoneOutlined className="mr-1" />
              {record.phone || "Not provided"}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (id) => (
        <Text strong className="text-blue-600">
          {id}
        </Text>
      ),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position) => <Text>{position}</Text>,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (department) => (
        <Tag color={getDepartmentColor(department)} className="font-medium">
          {department}
        </Tag>
      ),
    },
    {
      title: "Employment Type",
      dataIndex: "employmentType",
      key: "employmentType",
      render: (type) => (
        <Tag color={type === "full-time" ? "blue" : "orange"}>
          {type?.replace("-", " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (date) => (
        <Text className="text-gray-600">
          {date ? dayjs(date).format("MMM DD, YYYY") : "Not set"}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} className="font-semibold">
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="view"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/employee/${record._id}`)}
              >
                View Details
              </Menu.Item>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="document"
                icon={<UploadOutlined />}
                onClick={() => {
                  setSelectedEmployee(record);
                  setDocumentModalVisible(true);
                }}
              >
                Upload Document
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="hover:bg-gray-100"
          />
        </Dropdown>
      ),
    },
  ];

  // Statistics
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((emp) => emp.status === "active").length;
    const inactive = employees.filter((emp) => emp.status === "inactive").length;
    const terminated = employees.filter((emp) => emp.status === "terminated").length;

    const departmentCount = employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});

    const largestDepartment = Object.entries(departmentCount).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return {
      total,
      active,
      inactive,
      terminated,
      activePercentage: total > 0 ? ((active / total) * 100).toFixed(1) : 0,
      largestDepartment: largestDepartment
        ? `${largestDepartment[0]} (${largestDepartment[1]})`
        : "N/A",
    };
  }, [employees]);

  return (
    <Layout style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Header
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "0 24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Row justify="space-between" align="middle" style={{ height: 64 }}>
          <Col>
            <Space>
              <TeamOutlined style={{ fontSize: 24, color: "white" }} />
              <Title level={3} style={{ margin: 0, color: "white" }}>
                Employee Directory
              </Title>
            </Space>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => navigate("/hr/employees/add")}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                fontWeight: 600,
              }}
            >
              Add Employee
            </Button>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: "24px" }}>
        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-0">
              <Statistic
                title="Total Employees"
                value={stats.total}
                prefix={<TeamOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-0">
              <Statistic
                title="Active Employees"
                value={stats.active}
                valueStyle={{ color: "#52c41a" }}
                suffix={`/ ${stats.total}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-0">
              <Statistic
                title="Active Rate"
                value={stats.activePercentage}
                suffix="%"
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-0">
              <Statistic
                title="Largest Department"
                value={stats.largestDepartment}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: "#fa8c16", fontSize: "16px" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Card className="shadow-sm border-0 mb-6">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <Search
                placeholder="Search employees..."
                allowClear
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col xs={12} md={4}>
              <Select
                placeholder="Department"
                size="large"
                style={{ width: "100%" }}
                value={departmentFilter}
                onChange={setDepartmentFilter}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">All Departments</Option>
                <Option value="HR">HR</Option>
                <Option value="IT">IT</Option>
                <Option value="Finance">Finance</Option>
                <Option value="Marketing">Marketing</Option>
                <Option value="Sales">Sales</Option>
                <Option value="Operations">Operations</Option>
              </Select>
            </Col>
            <Col xs={12} md={4}>
              <Select
                placeholder="Status"
                size="large"
                style={{ width: "100%" }}
                value={statusFilter}
                onChange={setStatusFilter}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="terminated">Terminated</Option>
              </Select>
            </Col>
            <Col xs={24} md={8} className="text-right">
              <Text type="secondary">
                Showing {filteredEmployees.length} of {employees.length} employees
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Employees Table */}
        <Card
          className="shadow-sm border-0"
          title={
            <Space>
              <TeamOutlined />
              <span>Employees List</span>
              <Tag color="blue">{filteredEmployees.length}</Tag>
            </Space>
          }
          extra={
            <Button
              icon={<BarChartOutlined />}
              onClick={() => navigate("/hr/analytics")}
            >
              Analytics
            </Button>
          }
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">Loading employees...</Text>
              </div>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredEmployees}
              rowKey="_id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} employees`,
              }}
              scroll={{ x: 1000 }}
              className="responsive-table"
            />
          )}
        </Card>
      </Content>

      {/* Edit Employee Modal */}
      <Modal
        title="Edit Employee"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          editForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastName" label="Last Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: "Please enter position" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: "Please select department" }]}
              >
                <Select>
                  <Option value="HR">HR</Option>
                  <Option value="IT">IT</Option>
                  <Option value="Finance">Finance</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Sales">Sales</Option>
                  <Option value="Operations">Operations</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="employmentType" label="Employment Type">
                <Select>
                  <Option value="full-time">Full Time</Option>
                  <Option value="part-time">Part Time</Option>
                  <Option value="contract">Contract</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status">
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="terminated">Terminated</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dob" label="Date of Birth">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="joinDate" label="Join Date">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" label="Address">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
          <div className="text-right">
            <Space>
              <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update Employee
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        title={`Upload Document for ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`}
        open={documentModalVisible}
        onCancel={() => {
          setDocumentModalVisible(false);
          documentForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={documentForm}
          layout="vertical"
          onFinish={handleDocumentUpload}
        >
          <Form.Item
            name="documentType"
            label="Document Type"
            rules={[{ required: true, message: "Please select document type" }]}
          >
            <Select placeholder="Select document type">
              <Option value="nid">National ID</Option>
              <Option value="certificate">Certificate</Option>
              <Option value="contract">Contract</Option>
              <Option value="resume">Resume</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="document"
            label="Document File"
            rules={[{ required: true, message: "Please upload a document" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              onRemove={() => {
                documentForm.setFieldValue("document", []);
              }}
            >
              <Button icon={<UploadOutlined />}>Select Document</Button>
            </Upload>
          </Form.Item>
          <div className="text-right">
            <Space>
              <Button onClick={() => setDocumentModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={uploadLoading}>
                Upload Document
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
}



