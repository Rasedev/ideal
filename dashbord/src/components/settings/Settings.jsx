// components/settings/Settings.jsx
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Upload, 
  Avatar, 
  message, 
  Divider,
  Row,
  Col,
  Typography,
  Space,
  Alert
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  SettingOutlined, 
  UploadOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SafetyOutlined,
  NotificationOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../components/slices/userSlice';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

/**
 * Profile Settings Component
 */
const ProfileSettings = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user?.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.profilePhoto || '');

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone,
        addressOne: user.addressOne,
        addressTwo: user.addressTwo,
        city: user.city,
        postCode: user.postCode,
        division: user.division,
        district: user.district,
      });
    }
  }, [user, form]);

  const handleProfileUpdate = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3000/api/v1/user/profile',
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        dispatch(updateCurrentUser(response.data.user));
        message.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (file) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.post(
        'http://localhost:3000/api/v1/user/upload-avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAvatarUrl(response.data.avatarUrl);
        dispatch(updateCurrentUserInfo({ profilePhoto: response.data.avatarUrl }));
        message.success('Profile picture updated successfully!');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      message.error('Failed to upload profile picture');
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG files!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }
      handleAvatarUpload(file);
      return false; // Prevent auto upload
    },
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Avatar
          size={100}
          src={avatarUrl}
          icon={<UserOutlined />}
          className="border-4 border-white shadow-lg mb-4"
        />
        <Upload {...uploadProps} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Change Photo</Button>
        </Upload>
        <Text type="secondary" className="block mt-2">
          JPG or PNG, max 2MB
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleProfileUpdate}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="First Name" 
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Last Name" 
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter valid email' }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Email Address" 
            size="large"
            disabled
          />
        </Form.Item>

        <Form.Item
          name="telephone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input 
            prefix={<PhoneOutlined />} 
            placeholder="Phone Number" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="addressOne"
          label="Address Line 1"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input 
            prefix={<EnvironmentOutlined />} 
            placeholder="Street Address" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="addressTwo"
          label="Address Line 2 (Optional)"
        >
          <Input 
            prefix={<EnvironmentOutlined />} 
            placeholder="Apartment, Suite, etc." 
            size="large"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please enter city' }]}
            >
              <Input placeholder="City" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="postCode"
              label="Postal Code"
              rules={[{ required: true, message: 'Please enter postal code' }]}
            >
              <Input placeholder="Postal Code" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="division"
              label="Division"
              rules={[{ required: true, message: 'Please select division' }]}
            >
              <Select placeholder="Select Division" size="large">
                <Option value="dhaka">Dhaka</Option>
                <Option value="chattogram">Chattogram</Option>
                <Option value="rajshahi">Rajshahi</Option>
                <Option value="khulna">Khulna</Option>
                <Option value="barishal">Barishal</Option>
                <Option value="sylhet">Sylhet</Option>
                <Option value="rangpur">Rangpur</Option>
                <Option value="mymensingh">Mymensingh</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="district"
          label="District"
          rules={[{ required: true, message: 'Please select district' }]}
        >
          <Select placeholder="Select District" size="large">
            <Option value="dhaka">Dhaka</Option>
            <Option value="gazipur">Gazipur</Option>
            <Option value="narayanganj">Narayanganj</Option>
            <Option value="chattogram">Chattogram</Option>
            <Option value="coxsbazar">Cox's Bazar</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<SaveOutlined />}
            size="large"
          >
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

/**
 * Security Settings Component
 */
const SecuritySettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3000/api/v1/user/change-password',
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        message.success('Password changed successfully!');
        form.resetFields();
      }
    } catch (error) {
      console.error('Password change error:', error);
      message.error(error.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Alert
        message="Security Recommendations"
        description="Use a strong password that you don't use for other websites. Enable two-factor authentication for additional security."
        type="info"
        showIcon
        closable
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handlePasswordChange}
        requiredMark={false}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[{ required: true, message: 'Please enter current password' }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Current Password" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Please enter new password' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="New Password" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Confirm New Password" 
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<SafetyOutlined />}
            size="large"
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <Title level={4}>Two-Factor Authentication</Title>
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Text strong>Two-Factor Authentication</Text>
          <div>
            <Text type="secondary">
              Add an extra layer of security to your account
            </Text>
          </div>
        </div>
        <Switch />
      </div>

      <Divider />

      <Title level={4}>Login Sessions</Title>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 border rounded">
          <div>
            <Text strong>Current Session</Text>
            <div>
              <Text type="secondary">Chrome on Windows • Just now</Text>
            </div>
          </div>
          <Button type="link" danger>Logout</Button>
        </div>
      </div>
    </div>
  );
};

/**
 * General Settings Component
 */
const GeneralSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleGeneralSettings = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3000/api/v1/user/settings',
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        message.success('Settings updated successfully!');
      }
    } catch (error) {
      console.error('Settings update error:', error);
      message.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleGeneralSettings}
        initialValues={{
          language: 'en',
          timezone: 'Asia/Dhaka',
          emailNotifications: true,
          pushNotifications: false,
          smsNotifications: true
        }}
      >
        <Title level={4}>Language & Region</Title>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="language" label="Language">
              <Select size="large">
                <Option value="en">English</Option>
                <Option value="bn">Bengali</Option>
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="timezone" label="Timezone">
              <Select size="large">
                <Option value="Asia/Dhaka">Dhaka (UTC+6)</Option>
                <Option value="America/New_York">New York (UTC-5)</Option>
                <Option value="Europe/London">London (UTC+0)</Option>
                <Option value="Asia/Dubai">Dubai (UTC+4)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Notifications</Title>

        <Form.Item name="emailNotifications" valuePropName="checked">
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <Text strong>Email Notifications</Text>
              <div>
                <Text type="secondary">Receive email updates about your account</Text>
              </div>
            </div>
            <Switch />
          </div>
        </Form.Item>

        <Form.Item name="pushNotifications" valuePropName="checked">
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <Text strong>Push Notifications</Text>
              <div>
                <Text type="secondary">Receive browser push notifications</Text>
              </div>
            </div>
            <Switch />
          </div>
        </Form.Item>

        <Form.Item name="smsNotifications" valuePropName="checked">
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <Text strong>SMS Notifications</Text>
              <div>
                <Text type="secondary">Receive important updates via SMS</Text>
              </div>
            </div>
            <Switch />
          </div>
        </Form.Item>

        <Divider />

        <Title level={4}>Privacy</Title>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <Text strong>Profile Visibility</Text>
              <div>
                <Text type="secondary">Who can see your profile information</Text>
              </div>
            </div>
            <Select defaultValue="members" style={{ width: 120 }}>
              <Option value="public">Public</Option>
              <Option value="members">Members Only</Option>
              <Option value="private">Private</Option>
            </Select>
          </div>

          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <Text strong>Activity Status</Text>
              <div>
                <Text type="secondary">Show when you're active</Text>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <Form.Item className="mt-6">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<SaveOutlined />}
            size="large"
          >
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

/**
 * Main Settings Component
 */
const Settings = ({ tab = 'profile' }) => {
  const user = useSelector((state) => state.user?.value);

  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          Profile
        </span>
      ),
      children: <ProfileSettings />,
    },
    {
      key: 'security',
      label: (
        <span>
          <LockOutlined />
          Security
        </span>
      ),
      children: <SecuritySettings />,
    },
    {
      key: 'general',
      label: (
        <span>
          <SettingOutlined />
          General
        </span>
      ),
      children: <GeneralSettings />,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>
          <SettingOutlined className="mr-3" />
          Settings
        </Title>
        <Text type="secondary">
          Manage your account settings and preferences
        </Text>
      </div>

      <Card className="shadow-sm border-0">
        <Tabs
          defaultActiveKey={tab}
          items={tabItems}
          tabPosition="left"
          size="large"
          style={{ minHeight: 400 }}
        />
      </Card>
    </div>
  );
};

// Named exports for individual settings components
export { ProfileSettings, SecuritySettings, GeneralSettings };

// Default export for the main Settings component
export default Settings;