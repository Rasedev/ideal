// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   Table,
//   Input,
//   Button,
//   Space,
//   Avatar,
//   Typography,
//   Tag,
//   Modal,
//   Form,
//   Select,
//   DatePicker,
//   message,
//   Row,
//   Col,
//   Statistic,
//   Progress,
//   Descriptions,
//   Steps,
// } from 'antd';
// import {
//   AppstoreOutlined,
//   SearchOutlined,
//   EyeOutlined,
//   EditOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   ClockCircleOutlined,
//   UserOutlined,
//   FileTextOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;

// const Application = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [actionModalVisible, setActionModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [filterType, setFilterType] = useState('');
//   const [stats, setStats] = useState({});
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
//   const [actionForm] = Form.useForm();

//   useEffect(() => {
//     fetchApplications();
//     fetchApplicationStats();
//   }, [searchText, filterStatus, filterType]);

//   const fetchApplications = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/apps/applications', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { 
//           search: searchText, 
//           status: filterStatus,
//           type: filterType
//         }
//       });

//       if (response.data.success) {
//         setApplications(response.data.applications || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch applications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchApplicationStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/apps/applications/stats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch application stats');
//     }
//   };

//   const handleApplicationAction = async (values) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:3000/api/v1/apps/applications/${selectedApplication._id}/status`,
//         values,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success(`Application ${values.status.toLowerCase()} successfully`);
//         setActionModalVisible(false);
//         actionForm.resetFields();
//         fetchApplications();
//         fetchApplicationStats();
//       }
//     } catch (error) {
//       message.error('Failed to update application status');
//     }
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
//       underreview: { color: 'blue', icon: <EyeOutlined />, text: 'Under Review' },
//       approved: { color: 'green', icon: <CheckCircleOutlined />, text: 'Approved' },
//       rejected: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
//       completed: { color: 'cyan', icon: <CheckCircleOutlined />, text: 'Completed' },
//     };
//     const config = statusConfig[status?.toLowerCase()] || { color: 'default', text: status };
//     return (
//       <Tag color={config.color} icon={config.icon}>
//         {config.text}
//       </Tag>
//     );
//   };

//   const getPriorityTag = (priority) => {
//     const priorityConfig = {
//       urgent: { color: 'red', text: 'Urgent' },
//       high: { color: 'orange', text: 'High' },
//       medium: { color: 'blue', text: 'Medium' },
//       low: { color: 'green', text: 'Low' },
//     };
//     const config = priorityConfig[priority] || { color: 'default', text: priority };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getTypeTag = (type) => {
//     const typeColors = {
//       construction: 'volcano',
//       water: 'blue',
//       electricity: 'orange',
//       maintenance: 'green',
//       transfer: 'purple',
//       newconnection: 'cyan',
//       renovation: 'magenta',
//     };
//     const color = typeColors[type?.toLowerCase()] || 'default';
//     return <Tag color={color}>{type}</Tag>;
//   };

