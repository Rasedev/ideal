// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   Card,
//   Input,
//   Button,
//   Space,
//   Tag,
//   Avatar,
//   Modal,
//   message,
//   Row,
//   Col,
//   Typography,
//   Descriptions,
//   Divider,
//   Statistic,
//   Badge,
//   Form,
//   Input as AntInput,
// } from 'antd';
// import {
//   SearchOutlined,
//   EyeOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   TeamOutlined,
//   UserOutlined,
//   ExclamationCircleOutlined,
//   ClockCircleOutlined,
// } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchPendingRegistrations,
//   approveMemberRegistration,
//   rejectMemberRegistration,
//   setFilters,
//   clearError,
// } from '../slices/memberApprovalSlice';

// const { Title, Text } = Typography;
// const { Search } = Input;
// const { TextArea } = AntInput;

// const MemberApprovals = () => {
//   const dispatch = useDispatch();
//   const { pendingRegistrations, loading, error, filters } = useSelector((state) => state.memberApproval);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [rejectModalVisible, setRejectModalVisible] = useState(false);
//   const [rejectReason, setRejectReason] = useState('');
//   const [rejectingMemberId, setRejectingMemberId] = useState(null);
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     dispatch(fetchPendingRegistrations());
//   }, [dispatch, filters]);

//   useEffect(() => {
//     if (error) {
//       message.error(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   const handleSearch = (value) => {
//     dispatch(setFilters({ search: value }));
//   };

//   const handleApprove = async (memberId) => {
//     try {
//       await dispatch(approveMemberRegistration(memberId)).unwrap();
//       message.success('Member approved successfully');
//     } catch (error) {
//       message.error('Failed to approve member');
//     }
//   };

//   const handleReject = (memberId) => {
//     setRejectingMemberId(memberId);
//     setRejectModalVisible(true);
//   };

//   const confirmReject = async () => {
//     if (!rejectingMemberId) return;

//     try {
//       await dispatch(rejectMemberRegistration({ 
//         memberId: rejectingMemberId, 
//         reason: rejectReason 
//       })).unwrap();
//       message.success('Member registration rejected');
//       setRejectModalVisible(false);
//       setRejectReason('');
//       setRejectingMemberId(null);
//     } catch (error) {
//       message.error('Failed to reject member');
//     }
//   };

//   const showMemberDetails = (member) => {
//     setSelectedMember(member);
//     setDetailModalVisible(true);
//   };

//   const getPrimaryPhone = (member) => {
//     if (!member.phones || member.phones.length === 0) return 'No phone';
//     const primaryPhone = member.phones.find(phone => phone.isPrimary) || member.phones[0];
//     return `${primaryPhone.countryCode || ''}${primaryPhone.number}`;
//   };

//   const columns = [
//     {
//       title: 'Applicant',
//       dataIndex: 'firstName',
//       key: 'name',
//       render: (text, record) => (
//         <Space>
//           <Avatar src={record.profilePhoto} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
//             <div className="text-xs text-gray-500">{record.email}</div>
//             <div className="text-xs">
//               <Tag color="blue" icon={<ClockCircleOutlined />}>
//                 Pending
//               </Tag>
//             </div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Contact Info',
//       key: 'contact',
//       render: (_, record) => (
//         <div>
//           <div>{getPrimaryPhone(record)}</div>
//           <div className="text-xs text-gray-500">{record.address?.substring(0, 50)}...</div>
//         </div>
//       ),
//     },
//     {
//       title: 'Registration Date',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => (
//         <div>
//           <div>{new Date(date).toLocaleDateString()}</div>
//           <div className="text-xs text-gray-500">
//             {new Date(date).toLocaleTimeString()}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       render: (role) => (
//         <Tag color={role === 'PlotOwner' ? 'purple' : 'blue'}>
//           {role?.replace(/([A-Z])/g, ' $1').trim()}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="small">
//           <Button
//             type="primary"
//             icon={<EyeOutlined />}
//             size="small"
//             onClick={() => showMemberDetails(record)}
//           >
//             View
//           </Button>
//           <Button
//             type="primary"
//             icon={<CheckCircleOutlined />}
//             size="small"
//             onClick={() => handleApprove(record._id)}
//             style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
//           >
//             Approve
//           </Button>
//           <Button
//             danger
//             icon={<CloseCircleOutlined />}
//             size="small"
//             onClick={() => handleReject(record._id)}
//           >
//             Reject
//           </Button>
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
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <TeamOutlined className="mr-3" />
//               Member Registration Approvals
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Review and approve new member registration requests
//             </Text>
//           </div>
          
//           <Badge count={pendingRegistrations.length} showZero>
//             <Statistic
//               title="Pending Approvals"
//               value={pendingRegistrations.length}
//               prefix={<ClockCircleOutlined />}
//               valueStyle={{ color: pendingRegistrations.length > 0 ? '#faad14' : '#52c41a' }}
//             />
//           </Badge>
//         </div>

//         {/* Search and Stats */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={12} md={8}>
//             <Search
//               placeholder="Search registration requests..."
//               allowClear
//               onSearch={handleSearch}
//               style={{ width: '100%' }}
//             />
//           </Col>
//           <Col xs={24} sm={12} md={8}>
//             <Card size="small">
//               <Statistic
//                 title="Total Pending"
//                 value={pendingRegistrations.length}
//                 prefix={<ClockCircleOutlined />}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Table */}
//         {pendingRegistrations.length === 0 ? (
//           <div className="text-center py-12">
//             <ExclamationCircleOutlined className="text-4xl text-gray-400 mb-4" />
//             <Title level={4} className="text-gray-500">No Pending Registrations</Title>
//             <Text className="text-gray-400">
//               There are no pending member registration requests at the moment.
//             </Text>
//           </div>
//         ) : (
//           <Table
//             columns={columns}
//             dataSource={pendingRegistrations}
//             loading={loading}
//             rowKey="_id"
//             scroll={{ x: 800 }}
//             pagination={{
//               pageSize: 10,
//               showSizeChanger: true,
//               showQuickJumper: true,
//               showTotal: (total, range) => 
//                 `${range[0]}-${range[1]} of ${total} pending registrations`,
//             }}
//           />
//         )}

//         {/* Member Details Modal */}
//         <Modal
//           title="Member Registration Details"
//           open={detailModalVisible}
//           onCancel={() => setDetailModalVisible(false)}
//           footer={[
//             <Button key="close" onClick={() => setDetailModalVisible(false)}>
//               Close
//             </Button>,
//             <Button
//               key="reject"
//               danger
//               icon={<CloseCircleOutlined />}
//               onClick={() => {
//                 setDetailModalVisible(false);
//                 handleReject(selectedMember?._id);
//               }}
//             >
//               Reject
//             </Button>,
//             <Button
//               key="approve"
//               type="primary"
//               icon={<CheckCircleOutlined />}
//               onClick={() => {
//                 setDetailModalVisible(false);
//                 handleApprove(selectedMember?._id);
//               }}
//               style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
//             >
//               Approve
//             </Button>,
//           ]}
//           width={700}
//         >
//           {selectedMember && (
//             <Descriptions column={2} bordered>
//               <Descriptions.Item label="Full Name" span={2}>
//                 {`${selectedMember.firstName} ${selectedMember.lastName}`}
//               </Descriptions.Item>
//               <Descriptions.Item label="Email">{selectedMember.email}</Descriptions.Item>
//               <Descriptions.Item label="Phone">
//                 {getPrimaryPhone(selectedMember)}
//               </Descriptions.Item>
//               <Descriptions.Item label="Date of Birth">
//                 {selectedMember.dateOfBirth ? new Date(selectedMember.dateOfBirth).toLocaleDateString() : 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Role">
//                 <Tag color="blue">
//                   {selectedMember.role?.replace(/([A-Z])/g, ' $1').trim()}
//                 </Tag>
//               </Descriptions.Item>
//               <Descriptions.Item label="ID Card Number">
//                 {selectedMember.IdCardNumber || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Address" span={2}>
//                 {selectedMember.address || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Father's Name">
//                 {selectedMember.fatherName || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Birthplace">
//                 {selectedMember.birthplace || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Educational Qualification">
//                 {selectedMember.educationalQualification || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Registration Date">
//                 {new Date(selectedMember.createdAt).toLocaleString()}
//               </Descriptions.Item>
//             </Descriptions>
//           )}
//         </Modal>

