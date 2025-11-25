// import React from 'react';
// import { Layout, Card, Typography } from 'antd';

// const { Content } = Layout;
// const { Title, Paragraph } = Typography;

// const SecuritySettings = () => {
//   return (
//     <Layout className="min-h-screen">
//       <Content className="m-6">
//         <Card title="Security Settings" className="shadow-lg rounded-lg">
//           <Title level={3}>Manage Your Security</Title>
//           <Paragraph>
//             This section is dedicated to managing the security aspects of your account and the application.
//             Examples include:
//           </Paragraph>
//           <ul>
//             <li>Password change</li>
//             <li>Two-factor authentication (2FA) setup</li>
//             <li>Account activity logs</li>
//             <li>Blocked IP addresses</li>
//           </ul>
//           <Paragraph>
//             Content for managing security features will go here.
//           </Paragraph>
//         </Card>
//       </Content>
//     </Layout>
//   );
// };

// export default SecuritySettings;





import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Table, Button, Space, Input, Modal, Form, Popconfirm, message, Spin, Alert,Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, KeyOutlined, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios'; // Assuming you'll use axios for API calls

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const SecuritySettings = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null); // null for add, object for edit
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  // Dummy permissions for demonstration. In a real app, fetch these from an API.
  // These would typically be granular actions: e.g., 'users:read', 'users:write', 'orders:view', 'orders:create'
  const allPermissions = [
    'users:read', 'users:write', 'users:delete',
    'employees:read', 'employees:write', 'employees:delete',
    'orders:view', 'orders:create', 'orders:update',
    'settings:general', 'settings:security',
    // ... many more
  ];

  // --- API Calls (Placeholders) ---
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Replace with your actual API endpoint and authentication
      const response = await axios.get('http://localhost:3000/api/v1/admin/roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoles(response.data.roles || []);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      message.error('Failed to load roles.');
    } finally {
      setLoading(false);
    }
  };

  const addRole = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/v1/admin/roles', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Role added successfully!');
      fetchRoles();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to add role:', error);
      message.error(error.response?.data?.message || 'Failed to add role.');
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/v1/admin/roles/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Role updated successfully!');
      fetchRoles();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to update role:', error);
      message.error(error.response?.data?.message || 'Failed to update role.');
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/v1/admin/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Role deleted successfully!');
      fetchRoles();
    } catch (error) {
      console.error('Failed to delete role:', error);
      message.error(error.response?.data?.message || 'Failed to delete role.');
    } finally {
      setLoading(false);
    }
  };
  // --- End API Calls ---

  useEffect(() => {
    fetchRoles();
  }, []);

  const showAddModal = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingRole(record);
    form.setFieldsValue(record); // Populate form with existing role data
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        // Here, `values.permissions` would typically be an array of selected permissions
        if (editingRole) {
          updateRole(editingRole._id, values);
        } else {
          addRole(values);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRole(null);
    form.resetFields();
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchText.toLowerCase()) ||
    (role.description || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <Text strong>{name}</Text>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true, // Truncate long descriptions
    },
    {
      title: 'Number of Users',
      dataIndex: 'userCount', // Assuming your API provides this
      key: 'userCount',
      sorter: (a, b) => a.userCount - b.userCount,
      render: (count) => count || 0, // Default to 0 if not provided
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this role? This cannot be undone."
            onConfirm={() => deleteRole(record._id)}
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
              User Roles
            </Title>
          }
          extra={
            <Space>
              <Search
                placeholder="Search roles"
                onSearch={onSearch}
                style={{ width: 200 }}
                allowClear
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                Add Role
              </Button>
              <Button icon={<ReloadOutlined />} onClick={fetchRoles}>
                Refresh
              </Button>
            </Space>
          }
          className="shadow-lg rounded-lg"
        >
          <Table
            columns={columns}
            dataSource={filteredRoles}
            rowKey="_id" // Assuming '_id' is unique for each role
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        </Card>

        <Modal
          title={editingRole ? "Edit Role" : "Add New Role"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
          maskClosable={false}
        >
          <Form
            form={form}
            layout="vertical"
            name="role_form"
          >
            <Form.Item
              name="name"
              label="Role Name"
              rules={[{ required: true, message: 'Please input the role name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="permissions"
              label="Permissions"
              // Rules might be needed if permissions are mandatory
            >
              <Select
                mode="multiple"
                placeholder="Select permissions for this role"
                allowClear
              >
                {allPermissions.map(perm => (
                  <Option key={perm} value={perm}>{perm}</Option>
                ))}
              </Select>
            </Form.Item>
             {/* Note: You might add a warning here if trying to edit a system critical role like 'admin' */}
             {editingRole && editingRole.name === 'admin' && (
                <Alert
                    message="Warning: Modifying 'admin' role permissions can have significant security implications."
                    type="warning"
                    showIcon
                    className="mb-4"
                />
            )}
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default SecuritySettings;
