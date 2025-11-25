import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Typography,
  Tag,
  message,
  Row,
  Col,
  Statistic,
  Divider,
  Descriptions,
  Avatar,
  List,
  Modal,
  Upload,
  Select,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import {
  ProfileOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ApartmentOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AboutAssociation = () => {
  const [association, setAssociation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

  useEffect(() => {
    fetchAssociationData();
  }, []);

  const fetchAssociationData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/association/about', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setAssociation(response.data.association);
        form.setFieldsValue({
          ...response.data.association,
          established: response.data.association.established ? dayjs(response.data.association.established) : null,
        });
      }
    } catch (error) {
      message.error('Failed to fetch association data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3000/api/v1/association/about',
        {
          ...values,
          established: values.established ? values.established.format('YYYY-MM-DD') : null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Association information updated successfully');
        setEditing(false);
        fetchAssociationData();
      }
    } catch (error) {
      message.error('Failed to update association information');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    form.setFieldsValue({
      ...association,
      established: association.established ? dayjs(association.established) : null,
    });
  };

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  if (!association) {
    return (
      <div className="min-h-screen p-4">
        <Card className={`shadow-xl rounded-2xl ${cardClass}`} loading={loading}>
          <div className="text-center py-12">
            <Title level={3}>Loading Association Information...</Title>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`} loading={loading}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <ProfileOutlined className="mr-3" />
              About Association
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Manage association basic information and details
            </Text>
          </div>
          {!editing ? (
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={() => setEditing(true)}
            >
              Edit Information
            </Button>
          ) : (
            <Space>
              <Button 
                icon={<CloseOutlined />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
              >
                Save Changes
              </Button>
            </Space>
          )}
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          disabled={!editing}
        >
          <Row gutter={[24, 24]}>
            {/* Basic Information */}
            <Col xs={24} lg={12}>
              <Card title="Basic Information" className="mb-6">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item
                      label="Association Name"
                      name="associationName"
                      rules={[{ required: true, message: 'Please enter association name' }]}
                    >
                      <Input 
                        prefix={<ApartmentOutlined />}
                        placeholder="Enter association name"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Head Office"
                      name="headOffice"
                    >
                      <Input 
                        prefix={<EnvironmentOutlined />}
                        placeholder="Enter head office address"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Description"
                      name="description"
                    >
                      <TextArea 
                        rows={4}
                        placeholder="Enter association description and mission"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Established Date"
                      name="established"
                    >
                      <DatePicker 
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
                        placeholder="Select establishment date"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Monthly Subscription"
                      name="monthlySubscriptionAmount"
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        prefix="৳"
                        placeholder="Enter subscription amount"
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Contact Information */}
            <Col xs={24} lg={12}>
              <Card title="Contact Information" className="mb-6">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item
                      label="Contact Email"
                      name="contactEmail"
                      rules={[
                        { required: true, message: 'Please enter contact email' },
                        { type: 'email', message: 'Please enter valid email' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined />}
                        placeholder="Enter contact email"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Contact Phone Numbers"
                      name="contactPhone"
                    >
                      <Select
                        mode="tags"
                        placeholder="Enter phone numbers"
                        style={{ width: '100%' }}
                        tokenSeparators={[',']}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Association Address"
                      name="associationAddress"
                    >
                      <TextArea 
                        rows={3}
                        placeholder="Enter full association address"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Plot Numbers"
                      name="plotNumber"
                    >
                      <Select
                        mode="tags"
                        placeholder="Enter plot numbers"
                        style={{ width: '100%' }}
                        tokenSeparators={[',']}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Statistics */}
          <Card title="Association Statistics" className="mb-6">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="Total Members"
                  name="totalMembers"
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Enter total members count"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="Total Employees"
                  name="totalEmployees"
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Enter total employees count"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  label="Total Plot Owners"
                  name="totalPlotOwners"
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Enter total plot owners count"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Association Status"
                  name="isActive"
                  valuePropName="checked"
                >
                  <Switch 
                    checkedChildren="Active" 
                    unCheckedChildren="Inactive" 
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>

        {/* Preview Section (Read-only) */}
        {!editing && (
          <>
            <Divider />
            <Title level={3}>Association Overview</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="Association Name">
                      {association.associationName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Head Office">
                      {association.headOffice || 'Not specified'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Established">
                      {association.established ? dayjs(association.established).format('MMMM D, YYYY') : 'Not specified'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Monthly Subscription">
                      <Text strong>৳{association.monthlySubscriptionAmount?.toLocaleString()}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      <Tag color={association.isActive ? 'green' : 'red'}>
                        {association.isActive ? 'Active' : 'Inactive'}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="Contact Email">
                      {association.contactEmail}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone Numbers">
                      {association.contactPhone?.length > 0 ? (
                        <List
                          size="small"
                          dataSource={association.contactPhone}
                          renderItem={phone => <List.Item>{phone}</List.Item>}
                        />
                      ) : (
                        'Not specified'
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {association.associationAddress || 'Not specified'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Plot Numbers">
                      {association.plotNumber?.length > 0 ? association.plotNumber.join(', ') : 'Not specified'}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            {/* Statistics Cards */}
            <Row gutter={[16, 16]} className="mt-6">
              <Col xs={24} sm={8}>
                <Card className="text-center">
                  <Statistic
                    title="Total Members"
                    value={association.totalMembers || 0}
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card className="text-center">
                  <Statistic
                    title="Total Employees"
                    value={association.totalEmployees || 0}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card className="text-center">
                  <Statistic
                    title="Plot Owners"
                    value={association.totalPlotOwners || 0}
                    prefix={<ApartmentOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Description Preview */}
            {association.description && (
              <Card title="Association Description" className="mt-6">
                <Text>{association.description}</Text>
              </Card>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default AboutAssociation;