//         {/* Reject Confirmation Modal */}
//         <Modal
//           title="Reject Member Registration"
//           open={rejectModalVisible}
//           onCancel={() => {
//             setRejectModalVisible(false);
//             setRejectReason('');
//             setRejectingMemberId(null);
//           }}
//           footer={[
//             <Button 
//               key="cancel" 
//               onClick={() => {
//                 setRejectModalVisible(false);
//                 setRejectReason('');
//                 setRejectingMemberId(null);
//               }}
//             >
//               Cancel
//             </Button>,
//             <Button
//               key="reject"
//               danger
//               icon={<CloseCircleOutlined />}
//               onClick={confirmReject}
//               disabled={!rejectReason.trim()}
//             >
//               Reject Registration
//             </Button>,
//           ]}
//         >
//           <Form layout="vertical">
//             <Form.Item
//               label="Rejection Reason"
//               required
//             >
//               <TextArea
//                 rows={4}
//                 placeholder="Please provide a reason for rejecting this registration..."
//                 value={rejectReason}
//                 onChange={(e) => setRejectReason(e.target.value)}
//               />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default MemberApprovals;






//////////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import { Card, Input, Badge, Statistic, Typography, message } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { SearchOutlined, ClockCircleOutlined } from '@ant-design/icons';
// import MemberTable from '../../components/MemberApproval/MemberTable';
// import MemberDetailsModal from '../../components/MemberApproval/MemberDetailsModal';
// import RejectModal from '../../components/MemberApproval/RejectModal';
// // Slice actions
// import { setFilters, clearError } from '../slices/memberApprovalSlice';

// // Thunks
// import { fetchPendingRegistrations, approveMemberRegistration, rejectMemberRegistration } 
//   from '../slices/memberApprovalThunks';


// const { Title, Text } = Typography;
// const { Search } = Input;

// const MemberApprovals = () => {
//   const dispatch = useDispatch();
//   const { pendingRegistrations, loading, error, filters } = useSelector(state => state.memberApproval);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [detailsVisible, setDetailsVisible] = useState(false);
//   const [rejectVisible, setRejectVisible] = useState(false);
//   const [rejectReason, setRejectReason] = useState('');
//   const [rejectingId, setRejectingId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchPendingRegistrations());
//   }, [dispatch, filters]);

//   useEffect(() => {
//     if (error) { message.error(error); dispatch(clearError()); }
//   }, [error, dispatch]);

//   const handleApprove = async (id) => {
//     try { await dispatch(approveMemberRegistration(id)).unwrap(); message.success('Approved'); } 
//     catch { message.error('Failed to approve'); }
//   };

//   const handleReject = (id) => { setRejectingId(id); setRejectVisible(true); };
//   const confirmReject = async () => { 
//     try { await dispatch(rejectMemberRegistration({ memberId: rejectingId, reason: rejectReason })).unwrap(); setRejectVisible(false); setRejectReason(''); } 
//     catch { message.error('Failed to reject'); } 
//   };

//   return (
//     <Card className="shadow-xl rounded-2xl p-4">
//       <div className="flex flex-col lg:flex-row justify-between mb-6 gap-4">
//         <div>
//           <Title level={2}><SearchOutlined /> Member Approvals</Title>
//           <Text>Review and approve new registrations</Text>
//         </div>
//         <Badge count={pendingRegistrations.length} showZero>
//           <Statistic title="Pending Approvals" value={pendingRegistrations.length} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#faad14' }} />
//         </Badge>
//       </div>

//       <div className="mb-6">
//         <Search placeholder="Search..." allowClear onSearch={value => dispatch(setFilters({ search: value }))} style={{ width: '100%' }} />
//       </div>

//       <MemberTable
//         data={pendingRegistrations}
//         loading={loading}
//         onView={member => { setSelectedMember(member); setDetailsVisible(true); }}
//         onApprove={handleApprove}
//         onReject={handleReject}
//       />

//       <MemberDetailsModal member={selectedMember} visible={detailsVisible} onClose={() => setDetailsVisible(false)} onApprove={handleApprove} onReject={handleReject} />
//       <RejectModal visible={rejectVisible} onCancel={() => setRejectVisible(false)} onConfirm={confirmReject} reason={rejectReason} setReason={setRejectReason} />
//     </Card>
//   );
// };

// export default MemberApprovals;







///////////////////////////////lastFinal////////////////////////


// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Table,
//   Card,
//   Button,
//   Space,
//   Tag,
//   Modal,
//   Form,
//   Input,
//   Select,
//   message,
//   Popconfirm,
//   Tooltip,
//   Avatar,
//   Row,
//   Col,
//   Statistic,
//   Divider,
//   Alert,
//   Spin,
//   Descriptions,
//   Badge,
//   Dropdown,
//   Typography,
// } from 'antd';
// import {
//   SearchOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   EyeOutlined,
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined,
//   FilterOutlined,
//   ExportOutlined,
//   ReloadOutlined,
//   ExclamationCircleOutlined,
//   MoreOutlined,
//   ClockCircleOutlined,
// } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { fetchPendingRegistrations, approveMember, rejectMember, clearError } from '../slices/memberSlice';

// // Extend dayjs with relativeTime plugin
// dayjs.extend(relativeTime);

// const { Title, Text } = Typography;
// const { Option } = Select;

// const MemberApprovals = () => {
//   const dispatch = useDispatch();
  
//   // Get data from Redux store
//   const {
//     items: members,
//     pendingRegistrations = [],
//     loading,
//     error,
//   } = useSelector((state) => state.members);

//   // Local State
//   const [filteredRegistrations, setFilteredRegistrations] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [statusFilter, setStatusFilter] = useState('pending');
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [rejectModalVisible, setRejectModalVisible] = useState(false);
//   const [rejectReason, setRejectReason] = useState('');
//   const [memberToReject, setMemberToReject] = useState(null);
//   const [approvalStats, setApprovalStats] = useState({
//     pending: 0,
//     approvedToday: 0,
//     rejectedToday: 0,
//     totalProcessed: 0,
//   });
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Fetch pending registrations on component mount
//   useEffect(() => {
//     loadPendingRegistrations();
//   }, []);

//   // Update filtered registrations when data changes
//   useEffect(() => {
//     filterRegistrations();
//     calculateStats();
//   }, [pendingRegistrations, searchText, statusFilter]);

