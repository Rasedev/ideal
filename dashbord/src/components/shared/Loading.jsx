



import React from 'react';
import { Spin, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Default loading spinner
const Loading = ({ 
  size = 'large', 
  tip = 'Loading...', 
  fullScreen = false,
  type = 'spinner' 
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const renderSpinner = () => (
    <Space direction="vertical" align="center" size="middle">
      {/* ✅ Tip removed from Spin */}
      <Spin indicator={antIcon} size={size} />
      {tip && <Text type="secondary">{tip}</Text>}
    </Space>
  );

  const renderSkeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="flex space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );

  const content = type === 'skeleton' ? renderSkeleton() : renderSpinner();

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">{content}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
};

// Page Loading component
export const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <Text className="text-gray-600 text-lg">Loading your dashboard...</Text>
    </div>
  </div>
);

// Content Loading component
export const ContentLoading = ({ message = "Loading content..." }) => (
  <div className="flex justify-center items-center py-8">
    <Space direction="vertical" align="center">
      {/* ✅ Tip removed */}
      <Spin size="large" />
      <Text type="secondary">{message}</Text>
    </Space>
  </div>
);

// Button Loading component
export const ButtonLoading = () => (
  <Space>
    {/* ✅ Tip removed */}
    <Spin size="small" />
    <Text type="secondary">Processing...</Text>
  </Space>
);

// Table Loading component
export const TableLoading = () => (
  <div className="space-y-3 p-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="flex space-x-4 animate-pulse">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/6"></div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/5"></div>
        </div>
      </div>
    ))}
  </div>
);

// Card Loading component
export const CardLoading = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-48 rounded-lg"></div>
    <div className="space-y-3 mt-3">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  </div>
);

export default Loading;









