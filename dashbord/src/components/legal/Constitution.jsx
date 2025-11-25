// components/legal/Constitution.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Space,
  Tag,
  Timeline,
  List,
  Collapse,
  Divider,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
  Typography,
  Descriptions
} from 'antd';
import {
  FileTextOutlined,
  EditOutlined,
  HistoryOutlined,
  DownloadOutlined,
  UploadOutlined,
  PlusOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

const Constitution = () => {
  const [constitution, setConstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [amendmentModalVisible, setAmendmentModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchConstitution();
  }, []);

  const fetchConstitution = async () => {
    try {
      const response = await fetch('/api/legal/constitution', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConstitution(data);
      }
    } catch (error) {
      console.error('Error fetching constitution:', error);
      message.error('Failed to load constitution');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConstitution = async (values) => {
    try {
      const response = await fetch('/api/legal/constitution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        message.success('Constitution updated successfully');
        setEditModalVisible(false);
        fetchConstitution();
      } else {
        throw new Error('Failed to update constitution');
      }
    } catch (error) {
      message.error('Failed to update constitution');
    }
  };

  const handleAddAmendment = async (values) => {
    // Implementation for adding amendments
    console.log('Adding amendment:', values);
    setAmendmentModalVisible(false);
    message.success('Amendment added successfully');
  };

  const ConstitutionSection = ({ section }) => (
    <div style={{ marginBottom: '24px' }}>
      <Title level={4}>
        {section.sectionNumber}. {section.title}
      </Title>
      <Paragraph style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
        {section.content}
      </Paragraph>
      
      {section.subSections && section.subSections.length > 0 && (
        <div style={{ marginLeft: '24px' }}>
          {section.subSections.map((subSection, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <Text strong>
                {section.sectionNumber}.{subSection.subSectionNumber} {subSection.title}
              </Text>
              <Paragraph style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>
                {subSection.content}
              </Paragraph>
            </div>
          ))}
        </div>
      )}
      <Divider />
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Card
          loading={loading}
          title={
            <Space>
              <FileTextOutlined />
              Constitution & By-laws
            </Space>
          }
          extra={
            <Space>
              <Button icon={<DownloadOutlined />}>
                Export PDF
              </Button>
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => setEditModalVisible(true)}
              >
                Edit Constitution
              </Button>
            </Space>
          }
        >
          {constitution ? (
            <>
              {/* Constitution Header */}
              <Descriptions 
                bordered 
                column={2}
                style={{ marginBottom: '24px' }}
              >
                <Descriptions.Item label="Title" span={2}>
                  {constitution.title}
                </Descriptions.Item>
                <Descriptions.Item label="Version">
                  <Tag color="blue">v{constitution.version}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color="green">{constitution.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Effective Date">
                  {new Date(constitution.effectiveDate).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Last Modified">
                  {new Date(constitution.updatedAt).toLocaleDateString()}
                </Descriptions.Item>
              </Descriptions>

              {/* Constitution Content */}
              <Card 
                title="Content" 
                style={{ marginBottom: '24px' }}
                extra={
                  <Button 
                    type="link" 
                    icon={<HistoryOutlined />}
                    onClick={() => setAmendmentModalVisible(true)}
                  >
                    Add Amendment
                  </Button>
                }
              >
                {constitution.sections && constitution.sections.length > 0 ? (
                  constitution.sections.map((section, index) => (
                    <ConstitutionSection key={index} section={section} />
                  ))
                ) : (
                  <Paragraph style={{ textAlign: 'center', color: '#8c8c8c' }}>
                    No sections defined. Start by editing the constitution.
                  </Paragraph>
                )}
              </Card>

              {/* Amendments History */}
              {constitution.amendments && constitution.amendments.length > 0 && (
                <Card title="Amendment History">
                  <Timeline>
                    {constitution.amendments.map((amendment, index) => (
                      <Timeline.Item
                        key={index}
                        dot={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                      >
                        <Space direction="vertical" size={0}>
                          <Text strong>Amendment {amendment.amendmentNumber}</Text>
                          <Text type="secondary">{amendment.description}</Text>
                          <Text type="secondary">
                            Effective: {new Date(amendment.effectiveDate).toLocaleDateString()}
                          </Text>
                          {amendment.changedSections && (
                            <Text type="secondary">
                              Changed Sections: {amendment.changedSections.join(', ')}
                            </Text>
                          )}
                        </Space>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <FileTextOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
              <Title level={4} style={{ color: '#8c8c8c' }}>
                No Active Constitution
              </Title>
              <Paragraph style={{ color: '#8c8c8c', marginBottom: '24px' }}>
                Get started by creating your community's constitution and by-laws.
              </Paragraph>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setEditModalVisible(true)}
              >
                Create Constitution
              </Button>
            </div>
          )}
        </Card>

        {/* Edit Constitution Modal */}
        <Modal
          title="Edit Constitution"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={null}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateConstitution}
            initialValues={constitution || {}}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter title' }]}
            >
              <Input placeholder="Enter constitution title" />
            </Form.Item>

            <Form.Item
              name="version"
              label="Version"
              rules={[{ required: true, message: 'Please enter version' }]}
            >
              <Input placeholder="e.g., 1.0" />
            </Form.Item>

            <Form.Item
              name="effectiveDate"
              label="Effective Date"
              rules={[{ required: true, message: 'Please select effective date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="content"
              label="Content"
              rules={[{ required: true, message: 'Please enter content' }]}
            >
              <TextArea rows={10} placeholder="Enter constitution content..." />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save Constitution
                </Button>
                <Button onClick={() => setEditModalVisible(false)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Add Amendment Modal */}
        <Modal
          title="Add Amendment"
          open={amendmentModalVisible}
          onCancel={() => setAmendmentModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            layout="vertical"
            onFinish={handleAddAmendment}
          >
            <Form.Item
              name="amendmentNumber"
              label="Amendment Number"
              rules={[{ required: true, message: 'Please enter amendment number' }]}
            >
              <Input placeholder="e.g., Amendment 1" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <TextArea rows={4} placeholder="Describe the amendment..." />
            </Form.Item>

            <Form.Item
              name="effectiveDate"
              label="Effective Date"
              rules={[{ required: true, message: 'Please select effective date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="changedSections"
              label="Changed Sections"
            >
              <Select mode="tags" placeholder="Enter section numbers" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Add Amendment
                </Button>
                <Button onClick={() => setAmendmentModalVisible(false)}>
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

export default Constitution;