//   const loadPendingRegistrations = async () => {
//     try {
//       await dispatch(fetchPendingRegistrations()).unwrap();
//       dispatch(clearError());
//     } catch (error) {
//       console.error('Failed to load pending registrations:', error);
//       message.error('Failed to load pending registrations');
//     }
//   };

//   const filterRegistrations = () => {
//     let filtered = pendingRegistrations;

//     // Search filter
//     if (searchText) {
//       const searchLower = searchText.toLowerCase();
//       filtered = filtered.filter((member) => {
//         const searchableFields = [
//           member.firstName,
//           member.lastName,
//           member.email,
//           member.phone,
//           member.membershipId,
//           member._id,
//         ].filter(Boolean);

//         return searchableFields.some((field) =>
//           field.toString().toLowerCase().includes(searchLower)
//         );
//       });
//     }

//     // Status filter
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(
//         (member) => member.membershipStatus === statusFilter
//       );
//     }

//     setFilteredRegistrations(filtered);
//   };

//   const calculateStats = () => {
//     const today = dayjs().startOf('day');
//     const pending = pendingRegistrations.filter(
//       (m) => m.membershipStatus === 'pending'
//     ).length;
    
//     const approvedToday = members.filter(
//       (m) => 
//         m.membershipStatus === 'active' && 
//         m.approvedAt && 
//         dayjs(m.approvedAt).isAfter(today)
//     ).length;
    
//     const rejectedToday = members.filter(
//       (m) => 
//         m.membershipStatus === 'rejected' && 
//         m.rejectedAt && 
//         dayjs(m.rejectedAt).isAfter(today)
//     ).length;
    
//     const totalProcessed = members.filter(
//       (m) => m.membershipStatus === 'active' || m.membershipStatus === 'rejected'
//     ).length;

//     setApprovalStats({
//       pending,
//       approvedToday,
//       rejectedToday,
//       totalProcessed,
//     });
//   };

//   const handleViewMember = (member) => {
//     setSelectedMember(member);
//     setViewModalVisible(true);
//   };

//   const handleApproveMember = async (memberId) => {
//     try {
//       setIsProcessing(true);
//       await dispatch(approveMember(memberId)).unwrap();
//       message.success('Member approved successfully');
//       await loadPendingRegistrations();
//     } catch (error) {
//       message.error('Failed to approve member: ' + error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleRejectMember = (member) => {
//     setMemberToReject(member);
//     setRejectModalVisible(true);
//   };

//   const confirmRejectMember = async () => {
//     if (!memberToReject || !rejectReason.trim()) {
//       message.error('Please provide a rejection reason');
//       return;
//     }

//     try {
//       setIsProcessing(true);
//       await dispatch(rejectMember({
//         id: memberToReject._id,
//         reason: rejectReason,
//       })).unwrap();
      
//       message.success('Member registration rejected');
//       setRejectModalVisible(false);
//       setRejectReason('');
//       setMemberToReject(null);
//       await loadPendingRegistrations();
//     } catch (error) {
//       message.error('Failed to reject member: ' + error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleBatchAction = async (action) => {
//     if (selectedRowKeys.length === 0) {
//       message.warning('Please select members to perform this action');
//       return;
//     }

//     try {
//       setIsProcessing(true);

//       switch (action) {
//         case 'approve':
//           for (const memberId of selectedRowKeys) {
//             await dispatch(approveMember(memberId)).unwrap();
//           }
//           message.success(`${selectedRowKeys.length} members approved successfully`);
//           break;

//         case 'reject':
//           Modal.confirm({
//             title: 'Reject Selected Members',
//             content: (
//               <Input.TextArea
//                 placeholder="Enter rejection reason for all selected members"
//                 rows={3}
//                 onChange={(e) => setRejectReason(e.target.value)}
//               />
//             ),
//             okText: 'Reject',
//             okType: 'danger',
//             cancelText: 'Cancel',
//             onOk: async () => {
//               if (!rejectReason.trim()) {
//                 message.error('Please provide a rejection reason');
//                 return;
//               }
              
//               for (const memberId of selectedRowKeys) {
//                 await dispatch(rejectMember({
//                   id: memberId,
//                   reason: rejectReason,
//                 })).unwrap();
//               }
//               message.success(`${selectedRowKeys.length} members rejected`);
//               setSelectedRowKeys([]);
//               await loadPendingRegistrations();
//             },
//           });
//           return;
//       }

//       setSelectedRowKeys([]);
//       await loadPendingRegistrations();
//     } catch (error) {
//       message.error(`Failed to ${action} members: ${error}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       pending: { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending' },
//       active: { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved' },
//       rejected: { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected' },
//     };

//     const config = statusConfig[status] || statusConfig.pending;
//     return (
//       <Tag color={config.color} icon={config.icon}>
//         {config.label}
//       </Tag>
//     );
//   };

//   const getRoleTag = (role) => {
//     const roleConfig = {
//       Member: { color: 'blue', label: 'Member' },
//       PlotOwner: { color: 'purple', label: 'Plot Owner' },
//       default: { color: 'default', label: role || 'Member' },
//     };

//     const config = roleConfig[role] || roleConfig.default;
//     return <Tag color={config.color}>{config.label}</Tag>;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return dayjs(dateString).format('DD MMM YYYY HH:mm');
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   const formatRelativeTime = (dateString) => {
//     if (!dateString) return 'Never';
//     try {
//       return dayjs(dateString).fromNow();
//     } catch {
//       return 'N/A';
//     }
//   };

//   const columns = [
//     {
//       title: 'Applicant',
//       key: 'applicant',
//       width: 250,
//       render: (_, record) => (
//         <Space>
//           <Avatar
//             size="small"
//             src={record.profilePhoto}
//             icon={<UserOutlined />}
//             className="bg-blue-500"
//           >
//             {record.firstName?.charAt(0) || record.email?.charAt(0)}
//           </Avatar>
//           <div>
//             <div className="font-medium">
//               {record.firstName} {record.lastName}
//             </div>
//             <div className="text-xs text-gray-500">
//               Applied: {formatRelativeTime(record.createdAt)}
//             </div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Contact',
//       key: 'contact',
//       width: 200,
//       render: (_, record) => (
//         <div>
//           <div className="flex items-center text-xs">
//             <MailOutlined className="mr-1" />
//             {record.email || 'N/A'}
//           </div>
//           {record.phone && (
//             <div className="flex items-center text-xs text-gray-500">
//               <PhoneOutlined className="mr-1" />
//               {record.phone}
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       width: 120,
//       render: getRoleTag,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'membershipStatus',
//       key: 'status',
//       width: 120,
//       render: getStatusTag,
//     },
//     {
//       title: 'Applied On',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       width: 150,
//       render: formatDate,
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 250,
//       fixed: 'right',
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button
//               size="small"
//               icon={<EyeOutlined />}
//               onClick={() => handleViewMember(record)}
//             />
//           </Tooltip>
          
//           {record.membershipStatus === 'pending' && (
//             <>
//               <Tooltip title="Approve">
//                 <Button
//                   size="small"
//                   type="primary"
//                   icon={<CheckCircleOutlined />}
//                   onClick={() => handleApproveMember(record._id)}
//                   loading={isProcessing}
//                 >
//                   Approve
//                 </Button>
//               </Tooltip>
              
//               <Tooltip title="Reject">
//                 <Button
//                   size="small"
//                   danger
//                   icon={<CloseCircleOutlined />}
//                   onClick={() => handleRejectMember(record)}
//                   loading={isProcessing}
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

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: setSelectedRowKeys,
//     getCheckboxProps: (record) => ({
//       disabled: record.membershipStatus !== 'pending',
//     }),
//   };

//   const batchActions = [
//     {
//       key: 'approve',
//       label: 'Approve Selected',
//       icon: <CheckCircleOutlined />,
//       onClick: () => handleBatchAction('approve'),
//     },
//     {
//       key: 'reject',
//       label: 'Reject Selected',
//       icon: <CloseCircleOutlined />,
//       onClick: () => handleBatchAction('reject'),
//     },
//     {
//       type: 'divider',
//     },
//     {
//       key: 'export',
//       label: 'Export Selected',
//       icon: <ExportOutlined />,
//       onClick: () => {
//         message.info('Export feature coming soon');
//       },
//     },
//   ];

//   return (
//     <div className="space-y-6 px-2 md:px-6 lg:px-3">
//       {/* Error Alert */}
//       {error && (
//         <Alert
//           type="error"
//           message="Error"
//           description={typeof error === 'string' ? error : 'An error occurred'}
//           showIcon
//           closable
//           onClose={() => dispatch(clearError())}
//           style={{ marginBottom: 16 }}
//         />
//       )}

//       {/* Header Section */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//         <div>
//           <Title level={3} className="mb-2">
//             Member Registration Approvals
//           </Title>
//           <Text type="secondary">
//             Review and manage member registration requests
//             <span className="ml-2 text-sm">
//               ({approvalStats.pending} pending requests)
//             </span>
//           </Text>
//         </div>

//         <Space>
//           <Tooltip title="Refresh">
//             <Button
//               icon={<ReloadOutlined />}
//               onClick={loadPendingRegistrations}
//               loading={loading}
//             />
//           </Tooltip>
//           <Button
//             icon={<ExportOutlined />}
//             onClick={() => message.info('Export feature coming soon')}
//           >
//             Export
//           </Button>
//         </Space>
//       </div>

//       {/* Statistics Cards */}
//       <Row gutter={[12, 12]}>
//         {[
//           {
//             title: 'Pending Requests',
//             value: approvalStats.pending,
//             color: '#fa8c16',
//             icon: <ClockCircleOutlined className="text-orange-500" />,
//             suffix: 'requests',
//           },
//           {
//             title: 'Approved Today',
//             value: approvalStats.approvedToday,
//             color: '#52c41a',
//             icon: <CheckCircleOutlined className="text-green-500" />,
//             suffix: 'members',
//           },
//           {
//             title: 'Rejected Today',
//             value: approvalStats.rejectedToday,
//             color: '#ff4d4f',
//             icon: <CloseCircleOutlined className="text-red-500" />,
//             suffix: 'members',
//           },
//           {
//             title: 'Total Processed',
//             value: approvalStats.totalProcessed,
//             color: '#1890ff',
//             icon: <UserOutlined className="text-blue-500" />,
//             suffix: 'total',
//           },
//         ].map((stat, index) => (
//           <Col key={index} xs={12} sm={6} md={6} lg={6}>
//             <Card className="text-center border-0 shadow-sm">
//               <Statistic
//                 title={stat.title}
//                 value={stat.value}
//                 prefix={stat.icon}
//                 valueStyle={{ color: stat.color }}
//                 suffix={stat.suffix}
//               />
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Filters and Search */}
//       <Card className="border-0 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//           <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
//             <Input
//               placeholder="Search applicants by name, email, phone..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="w-full sm:w-64"
//               allowClear
//             />

//             <Select
//               placeholder="Filter by Status"
//               value={statusFilter}
//               onChange={setStatusFilter}
//               className="w-full sm:w-40"
//             >
//               <Option value="all">All Status</Option>
//               <Option value="pending">Pending</Option>
//               <Option value="active">Approved</Option>
//               <Option value="rejected">Rejected</Option>
//             </Select>

//             <Select
//               placeholder="Filter by Role"
//               className="w-full sm:w-40"
//               allowClear
//             >
//               <Option value="Member">Regular Member</Option>
//               <Option value="PlotOwner">Plot Owner</Option>
//             </Select>
//           </div>

//           <div className="flex gap-2 w-full lg:w-auto">
//             {selectedRowKeys.length > 0 && (
//               <Dropdown menu={{ items: batchActions }} placement="bottomRight">
//                 <Button icon={<MoreOutlined />}>
//                   Batch Actions ({selectedRowKeys.length})
//                 </Button>
//               </Dropdown>
//             )}

//             <Button
//               icon={<FilterOutlined />}
//               onClick={() => {
//                 setSearchText('');
//                 setStatusFilter('pending');
//               }}
//             >
//               Clear Filters
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Registrations Table */}
//       <Card
//         title={`Registration Requests (${filteredRegistrations.length})`}
//         className="border-0 shadow-sm"
//         extra={
//           <div className="flex items-center gap-2">
//             <Badge
//               count={selectedRowKeys.length}
//               showZero={false}
//               style={{ backgroundColor: '#1890ff' }}
//             />
//             <Text type="secondary" className="text-sm">
//               Showing {filteredRegistrations.length} of {pendingRegistrations.length} requests
//             </Text>
//           </div>
//         }
//       >
//         <Table
//           columns={columns}
//           dataSource={filteredRegistrations}
//           rowSelection={rowSelection}
//           rowKey="_id"
//           loading={loading || isProcessing}
//           pagination={{
//             total: filteredRegistrations.length,
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) =>
//               `${range[0]}-${range[1]} of ${total} requests`,
//           }}
//           scroll={{ x: 1200 }}
//           locale={{
//             emptyText: loading ? <Spin /> : 'No registration requests found',
//           }}
//         />
//       </Card>

