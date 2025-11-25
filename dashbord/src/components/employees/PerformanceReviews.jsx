// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   Card,
//   Input,
//   Select,
//   Button,
//   Space,
//   Tag,
//   Avatar,
//   Rate,
//   Progress,
//   Row,
//   Col,
//   Typography,
//   Statistic,
//   Modal,
//   Form,
//   InputNumber,
//   DatePicker,
//   message,
//   Descriptions,
// } from 'antd';
// import {
//   SearchOutlined,
//   FilterOutlined,
//   EyeOutlined,
//   EditOutlined,
//   PlusOutlined,
//   BarChartOutlined,
//   TeamOutlined,
//   StarOutlined,
//   TrophyOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const { Title } = Typography;
// const { Option } = Select;
// const { Search } = Input;
// const { TextArea } = Input;

// const PerformanceReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [form] = Form.useForm();
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     fetchPerformanceReviews();
//     fetchEmployees();
//   }, []);

//   const fetchPerformanceReviews = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/employee/performance', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         setReviews(response.data.reviews || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch performance reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/employee/all', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { limit: 1000 }
//       });

//       if (response.data.success) {
//         setEmployees(response.data.employees || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch employees');
//     }
//   };

//   const handleAddReview = async (values) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/employee/performance',
//         values,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success('Performance review added successfully');
//         setModalVisible(false);
//         form.resetFields();
//         fetchPerformanceReviews();
//       }
//     } catch (error) {
//       message.error('Failed to add performance review');
//     }
//   };

//   const getPerformanceTag = (rating) => {
//     if (rating >= 4.5) return { color: 'green', text: 'Excellent' };
//     if (rating >= 4.0) return { color: 'blue', text: 'Very Good' };
//     if (rating >= 3.0) return { color: 'orange', text: 'Good' };
//     if (rating >= 2.0) return { color: 'volcano', text: 'Needs Improvement' };
//     return { color: 'red', text: 'Poor' };
//   };

//   const columns = [
//     {
//       title: 'Employee',
//       dataIndex: 'employee',
//       key: 'employee',
//       render: (employee) => (
//         <Space>
//           <Avatar src={employee?.image} icon={<TeamOutlined />} />
//           <div>
//             <div className="font-medium">{`${employee?.firstName} ${employee?.lastName}`}</div>
//             <div className="text-xs text-gray-500">{employee?.position}</div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Review Period',
//       dataIndex: 'reviewPeriod',
//       key: 'reviewPeriod',
//       render: (period) => `${period?.start} to ${period?.end}`,
//     },
//     {
//       title: 'Overall Rating',
//       dataIndex: 'overallRating',
//       key: 'overallRating',
//       render: (rating) => (
//         <Space>
//           <Rate disabled defaultValue={rating} />
//           <Tag color={getPerformanceTag(rating).color}>
//             {rating}/5
//           </Tag>
//         </Space>
//       ),
//     },
//     {
//       title: 'Performance',
//       dataIndex: 'overallRating',
//       key: 'performance',
//       render: (rating) => {
//         const { color, text } = getPerformanceTag(rating);
//         return <Tag color={color}>{text}</Tag>;
//       },
//     },
//     {
//       title: 'Reviewer',
//       dataIndex: 'reviewer',
//       key: 'reviewer',
//       render: (reviewer) => reviewer?.name || 'HR Manager',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color={status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'blue'}>
//           {status?.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="small">
//           <Button
//             type="link"
//             icon={<EyeOutlined />}
//             onClick={() => setSelectedReview(record)}
//           >
//             View
//           </Button>
//           <Button
//             type="link"
//             icon={<EditOutlined />}
//           >
//             Edit
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <BarChartOutlined className="mr-3" />
//               Performance Reviews
//             </Title>
//             <p className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Track and manage employee performance evaluations
//             </p>
//           </div>
//           <Button 
//             type="primary" 
//             icon={<PlusOutlined />}
//             onClick={() => setModalVisible(true)}
//           >
//             Add Review
//           </Button>
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Reviews"
//                 value={reviews.length}
//                 prefix={<BarChartOutlined />}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Average Rating"
//                 value={reviews.reduce((acc, curr) => acc + curr.overallRating, 0) / reviews.length || 0}
//                 precision={1}
//                 prefix={<StarOutlined />}
//                 valueStyle={{ color: '#faad14' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Excellent Performers"
//                 value={reviews.filter(r => r.overallRating >= 4.5).length}
//                 prefix={<TrophyOutlined />}
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Needs Improvement"
//                 value={reviews.filter(r => r.overallRating < 2.5).length}
//                 valueStyle={{ color: '#ff4d4f' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Performance Reviews Table */}
//         <Table
//           columns={columns}
//           dataSource={reviews}
//           loading={loading}
//           rowKey="_id"
//           scroll={{ x: 1000 }}
//           pagination={{ pageSize: 10 }}
//           className="responsive-table"
//         />

