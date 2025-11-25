// // components/welfare/CurrentInitiatives.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Card, 
//   List, 
//   Button, 
//   Tag, 
//   Space, 
//   Progress, 
//   Modal, 
//   Form, 
//   Input, 
//   Select, 
//   DatePicker,
//   InputNumber,
//   Row,
//   Col
// } from 'antd';
// import { 
//   PlusOutlined, 
//   EditOutlined, 
//   TeamOutlined, 
//   DollarOutlined,
//   CalendarOutlined,
//   UserOutlined
// } from '@ant-design/icons';
// import './CurrentInitiatives.css';

// const { TextArea } = Input;
// const { Option } = Select;

// const CurrentInitiatives = () => {
//   const [initiatives, setInitiatives] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingInitiative, setEditingInitiative] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchInitiatives();
//   }, []);

//   const fetchInitiatives = async () => {
//     setLoading(true);
//     // Replace with actual API call
//     setTimeout(() => {
//       setInitiatives(mockInitiatives);
//       setLoading(false);
//     }, 1000);
//   };

//   const handleCreateInitiative = async (values) => {
//     // API call to create initiative
//     console.log('Creating initiative:', values);
//     setIsModalVisible(false);
//     form.resetFields();
//     fetchInitiatives();
//   };

//   const handleEditInitiative = (initiative) => {
//     setEditingInitiative(initiative);
//     form.setFieldsValue(initiative);
//     setIsModalVisible(true);
//   };

//   const categories = [
//     "Financial Aid", 
//     "Healthcare", 
//     "Education", 
//     "Emergency", 
//     "Elderly Care", 
//     "Children Welfare", 
//     "Disability Support"
//   ];

//   const statuses = ["Planning", "Active", "Paused", "Completed", "Cancelled"];

//   const mockInitiatives = [
//     {
//       id: 1,
//       title: "Education Support Program",
//       description: "Financial assistance for children's education including tuition fees, books, and supplies",
//       category: "Education",
//       status: "Active",
//       startDate: "2024-01-01",
//       endDate: "2024-12-31",
//       budget: {
//         allocated: 60000,
//         utilized: 45000
//       },
//       metrics: {
//         targetBeneficiaries: 60,
//         actualBeneficiaries: 45,
//         successRate: 75
//       },
//       eligibilityCriteria: {
//         minAge: 5,
//         maxAge: 18,
//         memberType: ["All"],
//         incomeLimit: 30000
//       },
//       benefits: [
//         { type: "Tuition Fee", amount: 1000, description: "Annual tuition support" },
//         { type: "Books & Supplies", amount: 300, description: "Educational materials" }
//       ]
//     },
//     {
//       id: 2,
//       title: "Healthcare Assistance",
//       description: "Medical expense support for critical illnesses and regular health checkups",
//       category: "Healthcare",
//       status: "Active",
//       startDate: "2024-01-15",
//       endDate: "2024-12-31",
//       budget: {
//         allocated: 50000,
//         utilized: 30000
//       },
//       metrics: {
//         targetBeneficiaries: 50,
//         actualBeneficiaries: 30,
//         successRate: 60
//       }
//     }
//   ];

//   const getStatusColor = (status) => {
//     const colors = {
//       Planning: 'blue',
//       Active: 'green',
//       Paused: 'orange',
//       Completed: 'purple',
//       Cancelled: 'red'
//     };
//     return colors[status];
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Financial Aid': 'gold',
//       'Healthcare': 'red',
//       'Education': 'blue',
//       'Emergency': 'volcano',
//       'Elderly Care': 'purple',
//       'Children Welfare': 'cyan',
//       'Disability Support': 'green'
//     };
//     return colors[category];
//   };

