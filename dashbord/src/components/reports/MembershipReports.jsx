
// import React, { useState, useEffect } from 'react';
// import {
//   UserSwitchOutlined ,          
//   PlusOutlined,           
//   CalendarOutlined,       
//   DownloadOutlined,       
//   EyeOutlined,            
//   BarChartOutlined        
// } from '@ant-design/icons';

// const MembershipReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     reportType: '',
//     dateRange: 'all'
//   });

//   useEffect(() => {
//     fetchReports();
//   }, [filters]);

//   const fetchReports = async () => {
//     try {
//       const queryParams = new URLSearchParams();
//       if (filters.reportType) queryParams.append('reportType', filters.reportType);

//       const response = await fetch(`/api/reports/membership?${queryParams}`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       const data = await response.json();
//       setReports(data.reports || []);
//     } catch (error) {
//       console.error('Error fetching membership reports:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const ReportCard = ({ report }) => (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
//           <div className="flex items-center space-x-4 text-sm text-gray-600">
//             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//               {report.reportType}
//             </span>
//             <span className="inline-flex items-center">
//               <CalendarOutlined className="w-4 h-4 mr-1" />
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

//       {/* Summary Stats */}
//       {report.summary && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-gray-900">{report.summary.totalMembers}</div>
//             <div className="text-xs text-gray-500">Total Members</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-green-600">{report.summary.newMembers}</div>
//             <div className="text-xs text-gray-500">New Members</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-blue-600">{report.summary.activeMembers}</div>
//             <div className="text-xs text-gray-500">Active</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-gray-600">{report.summary.membershipGrowth}%</div>
//             <div className="text-xs text-gray-500">Growth</div>
//           </div>
//         </div>
//       )}

