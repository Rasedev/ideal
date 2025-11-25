import React, { useState, useEffect } from 'react';
import {
  Card,
  List,
  Input,
  Button,
  Space,
  Avatar,
  Typography,
  Tag,
  Modal,
  Form,
  Select,
  DatePicker,
  message,
  Row,
  Col,
  Badge,
  Divider,
} from 'antd';
import {
  NotificationOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [searchText, setSearchText] = useState('');
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAnnouncements();
  }, [searchText]);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/apps/announcements', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchText }
      });

      if (response.data.success) {
        setAnnouncements(response.data.announcements || []);
      }
    } catch (error) {
      message.error('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnnouncement = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/apps/announcements',
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Announcement created successfully');
        setModalVisible(false);
        form.resetFields();
        fetchAnnouncements();
      }
    } catch (error) {
      message.error('Failed to create announcement');
    }
  };

  const getPriorityTag = (priority) => {
    const priorityConfig = {
      urgent: { color: 'red', text: 'Urgent' },
      high: { color: 'orange', text: 'High' },
      medium: { color: 'blue', text: 'Medium' },
      low: { color: 'green', text: 'Low' },
    };
    const config = priorityConfig[priority] || { color: 'default', text: priority };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getRecipientTypeTag = (type) => {
    const typeConfig = {
      all: { color: 'blue', text: 'All Members' },
      members: { color: 'green', text: 'Members Only' },
      plotowners: { color: 'purple', text: 'Plot Owners' },
      employees: { color: 'orange', text: 'Employees' },
      committee: { color: 'cyan', text: 'Committee' },
      specific: { color: 'magenta', text: 'Specific Users' },
    };
    const config = typeConfig[type] || { color: 'default', text: type };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <NotificationOutlined className="mr-3" />
              Announcements
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Create and manage announcements for members
            </Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            New Announcement
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search announcements..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 400 }}
            allowClear
          />
        </div>

        {/* Announcements List */}
        <Row gutter={[16, 16]}>
          {announcements.map((announcement) => (
            <Col xs={24} lg={12} key={announcement._id}>
              <Card 
                className={`hover:shadow-lg transition-shadow cursor-pointer ${cardClass}`}
                onClick={() => setSelectedAnnouncement(announcement)}
                actions={[
                  <EyeOutlined key="view" />,
                  <EditOutlined key="edit" />,
                  <DeleteOutlined key="delete" />,
                ]}
              >
                <div className="flex justify-between items-start mb-3">
                  <Title level={4} className="mb-0">
                    {announcement.title}
                  </Title>
                  <Space>
                    {getPriorityTag(announcement.priority)}
                    {getRecipientTypeTag(announcement.recipientType)}
                  </Space>
                </div>

                <Text className="block mb-3">
                  {announcement.message.length > 150 
                    ? `${announcement.message.substring(0, 150)}...` 
                    : announcement.message
                  }
                </Text>

                <Divider className="my-3" />

                <div className="flex justify-between items-center">
                  <Space>
                    <Avatar size="small" src={announcement.sender?.image} icon={<UserOutlined />} />
                    <Text type="secondary">{announcement.sender?.firstName} {announcement.sender?.lastName}</Text>
                  </Space>
                  <Space>
                    <CalendarOutlined />
                    <Text type="secondary">
                      {dayjs(announcement.createdAt).format('MMM D, YYYY')}
                    </Text>
                  </Space>
                </div>

                {announcement.meetingDate && (
                  <div className="mt-3 p-2 bg-blue-50 rounded">
                    <Text strong>Meeting: </Text>
                    <Text>
                      {dayjs(announcement.meetingDate).format('MMM D, YYYY')} 
                      {announcement.meetingLocation && ` at ${announcement.meetingLocation}`}
                    </Text>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>

        {/* Empty State */}
        {announcements.length === 0 && !loading && (
          <div className="text-center py-12">
            <NotificationOutlined className="text-4xl text-gray-400 mb-4" />
            <Title level={4} className="text-gray-500">No Announcements</Title>
            <Text className="text-gray-400">
              {searchText ? 'No announcements match your search' : 'Create your first announcement to get started'}
            </Text>
          </div>
        )}

        {/* Create Announcement Modal */}
        <Modal
          title="Create New Announcement"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateAnnouncement}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: 'Please enter announcement title' }]}
                >
                  <Input placeholder="Enter announcement title" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Message"
                  name="message"
                  rules={[{ required: true, message: 'Please enter announcement message' }]}
                >
                  <TextArea 
                    rows={6} 
                    placeholder="Enter announcement message"
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Recipient Type"
                  name="recipientType"
                  rules={[{ required: true, message: 'Please select recipient type' }]}
                >
                  <Select placeholder="Select recipients">
                    <Option value="all">All Members</Option>
                    <Option value="members">Members Only</Option>
                    <Option value="plotowners">Plot Owners</Option>
                    <Option value="employees">Employees</Option>
                    <Option value="committee">Committee Members</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Priority"
                  name="priority"
                  initialValue="medium"
                >
                  <Select>
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                    <Option value="urgent">Urgent</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Meeting Date (Optional)"
                  name="meetingDate"
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    placeholder="Select meeting date"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Meeting Location (Optional)"
                  name="meetingLocation"
                >
                  <Input placeholder="Enter meeting location" />
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right">
              <Space>
                <Button onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Create Announcement
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>

        {/* Announcement Detail Modal */}
        <Modal
          title={selectedAnnouncement?.title}
          open={!!selectedAnnouncement}
          onCancel={() => setSelectedAnnouncement(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedAnnouncement(null)}>
              Close
            </Button>,
          ]}
          width={700}
        >
          {selectedAnnouncement && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Space>
                  {getPriorityTag(selectedAnnouncement.priority)}
                  {getRecipientTypeTag(selectedAnnouncement.recipientType)}
                </Space>
                <Text type="secondary">
                  {dayjs(selectedAnnouncement.createdAt).format('MMMM D, YYYY [at] h:mm A')}
                </Text>
              </div>

              <Divider />

              <div>
                <Text strong className="block mb-2">Message:</Text>
                <div className="p-4 bg-gray-50 rounded">
                  <Text className="whitespace-pre-wrap">{selectedAnnouncement.message}</Text>
                </div>
              </div>

              {selectedAnnouncement.meetingDate && (
                <div className="p-3 bg-blue-50 rounded">
                  <Text strong className="block mb-2">Meeting Information:</Text>
                  <div className="space-y-1">
                    <Text>
                      <CalendarOutlined className="mr-2" />
                      Date: {dayjs(selectedAnnouncement.meetingDate).format('MMMM D, YYYY')}
                    </Text>
                    <br />
                    {selectedAnnouncement.meetingLocation && (
                      <Text>
                        Location: {selectedAnnouncement.meetingLocation}
                      </Text>
                    )}
                  </div>
                </div>
              )}

              <Divider />

              <div className="flex justify-between items-center">
                <Space>
                  <Avatar src={selectedAnnouncement.sender?.image} icon={<UserOutlined />} />
                  <div>
                    <Text strong>{selectedAnnouncement.sender?.firstName} {selectedAnnouncement.sender?.lastName}</Text>
                    <br />
                    <Text type="secondary">{selectedAnnouncement.sender?.role}</Text>
                  </div>
                </Space>
              </div>
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default Announcement;