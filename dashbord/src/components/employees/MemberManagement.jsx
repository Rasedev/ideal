// components/management/MemberManagement.jsx
import { useState, useEffect, useMemo } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Input, 
  Select, 
  Tag, 
  Space, 
  Modal, 
  Form, 
  message, 
  Popconfirm,
  Tooltip,
  DatePicker,
  Row,
  Col,
  Statistic,
  Divider,
  Badge,
  Avatar,
  Dropdown
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  UserAddOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchAllMembers,
//   createMember,
//   selectMembersList,
//   updateFilters
// } from '../../components/slices/memberSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

// Mock data - Replace with actual API calls
const mockMembers = [
  {
    id: '1',
    membershipId: 'MEM-2024-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+8801712345678',
    role: 'member',
    status: 'active',
    membershipType: 'premium',
    joinDate: '2024-01-15',
    address: '123 Main Street, Dhaka',
    division: 'Dhaka',
    district: 'Dhaka',
    profilePicture: null,
    lastLogin: '2024-12-19T10:30:00Z',
    subscriptionStatus: 'active',
    paymentDue: '2025-01-15'
  },
  {
    id: '2',
    membershipId: 'MEM-2024-002',
    firstName: 'Sarah',
    lastName: 'Islam',
    email: 'sarah.islam@example.com',
    phone: '+8801812345678',
    role: 'member',
    status: 'pending',
    membershipType: 'basic',
    joinDate: '2024-01-20',
    address: '456 Mirpur Road, Dhaka',
    division: 'Dhaka',
    district: 'Gazipur',
    profilePicture: null,
    lastLogin: null,
    subscriptionStatus: 'pending',
    paymentDue: '2025-01-20'
  },
  {
    id: '3',
    membershipId: 'MEM-2024-003',
    firstName: 'Ahmed',
    lastName: 'Hossain',
    email: 'ahmed.hossain@example.com',
    phone: '+8801912345678',
    role: 'plot-owner',
    status: 'active',
    membershipType: 'premium',
    joinDate: '2024-01-10',
    address: '789 Uttara, Dhaka',
    division: 'Dhaka',
    district: 'Dhaka',
    profilePicture: null,
    lastLogin: '2024-12-19T08:15:00Z',
    subscriptionStatus: 'active',
    paymentDue: '2025-01-10'
  }
];