//   return (
//     <div className="current-initiatives">
//       <Card
//         title="Current Welfare Initiatives"
//         extra={
//           <Button 
//             type="primary" 
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setEditingInitiative(null);
//               setIsModalVisible(true);
//               form.resetFields();
//             }}
//           >
//             New Initiative
//           </Button>
//         }
//       >
//         <List
//           loading={loading}
//           dataSource={initiatives}
//           renderItem={initiative => (
//             <List.Item>
//               <Card 
//                 style={{ width: '100%' }} 
//                 hoverable
//                 className="initiative-card"
//                 actions={[
//                   <EditOutlined key="edit" onClick={() => handleEditInitiative(initiative)} />,
//                   <TeamOutlined key="beneficiaries" />,
//                   <DollarOutlined key="budget" />
//                 ]}
//               >
//                 <div className="initiative-header">
//                   <Space>
//                     <h3 className="initiative-title">{initiative.title}</h3>
//                     <Tag color={getStatusColor(initiative.status)}>{initiative.status}</Tag>
//                     <Tag color={getCategoryColor(initiative.category)}>{initiative.category}</Tag>
//                   </Space>
//                 </div>

//                 <p className="initiative-description">{initiative.description}</p>

//                 <div className="initiative-details">
//                   <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={12} md={8}>
//                       <div className="detail-item">
//                         <CalendarOutlined />
//                         <span>Duration: {new Date(initiative.startDate).toLocaleDateString()} - {new Date(initiative.endDate).toLocaleDateString()}</span>
//                       </div>
//                     </Col>
//                     <Col xs={24} sm={12} md={8}>
//                       <div className="detail-item">
//                         <DollarOutlined />
//                         <span>Budget: ${initiative.budget.utilized.toLocaleString()} / ${initiative.budget.allocated.toLocaleString()}</span>
//                       </div>
//                     </Col>
//                     <Col xs={24} sm={12} md={8}>
//                       <div className="detail-item">
//                         <UserOutlined />
//                         <span>Beneficiaries: {initiative.metrics.actualBeneficiaries} / {initiative.metrics.targetBeneficiaries}</span>
//                       </div>
//                     </Col>
//                   </Row>
//                 </div>

//                 <div className="initiative-progress">
//                   <Progress 
//                     percent={Math.round((initiative.budget.utilized / initiative.budget.allocated) * 100)}
//                     status="active"
//                     strokeColor={{
//                       '0%': '#108ee9',
//                       '100%': '#87d068',
//                     }}
//                   />
//                 </div>

//                 {initiative.benefits && (
//                   <div className="benefits-section">
//                     <h4>Benefits Offered:</h4>
//                     <Space wrap>
//                       {initiative.benefits.map((benefit, index) => (
//                         <Tag key={index} color="blue">
//                           {benefit.type}: ${benefit.amount}
//                         </Tag>
//                       ))}
//                     </Space>
//                   </div>
//                 )}
//               </Card>
//             </List.Item>
//           )}
//         />
//       </Card>

//       {/* Create/Edit Initiative Modal */}
//       <Modal
//         title={editingInitiative ? "Edit Initiative" : "Create New Initiative"}
//         open={isModalVisible}
//         onCancel={() => {
//           setIsModalVisible(false);
//           setEditingInitiative(null);
//         }}
//         footer={null}
//         width={800}
//         className="initiative-modal"
//       >
//         <Form form={form} layout="vertical" onFinish={handleCreateInitiative}>
//           <Row gutter={16}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="title"
//                 label="Initiative Title"
//                 rules={[{ required: true, message: 'Please enter title' }]}
//               >
//                 <Input placeholder="Enter initiative title" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="category"
//                 label="Category"
//                 rules={[{ required: true, message: 'Please select category' }]}
//               >
//                 <Select placeholder="Select category">
//                   {categories.map(cat => (
//                     <Option key={cat} value={cat}>{cat}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: 'Please enter description' }]}
//           >
//             <TextArea rows={4} placeholder="Enter initiative description" />
//           </Form.Item>

//           <Row gutter={16}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="status"
//                 label="Status"
//                 rules={[{ required: true, message: 'Please select status' }]}
//               >
//                 <Select placeholder="Select status">
//                   {statuses.map(status => (
//                     <Option key={status} value={status}>{status}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="budget.allocated"
//                 label="Allocated Budget"
//                 rules={[{ required: true, message: 'Please enter budget' }]}
//               >
//                 <InputNumber
//                   style={{ width: '100%' }}
//                   formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                   parser={value => value.replace(/\$\s?|(,*)/g, '')}
//                   placeholder="Enter allocated budget"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="startDate"
//                 label="Start Date"
//                 rules={[{ required: true, message: 'Please select start date' }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="endDate"
//                 label="End Date"
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item className="form-actions">
//             <Space>
//               <Button type="primary" htmlType="submit">
//                 {editingInitiative ? 'Update Initiative' : 'Create Initiative'}
//               </Button>
//               <Button onClick={() => {
//                 setIsModalVisible(false);
//                 setEditingInitiative(null);
//               }}>
//                 Cancel
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default CurrentInitiatives;





