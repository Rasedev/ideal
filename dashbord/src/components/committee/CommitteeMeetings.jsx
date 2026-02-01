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






// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Card,
//   Table,
//   Input,
//   Button,
//   Space,
//   Avatar,
//   Typography,
//   Tag,
//   Modal,
//   Form,
//   Select,
//   DatePicker,
//   TimePicker,
//   message,
//   Row,
//   Col,
//   Statistic,
//   Calendar,
//   List,
//   Badge,
//   Divider,
//   Steps,
//   Tooltip,
//   Dropdown,
//   Menu,
//   Popconfirm,
//   Upload,
//   Timeline
// } from 'antd';
// import {
//   ApartmentOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   UserOutlined,
//   CalendarOutlined,
//   ClockCircleOutlined,
//   EnvironmentOutlined,
//   TeamOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   MoreOutlined,
//   FileTextOutlined,
//   DownloadOutlined,
//   CopyOutlined,
//   MailOutlined,
//   BellOutlined,
//   VideoCameraOutlined,
//   ExportOutlined,
//   ImportOutlined,
//   SyncOutlined
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import { CSVLink } from 'react-csv';
// import MeetingMinutesEditor from './MeetingMinutesEditor';
// import AttendeeManager from './AttendeeManager';
// import AgendaBuilder from './AgendaBuilder';
// import RecurrenceSettings from './RecurrenceSettings';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;

// const CommitteeMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);
//   const [calendarView, setCalendarView] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [filterCommittee, setFilterCommittee] = useState('');
//   const [stats, setStats] = useState({});
//   const [committees, setCommittees] = useState([]);
//   const [exportData, setExportData] = useState([]);
//   const [showMinutesEditor, setShowMinutesEditor] = useState(false);
//   const [showAttendeeManager, setShowAttendeeManager] = useState(false);
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const [form] = Form.useForm();

//   const meetingTypeOptions = [
//     { value: 'regular', label: 'Regular Meeting', icon: '📅' },
//     { value: 'emergency', label: 'Emergency Meeting', icon: '🚨' },
//     { value: 'annual', label: 'Annual General Meeting', icon: '🏛️' },
//     { value: 'special', label: 'Special Meeting', icon: '⭐' },
//     { value: 'budget', label: 'Budget Meeting', icon: '💰' },
//     { value: 'planning', label: 'Planning Meeting', icon: '📈' }
//   ];

//   useEffect(() => {
//     fetchMeetings();
//     fetchMeetingStats();
//     fetchCommittees();
//   }, [searchText, filterStatus, filterCommittee]);

//   const fetchMeetings = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/committee/meetings/enhanced', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           search: searchText,
//           status: filterStatus,
//           committee: filterCommittee,
//           includeStats: true
//         }
//       });

//       if (response.data.success) {
//         setMeetings(response.data.meetings || []);
        
//         // Prepare export data
//         const exportMeetings = response.data.meetings.map(meeting => ({
//           Title: meeting.title,
//           Date: dayjs(meeting.meetingDate).format('YYYY-MM-DD'),
//           Time: `${meeting.startTime} - ${meeting.endTime}`,
//           Location: meeting.location,
//           Type: meeting.meetingType,
//           Status: meeting.status,
//           Priority: meeting.priority,
//           Attendees: meeting.attendees?.length || 0,
//           Committee: meeting.committee?.name || '',
//           Organizer: `${meeting.organizer?.firstName} ${meeting.organizer?.lastName}`
//         }));
//         setExportData(exportMeetings);
//       }
//     } catch (error) {
//       message.error('Failed to fetch meetings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMeetingStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/committee/meetings/stats/detailed', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch meeting stats');
//     }
//   };

//   const fetchCommittees = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/committees', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setCommittees(response.data.committees || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch committees');
//     }
//   };

//   const handleCreateMeeting = async (values) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/committee/meetings/enhanced',
//         values,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success('Meeting created successfully');
//         setModalVisible(false);
//         form.resetFields();
//         fetchMeetings();
//         fetchMeetingStats();
        