//   const columns = [
//     {
//       title: 'Applicant',
//       dataIndex: 'applicant',
//       key: 'applicant',
//       render: (applicant) => (
//         <Space>
//           <Avatar src={applicant?.image} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium">
//               {`${applicant?.firstName} ${applicant?.lastName}`}
//             </div>
//             <div className="text-xs text-gray-500">
//               {applicant?.plotNumber}
//             </div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Application',
//       dataIndex: 'title',
//       key: 'title',
//       render: (title, record) => (
//         <div>
//           <div className="font-medium">{title}</div>
//           <div className="text-xs text-gray-500">
//             {getTypeTag(record.type)}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Priority',
//       dataIndex: 'priority',
//       key: 'priority',
//       render: (priority) => getPriorityTag(priority),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getStatusTag(status),
//     },
//     {
//       title: 'Submitted',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => dayjs(date).format('MMM D, YYYY'),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="small">
//           <Button
//             type="link"
//             icon={<EyeOutlined />}
//             onClick={() => {
//               setSelectedApplication(record);
//               setDetailModalVisible(true);
//             }}
//           >
//             View
//           </Button>
//           {record.status === 'pending' && (
//             <Button
//               type="link"
//               icon={<EditOutlined />}
//               onClick={() => {
//                 setSelectedApplication(record);
//                 setActionModalVisible(true);
//               }}
//             >
//               Process
//             </Button>
//           )}
//         </Space>
//       ),
//     },
//   ];

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   const statusSteps = [
//     { title: 'Submitted', status: 'pending' },
//     { title: 'Under Review', status: 'underreview' },
//     { title: 'Approved', status: 'approved' },
//     { title: 'Completed', status: 'completed' },
//   ];

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <AppstoreOutlined className="mr-3" />
//               Application Manager
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage member applications and requests
//             </Text>
//           </div>
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Applications"
//                 value={stats.total || 0}
//                 prefix={<FileTextOutlined />}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Pending"
//                 value={stats.pending || 0}
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Approved"
//                 value={stats.approved || 0}
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Completion Rate"
//                 value={stats.completionRate || 0}
//                 suffix="%"
//                 valueStyle={{ color: '#722ed1' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Filters */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Input
//               placeholder="Search applications..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//             />
//           </Col>
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Select
//               placeholder="Filter by Status"
//               style={{ width: '100%' }}
//               allowClear
//               value={filterStatus}
//               onChange={setFilterStatus}
//             >
//               <Option value="pending">Pending</Option>
//               <Option value="underreview">Under Review</Option>
//               <Option value="approved">Approved</Option>
//               <Option value="rejected">Rejected</Option>
//               <Option value="completed">Completed</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Select
//               placeholder="Filter by Type"
//               style={{ width: '100%' }}
//               allowClear
//               value={filterType}
//               onChange={setFilterType}
//             >
//               <Option value="construction">Construction</Option>
//               <Option value="water">Water</Option>
//               <Option value="electricity">Electricity</Option>
//               <Option value="maintenance">Maintenance</Option>
//               <Option value="transfer">Transfer</Option>
//             </Select>
//           </Col>
//         </Row>

//         {/* Applications Table */}
//         <Table
//           columns={columns}
//           dataSource={applications}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 800 }}
//           pagination={{ pageSize: 10 }}
//         />

//         {/* Application Detail Modal */}
//         <Modal
//           title="Application Details"
//           open={detailModalVisible}
//           onCancel={() => setDetailModalVisible(false)}
//           footer={[
//             <Button key="close" onClick={() => setDetailModalVisible(false)}>
//               Close
//             </Button>,
//             <Button 
//               key="process" 
//               type="primary"
//               onClick={() => {
//                 setDetailModalVisible(false);
//                 setActionModalVisible(true);
//               }}
//             >
//               Process Application
//             </Button>,
//           ]}
//           width={800}
//         >
//           {selectedApplication && (
//             <div className="space-y-6">
//               {/* Status Steps */}
//               <Steps
//                 current={statusSteps.findIndex(step => step.status === selectedApplication.status.toLowerCase())}
//                 items={statusSteps}
//               />

//               <Descriptions bordered column={2}>
//                 <Descriptions.Item label="Applicant" span={2}>
//                   {`${selectedApplication.applicant?.firstName} ${selectedApplication.applicant?.lastName}`}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Plot Number">
//                   {selectedApplication.plotNumber}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Application Type">
//                   {getTypeTag(selectedApplication.type)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Title">
//                   {selectedApplication.title}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Priority">
//                   {getPriorityTag(selectedApplication.priority)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Status">
//                   {getStatusTag(selectedApplication.status)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Description" span={2}>
//                   {selectedApplication.description}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Submitted Date">
//                   {dayjs(selectedApplication.createdAt).format('MMMM D, YYYY')}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Days Since Submission">
//                   {dayjs().diff(dayjs(selectedApplication.createdAt), 'days')} days
//                 </Descriptions.Item>
//               </Descriptions>

//               {/* Construction Details */}
//               {selectedApplication.constructionDetails && (
//                 <>
//                   <Title level={5}>Construction Details</Title>
//                   <Descriptions bordered column={2} size="small">
//                     <Descriptions.Item label="Building Type">
//                       {selectedApplication.constructionDetails.buildingType}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Floors">
//                       {selectedApplication.constructionDetails.floors}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Total Area">
//                       {selectedApplication.constructionDetails.totalArea}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Estimated Cost">
//                       ৳{selectedApplication.constructionDetails.estimatedCost?.toLocaleString()}
//                     </Descriptions.Item>
//                   </Descriptions>
//                 </>
//               )}
//             </div>
//           )}
//         </Modal>

//         {/* Action Modal */}
//         <Modal
//           title="Process Application"
//           open={actionModalVisible}
//           onCancel={() => {
//             setActionModalVisible(false);
//             actionForm.resetFields();
//           }}
//           footer={null}
//           width={600}
//         >
//           <Form
//             form={actionForm}
//             layout="vertical"
//             onFinish={handleApplicationAction}
//             initialValues={{ status: 'underreview' }}
//           >
//             <Row gutter={16}>
//               <Col span={24}>
//                 <Form.Item
//                   label="Action"
//                   name="status"
//                   rules={[{ required: true, message: 'Please select action' }]}
//                 >
//                   <Select>
//                     <Option value="underreview">Move to Under Review</Option>
//                     <Option value="approved">Approve Application</Option>
//                     <Option value="rejected">Reject Application</Option>
//                     <Option value="completed">Mark as Completed</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Comments"
//                   name="comment"
//                   rules={[{ required: true, message: 'Please enter comments' }]}
//                 >
//                   <TextArea 
//                     rows={4} 
//                     placeholder="Enter comments or instructions..."
//                   />
//                 </Form.Item>
//               </Col>
//               {actionForm.getFieldValue('status') === 'approved' && (
//                 <Col span={24}>
//                   <Form.Item
//                     label="Estimated Completion Date"
//                     name="estimatedCompletionDate"
//                   >
//                     <DatePicker style={{ width: '100%' }} />
//                   </Form.Item>
//                 </Col>
//               )}
//             </Row>
//             <div className="text-right">
//               <Space>
//                 <Button onClick={() => setActionModalVisible(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit">
//                   Submit Action
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default Application;





import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Table,
  Statistic,
  Row,
  Col,
  message,
  Modal,
  Tag,
  Space,
  Descriptions,
} from 'antd';
import {
  FileAddOutlined,
  HistoryOutlined,
  BarChartOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  createApplication,
  fetchMyApplications,
  fetchAllApplications,
  fetchApplicationById,
  updateApplicationStatus,
  fetchApplicationStats,
} from '../slices/applicationSlice';