// components/welfare/CurrentInitiatives.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import {
//   HeartIcon,
//   PlusIcon,
//   CalendarIcon,
//   CurrencyDollarIcon,
//   UserGroupIcon,
//   ChartBarIcon,
//   EyeIcon,
//   PencilIcon
// } from '@heroicons/react/24/outline'; 

import {
  HeartOutlined,
  PlusOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  BarChartOutlined,
  EyeOutlined,
  EditOutlined
} from "@ant-design/icons";
const CurrentInitiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    featured: ''
  });

  useEffect(() => {
    fetchInitiatives();
  }, [filters]);

  const fetchInitiatives = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.featured) queryParams.append('featured', filters.featured);

      const response = await fetch(`/api/welfare/initiatives?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setInitiatives(data.initiatives || []);
    } catch (error) {
      console.error('Error fetching initiatives:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Planning: 'bg-blue-100 text-blue-800',
    Paused: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-purple-100 text-purple-800',
    Cancelled: 'bg-red-100 text-red-800'
  };

  const categoryColors = {
    'Financial Aid': 'bg-emerald-100 text-emerald-800',
    'Healthcare': 'bg-red-100 text-red-800',
    'Education': 'bg-blue-100 text-blue-800',
    'Emergency': 'bg-orange-100 text-orange-800',
    'Elderly Care': 'bg-purple-100 text-purple-800',
    'Children Welfare': 'bg-pink-100 text-pink-800',
    'Disability Support': 'bg-indigo-100 text-indigo-800'
  };

  const InitiativeCard = ({ initiative }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
      {initiative.imageUrl && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={initiative.imageUrl} 
            alt={initiative.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {initiative.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {initiative.shortDescription}
            </p>
          </div>
          {initiative.isFeatured && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Featured
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[initiative.status]}`}>
            {initiative.status}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[initiative.category]}`}>
            {initiative.category}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <CalendarOutlined className="w-4 h-4 mr-2" />
            <span>{new Date(initiative.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <DollarOutlined className="w-4 h-4 mr-2" />
            <span>${initiative.budget.allocated.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <TeamOutlined className="w-4 h-4 mr-2" />
            <span>{initiative.metrics.actualBeneficiaries}/{initiative.metrics.targetBeneficiaries}</span>
          </div>
          <div className="flex items-center">
            <BarChartOutlined className="w-4 h-4 mr-2" />
            <span>{Math.round((initiative.budget.utilized / initiative.budget.allocated) * 100)}% Used</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Budget Utilization</span>
            <span>${initiative.budget.utilized.toLocaleString()} / ${initiative.budget.allocated.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((initiative.budget.utilized / initiative.budget.allocated) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <Link
            to={`/welfare/initiatives/${initiative._id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <EyeOutlined className="w-4 h-4 mr-2" />
            View Details
          </Link>
          
          <Link
            to={`/welfare/apply?initiative=${initiative._id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Current Initiatives</h1>
            <p className="text-gray-600 mt-2">Browse and apply for available welfare programs</p>
          </div>
          <Link
            to="/welfare/initiatives/new"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-4 sm:mt-0"
          >
            <HeartOutlined className="w-5 h-5 mr-2" />
            New Initiative
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Planning">Planning</option>
                <option value="Paused">Paused</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Financial Aid">Financial Aid</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Emergency">Emergency</option>
                <option value="Elderly Care">Elderly Care</option>
                <option value="Children Welfare">Children Welfare</option>
                <option value="Disability Support">Disability Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
              <select
                value={filters.featured}
                onChange={(e) => setFilters(prev => ({ ...prev, featured: e.target.value }))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Initiatives</option>
                <option value="true">Featured Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Initiatives Grid */}
        {initiatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative) => (
              <InitiativeCard key={initiative._id} initiative={initiative} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HeartOutlined className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No initiatives found</h3>
            <p className="mt-2 text-gray-500">No welfare initiatives match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentInitiatives;










