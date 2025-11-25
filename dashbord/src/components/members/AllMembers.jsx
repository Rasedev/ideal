// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   Card,
//   Input,
//   Select,
//   Button,
//   Space,
//   Tag,
//   Avatar,
//   Modal,
//   message,
//   Row,
//   Col,
//   Typography,
//   Tooltip,
//   Dropdown,
// } from 'antd';
// import {
//   SearchOutlined,
//   FilterOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   MoreOutlined,
//   TeamOutlined,
//   ReloadOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const { Title } = Typography;
// const { Option } = Select;
// const { Search } = Input;

// const AllMembers = () => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
//   const [filters, setFilters] = useState({});
//   const [searchText, setSearchText] = useState('');
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     fetchMembers();
//   }, [pagination.current, pagination.pageSize, filters, searchText]);

//   const fetchMembers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = {
//         page: pagination.current,
//         limit: pagination.pageSize,
//         search: searchText,
//         ...filters,
//       };

//       const response = await axios.get('http://localhost:3000/api/v1/member/all', {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//       });

//       if (response.data.success) {
//         setMembers(response.data.members || []);
//         setPagination(prev => ({
//           ...prev,
//           total: response.data.total || 0,
//         }));
//       }
//     } catch (error) {
//       message.error('Failed to fetch members');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//     setPagination(prev => ({ ...prev, current: 1 }));
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setPagination(prev => ({ ...prev, current: 1 }));
//   };

//   const handleTableChange = (newPagination) => {
//     setPagination(newPagination);
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: { color: 'green', text: 'Active' },
//       inactive: { color: 'red', text: 'Inactive' },
//       suspended: { color: 'orange', text: 'Suspended' },
//       waiting: { color: 'blue', text: 'Pending' },
//       approved: { color: 'green', text: 'Approved' },
//       rejected: { color: 'red', text: 'Rejected' },
//     };

//     const config = statusConfig[status?.toLowerCase()] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getRoleTag = (role) => {
//     const roleColors = {
//       president: 'red',
//       executivepresident: 'volcano',
//       vicepresident: 'orange',
//       generalsecretary: 'gold',
//       jointsecretary: 'lime',
//       member: 'blue',
//       plotowner: 'purple',
//       admin: 'magenta',
//     };

//     const color = roleColors[role?.toLowerCase()] || 'default';
//     return (
//       <Tag color={color}>
//         {role?.replace(/([A-Z])/g, ' $1').trim()}
//       </Tag>
//     );
//   };

//   const columns = [
//     {
//       title: 'Member',
//       dataIndex: 'firstName',
//       key: 'name',
//       render: (text, record) => (
//         <Space>
//           <Avatar src={record.profilePhoto} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
//             <div className="text-xs text-gray-500">{record.membershipId}</div>
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
//           <div>{email}</div>
//           <div className="text-xs text-gray-500">{record.phone}</div>
//         </div>
//       ),
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       render: (role) => getRoleTag(role),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getStatusTag(status),
//     },
//     {
//       title: 'Join Date',
//       dataIndex: 'dateJoined',
//       key: 'dateJoined',
//       render: (date) => new Date(date).toLocaleDateString(),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Dropdown
//           menu={{
//             items: [
//               {
//                 key: 'view',
//                 icon: <EyeOutlined />,
//                 label: 'View Details',
//               },
//               {
//                 key: 'edit',
//                 icon: <EditOutlined />,
//                 label: 'Edit',
//               },
//               {
//                 key: 'delete',
//                 icon: <DeleteOutlined />,
//                 label: 'Delete',
//                 danger: true,
//               },
//             ],
//           }}
//           trigger={['click']}
//         >
//           <Button type="text" icon={<MoreOutlined />} />
//         </Dropdown>
//       ),
//     },
//   ];

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
//               <TeamOutlined className="mr-3" />
//               All Members
//             </Title>
//             <p className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage and view all association members
//             </p>
//           </div>
//           <Button 
//             type="primary" 
//             icon={<ReloadOutlined />}
//             onClick={fetchMembers}
//             loading={loading}
//           >
//             Refresh
//           </Button>
//         </div>

//         {/* Filters */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Search
//               placeholder="Search members..."
//               allowClear
//               onSearch={handleSearch}
//               onChange={(e) => !e.target.value && handleSearch('')}
//             />
//           </Col>
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Select
//               placeholder="Filter by Role"
//               style={{ width: '100%' }}
//               allowClear
//               onChange={(value) => handleFilterChange('role', value)}
//             >
//               <Option value="Member">Member</Option>
//               <Option value="PlotOwner">Plot Owner</Option>
//               <Option value="ExecutiveMember">Executive Member</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Select
//               placeholder="Filter by Status"
//               style={{ width: '100%' }}
//               allowClear
//               onChange={(value) => handleFilterChange('status', value)}
//             >
//               <Option value="active">Active</Option>
//               <Option value="inactive">Inactive</Option>
//               <Option value="waiting">Pending</Option>
//               <Option value="approved">Approved</Option>
//             </Select>
//           </Col>
//         </Row>

