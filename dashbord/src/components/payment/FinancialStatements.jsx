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
  Collapse,
} from 'antd';
import {
  BarChartOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PieChartOutlined,
  LineChartOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const FinancialStatements = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [generateModalVisible, setGenerateModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [reportType, setReportType] = useState('all');
  const [financialData, setFinancialData] = useState({});
  const [chartData, setChartData] = useState([]);
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [generateForm] = Form.useForm();

  useEffect(() => {
    fetchFinancialReports();
    fetchFinancialSummary();
  }, [searchText, dateRange, reportType]);

  const fetchFinancialReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {
        search: searchText,
        reportType: reportType === 'all' ? '' : reportType,
      };

      if (dateRange && dateRange.length === 2) {
        params.startDate = dateRange[0].format('YYYY-MM-DD');
        params.endDate = dateRange[1].format('YYYY-MM-DD');
      }

      const response = await axios.get('http://localhost:3000/api/v1/reports/financial', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (response.data.success) {
        setReports(response.data.reports || []);
      }
    } catch (error) {
      message.error('Failed to fetch financial reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchFinancialSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/reports/financial/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setFinancialData(response.data.summary || {});
        setChartData(response.data.chartData || []);
      }
    } catch (error) {
      console.error('Failed to fetch financial summary');
    }
  };

  const handleGenerateReport = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/reports/financial/generate',
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Financial report generated successfully');
        setGenerateModalVisible(false);
        generateForm.resetFields();
        fetchFinancialReports();
      }
    } catch (error) {
      message.error('Failed to generate financial report');
    }
  };

  const handleDownloadReport = async (reportId, format = 'pdf') => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3000/api/v1/reports/financial/${reportId}/download`,
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
      link.setAttribute('download', `financial-report-${reportId}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      message.success(`Report downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      message.error('Failed to download report');
    }
  };

  const getReportTypeTag = (type) => {
    const typeConfig = {
      income_statement: { color: 'green', text: 'Income Statement' },
      balance_sheet: { color: 'blue', text: 'Balance Sheet' },
      cash_flow: { color: 'purple', text: 'Cash Flow' },
      budget_vs_actual: { color: 'orange', text: 'Budget vs Actual' },
      revenue_analysis: { color: 'cyan', text: 'Revenue Analysis' },
      expense_analysis: { color: 'red', text: 'Expense Analysis' },
    };

    const config = typeConfig[type] || { color: 'default', text: type };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      generated: { color: 'green', text: 'Generated' },
      processing: { color: 'blue', text: 'Processing' },
      failed: { color: 'red', text: 'Failed' },
      scheduled: { color: 'orange', text: 'Scheduled' },
    };

    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Report Details',
      dataIndex: 'reportName',
      key: 'reportDetails',
      render: (reportName, record) => (
        <div>
          <div className="font-medium">{reportName}</div>
          <div className="text-xs text-gray-500">
            {dayjs(record.periodStart).format('MMM D, YYYY')} - {dayjs(record.periodEnd).format('MMM D, YYYY')}
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'reportType',
      key: 'type',
      render: (type) => getReportTypeTag(type),
    },
    {
      title: 'Generated By',
      dataIndex: 'generatedBy',
      key: 'generatedBy',
      render: (user) => (
        <div>
          {user?.firstName} {user?.lastName}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Generated Date',
      dataIndex: 'generatedAt',
      key: 'generatedAt',
      render: (date) => dayjs(date).format('MMM D, YYYY HH:mm'),
    },
    {
      title: 'File Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (size) => size ? `${(size / 1024 / 1024).toFixed(2)} MB` : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Report">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => {
                setSelectedReport(record);
                setDetailModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Download PDF">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => handleDownloadReport(record._id, 'pdf')}
            />
          </Tooltip>
          <Tooltip title="Download Excel">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => handleDownloadReport(record._id, 'excel')}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Income vs Expense Chart Data
  const incomeExpenseData = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
  ];

  // Revenue Distribution Data
  const revenueData = [
    { name: 'Subscriptions', value: 4000 },
    { name: 'Maintenance', value: 3000 },
    { name: 'Fines', value: 2000 },
    { name: 'Donations', value: 1500 },
    { name: 'Others', value: 1000 },
  ];

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <BarChartOutlined className="mr-3" />
              Financial Statements
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Comprehensive financial reporting and analysis
            </Text>
          </div>
          <Button 
            type="primary"
            icon={<FileTextOutlined />}
            onClick={() => setGenerateModalVisible(true)}
          >
            Generate Report
          </Button>
        </div>

        {/* Financial Overview */}
        <Card title="Financial Overview" className="mb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Statistic
                title="Total Revenue"
                value={financialData.totalRevenue || 0}
                prefix="৳"
                valueStyle={{ color: '#52c41a' }}
                suffix={<ArrowUpOutlined />}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="Total Expenses"
                value={financialData.totalExpenses || 0}
                prefix="৳"
                valueStyle={{ color: '#ff4d4f' }}
                suffix={<ArrowDownOutlined />}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="Net Profit"
                value={financialData.netProfit || 0}
                prefix="৳"
                valueStyle={{ color: financialData.netProfit >= 0 ? '#52c41a' : '#ff4d4f' }}
                suffix={financialData.netProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              />
            </Col>
          </Row>
        </Card>

        {/* Financial Charts */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={12}>
            <Card title="Income vs Expenses Trend" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#52c41a" 
                    strokeWidth={2}
                    name="Income"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expense" 
                    stroke="#ff4d4f" 
                    strokeWidth={2}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Revenue Distribution" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Key Financial Metrics */}
        <Card title="Key Financial Metrics" className="mb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card size="small" className="text-center">
                <Statistic
                  title="Current Ratio"
                  value={financialData.currentRatio || 0}
                  precision={2}
                  valueStyle={{ color: financialData.currentRatio >= 1 ? '#52c41a' : '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card size="small" className="text-center">
                <Statistic
                  title="Profit Margin"
                  value={financialData.profitMargin || 0}
                  suffix="%"
                  valueStyle={{ color: financialData.profitMargin >= 10 ? '#52c41a' : '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card size="small" className="text-center">
                <Statistic
                  title="Collection Efficiency"
                  value={financialData.collectionEfficiency || 0}
                  suffix="%"
                  valueStyle={{ color: financialData.collectionEfficiency >= 85 ? '#52c41a' : '#ff4d4f' }}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Input
                placeholder="Search reports..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by Report Type"
                style={{ width: '100%' }}
                value={reportType}
                onChange={setReportType}
              >
                <Option value="all">All Reports</Option>
                <Option value="income_statement">Income Statement</Option>
                <Option value="balance_sheet">Balance Sheet</Option>
                <Option value="cash_flow">Cash Flow</Option>
                <Option value="budget_vs_actual">Budget vs Actual</Option>
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

        {/* Reports Table */}
        <Table
          columns={columns}
          dataSource={reports}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1000 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} reports`
          }}
        />

        {/* Generate Report Modal */}
        <Modal
          title="Generate Financial Report"
          open={generateModalVisible}
          onCancel={() => {
            setGenerateModalVisible(false);
            generateForm.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={generateForm}
            layout="vertical"
            onFinish={handleGenerateReport}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Report Type"
                  name="reportType"
                  rules={[{ required: true, message: 'Please select report type' }]}
                >
                  <Select placeholder="Select report type">
                    <Option value="income_statement">Income Statement</Option>
                    <Option value="balance_sheet">Balance Sheet</Option>
                    <Option value="cash_flow">Cash Flow Statement</Option>
                    <Option value="budget_vs_actual">Budget vs Actual</Option>
                    <Option value="revenue_analysis">Revenue Analysis</Option>
                    <Option value="expense_analysis">Expense Analysis</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Period Start"
                  name="periodStart"
                  rules={[{ required: true, message: 'Please select start date' }]}
                >
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Period End"
                  name="periodEnd"
                  rules={[{ required: true, message: 'Please select end date' }]}
                >
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Report Name"
                  name="reportName"
                  rules={[{ required: true, message: 'Please enter report name' }]}
                >
                  <Input placeholder="Enter descriptive report name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Include Details"
                  name="includeDetails"
                  initialValue={['summary', 'charts']}
                >
                  <Select mode="multiple" placeholder="Select sections to include">
                    <Option value="summary">Executive Summary</Option>
                    <Option value="charts">Charts & Graphs</Option>
                    <Option value="details">Detailed Breakdown</Option>
                    <Option value="comparison">Period Comparison</Option>
                    <Option value="forecast">Financial Forecast</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Format"
                  name="format"
                  initialValue="pdf"
                >
                  <Select>
                    <Option value="pdf">PDF Document</Option>
                    <Option value="excel">Excel Spreadsheet</Option>
                    <Option value="both">Both PDF and Excel</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right">
              <Space>
                <Button onClick={() => setGenerateModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Generate Report
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>

        {/* Report Detail Modal */}
        <Modal
          title="Financial Report Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>,
            <Button 
              key="download-pdf"
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => handleDownloadReport(selectedReport?._id, 'pdf')}
            >
              Download PDF
            </Button>,
          ]}
          width={800}
        >
          {selectedReport && (
            <div className="space-y-4">
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Report Name">
                  {selectedReport.reportName}
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                  {getReportTypeTag(selectedReport.reportType)}
                </Descriptions.Item>
                <Descriptions.Item label="Period">
                  {dayjs(selectedReport.periodStart).format('MMM D, YYYY')} - {dayjs(selectedReport.periodEnd).format('MMM D, YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {getStatusTag(selectedReport.status)}
                </Descriptions.Item>
                <Descriptions.Item label="Generated By">
                  {selectedReport.generatedBy?.firstName} {selectedReport.generatedBy?.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Generated Date">
                  {dayjs(selectedReport.generatedAt).format('MMM D, YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="File Size" span={2}>
                  {selectedReport.fileSize ? `${(selectedReport.fileSize / 1024 / 1024).toFixed(2)} MB` : 'Not generated yet'}
                </Descriptions.Item>
              </Descriptions>

              {/* Report Summary */}
              {selectedReport.summary && (
                <>
                  <Divider />
                  <Title level={5}>Report Summary</Title>
                  <Collapse defaultActiveKey={['1']}>
                    <Panel header="Executive Summary" key="1">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Text>Total Revenue:</Text>
                          <Text strong>৳{selectedReport.summary.totalRevenue?.toLocaleString()}</Text>
                        </div>
                        <div className="flex justify-between">
                          <Text>Total Expenses:</Text>
                          <Text strong>৳{selectedReport.summary.totalExpenses?.toLocaleString()}</Text>
                        </div>
                        <div className="flex justify-between">
                          <Text>Net Profit/Loss:</Text>
                          <Text strong className={selectedReport.summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                            ৳{selectedReport.summary.netProfit?.toLocaleString()}
                          </Text>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </>
              )}

              {/* Key Metrics */}
              {selectedReport.metrics && (
                <>
                  <Divider />
                  <Title level={5}>Key Financial Metrics</Title>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedReport.metrics.profitMargin}%
                        </div>
                        <Text type="secondary">Profit Margin</Text>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedReport.metrics.currentRatio}
                        </div>
                        <Text type="secondary">Current Ratio</Text>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {selectedReport.metrics.collectionRate}%
                        </div>
                        <Text type="secondary">Collection Rate</Text>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default FinancialStatements;