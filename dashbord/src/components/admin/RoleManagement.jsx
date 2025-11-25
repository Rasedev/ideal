// components/admin/RoleManagement.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   Table,
//   Button,
//   Space,
//   Tag,
//   Modal,
//   Form,
//   Input,
//   Select,
//   List,
//   Switch,
//   message,
//   Tooltip,
//   Row,
//   Col,
//   Typography,
//   Divider
// } from 'antd';
// import {
//   SafetyCertificateOutlined,
//   EditOutlined,
//   UserOutlined,
//   LockOutlined,
//   PlusOutlined
// } from '@ant-design/icons';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;

// const RoleManagement = () => {
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingRole, setEditingRole] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/admin/roles', {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       const data = await response.json();
//       setRoles(data);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//       message.error('Failed to load roles');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const permissionGroups = [
//     {
//       group: 'User Management',
//       permissions: [
//         'users:read',
//         'users:write',
//         'users:delete',
//         'users:approve'
//       ]
//     },
//     {
//       group: 'Role Management',
//       permissions: [
//         'roles:read',
//         'roles:write',
//         'roles:delete'
//       ]
//     },
//     {
//       group: 'System Settings',
//       permissions: [
//         'settings:read',
//         'settings:write'
//       ]
//     },
//     {
//       group: 'Audit & Reports',
//       permissions: [
//         'audit:read',
//         'reports:generate'
//       ]
//     }
//   ];

//   const RoleCard = ({ role }) => (
//     <Card 
//       style={{ marginBottom: '16px' }}
//       title={
//         <Space>
//           <SafetyCertificateOutlined />
//           <Text strong>{role.name}</Text>
//           <Tag color={role.name === 'Admin' ? 'red' : 'blue'}>
//             {role.userCount} Users
//           </Tag>
//         </Space>
//       }
//       extra={
//         <Button 
//           type="link" 
//           icon={<EditOutlined />}
//           onClick={() => handleEditRole(role)}
//         >
//           Edit
//         </Button>
//       }
//     >
//       <Text type="secondary" style={{ marginBottom: '16px', display: 'block' }}>
//         {role.description}
//       </Text>
      
//       <Divider style={{ margin: '16px 0' }} />
      
//       <Title level={5}>Permissions</Title>
//       <Space wrap>
//         {role.permissions.map(permission => (
//           <Tag key={permission} color="green">
//             {permission}
//           </Tag>
//         ))}
//         {role.permissions.includes('all') && (
//           <Tag color="red">Full Access</Tag>
//         )}
//       </Space>
//     </Card>
//   );

//   const handleEditRole = (role) => {
//     setEditingRole(role);
//     form.setFieldsValue(role);
//     setModalVisible(true);
//   };

//   const handleSaveRole = async (values) => {
//     try {
//       // Implementation for saving role
//       console.log('Saving role:', values);
//       message.success('Role updated successfully');
//       setModalVisible(false);
//       fetchRoles();
//     } catch (error) {
//       message.error('Failed to update role');
//     }
//   };

//   return (
//     <div style={{ padding: '24px', background: 'transparent', minHeight: '100vh' }}>
//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//         {/* Header */}
//         <div style={{ marginBottom: '24px' }}>
//           <Space direction="vertical">
//             <Title level={2}>
//               <SafetyCertificateOutlined style={{ marginRight: '12px' }} />
//               Role & Permissions Management
//             </Title>
//             <Text type="secondary">
//               Manage user roles and their system permissions
//             </Text>
//           </Space>
//         </div>

//         <Row gutter={[24, 24]}>
//           {/* Roles List */}
//           <Col xs={24} lg={16}>
//             <Card
//               title="System Roles"
//               extra={
//                 <Button 
//                   type="primary" 
//                   icon={<PlusOutlined />}
//                   onClick={() => {
//                     setEditingRole(null);
//                     setModalVisible(true);
//                     form.resetFields();
//                   }}
//                 >
//                   New Role
//                 </Button>
//               }
//             >
//               {roles.map(role => (
//                 <RoleCard key={role.name} role={role} />
//               ))}
//             </Card>
//           </Col>

