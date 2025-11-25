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
//   Progress,
//   Badge,
//   Tooltip,
//   Timeline,
// } from 'antd';
// import {
//   CheckCircleOutlined,
//   SearchOutlined,
//   FilterOutlined,
//   EyeOutlined,
//   UserOutlined,
//   DollarOutlined,
//   ClockCircleOutlined,
//   CloseCircleOutlined,
//   SyncOutlined,
//   FileTextOutlined,
//   BarChartOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const PaymentStatus = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [filters, setFilters] = useState({});
//   const [dateRange, setDateRange] = useState([]);
//   const [stats, setStats] = useState({});
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     fetchPayments();
//     fetchPaymentStats();
//   }, [searchText, filters, dateRange]);

//   const fetchPayments = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = {
//         search: searchText,
//         ...filters,
//       };

//       if (dateRange && dateRange.length === 2) {
//         params.startDate = dateRange[0].format('YYYY-MM-DD');
//         params.endDate = dateRange[1].format('YYYY-MM-DD');
//       }

//       const response = await axios.get('http://localhost:3000/api/v1/payment/allpayment', {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//       });

//       if (response.data.success) {
//         setPayments(response.data.payments || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPaymentStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/payment/stats', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch payment stats');
//     }
//   };

//   const handleStatusUpdate = async (paymentId, newStatus) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:3000/api/v1/payments/stats/${paymentId}`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success(`Payment status updated to ${newStatus}`);
//         fetchPayments();
//         fetchPaymentStats();
//       }
//     } catch (error) {
//       message.error('Failed to update payment status');
//     }
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
//       processing: { color: 'blue', icon: <SyncOutlined spin />, text: 'Processing' },
//       completed: { color: 'green', icon: <CheckCircleOutlined />, text: 'Completed' },
//       failed: { color: 'red', icon: <CloseCircleOutlined />, text: 'Failed' },
//       refunded: { color: 'purple', text: 'Refunded' },
//       cancelled: { color: 'default', text: 'Cancelled' },
//     };

//     const config = statusConfig[status] || { color: 'default', text: status };
//     return (
//       <Tag color={config.color} icon={config.icon}>
//         {config.text}
//       </Tag>
//     );
//   };

//   const getPaymentMethodTag = (method) => {
//     const methodConfig = {
//       bank: { color: 'blue', text: 'Bank Transfer' },
//       bKash: { color: 'purple', text: 'bKash' },
//       nagad: { color: 'green', text: 'Nagad' },
//       rocket: { color: 'orange', text: 'Rocket' },
//       cash: { color: 'cyan', text: 'Cash' },
//       card: { color: 'gold', text: 'Card' },
//       online: { color: 'magenta', text: 'Online' },
//     };

//     const config = methodConfig[method?.toLowerCase()] || { color: 'default', text: method };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getPaymentTypeTag = (type) => {
//     const typeConfig = {
//       subscription: { color: 'blue', text: 'Subscription' },
//       due: { color: 'orange', text: 'Due Payment' },
//       fine: { color: 'red', text: 'Fine' },
//       donation: { color: 'green', text: 'Donation' },
//       other: { color: 'default', text: 'Other' },
//     };

//     const config = typeConfig[type] || { color: 'default', text: type };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const columns = [
//     {
//       title: 'Payment Info',
//       dataIndex: 'transactionId',
//       key: 'paymentInfo',
//       render: (transactionId, record) => (
//         <div>
//           <div className="font-medium">{transactionId}</div>
//           <div className="text-xs text-gray-500">
//             {dayjs(record.createdAt).format('MMM D, YYYY HH:mm')}
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
//           <div className="text-xs text-gray-500">
//             {record.currency}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Type',
//       dataIndex: 'paymentType',
//       key: 'paymentType',
//       render: (type) => getPaymentTypeTag(type),
//     },
//     {
//       title: 'Method',
//       dataIndex: 'paymentMethod',
//       key: 'paymentMethod',
//       render: (method) => getPaymentMethodTag(method),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status, record) => (
//         <DropdownStatus 
//           status={status} 
//           paymentId={record._id}
//           onStatusUpdate={handleStatusUpdate}
//         />
//       ),
//     },
//     {
//       title: 'Paid Date',
//       dataIndex: 'paidAt',
//       key: 'paidAt',
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
//                 setSelectedPayment(record);
//                 setDetailModalVisible(true);
//               }}
//             />
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   // Dropdown component for status updates
//   const DropdownStatus = ({ status, paymentId, onStatusUpdate }) => {
//     const [loading, setLoading] = useState(false);

//     const handleStatusChange = async (newStatus) => {
//       setLoading(true);
//       await onStatusUpdate(paymentId, newStatus);
//       setLoading(false);
//     };