const MemberManagement = ({ mode = 'view' }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [membershipTypeFilter, setMembershipTypeFilter] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewMember, setViewMember] = useState(null);
  const [batchAction, setBatchAction] = useState('');
  const [exportLoading, setExportLoading] = useState(false);


  

  // Stats state
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0,
    premium: 0,
    basic: 0
  });

  // Fetch members data
  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members when search or filters change
  useEffect(() => {
    filterMembers();
  }, [members, searchText, statusFilter, membershipTypeFilter]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setMembers(mockMembers);
        calculateStats(mockMembers);
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error('Failed to fetch members');
      setLoading(false);
    }
  };

  const calculateStats = (membersList) => {
    const stats = {
      total: membersList.length,
      active: membersList.filter(m => m.status === 'active').length,
      pending: membersList.filter(m => m.status === 'pending').length,
      suspended: membersList.filter(m => m.status === 'suspended').length,
      premium: membersList.filter(m => m.membershipType === 'premium').length,
      basic: membersList.filter(m => m.membershipType === 'basic').length
    };
    setStats(stats);
  };

  const filterMembers = () => {
    let filtered = members;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(member =>
        Object.values(member).some(value =>
          value?.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter);
    }

    // Membership type filter
    if (membershipTypeFilter !== 'all') {
      filtered = filtered.filter(member => member.membershipType === membershipTypeFilter);
    }

    setFilteredMembers(filtered);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
  };

  const handleMembershipTypeFilter = (value) => {
    setMembershipTypeFilter(value);
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    form.setFieldsValue({
      ...member,
      joinDate: member.joinDate ? dayjs(member.joinDate) : null,
      paymentDue: member.paymentDue ? dayjs(member.paymentDue) : null
    });
    setModalVisible(true);
  };

  const handleViewMember = (member) => {
    setViewMember(member);
    setViewModalVisible(true);
  };

  const handleDeleteMember = async (memberId) => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setMembers(members.filter(m => m.id !== memberId));
        message.success('Member deleted successfully');
        setLoading(false);
      }, 500);
    } catch (error) {
      message.error('Failed to delete member');
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      
      if (selectedMember) {
        // Update existing member
        setTimeout(() => {
          setMembers(members.map(m => 
            m.id === selectedMember.id 
              ? { ...m, ...values, joinDate: values.joinDate?.format('YYYY-MM-DD'), paymentDue: values.paymentDue?.format('YYYY-MM-DD') }
              : m
          ));
          message.success('Member updated successfully');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      } else {
        // Add new member
        const newMember = {
          id: Date.now().toString(),
          membershipId: `MEM-${dayjs().format('YYYY-MM-')}${String(members.length + 1).padStart(3, '0')}`,
          ...values,
          joinDate: values.joinDate?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
          paymentDue: values.paymentDue?.format('YYYY-MM-DD'),
          status: 'pending',
          lastLogin: null,
          profilePicture: null
        };
        
        setTimeout(() => {
          setMembers([newMember, ...members]);
          message.success('Member added successfully');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      message.error('Failed to save member');
      setLoading(false);
    }
  };

  const handleBatchAction = async (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select members to perform this action');
      return;
    }

    try {
      setLoading(true);
      
      switch (action) {
        case 'activate':
          setMembers(members.map(m => 
            selectedRowKeys.includes(m.id) ? { ...m, status: 'active' } : m
          ));
          message.success('Selected members activated successfully');
          break;
        
        case 'suspend':
          setMembers(members.map(m => 
            selectedRowKeys.includes(m.id) ? { ...m, status: 'suspended' } : m
          ));
          message.success('Selected members suspended successfully');
          break;
        
        case 'delete':
          setMembers(members.filter(m => !selectedRowKeys.includes(m.id)));
          message.success('Selected members deleted successfully');
          break;
        
        case 'export':
          setExportLoading(true);
          // Simulate export
          setTimeout(() => {
            message.success('Members exported successfully');
            setExportLoading(false);
          }, 1000);
          break;
      }
      
      setSelectedRowKeys([]);
      setLoading(false);
    } catch (error) {
      message.error(`Failed to ${action} members`);
      setLoading(false);
    }
  };

  const handleApproveMember = async (memberId) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setMembers(members.map(m => 
          m.id === memberId ? { ...m, status: 'active', subscriptionStatus: 'active' } : m
        ));
        message.success('Member approved successfully');
        setLoading(false);
      }, 500);
    } catch (error) {
      message.error('Failed to approve member');
      setLoading(false);
    }
  };

  const handleRejectMember = async (memberId) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setMembers(members.map(m => 
          m.id === memberId ? { ...m, status: 'rejected' } : m
        ));
        message.success('Member rejected successfully');
        setLoading(false);
      }, 500);
    } catch (error) {
      message.error('Failed to reject member');
      setLoading(false);
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      active: { color: 'green', text: 'Active' },
      pending: { color: 'orange', text: 'Pending' },
      suspended: { color: 'red', text: 'Suspended' },
      rejected: { color: 'red', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getMembershipTypeTag = (type) => {
    const typeConfig = {
      premium: { color: 'gold', text: 'Premium' },
      basic: { color: 'blue', text: 'Basic' },
      standard: { color: 'green', text: 'Standard' }
    };
    
    const config = typeConfig[type] || { color: 'default', text: type };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getSubscriptionStatusTag = (status) => {
    const statusConfig = {
      active: { color: 'green', text: 'Active' },
      pending: { color: 'orange', text: 'Pending' },
      expired: { color: 'red', text: 'Expired' }
    };
    
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Member Info',
      dataIndex: 'firstName',
      key: 'info',
      render: (_, record) => (
        <Space>
          <Avatar 
            size="small" 
            src={record.profilePicture}
            icon={<UserAddOutlined />}
            className="bg-blue-500"
          >
            {record.firstName?.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{record.firstName} {record.lastName}</div>
            <div className="text-xs text-gray-500">{record.membershipId}</div>
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
          <div className="flex items-center text-xs">
            <MailOutlined className="mr-1" />
            {email}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <PhoneOutlined className="mr-1" />
            {record.phone}
          </div>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'division',
      key: 'location',
      render: (division, record) => (
        <div className="flex items-center text-xs">
          <EnvironmentOutlined className="mr-1" />
          {record.district}, {division}
        </div>
      ),
    },
    {
      title: 'Membership',
      dataIndex: 'membershipType',
      key: 'membership',
      render: (type, record) => (
        <Space direction="vertical" size="small">
          {getMembershipTypeTag(type)}
          {getSubscriptionStatusTag(record.subscriptionStatus)}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => dayjs(date).format('DD MMM YYYY'),
      sorter: (a, b) => dayjs(a.joinDate).unix() - dayjs(b.joinDate).unix(),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date) => date ? dayjs(date).fromNow() : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewMember(record)}
              className="text-blue-500"
            />
          </Tooltip>
          
          <Tooltip title="Edit Member">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEditMember(record)}
              className="text-green-500"
            />
          </Tooltip>

          {record.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <Button 
                  type="text" 
                  icon={<CheckCircleOutlined />} 
                  onClick={() => handleApproveMember(record.id)}
                  className="text-green-500"
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button 
                  type="text" 
                  icon={<CloseCircleOutlined />} 
                  onClick={() => handleRejectMember(record.id)}
                  className="text-red-500"
                />
              </Tooltip>
            </>
          )}

          <Popconfirm
            title="Delete Member"
            description="Are you sure you want to delete this member?"
            onConfirm={() => handleDeleteMember(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                className="text-red-500"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const batchActions = [
    {
      key: 'activate',
      label: 'Activate Selected',
      icon: <CheckCircleOutlined />,
      onClick: () => handleBatchAction('activate')
    },
    {
      key: 'suspend',
      label: 'Suspend Selected',
      icon: <CloseCircleOutlined />,
      onClick: () => handleBatchAction('suspend')
    },
    {
      key: 'delete',
      label: 'Delete Selected',
      icon: <DeleteOutlined />,
      onClick: () => handleBatchAction('delete')
    },
    {
      type: 'divider'
    },
    {
      key: 'export',
      label: 'Export Selected',
      icon: <ExportOutlined />,
      onClick: () => handleBatchAction('export')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600">
            Manage all members of Alamgir Hossain City Welfare Association
          </p>
        </div>
        
        <Space>
          <Button 
            icon={<ImportOutlined />}
            onClick={() => handleBatchAction('export')}
            loading={exportLoading}
          >
            Export
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAddMember}
          >
            Add Member
          </Button>
        </Space>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title="Total Members"
              value={stats.total}
              prefix={<TeamOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title="Active"
              value={stats.active}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title="Pending"
              value={stats.pending}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title="Premium"
              value={stats.premium}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title="Basic"
              value={stats.basic}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title="Suspended"
              value={stats.suspended}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
            <Input
              placeholder="Search members by name, email, membership ID..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-64"
              allowClear
            />
            
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={handleStatusFilter}
              className="w-full sm:w-32"
              allowClear
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="suspended">Suspended</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>

            <Select
              placeholder="Membership Type"
              value={membershipTypeFilter}
              onChange={handleMembershipTypeFilter}
              className="w-full sm:w-40"
              allowClear
            >
              <Select.Option value="all">All Types</Select.Option>
              <Select.Option value="premium">Premium</Select.Option>
              <Select.Option value="basic">Basic</Select.Option>
              <Select.Option value="standard">Standard</Select.Option>
            </Select>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            {selectedRowKeys.length > 0 && (
              <Dropdown
                menu={{ items: batchActions }}
                placement="bottomRight"
              >
                <Button icon={<MoreOutlined />}>
                  Actions ({selectedRowKeys.length})
                </Button>
              </Dropdown>
            )}
            
            <Button 
              icon={<FilterOutlined />}
              onClick={() => {
                setSearchText('');
                setStatusFilter('all');
                setMembershipTypeFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Members Table */}
      <Card 
        title={`Members (${filteredMembers.length})`}
        className="border-0 shadow-sm"
        extra={
          <div className="flex items-center gap-2">
            <Badge count={selectedRowKeys.length} showZero={false} />
            <span className="text-sm text-gray-500">
              Showing {filteredMembers.length} of {members.length} members
            </span>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredMembers}
          rowSelection={rowSelection}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredMembers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} members`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Add/Edit Member Modal */}
      <Modal
        title={selectedMember ? 'Edit Member' : 'Add New Member'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            status: 'pending',
            membershipType: 'basic',
            subscriptionStatus: 'pending'
          }}
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
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="membershipType"
                label="Membership Type"
                rules={[{ required: true, message: 'Please select membership type' }]}
              >
                <Select placeholder="Select membership type">
                  <Select.Option value="basic">Basic</Select.Option>
                  <Select.Option value="premium">Premium</Select.Option>
                  <Select.Option value="standard">Standard</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="suspended">Suspended</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="division"
                label="Division"
                rules={[{ required: true, message: 'Please select division' }]}
              >
                <Select placeholder="Select division">
                  <Select.Option value="Dhaka">Dhaka</Select.Option>
                  <Select.Option value="Chattogram">Chattogram</Select.Option>
                  <Select.Option value="Rajshahi">Rajshahi</Select.Option>
                  <Select.Option value="Khulna">Khulna</Select.Option>
                  <Select.Option value="Barishal">Barishal</Select.Option>
                  <Select.Option value="Sylhet">Sylhet</Select.Option>
                  <Select.Option value="Rangpur">Rangpur</Select.Option>
                  <Select.Option value="Mymensingh">Mymensingh</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="district"
                label="District"
                rules={[{ required: true, message: 'Please select district' }]}
              >
                <Select placeholder="Select district">
                  <Select.Option value="Dhaka">Dhaka</Select.Option>
                  <Select.Option value="Gazipur">Gazipur</Select.Option>
                  <Select.Option value="Narayanganj">Narayanganj</Select.Option>
                  <Select.Option value="Chattogram">Chattogram</Select.Option>
                  <Select.Option value="Cox's Bazar">Cox's Bazar</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input.TextArea placeholder="Enter full address" rows={3} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="joinDate"
                label="Join Date"
              >
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentDue"
                label="Next Payment Due"
              >
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div className="flex justify-end space-x-3">
            <Button onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {selectedMember ? 'Update Member' : 'Add Member'}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* View Member Details Modal */}
      <Modal
        title="Member Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="edit" 
            type="primary"
            onClick={() => {
              setViewModalVisible(false);
              handleEditMember(viewMember);
            }}
          >
            Edit Member
          </Button>
        ]}
        width={600}
      >
        {viewMember && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <Avatar 
                size={64} 
                src={viewMember.profilePicture}
                icon={<UserAddOutlined />}
                className="bg-blue-500"
              >
                {viewMember.firstName?.charAt(0)}
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {viewMember.firstName} {viewMember.lastName}
                </h3>
                <p className="text-gray-600">{viewMember.membershipId}</p>
                <Space className="mt-2">
                  {getStatusTag(viewMember.status)}
                  {getMembershipTypeTag(viewMember.membershipType)}
                </Space>
              </div>
            </div>

            <Divider />

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center space-x-2">
                    <MailOutlined className="text-gray-400" />
                    <span>{viewMember.email}</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center space-x-2">
                    <PhoneOutlined className="text-gray-400" />
                    <span>{viewMember.phone}</span>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="flex items-center space-x-2">
                    <EnvironmentOutlined className="text-gray-400" />
                    <span>{viewMember.address}</span>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Membership Details */}
            <div>
              <h4 className="font-semibold mb-3">Membership Details</h4>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div>
                    <div className="text-sm text-gray-500">Join Date</div>
                    <div>{dayjs(viewMember.joinDate).format('DD MMM YYYY')}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <div className="text-sm text-gray-500">Last Login</div>
                    <div>
                      {viewMember.lastLogin 
                        ? dayjs(viewMember.lastLogin).fromNow()
                        : 'Never'
                      }
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <div className="text-sm text-gray-500">Subscription</div>
                    <div>{getSubscriptionStatusTag(viewMember.subscriptionStatus)}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <div className="text-sm text-gray-500">Next Payment</div>
                    <div>
                      {viewMember.paymentDue 
                        ? dayjs(viewMember.paymentDue).format('DD MMM YYYY')
                        : 'N/A'
                      }
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Location Information */}
            <div>
              <h4 className="font-semibold mb-3">Location</h4>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div>
                    <div className="text-sm text-gray-500">Division</div>
                    <div>{viewMember.division}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <div className="text-sm text-gray-500">District</div>
                    <div>{viewMember.district}</div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MemberManagement;