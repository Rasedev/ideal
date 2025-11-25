





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
//   Upload,
//   Steps,
//   Alert
// } from 'antd';
// import {
//   DollarOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   UserOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   CloseCircleOutlined,
//   EyeOutlined,
//   UploadOutlined,
//   BankOutlined,
//   MobileOutlined
// } from '@ant-design/icons';
// import { usePayment } from '../hooks/usePayment';
// import { useSelector } from 'react-redux';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { Step } = Steps;

// const MonthlySubscriptions = () => {
//   const {
//     payments,
//     loading,
//     stats,
//     submitPayment,
//     verifyPayment,
//     loadAllPayments,
//     loadStats,
//     updateFilters,
//     filters
//   } = usePayment();

//   const [modalVisible, setModalVisible] = useState(false);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [paymentStep, setPaymentStep] = useState(0);
//   const [fileList, setFileList] = useState([]);
//   const [form] = Form.useForm();
//   // const currentUser = useSelector(state => state.auth.user);
//   const currentUser = useSelector(state => state.user?.value);
//   const currentTheme = useSelector(state => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     loadAllPayments(filters);
//     loadStats();
//   }, [filters]);

//   const handleSubmitPayment = async (values) => {
//     try {
//       const paymentData = {
//         ...values,
//         paymentMonth: values.paymentMonth.format('MMMM-YYYY'),
//         paymentYear: values.paymentMonth.format('YYYY'),
//         amount: 500, // Fixed monthly amount
//         transactionDate: values.transactionDate || new Date(),
//         paymentProof: fileList[0]?.originFileObj
//       };

//       const result = await submitPayment(paymentData);
      
//       if (result.success) {
//         message.success('Payment submitted successfully! Waiting for verification.');
//         setModalVisible(false);
//         form.resetFields();
//         setFileList([]);
//         setPaymentStep(0);
//         loadAllPayments(filters);
//       } else {
//         message.error(result.error);
//       }
//     } catch (error) {
//       message.error('Failed to submit payment');
//     }
//   };

//   const handleVerifyPayment = async (paymentId, status) => {
//     const result = await verifyPayment(paymentId, status);
//     if (result.success) {
//       message.success(`Payment ${status} successfully`);
//       setDetailModalVisible(false);
//       loadAllPayments(filters);
//     } else {
//       message.error(result.error);
//     }
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
//       paid: { color: 'blue', text: 'Paid' },
//       verified: { color: 'green', icon: <CheckCircleOutlined />, text: 'Verified' },
//       rejected: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
//       overdue: { color: 'red', text: 'Overdue' }
//     };
    
//     const config = statusConfig[status] || { color: 'default', text: status };
//     return (
//       <Tag color={config.color} icon={config.icon}>
//         {config.text}
//       </Tag>
//     );
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
//       title: 'Payment Period',
//       dataIndex: 'paymentMonth',
//       key: 'paymentMonth',
//       render: (month, record) => (
//         <Text strong>{month}</Text>
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
//       title: 'Payment Method',
//       dataIndex: 'paymentMethod',
//       key: 'paymentMethod',
//       render: (method) => (
//         <Tag color="blue">
//           {method?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getStatusTag(status),
//     },
//     {
//       title: 'Transaction ID',
//       dataIndex: 'transactionId',
//       key: 'transactionId',
//       render: (id) => <Text code>{id}</Text>
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="small">
//           <Button
//             type="link"
//             icon={<EyeOutlined />}
//             onClick={() => {
//               setSelectedPayment(record);
//               setDetailModalVisible(true);
//             }}
//           >
//             View
//           </Button>
//           {currentUser.role === 'FinanceSecretary' && record.status === 'pending' && (
//             <>
//               <Button
//                 type="link"
//                 onClick={() => handleVerifyPayment(record._id, 'verified')}
//               >
//                 Verify
//               </Button>
//               <Button
//                 type="link"
//                 danger
//                 onClick={() => handleVerifyPayment(record._id, 'rejected')}
//               >
//                 Reject
//               </Button>
//             </>
//           )}
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
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <DollarOutlined className="mr-3" />
//               Monthly Subscriptions
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage and track monthly subscription payments
//             </Text>
//           </div>
          
