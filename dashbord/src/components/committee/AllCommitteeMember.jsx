// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Table,
//   Card,
//   Input,
//   Select,
//   Button,
//   Space,
//   Tag,
//   Avatar,
//   Row,
//   Col,
//   Typography,
//   Statistic,
//   Modal,
//   message,
//   Dropdown,
//   Menu,
//   Badge,
//   Tooltip,
//   DatePicker
// } from 'antd';
// import {
//   TeamOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   UserOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   MoreOutlined,
//   CrownOutlined,
//   ApartmentOutlined,
//   CalendarOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// export default function AllCommitteeMembers() {
//   const navigate = useNavigate();
//   const [committeeMembers, setCommitteeMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [stats, setStats] = useState({});
//   const [searchText, setSearchText] = useState('');
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('active');
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//     total: 0
//   });

//   const committeeRoles = [
//     'President',
//     'ExecutivePresident', 
//     'VicePresident',
//     'GeneralSecretary',
//     'JointGeneralSecretary',
//     'OrganizingSecretary',
//     'FinanceSecretary',
//     'PublicityAndPublicationSecretary',
//     'OfficeSecretary',
//     'SocialWelfareAffairsSecretary',
//     'LegalAffairsSecretary',
//     'ReligiousAffairsSecretary',
//     'PriyaAndCulturalAffairsSecretary',
//     'WomensAffairsSecretary',
//     'EnvironmentalAffairsSecretary',
//     'ExecutiveWorkingMember'
//   ];

//   // Load committee members
//   const loadCommitteeMembers = async (page = 1, filters = {}) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = {
//         page,
//         limit: pagination.pageSize,
//         ...filters
//       };

//       const response = await axios.get('http://localhost:3000/api/v1/committee/members', {
//         headers: { Authorization: `Bearer ${token}` },
//         params
//       });

//       if (response.data.success) {
//         setCommitteeMembers(response.data.committeeMembers);
//         setPagination(prev => ({
//           ...prev,
//           current: response.data.page,
//           total: response.data.total
//         }));
//       }
//     } catch (error) {
//       console.error('Load committee members error:', error);
//       message.error('Failed to load committee members');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load statistics
//   const loadStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/committee/members/stats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setStats(response.data.stats);
//       }
//     } catch (error) {
//       console.error('Load stats error:', error);
//     }
//   };

//   useEffect(() => {
//     loadCommitteeMembers();
//     loadStats();
//   }, []);

//   useEffect(() => {
//     const filters = {};
//     if (searchText) filters.search = searchText;
//     if (roleFilter !== 'all') filters.role = roleFilter;
//     if (statusFilter !== 'all') filters.status = statusFilter;
    
//     loadCommitteeMembers(1, filters);
//   }, [searchText, roleFilter, statusFilter]);

//   const handleTableChange = (pagination) => {
//     loadCommitteeMembers(pagination.current);
//   };

//   const handleRemoveMember = async (memberId) => {
//     Modal.confirm({
//       title: 'Remove from Committee',
//       content: 'Are you sure you want to remove this member from the committee?',
//       okText: 'Yes, Remove',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.delete(
//             `http://localhost:3000/api/v1/committee/members/${memberId}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (response.data.success) {
//             message.success('Committee member removed successfully');
//             loadCommitteeMembers();
//             loadStats();
//           }
//         } catch (error) {
//           console.error('Remove committee member error:', error);
//           message.error('Failed to remove committee member');
//         }
//       },
//     });
//   };

//   const getRoleColor = (role) => {
//     const roleColors = {
//       President: 'red',
//       ExecutivePresident: 'volcano',
//       VicePresident: 'orange',
//       GeneralSecretary: 'gold',
//       JointGeneralSecretary: 'lime',
//       OrganizingSecretary: 'green',
//       FinanceSecretary: 'cyan',
//       PublicityAndPublicationSecretary: 'blue',
//       OfficeSecretary: 'purple',
//       ExecutiveWorkingMember: 'default'
//     };
//     return roleColors[role] || 'blue';
//   };

