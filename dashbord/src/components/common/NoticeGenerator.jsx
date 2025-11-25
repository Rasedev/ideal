// import { useState } from 'react';
// import { 
//   Form, 
//   Input, 
//   Button, 
//   Select, 
//   DatePicker, 
//   message,
//   Card,
//   Row,
//   Col
// } from 'antd';
// import { 
//   FilePdfOutlined,
//   SendOutlined 
// } from '@ant-design/icons';
// import axios from 'axios';

// const { TextArea } = Input;
// const { Option } = Select;

// const NoticeGenerator = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post('http://localhost:3000/api/v1/notices/generate', {
//         ...values,
//         meetingDate: values.meetingDate?.toISOString(),
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         message.success('Notice generated successfully!');
//         form.resetFields();
        
//         // Provide download link
//         const downloadUrl = res.data.data.downloadUrl;
//         window.open(downloadUrl, '_blank');
//       }
//     } catch (error) {
//       console.error('Error generating notice:', error);
//       message.error('Failed to generate notice');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       className="space-y-4"
//     >
//       <Row gutter={16}>
//         <Col xs={24}>
//           <Form.Item
//             name="title"
//             label="Notice Title"
//             rules={[{ required: true, message: 'Please enter notice title' }]}
//           >
//             <Input placeholder="Enter notice title" />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={16}>
//         <Col xs={24} sm={12}>
//           <Form.Item
//             name="noticeType"
//             label="Notice Type"
//             rules={[{ required: true, message: 'Please select notice type' }]}
//           >
//             <Select placeholder="Select notice type">
//               <Option value="General">General Notice</Option>
//               <Option value="Meeting">Meeting Notice</Option>
//               <Option value="Payment">Payment Notice</Option>
//               <Option value="Emergency">Emergency Notice</Option>
//               <Option value="Event">Event Notice</Option>
//             </Select>
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12}>
//           <Form.Item
//             name="recipientType"
//             label="Send To"
//             rules={[{ required: true, message: 'Please select recipients' }]}
//           >
//             <Select placeholder="Select recipients">
//               <Option value="All">All Members</Option>
//               <Option value="Members">Members Only</Option>
//               <Option value="PlotOwners">Plot Owners Only</Option>
//               <Option value="Committee">Committee Members</Option>
//               <Option value="Employees">Employees</Option>
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={16}>
//         <Col xs={24} sm={12}>
//           <Form.Item
//             name="meetingDate"
//             label="Meeting Date (if applicable)"
//           >
//             <DatePicker 
//               style={{ width: '100%' }}
//               placeholder="Select meeting date"
//             />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12}>
//           <Form.Item
//             name="meetingLocation"
//             label="Meeting Location"
//           >
//             <Input placeholder="Enter meeting location" />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Form.Item
//         name="message"
//         label="Notice Message"
//         rules={[{ required: true, message: 'Please enter notice message' }]}
//       >
//         <TextArea
//           rows={6}
//           placeholder="Enter detailed notice message here..."
//           showCount
//           maxLength={1000}
//         />
//       </Form.Item>

//       <Form.Item>
//         <Button
//           type="primary"
//           htmlType="submit"
//           icon={<FilePdfOutlined />}
//           loading={loading}
//           size="large"
//           className="w-full bg-gradient-to-r from-blue-500 to-purple-600 border-0"
//         >
//           Generate & Download Notice PDF
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default NoticeGenerator;







import { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Select, 
  DatePicker, 
  message,
  Row,
  Col,
  Switch,
  Divider
} from 'antd';
import { 
  FilePdfOutlined,
  SendOutlined,
  DownloadOutlined,
  UserOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const NoticeGenerator = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sendToAll, setSendToAll] = useState(true);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/v1/notices/generate', {
        ...values,
        sendToAll,
        meetingDate: values.meetingDate?.toISOString(),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        message.success('Notice generated successfully!');
        form.resetFields();
        
        // Provide download link
        const downloadUrl = res.data.data.downloadUrl;
        window.open(downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Error generating notice:', error);
      message.error('Failed to generate notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="title"
              label="Notice Title"
              rules={[{ required: true, message: 'Please enter notice title' }]}
            >
              <Input 
                placeholder="Enter notice title" 
                size="large"
                prefix={<FilePdfOutlined className="text-gray-400" />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="noticeType"
              label="Notice Type"
              rules={[{ required: true, message: 'Please select notice type' }]}
            >
              <Select placeholder="Select notice type" size="large">
                <Option value="General">General Notice</Option>
                <Option value="Meeting">Meeting Notice</Option>
                <Option value="Payment">Payment Notice</Option>
                <Option value="Emergency">Emergency Notice</Option>
                <Option value="Event">Event Notice</Option>
                <Option value="Maintenance">Maintenance Notice</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="recipientType"
              label="Send To"
              rules={[{ required: true, message: 'Please select recipients' }]}
            >
              <Select placeholder="Select recipients" size="large">
                <Option value="All">All Members & Plot Owners</Option>
                <Option value="Members">Members Only</Option>
                <Option value="PlotOwners">Plot Owners Only</Option>
                <Option value="Committee">Committee Members</Option>
                <Option value="Executive">Executive Committee</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <div className="flex items-center justify-between h-14">
              <span className="text-gray-700">Send to all members automatically</span>
              <Switch 
                checked={sendToAll}
                onChange={setSendToAll}
                checkedChildren="Yes" 
                unCheckedChildren="No"
              />
            </div>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="meetingDate"
              label="Meeting Date (if applicable)"
            >
              <DatePicker 
                style={{ width: '100%' }}
                placeholder="Select meeting date"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="meetingLocation"
              label="Meeting Location"
            >
              <Input 
                placeholder="Enter meeting location" 
                size="large"
                prefix={<UserOutlined className="text-gray-400" />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="message"
          label="Notice Message"
          rules={[{ required: true, message: 'Please enter notice message' }]}
        >
          <TextArea
            rows={6}
            placeholder="Enter detailed notice message here. You can include meeting agendas, payment details, event information, or any important announcements for the association members..."
            showCount
            maxLength={2000}
            size="large"
          />
        </Form.Item>

        <Divider />

        <Form.Item>
          <div className="flex space-x-3">
            <Button
              type="primary"
              htmlType="submit"
              icon={<FilePdfOutlined />}
              loading={loading}
              size="large"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-md"
            >
              Generate & Download PDF
            </Button>
            <Button
              type="default"
              icon={<SendOutlined />}
              size="large"
              className="flex-1"
              disabled={!sendToAll}
            >
              Send to All Members
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoticeGenerator;