//           {currentUser.role === 'Member' && (
//             <Button 
//               type="primary" 
//               icon={<PlusOutlined />}
//               onClick={() => setModalVisible(true)}
//             >
//               Submit Payment
//             </Button>
//           )}
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
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
//                 title="Verified Payments"
//                 value={stats.verifiedPayments || 0}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Collection Rate"
//                 value={stats.collectionRate || 0}
//                 suffix="%"
//                 valueStyle={{ color: '#722ed1' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Pending Verification"
//                 value={stats.pendingPayments || 0}
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Filters */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={8}>
//             <Input
//               placeholder="Search by transaction ID..."
//               prefix={<SearchOutlined />}
//               onChange={(e) => updateFilters({ search: e.target.value })}
//               allowClear
//             />
//           </Col>
//           <Col xs={24} sm={8}>
//             <Select
//               placeholder="Filter by Status"
//               style={{ width: '100%' }}
//               allowClear
//               value={filters.status}
//               onChange={(value) => updateFilters({ status: value })}
//             >
//               <Option value="pending">Pending</Option>
//               <Option value="verified">Verified</Option>
//               <Option value="rejected">Rejected</Option>
//               <Option value="overdue">Overdue</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={8}>
//             <Select
//               placeholder="Filter by Payment Method"
//               style={{ width: '100%' }}
//               allowClear
//               value={filters.paymentMethod}
//               onChange={(value) => updateFilters({ paymentMethod: value })}
//             >
//               <Option value="bank_transfer">Bank Transfer</Option>
//               <Option value="bkash">bKash</Option>
//               <Option value="nagad">Nagad</Option>
//               <Option value="rocket">Rocket</Option>
//               <Option value="cash">Cash</Option>
//             </Select>
//           </Col>
//         </Row>

//         {/* Payments Table */}
//         <Table
//           columns={columns}
//           dataSource={payments}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1200 }}
//           pagination={{ pageSize: 10 }}
//         />

//         {/* Submit Payment Modal */}
//         <Modal
//           title="Submit Monthly Payment"
//           open={modalVisible}
//           onCancel={() => {
//             setModalVisible(false);
//             form.resetFields();
//             setFileList([]);
//             setPaymentStep(0);
//           }}
//           footer={null}
//           width={600}
//         >
//           <Form form={form} layout="vertical" onFinish={handleSubmitPayment}>
//             <Row gutter={16}>
//               <Col span={24}>
//                 <Form.Item
//                   label="Payment Month"
//                   name="paymentMonth"
//                   rules={[{ required: true, message: 'Please select payment month' }]}
//                 >
//                   <DatePicker picker="month" style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
              
//               <Col span={24}>
//                 <Form.Item
//                   label="Payment Method"
//                   name="paymentMethod"
//                   rules={[{ required: true, message: 'Please select payment method' }]}
//                 >
//                   <Select placeholder="Select payment method">
//                     <Option value="bank_transfer">
//                       <Space><BankOutlined />Bank Transfer</Space>
//                     </Option>
//                     <Option value="bkash">
//                       <Space><MobileOutlined />bKash</Space>
//                     </Option>
//                     <Option value="nagad">
//                       <Space><MobileOutlined />Nagad</Space>
//                     </Option>
//                     <Option value="rocket">
//                       <Space><MobileOutlined />Rocket</Space>
//                     </Option>
//                     <Option value="cash">
//                       <Space><DollarOutlined />Cash</Space>
//                     </Option>
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col span={24}>
//                 <Form.Item
//                   label="Transaction ID"
//                   name="transactionId"
//                   rules={[{ required: true, message: 'Please enter transaction ID' }]}
//                 >
//                   <Input placeholder="Enter transaction ID from bank/mobile banking" />
//                 </Form.Item>
//               </Col>

