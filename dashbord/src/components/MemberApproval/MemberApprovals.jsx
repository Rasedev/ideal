import React, { useEffect, useState } from 'react';
import { Card, Input, Badge, Statistic, Typography, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined, ClockCircleOutlined } from '@ant-design/icons';
import MemberTable from './MemberTable';
import MemberDetailsModal from './MemberDetailsModal';
import RejectModal from './RejectModal';
import { fetchPendingRegistrations, approveMemberRegistration, rejectMemberRegistration, setFilters, clearError } from '../../redux/memberApproval/memberApprovalSlice';

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
