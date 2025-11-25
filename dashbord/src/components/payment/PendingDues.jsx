// import React, { useState, useEffect } from 'react';
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
//   message,
//   Row,
//   Col,
//   Statistic,
//   Alert,
//   Tooltip,
//   Badge,
// } from 'antd';
// import {
//   DollarOutlined,
//   SearchOutlined,
//   UserOutlined,
//   ClockCircleOutlined,
//   ExclamationCircleOutlined,
//   EyeOutlined,
//   SendOutlined,
//   FileTextOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;

// const PendingDues = () => {
//   const [pendingDues, setPendingDues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDue, setSelectedDue] = useState(null);
//   const [reminderModalVisible, setReminderModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [stats, setStats] = useState({});
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const [reminderForm] = Form.useForm();

//   useEffect(() => {
//     fetchPendingDues();
//     fetchDuesStats();
//   }, [searchText]);

//   const fetchPendingDues = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/payments/dues', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { search: searchText }
//       });

//       if (response.data.success) {
//         setPendingDues(response.data.dues || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch pending dues');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDuesStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/payments/dues/stats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch dues stats');
//     }
//   };

//   const handleSendReminder = async (values) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/payments/dues/reminder',
//         {
//           memberId: selectedDue.member._id,
//           ...values
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success('Reminder sent successfully');
//         setReminderModalVisible(false);
//         reminderForm.resetFields();
//       }
//     } catch (error) {
//       message.error('Failed to send reminder');
//     }
//   };

//   const getOverdueTag = (dueDate) => {
//     const daysOverdue = dayjs().diff(dayjs(dueDate), 'days');
//     if (daysOverdue > 30) {
//       return <Tag color="red">Overdue: {daysOverdue} days</Tag>;
//     } else if (daysOverdue > 15) {
//       return <Tag color="orange">Overdue: {daysOverdue} days</Tag>;
//     } else if (daysOverdue > 0) {
//       return <Tag color="yellow">Overdue: {daysOverdue} days</Tag>;
//     }
//     return null;
//   };

//   const getPriorityTag = (dueDate) => {
//     const daysUntilDue = dayjs(dueDate).diff(dayjs(), 'days');
//     if (daysUntilDue < 0) {
//       return <Tag color="red">Urgent</Tag>;
//     } else if (daysUntilDue < 3) {
//       return <Tag color="orange">High</Tag>;
//     } else if (daysUntilDue < 7) {
//       return <Tag color="yellow">Medium</Tag>;
//     }
//     return <Tag color="green">Low</Tag>;
//   };

//   const columns = [
//     {
//       title: 'Member',
//       dataIndex: 'member',
//       key: 'member',
//       render: (member) => (
//         <Space>
//           <Avatar src={member?.image} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium">
//               {`${member?.firstName} ${member?.lastName}`}
//             </div>
//             <div className="text-xs text-gray-500">
//               {member?.membershipId}
//             </div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Due Type',
//       dataIndex: 'type',
//       key: 'type',
//       render: (type) => (
//         <Tag color={type === 'subscription' ? 'blue' : 'purple'}>
//           {type === 'subscription' ? 'Monthly Subscription' : 'Other Due'}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       render: (amount) => (
//         <Text strong>৳{amount?.toLocaleString()}</Text>
//       ),
//     },
//     {
//       title: 'Due Date',
//       dataIndex: 'dueDate',
//       key: 'dueDate',
//       render: (date) => (
//         <div>
//           <div>{dayjs(date).format('MMM D, YYYY')}</div>
//           {getOverdueTag(date)}
//         </div>
//       ),
//     },
//     {
//       title: 'Priority',
//       dataIndex: 'dueDate',
//       key: 'priority',
//       render: (date) => getPriorityTag(date),
//     },
//     {
//       title: 'Reminders Sent',
//       dataIndex: 'reminderCount',
//       key: 'reminderCount',
//       render: (count) => (
//         <Badge count={count} showZero={false} />
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button
//               type="text"
//               icon={<EyeOutlined />}
//               onClick={() => setSelectedDue(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Send Reminder">
//             <Button
//               type="text"
//               icon={<SendOutlined />}
//               onClick={() => {
//                 setSelectedDue(record);
//                 setReminderModalVisible(true);
//               }}
//             />
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="mb-6">
//           <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//             <DollarOutlined className="mr-3" />
//             Pending Dues
//           </Title>
//           <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//             Track and manage overdue and pending payments
//           </Text>
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Pending"
//                 value={stats.totalPending || 0}
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Overdue Amount"
//                 value={stats.overdueAmount || 0}
//                 prefix="৳"
//                 valueStyle={{ color: '#ff4d4f' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Urgent Cases"
//                 value={stats.urgentCases || 0}
//                 valueStyle={{ color: '#cf1322' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Avg. Overdue Days"
//                 value={stats.avgOverdueDays || 0}
//                 suffix="days"
//                 valueStyle={{ color: '#722ed1' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Alert for critical cases */}
//         {stats.criticalCases > 0 && (
//           <Alert
//             message={`${stats.criticalCases} critical overdue cases require immediate attention`}
//             type="error"
//             showIcon
//             className="mb-6"
//             action={
//               <Button size="small" type="primary">
//                 Take Action
//               </Button>
//             }
//           />
//         )}