//               <Col span={24}>
//                 <Form.Item
//                   label="Transaction Date"
//                   name="transactionDate"
//                 >
//                   <DatePicker style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={24}>
//                 <Form.Item
//                   label="Payment Proof (Screenshot/Receipt)"
//                   name="paymentProof"
//                 >
//                   <Upload
//                     fileList={fileList}
//                     beforeUpload={(file) => {
//                       setFileList([file]);
//                       return false;
//                     }}
//                     onRemove={() => setFileList([])}
//                     accept="image/*,.pdf"
//                     maxCount={1}
//                   >
//                     <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                   </Upload>
//                 </Form.Item>
//               </Col>
//             </Row>

//             <div className="text-right mt-4">
//               <Space>
//                 <Button onClick={() => setModalVisible(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit">
//                   Submit Payment
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Modal>

//         {/* Payment Detail Modal */}
//         <Modal
//           title="Payment Details"
//           open={detailModalVisible}
//           onCancel={() => setDetailModalVisible(false)}
//           footer={[
//             <Button key="close" onClick={() => setDetailModalVisible(false)}>
//               Close
//             </Button>
//           ]}
//           width={700}
//         >
//           {selectedPayment && (
//             <div className="space-y-4">
//               <Descriptions bordered column={2}>
//                 <Descriptions.Item label="Member" span={2}>
//                   {selectedPayment.member?.firstName} {selectedPayment.member?.lastName}
//                   <br />
//                   <Text type="secondary">{selectedPayment.member?.membershipId}</Text>
//                 </Descriptions.Item>
                
//                 <Descriptions.Item label="Payment Period">
//                   {selectedPayment.paymentMonth}
//                 </Descriptions.Item>
                
//                 <Descriptions.Item label="Amount">
//                   <Text strong>৳{selectedPayment.amount?.toLocaleString()}</Text>
//                 </Descriptions.Item>
                
//                 <Descriptions.Item label="Payment Method">
//                   {selectedPayment.paymentMethod?.split('_').map(word => 
//                     word.charAt(0).toUpperCase() + word.slice(1)
//                   ).join(' ')}
//                 </Descriptions.Item>
                
//                 <Descriptions.Item label="Status">
//                   {getStatusTag(selectedPayment.status)}
//                 </Descriptions.Item>
                
//                 <Descriptions.Item label="Transaction ID">
//                   <Text code>{selectedPayment.transactionId}</Text>
//                 </Descriptions.Item>
                
//                 <Descriptions.Item label="Transaction Date">
//                   {dayjs(selectedPayment.transactionDate).format('DD MMM YYYY')}
//                 </Descriptions.Item>
                
//                 {selectedPayment.bankName && (
//                   <Descriptions.Item label="Bank Name">
//                     {selectedPayment.bankName}
//                   </Descriptions.Item>
//                 )}
                
//                 {selectedPayment.accountNumber && (
//                   <Descriptions.Item label="Account Number">
//                     {selectedPayment.accountNumber}
//                   </Descriptions.Item>
//                 )}
                
//                 {selectedPayment.senderPhone && (
//                   <Descriptions.Item label="Sender Phone">
//                     {selectedPayment.senderPhone}
//                   </Descriptions.Item>
//                 )}
                
//                 {selectedPayment.verifiedBy && (
//                   <>
//                     <Descriptions.Item label="Verified By">
//                       {selectedPayment.verifiedBy?.firstName} {selectedPayment.verifiedBy?.lastName}
//                     </Descriptions.Item>
                    
//                     <Descriptions.Item label="Verified At">
//                       {dayjs(selectedPayment.verifiedAt).format('DD MMM YYYY HH:mm')}
//                     </Descriptions.Item>
//                   </>
//                 )}
                
//                 {selectedPayment.rejectionReason && (
//                   <Descriptions.Item label="Rejection Reason" span={2}>
//                     {selectedPayment.rejectionReason}
//                   </Descriptions.Item>
//                 )}
//               </Descriptions>

//               {selectedPayment.paymentProof && (
//                 <>
//                   <Divider />
//                   <Title level={5}>Payment Proof</Title>
//                   <div className="text-center">
//                     <img 
//                       src={`http://localhost:3000${selectedPayment.paymentProof.url}`}
//                       alt="Payment proof"
//                       className="max-w-full h-auto max-h-64 rounded-lg shadow-md"
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

