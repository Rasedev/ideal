
// import React, { useState, useEffect } from 'react';
// // import {
// //   CurrencyDollarIcon,
// //   PlusIcon,
// //   ChartBarIcon,
// //   DocumentArrowDownIcon,
// //   EyeIcon,
// //   ArrowTrendingUpIcon,
// //   ArrowTrendingDownIcon
// // } from '@heroicons/react/24/outline';
// import {
//   DollarOutlined,
//   PlusOutlined,
//   BarChartOutlined,
//   DownloadOutlined,
//   EyeOutlined,
//   ArrowUpOutlined,
//   ArrowDownOutlined
// } from "@ant-design/icons";

// const FinancialReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [summary, setSummary] = useState({});

//   useEffect(() => {
//     fetchReports();
//     fetchFinancialSummary();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const response = await fetch('/api/reports/financial', {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       const data = await response.json();
//       setReports(data.reports || []);
//     } catch (error) {
//       console.error('Error fetching financial reports:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFinancialSummary = async () => {
//     // This would fetch overall financial summary
//     setSummary({
//       totalIncome: 125000,
//       totalExpenses: 89000,
//       netProfit: 36000,
//       welfareUtilization: 78
//     });
//   };

//   const FinancialMetric = ({ title, value, change, isPositive = true }) => (
//     <div className="bg-white rounded-lg p-4 border border-gray-200">
//       <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
//       <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
//       {change && (
//         <div className={`inline-flex items-center text-sm ${
//           isPositive ? 'text-green-600' : 'text-red-600'
//         }`}>
//           {isPositive ? (
//             <ArrowUpOutlined className="w-4 h-4 mr-1" />
//           ) : (
//             <ArrowDownOutlined className="w-4 h-4 mr-1" />
//           )}
//           {change}% from last period
//         </div>
//       )}
//     </div>
//   );

//   const ReportCard = ({ report }) => (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
//           <div className="flex items-center space-x-4 text-sm text-gray-600">
//             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
//               {report.reportType}
//             </span>
//             <span>
//               {new Date(report.period.start).toLocaleDateString()} - {new Date(report.period.end).toLocaleDateString()}
//             </span>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
//             <EyeOutlined className="w-5 h-5" />
//           </button>
//           <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200">
//             <DownloadOutlined className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Financial Overview */}
//       {report.income && report.expenses && (
//         <div className="space-y-4 mb-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="text-center">
//               <div className="text-lg font-bold text-green-600">
//                 ${report.income.total?.toLocaleString()}
//               </div>
//               <div className="text-xs text-gray-500">Total Income</div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold text-red-600">
//                 ${report.expenses.total?.toLocaleString()}
//               </div>
//               <div className="text-xs text-gray-500">Total Expenses</div>
//             </div>
//           </div>
          
//           <div className="bg-gray-50 rounded-lg p-3">
//             <div className="flex justify-between items-center text-sm">
//               <span className="text-gray-600">Net Balance</span>
//               <span className={`font-semibold ${
//                 (report.income.total - report.expenses.total) >= 0 ? 'text-green-600' : 'text-red-600'
//               }`}>
//                 ${(report.income.total - report.expenses.total).toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Welfare Allocation */}
//       {report.welfareAllocation && (
//         <div className="border-t border-gray-200 pt-4">
//           <h4 className="text-sm font-medium text-gray-900 mb-2">Welfare Allocation</h4>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Utilization Rate</span>
//               <span className="font-semibold">{report.welfareAllocation.utilizationRate}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-green-500 h-2 rounded-full"
//                 style={{ width: `${report.welfareAllocation.utilizationRate}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
//         <span className="text-sm text-gray-500">
//           {new Date(report.createdAt).toLocaleDateString()}
//         </span>
//         <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//           Analyze Report
//         </button>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
//             <p className="text-gray-600 mt-2">Financial statements, budgets, and expense analysis</p>
//           </div>
//           <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 mt-4 sm:mt-0">
//             <PlusOutlined className="w-5 h-5 mr-2" />
//             New Financial Report
//           </button>
//         </div>