//         {/* Search */}
//         <div className="mb-6">
//           <Input
//             placeholder="Search pending dues..."
//             prefix={<SearchOutlined />}
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             style={{ maxWidth: 400 }}
//             allowClear
//           />
//         </div>

//         {/* Pending Dues Table */}
//         <Table
//           columns={columns}
//           dataSource={pendingDues}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1000 }}
//           pagination={{ pageSize: 10 }}
//         />

//         {/* Due Detail Modal */}
//         <Modal
//           title="Due Payment Details"
//           open={!!selectedDue}
//           onCancel={() => setSelectedDue(null)}
//           footer={[
//             <Button key="close" onClick={() => setSelectedDue(null)}>
//               Close
//             </Button>,
//             <Button 
//               key="reminder" 
//               type="primary"
//               icon={<SendOutlined />}
//               onClick={() => {
//                 setSelectedDue(selectedDue);
//                 setReminderModalVisible(true);
//               }}
//             >
//               Send Reminder
//             </Button>,
//           ]}
//           width={700}
//         >
//           {selectedDue && (
//             <div className="space-y-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <Title level={4} className="mb-1">
//                     {`${selectedDue.member?.firstName} ${selectedDue.member?.lastName}`}
//                   </Title>
//                   <Text type="secondary">{selectedDue.member?.membershipId}</Text>
//                 </div>
//                 <Space>
//                   {getPriorityTag(selectedDue.dueDate)}
//                   {getOverdueTag(selectedDue.dueDate)}
//                 </Space>
//               </div>

//               <Divider />

//               <Descriptions bordered column={2}>
//                 <Descriptions.Item label="Due Type">
//                   {selectedDue.type === 'subscription' ? 'Monthly Subscription' : 'Other Due'}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Amount">
//                   <Text strong>৳{selectedDue.amount?.toLocaleString()}</Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Due Date">
//                   {dayjs(selectedDue.dueDate).format('MMMM D, YYYY')}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Days Overdue">
//                   {Math.max(0, dayjs().diff(dayjs(selectedDue.dueDate), 'days'))} days
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Member Contact">
//                   <div>
//                     <div>{selectedDue.member?.phone}</div>
//                     <div>{selectedDue.member?.email}</div>
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Reminders Sent">
//                   {selectedDue.reminderCount || 0}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Last Reminder">
//                   {selectedDue.lastReminder ? 
//                     dayjs(selectedDue.lastReminder).format('MMM D, YYYY HH:mm') : 
//                     'Never'
//                   }
//                 </Descriptions.Item>
//                 {selectedDue.description && (
//                   <Descriptions.Item label="Description" span={2}>
//                     {selectedDue.description}
//                   </Descriptions.Item>
//                 )}
//               </Descriptions>

//               {/* Payment History */}
//               {selectedDue.paymentHistory && selectedDue.paymentHistory.length > 0 && (
//                 <>
//                   <Divider />
//                   <Title level={5}>Payment History</Title>
//                   <div className="space-y-2">
//                     {selectedDue.paymentHistory.map((payment, index) => (
//                       <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
//                         <div>
//                           <Text strong>৳{payment.amount?.toLocaleString()}</Text>
//                           <div className="text-xs text-gray-500">
//                             {dayjs(payment.paidAt).format('MMM D, YYYY')}
//                           </div>
//                         </div>
//                         <Tag color="green">Paid</Tag>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </Modal>