//         {/* Table */}
//         <Table
//           columns={columns}
//           dataSource={members}
//           loading={loading}
//           pagination={pagination}
//           onChange={handleTableChange}
//           scroll={{ x: 800 }}
//           rowKey="_id"
//           className="responsive-table"
//         />
//       </Card>
//     </div>
//   );
// };

// export default AllMembers;





import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Row,
  Col,
  Statistic,
  message,
  Modal,
  Descriptions,
  Avatar,
  Dropdown,
} from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMembers, fetchMemberStats, deleteMember, fetchMemberById } from '../slices/memberSlice';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { confirm } = Modal;

const AllMembers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: members, stats, loading } = useSelector((state) => state.members);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: ''
  });

  useEffect(() => {
    dispatch(fetchAllMembers());
    dispatch(fetchMemberStats());
  }, [dispatch]);

  const handleViewMember = async (id) => {
    try {
      await dispatch(fetchMemberById(id)).unwrap();
      setDetailModalVisible(true);
    } catch (error) {
      message.error('Failed to load member details');
    }
  };

  const handleDeleteMember = (id) => {
    confirm({
      title: 'Are you sure you want to delete this member?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        dispatch(deleteMember(id));
        message.success('Member deleted successfully');
      },
    });
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    dispatch(fetchAllMembers(newFilters));
  };

  const getRoleTag = (role) => {
    const roleColors = {
      President: 'red',
      VicePresident: 'volcano',
      GeneralSecretary: 'orange',
      FinanceSecretary: 'gold',
      Member: 'green',
      PlotOwner: 'blue',
      ExecutiveMember: 'purple',
    };
    const color = roleColors[role] || 'default';
    return <Tag color={color}>{role}</Tag>;
  };

  const getStatusTag = (isActive) => {
    return isActive ? 
      <Tag color="green">Active</Tag> : 
      <Tag color="red">Inactive</Tag>;
  };

  const columns = [
    {
      title: 'Member',
      dataIndex: 'firstName',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.profilePhoto} icon={<UserOutlined />} />
          <div>
            <div>{`${record.firstName} ${record.lastName}`}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.membershipId}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      key: 'contact',
      render: (email, record) => (
        <div>
          <div>
            <MailOutlined /> {email}
          </div>
          {record.phones?.[0] && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              <PhoneOutlined /> {record.phones[0].number}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: getRoleTag,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: getStatusTag,
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewMember(record._id)}
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/members/edit/${record._id}`)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMember(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-4">
      <Card>
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <TeamOutlined className="mr-2" />
              Members Management
            </h1>
            <p className="text-gray-600">Manage all member accounts and information</p>
          </div>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => navigate('/members/add')}
          >
            Add New Member
          </Button>
        </div>

        {/* Stats */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Members"
                value={stats?.totalMembers || 0}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Active Members"
                value={stats?.activeMembers || 0}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="New This Month"
                value={stats?.newMembersThisMonth || 0}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-4">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Input
                placeholder="Search members..."
                prefix={<SearchOutlined />}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={6}>
              <Select
                placeholder="Filter by Role"
                style={{ width: '100%' }}
                value={filters.role}
                onChange={(value) => handleFilterChange('role', value)}
                allowClear
              >
                <Option value="Member">Member</Option>
                <Option value="PlotOwner">Plot Owner</Option>
                <Option value="President">President</Option>
                <Option value="ExecutiveMember">Executive Member</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                placeholder="Filter by Status"
                style={{ width: '100%' }}
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                allowClear
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Members Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={members}
            rowKey="_id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} members`,
            }}
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* Member Detail Modal */}
        <Modal
          title="Member Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>,
          ]}
          width={700}
        >
          {/* This will show the currentMember from Redux state */}
          {useSelector(state => state.members.currentMember) && (
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Name" span={2}>
                {`${useSelector(state => state.members.currentMember).firstName} ${useSelector(state => state.members.currentMember).lastName}`}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {useSelector(state => state.members.currentMember).email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {useSelector(state => state.members.currentMember).phones?.[0]?.number || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {getRoleTag(useSelector(state => state.members.currentMember).role)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {getStatusTag(useSelector(state => state.members.currentMember).isActive)}
              </Descriptions.Item>
              <Descriptions.Item label="Membership ID">
                {useSelector(state => state.members.currentMember).membershipId || 'N/A'}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default AllMembers;




