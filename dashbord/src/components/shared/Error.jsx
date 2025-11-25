// components/shared/Error.jsx
import React from 'react';
import { Result, Button, Space, Typography, Card, Divider, Alert } from 'antd';
import { 
  HomeOutlined, 
  ReloadOutlined, 
  BugOutlined,
  ExclamationCircleOutlined,
  FrownOutlined
} from '@ant-design/icons';
import { useNavigate, useRouteError } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const Error = ({ error, resetError }) => {
  const navigate = useNavigate();
  const routeError = useRouteError();
  
  // Use provided error or route error
  const currentError = error || routeError;
  
  const handleGoHome = () => {
    navigate('/');
  };

  const handleReload = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getErrorDetails = () => {
    if (!currentError) return null;

    const errorInfo = {
      message: currentError.message || 'Unknown error occurred',
      status: currentError.status || currentError.statusCode || 'N/A',
      stack: process.env.NODE_ENV === 'development' ? currentError.stack : null
    };

    // Handle different error types
    if (currentError.status === 404) {
      return {
        ...errorInfo,
        title: 'Page Not Found',
        subTitle: 'The page you are looking for does not exist or has been moved.',
        icon: <FrownOutlined />
      };
    }

    if (currentError.status === 500) {
      return {
        ...errorInfo,
        title: 'Server Error',
        subTitle: 'Something went wrong on our servers. Please try again later.',
        icon: <BugOutlined />
      };
    }

    return {
      ...errorInfo,
      title: 'Unexpected Error',
      subTitle: 'An unexpected error has occurred. Please try again.',
      icon: <ExclamationCircleOutlined />
    };
  };

  const errorDetails = getErrorDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full shadow-2xl border-0 rounded-2xl overflow-hidden">
        <div className="text-center p-8">
          {/* Animated Error Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              {errorDetails?.icon || <ExclamationCircleOutlined className="text-red-600 text-4xl" />}
            </div>
          </div>

          {/* Main Error Title */}
          <Title level={1} className="!text-red-600 !mb-4">
            {errorDetails?.title || 'Oops! Something went wrong'}
          </Title>

          {/* Error Description */}
          <Paragraph className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
            {errorDetails?.subTitle || 'We encountered an unexpected error. Our team has been notified and is working on a fix.'}
          </Paragraph>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && currentError && (
            <div className="mb-6 text-left">
              <Alert
                message="Development Error Details"
                description={
                  <div className="space-y-2">
                    <div>
                      <Text strong>Message: </Text>
                      <Text code>{errorDetails.message}</Text>
                    </div>
                    <div>
                      <Text strong>Status: </Text>
                      <Text code>{errorDetails.status}</Text>
                    </div>
                    {errorDetails.stack && (
                      <div>
                        <Text strong>Stack: </Text>
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto max-h-32">
                          {errorDetails.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                }
                type="error"
                closable
              />
            </div>
          )}

          {/* Quick Fix Suggestions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <Title level={4} className="!text-blue-800 !mb-3">
              Quick Fixes to Try
            </Title>
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <Text>Refresh the page to reload the application</Text>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <Text>Clear your browser cache and cookies</Text>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <Text>Check your internet connection</Text>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <Text>Try accessing from a different browser</Text>
              </div>
            </Space>
          </div>

          {/* Action Buttons */}
          <Space direction="vertical" size="middle" className="w-full max-w-xs mx-auto">
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              size="large"
              block
              onClick={handleReload}
              className="h-12 font-semibold"
            >
              Reload Page
            </Button>

            <Button
              icon={<HomeOutlined />}
              size="large"
              block
              onClick={handleGoHome}
              className="h-12 font-semibold"
            >
              Go to Homepage
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

          <Divider />

          {/* Support Information */}
          <div className="space-y-3">
            <Text type="secondary" className="block">
              If the problem persists, please contact our support team.
            </Text>
            <Space size="large">
              <a 
                href="mailto:support@association.com" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                📧 Email Support
              </a>
              <a 
                href="tel:+1234567890" 
                className="text-green-600 hover:text-green-700 font-medium"
              >
                📞 Call Support
              </a>
              <a 
                href="/help" 
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                ❓ Help Center
              </a>
            </Space>
          </div>

          {/* Error ID for tracking */}
          {currentError && (
            <div className="mt-4">
              <Text type="secondary" className="text-xs">
                Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Specific error components
export const NotFoundError = () => (
  <Error error={{ status: 404, message: 'Page not found' }} />
);

export const ServerError = () => (
  <Error error={{ status: 500, message: 'Internal server error' }} />
);

export const NetworkError = () => (
  <Error error={{ message: 'Network connection failed' }} />
);

export default Error;