//     const statusOptions = [
//       { value: 'pending', label: 'Pending', color: 'orange' },
//       { value: 'processing', label: 'Processing', color: 'blue' },
//       { value: 'completed', label: 'Completed', color: 'green' },
//       { value: 'failed', label: 'Failed', color: 'red' },
//       { value: 'refunded', label: 'Refunded', color: 'purple' },
//     ];

//     return (
//       <Select
//         value={status}
//         onChange={handleStatusChange}
//         loading={loading}
//         size="small"
//         style={{ width: 120 }}
//         dropdownMatchSelectWidth={false}
//       >
//         {statusOptions.map(option => (
//           <Option key={option.value} value={option.value}>
//             <Tag color={option.color} style={{ margin: 0 }}>
//               {option.label}
//             </Tag>
//           </Option>
//         ))}
//       </Select>
//     );
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
//               <CheckCircleOutlined className="mr-3" />
//               Payment Status
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Monitor and manage all payment transactions
//             </Text>
//           </div>
//           <Button 
//             icon={<FilterOutlined />}
//             onClick={fetchPayments}
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
//                 title="Total Payments"
//                 value={stats.totalPayments || 0}
//                 prefix={<FileTextOutlined />}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Amount"
//                 value={stats.totalAmount || 0}
//                 prefix="৳"
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Success Rate"
//                 value={stats.successRate || 0}
//                 suffix="%"
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Pending"
//                 value={stats.pendingCount || 0}
//                 valueStyle={{ color: '#ff4d4f' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Status Distribution */}
//         {stats.statusDistribution && (
//           <Card title="Payment Status Distribution" className="mb-6">
//             <Row gutter={[16, 16]}>
//               {Object.entries(stats.statusDistribution).map(([status, count]) => (
//                 <Col xs={24} sm={8} md={6} key={status}>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold mb-1">{count}</div>
//                     {getStatusTag(status)}
//                   </div>
//                 </Col>
//               ))}
//             </Row>
//           </Card>
//         )}

//         {/* Filters */}
//         <Card className="mb-6">
//           <Row gutter={[16, 16]}>
//             <Col xs={24} sm={12} md={8} lg={6}>
//               <Input
//                 placeholder="Search by transaction ID or member..."
//                 prefix={<SearchOutlined />}
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 allowClear
//               />
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6}>
//               <Select
//                 placeholder="Filter by Status"
//                 style={{ width: '100%' }}
//                 allowClear
//                 onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
//               >
//                 <Option value="pending">Pending</Option>
//                 <Option value="processing">Processing</Option>
//                 <Option value="completed">Completed</Option>
//                 <Option value="failed">Failed</Option>
//                 <Option value="refunded">Refunded</Option>
//               </Select>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6}>
//               <Select
//                 placeholder="Filter by Payment Method"
//                 style={{ width: '100%' }}
//                 allowClear
//                 onChange={(value) => setFilters(prev => ({ ...prev, paymentMethod: value }))}
//               >
//                 <Option value="Bank">Bank Transfer</Option>
//                 <Option value="bKash">bKash</Option>
//                 <Option value="Nagad">Nagad</Option>
//                 <Option value="Rocket">Rocket</Option>
//                 <Option value="Cash">Cash</Option>
//               </Select>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6}>
//               <RangePicker
//                 style={{ width: '100%' }}
//                 onChange={setDateRange}
//                 format="YYYY-MM-DD"
//               />
//             </Col>
//           </Row>
//         </Card>

//         {/* Payments Table */}
//         <Table
//           columns={columns}
//           dataSource={payments}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1000 }}
//           pagination={{ 
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) => 
//               `${range[0]}-${range[1]} of ${total} payments`
//           }}
//         />

//         {/* Payment Detail Modal */}
//         <Modal
//           title="Payment Details"
//           open={detailModalVisible}
//           onCancel={() => setDetailModalVisible(false)}
//           footer={[
//             <Button key="close" onClick={() => setDetailModalVisible(false)}>
//               Close
//             </Button>,
//           ]}
//           width={800}
//         >
//           {selectedPayment && (
//             <div className="space-y-6">
//               {/* Header */}
//               <div className="flex justify-between items-start">
//                 <div>
//                   <Title level={4} className="mb-1">
//                     Transaction: {selectedPayment.transactionId}
//                   </Title>
//                   <Text type="secondary">
//                     Created: {dayjs(selectedPayment.createdAt).format('MMMM D, YYYY HH:mm')}
//                   </Text>
//                 </div>
//                 <Space>
//                   {getStatusTag(selectedPayment.status)}
//                   {getPaymentTypeTag(selectedPayment.paymentType)}
//                 </Space>
//               </div>

//               <Divider />

//               {/* Basic Information */}
//               <Descriptions bordered column={2}>
//                 <Descriptions.Item label="Member">
//                   <div className="flex items-center">
//                     <Avatar src={selectedPayment.member?.image} icon={<UserOutlined />} className="mr-2" />
//                     <div>
//                       <div>{`${selectedPayment.member?.firstName} ${selectedPayment.member?.lastName}`}</div>
//                       <div className="text-xs text-gray-500">{selectedPayment.member?.membershipId}</div>
//                     </div>
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Amount">
//                   <Text strong>৳{selectedPayment.amount?.toLocaleString()}</Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Payment Method">
//                   {getPaymentMethodTag(selectedPayment.paymentMethod)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Currency">
//                   {selectedPayment.currency}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Paid Date">
//                   {selectedPayment.paidAt ? 
//                     dayjs(selectedPayment.paidAt).format('MMMM D, YYYY HH:mm') : 
//                     'Not Paid'
//                   }
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Processed Date">
//                   {selectedPayment.processedAt ? 
//                     dayjs(selectedPayment.processedAt).format('MMMM D, YYYY HH:mm') : 
//                     'Not Processed'
//                   }
//                 </Descriptions.Item>
//               </Descriptions>

//               {/* Payment Method Details */}
//               {selectedPayment.bankDetails && (
//                 <>
//                   <Title level={5}>Bank Transfer Details</Title>
//                   <Descriptions bordered column={2} size="small">
//                     <Descriptions.Item label="Bank Name">
//                       {selectedPayment.bankDetails.bankName}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Account Number">
//                       {selectedPayment.bankDetails.accountNumber}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Branch">
//                       {selectedPayment.bankDetails.branch}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Slip Number">
//                       {selectedPayment.bankDetails.slipNumber}
//                     </Descriptions.Item>
//                   </Descriptions>
//                 </>
//               )}

//               {selectedPayment.mobileBankingDetails && (
//                 <>
//                   <Title level={5}>Mobile Banking Details</Title>
//                   <Descriptions bordered column={2} size="small">
//                     <Descriptions.Item label="Provider">
//                       {selectedPayment.mobileBankingDetails.provider}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Sender Number">
//                       {selectedPayment.mobileBankingDetails.senderNumber}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Transaction ID">
//                       {selectedPayment.mobileBankingDetails.transactionId}
//                     </Descriptions.Item>
//                   </Descriptions>
//                 </>
//               )}

//               {/* Timeline */}
//               <Title level={5}>Payment Timeline</Title>
//               <Timeline>
//                 <Timeline.Item dot={<ClockCircleOutlined />}>
//                   <div className="flex justify-between">
//                     <Text strong>Payment Created</Text>
//                     <Text type="secondary">
//                       {dayjs(selectedPayment.createdAt).format('MMM D, YYYY HH:mm')}
//                     </Text>
//                   </div>
//                 </Timeline.Item>
//                 {selectedPayment.paidAt && (
//                   <Timeline.Item dot={<DollarOutlined />} color="green">
//                     <div className="flex justify-between">
//                       <Text strong>Payment Completed</Text>
//                       <Text type="secondary">
//                         {dayjs(selectedPayment.paidAt).format('MMM D, YYYY HH:mm')}
//                       </Text>
//                     </div>
//                   </Timeline.Item>
//                 )}
//                 {selectedPayment.verifiedBy && (
//                   <Timeline.Item dot={<CheckCircleOutlined />} color="blue">
//                     <div className="flex justify-between">
//                       <Text strong>Payment Verified</Text>
//                       <Text type="secondary">
//                         {dayjs(selectedPayment.verifiedAt).format('MMM D, YYYY HH:mm')}
//                       </Text>
//                     </div>
//                     <Text type="secondary">
//                       By: {selectedPayment.verifiedBy?.firstName} {selectedPayment.verifiedBy?.lastName}
//                     </Text>
//                   </Timeline.Item>
//                 )}
//               </Timeline>

//               {/* Notes */}
//               {selectedPayment.notes && (
//                 <>
//                   <Title level={5}>Additional Notes</Title>
//                   <div className="p-3 bg-gray-50 rounded">
//                     <Text>{selectedPayment.notes}</Text>
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

// export default PaymentStatus;




//////////////////FINAL/////////////////////////////


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
//   Progress,
//   Badge,
//   Tooltip,
//   Timeline,
// } from 'antd';
// import {
//   CheckCircleOutlined,
//   SearchOutlined,
//   FilterOutlined,
//   EyeOutlined,
//   UserOutlined,
//   DollarOutlined,
//   ClockCircleOutlined,
//   CloseCircleOutlined,
//   SyncOutlined,
//   FileTextOutlined,
//   BarChartOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import { usePayment } from '../hooks/usePayment';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const PaymentStatus = () => {
//   const {
//     payments,
//     loading,
//     stats,
//     loadAllPayments,
//     loadStats,
//     verifyPayment,
//     updateFilters,
//     filters,
//     clearErrors
//   } = usePayment();

//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [dateRange, setDateRange] = useState([]);
  
