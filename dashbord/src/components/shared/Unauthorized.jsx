// components/shared/Unauthorized.jsx
import React from 'react';
import { Result, Button, Space, Typography, Card } from 'antd';
import { SecurityScanOutlined, HomeOutlined, LoginOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Title, Text, Paragraph } = Typography;

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user?.value);

  const from = location.state?.from?.pathname || '/';
  const requiredRole = location.state?.requiredRole;

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const getRoleDescription = (role) => {
    const roleDescriptions = {
      admin: 'Administrator - Full system access',
      hr: 'HR Manager - Employee and user management',
      employee: 'Employee - Limited access to assigned tasks',
      member: 'Member - Basic membership features'
    };
    return roleDescriptions[role] || role;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl border-0 rounded-2xl overflow-hidden">
        <div className="text-center p-8">
          {/* Animated Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <LockOutlined className="text-red-600 text-3xl" />
            </div>
          </div>

          {/* Main Title */}
          <Title level={1} className="!text-red-600 !mb-4">
            Access Denied
          </Title>

          {/* Description */}
          <Paragraph className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
            You don't have permission to access this page. This area requires specific privileges that your current account doesn't have.
          </Paragraph>

          {/* Current User Info */}
          {user && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <Title level={4} className="!text-blue-800 !mb-2">
                Current Account Information
              </Title>
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex justify-between">
                  <Text strong>Role:</Text>
                  <Text className="capitalize">{user.role}</Text>
                </div>
                <div className="flex justify-between">
                  <Text strong>Email:</Text>
                  <Text>{user.email}</Text>
                </div>
                {requiredRole && (
                  <div className="flex justify-between">
                    <Text strong>Required Role:</Text>
                    <Text className="capitalize text-red-600">{requiredRole}</Text>
                  </div>
                )}
              </Space>
            </div>
          )}

          {/* Role Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <Title level={4} className="!text-gray-800 !mb-3">
              Available Roles & Permissions
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              {['admin', 'hr', 'employee', 'member'].map((role) => (
                <div key={role} className="flex items-center space-x-2 p-2 rounded hover:bg-white transition-colors">
                  <div className={`w-3 h-3 rounded-full ${
                    role === 'admin' ? 'bg-purple-500' :
                    role === 'hr' ? 'bg-blue-500' :
                    role === 'employee' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div>
                    <Text strong className="capitalize">{role}</Text>
                    <Text type="secondary" className="block text-xs">
                      {getRoleDescription(role)}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <Space direction="vertical" size="middle" className="w-full max-w-xs mx-auto">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              size="large"
              block
              onClick={handleGoHome}
              className="h-12 font-semibold"
            >
              Go to Dashboard
            </Button>

            <Button
              icon={<LoginOutlined />}
              size="large"
              block
              onClick={handleLogin}
              className="h-12 font-semibold"
            >
              Switch Account
            </Button>

            <Button
              type="dashed"
              size="large"
              block
              onClick={handleGoBack}
              className="h-12"
            >
              Go Back
            </Button>
          </Space>

          {/* Contact Support */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Text type="secondary" className="text-sm">
              Need higher access?{' '}
              <a 
                href="mailto:admin@association.com" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact Administrator
              </a>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Unauthorized;