// components/legal/LegalDashboard.jsx
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
  Badge,
  Alert
} from 'antd';
import { 
  FileDoneOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  FileProtectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const LegalDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/legal/dashboard', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching legal dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'green',
      'Draft': 'blue',
      'Expired': 'red',
      'Pending Renewal': 'orange',
      'Archived': 'default',
      'Under Review': 'purple'
    };
    return colors[status] || 'default';
  };

  const QuickActionCard = ({ title, description, icon, path, count, type }) => (
    <Card 
      hoverable 
      className="quick-action-card"
      onClick={() => navigate(path)}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }}>
          {icon}
        </div>
        <h4 style={{ marginBottom: '8px', color: '#262626' }}>{title}</h4>
        <p style={{ color: '#8c8c8c', marginBottom: '8px', fontSize: '12px' }}>
          {description}
        </p>
        {count !== undefined && (
          <Badge 
            count={count} 
            style={{ backgroundColor: type === 'warning' ? '#faad14' : '#52c41a' }} 
          />
        )}
      </div>
    </Card>
  );

  const RecentActivityItem = ({ item, type }) => {
    const getIcon = () => {
      switch (type) {
        case 'license':
          return <SafetyCertificateOutlined style={{ color: '#52c41a' }} />;
        case 'agreement':
          return <FileProtectOutlined style={{ color: '#1890ff' }} />;
        case 'constitution':
          return <FileTextOutlined style={{ color: '#722ed1' }} />;
        default:
          return <FileDoneOutlined />;
      }
    };

    return (
      <List.Item>
        <List.Item.Meta
          avatar={getIcon()}
          title={
            <Space>
              <span>{item.name || item.title}</span>
              <Tag color={getStatusColor(item.status)}>
                {item.status}
              </Tag>
            </Space>
          }
          description={
            <Space>
              <span>{new Date(item.createdAt || item.updatedAt).toLocaleDateString()}</span>
              {item.type && <Tag>{item.type}</Tag>}
            </Space>
          }
        />
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => navigate(`/legal/${type}s`)}
        >
          View
        </Button>
      </List.Item>
    );
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', margin: 0, color: '#262626' }}>
            Legal & Documentation
          </h1>
          <p style={{ color: '#8c8c8c', margin: '8px 0 0 0' }}>
            Manage legal documents, licenses, and agreements
          </p>
        </div>

        {/* Alerts */}
        {(dashboardData.stats?.expiringLicenses > 0 || dashboardData.stats?.expiringAgreements > 0) && (
          <Alert
            message="Attention Required"
            description={`You have ${dashboardData.stats.expiringLicenses} licenses and ${dashboardData.stats.expiringAgreements} agreements expiring soon.`}
            type="warning"
            showIcon
            style={{ marginBottom: '24px' }}
            action={
              <Button size="small" type="link">
                Review Now
              </Button>
            }
          />
        )}

        {/* Statistics */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Constitution"
                value={dashboardData.stats?.activeConstitution || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: dashboardData.stats?.activeConstitution ? '#52c41a' : '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Licenses"
                value={dashboardData.stats?.totalLicenses || 0}
                prefix={<SafetyCertificateOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Expiring Licenses"
                value={dashboardData.stats?.expiringLicenses || 0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: dashboardData.stats?.expiringLicenses > 0 ? '#faad14' : '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Agreements"
                value={dashboardData.stats?.totalAgreements || 0}
                prefix={<FileProtectOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Quick Actions */}
          <Col xs={24} lg={12}>
            <Card 
              title="Quick Actions" 
              extra={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/legal/constitution')}
                >
                  New Document
                </Button>
              }
            >
              <Row gutter={[16, 16]}>
                <Col xs={12} md={8}>
                  <QuickActionCard
                    title="Constitution"
                    description="View and manage by-laws"
                    icon={<FileTextOutlined />}
                    path="/legal/constitution"
                  />
                </Col>
                <Col xs={12} md={8}>
                  <QuickActionCard
                    title="Licenses"
                    description="Manage certificates"
                    icon={<SafetyCertificateOutlined />}
                    path="/legal/licenses"
                    count={dashboardData.stats?.expiringLicenses}
                    type="warning"
                  />
                </Col>
                <Col xs={12} md={8}>
                  <QuickActionCard
                    title="Agreements"
                    description="View contracts"
                    icon={<FileProtectOutlined />}
                    path="/legal/agreements"
                    count={dashboardData.stats?.expiringAgreements}
                    type="warning"
                  />
                </Col>
              </Row>
            </Card>

            {/* Active Constitution */}
            {dashboardData.activeConstitution && (
              <Card title="Active Constitution" style={{ marginTop: '16px' }}>
                <div style={{ padding: '16px', background: '#fafafa', borderRadius: '6px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#262626' }}>
                    {dashboardData.activeConstitution.title}
                  </h4>
                  <Space>
                    <Tag color="blue">Version {dashboardData.activeConstitution.version}</Tag>
                    <span style={{ color: '#8c8c8c' }}>
                      Effective {new Date(dashboardData.activeConstitution.effectiveDate).toLocaleDateString()}
                    </span>
                  </Space>
                  <div style={{ marginTop: '16px' }}>
                    <Button 
                      type="primary" 
                      onClick={() => navigate('/legal/constitution')}
                    >
                      View Constitution
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </Col>

          {/* Recent Activities */}
          <Col xs={24} lg={12}>
            <Card title="Recent Activities">
              <Timeline>
                {dashboardData.recentActivities?.licenses?.slice(0, 3).map((license, index) => (
                  <Timeline.Item
                    key={`license-${index}`}
                    dot={<SafetyCertificateOutlined style={{ color: '#52c41a' }} />}
                  >
                    <Space direction="vertical" size={0}>
                      <strong>{license.name}</strong>
                      <span>{license.type}</span>
                      <Tag color={getStatusColor(license.status)}>{license.status}</Tag>
                      <small>{new Date(license.createdAt).toLocaleDateString()}</small>
                    </Space>
                  </Timeline.Item>
                ))}
                {dashboardData.recentActivities?.agreements?.slice(0, 2).map((agreement, index) => (
                  <Timeline.Item
                    key={`agreement-${index}`}
                    dot={<FileProtectOutlined style={{ color: '#1890ff' }} />}
                  >
                    <Space direction="vertical" size={0}>
                      <strong>{agreement.title}</strong>
                      <span>{agreement.type}</span>
                      <Tag color={getStatusColor(agreement.status)}>{agreement.status}</Tag>
                      <small>{new Date(agreement.createdAt).toLocaleDateString()}</small>
                    </Space>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>

            {/* Upcoming Expirations */}
            <Card title="Upcoming Expirations" style={{ marginTop: '16px' }}>
              <List
                size="small"
                dataSource={[
                  ...(dashboardData.stats?.expiringLicenses > 0 ? [{ type: 'license', count: dashboardData.stats.expiringLicenses }] : []),
                  ...(dashboardData.stats?.expiringAgreements > 0 ? [{ type: 'agreement', count: dashboardData.stats.expiringAgreements }] : [])
                ]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        item.type === 'license' ? 
                          <SafetyCertificateOutlined style={{ color: '#faad14' }} /> :
                          <FileProtectOutlined style={{ color: '#faad14' }} />
                      }
                      title={`${item.count} ${item.type === 'license' ? 'Licenses' : 'Agreements'} expiring soon`}
                      description="Review and take action"
                    />
                    <Button type="link" size="small">
                      Review
                    </Button>
                  </List.Item>
                )}
                locale={{ emptyText: 'No upcoming expirations' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LegalDashboard;