//   const currentUser = useSelector(state => state.user?.value);
//   const currentTheme = useSelector(state => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     // Only load if user has proper role
//     if (currentUser && ['admin', 'FinanceSecretary'].includes(currentUser.role)) {
//       loadAllPayments(filters);
//       loadStats();
//     }
//   }, [filters, currentUser]);

//   useEffect(() => {
//     // Clear errors on component unmount
//     return () => {
//       clearErrors();
//     };
//   }, []);

//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//     if (dates && dates.length === 2) {
//       updateFilters({
//         startDate: dates[0].format('YYYY-MM-DD'),
//         endDate: dates[1].format('YYYY-MM-DD')
//       });
//     } else {
//       updateFilters({ startDate: '', endDate: '' });
//     }
//   };

//   const handleStatusUpdate = async (paymentId, newStatus) => {
//     const result = await verifyPayment(paymentId, newStatus);
//     if (result.success) {
//       message.success(`Payment status updated to ${newStatus}`);
//     } else {
//       message.error(result.error);
//     }
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
//       verified: { color: 'green', icon: <CheckCircleOutlined />, text: 'Verified' },
//       rejected: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
//     };

//     const config = statusConfig[status] || { color: 'default', text: status };
//     return (
//       <Tag color={config.color} icon={config.icon}>
//         {config.text}
//       </Tag>
//     );
//   };

//   const getPaymentMethodTag = (method) => {
//     const methodConfig = {
//       bank_transfer: { color: 'blue', text: 'Bank Transfer' },
//       bkash: { color: 'purple', text: 'bKash' },
//       nagad: { color: 'green', text: 'Nagad' },
//       rocket: { color: 'orange', text: 'Rocket' },
//       cash: { color: 'cyan', text: 'Cash' },
//     };

//     const config = methodConfig[method] || { color: 'default', text: method };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const columns = [
//     {
//       title: 'Payment Info',
//       dataIndex: 'transactionId',
//       key: 'paymentInfo',
//       render: (transactionId, record) => (
//         <div>
//           <div className="font-medium">{transactionId}</div>
//           <div className="text-xs text-gray-500">
//             {dayjs(record.createdAt).format('MMM D, YYYY HH:mm')}
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
//       render: (amount) => (
//         <Text strong>৳{amount?.toLocaleString()}</Text>
//       ),
//     },
//     {
//       title: 'Method',
//       dataIndex: 'paymentMethod',
//       key: 'paymentMethod',
//       render: (method) => getPaymentMethodTag(method),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status, record) => (
//         <DropdownStatus 
//           status={status} 
//           paymentId={record._id}
//           onStatusUpdate={handleStatusUpdate}
//         />
//       ),
//     },
//     {
//       title: 'Paid Date',
//       dataIndex: 'paidAt',
//       key: 'paidAt',
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
//                 setSelectedPayment(record);
//                 setDetailModalVisible(true);
//               }}
//             />
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   // Dropdown component for status updates
//   const DropdownStatus = ({ status, paymentId, onStatusUpdate }) => {
//     const [loading, setLoading] = useState(false);

//     const handleStatusChange = async (newStatus) => {
//       setLoading(true);
//       await onStatusUpdate(paymentId, newStatus);
//       setLoading(false);
//     };

//     const statusOptions = [
//       { value: 'pending', label: 'Pending', color: 'orange' },
//       { value: 'verified', label: 'Verified', color: 'green' },
//       { value: 'rejected', label: 'Rejected', color: 'red' },
//     ];

//     return (
//       <Select
//         value={status}
//         onChange={handleStatusChange}
//         loading={loading}
//         size="small"
//         style={{ width: 120 }}
//         dropdownMatchSelectWidth={false}
//       >
//         {statusOptions.map(option => (
//           <Option key={option.value} value={option.value}>
//             <Tag color={option.color} style={{ margin: 0 }}>
//               {option.label}
//             </Tag>
//           </Option>
//         ))}
//       </Select>
//     );
//   };

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   // Check if user has access
//   if (!currentUser || !['admin', 'FinanceSecretary'].includes(currentUser.role)) {
//     return (
//       <div className="min-h-screen p-4">
//         <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//           <div className="text-center p-8">
//             <CloseCircleOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
//             <Title level={3} className="mt-4">Access Denied</Title>
//             <Text>
//               You don't have permission to view payment status. 
//               <br />
//               This page is only accessible to Admin and Finance Secretary roles.
//             </Text>
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
//               <CheckCircleOutlined className="mr-3" />
//               Payment Status
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Monitor and manage all payment transactions
//             </Text>
//           </div>
//           <Button 
//             icon={<FilterOutlined />}
//             onClick={() => loadAllPayments(filters)}
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
//                 title="Total Payments"
//                 value={stats.totalPayments || 0}
//                 prefix={<FileTextOutlined />}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Revenue"
//                 value={stats.totalRevenue || 0}
//                 prefix="৳"
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Collection Rate"
//                 value={stats.collectionRate || 0}
//                 suffix="%"
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Pending"
//                 value={stats.pendingPayments || 0}
//                 valueStyle={{ color: '#ff4d4f' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Status Distribution */}
//         {stats.verifiedPayments !== undefined && (
//           <Card title="Payment Status Distribution" className="mb-6">
//             <Row gutter={[16, 16]}>
//               <Col xs={24} sm={8} md={6}>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold mb-1">{stats.verifiedPayments || 0}</div>
//                   {getStatusTag('verified')}
//                 </div>
//               </Col>
//               <Col xs={24} sm={8} md={6}>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold mb-1">{stats.pendingPayments || 0}</div>
//                   {getStatusTag('pending')}
//                 </div>
//               </Col>
//               <Col xs={24} sm={8} md={6}>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold mb-1">
//                     {stats.totalPayments - (stats.verifiedPayments + stats.pendingPayments) || 0}
//                   </div>
//                   <Tag color="default">Other</Tag>
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         )}

