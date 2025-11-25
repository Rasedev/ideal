import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Tag,
  List,
  Avatar,
  Typography,
  Space,
  Empty,
  Spin,
  Button,
  Modal,
  Image
} from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  PictureOutlined,
  EyeOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const PastEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [galleryVisible, setGalleryVisible] = useState(false);

  useEffect(() => {
    fetchPastEvents();
  }, []);

  const fetchPastEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/events/past', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // ✅ Fix: Extract the data array from response
      const eventsData = response.data.data || [];
      setEvents(Array.isArray(eventsData) ? eventsData : []);
    } catch (error) {
      console.error('Error fetching past events:', error);
      setEvents([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      charity: 'red',
      community: 'blue',
      educational: 'green',
      health: 'cyan',
      cultural: 'purple',
      sports: 'orange',
      other: 'gray'
    };
    return colors[category] || 'gray';
  };

  const handleViewGallery = (event) => {
    setSelectedEvent(event);
    setGalleryVisible(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  // ✅ Safe array check
  const safeEvents = Array.isArray(events) ? events : [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Past Events</Title>
        <Text type="secondary">
          Review completed events and their galleries
        </Text>
      </div>

      {safeEvents.length === 0 ? (
        <Empty
          description="No past events found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {safeEvents.map((event) => (
            <Col xs={24} sm={12} lg={8} key={event._id}>
              <Card
                cover={
                  event.images && event.images.length > 0 ? (
                    <img
                      alt={event.title}
                      src={event.images[0].url}
                      className="h-48 object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <CalendarOutlined className="text-4xl text-gray-400" />
                    </div>
                  )
                }
                actions={[
                  <Button
                    type="link"
                    icon={<PictureOutlined />}
                    onClick={() => handleViewGallery(event)}
                    disabled={!event.images || event.images.length === 0}
                  >
                    Gallery ({event.images?.length || 0})
                  </Button>
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar icon={<UserOutlined />} />
                  }
                  title={
                    <Space direction="vertical" size="small">
                      <Text strong>{event.title}</Text>
                      <Tag color={getCategoryColor(event.category)}>
                        {event.category}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size="small">
                      <div>
                        <CalendarOutlined className="mr-2" />
                        {event.date ? new Date(event.date).toLocaleDateString() : 'Date not set'}
                      </div>
                      <div>
                        <EnvironmentOutlined className="mr-2" />
                        {event.venue || 'Venue not specified'}
                      </div>
                      <div>
                        <Text type="secondary">
                          Participants: {event.currentParticipants || 0}
                        </Text>
                      </div>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title={selectedEvent ? `${selectedEvent.title} - Gallery` : 'Event Gallery'}
        open={galleryVisible}
        onCancel={() => setGalleryVisible(false)}
        footer={null}
        width={800}
      >
        {selectedEvent && (
          <div className="mt-4">
            {selectedEvent.images && selectedEvent.images.length > 0 ? (
              <Image.PreviewGroup>
                <Row gutter={[8, 8]}>
                  {selectedEvent.images.map((image, index) => (
                    <Col span={8} key={index}>
                      <Image
                        src={image.url}
                        alt={image.caption || `Event image ${index + 1}`}
                        className="rounded-lg"
                      />
                      {image.caption && (
                        <Text className="block text-center mt-2">
                          {image.caption}
                        </Text>
                      )}
                    </Col>
                  ))}
                </Row>
              </Image.PreviewGroup>
            ) : (
              <Empty
                description="No photos available for this event"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PastEvents;