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









import React, { useEffect, useState } from 'react';
import { Card, Input, Badge, Statistic, Typography, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined, ClockCircleOutlined } from '@ant-design/icons';
import MemberTable from '../../components/MemberApproval/MemberTable';
import MemberDetailsModal from '../../components/MemberApproval/MemberDetailsModal';
import RejectModal from '../../components/MemberApproval/RejectModal';
// Slice actions
import { setFilters, clearError } from '../slices/memberApprovalSlice';

// Thunks
import { fetchPendingRegistrations, approveMemberRegistration, rejectMemberRegistration } 
  from '../slices/memberApprovalThunks';


const { Title, Text } = Typography;
const { Search } = Input;

const MemberApprovals = () => {
  const dispatch = useDispatch();
  const { pendingRegistrations, loading, error, filters } = useSelector(state => state.memberApproval);
  const [selectedMember, setSelectedMember] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectingId, setRejectingId] = useState(null);

  useEffect(() => {
    dispatch(fetchPendingRegistrations());
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) { message.error(error); dispatch(clearError()); }
  }, [error, dispatch]);

  const handleApprove = async (id) => {
    try { await dispatch(approveMemberRegistration(id)).unwrap(); message.success('Approved'); } 
    catch { message.error('Failed to approve'); }
  };

  const handleReject = (id) => { setRejectingId(id); setRejectVisible(true); };
  const confirmReject = async () => { 
    try { await dispatch(rejectMemberRegistration({ memberId: rejectingId, reason: rejectReason })).unwrap(); setRejectVisible(false); setRejectReason(''); } 
    catch { message.error('Failed to reject'); } 
  };

  return (
    <Card className="shadow-xl rounded-2xl p-4">
      <div className="flex flex-col lg:flex-row justify-between mb-6 gap-4">
        <div>
          <Title level={2}><SearchOutlined /> Member Approvals</Title>
          <Text>Review and approve new registrations</Text>
        </div>
        <Badge count={pendingRegistrations.length} showZero>
          <Statistic title="Pending Approvals" value={pendingRegistrations.length} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#faad14' }} />
        </Badge>
      </div>

      <div className="mb-6">
        <Search placeholder="Search..." allowClear onSearch={value => dispatch(setFilters({ search: value }))} style={{ width: '100%' }} />
      </div>

      <MemberTable
        data={pendingRegistrations}
        loading={loading}
        onView={member => { setSelectedMember(member); setDetailsVisible(true); }}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <MemberDetailsModal member={selectedMember} visible={detailsVisible} onClose={() => setDetailsVisible(false)} onApprove={handleApprove} onReject={handleReject} />
      <RejectModal visible={rejectVisible} onCancel={() => setRejectVisible(false)} onConfirm={confirmReject} reason={rejectReason} setReason={setRejectReason} />
    </Card>
  );
};

export default MemberApprovals;