//         {/* Filters */}
//         <Card className="mb-6">
//           <Row gutter={[16, 16]}>
//             <Col xs={24} sm={12} md={8} lg={6}>
//               <Input
//                 placeholder="Search by transaction ID or member..."
//                 prefix={<SearchOutlined />}
//                 onChange={(e) => updateFilters({ search: e.target.value })}
//                 allowClear
//               />
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6}>
//               <Select
//                 placeholder="Filter by Status"
//                 style={{ width: '100%' }}
//                 allowClear
//                 onChange={(value) => updateFilters({ status: value })}
//               >
//                 <Option value="pending">Pending</Option>
//                 <Option value="verified">Verified</Option>
//                 <Option value="rejected">Rejected</Option>
//               </Select>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6}>
//               <Select
//                 placeholder="Filter by Payment Method"
//                 style={{ width: '100%' }}
//                 allowClear
//                 onChange={(value) => updateFilters({ paymentMethod: value })}
//               >
//                 <Option value="bank_transfer">Bank Transfer</Option>
//                 <Option value="bkash">bKash</Option>
//                 <Option value="nagad">Nagad</Option>
//                 <Option value="rocket">Rocket</Option>
//                 <Option value="cash">Cash</Option>
//               </Select>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6}>
//               <RangePicker
//                 style={{ width: '100%' }}
//                 onChange={handleDateRangeChange}
//                 format="YYYY-MM-DD"
//               />
//             </Col>
//           </Row>
//         </Card>

//         {/* Payments Table */}
//         <Table
//           columns={columns}
//           dataSource={payments}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1000 }}
//           pagination={{ 
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) => 
//               `${range[0]}-${range[1]} of ${total} payments`
//           }}
//         />

//         {/* Payment Detail Modal */}
//         <Modal
//           title="Payment Details"
//           open={detailModalVisible}
//           onCancel={() => setDetailModalVisible(false)}
//           footer={[
//             <Button key="close" onClick={() => setDetailModalVisible(false)}>
//               Close
//             </Button>,
//           ]}
//           width={800}
//         >
//           {selectedPayment && (
//             <div className="space-y-6">
//               {/* Header */}
//               <div className="flex justify-between items-start">
//                 <div>
//                   <Title level={4} className="mb-1">
//                     Transaction: {selectedPayment.transactionId}
//                   </Title>
//                   <Text type="secondary">
//                     Created: {dayjs(selectedPayment.createdAt).format('MMMM D, YYYY HH:mm')}
//                   </Text>
//                 </div>
//                 <Space>
//                   {getStatusTag(selectedPayment.status)}
//                   {getPaymentMethodTag(selectedPayment.paymentMethod)}
//                 </Space>
//               </div>

//               <Divider />

//               {/* Basic Information */}
//               <Descriptions bordered column={2}>
//                 <Descriptions.Item label="Member">
//                   <div className="flex items-center">
//                     <Avatar src={selectedPayment.member?.image} icon={<UserOutlined />} className="mr-2" />
//                     <div>
//                       <div>{`${selectedPayment.member?.firstName} ${selectedPayment.member?.lastName}`}</div>
//                       <div className="text-xs text-gray-500">{selectedPayment.member?.membershipId}</div>
//                     </div>
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Amount">
//                   <Text strong>৳{selectedPayment.amount?.toLocaleString()}</Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Payment Method">
//                   {getPaymentMethodTag(selectedPayment.paymentMethod)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Payment Period">
//                   {selectedPayment.paymentMonth}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Paid Date">
//                   {selectedPayment.paidAt ? 
//                     dayjs(selectedPayment.paidAt).format('MMMM D, YYYY HH:mm') : 
//                     'Not Paid'
//                   }
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Verified By">
//                   {selectedPayment.verifiedBy ? 
//                     `${selectedPayment.verifiedBy.firstName} ${selectedPayment.verifiedBy.lastName}` : 
//                     'Not Verified'
//                   }
//                 </Descriptions.Item>
//               </Descriptions>

