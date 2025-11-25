// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   List,
//   Input,
//   Button,
//   Space,
//   Avatar,
//   Typography,
//   Tag,
//   Modal,
//   Form,
//   Select,
//   message,
//   Row,
//   Col,
//   Divider,
//   Statistic,
// } from 'antd';
// import {
//   MessageOutlined,
//   SearchOutlined,
//   UserOutlined,
//   PlusOutlined,
//   SendOutlined,
//   HistoryOutlined,
//   BarChartOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const { Title, Text } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// const SMS = () => {
//   const [messages, setMessages] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [composeVisible, setComposeVisible] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [stats, setStats] = useState({});
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchMessages();
//     fetchContacts();
//     fetchSMSStats();
//   }, []);

//   const fetchMessages = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/apps/sms', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setMessages(response.data.messages || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch messages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchContacts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/apps/contacts', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setContacts(response.data.contacts || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch contacts');
//     }
//   };

//   const fetchSMSStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/apps/sms/stats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch SMS stats');
//     }
//   };

//   const handleSendSMS = async (values) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/apps/sms/send',
//         values,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success('SMS sent successfully');
//         setComposeVisible(false);
//         form.resetFields();
//         fetchMessages();
//         fetchSMSStats();
//       }
//     } catch (error) {
//       message.error('Failed to send SMS');
//     }
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       sent: { color: 'blue', text: 'Sent' },
//       delivered: { color: 'green', text: 'Delivered' },
//       failed: { color: 'red', text: 'Failed' },
//       pending: { color: 'orange', text: 'Pending' },
//     };
//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <MessageOutlined className="mr-3" />
//               SMS
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Short Message Service for member communication
//             </Text>
//           </div>
//           <Button 
//             type="primary" 
//             icon={<PlusOutlined />}
//             onClick={() => setComposeVisible(true)}
//           >
//             New SMS
//           </Button>
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Sent"
//                 value={stats.totalSent || 0}
//                 prefix={<SendOutlined />}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Delivered"
//                 value={stats.delivered || 0}
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Failed"
//                 value={stats.failed || 0}
//                 valueStyle={{ color: '#ff4d4f' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="This Month"
//                 value={stats.thisMonth || 0}
//                 prefix={<BarChartOutlined />}
//                 valueStyle={{ color: '#722ed1' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Messages List */}
//         <Card title="Recent Messages" className={cardClass}>
//           <List
//             loading={loading}
//             dataSource={messages}
//             renderItem={(message) => (
//               <List.Item
//                 className="p-4 border-b cursor-pointer hover:bg-gray-50"
//                 onClick={() => setSelectedMessage(message)}
//               >
//                 <div className="flex items-start w-full">
//                   <Avatar icon={<UserOutlined />} className="mr-3" />
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <Space>
//                         <Text strong>{message.recipientName}</Text>
//                         <Text type="secondary">{message.phoneNumber}</Text>
//                       </Space>
//                       <Space>
//                         {getStatusTag(message.status)}
//                         <Text type="secondary" className="text-xs">
//                           {new Date(message.sentAt).toLocaleDateString()}
//                         </Text>
//                       </Space>
//                     </div>
//                     <Text className="block mt-1">{message.message}</Text>
//                   </div>
//                 </div>
//               </List.Item>
//             )}
//           />
//         </Card>

//         {/* Compose SMS Modal */}
//         <Modal
//           title="Send SMS"
//           open={composeVisible}
//           onCancel={() => {
//             setComposeVisible(false);
//             form.resetFields();
//           }}
//           footer={null}
//           width={600}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleSendSMS}
//           >
//             <Row gutter={16}>
//               <Col span={24}>
//                 <Form.Item
//                   label="Recipients"
//                   name="recipients"
//                   rules={[{ required: true, message: 'Please select recipients' }]}
//                 >
//                   <Select
//                     mode="multiple"
//                     placeholder="Select contacts"
//                     showSearch
//                     optionFilterProp="children"
//                   >
//                     {contacts.map(contact => (
//                       <Option key={contact._id} value={contact.phone}>
//                         {`${contact.firstName} ${contact.lastName} - ${contact.phone}`}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Message"
//                   name="message"
//                   rules={[
//                     { required: true, message: 'Please enter message' },
//                     { max: 160, message: 'Message must be 160 characters or less' }
//                   ]}
//                 >
//                   <TextArea 
//                     rows={4} 
//                     placeholder="Type your SMS message (max 160 characters)"
//                     showCount
//                     maxLength={160}
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>
//             <div className="text-right">
//               <Space>
//                 <Button onClick={() => setComposeVisible(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
//                   Send SMS
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Modal>

