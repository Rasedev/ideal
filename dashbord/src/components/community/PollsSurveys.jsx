// components/community/PollsSurveys.jsx
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  List, 
  Button, 
  Progress, 
  Radio, 
  Checkbox, 
  Space, 
  Tag, 
  Modal, 
  Form,
  Input,
  DatePicker,
  Select
} from 'antd';
import { BarChartOutlined, PlusOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import '../styles/Pcard.css'; // Import the CSS file

const { TextArea } = Input;
const { Option } = Select;

const PollsSurveys = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    // Replace with actual API call
    setPolls(mockPolls);
  };

  const handleVote = async (pollId, questionIndex, selectedOptions) => {
    // API call to submit vote
    console.log('Voting:', { pollId, questionIndex, selectedOptions });
  };

  const handleCreatePoll = async (values) => {
    // API call to create poll
    console.log('Creating poll:', values);
    setIsModalVisible(false);
    form.resetFields();
    fetchPolls();
  };

  const mockPolls = [
    {
      id: 1,
      title: "Community Event Preferences",
      description: "Help us plan the next community event by sharing your preferences",
      questions: [
        {
          question: "Which type of event do you prefer?",
          type: "single",
          options: [
            { text: "Picnic in the park", votes: 15 },
            { text: "Sports tournament", votes: 8 },
            { text: "Cultural festival", votes: 12 },
            { text: "Educational workshop", votes: 5 }
          ]
        },
        {
          question: "What activities would you like?",
          type: "multiple",
          options: [
            { text: "Food stalls", votes: 25 },
            { text: "Games for kids", votes: 18 },
            { text: "Live music", votes: 22 },
            { text: "Art exhibition", votes: 10 }
          ]
        }
      ],
      createdBy: { name: "Admin User" },
      totalVotes: 40,
      isActive: true,
      endDate: "2024-02-15",
      createdAt: "2024-01-10"
    }
  ];

  const calculatePercentage = (votes, total) => {
    return total > 0 ? (votes / total) * 100 : 0;
  };

  return (
    <div className="polls-surveys">
      <Card
        title="Polls & Surveys"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Create Poll
          </Button>
        }
      >
        <List
          dataSource={polls}
          renderItem={poll => (
            <List.Item>
              <Card 
                style={{ width: '100%' }} 
                title={poll.title}
                className="poll-card"
                extra={
                  <Tag color={poll.isActive ? "green" : "red"}>
                    {poll.isActive ? "Active" : "Closed"}
                  </Tag>
                }
              >
                <div className="poll-description">
                  <p>{poll.description}</p>
                </div>
                
                <div className="poll-meta">
                  <Space>
                    <span className="created-by">
                      <UserOutlined /> By {poll.createdBy.name}
                    </span>
                    <span className="end-date">
                      <ClockCircleOutlined /> Ends: {new Date(poll.endDate).toLocaleDateString()}
                    </span>
                    <span className="total-votes">
                      <BarChartOutlined /> {poll.totalVotes} votes
                    </span>
                  </Space>
                </div>
                
                {poll.questions.map((question, qIndex) => (
                  <div key={qIndex} className="poll-question">
                    <h4 className="question-title">{question.question}</h4>
                    <div className="question-options">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="poll-option">
                          <Space className="option-selector">
                            {question.type === "single" ? (
                              <Radio value={oIndex} />
                            ) : (
                              <Checkbox value={oIndex} />
                            )}
                            <span className="option-text">{option.text}</span>
                          </Space>
                          <Progress
                            percent={calculatePercentage(option.votes, poll.totalVotes)}
                            size="small"
                            className="vote-progress"
                            strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                            }}
                          />
                          <span className="vote-count">
                            {option.votes} votes ({calculatePercentage(option.votes, poll.totalVotes).toFixed(1)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="poll-actions">
                  <Button 
                    type="primary" 
                    onClick={() => handleVote(poll.id)}
                    disabled={!poll.isActive}
                    className="vote-button"
                  >
                    Submit Vote
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Card>

      {/* Create Poll Modal */}
      <Modal
        title="Create New Poll"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
        className="create-poll-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleCreatePoll}>
          <Form.Item
            name="title"
            label="Poll Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter poll title" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={3} placeholder="Enter poll description" />
          </Form.Item>
          
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="recipientType"
            label="Target Audience"
            rules={[{ required: true, message: 'Please select audience' }]}
          >
            <Select placeholder="Select who can vote">
              <Option value="All">All Members</Option>
              <Option value="Members">Members Only</Option>
              <Option value="PlotOwners">Plot Owners Only</Option>
              <Option value="Employees">Employees Only</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="dashed" block>
              Add Question
            </Button>
          </Form.Item>
          
          <Form.Item className="form-actions">
            <Space>
              <Button type="primary" htmlType="submit">
                Create Poll
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

export default PollsSurveys;