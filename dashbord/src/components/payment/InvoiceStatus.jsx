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
  Progress,
  Badge,
  Tooltip,
  Timeline,
  Steps,
  Dropdown,
} from 'antd';
import {
  FileDoneOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  UserOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  BarChartOutlined,
  DownloadOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const InvoiceStatus = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({});
  const [dateRange, setDateRange] = useState([]);
  const [stats, setStats] = useState({});
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

  useEffect(() => {
    fetchInvoices();
    fetchInvoiceStats();
  }, [searchText, filters, dateRange]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {
        search: searchText,
        ...filters,
      };

      if (dateRange && dateRange.length === 2) {
        params.startDate = dateRange[0].format('YYYY-MM-DD');
        params.endDate = dateRange[1].format('YYYY-MM-DD');
      }

      const response = await axios.get('http://localhost:3000/api/v1/invoices/status', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (response.data.success) {
        setInvoices(response.data.invoices || []);
      }
    } catch (error) {
      message.error('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoiceStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/invoices/status/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setStats(response.data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch invoice stats');
    }
  };

  const handleInvoiceAction = async (invoiceId, action, notes = '') => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/v1/invoices/status/${invoiceId}`,
        { action, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success(`Invoice ${action} successfully`);
        fetchInvoices();
        fetchInvoiceStats();
      }
    } catch (error) {
      message.error('Failed to update invoice status');
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      draft: { color: 'default', text: 'Draft' },
      submitted: { color: 'blue', text: 'Submitted' },
      under_review: { color: 'orange', text: 'Under Review' },
      approved: { color: 'green', text: 'Approved' },
      rejected: { color: 'red', text: 'Rejected' },
      paid: { color: 'purple', text: 'Paid' },
      overdue: { color: 'magenta', text: 'Overdue' },
      cancelled: { color: 'default', text: 'Cancelled' },
    };

    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPriorityTag = (priority) => {
    const priorityConfig = {
      high: { color: 'red', text: 'High' },
      medium: { color: 'orange', text: 'Medium' },
      low: { color: 'green', text: 'Low' },
    };

    const config = priorityConfig[priority] || { color: 'default', text: priority };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getInvoiceTypeTag = (type) => {
    const typeConfig = {
      subscription: { color: 'blue', text: 'Subscription' },
      maintenance: { color: 'orange', text: 'Maintenance' },
      construction: { color: 'purple', text: 'Construction' },
      utility: { color: 'green', text: 'Utility' },
      fine: { color: 'red', text: 'Fine' },
      other: { color: 'default', text: 'Other' },
    };

    const config = typeConfig[type] || { color: 'default', text: type };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getDueStatusTag = (dueDate, status) => {
    if (status === 'paid' || status === 'cancelled') return null;

    const daysUntilDue = dayjs(dueDate).diff(dayjs(), 'days');
    
    if (daysUntilDue < 0) {
      return <Tag color="red">Overdue: {Math.abs(daysUntilDue)} days</Tag>;
    } else if (daysUntilDue < 3) {
      return <Tag color="orange">Due in {daysUntilDue} days</Tag>;
    } else if (daysUntilDue < 7) {
      return <Tag color="yellow">Due in {daysUntilDue} days</Tag>;
    }
    
    return <Tag color="green">Due in {daysUntilDue} days</Tag>;
  };

  const columns = [
    {
      title: 'Invoice Info',
      dataIndex: 'invoiceNumber',
      key: 'invoiceInfo',
      render: (invoiceNumber, record) => (
        <div>
          <div className="font-medium">{invoiceNumber}</div>
          <div className="text-xs text-gray-500">
            {dayjs(record.invoiceDate).format('MMM D, YYYY')}
          </div>
        </div>
      ),
    },
    {
      title: 'Member/Client',
      dataIndex: 'member',
      key: 'member',
      render: (member, record) => (
        <Space>
          <Avatar size="small" src={member?.image} icon={<UserOutlined />} />
          <div>
            <div className="font-medium text-sm">
              {member ? `${member.firstName} ${member.lastName}` : record.clientName}
            </div>
            <div className="text-xs text-gray-500">
              {member?.membershipId || record.clientId}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'amount',
      render: (amount, record) => (
        <div>
          <Text strong>৳{amount?.toLocaleString()}</Text>
          {record.paidAmount > 0 && (
            <div className="text-xs text-gray-500">
              Paid: ৳{record.paidAmount?.toLocaleString()}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'invoiceType',
      key: 'type',
      render: (type) => getInvoiceTypeTag(type),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div className="space-y-1">
          {getStatusTag(status)}
          {getDueStatusTag(record.dueDate, status)}
        </div>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => date ? dayjs(date).format('MMM D, YYYY') : '-',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => getPriorityTag(priority),
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
              size="small"
              onClick={() => {
                setSelectedInvoice(record);
                setDetailModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Download">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => handleDownloadInvoice(record._id)}
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: getActionMenuItems(record),
            }}
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const getActionMenuItems = (invoice) => {
    const items = [
      {
        key: 'view',
        icon: <EyeOutlined />,
        label: 'View Details',
        onClick: () => {
          setSelectedInvoice(invoice);
          setDetailModalVisible(true);
        },
      },
      {
        key: 'download',
        icon: <DownloadOutlined />,
        label: 'Download Invoice',
        onClick: () => handleDownloadInvoice(invoice._id),
      },
    ];

    // Add status-specific actions
    if (invoice.status === 'submitted') {
      items.push(
        {
          key: 'approve',
          icon: <CheckCircleOutlined />,
          label: 'Approve',
          onClick: () => handleInvoiceAction(invoice._id, 'approve'),
        },
        {
          key: 'reject',
          icon: <CloseCircleOutlined />,
          label: 'Reject',
          danger: true,
          onClick: () => handleInvoiceAction(invoice._id, 'reject'),
        }
      );
    }

    if (invoice.status === 'approved') {
      items.push({
        key: 'mark_paid',
        icon: <DollarOutlined />,
        label: 'Mark as Paid',
        onClick: () => handleInvoiceAction(invoice._id, 'mark_paid'),
      });
    }

    return items;
  };

  const handleDownloadInvoice = async (invoiceId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3000/api/v1/invoices/${invoiceId}/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      message.success('Invoice downloaded successfully');
    } catch (error) {
      message.error('Failed to download invoice');
    }
  };

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const statusSteps = [
    { title: 'Draft', description: 'Invoice created' },
    { title: 'Submitted', description: 'Sent for approval' },
    { title: 'Under Review', description: 'Being reviewed' },
    { title: 'Approved', description: 'Approved for payment' },
    { title: 'Paid', description: 'Payment completed' },
  ];

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <FileDoneOutlined className="mr-3" />
              Invoice Status
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Track and manage invoice status and approvals
            </Text>
          </div>
          <Button 
            icon={<FilterOutlined />}
            onClick={fetchInvoices}
            loading={loading}
          >
            Refresh
          </Button>
        </div>

        {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Invoices"
                value={stats.totalInvoices || 0}
                prefix={<FileDoneOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Pending Approval"
                value={stats.pendingApproval || 0}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Amount"
                value={stats.totalAmount || 0}
                prefix="৳"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Overdue"
                value={stats.overdueCount || 0}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Status Distribution */}
        {stats.statusDistribution && (
          <Card title="Invoice Status Distribution" className="mb-6">
            <Row gutter={[16, 16]}>
              {Object.entries(stats.statusDistribution).map(([status, count]) => (
                <Col xs={24} sm={8} md={4} key={status}>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{count}</div>
                    {getStatusTag(status)}
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        )}

        {/* Collection Progress */}
        {stats.collectionProgress && (
          <Card title="Collection Progress" className="mb-6">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={Math.round((stats.collectionProgress.collected / stats.collectionProgress.total) * 100)}
                    width={80}
                  />
                  <div className="mt-2">
                    <Text strong>Collection Rate</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={16}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Collected Amount</Text>
                      <Text strong>
                        ৳{stats.collectionProgress.collected?.toLocaleString()} / ৳{stats.collectionProgress.total?.toLocaleString()}
                      </Text>
                    </div>
                    <Progress 
                      percent={Math.round((stats.collectionProgress.collected / stats.collectionProgress.total) * 100)}
                      status="active"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Pending Collection</Text>
                      <Text strong>
                        ৳{stats.collectionProgress.pending?.toLocaleString()}
                      </Text>
                    </div>
                    <Progress 
                      percent={Math.round((stats.collectionProgress.pending / stats.collectionProgress.total) * 100)}
                      status="active"
                      strokeColor="#faad14"
                    />
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Input
                placeholder="Search by invoice number or client..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by Status"
                style={{ width: '100%' }}
                allowClear
                onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
              >
                <Option value="draft">Draft</Option>
                <Option value="submitted">Submitted</Option>
                <Option value="under_review">Under Review</Option>
                <Option value="approved">Approved</Option>
                <Option value="rejected">Rejected</Option>
                <Option value="paid">Paid</Option>
                <Option value="overdue">Overdue</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by Type"
                style={{ width: '100%' }}
                allowClear
                onChange={(value) => setFilters(prev => ({ ...prev, invoiceType: value }))}
              >
                <Option value="subscription">Subscription</Option>
                <Option value="maintenance">Maintenance</Option>
                <Option value="construction">Construction</Option>
                <Option value="utility">Utility</Option>
                <Option value="fine">Fine</Option>
                <Option value="other">Other</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={setDateRange}
                format="YYYY-MM-DD"
                placeholder={['Start Date', 'End Date']}
              />
            </Col>
          </Row>
        </Card>

        {/* Invoices Table */}
        <Table
          columns={columns}
          dataSource={invoices}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1200 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} invoices`
          }}
        />

        {/* Invoice Detail Modal */}
        <Modal
          title="Invoice Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>,
            <Button 
              key="download"
              icon={<DownloadOutlined />}
              onClick={() => handleDownloadInvoice(selectedInvoice?._id)}
            >
              Download
            </Button>,
          ]}
          width={900}
        >
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <Title level={3} className="mb-1">
                    Invoice: {selectedInvoice.invoiceNumber}
                  </Title>
                  <Text type="secondary">
                    Date: {dayjs(selectedInvoice.invoiceDate).format('MMMM D, YYYY')}
                  </Text>
                </div>
                <Space>
                  {getStatusTag(selectedInvoice.status)}
                  {getPriorityTag(selectedInvoice.priority)}
                  {getInvoiceTypeTag(selectedInvoice.invoiceType)}
                </Space>
              </div>

              {/* Status Steps */}
              <Steps
                current={statusSteps.findIndex(step => 
                  step.title.toLowerCase().replace(' ', '_') === selectedInvoice.status
                )}
                items={statusSteps}
              />

              <Divider />

              {/* Basic Information */}
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Client/Member">
                  <div className="flex items-center">
                    <Avatar src={selectedInvoice.member?.image} icon={<UserOutlined />} className="mr-2" />
                    <div>
                      <div>
                        {selectedInvoice.member ? 
                          `${selectedInvoice.member.firstName} ${selectedInvoice.member.lastName}` : 
                          selectedInvoice.clientName
                        }
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedInvoice.member?.membershipId || selectedInvoice.clientId}
                      </div>
                    </div>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Total Amount">
                  <Text strong>৳{selectedInvoice.totalAmount?.toLocaleString()}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Due Date">
                  {selectedInvoice.dueDate ? 
                    dayjs(selectedInvoice.dueDate).format('MMMM D, YYYY') : 
                    'Not Set'
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Paid Amount">
                  <Text strong className={selectedInvoice.paidAmount > 0 ? 'text-green-600' : ''}>
                    ৳{selectedInvoice.paidAmount?.toLocaleString()}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Balance Due">
                  <Text strong className="text-red-600">
                    ৳{(selectedInvoice.totalAmount - selectedInvoice.paidAmount)?.toLocaleString()}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Terms">
                  {selectedInvoice.paymentTerms || 'Standard 30 days'}
                </Descriptions.Item>
              </Descriptions>

              {/* Line Items */}
              {selectedInvoice.lineItems && selectedInvoice.lineItems.length > 0 && (
                <>
                  <Title level={5}>Line Items</Title>
                  <Table
                    dataSource={selectedInvoice.lineItems}
                    pagination={false}
                    size="small"
                    columns={[
                      {
                        title: 'Description',
                        dataIndex: 'description',
                        key: 'description',
                      },
                      {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                        key: 'quantity',
                        width: 80,
                      },
                      {
                        title: 'Unit Price',
                        dataIndex: 'unitPrice',
                        key: 'unitPrice',
                        render: (price) => `৳${price?.toLocaleString()}`,
                        width: 100,
                      },
                      {
                        title: 'Amount',
                        dataIndex: 'amount',
                        key: 'amount',
                        render: (amount) => `৳${amount?.toLocaleString()}`,
                        width: 100,
                      },
                    ]}
                  />
                </>
              )}

              {/* Timeline */}
              <Title level={5}>Invoice Timeline</Title>
              <Timeline>
                <Timeline.Item dot={<FileDoneOutlined />}>
                  <div className="flex justify-between">
                    <Text strong>Invoice Created</Text>
                    <Text type="secondary">
                      {dayjs(selectedInvoice.createdAt).format('MMM D, YYYY HH:mm')}
                    </Text>
                  </div>
                  <Text type="secondary">By: System</Text>
                </Timeline.Item>
                
                {selectedInvoice.submittedAt && (
                  <Timeline.Item dot={<ClockCircleOutlined />} color="blue">
                    <div className="flex justify-between">
                      <Text strong>Submitted for Approval</Text>
                      <Text type="secondary">
                        {dayjs(selectedInvoice.submittedAt).format('MMM D, YYYY HH:mm')}
                      </Text>
                    </div>
                    {selectedInvoice.submittedBy && (
                      <Text type="secondary">
                        By: {selectedInvoice.submittedBy.firstName} {selectedInvoice.submittedBy.lastName}
                      </Text>
                    )}
                  </Timeline.Item>
                )}

                {selectedInvoice.approvedAt && (
                  <Timeline.Item dot={<CheckCircleOutlined />} color="green">
                    <div className="flex justify-between">
                      <Text strong>Approved</Text>
                      <Text type="secondary">
                        {dayjs(selectedInvoice.approvedAt).format('MMM D, YYYY HH:mm')}
                      </Text>
                    </div>
                    {selectedInvoice.approvedBy && (
                      <Text type="secondary">
                        By: {selectedInvoice.approvedBy.firstName} {selectedInvoice.approvedBy.lastName}
                      </Text>
                    )}
                  </Timeline.Item>
                )}

                {selectedInvoice.paidAt && (
                  <Timeline.Item dot={<DollarOutlined />} color="purple">
                    <div className="flex justify-between">
                      <Text strong>Payment Received</Text>
                      <Text type="secondary">
                        {dayjs(selectedInvoice.paidAt).format('MMM D, YYYY HH:mm')}
                      </Text>
                    </div>
                    <Text type="secondary">
                      Amount: ৳{selectedInvoice.paidAmount?.toLocaleString()}
                    </Text>
                  </Timeline.Item>
                )}
              </Timeline>

              {/* Notes */}
              {selectedInvoice.notes && (
                <>
                  <Title level={5}>Additional Notes</Title>
                  <div className="p-3 bg-gray-50 rounded">
                    <Text>{selectedInvoice.notes}</Text>
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

export default InvoiceStatus;