//   const getStatusTag = (status, term) => {
//     const now = new Date();
//     const isTermActive = new Date(term.startDate) <= now && 
//                         (!term.endDate || new Date(term.endDate) >= now);

//     if (status === 'active' && isTermActive) {
//       return <Tag color="green" icon={<CheckCircleOutlined />}>Active</Tag>;
//     } else if (status === 'active' && !isTermActive) {
//       return <Tag color="orange" icon={<CalendarOutlined />}>Term Ended</Tag>;
//     } else {
//       return <Tag color="red" icon={<CloseCircleOutlined />}>Inactive</Tag>;
//     }
//   };

//   const getMemberInfo = (member) => {
//     const memberInfo = member.memberInfo;
//     if (!memberInfo) return null;

//     return {
//       name: `${memberInfo.firstName} ${memberInfo.lastName}`,
//       email: memberInfo.email,
//       identifier: memberInfo.membershipId || memberInfo.employeeId,
//       profilePhoto: memberInfo.profilePhoto || memberInfo.image,
//       source: member.memberModel,
//       position: memberInfo.position,
//       department: memberInfo.department
//     };
//   };

//   const columns = [
//     {
//       title: 'Member',
//       key: 'member',
//       width: 280,
//       render: (record) => {
//         const info = getMemberInfo(record);
//         if (!info) return <Text type="secondary">Member not found</Text>;

//         return (
//           <Space>
//             <Badge 
//               dot={record.committeeStatus === 'active'} 
//               color="green" 
//               offset={[-5, 35]}
//             >
//               <Avatar src={info.profilePhoto} icon={<UserOutlined />} size="large" />
//             </Badge>
//             <div>
//               <div className="font-semibold">{info.name}</div>
//               <div className="text-xs text-gray-500">
//                 {info.email}
//               </div>
//               <div className="text-xs text-gray-500">
//                 {info.identifier} • {info.source}
//               </div>
//             </div>
//           </Space>
//         );
//       },
//     },
//     {
//       title: 'Committee Role',
//       dataIndex: 'committeeRole',
//       key: 'committeeRole',
//       render: (role) => (
//         <Tag color={getRoleColor(role)} className="font-semibold">
//           {role.replace(/([A-Z])/g, ' $1').trim()}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Term Period',
//       key: 'term',
//       render: (record) => (
//         <div>
//           <div className="flex items-center text-sm">
//             <CalendarOutlined className="mr-1 text-gray-400" />
//             {dayjs(record.term.startDate).format('MMM YYYY')} -{' '}
//             {record.term.endDate ? 
//               dayjs(record.term.endDate).format('MMM YYYY') : 
//               'Present'
//             }
//           </div>
//           {record.term.endDate && (
//             <div className="text-xs text-gray-500">
//               {Math.ceil((new Date(record.term.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Status',
//       key: 'status',
//       render: (record) => getStatusTag(record.committeeStatus, record.term),
//     },
//     {
//       title: 'Rights',
//       key: 'rights',
//       render: (record) => (
//         <Space size="small">
//           {record.votingRights && (
//             <Tooltip title="Voting Rights">
//               <Tag color="blue" size="small">Vote</Tag>
//             </Tooltip>
//           )}
//           {record.canChairMeetings && (
//             <Tooltip title="Can Chair Meetings">
//               <Tag color="green" size="small">Chair</Tag>
//             </Tooltip>
//           )}
//         </Space>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 120,
//       render: (record) => (
//         <Dropdown
//           overlay={
//             <Menu>
//               <Menu.Item
//                 key="view"
//                 icon={<EyeOutlined />}
//                 onClick={() => navigate(`/committee-members/${record._id}`)}
//               >
//                 View Details
//               </Menu.Item>
//               <Menu.Item
//                 key="edit"
//                 icon={<EditOutlined />}
//                 onClick={() => navigate(`/committee-members/edit/${record._id}`)}
//               >
//                 Edit
//               </Menu.Item>
//               <Menu.Divider />
//               <Menu.Item
//                 key="remove"
//                 icon={<DeleteOutlined />}
//                 danger
//                 onClick={() => handleRemoveMember(record._id)}
//               >
//                 Remove from Committee
//               </Menu.Item>
//             </Menu>
//           }
//           trigger={['click']}
//         >
//           <Button type="text" icon={<MoreOutlined />} className="hover:bg-gray-100" />
//         </Dropdown>
//       ),
//     },
//   ];

