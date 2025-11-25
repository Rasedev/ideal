// components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  List,
  Tag,
  Button,
  Space,
  Timeline,
  Progress,
  Avatar,
  Badge,
  Typography,
  Grid
} from 'antd';
import {
  CrownOutlined,
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  AuditOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon, color, onClick }) => (
    <Card 
      hoverable 
      onClick={onClick}
      style={{ height: '100%' }}
      bodyStyle={{ padding: '20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Text type="secondary" style={{ fontSize: '14px' }}>{title}</Text>
          <Title level={3} style={{ margin: '8px 0', color: color }}>
            {value}
          </Title>
          {change && (
            <Space>
              <Text type={change > 0 ? "success" : "danger"}>
                {change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {Math.abs(change)}%
              </Text>
              <Text type="secondary">vs last month</Text>
            </Space>
          )}
        </div>
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: `${color}15`,
          color: color
        }}>
          {icon}
        </div>
      </div>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, path, color }) => (
    <Card 
      hoverable 
      onClick={() => navigate(path)}
      style={{ height: '100%', border: `1px solid ${color}20` }}
      bodyStyle={{ padding: '16px', textAlign: 'center' }}
    >
      <div style={{ 
        fontSize: '32px', 
        color: color, 
        marginBottom: '12px' 
      }}>
        {icon}
      </div>
      <Title level={5} style={{ marginBottom: '8px' }}>
        {title}
      </Title>
      <Text type="secondary" style={{ fontSize: '12px' }}>
        {description}
      </Text>
    </Card>
  );

  const RecentUserItem = ({ user }) => (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={
          <Space>
            <Text strong>{user.firstName} {user.lastName}</Text>
            <Tag color="blue">{user.role}</Tag>
          </Space>
        }
        description={
          <Space direction="vertical" size={0}>
            <Text type="secondary">{user.email}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </Space>
        }
      />
      <Button 
        type="link" 
        icon={<EyeOutlined />}
        onClick={() => navigate(`/admin/users?search=${user.email}`)}
      >
        View
      </Button>
    </List.Item>
  );

  return (
    <div style={{ 
      padding: screens.xs ? '16px' : '24px', 
      background: 'transparent',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <Space direction="vertical" size="small">
            <Title level={2} style={{ margin: 0 }}>
              <CrownOutlined style={{ marginRight: '12px', color: '#ff4d4f' }} />
              Admin Dashboard
            </Title>
            <Text type="secondary">
              Comprehensive overview of system administration and user management
            </Text>
          </Space>
        </div>

        {/* Statistics Grid */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Users"
              value={dashboardData.stats?.totalUsers || 0}
              change={12}
              icon={<TeamOutlined />}
              color="#1890ff"
              onClick={() => navigate('/admin/users')}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Pending Approvals"
              value={dashboardData.stats?.pendingApprovals || 0}
              change={-5}
              icon={<ClockCircleOutlined />}
              color="#faad14"
              onClick={() => navigate('/admin/users?status=waiting')}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Users"
              value={dashboardData.stats?.activeUsers || 0}
              change={8}
              icon={<CheckCircleOutlined />}
              color="#52c41a"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="System Health"
              value="99.9%"
              change={0.1}
              icon={<SafetyCertificateOutlined />}
              color="#722ed1"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Quick Actions & Recent Activity */}
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              {/* Quick Actions */}
              <Col xs={24}>
                <Card 
                  title="Quick Actions" 
                  extra={
                    <Button 
                      type="link" 
                      icon={<SettingOutlined />}
                      onClick={() => navigate('/admin/users')}
                    >
                      Manage All
                    </Button>
                  }
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={12} sm={8} md={6}>
                      <QuickActionCard
                        title="User Management"
                        description="Manage system users"
                        icon={<UserOutlined />}
                        path="/admin/users"
                        color="#1890ff"
                      />
                    </Col>
                    <Col xs={12} sm={8} md={6}>
                      <QuickActionCard
                        title="Role Management"
                        description="Configure user roles"
                        icon={<SafetyCertificateOutlined />}
                        path="/admin/roles"
                        color="#52c41a"
                      />
                    </Col>
                    <Col xs={12} sm={8} md={6}>
                      <QuickActionCard
                        title="Audit Logs"
                        description="View system activities"
                        icon={<AuditOutlined />}
                        path="/admin/audit-logs"
                        color="#faad14"
                      />
                    </Col>
                    <Col xs={12} sm={8} md={6}>
                      <QuickActionCard
                        title="System Settings"
                        description="Configure system"
                        icon={<SettingOutlined />}
                        path="/admin/settings"
                        color="#722ed1"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Recent Registrations */}
              <Col xs={24}>
                <Card 
                  title="Recent Registrations"
                  extra={
                    <Button 
                      type="link"
                      onClick={() => navigate('/admin/users')}
                    >
                      View All
                    </Button>
                  }
                >
                  <List
                    dataSource={dashboardData.recentRegistrations || []}
                    renderItem={user => <RecentUserItem user={user} />}
                    pagination={false}
                    locale={{ emptyText: 'No recent registrations' }}
                  />
                </Card>
              </Col>
            </Row>
          </Col>

          {/* System Overview & Role Distribution */}
          <Col xs={24} lg={8}>
            <Row gutter={[16, 16]}>
              {/* System Status */}
              <Col xs={24}>
                <Card title="System Status">
                  <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <div>
                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Text>Uptime</Text>
                        <Text strong>{dashboardData.systemStats?.systemUptime || '99.9%'}</Text>
                      </Space>
                      <Progress 
                        percent={99.9} 
                        size="small" 
                        status="active"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                      />
                    </div>
                    <div>
                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Text>New Users (30d)</Text>
                        <Text strong>{dashboardData.systemStats?.newUsersLast30Days || 0}</Text>
                      </Space>
                      <Progress 
                        percent={75} 
                        size="small" 
                        strokeColor="#1890ff"
                      />
                    </div>
                    <div>
                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Text>Storage Usage</Text>
                        <Text strong>{dashboardData.systemStats?.storageUsage || '0 MB'}</Text>
                      </Space>
                      <Progress 
                        percent={45} 
                        size="small" 
                        strokeColor="#52c41a"
                      />
                    </div>
                  </Space>
                </Card>
              </Col>

              {/* Role Distribution */}
              <Col xs={24}>
                <Card title="Role Distribution">
                  <Space direction="vertical" style={{ width: '100%' }} size="small">
                    {dashboardData.roleDistribution?.map(role => (
                      <div key={role._id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0'
                      }}>
                        <Space>
                          <Badge color={
                            role._id === 'Admin' ? 'red' :
                            role._id === 'HR' ? 'blue' :
                            role._id === 'President' ? 'green' : 'default'
                          } />
                          <Text>{role._id}</Text>
                        </Space>
                        <Text strong>{role.count}</Text>
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>

              {/* Recent Activity Timeline */}
              <Col xs={24}>
                <Card title="Recent Activity">
                  <Timeline size="small">
                    <Timeline.Item color="green">
                      <Space direction="vertical" size={0}>
                        <Text strong>System Update</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Security patches applied
                        </Text>
                      </Space>
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      <Space direction="vertical" size={0}>
                        <Text strong>New User Registration</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          John Doe joined as Member
                        </Text>
                      </Space>
                    </Timeline.Item>
                    <Timeline.Item color="orange">
                      <Space direction="vertical" size={0}>
                        <Text strong>Backup Completed</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Daily system backup successful
                        </Text>
                      </Space>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;