//         {/* Add Review Modal */}
//         <Modal
//           title="Add Performance Review"
//           open={modalVisible}
//           onCancel={() => {
//             setModalVisible(false);
//             form.resetFields();
//           }}
//           footer={null}
//           width={600}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleAddReview}
//           >
//             <Row gutter={16}>
//               <Col span={24}>
//                 <Form.Item
//                   label="Employee"
//                   name="employeeId"
//                   rules={[{ required: true, message: 'Please select employee' }]}
//                 >
//                   <Select placeholder="Select employee">
//                     {employees.map(emp => (
//                       <Option key={emp._id} value={emp._id}>
//                         {`${emp.firstName} ${emp.lastName} - ${emp.position}`}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Review Start Date"
//                   name={['reviewPeriod', 'start']}
//                   rules={[{ required: true, message: 'Please select start date' }]}
//                 >
//                   <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Review End Date"
//                   name={['reviewPeriod', 'end']}
//                   rules={[{ required: true, message: 'Please select end date' }]}
//                 >
//                   <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Overall Rating"
//                   name="overallRating"
//                   rules={[{ required: true, message: 'Please provide rating' }]}
//                 >
//                   <Rate allowHalf />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Work Quality"
//                   name="workQuality"
//                   rules={[{ required: true, message: 'Please rate work quality' }]}
//                 >
//                   <Rate allowHalf />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Teamwork"
//                   name="teamwork"
//                   rules={[{ required: true, message: 'Please rate teamwork' }]}
//                 >
//                   <Rate allowHalf />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Comments"
//                   name="comments"
//                 >
//                   <TextArea rows={4} placeholder="Enter performance comments..." />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item
//                   label="Goals for Next Period"
//                   name="goals"
//                 >
//                   <TextArea rows={3} placeholder="Enter goals for next review period..." />
//                 </Form.Item>
//               </Col>
//             </Row>
//             <div className="text-right">
//               <Space>
//                 <Button onClick={() => setModalVisible(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit">
//                   Submit Review
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Modal>

//         {/* Review Details Modal */}
//         <Modal
//           title="Performance Review Details"
//           open={!!selectedReview}
//           onCancel={() => setSelectedReview(null)}
//           footer={[
//             <Button key="close" onClick={() => setSelectedReview(null)}>
//               Close
//             </Button>,
//           ]}
//           width={700}
//         >
//           {selectedReview && (
//             <Descriptions column={2} bordered>
//               <Descriptions.Item label="Employee" span={2}>
//                 {`${selectedReview.employee?.firstName} ${selectedReview.employee?.lastName}`}
//               </Descriptions.Item>
//               <Descriptions.Item label="Position">
//                 {selectedReview.employee?.position}
//               </Descriptions.Item>
//               <Descriptions.Item label="Department">
//                 {selectedReview.employee?.department}
//               </Descriptions.Item>
//               <Descriptions.Item label="Review Period">
//                 {`${selectedReview.reviewPeriod?.start} to ${selectedReview.reviewPeriod?.end}`}
//               </Descriptions.Item>
//               <Descriptions.Item label="Overall Rating">
//                 <Space>
//                   <Rate disabled value={selectedReview.overallRating} />
//                   <span>({selectedReview.overallRating}/5)</span>
//                 </Space>
//               </Descriptions.Item>
//               <Descriptions.Item label="Work Quality">
//                 <Rate disabled value={selectedReview.workQuality} />
//               </Descriptions.Item>
//               <Descriptions.Item label="Teamwork">
//                 <Rate disabled value={selectedReview.teamwork} />
//               </Descriptions.Item>
//               <Descriptions.Item label="Comments" span={2}>
//                 {selectedReview.comments || 'No comments provided'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Goals" span={2}>
//                 {selectedReview.goals || 'No goals set'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Reviewer">
//                 {selectedReview.reviewer?.name || 'HR Manager'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Status">
//                 <Tag color={selectedReview.status === 'completed' ? 'green' : 'orange'}>
//                   {selectedReview.status?.toUpperCase()}
//                 </Tag>
//               </Descriptions.Item>
//             </Descriptions>
//           )}
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default PerformanceReviews;





