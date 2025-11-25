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
  Tabs,
  Progress,
  Badge,
  Tooltip,
  List,
  Alert,
} from 'antd';
import {
  FileDoneOutlined,
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BarChartOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const InvoiceApproveStatus = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [approvalModalVisible, setApprovalModalVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [stats, setStats] = useState({});
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [approvalForm] = Form.useForm();

  useEffect(() => {
    fetchInvoices();
    fetchApprovalStats();
  }, [searchText, activeTab]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {
        search: searchText,
        approvalStatus: activeTab,
      };

      const response = await axios.get('http://localhost:3000/api/v1/invoices/approval-status', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (response.data.success) {
        setInvoices(response.data.invoices || []);
      }
    } catch (error) {
      message.error('Failed to fetch invoices for approval');
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovalStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/invoices/approval-status/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setStats(response.data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch approval stats');
    }
  };

  const handleApprovalAction = async (values) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/v1/invoices/approval-status/${selectedInvoice._id}`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success(`Invoice ${values.action} successfully`);
        setApprovalModalVisible(false);
        approvalForm.resetFields();
        fetchInvoices();
        fetchApprovalStats();
      }
    } catch (error) {
      message.error('Failed to process invoice approval');
    } finally {
      setActionLoading(false);
    }
  };

  const getApprovalStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending Approval' },
      approved: { color: 'green', icon: <CheckCircleOutlined />, text: 'Approved' },
      rejected: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
      under_review: { color: 'blue', text: 'Under Review' },
      requires_revision: { color: 'yellow', text: 'Requires Revision' },
    };

    const config = statusConfig[status] || { color: 'default', text: status };
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
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

  const getUrgencyTag = (dueDate) => {
    const daysUntilDue = dayjs(dueDate).diff(dayjs(), 'days');
    
    if (daysUntilDue < 0) {
      return <Tag color="red">URGENT: Overdue</Tag>;
    } else if (daysUntilDue < 2) {
      return <Tag color="red">High Urgency</Tag>;
    } else if (daysUntilDue < 5) {
      return <Tag color="orange">Medium Urgency</Tag>;
    } else if (daysUntilDue < 10) {
      return <Tag color="yellow">Low Urgency</Tag>;
    }
    
    return null;
  };

  const columns = [
    {
      title: 'Invoice Details',
      dataIndex: 'invoiceNumber',
      key: 'invoiceDetails',
      render: (invoiceNumber, record) => (
        <div>
          <div className="font-medium">{invoiceNumber}</div>
          <div className="text-xs text-gray-500">
            {dayjs(record.invoiceDate).format('MMM D, YYYY')}
          </div>
          <div className="text-xs">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'member',
      key: 'client',
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
      render: (amount) => (
        <Text strong>৳{amount?.toLocaleString()}</Text>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority, record) => (
        <div className="space-y-1">
          {getPriorityTag(priority)}
          {getUrgencyTag(record.dueDate)}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'approvalStatus',
      key: 'status',
      render: (status) => getApprovalStatusTag(status),
    },
    {
      title: 'Submitted',
      dataIndex: 'submittedAt',
      key: 'submitted',
      render: (date) => date ? dayjs(date).format('MMM D, YYYY') : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Review Invoice">
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setSelectedInvoice(record);
                setApprovalModalVisible(true);
              }}
            >
              Review
            </Button>
          </Tooltip>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => setSelectedInvoice(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const tabItems = [
    { key: 'pending', label: 'Pending Approval', count: stats.pendingCount },
    { key: 'under_review', label: 'Under Review', count: stats.underReviewCount },
    { key: 'requires_revision', label: 'Requires Revision', count: stats.revisionCount },
    { key: 'approved', label: 'Approved', count: stats.approvedCount },
    { key: 'rejected', label: 'Rejected', count: stats.rejectedCount },
  ];

  // Quick action buttons for bulk operations
  const QuickActions = () => (
    <Card title="Quick Actions" className="mb-6">
      <Space wrap>
        <Button type="primary" icon={<CheckCircleOutlined />}>
          Approve All High Priority
        </Button>
        <Button icon={<SendOutlined />}>
          Send Reminders
        </Button>
        <Button icon={<BarChartOutlined />}>
          Generate Approval Report
        </Button>
      </Space>
    </Card>
  );

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <FileDoneOutlined className="mr-3" />
              Invoice Approve Status
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Review and approve pending invoices
            </Text>
          </div>
          <Button 
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
                title="Pending Approval"
                value={stats.pendingCount || 0}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Approval Rate"
                value={stats.approvalRate || 0}
                suffix="%"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Avg. Approval Time"
                value={stats.avgApprovalTime || 0}
                suffix="hours"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Urgent Invoices"
                value={stats.urgentCount || 0}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Approval Progress */}
        {stats.approvalProgress && (
          <Card title="Approval Workflow Progress" className="mb-6">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={stats.approvalProgress.completionRate}
                    width={80}
                  />
                  <div className="mt-2">
                    <Text strong>Workflow Completion</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={16}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Pending Review</Text>
                      <Text strong>{stats.approvalProgress.pending}</Text>
                    </div>
                    <Progress 
                      percent={Math.round((stats.approvalProgress.pending / stats.approvalProgress.total) * 100)}
                      status="active"
                      strokeColor="#faad14"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Approved This Week</Text>
                      <Text strong>{stats.approvalProgress.approvedThisWeek}</Text>
                    </div>
                    <Progress 
                      percent={Math.round((stats.approvalProgress.approvedThisWeek / stats.approvalProgress.total) * 100)}
                      status="active"
                      strokeColor="#52c41a"
                    />
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        )}

        {/* Quick Actions */}
        <QuickActions />

        {/* Urgent Alert */}
        {stats.urgentCount > 0 && (
          <Alert
            message={`You have ${stats.urgentCount} urgent invoices requiring immediate attention`}
            type="error"
            showIcon
            icon={<ExclamationCircleOutlined />}
            className="mb-6"
            action={
              <Button size="small" type="primary">
                Review Urgent
              </Button>
            }
          />
        )}

        {/* Search and Tabs */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              placeholder="Search invoices for approval..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
              allowClear
            />
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems.map(tab => ({
              key: tab.key,
              label: (
                <span>
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge
                      count={tab.count}
                      style={{ marginLeft: 8 }}
                      showZero={false}
                    />
                  )}
                </span>
              ),
            }))}
          />
        </Card>

        {/* Invoices Table */}
        <Table
          columns={columns}
          dataSource={invoices}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1000 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} invoices`
          }}
        />

        {/* Approval Modal */}
        <Modal
          title="Review and Approve Invoice"
          open={approvalModalVisible}
          onCancel={() => {
            setApprovalModalVisible(false);
            approvalForm.resetFields();
          }}
          footer={null}
          width={700}
        >
          {selectedInvoice && (
            <Form
              form={approvalForm}
              layout="vertical"
              onFinish={handleApprovalAction}
              initialValues={{ action: 'approve' }}
            >
              {/* Invoice Summary */}
              <Card title="Invoice Summary" className="mb-4">
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Invoice Number">
                    {selectedInvoice.invoiceNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Amount">
                    <Text strong>৳{selectedInvoice.totalAmount?.toLocaleString()}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Client">
                    {selectedInvoice.member ? 
                      `${selectedInvoice.member.firstName} ${selectedInvoice.member.lastName}` : 
                      selectedInvoice.clientName
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="Due Date">
                    {dayjs(selectedInvoice.dueDate).format('MMM D, YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Priority">
                    {getPriorityTag(selectedInvoice.priority)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Current Status">
                    {getApprovalStatusTag(selectedInvoice.approvalStatus)}
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Line Items Preview */}
              {selectedInvoice.lineItems && selectedInvoice.lineItems.length > 0 && (
                <Card title="Line Items" className="mb-4" size="small">
                  <List
                    dataSource={selectedInvoice.lineItems.slice(0, 3)}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.description}
                          description={`Quantity: ${item.quantity} × ৳${item.unitPrice} = ৳${item.amount}`}
                        />
                      </List.Item>
                    )}
                  />
                  {selectedInvoice.lineItems.length > 3 && (
                    <Text type="secondary">
                      + {selectedInvoice.lineItems.length - 3} more items
                    </Text>
                  )}
                </Card>
              )}

              {/* Approval Action */}
              <Card title="Approval Decision">
                <Form.Item
                  label="Action"
                  name="action"
                  rules={[{ required: true, message: 'Please select an action' }]}
                >
                  <Select>
                    <Option value="approve">Approve Invoice</Option>
                    <Option value="reject">Reject Invoice</Option>
                    <Option value="request_revision">Request Revision</Option>
                    <Option value="hold">Put on Hold</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Comments"
                  name="comments"
                  rules={[{ required: true, message: 'Please provide comments for your decision' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Provide detailed comments about your approval decision..."
                  />
                </Form.Item>

                <Form.Item
                  label="Next Steps"
                  name="nextSteps"
                >
                  <TextArea
                    rows={2}
                    placeholder="Specify any next steps or follow-up actions..."
                  />
                </Form.Item>

                <Form.Item
                  label="Priority for Follow-up"
                  name="followUpPriority"
                  initialValue="medium"
                >
                  <Select>
                    <Option value="high">High Priority</Option>
                    <Option value="medium">Medium Priority</Option>
                    <Option value="low">Low Priority</Option>
                  </Select>
                </Form.Item>
              </Card>

              <Divider />

              <div className="text-right">
                <Space>
                  <Button 
                    onClick={() => setApprovalModalVisible(false)}
                    disabled={actionLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    loading={actionLoading}
                    icon={<CheckCircleOutlined />}
                  >
                    Submit Decision
                  </Button>
                </Space>
              </div>
            </Form>
          )}
        </Modal>

        {/* Invoice Detail Modal */}
        <Modal
          title="Invoice Details"
          open={!!selectedInvoice && !approvalModalVisible}
          onCancel={() => setSelectedInvoice(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedInvoice(null)}>
              Close
            </Button>,
            <Button 
              key="review"
              type="primary"
              onClick={() => setApprovalModalVisible(true)}
            >
              Review & Approve
            </Button>,
          ]}
          width={800}
        >
          {selectedInvoice && (
            <InvoiceDetailView invoice={selectedInvoice} />
          )}
        </Modal>
      </Card>
    </div>
  );
};

// Separate component for invoice detail view
const InvoiceDetailView = ({ invoice }) => (
  <div className="space-y-4">
    <Descriptions bordered column={2}>
      <Descriptions.Item label="Invoice Number">
        {invoice.invoiceNumber}
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        {invoice.getApprovalStatusTag && invoice.getApprovalStatusTag(invoice.approvalStatus)}
      </Descriptions.Item>
      <Descriptions.Item label="Client">
        {invoice.member ? 
          `${invoice.member.firstName} ${invoice.member.lastName}` : 
          invoice.clientName
        }
      </Descriptions.Item>
      <Descriptions.Item label="Amount">
        <Text strong>৳{invoice.totalAmount?.toLocaleString()}</Text>
      </Descriptions.Item>
      <Descriptions.Item label="Due Date">
        {dayjs(invoice.dueDate).format('MMMM D, YYYY')}
      </Descriptions.Item>
      <Descriptions.Item label="Priority">
        {invoice.getPriorityTag && invoice.getPriorityTag(invoice.priority)}
      </Descriptions.Item>
    </Descriptions>

    {invoice.description && (
      <>
        <Divider />
        <Text strong>Description: </Text>
        <Text>{invoice.description}</Text>
      </>
    )}
  </div>
);

export default InvoiceApproveStatus;