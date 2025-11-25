// components/community/DiscussionForum.jsx
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  List, 
  Button, 
  Input, 
  Tag, 
  Space, 
  Avatar, 
  Pagination,
  Select,
  Modal,
  Form
} from 'antd';
import { 
  MessageOutlined, 
  PlusOutlined, 
  EyeOutlined, 
  UserOutlined,
  // PinOutlined,
  PushpinOutlined, 
  LockOutlined
} from '@ant-design/icons';
import '../styles/DiscussionForum.css'; // Import the CSS file

const { TextArea } = Input;
const { Option } = Select;

const DiscussionForum = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    setLoading(true);
    // Replace with actual API call
    setTimeout(() => {
      setDiscussions(mockDiscussions);
      setLoading(false);
    }, 1000);
  };

  const handleCreateDiscussion = async (values) => {
    // API call to create discussion
    console.log('Creating discussion:', values);
    setIsModalVisible(false);
    form.resetFields();
    fetchDiscussions();
  };

  const mockDiscussions = [
    {
      id: 1,
      title: "Parking lot maintenance schedule",
      content: "Let's discuss the upcoming parking lot repairs and how it will affect our daily routines. Please share your availability and any concerns.",
      author: { name: "John Doe", email: "john@example.com" },
      category: "Maintenance",
      tags: ["parking", "maintenance", "schedule"],
      replies: 12,
      views: 45,
      isPinned: true,
      isLocked: false,
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Community picnic ideas",
      content: "Share your ideas for our next community event! We're planning a picnic and would love to hear your suggestions for activities, food, and dates.",
      author: { name: "Jane Smith", email: "jane@example.com" },
      category: "Events",
      tags: ["events", "picnic", "community"],
      replies: 8,
      views: 32,
      isPinned: false,
      isLocked: false,
      createdAt: "2024-01-14T15:20:00Z"
    }
  ];

  const categories = ["General", "Maintenance", "Events", "Complaints", "Suggestions", "Security"];

  return (
    <div className="discussion-forum">
      <Card
        title="Discussion Forum"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            New Discussion
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {/* Filters */}
          <div className="discussion-filters">
            <Space>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Option value="all">All Categories</Option>
                {categories.map(cat => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Select>
              <Input.Search placeholder="Search discussions..." style={{ width: 200 }} />
            </Space>
          </div>

          {/* Discussions List */}
          <List
            loading={loading}
            dataSource={discussions}
            renderItem={discussion => (
              <List.Item>
                <Card 
                  style={{ width: '100%' }} 
                  hoverable
                  className="discussion-card"
                >
                  <div className="discussion-header">
                    <Space>
                      {discussion.isPinned && <PushpinOutlined className="pinned-icon" />}
                      {discussion.isLocked && <LockOutlined className="locked-icon" />}
                      <h4 className="discussion-title">{discussion.title}</h4>
                      <Tag color="blue" className="category-tag">{discussion.category}</Tag>
                    </Space>
                  </div>
                  
                  <p className="discussion-content">{discussion.content}</p>
                  
                  <div className="discussion-footer">
                    <Space size="large" className="discussion-meta">
                      <span className="author-info">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span className="author-name">{discussion.author.name}</span>
                      </span>
                      <span className="replies-count">
                        <MessageOutlined /> {discussion.replies} replies
                      </span>
                      <span className="views-count">
                        <EyeOutlined /> {discussion.views} views
                      </span>
                      <span className="created-date">
                        {new Date(discussion.createdAt).toLocaleDateString()}
                      </span>
                    </Space>
                    
                    <Space className="discussion-tags">
                      {discussion.tags.map(tag => (
                        <Tag key={tag} color="default" className="discussion-tag">{tag}</Tag>
                      ))}
                    </Space>
                  </div>
                </Card>
              </List.Item>
            )}
          />

          <Pagination 
            total={50} 
            pageSize={10} 
            showSizeChanger 
            showQuickJumper 
            className="discussion-pagination"
          />
        </Space>
      </Card>

      {/* Create Discussion Modal */}
      <Modal
        title="Start New Discussion"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="create-discussion-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateDiscussion}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter discussion title" />
          </Form.Item>
          
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select category">
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter discussion content' }]}
          >
            <TextArea rows={6} placeholder="Enter your discussion content..." />
          </Form.Item>
          
          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select mode="tags" placeholder="Add tags" />
          </Form.Item>
          
          <Form.Item className="form-actions">
            <Space>
              <Button type="primary" htmlType="submit">
                Create Discussion
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DiscussionForum;