//           {/* Permission Guide */}
//           <Col xs={24} lg={8}>
//             <Card title="Permission Guide">
//               <List
//                 dataSource={permissionGroups}
//                 renderItem={group => (
//                   <List.Item>
//                     <List.Item.Meta
//                       title={group.group}
//                       description={
//                         <Space direction="vertical" size="small">
//                           {group.permissions.map(permission => (
//                             <Text key={permission} code style={{ fontSize: '12px' }}>
//                               {permission}
//                             </Text>
//                           ))}
//                         </Space>
//                       }
//                     />
//                   </List.Item>
//                 )}
//               />
//             </Card>

//             {/* Quick Stats */}
//             <Card title="Role Statistics" style={{ marginTop: '16px' }}>
//               <Space direction="vertical" style={{ width: '100%' }}>
//                 {roles.map(role => (
//                   <div key={role.name} style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     alignItems: 'center'
//                   }}>
//                     <Text>{role.name}</Text>
//                     <Tag>{role.userCount}</Tag>
//                   </div>
//                 ))}
//               </Space>
//             </Card>
//           </Col>
//         </Row>

//         {/* Role Modal */}
//         <Modal
//           title={editingRole ? "Edit Role" : "Create New Role"}
//           open={modalVisible}
//           onCancel={() => {
//             setModalVisible(false);
//             setEditingRole(null);
//           }}
//           footer={null}
//           width={700}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleSaveRole}
//           >
//             <Form.Item
//               name="name"
//               label="Role Name"
//               rules={[{ required: true, message: 'Please enter role name' }]}
//             >
//               <Input placeholder="Enter role name" />
//             </Form.Item>

//             <Form.Item
//               name="description"
//               label="Description"
//               rules={[{ required: true, message: 'Please enter description' }]}
//             >
//               <TextArea rows={3} placeholder="Enter role description" />
//             </Form.Item>

//             <Form.Item
//               name="permissions"
//               label="Permissions"
//             >
//               <Card size="small" title="Select Permissions">
//                 {permissionGroups.map(group => (
//                   <div key={group.group} style={{ marginBottom: '16px' }}>
//                     <Text strong>{group.group}</Text>
//                     <div style={{ marginTop: '8px' }}>
//                       <Space wrap>
//                         {group.permissions.map(permission => (
//                           <Tag.CheckableTag
//                             key={permission}
//                             checked={form.getFieldValue('permissions')?.includes(permission)}
//                             onChange={checked => {
//                               const currentPermissions = form.getFieldValue('permissions') || [];
//                               const newPermissions = checked
//                                 ? [...currentPermissions, permission]
//                                 : currentPermissions.filter(p => p !== permission);
//                               form.setFieldsValue({ permissions: newPermissions });
//                             }}
//                           >
//                             {permission}
//                           </Tag.CheckableTag>
//                         ))}
//                       </Space>
//                     </div>
//                   </div>
//                 ))}
//               </Card>
//             </Form.Item>

//             <Form.Item>
//               <Space>
//                 <Button type="primary" htmlType="submit">
//                   {editingRole ? 'Update Role' : 'Create Role'}
//                 </Button>
//                 <Button onClick={() => {
//                   setModalVisible(false);
//                   setEditingRole(null);
//                 }}>
//                   Cancel
//                 </Button>
//               </Space>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;








