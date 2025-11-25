import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const MemberDetailsModal = ({ member, visible, onClose, onApprove, onReject }) => {
  if (!member) return null;

  return (
    <Modal
      title="Member Registration Details"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>Close</Button>,
        <Button key="reject" danger icon={<CloseCircleOutlined />} onClick={() => onReject(member._id)}>Reject</Button>,
        <Button key="approve" type="primary" icon={<CheckCircleOutlined />} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} onClick={() => onApprove(member._id)}>Approve</Button>
      ]}
      width={700}
    >
      <Descriptions column={2} bordered>
        <Descriptions.Item label="Full Name" span={2}>{`${member.firstName} ${member.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Email">{member.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{member.phones?.[0]?.number || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Role"><Tag color="blue">{member.role}</Tag></Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>{member.address || 'N/A'}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default MemberDetailsModal;
