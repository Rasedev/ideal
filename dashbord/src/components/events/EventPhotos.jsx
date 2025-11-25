import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Image,
  Typography,
  Empty,
  Spin,
  Tag,
  Select,
  Input,
  Space,
  Modal,
  Button
} from 'antd';
import {
  PictureOutlined,
  SearchOutlined,
  CalendarOutlined,
  DownloadOutlined,
  EyeOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const EventPhotos = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {
    fetchEventGallery();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory, searchTerm]);

  const fetchEventGallery = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/events/gallery', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // ✅ Fix: Extract the data array from response
      const eventsData = response.data.data || [];
      setEvents(Array.isArray(eventsData) ? eventsData : []);
    } catch (error) {
      console.error('Error fetching event gallery:', error);
      setEvents([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = Array.isArray(events) ? events : [];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
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

  const handlePreview = (image, eventTitle) => {
    setPreviewImage(image.url);
    setPreviewTitle(eventTitle + (image.caption ? ` - ${image.caption}` : ''));
    setPreviewVisible(true);
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'charity', label: 'Charity' },
    { value: 'community', label: 'Community' },
    { value: 'educational', label: 'Educational' },
    { value: 'health', label: 'Health' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Sports' },
    { value: 'other', label: 'Other' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  // ✅ Safe array checks
  const safeEvents = Array.isArray(events) ? events : [];
  const safeFilteredEvents = Array.isArray(filteredEvents) ? filteredEvents : [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Event Photos Gallery</Title>
        <Text type="secondary">
          Browse photos from all community events
        </Text>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8}>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-full"
            >
              {categories.map(cat => (
                <Option key={cat.value} value={cat.value}>
                  {cat.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Search
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              enterButton={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Text>
              Showing {safeFilteredEvents.length} of {safeEvents.length} events
            </Text>
          </Col>
        </Row>
      </Card>

      {safeFilteredEvents.length === 0 ? (
        <Empty
          description="No event photos found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {safeFilteredEvents.map((event) => (
            <Col xs={24} key={event._id}>
              <Card>
                <div className="mb-4">
                  <Space>
                    <Title level={4}>{event.title}</Title>
                    <Tag color={getCategoryColor(event.category)}>
                      {event.category}
                    </Tag>
                    <Text type="secondary">
                      <CalendarOutlined className="mr-1" />
                      {event.date ? new Date(event.date).toLocaleDateString() : 'Date not set'}
                    </Text>
                  </Space>
                  <Text className="block mt-2">{event.description}</Text>
                </div>

                {event.images && event.images.length > 0 ? (
                  <Row gutter={[8, 8]}>
                    {event.images.map((image, index) => (
                      <Col xs={12} sm={8} md={6} lg={4} key={index}>
                        <Card
                          hoverable
                          cover={
                            <Image
                              alt={image.caption || `Event image ${index + 1}`}
                              src={image.url}
                              className="h-32 object-cover"
                              preview={{
                                visible: false,
                                mask: (
                                  <Space>
                                    <EyeOutlined />
                                    View
                                  </Space>
                                )
                              }}
                              onClick={() => handlePreview(image, event.title)}
                            />
                          }
                          size="small"
                        >
                          <Card.Meta
                            description={
                              <Text ellipsis={{ tooltip: image.caption }}>
                                {image.caption || `Image ${index + 1}`}
                              </Text>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty
                    description="No photos available for this event"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={[
          <Button 
            key="download" 
            icon={<DownloadOutlined />}
            href={previewImage}
            download
          >
            Download
          </Button>,
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            Close
          </Button>
        ]}
        onCancel={() => setPreviewVisible(false)}
        width="80vw"
      >
        <Image
          wrapperClassName="flex justify-center"
          src={previewImage}
          alt={previewTitle}
        />
      </Modal>
    </div>
  );
};

export default EventPhotos;