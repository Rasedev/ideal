// import React, { useState, useEffect } from 'react';
// import { Form, InputNumber, Button, message, Card, Space } from 'antd';
// import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';

// const MapSettings = () => {
//   const [form] = Form.useForm(); // Ant Design Form instance

//   useEffect(() => {
//     // Load settings from localStorage when the component mounts
//     const savedMapSettings = localStorage.getItem('mapSettings');
//     if (savedMapSettings) {
//       const settings = JSON.parse(savedMapSettings);
//       form.setFieldsValue(settings); // Set form fields with loaded settings
//     } else {
//       // Set default values if no settings are found
//       form.setFieldsValue({
//         latitude: 51.505,
//         longitude: -0.09,
//         zoom: 13,
//       });
//     }
//   }, [form]); // Dependency on 'form' ensures it runs after form is ready

//   const onFinish = (values) => {
//     try {
//       // Save settings to localStorage
//       localStorage.setItem('mapSettings', JSON.stringify(values));
//       message.success('Map settings saved successfully!');
//       console.log('Map settings saved:', values);
//     } catch (error) {
//       message.error('Failed to save map settings.');
//       console.error('Error saving map settings:', error);
//     }
//   };

//   const onReset = () => {
//     form.resetFields(); // Reset form fields to initial values
//     localStorage.removeItem('mapSettings'); // Also clear from localStorage
//     message.info('Map settings reset to defaults!');
//     console.log('Map settings reset.');
//   };

//   return (
//     <div className="p-6 md:p-8 lg:p-10 w-full h-full">
//       <Card
//         title="Map Default Settings"
//         className="shadow-lg rounded-xl max-w-2xl mx-auto"
//         extra={
//           <Space>
//             <Button type="default" icon={<ReloadOutlined />} onClick={onReset}>
//               Reset
//             </Button>
//             <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
//               Save Settings
//             </Button>
//           </Space>
//         }
//       >
//         <Form
//           form={form}
//           name="map_settings"
//           layout="vertical"
//           onFinish={onFinish}
//           initialValues={{
//             latitude: 51.505, // Default for London
//             longitude: -0.09, // Default for London
//             zoom: 13,
//           }}
//         >
//           <Form.Item
//             label="Default Latitude"
//             name="latitude"
//             rules={[{ required: true, message: 'Please input the default latitude!' }]}
//           >
//             <InputNumber
//               min={-90}
//               max={90}
//               step={0.000001}
//               precision={6}
//               className="w-full rounded-md"
//               placeholder="e.g., 51.505"
//             />
//           </Form.Item>

//           <Form.Item
//             label="Default Longitude"
//             name="longitude"
//             rules={[{ required: true, message: 'Please input the default longitude!' }]}
//           >
//             <InputNumber
//               min={-180}
//               max={180}
//               step={0.000001}
//               precision={6}
//               className="w-full rounded-md"
//               placeholder="e.g., -0.09"
//             />
//           </Form.Item>

//           <Form.Item
//             label="Default Zoom Level"
//             name="zoom"
//             rules={[{ required: true, message: 'Please input the default zoom level!' }]}
//           >
//             <InputNumber
//               min={1}
//               max={18}
//               step={1}
//               className="w-full rounded-md"
//               placeholder="e.g., 13"
//             />
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default MapSettings;




import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Table, Button, Space, Input, Modal, Form, Select, Tag, Popconfirm, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios'; // Assuming you'll use axios for API calls

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const MapSettings = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null for add, object for edit
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  // Dummy roles for demonstration. In a real app, fetch these from an API.
  const availableRoles = ['admin', 'hr', 'employee', 'guest'];

  // --- API Calls (Placeholders) ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint and authentication
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users || []); // Assuming response.data.users contains an array
    } catch (error) {
      console.error('Failed to fetch users:', error);
      message.error('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/v1/admin/users', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('User added successfully!');
      fetchUsers(); // Refresh the list
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to add user:', error);
      message.error(error.response?.data?.message || 'Failed to add user.');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/v1/admin/users/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('User updated successfully!');
      fetchUsers(); // Refresh the list
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to update user:', error);
      message.error(error.response?.data?.message || 'Failed to update user.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/v1/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('User deleted successfully!');
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete user:', error);
      message.error(error.response?.data?.message || 'Failed to delete user.');
    } finally {
      setLoading(false);
    }
  };
  // --- End API Calls ---

  useEffect(() => {
    fetchUsers();
  }, []);

  const showAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record); // Populate form with existing user data
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        if (editingUser) {
          updateUser(editingUser._id, values);
        } else {
          addUser(values);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const onSearch = (value) => {
    setSearchText(value);
    // You might want to debounce this or send it to API for server-side filtering
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'volcano' : role === 'hr' ? 'geekblue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      ),
      filters: availableRoles.map(role => ({ text: role, value: role })),
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
      filters: [{ text: 'Active', value: 'Active' }, { text: 'Inactive', value: 'Inactive' }],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Content className="m-6">
        <Card
          title={
            <Title level={4} className="mb-0">
              Manage Users
            </Title>
          }
          extra={
            <Space>
              <Search
                placeholder="Search users"
                onSearch={onSearch}
                style={{ width: 200 }}
                allowClear
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                Add User
              </Button>
              <Button icon={<ReloadOutlined />} onClick={fetchUsers}>
                Refresh
              </Button>
            </Space>
          }
          className="shadow-lg rounded-lg"
        >
          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="_id" // Assuming '_id' is unique for each user
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }} // Ensures table is scrollable horizontally on smaller screens
          />
        </Card>

        <Modal
          title={editingUser ? "Edit User" : "Add New User"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
          maskClosable={false} // Prevent closing by clicking outside
        >
          <Form
            form={form}
            layout="vertical"
            name="user_form"
          >
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: 'Please input the full name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input />
            </Form.Item>
            {!editingUser && ( // Only show password field when adding a new user
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input the password!' }]}
              >
                <Input.Password />
              </Form.Item>
            )}
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select a role!' }]}
            >
              <Select placeholder="Select a role">
                {availableRoles.map(role => (
                  <Option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select a status!' }]}
            >
              <Select placeholder="Select status">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default MapSettings;