import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Row,
  Col,
  Typography,
  Divider
} from 'antd';
import {
  SafetyCertificateOutlined,
  EditOutlined,
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();

  // Available roles from your schema
  const availableRoles = [
    "President", "ExecutivePresident", "VicePresident", 
    "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
    "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
    "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
    "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
    "ExecutiveMember", "Member", "PlotOwner", "Employee", "Admin", "HR"
  ];

  const permissionGroups = [
    {
      group: 'User Management',
      permissions: [
        'users:read',
        'users:write', 
        'users:delete',
        'users:approve'
      ]
    },
    {
      group: 'Role Management', 
      permissions: [
        'roles:read',
        'roles:write',
        'roles:delete'
      ]
    }
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      // In a real app, you'd fetch from your API
      // For now, we'll create a mock based on available roles
      const mockRoles = availableRoles.map(role => ({
        name: role,
        description: `${role} role for Alamgir Hossain City Welfare Association`,
        userCount: Math.floor(Math.random() * 50) + 1,
        permissions: ['users:read'] // Default permissions
      }));
      
      setRoles(mockRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      message.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRole = async (values) => {
    try {
      // Implementation for saving role
      console.log('Saving role:', values);
      message.success('Role updated successfully');
      setModalVisible(false);
      fetchRoles();
    } catch (error) {
      message.error('Failed to update role');
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'red',
      'HR': 'blue', 
      'President': 'green',
      'FinanceSecretary': 'orange',
      'GeneralSecretary': 'purple'
    };
    return colors[role] || 'cyan';
  };

  return (
    <div style={{ padding: '24px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <Space direction="vertical">
            <Title level={2}>
              <SafetyCertificateOutlined style={{ marginRight: '12px' }} />
              Role Management
            </Title>
            <Text type="secondary">
              Manage user roles and system permissions for Alamgir Hossain City Welfare Association
            </Text>
          </Space>
        </div>

        <Row gutter={[24, 24]}>
          {/* Roles List */}
          <Col xs={24} lg={16}>
            <Card
              title="System Roles"
              loading={loading}
              extra={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setEditingRole(null);
                    setModalVisible(true);
                    form.resetFields();
                  }}
                >
                  New Role
                </Button>
              }
            >
              <Table
                dataSource={roles}
                rowKey="name"
                pagination={false}
                columns={[
                  {
                    title: 'Role Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (name) => (
                      <Space>
                        <Tag color={getRoleColor(name)}>
                          {name}
                        </Tag>
                      </Space>
                    )
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                    render: (desc) => (
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {desc}
                      </Text>
                    )
                  },
                  {
                    title: 'Users',
                    dataIndex: 'userCount',
                    key: 'userCount',
                    render: (count) => (
                      <Badge count={count} showZero={false} />
                    )
                  },
                  {
                    title: 'Actions',
                    key: 'actions',
                    render: (_, record) => (
                      <Button 
                        type="link" 
                        icon={<EditOutlined />}
                        onClick={() => {
                          setEditingRole(record);
                          form.setFieldsValue(record);
                          setModalVisible(true);
                        }}
                      >
                        Edit
                      </Button>
                    )
                  }
                ]}
              />
            </Card>
          </Col>

          {/* Quick Stats */}
          <Col xs={24} lg={8}>
            <Card title="Role Statistics">
              <Space direction="vertical" style={{ width: '100%' }}>
                {roles.slice(0, 8).map(role => (
                  <div key={role.name} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0'
                  }}>
                    <Text>{role.name}</Text>
                    <Tag>{role.userCount}</Tag>
                  </div>
                ))}
              </Space>
            </Card>

            <Card title="Quick Actions" style={{ marginTop: '16px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button block icon={<UserOutlined />}>
                  View All Users
                </Button>
                <Button block icon={<SafetyCertificateOutlined />}>
                  Permission Guide
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Role Modal */}
        <Modal
          title={editingRole ? "Edit Role" : "Create New Role"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingRole(null);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveRole}
          >
            <Form.Item
              name="name"
              label="Role Name"
              rules={[{ required: true, message: 'Please enter role name' }]}
            >
              <Select 
                placeholder="Select role"
                disabled={!!editingRole} // Can't change role name when editing
              >
                {availableRoles.map(role => (
                  <Option key={role} value={role}>{role}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <TextArea rows={3} placeholder="Enter role description" />
            </Form.Item>

            <Divider>Permissions</Divider>

            {permissionGroups.map(group => (
              <div key={group.group} style={{ marginBottom: '16px' }}>
                <Text strong>{group.group}</Text>
                <div style={{ marginTop: '8px' }}>
                  <Space wrap>
                    {group.permissions.map(permission => (
                      <Tag key={permission} color="blue">
                        {permission}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </div>
            ))}

            <Form.Item style={{ marginTop: '24px', marginBottom: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingRole ? 'Update Role' : 'Create Role'}
                </Button>
                <Button onClick={() => {
                  setModalVisible(false);
                  setEditingRole(null);
                  form.resetFields();
                }}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default RoleManagement;