//         // Send notifications if requested
//         if (values.sendNotifications) {
//           sendMeetingNotifications(response.data.meeting._id);
//         }
//       }
//     } catch (error) {
//       message.error(error.response?.data?.message || 'Failed to create meeting');
//     }
//   };

//   const sendMeetingNotifications = async (meetingId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         `http://localhost:3000/api/v1/committee/meetings/${meetingId}/notify`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       message.success('Notifications sent successfully');
//     } catch (error) {
//       console.error('Failed to send notifications');
//     }
//   };

//   const duplicateMeeting = async (meetingId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         `http://localhost:3000/api/v1/committee/meetings/${meetingId}/duplicate`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success('Meeting duplicated successfully');
//         fetchMeetings();
//       }
//     } catch (error) {
//       message.error('Failed to duplicate meeting');
//     }
//   };

//   const exportToPDF = (meeting) => {
//     // Implement PDF export logic
//     message.info('PDF export feature coming soon');
//   };

//   const getStatusConfig = (status) => {
//     const config = {
//       scheduled: { color: 'blue', icon: '⏰', text: 'Scheduled' },
//       ongoing: { color: 'orange', icon: '🔴', text: 'Ongoing' },
//       completed: { color: 'green', icon: '✅', text: 'Completed' },
//       cancelled: { color: 'red', icon: '❌', text: 'Cancelled' },
//       postponed: { color: 'yellow', icon: '📅', text: 'Postponed' },
//       draft: { color: 'gray', icon: '📝', text: 'Draft' }
//     };
//     return config[status] || { color: 'default', icon: '❓', text: status };
//   };

//   const getPriorityConfig = (priority) => {
//     const config = {
//       low: { color: 'green', icon: '⬇️', text: 'Low' },
//       medium: { color: 'orange', icon: '⏸️', text: 'Medium' },
//       high: { color: 'red', icon: '⬆️', text: 'High' },
//       urgent: { color: 'red', icon: '🚨', text: 'Urgent' }
//     };
//     return config[priority] || { color: 'default', icon: '❓', text: priority };
//   };

