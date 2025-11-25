import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Space,
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
  Divider,
  Progress,
  Badge,
  Tooltip,
  Tabs,
  List,
  Descriptions,
  Timeline,
  Steps,
  Alert,
} from 'antd';
import {
  BarChartOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const AuditReports = () => {
  const [auditReports, setAuditReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [auditType, setAuditType] = useState('all');
  const [auditStatus, setAuditStatus] = useState('all');
  const [auditStats, setAuditStats] = useState({});
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [scheduleForm] = Form.useForm();

  useEffect(() => {
    fetchAuditReports();
    fetchAuditStatistics();
  }, [searchText, dateRange, auditType, auditStatus]);

  const fetchAuditReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {
        search: searchText,
        auditType: auditType === 'all' ? '' : auditType,
        status: auditStatus === 'all' ? '' : auditStatus,
      };

      if (dateRange && dateRange.length === 2) {
        params.startDate = dateRange[0].format('YYYY-MM-DD');
        params.endDate = dateRange[1].format('YYYY-MM-DD');
      }

      const response = await axios.get('http://localhost:3000/api/v1/reports/audit', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (response.data.success) {
        setAuditReports(response.data.auditReports || []);
      }
    } catch (error) {
      message.error('Failed to fetch audit reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditStatistics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/reports/audit/statistics', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setAuditStats(response.data.statistics || {});
      }
    } catch (error) {
      console.error('Failed to fetch audit statistics');
    }
  };

  const handleScheduleAudit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/reports/audit/schedule',
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Audit scheduled successfully');
        setScheduleModalVisible(false);
        scheduleForm.resetFields();
        fetchAuditReports();
        fetchAuditStatistics();
      }
    } catch (error) {
      message.error('Failed to schedule audit');
    }
  };

  const handleDownloadAuditReport = async (auditId, format = 'pdf') => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3000/api/v1/reports/audit/${auditId}/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { format },
          responseType: 'blob',
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit-report-${auditId}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      message.success(`Audit report downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      message.error('Failed to download audit report');
    }
  };

  const handleAuditAction = async (auditId, action, notes = '') => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/v1/reports/audit/${auditId}`,
        { action, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success(`Audit ${action} successfully`);
        fetchAuditReports();
        fetchAuditStatistics();
      }
    } catch (error) {
      message.error('Failed to update audit status');
    }
  };

  const getAuditTypeTag = (type) => {
    const typeConfig = {
      financial: { color: 'blue', text: 'Financial Audit' },
      operational: { color: 'green', text: 'Operational Audit' },
      compliance: { color: 'orange', text: 'Compliance Audit' },
      internal: { color: 'purple', text: 'Internal Audit' },
      external: { color: 'cyan', text: 'External Audit' },
      special: { color: 'magenta', text: 'Special Audit' },
    };

    const config = typeConfig[type] || { color: 'default', text: type };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getAuditStatusTag = (status) => {
    const statusConfig = {
      scheduled: { color: 'blue', text: 'Scheduled' },
      in_progress: { color: 'orange', text: 'In Progress' },
      completed: { color: 'green', text: 'Completed' },
      cancelled: { color: 'red', text: 'Cancelled' },
      requires_followup: { color: 'yellow', text: 'Requires Follow-up' },
      approved: { color: 'purple', text: 'Approved' },
    };

    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getSeverityTag = (severity) => {
    const severityConfig = {
      critical: { color: 'red', text: 'Critical' },
      high: { color: 'orange', text: 'High' },
      medium: { color: 'yellow', text: 'Medium' },
      low: { color: 'green', text: 'Low' },
      informational: { color: 'blue', text: 'Informational' },
    };

    const config = severityConfig[severity] || { color: 'default', text: severity };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getComplianceStatus = (score) => {
    if (score >= 90) return { color: 'green', text: 'Excellent', icon: <CheckCircleOutlined /> };
    if (score >= 80) return { color: 'blue', text: 'Good', icon: <CheckCircleOutlined /> };
    if (score >= 70) return { color: 'orange', text: 'Fair', icon: <WarningOutlined /> };
    return { color: 'red', text: 'Poor', icon: <WarningOutlined /> };
  };

  const columns = [
    {
      title: 'Audit Details',
      dataIndex: 'auditTitle',
      key: 'auditDetails',
      render: (auditTitle, record) => (
        <div>
          <div className="font-medium">{auditTitle}</div>
          <div className="text-xs text-gray-500">
            Ref: {record.auditReference}
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'auditType',
      key: 'type',
      render: (type) => getAuditTypeTag(type),
    },
    {
      title: 'Scope',
      dataIndex: 'auditScope',
      key: 'scope',
      render: (scope) => (
        <Text className="text-xs">{scope}</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div className="space-y-1">
          {getAuditStatusTag(status)}
          {record.complianceScore && (
            <Progress 
              percent={record.complianceScore} 
              size="small" 
              showInfo={false}
              status={record.complianceScore >= 80 ? 'success' : record.complianceScore >= 70 ? 'normal' : 'exception'}
            />
          )}
        </div>
      ),
    },
    {
      title: 'Audit Period',
      dataIndex: 'auditPeriod',
      key: 'period',
      render: (period, record) => (
        <div>
          <div className="text-xs">
            {dayjs(record.startDate).format('MMM D, YYYY')} - {dayjs(record.endDate).format('MMM D, YYYY')}
          </div>
        </div>
      ),
    },
    {
      title: 'Lead Auditor',
      dataIndex: 'leadAuditor',
      key: 'leadAuditor',
      render: (auditor) => (
        <div>
          {auditor?.firstName} {auditor?.lastName}
        </div>
      ),
    },
    {
      title: 'Findings',
      dataIndex: 'findingsCount',
      key: 'findings',
      render: (count, record) => (
        <div className="text-center">
          <Badge 
            count={count} 
            showZero 
            style={{ 
              backgroundColor: count === 0 ? '#52c41a' : count > 5 ? '#ff4d4f' : '#faad14' 
            }}
          />
          {record.criticalFindings > 0 && (
            <div className="text-xs text-red-500">
              {record.criticalFindings} critical
            </div>
          )}
        </div>
      ),
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
                setSelectedAudit(record);
                setDetailModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Download Report">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => handleDownloadAuditReport(record._id, 'pdf')}
            />
          </Tooltip>
          {record.status === 'completed' && (
            <Tooltip title="Approve Audit">
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                size="small"
                onClick={() => handleAuditAction(record._id, 'approve')}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const auditSteps = [
    { title: 'Scheduled', description: 'Audit scheduled' },
    { title: 'Planning', description: 'Audit planning phase' },
    { title: 'Fieldwork', description: 'Fieldwork in progress' },
    { title: 'Reporting', description: 'Report preparation' },
    { title: 'Follow-up', description: 'Follow-up actions' },
    { title: 'Completed', description: 'Audit completed' },
  ];

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <SafetyCertificateOutlined className="mr-3" />
              Audit Reports
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Internal and external audit management and reporting
            </Text>
          </div>
          <Button 
            type="primary"
            icon={<FileTextOutlined />}
            onClick={() => setScheduleModalVisible(true)}
          >
            Schedule Audit
          </Button>
        </div>

        {/* Audit Statistics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Audits"
                value={auditStats.totalAudits || 0}
                prefix={<AuditOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="In Progress"
                value={auditStats.inProgress || 0}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Avg. Compliance"
                value={auditStats.avgCompliance || 0}
                suffix="%"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Open Findings"
                value={auditStats.openFindings || 0}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Compliance Overview */}
        {auditStats.complianceOverview && (
          <Card title="Compliance Overview" className="mb-6">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={auditStats.complianceOverview.overallScore}
                    width={80}
                    status={
                      auditStats.complianceOverview.overallScore >= 90 ? 'success' :
                      auditStats.complianceOverview.overallScore >= 80 ? 'normal' : 'exception'
                    }
                  />
                  <div className="mt-2">
                    <Text strong>Overall Compliance</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={16}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Financial Compliance</Text>
                      <Text strong>{auditStats.complianceOverview.financial}%</Text>
                    </div>
                    <Progress 
                      percent={auditStats.complianceOverview.financial}
                      status={auditStats.complianceOverview.financial >= 90 ? 'success' : 'normal'}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Operational Compliance</Text>
                      <Text strong>{auditStats.complianceOverview.operational}%</Text>
                    </div>
                    <Progress 
                      percent={auditStats.complianceOverview.operational}
                      status={auditStats.complianceOverview.operational >= 90 ? 'success' : 'normal'}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Regulatory Compliance</Text>
                      <Text strong>{auditStats.complianceOverview.regulatory}%</Text>
                    </div>
                    <Progress 
                      percent={auditStats.complianceOverview.regulatory}
                      status={auditStats.complianceOverview.regulatory >= 90 ? 'success' : 'normal'}
                    />
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        )}

        {/* Critical Findings Alert */}
        {auditStats.criticalFindings > 0 && (
          <Alert
            message={`${auditStats.criticalFindings} critical audit findings require immediate attention`}
            type="error"
            showIcon
            icon={<WarningOutlined />}
            className="mb-6"
            action={
              <Button size="small" type="primary">
                Review Critical
              </Button>
            }
          />
        )}

        {/* Upcoming Audits */}
        {auditStats.upcomingAudits && auditStats.upcomingAudits.length > 0 && (
          <Card title="Upcoming Audits" className="mb-6">
            <List
              dataSource={auditStats.upcomingAudits.slice(0, 3)}
              renderItem={(audit) => (
                <List.Item>
                  <List.Item.Meta
                    title={audit.auditTitle}
                    description={
                      <Space>
                        <Text type="secondary">
                          {dayjs(audit.startDate).format('MMM D, YYYY')}
                        </Text>
                        {getAuditTypeTag(audit.auditType)}
                        {getAuditStatusTag(audit.status)}
                      </Space>
                    }
                  />
                  <Button size="small">View Details</Button>
                </List.Item>
              )}
            />
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Input
                placeholder="Search audit reports..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by Audit Type"
                style={{ width: '100%' }}
                value={auditType}
                onChange={setAuditType}
              >
                <Option value="all">All Types</Option>
                <Option value="financial">Financial Audit</Option>
                <Option value="operational">Operational Audit</Option>
                <Option value="compliance">Compliance Audit</Option>
                <Option value="internal">Internal Audit</Option>
                <Option value="external">External Audit</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by Status"
                style={{ width: '100%' }}
                value={auditStatus}
                onChange={setAuditStatus}
              >
                <Option value="all">All Status</Option>
                <Option value="scheduled">Scheduled</Option>
                <Option value="in_progress">In Progress</Option>
                <Option value="completed">Completed</Option>
                <Option value="requires_followup">Requires Follow-up</Option>
                <Option value="approved">Approved</Option>
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

        {/* Audit Reports Table */}
        <Table
          columns={columns}
          dataSource={auditReports}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1200 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} audit reports`
          }}
        />

        {/* Schedule Audit Modal */}
        <Modal
          title="Schedule New Audit"
          open={scheduleModalVisible}
          onCancel={() => {
            setScheduleModalVisible(false);
            scheduleForm.resetFields();
          }}
          footer={null}
          width={700}
        >
          <Form
            form={scheduleForm}
            layout="vertical"
            onFinish={handleScheduleAudit}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Audit Title"
                  name="auditTitle"
                  rules={[{ required: true, message: 'Please enter audit title' }]}
                >
                  <Input placeholder="Enter descriptive audit title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Audit Type"
                  name="auditType"
                  rules={[{ required: true, message: 'Please select audit type' }]}
                >
                  <Select placeholder="Select audit type">
                    <Option value="financial">Financial Audit</Option>
                    <Option value="operational">Operational Audit</Option>
                    <Option value="compliance">Compliance Audit</Option>
                    <Option value="internal">Internal Audit</Option>
                    <Option value="external">External Audit</Option>
                    <Option value="special">Special Audit</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Audit Scope"
                  name="auditScope"
                  rules={[{ required: true, message: 'Please enter audit scope' }]}
                >
                  <Input placeholder="Enter audit scope" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true, message: 'Please select start date' }]}
                >
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="End Date"
                  name="endDate"
                  rules={[{ required: true, message: 'Please select end date' }]}
                >
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Audit Objectives"
                  name="objectives"
                  rules={[{ required: true, message: 'Please enter audit objectives' }]}
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="Describe the main objectives of this audit..."
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Audit Team"
                  name="auditTeam"
                  rules={[{ required: true, message: 'Please select audit team members' }]}
                >
                  <Select mode="multiple" placeholder="Select audit team members">
                    <Option value="1">John Doe - Senior Auditor</Option>
                    <Option value="2">Jane Smith - Internal Auditor</Option>
                    <Option value="3">Mike Johnson - Financial Analyst</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Areas to Audit"
                  name="auditAreas"
                  rules={[{ required: true, message: 'Please select areas to audit' }]}
                >
                  <Select mode="multiple" placeholder="Select areas to include in audit">
                    <Option value="financial_statements">Financial Statements</Option>
                    <Option value="internal_controls">Internal Controls</Option>
                    <Option value="compliance">Regulatory Compliance</Option>
                    <Option value="operations">Operational Processes</Option>
                    <Option value="payroll">Payroll Processing</Option>
                    <Option value="procurement">Procurement</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right">
              <Space>
                <Button onClick={() => setScheduleModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Schedule Audit
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>

        {/* Audit Detail Modal */}
        <Modal
          title="Audit Report Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>,
            <Button 
              key="download"
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => handleDownloadAuditReport(selectedAudit?._id, 'pdf')}
            >
              Download Report
            </Button>,
          ]}
          width={900}
        >
          {selectedAudit && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <Title level={3} className="mb-1">
                    {selectedAudit.auditTitle}
                  </Title>
                  <Text type="secondary">
                    Reference: {selectedAudit.auditReference}
                  </Text>
                </div>
                <Space>
                  {getAuditTypeTag(selectedAudit.auditType)}
                  {getAuditStatusTag(selectedAudit.status)}
                </Space>
              </div>

              {/* Audit Progress */}
              <Steps
                current={auditSteps.findIndex(step => 
                  step.title.toLowerCase().replace(' ', '_') === selectedAudit.status
                )}
                items={auditSteps}
              />

              <Divider />

              {/* Basic Information */}
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Audit Scope">
                  {selectedAudit.auditScope}
                </Descriptions.Item>
                <Descriptions.Item label="Audit Period">
                  {dayjs(selectedAudit.startDate).format('MMM D, YYYY')} - {dayjs(selectedAudit.endDate).format('MMM D, YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Lead Auditor">
                  {selectedAudit.leadAuditor?.firstName} {selectedAudit.leadAuditor?.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Compliance Score">
                  <div className="flex items-center">
                    <Progress 
                      percent={selectedAudit.complianceScore} 
                      size="small" 
                      style={{ width: 100, marginRight: 8 }}
                    />
                    <Text strong>{selectedAudit.complianceScore}%</Text>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Total Findings">
                  <Badge count={selectedAudit.findingsCount} showZero />
                </Descriptions.Item>
                <Descriptions.Item label="Critical Findings">
                  <Badge count={selectedAudit.criticalFindings} showZero style={{ backgroundColor: '#ff4d4f' }} />
                </Descriptions.Item>
              </Descriptions>

              {/* Audit Findings */}
              {selectedAudit.findings && selectedAudit.findings.length > 0 && (
                <>
                  <Divider />
                  <Title level={5}>Key Audit Findings</Title>
                  <List
                    dataSource={selectedAudit.findings.slice(0, 5)}
                    renderItem={(finding) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <Space>
                              {finding.description}
                              {getSeverityTag(finding.severity)}
                            </Space>
                          }
                          description={
                            <div>
                              <Text>{finding.recommendation}</Text>
                              <div className="text-xs text-gray-500 mt-1">
                                Status: {finding.status} • Due: {finding.dueDate ? dayjs(finding.dueDate).format('MMM D, YYYY') : 'Not set'}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </>
              )}

              {/* Audit Timeline */}
              <Divider />
              <Title level={5}>Audit Timeline</Title>
              <Timeline>
                <Timeline.Item dot={<ClockCircleOutlined />}>
                  <div className="flex justify-between">
                    <Text strong>Audit Scheduled</Text>
                    <Text type="secondary">
                      {dayjs(selectedAudit.createdAt).format('MMM D, YYYY')}
                    </Text>
                  </div>
                </Timeline.Item>
                {selectedAudit.fieldworkStart && (
                  <Timeline.Item dot={<UserOutlined />} color="blue">
                    <div className="flex justify-between">
                      <Text strong>Fieldwork Started</Text>
                      <Text type="secondary">
                        {dayjs(selectedAudit.fieldworkStart).format('MMM D, YYYY')}
                      </Text>
                    </div>
                  </Timeline.Item>
                )}
                {selectedAudit.fieldworkEnd && (
                  <Timeline.Item dot={<FileTextOutlined />} color="green">
                    <div className="flex justify-between">
                      <Text strong>Fieldwork Completed</Text>
                      <Text type="secondary">
                        {dayjs(selectedAudit.fieldworkEnd).format('MMM D, YYYY')}
                      </Text>
                    </div>
                  </Timeline.Item>
                )}
                {selectedAudit.reportDate && (
                  <Timeline.Item dot={<CheckCircleOutlined />} color="purple">
                    <div className="flex justify-between">
                      <Text strong>Report Finalized</Text>
                      <Text type="secondary">
                        {dayjs(selectedAudit.reportDate).format('MMM D, YYYY')}
                      </Text>
                    </div>
                  </Timeline.Item>
                )}
              </Timeline>

              {/* Executive Summary */}
              {selectedAudit.executiveSummary && (
                <>
                  <Divider />
                  <Title level={5}>Executive Summary</Title>
                  <div className="p-3 bg-gray-50 rounded">
                    <Text>{selectedAudit.executiveSummary}</Text>
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

export default AuditReports;