//         {/* Send Reminder Modal */}
//         <Modal
//           title="Send Payment Reminder"
//           open={reminderModalVisible}
//           onCancel={() => {
//             setReminderModalVisible(false);
//             reminderForm.resetFields();
//           }}
//           footer={null}
//           width={500}
//         >
//           <Form
//             form={reminderForm}
//             layout="vertical"
//             onFinish={handleSendReminder}
//           >
//             <div className="mb-4 p-3 bg-blue-50 rounded">
//               <Text strong>To: {selectedDue?.member?.firstName} {selectedDue?.member?.lastName}</Text>
//               <br />
//               <Text>Amount Due: ৳{selectedDue?.amount?.toLocaleString()}</Text>
//             </div>

//             <Form.Item
//               label="Reminder Type"
//               name="reminderType"
//               rules={[{ required: true, message: 'Please select reminder type' }]}
//               initialValue="email"
//             >
//               <Select>
//                 <Option value="email">Email</Option>
//                 <Option value="sms">SMS</Option>
//                 <Option value="both">Both Email & SMS</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Message"
//               name="message"
//               rules={[{ required: true, message: 'Please enter reminder message' }]}
//               initialValue={`Dear ${selectedDue?.member?.firstName}, this is a friendly reminder that your payment of ৳${selectedDue?.amount?.toLocaleString()} is overdue. Please make the payment at your earliest convenience.`}
//             >
//               <Input.TextArea 
//                 rows={4} 
//                 placeholder="Enter reminder message..."
//               />
//             </Form.Item>

//             <Form.Item
//               label="Urgency Level"
//               name="urgency"
//               initialValue="medium"
//             >
//               <Select>
//                 <Option value="low">Low - Friendly Reminder</Option>
//                 <Option value="medium">Medium - Important</Option>
//                 <Option value="high">High - Urgent</Option>
//               </Select>
//             </Form.Item>

//             <div className="text-right">
//               <Space>
//                 <Button onClick={() => setReminderModalVisible(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
//                   Send Reminder
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default PendingDues;






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
  message,
  Row,
  Col,
  Statistic,
  Descriptions,
  Divider,
  Alert,
  Tooltip,
  Badge,
  Popconfirm
} from 'antd';
import {
  DollarOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  SendOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useDues } from '../hooks/useDues';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Option } = Select;

