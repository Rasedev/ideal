// import React from 'react';
// import { Card, Row, Col, Statistic, Table, Progress, Tag } from 'antd';
// import { HeartOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

// const WelfareReports = () => {
//   const welfareData = [
//     {
//       key: '1',
//       program: 'Medical Assistance',
//       beneficiaries: 25,
//       budget: 500000,
//       spent: 450000,
//       status: 'Active',
//       completion: 90
//     },
//     // Add more data
//   ];

//   const columns = [
//     {
//       title: 'Program',
//       dataIndex: 'program',
//       key: 'program',
//     },
//     {
//       title: 'Beneficiaries',
//       dataIndex: 'beneficiaries',
//       key: 'beneficiaries',
//     },
//     {
//       title: 'Budget',
//       dataIndex: 'budget',
//       key: 'budget',
//       render: (budget) => `৳${budget.toLocaleString()}`
//     },
//     {
//       title: 'Spent',
//       dataIndex: 'spent',
//       key: 'spent',
//       render: (spent) => `৳${spent.toLocaleString()}`
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color={status === 'Active' ? 'green' : 'blue'}>
//           {status}
//         </Tag>
//       )
//     },
//     {
//       title: 'Completion',
//       dataIndex: 'completion',
//       key: 'completion',
//       render: (completion) => (
//         <Progress percent={completion} size="small" />
//       )
//     },
//   ];

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Welfare Reports</h1>
//         <p className="text-gray-600">Welfare program analytics and impact reports</p>
//       </div>

