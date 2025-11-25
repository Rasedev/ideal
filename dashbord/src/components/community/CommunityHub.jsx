// components/community/CommunityHub.jsx
import React, { useState } from 'react';
import { Card, Row, Col, Statistic, List, Tag, Button, Space } from 'antd';
import { 
  MessageOutlined, 
  NotificationOutlined, 
  BarChartOutlined, 
  MailOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/society.css'; // Import the CSS file

const CommunityHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const stats = {
    announcements: 15,
    unreadAnnouncements: 3,
    discussions: 47,
    activePolls: 2,
    pendingFeedback: 1
  };

  const recentActivities = [
    { type: 'announcement', title: 'Monthly Maintenance Schedule', time: '2 hours ago' },
    { type: 'discussion', title: 'Parking lot repairs discussion', time: '5 hours ago' },
    { type: 'poll', title: 'Community Event Preferences', time: '1 day ago' },
    { type: 'feedback', title: 'New playground equipment suggestion', time: '2 days ago' }
  ];

  const quickActions = [
    {
      title: 'Post Announcement',
      description: 'Share important updates',
      icon: <NotificationOutlined />,
      path: '/community/announcements/new',
      role: ['admin']
    },
    {
      title: 'Start Discussion',
      description: 'Engage with community',
      icon: <MessageOutlined />,
      path: '/community/discussions/new',
      role: ['admin', 'member']
    },
    {
      title: 'Create Poll',
      description: 'Gather community opinions',
      icon: <BarChartOutlined />,
      path: '/community/polls/new',
      role: ['admin']
    },
    {
      title: 'Submit Feedback',
      description: 'Share your suggestions',
      icon: <MailOutlined />,
      path: '/community/feedback/new',
      role: ['admin', 'member']
    }
  ];

  return (
    <div className="community-hub">
      <Row gutter={[16, 16]}>
        {/* Statistics Cards */}
        <Col xs={24} sm={12} lg={4.8}>
          <Card>
            <Statistic
              title="Announcements"
              value={stats.announcements}
              prefix={<NotificationOutlined />}
              suffix={`${stats.unreadAnnouncements} unread`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4.8}>
          <Card>
            <Statistic
              title="Discussions"
              value={stats.discussions}
              prefix={<MessageOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4.8}>
          <Card>
            <Statistic
              title="Active Polls"
              value={stats.activePolls}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4.8}>
          <Card>
            <Statistic
              title="Pending Feedback"
              value={stats.pendingFeedback}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4.8}>
          <Card>
            <Statistic
              title="Community Members"
              value={125}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col span={24}>
          <Card title="Quick Actions" className="quick-actions-card">
            <Row gutter={[16, 16]}>
              {quickActions.map((action, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <Card 
                    hoverable
                    className="action-card"
                    onClick={() => navigate(action.path)}
                  >
                    <div className="action-content">
                      <div className="action-icon">{action.icon}</div>
                      <h4>{action.title}</h4>
                      <p>{action.description}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Recent Activity & Modules */}
        <Col xs={24} lg={12}>
          <Card title="Recent Activity" extra={<a onClick={() => navigate('/community/activity')}>View All</a>}>
            <List
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={getActivityIcon(item.type)}
                    title={
                      <Space>
                        <a onClick={() => navigateToActivity(item.type)}>{item.title}</a>
                        <Tag color={getActivityColor(item.type)}>
                          {item.type.toUpperCase()}
                        </Tag>
                      </Space>
                    }
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Community Modules">
            <Row gutter={[16, 16]}>
              <Col xs={12}>
                <Card 
                  hoverable 
                  className="module-card"
                  onClick={() => navigate('/community/discussions')}
                >
                  <MessageOutlined className="module-icon" />
                  <h4>Discussion Forum</h4>
                  <p>Engage in community conversations</p>
                </Card>
              </Col>
              <Col xs={12}>
                <Card 
                  hoverable 
                  className="module-card"
                  onClick={() => navigate('/community/announcements')}
                >
                  <NotificationOutlined className="module-icon" />
                  <h4>Announcements</h4>
                  <p>Important updates and news</p>
                </Card>
              </Col>
              <Col xs={12}>
                <Card 
                  hoverable 
                  className="module-card"
                  onClick={() => navigate('/community/polls')}
                >
                  <BarChartOutlined className="module-icon" />
                  <h4>Polls & Surveys</h4>
                  <p>Voice your opinion</p>
                </Card>
              </Col>
              <Col xs={12}>
                <Card 
                  hoverable 
                  className="module-card"
                  onClick={() => navigate('/community/feedback')}
                >
                  <MailOutlined className="module-icon" />
                  <h4>Feedback</h4>
                  <p>Share suggestions</p>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );

  function getActivityIcon(type) {
    const icons = {
      announcement: <NotificationOutlined />,
      discussion: <MessageOutlined />,
      poll: <BarChartOutlined />,
      feedback: <MailOutlined />
    };
    return icons[type];
  }

  function getActivityColor(type) {
    const colors = {
      announcement: 'blue',
      discussion: 'green',
      poll: 'orange',
      feedback: 'purple'
    };
    return colors[type];
  }

  function navigateToActivity(type) {
    const paths = {
      announcement: '/community/announcements',
      discussion: '/community/discussions',
      poll: '/community/polls',
      feedback: '/community/feedback'
    };
    navigate(paths[type]);
  }
};

export default CommunityHub;