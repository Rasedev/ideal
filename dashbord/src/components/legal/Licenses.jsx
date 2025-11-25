// components/legal/Licenses.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
  Tooltip,
  Progress,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  SafetyCertificateOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

const Licenses = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingLicense, setEditingLicense] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const response = await fetch('/api/legal/licenses', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setLicenses(data.licenses || []);
    } catch (error) {
      console.error('Error fetching licenses:', error);
      message.error('Failed to load licenses');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLicense = async (values) => {
    try {
      const response = await fetch('/api/legal/licenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        message.success('License created successfully');
        setModalVisible(false);
        form.resetFields();
        fetchLicenses();
      } else {
        throw new Error('Failed to create license');
      }
    } catch (error) {
      message.error('Failed to create license');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'green',
      'Expired': 'red',
      'Pending Renewal': 'orange',
      'Suspended': 'volcano',
      'Revoked': 'red'
    };
    return colors[status] || 'default';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Business License': 'blue',
      'Tax Certificate': 'green',
      'Permit': 'orange',
      'Accreditation': 'purple',
      'Insurance': 'cyan',
      'Other': 'default'
    };
    return colors[type] || 'default';
  };

  const getDaysUntilExpiry = (expirationDate) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expirationDate, status) => {
    if (status !== 'Active') return status;
    
    const daysUntilExpiry = getDaysUntilExpiry(expirationDate);
    if (daysUntilExpiry < 0) return 'Expired';
    if (daysUntilExpiry <= 30) return 'Expiring Soon';
    return 'Active';
  };

  const columns = [
    {
      title: 'License Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <SafetyCertificateOutlined style={{ color: '#52c41a' }} />
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={getTypeColor(type)}>
          {type}
        </Tag>
      )
    },
    {
      title: 'License Number',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber'
    },
    {
      title: 'Issuing Authority',
      dataIndex: 'issuingAuthority',
      key: 'issuingAuthority'
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (date, record) => {
        const daysUntilExpiry = getDaysUntilExpiry(date);
        const status = getExpiryStatus(date, record.status);
        
        return (
          <Space>
            <span>{new Date(date).toLocaleDateString()}</span>
            {status === 'Expiring Soon' && (
              <Tooltip title={`Expires in ${daysUntilExpiry} days`}>
                <ExclamationCircleOutlined style={{ color: '#faad14' }} />
              </Tooltip>
            )}
            {status === 'Expired' && (
              <Tooltip title="License has expired">
                <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
              </Tooltip>
            )}
          </Space>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        const actualStatus = getExpiryStatus(record.expirationDate, status);
        return (
          <Tag color={getStatusColor(actualStatus)}>
            {actualStatus}
          </Tag>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="link" 
              icon={<EyeOutlined />}
              onClick={() => handleViewLicense(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEditLicense(record)}
            />
          </Tooltip>
          <Tooltip title="Download">
            <Button 
              type="link" 
              icon={<DownloadOutlined />}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleEditLicense = (license) => {
    setEditingLicense(license);
    form.setFieldsValue({
      ...license,
      issueDate: license.issueDate ? moment(license.issueDate) : null,
      expirationDate: license.expirationDate ? moment(license.expirationDate) : null
    });
    setModalVisible(true);
  };

  const handleViewLicense = (license) => {
    // Implementation for viewing license details
    console.log('View license:', license);
  };

  const expiringLicenses = licenses.filter(license => {
    const daysUntilExpiry = getDaysUntilExpiry(license.expirationDate);
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30 && license.status === 'Active';
  });

  const expiredLicenses = licenses.filter(license => {
    const daysUntilExpiry = getDaysUntilExpiry(license.expirationDate);
    return daysUntilExpiry < 0 && license.status === 'Active';
  });

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Card
          title={
            <Space>
              <SafetyCertificateOutlined />
              Licenses & Certificates
            </Space>
          }
          extra={
            <Space>
              <Search placeholder="Search licenses..." style={{ width: 200 }} />
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingLicense(null);
                  setModalVisible(true);
                  form.resetFields();
                }}
              >
                New License
              </Button>
            </Space>
          }
        >
          {/* Statistics */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={8}>
              <Card size="small">
                <Statistic
                  title="Total Licenses"
                  value={licenses.length}
                  prefix={<SafetyCertificateOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card size="small">
                <Statistic
                  title="Expiring Soon"
                  value={expiringLicenses.length}
                  valueStyle={{ color: expiringLicenses.length > 0 ? '#faad14' : '#52c41a' }}
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card size="small">
                <Statistic
                  title="Expired"
                  value={expiredLicenses.length}
                  valueStyle={{ color: expiredLicenses.length > 0 ? '#ff4d4f' : '#52c41a' }}
                  prefix={<ExclamationCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Licenses Table */}
          <Table
            columns={columns}
            dataSource={licenses}
            loading={loading}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true
            }}
          />
        </Card>

        {/* Create/Edit License Modal */}
        <Modal
          title={editingLicense ? "Edit License" : "Create New License"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingLicense(null);
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateLicense}
          >
            <Form.Item
              name="name"
              label="License Name"
              rules={[{ required: true, message: 'Please enter license name' }]}
            >
              <Input placeholder="Enter license name" />
            </Form.Item>

            <Form.Item
              name="type"
              label="License Type"
              rules={[{ required: true, message: 'Please select license type' }]}
            >
              <Select placeholder="Select license type">
                <Option value="Business License">Business License</Option>
                <Option value="Tax Certificate">Tax Certificate</Option>
                <Option value="Permit">Permit</Option>
                <Option value="Accreditation">Accreditation</Option>
                <Option value="Insurance">Insurance</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="licenseNumber"
                  label="License Number"
                  rules={[{ required: true, message: 'Please enter license number' }]}
                >
                  <Input placeholder="Enter license number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="issuingAuthority"
                  label="Issuing Authority"
                  rules={[{ required: true, message: 'Please enter issuing authority' }]}
                >
                  <Input placeholder="Enter issuing authority" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="issueDate"
                  label="Issue Date"
                  rules={[{ required: true, message: 'Please select issue date' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="expirationDate"
                  label="Expiration Date"
                  rules={[{ required: true, message: 'Please select expiration date' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select status">
                <Option value="Active">Active</Option>
                <Option value="Pending Renewal">Pending Renewal</Option>
                <Option value="Suspended">Suspended</Option>
                <Option value="Revoked">Revoked</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="notes"
              label="Notes"
            >
              <Input.TextArea rows={3} placeholder="Additional notes..." />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingLicense ? 'Update License' : 'Create License'}
                </Button>
                <Button onClick={() => {
                  setModalVisible(false);
                  setEditingLicense(null);
                }}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Licenses;