//       {/* Demographic Preview */}
//       {report.demographicData && (
//         <div className="border-t border-gray-200 pt-4">
//           <h4 className="text-sm font-medium text-gray-900 mb-3">Role Distribution</h4>
//           <div className="space-y-2">
//             {Object.entries(report.demographicData.byRole || {}).slice(0, 3).map(([role, count]) => (
//               <div key={role} className="flex justify-between items-center text-sm">
//                 <span className="text-gray-600 capitalize">{role}</span>
//                 <span className="font-semibold text-gray-900">{count}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
//         <span className="text-sm text-gray-500">
//           Generated {new Date(report.createdAt).toLocaleDateString()}
//         </span>
//         <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//           View Full Report
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
//             <h1 className="text-3xl font-bold text-gray-900">Membership Reports</h1>
//             <p className="text-gray-600 mt-2">Analytics and insights about community membership</p>
//           </div>
//           <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-4 sm:mt-0">
//             <PlusOutlined className="w-5 h-5 mr-2" />
//             Generate Report
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
//               <select
//                 value={filters.reportType}
//                 onChange={(e) => setFilters(prev => ({ ...prev, reportType: e.target.value }))}
//                 className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="">All Types</option>
//                 <option value="Monthly">Monthly</option>
//                 <option value="Quarterly">Quarterly</option>
//                 <option value="Annual">Annual</option>
//                 <option value="Custom">Custom</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
//               <select
//                 value={filters.dateRange}
//                 onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
//                 className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="all">All Time</option>
//                 <option value="30d">Last 30 Days</option>
//                 <option value="90d">Last 90 Days</option>
//                 <option value="1y">Last Year</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
//               <div className="flex space-x-3">
//                 <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
//                   <BarChartOutlined className="w-4 h-4 mr-2" />
//                   Analyze
//                 </button>
//                 <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200">
//                   <DownloadOutlined className="w-4 h-4 mr-2" />
//                   Export
//                 </button>
//               </div>
//             </div>
//           </div>
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
//             <UserSwitchOutlined className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-4 text-lg font-medium text-gray-900">No reports found</h3>
//             <p className="mt-2 text-gray-500">No membership reports match your current filters.</p>
//             <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
//               <PlusOutlined className="w-4 h-4 mr-2" />
//               Generate First Report
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MembershipReports;






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
  Badge
} from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  DownloadOutlined,
  FilterOutlined,
  EyeOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const MembershipReports = () => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    membershipType: 'all',
    dateRange: []
  });

  const membershipStats = {
    totalMembers: 367,
    activeMembers: 342,
    newThisMonth: 15,
    pendingApproval: 8,
    growthRate: 12.5,
    renewalRate: 89.2
  };

  const membersData = [
    {
      key: '1',
      name: 'Alamgir Hossain',
      membershipId: 'MEM001',
      joinDate: '2023-01-15',
      status: 'Active',
      type: 'Regular',
      role: 'President',
      lastPayment: '2024-01-01',
      contact: '+8801712345678'
    },
    {
      key: '2',
      name: 'Mohammad Ali',
      membershipId: 'MEM002',
      joinDate: '2023-03-20',
      status: 'Active',
      type: 'Associate',
      role: 'Member',
      lastPayment: '2024-01-01',
      contact: '+8801812345678'
    },
    {
      key: '3',
      name: 'Fatima Begum',
      membershipId: 'MEM003',
      joinDate: '2023-06-10',
      status: 'Pending',
      type: 'Regular',
      role: 'Member',
      lastPayment: 'Pending',
      contact: '+8801912345678'
    },
    {
      key: '4',
      name: 'Abdul Karim',
      membershipId: 'MEM004',
      joinDate: '2023-08-05',
      status: 'Active',
      type: 'Life Member',
      role: 'Treasurer',
      lastPayment: '2024-01-01',
      contact: '+8801612345678'
    },
    {
      key: '5',
      name: 'Ayesha Siddiqua',
      membershipId: 'MEM005',
      joinDate: '2023-11-15',
      status: 'Inactive',
      type: 'Regular',
      role: 'Member',
      lastPayment: '2023-12-01',
      contact: '+8801512345678'
    }
  ];

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      render: (name, record) => (
        <Space>
          <Avatar 
            size="small" 
            style={{ 
              backgroundColor: getRoleColor(record.role),
              fontSize: '12px'
            }}
          >
            {name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <div>
            <Text strong className="block text-gray-800 dark:text-white">
              {name}
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-xs">
              {record.membershipId}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => (
        <Tag color={getRoleColor(role)} className="capitalize">
          {role}
        </Tag>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type) => (
        <Tag color={getTypeColor(type)}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Badge 
          status={getStatusType(status)}
          text={status}
        />
      )
    },
    {
      title: 'Last Payment',
      dataIndex: 'lastPayment',
      key: 'lastPayment',
      width: 120,
      render: (payment) => (
        <Text className={payment === 'Pending' ? 'text-orange-600' : 'text-green-600'}>
          {payment}
        </Text>
      )
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      width: 140,
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

  const getRoleColor = (role) => {
    const colors = {
      'President': 'red',
      'Treasurer': 'orange',
      'Secretary': 'blue',
      'Member': 'green'
    };
    return colors[role] || 'default';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Regular': 'blue',
      'Associate': 'green',
      'Life Member': 'purple',
      'Honorary': 'gold'
    };
    return colors[type] || 'default';
  };

  const getStatusType = (status) => {
    const types = {
      'Active': 'success',
      'Pending': 'processing',
      'Inactive': 'default',
      'Suspended': 'warning'
    };
    return types[status] || 'default';
  };

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={2} className="!mb-2 text-gray-800 dark:text-white">
                Membership Reports
              </Title>
              <Text className="text-gray-600 dark:text-gray-400 text-lg">
                Comprehensive member analytics and community insights
              </Text>
            </div>
            <Space>
              <Button icon={<DownloadOutlined />}>
                Export
              </Button>
              <Button type="primary" icon={<BarChartOutlined />}>
                Generate Report
              </Button>
            </Space>
          </div>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <Statistic
                title="Total Members"
                value={membershipStats.totalMembers}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
              <Progress 
                percent={membershipStats.growthRate} 
                size="small" 
                status="active"
                className="mt-2"
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <Statistic
                title="Active Members"
                value={membershipStats.activeMembers}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm block mt-2">
                {Math.round((membershipStats.activeMembers / membershipStats.totalMembers) * 100)}% active rate
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <Statistic
                title="New This Month"
                value={membershipStats.newThisMonth}
                prefix={<UserAddOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
              <Text className="text-gray-600 dark:text-gray-400 text-sm block mt-2">
                +12% from last month
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="shadow-sm border-0 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <Statistic
                title="Pending Approval"
                value={membershipStats.pendingApproval}
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
              <span>Member Filters</span>
            </Space>
          }
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} md={6}>
              <Text strong className="block mb-2">Status</Text>
              <Select
                value={filters.status}
                onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                className="w-full"
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="pending">Pending</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Text strong className="block mb-2">Membership Type</Text>
              <Select
                value={filters.membershipType}
                onChange={(value) => setFilters(prev => ({ ...prev, membershipType: value }))}
                className="w-full"
              >
                <Option value="all">All Types</Option>
                <Option value="regular">Regular</Option>
                <Option value="associate">Associate</Option>
                <Option value="life">Life Member</Option>
                <Option value="honorary">Honorary</Option>
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

        {/* Members Table */}
        <Card 
          className="shadow-sm border-0"
          title="Member Directory"
          extra={
            <Text strong className="text-gray-600 dark:text-gray-400">
              Showing {membersData.length} members
            </Text>
          }
        >
          <Table 
            columns={columns} 
            dataSource={membersData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} members`
            }}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Additional Analytics */}
        <Row gutter={[16, 16]} className="mt-6">
          <Col xs={24} lg={12}>
            <Card title="Membership Growth" className="shadow-sm border-0">
              <div className="text-center py-8">
                <Text className="text-gray-500 dark:text-gray-400">
                  Membership growth chart would be displayed here
                </Text>
                {/* You can integrate Chart.js or Recharts here */}
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Role Distribution" className="shadow-sm border-0">
              <div className="space-y-4">
                {[
                  { role: 'Members', count: 320, percent: 87 },
                  { role: 'Committee', count: 25, percent: 7 },
                  { role: 'Executive', count: 12, percent: 3 },
                  { role: 'Advisors', count: 10, percent: 3 }
                ].map((item, index) => (
                  <div key={item.role} className="flex justify-between items-center">
                    <Text className="text-gray-700 dark:text-gray-300">{item.role}</Text>
                    <div className="flex items-center space-x-3">
                      <Progress 
                        percent={item.percent} 
                        size="small" 
                        style={{ width: 150 }}
                        strokeColor={['#1890ff', '#52c41a', '#faad14', '#ff4d4f'][index]}
                      />
                      <Text strong className="text-gray-600 dark:text-gray-400">
                        {item.count}
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

export default MembershipReports;








