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
  Steps,
  Timeline,
} from 'antd';
import {
  CheckCircleOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  ApartmentOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CommitteeDecisions = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [stats, setStats] = useState({});
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDecisions();
    fetchDecisionStats();
  }, [searchText, filterStatus, filterType]);

  const fetchDecisions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/committee/decisions', {
        headers: { Authorization: `Bearer ${token}` },
        params: { 
          search: searchText, 
          status: filterStatus,
          type: filterType
        }
      });

      if (response.data.success) {
        setDecisions(response.data.decisions || []);
      }
    } catch (error) {
      message.error('Failed to fetch decisions');
    } finally {
      setLoading(false);
    }
  };

  const fetchDecisionStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/committee/decisions/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setStats(response.data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch decision stats');
    }
  };

  const handleCreateDecision = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/committee/decisions',
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Decision recorded successfully');
        setModalVisible(false);
        form.resetFields();
        fetchDecisions();
        fetchDecisionStats();
      }
    } catch (error) {
      message.error('Failed to record decision');
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      proposed: { color: 'orange', text: 'Proposed' },
      under_review: { color: 'blue', text: 'Under Review' },
      approved: { color: 'green', text: 'Approved' },
      rejected: { color: 'red', text: 'Rejected' },
      implemented: { color: 'cyan', text: 'Implemented' },
      cancelled: { color: 'default', text: 'Cancelled' },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPriorityTag = (priority) => {
    const priorityConfig = {
      urgent: { color: 'red', text: 'Urgent' },
      high: { color: 'orange', text: 'High' },
      medium: { color: 'blue', text: 'Medium' },
      low: { color: 'green', text: 'Low' },
    };
    const config = priorityConfig[priority] || { color: 'default', text: priority };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getDecisionTypeTag = (type) => {
    const typeConfig = {
      financial: { color: 'green', text: 'Financial' },
      operational: { color: 'blue', text: 'Operational' },
      strategic: { color: 'purple', text: 'Strategic' },
      personnel: { color: 'orange', text: 'Personnel' },
      policy: { color: 'cyan', text: 'Policy' },
      other: { color: 'default', text: 'Other' },
    };
    const config = typeConfig[type] || { color: 'default', text: type };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Decision Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-gray-500">
            {getDecisionTypeTag(record.type)}
          </div>
        </div>
      ),
    },
    {
      title: 'Meeting',
      dataIndex: 'meeting',
      key: 'meeting',
      render: (meeting) => meeting?.title || 'N/A',
    },
    {
      title: 'Proposed By',
      dataIndex: 'proposedBy',
      key: 'proposedBy',
      render: (user) => (
        <div className="flex items-center">
          <Avatar size="small" src={user?.image} icon={<UserOutlined />} className="mr-2" />
          {`${user?.firstName} ${user?.lastName}`}
        </div>
      ),
    },
    {
      title: 'Decision Date',
      dataIndex: 'decisionDate',
      key: 'decisionDate',
      render: (date) => date ? dayjs(date).format('MMM D, YYYY') : 'N/A',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => getPriorityTag(priority),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => setSelectedDecision(record)}
          >
            View
          </Button>
          {record.status === 'proposed' && (
            <Button
              type="link"
              icon={<EditOutlined />}
            >
              Edit
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const decisionTypeOptions = [
    'financial',
    'operational', 
    'strategic',
    'personnel',
    'policy',
    'other'
  ];

  const statusSteps = [
    { title: 'Proposed', description: 'Decision proposed' },
    { title: 'Under Review', description: 'Under committee review' },
    { title: 'Approved', description: 'Approved by committee' },
    { title: 'Implemented', description: 'Successfully implemented' },
  ];

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <CheckCircleOutlined className="mr-3" />
              Committee Decisions
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Track and manage committee decisions and resolutions
            </Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Record Decision
          </Button>
        </div>

        {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Decisions"
                value={stats.totalDecisions || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Approved"
                value={stats.approved || 0}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Pending Review"
                value={stats.pending || 0}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Implementation Rate"
                value={stats.implementationRate || 0}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="Search decisions..."
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
              value={filterStatus}
              onChange={setFilterStatus}
            >
              <Option value="proposed">Proposed</Option>
              <Option value="under_review">Under Review</Option>
              <Option value="approved">Approved</Option>
              <Option value="rejected">Rejected</Option>
              <Option value="implemented">Implemented</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="Filter by Type"
              style={{ width: '100%' }}
              allowClear
              value={filterType}
              onChange={setFilterType}
            >
              {decisionTypeOptions.map(type => (
                <Option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Decisions Table */}
        <Table
          columns={columns}
          dataSource={decisions}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1000 }}
          pagination={{ pageSize: 10 }}
        />

        {/* Record Decision Modal */}
        <Modal
          title="Record Committee Decision"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateDecision}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Decision Title"
                  name="title"
                  rules={[{ required: true, message: 'Please enter decision title' }]}
                >
                  <Input placeholder="Enter decision title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Decision Type"
                  name="type"
                  rules={[{ required: true, message: 'Please select decision type' }]}
                >
                  <Select placeholder="Select decision type">
                    {decisionTypeOptions.map(type => (
                      <Option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Priority"
                  name="priority"
                  initialValue="medium"
                >
                  <Select>
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                    <Option value="urgent">Urgent</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Decision Date"
                  name="decisionDate"
                  rules={[{ required: true, message: 'Please select decision date' }]}
                >
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Related Meeting"
                  name="meetingId"
                >
                  <Select placeholder="Select related meeting">
                    {/* Options would be populated from API */}
                    <Option value="1">Monthly Committee Meeting - Jan 2024</Option>
                    <Option value="2">Emergency Meeting - Budget</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please enter decision description' }]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Describe the decision and its context..."
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Rationale"
                  name="rationale"
                >
                  <TextArea 
                    rows={3} 
                    placeholder="Explain the reasoning behind this decision..."
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Implementation Plan"
                  name="implementationPlan"
                >
                  <TextArea 
                    rows={3} 
                    placeholder="Describe how this decision will be implemented..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right">
              <Space>
                <Button onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Record Decision
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>

        {/* Decision Detail Modal */}
        <Modal
          title="Decision Details"
          open={!!selectedDecision}
          onCancel={() => setSelectedDecision(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedDecision(null)}>
              Close
            </Button>,
          ]}
          width={800}
        >
          {selectedDecision && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <Title level={3}>{selectedDecision.title}</Title>
                <Space>
                  {getStatusTag(selectedDecision.status)}
                  {getPriorityTag(selectedDecision.priority)}
                  {getDecisionTypeTag(selectedDecision.type)}
                </Space>
              </div>

              {/* Status Steps */}
              <Steps
                current={statusSteps.findIndex(step => 
                  step.title.toLowerCase().replace(' ', '_') === selectedDecision.status
                )}
                items={statusSteps}
              />

              <Divider />

              <Descriptions bordered column={2}>
                <Descriptions.Item label="Proposed By">
                  <div className="flex items-center">
                    <Avatar src={selectedDecision.proposedBy?.image} icon={<UserOutlined />} className="mr-2" />
                    {`${selectedDecision.proposedBy?.firstName} ${selectedDecision.proposedBy?.lastName}`}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Decision Date">
                  {selectedDecision.decisionDate ? 
                    dayjs(selectedDecision.decisionDate).format('MMMM D, YYYY') : 'N/A'
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Related Meeting">
                  {selectedDecision.meeting?.title || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Voting Result">
                  {selectedDecision.votingResult ? 
                    `${selectedDecision.votingResult.inFavor} in favor, ${selectedDecision.votingResult.against} against` : 
                    'No voting recorded'
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>
                  <div className="whitespace-pre-wrap">{selectedDecision.description}</div>
                </Descriptions.Item>
                {selectedDecision.rationale && (
                  <Descriptions.Item label="Rationale" span={2}>
                    <div className="whitespace-pre-wrap">{selectedDecision.rationale}</div>
                  </Descriptions.Item>
                )}
                {selectedDecision.implementationPlan && (
                  <Descriptions.Item label="Implementation Plan" span={2}>
                    <div className="whitespace-pre-wrap">{selectedDecision.implementationPlan}</div>
                  </Descriptions.Item>
                )}
              </Descriptions>

              {/* Timeline */}
              {selectedDecision.timeline && selectedDecision.timeline.length > 0 && (
                <>
                  <Divider />
                  <Title level={5}>Decision Timeline</Title>
                  <Timeline>
                    {selectedDecision.timeline.map((event, index) => (
                      <Timeline.Item key={index} dot={<ClockCircleOutlined />}>
                        <div className="flex justify-between">
                          <Text strong>{event.action}</Text>
                          <Text type="secondary">
                            {dayjs(event.timestamp).format('MMM D, YYYY HH:mm')}
                          </Text>
                        </div>
                        <Text>{event.description}</Text>
                        {event.performedBy && (
                          <Text type="secondary" className="block">
                            By: {event.performedBy.firstName} {event.performedBy.lastName}
                          </Text>
                        )}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </>
              )}
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default CommitteeDecisions;