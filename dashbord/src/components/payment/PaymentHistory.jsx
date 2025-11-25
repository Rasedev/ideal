// components/payment/PaymentHistory.jsx
import React, { useState, useEffect } from 'react';
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
  Badge,
  Tooltip,
  Progress,
  Timeline,
  Tabs,
  List,
  Empty,
  Switch
} from 'antd';
import {
  DollarOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  BarChartOutlined,
  TeamOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { usePayment } from '../../components/hooks/usePayment';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const PaymentHistory = () => {
  const {
    payments,
    myPayments,
    loading,
    stats,
    loadAllPayments,
    loadMyPayments,
    loadStats,
    updateFilters,
    filters
  } = usePayment();

  const [activeTab, setActiveTab] = useState('all');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  
  const currentUser = useSelector(state => state.user?.value);
  const currentTheme = useSelector(state => state.theme?.currentTheme || 'light');

  useEffect(() => {
    if (activeTab === 'all' && ['FinanceSecretary', 'Admin'].includes(currentUser?.role)) {
      loadAllPayments(filters);
    } else {
      loadMyPayments(filters);
    }
    loadStats();
  }, [filters, activeTab]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates && dates.length === 2) {
      updateFilters({
        startDate: dates[0].format('YYYY-MM-DD'),
        endDate: dates[1].format('YYYY-MM-DD')
      });
    } else {
      updateFilters({ startDate: '', endDate: '' });
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending Verification' },
      paid: { color: 'blue', text: 'Paid' },
      verified: { color: 'green', icon: <CheckCircleOutlined />, text: 'Verified' },
      rejected: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
      overdue: { color: 'red', icon: <ExclamationCircleOutlined />, text: 'Overdue' }
    };
    
    const config = statusConfig[status] || { color: 'default', text: status };
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getRoleTag = (role) => {
    const roleColors = {
      Admin: 'red',
      HR: 'orange',
      FinanceSecretary: 'green',
      Member: 'blue',
      PlotOwner: 'purple',
      Employee: 'cyan'
    };
    return <Tag color={roleColors[role] || 'default'}>{role}</Tag>;
  };

  const getPaymentMethodTag = (method) => {
    const methodColors = {
      bank_transfer: 'blue',
      bkash: 'purple',
      nagad: 'green',
      rocket: 'orange',
      cash: 'cyan'
    };
    return (
      <Tag color={methodColors[method] || 'default'}>
        {method?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </Tag>
    );
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Payment history exported successfully');
    } catch (error) {
      message.error('Export failed');
    } finally {
      setExportLoading(false);
    }
  };

  const allPaymentsColumns = [
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member',
      width: 200,
      render: (member) => (
        <Space>
          <Avatar src={member?.image} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">
              {`${member?.firstName} ${member?.lastName}`}
            </div>
            <div className="text-xs">
              {member?.membershipId && <Text type="secondary">{member.membershipId}</Text>}
              {member?.role && <div>{getRoleTag(member.role)}</div>}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Period',
      dataIndex: 'paymentMonth',
      key: 'paymentMonth',
      width: 120,
      render: (month) => <Text strong>{month}</Text>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (amount) => <Text strong>৳{amount?.toLocaleString()}</Text>,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120,
      render: (method) => getPaymentMethodTag(method),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Verified', value: 'verified' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 150,
      render: (id) => <Text code copyable>{id}</Text>
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => dayjs(date).format('DD/MM/YY'),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      fixed: 'right',
      render: (_, record) => (
        <Tooltip title="View Details">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedPayment(record);
              setDetailModalVisible(true);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const myPaymentsColumns = [
    {
      title: 'Payment Period',
      dataIndex: 'paymentMonth',
      key: 'paymentMonth',
      width: 150,
      render: (month, record) => (
        <div>
          <Text strong>{month}</Text>
          <div className="text-xs text-gray-500">
            Due: {dayjs(record.dueDate).format('DD MMM')}
          </div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (amount) => <Text strong>৳{amount?.toLocaleString()}</Text>,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120,
      render: (method) => getPaymentMethodTag(method),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status, record) => (
        <Space direction="vertical" size="small">
          {getStatusTag(status)}
          {record.isOverdue && <Tag color="red">Overdue</Tag>}
        </Space>
      ),
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 150,
      render: (id) => <Text code copyable>{id}</Text>
    },
    {
      title: 'Submitted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => (
        <div>
          <div>{dayjs(date).format('DD MMM')}</div>
          <div className="text-xs text-gray-500">
            {dayjs(date).fromNow()}
          </div>
        </div>
      ),
    },
    {
      title: 'Verified',
      dataIndex: 'verifiedAt',
      key: 'verifiedAt',
      width: 120,
      render: (date, record) => (
        record.verifiedAt ? (
          <div>
            <div>{dayjs(date).format('DD MMM')}</div>
            <div className="text-xs text-gray-500">
              by {record.verifiedBy?.firstName}
            </div>
          </div>
        ) : (
          <Text type="secondary">-</Text>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_, record) => (
        <Tooltip title="View Details">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedPayment(record);
              setDetailModalVisible(true);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const isFinanceOrAdmin = ['FinanceSecretary', 'Admin'].includes(currentUser?.role);

  // Calculate user statistics
  const userStats = myPayments?.reduce((acc, payment) => {
    acc.totalPayments++;
    if (['verified', 'paid'].includes(payment.status)) {
      acc.paidPayments++;
      acc.totalAmount += payment.amount;
    }
    if (payment.status === 'pending') {
      acc.pendingPayments++;
    }
    return acc;
  }, { totalPayments: 0, paidPayments: 0, pendingPayments: 0, totalAmount: 0 });

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <HistoryOutlined className="mr-3" />
              Payment History
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Complete transaction history and payment tracking
            </Text>
          </div>
          
          <Space>
            <Tooltip title="Advanced Filters">
              <Button 
                icon={<FilterOutlined />}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                Filters
              </Button>
            </Tooltip>
            
            <Tooltip title="Export History">
              <Button 
                icon={<DownloadOutlined />}
                loading={exportLoading}
                onClick={handleExport}
              >
                Export
              </Button>
            </Tooltip>
          </Space>
        </div>

        {/* Statistics Section */}
        <Row gutter={[16, 16]} className="mb-6">
          {isFinanceOrAdmin ? (
            // Admin/Finance Statistics
            <>
              <Col xs={24} sm={6}>
                <Card className="text-center">
                  <Statistic
                    title="Total Payments"
                    value={stats.totalPayments || 0}
                    prefix={<FileTextOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card className="text-center">
                  <Statistic
                    title="Total Revenue"
                    value={stats.totalRevenue || 0}
                    prefix="৳"
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card className="text-center">
                  <Statistic
                    title="Collection Rate"
                    value={stats.collectionRate || 0}
                    suffix="%"
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card className="text-center">
                  <Statistic
                    title="Pending Verification"
                    value={stats.pendingPayments || 0}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
            </>
          ) : (
            // Member Statistics
            <>
              <Col xs={24} sm={6}>
                <Card className="text-center">
                  <Statistic
                    title="Total Payments"
                    value={userStats?.totalPayments || 0}
                    prefix={<FileTextOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card className="text-center">
                  <Statistic
                    title="Amount Paid"
                    value={userStats?.totalAmount || 0}
                    prefix="৳"
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card className="text-center">
                  <Statistic
                    title="Payment Rate"
                    value={userStats?.totalPayments > 0 ? 
                      Math.round((userStats.paidPayments / userStats.totalPayments) * 100) : 0}
                    suffix="%"
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card className="text-center">
                  <Statistic
                    title="Pending"
                    value={userStats?.pendingPayments || 0}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
            </>
          )}
        </Row>

        {/* Progress for Members */}
        {!isFinanceOrAdmin && userStats && (
          <Card className="mb-6">
            <div className="flex justify-between mb-2">
              <Text strong>Your Payment Completion</Text>
              <Text>
                {userStats.paidPayments} / {userStats.totalPayments} payments completed
              </Text>
            </div>
            <Progress 
              percent={Math.round((userStats.paidPayments / userStats.totalPayments) * 100)} 
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
          </Card>
        )}

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <Card className="mb-6" title="Advanced Filters">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Text strong>Date Range</Text>
                <RangePicker
                  style={{ width: '100%' }}
                  value={dateRange}
                  onChange={handleDateRangeChange}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Text strong>Payment Method</Text>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Payment Method"
                  allowClear
                  value={filters.paymentMethod}
                  onChange={(value) => updateFilters({ paymentMethod: value })}
                >
                  <Option value="bank_transfer">Bank Transfer</Option>
                  <Option value="bkash">bKash</Option>
                  <Option value="nagad">Nagad</Option>
                  <Option value="rocket">Rocket</Option>
                  <Option value="cash">Cash</Option>
                </Select>
              </Col>
              <Col xs={24} sm={8}>
                <Text strong>Status</Text>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Status"
                  allowClear
                  value={filters.status}
                  onChange={(value) => updateFilters({ status: value })}
                >
                  <Option value="verified">Verified</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                  <Option value="paid">Paid</Option>
                </Select>
              </Col>
            </Row>
            {isFinanceOrAdmin && (
              <Row gutter={[16, 16]} className="mt-4">
                <Col xs={24} sm={8}>
                  <Text strong>Member Role</Text>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Filter by Role"
                    allowClear
                    value={filters.role}
                    onChange={(value) => updateFilters({ role: value })}
                  >
                    <Option value="Admin">Admin</Option>
                    <Option value="HR">HR</Option>
                    <Option value="FinanceSecretary">Finance Secretary</Option>
                    <Option value="Member">Member</Option>
                    <Option value="PlotOwner">Plot Owner</Option>
                    <Option value="Employee">Employee</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={8}>
                  <Text strong>Search Member</Text>
                  <Input
                    placeholder="Search by member name..."
                    prefix={<SearchOutlined />}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                    allowClear
                  />
                </Col>
              </Row>
            )}
          </Card>
        )}

        {/* Tabs Section */}
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'all',
              label: (
                <span>
                  <TeamOutlined />
                  All Payments
                  {isFinanceOrAdmin && (
                    <Badge 
                      count={payments?.length} 
                      overflowCount={999}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </span>
              ),
              children: (
                <Table
                  columns={allPaymentsColumns}
                  dataSource={payments}
                  loading={loading}
                  rowKey="_id"
                  scroll={{ x: 1200 }}
                  pagination={{
                    pageSize: 15,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} of ${total} payments`
                  }}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No payments found"
                      />
                    )
                  }}
                />
              ),
              disabled: !isFinanceOrAdmin
            },
            {
              key: 'my',
              label: (
                <span>
                  <UserOutlined />
                  My Payments
                  {myPayments && (
                    <Badge 
                      count={myPayments.length} 
                      overflowCount={999}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </span>
              ),
              children: (
                <Table
                  columns={myPaymentsColumns}
                  dataSource={myPayments}
                  loading={loading}
                  rowKey="_id"
                  scroll={{ x: 1000 }}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true
                  }}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No payment history found"
                      />
                    )
                  }}
                />
              )
            },
            {
              key: 'summary',
              label: (
                <span>
                  <BarChartOutlined />
                  Summary
                </span>
              ),
              children: (
                <div className="p-4">
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Card title="Payment Timeline" className="mb-4">
                        <Timeline>
                          {myPayments?.slice(0, 5).map((payment, index) => (
                            <Timeline.Item
                              key={payment._id}
                              color={
                                payment.status === 'verified' ? 'green' :
                                payment.status === 'pending' ? 'orange' : 'red'
                              }
                              dot={
                                payment.status === 'verified' ? <CheckCircleOutlined /> :
                                payment.status === 'pending' ? <ClockCircleOutlined /> : <CloseCircleOutlined />
                              }
                            >
                              <Space direction="vertical" size="small">
                                <Text strong>{payment.paymentMonth}</Text>
                                <Text>
                                  ৳{payment.amount?.toLocaleString()} • {getStatusTag(payment.status)}
                                </Text>
                                <Text type="secondary" className="text-xs">
                                  {dayjs(payment.createdAt).format('DD MMM YYYY HH:mm')}
                                </Text>
                              </Space>
                            </Timeline.Item>
                          ))}
                        </Timeline>
                      </Card>
                    </Col>
                    
                    {isFinanceOrAdmin && stats?.paymentMethods && (
                      <Col span={24}>
                        <Card title="Payment Methods Distribution">
                          <List
                            dataSource={stats.paymentMethods}
                            renderItem={(item) => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<DollarOutlined />}
                                  title={item._id.split('_').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                  ).join(' ')}
                                  description={`${item.count} payments • ৳${item.totalAmount?.toLocaleString()}`}
                                />
                                <Progress 
                                  percent={Math.round((item.count / stats.totalPayments) * 100)} 
                                  style={{ width: 200 }}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </Col>
                    )}
                  </Row>
                </div>
              )
            }
          ]}
        />

        {/* Payment Detail Modal */}
        <Modal
          title="Payment Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>
          ]}
          width={800}
        >
          {selectedPayment && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <Title level={4} className="mb-2">
                    {selectedPayment.paymentMonth} Payment
                  </Title>
                  <Space>
                    {getStatusTag(selectedPayment.status)}
                    {getPaymentMethodTag(selectedPayment.paymentMethod)}
                  </Space>
                </div>
                <Text strong className="text-2xl">
                  ৳{selectedPayment.amount?.toLocaleString()}
                </Text>
              </div>

              <Divider />

              {/* Member Information (for admin view) */}
              {selectedPayment.member && isFinanceOrAdmin && (
                <>
                  <Title level={5}>Member Information</Title>
                  <Descriptions bordered size="small" column={2}>
                    <Descriptions.Item label="Name">
                      {selectedPayment.member.firstName} {selectedPayment.member.lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Role">
                      {getRoleTag(selectedPayment.member.role)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Membership ID">
                      {selectedPayment.member.membershipId || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact">
                      {selectedPayment.member.phone || 'N/A'}
                    </Descriptions.Item>
                  </Descriptions>
                  <Divider />
                </>
              )}

              {/* Payment Details */}
              <Title level={5}>Payment Information</Title>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Transaction ID">
                  <Text code copyable>{selectedPayment.transactionId}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Transaction Date">
                  {dayjs(selectedPayment.transactionDate).format('DD MMMM YYYY')}
                </Descriptions.Item>
                
                {selectedPayment.bankName && (
                  <Descriptions.Item label="Bank Name">
                    {selectedPayment.bankName}
                  </Descriptions.Item>
                )}
                
                {selectedPayment.accountNumber && (
                  <Descriptions.Item label="Account Number">
                    {selectedPayment.accountNumber}
                  </Descriptions.Item>
                )}
                
                {selectedPayment.branchName && (
                  <Descriptions.Item label="Branch">
                    {selectedPayment.branchName}
                  </Descriptions.Item>
                )}
                
                {selectedPayment.senderPhone && (
                  <Descriptions.Item label="Sender Phone">
                    {selectedPayment.senderPhone}
                  </Descriptions.Item>
                )}
                
                <Descriptions.Item label="Submitted On">
                  {dayjs(selectedPayment.createdAt).format('DD MMMM YYYY HH:mm')}
                </Descriptions.Item>

                {selectedPayment.verifiedBy && (
                  <>
                    <Descriptions.Item label="Verified By">
                      {selectedPayment.verifiedBy.firstName} {selectedPayment.verifiedBy.lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Verified At">
                      {dayjs(selectedPayment.verifiedAt).format('DD MMMM YYYY HH:mm')}
                    </Descriptions.Item>
                  </>
                )}

                {selectedPayment.rejectionReason && (
                  <Descriptions.Item label="Rejection Reason" span={2}>
                    <Text type="danger">{selectedPayment.rejectionReason}</Text>
                  </Descriptions.Item>
                )}

                {selectedPayment.notes && (
                  <Descriptions.Item label="Notes" span={2}>
                    {selectedPayment.notes}
                  </Descriptions.Item>
                )}
              </Descriptions>

              {/* Payment Proof */}
              {selectedPayment.paymentProof && (
                <>
                  <Divider />
                  <Title level={5}>Payment Proof</Title>
                  <div className="text-center">
                    <img 
                      src={`http://localhost:3000${selectedPayment.paymentProof.url}`}
                      alt="Payment proof"
                      className="max-w-full h-auto max-h-80 rounded-lg shadow-md border"
                    />
                    <div className="mt-2">
                      <Text type="secondary">
                        {selectedPayment.paymentProof.originalName}
                      </Text>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default PaymentHistory;