//   const columns = [
//     {
//       title: 'Meeting Details',
//       dataIndex: 'title',
//       key: 'title',
//       width: 300,
//       render: (title, record) => (
//         <div className="meeting-title-cell">
//           <div className="flex items-start">
//             <div className="mr-3">
//               <Badge
//                 count={record.agenda?.length || 0}
//                 style={{ backgroundColor: '#1890ff' }}
//                 size="small"
//               >
//                 <div className="w-8 h-8 flex items-center justify-center rounded bg-blue-100">
//                   <CalendarOutlined className="text-blue-600" />
//                 </div>
//               </Badge>
//             </div>
//             <div className="flex-1">
//               <div className="font-semibold text-gray-800 dark:text-white hover:text-blue-600 cursor-pointer"
//                 onClick={() => setSelectedMeeting(record)}>
//                 {title}
//               </div>
//               <div className="flex items-center text-xs text-gray-500 mt-1">
//                 <ApartmentOutlined className="mr-1" />
//                 {record.committee?.name}
//               </div>
//               <div className="flex items-center text-xs text-gray-500 mt-1">
//                 {getPriorityConfig(record.priority).icon}
//                 <span className="ml-1">{getPriorityConfig(record.priority).text}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Date & Time',
//       dataIndex: 'meetingDate',
//       key: 'dateTime',
//       width: 180,
//       render: (date, record) => (
//         <div>
//           <div className="flex items-center font-medium">
//             <CalendarOutlined className="mr-2 text-gray-400" />
//             {dayjs(date).format('MMM D, YYYY')}
//           </div>
//           <div className="flex items-center text-sm text-gray-500 mt-1">
//             <ClockCircleOutlined className="mr-2" />
//             {record.startTime} - {record.endTime}
//           </div>
//           {record.virtualLink && (
//             <div className="flex items-center text-xs text-blue-500 mt-1">
//               <VideoCameraOutlined className="mr-1" />
//               Virtual
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Location',
//       dataIndex: 'location',
//       key: 'location',
//       width: 150,
//       render: (location, record) => (
//         <Tooltip title={location}>
//           <div className="flex items-center truncate">
//             <EnvironmentOutlined className="mr-2 text-gray-400" />
//             <span className="truncate">{location}</span>
//           </div>
//         </Tooltip>
//       ),
//     },
//     {
//       title: 'Attendees',
//       dataIndex: 'attendees',
//       key: 'attendees',
//       width: 120,
//       render: (attendees, record) => (
//         <div className="attendee-cell">
//           <div className="flex items-center">
//             <TeamOutlined className="mr-2 text-gray-400" />
//             <span>{attendees?.length || 0}</span>
//           </div>
//           {record.attendanceRate && (
//             <Progress
//               percent={record.attendanceRate}
//               size="small"
//               showInfo={false}
//               strokeColor="#52c41a"
//             />
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       width: 130,
//       render: (status) => {
//         const config = getStatusConfig(status);
//         return (
//           <Tag
//             color={config.color}
//             icon={<span>{config.icon}</span>}
//             className="flex items-center"
//           >
//             {config.text}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 100,
//       fixed: 'right',
//       render: (_, record) => (
//         <Dropdown
//           overlay={
//             <Menu>
//               <Menu.Item
//                 key="view"
//                 icon={<EyeOutlined />}
//                 onClick={() => setSelectedMeeting(record)}
//               >
//                 View Details
//               </Menu.Item>
//               <Menu.Item
//                 key="edit"
//                 icon={<EditOutlined />}
//                 disabled={!['draft', 'scheduled'].includes(record.status)}
//               >
//                 Edit Meeting
//               </Menu.Item>
//               <Menu.Item
//                 key="duplicate"
//                 icon={<CopyOutlined />}
//                 onClick={() => duplicateMeeting(record._id)}
//               >
//                 Duplicate
//               </Menu.Item>
//               <Menu.Item
//                 key="notify"
//                 icon={<MailOutlined />}
//                 onClick={() => sendMeetingNotifications(record._id)}
//               >
//                 Send Reminders
//               </Menu.Item>
//               <Menu.Item
//                 key="minutes"
//                 icon={<FileTextOutlined />}
//                 onClick={() => {
//                   setSelectedMeeting(record);
//                   setShowMinutesEditor(true);
//                 }}
//               >
//                 {record.minutes ? 'Edit Minutes' : 'Add Minutes'}
//               </Menu.Item>
//               <Menu.Item
//                 key="export"
//                 icon={<DownloadOutlined />}
//                 onClick={() => exportToPDF(record)}
//               >
//                 Export PDF
//               </Menu.Item>
//               <Menu.Divider />
//               <Menu.Item
//                 key="delete"
//                 icon={<DeleteOutlined />}
//                 danger
//                 disabled={record.status === 'completed'}
//               >
//                 <Popconfirm
//                   title="Are you sure to delete this meeting?"
//                   onConfirm={() => deleteMeeting(record._id)}
//                 >
//                   Delete
//                 </Popconfirm>
//               </Menu.Item>
//             </Menu>
//           }
//           trigger={['click']}
//         >
//           <Button type="text" icon={<MoreOutlined />} />
//         </Dropdown>
//       ),
//     },
//   ];

//   // Calendar cell renderer with enhanced features
//   const dateCellRender = (value) => {
//     const dateMeetings = meetings.filter(meeting => 
//       dayjs(meeting.meetingDate).isSame(value, 'day')
//     );
    
//     return (
//       <div className="calendar-cell">
//         {dateMeetings.map(meeting => {
//           const statusConfig = getStatusConfig(meeting.status);
//           return (
//             <div
//               key={meeting._id}
//               className={`calendar-meeting-item ${meeting.status}`}
//               style={{ borderLeftColor: `var(--ant-${statusConfig.color}-6)` }}
//               onClick={() => setSelectedMeeting(meeting)}
//             >
//               <div className="flex justify-between items-start">
//                 <div className="meeting-title truncate">{meeting.title}</div>
//                 <Badge
//                   status={meeting.priority === 'urgent' ? 'error' : 'default'}
//                   size="small"
//                 />
//               </div>
//               <div className="text-xs text-gray-500">
//                 {meeting.startTime} • {meeting.committee?.name}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="enhanced-committee-meetings">
//       {/* Dashboard Header */}
//       <Card className="mb-6">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//           <div>
//             <Title level={2} className="!mb-2">
//               <ApartmentOutlined className="mr-3" />
//               Committee Meetings Management
//             </Title>
//             <Text type="secondary">
//               Schedule, manage, and track committee meetings with detailed analytics
//             </Text>
//           </div>
          