//   const filteredMembers = useMemo(() => {
//     return committeeMembers.filter(member => {
//       const info = getMemberInfo(member);
//       if (!info) return false;

//       const matchesSearch = !searchText || 
//         info.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         info.email.toLowerCase().includes(searchText.toLowerCase()) ||
//         info.identifier.toLowerCase().includes(searchText.toLowerCase());

//       const matchesRole = roleFilter === 'all' || member.committeeRole === roleFilter;
//       const matchesStatus = statusFilter === 'all' || member.committeeStatus === statusFilter;

//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [committeeMembers, searchText, roleFilter, statusFilter]);

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//           <div>
//             <Title level={2} className="flex items-center">
//               <CrownOutlined className="mr-3 text-purple-600" />
//               Committee Members
//             </Title>
//             <Text type="secondary" className="text-lg">
//               Governing Body Management
//             </Text>
//           </div>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             size="large"
//             onClick={() => navigate('/add-committee-member')}
//           >
//             Add Committee Member
//           </Button>
//         </div>
//       </div>

//       {/* Statistics Cards */}
//       <Row gutter={[16, 16]} className="mb-6">
//         <Col xs={24} sm={12} md={6}>
//           <Card className="text-center shadow-sm">
//             <Statistic
//               title="Total Committee Members"
//               value={stats.totalMembers || 0}
//               prefix={<TeamOutlined />}
//               valueStyle={{ color: '#1890ff' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className="text-center shadow-sm">
//             <Statistic
//               title="Active Members"
//               value={stats.activeMembers || 0}
//               valueStyle={{ color: '#52c41a' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className="text-center shadow-sm">
//             <Statistic
//               title="User Members"
//               value={stats.sourceDistribution?.find(s => s._id === 'User')?.count || 0}
//               prefix={<UserOutlined />}
//               valueStyle={{ color: '#faad14' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className="text-center shadow-sm">
//             <Statistic
//               title="Employee Members"
//               value={stats.sourceDistribution?.find(s => s._id === 'Employee')?.count || 0}
//               prefix={<ApartmentOutlined />}
//               valueStyle={{ color: '#722ed1' }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Filters Section */}
//       <Card className="mb-6 shadow-sm">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <Input
//               placeholder="Search committee members..."
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               prefix={<SearchOutlined />}
//               size="large"
//               allowClear
//             />
//           </div>
//           <Select
//             placeholder="Filter by Role"
//             size="large"
//             style={{ width: 200 }}
//             value={roleFilter}
//             onChange={setRoleFilter}
//           >
//             <Option value="all">All Roles</Option>
//             {committeeRoles.map(role => (
//               <Option key={role} value={role}>
//                 {role.replace(/([A-Z])/g, ' $1').trim()}
//               </Option>
//             ))}
//           </Select>
//           <Select
//             placeholder="Filter by Status"
//             size="large"
//             style={{ width: 150 }}
//             value={statusFilter}
//             onChange={setStatusFilter}
//           >
//             <Option value="all">All Status</Option>
//             <Option value="active">Active</Option>
//             <Option value="inactive">Inactive</Option>
//             <Option value="suspended">Suspended</Option>
//           </Select>
//         </div>
//       </Card>