//       {/* View Member Details Modal */}
//       <Modal
//         title="Registration Details"
//         open={viewModalVisible}
//         onCancel={() => setViewModalVisible(false)}
//         width={700}
//         footer={[
//           <Button key="close" onClick={() => setViewModalVisible(false)}>
//             Close
//           </Button>,
//         ]}
//       >
//         {selectedMember ? (
//           <div className="space-y-6">
//             {/* Profile Header */}
//             <div className="flex items-center space-x-4">
//               <Avatar
//                 size={64}
//                 src={selectedMember.profilePhoto}
//                 icon={<UserOutlined />}
//                 className="bg-blue-500"
//               >
//                 {selectedMember.firstName?.charAt(0)}
//               </Avatar>
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {selectedMember.firstName} {selectedMember.lastName}
//                 </h3>
//                 <p className="text-gray-600">
//                   ID: {selectedMember._id?.substring(0, 12)}...
//                 </p>
//                 <Space className="mt-2">
//                   {getStatusTag(selectedMember.membershipStatus)}
//                   {getRoleTag(selectedMember.role)}
//                 </Space>
//               </div>
//             </div>

//             <Divider />

//             <Descriptions bordered column={2}>
//               <Descriptions.Item label="Email" span={2}>
//                 {selectedMember.email || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Phone">
//                 {selectedMember.phone || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Date of Birth">
//                 {formatDate(selectedMember.dateOfBirth)}
//               </Descriptions.Item>
//               <Descriptions.Item label="Father's Name">
//                 {selectedMember.fatherName || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Birthplace">
//                 {selectedMember.birthplace || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Educational Qualification">
//                 {selectedMember.educationalQualification || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Address" span={2}>
//                 {selectedMember.address || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Applied On">
//                 {formatDate(selectedMember.createdAt)}
//               </Descriptions.Item>
//               <Descriptions.Item label="Last Updated">
//                 {formatRelativeTime(selectedMember.updatedAt)}
//               </Descriptions.Item>
//               {selectedMember.rejectionReason && (
//                 <Descriptions.Item label="Rejection Reason" span={2}>
//                   <Alert
//                     type="error"
//                     message={selectedMember.rejectionReason}
//                     showIcon
//                   />
//                 </Descriptions.Item>
//               )}
//             </Descriptions>