//           <Space wrap>
//             <Button
//               onClick={() => setCalendarView(!calendarView)}
//               icon={calendarView ? <TableOutlined /> : <CalendarOutlined />}
//             >
//               {calendarView ? 'List View' : 'Calendar View'}
//             </Button>
            
//             <Dropdown
//               overlay={
//                 <Menu>
//                   <Menu.Item icon={<ImportOutlined />}>
//                     Import Meetings
//                   </Menu.Item>
//                   <Menu.Item icon={<ExportOutlined />}>
//                     <CSVLink data={exportData} filename="meetings-export.csv">
//                       Export to CSV
//                     </CSVLink>
//                   </Menu.Item>
//                   <Menu.Item icon={<FileTextOutlined />}>
//                     Generate Report
//                   </Menu.Item>
//                 </Menu>
//               }
//             >
//               <Button icon={<DownloadOutlined />}>
//                 Export
//               </Button>
//             </Dropdown>
            
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => setModalVisible(true)}
//             >
//               Schedule Meeting
//             </Button>
//           </Space>
//         </div>
//       </Card>

//       {/* Statistics Cards */}
//       <Row gutter={[16, 16]} className="mb-6">
//         <Col xs={24} sm={12} md={6}>
//           <Card className="stat-card">
//             <Statistic
//               title="Total Meetings"
//               value={stats.totalMeetings || 0}
//               prefix={<CalendarOutlined />}
//               valueStyle={{ color: '#1890ff' }}
//             />
//             <div className="text-xs text-gray-500 mt-2">
//               <span className="text-green-500">↑ {stats.monthlyGrowth || 0}%</span> this month
//             </div>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className="stat-card">
//             <Statistic
//               title="Upcoming"
//               value={stats.upcoming || 0}
//               prefix={<ClockCircleOutlined />}
//               valueStyle={{ color: '#faad14' }}
//             />
//             <div className="text-xs text-gray-500 mt-2">
//               Next: {stats.nextMeetingDate ? dayjs(stats.nextMeetingDate).format('MMM D') : 'None'}
//             </div>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className="stat-card">
//             <Statistic
//               title="Avg. Attendance"
//               value={stats.avgAttendance || 0}
//               suffix="%"
//               prefix={<TeamOutlined />}
//               valueStyle={{ color: '#52c41a' }}
//             />
//             <Progress
//               percent={stats.avgAttendance || 0}
//               size="small"
//               showInfo={false}
//               strokeColor="#52c41a"
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card className="stat-card">
//             <Statistic
//               title="Meeting Hours"
//               value={stats.totalHours || 0}
//               suffix="hrs"
//               prefix={<ClockCircleOutlined />}
//               valueStyle={{ color: '#722ed1' }}
//             />
//             <div className="text-xs text-gray-500 mt-2">
//               Avg: {stats.avgDuration || 0} hrs/meeting
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Filters Section */}
//       <Card className="mb-6">
//         <Row gutter={[16, 16]} align="middle">
//           <Col xs={24} sm={8} md={6}>
//             <Input
//               placeholder="Search meetings..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//               size="large"
//             />
//           </Col>
//           <Col xs={24} sm={8} md={6}>
//             <Select
//               placeholder="Filter by Status"
//               style={{ width: '100%' }}
//               size="large"
//               allowClear
//               value={filterStatus}
//               onChange={setFilterStatus}
//             >
//               {Object.entries(getStatusConfig()).map(([key, config]) => (
//                 <Option key={key} value={key}>
//                   <Tag color={config.color}>{config.text}</Tag>
//                 </Option>
//               ))}
//             </Select>
//           </Col>
//           <Col xs={24} sm={8} md={6}>
//             <Select
//               placeholder="Filter by Committee"
//               style={{ width: '100%' }}
//               size="large"
//               allowClear
//               value={filterCommittee}
//               onChange={setFilterCommittee}
//             >
//               {committees.map(committee => (
//                 <Option key={committee._id} value={committee._id}>
//                   {committee.name}
//                 </Option>
//               ))}
//             </Select>
//           </Col>
//           <Col xs={24} md={6}>
//             <Space>
//               <Button
//                 icon={<SyncOutlined />}
//                 onClick={fetchMeetings}
//                 loading={loading}
//               >
//                 Refresh
//               </Button>
//               <Button
//                 type="link"
//                 onClick={() => {
//                   setSearchText('');
//                   setFilterStatus('');
//                   setFilterCommittee('');
//                 }}
//               >
//                 Clear Filters
//               </Button>
//             </Space>
//           </Col>
//         </Row>
//       </Card>