//       {/* Committee Members Table */}
//       <Card 
//         title={
//           <Space>
//             <TeamOutlined />
//             <span>Committee Members</span>
//             <Tag color="blue">{filteredMembers.length}</Tag>
//           </Space>
//         }
//         className="shadow-sm"
//       >
//         <Table
//           columns={columns}
//           dataSource={filteredMembers}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1000 }}
//           pagination={{
//             current: pagination.current,
//             pageSize: pagination.pageSize,
//             total: pagination.total,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) => 
//               `${range[0]}-${range[1]} of ${total} committee members`
//           }}
//           onChange={handleTableChange}
//         />
//       </Card>
//     </div>
//   );
// }



//////////////////////////USING REDUX/////////////////////


// import React, { useEffect, useState } from 'react';
// import { useEmployees } from '../hooks/useEmployees';
// import {
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Input,
//   Select,
//   DatePicker,
//   Tag,
//   Row,
//   Col,
//   Alert,
//   Spin,
//   Space,
//   Typography,
//   Divider
// } from 'antd';
// import {
//   EditOutlined,
//   DeleteOutlined,
//   UserAddOutlined,
//   TeamOutlined,
//   UserOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined
// } from '@ant-design/icons';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;

// const AllCommitteeMembers = () => {
//   const {
//     committeeMembers,
//     committeePositions,
//     employees,
//     loading,
//     error,
//     addCommitteeMember,
//     updateCommitteeMember,
//     removeCommitteeMember,
//     getCommitteeMembers,
//     getCommitteeStats
//   } = useEmployees();

//   const [openModal, setOpenModal] = useState(false);
//   const [editingMember, setEditingMember] = useState(null);
//   const [form] = Form.useForm();

//   // Get committee members with employee details
//   const committeeMembersWithDetails = getCommitteeMembers();
//   const committeeStats = getCommitteeStats();

//   useEffect(() => {
//     // Committee members are already loaded via useEmployees hook
//   }, []);

//   const handleOpenModal = (member = null) => {
//     if (member) {
//       setEditingMember(member);
//       form.setFieldsValue({
//         employeeId: member.employeeId,
//         position: member.position,
//         termStart: member.termStart ? dayjs(member.termStart) : null,
//         termEnd: member.termEnd ? dayjs(member.termEnd) : null,
//         responsibilities: member.responsibilities || '',
//         status: member.status
//       });
//     } else {
//       setEditingMember(null);
//       form.resetFields();
//     }
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setEditingMember(null);
//     form.resetFields();
//   };

//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();
      
//       const formData = {
//         ...values,
//         termStart: values.termStart ? values.termStart.format('YYYY-MM-DD') : '',
//         termEnd: values.termEnd ? values.termEnd.format('YYYY-MM-DD') : ''
//       };

//       if (editingMember) {
//         updateCommitteeMember({
//           employeeId: editingMember.employeeId,
//           ...formData
//         });
//       } else {
//         addCommitteeMember(formData);
//       }
//       handleCloseModal();
//     } catch (error) {
//       console.error('Form validation failed:', error);
//     }
//   };

//   const handleDelete = (employeeId) => {
//     Modal.confirm({
//       title: 'Remove Committee Member',
//       content: 'Are you sure you want to remove this committee member?',
//       okText: 'Yes, Remove',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk() {
//         removeCommitteeMember(employeeId);
//       }
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'success';
//       case 'inactive': return 'error';
//       case 'pending': return 'warning';
//       default: return 'default';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'active': return <CheckCircleOutlined />;
//       case 'inactive': return <CloseCircleOutlined />;
//       case 'pending': return <ClockCircleOutlined />;
//       default: return null;
//     }
//   };

//   const getEmployeeName = (employeeId) => {
//     const employee = employees.find(emp => emp._id === employeeId);
//     return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
//   };

//   const getEmployeeDetails = (employeeId) => {
//     const employee = employees.find(emp => emp._id === employeeId);
//     return employee || null;
//   };