//       <Row gutter={[16, 16]} className="mb-6">
//         <Col xs={24} sm={8}>
//           <Card>
//             <Statistic
//               title="Active Programs"
//               value={5}
//               prefix={<HeartOutlined />}
//               valueStyle={{ color: '#eb2f96' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={8}>
//           <Card>
//             <Statistic
//               title="Total Beneficiaries"
//               value={156}
//               prefix={<CheckCircleOutlined />}
//               valueStyle={{ color: '#52c41a' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={8}>
//           <Card>
//             <Statistic
//               title="Pending Applications"
//               value={23}
//               prefix={<ClockCircleOutlined />}
//               valueStyle={{ color: '#faad14' }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Card title="Welfare Program Performance">
//         <Table 
//           columns={columns} 
//           dataSource={welfareData}
//           pagination={{ pageSize: 10 }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default WelfareReports;




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
  Avatar,
  Badge,
  Tooltip
} from 'antd';
import {
  HeartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const WelfareReports = () => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    program: 'all',
    status: 'all',
    dateRange: []
  });

  const welfareStats = {
    totalPrograms: 8,
    activePrograms: 5,
    totalBeneficiaries: 156,
    pendingApplications: 23,
    totalBudget: 1250000,
    utilizedBudget: 850000,
    successRate: 87
  };

  const welfareData = [
    {
      key: '1',
      program: 'Medical Assistance',
      description: 'Healthcare support for members',
      beneficiaries: 25,
      budget: 500000,
      spent: 450000,
      status: 'Active',
      completion: 90,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coordinator: 'Dr. Rahman'
    },
    {
      key: '2',
      program: 'Educational Support',
      description: 'Scholarships for members children',
      beneficiaries: 45,
      budget: 300000,
      spent: 285000,
      status: 'Active',
      completion: 95,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coordinator: 'Ms. Fatima'
    },
    {
      key: '3',
      program: 'Emergency Relief',
      description: 'Financial aid during emergencies',
      beneficiaries: 12,
      budget: 200000,
      spent: 185000,
      status: 'Active',
      completion: 92,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coordinator: 'Mr. Karim'
    },
    {
      key: '4',
      program: 'Elderly Care',
      description: 'Support for senior members',
      beneficiaries: 18,
      budget: 150000,
      spent: 120000,
      status: 'Active',
      completion: 80,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coordinator: 'Mrs. Ayesha'
    },
    {
      key: '5',
      program: 'Skill Development',
      description: 'Vocational training programs',
      beneficiaries: 56,
      budget: 100000,
      spent: 75000,
      status: 'Completed',
      completion: 100,
      startDate: '2023-06-01',
      endDate: '2023-12-31',
      coordinator: 'Mr. Hasan'
    }
  ];

  const applicationData = [
    {
      key: '1',
      applicant: 'Mohammad Ali',
      program: 'Medical Assistance',
      applyDate: '2024-01-15',
      amount: 25000,
      status: 'Under Review',
      priority: 'High'
    },
    {
      key: '2',
      applicant: 'Fatima Begum',
      program: 'Educational Support',
      applyDate: '2024-01-14',
      amount: 15000,
      status: 'Documentation Pending',
      priority: 'Medium'
    }
  ];

  const columns = [
    {
      title: 'Program Name',
      dataIndex: 'program',
      key: 'program',
      width: 180,
      render: (program, record) => (
        <div>
          <Text strong className="text-gray-800 dark:text-white block">
            {program}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-xs">
            {record.description}
          </Text>
        </div>
      )
    },
    {
      title: 'Beneficiaries',
      dataIndex: 'beneficiaries',
      key: 'beneficiaries',
      width: 120,
      render: (count) => (
        <div className="text-center">
          <TeamOutlined className="text-blue-600 mr-1" />
          <Text strong>{count}</Text>
        </div>
      )
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      width: 130,
      render: (budget) => (
        <Text strong className="text-gray-600 dark:text-gray-300">
          ৳{budget.toLocaleString()}
        </Text>
      )
    },
    {
      title: 'Utilized',
      dataIndex: 'spent',
      key: 'spent',
      width: 130,
      render: (spent, record) => (
        <div>
          <Text strong className="text-green-600">
            ৳{spent.toLocaleString()}
          </Text>
          <Progress 
            percent={Math.round((spent / record.budget) * 100)} 
            size="small" 
            className="mt-1"
          />
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={getStatusColor(status)} className="capitalize">
          {status}
        </Tag>
      )
    },
    {
      title: 'Completion',
      dataIndex: 'completion',
      key: 'completion',
      width: 120,
      render: (completion) => (
        <Progress 
          percent={completion} 
          size="small" 
          status={completion === 100 ? 'success' : 'active'}
        />
      )
    },
    {
      title: 'Coordinator',
      dataIndex: 'coordinator',
      key: 'coordinator',
      width: 140,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="link" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Download Report">
            <Button type="link" icon={<DownloadOutlined />} size="small" />
          </Tooltip>
        </Space>
      )
    }
  ];

  const applicationColumns = [
    {
      title: 'Applicant',
      dataIndex: 'applicant',
      key: 'applicant',
      width: 150,
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
      width: 150,
    },
    {
      title: 'Apply Date',
      dataIndex: 'applyDate',
      key: 'applyDate',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => `৳${amount.toLocaleString()}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status) => (
        <Badge 
          status={getApplicationStatusType(status)}
          text={status}
        />
      )
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority}
        </Tag>
      )
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'green',
      'Completed': 'blue',
      'Planning': 'orange',
      'On Hold': 'red'
    };
    return colors[status] || 'default';
  };

  const getApplicationStatusType = (status) => {
    const types = {
      'Under Review': 'processing',
      'Approved': 'success',
      'Rejected': 'error',
      'Documentation Pending': 'warning'
    };
    return types[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'red',
      'Medium': 'orange',
      'Low': 'green'
    };
    return colors[priority] || 'default';
  };

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={2} className="!mb-2 text-gray-800 dark:text-white">
                Welfare Program Reports
              </Title>
              <Text className="text-gray-600 dark:text-gray-400 text-lg">
                Track welfare initiatives and beneficiary impact
              </Text>
            </div>
            <Space>
              <Button icon={<DownloadOutlined />}>
                Export Report
              </Button>
              <Button type="primary" icon={<PlusOutlined />}>
                New Program
              </Button>
            </Space>
          </div>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20">
              <Statistic
                title="Active Programs"
                value={welfareStats.activePrograms}
                prefix={<HeartOutlined />}
                valueStyle={{ color: '#eb2f96' }}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm block mt-2">
                of {welfareStats.totalPrograms} total
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <Statistic
                title="Total Beneficiaries"
                value={welfareStats.totalBeneficiaries}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm block mt-2">
                Members supported
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <Statistic
                title="Budget Utilization"
                value={Math.round((welfareStats.utilizedBudget / welfareStats.totalBudget) * 100)}
                suffix="%"
                valueStyle={{ color: '#1890ff' }}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm block mt-2">
                ৳{welfareStats.utilizedBudget.toLocaleString()} of ৳{welfareStats.totalBudget.toLocaleString()}
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <Statistic
                title="Pending Applications"
                value={welfareStats.pendingApplications}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm block mt-2">
                Awaiting review
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Filters Section */}
        <Card 
          className="shadow-sm border-0 mb-6"
          title={
            <Space>
              <FilterOutlined />
              <span>Program Filters</span>
            </Space>
          }
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} md={6}>
              <Text strong className="block mb-2">Program Type</Text>
              <Select
                value={filters.program}
                onChange={(value) => setFilters(prev => ({ ...prev, program: value }))}
                className="w-full"
              >
                <Option value="all">All Programs</Option>
                <Option value="medical">Medical Assistance</Option>
                <Option value="education">Educational Support</Option>
                <Option value="emergency">Emergency Relief</Option>
                <Option value="elderly">Elderly Care</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Text strong className="block mb-2">Status</Text>
              <Select
                value={filters.status}
                onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                className="w-full"
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="completed">Completed</Option>
                <Option value="planning">Planning</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Text strong className="block mb-2">Date Range</Text>
              <RangePicker className="w-full" />
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

        {/* Welfare Programs Table */}
        <Card 
          className="shadow-sm border-0 mb-6"
          title="Welfare Programs Overview"
          extra={
            <Text strong className="text-gray-600 dark:text-gray-400">
              {welfareData.length} programs
            </Text>
          }
        >
          <Table 
            columns={columns} 
            dataSource={welfareData}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} programs`
            }}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Pending Applications */}
        <Card 
          className="shadow-sm border-0"
          title="Pending Applications"
          extra={
            <Badge count={welfareStats.pendingApplications} showZero={false}>
              <Text strong className="text-gray-600 dark:text-gray-400">
                Requires Attention
              </Text>
            </Badge>
          }
        >
          <Table 
            columns={applicationColumns} 
            dataSource={applicationData}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
            }}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Program Impact Summary */}
        <Row gutter={[16, 16]} className="mt-6">
          <Col xs={24} lg={12}>
            <Card title="Program Impact Summary" className="shadow-sm border-0">
              <div className="space-y-4">
                {welfareData.map((program, index) => (
                  <div key={program.key} className="flex justify-between items-center">
                    <div className="flex-1">
                      <Text className="text-gray-700 dark:text-gray-300 block">
                        {program.program}
                      </Text>
                      <Text className="text-gray-500 dark:text-gray-400 text-xs">
                        {program.beneficiaries} beneficiaries
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text strong className="text-gray-600 dark:text-gray-400 block">
                        ৳{program.spent.toLocaleString()}
                      </Text>
                      <Progress 
                        percent={program.completion} 
                        size="small" 
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Quick Actions" className="shadow-sm border-0">
              <div className="space-y-3">
                <Button type="primary" block icon={<FileTextOutlined />}>
                  Generate Monthly Report
                </Button>
                <Button block icon={<TeamOutlined />}>
                  View Beneficiary List
                </Button>
                <Button block icon={<DollarOutlined />}>
                  Budget Allocation
                </Button>
                <Button block icon={<DownloadOutlined />}>
                  Export All Data
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WelfareReports;



