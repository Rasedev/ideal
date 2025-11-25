// // components/welfare/WelfareDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col, Statistic, List, Tag, Button, Space, Progress, Timeline } from 'antd';
// import { 
//   HeartOutlined, 
//   ProjectOutlined, 
//   FormOutlined, 
//   DollarOutlined, 
//   FileDoneOutlined,
//   UserOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   RiseOutlined
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import './WelfareDashboard.css';

// const WelfareDashboard = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     activeInitiatives: 0,
//     totalApplications: 0,
//     pendingApplications: 0,
//     totalDonations: 0,
//     beneficiaries: 0
//   });

//   useEffect(() => {
//     fetchWelfareStats();
//   }, []);

//   const fetchWelfareStats = async () => {
//     // Mock data - replace with actual API calls
//     setStats({
//       activeInitiatives: 8,
//       totalApplications: 145,
//       pendingApplications: 23,
//       totalDonations: 125000,
//       beneficiaries: 89
//     });
//   };

//   const quickActions = [
//     {
//       title: 'Manage Initiatives',
//       description: 'View and manage welfare programs',
//       icon: <ProjectOutlined />,
//       path: '/welfare/initiatives',
//       role: ['admin', 'hr']
//     },
//     {
//       title: 'Apply for Aid',
//       description: 'Submit assistance application',
//       icon: <FormOutlined />,
//       path: '/welfare/apply',
//       role: ['admin', 'hr', 'member']
//     },
//     {
//       title: 'Make Donation',
//       description: 'Contribute to welfare fund',
//       icon: <DollarOutlined />,
//       path: '/welfare/donations',
//       role: ['admin', 'hr', 'member']
//     },
//     {
//       title: 'View Reports',
//       description: 'Program performance reports',
//       icon: <FileDoneOutlined />,
//       path: '/welfare/reports',
//       role: ['admin', 'hr']
//     }
//   ];

//   const recentActivities = [
//     { 
//       type: 'application', 
//       title: 'Education Grant Application Approved', 
//       time: '2 hours ago',
//       status: 'approved'
//     },
//     { 
//       type: 'donation', 
//       title: 'New donation received - $5,000', 
//       time: '5 hours ago',
//       status: 'received'
//     },
//     { 
//       type: 'initiative', 
//       title: 'Healthcare program launched', 
//       time: '1 day ago',
//       status: 'active'
//     },
//     { 
//       type: 'application', 
//       title: 'Emergency aid request submitted', 
//       time: '2 days ago',
//       status: 'pending'
//     }
//   ];

//   const upcomingDeadlines = [
//     { initiative: 'Education Support Program', deadline: '2024-02-15', type: 'application' },
//     { initiative: 'Quarterly Report Submission', deadline: '2024-02-20', type: 'report' },
//     { initiative: 'Healthcare Initiative Review', deadline: '2024-02-25', type: 'review' }
//   ];

//   return (
//     <div className="welfare-dashboard">
//       <Row gutter={[16, 16]}>
//         {/* Statistics Cards */}
//         <Col xs={24} sm={12} lg={4.8}>
//           <Card>
//             <Statistic
//               title="Active Initiatives"
//               value={stats.activeInitiatives}
//               prefix={<ProjectOutlined />}
//               valueStyle={{ color: '#52c41a' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} lg={4.8}>
//           <Card>
//             <Statistic
//               title="Total Applications"
//               value={stats.totalApplications}
//               prefix={<FormOutlined />}
//               valueStyle={{ color: '#1890ff' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} lg={4.8}>
//           <Card>
//             <Statistic
//               title="Pending Reviews"
//               value={stats.pendingApplications}
//               prefix={<ClockCircleOutlined />}
//               valueStyle={{ color: '#faad14' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} lg={4.8}>
//           <Card>
//             <Statistic
//               title="Total Donations"
//               value={stats.totalDonations}
//               prefix={<DollarOutlined />}
//               prefix="$"
//               valueStyle={{ color: '#cf1322' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} lg={4.8}>
//           <Card>
//             <Statistic
//               title="Beneficiaries"
//               value={stats.beneficiaries}
//               prefix={<UserOutlined />}
//               valueStyle={{ color: '#722ed1' }}
//             />
//           </Card>
//         </Col>

//         {/* Quick Actions */}
//         <Col span={24}>
//           <Card title="Quick Actions" className="quick-actions-card">
//             <Row gutter={[16, 16]}>
//               {quickActions.map((action, index) => (
//                 <Col xs={24} sm={12} md={6} key={index}>
//                   <Card 
//                     hoverable
//                     className="action-card"
//                     onClick={() => navigate(action.path)}
//                   >
//                     <div className="action-content">
//                       <div className="action-icon">{action.icon}</div>
//                       <h4>{action.title}</h4>
//                       <p>{action.description}</p>
//                     </div>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </Card>
//         </Col>

//         {/* Recent Activities & Upcoming Deadlines */}
//         <Col xs={24} lg={12}>
//           <Card title="Recent Activities" extra={<a onClick={() => navigate('/welfare/activity')}>View All</a>}>
//             <List
//               dataSource={recentActivities}
//               renderItem={item => (
//                 <List.Item>
//                   <List.Item.Meta
//                     avatar={getActivityIcon(item.type)}
//                     title={
//                       <Space>
//                         <a>{item.title}</a>
//                         <Tag color={getStatusColor(item.status)}>
//                           {item.status.toUpperCase()}
//                         </Tag>
//                       </Space>
//                     }
//                     description={item.time}
//                   />
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="Upcoming Deadlines">
//             <Timeline>
//               {upcomingDeadlines.map((deadline, index) => (
//                 <Timeline.Item
//                   key={index}
//                   color={getDeadlineColor(deadline.type)}
//                   dot={getDeadlineDot(deadline.type)}
//                 >
//                   <Space direction="vertical" size={0}>
//                     <strong>{deadline.initiative}</strong>
//                     <span>Due: {new Date(deadline.deadline).toLocaleDateString()}</span>
//                     <Tag color={getDeadlineColor(deadline.type)}>
//                       {deadline.type.toUpperCase()}
//                     </Tag>
//                   </Space>
//                 </Timeline.Item>
//               ))}
//             </Timeline>
//           </Card>
//         </Col>

//         {/* Initiative Progress */}
//         <Col span={24}>
//           <Card title="Initiative Progress">
//             <Row gutter={[16, 16]}>
//               <Col xs={24} sm={12} md={8}>
//                 <Card size="small" title="Education Support" className="progress-card">
//                   <Progress percent={75} status="active" />
//                   <div className="progress-stats">
//                     <span>45/60 Beneficiaries</span>
//                     <span>$45,000/$60,000</span>
//                   </div>
//                 </Card>
//               </Col>
//               <Col xs={24} sm={12} md={8}>
//                 <Card size="small" title="Healthcare Program" className="progress-card">
//                   <Progress percent={60} status="active" />
//                   <div className="progress-stats">
//                     <span>30/50 Beneficiaries</span>
//                     <span>$30,000/$50,000</span>
//                   </div>
//                 </Card>
//               </Col>
//               <Col xs={24} sm={12} md={8}>
//                 <Card size="small" title="Emergency Relief" className="progress-card">
//                   <Progress percent={90} status="active" />
//                   <div className="progress-stats">
//                     <span>18/20 Beneficiaries</span>
//                     <span>$18,000/$20,000</span>
//                   </div>
//                 </Card>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );

//   function getActivityIcon(type) {
//     const icons = {
//       application: <FormOutlined />,
//       donation: <DollarOutlined />,
//       initiative: <ProjectOutlined />,
//       report: <FileDoneOutlined />
//     };
//     return icons[type];
//   }

//   function getStatusColor(status) {
//     const colors = {
//       approved: 'green',
//       pending: 'orange',
//       received: 'blue',
//       active: 'green'
//     };
//     return colors[status];
//   }

//   function getDeadlineColor(type) {
//     const colors = {
//       application: 'blue',
//       report: 'purple',
//       review: 'orange'
//     };
//     return colors[type];
//   }

//   function getDeadlineDot(type) {
//     const dots = {
//       application: <FormOutlined />,
//       report: <FileDoneOutlined />,
//       review: <ClockCircleOutlined />
//     };
//     return dots[type];
//   }
// };

// export default WelfareDashboard;




// components/welfare/WelfareDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { 
//   HeartIcon, 
//   ChartBarIcon, 
//   DocumentTextIcon, 
//   CurrencyDollarIcon,
//   UserGroupIcon,
//   ClockIcon,
//   CheckCircleIcon,
//   ExclamationTriangleIcon
// } from '@heroicons/react/24/outline';
import {
  HeartOutlined,
  BarChartOutlined,
  FileTextOutlined,
  DollarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from "@ant-design/icons";

const WelfareDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWelfareStats();
  }, []);

  const fetchWelfareStats = async () => {
    try {
      const response = await fetch('/api/welfare/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setStats(data.stats);
      setRecentApplications(data.recentApplications || []);
      setUpcomingDeadlines(data.upcomingDeadlines || []);
    } catch (error) {
      console.error('Error fetching welfare stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, href, color }) => (
    <Link to={href} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-500 group cursor-pointer">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welfare Programs</h1>
          <p className="text-gray-600 mt-2">Manage and track community welfare initiatives</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Initiatives"
            value={stats.activeInitiatives || 0}
            icon={HeartOutlined}
            color="bg-pink-500"
          />
          <StatCard
            title="Total Applications"
            value={stats.totalApplications || 0}
            icon={FileTextOutlined}
            color="bg-blue-500"
          />
          <StatCard
            title="Pending Reviews"
            value={stats.pendingApplications || 0}
            icon={ClockCircleOutlined}
            color="bg-yellow-500"
          />
          <StatCard
            title="Total Donations"
            value={`$${(stats.totalDonations || 0).toLocaleString()}`}
            icon={DollarOutlined}
            color="bg-green-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuickActionCard
                title="Current Initiatives"
                description="View and manage ongoing welfare programs"
                icon={HeartOutlined}
                href="/welfare/initiatives"
                color="bg-pink-500"
              />
              <QuickActionCard
                title="Apply for Aid"
                description="Submit application for welfare assistance"
                icon={FileTextOutlined}
                href="/welfare/apply"
                color="bg-blue-500"
              />
              <QuickActionCard
                title="Donation Management"
                description="Manage donations and contributions"
                icon={DollarOutlined}
                href="/welfare/donations"
                color="bg-green-500"
              />
              <QuickActionCard
                title="Program Reports"
                description="View welfare program analytics and reports"
                icon={BarChartOutlined}
                href="/welfare/reports"
                color="bg-purple-500"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Applications</h2>
              <div className="space-y-4">
                {recentApplications.slice(0, 5).map((application, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <TeamOutlined className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {application.applicant?.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {application.initiative?.title}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                ))}
                {recentApplications.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent applications</p>
                )}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {upcomingDeadlines.slice(0, 3).map((initiative, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{initiative.title}</p>
                      <p className="text-xs text-gray-500">
                        Ends {new Date(initiative.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <WarningOutlined className="w-5 h-5 text-orange-500" />
                  </div>
                ))}
                {upcomingDeadlines.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelfareDashboard;