// export default MonthlySubscriptions;



// components/payment/MonthlySubscriptions.jsx
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
  Upload,
  Progress,
  Badge,
  Tooltip
} from 'antd';
import {
  DollarOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UploadOutlined,
  BankOutlined,
  MobileOutlined,
  TeamOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { usePayment } from '../../components/hooks/usePayment';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const MonthlySubscriptions = () => {
  const {
    payments,
    loading,
    stats,
    submitPayment,
    verifyPayment,
    loadAllPayments,
    loadStats,
    updateFilters,
    filters
  } = usePayment();

  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [overviewModalVisible, setOverviewModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const currentUser = useSelector(state => state.user?.value);
  const currentTheme = useSelector(state => state.theme?.currentTheme || 'light');

  useEffect(() => {
    loadAllPayments(filters);
    loadStats();
  }, [filters]);

  const handleSubmitPayment = async (values) => {
    try {
      const paymentData = {
        ...values,
        paymentMonth: values.paymentMonth.format('MMMM-YYYY'),
        paymentYear: values.paymentMonth.format('YYYY'),
        amount: 500, // Fixed monthly amount for ALL members
        transactionDate: values.transactionDate || new Date(),
        paymentProof: fileList[0]?.originFileObj
      };

      const result = await submitPayment(paymentData);
      
      if (result.success) {
        message.success('Payment submitted successfully! Waiting for verification.');
        setModalVisible(false);
        form.resetFields();
        setFileList([]);
        loadAllPayments(filters);
      } else {
        message.error(result.error);
      }
    } catch (error) {
      message.error('Failed to submit payment');
    }
  };

  const handleVerifyPayment = async (paymentId, status) => {
    const result = await verifyPayment(paymentId, status);
    if (result.success) {
      message.success(`Payment ${status} successfully`);
      setDetailModalVisible(false);
      loadAllPayments(filters);
    } else {
      message.error(result.error);
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending Verification' },
      paid: { color: 'blue', text: 'Paid' },
      verified: { color: 'green', icon: <CheckCircleOutlined />, text: 'Verified' },
      rejected: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
      not_paid: { color: 'default', text: 'Not Paid' },
      overdue: { color: 'red', icon: <ExclamationCircleOutlined />, text: 'Overdue' }
    };
    
    const config = statusConfig[status] || { color: 'default', text: status };
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getRoleTag = (role) => {
    const roleColors = {
      Admin: 'red',
      HR: 'orange',
      FinanceSecretary: 'green',
      Member: 'blue',
      PlotOwner: 'purple',
      Employee: 'cyan'
    };
    return <Tag color={roleColors[role] || 'default'}>{role}</Tag>;
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
            <div className="text-xs">
              {member?.membershipId && <Text type="secondary">{member.membershipId}</Text>}
              {member?.role && <div>{getRoleTag(member.role)}</div>}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Payment Period',
      dataIndex: 'paymentMonth',
      key: 'paymentMonth',
      render: (month) => <Text strong>{month}</Text>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text strong>৳{amount?.toLocaleString()}</Text>,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => (
        <Tag color="blue">
          {method?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (id) => <Text code>{id}</Text>
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
                setSelectedPayment(record);
                setDetailModalVisible(true);
              }}
            />
          </Tooltip>
          
          {/* Finance Secretary/Admin can verify payments */}
          {['FinanceSecretary', 'Admin'].includes(currentUser?.role) && record.status === 'pending' && (
            <>
              <Tooltip title="Verify Payment">
                <Button
                  type="text"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleVerifyPayment(record._id, 'verified')}
                />
              </Tooltip>
              <Tooltip title="Reject Payment">
                <Button
                  type="text"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleVerifyPayment(record._id, 'rejected')}
                />
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

  // Check if user can submit payment (all roles except maybe some)
  const canSubmitPayment = currentUser && 
    !['FinanceSecretary', 'Admin'].includes(currentUser.role); // Adjust as needed

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <DollarOutlined className="mr-3" />
              Monthly Subscriptions
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              All members monthly payment tracking - Everyone pays ₹500 monthly
            </Text>
          </div>
          
          <Space>
            {/* Show overview button for Finance/Admin */}
            {['FinanceSecretary', 'Admin'].includes(currentUser?.role) && (
              <Button 
                icon={<TeamOutlined />}
                onClick={() => setOverviewModalVisible(true)}
              >
                Payment Overview
              </Button>
            )}
            
            {/* Show submit button for regular members */}
            {canSubmitPayment && (
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setModalVisible(true)}
              >
                Submit Payment
              </Button>
            )}
          </Space>
        </div>

        {/* Statistics for ALL Members */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Members"
                value={stats.totalMembers || 0}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Verified Payments"
                value={stats.verifiedPayments || 0}
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
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Total Revenue"
                value={stats.totalRevenue || 0}
                prefix="৳"
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Collection Progress */}
        {stats.totalMembers && stats.verifiedPayments && (
          <Card className="mb-6">
            <div className="flex justify-between mb-2">
              <Text strong>Monthly Collection Progress (All Members)</Text>
              <Text>
                {stats.verifiedPayments} / {stats.totalMembers} members paid
              </Text>
            </div>
            <Progress 
              percent={Math.round((stats.verifiedPayments / stats.totalMembers) * 100)} 
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <Text>Expected: ৳{(stats.totalMembers * 500).toLocaleString()}</Text>
              <Text>Collected: ৳{stats.totalRevenue?.toLocaleString() || 0}</Text>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Input
              placeholder="Search by name or transaction ID..."
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
              <Option value="pending">Pending Verification</Option>
              <Option value="verified">Verified</Option>
              <Option value="rejected">Rejected</Option>
              <Option value="paid">Paid</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Select
              placeholder="Filter by Role"
              style={{ width: '100%' }}
              allowClear
              value={filters.role}
              onChange={(value) => updateFilters({ role: value })}
            >
              <Option value="Admin">Admin</Option>
              <Option value="HR">HR</Option>
              <Option value="FinanceSecretary">Finance Secretary</Option>
              <Option value="Member">Member</Option>
              <Option value="PlotOwner">Plot Owner</Option>
              <Option value="Employee">Employee</Option>
            </Select>
          </Col>
        </Row>

        {/* Payments Table */}
        <Table
          columns={columns}
          dataSource={payments}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 10 }}
        />

        {/* Submit Payment Modal */}
        <Modal
          title="Submit Monthly Payment"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
            setFileList([]);
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmitPayment}>
            <div className="mb-4 p-3 bg-blue-50 rounded">
              <Text strong>Monthly Subscription: ৳500</Text>
              <br />
              <Text type="secondary">All members are required to pay ₹500 monthly</Text>
            </div>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Payment Month"
                  name="paymentMonth"
                  rules={[{ required: true, message: 'Please select payment month' }]}
                >
                  <DatePicker picker="month" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  label="Payment Method"
                  name="paymentMethod"
                  rules={[{ required: true, message: 'Please select payment method' }]}
                >
                  <Select placeholder="Select payment method">
                    <Option value="bank_transfer">
                      <Space><BankOutlined />Bank Transfer</Space>
                    </Option>
                    <Option value="bkash">
                      <Space><MobileOutlined />bKash</Space>
                    </Option>
                    <Option value="nagad">
                      <Space><MobileOutlined />Nagad</Space>
                    </Option>
                    <Option value="rocket">
                      <Space><MobileOutlined />Rocket</Space>
                    </Option>
                    <Option value="cash">
                      <Space><DollarOutlined />Cash</Space>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Transaction ID"
                  name="transactionId"
                  rules={[{ required: true, message: 'Please enter transaction ID' }]}
                >
                  <Input placeholder="Enter transaction ID from bank/mobile banking" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Transaction Date"
                  name="transactionDate"
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Payment Proof (Screenshot/Receipt)"
                  name="paymentProof"
                >
                  <Upload
                    fileList={fileList}
                    beforeUpload={(file) => {
                      setFileList([file]);
                      return false;
                    }}
                    onRemove={() => setFileList([])}
                    accept="image/*,.pdf"
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <div className="text-right mt-4">
              <Space>
                <Button onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit Payment
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>

        {/* Payment Detail Modal */}
        <Modal
          title="Payment Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>
          ]}
          width={700}
        >
          {selectedPayment && (
            <div className="space-y-4">
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Member" span={2}>
                  <Space>
                    <Avatar src={selectedPayment.member?.image} icon={<UserOutlined />} />
                    <div>
                      <div className="font-medium">
                        {selectedPayment.member?.firstName} {selectedPayment.member?.lastName}
                      </div>
                      <div>
                        {selectedPayment.member?.membershipId && (
                          <Text type="secondary">{selectedPayment.member.membershipId}</Text>
                        )}
                        {selectedPayment.member?.role && (
                          <div>{getRoleTag(selectedPayment.member.role)}</div>
                        )}
                      </div>
                    </div>
                  </Space>
                </Descriptions.Item>
                
                <Descriptions.Item label="Payment Period">
                  {selectedPayment.paymentMonth}
                </Descriptions.Item>
                
                <Descriptions.Item label="Amount">
                  <Text strong>৳{selectedPayment.amount?.toLocaleString()}</Text>
                </Descriptions.Item>
                
                <Descriptions.Item label="Payment Method">
                  {selectedPayment.paymentMethod?.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </Descriptions.Item>
                
                <Descriptions.Item label="Status">
                  {getStatusTag(selectedPayment.status)}
                </Descriptions.Item>
                
                <Descriptions.Item label="Transaction ID">
                  <Text code>{selectedPayment.transactionId}</Text>
                </Descriptions.Item>
                
                <Descriptions.Item label="Transaction Date">
                  {dayjs(selectedPayment.transactionDate).format('DD MMM YYYY')}
                </Descriptions.Item>
                
                {selectedPayment.bankName && (
                  <Descriptions.Item label="Bank Name">
                    {selectedPayment.bankName}
                  </Descriptions.Item>
                )}
                
                {selectedPayment.accountNumber && (
                  <Descriptions.Item label="Account Number">
                    {selectedPayment.accountNumber}
                  </Descriptions.Item>
                )}
                
                {selectedPayment.senderPhone && (
                  <Descriptions.Item label="Sender Phone">
                    {selectedPayment.senderPhone}
                  </Descriptions.Item>
                )}
                
                {selectedPayment.verifiedBy && (
                  <>
                    <Descriptions.Item label="Verified By">
                      {selectedPayment.verifiedBy?.firstName} {selectedPayment.verifiedBy?.lastName}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Verified At">
                      {dayjs(selectedPayment.verifiedAt).format('DD MMM YYYY HH:mm')}
                    </Descriptions.Item>
                  </>
                )}
                
                {selectedPayment.rejectionReason && (
                  <Descriptions.Item label="Rejection Reason" span={2}>
                    {selectedPayment.rejectionReason}
                  </Descriptions.Item>
                )}
              </Descriptions>

              {selectedPayment.paymentProof && (
                <>
                  <Divider />
                  <Title level={5}>Payment Proof</Title>
                  <div className="text-center">
                    <img 
                      src={`http://localhost:3000${selectedPayment.paymentProof.url}`}
                      alt="Payment proof"
                      className="max-w-full h-auto max-h-64 rounded-lg shadow-md"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </Modal>

        {/* Payment Overview Modal */}
        <Modal
          title="Monthly Payment Overview - All Members"
          open={overviewModalVisible}
          onCancel={() => setOverviewModalVisible(false)}
          width={1000}
          footer={[
            <Button key="close" onClick={() => setOverviewModalVisible(false)}>
              Close
            </Button>
          ]}
        >
          <div className="text-center p-8">
            <TeamOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            <Title level={3} className="mt-4">Payment Overview Feature</Title>
            <Text>
              This feature shows payment status of ALL members for any selected month.
              <br />
              It will display who has paid, who hasn't, and overall collection statistics.
            </Text>
            <div className="mt-6">
              <Button type="primary" size="large">
                Generate Monthly Report
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    </div>
  );
};

export default MonthlySubscriptions;



