////////////////FINAL?/////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Avatar,
//   Button,
//   Tag,
//   Typography,
//   Descriptions,
//   Spin,
//   Upload,
//   message,
// } from "antd";
// import {
//   MailOutlined,
//   PhoneOutlined,
//   UserOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// // import {
// //   ImFacebook,
// //   // BiLogoTelegram,
// //   FaLinkedinIn,
// //   FaTwitter,
// // } from "react-icons";
// import { BiLogoTelegram } from 'react-icons/bi';
// import moment from "moment";

// const { Title, Text } = Typography;

// const BASE_URL = "http://localhost:3000/api/v1";

// const getStatusColor = (status) => {
//   switch (status?.toLowerCase()) {
//     case "active":
//       return "green";
//     case "pending":
//       return "orange";
//     case "inactive":
//       return "red";
//     default:
//       return "gray";
//   }
// };

// const Profile = () => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // ✅ Fetch admin profile
//   const fetchAdminProfile = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await axios.get(`${BASE_URL}/admin/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const profile = res.data?.profile || res.data;
//       setAdmin({
//         ...profile,
//         social: {
//           facebook: "https://facebook.com/admin",
//           twitter: "https://twitter.com/admin",
//           linkedin: "https://linkedin.com/in/admin",
//           telegram: "https://t.me/admin",
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching admin profile:", error);
//       message.error("Failed to load profile. Please log in again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle photo upload
//   const handlePhotoUpload = async (file) => {
//     if (!file || !admin?.id) return;
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("profilePhoto", file);

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `http://localhost:3000/api/v1/admin/profilephoto/${admin.id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (res.data?.imageUrl) {
//         setAdmin((prev) => ({ ...prev, profilePhoto: res.data.imageUrl }));
//         message.success("Profile photo updated successfully!");
//       }
//     } catch (error) {
//       console.error("Photo upload error:", error);
//       message.error("Failed to upload photo.");
//       console.error("Photo upload error:", error.response?.data || error.message);

//     } finally {
//       setUploading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdminProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!admin) {
//     return (
//       <div className="text-center text-gray-500 mt-3">
//         <UserOutlined style={{ fontSize: "50px", marginBottom: "16px" }} />
//         <p>No admin profile found. Please log in again.</p>
//       </div>
//     );
//   }

//   const social = admin.social || {};

//   return (
//     <div className="flex flex-col items-center font-railway my-6">
//       {/* Profile Avatar */}
//       <Avatar
//         size={110}
//         src={admin.profilePhoto}
//         icon={!admin.profilePhoto && <UserOutlined />}
//         alt={admin.fullName}
//         className="mb-3"
//       />
//       <Upload
//         showUploadList={false}
//         customRequest={({ file }) => handlePhotoUpload(file)}
//       >
//         <Button
//           type="primary"
//           icon={<UploadOutlined />}
//           loading={uploading}
//           className="mb-5"
//         >
//           Upload New Photo
//         </Button>
//       </Upload>

//       {/* Basic Info */}
//       <Title level={4} className="text-center mb-0 font-railway">
//         {admin.fullName}
//         <br />
//         <Text type="secondary">{admin.role || "Administrator"}</Text>
//       </Title>

//       {/* Details */}
//       <Descriptions
//         bordered
//         column={1}
//         size="small"
//         className="w-full text-left mt-5 font-railway"
//       >
//         <Descriptions.Item label="Email">
//           <MailOutlined className="mr-2 text-gray-500" />
//           {admin.email || "N/A"}
//         </Descriptions.Item>

//         <Descriptions.Item label="Phone">
//           <PhoneOutlined className="mr-2 text-gray-500" />
//           {admin.phone || "N/A"}
//         </Descriptions.Item>

//         <Descriptions.Item label="Department">
//           {admin.department || "N/A"}
//         </Descriptions.Item>

//         <Descriptions.Item label="Status">
//           <Tag color={getStatusColor(admin.status)}>
//             {admin.status?.toUpperCase() || "UNKNOWN"}
//           </Tag>
//         </Descriptions.Item>

//         <Descriptions.Item label="Joined On">
//           {admin.dateOfJoining
//             ? moment(admin.dateOfJoining).format("YYYY-MM-DD")
//             : "N/A"}
//         </Descriptions.Item>

//         <Descriptions.Item label="Last Login">
//           {admin.lastLogin
//             ? moment(admin.lastLogin).format("YYYY-MM-DD HH:mm")
//             : "N/A"}
//         </Descriptions.Item>
//       </Descriptions>

//       {/* Social Links */}
//       <div className="flex justify-between items-center font-railway gap-5 mt-8">
//         <h5 className="text-lg font-semibold text-gray-600">Social</h5>
//         {Object.values(social).some((link) => link) ? (
//           <div className="flex space-x-3">
//             {social.facebook && (
//               <a href={social.facebook} target="_blank" rel="noopener noreferrer">
//                 <Button icon={<ImFacebook size={15} color="#3b5998" />} />
//               </a>
//             )}
//             {social.twitter && (
//               <a href={social.twitter} target="_blank" rel="noopener noreferrer">
//                 <Button icon={<FaTwitter size={15} color="#1DA1F2" />} />
//               </a>
//             )}
//             {social.linkedin && (
//               <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
//                 <Button icon={<FaLinkedinIn size={15} color="#0077b5" />} />
//               </a>
//             )}
//             {social.telegram && (
//               <a href={social.telegram} target="_blank" rel="noopener noreferrer">
//                 <Button icon={<BiLogoTelegram size={15} color="#0088cc" />} />
//               </a>
//             )}
//           </div>
//         ) : (
//           <p className="text-gray-400 text-sm">No social links available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

// src/components/settings/Profile.jsx

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

const Profile = () => {
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

export default Profile;