//         {/* Financial Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <FinancialMetric
//             title="Total Income"
//             value={`$${summary.totalIncome?.toLocaleString()}`}
//             change={12}
//             isPositive={true}
//           />
//           <FinancialMetric
//             title="Total Expenses"
//             value={`$${summary.totalExpenses?.toLocaleString()}`}
//             change={8}
//             isPositive={false}
//           />
//           <FinancialMetric
//             title="Net Profit"
//             value={`$${summary.netProfit?.toLocaleString()}`}
//             change={15}
//             isPositive={true}
//           />
//           <FinancialMetric
//             title="Welfare Utilization"
//             value={`${summary.welfareUtilization}%`}
//             change={5}
//             isPositive={true}
//           />
//         </div>

//         {/* Reports Grid */}
//         {reports.length > 0 ? (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//             {reports.map((report) => (
//               <ReportCard key={report._id} report={report} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <DollarOutlined className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-4 text-lg font-medium text-gray-900">No financial reports</h3>
//             <p className="mt-2 text-gray-500">Get started by generating your first financial report.</p>
//             <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200">
//               <PlusOutlined className="w-4 h-4 mr-2" />
//               Generate Report
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FinancialReports;




import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  DatePicker,
  Button,
  Space,
  Select,
  Progress,
  Tag,
  Typography,
  Divider
} from 'antd';
import {
  DollarCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  EyeOutlined,
  FilterOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const FinancialReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    period: 'monthly',
    dateRange: [],
    reportType: 'all'
  });

  const financialData = [
    {
      key: '1',
      date: '2024-01-15',
      description: 'Monthly Subscriptions Collection',
      amount: 125000,
      type: 'Income',
      category: 'Membership',
      status: 'Completed',
      paymentMethod: 'Bank Transfer'
    },
    {
      key: '2',
      date: '2024-01-10',
      description: 'Infrastructure Maintenance',
      amount: -45000,
      type: 'Expense',
      category: 'Operations',
      status: 'Completed',
      paymentMethod: 'Check'
    },
    {
      key: '3',
      date: '2024-01-08',
      description: 'Welfare Program - Medical Aid',
      amount: -25000,
      type: 'Expense',
      category: 'Welfare',
      status: 'Completed',
      paymentMethod: 'Cash'
    },
    {
      key: '4',
      date: '2024-01-05',
      description: 'Event Sponsorship',
      amount: 50000,
      type: 'Income',
      category: 'Donations',
      status: 'Completed',
      paymentMethod: 'Bank Transfer'
    },
    {
      key: '5',
      date: '2024-01-03',
      description: 'Office Supplies',
      amount: -15000,
      type: 'Expense',
      category: 'Administrative',
      status: 'Pending',
      paymentMethod: 'Digital Payment'
    }
  ];

  const summaryStats = {
    totalRevenue: 1250000,
    totalExpenses: 850000,
    netIncome: 400000,
    pendingDues: 125000,
    collectionRate: 78
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category) => (
        <Tag color={getCategoryColor(category)}>{category}</Tag>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => (
        <Text strong className={amount >= 0 ? 'text-green-600' : 'text-red-600'}>
          ৳{Math.abs(amount).toLocaleString()}
        </Text>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type) => (
        <Tag color={type === 'Income' ? 'green' : 'red'}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'Completed' ? 'blue' : 'orange'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 130,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small" />
          <Button type="link" icon={<DownloadOutlined />} size="small" />
        </Space>
      )
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Membership': 'blue',
      'Operations': 'orange',
      'Welfare': 'green',
      'Donations': 'purple',
      'Administrative': 'cyan'
    };
    return colors[category] || 'default';
  };

  const handleExport = (format) => {
    console.log(`Exporting report in ${format} format`);
    // Implement export functionality
  };

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={2} className="!mb-2 text-gray-800 dark:text-white">
                Financial Reports
              </Title>
              <Text className="text-gray-600 dark:text-gray-400 text-lg">
                Comprehensive financial analytics and transaction insights
              </Text>
            </div>
            <Space>
              <Button icon={<ReloadOutlined />}>
                Refresh
              </Button>
              <Button 
                type="primary" 
                icon={<FilePdfOutlined />}
                onClick={() => handleExport('pdf')}
              >
                Export PDF
              </Button>
            </Space>
          </div>
        </div>

        {/* Summary Statistics */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <Statistic
                title="Total Revenue"
                value={summaryStats.totalRevenue}
                prefix="৳"
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                All time collections
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
              <Statistic
                title="Total Expenses"
                value={summaryStats.totalExpenses}
                prefix="৳"
                valueStyle={{ color: '#cf1322' }}
                suffix={<ArrowDownOutlined />}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                Operational costs
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <Statistic
                title="Net Income"
                value={summaryStats.netIncome}
                prefix="৳"
                valueStyle={{ color: '#08979c' }}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                Current balance
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-600 dark:text-gray-400 block">Collection Rate</Text>
                  <Title level={3} className="!my-1">{summaryStats.collectionRate}%</Title>
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">
                    ৳{summaryStats.pendingDues.toLocaleString()} pending
                  </Text>
                </div>
                <Progress
                  type="circle"
                  percent={summaryStats.collectionRate}
                  size={60}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filters Section */}
        <Card 
          className="shadow-sm border-0 mb-6"
          title={
            <Space>
              <FilterOutlined />
              <span>Report Filters</span>
            </Space>
          }
          extra={
            <Button type="link" icon={<DownloadOutlined />} onClick={() => handleExport('excel')}>
              Export Excel
            </Button>
          }
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} md={6}>
              <Text strong className="block mb-2">Period</Text>
              <Select
                value={filters.period}
                onChange={(value) => setFilters(prev => ({ ...prev, period: value }))}
                className="w-full"
              >
                <Option value="daily">Daily</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="quarterly">Quarterly</Option>
                <Option value="yearly">Yearly</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Text strong className="block mb-2">Date Range</Text>
              <RangePicker className="w-full" />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Text strong className="block mb-2">Report Type</Text>
              <Select
                value={filters.reportType}
                onChange={(value) => setFilters(prev => ({ ...prev, reportType: value }))}
                className="w-full"
              >
                <Option value="all">All Transactions</Option>
                <Option value="income">Income Only</Option>
                <Option value="expense">Expenses Only</Option>
                <Option value="pending">Pending Only</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <div className="flex space-x-2 pt-6">
                <Button type="primary" className="flex-1">
                  Apply Filters
                </Button>
                <Button className="flex-1">
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Financial Transactions Table */}
        <Card 
          className="shadow-sm border-0"
          title="Financial Transactions"
          extra={
            <Text strong className="text-gray-600 dark:text-gray-400">
              Total Records: {financialData.length}
            </Text>
          }
        >
          <Table 
            columns={columns} 
            dataSource={financialData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} transactions`
            }}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Additional Financial Insights */}
        <Row gutter={[16, 16]} className="mt-6">
          <Col xs={24} lg={12}>
            <Card 
              title="Revenue Distribution" 
              className="shadow-sm border-0"
            >
              <div className="space-y-4">
                {['Membership', 'Donations', 'Events', 'Other'].map((category, index) => (
                  <div key={category} className="flex justify-between items-center">
                    <Text className="text-gray-700 dark:text-gray-300">{category}</Text>
                    <div className="flex items-center space-x-3">
                      <Progress 
                        percent={[65, 20, 10, 5][index]} 
                        size="small" 
                        style={{ width: 150 }}
                        strokeColor={['#1890ff', '#52c41a', '#faad14', '#ff4d4f'][index]}
                      />
                      <Text strong className="text-gray-600 dark:text-gray-400">
                        ৳{[812500, 250000, 125000, 62500][index].toLocaleString()}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              title="Expense Breakdown" 
              className="shadow-sm border-0"
            >
              <div className="space-y-4">
                {['Operations', 'Welfare', 'Administrative', 'Maintenance'].map((category, index) => (
                  <div key={category} className="flex justify-between items-center">
                    <Text className="text-gray-700 dark:text-gray-300">{category}</Text>
                    <div className="flex items-center space-x-3">
                      <Progress 
                        percent={[40, 30, 20, 10][index]} 
                        size="small" 
                        style={{ width: 150 }}
                        strokeColor={['#ff4d4f', '#faad14', '#52c41a', '#1890ff'][index]}
                      />
                      <Text strong className="text-gray-600 dark:text-gray-400">
                        ৳{[340000, 255000, 170000, 85000][index].toLocaleString()}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FinancialReports;