//       {/* Main Content */}
//       {calendarView ? (
//         <Card>
//           <Calendar
//             cellRender={dateCellRender}
//             className="enhanced-calendar"
//             headerRender={({ value, type, onChange, onTypeChange }) => (
//               <div className="calendar-header">
//                 <Select
//                   value={type}
//                   onChange={onTypeChange}
//                   className="calendar-type-select"
//                 >
//                   <Option value="month">Month</Option>
//                   <Option value="year">Year</Option>
//                 </Select>
//                 <div className="calendar-nav">
//                   <Button onClick={() => onChange(value.clone().subtract(1, type))}>
//                     Previous
//                   </Button>
//                   <Title level={4} className="calendar-title">
//                     {value.format(type === 'month' ? 'MMMM YYYY' : 'YYYY')}
//                   </Title>
//                   <Button onClick={() => onChange(value.clone().add(1, type))}>
//                     Next
//                   </Button>
//                 </div>
//                 <Button
//                   type="primary"
//                   icon={<PlusOutlined />}
//                   onClick={() => setModalVisible(true)}
//                 >
//                   Add Meeting
//                 </Button>
//               </div>
//             )}
//           />
//         </Card>
//       ) : (
//         <Card>
//           <Table
//             columns={columns}
//             dataSource={meetings}
//             loading={loading}
//             rowKey="_id"
//             scroll={{ x: 1200 }}
//             pagination={{
//               pageSize: 10,
//               showSizeChanger: true,
//               showQuickJumper: true,
//               showTotal: (total, range) => 
//                 `${range[0]}-${range[1]} of ${total} meetings`
//             }}
//             expandable={{
//               expandedRowRender: (record) => (
//                 <div className="p-4 bg-gray-50 rounded">
//                   <Title level={5}>Meeting Details</Title>
//                   <Descriptions size="small" column={2}>
//                     <Descriptions.Item label="Description">
//                       {record.description || 'No description'}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Type">
//                       {record.meetingType}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Organizer">
//                       {record.organizer?.firstName} {record.organizer?.lastName}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Created">
//                       {dayjs(record.createdAt).format('MMM D, YYYY HH:mm')}
//                     </Descriptions.Item>
//                   </Descriptions>
                  
//                   {record.agenda && record.agenda.length > 0 && (
//                     <>
//                       <Divider />
//                       <Title level={5}>Agenda Items</Title>
//                       <List
//                         size="small"
//                         dataSource={record.agenda}
//                         renderItem={(item, index) => (
//                           <List.Item>
//                             <List.Item.Meta
//                               title={`${index + 1}. ${item.title}`}
//                               description={item.description}
//                             />
//                             <Tag color="blue">{item.duration} min</Tag>
//                           </List.Item>
//                         )}
//                       />
//                     </>
//                   )}
//                 </div>
//               ),
//               rowExpandable: (record) => record.description || record.agenda?.length > 0
//             }}
//           />
//         </Card>
//       )}

