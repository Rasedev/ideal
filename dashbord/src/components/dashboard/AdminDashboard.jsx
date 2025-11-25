


//////////////////////FINAL1//////////////////////


import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  message,
  Divider,
  Row,
  Col,
  Typography,
  Tag,
  Select,
  DatePicker,
  Tabs,
  Descriptions,
  Space,
  Spin,
  Modal,
  Progress,
  List,
  Badge,
  Tooltip,
  Alert,
  Statistic,
  Timeline,
  QRCode,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  SaveOutlined,
  EditOutlined,
  LockOutlined,
  TeamOutlined,
  CalendarOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  QrcodeOutlined,
  HistoryOutlined,
  SecurityScanOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TabletOutlined,
  CrownOutlined,
  TrophyOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfilePhoto,
  changePassword,
  fetchLoginHistory,
  fetchRecentActivity,
  clearError,
  clearSuccess,
  selectUser,
  selectLoginHistory,
  selectRecentActivity,
  selectProfileLoading,
  selectProfileUpdating,
  selectProfileUploading,
  selectChangingPassword,
  selectProfileError,
  selectProfileSuccess,
  selectProfileCompleteness,
} from "../slices/profileSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion, AnimatePresence } from "framer-motion";

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Password } = Input;

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Redux state selectors
  const user = useSelector(selectUser);
  const loginHistory = useSelector(selectLoginHistory);
  const recentActivity = useSelector(selectRecentActivity);
  const loading = useSelector(selectProfileLoading);
  const updating = useSelector(selectProfileUpdating);
  const uploading = useSelector(selectProfileUploading);
  const changingPassword = useSelector(selectChangingPassword);
  const error = useSelector(selectProfileError);
  const success = useSelector(selectProfileSuccess);
  const profileCompleteness = useSelector(selectProfileCompleteness);

  // const users = useSelector((state) => state.auth.users);

  const currentTheme = useSelector(
    (state) => state.theme?.currentTheme || "light"
  );

  // Local state
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [securityModalVisible, setSecurityModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchLoginHistory());
    dispatch(fetchRecentActivity());
  }, [dispatch]);

  // Set form values when user data is available
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || user.telephone || "",
        address: user.address || user.addressOne || "",
        dob: user.dob ? dayjs(user.dob) : null,
        gender: user.gender || "",
        nidNumber: user.nidNumber || "",
      });
    }
  }, [user, form]);

  // Handle error messages
  useEffect(() => {
    if (error) {
      message.error(error);
      setTimeout(() => dispatch(clearError()), 3000);
    }
  }, [error, dispatch]);

  // Handle success messages
  useEffect(() => {
    if (success) {
      message.success(success);
      setTimeout(() => dispatch(clearSuccess()), 3000);
    }
  }, [success, dispatch]);

  // Handle profile save
  const handleSave = async (values) => {
    try {
      const updatedData = {
        ...values,
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
      };

      await dispatch(updateUserProfile(updatedData)).unwrap();
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    form.resetFields();
    setEditMode(false);
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || user.telephone || "",
        address: user.address || user.addressOne || "",
        dob: user.dob ? dayjs(user.dob) : null,
        gender: user.gender || "",
        nidNumber: user.nidNumber || "",
      });
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    try {
      await dispatch(uploadProfilePhoto(file)).unwrap();
    } catch (error) {
      console.error("Upload failed:", error);
    }

    return false;
  };

  // Handle password change
  const handlePasswordChange = async (values) => {
    try {
      await dispatch(changePassword(values)).unwrap();
      setSecurityModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  // Get status tag
  const getStatusTag = (status) => {
    const statusConfig = {
      active: { color: "green", text: "Active", icon: <CheckCircleOutlined /> },
      pending: {
        color: "orange",
        text: "Pending",
        icon: <ExclamationCircleOutlined />,
      },
      suspended: {
        color: "red",
        text: "Suspended",
        icon: <ExclamationCircleOutlined />,
      },
      inactive: {
        color: "gray",
        text: "Inactive",
        icon: <ExclamationCircleOutlined />,
      },
      approved: {
        color: "green",
        text: "Approved",
        icon: <CheckCircleOutlined />,
      },
      waiting: {
        color: "orange",
        text: "Waiting Approval",
        icon: <ExclamationCircleOutlined />,
      },
      rejected: {
        color: "red",
        text: "Rejected",
        icon: <ExclamationCircleOutlined />,
      },
    };

    const userStatus = status || user?.status || "active";
    const config = statusConfig[userStatus] || {
      color: "blue",
      text: userStatus,
      icon: <UserOutlined />,
    };

    return (
      <Tag
        color={config.color}
        icon={config.icon}
        className="flex items-center gap-1"
      >
        {config.text}
      </Tag>
    );
  };

  // Get role tag
  const getRoleTag = (role) => {
    const roleConfig = {
      admin: { color: "red", text: "Administrator", icon: <CrownOutlined /> },
      hr: { color: "purple", text: "HR Manager", icon: <TeamOutlined /> },
      employee: { color: "blue", text: "Employee", icon: <UserOutlined /> },
      member: { color: "green", text: "Member", icon: <UserOutlined /> },
      "plot-owner": {
        color: "gold",
        text: "Plot Owner",
        icon: <EnvironmentOutlined />,
      },
      president: {
        color: "volcano",
        text: "President",
        icon: <CrownOutlined />,
      },
      "general-secretary": {
        color: "cyan",
        text: "General Secretary",
        icon: <UserOutlined />,
      },
      "finance-secretary": {
        color: "orange",
        text: "Finance Secretary",
        icon: <UserOutlined />,
      },
    };

    const userRole = role || user?.role || "member";
    const config = roleConfig[userRole?.toLowerCase()] || {
      color: "default",
      text: userRole,
      icon: <UserOutlined />,
    };

    return (
      <Tag
        color={config.color}
        icon={config.icon}
        className="flex items-center gap-1"
      >
        {config.text}
      </Tag>
    );
  };

  // Security items configuration
  const securityItems = [
    {
      title: "Change Password",
      description: "Update your login password regularly",
      icon: <LockOutlined className="text-blue-500" />,
      action: () => setSecurityModalVisible(true),
      status: "active",
    },
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      icon: <SecurityScanOutlined className="text-green-500" />,
      action: () => setTwoFactorEnabled(!twoFactorEnabled),
      status: twoFactorEnabled ? "enabled" : "disabled",
    },
    {
      title: "Login History",
      description: "Review recent login activities",
      icon: <HistoryOutlined className="text-orange-500" />,
      action: () => setActiveTab("security"),
      status: `${loginHistory?.length || 0} records`,
    },
    {
      title: "QR Profile",
      description: "Share your profile via QR code",
      icon: <QrcodeOutlined className="text-purple-500" />,
      action: () => setQrModalVisible(true),
      status: "available",
    },
  ];

  // Profile stats
  const profileStats = [
    {
      title: "Profile Complete",
      value: profileCompleteness || 0,
      suffix: "%",
      color:
        profileCompleteness === 100
          ? "#52c41a"
          : profileCompleteness >= 70
          ? "#1890ff"
          : "#faad14",
      icon: <UserOutlined />,
    },
    {
      title: "Account Age",
      value: user?.dateJoined ? dayjs().diff(dayjs(user.dateJoined), "day") : 0,
      suffix: " days",
      color: "#722ed1",
      icon: <CalendarOutlined />,
    },
    {
      title: "Login Streak",
      value: 15,
      suffix: " days",
      color: "#fa541c",
      icon: <TrophyOutlined />,
    },
    {
      title: "Activities",
      value: recentActivity?.length || 0,
      suffix: " this month",
      color: "#13c2c2",
      icon: <StarOutlined />,
    },
  ];

  // Loading state
  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
        <Text type="secondary" className="ml-4">
          Loading profile...
        </Text>
      </div>
    );
  }

  // {users?.role === "admin" && (
  //   <Alert message="You are viewing your admin profile" type="info" showIcon />
  // )}

  // Theme classes
  const cardClassName = `border-0 shadow-lg ${
    currentTheme === "dark"
      ? "bg-gray-800 text-white"
      : "bg-white text-gray-900"
  }`;

  const textColorClass =
    currentTheme === "dark" ? "text-gray-200" : "text-gray-800";
  const textMutedClass =
    currentTheme === "dark" ? "text-gray-400" : "text-gray-600";

  // Get display image
  const displayImage =
    user?.profilePhoto || user?.image || user?.profilePicture;

  // Tabs configuration
  const tabItems = [
    //     {
    //       key: "personal",
    //       label: (
    //         <Space>
    //           <UserOutlined />
    //           Personal Info
    //         </Space>
    //       ),
    //       children: (
    //         <Card className={cardClassName}>
    //           <Row gutter={[32, 32]}>
    //             <Col xs={24} md={8}>
    //               <div className="text-center space-y-6">
    //                 <div className="relative inline-block">
    //                   <Badge
    //                     count={
    //                       <Tooltip title="Change Photo">
    //                         <motion.div whileHover={{ scale: 1.1 }}>
    //                           <Upload
    //                             name="avatar"
    //                             listType="picture-circle"
    //                             className="avatar-uploader"
    //                             showUploadList={false}
    //                             beforeUpload={handleImageUpload}
    //                             disabled={uploading}
    //                           >
    //                             <Button
    //                               type="primary"
    //                               shape="circle"
    //                               size="small"
    //                               icon={<CameraOutlined />}
    //                               className="absolute bottom-0 right-0 shadow-lg"
    //                             />
    //                           </Upload>
    //                         </motion.div>
    //                       </Tooltip>
    //                     }
    //                     offset={[-10, 100]}
    //                   >
    //                     <Avatar
    //                       size={120}
    //                       src={displayImage}
    //                       icon={<UserOutlined />}
    //                       className="border-4 border-white shadow-xl"
    //                     />
    //                   </Badge>
    //                 </div>

    //                 <div>
    //                   <Title level={3} className={`!mb-2 ${textColorClass}`}>
    //                     {user?.firstName} {user?.lastName}
    //                   </Title>
    //                   <Text className={textMutedClass}>{user?.email}</Text>
    //                   <div className="mt-3 space-y-2">
    //                     {getRoleTag()}
    //                     {getStatusTag()}
    //                   </div>
    //                 </div>

    //                 <div
    //                   className={`space-y-3 p-4 rounded-lg ${
    //                     currentTheme === "dark" ? "bg-gray-700" : "bg-gray-50"
    //                   }`}
    //                 >
    //                   <div className="flex justify-between items-center">
    //                     <Text className={textMutedClass}>Member Since</Text>
    //                     <Text strong className={textColorClass}>
    //                       {user?.dateJoined
    //                         ? dayjs(user.dateJoined).format("MMM YYYY")
    //                         : "N/A"}
    //                     </Text>
    //                   </div>
    //                   <div className="flex justify-between items-center">
    //                     <Text className={textMutedClass}>Last Login</Text>
    //                     <Text strong className={textColorClass}>
    //                       {user?.lastLogin
    //                         ? dayjs(user.lastLogin).fromNow()
    //                         : "Never"}
    //                     </Text>
    //                   </div>
    //                   <div className="flex justify-between items-center">
    //                     <Text className={textMutedClass}>Profile Views</Text>
    //                     <Text strong className={textColorClass}>
    //                       1,234
    //                     </Text>
    //                   </div>
    //                 </div>
    //               </div>
    //             </Col>

    //             <Col xs={24} md={16}>
    //               <AnimatePresence mode="wait">
    //                 {editMode ? (
    //                   <motion.div
    //                     key="edit-form"
    //                     initial={{ opacity: 0, x: 20 }}
    //                     animate={{ opacity: 1, x: 0 }}
    //                     exit={{ opacity: 0, x: -20 }}
    //                   >
    //                     <Form
    //                       form={form}
    //                       layout="vertical"
    //                       onFinish={handleSave}
    //                       disabled={loading}
    //                       size="large"
    //                     >
    //                       <Row gutter={16}>
    //                         <Col xs={24} md={12}>
    //                           <Form.Item
    //                             name="firstName"
    //                             label="First Name"
    //                             rules={[
    //                               {
    //                                 required: true,
    //                                 message: "Please enter your first name",
    //                               },
    //                             ]}
    //                           >
    //                             <Input
    //                               prefix={<UserOutlined />}
    //                               placeholder="Enter your first name"
    //                             />
    //                           </Form.Item>
    //                         </Col>
    //                         <Col xs={24} md={12}>
    //                           <Form.Item
    //                             name="lastName"
    //                             label="Last Name"
    //                             rules={[
    //                               {
    //                                 required: true,
    //                                 message: "Please enter your last name",
    //                               },
    //                             ]}
    //                           >
    //                             <Input
    //                               prefix={<UserOutlined />}
    //                               placeholder="Enter your last name"
    //                             />
    //                           </Form.Item>
    //                         </Col>
    //                       </Row>

    //                       <Row gutter={16}>
    //                         <Col xs={24} md={12}>
    //                           <Form.Item
    //                             name="email"
    //                             label="Email Address"
    //                             rules={[
    //                               {
    //                                 required: true,
    //                                 message: "Please enter your email",
    //                               },
    //                               {
    //                                 type: "email",
    //                                 message: "Please enter a valid email",
    //                               },
    //                             ]}
    //                           >
    //                             <Input
    //                               prefix={<MailOutlined />}
    //                               placeholder="your.email@example.com"
    //                               disabled // Email shouldn't be editable usually
    //                             />
    //                           </Form.Item>
    //                         </Col>
    //                         <Col xs={24} md={12}>
    //                           <Form.Item name="phone" label="Phone Number">
    //                             <Input
    //                               prefix={<PhoneOutlined />}
    //                               placeholder="+1 234 567 8900"
    //                             />
    //                           </Form.Item>
    //                         </Col>
    //                       </Row>

    //                       <Form.Item name="address" label="Address">
    //                         <TextArea
    //                           rows={3}
    //                           placeholder="Enter your complete address"
    //                         />
    //                       </Form.Item>

    //                       <Row gutter={16}>
    //                         <Col xs={24} md={8}>
    //                           <Form.Item name="dob" label="Date of Birth">
    //                             <DatePicker
    //                               className="w-full"
    //                               format="YYYY-MM-DD"
    //                             />
    //                           </Form.Item>
    //                         </Col>
    //                         <Col xs={24} md={8}>
    //                           <Form.Item name="gender" label="Gender">
    //                             <Select placeholder="Select gender">
    //                               <Option value="male">Male</Option>
    //                               <Option value="female">Female</Option>
    //                               <Option value="other">Other</Option>
    //                             </Select>
    //                           </Form.Item>
    //                         </Col>
    //                         <Col xs={24} md={8}>
    //                           <Form.Item name="nidNumber" label="NID Number">
    //                             <Input placeholder="Enter NID number" />
    //                           </Form.Item>
    //                         </Col>
    //                       </Row>

    //                       <Divider />

    //                       <div className="flex justify-end space-x-3">
    //                         <Button
    //                           onClick={handleCancel}
    //                           disabled={loading}
    //                           size="large"
    //                         >
    //                           Cancel
    //                         </Button>
    //                         <Button
    //                           type="primary"
    //                           htmlType="submit"
    //                           loading={updating}
    //                           icon={<SaveOutlined />}
    //                           size="large"
    //                         >
    //                           Save Changes
    //                         </Button>
    //                       </div>
    //                     </Form>
    //                   </motion.div>
    //                 ) : (
    //                   <motion.div
    //                     key="view-mode"
    //                     initial={{ opacity: 0, x: -20 }}
    //                     animate={{ opacity: 1, x: 0 }}
    //                     exit={{ opacity: 0, x: 20 }}
    //                   >
    //                     <Descriptions
    //                       column={1}
    //                       bordered
    //                       size="middle"
    //                       styles={{
    //                         fontWeight: 600,
    //                         width: "200px",
    //                         backgroundColor:
    //                           currentTheme === "dark" ? "#374151" : "#fafafa",
    //                       }}
    //                     >
    //                       <Descriptions.Item label="Full Name">
    //                         <Text className={textColorClass}>
    //                           {user?.firstName} {user?.lastName}
    //                         </Text>
    //                       </Descriptions.Item>
    //                       <Descriptions.Item label="Email">
    //                         <Text className={textColorClass}>{user?.email}</Text>
    //                       </Descriptions.Item>
    //                       <Descriptions.Item label="Phone">
    //                         <Text className={textColorClass}>
    //                           {user?.phone || user?.telephone || "Not provided"}
    //                         </Text>
    //                       </Descriptions.Item>
    //                       {/* <Descriptions.Item label="Address">
    //                         <Text className={textColorClass}>
    //                           {user?.address || user?.addressOne || "Not provided"}
    //                         </Text>
    //                       </Descriptions.Item> */}

    // <Descriptions.Item label="Address">
    //   {user?.address ? (
    //     typeof user.address === 'string' ? (
    //       // If address is a string, display it directly
    //       <Text className={textColorClass}>{user.address}</Text>
    //     ) : (
    //       // If address is an object, safely access its properties
    //       <Text className={textColorClass}>
    //         {[
    //           user.address.street,
    //           user.address.city,
    //           user.address.state,
    //           user.address.country,
    //           user.address.postalCode
    //         ]
    //           .filter(Boolean) // Remove empty/null values
    //           .join(', ') || 'Address not provided'}
    //       </Text>
    //     )
    //   ) : (
    //     <Text className={textColorClass}>No address provided</Text>
    //   )}
    // </Descriptions.Item>

    //                       <Descriptions.Item label="Date of Birth">
    //                         <Text className={textColorClass}>
    //                           {user?.dob
    //                             ? dayjs(user.dob).format("MMMM DD, YYYY")
    //                             : "Not provided"}
    //                         </Text>
    //                       </Descriptions.Item>
    //                       <Descriptions.Item label="Gender">
    //                         <Text className={textColorClass}>
    //                           {user?.gender
    //                             ? user.gender.charAt(0).toUpperCase() +
    //                               user.gender.slice(1)
    //                             : "Not provided"}
    //                         </Text>
    //                       </Descriptions.Item>
    //                       <Descriptions.Item label="NID Number">
    //                         <Text className={textColorClass}>
    //                           {user?.nidNumber || "Not provided"}
    //                         </Text>
    //                       </Descriptions.Item>
    //                       <Descriptions.Item label="Member ID">
    //                         <Text strong className={textColorClass}>
    //                           {user?.membershipId || "N/A"}
    //                         </Text>
    //                       </Descriptions.Item>
    //                     </Descriptions>
    //                   </motion.div>
    //                 )}
    //               </AnimatePresence>
    //             </Col>
    //           </Row>
    //         </Card>
    //       ),
    //     },
    {
      key: "personal",
      label: (
        <Space>
          <UserOutlined />
          Personal Info
        </Space>
      ),
      children: (
        <Card className={cardClassName}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <Badge
                    count={
                      <Tooltip title="Change Photo">
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={handleImageUpload}
                            disabled={uploading}
                          >
                            <Button
                              type="primary"
                              shape="circle"
                              size="small"
                              icon={<CameraOutlined />}
                              className="absolute bottom-0 right-0 shadow-lg"
                            />
                          </Upload>
                        </motion.div>
                      </Tooltip>
                    }
                    offset={[-10, 100]}
                  >
                    <Avatar
                      size={120}
                      src={displayImage}
                      icon={<UserOutlined />}
                      className="border-4 border-white shadow-xl"
                    />
                  </Badge>
                </div>

                <div>
                  <Title level={3} className={`!mb-2 ${textColorClass}`}>
                    {user?.firstName} {user?.lastName}
                  </Title>
                  <Text className={textMutedClass}>{user?.email}</Text>
                  <div className="mt-3 space-y-2">
                    {getRoleTag()}
                    {getStatusTag()}
                  </div>
                </div>

                <div
                  className={`space-y-3 p-4 rounded-lg ${
                    currentTheme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <Text className={textMutedClass}>Member Since</Text>
                    <Text strong className={textColorClass}>
                      {user?.dateJoined
                        ? dayjs(user.dateJoined).format("MMM YYYY")
                        : "N/A"}
                    </Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Text className={textMutedClass}>Last Login</Text>
                    <Text strong className={textColorClass}>
                      {user?.lastLogin
                        ? dayjs(user.lastLogin).fromNow()
                        : "Never"}
                    </Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Text className={textMutedClass}>Profile Views</Text>
                    <Text strong className={textColorClass}>
                      1,234
                    </Text>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} md={16}>
              <AnimatePresence mode="wait">
                {editMode ? (
                  <motion.div
                    key="edit-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSave}
                      disabled={loading}
                      size="large"
                    >
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your first name",
                              },
                            ]}
                          >
                            <Input
                              prefix={<UserOutlined />}
                              placeholder="Enter your first name"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your last name",
                              },
                            ]}
                          >
                            <Input
                              prefix={<UserOutlined />}
                              placeholder="Enter your last name"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="email"
                            label="Email Address"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your email",
                              },
                              {
                                type: "email",
                                message: "Please enter a valid email",
                              },
                            ]}
                          >
                            <Input
                              prefix={<MailOutlined />}
                              placeholder="your.email@example.com"
                              disabled // Email shouldn't be editable usually
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="phone" label="Phone Number">
                            <Input
                              prefix={<PhoneOutlined />}
                              placeholder="+1 234 567 8900"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item name="address" label="Address">
                        <TextArea
                          rows={3}
                          placeholder="Enter your complete address"
                        />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col xs={24} md={8}>
                          <Form.Item name="dob" label="Date of Birth">
                            <DatePicker
                              className="w-full"
                              format="YYYY-MM-DD"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item name="gender" label="Gender">
                            <Select placeholder="Select gender">
                              <Option value="male">Male</Option>
                              <Option value="female">Female</Option>
                              <Option value="other">Other</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item name="nidNumber" label="NID Number">
                            <Input placeholder="Enter NID number" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Divider />

                      <div className="flex justify-end space-x-3">
                        <Button
                          onClick={handleCancel}
                          disabled={loading}
                          size="large"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={updating}
                          icon={<SaveOutlined />}
                          size="large"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="view-mode"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Descriptions
                      column={1}
                      bordered
                      size="middle"
                      styles={{
                        fontWeight: 600,
                        width: "200px",
                        backgroundColor:
                          currentTheme === "dark" ? "#374151" : "#fafafa",
                      }}
                    >
                      <Descriptions.Item label="Full Name">
                        <Text className={textColorClass}>
                          {user?.firstName} {user?.lastName}
                        </Text>
                      </Descriptions.Item>

                      <Descriptions.Item label="Email">
                        <Text className={textColorClass}>{user?.email}</Text>
                      </Descriptions.Item>

                      <Descriptions.Item label="Phone">
                        <Text className={textColorClass}>
                          {user?.phone || user?.telephone || "Not provided"}
                        </Text>
                      </Descriptions.Item>

                      {/* FIXED ADDRESS SECTION */}
                      <Descriptions.Item label="Address">
                        {user?.address ? (
                          typeof user.address === "string" ? (
                            <Text className={textColorClass}>
                              {user.address}
                            </Text>
                          ) : (
                            <Text className={textColorClass}>
                              {[
                                user.address.street,
                                user.address.city,
                                user.address.state,
                                user.address.country,
                              ]
                                .filter((part) => part && part.trim() !== "")
                                .join(", ") || "No address provided"}
                            </Text>
                          )
                        ) : (
                          <Text className={textColorClass}>
                            No address provided
                          </Text>
                        )}
                      </Descriptions.Item>

                      <Descriptions.Item label="Date of Birth">
                        <Text className={textColorClass}>
                          {user?.dob
                            ? dayjs(user.dob).format("MMMM DD, YYYY")
                            : "Not provided"}
                        </Text>
                      </Descriptions.Item>

                      <Descriptions.Item label="Gender">
                        <Text className={textColorClass}>
                          {user?.gender
                            ? user.gender.charAt(0).toUpperCase() +
                              user.gender.slice(1)
                            : "Not provided"}
                        </Text>
                      </Descriptions.Item>

                      <Descriptions.Item label="NID Number">
                        <Text className={textColorClass}>
                          {user?.nidNumber || "Not provided"}
                        </Text>
                      </Descriptions.Item>

                      <Descriptions.Item label="Member ID">
                        <Text strong className={textColorClass}>
                          {user?.membershipId || "N/A"}
                        </Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </motion.div>
                )}
              </AnimatePresence>
            </Col>
          </Row>
        </Card>
      ),
    },

    {
      key: "professional",
      label: (
        <Space>
          <IdcardOutlined />
          Professional
        </Space>
      ),
      children: (
        <Card className={cardClassName}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Title level={4} className={textColorClass}>
                Professional Information
              </Title>
              <Descriptions
                column={1}
                bordered
                size="middle"
                styles={{
                  fontWeight: 600,
                  backgroundColor:
                    currentTheme === "dark" ? "#374151" : "#fafafa",
                }}
              >
                <Descriptions.Item label="Role">
                  {getRoleTag()}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {getStatusTag()}
                </Descriptions.Item>
                <Descriptions.Item label="Committee Position">
                  <Text className={textColorClass}>
                    {user?.committeePosition || "Not assigned"}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Join Date">
                  <Text className={textColorClass}>
                    {user?.dateJoined
                      ? dayjs(user.dateJoined).format("MMMM DD, YYYY")
                      : "N/A"}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Division">
                  <Text className={textColorClass}>
                    {user?.division || "Not assigned"}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="District">
                  <Text className={textColorClass}>
                    {user?.district || "Not assigned"}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Col>

            <Col xs={24} lg={12}>
              <Title level={4} className={textColorClass}>
                Recent Activity
              </Title>
              <Timeline>
                {(recentActivity || []).slice(0, 5).map((activity, index) => (
                  <Timeline.Item
                    key={activity.id || index}
                    dot={<UserOutlined style={{ fontSize: "16px" }} />}
                    color="blue"
                  >
                    <div className="space-y-1">
                      <div className={`font-medium ${textColorClass}`}>
                        {activity.action || "Activity"}
                      </div>
                      <div className={textMutedClass}>
                        {activity.description || "No description available"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time
                          ? dayjs(activity.time).fromNow()
                          : "Recently"}
                      </div>
                      {activity.activityType && (
                        <div className="text-xs">
                          <Tag size="small" color="blue">
                            {activity.activityType}
                          </Tag>
                        </div>
                      )}
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: "security",
      label: (
        <Space>
          <SecurityScanOutlined />
          Security
        </Space>
      ),
      children: (
        <Card className={cardClassName}>
          <Title level={4} className={textColorClass}>
            Security Settings
          </Title>
          <Row gutter={[16, 16]} className="mb-6">
            {securityItems.map((item, index) => (
              <Col xs={24} sm={12} key={index}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card
                    size="small"
                    className={`cursor-pointer transition-all ${
                      currentTheme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-blue-50"
                    } border ${
                      currentTheme === "dark"
                        ? "border-gray-600"
                        : "border-gray-200"
                    }`}
                    onClick={item.action}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <div className={`font-semibold ${textColorClass}`}>
                            {item.title}
                          </div>
                          <div
                            className={textMutedClass}
                            style={{ fontSize: "12px" }}
                          >
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <Badge
                        status={
                          item.status === "enabled" ? "success" : "default"
                        }
                        text={item.status}
                        className="text-xs"
                      />
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
          <Title level={4} className={textColorClass}>
            Recent Login History
          </Title>
          // In the security tab, update the List component:
          <List
            dataSource={loginHistory || []}
            renderItem={(item, index) => (
              <List.Item key={item.id || index}>
                <List.Item.Meta
                  avatar={<Avatar icon={<TabletOutlined />} />}
                  title={
                    <Text className={textColorClass}>
                      {item.device} • {item.location}
                    </Text>
                  }
                  description={
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">IP: {item.ip}</Text>
                      <Text type="secondary">
                        {item.time
                          ? dayjs(item.time).format("MMM D, YYYY HH:mm")
                          : "Unknown time"}
                      </Text>
                    </Space>
                  }
                />
                <Badge
                  status={item.status === "success" ? "success" : "error"}
                  text={item.status}
                />
              </List.Item>
            )}
          />
        </Card>
      ),
    },
  ];

  return (
    <div
      className={`space-y-6 p-4 ${
        currentTheme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } min-h-screen`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start flex-wrap gap-4"
      >
        <div>
          <Title level={1} className={`!mb-2 ${textColorClass}`}>
            My Profile
          </Title>
          <Text className={textMutedClass}>
            Manage your personal information and account settings
          </Text>
        </div>

        <Space>
          <Button
            icon={<QrcodeOutlined />}
            onClick={() => setQrModalVisible(true)}
          >
            QR Code
          </Button>
          {!editMode && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2"
            >
              Edit Profile
            </Button>
          )}
        </Space>
      </motion.div>

      {profileCompleteness < 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Alert
            message="Complete Your Profile"
            description={`Your profile is ${profileCompleteness}% complete. Complete all fields to unlock full features.`}
            type="info"
            showIcon
            action={
              <Button
                size="small"
                type="primary"
                onClick={() => setEditMode(true)}
              >
                Complete Now
              </Button>
            }
            className={cardClassName}
          />
        </motion.div>
      )}

      <Row gutter={[16, 16]} className="mb-6">
        {profileStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className={cardClassName}>
                <div className="flex justify-between items-start mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    {stat.icon}
                  </div>
                  <Text className={textMutedClass} style={{ fontSize: "12px" }}>
                    {stat.title}
                  </Text>
                </div>

                <Statistic
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{
                    color: stat.color,
                    fontSize: "24px",
                  }}
                />

                {stat.title === "Profile Complete" && (
                  <Progress
                    percent={stat.value}
                    size="small"
                    strokeColor={stat.color}
                    showInfo={false}
                    className="mt-2"
                  />
                )}
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        items={tabItems}
      />

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={securityModalVisible}
        onCancel={() => setSecurityModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          form={passwordForm}
          onFinish={handlePasswordChange}
          size="large"
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Please enter current password" },
            ]}
          >
            <Password
              placeholder="Enter current password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Password
              placeholder="Enter new password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Password
              placeholder="Confirm new password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <div className="flex justify-end space-x-3">
            <Button onClick={() => setSecurityModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={changingPassword}>
              Update Password
            </Button>
          </div>
        </Form>
      </Modal>

      {/* QR Code Modal */}
      <Modal
        title="Profile QR Code"
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        footer={[
          <Button key="download" icon={<DownloadOutlined />}>
            Download QR
          </Button>,
          <Button key="close" onClick={() => setQrModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <div className="text-center space-y-4">
          <QRCode
            value={`${window.location.origin}/profile/${
              user?.membershipId || user?.id || "unknown"
            }`}
            size={200}
            iconSize={40}
          />
          <div>
            {/* <div className="flex space-x-1 mt-1">
                          <Tag
                            color={
                              userData?.role === "admin"
                                ? "red"
                                : userData?.role === "hr"
                                ? "blue"
                                : userData?.role === "Employee"
                                ? "orange"
                                : "green"
                            }
                            className="text-xs px-1 py-0 border-0 capitalize"
                          >
                            {userData?.role}
                          </Tag>
                          {userData?.membershipId && (
                            <Tag color="green" className="text-xs px-1 py-0 border-0">
                              {userData.membershipId}
                            </Tag>
                          )}
                        </div> */}

            {/* <Text strong>{users?.firstName} {users?.lastName}</Text>
            <Text type="secondary">Role: {users?.role}</Text> */}
            <Text strong className={textColorClass}>
              {user?.firstName} {user?.lastName}
            </Text>
            <br />
            <Text className={textMutedClass}>Scan to view profile</Text>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;


////////////////////////Previous perfect code ////////////////////////

// import { useState, useEffect } from "react";
// import {
//   Row,
//   Col,
//   Card,
//   Statistic,
//   Table,
//   Tag,
//   Progress,
//   List,
//   Avatar,
//   Skeleton,
//   message,
//   Button,
//   Dropdown,
//   Space,
//   Timeline,
//   Badge,
//   Typography,
//   Tooltip
// } from "antd";
// import {
//   TeamOutlined,
//   ShoppingCartOutlined,
//   CheckCircleOutlined,
//   UserOutlined,
//   RiseOutlined,
//   AlertOutlined,
//   EyeOutlined,
//   DownloadOutlined,
//   MoreOutlined,
//   ArrowUpOutlined,
//   ArrowDownOutlined,
//   CalendarOutlined,
//   DollarOutlined,
//   FileTextOutlined,
//   SettingOutlined
// } from "@ant-design/icons";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.extend(relativeTime);

// const { Title, Text } = Typography;

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({});
//   const [recentActivities, setRecentActivities] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState([]);
//   const navigate = useNavigate();
//   const currentTheme = useSelector((state) => state.theme.currentTheme);
//   const user = useSelector((state) => state.user.value);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchDashboardData();
//     fetchRecentUsers();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [statsRes, activitiesRes, dashboardRes] = await Promise.all([
//         axios.get("http://localhost:3000/api/v1/admin/getdashboard/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get("http://localhost:3000/api/v1/admin/recent-activities", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get("http://localhost:3000/api/v1/dashboard/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//       ]);

//       setStats(statsRes.data.stats || {});
//       setRecentActivities(activitiesRes.data.data || []);
      
//       // Merge dashboard stats
//       if (dashboardRes.data.data) {
//         setStats(prev => ({
//           ...prev,
//           ...dashboardRes.data.data
//         }));
//       }
//     } catch (error) {
//       console.error("Dashboard data fetch error:", error);
//       message.error("Failed to load dashboard data");
//       setFallbackData();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRecentUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/v1/admin/Allusers?limit=5", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.users || []);
//     } catch (error) {
//       console.error("Users fetch error:", error);
//     }
//   };

//   const setFallbackData = () => {
//     setStats({
//       totalUsers: 150,
//       totalMembers: 120,
//       totalCommittee: 15,
//       paidSubscriptions: 89,
//       pendingApplications: 12,
//       recentAnnouncements: 5,
//       totalIncome: 125000,
//       pendingApprovals: 8,
//       activeMembers: 110,
//       memberGrowthRate: 12.5,
//       collectionEfficiency: 85.3
//     });
    
//     setRecentActivities([
//       {
//         _id: 1,
//         user: { firstName: "John", lastName: "Doe", email: "john@example.com", role: "Admin" },
//         action: "User Registration",
//         description: "New member registered - Sarah Johnson",
//         createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
//       },
//       {
//         _id: 2,
//         user: { firstName: "Jane", lastName: "Smith", email: "jane@example.com", role: "HR" },
//         action: "Payment Processed",
//         description: "Monthly subscription collected - MEM-001",
//         createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
//       }
//     ]);
//   };

//   const statCards = [
//     {
//       title: "Total Users",
//       value: stats.totalUsers || 0,
//       icon: <UserOutlined />,
//       color: "#1890ff",
//       progress: ((stats.totalUsers || 0) / 200) * 100,
//       change: "+12%",
//       trend: "up"
//     },
//     {
//       title: "Active Members",
//       value: stats.activeMembers || stats.totalMembers || 0,
//       icon: <TeamOutlined />,
//       color: "#52c41a",
//       progress: ((stats.activeMembers || stats.totalMembers || 0) / 150) * 100,
//       change: "+8%",
//       trend: "up"
//     },
//     {
//       title: "Pending Approvals",
//       value: stats.pendingApprovals || 0,
//       icon: <AlertOutlined />,
//       color: "#faad14",
//       progress: ((stats.pendingApprovals || 0) / 20) * 100,
//       change: "-3%",
//       trend: "down"
//     },
//     {
//       title: "Monthly Revenue",
//       value: `$${(stats.totalIncome || 0).toLocaleString()}`,
//       icon: <DollarOutlined />,
//       color: "#13c2c2",
//       progress: ((stats.totalIncome || 0) / 150000) * 100,
//       change: "+15%",
//       trend: "up"
//     },
//     {
//       title: "Collection Rate",
//       value: `${stats.collectionEfficiency || 0}%`,
//       icon: <CheckCircleOutlined />,
//       color: "#722ed1",
//       progress: stats.collectionEfficiency || 0,
//       change: "+5%",
//       trend: "up"
//     },
//     {
//       title: "Growth Rate",
//       value: `${stats.memberGrowthRate || 0}%`,
//       icon: <RiseOutlined />,
//       color: "#fa541c",
//       progress: stats.memberGrowthRate || 0,
//       change: "+2%",
//       trend: "up"
//     }
//   ];

//   const quickActions = [
//     {
//       title: "User Management",
//       description: "Manage system users and permissions",
//       icon: "👥",
//       path: "/users",
//       color: "blue"
//     },
//     {
//       title: "Financial Reports",
//       description: "View financial analytics and reports",
//       icon: "📊",
//       path: "/financereports",
//       color: "green"
//     },
//     {
//       title: "System Settings",
//       description: "Configure system preferences",
//       icon: "⚙️",
//       path: "/settings/general",
//       color: "orange"
//     },
//     {
//       title: "Role Management",
//       description: "Manage user roles and permissions",
//       icon: "🔐",
//       path: "/roles",
//       color: "purple"
//     }
//   ];

//   const activityColumns = [
//     {
//       title: "User",
//       dataIndex: "user",
//       key: "user",
//       render: (user) => (
//         <div className="flex items-center">
//           <Avatar 
//             size="small" 
//             src={user.profilePhoto} 
//             icon={<UserOutlined />}
//             className={`${currentTheme === 'dark' ? 'bg-gray-600' : 'bg-blue-100'}`}
//           />
//           <div className="ml-2">
//             <div className="text-sm font-medium">
//               {user?.firstName} {user?.lastName}
//             </div>
//             <div className="text-xs text-gray-500">{user?.role}</div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       render: (action) => (
//         <Tag color="blue" className="text-xs">
//           {action}
//         </Tag>
//       ),
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//       render: (desc) => (
//         <Text className="text-sm" ellipsis={{ tooltip: desc }}>
//           {desc}
//         </Text>
//       ),
//     },
//     {
//       title: "Time",
//       dataIndex: "createdAt",
//       key: "time",
//       render: (time) => (
//         <Text type="secondary" className="text-xs">
//           {dayjs(time).fromNow()}
//         </Text>
//       ),
//     },
//   ];

//   const getTrendIcon = (trend) => {
//     return trend === "up" ? 
//       <ArrowUpOutlined className="text-green-500" /> : 
//       <ArrowDownOutlined className="text-red-500" />;
//   };

//   return (
//     <div className={`p-6 min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-8"
//       >
//         <div className="flex justify-between items-start">
//           <div>
//             <Title 
//               level={1} 
//               className={`!mb-2 ${currentTheme === 'dark' ? '!text-white' : '!text-gray-800'}`}
//             >
//               Admin Dashboard
//             </Title>
//             <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Welcome back, {user?.firstName}! 👋 Here's your system overview.
//             </Text>
//           </div>
//           <Space>
//             <Button icon={<DownloadOutlined />}>Export Report</Button>
//             <Button type="primary" icon={<SettingOutlined />}>
//               Settings
//             </Button>
//           </Space>
//         </div>
//       </motion.div>

//       {/* Statistics Cards */}
//       <Row gutter={[16, 16]} className="mb-6">
//         {loading
//           ? Array.from({ length: 6 }).map((_, i) => (
//               <Col xs={24} sm={12} lg={8} xl={6} key={i}>
//                 <Card className="shadow-lg border-0">
//                   <Skeleton active paragraph={{ rows: 3 }} />
//                 </Card>
//               </Col>
//             ))
//           : statCards.map((card, index) => (
//               <Col xs={24} sm={12} lg={8} xl={6} key={index}>
//                 <motion.div
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                 >
//                   <Card
//                     className={`shadow-lg border-0 hover:shadow-xl transition-all ${
//                       currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
//                     }`}
//                     bodyStyle={{ padding: "20px" }}
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div
//                         className="p-3 rounded-lg"
//                         style={{ backgroundColor: `${card.color}15` }}
//                       >
//                         {card.icon}
//                       </div>
//                       <div className="flex items-center text-sm">
//                         {getTrendIcon(card.trend)}
//                         <span
//                           className={`ml-1 ${
//                             card.trend === "up" ? "text-green-500" : "text-red-500"
//                           }`}
//                         >
//                           {card.change}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <Statistic
//                       title={
//                         <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//                           {card.title}
//                         </Text>
//                       }
//                       value={card.value}
//                       valueStyle={{ 
//                         color: currentTheme === 'dark' ? '#fff' : card.color,
//                         fontSize: '24px'
//                       }}
//                     />
                    
//                     <Progress
//                       percent={Math.min(card.progress, 100)}
//                       size="small"
//                       showInfo={false}
//                       strokeColor={card.color}
//                       className="mt-3"
//                     />
                    
//                     <div className="flex justify-between text-xs mt-2">
//                       <Text type="secondary">Target: 100%</Text>
//                       <Text strong>{Math.round(card.progress)}%</Text>
//                     </div>
//                   </Card>
//                 </motion.div>
//               </Col>
//             ))}
//       </Row>

//       <Row gutter={[16, 16]}>
//         {/* Recent Activities */}
//         <Col xs={24} lg={16}>
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <Card 
//               title={
//                 <div className="flex items-center">
//                   <FileTextOutlined className="mr-2 text-blue-500" />
//                   <span className={currentTheme === 'dark' ? 'text-white' : ''}>
//                     Recent Activities
//                   </span>
//                 </div>
//               }
//               className={`shadow-lg border-0 ${
//                 currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
//               }`}
//               extra={
//                 <Button 
//                   type="link" 
//                   onClick={() => navigate('/audit')}
//                   className={currentTheme === 'dark' ? 'text-blue-400' : ''}
//                 >
//                   View All
//                 </Button>
//               }
//             >
//               <Table
//                 columns={activityColumns}
//                 dataSource={recentActivities}
//                 pagination={false}
//                 size="middle"
//                 loading={loading}
//                 rowKey={(record) => record._id || record.id}
//                 className="activity-table"
//               />
//             </Card>
//           </motion.div>
//         </Col>

//         {/* Quick Actions & Recent Users */}
//         <Col xs={24} lg={8}>
//           <Space direction="vertical" size={16} className="w-full">
//             {/* Quick Actions */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <Card 
//                 title={
//                   <div className="flex items-center">
//                     <RiseOutlined className="mr-2 text-green-500" />
//                     <span className={currentTheme === 'dark' ? 'text-white' : ''}>
//                       Quick Actions
//                     </span>
//                   </div>
//                 }
//                 className={`shadow-lg border-0 ${
//                   currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
//                 }`}
//               >
//                 <List
//                   dataSource={quickActions}
//                   renderItem={(item) => (
//                     <List.Item
//                       className={`cursor-pointer rounded-lg transition-all p-3 ${
//                         currentTheme === 'dark' 
//                           ? 'hover:bg-gray-700 border-gray-700' 
//                           : 'hover:bg-blue-50 border-gray-200'
//                       } border`}
//                       onClick={() => navigate(item.path)}
//                     >
//                       <div className="flex items-center space-x-3 w-full">
//                         <div 
//                           className="text-2xl transition-transform group-hover:scale-110"
//                           style={{ color: item.color }}
//                         >
//                           {item.icon}
//                         </div>
//                         <div className="flex-1">
//                           <div className={`font-medium ${
//                             currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
//                           }`}>
//                             {item.title}
//                           </div>
//                           <div className={`text-sm ${
//                             currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
//                           }`}>
//                             {item.description}
//                           </div>
//                         </div>
//                         <EyeOutlined className="text-gray-400" />
//                       </div>
//                     </List.Item>
//                   )}
//                 />
//               </Card>
//             </motion.div>

//             {/* System Status */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               <Card 
//                 title={
//                   <div className="flex items-center">
//                     <CheckCircleOutlined className="mr-2 text-green-500" />
//                     <span className={currentTheme === 'dark' ? 'text-white' : ''}>
//                       System Status
//                     </span>
//                   </div>
//                 }
//                 className={`shadow-lg border-0 ${
//                   currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
//                 }`}
//               >
//                 <Space direction="vertical" className="w-full">
//                   <div className="flex justify-between items-center">
//                     <Text className={currentTheme === 'dark' ? 'text-gray-300' : ''}>
//                       Server Status
//                     </Text>
//                     <Badge status="success" text="Online" />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <Text className={currentTheme === 'dark' ? 'text-gray-300' : ''}>
//                       Database
//                     </Text>
//                     <Badge status="success" text="Connected" />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <Text className={currentTheme === 'dark' ? 'text-gray-300' : ''}>
//                       Last Backup
//                     </Text>
//                     <Text type="secondary">{dayjs().format('MMM D, HH:mm')}</Text>
//                   </div>
//                 </Space>
//               </Card>
//             </motion.div>
//           </Space>
//         </Col>
//       </Row>

//       {/* Recent Users Table */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//         className="mt-6"
//       >
//         <Card 
//           title={
//             <div className="flex items-center">
//               <TeamOutlined className="mr-2 text-blue-500" />
//               <span className={currentTheme === 'dark' ? 'text-white' : ''}>
//                 Recent Users
//               </span>
//             </div>
//           }
//           className={`shadow-lg border-0 ${
//             currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
//           }`}
//           extra={
//             <Button 
//               type="link" 
//               onClick={() => navigate('/users')}
//               className={currentTheme === 'dark' ? 'text-blue-400' : ''}
//             >
//               View All
//             </Button>
//           }
//         >
//           <List
//             dataSource={users}
//             renderItem={(user) => (
//               <List.Item>
//                 <List.Item.Meta
//                   avatar={
//                     <Avatar 
//                       src={user.profilePhoto} 
//                       icon={<UserOutlined />}
//                       className={currentTheme === 'dark' ? 'bg-gray-600' : 'bg-blue-100'}
//                     />
//                   }
//                   title={
//                     <Text className={currentTheme === 'dark' ? 'text-white' : ''}>
//                       {user.firstName} {user.lastName}
//                     </Text>
//                   }
//                   description={
//                     <Space direction="vertical" size={0}>
//                       <Text type="secondary" className="text-xs">
//                         {user.email}
//                       </Text>
//                       <Tag 
//                         color={user.isActive ? "green" : "red"} 
//                         className="text-xs"
//                       >
//                         {user.isActive ? "Active" : "Inactive"}
//                       </Tag>
//                     </Space>
//                   }
//                 />
//                 <div>
//                   <Text type="secondary" className="text-xs">
//                     {user.role}
//                   </Text>
//                 </div>
//               </List.Item>
//             )}
//             loading={loading}
//           />
//         </Card>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminDashboard;




////////////////Corrected New1//////////////////////


// import React from 'react';
// import { Row, Col, Card, Statistic, Typography, Table, Tag, Progress, Alert } from 'antd';
// import { 
//   UserOutlined, 
//   TeamOutlined, 
//   DollarOutlined, 
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   BarChartOutlined,
//   // SecurityOutlined,
//   SecurityScanOutlined
// } from '@ant-design/icons';

// const { Title, Text } = Typography;

// const AdminDashboard = () => {
//   // Mock data for demonstration
//   const statsData = [
//     {
//       title: 'Total Users',
//       value: 156,
//       icon: <UserOutlined />,
//       color: '#1890ff',
//       progress: 75
//     },
//     {
//       title: 'Active Members',
//       value: 128,
//       icon: <TeamOutlined />,
//       color: '#52c41a',
//       progress: 85
//     },
//     {
//       title: 'Revenue',
//       value: 125600,
//       icon: <DollarOutlined />,
//       color: '#faad14',
//       prefix: '₹',
//       progress: 65
//     },
//     {
//       title: 'Tasks Completed',
//       value: 89,
//       icon: <CheckCircleOutlined />,
//       color: '#722ed1',
//       suffix: '%',
//       progress: 89
//     }
//   ];

//   const recentActivities = [
//     {
//       key: '1',
//       user: 'John Doe',
//       action: 'User Registration',
//       time: '2 hours ago',
//       status: 'completed'
//     },
//     {
//       key: '2',
//       user: 'Sarah Wilson',
//       action: 'Profile Update',
//       time: '5 hours ago',
//       status: 'completed'
//     },
//     {
//       key: '3',
//       user: 'Mike Johnson',
//       action: 'Payment Processing',
//       time: '1 day ago',
//       status: 'pending'
//     },
//     {
//       key: '4',
//       user: 'System',
//       action: 'Database Backup',
//       time: '1 day ago',
//       status: 'completed'
//     }
//   ];

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       key: 'action',
//     },
//     {
//       title: 'Time',
//       dataIndex: 'time',
//       key: 'time',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color={status === 'completed' ? 'green' : 'orange'}>
//           {status.toUpperCase()}
//         </Tag>
//       ),
//     },
//   ];

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: { color: 'green', text: 'ACTIVE' },
//       pending: { color: 'orange', text: 'PENDING' },
//       completed: { color: 'blue', text: 'COMPLETED' }
//     };
//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
//         <Row gutter={[16, 16]} align="middle">
//           <Col xs={24} md={16}>
//             <Title level={2} className="!mb-2 !text-gray-800">
//               Welcome to Admin Dashboard! 👑
//             </Title>
//             <Text className="text-gray-600 text-lg">
//               Manage your association efficiently with comprehensive oversight.
//             </Text>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <Tag icon={<SecurityScanOutlined/>} color="red">
//                 Administrator Access
//               </Tag>
//               <Tag icon={<BarChartOutlined />} color="blue">
//                 System Overview
//               </Tag>
//               <Tag icon={<ClockCircleOutlined />} color="green">
//                 Real-time Monitoring
//               </Tag>
//             </div>
//           </Col>
//           <Col xs={24} md={8}>
//             <div className="flex justify-end">
//               <div className="text-right">
//                 <Text className="text-gray-600 block">Last System Update</Text>
//                 <Text strong className="text-gray-800 text-lg">
//                   Just now
//                 </Text>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>

//       {/* Statistics Cards */}
//       <Row gutter={[16, 16]}>
//         {statsData.map((stat, index) => (
//           <Col xs={24} sm={12} lg={6} key={index}>
//             <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
//               <Statistic
//                 title={stat.title}
//                 value={stat.value}
//                 prefix={stat.prefix || stat.icon}
//                 suffix={stat.suffix}
//                 valueStyle={{ color: stat.color }}
//               />
//               <Progress 
//                 percent={stat.progress} 
//                 size="small" 
//                 showInfo={false}
//                 strokeColor={stat.color}
//                 className="mt-2"
//               />
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Row gutter={[16, 16]}>
//         {/* Recent Activities */}
//         <Col xs={24} lg={16}>
//           <Card 
//             title={
//               <div className="flex items-center">
//                 <ClockCircleOutlined className="text-blue-500 mr-2" />
//                 <span className="text-lg font-semibold">Recent System Activities</span>
//               </div>
//             }
//             className="shadow-sm border-0"
//           >
//             <Table 
//               dataSource={recentActivities} 
//               columns={columns}
//               pagination={false}
//               size="middle"
//             />
//           </Card>
//         </Col>

//         {/* Quick Stats */}
//         <Col xs={24} lg={8}>
//           <Card 
//             title={
//               <div className="flex items-center">
//                 <BarChartOutlined className="text-green-500 mr-2" />
//                 <span className="text-lg font-semibold">Quick Stats</span>
//               </div>
//             }
//             className="shadow-sm border-0"
//           >
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <Text>System Health</Text>
//                 <Progress percent={95} size="small" />
//               </div>
//               <div className="flex justify-between items-center">
//                 <Text>Storage Used</Text>
//                 <Progress percent={65} size="small" />
//               </div>
//               <div className="flex justify-between items-center">
//                 <Text>API Response</Text>
//                 <Progress percent={98} size="small" />
//               </div>
//               <div className="flex justify-between items-center">
//                 <Text>Uptime</Text>
//                 <Progress percent={99.9} size="small" />
//               </div>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* System Alerts */}
//       <Alert
//         message="System Running Smoothly"
//         description="All services are operating normally. No critical issues detected."
//         type="success"
//         showIcon
//         closable
//       />
//     </div>
//   );
// };

// export default AdminDashboard;





