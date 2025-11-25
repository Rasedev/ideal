import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
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
  TimePicker,
  message,
  Row,
  Col,
  Statistic,
  Calendar,
  List,
  Badge,
  Divider,
} from 'antd';
import {
  ApartmentOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CommitteeMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [calendarView, setCalendarView] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [stats, setStats] = useState({});
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMeetings();
    fetchMeetingStats();
  }, [searchText, filterStatus]);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/committee/meetings', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchText, status: filterStatus }
      });

      if (response.data.success) {
        setMeetings(response.data.meetings || []);
      }
    } catch (error) {
      message.error('Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  };

  const fetchMeetingStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/committee/meetings/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setStats(response.data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch meeting stats');
    }
  };

  const handleCreateMeeting = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/committee/meetings',
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Meeting created successfully');
        setModalVisible(false);
        form.resetFields();
        fetchMeetings();
        fetchMeetingStats();
      }
    } catch (error) {
      message.error('Failed to create meeting');
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      scheduled: { color: 'blue', text: 'Scheduled' },
      ongoing: { color: 'orange', text: 'Ongoing' },
      completed: { color: 'green', text: 'Completed' },
      cancelled: { color: 'red', text: 'Cancelled' },
      postponed: { color: 'yellow', text: 'Postponed' },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPriorityTag = (priority) => {
    const priorityConfig = {
      high: { color: 'red', text: 'High' },
      medium: { color: 'orange', text: 'Medium' },
      low: { color: 'green', text: 'Low' },
    };
    const config = priorityConfig[priority] || { color: 'default', text: priority };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Meeting Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-gray-500">
            {getPriorityTag(record.priority)}
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'meetingDate',
      key: 'meetingDate',
      render: (date, record) => (
        <div>
          <div className="flex items-center">
            <CalendarOutlined className="mr-1 text-gray-400" />
            {dayjs(date).format('MMM D, YYYY')}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <ClockCircleOutlined className="mr-1" />
            {record.startTime} - {record.endTime}
          </div>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location) => (
        <div className="flex items-center">
          <EnvironmentOutlined className="mr-1 text-gray-400" />
          {location}
        </div>
      ),
    },
    {
      title: 'Attendees',
      dataIndex: 'attendees',
      key: 'attendees',
      render: (attendees) => (
        <div>
          <TeamOutlined className="mr-1 text-gray-400" />
          {attendees?.length || 0} members
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => setSelectedMeeting(record)}
          >
            View
          </Button>
          {record.status === 'scheduled' && (
            <Button type="link">
              Edit
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const meetingTypeOptions = [
    'Regular Meeting',
    'Emergency Meeting',
    'Annual General Meeting',
    'Special Meeting',
    'Budget Meeting',
    'Planning Meeting'
  ];

  // Calendar cell renderer
  const dateCellRender = (value) => {
    const dateMeetings = meetings.filter(meeting => 
      dayjs(meeting.meetingDate).isSame(value, 'day')
    );
    
    return (
      <div className="h-20 overflow-y-auto">
        {dateMeetings.map(meeting => (
          <div
            key={meeting._id}
            className={`text-xs p-1 mb-1 rounded cursor-pointer ${
              meeting.status === 'completed' ? 'bg-green-100' :
              meeting.status === 'cancelled' ? 'bg-red-100' :
              meeting.status === 'ongoing' ? 'bg-orange-100' : 'bg-blue-100'
            }`}
            onClick={() => setSelectedMeeting(meeting)}
          >
            <div className="font-medium truncate">{meeting.title}</div>
            <div className="text-gray-500">{meeting.startTime}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <ApartmentOutlined className="mr-3" />
              Committee Meetings
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Schedule and manage committee meetings
            </Text>
          </div>
          <Space>
            <Button 
              onClick={() => setCalendarView(!calendarView)}
            >
              {calendarView ? 'List View' : 'Calendar View'}
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Schedule Meeting
            </Button>
          </Space>
        </div>

        {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Meetings"
                value={stats.totalMeetings || 0}
                prefix={<ApartmentOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Upcoming"
                value={stats.upcoming || 0}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="This Month"
                value={stats.thisMonth || 0}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Attendance Rate"
                value={stats.attendanceRate || 0}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        {!calendarView && (
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Input
                placeholder="Search meetings..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by Status"
                style={{ width: '100%' }}
                allowClear
                value={filterStatus}
                onChange={setFilterStatus}
              >
                <Option value="scheduled">Scheduled</Option>
                <Option value="ongoing">Ongoing</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Col>
          </Row>
        )}

        {/* Content */}
        {calendarView ? (
          <Card className={cardClass}>
            <Calendar 
              cellRender={dateCellRender}
              className="committee-calendar"
            />
          </Card>
        ) : (
          <Table
            columns={columns}
            dataSource={meetings}
            loading={loading}
            rowKey="_id"
            scroll={{ x: 800 }}
            pagination={{ pageSize: 10 }}
          />
        )}

        {/* Schedule Meeting Modal */}
        <Modal
          title="Schedule Committee Meeting"
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
            onFinish={handleCreateMeeting}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Meeting Title"
                  name="title"
                  rules={[{ required: true, message: 'Please enter meeting title' }]}
                >
                  <Input placeholder="Enter meeting title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Meeting Date"
                  name="meetingDate"
                  rules={[{ required: true, message: 'Please select meeting date' }]}
                >
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Start Time"
                  name="startTime"
                  rules={[{ required: true, message: 'Please select start time' }]}
                >
                  <TimePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="End Time"
                  name="endTime"
                  rules={[{ required: true, message: 'Please select end time' }]}
                >
                  <TimePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Meeting Type"
                  name="meetingType"
                  rules={[{ required: true, message: 'Please select meeting type' }]}
                >
                  <Select placeholder="Select meeting type">
                    {meetingTypeOptions.map(type => (
                      <Option key={type} value={type}>{type}</Option>
                    ))}
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
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[{ required: true, message: 'Please enter meeting location' }]}
                >
                  <Input placeholder="Enter meeting location" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Agenda"
                  name="agenda"
                  rules={[{ required: true, message: 'Please enter meeting agenda' }]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Enter meeting agenda items..."
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                >
                  <TextArea 
                    rows={3} 
                    placeholder="Enter meeting description (optional)"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right">
              <Space>
                <Button onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Schedule Meeting
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>

        {/* Meeting Detail Modal */}
        <Modal
          title="Meeting Details"
          open={!!selectedMeeting}
          onCancel={() => setSelectedMeeting(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedMeeting(null)}>
              Close
            </Button>,
            <Button key="edit" type="primary">
              Edit Meeting
            </Button>,
          ]}
          width={700}
        >
          {selectedMeeting && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Title level={3}>{selectedMeeting.title}</Title>
                <Space>
                  {getStatusTag(selectedMeeting.status)}
                  {getPriorityTag(selectedMeeting.priority)}
                </Space>
              </div>

              <Divider />

              <Descriptions bordered column={2}>
                <Descriptions.Item label="Date">
                  {dayjs(selectedMeeting.meetingDate).format('MMMM D, YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Time">
                  {selectedMeeting.startTime} - {selectedMeeting.endTime}
                </Descriptions.Item>
                <Descriptions.Item label="Location">
                  {selectedMeeting.location}
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                  {selectedMeeting.meetingType}
                </Descriptions.Item>
                <Descriptions.Item label="Organizer">
                  {selectedMeeting.organizer?.firstName} {selectedMeeting.organizer?.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Attendees">
                  {selectedMeeting.attendees?.length || 0} members
                </Descriptions.Item>
                <Descriptions.Item label="Agenda" span={2}>
                  <div className="whitespace-pre-wrap">{selectedMeeting.agenda}</div>
                </Descriptions.Item>
                {selectedMeeting.description && (
                  <Descriptions.Item label="Description" span={2}>
                    {selectedMeeting.description}
                  </Descriptions.Item>
                )}
              </Descriptions>

              {/* Attendees List */}
              {selectedMeeting.attendees && selectedMeeting.attendees.length > 0 && (
                <>
                  <Divider />
                  <Title level={5}>Attendees</Title>
                  <List
                    dataSource={selectedMeeting.attendees}
                    renderItem={(attendee) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={attendee.image} icon={<UserOutlined />} />}
                          title={`${attendee.firstName} ${attendee.lastName}`}
                          description={attendee.position}
                        />
                        {selectedMeeting.attendance && selectedMeeting.attendance[attendee._id] ? (
                          <Tag icon={<CheckCircleOutlined />} color="green">Present</Tag>
                        ) : (
                          <Tag icon={<CloseCircleOutlined />} color="red">Absent</Tag>
                        )}
                      </List.Item>
                    )}
                  />
                </>
              )}
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default CommitteeMeetings;