// import React from 'react';
// import { Layout, Card, Typography } from 'antd';

// const { Content } = Layout;
// const { Title, Paragraph } = Typography;

// const GeneralSettings = () => {
//   return (
//     <Layout className="min-h-screen">
//       <Content className="m-6">
//         <Card title="General Settings" className="shadow-lg rounded-lg">
//           <Title level={3}>Welcome to General Settings</Title>
//           <Paragraph>
//             This section allows you to configure general application settings.
//             Examples include:
//           </Paragraph>
//           <ul>
//             <li>User Interface preferences (theme, language)</li>
//             <li>Default display options</li>
//             <li>Notification settings</li>
//           </ul>
//           <Paragraph>
//             Content for managing general preferences will go here.
//           </Paragraph>
//         </Card>
//       </Content>
//     </Layout>
//   );
// };

// export default GeneralSettings;





import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Table, Button, Space, Input, Modal, Form, Select, Tag, Popconfirm, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios'; // Assuming you'll use axios for API calls

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const GeneralSettings = () => {
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

export default GeneralSettings;