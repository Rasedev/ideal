import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Card,
  Upload,
  message,
  Typography,
  Row,
  Col,
  Switch,
  InputNumber,
  Space
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  CalendarOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CreateEvent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const eventCategories = [
    { value: 'charity', label: 'Charity' },
    { value: 'community', label: 'Community' },
    { value: 'educational', label: 'Educational' },
    { value: 'health', label: 'Health' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Sports' },
    { value: 'other', label: 'Other' }
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Append form fields
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === 'date') {
            formData.append(key, values[key].format('YYYY-MM-DD'));
          } else if (key === 'time') {
            formData.append(key, values[key].format('HH:mm'));
          } else if (key === 'registrationDeadline') {
            formData.append(key, values[key].format('YYYY-MM-DD'));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Append images
      fileList.forEach(file => {
        formData.append('images', file.originFileObj);
      });

      const token = localStorage.getItem('token');
      await axios.post('/api/events/createevent', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      message.success('Event created successfully!');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error('Failed to create event: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
      }
      return false; // Prevent auto upload
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    multiple: true,
    listType: 'picture-card',
    maxCount: 10
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Create New Event</Title>
        <Text type="secondary">
          Organize a new event for the community
        </Text>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            isRegistrationRequired: false,
            category: 'community'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item
                name="title"
                label="Event Title"
                rules={[
                  { required: true, message: 'Please enter event title' },
                  { max: 200, message: 'Title cannot exceed 200 characters' }
                ]}
              >
                <Input 
                  placeholder="Enter event title" 
                  prefix={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  {eventCategories.map(cat => (
                    <Option key={cat.value} value={cat.value}>
                      {cat.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter event description' }]}
          >
            <TextArea
              rows={4}
              placeholder="Describe the event details, purpose, and activities..."
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="date"
                label="Event Date"
                rules={[{ required: true, message: 'Please select event date' }]}
              >
                <DatePicker 
                  className="w-full" 
                  disabledDate={(current) => current && current < dayjs().startOf('day')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="time"
                label="Event Time"
                rules={[{ required: true, message: 'Please select event time' }]}
              >
                <TimePicker 
                  className="w-full" 
                  format="HH:mm"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="venue"
            label="Venue"
            rules={[{ required: true, message: 'Please enter event venue' }]}
          >
            <Input 
              placeholder="Enter event location" 
              prefix={<EnvironmentOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="organizer"
            label="Organizer"
            rules={[{ required: true, message: 'Please enter organizer name' }]}
          >
            <Input placeholder="Enter organizer name or department" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="isRegistrationRequired"
                label="Require Registration?"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => 
                  prevValues.isRegistrationRequired !== currentValues.isRegistrationRequired
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('isRegistrationRequired') && (
                    <Form.Item
                      name="maxParticipants"
                      label="Maximum Participants"
                      rules={[{ required: true, message: 'Please enter maximum participants' }]}
                    >
                      <InputNumber
                        min={1}
                        className="w-full"
                        placeholder="Enter maximum number of participants"
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => 
              prevValues.isRegistrationRequired !== currentValues.isRegistrationRequired
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('isRegistrationRequired') && (
                <Form.Item
                  name="registrationDeadline"
                  label="Registration Deadline"
                >
                  <DatePicker 
                    className="w-full"
                    disabledDate={(current) => {
                      const eventDate = form.getFieldValue('date');
                      return current && (current < dayjs().startOf('day') || 
                        (eventDate && current > eventDate));
                    }}
                  />
                </Form.Item>
              )
            }
          </Form.Item>

          <Form.Item
            name="images"
            label="Event Images"
            extra="Upload up to 10 images. Supported formats: JPG, PNG, GIF. Max size: 5MB each."
          >
            <Upload {...uploadProps}>
              {fileList.length >= 10 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} size="large">
                Create Event
              </Button>
              <Button onClick={() => form.resetFields()} size="large">
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateEvent;