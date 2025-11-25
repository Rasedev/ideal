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
//   Descriptions,
//   Divider,
//   Tabs,
//   Progress,
//   Badge,
//   Tooltip,
// } from 'antd';
// import {
//   CheckCircleOutlined,
//   SearchOutlined,
//   FilterOutlined,
//   EyeOutlined,
//   UserOutlined,
//   DollarOutlined,
//   ClockCircleOutlined,
//   ApartmentOutlined,
//   BarChartOutlined,
//   FileTextOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TabPane } = Tabs;

// const SubPaymentStatus = () => {
//   const [subPayments, setSubPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedSubPayment, setSelectedSubPayment] = useState(null);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [activeTab, setActiveTab] = useState('all');
//   const [stats, setStats] = useState({});
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     fetchSubPayments();
//     fetchSubPaymentStats();
//   }, [searchText, activeTab]);

//   const fetchSubPayments = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = {
//         search: searchText,
//         status: activeTab === 'all' ? '' : activeTab,
//       };

//       const response = await axios.get('http://localhost:3000/api/v1/payments/subpayment-status', {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//       });

//       if (response.data.success) {
//         setSubPayments(response.data.subPayments || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch sub-payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubPaymentStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/payments/subpayment-status/stats', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch sub-payment stats');
//     }
//   };

//   const handleSubPaymentAction = async (subPaymentId, action) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:3000/api/v1/payments/subpayment-status/${subPaymentId}`,
//         { action },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success(`Sub-payment ${action} successfully`);
//         fetchSubPayments();
//         fetchSubPaymentStats();
//       }
//     } catch (error) {
//       message.error('Failed to update sub-payment');
//     }
//   };

//   const getSubPaymentStatusTag = (status) => {
//     const statusConfig = {
//       pending_verification: { color: 'orange', text: 'Pending Verification' },
//       verified: { color: 'green', text: 'Verified' },
//       under_review: { color: 'blue', text: 'Under Review' },
//       rejected: { color: 'red', text: 'Rejected' },
//       partially_paid: { color: 'yellow', text: 'Partially Paid' },
//       completed: { color: 'cyan', text: 'Completed' },
//     };

//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getPaymentMethodTag = (method) => {
//     const methodConfig = {
//       bank: { color: 'blue', text: 'Bank Transfer' },
//       bKash: { color: 'purple', text: 'bKash' },
//       nagad: { color: 'green', text: 'Nagad' },
//       rocket: { color: 'orange', text: 'Rocket' },
//       cash: { color: 'cyan', text: 'Cash' },
//     };

//     const config = methodConfig[method?.toLowerCase()] || { color: 'default', text: method };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getPriorityTag = (priority) => {
//     const priorityConfig = {
//       high: { color: 'red', text: 'High' },
//       medium: { color: 'orange', text: 'Medium' },
//       low: { color: 'green', text: 'Low' },
//     };

//     const config = priorityConfig[priority] || { color: 'default', text: priority };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const columns = [
//     {
//       title: 'Sub-Payment Info',
//       dataIndex: 'referenceId',
//       key: 'subPaymentInfo',
//       render: (referenceId, record) => (
//         <div>
//           <div className="font-medium">{referenceId}</div>
//           <div className="text-xs text-gray-500">
//             Parent: {record.parentPayment?.transactionId}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Member',
//       dataIndex: 'member',
//       key: 'member',
//       render: (member) => (
//         <Space>
//           <Avatar size="small" src={member?.image} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium text-sm">
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
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       render: (amount, record) => (
//         <div>
//           <Text strong>৳{amount?.toLocaleString()}</Text>
//           {record.parentPayment && (
//             <div className="text-xs text-gray-500">
//               of ৳{record.parentPayment.amount?.toLocaleString()}
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//       render: (type) => (
//         <Tag color={type === 'installment' ? 'blue' : 'purple'}>
//           {type === 'installment' ? 'Installment' : 'Partial Payment'}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Priority',
//       dataIndex: 'priority',
//       key: 'priority',
//       render: (priority) => getPriorityTag(priority),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getSubPaymentStatusTag(status),
//     },
//     {
//       title: 'Due Date',
//       dataIndex: 'dueDate',
//       key: 'dueDate',
//       render: (date) => date ? dayjs(date).format('MMM D, YYYY') : '-',
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
//               size="small"
//               onClick={() => {
//                 setSelectedSubPayment(record);
//                 setDetailModalVisible(true);
//               }}
//             />
//           </Tooltip>
//           {record.status === 'pending_verification' && (
//             <>
//               <Tooltip title="Verify">
//                 <Button
//                   type="link"
//                   size="small"
//                   onClick={() => handleSubPaymentAction(record._id, 'verify')}
//                 >
//                   Verify
//                 </Button>
//               </Tooltip>
//               <Tooltip title="Reject">
//                 <Button
//                   type="link"
//                   danger
//                   size="small"
//                   onClick={() => handleSubPaymentAction(record._id, 'reject')}
//                 >
//                   Reject
//                 </Button>
//               </Tooltip>
//             </>
//           )}
//         </Space>
//       ),
//     },
//   ];

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   const tabItems = [
//     { key: 'all', label: 'All Sub-Payments', count: stats.total },
//     { key: 'pending_verification', label: 'Pending Verification', count: stats.pendingVerification },
//     { key: 'verified', label: 'Verified', count: stats.verified },
//     { key: 'under_review', label: 'Under Review', count: stats.underReview },
//     { key: 'rejected', label: 'Rejected', count: stats.rejected },
//   ];

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <ApartmentOutlined className="mr-3" />
//               Sub-Payment Status
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage installment and partial payment tracking
//             </Text>
//           </div>
//           <Button 
//             icon={<FilterOutlined />}
//             onClick={fetchSubPayments}
//             loading={loading}
//           >
//             Refresh
//           </Button>
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Sub-Payments"
//                 value={stats.total || 0}
//                 prefix={<FileTextOutlined />}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Pending Verification"
//                 value={stats.pendingVerification || 0}
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Verified Amount"
//                 value={stats.verifiedAmount || 0}
//                 prefix="৳"
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Completion Rate"
//                 value={stats.completionRate || 0}
//                 suffix="%"
//                 valueStyle={{ color: '#722ed1' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Progress Overview */}
//         {stats.installmentProgress && (
//           <Card title="Installment Progress Overview" className="mb-6">
//             <Row gutter={[16, 16]}>
//               <Col xs={24} sm={8}>
//                 <div className="text-center">
//                   <Progress
//                     type="circle"
//                     percent={Math.round((stats.installmentProgress.paid / stats.installmentProgress.total) * 100)}
//                     width={80}
//                   />
//                   <div className="mt-2">
//                     <Text strong>Overall Progress</Text>
//                   </div>
//                 </div>
//               </Col>
//               <Col xs={24} sm={16}>
//                 <Space direction="vertical" style={{ width: '100%' }}>
//                   <div>
//                     <div className="flex justify-between mb-1">
//                       <Text>Completed Installments</Text>
//                       <Text strong>{stats.installmentProgress.paid} / {stats.installmentProgress.total}</Text>
//                     </div>
//                     <Progress 
//                       percent={Math.round((stats.installmentProgress.paid / stats.installmentProgress.total) * 100)}
//                       status="active"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex justify-between mb-1">
//                       <Text>Pending Verification</Text>
//                       <Text strong>{stats.installmentProgress.pending}</Text>
//                     </div>
//                     <Progress 
//                       percent={Math.round((stats.installmentProgress.pending / stats.installmentProgress.total) * 100)}
//                       status="active"
//                       strokeColor="#faad14"
//                     />
//                   </div>
//                 </Space>
//               </Col>
//             </Row>
//           </Card>
//         )}

//         {/* Search and Tabs */}
//         <Card className="mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 mb-4">
//             <Input
//               placeholder="Search by reference ID or member..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               style={{ maxWidth: 400 }}
//               allowClear
//             />
//           </div>

//           <Tabs
//             activeKey={activeTab}
//             onChange={setActiveTab}
//             items={tabItems.map(tab => ({
//               key: tab.key,
//               label: (
//                 <span>
//                   {tab.label}
//                   {tab.count > 0 && (
//                     <Badge
//                       count={tab.count}
//                       style={{ marginLeft: 8 }}
//                       showZero={false}
//                     />
//                   )}
//                 </span>
//               ),
//             }))}
//           />
//         </Card>

//         {/* Sub-Payments Table */}
//         <Table
//           columns={columns}
//           dataSource={subPayments}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1200 }}
//           pagination={{ 
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) => 
//               `${range[0]}-${range[1]} of ${total} sub-payments`
//           }}
//         />

//         {/* Sub-Payment Detail Modal */}
//         <Modal
//           title="Sub-Payment Details"
//           open={detailModalVisible}
//           onCancel={() => setDetailModalVisible(false)}
//           footer={
//             selectedSubPayment?.status === 'pending_verification'
//               ? [
//                   <Button key="close" onClick={() => setDetailModalVisible(false)}>
//                     Close
//                   </Button>,
//                   <Button
//                     key="reject"
//                     danger
//                     onClick={() => {
//                       handleSubPaymentAction(selectedSubPayment._id, 'reject');
//                       setDetailModalVisible(false);
//                     }}
//                   >
//                     Reject
//                   </Button>,
//                   <Button
//                     key="verify"
//                     type="primary"
//                     onClick={() => {
//                       handleSubPaymentAction(selectedSubPayment._id, 'verify');
//                       setDetailModalVisible(false);
//                     }}
//                   >
//                     Verify
//                   </Button>,
//                 ]
//               : [
//                   <Button key="close" onClick={() => setDetailModalVisible(false)}>
//                     Close
//                   </Button>,
//                 ]
//           }
//           width={800}
//         >
//           {selectedSubPayment && (
//             <div className="space-y-6">
//               {/* Header */}
//               <div className="flex justify-between items-start">
//                 <div>
//                   <Title level={4} className="mb-1">
//                     Reference: {selectedSubPayment.referenceId}
//                   </Title>
//                   <Text type="secondary">
//                     Type: {selectedSubPayment.type === 'installment' ? 'Installment' : 'Partial Payment'}
//                   </Text>
//                 </div>
//                 <Space>
//                   {getSubPaymentStatusTag(selectedSubPayment.status)}
//                   {getPriorityTag(selectedSubPayment.priority)}
//                 </Space>
//               </div>

//               <Divider />

//               {/* Basic Information */}
//               <Descriptions bordered column={2}>
//                 <Descriptions.Item label="Member">
//                   <div className="flex items-center">
//                     <Avatar src={selectedSubPayment.member?.image} icon={<UserOutlined />} className="mr-2" />
//                     <div>
//                       <div>{`${selectedSubPayment.member?.firstName} ${selectedSubPayment.member?.lastName}`}</div>
//                       <div className="text-xs text-gray-500">{selectedSubPayment.member?.membershipId}</div>
//                     </div>
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Amount">
//                   <Text strong>৳{selectedSubPayment.amount?.toLocaleString()}</Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Parent Payment">
//                   {selectedSubPayment.parentPayment ? (
//                     <div>
//                       <div>{selectedSubPayment.parentPayment.transactionId}</div>
//                       <div className="text-xs text-gray-500">
//                         ৳{selectedSubPayment.parentPayment.amount?.toLocaleString()}
//                       </div>
//                     </div>
//                   ) : (
//                     'N/A'
//                   )}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Payment Method">
//                   {getPaymentMethodTag(selectedSubPayment.paymentMethod)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Due Date">
//                   {selectedSubPayment.dueDate ? 
//                     dayjs(selectedSubPayment.dueDate).format('MMMM D, YYYY') : 
//                     'Not Set'
//                   }
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Installment Number">
//                   {selectedSubPayment.installmentNumber ? 
//                     `${selectedSubPayment.installmentNumber} of ${selectedSubPayment.totalInstallments}` : 
//                     'N/A'
//                   }
//                 </Descriptions.Item>
//               </Descriptions>

//               {/* Payment Details */}
//               {selectedSubPayment.paymentDetails && (
//                 <>
//                   <Title level={5}>Payment Details</Title>
//                   <Descriptions bordered column={2} size="small">
//                     <Descriptions.Item label="Transaction Date">
//                       {dayjs(selectedSubPayment.paymentDetails.transactionDate).format('MMMM D, YYYY')}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Reference Number">
//                       {selectedSubPayment.paymentDetails.referenceNumber}
//                     </Descriptions.Item>
//                     {selectedSubPayment.paymentDetails.bankName && (
//                       <Descriptions.Item label="Bank Name">
//                         {selectedSubPayment.paymentDetails.bankName}
//                       </Descriptions.Item>
//                     )}
//                     {selectedSubPayment.paymentDetails.senderNumber && (
//                       <Descriptions.Item label="Sender Number">
//                         {selectedSubPayment.paymentDetails.senderNumber}
//                       </Descriptions.Item>
//                     )}
//                   </Descriptions>
//                 </>
//               )}

//               {/* Verification History */}
//               {selectedSubPayment.verificationHistory && selectedSubPayment.verificationHistory.length > 0 && (
//                 <>
//                   <Title level={5}>Verification History</Title>
//                   <div className="space-y-2">
//                     {selectedSubPayment.verificationHistory.map((verification, index) => (
//                       <div key={index} className="p-2 border rounded">
//                         <div className="flex justify-between">
//                           <Text strong>{verification.action}</Text>
//                           <Text type="secondary">
//                             {dayjs(verification.timestamp).format('MMM D, YYYY HH:mm')}
//                           </Text>
//                         </div>
//                         {verification.verifiedBy && (
//                           <Text type="secondary">
//                             By: {verification.verifiedBy.firstName} {verification.verifiedBy.lastName}
//                           </Text>
//                         )}
//                         {verification.notes && (
//                           <Text className="block mt-1">{verification.notes}</Text>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}

//               {/* Notes */}
//               {selectedSubPayment.notes && (
//                 <>
//                   <Title level={5}>Additional Notes</Title>
//                   <div className="p-3 bg-gray-50 rounded">
//                     <Text>{selectedSubPayment.notes}</Text>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default SubPaymentStatus;




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
//   Select,
//   message,
//   Row,
//   Col,
//   Statistic,
//   Descriptions,
//   Divider,
//   Tabs,
//   Progress,
//   Badge,
//   Tooltip,
//   Alert,
// } from 'antd';
// import {
//   SearchOutlined,
//   FilterOutlined,
//   EyeOutlined,
//   UserOutlined,
//   ApartmentOutlined,
//   FileTextOutlined,
//   ExclamationCircleOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TabPane } = Tabs;

// const SubPaymentStatus = () => {
//   const [subPayments, setSubPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedSubPayment, setSelectedSubPayment] = useState(null);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [activeTab, setActiveTab] = useState('all');
//   const [stats, setStats] = useState({});
  
//   const currentUser = useSelector(state => state.user?.value);
//   const currentTheme = useSelector(state => state.theme?.currentTheme || 'light');

//   // Enhanced role checking
//   const hasAccess = currentUser && (
//     currentUser.role === 'admin' || 
//     currentUser.role === 'FinanceSecretary' ||
//     currentUser.currentRole === 'admin' ||
//     currentUser.currentRole === 'FinanceSecretary' ||
//     currentUser.roles?.includes('admin') ||
//     currentUser.roles?.includes('FinanceSecretary')
//   );

//   useEffect(() => {
//     if (hasAccess) {
//       fetchSubPayments();
//       fetchSubPaymentStats();
//     }
//   }, [searchText, activeTab, hasAccess]);

//   const fetchSubPayments = async () => {
//     if (!hasAccess) return;
    
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = {
//         search: searchText,
//         status: activeTab === 'all' ? '' : activeTab,
//       };

//       const response = await axios.get('http://localhost:3000/api/v1/payments/subpayment-status', {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//       });

//       if (response.data.success) {
//         setSubPayments(response.data.subPayments || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch sub-payments');
//       console.error('Error fetching sub-payments:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubPaymentStats = async () => {
//     if (!hasAccess) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/payments/subpayment-status/stats', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch sub-payment stats:', error);
//     }
//   };

//   const handleSubPaymentAction = async (subPaymentId, action) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:3000/api/v1/payments/subpayment-status/${subPaymentId}`,
//         { action },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success(`Sub-payment ${action} successfully`);
//         fetchSubPayments();
//         fetchSubPaymentStats();
//       }
//     } catch (error) {
//       message.error('Failed to update sub-payment');
//       console.error('Error updating sub-payment:', error);
//     }
//   };

//   const getSubPaymentStatusTag = (status) => {
//     const statusConfig = {
//       pending_verification: { color: 'orange', text: 'Pending Verification' },
//       verified: { color: 'green', text: 'Verified' },
//       under_review: { color: 'blue', text: 'Under Review' },
//       rejected: { color: 'red', text: 'Rejected' },
//       partially_paid: { color: 'yellow', text: 'Partially Paid' },
//       completed: { color: 'cyan', text: 'Completed' },
//     };

//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getPaymentMethodTag = (method) => {
//     const methodConfig = {
//       bank: { color: 'blue', text: 'Bank Transfer' },
//       bkash: { color: 'purple', text: 'bKash' },
//       nagad: { color: 'green', text: 'Nagad' },
//       rocket: { color: 'orange', text: 'Rocket' },
//       cash: { color: 'cyan', text: 'Cash' },
//     };

//     const config = methodConfig[method?.toLowerCase()] || { color: 'default', text: method };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getPriorityTag = (priority) => {
//     const priorityConfig = {
//       high: { color: 'red', text: 'High' },
//       medium: { color: 'orange', text: 'Medium' },
//       low: { color: 'green', text: 'Low' },
//     };

//     const config = priorityConfig[priority] || { color: 'default', text: priority };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const columns = [
//     {
//       title: 'Sub-Payment Info',
//       dataIndex: 'referenceId',
//       key: 'subPaymentInfo',
//       render: (referenceId, record) => (
//         <div>
//           <div className="font-medium">{referenceId}</div>
//           <div className="text-xs text-gray-500">
//             Parent: {record.parentPayment?.transactionId}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Member',
//       dataIndex: 'member',
//       key: 'member',
//       render: (member) => (
//         <Space>
//           <Avatar size="small" src={member?.image} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium text-sm">
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
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       render: (amount, record) => (
//         <div>
//           <Text strong>৳{amount?.toLocaleString()}</Text>
//           {record.parentPayment && (
//             <div className="text-xs text-gray-500">
//               of ৳{record.parentPayment.amount?.toLocaleString()}
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//       render: (type) => (
//         <Tag color={type === 'installment' ? 'blue' : 'purple'}>
//           {type === 'installment' ? 'Installment' : 'Partial Payment'}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Priority',
//       dataIndex: 'priority',
//       key: 'priority',
//       render: (priority) => getPriorityTag(priority),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getSubPaymentStatusTag(status),
//     },
//     {
//       title: 'Due Date',
//       dataIndex: 'dueDate',
//       key: 'dueDate',
//       render: (date) => date ? dayjs(date).format('MMM D, YYYY') : '-',
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
//               size="small"
//               onClick={() => {
//                 setSelectedSubPayment(record);
//                 setDetailModalVisible(true);
//               }}
//             />
//           </Tooltip>
//           {record.status === 'pending_verification' && (
//             <>
//               <Tooltip title="Verify">
//                 <Button
//                   type="link"
//                   size="small"
//                   onClick={() => handleSubPaymentAction(record._id, 'verify')}
//                 >
//                   Verify
//                 </Button>
//               </Tooltip>
//               <Tooltip title="Reject">
//                 <Button
//                   type="link"
//                   danger
//                   size="small"
//                   onClick={() => handleSubPaymentAction(record._id, 'reject')}
//                 >
//                   Reject
//                 </Button>
//               </Tooltip>
//             </>
//           )}
//         </Space>
//       ),
//     },
//   ];

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   const tabItems = [
//     { key: 'all', label: 'All Sub-Payments', count: stats.total },
//     { key: 'pending_verification', label: 'Pending Verification', count: stats.pendingVerification },
//     { key: 'verified', label: 'Verified', count: stats.verified },
//     { key: 'under_review', label: 'Under Review', count: stats.underReview },
//     { key: 'rejected', label: 'Rejected', count: stats.rejected },
//   ];

//   if (!hasAccess) {
//     return (
//       <div className="min-h-screen p-4">
//         <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//           <div className="text-center p-8">
//             <ExclamationCircleOutlined style={{ fontSize: 48, color: '#faad14' }} />
//             <Title level={3} className="mt-4">Access Denied</Title>
//             <Alert
//               message="Role Access Issue"
//               description={
//                 <div>
//                   <p>Your current role: <strong>{currentUser?.role || currentUser?.currentRole || 'No role found'}</strong></p>
//                   <p>Required roles: Admin or Finance Secretary</p>
//                 </div>
//               }
//               type="warning"
//               showIcon
//               className="mt-4 text-left"
//             />
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <ApartmentOutlined className="mr-3" />
//               Sub-Payment Status
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage installment and partial payment tracking
//             </Text>
//             <div className="mt-2">
//               <Tag color="blue">Logged in as: {currentUser?.role || currentUser?.currentRole}</Tag>
//             </div>
//           </div>
//           <Button 
//             icon={<FilterOutlined />}
//             onClick={fetchSubPayments}
//             loading={loading}
//           >
//             Refresh
//           </Button>
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Sub-Payments"
//                 value={stats.total || 0}
//                 prefix={<FileTextOutlined />}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Pending Verification"
//                 value={stats.pendingVerification || 0}
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Verified Amount"
//                 value={stats.verifiedAmount || 0}
//                 prefix="৳"
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Completion Rate"
//                 value={stats.completionRate || 0}
//                 suffix="%"
//                 valueStyle={{ color: '#722ed1' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Progress Overview */}
//         {stats.installmentProgress && (
//           <Card title="Installment Progress Overview" className="mb-6">
//             <Row gutter={[16, 16]}>
//               <Col xs={24} sm={8}>
//                 <div className="text-center">
//                   <Progress
//                     type="circle"
//                     percent={Math.round((stats.installmentProgress.paid / stats.installmentProgress.total) * 100)}
//                     width={80}
//                   />
//                   <div className="mt-2">
//                     <Text strong>Overall Progress</Text>
//                   </div>
//                 </div>
//               </Col>
//               <Col xs={24} sm={16}>
//                 <Space direction="vertical" style={{ width: '100%' }}>
//                   <div>
//                     <div className="flex justify-between mb-1">
//                       <Text>Completed Installments</Text>
//                       <Text strong>{stats.installmentProgress.paid} / {stats.installmentProgress.total}</Text>
//                     </div>
//                     <Progress 
//                       percent={Math.round((stats.installmentProgress.paid / stats.installmentProgress.total) * 100)}
//                       status="active"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex justify-between mb-1">
//                       <Text>Pending Verification</Text>
//                       <Text strong>{stats.installmentProgress.pending}</Text>
//                     </div>
//                     <Progress 
//                       percent={Math.round((stats.installmentProgress.pending / stats.installmentProgress.total) * 100)}
//                       status="active"
//                       strokeColor="#faad14"
//                     />
//                   </div>
//                 </Space>
//               </Col>
//             </Row>
//           </Card>
//         )}

//         {/* Search and Tabs */}
//         <Card className="mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 mb-4">
//             <Input
//               placeholder="Search by reference ID or member..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               style={{ maxWidth: 400 }}
//               allowClear
//             />
//           </div>

//           <Tabs
//             activeKey={activeTab}
//             onChange={setActiveTab}
//             items={tabItems.map(tab => ({
//               key: tab.key,
//               label: (
//                 <span>
//                   {tab.label}
//                   {tab.count > 0 && (
//                     <Badge
//                       count={tab.count}
//                       style={{ marginLeft: 8 }}
//                       showZero={false}
//                     />
//                   )}
//                 </span>
//               ),
//             }))}
//           />
//         </Card>

//         {/* Sub-Payments Table */}
//         <Table
//           columns={columns}
//           dataSource={subPayments}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1200 }}
//           pagination={{ 
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) => 
//               `${range[0]}-${range[1]} of ${total} sub-payments`
//           }}
//         />

//         {/* Sub-Payment Detail Modal */}
//         <Modal
//           title="Sub-Payment Details"
//           open={detailModalVisible}
//           onCancel={() => setDetailModalVisible(false)}
//           footer={
//             selectedSubPayment?.status === 'pending_verification'
//               ? [
//                   <Button key="close" onClick={() => setDetailModalVisible(false)}>
//                     Close
//                   </Button>,
//                   <Button
//                     key="reject"
//                     danger
//                     onClick={() => {
//                       handleSubPaymentAction(selectedSubPayment._id, 'reject');
//                       setDetailModalVisible(false);
//                     }}
//                   >
//                     Reject
//                   </Button>,
//                   <Button
//                     key="verify"
//                     type="primary"
//                     onClick={() => {
//                       handleSubPaymentAction(selectedSubPayment._id, 'verify');
//                       setDetailModalVisible(false);
//                     }}
//                   >
//                     Verify
//                   </Button>,
//                 ]
//               : [
//                   <Button key="close" onClick={() => setDetailModalVisible(false)}>
//                     Close
//                   </Button>,
//                 ]
//           }
//           width={800}
//         >
//           {selectedSubPayment && (
//             <div className="space-y-6">
//               {/* Header */}
//               <div className="flex justify-between items-start">
//                 <div>
//                   <Title level={4} className="mb-1">
//                     Reference: {selectedSubPayment.referenceId}
//                   </Title>
//                   <Text type="secondary">
//                     Type: {selectedSubPayment.type === 'installment' ? 'Installment' : 'Partial Payment'}
//                   </Text>
//                 </div>
//                 <Space>
//                   {getSubPaymentStatusTag(selectedSubPayment.status)}
//                   {getPriorityTag(selectedSubPayment.priority)}
//                 </Space>
//               </div>

//               <Divider />

//               {/* Basic Information */}
//               <Descriptions bordered column={2}>
//                 <Descriptions.Item label="Member">
//                   <div className="flex items-center">
//                     <Avatar src={selectedSubPayment.member?.image} icon={<UserOutlined />} className="mr-2" />
//                     <div>
//                       <div>{`${selectedSubPayment.member?.firstName} ${selectedSubPayment.member?.lastName}`}</div>
//                       <div className="text-xs text-gray-500">{selectedSubPayment.member?.membershipId}</div>
//                     </div>
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Amount">
//                   <Text strong>৳{selectedSubPayment.amount?.toLocaleString()}</Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Parent Payment">
//                   {selectedSubPayment.parentPayment ? (
//                     <div>
//                       <div>{selectedSubPayment.parentPayment.transactionId}</div>
//                       <div className="text-xs text-gray-500">
//                         ৳{selectedSubPayment.parentPayment.amount?.toLocaleString()}
//                       </div>
//                     </div>
//                   ) : (
//                     'N/A'
//                   )}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Payment Method">
//                   {getPaymentMethodTag(selectedSubPayment.paymentMethod)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Due Date">
//                   {selectedSubPayment.dueDate ? 
//                     dayjs(selectedSubPayment.dueDate).format('MMMM D, YYYY') : 
//                     'Not Set'
//                   }
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Installment Number">
//                   {selectedSubPayment.installmentNumber ? 
//                     `${selectedSubPayment.installmentNumber} of ${selectedSubPayment.totalInstallments}` : 
//                     'N/A'
//                   }
//                 </Descriptions.Item>
//               </Descriptions>

//               {/* Payment Details */}
//               {selectedSubPayment.paymentDetails && (
//                 <>
//                   <Title level={5}>Payment Details</Title>
//                   <Descriptions bordered column={2} size="small">
//                     <Descriptions.Item label="Transaction Date">
//                       {dayjs(selectedSubPayment.paymentDetails.transactionDate).format('MMMM D, YYYY')}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Reference Number">
//                       {selectedSubPayment.paymentDetails.referenceNumber}
//                     </Descriptions.Item>
//                     {selectedSubPayment.paymentDetails.bankName && (
//                       <Descriptions.Item label="Bank Name">
//                         {selectedSubPayment.paymentDetails.bankName}
//                       </Descriptions.Item>
//                     )}
//                     {selectedSubPayment.paymentDetails.senderNumber && (
//                       <Descriptions.Item label="Sender Number">
//                         {selectedSubPayment.paymentDetails.senderNumber}
//                       </Descriptions.Item>
//                     )}
//                   </Descriptions>
//                 </>
//               )}

//               {/* Verification History */}
//               {selectedSubPayment.verificationHistory && selectedSubPayment.verificationHistory.length > 0 && (
//                 <>
//                   <Title level={5}>Verification History</Title>
//                   <div className="space-y-2">
//                     {selectedSubPayment.verificationHistory.map((verification, index) => (
//                       <div key={index} className="p-2 border rounded">
//                         <div className="flex justify-between">
//                           <Text strong>{verification.action}</Text>
//                           <Text type="secondary">
//                             {dayjs(verification.timestamp).format('MMM D, YYYY HH:mm')}
//                           </Text>
//                         </div>
//                         {verification.verifiedBy && (
//                           <Text type="secondary">
//                             By: {verification.verifiedBy.firstName} {verification.verifiedBy.lastName}
//                           </Text>
//                         )}
//                         {verification.notes && (
//                           <Text className="block mt-1">{verification.notes}</Text>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}

//               {/* Notes */}
//               {selectedSubPayment.notes && (
//                 <>
//                   <Title level={5}>Additional Notes</Title>
//                   <div className="p-3 bg-gray-50 rounded">
//                     <Text>{selectedSubPayment.notes}</Text>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default SubPaymentStatus;








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
  Select,
  message,
  Row,
  Col,
  Statistic,
  Descriptions,
  Divider,
  Tabs,
  Progress,
  Badge,
  Tooltip,
  Alert,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  UserOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const SubPaymentStatus = () => {
  const [subPayments, setSubPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubPayment, setSelectedSubPayment] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState({});
  
  const currentUser = useSelector(state => state.user?.value);
  const currentTheme = useSelector(state => state.theme?.currentTheme || 'light');

  // FIXED: Case-insensitive role checking
  const hasAccess = currentUser && (
    // Check role property (case-insensitive)
    ['admin', 'financesecretary'].includes(currentUser.role?.toLowerCase()) ||
    // Check currentRole property (case-insensitive)
    ['admin', 'financesecretary'].includes(currentUser.currentRole?.toLowerCase()) ||
    // Check roles array (case-insensitive)
    (Array.isArray(currentUser.roles) && 
     currentUser.roles.some(role => 
       ['admin', 'financesecretary'].includes(role?.toLowerCase())
     )) ||
    // Additional checks for common variations
    currentUser.role === 'Admin' ||
    currentUser.currentRole === 'Admin' ||
    currentUser.role === 'Finance Secretary' ||
    currentUser.currentRole === 'Finance Secretary'
  );

  console.log('SubPayment Access Debug:', {
    userRole: currentUser?.role,
    currentRole: currentUser?.currentRole,
    roles: currentUser?.roles,
    hasAccess: hasAccess
  });

  useEffect(() => {
    if (hasAccess) {
      fetchSubPayments();
      fetchSubPaymentStats();
    }
  }, [searchText, activeTab, hasAccess]);

  const fetchSubPayments = async () => {
    if (!hasAccess) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {
        search: searchText,
        status: activeTab === 'all' ? '' : activeTab,
      };

      const response = await axios.get('http://localhost:3000/api/v1/payments/subpayment-status', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (response.data.success) {
        setSubPayments(response.data.subPayments || []);
      }
    } catch (error) {
      message.error('Failed to fetch sub-payments');
      console.error('Error fetching sub-payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubPaymentStats = async () => {
    if (!hasAccess) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/payments/subpayment-status/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setStats(response.data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch sub-payment stats:', error);
    }
  };

  const handleSubPaymentAction = async (subPaymentId, action) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/v1/payments/subpayment-status/${subPaymentId}`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success(`Sub-payment ${action} successfully`);
        fetchSubPayments();
        fetchSubPaymentStats();
      }
    } catch (error) {
      message.error('Failed to update sub-payment');
      console.error('Error updating sub-payment:', error);
    }
  };

  const getSubPaymentStatusTag = (status) => {
    const statusConfig = {
      pending_verification: { color: 'orange', text: 'Pending Verification' },
      verified: { color: 'green', text: 'Verified' },
      under_review: { color: 'blue', text: 'Under Review' },
      rejected: { color: 'red', text: 'Rejected' },
      partially_paid: { color: 'yellow', text: 'Partially Paid' },
      completed: { color: 'cyan', text: 'Completed' },
    };

    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPaymentMethodTag = (method) => {
    const methodConfig = {
      bank: { color: 'blue', text: 'Bank Transfer' },
      bkash: { color: 'purple', text: 'bKash' },
      nagad: { color: 'green', text: 'Nagad' },
      rocket: { color: 'orange', text: 'Rocket' },
      cash: { color: 'cyan', text: 'Cash' },
    };

    const config = methodConfig[method?.toLowerCase()] || { color: 'default', text: method };
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
      title: 'Sub-Payment Info',
      dataIndex: 'referenceId',
      key: 'subPaymentInfo',
      render: (referenceId, record) => (
        <div>
          <div className="font-medium">{referenceId}</div>
          <div className="text-xs text-gray-500">
            Parent: {record.parentPayment?.transactionId}
          </div>
        </div>
      ),
    },
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member',
      render: (member) => (
        <Space>
          <Avatar size="small" src={member?.image} icon={<UserOutlined />} />
          <div>
            <div className="font-medium text-sm">
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <div>
          <Text strong>৳{amount?.toLocaleString()}</Text>
          {record.parentPayment && (
            <div className="text-xs text-gray-500">
              of ৳{record.parentPayment.amount?.toLocaleString()}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'installment' ? 'blue' : 'purple'}>
          {type === 'installment' ? 'Installment' : 'Partial Payment'}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => getPriorityTag(priority),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getSubPaymentStatusTag(status),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => date ? dayjs(date).format('MMM D, YYYY') : '-',
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
              size="small"
              onClick={() => {
                setSelectedSubPayment(record);
                setDetailModalVisible(true);
              }}
            />
          </Tooltip>
          {record.status === 'pending_verification' && (
            <>
              <Tooltip title="Verify">
                <Button
                  type="link"
                  size="small"
                  onClick={() => handleSubPaymentAction(record._id, 'verify')}
                >
                  Verify
                </Button>
              </Tooltip>
              <Tooltip title="Reject">
                <Button
                  type="link"
                  danger
                  size="small"
                  onClick={() => handleSubPaymentAction(record._id, 'reject')}
                >
                  Reject
                </Button>
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const tabItems = [
    { key: 'all', label: 'All Sub-Payments', count: stats.total },
    { key: 'pending_verification', label: 'Pending Verification', count: stats.pendingVerification },
    { key: 'verified', label: 'Verified', count: stats.verified },
    { key: 'under_review', label: 'Under Review', count: stats.underReview },
    { key: 'rejected', label: 'Rejected', count: stats.rejected },
  ];

  if (!hasAccess) {
    return (
      <div className="min-h-screen p-4">
        <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
          <div className="text-center p-8">
            <ExclamationCircleOutlined style={{ fontSize: 48, color: '#faad14' }} />
            <Title level={3} className="mt-4">Access Denied</Title>
            <Alert
              message="Role Access Issue"
              description={
                <div>
                  <p>Your current role: <strong>{currentUser?.role || currentUser?.currentRole || 'No role found'}</strong></p>
                  <p>Required roles: Admin or Finance Secretary</p>
                  <div className="mt-3 p-3 bg-gray-100 rounded text-left">
                    <Text strong>Debug Information:</Text>
                    <pre className="text-xs mt-2">
                      {JSON.stringify({
                        userRole: currentUser?.role,
                        currentRole: currentUser?.currentRole,
                        roles: currentUser?.roles,
                        hasAccess: hasAccess
                      }, null, 2)}
                    </pre>
                  </div>
                </div>
              }
              type="warning"
              showIcon
              className="mt-4 text-left"
            />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <ApartmentOutlined className="mr-3" />
              Sub-Payment Status
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Manage installment and partial payment tracking
            </Text>
            <div className="mt-2">
              <Tag color="green">Access Granted: {currentUser?.role || currentUser?.currentRole}</Tag>
            </div>
          </div>
          <Button 
            icon={<FilterOutlined />}
            onClick={fetchSubPayments}
            loading={loading}
          >
            Refresh
          </Button>
        </div>

        {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Sub-Payments"
                value={stats.total || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Pending Verification"
                value={stats.pendingVerification || 0}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Verified Amount"
                value={stats.verifiedAmount || 0}
                prefix="৳"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Completion Rate"
                value={stats.completionRate || 0}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Progress Overview */}
        {stats.installmentProgress && (
          <Card title="Installment Progress Overview" className="mb-6">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={Math.round((stats.installmentProgress.paid / stats.installmentProgress.total) * 100)}
                    width={80}
                  />
                  <div className="mt-2">
                    <Text strong>Overall Progress</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={16}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Completed Installments</Text>
                      <Text strong>{stats.installmentProgress.paid} / {stats.installmentProgress.total}</Text>
                    </div>
                    <Progress 
                      percent={Math.round((stats.installmentProgress.paid / stats.installmentProgress.total) * 100)}
                      status="active"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text>Pending Verification</Text>
                      <Text strong>{stats.installmentProgress.pending}</Text>
                    </div>
                    <Progress 
                      percent={Math.round((stats.installmentProgress.pending / stats.installmentProgress.total) * 100)}
                      status="active"
                      strokeColor="#faad14"
                    />
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        )}

        {/* Search and Tabs */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              placeholder="Search by reference ID or member..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
              allowClear
            />
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems.map(tab => ({
              key: tab.key,
              label: (
                <span>
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge
                      count={tab.count}
                      style={{ marginLeft: 8 }}
                      showZero={false}
                    />
                  )}
                </span>
              ),
            }))}
          />
        </Card>

        {/* Sub-Payments Table */}
        <Table
          columns={columns}
          dataSource={subPayments}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1200 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} sub-payments`
          }}
        />

        {/* Sub-Payment Detail Modal */}
        <Modal
          title="Sub-Payment Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={
            selectedSubPayment?.status === 'pending_verification'
              ? [
                  <Button key="close" onClick={() => setDetailModalVisible(false)}>
                    Close
                  </Button>,
                  <Button
                    key="reject"
                    danger
                    onClick={() => {
                      handleSubPaymentAction(selectedSubPayment._id, 'reject');
                      setDetailModalVisible(false);
                    }}
                  >
                    Reject
                  </Button>,
                  <Button
                    key="verify"
                    type="primary"
                    onClick={() => {
                      handleSubPaymentAction(selectedSubPayment._id, 'verify');
                      setDetailModalVisible(false);
                    }}
                  >
                    Verify
                  </Button>,
                ]
              : [
                  <Button key="close" onClick={() => setDetailModalVisible(false)}>
                    Close
                  </Button>,
                ]
          }
          width={800}
        >
          {selectedSubPayment && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <Title level={4} className="mb-1">
                    Reference: {selectedSubPayment.referenceId}
                  </Title>
                  <Text type="secondary">
                    Type: {selectedSubPayment.type === 'installment' ? 'Installment' : 'Partial Payment'}
                  </Text>
                </div>
                <Space>
                  {getSubPaymentStatusTag(selectedSubPayment.status)}
                  {getPriorityTag(selectedSubPayment.priority)}
                </Space>
              </div>

              <Divider />

              {/* Basic Information */}
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Member">
                  <div className="flex items-center">
                    <Avatar src={selectedSubPayment.member?.image} icon={<UserOutlined />} className="mr-2" />
                    <div>
                      <div>{`${selectedSubPayment.member?.firstName} ${selectedSubPayment.member?.lastName}`}</div>
                      <div className="text-xs text-gray-500">{selectedSubPayment.member?.membershipId}</div>
                    </div>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Amount">
                  <Text strong>৳{selectedSubPayment.amount?.toLocaleString()}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Parent Payment">
                  {selectedSubPayment.parentPayment ? (
                    <div>
                      <div>{selectedSubPayment.parentPayment.transactionId}</div>
                      <div className="text-xs text-gray-500">
                        ৳{selectedSubPayment.parentPayment.amount?.toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Method">
                  {getPaymentMethodTag(selectedSubPayment.paymentMethod)}
                </Descriptions.Item>
                <Descriptions.Item label="Due Date">
                  {selectedSubPayment.dueDate ? 
                    dayjs(selectedSubPayment.dueDate).format('MMMM D, YYYY') : 
                    'Not Set'
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Installment Number">
                  {selectedSubPayment.installmentNumber ? 
                    `${selectedSubPayment.installmentNumber} of ${selectedSubPayment.totalInstallments}` : 
                    'N/A'
                  }
                </Descriptions.Item>
              </Descriptions>

              {/* Payment Details */}
              {selectedSubPayment.paymentDetails && (
                <>
                  <Title level={5}>Payment Details</Title>
                  <Descriptions bordered column={2} size="small">
                    <Descriptions.Item label="Transaction Date">
                      {dayjs(selectedSubPayment.paymentDetails.transactionDate).format('MMMM D, YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Reference Number">
                      {selectedSubPayment.paymentDetails.referenceNumber}
                    </Descriptions.Item>
                    {selectedSubPayment.paymentDetails.bankName && (
                      <Descriptions.Item label="Bank Name">
                        {selectedSubPayment.paymentDetails.bankName}
                      </Descriptions.Item>
                    )}
                    {selectedSubPayment.paymentDetails.senderNumber && (
                      <Descriptions.Item label="Sender Number">
                        {selectedSubPayment.paymentDetails.senderNumber}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </>
              )}

              {/* Verification History */}
              {selectedSubPayment.verificationHistory && selectedSubPayment.verificationHistory.length > 0 && (
                <>
                  <Title level={5}>Verification History</Title>
                  <div className="space-y-2">
                    {selectedSubPayment.verificationHistory.map((verification, index) => (
                      <div key={index} className="p-2 border rounded">
                        <div className="flex justify-between">
                          <Text strong>{verification.action}</Text>
                          <Text type="secondary">
                            {dayjs(verification.timestamp).format('MMM D, YYYY HH:mm')}
                          </Text>
                        </div>
                        {verification.verifiedBy && (
                          <Text type="secondary">
                            By: {verification.verifiedBy.firstName} {verification.verifiedBy.lastName}
                          </Text>
                        )}
                        {verification.notes && (
                          <Text className="block mt-1">{verification.notes}</Text>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Notes */}
              {selectedSubPayment.notes && (
                <>
                  <Title level={5}>Additional Notes</Title>
                  <div className="p-3 bg-gray-50 rounded">
                    <Text>{selectedSubPayment.notes}</Text>
                  </div>
                </>
              )}
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default SubPaymentStatus;