const PendingDues = () => {
  const {
    dues,
    loading,
    stats = {},
    createDues,
    updateDuesStatus,
    sendDueReminder,
    loadAllDues,
    loadStats,
    deleteDues,
    updateFilters,
    filters = {}
  } = useDues();

  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [selectedDue, setSelectedDue] = useState(null);
  const [form] = Form.useForm();
  const currentUser = useSelector(state => state.user?.value);
  const currentTheme = useSelector(state => state.theme?.currentTheme || 'light');

  useEffect(() => {
    loadAllDues(filters);
    loadStats();
  }, [filters]);

  const handleCreateDues = async (values) => {
    try {
      const duesData = {
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        amount: parseFloat(values.amount)
      };

      const result = await createDues(duesData);
      
      if (result.success) {
        message.success('Dues created successfully');
        setModalVisible(false);
        form.resetFields();
        loadAllDues(filters);
      } else {
        message.error(result.error);
      }
    } catch (error) {
      message.error('Failed to create dues');
    }
  };

  const handleUpdateStatus = async (duesId, status) => {
    const result = await updateDuesStatus(duesId, { status });
    if (result.success) {
      message.success(`Dues ${status} successfully`);
      loadAllDues(filters);
    } else {
      message.error(result.error);
    }
  };

  const handleSendReminder = async (values) => {
    const result = await sendDueReminder(selectedDue._id, values);
    if (result.success) {
      message.success('Reminder sent successfully');
      setReminderModalVisible(false);
      loadAllDues(filters);
    } else {
      message.error(result.error);
    }
  };

  const handleDeleteDues = async (duesId) => {
    const result = await deleteDues(duesId);
    if (result.success) {
      message.success('Dues deleted successfully');
      loadAllDues(filters);
    } else {
      message.error(result.error);
    }
  };

  const getStatusTag = (status, dueDate) => {
    const isOverdue = status === 'pending' && new Date(dueDate) < new Date();
    
    if (isOverdue) {
      return <Tag color="red" icon={<ExclamationCircleOutlined />}>Overdue</Tag>;
    }

    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
      paid: { color: 'green', icon: <CheckCircleOutlined />, text: 'Paid' },
      partially_paid: { color: 'blue', text: 'Partially Paid' },
      cancelled: { color: 'default', icon: <CloseCircleOutlined />, text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { color: 'default', text: status };
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getPriorityTag = (dueDate, status) => {
    if (status !== 'pending') return null;

    const daysUntilDue = dayjs(dueDate).diff(dayjs(), 'days');
    
    if (daysUntilDue < 0) {
      return <Tag color="red">Critical</Tag>;
    } else if (daysUntilDue < 3) {
      return <Tag color="orange">High</Tag>;
    } else if (daysUntilDue < 7) {
      return <Tag color="yellow">Medium</Tag>;
    }
    return <Tag color="green">Low</Tag>;
  };

  const getDaysOverdue = (dueDate, status) => {
    if (status !== 'pending' || new Date(dueDate) >= new Date()) return 0;
    return Math.floor((new Date() - new Date(dueDate)) / (1000 * 60 * 60 * 24));
  };

  const columns = [
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member',
      render: (member) => (
        <Space>
          <Avatar src={member?.image} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">
              {`${member?.firstName} ${member?.lastName}`}
            </div>
            <div className="text-xs text-gray-500">
              {member?.membershipId}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Dues Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-gray-500">{record.dueType}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <div>
          <Text strong>৳{amount?.toLocaleString()}</Text>
          {record.paidAmount > 0 && (
            <div className="text-xs text-gray-500">
              Paid: ৳{record.paidAmount?.toLocaleString()}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date, record) => (
        <div>
          <div>{dayjs(date).format('MMM D, YYYY')}</div>
          <div className="text-xs">
            {getDaysOverdue(date, record.status) > 0 && (
              <Text type="danger">
                {getDaysOverdue(date, record.status)} days overdue
              </Text>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Space direction="vertical" size="small">
          {getStatusTag(status, record.dueDate)}
          {getPriorityTag(record.dueDate, status)}
        </Space>
      ),
    },
    {
      title: 'Reminders',
      dataIndex: 'reminderCount',
      key: 'reminderCount',
      render: (count, record) => (
        <Badge 
          count={count} 
          showZero={false} 
          overflowCount={9}
          title={`${count} reminders sent`}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedDue(record);
                setDetailModalVisible(true);
              }}
            />
          </Tooltip>
          
          {currentUser.role === 'FinanceSecretary' && record.status === 'pending' && (
            <>
              <Tooltip title="Mark as Paid">
                <Button
                  type="text"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleUpdateStatus(record._id, 'paid')}
                />
              </Tooltip>
              
              <Tooltip title="Send Reminder">
                <Button
                  type="text"
                  icon={<SendOutlined />}
                  onClick={() => {
                    setSelectedDue(record);
                    setReminderModalVisible(true);
                  }}
                />
              </Tooltip>
            </>
          )}
          
          {currentUser.role === 'FinanceSecretary' && (
            <Popconfirm
              title="Delete this dues record?"
              description="Are you sure you want to delete this dues record?"
              onConfirm={() => handleDeleteDues(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete">
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

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
              <DollarOutlined className="mr-3" />
              Pending Dues Management
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Track and manage all pending dues and overdue payments
            </Text>
          </div>
          
          {currentUser.role === 'FinanceSecretary' && (
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Create Dues
            </Button>
          )}
        </div>

        {/* Statistics */}
       {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Pending"
                // ✅ FIX: Added ?. after stats
                value={stats?.byStatus?.pending?.count || 0}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Overdue Amount"
                // ✅ FIX: Added ?. after stats
                value={stats?.overdue?.totalAmount || 0}
                prefix="৳"
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Overdue Dues"
                // ✅ FIX: Added ?. after stats
                value={stats?.overdue?.count || 0}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Avg. Days Overdue"
                // ✅ FIX: Added ?. after stats
                value={Math.round((stats?.overdue?.avgDaysOverdue || 0) / (1000 * 60 * 60 * 24))}
                suffix="days"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Critical Alert */}
        {/* ✅ FIX: Added ?. after stats */}
        {stats?.overdue?.count > 0 && (
          <Alert
            message={`${stats.overdue.count} critical overdue dues requiring immediate attention`}
            type="error"
            showIcon
            className="mb-6"
            action={
              <Button 
                size="small" 
                type="primary"
                onClick={() => updateFilters({ overdueOnly: true, status: 'pending' })}
              >
                View Overdue
              </Button>
            }
          />
        )}
        {/* Critical Alert */}
        {stats.overdue?.count > 0 && (
          <Alert
            message={`${stats.overdue.count} critical overdue dues requiring immediate attention`}
            type="error"
            showIcon
            className="mb-6"
            action={
              <Button 
                size="small" 
                type="primary"
                onClick={() => updateFilters({ overdueOnly: true, status: 'pending' })}
              >
                View Overdue
              </Button>
            }
          />
        )}

        {/* Filters */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Input
              placeholder="Search by title or member..."
              prefix={<SearchOutlined />}
              onChange={(e) => updateFilters({ search: e.target.value })}
              allowClear
            />
          </Col>
          <Col xs={24} sm={8}>
            <Select
              placeholder="Filter by Status"
              style={{ width: '100%' }}
              allowClear
              value={filters.status}
              onChange={(value) => updateFilters({ status: value })}
            >
              <Option value="pending">Pending</Option>
              <Option value="paid">Paid</Option>
              <Option value="partially_paid">Partially Paid</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Select
              placeholder="Filter by Due Type"
              style={{ width: '100%' }}
              allowClear
              value={filters.dueType}
              onChange={(value) => updateFilters({ dueType: value })}
            >
              <Option value="monthly_subscription">Monthly Subscription</Option>
              <Option value="annual_fee">Annual Fee</Option>
              <Option value="fine">Fine</Option>
              <Option value="donation">Donation</Option>
              <Option value="event_fee">Event Fee</Option>
              <Option value="maintenance">Maintenance</Option>
              <Option value="other">Other</Option>
            </Select>
          </Col>
        </Row>

        {/* Dues Table */}
        <Table
          columns={columns}
          dataSource={dues}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 10 }}
        />

        {/* Create Dues Modal */}
        <Modal
          title="Create New Dues"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateDues}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Member"
                  name="memberId"
                  rules={[{ required: true, message: 'Please select a member' }]}
                >
                  <Select
                    showSearch
                    placeholder="Search and select member"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {/* This would be populated from API in real implementation */}
                    <Option value="member123">John Doe - MEM001</Option>
                    <Option value="member124">Jane Smith - MEM002</Option>
                  </Select>
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  label="Dues Title"
                  name="title"
                  rules={[{ required: true, message: 'Please enter dues title' }]}
                >
                  <Input placeholder="e.g., Monthly Subscription January 2024" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[{ required: true, message: 'Please enter amount' }]}
                >
                  <Input 
                    type="number"
                    prefix="৳" 
                    placeholder="Enter amount"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Due Type"
                  name="dueType"
                  rules={[{ required: true, message: 'Please select due type' }]}
                >
                  <Select placeholder="Select due type">
                    <Option value="monthly_subscription">Monthly Subscription</Option>
                    <Option value="annual_fee">Annual Fee</Option>
                    <Option value="fine">Fine</Option>
                    <Option value="donation">Donation</Option>
                    <Option value="event_fee">Event Fee</Option>
                    <Option value="maintenance">Maintenance</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Due Date"
                  name="dueDate"
                  rules={[{ required: true, message: 'Please select due date' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="Enter dues description (optional)"
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="text-right mt-4">
              <Space>
                <Button onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Create Dues
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>

        {/* Dues Detail Modal */}
        <Modal
          title="Dues Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>,
            currentUser.role === 'FinanceSecretary' && selectedDue?.status === 'pending' && (
              <Button 
                key="reminder" 
                type="primary"
                icon={<SendOutlined />}
                onClick={() => {
                  setDetailModalVisible(false);
                  setReminderModalVisible(true);
                }}
              >
                Send Reminder
              </Button>
            )
          ]}
          width={700}
        >
          {selectedDue && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <Title level={4} className="mb-1">
                    {selectedDue.title}
                  </Title>
                  <Text type="secondary">{selectedDue.dueType}</Text>
                </div>
                <Space>
                  {getStatusTag(selectedDue.status, selectedDue.dueDate)}
                  {getPriorityTag(selectedDue.dueDate, selectedDue.status)}
                </Space>
              </div>

              <Divider />

              <Descriptions bordered column={2}>
                <Descriptions.Item label="Member" span={2}>
                  {selectedDue.member?.firstName} {selectedDue.member?.lastName}
                  <br />
                  <Text type="secondary">
                    {selectedDue.member?.membershipId} • {selectedDue.member?.phone}
                  </Text>
                </Descriptions.Item>
                
                <Descriptions.Item label="Amount">
                  <Text strong>৳{selectedDue.amount?.toLocaleString()}</Text>
                </Descriptions.Item>
                
                <Descriptions.Item label="Paid Amount">
                  <Text type={selectedDue.paidAmount > 0 ? 'success' : 'secondary'}>
                    ৳{selectedDue.paidAmount?.toLocaleString()}
                  </Text>
                </Descriptions.Item>
                
                <Descriptions.Item label="Due Date">
                  {dayjs(selectedDue.dueDate).format('MMMM D, YYYY')}
                </Descriptions.Item>
                
                <Descriptions.Item label="Days Status">
                  {getDaysOverdue(selectedDue.dueDate, selectedDue.status) > 0 ? (
                    <Text type="danger">
                      {getDaysOverdue(selectedDue.dueDate, selectedDue.status)} days overdue
                    </Text>
                  ) : (
                    <Text type="success">On time</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item label="Reminders Sent">
                  <Badge count={selectedDue.reminderCount} showZero />
                  {selectedDue.lastReminderSent && (
                    <div className="text-xs text-gray-500 mt-1">
                      Last: {dayjs(selectedDue.lastReminderSent).fromNow()}
                    </div>
                  )}
                </Descriptions.Item>

                {selectedDue.paidAt && (
                  <Descriptions.Item label="Paid Date">
                    {dayjs(selectedDue.paidAt).format('MMMM D, YYYY')}
                  </Descriptions.Item>
                )}

                {selectedDue.verifiedBy && (
                  <Descriptions.Item label="Verified By">
                    {selectedDue.verifiedBy?.firstName} {selectedDue.verifiedBy?.lastName}
                    <br />
                    <Text type="secondary">
                      {dayjs(selectedDue.verifiedAt).format('MMM D, YYYY HH:mm')}
                    </Text>
                  </Descriptions.Item>
                )}

                {selectedDue.description && (
                  <Descriptions.Item label="Description" span={2}>
                    {selectedDue.description}
                  </Descriptions.Item>
                )}

                {selectedDue.notes && (
                  <Descriptions.Item label="Notes" span={2}>
                    {selectedDue.notes}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          )}
        </Modal>

        {/* Send Reminder Modal */}
        <Modal
          title="Send Payment Reminder"
          open={reminderModalVisible}
          onCancel={() => {
            setReminderModalVisible(false);
          }}
          footer={null}
          width={500}
        >
          {selectedDue && (
            <Form layout="vertical" onFinish={handleSendReminder}>
              <div className="mb-4 p-3 bg-blue-50 rounded">
                <Text strong>To: {selectedDue.member?.firstName} {selectedDue.member?.lastName}</Text>
                <br />
                <Text>Dues: {selectedDue.title}</Text>
                <br />
                <Text>Amount Due: ৳{selectedDue.amount?.toLocaleString()}</Text>
                <br />
                <Text type="secondary">
                  Due Date: {dayjs(selectedDue.dueDate).format('MMMM D, YYYY')}
                </Text>
              </div>

              <Form.Item
                label="Reminder Type"
                name="reminderType"
                rules={[{ required: true, message: 'Please select reminder type' }]}
                initialValue="email"
              >
                <Select>
                  <Option value="email">Email</Option>
                  <Option value="sms">SMS</Option>
                  <Option value="both">Both Email & SMS</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Message"
                name="customMessage"
                initialValue={`Dear ${selectedDue.member?.firstName}, this is a friendly reminder that your payment of ৳${selectedDue.amount?.toLocaleString()} for "${selectedDue.title}" is due. Please make the payment at your earliest convenience.`}
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="Enter custom reminder message..."
                />
              </Form.Item>

              <Form.Item
                label="Urgency Level"
                name="urgency"
                initialValue="medium"
              >
                <Select>
                  <Option value="low">Low - Friendly Reminder</Option>
                  <Option value="medium">Medium - Important</Option>
                  <Option value="high">High - Urgent</Option>
                </Select>
              </Form.Item>

              <div className="text-right">
                <Space>
                  <Button onClick={() => setReminderModalVisible(false)}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                    Send Reminder
                  </Button>
                </Space>
              </div>
            </Form>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default PendingDues;






