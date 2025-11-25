



import React, { useState, useEffect } from 'react';
import { Layout, Card, Descriptions, Spin, Button, message } from 'antd';
import axios from 'axios';

const { Header, Content } = Layout;

const HRDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [hrData, setHRData] = useState(null);

  const fetchHRProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Sending token:", token);
      
      const res = await axios.get("http://localhost:3000/api/v1/hr/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHRData(res.data);
    } catch (error) {
      console.error("HR profile fetch error:", error);
      message.error(error.response?.data?.message || "Failed to load HR data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHRProfile();
  }, []);

  if (loading) {
    return (
      <Layout className="min-h-screen">
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  if (!hrData) {
    return (
      <Layout className="min-h-screen">
        <div className="flex justify-center items-center h-full">
          <p>Failed to load HR profile</p>
          <Button onClick={fetchHRProfile}>Retry</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white p-0">
        <h2 className="p-6 text-xl font-semibold">HR Dashboard</h2>
      </Header>
      <Content className="m-6">
        <Card title="HR Profile">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{hrData.firstName} {hrData.lastName}</Descriptions.Item>
            <Descriptions.Item label="Email">{hrData.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{hrData.telephone}</Descriptions.Item>
            <Descriptions.Item label="Address">{hrData.addressOne}, {hrData.city}</Descriptions.Item>
            <Descriptions.Item label="Division">{hrData.division}</Descriptions.Item>
            <Descriptions.Item label="District">{hrData.district}</Descriptions.Item>
            <Descriptions.Item label="Role">{hrData.role}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
    </Layout>
  );
};

export default HRDashboard;