//   const columns = [
//     {
//       title: 'Employee',
//       dataIndex: 'employeeId',
//       key: 'employee',
//       render: (employeeId, record) => {
//         const employee = getEmployeeDetails(employeeId);
//         return (
//           <Space>
//             <UserOutlined style={{ color: '#1890ff' }} />
//             <div>
//               <Text strong>{getEmployeeName(employeeId)}</Text>
//               <br />
//               <Text type="secondary" style={{ fontSize: '12px' }}>
//                 {employee?.employeeId || 'N/A'}
//               </Text>
//             </div>
//           </Space>
//         );
//       }
//     },
//     {
//       title: 'Position',
//       dataIndex: 'position',
//       key: 'position',
//       render: (position, record) => (
//         <div>
//           <Text strong>{position}</Text>
//           {record.responsibilities && (
//             <div>
//               <Text type="secondary" style={{ fontSize: '12px' }}>
//                 {record.responsibilities}
//               </Text>
//             </div>
//           )}
//         </div>
//       )
//     },
//     {
//       title: 'Department',
//       key: 'department',
//       render: (_, record) => {
//         const employee = getEmployeeDetails(record.employeeId);
//         return employee?.department || 'N/A';
//       }
//     },
//     {
//       title: 'Term Start',
//       dataIndex: 'termStart',
//       key: 'termStart',
//       render: (termStart) => 
//         termStart ? dayjs(termStart).format('DD/MM/YYYY') : 'Not set'
//     },
//     {
//       title: 'Term End',
//       dataIndex: 'termEnd',
//       key: 'termEnd',
//       render: (termEnd) => 
//         termEnd ? dayjs(termEnd).format('DD/MM/YYYY') : 'Not set'
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag 
//           color={getStatusColor(status)} 
//           icon={getStatusIcon(status)}
//           style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
//         >
//           {status.toUpperCase()}
//         </Tag>
//       )
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       align: 'center',
//       render: (_, record) => (
//         <Space>
//           <Button 
//             type="primary" 
//             icon={<EditOutlined />} 
//             size="small"
//             onClick={() => handleOpenModal(record)}
//           >
//             Edit
//           </Button>
//           <Button 
//             type="primary" 
//             danger 
//             icon={<DeleteOutlined />} 
//             size="small"
//             onClick={() => handleDelete(record.employeeId)}
//           >
//             Remove
//           </Button>
//         </Space>
//       )
//     }
//   ];

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '24px' }}>
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
//         <Title level={2} style={{ margin: 0 }}>
//           <TeamOutlined /> Committee Members
//         </Title>
//         <Button
//           type="primary"
//           icon={<UserAddOutlined />}
//           onClick={() => handleOpenModal()}
//           disabled={employees.length === 0}
//           size="large"
//         >
//           Add Member
//         </Button>
//       </div>

//       {/* Error Alert */}
//       {error && (
//         <Alert 
//           message="Error" 
//           description={error} 
//           type="error" 
//           showIcon 
//           style={{ marginBottom: '16px' }}
//           closable
//         />
//       )}

//       {/* No Employees Warning */}
//       {employees.length === 0 && (
//         <Alert 
//           message="No Employees Available" 
//           description="Please add employees first before assigning committee members." 
//           type="warning" 
//           showIcon 
//           style={{ marginBottom: '16px' }}
//         />
//       )}