//             {selectedMember.membershipStatus === 'pending' && (
//               <div className="flex justify-end space-x-3 mt-6">
//                 <Button
//                   danger
//                   icon={<CloseCircleOutlined />}
//                   onClick={() => handleRejectMember(selectedMember)}
//                   loading={isProcessing}
//                 >
//                   Reject
//                 </Button>
//                 <Button
//                   type="primary"
//                   icon={<CheckCircleOutlined />}
//                   onClick={() => handleApproveMember(selectedMember._id)}
//                   loading={isProcessing}
//                 >
//                   Approve Registration
//                 </Button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <Spin />
//             <p>Loading member details...</p>
//           </div>
//         )}
//       </Modal>

//       {/* Reject Modal */}
//       <Modal
//         title="Reject Registration"
//         open={rejectModalVisible}
//         onCancel={() => {
//           setRejectModalVisible(false);
//           setRejectReason('');
//           setMemberToReject(null);
//         }}
//         footer={[
//           <Button
//             key="cancel"
//             onClick={() => {
//               setRejectModalVisible(false);
//               setRejectReason('');
//               setMemberToReject(null);
//             }}
//             disabled={isProcessing}
//           >
//             Cancel
//           </Button>,
//           <Button
//             key="reject"
//             type="primary"
//             danger
//             onClick={confirmRejectMember}
//             loading={isProcessing}
//             disabled={!rejectReason.trim()}
//           >
//             Reject Registration
//           </Button>,
//         ]}
//       >
//         <div className="space-y-4">
//           <Alert
//             type="warning"
//             message="Warning"
//             description="This action cannot be undone. The applicant will be notified of the rejection."
//             showIcon
//           />
          
//           {memberToReject && (
//             <div className="p-4 bg-gray-50 rounded">
//               <p className="font-medium">
//                 Member: {memberToReject.firstName} {memberToReject.lastName}
//               </p>
//               <p className="text-gray-600 text-sm">
//                 Email: {memberToReject.email}
//               </p>
//             </div>
//           )}

//           <Form layout="vertical">
//             <Form.Item
//               label="Rejection Reason"
//               required
//               help="Please provide a clear reason for rejection"
//             >
//               <Input.TextArea
//                 placeholder="Enter the reason for rejecting this registration..."
//                 rows={4}
//                 value={rejectReason}
//                 onChange={(e) => setRejectReason(e.target.value)}
//               />
//             </Form.Item>
//           </Form>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default MemberApprovals;





