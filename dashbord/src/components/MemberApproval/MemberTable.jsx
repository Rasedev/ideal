import React from 'react';
import { Table, Space, Button, Tag, Avatar } from 'antd';
import { EyeOutlined, CheckCircleOutlined, CloseCircleOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const MemberTable = ({ data, loading, onView, onApprove, onReject }) => {

  const getPrimaryPhone = (member) => {
    if (!member.phones || member.phones.length === 0) return 'No phone';
    const primaryPhone = member.phones.find(p => p.isPrimary) || member.phones[0];
    return `${primaryPhone.countryCode || ''}${primaryPhone.number}`;
  };

  const columns = [
    {
      title: 'Applicant',
      dataIndex: 'firstName',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Avatar src={record.profilePhoto} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
            <Tag color="blue" icon={<ClockCircleOutlined />}>Pending</Tag>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact Info',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div>{getPrimaryPhone(record)}</div>
          <div className="text-xs text-gray-500">{record.address?.substring(0, 50)}...</div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => <Tag color={role === 'PlotOwner' ? 'purple' : 'blue'}>{role?.replace(/([A-Z])/g, ' $1').trim()}</Tag>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EyeOutlined />} onClick={() => onView(record)}>View</Button>
          <Button icon={<CheckCircleOutlined />} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} onClick={() => onApprove(record._id)}>Approve</Button>
          <Button danger icon={<CloseCircleOutlined />} onClick={() => onReject(record._id)}>Reject</Button>
        </Space>
      ),
    }
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" scroll={{ x: 800 }} pagination={{ pageSize: 10, showSizeChanger: true }} />;
};

export default MemberTable;
