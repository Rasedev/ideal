import React, { useState, useEffect } from 'react';
import {
  Card,
  Timeline,
  Button,
  Space,
  Typography,
  Tag,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Row,
  Col,
  List,
  Divider,
  Empty,
  Popconfirm,
  Select,
} from 'antd';
import {
  CalendarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HistoryOutlined,
  TrophyOutlined,
  TeamOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

const AssociationHistory = () => {
  const [historyEvents, setHistoryEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchHistoryEvents();
  }, []);

  const fetchHistoryEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/association/history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setHistoryEvents(response.data.events || []);
      }
    } catch (error) {
      message.error('Failed to fetch association history');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const url = editingEvent 
        ? `http://localhost:3000/api/v1/association/history/${editingEvent._id}`
        : 'http://localhost:3000/api/v1/association/history';
      
      const method = editingEvent ? 'put' : 'post';

      const response = await axios[method](
        url,
        {
          ...values,
          eventDate: values.eventDate.format('YYYY-MM-DD'),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success(editingEvent ? 'Event updated successfully' : 'Event added successfully');
        setModalVisible(false);
        setEditingEvent(null);
        form.resetFields();
        fetchHistoryEvents();
      }
    } catch (error) {
      message.error(`Failed to ${editingEvent ? 'update' : 'add'} event`);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/api/v1/association/history/${eventId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Event deleted successfully');
        fetchHistoryEvents();
      }
    } catch (error) {
      message.error('Failed to delete event');
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    form.setFieldsValue({
      ...event,
      eventDate: event.eventDate ? dayjs(event.eventDate) : null,
    });
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingEvent(null);
    form.resetFields();
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      milestone: <TrophyOutlined />,
      establishment: <ApartmentOutlined />,
      achievement: <TeamOutlined />,
      general: <HistoryOutlined />,
    };
    return icons[type] || <HistoryOutlined />;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      milestone: 'gold',
      establishment: 'blue',
      achievement: 'green',
      general: 'purple',
    };
    return colors[type] || 'default';
  };

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const eventTypes = [
    { value: 'milestone', label: 'Milestone', color: 'gold' },
    { value: 'establishment', label: 'Establishment', color: 'blue' },
    { value: 'achievement', label: 'Achievement', color: 'green' },
    { value: 'general', label: 'General', color: 'purple' },
  ];

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`} loading={loading}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <CalendarOutlined className="mr-3" />
              Association History
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Document and manage important milestones and events
            </Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Add Event
          </Button>
        </div>

        {historyEvents.length === 0 ? (
          <Empty
            description="No history events recorded yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add First Event
            </Button>
          </Empty>
        ) : (
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card title="Historical Timeline" className="mb-6">
                <Timeline
                  mode="alternate"
                  items={historyEvents.map((event, index) => ({
                    key: event._id,
                    color: getEventTypeColor(event.eventType),
                    dot: getEventTypeIcon(event.eventType),
                    children: (
                      <div className={`p-4 rounded-lg ${
                        currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <Title level={4} className="mb-1">
                            {event.title}
                          </Title>
                          <Space>
                            <Tag color={getEventTypeColor(event.eventType)}>
                              {eventTypes.find(t => t.value === event.eventType)?.label}
                            </Tag>
                            <Text type="secondary">
                              {dayjs(event.eventDate).format('MMM D, YYYY')}
                            </Text>
                          </Space>
                        </div>
                        <Text className="block mb-3">{event.description}</Text>
                        {event.images && event.images.length > 0 && (
                          <div className="flex space-x-2 mb-3">
                            {event.images.slice(0, 3).map((image, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={image}
                                alt={`Event ${index + 1}`}
                                className="w-16 h-16 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <Text type="secondary" className="text-xs">
                            Added: {dayjs(event.createdAt).format('MMM D, YYYY')}
                          </Text>
                          <Space>
                            <Button
                              type="text"
                              icon={<EditOutlined />}
                              size="small"
                              onClick={() => handleEditEvent(event)}
                            >
                              Edit
                            </Button>
                            <Popconfirm
                              title="Delete Event"
                              description="Are you sure you want to delete this event?"
                              onConfirm={() => handleDeleteEvent(event._id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                size="small"
                              >
                                Delete
                              </Button>
                            </Popconfirm>
                          </Space>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Event Statistics" className="mb-6">
                <List
                  dataSource={eventTypes}
                  renderItem={type => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Tag color={type.color}>
                            {getEventTypeIcon(type.value)}
                          </Tag>
                        }
                        title={type.label}
                        description={
                          `${historyEvents.filter(e => e.eventType === type.value).length} events`
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>

              <Card title="Recent Milestones">
                <List
                  dataSource={historyEvents
                    .filter(event => event.eventType === 'milestone')
                    .slice(0, 5)}
                  renderItem={event => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Text strong>{event.title}</Text>
                        }
                        description={
                          <div>
                            <Text className="block text-xs text-gray-500">
                              {dayjs(event.eventDate).format('MMM D, YYYY')}
                            </Text>
                            <Text className="block text-sm mt-1">
                              {event.description.length > 100 
                                ? `${event.description.substring(0, 100)}...` 
                                : event.description
                              }
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        )}

        {/* Add/Edit Event Modal */}
        <Modal
          title={editingEvent ? 'Edit Historical Event' : 'Add Historical Event'}
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddEvent}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Event Title"
                  name="title"
                  rules={[{ required: true, message: 'Please enter event title' }]}
                >
                  <Input placeholder="Enter event title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Event Date"
                  name="eventDate"
                  rules={[{ required: true, message: 'Please select event date' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD"
                    placeholder="Select event date"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Event Type"
                  name="eventType"
                  rules={[{ required: true, message: 'Please select event type' }]}
                  initialValue="general"
                >
                  <Select placeholder="Select event type">
                    {eventTypes.map(type => (
                      <Option key={type.value} value={type.value}>
                        <Tag color={type.color}>{type.label}</Tag>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Event Description"
                  name="description"
                  rules={[{ required: true, message: 'Please enter event description' }]}
                >
                  <TextArea 
                    rows={4}
                    placeholder="Describe the historical event in detail..."
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Additional Notes"
                  name="notes"
                >
                  <TextArea 
                    rows={2}
                    placeholder="Any additional notes or context..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right">
              <Space>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default AssociationHistory;