//         {/* Message Detail Modal */}
//         <Modal
//           title="SMS Details"
//           open={!!selectedMessage}
//           onCancel={() => setSelectedMessage(null)}
//           footer={[
//             <Button key="close" onClick={() => setSelectedMessage(null)}>
//               Close
//             </Button>,
//           ]}
//         >
//           {selectedMessage && (
//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <Text strong>Recipient:</Text>
//                 <Text>{selectedMessage.recipientName}</Text>
//               </div>
//               <div className="flex justify-between">
//                 <Text strong>Phone:</Text>
//                 <Text>{selectedMessage.phoneNumber}</Text>
//               </div>
//               <div className="flex justify-between">
//                 <Text strong>Status:</Text>
//                 {getStatusTag(selectedMessage.status)}
//               </div>
//               <div className="flex justify-between">
//                 <Text strong>Sent:</Text>
//                 <Text>{new Date(selectedMessage.sentAt).toLocaleString()}</Text>
//               </div>
//               <Divider />
//               <div>
//                 <Text strong>Message:</Text>
//                 <div className="mt-2 p-3 bg-gray-50 rounded">
//                   <Text>{selectedMessage.message}</Text>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default SMS;








import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Table,
  Statistic,
  Row,
  Col,
  message,
  Modal,
  DatePicker,
  Tag,
  Space,
  Alert,
} from 'antd';
import {
  MessageOutlined,
  SendOutlined,
  HistoryOutlined,
  BarChartOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  sendSMS,
  sendBulkSMS,
  fetchSMSHistory,
  fetchSMSStats,
  createSMSCampaign,
} from '../slices/smsSlice';

const { Option } = Select;
const { TextArea } = Input;