//       {/* Statistics Cards */}
//       <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
//         <Col xs={24} sm={12} md={6}>
//           <Card>
//             <div style={{ textAlign: 'center' }}>
//               <Title level={1} style={{ color: '#1890ff', margin: 0 }}>
//                 {committeeStats.totalMembers}
//               </Title>
//               <Text type="secondary">Total Committee Members</Text>
//             </div>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card>
//             <div style={{ textAlign: 'center' }}>
//               <Title level={1} style={{ color: '#52c41a', margin: 0 }}>
//                 {committeeStats.activeMembers}
//               </Title>
//               <Text type="secondary">Active Members</Text>
//             </div>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card>
//             <div style={{ textAlign: 'center' }}>
//               <Title level={1} style={{ color: '#fa8c16', margin: 0 }}>
//                 {committeeStats.totalEmployees}
//               </Title>
//               <Text type="secondary">Total Employees</Text>
//             </div>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card>
//             <div style={{ textAlign: 'center' }}>
//               <Title level={1} style={{ color: '#722ed1', margin: 0 }}>
//                 {committeeStats.committeePercentage}%
//               </Title>
//               <Text type="secondary">Committee Percentage</Text>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       <Divider />

//       {/* Members Table */}
//       <Card>
//         <Table
//           columns={columns}
//           dataSource={committeeMembersWithDetails}
//           rowKey={(record) => `${record.employeeId}-${record.position}`}
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) => 
//               `${range[0]}-${range[1]} of ${total} members`
//           }}
//           locale={{
//             emptyText: 'No committee members found'
//           }}
//         />
//       </Card>

//       {/* Add/Edit Modal */}
//       <Modal
//         title={
//           <span>
//             {editingMember ? 'Edit Committee Member' : 'Add Committee Member'}
//           </span>
//         }
//         open={openModal}
//         onCancel={handleCloseModal}
//         onOk={handleSubmit}
//         okText={editingMember ? 'Update Member' : 'Add Member'}
//         cancelText="Cancel"
//         width={600}
//         destroyOnClose
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           requiredMark="optional"
//         >
//           <Form.Item
//             name="employeeId"
//             label="Employee"
//             rules={[{ required: true, message: 'Please select an employee' }]}
//           >
//             <Select
//               placeholder="Select an employee"
//               disabled={!!editingMember}
//               showSearch
//               filterOption={(input, option) =>
//                 option.children.toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {employees.map((employee) => (
//                 <Option key={employee._id} value={employee._id}>
//                   {employee.firstName} {employee.lastName} - {employee.department}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="position"
//             label="Position"
//             rules={[{ required: true, message: 'Please select a position' }]}
//           >
//             <Select placeholder="Select a position">
//               {committeePositions.map((position, index) => (
//                 <Option key={`${position}-${index}`} value={position}>
//                   {position}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item name="termStart" label="Term Start">
//                 <DatePicker 
//                   style={{ width: '100%' }} 
//                   format="DD/MM/YYYY"
//                   placeholder="Select start date"
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="termEnd" label="Term End">
//                 <DatePicker 
//                   style={{ width: '100%' }} 
//                   format="DD/MM/YYYY"
//                   placeholder="Select end date"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item name="responsibilities" label="Responsibilities">
//             <TextArea
//               rows={3}
//               placeholder="Describe the responsibilities for this position..."
//             />
//           </Form.Item>

//           <Form.Item name="status" label="Status" initialValue="active">
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

// export default AllCommitteeMembers;