//       {/* Enhanced Meeting Creation Modal */}
//       <Modal
//         title="Schedule New Committee Meeting"
//         open={modalVisible}
//         onCancel={() => {
//           setModalVisible(false);
//           form.resetFields();
//         }}
//         footer={null}
//         width={900}
//         className="meeting-creation-modal"
//       >
//         <Steps
//           current={0}
//           items={[
//             { title: 'Basic Details', icon: <CalendarOutlined /> },
//             { title: 'Agenda', icon: <FileTextOutlined /> },
//             { title: 'Attendees', icon: <TeamOutlined /> },
//             { title: 'Notifications', icon: <BellOutlined /> }
//           ]}
//           className="mb-6"
//         />
        
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleCreateMeeting}
//           initialValues={{
//             priority: 'medium',
//             meetingType: 'regular',
//             sendNotifications: true
//           }}
//         >
//           <Tabs defaultActiveKey="basic">
//             <Tabs.TabPane tab="Basic Details" key="basic">
//               <Row gutter={24}>
//                 <Col span={24}>
//                   <Form.Item
//                     label="Meeting Title"
//                     name="title"
//                     rules={[{ required: true, message: 'Please enter meeting title' }]}
//                   >
//                     <Input placeholder="Enter meeting title" size="large" />
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={12}>
//                   <Form.Item
//                     label="Committee"
//                     name="committee"
//                     rules={[{ required: true, message: 'Please select committee' }]}
//                   >
//                     <Select placeholder="Select committee" size="large">
//                       {committees.map(committee => (
//                         <Option key={committee._id} value={committee._id}>
//                           {committee.name}
//                         </Option>
//                       ))}
//                     </Select>
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={12}>
//                   <Form.Item
//                     label="Meeting Type"
//                     name="meetingType"
//                   >
//                     <Select size="large">
//                       {meetingTypeOptions.map(type => (
//                         <Option key={type.value} value={type.value}>
//                           <span className="mr-2">{type.icon}</span>
//                           {type.label}
//                         </Option>
//                       ))}
//                     </Select>
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={8}>
//                   <Form.Item
//                     label="Date"
//                     name="meetingDate"
//                     rules={[{ required: true, message: 'Please select meeting date' }]}
//                   >
//                     <DatePicker 
//                       style={{ width: '100%' }}
//                       size="large"
//                       disabledDate={(current) => current && current < dayjs().startOf('day')}
//                     />
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={8}>
//                   <Form.Item
//                     label="Start Time"
//                     name="startTime"
//                     rules={[{ required: true, message: 'Please select start time' }]}
//                   >
//                     <TimePicker 
//                       style={{ width: '100%' }}
//                       format="HH:mm"
//                       minuteStep={15}
//                       size="large"
//                     />
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={8}>
//                   <Form.Item
//                     label="End Time"
//                     name="endTime"
//                     rules={[{ required: true, message: 'Please select end time' }]}
//                   >
//                     <TimePicker 
//                       style={{ width: '100%' }}
//                       format="HH:mm"
//                       minuteStep={15}
//                       size="large"
//                     />
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={12}>
//                   <Form.Item
//                     label="Location"
//                     name="location"
//                     rules={[{ required: true, message: 'Please enter meeting location' }]}
//                   >
//                     <Input placeholder="Enter meeting location" size="large" />
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={12}>
//                   <Form.Item
//                     label="Virtual Meeting Link (Optional)"
//                     name="virtualLink"
//                   >
//                     <Input placeholder="https://zoom.us/j/..." size="large" />
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={24}>
//                   <Form.Item
//                     label="Description"
//                     name="description"
//                   >
//                     <TextArea 
//                       rows={3} 
//                       placeholder="Describe the purpose and objectives of this meeting..."
//                       showCount
//                       maxLength={500}
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Tabs.TabPane>
            
//             <Tabs.TabPane tab="Recurrence & Settings" key="settings">
//               <RecurrenceSettings form={form} />
              