import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tooltip,
  Avatar,
  Row,
  Col,
  Statistic,
  Divider,
  Alert,
  Spin,
  Descriptions,
  Badge,
  Dropdown,
  Typography,
  Tabs,
  Progress,
  Timeline,
  Empty,
} from 'antd';
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  FilterOutlined,
  ExportOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  FileTextOutlined,
  DownloadOutlined,
  SendOutlined,
  CommentOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  fetchAllMembers,
  fetchMemberStats,
  clearError,
  fetchMemberById,
  updateMember,
} from '../slices/memberSlice';

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const MemberApprovals = () => {
  const dispatch = useDispatch();
  
  // Get data from Redux store - use the same data as AllMembers.jsx
  const {
    items: allMembers = [],
    stats,
    currentMember,
    loading,
    error,
  } = useSelector((state) => state.members);

  // Local State
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [memberToReject, setMemberToReject] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [sortOrder, setSortOrder] = useState('newest');
  const [statsLoading, setStatsLoading] = useState(false);

  // Fetch all members on component mount (same as AllMembers.jsx)
  useEffect(() => {
    loadMembersData();
  }, []);

  // Load all members and stats
  const loadMembersData = useCallback(async () => {
    try {
      await dispatch(fetchAllMembers()).unwrap();
      setStatsLoading(true);
      await dispatch(fetchMemberStats()).unwrap();
      setStatsLoading(false);
      dispatch(clearError());
    } catch (error) {
      console.error('Failed to load members data:', error);
      message.error('Failed to load members data');
      setStatsLoading(false);
    }
  }, [dispatch]);

  // Calculate approval stats from all members
  const approvalStats = useMemo(() => {
    if (!allMembers.length) {
      return {
        pending: 0,
        approved: 0,
        rejected: 0,
        approvedToday: 0,
        approvedThisWeek: 0,
        total: 0,
        pendingByRole: {},
        pendingPercentage: 0,
        membersWithStatus: [],
      };
    }

    const today = dayjs().startOf('day');
    const oneWeekAgo = dayjs().subtract(7, 'day');

    // Calculate based on isActive field (false = pending approval)
    const pendingMembers = allMembers.filter(member => 
      member.isActive === false || 
      (member.membershipStatus && member.membershipStatus === 'pending')
    );

    const approvedMembers = allMembers.filter(member => 
      member.isActive === true || 
      (member.membershipStatus && member.membershipStatus === 'active')
    );

    const rejectedMembers = allMembers.filter(member => 
      member.membershipStatus === 'rejected'
    );

    const approvedToday = approvedMembers.filter(
      (m) => m.approvedAt && dayjs(m.approvedAt).isAfter(today)
    ).length;

    const approvedThisWeek = approvedMembers.filter(
      (m) => m.approvedAt && dayjs(m.approvedAt).isAfter(oneWeekAgo)
    ).length;

    // Role distribution for pending members
    const pendingByRole = {};
    pendingMembers.forEach(member => {
      const role = member.role || 'Member';
      pendingByRole[role] = (pendingByRole[role] || 0) + 1;
    });

    // Add status field and days pending to all members
    const membersWithStatus = allMembers.map(member => {
      let status = 'pending';
      if (member.isActive === true) status = 'active';
      if (member.membershipStatus === 'active') status = 'active';
      if (member.membershipStatus === 'rejected') status = 'rejected';
      
      return {
        ...member,
        displayStatus: status,
        daysPending: member.createdAt ? dayjs().diff(dayjs(member.createdAt), 'day') : 0,
      };
    });

    return {
      pending: pendingMembers.length,
      approved: approvedMembers.length,
      rejected: rejectedMembers.length,
      approvedToday,
      approvedThisWeek,
      total: allMembers.length,
      pendingByRole,
      pendingPercentage: allMembers.length > 0 ? Math.round((pendingMembers.length / allMembers.length) * 100) : 0,
      membersWithStatus,
    };
  }, [allMembers]);

  // Update filtered members when data changes
  useEffect(() => {
    filterAndSortMembers();
  }, [approvalStats, searchText, roleFilter, sortOrder, activeTab]);

  const filterAndSortMembers = useCallback(() => {
    let filtered = approvalStats.membersWithStatus;

    // Filter by active tab
    if (activeTab === 'pending') {
      filtered = filtered.filter(member => member.displayStatus === 'pending');
    } else if (activeTab === 'approved') {
      filtered = filtered.filter(member => member.displayStatus === 'active');
    } else if (activeTab === 'rejected') {
      filtered = filtered.filter(member => member.displayStatus === 'rejected');
    }

    // Search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter((member) => {
        const searchableFields = [
          member.firstName,
          member.lastName,
          member.email,
          member.phone,
          member.membershipId,
          member._id,
          member.address?.street,
          member.address?.city,
          member.address?.country,
          member.address?.state,
          member.fatherName,
          member.birthplace,
        ].filter(Boolean);

        return searchableFields.some((field) =>
          field.toString().toLowerCase().includes(searchLower)
        );
      });
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((member) => member.role === roleFilter);
    }

    // Sort
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());
    } else if (sortOrder === 'name') {
      filtered.sort((a, b) => 
        `${a.firstName || ''} ${a.lastName || ''}`.localeCompare(`${b.firstName || ''} ${b.lastName || ''}`)
      );
    } else if (sortOrder === 'pendingDays') {
      filtered.sort((a, b) => (b.daysPending || 0) - (a.daysPending || 0));
    }

    setFilteredMembers(filtered);
  }, [approvalStats.membersWithStatus, searchText, roleFilter, sortOrder, activeTab]);

  const handleViewMember = async (member) => {
    try {
      await dispatch(fetchMemberById(member._id)).unwrap();
      setSelectedMember(member);
      setViewModalVisible(true);
    } catch (error) {
      console.error('Failed to load member details:', error);
      setSelectedMember(member);
      setViewModalVisible(true);
    }
  };

  const handleApproveMember = async (memberId, isBatch = false) => {
    try {
      if (!isBatch) setIsProcessing(true);
      
      await dispatch(updateMember({
        id: memberId,
        data: { 
          isActive: true,
          approvedAt: new Date().toISOString(),
          // Clear rejection reason if it exists
          rejectionReason: null,
          rejectedAt: null,
        }
      })).unwrap();
      
      if (!isBatch) {
        message.success('Member approved successfully');
        await loadMembersData();
      }
    } catch (error) {
      message.error(`Failed to approve member: ${error.message || 'Unknown error'}`);
    } finally {
      if (!isBatch) setIsProcessing(false);
    }
  };

  const handleRejectMember = (member) => {
    setMemberToReject(member);
    setRejectModalVisible(true);
  };

  const confirmRejectMember = async () => {
    if (!memberToReject || !rejectReason.trim()) {
      message.error('Please provide a rejection reason');
      return;
    }

    try {
      setIsProcessing(true);
      await dispatch(updateMember({
        id: memberToReject._id,
        data: { 
          isActive: false,
          rejectionReason: rejectReason,
          rejectedAt: new Date().toISOString(),
        }
      })).unwrap();
      
      message.success('Member registration rejected');
      setRejectModalVisible(false);
      setRejectReason('');
      setMemberToReject(null);
      await loadMembersData();
    } catch (error) {
      message.error(`Failed to reject member: ${error.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBatchAction = async (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select members to perform this action');
      return;
    }

    try {
      setIsProcessing(true);

      switch (action) {
        case 'approve':
          Modal.confirm({
            title: `Approve ${selectedRowKeys.length} Members`,
            content: 'Are you sure you want to approve all selected members?',
            okText: 'Approve All',
            okType: 'primary',
            cancelText: 'Cancel',
            onOk: async () => {
              const promises = selectedRowKeys.map(id => 
                dispatch(updateMember({
                  id,
                  data: { 
                    isActive: true,
                    approvedAt: new Date().toISOString(),
                    rejectionReason: null,
                    rejectedAt: null,
                  }
                })).unwrap()
              );
              
              await Promise.all(promises);
              message.success(`${selectedRowKeys.length} members approved successfully`);
              setSelectedRowKeys([]);
              await loadMembersData();
            },
          });
          break;

        case 'reject':
          Modal.confirm({
            title: 'Reject Selected Members',
            content: (
              <div>
                <Alert
                  message="Warning"
                  description="This action will reject all selected members with the same reason."
                  type="warning"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                <Input.TextArea
                  placeholder="Enter rejection reason for all selected members"
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
            ),
            okText: 'Reject All',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
              if (!rejectReason.trim()) {
                message.error('Please provide a rejection reason');
                return;
              }
              
              const promises = selectedRowKeys.map(id => 
                dispatch(updateMember({
                  id,
                  data: { 
                    isActive: false,
                    rejectionReason: rejectReason,
                    rejectedAt: new Date().toISOString(),
                  }
                })).unwrap()
              );
              
              await Promise.all(promises);
              message.success(`${selectedRowKeys.length} members rejected`);
              setSelectedRowKeys([]);
              setRejectReason('');
              await loadMembersData();
            },
          });
          break;

        case 'export':
          // Export logic
          handleExportData();
          break;
      }
    } catch (error) {
      message.error(`Failed to ${action} members: ${error.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportData = () => {
    const dataToExport = filteredMembers.map(member => ({
      Name: `${member.firstName} ${member.lastName}`,
      Email: member.email,
      Phone: member.phone,
      Role: member.role,
      Status: member.displayStatus === 'pending' ? 'Pending Approval' : 
               member.displayStatus === 'active' ? 'Approved' : 'Rejected',
      'Applied Date': member.createdAt ? dayjs(member.createdAt).format('DD/MM/YYYY') : 'N/A',
      'Days Pending': member.daysPending || 0,
    }));

    // Simple CSV export
    const csvContent = [
      Object.keys(dataToExport[0] || {}).join(','),
      ...dataToExport.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `member-approvals-${dayjs().format('YYYY-MM-DD')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    message.success('Data exported successfully');
  };

  const handleSendReminder = (member) => {
    Modal.confirm({
      title: 'Send Reminder',
      content: `Send a reminder email to ${member.firstName} ${member.lastName} about their pending registration?`,
      okText: 'Send Reminder',
      onOk: async () => {
        try {
          // In a real app, you would call an API to send email
          message.success('Reminder sent successfully');
        } catch (error) {
          message.error('Failed to send reminder');
        }
      },
    });
  };

  const getStatusTag = (displayStatus) => {
    const statusConfig = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending Approval' },
      active: { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved' },
      rejected: { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected' },
      default: { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending' }
    };

    const config = statusConfig[displayStatus] || statusConfig.default;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.label}
      </Tag>
    );
  };

  const getRoleTag = (role) => {
    const roleConfig = {
      Member: { color: 'blue', label: 'Member' },
      PlotOwner: { color: 'purple', label: 'Plot Owner' },
      President: { color: 'red', label: 'President' },
      VicePresident: { color: 'volcano', label: 'Vice President' },
      GeneralSecretary: { color: 'orange', label: 'General Secretary' },
      FinanceSecretary: { color: 'gold', label: 'Finance Secretary' },
      ExecutiveMember: { color: 'cyan', label: 'Executive Member' },
      default: { color: 'default', label: role || 'Member' },
    };

    const config = roleConfig[role] || roleConfig.default;
    return <Tag color={config.color}>{config.label}</Tag>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return dayjs(dateString).format('DD MMM YYYY HH:mm');
    } catch {
      return 'Invalid Date';
    }
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Never';
    try {
      return dayjs(dateString).fromNow();
    } catch {
      return 'N/A';
    }
  };

  const columns = [
    {
      title: 'Applicant',
      key: 'applicant',
      width: 250,
      sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
      render: (_, record) => (
        <Space>
          <Avatar
            size="small"
            src={record.profilePhoto}
            icon={<UserOutlined />}
            className="bg-blue-500"
          >
            {record.firstName?.charAt(0) || record.email?.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-xs text-gray-500">
              Applied: {formatRelativeTime(record.createdAt)}
            </div>
            {record.displayStatus === 'pending' && record.daysPending > 3 && (
              <div className="text-xs text-red-500">
                <ClockCircleOutlined /> Pending for {record.daysPending} days
              </div>
            )}
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      width: 200,
      render: (_, record) => (
        <div>
          <div className="flex items-center text-xs">
            <MailOutlined className="mr-1" />
            {record.email || 'N/A'}
          </div>
          {record.phone && (
            <div className="flex items-center text-xs text-gray-500">
              <PhoneOutlined className="mr-1" />
              {record.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: getRoleTag,
      filters: [
        { text: 'Member', value: 'Member' },
        { text: 'Plot Owner', value: 'PlotOwner' },
        { text: 'Executive', value: 'ExecutiveMember' },
        { text: 'President', value: 'President' },
        { text: 'Vice President', value: 'VicePresident' },
        { text: 'General Secretary', value: 'GeneralSecretary' },
        { text: 'Finance Secretary', value: 'FinanceSecretary' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'displayStatus',
      key: 'status',
      width: 140,
      render: getStatusTag,
    },
    {
      title: 'Applied On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: formatDate,
      sorter: (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 300,
      fixed: 'right',
      render: (_, record) => {
        const isPending = record.displayStatus === 'pending';
        
        return (
          <Space size="small">
            <Tooltip title="View Details">
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleViewMember(record)}
              />
            </Tooltip>
            
            {isPending && (
              <>
                {record.daysPending > 2 && (
                  <Tooltip title="Send Reminder">
                    <Button
                      size="small"
                      icon={<SendOutlined />}
                      onClick={() => handleSendReminder(record)}
                      disabled={isProcessing}
                    />
                  </Tooltip>
                )}
                
                <Tooltip title="Approve">
                  <Button
                    size="small"
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleApproveMember(record._id)}
                    loading={isProcessing}
                  >
                    Approve
                  </Button>
                </Tooltip>
                
                <Tooltip title="Reject">
                  <Button
                    size="small"
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleRejectMember(record)}
                    loading={isProcessing}
                  >
                    Reject
                  </Button>
                </Tooltip>
              </>
            )}
            
            {record.displayStatus === 'rejected' && (
              <Tooltip title="View Rejection Reason">
                <Button
                  size="small"
                  icon={<CommentOutlined />}
                  onClick={() => handleViewMember(record)}
                >
                  View Reason
                </Button>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.displayStatus !== 'pending',
    }),
  };

  const batchActions = [
    {
      key: 'approve',
      label: 'Approve Selected',
      icon: <CheckCircleOutlined />,
      onClick: () => handleBatchAction('approve'),
      disabled: selectedRowKeys.length === 0,
    },
    {
      key: 'reject',
      label: 'Reject Selected',
      icon: <CloseCircleOutlined />,
      onClick: () => handleBatchAction('reject'),
      disabled: selectedRowKeys.length === 0,
    },
    {
      type: 'divider',
    },
    {
      key: 'export',
      label: 'Export Selected',
      icon: <ExportOutlined />,
      onClick: () => handleBatchAction('export'),
    },
  ];

  const tabItems = [
       {
      key: 'approved',
      label: (
        <span>
          <CheckCircleOutlined />
          Approved
          <Badge count={approvalStats.approved} style={{ marginLeft: 8 }} />
        </span>
      ),
    },
    {
      key: 'pending',
      label: (
        <span>
          <ClockCircleOutlined />
          Pending
          <Badge count={approvalStats.pending} style={{ marginLeft: 8 }} />
        </span>
      ),
    },
 
    {
      key: 'rejected',
      label: (
        <span>
          <CloseCircleOutlined />
          Rejected
          <Badge count={approvalStats.rejected} style={{ marginLeft: 8 }} />
        </span>
      ),
    },
    {
      key: 'all',
      label: (
        <span>
          <TeamOutlined />
          All Members
          <Badge count={approvalStats.total} style={{ marginLeft: 8 }} />
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 px-2 md:px-6 lg:px-3">
      {/* Error Alert */}
      {error && (
        <Alert
          type="error"
          message="Error"
          description={error}
          showIcon
          closable
          onClose={() => dispatch(clearError())}
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <Title level={3} className="mb-2">
            Member Registration Approvals
          </Title>
          <Text type="secondary">
            Review and manage member registration requests
            <span className="ml-2 text-sm">
              ({approvalStats.pending} pending requests • {approvalStats.pendingPercentage}% of total)
            </span>
          </Text>
        </div>

        <Space>
          <Tooltip title="Refresh Data">
            <Button
              icon={<ReloadOutlined />}
              onClick={loadMembersData}
              loading={loading || statsLoading}
            />
          </Tooltip>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleExportData}
            disabled={allMembers.length === 0}
          >
            Export All
          </Button>
        </Space>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Statistic
              title="Total Members"
              value={approvalStats.total}
              prefix={<TeamOutlined className="text-blue-500" />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Text type="secondary" className="text-xs">
              In database
            </Text>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Statistic
              title="Pending Requests"
              value={approvalStats.pending}
              prefix={<ClockCircleOutlined className="text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Progress 
              percent={approvalStats.pendingPercentage} 
              size="small" 
              status="active"
              strokeColor="#fa8c16"
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Statistic
              title="Approved Members"
              value={approvalStats.approved}
              prefix={<CheckCircleOutlined className="text-green-500" />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Text type="secondary" className="text-xs">
              {approvalStats.approvedToday} approved today
            </Text>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Statistic
              title="Rejected"
              value={approvalStats.rejected}
              prefix={<CloseCircleOutlined className="text-red-500" />}
              valueStyle={{ color: '#ff4d4f' }}
            />
            <Text type="secondary" className="text-xs">
              Requires review
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Role Distribution for Pending Members */}
      {approvalStats.pending > 0 && (
        <Card title="Pending Requests by Role" className="border-0 shadow-sm">
          <Row gutter={[16, 16]}>
            {Object.entries(approvalStats.pendingByRole).map(([role, count]) => (
              count > 0 && (
                <Col key={role} xs={12} sm={8} md={4}>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-gray-600 text-sm">{role}</div>
                    <Progress 
                      percent={Math.round((count / approvalStats.pending) * 100)} 
                      size="small" 
                      showInfo={false}
                    />
                  </div>
                </Col>
              )
            ))}
          </Row>
        </Card>
      )}

      {/* Tabs */}
      <Card className="border-0 shadow-sm">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={tabItems}
        />
      </Card>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
            <Input
              placeholder="Search members by name, email, phone..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-64"
              allowClear
            />

            <Select
              placeholder="Filter by Role"
              value={roleFilter}
              onChange={setRoleFilter}
              className="w-full sm:w-40"
              allowClear
            >
              <Option value="all">All Roles</Option>
              <Option value="Member">Regular Member</Option>
              <Option value="PlotOwner">Plot Owner</Option>
              <Option value="ExecutiveMember">Executive Member</Option>
              <Option value="President">President</Option>
              <Option value="VicePresident">Vice President</Option>
              <Option value="GeneralSecretary">General Secretary</Option>
              <Option value="FinanceSecretary">Finance Secretary</Option>
            </Select>

            <Select
              placeholder="Sort By"
              value={sortOrder}
              onChange={setSortOrder}
              className="w-full sm:w-40"
            >
              <Option value="newest">Newest First</Option>
              <Option value="oldest">Oldest First</Option>
              <Option value="name">Name A-Z</Option>
              <Option value="pendingDays">Longest Pending</Option>
            </Select>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            {selectedRowKeys.length > 0 && (
              <Dropdown menu={{ items: batchActions }} placement="bottomRight">
                <Button icon={<MoreOutlined />} type="primary">
                  Batch Actions ({selectedRowKeys.length})
                </Button>
              </Dropdown>
            )}

            <Button
              icon={<FilterOutlined />}
              onClick={() => {
                setSearchText('');
                setRoleFilter('all');
                setSortOrder('newest');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Members Table */}
      <Card className="border-0 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <Title level={5} className="mb-0">
            {activeTab === 'approved' ? 'Approved Members' :
            activeTab === 'pending' ? 'Pending Approvals' : 
             activeTab === 'rejected' ? 'Rejected Applications' : 'All Members'} 
            ({filteredMembers.length})
          </Title>
          <Space>
            <Badge
              count={selectedRowKeys.length}
              showZero={false}
              style={{ backgroundColor: '#1890ff' }}
            />
            <Text type="secondary" className="text-sm">
              Showing {filteredMembers.length} of {allMembers.length} members
            </Text>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredMembers}
          rowSelection={rowSelection}
          rowKey="_id"
          loading={loading || statsLoading || isProcessing}
          pagination={{
            total: filteredMembers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} members`,
          }}
          scroll={{ x: 1300 }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  loading || statsLoading ? 
                  <Spin tip="Loading members..." /> : 
                  activeTab === 'pending' ? 
                    "No pending approval requests found" :
                    "No members found"
                }
              />
            ),
          }}
        />
      </Card>

      {/* View Member Details Modal */}
      <Modal
        title="Member Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
          selectedMember && selectedMember.displayStatus === 'pending' && (
            <>
              <Button
                key="reject"
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => {
                  setViewModalVisible(false);
                  setTimeout(() => handleRejectMember(selectedMember), 100);
                }}
                loading={isProcessing}
              >
                Reject
              </Button>,
              <Button
                key="approve"
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => {
                  setViewModalVisible(false);
                  handleApproveMember(selectedMember._id);
                }}
                loading={isProcessing}
              >
                Approve Registration
              </Button>
            </>
          ),
        ]}
      >
        {selectedMember ? (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <Avatar
                size={64}
                src={selectedMember.profilePhoto}
                icon={<UserOutlined />}
                className="bg-blue-500"
              >
                {selectedMember.firstName?.charAt(0)}
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </h3>
                    <p className="text-gray-600">
                      ID: {selectedMember._id?.substring(0, 12)}...
                    </p>
                  </div>
                  <Space>
                    {getStatusTag(selectedMember.displayStatus)}
                    {getRoleTag(selectedMember.role)}
                  </Space>
                </div>
              </div>
            </div>

            <Divider />

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Email" span={2}>
                <a href={`mailto:${selectedMember.email}`}>{selectedMember.email || 'N/A'}</a>
              </Descriptions.Item>
              
              <Descriptions.Item label="Phone">
                {selectedMember.phone || 'N/A'}
              </Descriptions.Item>
              
              <Descriptions.Item label="Membership ID">
                {selectedMember.membershipId || 'N/A'}
              </Descriptions.Item>
              
              <Descriptions.Item label="Role">
                {selectedMember.role || 'N/A'}
              </Descriptions.Item>
              
              <Descriptions.Item label="Status">
                {getStatusTag(selectedMember.displayStatus)}
              </Descriptions.Item>
              
              <Descriptions.Item label="Date of Birth">
                {formatDate(selectedMember.dateOfBirth)}
              </Descriptions.Item>
              
              <Descriptions.Item label="Address" span={2}>
                {selectedMember.address?.street && <div>{selectedMember.address.street}</div>}
                {selectedMember.address?.city && <div>{selectedMember.address.city}</div>}
                {selectedMember.address?.state && <div>{selectedMember.address.state}</div>}
                {selectedMember.address?.country && <div>{selectedMember.address.country}</div>}
                {selectedMember.address?.postalCode && <div>{selectedMember.address.postalCode}</div>}
                {!selectedMember.address?.street && !selectedMember.address?.city && 'N/A'}
              </Descriptions.Item>
              
              <Descriptions.Item label="Applied On">
                {formatDate(selectedMember.createdAt)}
              </Descriptions.Item>
              
              <Descriptions.Item label="Last Updated">
                {formatRelativeTime(selectedMember.updatedAt)}
              </Descriptions.Item>
              
              {selectedMember.rejectionReason && (
                <Descriptions.Item label="Rejection Reason" span={2}>
                  <Alert
                    type="error"
                    message={selectedMember.rejectionReason}
                    showIcon
                    closable
                  />
                </Descriptions.Item>
              )}
              
              {selectedMember.approvedAt && (
                <Descriptions.Item label="Approved On">
                  {formatDate(selectedMember.approvedAt)}
                </Descriptions.Item>
              )}
              
              {selectedMember.rejectedAt && (
                <Descriptions.Item label="Rejected On">
                  {formatDate(selectedMember.rejectedAt)}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        ) : (
          <div className="text-center py-8">
            <Spin />
            <p>Loading member details...</p>
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        title="Reject Registration"
        open={rejectModalVisible}
        onCancel={() => {
          setRejectModalVisible(false);
          setRejectReason('');
          setMemberToReject(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setRejectModalVisible(false);
              setRejectReason('');
              setMemberToReject(null);
            }}
            disabled={isProcessing}
          >
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            danger
            onClick={confirmRejectMember}
            loading={isProcessing}
            disabled={!rejectReason.trim()}
          >
            Reject Registration
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <Alert
            type="warning"
            message="Warning"
            description="This action cannot be undone. The applicant will be notified of the rejection via email."
            showIcon
          />
          
          {memberToReject && (
            <div className="p-4 bg-gray-50 rounded border">
              <div className="flex items-center space-x-3">
                <Avatar src={memberToReject.profilePhoto} size="small">
                  {memberToReject.firstName?.charAt(0)}
                </Avatar>
                <div>
                  <p className="font-medium">
                    {memberToReject.firstName} {memberToReject.lastName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Email: {memberToReject.email}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Applied: {formatRelativeTime(memberToReject.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Form layout="vertical">
            <Form.Item
              label="Rejection Reason"
              required
              help="Please provide a clear and professional reason for rejection. This will be sent to the applicant."
            >
              <Input.TextArea
                placeholder="Enter the reason for rejecting this registration..."
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item label="Rejection Template" help="Select a template or write custom reason">
              <Select
                placeholder="Select a template (optional)"
                onChange={(value) => setRejectReason(value)}
                allowClear
              >
                <Option value="Thank you for your application. Unfortunately, we cannot approve your registration at this time as you do not meet the minimum requirements for membership.">
                  Standard - Requirements Not Met
                </Option>
                <Option value="Your application has been reviewed and we regret to inform you that we cannot proceed with your registration due to incomplete documentation.">
                  Incomplete Documentation
                </Option>
                <Option value="After careful review, we have decided not to proceed with your membership application as it does not align with our current membership criteria.">
                  Does Not Align with Criteria
                </Option>
              </Select>
            </Form.Item>

            <Form.Item label="Additional Notes (Internal)">
              <Input.TextArea
                placeholder="Add internal notes that will not be shared with the applicant..."
                rows={2}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default MemberApprovals;