const SMS = () => {
  const dispatch = useDispatch();
  const { history, stats, loading, error } = useSelector((state) => state.sms);
  const { contacts } = useSelector((state) => state.contacts);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [bulkModalVisible, setBulkModalVisible] = useState(false);
  const [form] = Form.useForm();

  // ✅ FIX: Safe access with default values
  const contactList = contacts?.items || [];
  const smsHistory = history || [];
  const smsStats = stats || {
    totalMessages: 0,
    sent: 0,
    failed: 0,
    totalCost: 0
  };

  useEffect(() => {
    dispatch(fetchSMSHistory());
    dispatch(fetchSMSStats());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSendSMS = async (values) => {
    try {
      await dispatch(sendSMS(values)).unwrap();
      message.success('SMS sent successfully');
      setSendModalVisible(false);
      form.resetFields();
      dispatch(fetchSMSHistory());
      dispatch(fetchSMSStats());
    } catch (error) {
      message.error('Failed to send SMS');
    }
  };

  const handleSendBulkSMS = async (values) => {
    try {
      await dispatch(sendBulkSMS(values)).unwrap();
      message.success('Bulk SMS sent successfully');
      setBulkModalVisible(false);
      form.resetFields();
      dispatch(fetchSMSHistory());
      dispatch(fetchSMSStats());
    } catch (error) {
      message.error('Failed to send bulk SMS');
    }
  };

  const columns = [
    {
      title: 'Recipient',
      dataIndex: 'recipientName',
      key: 'recipientName',
      render: (text, record) => text || record.recipientPhone || 'Unknown',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (text) => text || 'No message',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          sent: { color: 'green', text: 'SENT' },
          failed: { color: 'red', text: 'FAILED' },
          pending: { color: 'orange', text: 'PENDING' },
          delivered: { color: 'blue', text: 'DELIVERED' },
        };
        const config = statusMap[status] || { color: 'default', text: status?.toUpperCase() || 'UNKNOWN' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => `$${(cost || 0).toFixed(2)}`,
    },
    {
      title: 'Sent At',
      dataIndex: 'sentAt',
      key: 'sentAt',
      render: (date) => date ? new Date(date).toLocaleString() : 'Not sent',
    },
  ];

  return (
    <div className="min-h-screen p-4">
      <Card title={
        <div className="flex items-center">
          <MessageOutlined className="mr-2" />
          SMS Management
        </div>
      }>
        {/* Error Alert */}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            className="mb-4"
          />
        )}

        {/* Stats Row */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Sent"
                value={smsStats.totalMessages}
                prefix={<SendOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Successful"
                value={smsStats.sent}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Failed"
                value={smsStats.failed}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Cost"
                value={smsStats.totalCost}
                precision={2}
                prefix="$"
              />
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Space className="mb-4">
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => setSendModalVisible(true)}
            disabled={contactList.length === 0}
          >
            Send SMS
          </Button>
          <Button
            icon={<UserOutlined />}
            onClick={() => setBulkModalVisible(true)}
            disabled={contactList.length === 0}
          >
            Send Bulk SMS
          </Button>
        </Space>

        {/* No Contacts Warning */}
        {contactList.length === 0 && (
          <Alert
            message="No Contacts Available"
            description="You need to have contacts to send SMS messages. Please add contacts first."
            type="warning"
            showIcon
            className="mb-4"
          />
        )}

        {/* SMS History */}
        <Card 
          title={
            <div className="flex items-center">
              <HistoryOutlined className="mr-2" />
              SMS History
            </div>
          }
          extra={<span className="text-gray-500">{smsHistory.length} messages</span>}
        >
          {smsHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ExclamationCircleOutlined className="text-2xl mb-2" />
              <p>No SMS history found</p>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={smsHistory}
              rowKey="_id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
            />
          )}
        </Card>

        {/* Send SMS Modal */}
        <Modal
          title="Send SMS"
          open={sendModalVisible}
          onCancel={() => setSendModalVisible(false)}
          footer={null}
          width={600}
          destroyOnClose
        >
          <Form form={form} layout="vertical" onFinish={handleSendSMS}>
            <Form.Item
              label="Recipient"
              name="recipientId"
              rules={[{ required: true, message: 'Please select a recipient' }]}
            >
              <Select 
                placeholder="Select recipient" 
                showSearch
                optionFilterProp="children"
                disabled={contactList.length === 0}
              >
                {contactList.map(contact => (
                  <Option key={contact._id} value={contact._id}>
                    {contact.firstName} {contact.lastName} - {contact.phones?.[0]?.number || 'No phone'}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                { required: true, message: 'Please enter message' },
                { max: 160, message: 'Message must be 160 characters or less' }
              ]}
            >
              <TextArea 
                rows={4} 
                placeholder="Enter your message here (max 160 characters)..." 
                showCount 
                maxLength={160}
              />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                block
                icon={<SendOutlined />}
              >
                Send SMS
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Bulk SMS Modal */}
        <Modal
          title="Send Bulk SMS"
          open={bulkModalVisible}
          onCancel={() => setBulkModalVisible(false)}
          footer={null}
          width={600}
          destroyOnClose
        >
          <Form layout="vertical" onFinish={handleSendBulkSMS}>
            <Form.Item
              label="Recipients"
              name="userIds"
              rules={[{ required: true, message: 'Please select recipients' }]}
            >
              <Select 
                mode="multiple" 
                placeholder="Select recipients"
                disabled={contactList.length === 0}
                optionFilterProp="children"
              >
                {contactList.map(contact => (
                  <Option key={contact._id} value={contact._id}>
                    {contact.firstName} {contact.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                { required: true, message: 'Please enter message' },
                { max: 160, message: 'Message must be 160 characters or less' }
              ]}
            >
              <TextArea 
                rows={4} 
                placeholder="Enter your message here (max 160 characters)..." 
                showCount 
                maxLength={160}
              />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                block
                icon={<UserOutlined />}
              >
                Send to {form.getFieldValue('userIds')?.length || 0} Recipients
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default SMS;










