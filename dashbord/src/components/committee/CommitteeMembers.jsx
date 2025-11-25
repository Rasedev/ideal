



// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   Table,
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
//   Statistic,
//   Descriptions,
//   Divider,
//   Tooltip,
//   Dropdown,
// } from 'antd';
// import {
//   TeamOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   CrownOutlined,
//   ApartmentOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const { Title, Text } = Typography;
// const { Option } = Select;

// const CommitteeMembers = () => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [filterPosition, setFilterPosition] = useState('');
//   const [stats, setStats] = useState({});
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchCommitteeMembers();
//     fetchCommitteeStats();
//   }, [searchText, filterPosition]);

//   const fetchCommitteeMembers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/committee/members', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { search: searchText, position: filterPosition }
//       });

//       if (response.data.success) {
//         setMembers(response.data.members || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch committee members');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCommitteeStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/committee/stats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch committee stats');
//     }
//   };

//   const handleAddMember = async (values) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/committee/members',
//         values,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success('Committee member added successfully');
//         setModalVisible(false);
//         form.resetFields();
//         fetchCommitteeMembers();
//         fetchCommitteeStats();
//       }
//     } catch (error) {
//       message.error('Failed to add committee member');
//     }
//   };

//   const getPositionTag = (position) => {
//     const positionConfig = {
//       president: { color: 'red', icon: <CrownOutlined />, text: 'President' },
//       executivepresident: { color: 'volcano', text: 'Executive President' },
//       vicepresident: { color: 'orange', text: 'Vice President' },
//       generalsecretary: { color: 'gold', text: 'General Secretary' },
//       jointsecretary: { color: 'lime', text: 'Joint Secretary' },
//       organizingsecretary: { color: 'green', text: 'Organizing Secretary' },
//       financesecretary: { color: 'cyan', text: 'Finance Secretary' },
//       publicitysecretary: { color: 'blue', text: 'Publicity Secretary' },
//       officesecretary: { color: 'purple', text: 'Office Secretary' },
//       executivemember: { color: 'default', text: 'Executive Member' },
//     };