//               {/* Payment Method Details */}
//               {selectedPayment.bankName && (
//                 <>
//                   <Title level={5}>Bank Transfer Details</Title>
//                   <Descriptions bordered column={2} size="small">
//                     <Descriptions.Item label="Bank Name">
//                       {selectedPayment.bankName}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Account Number">
//                       {selectedPayment.accountNumber}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Branch">
//                       {selectedPayment.branchName}
//                     </Descriptions.Item>
//                   </Descriptions>
//                 </>
//               )}

//               {selectedPayment.senderPhone && (
//                 <>
//                   <Title level={5}>Mobile Banking Details</Title>
//                   <Descriptions bordered column={2} size="small">
//                     <Descriptions.Item label="Sender Number">
//                       {selectedPayment.senderPhone}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Receiver Number">
//                       {selectedPayment.receiverPhone}
//                     </Descriptions.Item>
//                   </Descriptions>
//                 </>
//               )}

//               {/* Timeline */}
//               <Title level={5}>Payment Timeline</Title>
//               <Timeline>
//                 <Timeline.Item dot={<ClockCircleOutlined />}>
//                   <div className="flex justify-between">
//                     <Text strong>Payment Created</Text>
//                     <Text type="secondary">
//                       {dayjs(selectedPayment.createdAt).format('MMM D, YYYY HH:mm')}
//                     </Text>
//                   </div>
//                 </Timeline.Item>
//                 {selectedPayment.paidAt && (
//                   <Timeline.Item dot={<DollarOutlined />} color="green">
//                     <div className="flex justify-between">
//                       <Text strong>Payment Completed</Text>
//                       <Text type="secondary">
//                         {dayjs(selectedPayment.paidAt).format('MMM D, YYYY HH:mm')}
//                       </Text>
//                     </div>
//                   </Timeline.Item>
//                 )}
//                 {selectedPayment.verifiedBy && (
//                   <Timeline.Item dot={<CheckCircleOutlined />} color="blue">
//                     <div className="flex justify-between">
//                       <Text strong>Payment Verified</Text>
//                       <Text type="secondary">
//                         {dayjs(selectedPayment.verifiedAt).format('MMM D, YYYY HH:mm')}
//                       </Text>
//                     </div>
//                     <Text type="secondary">
//                       By: {selectedPayment.verifiedBy?.firstName} {selectedPayment.verifiedBy?.lastName}
//                     </Text>
//                   </Timeline.Item>
//                 )}
//               </Timeline>

//               {/* Payment Proof */}
//               {selectedPayment.paymentProof && (
//                 <>
//                   <Title level={5}>Payment Proof</Title>
//                   <div className="text-center">
//                     <img 
//                       src={`http://localhost:3000${selectedPayment.paymentProof.url}`}
//                       alt="Payment proof"
//                       className="max-w-full h-auto max-h-64 rounded-lg shadow-md border"
//                     />
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

// export default PaymentStatus;