const { Option } = Select;
const { TextArea } = Input;

const Applications = () => {
  const dispatch = useDispatch();
  const { 
    myApplications, 
    allApplications, 
    currentApplication, 
    stats, 
    loading 
  } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.user);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user?.role === 'Admin' || user?.role === 'Secretary') {
      dispatch(fetchAllApplications());
    } else {
      dispatch(fetchMyApplications());
    }
    dispatch(fetchApplicationStats());
  }, [dispatch, user]);

  const handleCreateApplication = async (values) => {
    try {
      await dispatch(createApplication(values)).unwrap();
      message.success('Application submitted successfully');
      setCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit application');
    }
  };

  const handleViewApplication = async (id) => {
    try {
      await dispatch(fetchApplicationById(id)).unwrap();
      setDetailModalVisible(true);
    } catch (error) {
      message.error('Failed to load application details');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await dispatch(updateApplicationStatus({ id, status })).unwrap();
      message.success(`Application ${status.toLowerCase()} successfully`);
      setDetailModalVisible(false);
    } catch (error) {
      message.error('Failed to update application status');
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      Pending: { color: 'orange', text: 'Pending' },
      UnderReview: { color: 'blue', text: 'Under Review' },
      Approved: { color: 'green', text: 'Approved' },
      Rejected: { color: 'red', text: 'Rejected' },
      Completed: { color: 'purple', text: 'Completed' },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const applicationColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Plot Number',
      dataIndex: 'plotNumber',
      key: 'plotNumber',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: getStatusTag,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewApplication(record._id)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-4">
      <Card title={
        <div className="flex items-center">
          <FileAddOutlined className="mr-2" />
          Applications
        </div>
      }>
        {/* Stats Row */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Applications"
                value={stats?.totalApplications || 0}
                prefix={<FileAddOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Pending"
                value={stats?.pendingApplications || 0}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Approved"
                value={stats?.approvedApplications || 0}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Rejected"
                value={stats?.rejectedApplications || 0}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div className="mb-4">
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            New Application
          </Button>
        </div>

        {/* Applications Table */}
        <Card title="My Applications" extra={<HistoryOutlined />}>
          <Table
            columns={applicationColumns}
            dataSource={user?.role === 'Admin' || user?.role === 'Secretary' ? allApplications : myApplications}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Card>

        {/* Create Application Modal */}
        <Modal
          title="Create New Application"
          open={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateApplication}>
            <Form.Item
              label="Application Type"
              name="type"
              rules={[{ required: true, message: 'Please select type' }]}
            >
              <Select placeholder="Select application type">
                <Option value="Construction">Construction</Option>
                <Option value="Water">Water Connection</Option>
                <Option value="Electricity">Electricity Connection</Option>
                <Option value="Maintenance">Maintenance</Option>
                <Option value="Transfer">Plot Transfer</Option>
                <Option value="NewConnection">New Connection</Option>
                <Option value="Renovation">Renovation</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Plot Number"
              name="plotNumber"
              rules={[{ required: true, message: 'Please enter plot number' }]}
            >
              <Input placeholder="Enter plot number" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <TextArea rows={4} placeholder="Describe your application..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Submit Application
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Application Detail Modal */}
        <Modal
          title="Application Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Close
            </Button>,
            (user?.role === 'Admin' || user?.role === 'Secretary') && (
              <>
                <Button
                  key="approve"
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleUpdateStatus(currentApplication?._id, 'Approved')}
                >
                  Approve
                </Button>
                <Button
                  key="reject"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleUpdateStatus(currentApplication?._id, 'Rejected')}
                >
                  Reject
                </Button>
              </>
            ),
          ]}
          width={700}
        >
          {currentApplication && (
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Type" span={2}>
                {currentApplication.type}
              </Descriptions.Item>
              <Descriptions.Item label="Plot Number">
                {currentApplication.plotNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {getStatusTag(currentApplication.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {currentApplication.description}
              </Descriptions.Item>
              <Descriptions.Item label="Created">
                {new Date(currentApplication.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {new Date(currentApplication.updatedAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default Applications;





