
import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Table, 
  Tag, 
  Progress, 
  List, 
  Avatar, 
  Button, 
  Badge,
  Timeline,
  Space,
  Typography,
  Alert
} from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const MemberDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [memberData, setMemberData] = useState(null);
  const [stats, setStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMemberData();
    fetchDashboardData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/member/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMemberData(response.data);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [statsRes, activitiesRes, eventsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/v1/member/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:3000/api/v1/member/recent-activities', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:3000/api/v1/member/upcoming-events', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStats(statsRes.data.data || {});
      setRecentActivities(activitiesRes.data.data || []);
      setUpcomingEvents(eventsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Mock data for demonstration
      setStats({
        totalApplications: 5,
        pendingApplications: 2,
        approvedApplications: 3,
        totalPayments: 12500,
        membershipDays: 45
      });
      
      setRecentActivities([
        {
          id: 1,
          action: 'Application Approved',
          description: 'Plot transfer application #PT-2024-001 has been approved',
          time: '2 hours ago',
          type: 'success',
          icon: <CheckCircleOutlined />
        },
        {
          id: 2,
          action: 'Payment Received',
          description: 'Monthly subscription payment confirmed',
          time: '1 day ago',
          type: 'success',
          icon: <DollarOutlined />
        },
        {
          id: 3,
          action: 'Application Submitted',
          description: 'New plot registration application submitted',
          time: '3 days ago',
          type: 'info',
          icon: <FileTextOutlined />
        }
      ]);

      setUpcomingEvents([
        {
          id: 1,
          title: 'Monthly General Meeting',
          date: '2024-12-15',
          time: '14:00',
          location: 'Main Conference Hall'
        },
        {
          id: 2,
          title: 'Infrastructure Development Discussion',
          date: '2024-12-20',
          time: '10:00',
          location: 'Committee Room'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // In the statCards array definition:
const statCards = [
  {
    title: 'Total Applications',
    value: stats.totalApplications || 0,
    icon: <FileTextOutlined />,
    color: '#1890ff',
    progress: 75
  },
  {
    title: 'Pending',
    value: stats.pendingApplications || 0,
    icon: <ClockCircleOutlined />,
    color: '#faad14',
    progress: 30
  },
  {
    title: 'Approved',
    value: stats.approvedApplications || 0,
    icon: <CheckCircleOutlined />,
    color: '#52c41a',
    progress: 60
  },
  {
    title: 'Total Payments',
    value: stats.totalPayments || 0,
    icon: <DollarOutlined />,
    color: '#722ed1',
    prefix: '₹', // Currency symbol as prefix
    progress: 85
  }
];



  const getStatusTag = (status) => {
    const statusConfig = {
      active: { color: 'green', text: 'ACTIVE' },
      pending: { color: 'orange', text: 'PENDING' },
      approved: { color: 'blue', text: 'APPROVED' },
      rejected: { color: 'red', text: 'REJECTED' },
      completed: { color: 'green', text: 'COMPLETED' }
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const quickActions = [
    {
      title: 'New Application',
      description: 'Submit plot transfer application',
      icon: '📝',
      path: '/applications/new',
      color: 'blue'
    },
    {
      title: 'View Plots',
      description: 'Check your plot details',
      icon: '🏠',
      path: '/plots',
      color: 'green'
    },
    {
      title: 'Make Payment',
      description: 'Pay subscription fees',
      icon: '💳',
      path: '/payments',
      color: 'purple'
    },
    {
      title: 'Update Profile',
      description: 'Manage your information',
      icon: '👤',
      path: '/settings/profile',
      color: 'orange'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <Text className="text-gray-600">Loading your dashboard...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Title level={2} className="!mb-2 !text-gray-800">
              Welcome back, {memberData?.firstName} {memberData?.lastName}! 👋
            </Title>
            <Text className="text-gray-600 text-lg">
              Here's your membership overview and recent activities.
            </Text>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag icon={<IdcardOutlined />} color="blue">
                Membership ID: {memberData?.membershipId || 'MEM-001'}
              </Tag>
              <Tag icon={<SafetyCertificateOutlined />} color="green">
                Status: Active
              </Tag>
              <Tag icon={<CalendarOutlined />} color="orange">
                Member since: {dayjs(memberData?.createdAt).format('MMM YYYY')}
              </Tag>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="flex justify-end">
              <Avatar 
                size={80} 
                src={memberData?.profilePhoto}
                icon={<UserOutlined />}
                className="border-4 border-white shadow-lg"
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        {statCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
              <Statistic
                  title={card.title}
                 value={card.value}
                 prefix={card.prefix || card.icon} // ✅ Fixed: Use either prefix OR icon
                 suffix={card.suffix}
                 valueStyle={{ color: card.color }}
             />
              <Progress 
                percent={card.progress} 
                size="small" 
                showInfo={false}
                strokeColor={card.color}
                className="mt-2"
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Quick Actions */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div className="flex items-center">
                <span className="text-lg font-semibold">Quick Actions</span>
              </div>
            }
            className="shadow-sm border-0 h-full"
          >
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group"
                  onClick={() => navigate(action.path)}
                >
                  <div className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-blue-700">
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {action.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div className="flex items-center">
                <ClockCircleOutlined className="text-blue-500 mr-2" />
                <span className="text-lg font-semibold">Recent Activities</span>
              </div>
            }
            className="shadow-sm border-0 h-full"
            extra={
              <Button type="link" size="small" onClick={() => navigate('/activities')}>
                View All
              </Button>
            }
          >
            <Timeline>
              {recentActivities.map((activity) => (
                <Timeline.Item
                  key={activity.id}
                  dot={activity.icon}
                  color={
                    activity.type === 'success' ? 'green' : 
                    activity.type === 'error' ? 'red' : 'blue'
                  }
                >
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">
                      {activity.action}
                    </div>
                    <div className="text-sm text-gray-600">
                      {activity.description}
                    </div>
                    <div className="text-xs text-gray-400">
                      {activity.time}
                    </div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>

        {/* Upcoming Events */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div className="flex items-center">
                <CalendarOutlined className="text-green-500 mr-2" />
                <span className="text-lg font-semibold">Upcoming Events</span>
              </div>
            }
            className="shadow-sm border-0 h-full"
            extra={
              <Button type="link" size="small" onClick={() => navigate('/events')}>
                View All
              </Button>
            }
          >
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-3 hover:border-green-300 transition-colors">
                  <div className="font-medium text-gray-900 mb-1">
                    {event.title}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <CalendarOutlined className="mr-2" />
                    {dayjs(event.date).format('MMM D, YYYY')} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvironmentOutlined className="mr-2" />
                    {event.location}
                  </div>
                </div>
              ))}
              
              {upcomingEvents.length === 0 && (
                <div className="text-center py-4">
                  <CalendarOutlined className="text-3xl text-gray-300 mb-2" />
                  <Text className="text-gray-500">No upcoming events</Text>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Membership Information */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card 
            title={
              <div className="flex items-center">
                <UserOutlined className="text-purple-500 mr-2" />
                <span className="text-lg font-semibold">Membership Information</span>
              </div>
            }
            className="shadow-sm border-0"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text strong>Membership ID:</Text>
                    <Text>{memberData?.membershipId || 'MEM-001'}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Member Since:</Text>
                    <Text>{dayjs(memberData?.createdAt).format('MMM D, YYYY')}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Status:</Text>
                    <Badge status="success" text="Active" />
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text strong>Phone:</Text>
                    <Text>{memberData?.telephone || 'N/A'}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Email:</Text>
                    <Text>{memberData?.email}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Address:</Text>
                    <Text>{memberData?.addressOne}, {memberData?.city}</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text strong>Division:</Text>
                    <Text>{memberData?.division || 'N/A'}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>District:</Text>
                    <Text>{memberData?.district || 'N/A'}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Postal Code:</Text>
                    <Text>{memberData?.postCode || 'N/A'}</Text>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Important Notice */}
      <Alert
        message="Important Notice"
        description="The next general meeting will be held on December 15, 2024. Please ensure your subscription payments are up to date to maintain active membership status."
        type="info"
        showIcon
        closable
      />
    </div>
  );
};

export default MemberDashboard;