// components/payment/PaymentStatus.jsx
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
  Progress,
  Badge,
  Tooltip,
  Timeline,
  Alert,
} from 'antd';
import {
  CheckCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  UserOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { usePayment } from '../hooks/usePayment';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const PaymentStatus = () => {
  const {
    payments,
    loading,
    stats,
    loadAllPayments,
    loadStats,
    verifyPayment,
    updateFilters,
    filters,
    clearErrors
  } = usePayment();

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  
  const currentUser = useSelector(state => state.user?.value);
  const currentTheme = useSelector(state => state.theme?.currentTheme || 'light');

  // Debug user data
  console.log('Current User:', currentUser);
  console.log('User Role:', currentUser?.role);
  console.log('User Roles Array:', ['admin', 'FinanceSecretary']);

  // Check if user has access - FIXED LOGIC
  const hasAccess = currentUser && (
    currentUser.role === 'admin' || 
    currentUser.role === 'FinanceSecretary' ||
    currentUser.role === 'Admin' || // Add case variations
    currentUser.currentRole === 'admin' ||
    currentUser.currentRole === 'FinanceSecretary'
  );

  console.log('Has Access:', hasAccess);

  useEffect(() => {
    // Only load if user has proper role
    if (hasAccess) {
      loadAllPayments(filters);
      loadStats();
    }
  }, [filters, hasAccess]);

  useEffect(() => {
    // Clear errors on component unmount
    return () => {
      clearErrors();
    };
  }, []);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates && dates.length === 2) {
      updateFilters({
        startDate: dates[0].format('YYYY-MM-DD'),
        endDate: dates[1].format('YYYY-MM-DD')
      });
    } else {
      updateFilters({ startDate: '', endDate: '' });
    }
  };

  const handleStatusUpdate = async (paymentId, newStatus) => {
    const result = await verifyPayment(paymentId, newStatus);
    if (result.success) {
      message.success(`Payment status updated to ${newStatus}`);
    } else {
      message.error(result.error);
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
      verified: { color: 'green', icon: <CheckCircleOutlined />, text: 'Verified' },
      rejected: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
    };

    const config = statusConfig[status] || { color: 'default', text: status };
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getPaymentMethodTag = (method) => {
    const methodConfig = {
      bank_transfer: { color: 'blue', text: 'Bank Transfer' },
      bkash: { color: 'purple', text: 'bKash' },
      nagad: { color: 'green', text: 'Nagad' },
      rocket: { color: 'orange', text: 'Rocket' },
      cash: { color: 'cyan', text: 'Cash' },
    };

    const config = methodConfig[method] || { color: 'default', text: method };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Payment Info',
      dataIndex: 'transactionId',
      key: 'paymentInfo',
      render: (transactionId, record) => (
        <div>
          <div className="font-medium">{transactionId}</div>
          <div className="text-xs text-gray-500">
            {dayjs(record.createdAt).format('MMM D, YYYY HH:mm')}
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
      render: (amount) => (
        <Text strong>৳{amount?.toLocaleString()}</Text>
      ),
    },
    {
      title: 'Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => getPaymentMethodTag(method),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <DropdownStatus 
          status={status} 
          paymentId={record._id}
          onStatusUpdate={handleStatusUpdate}
        />
      ),
    },
    {
      title: 'Paid Date',
      dataIndex: 'paidAt',
      key: 'paidAt',
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
                setSelectedPayment(record);
                setDetailModalVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Dropdown component for status updates
  const DropdownStatus = ({ status, paymentId, onStatusUpdate }) => {
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (newStatus) => {
      setLoading(true);
      await onStatusUpdate(paymentId, newStatus);
      setLoading(false);
    };

    const statusOptions = [
      { value: 'pending', label: 'Pending', color: 'orange' },
      { value: 'verified', label: 'Verified', color: 'green' },
      { value: 'rejected', label: 'Rejected', color: 'red' },
    ];

    return (
      <Select
        value={status}
        onChange={handleStatusChange}
        loading={loading}
        size="small"
        style={{ width: 120 }}
        dropdownMatchSelectWidth={false}
      >
        {statusOptions.map(option => (
          <Option key={option.value} value={option.value}>
            <Tag color={option.color} style={{ margin: 0 }}>
              {option.label}
            </Tag>
          </Option>
        ))}
      </Select>
    );
  };

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  // Check if user has access - with better debugging
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
                  <p>Your current role: <strong>{currentUser?.role || 'No role found'}</strong></p>
                  <p>Required roles: Admin or Finance Secretary</p>
                  <p>User Object: {JSON.stringify(currentUser, null, 2)}</p>
                </div>
              }
              type="warning"
              showIcon
              className="mt-4 text-left"
            />
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <Text strong>Debug Information:</Text>
              <pre className="text-xs mt-2">
                {JSON.stringify({
                  userRole: currentUser?.role,
                  currentRole: currentUser?.currentRole,
                  allUserData: currentUser
                }, null, 2)}
              </pre>
            </div>
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
              <CheckCircleOutlined className="mr-3" />
              Payment Status
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Monitor and manage all payment transactions
            </Text>
            <div className="mt-2">
              <Tag color="blue">Logged in as: {currentUser?.role}</Tag>
            </div>
          </div>
          <Button 
            icon={<FilterOutlined />}
            onClick={() => loadAllPayments(filters)}
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
                title="Total Payments"
                value={stats.totalPayments || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Revenue"
                value={stats.totalRevenue || 0}
                prefix="৳"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Collection Rate"
                value={stats.collectionRate || 0}
                suffix="%"
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Pending"
                value={stats.pendingPayments || 0}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Status Distribution */}
        {stats.verifiedPayments !== undefined && (
          <Card title="Payment Status Distribution" className="mb-6">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8} md={6}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{stats.verifiedPayments || 0}</div>
                  {getStatusTag('verified')}
                </div>
              </Col>
              <Col xs={24} sm={8} md={6}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{stats.pendingPayments || 0}</div>
                  {getStatusTag('pending')}
                </div>
              </Col>
              <Col xs={24} sm={8} md={6}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    {stats.totalPayments - (stats.verifiedPayments + stats.pendingPayments) || 0}
                  </div>
                  <Tag color="default">Other</Tag>
                </div>
              </Col>
            </Row>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Input
                placeholder="Search by transaction ID or member..."
                prefix={<SearchOutlined />}
                onChange={(e) => updateFilters({ search: e.target.value })}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by Status"
                style={{ width: '100%' }}
                allowClear
                onChange={(value) => updateFilters({ status: value })}
              >
                <Option value="pending">Pending</Option>
                <Option value="verified">Verified</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by Payment Method"
                style={{ width: '100%' }}
                allowClear
                onChange={(value) => updateFilters({ paymentMethod: value })}
              >
                <Option value="bank_transfer">Bank Transfer</Option>
                <Option value="bkash">bKash</Option>
                <Option value="nagad">Nagad</Option>
                <Option value="rocket">Rocket</Option>
                <Option value="cash">Cash</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={handleDateRangeChange}
                format="YYYY-MM-DD"
              />
            </Col>
          </Row>
        </Card>

        {/* Payments Table */}
        <Table
          columns={columns}
          dataSource={payments}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1000 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} payments`
          }}
        />

        {/* Payment Detail Modal */}
        <Modal
          title="Payment Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>,
          ]}
          width={800}
        >
          {selectedPayment && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <Title level={4} className="mb-1">
                    Transaction: {selectedPayment.transactionId}
                  </Title>
                  <Text type="secondary">
                    Created: {dayjs(selectedPayment.createdAt).format('MMMM D, YYYY HH:mm')}
                  </Text>
                </div>
                <Space>
                  {getStatusTag(selectedPayment.status)}
                  {getPaymentMethodTag(selectedPayment.paymentMethod)}
                </Space>
              </div>

              <Divider />

              {/* Basic Information */}
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Member">
                  <div className="flex items-center">
                    <Avatar src={selectedPayment.member?.image} icon={<UserOutlined />} className="mr-2" />
                    <div>
                      <div>{`${selectedPayment.member?.firstName} ${selectedPayment.member?.lastName}`}</div>
                      <div className="text-xs text-gray-500">{selectedPayment.member?.membershipId}</div>
                    </div>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Amount">
                  <Text strong>৳{selectedPayment.amount?.toLocaleString()}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Payment Method">
                  {getPaymentMethodTag(selectedPayment.paymentMethod)}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Period">
                  {selectedPayment.paymentMonth}
                </Descriptions.Item>
                <Descriptions.Item label="Paid Date">
                  {selectedPayment.paidAt ? 
                    dayjs(selectedPayment.paidAt).format('MMMM D, YYYY HH:mm') : 
                    'Not Paid'
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Verified By">
                  {selectedPayment.verifiedBy ? 
                    `${selectedPayment.verifiedBy.firstName} ${selectedPayment.verifiedBy.lastName}` : 
                    'Not Verified'
                  }
                </Descriptions.Item>
              </Descriptions>

              {/* Payment Method Details */}
              {selectedPayment.bankName && (
                <>
                  <Title level={5}>Bank Transfer Details</Title>
                  <Descriptions bordered column={2} size="small">
                    <Descriptions.Item label="Bank Name">
                      {selectedPayment.bankName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Account Number">
                      {selectedPayment.accountNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Branch">
                      {selectedPayment.branchName}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}

              {selectedPayment.senderPhone && (
                <>
                  <Title level={5}>Mobile Banking Details</Title>
                  <Descriptions bordered column={2} size="small">
                    <Descriptions.Item label="Sender Number">
                      {selectedPayment.senderPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Receiver Number">
                      {selectedPayment.receiverPhone}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}

              {/* Timeline */}
              <Title level={5}>Payment Timeline</Title>
              <Timeline>
                <Timeline.Item dot={<ClockCircleOutlined />}>
                  <div className="flex justify-between">
                    <Text strong>Payment Created</Text>
                    <Text type="secondary">
                      {dayjs(selectedPayment.createdAt).format('MMM D, YYYY HH:mm')}
                    </Text>
                  </div>
                </Timeline.Item>
                {selectedPayment.paidAt && (
                  <Timeline.Item dot={<DollarOutlined />} color="green">
                    <div className="flex justify-between">
                      <Text strong>Payment Completed</Text>
                      <Text type="secondary">
                        {dayjs(selectedPayment.paidAt).format('MMM D, YYYY HH:mm')}
                      </Text>
                    </div>
                  </Timeline.Item>
                )}
                {selectedPayment.verifiedBy && (
                  <Timeline.Item dot={<CheckCircleOutlined />} color="blue">
                    <div className="flex justify-between">
                      <Text strong>Payment Verified</Text>
                      <Text type="secondary">
                        {dayjs(selectedPayment.verifiedAt).format('MMM D, YYYY HH:mm')}
                      </Text>
                    </div>
                    <Text type="secondary">
                      By: {selectedPayment.verifiedBy?.firstName} {selectedPayment.verifiedBy?.lastName}
                    </Text>
                  </Timeline.Item>
                )}
              </Timeline>

              {/* Payment Proof */}
              {selectedPayment.paymentProof && (
                <>
                  <Title level={5}>Payment Proof</Title>
                  <div className="text-center">
                    <img 
                      src={`http://localhost:3000${selectedPayment.paymentProof.url}`}
                      alt="Payment proof"
                      className="max-w-full h-auto max-h-64 rounded-lg shadow-md border"
                    />
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

export default PaymentStatus;