import React, { useEffect, useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tag,
  Row,
  Col,
  Alert,
  Spin,
  Space,
  Typography,
  Divider,
  message
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AllCommitteeMembers = () => {
  const {
    committeeMembers,
    committeePositions,
    employees,
    loading,
    error,
    addCommitteeMember,
    updateCommitteeMember,
    removeCommitteeMember,
    getCommitteeMembers,
    getCommitteeStats
  } = useEmployees();

  const [openModal, setOpenModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  // Get committee members with employee details
  const committeeMembersWithDetails = getCommitteeMembers();
  const committeeStats = getCommitteeStats();

  useEffect(() => {
    // Committee members are already loaded via useEmployees hook
  }, []);

  // Safe date formatting utility
  const formatDateSafe = (dateValue) => {
    if (!dateValue) return null;
    if (dayjs.isDayjs(dateValue)) {
      return dateValue.format('YYYY-MM-DD');
    }
    if (typeof dateValue === 'string') {
      return dateValue;
    }
    return null;
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      form.setFieldsValue({
        employeeId: member.employeeId,
        position: member.position,
        termStart: member.termStart ? dayjs(member.termStart) : dayjs(),
        termEnd: member.termEnd ? dayjs(member.termEnd) : null,
        responsibilities: member.responsibilities || '',
        status: member.status
      });
    } else {
      setEditingMember(null);
      form.resetFields();
      // Set default values for new member
      setTimeout(() => {
        form.setFieldsValue({
          status: 'active',
          termStart: dayjs()
        });
      }, 0);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingMember(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    
    try {
      const values = await form.validateFields();
      
      console.log('Form values:', values); // Debug log
      
      // Enhanced date handling with fallback
      let termStart = formatDateSafe(values.termStart);
      if (!termStart) {
        // If no date selected, use today's date as fallback
        termStart = dayjs().format('YYYY-MM-DD');
      }

      console.log('Term Start after processing:', termStart); // Debug log

      const formData = {
        ...values,
        termStart: termStart,
        termEnd: formatDateSafe(values.termEnd)
      };

      console.log('Final form data:', formData); // Debug log

      if (editingMember) {
        updateCommitteeMember({
          employeeId: editingMember.employeeId,
          ...formData
        });
        message.success('Committee member updated successfully!');
      } else {
        addCommitteeMember(formData);
        message.success('Committee member added successfully!');
      }
      
      handleCloseModal();
    } catch (error) {
      console.error('Form validation failed:', error);
      if (error.errorFields && error.errorFields.length > 0) {
        const firstError = error.errorFields[0];
        message.error(`${firstError.errors[0]}`);
      } else {
        message.error('Failed to save committee member. Please try again.');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = (employeeId) => {
    const member = committeeMembersWithDetails.find(m => m.employeeId === employeeId);
    Modal.confirm({
      title: 'Remove Committee Member',
      content: (
        <div>
          <p>Are you sure you want to remove this committee member?</p>
          {member && (
            <Alert
              message={
                <span>
                  This will remove <strong>{getEmployeeName(employeeId)}</strong> from the <strong>{member.position}</strong> position.
                </span>
              }
              type="warning"
              showIcon
              style={{ marginTop: '10px' }}
            />
          )}
        </div>
      ),
      okText: 'Yes, Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        removeCommitteeMember(employeeId);
        message.success('Committee member removed successfully!');
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircleOutlined />;
      case 'inactive': return <CloseCircleOutlined />;
      default: return <ExclamationCircleOutlined />;
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp._id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
  };

  const getEmployeeDetails = (employeeId) => {
    const employee = employees.find(emp => emp._id === employeeId);
    return employee || null;
  };

  const getRoleColor = (role) => {
    const roleColors = {
      President: 'red',
      ExecutivePresident: 'volcano',
      VicePresident: 'orange',
      GeneralSecretary: 'gold',
      JointGeneralSecretary: 'lime',
      OrganizingSecretary: 'green',
      FinanceSecretary: 'cyan',
      PublicityAndPublicationSecretary: 'blue',
      OfficeSecretary: 'purple',
      ExecutiveWorkingMember: 'default'
    };
    return roleColors[role] || 'blue';
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employeeId',
      key: 'employee',
      render: (employeeId, record) => {
        const employee = getEmployeeDetails(employeeId);
        return (
          <Space>
            <UserOutlined style={{ color: '#1890ff' }} />
            <div>
              <Text strong>{getEmployeeName(employeeId)}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {employee?.employeeId || 'N/A'}
              </Text>
            </div>
          </Space>
        );
      }
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position, record) => (
        <div>
          <Tag color={getRoleColor(position)} style={{ marginBottom: '4px' }}>
            {position}
          </Tag>
          {record.responsibilities && (
            <div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.responsibilities}
              </Text>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Department',
      key: 'department',
      render: (_, record) => {
        const employee = getEmployeeDetails(record.employeeId);
        return employee?.department || 'N/A';
      }
    },
    {
      title: 'Term Start',
      dataIndex: 'termStart',
      key: 'termStart',
      render: (termStart) => 
        termStart ? dayjs(termStart).format('DD/MM/YYYY') : 'Not set'
    },
    {
      title: 'Term End',
      dataIndex: 'termEnd',
      key: 'termEnd',
      render: (termEnd) => 
        termEnd ? dayjs(termEnd).format('DD/MM/YYYY') : 'Not set'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          color={getStatusColor(status)} 
          icon={getStatusIcon(status)}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleOpenModal(record)}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record.employeeId)}
          >
            Remove
          </Button>
        </Space>
      )
    }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>
          <TeamOutlined /> Committee Members
        </Title>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => handleOpenModal()}
          disabled={employees.length === 0}
          size="large"
        >
          Add Member
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert 
          message="Error" 
          description={error} 
          type="error" 
          showIcon 
          style={{ marginBottom: '16px' }}
          closable
        />
      )}

      {/* No Employees Warning */}
      {employees.length === 0 && (
        <Alert 
          message="No Employees Available" 
          description="Please add employees first before assigning committee members." 
          type="warning" 
          showIcon 
          style={{ marginBottom: '16px' }}
        />
      )}

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={1} style={{ color: '#1890ff', margin: 0 }}>
                {committeeStats.totalMembers}
              </Title>
              <Text type="secondary">Total Committee Members</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={1} style={{ color: '#52c41a', margin: 0 }}>
                {committeeStats.activeMembers}
              </Title>
              <Text type="secondary">Active Members</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={1} style={{ color: '#fa8c16', margin: 0 }}>
                {committeeStats.totalEmployees}
              </Title>
              <Text type="secondary">Total Employees</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={1} style={{ color: '#722ed1', margin: 0 }}>
                {committeeStats.committeePercentage}%
              </Title>
              <Text type="secondary">Committee Percentage</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Members Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={committeeMembersWithDetails}
          rowKey={(record) => `${record.employeeId}-${record.position}`}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} members`
          }}
          locale={{
            emptyText: 'No committee members found. Click "Add Member" to get started.'
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={
          <span>
            <TeamOutlined style={{ marginRight: '8px' }} />
            {editingMember ? 'Edit Committee Member' : 'Add Committee Member'}
          </span>
        }
        open={openModal}
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        okText={editingMember ? 'Update Member' : 'Add Member'}
        cancelText="Cancel"
        confirmLoading={submitLoading}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          initialValues={{
            status: 'active',
            termStart: dayjs()
          }}
        >
          <Form.Item
            name="employeeId"
            label="Employee"
            rules={[{ required: true, message: 'Please select an employee' }]}
          >
            <Select
              placeholder="Select an employee"
              disabled={!!editingMember}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {employees.map((employee) => (
                <Option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName} - {employee.department}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please select a position' }]}
          >
            <Select placeholder="Select a position">
              {committeePositions.map((position, index) => (
                <Option key={`${position}-${index}`} value={position}>
                  <Tag color={getRoleColor(position)}>
                    {position}
                  </Tag>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="termStart" 
                label="Term Start"
                rules={[{ required: true, message: 'Please select term start date' }]}
                initialValue={dayjs()} // Set initial value at field level
              >
                <DatePicker 
                  style={{ width: '100%' }} 
                  format="DD/MM/YYYY"
                  placeholder="Select start date"
                  // Remove restrictive date validation to allow any date selection
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="termEnd" label="Term End">
                <DatePicker 
                  style={{ width: '100%' }} 
                  format="DD/MM/YYYY"
                  placeholder="Select end date"
                  // Remove restrictive date validation
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="responsibilities" label="Responsibilities">
            <TextArea
              rows={3}
              placeholder="Describe the responsibilities for this position..."
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item name="status" label="Status" initialValue="active">
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllCommitteeMembers;

