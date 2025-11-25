


import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Avatar,
  Descriptions,
  Button,
  Space,
  Tabs,
  List,
  Image,
  Divider,
  Spin,
  message,
  Empty
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { useEmployees } from "../hooks/useEmployees";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployeeDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/employee/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setEmployee(response.data.data);
      }
    } catch (error) {
      console.error("Fetch employee details error:", error);
      message.error("Failed to load employee details");
      navigate("/allemployee");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEmployeeDetails();
    }
  }, [id]);

  const handleDownloadDocument = (document) => {
    // Create a temporary link to download the document
    const link = document.createElement('a');
    link.href = document.fileUrl;
    link.download = document.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Layout style={{ padding: 24, minHeight: "100vh" }}>
        <div style={{ textAlign: "center", padding: "100px" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>
            <Text>Loading employee details...</Text>
          </div>
        </div>
      </Layout>
    );
  }

  if (!employee) {
    return (
      <Layout style={{ padding: 24, minHeight: "100vh" }}>
        <Empty description="Employee not found" />
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Header */}
      <div style={{ background: "white", padding: "24px", borderBottom: "1px solid #f0f0f0" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate("/allemployee")}
            >
              Back to Employees
            </Button>
          </Col>
          <Col flex="auto">
            <Title level={2} style={{ margin: 0 }}>
              Employee Profile
            </Title>
          </Col>
          <Col>
            <Tag color={employee.status === 'active' ? 'green' : 'red'}>
              {employee.status?.toUpperCase()}
            </Tag>
          </Col>
        </Row>
      </div>

      <div style={{ padding: "24px" }}>
        <Row gutter={[24, 24]}>
          {/* Left Sidebar - Profile Info */}
          <Col xs={24} lg={8}>
            <Card className="text-center">
              <Avatar
                size={120}
                src={employee.image}
                icon={<UserOutlined />}
                style={{ 
                  border: "4px solid #f0f0f0",
                  marginBottom: 16
                }}
              />
              <Title level={3} style={{ marginBottom: 8 }}>
                {employee.firstName} {employee.lastName}
              </Title>
              <Text type="secondary" style={{ fontSize: 16 }}>
                {employee.position}
              </Text>
              
              <Divider />

              {/* Quick Info */}
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <div className="text-left">
                  <Text strong>Employee ID</Text>
                  <br />
                  <Text type="secondary">{employee.employeeId}</Text>
                </div>
                
                <div className="text-left">
                  <Text strong>Department</Text>
                  <br />
                  <Tag color="blue">{employee.department}</Tag>
                </div>
                
                <div className="text-left">
                  <Text strong>Employment Type</Text>
                  <br />
                  <Text type="secondary" className="capitalize">
                    {employee.employmentType?.replace('-', ' ')}
                  </Text>
                </div>
                
                <div className="text-left">
                  <Text strong>Join Date</Text>
                  <br />
                  <Text type="secondary">
                    {employee.joinDate ? dayjs(employee.joinDate).format('MMM DD, YYYY') : 'Not set'}
                  </Text>
                </div>
              </Space>
            </Card>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={16}>
            <Card>
              <Tabs defaultActiveKey="personal">
                {/* Personal Information Tab */}
                <TabPane 
                  tab={
                    <span>
                      <UserOutlined />
                      Personal Information
                    </span>
                  } 
                  key="personal"
                >
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label="Full Name" span={2}>
                      {employee.firstName} {employee.lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      <Space>
                        <MailOutlined />
                        {employee.email}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      <Space>
                        <PhoneOutlined />
                        {employee.phone || "Not provided"}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">
                      <Space>
                        <CalendarOutlined />
                        {employee.dob ? dayjs(employee.dob).format('MMM DD, YYYY') : 'Not provided'}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Father's Name">
                      {employee.fatherName || "Not provided"}
                    </Descriptions.Item>
                    <Descriptions.Item label="NID Number">
                      {employee.nidNumber || "Not provided"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Birthplace">
                      {employee.birthplace || "Not provided"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={2}>
                      <Space>
                        <EnvironmentOutlined />
                        {employee.address || "Not provided"}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Educational Qualification">
                      {employee.educationalQualification || "Not provided"}
                    </Descriptions.Item>
                  </Descriptions>
                </TabPane>

                {/* Employment Details Tab */}
                <TabPane 
                  tab={
                    <span>
                      <TeamOutlined />
                      Employment Details
                    </span>
                  } 
                  key="employment"
                >
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label="Position">
                      {employee.position}
                    </Descriptions.Item>
                    <Descriptions.Item label="Department">
                      <Tag color="blue">{employee.department}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Employment Type">
                      <Text className="capitalize">
                        {employee.employmentType?.replace('-', ' ')}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      <Tag color={employee.status === 'active' ? 'green' : 'red'}>
                        {employee.status?.toUpperCase()}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Join Date">
                      {employee.joinDate ? dayjs(employee.joinDate).format('MMM DD, YYYY') : 'Not set'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Employee Since">
                      {employee.createdAt ? dayjs(employee.createdAt).fromNow() : 'N/A'}
                    </Descriptions.Item>
                  </Descriptions>

                  {employee.description && (
                    <>
                      <Divider />
                      <Text strong>Additional Information</Text>
                      <div style={{ marginTop: 8, padding: 12, background: '#f9f9f9', borderRadius: 6 }}>
                        <Text>{employee.description}</Text>
                      </div>
                    </>
                  )}
                </TabPane>

                {/* Documents Tab */}
                <TabPane 
                  tab={
                    <span>
                      <FileTextOutlined />
                      Documents ({employee.documents?.length || 0})
                    </span>
                  } 
                  key="documents"
                >
                  {employee.documents && employee.documents.length > 0 ? (
                    <List
                      dataSource={employee.documents}
                      renderItem={(doc) => (
                        <List.Item
                          actions={[
                            <Button 
                              type="link" 
                              icon={<EyeOutlined />}
                              onClick={() => window.open(doc.fileUrl, '_blank')}
                            >
                              View
                            </Button>,
                            <Button 
                              type="link" 
                              icon={<DownloadOutlined />}
                              onClick={() => handleDownloadDocument(doc)}
                            >
                              Download
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<FileTextOutlined style={{ fontSize: 24 }} />}
                            title={doc.name}
                            description={
                              <Space direction="vertical" size={0}>
                                <Text type="secondary">
                                  Type: <Tag size="small">{doc.documentType}</Tag>
                                </Text>
                                <Text type="secondary">
                                  Uploaded: {dayjs(doc.uploadDate).format('MMM DD, YYYY')}
                                </Text>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty 
                      description="No documents uploaded yet"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </TabPane>

                {/* Employment History Tab */}
                <TabPane 
                  tab={
                    <span>
                      <CalendarOutlined />
                      Employment History
                    </span>
                  } 
                  key="history"
                >
                  {employee.employmentHistory && employee.employmentHistory.length > 0 ? (
                    <List
                      dataSource={employee.employmentHistory}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.position}
                            description={
                              <Space direction="vertical" size={0}>
                                <Text strong>{item.companyName}</Text>
                                <Text type="secondary">
                                  {item.startDate ? dayjs(item.startDate).format('MMM YYYY') : 'N/A'} 
                                  {' - '}
                                  {item.endDate ? dayjs(item.endDate).format('MMM YYYY') : 'Present'}
                                </Text>
                                {item.responsibilities && (
                                  <Text>{item.responsibilities}</Text>
                                )}
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty 
                      description="No employment history recorded"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}