//               <Row gutter={24}>
//                 <Col span={12}>
//                   <Form.Item
//                     label="Priority"
//                     name="priority"
//                   >
//                     <Select size="large">
//                       <Option value="low">Low Priority</Option>
//                       <Option value="medium">Medium Priority</Option>
//                       <Option value="high">High Priority</Option>
//                       <Option value="urgent">Urgent</Option>
//                     </Select>
//                   </Form.Item>
//                 </Col>
                
//                 <Col span={12}>
//                   <Form.Item
//                     label="Estimated Duration"
//                     name="estimatedDuration"
//                   >
//                     <Input 
//                       type="number" 
//                       addonAfter="minutes" 
//                       size="large"
//                       placeholder="e.g., 120"
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Tabs.TabPane>
            
//             <Tabs.TabPane tab="Attachments" key="attachments">
//               <Form.Item
//                 label="Meeting Documents"
//                 name="attachments"
//               >
//                 <Upload.Dragger
//                   name="files"
//                   multiple
//                   action="/api/upload"
//                   beforeUpload={(file) => {
//                     const isPDF = file.type === 'application/pdf';
//                     const isOffice = [
//                       'application/msword',
//                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//                       'application/vnd.ms-excel',
//                       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//                       'application/vnd.ms-powerpoint',
//                       'application/vnd.openxmlformats-officedocument.presentationml.presentation'
//                     ].includes(file.type);
                    
//                     if (!isPDF && !isOffice) {
//                       message.error('You can only upload PDF or Office files!');
//                       return false;
//                     }
                    
//                     const isLt10M = file.size / 1024 / 1024 < 10;
//                     if (!isLt10M) {
//                       message.error('File must be smaller than 10MB!');
//                       return false;
//                     }
//                     return true;
//                   }}
//                 >
//                   <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                   </p>
//                   <p className="ant-upload-text">
//                     Click or drag files to upload
//                   </p>
//                   <p className="ant-upload-hint">
//                     Upload agendas, presentations, or related documents
//                   </p>
//                 </Upload.Dragger>
//               </Form.Item>
//             </Tabs.TabPane>
//           </Tabs>
          
//           <Divider />
          
//           <Form.Item
//             name="sendNotifications"
//             valuePropName="checked"
//           >
//             <Checkbox>
//               Send email notifications to attendees
//             </Checkbox>
//           </Form.Item>
          
//           <div className="text-right">
//             <Space>
//               <Button onClick={() => setModalVisible(false)} size="large">
//                 Cancel
//               </Button>
//               <Button type="primary" htmlType="submit" size="large">
//                 Schedule Meeting
//               </Button>
//             </Space>
//           </div>
//         </Form>
//       </Modal>

//       {/* Meeting Details Modal */}
//       <Modal
//         title="Meeting Details"
//         open={!!selectedMeeting}
//         onCancel={() => setSelectedMeeting(null)}
//         width={1000}
//         footer={[
//           <Button key="close" onClick={() => setSelectedMeeting(null)}>
//             Close
//           </Button>,
//           <Button
//             key="minutes"
//             type="primary"
//             onClick={() => setShowMinutesEditor(true)}
//           >
//             {selectedMeeting?.minutes ? 'Edit Minutes' : 'Record Minutes'}
//           </Button>,
//           <Button
//             key="attendees"
//             onClick={() => setShowAttendeeManager(true)}
//           >
//             Manage Attendees
//           </Button>,
//         ]}
//       >
//         {selectedMeeting && (
//           <MeetingDetailView meeting={selectedMeeting} />
//         )}
//       </Modal>

//       {/* Meeting Minutes Editor */}
//       <MeetingMinutesEditor
//         visible={showMinutesEditor}
//         meeting={selectedMeeting}
//         onClose={() => setShowMinutesEditor(false)}
//         onSave={() => {
//           setShowMinutesEditor(false);
//           fetchMeetings();
//         }}
//       />

//       {/* Attendee Manager */}
//       <AttendeeManager
//         visible={showAttendeeManager}
//         meeting={selectedMeeting}
//         onClose={() => setShowAttendeeManager(false)}
//         onSave={() => {
//           setShowAttendeeManager(false);
//           fetchMeetings();
//         }}
//       />
//     </div>
//   );
// };

// export default CommitteeMeetings;



