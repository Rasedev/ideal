import React, { useState, useEffect } from 'react';
import { Card, Spin, Alert, Empty, Typography, Row, Col, Tag, Button } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Meta } = Card;

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug token
      
      // First, let's check if the API endpoint exists
      const API_URL = '/api/events/upcoming';
      console.log('Fetching from:', API_URL);
      
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Get the raw response text first to see what we're getting
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      // Check if response is HTML (error page)
      if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
        throw new Error('Server returned HTML instead of JSON. Check API endpoint.');
      }
      
      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }
      
      console.log('Parsed result:', result);
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      if (result.success) {
        setEvents(Array.isArray(result.data) ? result.data : []);
      } else {
        throw new Error(result.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      setError(error.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component code (getCategoryColor, render logic, etc.)
  
  const getCategoryColor = (category) => {
    const colors = {
      charity: 'red',
      community: 'blue',
      educational: 'green',
      health: 'cyan',
      cultural: 'orange',
      sports: 'purple',
      other: 'gray'
    };
    return colors[category] || 'gray';
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Loading upcoming events...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert
          message="Error"
          description={
            <div>
              <div>{error}</div>
              <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                Check browser console for detailed logs
              </div>
            </div>
          }
          type="error"
          showIcon
          action={
            <Button size="small" onClick={fetchUpcomingEvents}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  const safeEvents = Array.isArray(events) ? events : [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Upcoming Events</Title>
        <Text type="secondary">
          Discover and participate in our upcoming community events
          <Button type="link" onClick={fetchUpcomingEvents} style={{ marginLeft: 16 }}>
            Debug Refresh
          </Button>
        </Text>
      </div>

      {safeEvents.length === 0 ? (
        <Empty
          description="No upcoming events found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={fetchUpcomingEvents}>
            Try Again
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {safeEvents.map((event) => (
            <Col xs={24} sm={12} lg={8} key={event._id}>
              <Card
                hoverable
                cover={
                  event.images && event.images.length > 0 ? (
                    <img
                      alt={event.title}
                      src={event.images[0].url}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 200,
                        background: '#f0f2f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CalendarOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
                    </div>
                  )
                }
                actions={[
                  <Button type="link">View Details</Button>,
                  <Button type="primary">Register</Button>
                ]}
              >
                <Meta
                  title={
                    <div>
                      {event.title}
                      <Tag 
                        color={getCategoryColor(event.category)} 
                        style={{ marginLeft: 8 }}
                      >
                        {event.category?.charAt(0).toUpperCase() + event.category?.slice(1)}
                      </Tag>
                    </div>
                  }
                  description={
                    <div>
                      <div style={{ marginBottom: 8 }}>
                        <Text type="secondary">
                          <CalendarOutlined /> {dayjs(event.date).format('MMM D, YYYY')} at {event.time}
                        </Text>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <Text type="secondary">
                          <EnvironmentOutlined /> {event.venue}
                        </Text>
                      </div>
                      <div>
                        <Text type="secondary">
                          <UserOutlined /> Organized by {event.organizer}
                        </Text>
                      </div>
                      {event.isRegistrationRequired && (
                        <div style={{ marginTop: 8 }}>
                          <Tag color="blue">Registration Required</Tag>
                          {event.maxParticipants && (
                            <Text type="secondary" style={{ marginLeft: 8 }}>
                              {event.currentParticipants || 0}/{event.maxParticipants} registered
                            </Text>
                          )}
                        </div>
                      )}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UpcomingEvents;