///////////////////////FINAL CODE/////////////////////


import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  Input,
  Select,
  Button,
  Space,
  Tag,
  Avatar,
  Row,
  Col,
  Typography,
  Statistic,
  Modal,
  Form,
  DatePicker,
  Rate,
  Progress,
  message,
  Descriptions,
  Timeline
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  TeamOutlined,
  StarOutlined,
  TrophyOutlined,
  BarChartOutlined,
  CalendarOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useEmployees } from '../hooks/useEmployees';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const PerformanceReviews = () => {
  const {
    // State
    employees,
    loading,
    
    // Actions
    loadEmployees,
    
    // Helper Functions
    getFilteredEmployees,
    getDepartments
  } = useEmployees();

  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [form] = Form.useForm();

  // Mock performance reviews data (in real app, this would come from backend)
  const [performanceReviews, setPerformanceReviews] = useState([]);

  // Load employees and mock data on component mount
  useEffect(() => {
    loadEmployees();
    // Load mock performance reviews
    const mockReviews = [
      {
        id: 1,
        employeeId: '1',
        reviewDate: '2024-01-15',
        reviewer: 'John Manager',
        rating: 4.5,
        status: 'completed',
        goals: 'Exceeded Q4 targets, excellent team collaboration',
        areasForImprovement: 'Time management in meetings',
        nextReviewDate: '2024-04-15'
      },
      {
        id: 2,
        employeeId: '2', 
        reviewDate: '2024-01-10',
        reviewer: 'Sarah Director',
        rating: 3.8,
        status: 'completed',
        goals: 'Good project delivery, needs more initiative',
        areasForImprovement: 'Client communication skills',
        nextReviewDate: '2024-04-10'
      }
    ];
    setPerformanceReviews(mockReviews);
  }, [loadEmployees]);

  // Get filtered employees
  const filteredEmployees = useMemo(() => {
    return getFilteredEmployees({
      searchText,
      department: departmentFilter,
      status: statusFilter
    });
  }, [getFilteredEmployees, searchText, departmentFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const reviewedEmployees = performanceReviews.filter(review => 
      review.status === 'completed'
    ).length;
    
    const averageRating = performanceReviews.length > 0 
      ? (performanceReviews.reduce((sum, review) => sum + review.rating, 0) / performanceReviews.length).toFixed(1)
      : 0;

    const ratingDistribution = performanceReviews.reduce((acc, review) => {
      const range = Math.floor(review.rating);
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {});

    return {
      totalEmployees,
      reviewedEmployees,
      pendingReviews: totalEmployees - reviewedEmployees,
      averageRating: parseFloat(averageRating),
      reviewCompletion: totalEmployees > 0 ? ((reviewedEmployees / totalEmployees) * 100).toFixed(1) : 0,
      ratingDistribution
    };
  }, [employees, performanceReviews]);

  // Get employee performance data
  const getEmployeePerformance = (employeeId) => {
    return performanceReviews.find(review => review.employeeId === employeeId) || {
      rating: 0,
      status: 'pending',
      lastReview: null,
      nextReview: null
    };
  };

  // Handlers
  const handleAddReview = (employee) => {
    setSelectedEmployee(employee);
    form.resetFields();
    setReviewModalVisible(true);
  };

  const handleViewReview = (employee, review) => {
    setSelectedEmployee(employee);
    setSelectedReview(review);
    setViewModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      const newReview = {
        id: performanceReviews.length + 1,
        employeeId: selectedEmployee._id,
        reviewDate: values.reviewDate.format('YYYY-MM-DD'),
        reviewer: values.reviewer,
        rating: values.rating,
        status: 'completed',
        goals: values.goals,
        areasForImprovement: values.areasForImprovement,
        nextReviewDate: values.nextReviewDate.format('YYYY-MM-DD'),
        createdAt: new Date().toISOString()
      };

      setPerformanceReviews(prev => [...prev, newReview]);
      message.success('Performance review added successfully!');
      setReviewModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add performance review');
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'green';
    if (rating >= 3.5) return 'blue';
    if (rating >= 2.5) return 'orange';
    return 'red';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'green',
      pending: 'orange',
      scheduled: 'blue',
      cancelled: 'red'
    };
    return colors[status] || 'default';
  };

  const columns = [
    {
      title: 'Employee',
      key: 'employee',
      width: 250,
      render: (record) => {
        const performance = getEmployeePerformance(record._id);
        return (
          <Space>
            <Avatar src={record.image} icon={<UserOutlined />} />
            <div>
              <div className="font-medium">{record.firstName} {record.lastName}</div>
              <div className="text-xs text-gray-500">
                {record.position} • {record.department}
              </div>
            </div>
          </Space>
        );
      },
    },
    {
      title: 'Performance Rating',
      key: 'rating',
      render: (record) => {
        const performance = getEmployeePerformance(record._id);
        return (
          <Space>
            <Rate 
              disabled 
              value={performance.rating} 
              allowHalf 
              style={{ fontSize: 16 }}
            />
            <Tag color={getRatingColor(performance.rating)}>
              {performance.rating > 0 ? performance.rating.toFixed(1) : 'Not Rated'}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: 'Last Review',
      key: 'lastReview',
      render: (record) => {
        const performance = getEmployeePerformance(record._id);
        const review = performanceReviews.find(r => r.employeeId === record._id);
        return review ? (
          <div className="text-gray-600">
            {dayjs(review.reviewDate).format('MMM DD, YYYY')}
          </div>
        ) : (
          <Text type="secondary">No reviews</Text>
        );
      },
    },
    {
      title: 'Next Review',
      key: 'nextReview',
      render: (record) => {
        const performance = getEmployeePerformance(record._id);
        const review = performanceReviews.find(r => r.employeeId === record._id);
        return review?.nextReviewDate ? (
          <div className="flex items-center text-gray-600">
            <CalendarOutlined className="mr-1" />
            {dayjs(review.nextReviewDate).format('MMM DD, YYYY')}
          </div>
        ) : (
          <Text type="secondary">Not scheduled</Text>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => {
        const performance = getEmployeePerformance(record._id);
        return (
          <Tag color={getStatusColor(performance.status)}>
            {performance.status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (record) => {
        const performance = getEmployeePerformance(record._id);
        const existingReview = performanceReviews.find(r => r.employeeId === record._id);
        
        return (
          <Space size="small">
            {existingReview ? (
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleViewReview(record, existingReview)}
              >
                View
              </Button>
            ) : null}
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => handleAddReview(record)}
            >
              {existingReview ? 'Update' : 'Add'}
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <Title level={2} className="flex items-center">
              <TrophyOutlined className="mr-3 text-orange-600" />
              Performance Reviews
            </Title>
            <Text type="secondary" className="text-lg">
              Track and manage employee performance evaluations
            </Text>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Total Employees"
              value={stats.totalEmployees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Reviews Completed"
              value={stats.reviewedEmployees}
              valueStyle={{ color: '#52c41a' }}
              suffix={`/ ${stats.totalEmployees}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Average Rating"
              value={stats.averageRating}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Completion Rate"
              value={stats.reviewCompletion}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Progress Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <Card title="Review Progress" className="shadow-sm">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Text>Performance Review Completion</Text>
                  <Text strong>{stats.reviewCompletion}%</Text>
                </div>
                <Progress 
                  percent={parseFloat(stats.reviewCompletion)} 
                  status="active"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.reviewedEmployees}</div>
                  <Text type="secondary">Completed</Text>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.pendingReviews}</div>
                  <Text type="secondary">Pending</Text>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.averageRating}</div>
                  <Text type="secondary">Avg Rating</Text>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {performanceReviews.length}
                  </div>
                  <Text type="secondary">Total Reviews</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filters Section */}
      <Card className="mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search employees..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
            />
          </div>
          <Select
            placeholder="Department"
            size="large"
            style={{ width: 200 }}
            value={departmentFilter}
            onChange={setDepartmentFilter}
          >
            <Option value="all">All Departments</Option>
            {getDepartments.map(dept => (
              <Option key={dept} value={dept}>{dept}</Option>
            ))}
          </Select>
          <Select
            placeholder="Review Status"
            size="large"
            style={{ width: 180 }}
            value={statusFilter}
            onChange={setStatusFilter}
          >
            <Option value="all">All Status</Option>
            <Option value="completed">Completed</Option>
            <Option value="pending">Pending</Option>
            <Option value="scheduled">Scheduled</Option>
          </Select>
        </div>
      </Card>

      {/* Performance Reviews Table */}
      <Card 
        title={
          <Space>
            <TrophyOutlined />
            <span>Employee Performance</span>
            <Tag color="blue">{filteredEmployees.length}</Tag>
          </Space>
        }
        className="shadow-sm"
      >
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 1000 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} employees`
          }}
        />
      </Card>

      {/* Add/Edit Review Modal */}
      <Modal
        title={`Performance Review - ${selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : ''}`}
        open={reviewModalVisible}
        onCancel={() => {
          setReviewModalVisible(false);
          form.resetFields();
          setSelectedEmployee(null);
        }}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="reviewDate"
                label="Review Date"
                rules={[{ required: true, message: 'Please select review date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="reviewer"
                label="Reviewer Name"
                rules={[{ required: true, message: 'Please enter reviewer name' }]}
              >
                <Input placeholder="Enter reviewer name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="rating"
                label="Performance Rating"
                rules={[{ required: true, message: 'Please provide a rating' }]}
              >
                <Rate allowHalf style={{ fontSize: 24 }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="goals"
                label="Goals & Achievements"
                rules={[{ required: true, message: 'Please describe goals and achievements' }]}
              >
                <TextArea rows={4} placeholder="Describe employee goals, achievements, and strengths..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="areasForImprovement"
                label="Areas for Improvement"
                rules={[{ required: true, message: 'Please describe areas for improvement' }]}
              >
                <TextArea rows={3} placeholder="Describe areas where the employee can improve..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nextReviewDate"
                label="Next Review Date"
                rules={[{ required: true, message: 'Please select next review date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <div className="text-right">
            <Space>
              <Button onClick={() => setReviewModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save Review
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* View Review Modal */}
      <Modal
        title="Performance Review Details"
        open={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
          setSelectedEmployee(null);
          setSelectedReview(null);
        }}
        footer={[
          <Button key="close" type="primary" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedEmployee && selectedReview && (
          <div className="space-y-6">
            {/* Employee Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Avatar src={selectedEmployee.image} size={64} icon={<UserOutlined />} />
              <div>
                <Title level={4}>{selectedEmployee.firstName} {selectedEmployee.lastName}</Title>
                <Text type="secondary">{selectedEmployee.position} • {selectedEmployee.department}</Text>
              </div>
            </div>

            {/* Review Details */}
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Review Date" span={1}>
                {dayjs(selectedReview.reviewDate).format('MMMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Reviewer" span={1}>
                {selectedReview.reviewer}
              </Descriptions.Item>
              <Descriptions.Item label="Performance Rating" span={2}>
                <Space>
                  <Rate disabled value={selectedReview.rating} allowHalf />
                  <Tag color={getRatingColor(selectedReview.rating)}>
                    {selectedReview.rating}/5
                  </Tag>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Goals & Achievements" span={2}>
                {selectedReview.goals}
              </Descriptions.Item>
              <Descriptions.Item label="Areas for Improvement" span={2}>
                {selectedReview.areasForImprovement}
              </Descriptions.Item>
              <Descriptions.Item label="Next Review Date" span={2}>
                <div className="flex items-center">
                  <CalendarOutlined className="mr-2" />
                  {dayjs(selectedReview.nextReviewDate).format('MMMM DD, YYYY')}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PerformanceReviews;