//     const config = positionConfig[position?.toLowerCase()] || { color: 'default', text: position };
//     return (
//       <Tag color={config.color} icon={config.icon}>
//         {config.text}
//       </Tag>
//     );
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: { color: 'green', text: 'Active' },
//       inactive: { color: 'red', text: 'Inactive' },
//       suspended: { color: 'orange', text: 'Suspended' },
//     };
//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const columns = [
//     {
//       title: 'Member',
//       dataIndex: 'user',
//       key: 'member',
//       render: (user) => (
//         <Space>
//           <Avatar src={user?.image} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium">
//               {`${user?.firstName} ${user?.lastName}`}
//             </div>
//             <div className="text-xs text-gray-500">
//               {user?.membershipId}
//             </div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Position',
//       dataIndex: 'position',
//       key: 'position',
//       render: (position) => getPositionTag(position),
//     },
//     {
//       title: 'Contact',
//       dataIndex: 'user',
//       key: 'contact',
//       render: (user) => (
//         <div>
//           <div className="flex items-center">
//             <MailOutlined className="mr-1 text-gray-400" />
//             <Text className="text-sm">{user?.email}</Text>
//           </div>
//           <div className="flex items-center">
//             <PhoneOutlined className="mr-1 text-gray-400" />
//             <Text className="text-sm">{user?.phone}</Text>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Term Start',
//       dataIndex: 'termStart',
//       key: 'termStart',
//       render: (date) => new Date(date).toLocaleDateString(),
//     },
//     {
//       title: 'Term End',
//       dataIndex: 'termEnd',
//       key: 'termEnd',
//       render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getStatusTag(status),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button
//               type="text"
//               icon={<EyeOutlined />}
//               onClick={() => setSelectedMember(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit Member">
//             <Button
//               type="text"
//               icon={<EditOutlined />}
//             />
//           </Tooltip>
//           <Dropdown
//             menu={{
//               items: [
//                 { key: 'view', icon: <EyeOutlined />, label: 'View Details' },
//                 { key: 'edit', icon: <EditOutlined />, label: 'Edit' },
//                 { type: 'divider' },
//                 { key: 'remove', icon: <DeleteOutlined />, label: 'Remove from Committee', danger: true },
//               ],
//             }}
//             trigger={['click']}
//           >
//             <Button type="text" icon={<DeleteOutlined />} />
//           </Dropdown>
//         </Space>
//       ),
//     },
//   ];

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   const positionOptions = [
//     'President',
//     'ExecutivePresident',
//     'VicePresident', 
//     'GeneralSecretary',
//     'JointSecretary',
//     'OrganizingSecretary',
//     'FinanceSecretary',
//     'PublicitySecretary',
//     'OfficeSecretary',
//     'SocialWelfareSecretary',
//     'LegalSecretary',
//     'ReligiousSecretary',
//     'CulturalSecretary',
//     'WomenAffairsSecretary',
//     'EnvironmentalSecretary',
//     'ExecutiveMember'
//   ];

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <TeamOutlined className="mr-3" />
//               Committee Members
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage committee members and their positions
//             </Text>
//           </div>
//           <Button 
//             type="primary" 
//             icon={<PlusOutlined />}
//             onClick={() => setModalVisible(true)}
//           >
//             Add Member
//           </Button>
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Members"
//                 value={stats.totalMembers || 0}
//                 prefix={<TeamOutlined />}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Active Members"
//                 value={stats.activeMembers || 0}
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Executive Members"
//                 value={stats.executiveMembers || 0}
//                 prefix={<ApartmentOutlined />}
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Secretaries"
//                 value={stats.secretaries || 0}
//                 prefix={<UserOutlined />}
//                 valueStyle={{ color: '#722ed1' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Filters */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Input
//               placeholder="Search committee members..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//             />
//           </Col>
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Select
//               placeholder="Filter by Position"
//               style={{ width: '100%' }}
//               allowClear
//               value={filterPosition}
//               onChange={setFilterPosition}
//             >
//               {positionOptions.map(position => (
//                 <Option key={position} value={position}>
//                   {position.replace(/([A-Z])/g, ' $1').trim()}
//                 </Option>
//               ))}
//             </Select>
//           </Col>
//         </Row>

//         {/* Committee Members Table */}
//         <Table
//           columns={columns}
//           dataSource={members}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1000 }}
//           pagination={{ pageSize: 10 }}
//         />

//         {/* Add Member Modal */}
//         <Modal
//           title="Add Committee Member"
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
//             onFinish={handleAddMember}
//           >
//             <Row gutter={16}>
//               <Col span={24}>
//                 <Form.Item
//                   label="Select Member"
//                   name="userId"
//                   rules={[{ required: true, message: 'Please select a member' }]}
//                 >
//                   <Select
//                     showSearch
//                     placeholder="Search and select member"
//                     optionFilterProp="children"
//                     filterOption={(input, option) =>
//                       option.children.toLowerCase().includes(input.toLowerCase())
//                     }
//                   >
//                     {/* Options would be populated from API */}
//                     <Option value="1">John Doe - MEM12345</Option>
//                     <Option value="2">Jane Smith - MEM12346</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Committee Position"
//                   name="position"
//                   rules={[{ required: true, message: 'Please select position' }]}
//                 >
//                   <Select placeholder="Select committee position">
//                     {positionOptions.map(position => (
//                       <Option key={position} value={position}>
//                         {position.replace(/([A-Z])/g, ' $1').trim()}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Term Start Date"
//                   name="termStart"
//                   rules={[{ required: true, message: 'Please select term start date' }]}
//                 >
//                   <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Term End Date"
//                   name="termEnd"
//                 >
//                   <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Responsibilities"
//                   name="responsibilities"
//                 >
//                   <Input.TextArea 
//                     rows={3} 
//                     placeholder="Describe the member's responsibilities..."
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Status"
//                   name="status"
//                   initialValue="active"
//                 >
//                   <Select>
//                     <Option value="active">Active</Option>
//                     <Option value="inactive">Inactive</Option>
//                     <Option value="suspended">Suspended</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>
//             <div className="text-right">
//               <Space>
//                 <Button onClick={() => setModalVisible(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit">
//                   Add Member
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Modal>

//         {/* Member Detail Modal */}
//         <Modal
//           title="Committee Member Details"
//           open={!!selectedMember}
//           onCancel={() => setSelectedMember(null)}
//           footer={[
//             <Button key="close" onClick={() => setSelectedMember(null)}>
//               Close
//             </Button>,
//             <Button key="edit" type="primary">
//               Edit Member
//             </Button>,
//           ]}
//           width={700}
//         >
//           {selectedMember && (
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 <Avatar size={64} src={selectedMember.user?.image} icon={<UserOutlined />} />
//                 <div>
//                   <Title level={3} className="mb-1">
//                     {`${selectedMember.user?.firstName} ${selectedMember.user?.lastName}`}
//                   </Title>
//                   <Space>
//                     {getPositionTag(selectedMember.position)}
//                     {getStatusTag(selectedMember.status)}
//                   </Space>
//                 </div>
//               </div>

//               <Divider />

//               <Descriptions bordered column={2}>
//                 <Descriptions.Item label="Membership ID">
//                   {selectedMember.user?.membershipId}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Email">
//                   {selectedMember.user?.email}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Phone">
//                   {selectedMember.user?.phone}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Term Start">
//                   {new Date(selectedMember.termStart).toLocaleDateString()}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Term End">
//                   {selectedMember.termEnd ? new Date(selectedMember.termEnd).toLocaleDateString() : 'Not Set'}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Remaining Term">
//                   {selectedMember.termEnd 
//                     ? `${Math.ceil((new Date(selectedMember.termEnd) - new Date()) / (1000 * 60 * 60 * 24))} days`
//                     : 'Not Set'
//                   }
//                 </Descriptions.Item>
//                 {selectedMember.responsibilities && (
//                   <Descriptions.Item label="Responsibilities" span={2}>
//                     {selectedMember.responsibilities}
//                   </Descriptions.Item>
//                 )}
//               </Descriptions>
//             </div>
//           )}
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default CommitteeMembers;





///////////////////////////FINAL CODE BELOW THIS LINE///////////////////////////



import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Space,
  Avatar,
  Typography,
  Tag,
  Modal,
  Form,
  Select,
  DatePicker,
  message,
  Row,
  Col,
  Statistic,
  Descriptions,
  Divider,
  Tooltip,
  Dropdown,
  Menu,
  Switch,
  Badge
} from 'antd';
import {
  TeamOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CrownOutlined,
  ApartmentOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { useEmployees } from '../hooks/useEmployees';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const CommitteeMembers = () => {
  const {
    // State
    employees,
    loading,
    committeeMembers,
    committeePositions,
    
    // Actions
    loadEmployees,
    addCommitteeMember,
    removeCommitteeMember,
    updateCommitteeMember,
    
    // Helper Functions
    getCommitteeMembers,
    getCommitteeStats,
    getEmployeesWithCommitteeStatus
  } = useEmployees();

  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterPosition, setFilterPosition] = useState('all');
  const [showOnlyCommitteeMembers, setShowOnlyCommitteeMembers] = useState(false);
  const [form] = Form.useForm();

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Get all employees with committee status
  const allEmployeesWithCommitteeStatus = getEmployeesWithCommitteeStatus();
  
  // Get committee members with employee data
  const committeeMembersWithDetails = getCommitteeMembers();
  
  // Get statistics
  const stats = getCommitteeStats();

  // ✅ FIXED: Filter logic to show ALL employees with committee status
  const filteredEmployees = useMemo(() => {
    let filtered = allEmployeesWithCommitteeStatus;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(employee =>
        employee.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Committee member filter
    if (showOnlyCommitteeMembers) {
      filtered = filtered.filter(employee => employee.isCommitteeMember);
    }

    // Position filter (only applies to committee members)
    if (filterPosition !== 'all' && showOnlyCommitteeMembers) {
      filtered = filtered.filter(employee => 
        employee.committee?.position === filterPosition
      );
    }

    return filtered;
  }, [allEmployeesWithCommitteeStatus, searchText, filterPosition, showOnlyCommitteeMembers]);

  // Handlers
  const handleAddMember = (values) => {
    addCommitteeMember(values);
    message.success('Committee member added successfully');
    setModalVisible(false);
    form.resetFields();
    loadEmployees(); // Refresh to update committee status
  };

  const handleRemoveMember = (employeeId) => {
    Modal.confirm({
      title: 'Remove from Committee',
      content: 'Are you sure you want to remove this member from the committee?',
      okText: 'Yes, Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        removeCommitteeMember(employeeId);
        message.success('Member removed from committee');
        loadEmployees(); // Refresh to update committee status
      },
    });
  };

  const handleViewMember = (employee) => {
    setSelectedMember(employee);
    setViewModalVisible(true);
  };

  const getPositionTag = (position) => {
    const positionConfig = {
      president: { color: 'red', icon: <CrownOutlined />, text: 'President' },
      executivepresident: { color: 'volcano', text: 'Executive President' },
      vicepresident: { color: 'orange', text: 'Vice President' },
      generalsecretary: { color: 'gold', text: 'General Secretary' },
      jointgeneralsecretary: { color: 'lime', text: 'Joint General Secretary' },
      organizingsecretary: { color: 'green', text: 'Organizing Secretary' },
      financesecretary: { color: 'cyan', text: 'Finance Secretary' },
      publicityandpublicationsecretary: { color: 'blue', text: 'Publicity & Publication Secretary' },
      officesecretary: { color: 'purple', text: 'Office Secretary' },
      socialwelfareaffairssecretary: { color: 'geekblue', text: 'Social Welfare Affairs Secretary' },
      legalaffairssecretary: { color: 'purple', text: 'Legal Affairs Secretary' },
      religiousaffairssecretary: { color: 'orange', text: 'Religious Affairs Secretary' },
      priyaandculturalaffairssecretary: { color: 'green', text: 'Priya & Cultural Affairs Secretary' },
      womensaffairssecretary: { color: 'pink', text: "Women's Affairs Secretary" },
      environmentalaffairssecretary: { color: 'green', text: 'Environmental Affairs Secretary' },
      executiveworkingmember: { color: 'default', text: 'Executive/Working Member' },
    };

    const config = positionConfig[position?.toLowerCase()] || { color: 'default', text: position };
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      active: { color: 'green', text: 'Active' },
      inactive: { color: 'red', text: 'Inactive' },
      suspended: { color: 'orange', text: 'Suspended' },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Employee/Member',
      key: 'member',
      width: 280,
      render: (record) => (
        <Space>
          <Badge 
            dot={record.isCommitteeMember} 
            color="green" 
            offset={[-5, 35]}
          >
            <Avatar src={record.image} icon={<UserOutlined />} />
          </Badge>
          <div>
            <div className="font-medium">
              {`${record.firstName} ${record.lastName}`}
            </div>
            <div className="text-xs text-gray-500">
              {record.employeeId}
            </div>
            <div className="text-xs text-gray-500">
              {record.department}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Committee Position',
      key: 'committeePosition',
      render: (record) => (
        record.isCommitteeMember ? (
          <div>
            {getPositionTag(record.committee.position)}
            {record.committee.status && (
              <div className="mt-1">
                {getStatusTag(record.committee.status)}
              </div>
            )}
          </div>
        ) : (
          <Tag color="default" icon={<CloseCircleOutlined />}>
            Not in Committee
          </Tag>
        )
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (record) => (
        <div>
          <div className="flex items-center">
            <MailOutlined className="mr-1 text-gray-400" />
            <Text className="text-sm">{record.email}</Text>
          </div>
          {record.phone && (
            <div className="flex items-center">
              <PhoneOutlined className="mr-1 text-gray-400" />
              <Text className="text-sm">{record.phone}</Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Term Period',
      key: 'term',
      render: (record) => (
        record.isCommitteeMember ? (
          <div>
            <div className="text-sm">
              {dayjs(record.committee.termStart).format('MMM YYYY')} -{' '}
              {record.committee.termEnd ? 
                dayjs(record.committee.termEnd).format('MMM YYYY') : 
                'Present'
              }
            </div>
            {record.committee.termEnd && (
              <div className="text-xs text-gray-500">
                {Math.ceil((new Date(record.committee.termEnd) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
              </div>
            )}
          </div>
        ) : (
          <Text type="secondary">N/A</Text>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewMember(record)}
            />
          </Tooltip>
          
          {record.isCommitteeMember ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key="edit"
                    icon={<EditOutlined />}
                    onClick={() => {
                      form.setFieldsValue({
                        employeeId: record._id,
                        ...record.committee
                      });
                      setModalVisible(true);
                    }}
                  >
                    Edit Committee Role
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    key="remove"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleRemoveMember(record._id)}
                  >
                    Remove from Committee
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Button type="text" icon={<MoreOutlined />} />
            </Dropdown>
          ) : (
            <Tooltip title="Add to Committee">
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  form.setFieldsValue({
                    employeeId: record._id
                  });
                  setModalVisible(true);
                }}
              >
                Add to Committee
              </Button>
            </Tooltip>
          )}
        </Space>
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
              Committee Members
            </Title>
            <Text type="secondary" className="text-lg">
              Governing Body of Alamgir Hossain City Welfare Association
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Add Committee Member
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Total Employees"
              value={stats.totalEmployees || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Committee Members"
              value={stats.totalMembers || 0}
              valueStyle={{ color: '#52c41a' }}
              suffix={`/ ${stats.totalEmployees}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Committee Ratio"
              value={stats.committeePercentage || 0}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Active Committee"
              value={stats.activeMembers || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters Section */}
      <Card className="mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <Input
              placeholder="Search employees/members..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Text>Show Only Committee Members</Text>
            <Switch 
              checked={showOnlyCommitteeMembers}
              onChange={setShowOnlyCommitteeMembers}
            />
          </div>

          {showOnlyCommitteeMembers && (
            <Select
              placeholder="Filter by Position"
              size="large"
              style={{ width: 250 }}
              value={filterPosition}
              onChange={setFilterPosition}
            >
              <Option value="all">All Committee Positions</Option>
              {committeePositions.map((position, index) => (
                <Option key={`${position}-${index}`} value={position}>
                  {position.replace(/([A-Z])/g, ' $1').trim()}
                </Option>
              ))}
            </Select>
          )}
        </div>
      </Card>

      {/* Employees Table - Now shows ALL employees */}
      <Card 
        title={
          <Space>
            <TeamOutlined />
            <span>
              {showOnlyCommitteeMembers ? 'Committee Members' : 'All Employees'}
            </span>
            <Tag color="blue">{filteredEmployees.length}</Tag>
            {showOnlyCommitteeMembers && (
              <Tag color="green">
                {stats.totalMembers} Committee Members
              </Tag>
            )}
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
              `${range[0]}-${range[1]} of ${total} ${showOnlyCommitteeMembers ? 'committee members' : 'employees'}`
          }}
        />
      </Card>

      {/* Add/Edit Committee Member Modal */}
      <Modal
        title="Manage Committee Member"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddMember}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Select Employee/Member"
                name="employeeId"
                rules={[{ required: true, message: 'Please select a member' }]}
              >
                <Select
                  showSearch
                  placeholder="Search and select member"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={form.getFieldValue('employeeId')} // Disable if already selected
                >
                  {employees.map(employee => (
                    <Option key={employee._id} value={employee._id}>
                      {`${employee.firstName} ${employee.lastName} - ${employee.employeeId}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Committee Position"
                name="position"
                rules={[{ required: true, message: 'Please select position' }]}
              >
                <Select placeholder="Select committee position">
                  {committeePositions.map((position, index) => (
                    <Option key={`${position}-${index}`} value={position}>
                      {position.replace(/([A-Z])/g, ' $1').trim()}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Term Start Date"
                name="termStart"
                rules={[{ required: true, message: 'Please select term start date' }]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Term End Date"
                name="termEnd"
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Responsibilities"
                name="responsibilities"
              >
                <Input.TextArea 
                  rows={3} 
                  placeholder="Describe the member's responsibilities..."
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Status"
                name="status"
                initialValue="active"
              >
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="suspended">Suspended</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="text-right">
            <Space>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {form.getFieldValue('employeeId') ? 'Update Committee Role' : 'Add to Committee'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Member Detail Modal */}
      <Modal
        title="Employee/Member Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedMember && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar 
                size={64} 
                src={selectedMember.image} 
                icon={<UserOutlined />}
                style={{ backgroundColor: '#87d068' }}
              />
              <div>
                <Title level={3} className="mb-1">
                  {`${selectedMember.firstName} ${selectedMember.lastName}`}
                </Title>
                <Space>
                  {selectedMember.isCommitteeMember ? (
                    <>
                      {getPositionTag(selectedMember.committee.position)}
                      {getStatusTag(selectedMember.committee.status)}
                      <Tag color="green" icon={<CheckCircleOutlined />}>
                        Committee Member
                      </Tag>
                    </>
                  ) : (
                    <Tag color="default" icon={<CloseCircleOutlined />}>
                      Not in Committee
                    </Tag>
                  )}
                </Space>
              </div>
            </div>

            <Divider />

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Employee ID">
                {selectedMember.employeeId}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedMember.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedMember.phone || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Department">
                {selectedMember.department}
              </Descriptions.Item>
              <Descriptions.Item label="Position">
                {selectedMember.position}
              </Descriptions.Item>
              
              {selectedMember.isCommitteeMember && (
                <>
                  <Descriptions.Item label="Committee Position">
                    {getPositionTag(selectedMember.committee.position)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Term Start">
                    {dayjs(selectedMember.committee.termStart).format('MMMM DD, YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Term End">
                    {selectedMember.committee.termEnd ? 
                      dayjs(selectedMember.committee.termEnd).format('MMMM DD, YYYY') : 
                      'Not Set (Continuous)'
                    }
                  </Descriptions.Item>
                  {selectedMember.committee.responsibilities && (
                    <Descriptions.Item label="Responsibilities" span={2}>
                      {selectedMember.committee.responsibilities}
                    </Descriptions.Item>
                  )}
                </>
              )}
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CommitteeMembers;




