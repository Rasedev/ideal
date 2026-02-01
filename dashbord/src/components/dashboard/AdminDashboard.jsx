import React from "react";
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
  Table,
  Dropdown,
  Menu,
  Grid,
  Drawer,
  Switch,
  Empty,
  Popconfirm,
  Segmented,
  FloatButton,
  Steps,
  Slider,
  Rate,
  theme,
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
  SettingOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LineChartOutlined,
  AppstoreOutlined,
  ReloadOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  WalletOutlined,
  CreditCardOutlined,
  FileProtectOutlined,
  AuditOutlined,
  KeyOutlined,
  BarChartOutlined,
  PieChartOutlined,
  RiseOutlined,
  FallOutlined,
  PlusOutlined,
  FireOutlined,
  BarsOutlined,
  LayoutOutlined,
  ShareAltOutlined,
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
import { Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title as ChartTitle,
  Legend,
  Filler,
} from "chart.js";
import "./admin.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  ChartTitle,
  Legend,
  Filler
);

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Password } = Input;
const { useBreakpoint } = Grid;
const { useToken } = theme;
const { Step } = Steps;

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const { token } = useToken();
  const isMobile = !screens.md;

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

  const currentTheme = useSelector(
    (state) => state.theme?.currentTheme || "light"
  );

  // Local state
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [securityModalVisible, setSecurityModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [quickActionsVisible, setQuickActionsVisible] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    loadData();
    initializeMockData();
  }, [dispatch]);

  const loadData = async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(fetchUserProfile()),
      dispatch(fetchLoginHistory()),
      dispatch(fetchRecentActivity()),
    ]);
    setTimeout(() => setRefreshing(false), 500);
  };

  // Initialize mock data for charts and stats
  const initializeMockData = () => {
    setChartData({
      activity: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Activities",
            data: [12, 19, 15, 25, 22, 30, 18],
            borderColor: token.colorPrimary,
            backgroundColor: `${token.colorPrimary}20`,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      performance: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Performance",
            data: [65, 78, 82, 75, 88, 92],
            borderColor: token.colorSuccess,
            backgroundColor: `${token.colorSuccess}20`,
            fill: true,
          },
        ],
      },
      distribution: {
        labels: ["Active", "Inactive", "Pending", "Suspended"],
        datasets: [
          {
            data: [70, 15, 10, 5],
            backgroundColor: [
              token.colorSuccess,
              token.colorWarning,
              token.colorInfo,
              token.colorError,
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  };

  // Set form values when user data is available
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || user.telephone || "",
        address: user.addressDisplay || user.address || "",
        dob: user.dob ? dayjs(user.dob) : null,
        gender: user.gender || "",
        nidNumber: user.nidNumber || "",
        joinDate: user.joinDate ? dayjs(user.joinDate) : null,
        division: user.division || "",
        district: user.district || "",
        committeePosition: user.committeePosition || "",
        bio: user.bio || "",
        website: user.website || "",
      });
    }
  }, [user, form]);

  // Handle error messages
  useEffect(() => {
    if (error) {
      message.error({
        content: error,
        duration: 4,
        style: {
          marginTop: "4rem",
        },
      });
      setTimeout(() => dispatch(clearError()), 4000);
    }
  }, [error, dispatch]);

  // Handle success messages
  useEffect(() => {
    if (success) {
      message.success({
        content: success,
        duration: 3,
        style: {
          marginTop: "4rem",
        },
      });
      setTimeout(() => dispatch(clearSuccess()), 3000);
    }
  }, [success, dispatch]);

  // Handle save with validation
  const handleSave = async (values) => {
    try {
      const updatedData = {
        firstName: values.firstName?.trim(),
        lastName: values.lastName?.trim(),
        email: values.email?.trim(),
        phone: values.phone?.trim(),
        address: values.address || "",
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
        gender: values.gender,
        nidNumber: values.nidNumber?.trim(),
        joinDate: values.joinDate ? values.joinDate.format("YYYY-MM-DD") : null,
        division: values.division?.trim(),
        district: values.district?.trim(),
        committeePosition: values.committeePosition,
        bio: values.bio?.trim(),
        website: values.website?.trim(),
      };

      await dispatch(updateUserProfile(updatedData)).unwrap();
      setEditMode(false);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      message.error(error || "Failed to update profile");
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
        address: user.addressDisplay || "",
        dob: user.dob ? dayjs(user.dob) : null,
        gender: user.gender || "",
        nidNumber: user.nidNumber || "",
        joinDate: user.joinDate ? dayjs(user.joinDate) : null,
        division: user.division || "",
        district: user.district || "",
        committeePosition: user.committeePosition || "",
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
      message.success("Profile photo updated!");
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
      message.success("Password changed successfully!");
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  // Enhanced status tag with badges
  const getStatusTag = (status) => {
    const statusConfig = {
      active: {
        color: "success",
        text: "Active",
        icon: <CheckCircleOutlined />,
        variant: "success",
      },
      pending: {
        color: "warning",
        text: "Pending",
        icon: <ExclamationCircleOutlined />,
        variant: "warning",
      },
      suspended: {
        color: "error",
        text: "Suspended",
        icon: <ExclamationCircleOutlined />,
        variant: "error",
      },
      inactive: {
        color: "default",
        text: "Inactive",
        icon: <ExclamationCircleOutlined />,
        variant: "default",
      },
      approved: {
        color: "success",
        text: "Approved",
        icon: <CheckCircleOutlined />,
        variant: "success",
      },
      waiting: {
        color: "processing",
        text: "Waiting",
        icon: <ClockCircleOutlined />,
        variant: "processing",
      },
      rejected: {
        color: "error",
        text: "Rejected",
        icon: <ExclamationCircleOutlined />,
        variant: "error",
      },
    };

    const userStatus = status || user?.status || "active";
    const config = statusConfig[userStatus] || {
      color: "blue",
      text: userStatus,
      icon: <UserOutlined />,
      variant: "default",
    };

    return (
      <Badge
        status={config.variant}
        text={
          <Tag
            icon={config.icon}
            color={config.color}
            className="flex items-center gap-2 px-3 py-1 rounded-full font-medium shadow-sm"
          >
            {config.text}
          </Tag>
        }
      />
    );
  };

  // Enhanced role tag with gradient
  const getRoleTag = (role) => {
    const roleConfig = {
      admin: {
        color: "red",
        text: "Admin",
        icon: <CrownOutlined />,
        gradient: "from-red-500 to-pink-600",
      },
      hr: {
        color: "purple",
        text: "HR Manager",
        icon: <TeamOutlined />,
        gradient: "from-purple-500 to-indigo-600",
      },
      employee: {
        color: "blue",
        text: "Employee",
        icon: <UserOutlined />,
        gradient: "from-blue-500 to-cyan-600",
      },
      member: {
        color: "green",
        text: "Member",
        icon: <UserOutlined />,
        gradient: "from-green-500 to-emerald-600",
      },
      superadmin: {
        color: "volcano",
        text: "Super Admin",
        icon: <CrownOutlined />,
        gradient: "from-orange-500 to-red-600",
      },
      manager: {
        color: "gold",
        text: "Manager",
        icon: <TeamOutlined />,
        gradient: "from-yellow-500 to-amber-600",
      },
      executive: {
        color: "cyan",
        text: "Executive",
        icon: <UserOutlined />,
        gradient: "from-cyan-500 to-sky-600",
      },
      "plot-owner": {
        color: "lime",
        text: "Plot Owner",
        icon: <EnvironmentOutlined />,
        gradient: "from-lime-500 to-green-600",
      },
    };

    const userRole = role || user?.role || "member";
    const config = roleConfig[userRole?.toLowerCase()] || {
      color: "default",
      text: userRole,
      icon: <UserOutlined />,
      gradient: "from-gray-500 to-slate-600",
    };

    return (
      <Tag
        icon={config.icon}
        color={config.color}
        className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium bg-gradient-to-r ${config.gradient} text-white border-0 shadow-sm`}
      >
        {config.text}
      </Tag>
    );
  };

  // Security items
  const securityItems = [
    {
      title: "Change Password",
      description: "Update your login password",
      icon: <KeyOutlined className="text-blue-500 text-lg" />,
      action: () => setSecurityModalVisible(true),
      status: "active",
      color: "blue",
      priority: "high",
    },
    {
      title: "Two-Factor Auth",
      description: "Extra security layer",
      icon: <SecurityScanOutlined className="text-green-500 text-lg" />,
      action: () => setTwoFactorEnabled(!twoFactorEnabled),
      status: twoFactorEnabled ? "enabled" : "disabled",
      color: "green",
      priority: "high",
    },
    {
      title: "Login History",
      description: "Recent login activities",
      icon: <HistoryOutlined className="text-orange-500 text-lg" />,
      action: () => setActiveTab("security"),
      status: `${loginHistory?.length || 0} records`,
      color: "orange",
      priority: "medium",
    },
    {
      title: "Session Management",
      description: "Manage active sessions",
      icon: <AuditOutlined className="text-purple-500 text-lg" />,
      action: () => message.info("Coming soon!"),
      status: "manage",
      color: "purple",
      priority: "medium",
    },
  ];

  // Dashboard statistics
  const dashboardStats = [
    {
      title: "Total Members",
      value: "1,254",
      change: "+12%",
      icon: <TeamOutlined />,
      color: token.colorPrimary,
      trend: "up",
      description: "From last month",
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8%",
      icon: <UserOutlined />,
      color: token.colorSuccess,
      trend: "up",
      description: "Currently online",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "-5%",
      icon: <FileTextOutlined />,
      color: token.colorWarning,
      trend: "down",
      description: "Awaiting review",
    },
    {
      title: "Revenue",
      value: "$12,450",
      change: "+15%",
      icon: <WalletOutlined />,
      color: token.colorPurple,
      trend: "up",
      description: "This month",
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
          ? token.colorSuccess
          : profileCompleteness >= 70
          ? token.colorPrimary
          : token.colorWarning,
      icon: <UserOutlined />,
      progress: true,
    },
    {
      title: "Account Age",
      value: user?.createdAt ? dayjs().diff(dayjs(user.createdAt), "day") : 0,
      suffix: " days",
      color: token.colorPurple,
      icon: <CalendarOutlined />,
    },
    {
      title: "Activities",
      value: recentActivity?.length || 0,
      suffix: " this month",
      color: token.colorCyan,
      icon: <StarOutlined />,
    },
    {
      title: "Last Login",
      value: user?.lastLogin ? dayjs(user.lastLogin).fromNow() : "Never",
      color: token.colorOrange,
      icon: <ClockCircleOutlined />,
    },
  ];

  // Theme settings
  const isDark = currentTheme === "dark";
  const cardClassName = `border-0 shadow-xl rounded-2xl transition-all duration-300 ${
    isDark
      ? "bg-gray-800/90 text-white backdrop-blur-sm"
      : "bg-white/90 text-gray-900 backdrop-blur-sm"
  } hover:shadow-2xl hover:-translate-y-1`;

  const textColorClass = isDark ? "text-gray-100" : "text-gray-800";
  const textMutedClass = isDark ? "text-gray-400" : "text-gray-600";
  const borderColorClass = isDark ? "border-gray-700/50" : "border-gray-200/50";
  const bgHoverClass = isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50/80";

  // Get display image
  const displayImage =
    user?.profilePhoto || user?.image || user?.profilePicture;

  // Quick actions
  const quickActions = [
    {
      icon: <EditOutlined />,
      label: "Edit Profile",
      action: () => setEditMode(true),
      color: token.colorPrimary,
    },
    {
      icon: <QrcodeOutlined />,
      label: "QR Code",
      action: () => setQrModalVisible(true),
      color: token.colorGreen,
    },
    {
      icon: <DownloadOutlined />,
      label: "Export Data",
      action: () => message.info("Export feature coming soon!"),
      color: token.colorBlue,
    },
    {
      icon: <SettingOutlined />,
      label: "Settings",
      action: () => setActiveTab("security"),
      color: token.colorOrange,
    },
  ];

  // Loading state
  if (loading && !user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <DashboardOutlined className="text-6xl text-blue-500" />
        </motion.div>
        <Text type="secondary" className="mt-4 text-lg">
          Loading your dashboard...
        </Text>
        <Progress percent={30} status="active" className="w-64 mt-4" />
      </div>
    );
  }

  // Dashboard Tab Component
  const DashboardTab = () => {
    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <Row gutter={[16, 16]}>
          {dashboardStats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Card
                  className={`${cardClassName} border-l-4`}
                  style={{ borderLeftColor: stat.color }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className={`text-sm ${textMutedClass} font-medium mb-1`}
                      >
                        {stat.title}
                      </div>
                      <div
                        className={`text-2xl font-bold ${textColorClass} mb-1`}
                      >
                        {stat.value}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            color:
                              stat.trend === "up"
                                ? token.colorSuccess
                                : token.colorError,
                            fontSize: "12px",
                          }}
                        >
                          {stat.trend === "up" ? (
                            <RiseOutlined />
                          ) : (
                            <FallOutlined />
                          )}
                          {stat.change}
                        </span>
                        <span className={`text-xs ${textMutedClass}`}>
                          {stat.description}
                        </span>
                      </div>
                    </div>
                    <div
                      className="p-3 rounded-full"
                      style={{
                        backgroundColor: `${stat.color}20`,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Charts Row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card
              className={cardClassName}
              title={
                <div className="flex items-center justify-between">
                  <span className={textColorClass}>Activity Overview</span>
                  <Select size="small" defaultValue="week" className="w-32">
                    <Option value="week">This Week</Option>
                    <Option value="month">This Month</Option>
                    <Option value="year">This Year</Option>
                  </Select>
                </div>
              }
            >
              {chartData && (
                <div className="h-64">
                  <Line
                    data={chartData.activity}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: { color: isDark ? "#374151" : "#e5e7eb" },
                        },
                        x: {
                          grid: { color: isDark ? "#374151" : "#e5e7eb" },
                        },
                      },
                      interaction: {
                        intersect: false,
                        mode: "index",
                      },
                    }}
                  />
                </div>
              )}
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              className={cardClassName}
              title={<span className={textColorClass}>User Distribution</span>}
            >
              {chartData && (
                <div className="h-64">
                  <Doughnut
                    data={chartData.distribution}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "bottom" },
                      },
                    }}
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {/* Recent Activity & Quick Stats */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card
              className={cardClassName}
              title={<span className={textColorClass}>Recent Activity</span>}
              extra={
                <Button type="link" size="small">
                  View All
                </Button>
              }
            >
              {recentActivity && recentActivity.length > 0 ? (
                <Timeline mode="alternate">
                  {recentActivity.slice(0, 5).map((activity, index) => (
                    <Timeline.Item
                      key={index}
                      color={index === 0 ? token.colorPrimary : token.colorBlue}
                      dot={
                        index === 0 ? <FireOutlined /> : <ClockCircleOutlined />
                      }
                    >
                      <Card size="small" className={`mb-2 ${bgHoverClass}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className={`font-semibold ${textColorClass}`}>
                              {activity.action}
                            </div>
                            <div className={`text-sm ${textMutedClass}`}>
                              {activity.description}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {dayjs(activity.time).fromNow()}
                          </div>
                        </div>
                      </Card>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <Empty description="No recent activity" />
              )}
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              className={cardClassName}
              title={<span className={textColorClass}>Quick Stats</span>}
            >
              <Space direction="vertical" className="w-full">
                {profileStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Space>
                      <div style={{ color: stat.color }}>{stat.icon}</div>
                      <div>
                        <div className={`font-medium ${textColorClass}`}>
                          {stat.title}
                        </div>
                        <div className={`text-xs ${textMutedClass}`}>
                          Updated today
                        </div>
                      </div>
                    </Space>
                    <div className="text-right">
                      <div className={`font-bold ${textColorClass}`}>
                        {stat.value}
                        {stat.suffix}
                      </div>
                      {stat.progress && (
                        <Progress
                          percent={stat.value}
                          size="small"
                          strokeColor={stat.color}
                          showInfo={false}
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // Personal Tab Component
  const PersonalTab = () => {
    const EditProfileForm = () => {
      return (
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
            disabled={updating}
            size="large"
          >
            <Steps
              current={0}
              items={[
                { title: "Basic Info" },
                { title: "Contact" },
                { title: "Professional" },
                { title: "Additional" },
              ]}
              className="mb-8"
            />

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="John"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: "Last name is required" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Doe"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    disabled
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      pattern: /^[+]?[0-9\s\-()]+$/,
                      message: "Invalid phone number",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="+880 1XXX XXXXXX"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="address" label="Address">
              <TextArea
                rows={2}
                placeholder="Enter your address"
                size="large"
                className="rounded-lg"
                showCount
                maxLength={200}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item name="dob" label="Date of Birth">
                  <DatePicker
                    className="w-full rounded-lg"
                    format="YYYY-MM-DD"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="gender" label="Gender">
                  <Select
                    placeholder="Select gender"
                    size="large"
                    className="rounded-lg"
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                    <Option value="prefer-not-to-say">Prefer not to say</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="nidNumber" label="NID Number">
                  <Input
                    placeholder="Enter NID"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item name="joinDate" label="Join Date">
                  <DatePicker
                    className="w-full rounded-lg"
                    format="YYYY-MM-DD"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="division" label="Division">
                  <Input
                    placeholder="Enter division"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="district" label="District">
                  <Input
                    placeholder="Enter district"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="committeePosition" label="Committee Position">
              <Select
                placeholder="Select position"
                size="large"
                className="rounded-lg"
              >
                <Option value="President">President</Option>
                <Option value="General Secretary">General Secretary</Option>
                <Option value="Member">Member</Option>
                <Option value="Executive Member">Executive Member</Option>
              </Select>
            </Form.Item>

            <Form.Item name="bio" label="Bio">
              <TextArea
                rows={3}
                placeholder="Tell us about yourself"
                size="large"
                className="rounded-lg"
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Divider />

            <div className="flex justify-end space-x-3">
              <Button
                onClick={handleCancel}
                disabled={updating}
                size="large"
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={updating}
                icon={<SaveOutlined />}
                size="large"
                className="rounded-lg shadow-lg"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </motion.div>
      );
    };

    const ProfileView = () => {
      return (
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
              backgroundColor: currentTheme === "dark" ? "#374151" : "#fafafa",
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
                  <Text className={textColorClass}>{user.address}</Text>
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
                <Text className={textColorClass}>No address provided</Text>
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
                  ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
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
      );
    };

    return (
      <Card className={cardClassName}>
        <Row gutter={[32, 32]}>
          {/* Profile Sidebar */}
          <Col xs={24} md={8}>
            <div className="text-center space-y-6">
              {/* Profile Image */}
              <motion.div
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <Tooltip title="Change Profile Photo">
                  <Upload
                    showUploadList={false}
                    beforeUpload={handleImageUpload}
                    disabled={uploading}
                  >
                    <Badge
                      count={
                        <CameraOutlined className="text-white bg-blue-500 p-2 rounded-full shadow-lg" />
                      }
                      offset={[-10, 100]}
                    >
                      <Avatar
                        size={140}
                        src={displayImage}
                        icon={<UserOutlined />}
                        className="border-4 border-white shadow-2xl cursor-pointer"
                      />
                    </Badge>
                  </Upload>
                </Tooltip>
              </motion.div>

              {/* User Info */}
              <div>
                <Title level={3} className={`!mb-2 ${textColorClass}`}>
                  {user?.firstName} {user?.lastName}
                </Title>
                <Text className={`${textMutedClass} block`}>{user?.email}</Text>
                <Text className={`${textMutedClass} text-sm block mt-1`}>
                  {user?.phone || "No phone number"}
                </Text>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {getRoleTag()}
                  {getStatusTag()}
                </div>
              </div>

              {/* Stats Card */}
              <Card
                className={`${
                  isDark ? "bg-gray-700/50" : "bg-gray-50/80"
                } backdrop-blur-sm`}
              >
                <Space direction="vertical" className="w-full">
                  {[
                    {
                      label: "Member Since",
                      value: user?.joinDate
                        ? dayjs(user.joinDate).format("MMM YYYY")
                        : "N/A",
                    },
                    {
                      label: "Last Login",
                      value: user?.lastLogin
                        ? dayjs(user.lastLogin).fromNow()
                        : "Never",
                    },
                    { label: "Profile Views", value: "1,234" },
                    { label: "Completed Tasks", value: "89%" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <Text className={textMutedClass}>{item.label}</Text>
                      <Text strong className={textColorClass}>
                        {item.value}
                      </Text>
                    </div>
                  ))}
                </Space>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="default"
                      icon={action.icon}
                      block
                      onClick={action.action}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="hidden sm:inline">{action.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col xs={24} md={16}>
            <AnimatePresence mode="wait">
              {editMode ? <EditProfileForm /> : <ProfileView />}
            </AnimatePresence>
          </Col>
        </Row>
      </Card>
    );
  };

  // Security Tab Component
  const SecurityTab = () => {
    return (
      <Card className={cardClassName}>
        <Title level={3} className={`${textColorClass} mb-6`}>
          Security & Privacy
        </Title>

        {/* Security Cards Grid */}
        <Row gutter={[16, 16]} className="mb-8">
          {securityItems.map((item, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Card
                  className={`cursor-pointer transition-all ${bgHoverClass} border h-full rounded-xl`}
                  onClick={item.action}
                  hoverable
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div
                        className="p-3 rounded-lg mr-3"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className={`font-semibold ${textColorClass}`}>
                          {item.title}
                        </div>
                        <div className={`text-xs ${textMutedClass}`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center">
                        <Tag
                          color={
                            item.priority === "high"
                              ? "red"
                              : item.priority === "medium"
                              ? "orange"
                              : "blue"
                          }
                          className="text-xs"
                        >
                          {item.priority} priority
                        </Tag>
                        <Badge
                          status={
                            item.status === "enabled" ||
                            item.status === "active"
                              ? "success"
                              : "default"
                          }
                          text={
                            <span
                              className={`text-xs ${
                                item.status === "enabled" ||
                                item.status === "active"
                                  ? "text-green-600"
                                  : textMutedClass
                              }`}
                            >
                              {item.status}
                            </span>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Two-Factor Authentication */}
        <Card
          className={`mb-6 rounded-xl ${
            isDark ? "bg-gray-700/50" : "bg-blue-50/50"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <Title level={4} className={textColorClass}>
                Two-Factor Authentication
              </Title>
              <Text className={textMutedClass}>
                Add an extra layer of security to your account. When enabled,
                you'll need to enter both your password and a verification code.
              </Text>
              <div className="mt-3">
                <Tag
                  icon={<InfoCircleOutlined />}
                  color="blue"
                  className="mr-2"
                >
                  Recommended
                </Tag>
                <Tag icon={<SafetyCertificateOutlined />} color="green">
                  Secure
                </Tag>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={twoFactorEnabled}
                onChange={setTwoFactorEnabled}
                checkedChildren="ON"
                unCheckedChildren="OFF"
                size="large"
              />
              <Button
                type="link"
                onClick={() => message.info("2FA Setup Guide")}
              >
                Setup Guide
              </Button>
            </div>
          </div>
        </Card>

        {/* Login History */}
        <Card
          title={
            <div className="flex items-center justify-between">
              <span className={textColorClass}>Recent Login History</span>
              <Button
                type="link"
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => message.info("Exporting login history...")}
              >
                Export
              </Button>
            </div>
          }
          className="mb-6"
        >
          {loginHistory && loginHistory.length > 0 ? (
            <Table
              dataSource={loginHistory}
              columns={[
                {
                  title: "Device & Location",
                  dataIndex: "device",
                  key: "device",
                  render: (text, record) => (
                    <div className="flex items-center gap-3">
                      <Avatar size="small" icon={<TabletOutlined />} />
                      <div>
                        <div className={`font-medium ${textColorClass}`}>
                          {text}
                        </div>
                        <div className={`text-xs ${textMutedClass}`}>
                          <GlobalOutlined className="mr-1" />
                          {record.location || "Unknown"}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "IP Address",
                  dataIndex: "ip",
                  key: "ip",
                  render: (text) => (
                    <Tag color="blue" className="font-mono">
                      {text}
                    </Tag>
                  ),
                },
                {
                  title: "Time",
                  dataIndex: "time",
                  key: "time",
                  render: (text) => (
                    <Tooltip title={dayjs(text).format("DD MMM YYYY HH:mm:ss")}>
                      <div className="flex items-center gap-2">
                        <ClockCircleOutlined />
                        <Text className={textMutedClass}>
                          {dayjs(text).fromNow()}
                        </Text>
                      </div>
                    </Tooltip>
                  ),
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  render: (text) => (
                    <Badge
                      status={text === "success" ? "success" : "error"}
                      text={
                        <Text
                          className={
                            text === "success"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {text.charAt(0).toUpperCase() + text.slice(1)}
                        </Text>
                      }
                    />
                  ),
                },
              ]}
              pagination={{ pageSize: 5 }}
              size="middle"
              scroll={{ x: true }}
              rowClassName={() => "hover:bg-gray-50 dark:hover:bg-gray-700"}
            />
          ) : (
            <Empty description="No login history available" />
          )}
        </Card>
      </Card>
    );
  };

  // Analytics Tab Component
  const AnalyticsTab = () => {
    return (
      <Card className={cardClassName}>
        <Title level={3} className={`${textColorClass} mb-6`}>
          Analytics Dashboard
        </Title>

        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} lg={12}>
            <Card title="Performance Trends">
              {chartData && (
                <div className="h-64">
                  <Line
                    data={chartData.performance}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                      },
                    }}
                  />
                </div>
              )}
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Activity Distribution">
              {chartData && (
                <div className="h-64">
                  <Pie
                    data={chartData.distribution}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "right" },
                      },
                    }}
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>

        <Card title="Detailed Statistics">
          <Row gutter={[16, 16]}>
            {profileStats.map((stat, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card size="small" className={bgHoverClass}>
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div className={`text-sm ${textMutedClass}`}>
                        {stat.title}
                      </div>
                      <div className={`text-xl font-bold ${textColorClass}`}>
                        {stat.value}
                        {stat.suffix}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Card>
    );
  };

  // Settings Tab Component
  const SettingsTab = () => {
    return (
      <Card className={cardClassName}>
        <Title level={3} className={`${textColorClass} mb-6`}>
          Settings
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Appearance">
              <Space direction="vertical" className="w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <div className={`font-medium ${textColorClass}`}>
                      Dark Mode
                    </div>
                    <div className={`text-xs ${textMutedClass}`}>
                      Switch between light and dark themes
                    </div>
                  </div>
                  <Switch
                    checked={isDark}
                    onChange={() => {
                      /* Theme toggle handled in RootLayout */
                    }}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                  />
                </div>

                <Divider />

                <div className="flex justify-between items-center">
                  <div>
                    <div className={`font-medium ${textColorClass}`}>
                      Notifications
                    </div>
                    <div className={`text-xs ${textMutedClass}`}>
                      Receive system notifications
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Preferences">
              <Space direction="vertical" className="w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <div className={`font-medium ${textColorClass}`}>
                      View Mode
                    </div>
                    <div className={`text-xs ${textMutedClass}`}>
                      Choose your preferred layout
                    </div>
                  </div>
                  <Segmented
                    options={[
                      {
                        label: "Grid",
                        value: "grid",
                        icon: <AppstoreOutlined />,
                      },
                      { label: "List", value: "list", icon: <BarsOutlined /> },
                      {
                        label: "Compact",
                        value: "compact",
                        icon: <LayoutOutlined />,
                      },
                    ]}
                    value={"grid"}
                    onChange={() => {}}
                  />
                </div>

                <Divider />

                <div className="flex justify-between items-center">
                  <div>
                    <div className={`font-medium ${textColorClass}`}>
                      Quick Actions
                    </div>
                    <div className={`text-xs ${textMutedClass}`}>
                      Show quick action buttons
                    </div>
                  </div>
                  <Switch
                    checked={quickActionsVisible}
                    onChange={setQuickActionsVisible}
                  />
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
    );
  };

  // Enhanced tabs with icons and animations
  const tabItems = [
    {
      key: "overview",
      label: (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <DashboardOutlined className="text-lg" />
          <span className="hidden md:inline">Dashboard</span>
        </motion.div>
      ),
      children: <DashboardTab />,
    },
    {
      key: "personal",
      label: (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <UserOutlined className="text-lg" />
          <span className="hidden md:inline">Profile</span>
        </motion.div>
      ),
      children: <PersonalTab />,
    },
    {
      key: "security",
      label: (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <SecurityScanOutlined className="text-lg" />
          <span className="hidden md:inline">Security</span>
        </motion.div>
      ),
      children: <SecurityTab />,
    },
    {
      key: "analytics",
      label: (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <BarChartOutlined className="text-lg" />
          <span className="hidden md:inline">Analytics</span>
        </motion.div>
      ),
      children: <AnalyticsTab />,
    },
    {
      key: "settings",
      label: (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <SettingOutlined className="text-lg" />
          <span className="hidden md:inline">Settings</span>
        </motion.div>
      ),
      children: <SettingsTab />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-full p-2"
    >
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        {/* <Card className={`${cardClassName} bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden`}> */}
        {/* <Card className={`${cardClassName} bg-gradient-to-r from-gray-800 via-gray-900 to-black overflow-hidden`}>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
          
          <Row align="middle" justify="space-between" className="relative">
            <Col xs={24} md={16}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Title level={2} className="!mb-3 !text-white">
                  Welcome back, {user?.firstName}! 👋
                </Title>
                <Paragraph className="text-blue-100 text-lg mb-4">
                  {user?.role === 'admin' ? 'Administrator Dashboard' : 'User Profile'}
                  <br />
                  <Text className="text-sm opacity-80">
                    Last login: {user?.lastLogin ? dayjs(user.lastLogin).fromNow() : 'Never'}
                  </Text>
                </Paragraph>
                <Space wrap>
                  <Tag color="white" className="text-blue-600 font-semibold px-3 py-1">
                    ID: {user?.membershipId || 'N/A'}
                  </Tag>
                  <Tag color="white" className="text-purple-600 font-semibold px-3 py-1">
                    {user?.committeePosition || 'Member'}
                  </Tag>
                  <Tag color="white" className="text-pink-600 font-semibold px-3 py-1">
                    {user?.division || 'No Division'}
                  </Tag>
                </Space>
              </motion.div>
            </Col>
            <Col xs={24} md={8} className="text-center md:text-right mt-6 md:mt-0">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Avatar 
                  size={100} 
                  src={displayImage} 
                  className="border-4 border-white shadow-2xl"
                />
                <div className="mt-4">
                  <Rate disabled defaultValue={4.5} allowHalf />
                </div>
              </motion.div>
            </Col>
          </Row>
        </Card> */}
      </motion.div>

      {/* Profile Completeness Alert */}
      {profileCompleteness < 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
          className="mb-6"
        >
          <Alert
            message="Complete Your Profile"
            description={
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Progress
                    percent={profileCompleteness}
                    size="small"
                    strokeColor={
                      profileCompleteness === 100
                        ? token.colorSuccess
                        : token.colorPrimary
                    }
                    strokeWidth={6}
                    showInfo={false}
                    className="max-w-md"
                  />
                  <Text className={`${textMutedClass} text-sm mt-1`}>
                    Your profile is {profileCompleteness}% complete. Complete
                    all fields to unlock full features.
                  </Text>
                </div>
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => setEditMode(true)}
                    className="rounded-full"
                  >
                    Complete Now
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => setQuickActionsVisible(!quickActionsVisible)}
                  >
                    {quickActionsVisible ? "Hide Tips" : "Show Tips"}
                  </Button>
                </Space>
              </div>
            }
            type="warning"
            showIcon
            icon={<InfoCircleOutlined />}
            className={`${cardClassName} rounded-xl`}
            closable
            onClose={() => {}}
          />
        </motion.div>
      )}

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-8">
        {profileStats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                y: -4,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Card className={`${cardClassName} h-full`}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="p-3 rounded-xl shadow-lg"
                      style={{
                        backgroundColor: `${stat.color}20`,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </div>
                    {stat.progress && (
                      <Progress
                        percent={stat.value}
                        size="small"
                        strokeColor={stat.color}
                        showInfo={false}
                        style={{ width: 60 }}
                      />
                    )}
                  </div>

                  <div className="flex-grow">
                    <Statistic
                      value={stat.value}
                      suffix={stat.suffix}
                      valueStyle={{
                        color: stat.color,
                        fontSize: "24px",
                        fontWeight: 700,
                      }}
                    />
                    <div className={`text-sm ${textMutedClass} mt-2`}>
                      {stat.title}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Main Tabs */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type={isMobile ? "line" : "card"}
          size="large"
          items={tabItems}
          className="rounded-xl"
          tabBarStyle={{
            marginBottom: 24,
            backgroundColor: isDark ? token.colorBgContainer : "#ffffff",
            padding: "8px 8px 0 8px",
            borderRadius: "12px 12px 0 0",
          }}
          tabBarExtraContent={
            !isMobile && (
              <Space>
                <Tooltip title="Refresh">
                  <Button
                    icon={<ReloadOutlined spin={refreshing} />}
                    onClick={loadData}
                    loading={refreshing}
                    shape="circle"
                  />
                </Tooltip>
              </Space>
            )
          }
        />
      </motion.div>

      {/* Quick Actions Menu */}
      {quickActionsVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 z-40"
        >
          {/* <Card className={`${cardClassName} w-64 shadow-2xl`}>
            <div className="text-center mb-4">
              <Title level={5} className={textColorClass}>Quick Actions</Title>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="default"
                    icon={action.icon}
                    onClick={action.action}
                    className="w-full h-12 flex items-center justify-center"
                    style={{ borderColor: action.color }}
                  >
                    <span className="text-xs">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card> */}
        </motion.div>
      )}

      {/* Floating Actions */}
      <FloatButton.Group
        shape="circle"
        style={{ right: 24, bottom: 24 }}
        trigger="hover"
        icon={<PlusOutlined />}
      >
        <FloatButton
          icon={<QrcodeOutlined />}
          tooltip="QR Code"
          onClick={() => setQrModalVisible(true)}
        />
        <FloatButton
          icon={<EditOutlined />}
          tooltip="Edit Profile"
          onClick={() => setEditMode(true)}
        />
        <FloatButton
          icon={<SettingOutlined />}
          tooltip="Settings"
          onClick={() => setActiveTab("security")}
        />
        <FloatButton.BackTop visibilityHeight={100} />
      </FloatButton.Group>

      {/* Change Password Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <KeyOutlined className="text-blue-500 text-xl" />
            <span>Change Password</span>
          </div>
        }
        open={securityModalVisible}
        onCancel={() => setSecurityModalVisible(false)}
        footer={null}
        centered
        width={500}
        className="rounded-2xl"
        styles={{
          header: {
            borderBottom: `1px solid ${borderColorClass}`,
            padding: "24px",
          },
          body: { padding: "24px" },
        }}
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
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 8, message: "Minimum 8 characters" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Include uppercase, lowercase & number",
              },
            ]}
          >
            <Password
              placeholder="Enter new password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm password" },
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
              className="rounded-lg h-12"
            />
          </Form.Item>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => setSecurityModalVisible(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={changingPassword}
              className="rounded-lg shadow-lg"
            >
              Update Password
            </Button>
          </div>
        </Form>
      </Modal>

      {/* QR Code Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <QrcodeOutlined className="text-purple-500 text-xl" />
            <span>Profile QR Code</span>
          </div>
        }
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        footer={[
          <Button
            key="download"
            icon={<DownloadOutlined />}
            type="primary"
            className="rounded-lg"
          >
            Download QR
          </Button>,
          <Button
            key="close"
            onClick={() => setQrModalVisible(false)}
            className="rounded-lg"
          >
            Close
          </Button>,
        ]}
        centered
        width={400}
        className="rounded-2xl"
      >
        <div className="text-center space-y-6 py-4">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <QRCode
              value={`${window.location.origin}/profile/${
                user?.membershipId || user?.id
              }`}
              size={220}
              iconSize={40}
              icon={displayImage}
              errorLevel="H"
              className="shadow-2xl rounded-2xl p-4 bg-white"
            />
          </motion.div>

          <div className="space-y-3">
            <div>
              <Text strong className={`${textColorClass} text-xl`}>
                {user?.firstName} {user?.lastName}
              </Text>
              <br />
              <Text className={textMutedClass}>{user?.email}</Text>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {getRoleTag()}
              {getStatusTag()}
              {user?.membershipId && (
                <Tag color="green" className="px-3 py-1">
                  ID: {user.membershipId}
                </Tag>
              )}
            </div>

            <div
              className={`text-xs ${textMutedClass} pt-4 border-t ${borderColorClass}`}
            >
              Scan this QR code to view the profile
              <br />
              <Text type="secondary">
                Generated: {dayjs().format("DD MMM YYYY HH:mm")}
              </Text>
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default AdminDashboard;

//////////////////////FINAL1//////////////////////

// import { useState, useEffect } from "react";
// import {
//   Card,
//   Form,
//   Input,
//   Button,
//   Upload,
//   Avatar,
//   message,
//   Divider,
//   Row,
//   Col,
//   Typography,
//   Tag,
//   Select,
//   DatePicker,
//   Tabs,
//   Descriptions,
//   Space,
//   Spin,
//   Modal,
//   Progress,
//   List,
//   Badge,
//   Tooltip,
//   Alert,
//   Statistic,
//   Timeline,
//   QRCode,
// } from "antd";
// import {
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined,
//   CameraOutlined,
//   SaveOutlined,
//   EditOutlined,
//   LockOutlined,
//   TeamOutlined,
//   CalendarOutlined,
//   IdcardOutlined,
//   SafetyCertificateOutlined,
//   EyeOutlined,
//   EyeInvisibleOutlined,
//   QrcodeOutlined,
//   HistoryOutlined,
//   SecurityScanOutlined,
//   DownloadOutlined,
//   CheckCircleOutlined,
//   ExclamationCircleOutlined,
//   TabletOutlined,
//   CrownOutlined,
//   TrophyOutlined,
//   StarOutlined,
// } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUserProfile,
//   updateUserProfile,
//   uploadProfilePhoto,
//   changePassword,
//   fetchLoginHistory,
//   fetchRecentActivity,
//   clearError,
//   clearSuccess,
//   selectUser,
//   selectLoginHistory,
//   selectRecentActivity,
//   selectProfileLoading,
//   selectProfileUpdating,
//   selectProfileUploading,
//   selectChangingPassword,
//   selectProfileError,
//   selectProfileSuccess,
//   selectProfileCompleteness,
// } from "../slices/profileSlice";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { motion, AnimatePresence } from "framer-motion";

// dayjs.extend(relativeTime);

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { Password } = Input;

// const AdminDashboard = () => {
//   const dispatch = useDispatch();

//   // Redux state selectors
//   const user = useSelector(selectUser);
//   const loginHistory = useSelector(selectLoginHistory);
//   const recentActivity = useSelector(selectRecentActivity);
//   const loading = useSelector(selectProfileLoading);
//   const updating = useSelector(selectProfileUpdating);
//   const uploading = useSelector(selectProfileUploading);
//   const changingPassword = useSelector(selectChangingPassword);
//   const error = useSelector(selectProfileError);
//   const success = useSelector(selectProfileSuccess);
//   const profileCompleteness = useSelector(selectProfileCompleteness);

//   // const users = useSelector((state) => state.auth.users);

//   const currentTheme = useSelector(
//     (state) => state.theme?.currentTheme || "light"
//   );

//   // Local state
//   const [form] = Form.useForm();
//   const [passwordForm] = Form.useForm();
//   const [editMode, setEditMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("personal");
//   const [securityModalVisible, setSecurityModalVisible] = useState(false);
//   const [qrModalVisible, setQrModalVisible] = useState(false);
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

//   // Fetch data on component mount
//   useEffect(() => {
//     dispatch(fetchUserProfile());
//     dispatch(fetchLoginHistory());
//     dispatch(fetchRecentActivity());
//   }, [dispatch]);

//   // Set form values when user data is available
//   useEffect(() => {
//     if (user) {
//       form.setFieldsValue({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || user.telephone || "",
//         address: user.address || user.addressOne || "",
//         dob: user.dob ? dayjs(user.dob) : null,
//         gender: user.gender || "",
//         nidNumber: user.nidNumber || "",
//       });
//     }
//   }, [user, form]);

//   // Handle error messages
//   useEffect(() => {
//     if (error) {
//       message.error(error);
//       setTimeout(() => dispatch(clearError()), 3000);
//     }
//   }, [error, dispatch]);

//   // Handle success messages
//   useEffect(() => {
//     if (success) {
//       message.success(success);
//       setTimeout(() => dispatch(clearSuccess()), 3000);
//     }
//   }, [success, dispatch]);

//   // Add this function before handleSave
//   const validateFormData = (data) => {
//     const errors = [];

//     // Name validation
//     if (!data.firstName || data.firstName.trim().length < 2) {
//       errors.push("First name must be at least 2 characters");
//     }

//     if (!data.lastName || data.lastName.trim().length < 2) {
//       errors.push("Last name must be at least 2 characters");
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!data.email || !emailRegex.test(data.email)) {
//       errors.push("Please enter a valid email address");
//     }

//     // Phone validation (optional, but validate if provided)
//     if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
//       errors.push("Phone number contains invalid characters");
//     }

//     // NID validation (if provided)
//     if (data.nidNumber && data.nidNumber.length < 5) {
//       errors.push("NID number seems too short");
//     }

//     return errors;
//   };

//   // Update handleSave to include validation
//   const handleSave = async (values) => {
//     try {
//       // Transform values
//       const updatedData = {
//         firstName: values.firstName?.trim(),
//         lastName: values.lastName?.trim(),
//         email: values.email?.trim(),
//         phone: values.phone?.trim(),
//         address: values.address || "",
//         dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
//         gender: values.gender,
//         nidNumber: values.nidNumber?.trim(),
//       };

//       // Validate before sending
//       const validationErrors = validateFormData(updatedData);
//       if (validationErrors.length > 0) {
//         message.error(validationErrors.join(", "));
//         return;
//       }

//       await dispatch(updateUserProfile(updatedData)).unwrap();
//       setEditMode(false);
//       message.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Update failed:", error);

//       // Enhanced error handling
//       if (typeof error === "string") {
//         if (error.toLowerCase().includes("validation")) {
//           message.error("Validation error: " + error);
//         } else if (error.includes("400")) {
//           message.error("Invalid data format. Please check your inputs.");
//         } else {
//           message.error(error);
//         }
//       } else {
//         message.error("Failed to update profile. Please try again.");
//       }
//     }
//   };

//   // Handle profile save
//   // Replace the handleSave function with this
//   // const handleSave = async (values) => {
//   //   try {
//   //     console.log('Form values:', values); // Debug log

//   //     // Transform form values to match backend expectations
//   //     const updatedData = {
//   //       firstName: values.firstName?.trim(),
//   //       lastName: values.lastName?.trim(),
//   //       email: values.email?.trim(),
//   //       phone: values.phone?.trim(),
//   //       // Handle address properly - ensure it's a string
//   //       address: values.address || '',
//   //       // Handle dob - convert from dayjs to string
//   //       dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
//   //       gender: values.gender,
//   //       nidNumber: values.nidNumber?.trim(),
//   //     };

//   //     // Remove undefined or null fields
//   //     Object.keys(updatedData).forEach(key => {
//   //       if (updatedData[key] === undefined || updatedData[key] === null) {
//   //         delete updatedData[key];
//   //       }
//   //     });

//   //     console.log('Sending to API:', updatedData); // Debug log

//   //     await dispatch(updateUserProfile(updatedData)).unwrap();
//   //     setEditMode(false);

//   //     // Show success message
//   //     message.success('Profile updated successfully!');
//   //   } catch (error) {
//   //     console.error('Failed to update profile:', error);

//   //     // Handle validation errors
//   //     if (error.includes('Validation failed') || error.includes('validation')) {
//   //       message.error('Please check your input. Some fields may have invalid data.');
//   //     } else {
//   //       message.error(error || 'Failed to update profile');
//   //     }
//   //   }
//   // };

//   // Also update the form initialization to handle address properly
//   useEffect(() => {
//     if (user) {
//       console.log("User data for form:", user); // Debug log

//       // Handle address display in form
//       let addressValue = "";
//       if (user.address) {
//         if (typeof user.address === "string") {
//           addressValue = user.address;
//         } else if (typeof user.address === "object") {
//           // Extract address from object
//           addressValue = [
//             user.address.street,
//             user.address.city,
//             user.address.state,
//             user.address.country,
//             user.address.postalCode,
//           ]
//             .filter((part) => part && part.trim() !== "")
//             .join(", ");
//         }
//       }

//       form.setFieldsValue({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || user.telephone || "",
//         address: addressValue,
//         dob: user.dob ? dayjs(user.dob, "YYYY-MM-DD") : null,
//         gender: user.gender || "",
//         nidNumber: user.nidNumber || "",
//       });
//     }
//   }, [user, form]);

//   // Handle cancel edit
//   const handleCancel = () => {
//     form.resetFields();
//     setEditMode(false);
//     if (user) {
//       form.setFieldsValue({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || user.telephone || "",
//         address: user.address || user.addressOne || "",
//         dob: user.dob ? dayjs(user.dob) : null,
//         gender: user.gender || "",
//         nidNumber: user.nidNumber || "",
//       });
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = async (file) => {
//     const isImage = file.type.startsWith("image/");
//     if (!isImage) {
//       message.error("You can only upload image files!");
//       return false;
//     }

//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error("Image must be smaller than 2MB!");
//       return false;
//     }

//     try {
//       await dispatch(uploadProfilePhoto(file)).unwrap();
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }

//     return false;
//   };

//   // Handle password change
//   const handlePasswordChange = async (values) => {
//     try {
//       await dispatch(changePassword(values)).unwrap();
//       setSecurityModalVisible(false);
//       passwordForm.resetFields();
//     } catch (error) {
//       console.error("Failed to change password:", error);
//     }
//   };

//   // Get status tag
//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: { color: "green", text: "Active", icon: <CheckCircleOutlined /> },
//       pending: {
//         color: "orange",
//         text: "Pending",
//         icon: <ExclamationCircleOutlined />,
//       },
//       suspended: {
//         color: "red",
//         text: "Suspended",
//         icon: <ExclamationCircleOutlined />,
//       },
//       inactive: {
//         color: "gray",
//         text: "Inactive",
//         icon: <ExclamationCircleOutlined />,
//       },
//       approved: {
//         color: "green",
//         text: "Approved",
//         icon: <CheckCircleOutlined />,
//       },
//       waiting: {
//         color: "orange",
//         text: "Waiting Approval",
//         icon: <ExclamationCircleOutlined />,
//       },
//       rejected: {
//         color: "red",
//         text: "Rejected",
//         icon: <ExclamationCircleOutlined />,
//       },
//     };

//     const userStatus = status || user?.status || "active";
//     const config = statusConfig[userStatus] || {
//       color: "blue",
//       text: userStatus,
//       icon: <UserOutlined />,
//     };

//     return (
//       <Tag
//         color={config.color}
//         icon={config.icon}
//         className="flex items-center gap-1"
//       >
//         {config.text}
//       </Tag>
//     );
//   };

//   // Get role tag
//   const getRoleTag = (role) => {
//     const roleConfig = {
//       admin: { color: "red", text: "Administrator", icon: <CrownOutlined /> },
//       hr: { color: "purple", text: "HR Manager", icon: <TeamOutlined /> },
//       employee: { color: "blue", text: "Employee", icon: <UserOutlined /> },
//       member: { color: "green", text: "Member", icon: <UserOutlined /> },
//       "plot-owner": {
//         color: "gold",
//         text: "Plot Owner",
//         icon: <EnvironmentOutlined />,
//       },
//       president: {
//         color: "volcano",
//         text: "President",
//         icon: <CrownOutlined />,
//       },
//       "general-secretary": {
//         color: "cyan",
//         text: "General Secretary",
//         icon: <UserOutlined />,
//       },
//       "finance-secretary": {
//         color: "orange",
//         text: "Finance Secretary",
//         icon: <UserOutlined />,
//       },
//     };

//     const userRole = role || user?.role || "member";
//     const config = roleConfig[userRole?.toLowerCase()] || {
//       color: "default",
//       text: userRole,
//       icon: <UserOutlined />,
//     };

//     return (
//       <Tag
//         color={config.color}
//         icon={config.icon}
//         className="flex items-center gap-1"
//       >
//         {config.text}
//       </Tag>
//     );
//   };

//   // Security items configuration
//   const securityItems = [
//     {
//       title: "Change Password",
//       description: "Update your login password regularly",
//       icon: <LockOutlined className="text-blue-500" />,
//       action: () => setSecurityModalVisible(true),
//       status: "active",
//     },
//     {
//       title: "Two-Factor Authentication",
//       description: "Add an extra layer of security",
//       icon: <SecurityScanOutlined className="text-green-500" />,
//       action: () => setTwoFactorEnabled(!twoFactorEnabled),
//       status: twoFactorEnabled ? "enabled" : "disabled",
//     },
//     {
//       title: "Login History",
//       description: "Review recent login activities",
//       icon: <HistoryOutlined className="text-orange-500" />,
//       action: () => setActiveTab("security"),
//       status: `${loginHistory?.length || 0} records`,
//     },
//     {
//       title: "QR Profile",
//       description: "Share your profile via QR code",
//       icon: <QrcodeOutlined className="text-purple-500" />,
//       action: () => setQrModalVisible(true),
//       status: "available",
//     },
//   ];

//   // Profile stats
//   const profileStats = [
//     {
//       title: "Profile Complete",
//       value: profileCompleteness || 0,
//       suffix: "%",
//       color:
//         profileCompleteness === 100
//           ? "#52c41a"
//           : profileCompleteness >= 70
//           ? "#1890ff"
//           : "#faad14",
//       icon: <UserOutlined />,
//     },
//     {
//       title: "Account Age",
//       value: user?.dateJoined ? dayjs().diff(dayjs(user.dateJoined), "day") : 0,
//       suffix: " days",
//       color: "#722ed1",
//       icon: <CalendarOutlined />,
//     },
//     {
//       title: "Login Streak",
//       value: 15,
//       suffix: " days",
//       color: "#fa541c",
//       icon: <TrophyOutlined />,
//     },
//     {
//       title: "Activities",
//       value: recentActivity?.length || 0,
//       suffix: " this month",
//       color: "#13c2c2",
//       icon: <StarOutlined />,
//     },
//   ];

//   // Loading state
//   if (loading && !user) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <Spin size="large" />
//         <Text type="secondary" className="ml-4">
//           Loading profile...
//         </Text>
//       </div>
//     );
//   }

//   // {users?.role === "admin" && (
//   //   <Alert message="You are viewing your admin profile" type="info" showIcon />
//   // )}

//   // Theme classes
//   const cardClassName = `border-0 shadow-lg ${
//     currentTheme === "dark"
//       ? "bg-gray-800 text-white"
//       : "bg-white text-gray-900"
//   }`;

//   const textColorClass =
//     currentTheme === "dark" ? "text-gray-200" : "text-gray-800";
//   const textMutedClass =
//     currentTheme === "dark" ? "text-gray-400" : "text-gray-600";

//   // Get display image
//   const displayImage =
//     user?.profilePhoto || user?.image || user?.profilePicture;

//   // Tabs configuration
//   const tabItems = [
//     //     {
//     //       key: "personal",
//     //       label: (
//     //         <Space>
//     //           <UserOutlined />
//     //           Personal Info
//     //         </Space>
//     //       ),
//     //       children: (
//     //         <Card className={cardClassName}>
//     //           <Row gutter={[32, 32]}>
//     //             <Col xs={24} md={8}>
//     //               <div className="text-center space-y-6">
//     //                 <div className="relative inline-block">
//     //                   <Badge
//     //                     count={
//     //                       <Tooltip title="Change Photo">
//     //                         <motion.div whileHover={{ scale: 1.1 }}>
//     //                           <Upload
//     //                             name="avatar"
//     //                             listType="picture-circle"
//     //                             className="avatar-uploader"
//     //                             showUploadList={false}
//     //                             beforeUpload={handleImageUpload}
//     //                             disabled={uploading}
//     //                           >
//     //                             <Button
//     //                               type="primary"
//     //                               shape="circle"
//     //                               size="small"
//     //                               icon={<CameraOutlined />}
//     //                               className="absolute bottom-0 right-0 shadow-lg"
//     //                             />
//     //                           </Upload>
//     //                         </motion.div>
//     //                       </Tooltip>
//     //                     }
//     //                     offset={[-10, 100]}
//     //                   >
//     //                     <Avatar
//     //                       size={120}
//     //                       src={displayImage}
//     //                       icon={<UserOutlined />}
//     //                       className="border-4 border-white shadow-xl"
//     //                     />
//     //                   </Badge>
//     //                 </div>

//     //                 <div>
//     //                   <Title level={3} className={`!mb-2 ${textColorClass}`}>
//     //                     {user?.firstName} {user?.lastName}
//     //                   </Title>
//     //                   <Text className={textMutedClass}>{user?.email}</Text>
//     //                   <div className="mt-3 space-y-2">
//     //                     {getRoleTag()}
//     //                     {getStatusTag()}
//     //                   </div>
//     //                 </div>

//     //                 <div
//     //                   className={`space-y-3 p-4 rounded-lg ${
//     //                     currentTheme === "dark" ? "bg-gray-700" : "bg-gray-50"
//     //                   }`}
//     //                 >
//     //                   <div className="flex justify-between items-center">
//     //                     <Text className={textMutedClass}>Member Since</Text>
//     //                     <Text strong className={textColorClass}>
//     //                       {user?.dateJoined
//     //                         ? dayjs(user.dateJoined).format("MMM YYYY")
//     //                         : "N/A"}
//     //                     </Text>
//     //                   </div>
//     //                   <div className="flex justify-between items-center">
//     //                     <Text className={textMutedClass}>Last Login</Text>
//     //                     <Text strong className={textColorClass}>
//     //                       {user?.lastLogin
//     //                         ? dayjs(user.lastLogin).fromNow()
//     //                         : "Never"}
//     //                     </Text>
//     //                   </div>
//     //                   <div className="flex justify-between items-center">
//     //                     <Text className={textMutedClass}>Profile Views</Text>
//     //                     <Text strong className={textColorClass}>
//     //                       1,234
//     //                     </Text>
//     //                   </div>
//     //                 </div>
//     //               </div>
//     //             </Col>

//     //             <Col xs={24} md={16}>
//     //               <AnimatePresence mode="wait">
//     //                 {editMode ? (
//     //                   <motion.div
//     //                     key="edit-form"
//     //                     initial={{ opacity: 0, x: 20 }}
//     //                     animate={{ opacity: 1, x: 0 }}
//     //                     exit={{ opacity: 0, x: -20 }}
//     //                   >
//     //                     <Form
//     //                       form={form}
//     //                       layout="vertical"
//     //                       onFinish={handleSave}
//     //                       disabled={loading}
//     //                       size="large"
//     //                     >
//     //                       <Row gutter={16}>
//     //                         <Col xs={24} md={12}>
//     //                           <Form.Item
//     //                             name="firstName"
//     //                             label="First Name"
//     //                             rules={[
//     //                               {
//     //                                 required: true,
//     //                                 message: "Please enter your first name",
//     //                               },
//     //                             ]}
//     //                           >
//     //                             <Input
//     //                               prefix={<UserOutlined />}
//     //                               placeholder="Enter your first name"
//     //                             />
//     //                           </Form.Item>
//     //                         </Col>
//     //                         <Col xs={24} md={12}>
//     //                           <Form.Item
//     //                             name="lastName"
//     //                             label="Last Name"
//     //                             rules={[
//     //                               {
//     //                                 required: true,
//     //                                 message: "Please enter your last name",
//     //                               },
//     //                             ]}
//     //                           >
//     //                             <Input
//     //                               prefix={<UserOutlined />}
//     //                               placeholder="Enter your last name"
//     //                             />
//     //                           </Form.Item>
//     //                         </Col>
//     //                       </Row>

//     //                       <Row gutter={16}>
//     //                         <Col xs={24} md={12}>
//     //                           <Form.Item
//     //                             name="email"
//     //                             label="Email Address"
//     //                             rules={[
//     //                               {
//     //                                 required: true,
//     //                                 message: "Please enter your email",
//     //                               },
//     //                               {
//     //                                 type: "email",
//     //                                 message: "Please enter a valid email",
//     //                               },
//     //                             ]}
//     //                           >
//     //                             <Input
//     //                               prefix={<MailOutlined />}
//     //                               placeholder="your.email@example.com"
//     //                               disabled // Email shouldn't be editable usually
//     //                             />
//     //                           </Form.Item>
//     //                         </Col>
//     //                         <Col xs={24} md={12}>
//     //                           <Form.Item name="phone" label="Phone Number">
//     //                             <Input
//     //                               prefix={<PhoneOutlined />}
//     //                               placeholder="+1 234 567 8900"
//     //                             />
//     //                           </Form.Item>
//     //                         </Col>
//     //                       </Row>

//     //                       <Form.Item name="address" label="Address">
//     //                         <TextArea
//     //                           rows={3}
//     //                           placeholder="Enter your complete address"
//     //                         />
//     //                       </Form.Item>

//     //                       <Row gutter={16}>
//     //                         <Col xs={24} md={8}>
//     //                           <Form.Item name="dob" label="Date of Birth">
//     //                             <DatePicker
//     //                               className="w-full"
//     //                               format="YYYY-MM-DD"
//     //                             />
//     //                           </Form.Item>
//     //                         </Col>
//     //                         <Col xs={24} md={8}>
//     //                           <Form.Item name="gender" label="Gender">
//     //                             <Select placeholder="Select gender">
//     //                               <Option value="male">Male</Option>
//     //                               <Option value="female">Female</Option>
//     //                               <Option value="other">Other</Option>
//     //                             </Select>
//     //                           </Form.Item>
//     //                         </Col>
//     //                         <Col xs={24} md={8}>
//     //                           <Form.Item name="nidNumber" label="NID Number">
//     //                             <Input placeholder="Enter NID number" />
//     //                           </Form.Item>
//     //                         </Col>
//     //                       </Row>

//     //                       <Divider />

//     //                       <div className="flex justify-end space-x-3">
//     //                         <Button
//     //                           onClick={handleCancel}
//     //                           disabled={loading}
//     //                           size="large"
//     //                         >
//     //                           Cancel
//     //                         </Button>
//     //                         <Button
//     //                           type="primary"
//     //                           htmlType="submit"
//     //                           loading={updating}
//     //                           icon={<SaveOutlined />}
//     //                           size="large"
//     //                         >
//     //                           Save Changes
//     //                         </Button>
//     //                       </div>
//     //                     </Form>
//     //                   </motion.div>
//     //                 ) : (
//     //                   <motion.div
//     //                     key="view-mode"
//     //                     initial={{ opacity: 0, x: -20 }}
//     //                     animate={{ opacity: 1, x: 0 }}
//     //                     exit={{ opacity: 0, x: 20 }}
//     //                   >
//     //                     <Descriptions
//     //                       column={1}
//     //                       bordered
//     //                       size="middle"
//     //                       styles={{
//     //                         fontWeight: 600,
//     //                         width: "200px",
//     //                         backgroundColor:
//     //                           currentTheme === "dark" ? "#374151" : "#fafafa",
//     //                       }}
//     //                     >
//     //                       <Descriptions.Item label="Full Name">
//     //                         <Text className={textColorClass}>
//     //                           {user?.firstName} {user?.lastName}
//     //                         </Text>
//     //                       </Descriptions.Item>
//     //                       <Descriptions.Item label="Email">
//     //                         <Text className={textColorClass}>{user?.email}</Text>
//     //                       </Descriptions.Item>
//     //                       <Descriptions.Item label="Phone">
//     //                         <Text className={textColorClass}>
//     //                           {user?.phone || user?.telephone || "Not provided"}
//     //                         </Text>
//     //                       </Descriptions.Item>
//     //                       {/* <Descriptions.Item label="Address">
//     //                         <Text className={textColorClass}>
//     //                           {user?.address || user?.addressOne || "Not provided"}
//     //                         </Text>
//     //                       </Descriptions.Item> */}

//     // <Descriptions.Item label="Address">
//     //   {user?.address ? (
//     //     typeof user.address === 'string' ? (
//     //       // If address is a string, display it directly
//     //       <Text className={textColorClass}>{user.address}</Text>
//     //     ) : (
//     //       // If address is an object, safely access its properties
//     //       <Text className={textColorClass}>
//     //         {[
//     //           user.address.street,
//     //           user.address.city,
//     //           user.address.state,
//     //           user.address.country,
//     //           user.address.postalCode
//     //         ]
//     //           .filter(Boolean) // Remove empty/null values
//     //           .join(', ') || 'Address not provided'}
//     //       </Text>
//     //     )
//     //   ) : (
//     //     <Text className={textColorClass}>No address provided</Text>
//     //   )}
//     // </Descriptions.Item>

//     //                       <Descriptions.Item label="Date of Birth">
//     //                         <Text className={textColorClass}>
//     //                           {user?.dob
//     //                             ? dayjs(user.dob).format("MMMM DD, YYYY")
//     //                             : "Not provided"}
//     //                         </Text>
//     //                       </Descriptions.Item>
//     //                       <Descriptions.Item label="Gender">
//     //                         <Text className={textColorClass}>
//     //                           {user?.gender
//     //                             ? user.gender.charAt(0).toUpperCase() +
//     //                               user.gender.slice(1)
//     //                             : "Not provided"}
//     //                         </Text>
//     //                       </Descriptions.Item>
//     //                       <Descriptions.Item label="NID Number">
//     //                         <Text className={textColorClass}>
//     //                           {user?.nidNumber || "Not provided"}
//     //                         </Text>
//     //                       </Descriptions.Item>
//     //                       <Descriptions.Item label="Member ID">
//     //                         <Text strong className={textColorClass}>
//     //                           {user?.membershipId || "N/A"}
//     //                         </Text>
//     //                       </Descriptions.Item>
//     //                     </Descriptions>
//     //                   </motion.div>
//     //                 )}
//     //               </AnimatePresence>
//     //             </Col>
//     //           </Row>
//     //         </Card>
//     //       ),
//     //     },
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

//                       <Form.Item
//                         name="address"
//                         label="Address"
//                         rules={[
//                           {
//                             max: 200,
//                             message: "Address cannot exceed 200 characters",
//                           },
//                         ]}
//                       >
//                         <TextArea
//                           rows={3}
//                           placeholder="Enter your complete address (Street, City, State, Country)"
//                           maxLength={200}
//                           showCount
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

//                       {/* FIXED ADDRESS SECTION */}
//                       <Descriptions.Item label="Address">
//                         {user?.address ? (
//                           typeof user.address === "string" ? (
//                             <Text className={textColorClass}>
//                               {user.address}
//                             </Text>
//                           ) : (
//                             <Text className={textColorClass}>
//                               {[
//                                 user.address.street,
//                                 user.address.city,
//                                 user.address.state,
//                                 user.address.country,
//                               ]
//                                 .filter((part) => part && part.trim() !== "")
//                                 .join(", ") || "No address provided"}
//                             </Text>
//                           )
//                         ) : (
//                           <Text className={textColorClass}>
//                             No address provided
//                           </Text>
//                         )}
//                       </Descriptions.Item>

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

//     {
//       key: "professional",
//       label: (
//         <Space>
//           <IdcardOutlined />
//           Professional
//         </Space>
//       ),
//       children: (
//         <Card className={cardClassName}>
//           <Row gutter={[24, 24]}>
//             <Col xs={24} lg={12}>
//               <Title level={4} className={textColorClass}>
//                 Professional Information
//               </Title>
//               <Descriptions
//                 column={1}
//                 bordered
//                 size="middle"
//                 styles={{
//                   fontWeight: 600,
//                   backgroundColor:
//                     currentTheme === "dark" ? "#374151" : "#fafafa",
//                 }}
//               >
//                 <Descriptions.Item label="Role">
//                   {getRoleTag()}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Status">
//                   {getStatusTag()}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Committee Position">
//                   <Text className={textColorClass}>
//                     {user?.committeePosition || "Not assigned"}

//                   </Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Join Date">
//                   <Text className={textColorClass}>
//                     {user?.joinDate
//                       ? dayjs(user.joinDate).format("MMMM DD, YYYY")
//                       : "N/A"}
//                   </Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Division">
//                   <Text className={textColorClass}>
//                     {user?.division || "Not assigned"}
//                   </Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="District">
//                   <Text className={textColorClass}>
//                     {user?.district || "Not assigned"}
//                   </Text>
//                 </Descriptions.Item>
//               </Descriptions>
//             </Col>

//             <Col xs={24} lg={12}>
//               <Title level={4} className={textColorClass}>
//                 Recent Activity
//               </Title>
//               <Timeline>
//                 {(recentActivity || []).slice(0, 5).map((activity, index) => (
//                   <Timeline.Item
//                     key={activity.id || index}
//                     dot={<UserOutlined style={{ fontSize: "16px" }} />}
//                     color="blue"
//                   >
//                     <div className="space-y-1">
//                       <div className={`font-medium ${textColorClass}`}>
//                         {activity.action || "Activity"}
//                       </div>
//                       <div className={textMutedClass}>
//                         {activity.description || "No description available"}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {activity.time
//                           ? dayjs(activity.time).fromNow()
//                           : "Recently"}
//                       </div>
//                       {activity.activityType && (
//                         <div className="text-xs">
//                           <Tag size="small" color="blue">
//                             {activity.activityType}
//                           </Tag>
//                         </div>
//                       )}
//                     </div>
//                   </Timeline.Item>
//                 ))}
//               </Timeline>
//             </Col>
//           </Row>
//         </Card>
//       ),
//     },
//     {
//       key: "security",
//       label: (
//         <Space>
//           <SecurityScanOutlined />
//           Security
//         </Space>
//       ),
//       children: (
//         <Card className={cardClassName}>
//           <Title level={4} className={textColorClass}>
//             Security Settings
//           </Title>
//           <Row gutter={[16, 16]} className="mb-6">
//             {securityItems.map((item, index) => (
//               <Col xs={24} sm={12} key={index}>
//                 <motion.div whileHover={{ scale: 1.02 }}>
//                   <Card
//                     size="small"
//                     className={`cursor-pointer transition-all ${
//                       currentTheme === "dark"
//                         ? "hover:bg-gray-700"
//                         : "hover:bg-blue-50"
//                     } border ${
//                       currentTheme === "dark"
//                         ? "border-gray-600"
//                         : "border-gray-200"
//                     }`}
//                     onClick={item.action}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <div className="text-2xl">{item.icon}</div>
//                         <div>
//                           <div className={`font-semibold ${textColorClass}`}>
//                             {item.title}
//                           </div>
//                           <div
//                             className={textMutedClass}
//                             style={{ fontSize: "12px" }}
//                           >
//                             {item.description}
//                           </div>
//                         </div>
//                       </div>
//                       <Badge
//                         status={
//                           item.status === "enabled" ? "success" : "default"
//                         }
//                         text={item.status}
//                         className="text-xs"
//                       />
//                     </div>
//                   </Card>
//                 </motion.div>
//               </Col>
//             ))}
//           </Row>
//           <Title level={4} className={textColorClass}>
//             Recent Login History
//           </Title>
//            {/* In the security tab, update the List component: */}
//           <List
//             dataSource={loginHistory || []}
//             renderItem={(item, index) => (
//               <List.Item key={item.id || index}>
//                 <List.Item.Meta
//                   avatar={<Avatar icon={<TabletOutlined />} />}
//                   title={
//                     <Text className={textColorClass}>
//                       {item.device} • {item.location}
//                     </Text>
//                   }
//                   description={
//                     <Space direction="vertical" size={0}>
//                       <Text type="secondary">IP: {item.ip}</Text>
//                       <Text type="secondary">
//                         {item.time
//                           ? dayjs(item.time).format("MMM D, YYYY HH:mm")
//                           : "Unknown time"}
//                       </Text>
//                     </Space>
//                   }
//                 />
//                 <Badge
//                   status={item.status === "success" ? "success" : "error"}
//                   text={item.status}
//                 />
//               </List.Item>
//             )}
//           />
//         </Card>
//       ),
//     },
//   ];

//   return (
//     <div
//       className={`space-y-6 p-4 ${
//         currentTheme === "dark" ? "bg-gray-900" : "bg-gray-50"
//       } min-h-screen`}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex justify-between items-start flex-wrap gap-4"
//       >
//         <div>
//           <Title level={1} className={`!mb-2 ${textColorClass}`}>
//             My Profile
//           </Title>
//           <Text className={textMutedClass}>
//             Manage your personal information and account settings
//           </Text>
//         </div>

//         <Space>
//           <Button
//             icon={<QrcodeOutlined />}
//             onClick={() => setQrModalVisible(true)}
//           >
//             QR Code
//           </Button>
//           {!editMode && (
//             <Button
//               type="primary"
//               icon={<EditOutlined />}
//               onClick={() => setEditMode(true)}
//               className="flex items-center gap-2"
//             >
//               Edit Profile
//             </Button>
//           )}
//         </Space>
//       </motion.div>

//       {profileCompleteness < 100 && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           <Alert
//             message="Complete Your Profile"
//             description={`Your profile is ${profileCompleteness}% complete. Complete all fields to unlock full features.`}
//             type="info"
//             showIcon
//             action={
//               <Button
//                 size="small"
//                 type="primary"
//                 onClick={() => setEditMode(true)}
//               >
//                 Complete Now
//               </Button>
//             }
//             className={cardClassName}
//           />
//         </motion.div>
//       )}

//       <Row gutter={[16, 16]} className="mb-6">
//         {profileStats.map((stat, index) => (
//           <Col xs={24} sm={12} lg={6} key={index}>
//             <motion.div
//               whileHover={{ scale: 1.02, y: -2 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <Card className={cardClassName}>
//                 <div className="flex justify-between items-start mb-3">
//                   <div
//                     className="p-2 rounded-lg"
//                     style={{ backgroundColor: `${stat.color}15` }}
//                   >
//                     {stat.icon}
//                   </div>
//                   <Text className={textMutedClass} style={{ fontSize: "12px" }}>
//                     {stat.title}
//                   </Text>
//                 </div>

//                 <Statistic
//                   value={stat.value}
//                   suffix={stat.suffix}
//                   valueStyle={{
//                     color: stat.color,
//                     fontSize: "24px",
//                   }}
//                 />

//                 {stat.title === "Profile Complete" && (
//                   <Progress
//                     percent={stat.value}
//                     size="small"
//                     strokeColor={stat.color}
//                     showInfo={false}
//                     className="mt-2"
//                   />
//                 )}
//               </Card>
//             </motion.div>
//           </Col>
//         ))}
//       </Row>

//       <Tabs
//         activeKey={activeTab}
//         onChange={setActiveTab}
//         type="card"
//         items={tabItems}
//       />

//       {/* Change Password Modal */}
//       <Modal
//         title="Change Password"
//         open={securityModalVisible}
//         onCancel={() => setSecurityModalVisible(false)}
//         footer={null}
//       >
//         <Form
//           layout="vertical"
//           form={passwordForm}
//           onFinish={handlePasswordChange}
//           size="large"
//         >
//           <Form.Item
//             name="currentPassword"
//             label="Current Password"
//             rules={[
//               { required: true, message: "Please enter current password" },
//             ]}
//           >
//             <Password
//               placeholder="Enter current password"
//               iconRender={(visible) =>
//                 visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
//               }
//             />
//           </Form.Item>

//           <Form.Item
//             name="newPassword"
//             label="New Password"
//             rules={[
//               { required: true, message: "Please enter new password" },
//               { min: 8, message: "Password must be at least 8 characters" },
//             ]}
//           >
//             <Password
//               placeholder="Enter new password"
//               iconRender={(visible) =>
//                 visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
//               }
//             />
//           </Form.Item>

//           <Form.Item
//             name="confirmPassword"
//             label="Confirm New Password"
//             dependencies={["newPassword"]}
//             rules={[
//               { required: true, message: "Please confirm new password" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("newPassword") === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error("Passwords do not match"));
//                 },
//               }),
//             ]}
//           >
//             <Password
//               placeholder="Confirm new password"
//               iconRender={(visible) =>
//                 visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
//               }
//             />
//           </Form.Item>

//           <div className="flex justify-end space-x-3">
//             <Button onClick={() => setSecurityModalVisible(false)}>
//               Cancel
//             </Button>
//             <Button type="primary" htmlType="submit" loading={changingPassword}>
//               Update Password
//             </Button>
//           </div>
//         </Form>
//       </Modal>

//       {/* QR Code Modal */}
//       <Modal
//         title="Profile QR Code"
//         open={qrModalVisible}
//         onCancel={() => setQrModalVisible(false)}
//         footer={[
//           <Button key="download" icon={<DownloadOutlined />}>
//             Download QR
//           </Button>,
//           <Button key="close" onClick={() => setQrModalVisible(false)}>
//             Close
//           </Button>,
//         ]}
//       >
//         <div className="text-center space-y-4">
//           <QRCode
//             value={`${window.location.origin}/profile/${
//               user?.membershipId || user?.id || "unknown"
//             }`}
//             size={200}
//             iconSize={40}
//           />
//           <div>
//             {/* <div className="flex space-x-1 mt-1">
//                           <Tag
//                             color={
//                               userData?.role === "admin"
//                                 ? "red"
//                                 : userData?.role === "hr"
//                                 ? "blue"
//                                 : userData?.role === "Employee"
//                                 ? "orange"
//                                 : "green"
//                             }
//                             className="text-xs px-1 py-0 border-0 capitalize"
//                           >
//                             {userData?.role}
//                           </Tag>
//                           {userData?.membershipId && (
//                             <Tag color="green" className="text-xs px-1 py-0 border-0">
//                               {userData.membershipId}
//                             </Tag>
//                           )}
//                         </div> */}

//             {/* <Text strong>{users?.firstName} {users?.lastName}</Text>
//             <Text type="secondary">Role: {users?.role}</Text> */}
//             <Text strong className={textColorClass}>
//               {user?.firstName} {user?.lastName}
//             </Text>
//             <br />
//             <Text className={textMutedClass}>Scan to view profile</Text>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminDashboard;

/////////////////////////////////Latest FINAL CODE///////////////////////////

// import { useState, useEffect } from "react";
// import {
//   Card,
//   Form,
//   Input,
//   Button,
//   Upload,
//   Avatar,
//   message,
//   Divider,
//   Row,
//   Col,
//   Typography,
//   Tag,
//   Select,
//   DatePicker,
//   Tabs,
//   Descriptions,
//   Space,
//   Spin,
//   Modal,
//   Progress,
//   List,
//   Badge,
//   Tooltip,
//   Alert,
//   Statistic,
//   Timeline,
//   QRCode,
//   Table,
//   Dropdown,
//   Menu,
//   Grid,
//   Drawer,
//   Switch,
//   Collapse,
//   Skeleton,
//   Empty,
//   Result,
//   Popconfirm,
//   Segmented,
//   FloatButton
// } from "antd";
// import {
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined,
//   CameraOutlined,
//   SaveOutlined,
//   EditOutlined,
//   LockOutlined,
//   TeamOutlined,
//   CalendarOutlined,
//   IdcardOutlined,
//   SafetyCertificateOutlined,
//   EyeOutlined,
//   EyeInvisibleOutlined,
//   QrcodeOutlined,
//   HistoryOutlined,
//   SecurityScanOutlined,
//   DownloadOutlined,
//   CheckCircleOutlined,
//   ExclamationCircleOutlined,
//   TabletOutlined,
//   CrownOutlined,
//   TrophyOutlined,
//   StarOutlined,
//   SettingOutlined,
//   BellOutlined,
//   LogoutOutlined,
//   DashboardOutlined,
//   FileTextOutlined,
//   DatabaseOutlined,
//   LineChartOutlined,
//   AppstoreOutlined,
//   MenuOutlined,
//   FullscreenOutlined,
//   FullscreenExitOutlined,
//   ReloadOutlined,
//   InfoCircleOutlined,
//   ClockCircleOutlined,
//   GlobalOutlined,
//   WalletOutlined,
//   CreditCardOutlined,
//   FileProtectOutlined,
//   AuditOutlined,
//   KeyOutlined
// } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUserProfile,
//   updateUserProfile,
//   uploadProfilePhoto,
//   changePassword,
//   fetchLoginHistory,
//   fetchRecentActivity,
//   clearError,
//   clearSuccess,
//   selectUser,
//   selectLoginHistory,
//   selectRecentActivity,
//   selectProfileLoading,
//   selectProfileUpdating,
//   selectProfileUploading,
//   selectChangingPassword,
//   selectProfileError,
//   selectProfileSuccess,
//   selectProfileCompleteness,
// } from "../slices/profileSlice";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import './admin.css'

// dayjs.extend(relativeTime);

// const { Title, Text, Paragraph } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { Password } = Input;
// const { Panel } = Collapse;
// const { useBreakpoint } = Grid;

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const screens = useBreakpoint();

//   // Redux state selectors
//   const user = useSelector(selectUser);
//   const loginHistory = useSelector(selectLoginHistory);
//   const recentActivity = useSelector(selectRecentActivity);
//   const loading = useSelector(selectProfileLoading);
//   const updating = useSelector(selectProfileUpdating);
//   const uploading = useSelector(selectProfileUploading);
//   const changingPassword = useSelector(selectChangingPassword);
//   const error = useSelector(selectProfileError);
//   const success = useSelector(selectProfileSuccess);
//   const profileCompleteness = useSelector(selectProfileCompleteness);

//   const currentTheme = useSelector(
//     (state) => state.theme?.currentTheme || "light"
//   );

//   // Local state
//   const [form] = Form.useForm();
//   const [passwordForm] = Form.useForm();
//   const [editMode, setEditMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [securityModalVisible, setSecurityModalVisible] = useState(false);
//   const [qrModalVisible, setQrModalVisible] = useState(false);
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch data on component mount
//   useEffect(() => {
//     loadData();
//   }, [dispatch]);

//   const loadData = async () => {
//     setRefreshing(true);
//     await Promise.all([
//       dispatch(fetchUserProfile()),
//       dispatch(fetchLoginHistory()),
//       dispatch(fetchRecentActivity())
//     ]);
//     setRefreshing(false);
//   };

//   // Set form values when user data is available
//   useEffect(() => {
//     if (user) {
//       form.setFieldsValue({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || user.telephone || "",
//         address: user.addressDisplay || user.address || "",
//         dob: user.dob ? dayjs(user.dob) : null,
//         gender: user.gender || "",
//         nidNumber: user.nidNumber || "",
//         joinDate: user.joinDate ? dayjs(user.joinDate) : null,
//         division: user.division || "",
//         district: user.district || "",
//         committeePosition: user.committeePosition || "",
//       });
//     }
//   }, [user, form]);

//   // Handle error messages
//   useEffect(() => {
//     if (error) {
//       message.error(error);
//       setTimeout(() => dispatch(clearError()), 3000);
//     }
//   }, [error, dispatch]);

//   // Handle success messages
//   useEffect(() => {
//     if (success) {
//       message.success(success);
//       setTimeout(() => dispatch(clearSuccess()), 3000);
//     }
//   }, [success, dispatch]);

//   // Handle save with validation
//   const handleSave = async (values) => {
//     try {
//       const updatedData = {
//         firstName: values.firstName?.trim(),
//         lastName: values.lastName?.trim(),
//         email: values.email?.trim(),
//         phone: values.phone?.trim(),
//         address: values.address || "",
//         dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
//         gender: values.gender,
//         nidNumber: values.nidNumber?.trim(),
//         joinDate: values.joinDate ? values.joinDate.format("YYYY-MM-DD") : null,
//         division: values.division?.trim(),
//         district: values.district?.trim(),
//         committeePosition: values.committeePosition,
//       };

//       await dispatch(updateUserProfile(updatedData)).unwrap();
//       setEditMode(false);
//       message.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Update failed:", error);
//       message.error(error || "Failed to update profile");
//     }
//   };

//   // Handle cancel edit
//   const handleCancel = () => {
//     form.resetFields();
//     setEditMode(false);
//     if (user) {
//       form.setFieldsValue({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || user.telephone || "",
//         address: user.addressDisplay || "",
//         dob: user.dob ? dayjs(user.dob) : null,
//         gender: user.gender || "",
//         nidNumber: user.nidNumber || "",
//         joinDate: user.joinDate ? dayjs(user.joinDate) : null,
//         division: user.division || "",
//         district: user.district || "",
//         committeePosition: user.committeePosition || "",
//       });
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = async (file) => {
//     const isImage = file.type.startsWith("image/");
//     if (!isImage) {
//       message.error("You can only upload image files!");
//       return false;
//     }

//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error("Image must be smaller than 2MB!");
//       return false;
//     }

//     try {
//       await dispatch(uploadProfilePhoto(file)).unwrap();
//       message.success("Profile photo updated!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }

//     return false;
//   };

//   // Handle password change
//   const handlePasswordChange = async (values) => {
//     try {
//       await dispatch(changePassword(values)).unwrap();
//       setSecurityModalVisible(false);
//       passwordForm.resetFields();
//       message.success("Password changed successfully!");
//     } catch (error) {
//       console.error("Failed to change password:", error);
//     }
//   };

//   // Get status tag
//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: { color: "green", text: "Active", icon: <CheckCircleOutlined /> },
//       pending: { color: "orange", text: "Pending", icon: <ExclamationCircleOutlined /> },
//       suspended: { color: "red", text: "Suspended", icon: <ExclamationCircleOutlined /> },
//       inactive: { color: "gray", text: "Inactive", icon: <ExclamationCircleOutlined /> },
//       approved: { color: "green", text: "Approved", icon: <CheckCircleOutlined /> },
//       waiting: { color: "orange", text: "Waiting", icon: <ExclamationCircleOutlined /> },
//       rejected: { color: "red", text: "Rejected", icon: <ExclamationCircleOutlined /> },
//     };

//     const userStatus = status || user?.status || "active";
//     const config = statusConfig[userStatus] || {
//       color: "blue",
//       text: userStatus,
//       icon: <UserOutlined />,
//     };

//     return (
//       <Tag color={config.color} icon={config.icon} className="flex items-center gap-1">
//         {config.text}
//       </Tag>
//     );
//   };

//   // Get role tag
//   const getRoleTag = (role) => {
//     const roleConfig = {
//       admin: { color: "red", text: "Admin", icon: <CrownOutlined /> },
//       hr: { color: "purple", text: "HR", icon: <TeamOutlined /> },
//       employee: { color: "blue", text: "Employee", icon: <UserOutlined /> },
//       member: { color: "green", text: "Member", icon: <UserOutlined /> },
//       superadmin: { color: "volcano", text: "Super Admin", icon: <CrownOutlined /> },
//       manager: { color: "gold", text: "Manager", icon: <TeamOutlined /> },
//       executive: { color: "cyan", text: "Executive", icon: <UserOutlined /> },
//       "plot-owner": { color: "lime", text: "Plot Owner", icon: <EnvironmentOutlined /> },
//     };

//     const userRole = role || user?.role || "member";
//     const config = roleConfig[userRole?.toLowerCase()] || {
//       color: "default",
//       text: userRole,
//       icon: <UserOutlined />,
//     };

//     return (
//       <Tag color={config.color} icon={config.icon} className="flex items-center gap-1 capitalize">
//         {config.text}
//       </Tag>
//     );
//   };

//   // Security items
//   const securityItems = [
//     {
//       title: "Change Password",
//       description: "Update your login password",
//       icon: <KeyOutlined className="text-blue-500" />,
//       action: () => setSecurityModalVisible(true),
//       status: "active",
//     },
//     {
//       title: "Two-Factor Auth",
//       description: "Extra security layer",
//       icon: <SecurityScanOutlined className="text-green-500" />,
//       action: () => setTwoFactorEnabled(!twoFactorEnabled),
//       status: twoFactorEnabled ? "enabled" : "disabled",
//     },
//     {
//       title: "Login History",
//       description: "Recent login activities",
//       icon: <HistoryOutlined className="text-orange-500" />,
//       action: () => setActiveTab("security"),
//       status: `${loginHistory?.length || 0} records`,
//     },
//     {
//       title: "Session Management",
//       description: "Manage active sessions",
//       icon: <AuditOutlined className="text-purple-500" />,
//       action: () => message.info("Coming soon!"),
//       status: "manage",
//     },
//   ];

//   // Profile stats
//   const profileStats = [
//     {
//       title: "Profile Complete",
//       value: profileCompleteness || 0,
//       suffix: "%",
//       color: profileCompleteness === 100 ? "#52c41a" : profileCompleteness >= 70 ? "#1890ff" : "#faad14",
//       icon: <UserOutlined />,
//       progress: true,
//     },
//     {
//       title: "Account Age",
//       value: user?.createdAt ? dayjs().diff(dayjs(user.createdAt), "day") : 0,
//       suffix: " days",
//       color: "#722ed1",
//       icon: <CalendarOutlined />,
//     },
//     {
//       title: "Activities",
//       value: recentActivity?.length || 0,
//       suffix: " this month",
//       color: "#13c2c2",
//       icon: <StarOutlined />,
//     },
//     {
//       title: "Last Login",
//       value: user?.lastLogin ? dayjs(user.lastLogin).fromNow() : "Never",
//       color: "#fa541c",
//       icon: <ClockCircleOutlined />,
//     },
//   ];

//   // Dashboard quick stats
//   const dashboardStats = [
//     { title: "Total Members", value: "1,254", change: "+12%", icon: <TeamOutlined />, color: "#1890ff" },
//     { title: "Active Users", value: "892", change: "+8%", icon: <UserOutlined />, color: "#52c41a" },
//     { title: "Pending Approvals", value: "23", change: "-5%", icon: <FileTextOutlined />, color: "#faad14" },
//     { title: "Revenue", value: "$12,450", change: "+15%", icon: <WalletOutlined />, color: "#722ed1" },
//   ];

//   // Theme classes
//   const isDark = currentTheme === "dark";
//   const cardClassName = `border-0 shadow-lg rounded-xl ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`;
//   const textColorClass = isDark ? "text-gray-200" : "text-gray-800";
//   const textMutedClass = isDark ? "text-gray-400" : "text-gray-600";
//   const bgHoverClass = isDark ? "hover:bg-gray-700" : "hover:bg-gray-50";

//   // Get display image
//   const displayImage = user?.profilePhoto || user?.image || user?.profilePicture;

//   // Mobile menu
//   const mobileMenu = (
//     <Menu
//       items={[
//         {
//           key: '1',
//           icon: <DashboardOutlined />,
//           label: 'Dashboard',
//           onClick: () => navigate('/dashboard')
//         },
//         {
//           key: '2',
//           icon: <UserOutlined />,
//           label: 'Profile',
//           onClick: () => setActiveTab('personal')
//         },
//         {
//           key: '3',
//           icon: <SettingOutlined />,
//           label: 'Settings',
//           onClick: () => setActiveTab('security')
//         },
//         {
//           key: '4',
//           icon: <LogoutOutlined />,
//           label: 'Logout',
//           danger: true,
//           onClick: () => {
//             localStorage.removeItem('token');
//             navigate('/login');
//           }
//         }
//       ]}
//     />
//   );

//   // Tabs configuration
//   const tabItems = [
//     {
//       key: "overview",
//       label: (
//         <Space>
//           <DashboardOutlined />
//           {screens.xs ? "Overview" : "Dashboard Overview"}
//         </Space>
//       ),
//       children: (
//         <div className="space-y-6">
//           {/* Quick Stats */}
//           <Row gutter={[16, 16]}>
//             {dashboardStats.map((stat, index) => (
//               <Col xs={24} sm={12} lg={6} key={index}>
//                 <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
//                   <Card className={`${cardClassName} border-l-4`} style={{ borderLeftColor: stat.color }}>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className={`text-sm ${textMutedClass}`}>{stat.title}</div>
//                         <div className={`text-2xl font-bold ${textColorClass}`}>{stat.value}</div>
//                         <div className="text-xs" style={{ color: stat.change.startsWith('+') ? '#52c41a' : '#ff4d4f' }}>
//                           {stat.change} from last month
//                         </div>
//                       </div>
//                       <div className="p-3 rounded-full" style={{ backgroundColor: `${stat.color}20` }}>
//                         {stat.icon}
//                       </div>
//                     </div>
//                   </Card>
//                 </motion.div>
//               </Col>
//             ))}
//           </Row>

//           {/* Profile Summary */}
//           <Row gutter={[16, 16]}>
//             <Col xs={24} lg={16}>
//               <Card className={cardClassName} title="Profile Summary">
//                 <Row gutter={[24, 24]}>
//                   <Col xs={24} md={8} className="text-center">
//                     <Avatar size={100} src={displayImage} icon={<UserOutlined />} className="mb-4 border-4 border-white shadow-lg" />
//                     <Title level={4} className={textColorClass}>
//                       {user?.firstName} {user?.lastName}
//                     </Title>
//                     <div className="space-y-2">
//                       {getRoleTag()}
//                       {getStatusTag()}
//                     </div>
//                   </Col>
//                   <Col xs={24} md={16}>
//                     <Descriptions column={2} size="small">
//                       <Descriptions.Item label="Email" span={2}>
//                         {user?.email}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Phone">
//                         {user?.phone || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Member ID">
//                         {user?.membershipId || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Join Date" span={2}>
//                         {user?.joinDate ? dayjs(user.joinDate).format("DD MMM YYYY") : "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Committee Position">
//                         {user?.committeePosition || "N/A"}
//                       </Descriptions.Item>
//                     </Descriptions>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//             <Col xs={24} lg={8}>
//               <Card className={cardClassName} title="Quick Actions">
//                 <Space direction="vertical" className="w-full">
//                   <Button
//                     type="primary"
//                     icon={<EditOutlined />}
//                     block
//                     onClick={() => setEditMode(true)}
//                   >
//                     Edit Profile
//                   </Button>
//                   <Button
//                     icon={<QrcodeOutlined />}
//                     block
//                     onClick={() => setQrModalVisible(true)}
//                   >
//                     Generate QR
//                   </Button>
//                   <Button
//                     icon={<DownloadOutlined />}
//                     block
//                     onClick={() => message.info('Export feature coming soon!')}
//                   >
//                     Export Data
//                   </Button>
//                   <Button
//                     icon={<SettingOutlined />}
//                     block
//                     onClick={() => setActiveTab('security')}
//                   >
//                     Security Settings
//                   </Button>
//                 </Space>
//               </Card>
//             </Col>
//           </Row>

//           {/* Recent Activity */}
//           <Card className={cardClassName} title="Recent Activity">
//             {recentActivity && recentActivity.length > 0 ? (
//               <Timeline>
//                 {recentActivity.slice(0, 5).map((activity, index) => (
//                   <Timeline.Item key={index} color="blue">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <div className={`font-medium ${textColorClass}`}>
//                           {activity.action}
//                         </div>
//                         <div className={textMutedClass}>
//                           {activity.description}
//                         </div>
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {dayjs(activity.time).fromNow()}
//                       </div>
//                     </div>
//                   </Timeline.Item>
//                 ))}
//               </Timeline>
//             ) : (
//               <Empty description="No recent activity" />
//             )}
//           </Card>
//         </div>
//       ),
//     },
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
//             {/* Left Column - Profile Image & Stats */}
//             <Col xs={24} md={8}>
//               <div className="text-center space-y-6">
//                 <div className="relative inline-block">
//                   <Tooltip title="Change Profile Photo">
//                     <motion.div whileHover={{ scale: 1.05 }}>
//                       <Upload
//                         showUploadList={false}
//                         beforeUpload={handleImageUpload}
//                         disabled={uploading}
//                       >
//                         <Badge
//                           count={
//                             <CameraOutlined className="text-white bg-blue-500 p-1 rounded-full" />
//                           }
//                           offset={[-10, 100]}
//                         >
//                           <Avatar
//                             size={120}
//                             src={displayImage}
//                             icon={<UserOutlined />}
//                             className="border-4 border-white shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
//                           />
//                         </Badge>
//                       </Upload>
//                     </motion.div>
//                   </Tooltip>
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

//                 {/* Stats Card */}
//                 <Card className={isDark ? "bg-gray-700" : "bg-gray-50"}>
//                   <Space direction="vertical" className="w-full">
//                     {profileStats.map((stat, index) => (
//                       <div key={index} className="flex justify-between items-center">
//                         <Space>
//                           <div style={{ color: stat.color }}>{stat.icon}</div>
//                           <Text className={textMutedClass}>{stat.title}</Text>
//                         </Space>
//                         <Text strong className={textColorClass}>
//                           {stat.value}{stat.suffix}
//                         </Text>
//                       </div>
//                     ))}
//                   </Space>
//                 </Card>
//               </div>
//             </Col>

//             {/* Right Column - Form/View */}
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
//                       disabled={updating}
//                       size="large"
//                     >
//                       <Row gutter={16}>
//                         <Col xs={24} md={12}>
//                           <Form.Item
//                             name="firstName"
//                             label="First Name"
//                             rules={[{ required: true, message: "First name is required" }]}
//                           >
//                             <Input prefix={<UserOutlined />} placeholder="John" />
//                           </Form.Item>
//                         </Col>
//                         <Col xs={24} md={12}>
//                           <Form.Item
//                             name="lastName"
//                             label="Last Name"
//                             rules={[{ required: true, message: "Last name is required" }]}
//                           >
//                             <Input prefix={<UserOutlined />} placeholder="Doe" />
//                           </Form.Item>
//                         </Col>
//                       </Row>

//                       <Row gutter={16}>
//                         <Col xs={24} md={12}>
//                           <Form.Item
//                             name="email"
//                             label="Email"
//                             rules={[
//                               { required: true, message: "Email is required" },
//                               { type: "email", message: "Invalid email" }
//                             ]}
//                           >
//                             <Input prefix={<MailOutlined />} disabled />
//                           </Form.Item>
//                         </Col>
//                         <Col xs={24} md={12}>
//                           <Form.Item name="phone" label="Phone">
//                             <Input prefix={<PhoneOutlined />} placeholder="+880 1XXX XXXXXX" />
//                           </Form.Item>
//                         </Col>
//                       </Row>

//                       <Form.Item name="address" label="Address">
//                         <TextArea rows={2} placeholder="Enter your address" />
//                       </Form.Item>

//                       <Row gutter={16}>
//                         <Col xs={24} md={8}>
//                           <Form.Item name="dob" label="Date of Birth">
//                             <DatePicker className="w-full" format="YYYY-MM-DD" />
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
//                             <Input placeholder="Enter NID" />
//                           </Form.Item>
//                         </Col>
//                       </Row>

//                       <Row gutter={16}>
//                         <Col xs={24} md={8}>
//                           <Form.Item name="joinDate" label="Join Date">
//                             <DatePicker className="w-full" format="YYYY-MM-DD" />
//                           </Form.Item>
//                         </Col>
//                         <Col xs={24} md={8}>
//                           <Form.Item name="division" label="Division">
//                             <Input placeholder="Enter division" />
//                           </Form.Item>
//                         </Col>
//                         <Col xs={24} md={8}>
//                           <Form.Item name="district" label="District">
//                             <Input placeholder="Enter district" />
//                           </Form.Item>
//                         </Col>
//                       </Row>

//                       <Form.Item name="committeePosition" label="Committee Position">
//                         <Select placeholder="Select position">
//                           <Option value="President">President</Option>
//                           <Option value="General Secretary">General Secretary</Option>
//                           <Option value="Member">Member</Option>
//                           <Option value="Executive Member">Executive Member</Option>
//                         </Select>
//                       </Form.Item>

//                       <Divider />

//                       <div className="flex justify-end space-x-3">
//                         <Button onClick={handleCancel} disabled={updating}>
//                           Cancel
//                         </Button>
//                         <Button
//                           type="primary"
//                           htmlType="submit"
//                           loading={updating}
//                           icon={<SaveOutlined />}
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
//                     <div className="flex justify-between items-center mb-6">
//                       <Title level={4} className={textColorClass}>Personal Information</Title>
//                       <Button
//                         type="primary"
//                         icon={<EditOutlined />}
//                         onClick={() => setEditMode(true)}
//                       >
//                         Edit Profile
//                       </Button>
//                     </div>

//                     <Descriptions
//                       column={{ xs: 1, sm: 2 }}
//                       bordered
//                       size="middle"
//                       className="rounded-lg overflow-hidden"
//                     >
//                       <Descriptions.Item label="Full Name">
//                         <Text strong className={textColorClass}>
//                           {user?.firstName} {user?.lastName}
//                         </Text>
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
//                       <Descriptions.Item label="Phone">{user?.phone || "N/A"}</Descriptions.Item>
//                       <Descriptions.Item label="Gender">
//                         {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Date of Birth" span={2}>
//                         {user?.dob ? dayjs(user.dob).format("DD MMMM YYYY") : "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="NID Number">{user?.nidNumber || "N/A"}</Descriptions.Item>
//                       <Descriptions.Item label="Address" span={2}>
//                         {user?.addressDisplay || user?.address || "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Join Date">
//                         {user?.joinDate ? dayjs(user.joinDate).format("DD MMMM YYYY") : "N/A"}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="Division">{user?.division || "N/A"}</Descriptions.Item>
//                       <Descriptions.Item label="District">{user?.district || "N/A"}</Descriptions.Item>
//                       <Descriptions.Item label="Committee Position" span={2}>
//                         {user?.committeePosition || "N/A"}
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
//     {
//       key: "security",
//       label: (
//         <Space>
//           <SecurityScanOutlined />
//           Security
//         </Space>
//       ),
//       children: (
//         <Card className={cardClassName}>
//           <Title level={4} className={textColorClass}>Security & Privacy</Title>

//           {/* Security Cards Grid */}
//           <Row gutter={[16, 16]} className="mb-8">
//             {securityItems.map((item, index) => (
//               <Col xs={24} sm={12} lg={6} key={index}>
//                 <Card
//                   className={`cursor-pointer transition-all ${bgHoverClass} border h-full`}
//                   onClick={item.action}
//                   hoverable
//                 >
//                   <div className="flex flex-col h-full">
//                     <div className="flex items-center mb-3">
//                       <div className="text-2xl mr-3">{item.icon}</div>
//                       <div>
//                         <div className={`font-semibold ${textColorClass}`}>{item.title}</div>
//                         <div className={`text-xs ${textMutedClass}`}>{item.description}</div>
//                       </div>
//                     </div>
//                     <div className="mt-auto">
//                       <Tag color={item.status === 'enabled' ? 'success' : 'default'} className="w-full text-center">
//                         {item.status}
//                       </Tag>
//                     </div>
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Two-Factor Authentication */}
//           <Card className={`mb-6 ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
//             <div className="flex justify-between items-center">
//               <div>
//                 <Title level={5} className={textColorClass}>Two-Factor Authentication</Title>
//                 <Text className={textMutedClass}>Add an extra layer of security to your account</Text>
//               </div>
//               <Switch
//                 checked={twoFactorEnabled}
//                 onChange={setTwoFactorEnabled}
//                 checkedChildren="ON"
//                 unCheckedChildren="OFF"
//               />
//             </div>
//           </Card>

//           {/* Login History Table */}
//           <Card title="Recent Login History" className="mb-6">
//             {loginHistory && loginHistory.length > 0 ? (
//               <Table
//                 dataSource={loginHistory}
//                 columns={[
//                   {
//                     title: 'Device',
//                     dataIndex: 'device',
//                     key: 'device',
//                     render: (text) => <Text className={textColorClass}>{text}</Text>
//                   },
//                   {
//                     title: 'Location',
//                     dataIndex: 'location',
//                     key: 'location',
//                     render: (text) => <Text className={textMutedClass}>{text}</Text>
//                   },
//                   {
//                     title: 'IP Address',
//                     dataIndex: 'ip',
//                     key: 'ip',
//                     render: (text) => <Tag color="blue">{text}</Tag>
//                   },
//                   {
//                     title: 'Time',
//                     dataIndex: 'time',
//                     key: 'time',
//                     render: (text) => (
//                       <Tooltip title={dayjs(text).format('DD MMM YYYY HH:mm:ss')}>
//                         <Text className={textMutedClass}>{dayjs(text).fromNow()}</Text>
//                       </Tooltip>
//                     )
//                   },
//                   {
//                     title: 'Status',
//                     dataIndex: 'status',
//                     key: 'status',
//                     render: (text) => (
//                       <Badge
//                         status={text === 'success' ? 'success' : 'error'}
//                         text={text.charAt(0).toUpperCase() + text.slice(1)}
//                       />
//                     )
//                   }
//                 ]}
//                 pagination={{ pageSize: 5 }}
//                 size="small"
//                 scroll={{ x: true }}
//               />
//             ) : (
//               <Empty description="No login history available" />
//             )}
//           </Card>

//           {/* Active Sessions */}
//           <Card title="Active Sessions">
//             <List
//               dataSource={[
//                 { device: 'Chrome on Windows', location: 'Dhaka, BD', lastActive: '2 minutes ago' },
//                 { device: 'Safari on iPhone', location: 'Chittagong, BD', lastActive: '1 hour ago' },
//               ]}
//               renderItem={(item) => (
//                 <List.Item
//                   actions={[
//                     <Popconfirm
//                       title="Terminate this session?"
//                       onConfirm={() => message.success('Session terminated')}
//                       okText="Yes"
//                       cancelText="No"
//                     >
//                       <Button type="link" danger size="small">Terminate</Button>
//                     </Popconfirm>
//                   ]}
//                 >
//                   <List.Item.Meta
//                     avatar={<Avatar icon={<TabletOutlined />} />}
//                     title={<Text className={textColorClass}>{item.device}</Text>}
//                     description={
//                       <Space direction="vertical" size={0}>
//                         <Text type="secondary">{item.location}</Text>
//                         <Text type="secondary">Last active: {item.lastActive}</Text>
//                       </Space>
//                     }
//                   />
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </Card>
//       ),
//     },
//     {
//       key: "documents",
//       label: (
//         <Space>
//           <FileProtectOutlined />
//           Documents
//         </Space>
//       ),
//       children: (
//         <Card className={cardClassName}>
//           <Title level={4} className={textColorClass}>My Documents</Title>
//           <Empty description="No documents uploaded yet" />
//         </Card>
//       ),
//     },
//   ];

//   // Loading state
//   if (loading && !user) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Space direction="vertical" align="center">
//           <Spin size="large" />
//           <Text type="secondary">Loading your profile...</Text>
//         </Space>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Header */}
//       <div className={`sticky top-0 z-50 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//         <div className="px-4 py-3 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             {screens.xs && (
//               <Dropdown overlay={mobileMenu} trigger={['click']}>
//                 <Button type="text" icon={<MenuOutlined />} />
//               </Dropdown>
//             )}
//             <Title level={4} className={`!mb-0 ${textColorClass}`}>
//               Admin Dashboard
//             </Title>
//           </div>

//           <Space>
//             <Tooltip title="Refresh">
//               <Button
//                 icon={<ReloadOutlined spin={refreshing} />}
//                 onClick={loadData}
//                 loading={refreshing}
//               />
//             </Tooltip>
//             <Tooltip title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}>
//               <Button
//                 icon={fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
//                 onClick={() => setFullscreen(!fullscreen)}
//               />
//             </Tooltip>
//             <Button
//               icon={<BellOutlined />}
//               shape="circle"
//             />
//             <Button
//               icon={<LogoutOutlined />}
//               onClick={() => {
//                 localStorage.removeItem('token');
//                 navigate('/login');
//               }}
//               danger
//             >
//               {!screens.xs && "Logout"}
//             </Button>
//           </Space>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-4 max-w-7xl mx-auto">
//         {/* Welcome Banner */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-6"
//         >
//           <Card className={`${cardClassName} bg-gradient-to-r from-blue-500 to-purple-600 text-white`}>
//             <Row align="middle" justify="space-between">
//               <Col xs={24} md={16}>
//                 <Title level={3} className="!mb-2 !text-white">
//                   Welcome back, {user?.firstName}!
//                 </Title>
//                 <Text className="text-blue-100">
//                   {user?.role === 'admin' ? 'Administrator Dashboard' : 'User Profile'}
//                 </Text>
//                 <div className="mt-4">
//                   <Tag color="white" className="text-blue-600 font-semibold">
//                     {user?.membershipId || 'No ID'}
//                   </Tag>
//                   <Tag color="white" className="text-blue-600 font-semibold ml-2">
//                     {user?.committeePosition || 'Member'}
//                   </Tag>
//                 </div>
//               </Col>
//               <Col xs={24} md={8} className="text-right">
//                 <Avatar size={80} src={displayImage} className="border-4 border-white shadow-lg" />
//               </Col>
//             </Row>
//           </Card>
//         </motion.div>

//         {/* Profile Completeness Alert */}
//         {profileCompleteness < 100 && (
//           <Alert
//             message="Complete Your Profile"
//             description={`Your profile is ${profileCompleteness}% complete. Complete all fields to unlock full features.`}
//             type="warning"
//             showIcon
//             action={
//               <Button size="small" type="primary" onClick={() => setEditMode(true)}>
//                 Complete Now
//               </Button>
//             }
//             className="mb-6"
//             closable
//           />
//         )}

//         {/* Stats Cards */}
//         <Row gutter={[16, 16]} className="mb-6">
//           {profileStats.map((stat, index) => (
//             <Col xs={24} sm={12} lg={6} key={index}>
//               <motion.div
//                 whileHover={{ scale: 1.02, y: -2 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//               >
//                 <Card className={cardClassName}>
//                   <div className="flex items-center justify-between mb-3">
//                     <div
//                       className="p-2 rounded-lg"
//                       style={{ backgroundColor: `${stat.color}20` }}
//                     >
//                       {stat.icon}
//                     </div>
//                     {stat.progress && (
//                       <Progress
//                         percent={stat.value}
//                         size="small"
//                         strokeColor={stat.color}
//                         showInfo={false}
//                         style={{ width: 60 }}
//                       />
//                     )}
//                   </div>
//                   <Statistic
//                     value={stat.value}
//                     suffix={stat.suffix}
//                     valueStyle={{ color: stat.color, fontSize: '24px' }}
//                   />
//                   <div className={`text-sm ${textMutedClass} mt-1`}>
//                     {stat.title}
//                   </div>
//                 </Card>
//               </motion.div>
//             </Col>
//           ))}
//         </Row>

//         {/* Main Tabs */}
//         <Tabs
//           activeKey={activeTab}
//           onChange={setActiveTab}
//           type="card"
//           items={tabItems}
//           size="large"
//           className="rounded-lg"
//           tabBarStyle={{ marginBottom: 0 }}
//         />

//         {/* Floating Actions */}
//         <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
//           <FloatButton
//             icon={<QrcodeOutlined />}
//             tooltip="QR Code"
//             onClick={() => setQrModalVisible(true)}
//           />
//           <FloatButton
//             icon={<EditOutlined />}
//             tooltip="Edit Profile"
//             onClick={() => setEditMode(true)}
//           />
//           <FloatButton
//             icon={<SettingOutlined />}
//             tooltip="Settings"
//             onClick={() => setActiveTab('security')}
//           />
//           <FloatButton.BackTop visibilityHeight={100} />
//         </FloatButton.Group>
//       </div>

//       {/* Change Password Modal */}
//       <Modal
//         title="Change Password"
//         open={securityModalVisible}
//         onCancel={() => setSecurityModalVisible(false)}
//         footer={null}
//         centered
//         destroyOnClose
//       >
//         <Form
//           layout="vertical"
//           form={passwordForm}
//           onFinish={handlePasswordChange}
//           size="large"
//         >
//           <Form.Item
//             name="currentPassword"
//             label="Current Password"
//             rules={[{ required: true, message: "Please enter current password" }]}
//           >
//             <Password
//               placeholder="Enter current password"
//               iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
//             />
//           </Form.Item>

//           <Form.Item
//             name="newPassword"
//             label="New Password"
//             rules={[
//               { required: true, message: "Please enter new password" },
//               { min: 8, message: "Minimum 8 characters" }
//             ]}
//           >
//             <Password
//               placeholder="Enter new password"
//               iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
//             />
//           </Form.Item>

//           <Form.Item
//             name="confirmPassword"
//             label="Confirm Password"
//             dependencies={['newPassword']}
//             rules={[
//               { required: true, message: "Please confirm password" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('newPassword') === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error('Passwords do not match'));
//                 },
//               }),
//             ]}
//           >
//             <Password
//               placeholder="Confirm new password"
//               iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
//             />
//           </Form.Item>

//           <div className="flex justify-end space-x-3">
//             <Button onClick={() => setSecurityModalVisible(false)}>
//               Cancel
//             </Button>
//             <Button type="primary" htmlType="submit" loading={changingPassword}>
//               Update Password
//             </Button>
//           </div>
//         </Form>
//       </Modal>

//       {/* QR Code Modal */}
//       <Modal
//         title="Profile QR Code"
//         open={qrModalVisible}
//         onCancel={() => setQrModalVisible(false)}
//         footer={[
//           <Button key="download" icon={<DownloadOutlined />}>
//             Download QR
//           </Button>,
//           <Button key="close" type="primary" onClick={() => setQrModalVisible(false)}>
//             Close
//           </Button>,
//         ]}
//         centered
//       >
//         <div className="text-center space-y-4">
//           <QRCode
//             value={`${window.location.origin}/profile/${user?.membershipId || user?.id}`}
//             size={200}
//             iconSize={40}
//             errorLevel="H"
//           />
//           <div>
//             <Text strong className="block">{user?.firstName} {user?.lastName}</Text>
//             <Text type="secondary" className="block">{user?.email}</Text>
//             <div className="mt-2">
//               {getRoleTag()}
//               {user?.membershipId && (
//                 <Tag color="green" className="ml-2">
//                   ID: {user.membershipId}
//                 </Tag>
//               )}
//             </div>
//           </div>
//         </div>
//       </Modal>

//       {/* Mobile Drawer */}
//       <Drawer
//         title="Navigation"
//         placement="left"
//         onClose={() => setDrawerVisible(false)}
//         open={drawerVisible}
//         width={250}
//       >
//         <Menu
//           mode="inline"
//           items={[
//             { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
//             { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
//             { key: 'documents', icon: <FileTextOutlined />, label: 'Documents' },
//             { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
//             { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true },
//           ]}
//         />
//       </Drawer>
//     </div>
//   );
// };

// export default AdminDashboard;

////////////////////////Top///////////////////////////////////

// import { useState, useEffect } from "react";
// import {
//   Card,
//   Form,
//   Input,
//   Button,
//   Upload,
//   Avatar,
//   message,
//   Divider,
//   Row,
//   Col,
//   Typography,
//   Tag,
//   Select,
//   DatePicker,
//   Tabs,
//   Descriptions,
//   Space,
//   Spin,
//   Modal,
//   Progress,
//   List,
//   Badge,
//   Tooltip,
//   Alert,
//   Statistic,
//   Timeline,
//   QRCode,
//   Table,
//   Dropdown,
//   Menu,
//   Grid,
//   Drawer,
//   Switch,
//   Empty,
//   Popconfirm,
//   Segmented,
//   FloatButton,
//   Steps,
//   Slider,
//   Rate,
//   theme,
// } from "antd";
// import {
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined,
//   CameraOutlined,
//   SaveOutlined,
//   EditOutlined,
//   LockOutlined,
//   TeamOutlined,
//   CalendarOutlined,
//   IdcardOutlined,
//   SafetyCertificateOutlined,
//   EyeOutlined,
//   EyeInvisibleOutlined,
//   QrcodeOutlined,
//   HistoryOutlined,
//   SecurityScanOutlined,
//   DownloadOutlined,
//   CheckCircleOutlined,
//   ExclamationCircleOutlined,
//   TabletOutlined,
//   CrownOutlined,
//   TrophyOutlined,
//   StarOutlined,
//   SettingOutlined,
//   BellOutlined,
//   LogoutOutlined,
//   DashboardOutlined,
//   FileTextOutlined,
//   DatabaseOutlined,
//   LineChartOutlined,
//   AppstoreOutlined,
//   MenuOutlined,
//   FullscreenOutlined,
//   FullscreenExitOutlined,
//   ReloadOutlined,
//   InfoCircleOutlined,
//   ClockCircleOutlined,
//   GlobalOutlined,
//   WalletOutlined,
//   CreditCardOutlined,
//   FileProtectOutlined,
//   AuditOutlined,
//   KeyOutlined,
//   BarChartOutlined,
//   PieChartOutlined,
//   RiseOutlined,
//   FallOutlined,
//   LikeOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   ApiOutlined,
//   SafetyOutlined,
//   FireOutlined,
//   BarsOutlined,
//   SunOutlined,
//   MoonOutlined,
//   CloseCircleOutlined,
//   LayoutOutlined,
// } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUserProfile,
//   updateUserProfile,
//   uploadProfilePhoto,
//   changePassword,
//   fetchLoginHistory,
//   fetchRecentActivity,
//   clearError,
//   clearSuccess,
//   selectUser,
//   selectLoginHistory,
//   selectRecentActivity,
//   selectProfileLoading,
//   selectProfileUpdating,
//   selectProfileUploading,
//   selectChangingPassword,
//   selectProfileError,
//   selectProfileSuccess,
//   selectProfileCompleteness,
// } from "../slices/profileSlice";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Line, Pie, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title as ChartTitle,
//   Legend,
//   Filler,
// } from "chart.js";
// import './admin.css';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   ChartTitle,
//   Legend,
//   Filler
// );

// dayjs.extend(relativeTime);

// const { Title, Text, Paragraph } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { Password } = Input;
// const { useBreakpoint } = Grid;
// const { useToken } = theme;
// const { Step } = Steps;

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const screens = useBreakpoint();
//   const { token } = useToken();
//   const isMobile = !screens.md;
//   const isTablet = !screens.lg;

//   // Redux state selectors
//   const user = useSelector(selectUser);
//   const loginHistory = useSelector(selectLoginHistory);
//   const recentActivity = useSelector(selectRecentActivity);
//   const loading = useSelector(selectProfileLoading);
//   const updating = useSelector(selectProfileUpdating);
//   const uploading = useSelector(selectProfileUploading);
//   const changingPassword = useSelector(selectChangingPassword);
//   const error = useSelector(selectProfileError);
//   const success = useSelector(selectProfileSuccess);
//   const profileCompleteness = useSelector(selectProfileCompleteness);

//   const currentTheme = useSelector(
//     (state) => state.theme?.currentTheme || "light"
//   );

//   // Local state
//   const [form] = Form.useForm();
//   const [passwordForm] = Form.useForm();
//   const [editMode, setEditMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [securityModalVisible, setSecurityModalVisible] = useState(false);
//   const [qrModalVisible, setQrModalVisible] = useState(false);
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [darkMode, setDarkMode] = useState(currentTheme === "dark");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [chartData, setChartData] = useState(null);
//   const [performanceScore, setPerformanceScore] = useState(85);
//   const [quickActionsVisible, setQuickActionsVisible] = useState(true);

//   // Fetch data on component mount
//   useEffect(() => {
//     loadData();
//     initializeMockData();
//   }, [dispatch]);

//   const loadData = async () => {
//     setRefreshing(true);
//     await Promise.all([
//       dispatch(fetchUserProfile()),
//       dispatch(fetchLoginHistory()),
//       dispatch(fetchRecentActivity()),
//     ]);
//     setTimeout(() => setRefreshing(false), 500);
//   };

//   // Initialize mock data for charts and stats
//   const initializeMockData = () => {
//     setChartData({
//       activity: {
//         labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//         datasets: [
//           {
//             label: "Activities",
//             data: [12, 19, 15, 25, 22, 30, 18],
//             borderColor: token.colorPrimary,
//             backgroundColor: `${token.colorPrimary}20`,
//             fill: true,
//             tension: 0.4,
//           },
//         ],
//       },
//       performance: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//         datasets: [
//           {
//             label: "Performance",
//             data: [65, 78, 82, 75, 88, 92],
//             borderColor: token.colorSuccess,
//             backgroundColor: `${token.colorSuccess}20`,
//             fill: true,
//           },
//         ],
//       },
//       distribution: {
//         labels: ["Active", "Inactive", "Pending", "Suspended"],
//         datasets: [
//           {
//             data: [70, 15, 10, 5],
//             backgroundColor: [
//               token.colorSuccess,
//               token.colorWarning,
//               token.colorInfo,
//               token.colorError,
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//     });

//     setNotifications([
//       { id: 1, title: "New member registered", time: "2 min ago", read: false, type: "success" },
//       { id: 2, title: "System maintenance scheduled", time: "1 hour ago", read: false, type: "warning" },
//       { id: 3, title: "Password change detected", time: "3 hours ago", read: true, type: "info" },
//       { id: 4, title: "Profile update successful", time: "1 day ago", read: true, type: "success" },
//     ]);
//   };

//   // Set form values when user data is available
//   useEffect(() => {
//     if (user) {
//       form.setFieldsValue({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || user.telephone || "",
//         address: user.addressDisplay || user.address || "",
//         dob: user.dob ? dayjs(user.dob) : null,
//         gender: user.gender || "",
//         nidNumber: user.nidNumber || "",
//         joinDate: user.joinDate ? dayjs(user.joinDate) : null,
//         division: user.division || "",
//         district: user.district || "",
//         committeePosition: user.committeePosition || "",
//         bio: user.bio || "",
//         website: user.website || "",
//       });
//     }
//   }, [user, form]);

//   // Handle error messages
//   useEffect(() => {
//     if (error) {
//       message.error({
//         content: error,
//         duration: 4,
//         style: {
//           marginTop: '4rem',
//         },
//       });
//       setTimeout(() => dispatch(clearError()), 4000);
//     }
//   }, [error, dispatch]);

//   // Handle success messages
//   useEffect(() => {
//     if (success) {
//       message.success({
//         content: success,
//         duration: 3,
//         style: {
//           marginTop: '4rem',
//         },
//       });
//       setTimeout(() => dispatch(clearSuccess()), 3000);
//     }
//   }, [success, dispatch]);

//   // Handle save with validation
//   const handleSave = async (values) => {
//     try {
//       const updatedData = {
//         firstName: values.firstName?.trim(),
//         lastName: values.lastName?.trim(),
//         email: values.email?.trim(),
//         phone: values.phone?.trim(),
//         address: values.address || "",
//         dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
//         gender: values.gender,
//         nidNumber: values.nidNumber?.trim(),
//         joinDate: values.joinDate ? values.joinDate.format("YYYY-MM-DD") : null,
//         division: values.division?.trim(),
//         district: values.district?.trim(),
//         committeePosition: values.committeePosition,
//         bio: values.bio?.trim(),
//         website: values.website?.trim(),
//       };

//       await dispatch(updateUserProfile(updatedData)).unwrap();
//       setEditMode(false);
//       message.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Update failed:", error);
//       message.error(error || "Failed to update profile");
//     }
//   };

//   // Handle cancel edit
//   const handleCancel = () => {
//     form.resetFields();
//     setEditMode(false);
//     if (user) {
//       form.setFieldsValue({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || user.telephone || "",
//         address: user.addressDisplay || "",
//         dob: user.dob ? dayjs(user.dob) : null,
//         gender: user.gender || "",
//         nidNumber: user.nidNumber || "",
//         joinDate: user.joinDate ? dayjs(user.joinDate) : null,
//         division: user.division || "",
//         district: user.district || "",
//         committeePosition: user.committeePosition || "",
//       });
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = async (file) => {
//     const isImage = file.type.startsWith("image/");
//     if (!isImage) {
//       message.error("You can only upload image files!");
//       return false;
//     }

//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error("Image must be smaller than 2MB!");
//       return false;
//     }

//     try {
//       await dispatch(uploadProfilePhoto(file)).unwrap();
//       message.success("Profile photo updated!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }

//     return false;
//   };

//   // Handle password change
//   const handlePasswordChange = async (values) => {
//     try {
//       await dispatch(changePassword(values)).unwrap();
//       setSecurityModalVisible(false);
//       passwordForm.resetFields();
//       message.success("Password changed successfully!");
//     } catch (error) {
//       console.error("Failed to change password:", error);
//     }
//   };

//   // Enhanced status tag with badges
//   const getStatusTag = (status) => {
//     const statusConfig = {
//       active: {
//         color: "success",
//         text: "Active",
//         icon: <CheckCircleOutlined />,
//         variant: "success"
//       },
//       pending: {
//         color: "warning",
//         text: "Pending",
//         icon: <ExclamationCircleOutlined />,
//         variant: "warning"
//       },
//       suspended: {
//         color: "error",
//         text: "Suspended",
//         icon: <ExclamationCircleOutlined />,
//         variant: "error"
//       },
//       inactive: {
//         color: "default",
//         text: "Inactive",
//         icon: <ExclamationCircleOutlined />,
//         variant: "default"
//       },
//       approved: {
//         color: "success",
//         text: "Approved",
//         icon: <CheckCircleOutlined />,
//         variant: "success"
//       },
//       waiting: {
//         color: "processing",
//         text: "Waiting",
//         icon: <ClockCircleOutlined />,
//         variant: "processing"
//       },
//       rejected: {
//         color: "error",
//         text: "Rejected",
//         icon: <CloseCircleOutlined />,
//         variant: "error"
//       },
//     };

//     const userStatus = status || user?.status || "active";
//     const config = statusConfig[userStatus] || {
//       color: "blue",
//       text: userStatus,
//       icon: <UserOutlined />,
//       variant: "default"
//     };

//     return (
//       <Badge
//         status={config.variant}
//         text={
//           <Tag
//             icon={config.icon}
//             color={config.color}
//             className="flex items-center gap-2 px-3 py-1 rounded-full font-medium shadow-sm"
//           >
//             {config.text}
//           </Tag>
//         }
//       />
//     );
//   };

//   // Enhanced role tag with gradient
//   const getRoleTag = (role) => {
//     const roleConfig = {
//       admin: {
//         color: "red",
//         text: "Admin",
//         icon: <CrownOutlined />,
//         gradient: "from-red-500 to-pink-600"
//       },
//       hr: {
//         color: "purple",
//         text: "HR Manager",
//         icon: <TeamOutlined />,
//         gradient: "from-purple-500 to-indigo-600"
//       },
//       employee: {
//         color: "blue",
//         text: "Employee",
//         icon: <UserOutlined />,
//         gradient: "from-blue-500 to-cyan-600"
//       },
//       member: {
//         color: "green",
//         text: "Member",
//         icon: <UserOutlined />,
//         gradient: "from-green-500 to-emerald-600"
//       },
//       superadmin: {
//         color: "volcano",
//         text: "Super Admin",
//         icon: <CrownOutlined />,
//         gradient: "from-orange-500 to-red-600"
//       },
//       manager: {
//         color: "gold",
//         text: "Manager",
//         icon: <TeamOutlined />,
//         gradient: "from-yellow-500 to-amber-600"
//       },
//       executive: {
//         color: "cyan",
//         text: "Executive",
//         icon: <UserOutlined />,
//         gradient: "from-cyan-500 to-sky-600"
//       },
//       "plot-owner": {
//         color: "lime",
//         text: "Plot Owner",
//         icon: <EnvironmentOutlined />,
//         gradient: "from-lime-500 to-green-600"
//       },
//     };

//     const userRole = role || user?.role || "member";
//     const config = roleConfig[userRole?.toLowerCase()] || {
//       color: "default",
//       text: userRole,
//       icon: <UserOutlined />,
//       gradient: "from-gray-500 to-slate-600"
//     };

//     return (
//       <Tag
//         icon={config.icon}
//         color={config.color}
//         className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium bg-gradient-to-r ${config.gradient} text-white border-0 shadow-sm`}
//       >
//         {config.text}
//       </Tag>
//     );
//   };

//   // Security items
//   const securityItems = [
//     {
//       title: "Change Password",
//       description: "Update your login password",
//       icon: <KeyOutlined className="text-blue-500 text-lg" />,
//       action: () => setSecurityModalVisible(true),
//       status: "active",
//       color: "blue",
//       priority: "high",
//     },
//     {
//       title: "Two-Factor Auth",
//       description: "Extra security layer",
//       icon: <SecurityScanOutlined className="text-green-500 text-lg" />,
//       action: () => setTwoFactorEnabled(!twoFactorEnabled),
//       status: twoFactorEnabled ? "enabled" : "disabled",
//       color: "green",
//       priority: "high",
//     },
//     {
//       title: "Login History",
//       description: "Recent login activities",
//       icon: <HistoryOutlined className="text-orange-500 text-lg" />,
//       action: () => setActiveTab("security"),
//       status: `${loginHistory?.length || 0} records`,
//       color: "orange",
//       priority: "medium",
//     },
//     {
//       title: "Session Management",
//       description: "Manage active sessions",
//       icon: <AuditOutlined className="text-purple-500 text-lg" />,
//       action: () => message.info("Coming soon!"),
//       status: "manage",
//       color: "purple",
//       priority: "medium",
//     },
//   ];

//   // Dashboard statistics
//   const dashboardStats = [
//     {
//       title: "Total Members",
//       value: "1,254",
//       change: "+12%",
//       icon: <TeamOutlined />,
//       color: token.colorPrimary,
//       trend: "up",
//       description: "From last month"
//     },
//     {
//       title: "Active Users",
//       value: "892",
//       change: "+8%",
//       icon: <UserOutlined />,
//       color: token.colorSuccess,
//       trend: "up",
//       description: "Currently online"
//     },
//     {
//       title: "Pending Approvals",
//       value: "23",
//       change: "-5%",
//       icon: <FileTextOutlined />,
//       color: token.colorWarning,
//       trend: "down",
//       description: "Awaiting review"
//     },
//     {
//       title: "Revenue",
//       value: "$12,450",
//       change: "+15%",
//       icon: <WalletOutlined />,
//       color: token.colorPurple,
//       trend: "up",
//       description: "This month"
//     },
//   ];

//   // Profile stats
//   const profileStats = [
//     {
//       title: "Profile Complete",
//       value: profileCompleteness || 0,
//       suffix: "%",
//       color: profileCompleteness === 100 ? token.colorSuccess : profileCompleteness >= 70 ? token.colorPrimary : token.colorWarning,
//       icon: <UserOutlined />,
//       progress: true,
//     },
//     {
//       title: "Account Age",
//       value: user?.createdAt ? dayjs().diff(dayjs(user.createdAt), "day") : 0,
//       suffix: " days",
//       color: token.colorPurple,
//       icon: <CalendarOutlined />,
//     },
//     {
//       title: "Activities",
//       value: recentActivity?.length || 0,
//       suffix: " this month",
//       color: token.colorCyan,
//       icon: <StarOutlined />,
//     },
//     {
//       title: "Last Login",
//       value: user?.lastLogin ? dayjs(user.lastLogin).fromNow() : "Never",
//       color: token.colorOrange,
//       icon: <ClockCircleOutlined />,
//     },
//   ];

//   // Theme settings
//   const isDark = darkMode;
//   const cardClassName = `border-0 shadow-xl rounded-2xl transition-all duration-300 ${
//     isDark ? "bg-gray-800/90 text-white backdrop-blur-sm" : "bg-white/90 text-gray-900 backdrop-blur-sm"
//   } hover:shadow-2xl hover:-translate-y-1`;

//   const textColorClass = isDark ? "text-gray-100" : "text-gray-800";
//   const textMutedClass = isDark ? "text-gray-400" : "text-gray-600";
//   const borderColorClass = isDark ? "border-gray-700/50" : "border-gray-200/50";
//   const bgHoverClass = isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50/80";
//   const gradientBg = isDark
//     ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
//     : "bg-gradient-to-br from-blue-50 via-white to-purple-50";

//   // Get display image
//   const displayImage = user?.profilePhoto || user?.image || user?.profilePicture;

//   // Quick actions
//   const quickActions = [
//     { icon: <EditOutlined />, label: "Edit Profile", action: () => setEditMode(true), color: token.colorPrimary },
//     { icon: <QrcodeOutlined />, label: "QR Code", action: () => setQrModalVisible(true), color: token.colorGreen },
//     { icon: <DownloadOutlined />, label: "Export Data", action: () => message.info('Export feature coming soon!'), color: token.colorBlue },
//     { icon: <SettingOutlined />, label: "Settings", action: () => setActiveTab('security'), color: token.colorOrange },
//   ];

//   // Loading state
//   if (loading && !user) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//         >
//           <DashboardOutlined className="text-6xl text-blue-500" />
//         </motion.div>
//         <Text type="secondary" className="mt-4 text-lg">
//           Loading your dashboard...
//         </Text>
//         <Progress percent={30} status="active" className="w-64 mt-4" />
//       </div>
//     );
//   }

//   // Dashboard Tab Component
//   const DashboardTab = () => {
//     return (
//       <div className="space-y-6">
//         {/* Stats Grid */}
//         <Row gutter={[16, 16]}>
//           {dashboardStats.map((stat, index) => (
//             <Col xs={24} sm={12} lg={6} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
//               >
//                 <Card className={`${cardClassName} border-l-4`} style={{ borderLeftColor: stat.color }}>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className={`text-sm ${textMutedClass} font-medium mb-1`}>
//                         {stat.title}
//                       </div>
//                       <div className={`text-2xl font-bold ${textColorClass} mb-1`}>
//                         {stat.value}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span style={{
//                           color: stat.trend === 'up' ? token.colorSuccess : token.colorError,
//                           fontSize: '12px'
//                         }}>
//                           {stat.trend === 'up' ? <RiseOutlined /> : <FallOutlined />}
//                           {stat.change}
//                         </span>
//                         <span className={`text-xs ${textMutedClass}`}>
//                           {stat.description}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="p-3 rounded-full" style={{
//                       backgroundColor: `${stat.color}20`,
//                       color: stat.color
//                     }}>
//                       {stat.icon}
//                     </div>
//                   </div>
//                 </Card>
//               </motion.div>
//             </Col>
//           ))}
//         </Row>

//         {/* Charts Row */}
//         <Row gutter={[16, 16]}>
//           <Col xs={24} lg={16}>
//             <Card
//               className={cardClassName}
//               title={
//                 <div className="flex items-center justify-between">
//                   <span className={textColorClass}>Activity Overview</span>
//                   <Select size="small" defaultValue="week" className="w-32">
//                     <Option value="week">This Week</Option>
//                     <Option value="month">This Month</Option>
//                     <Option value="year">This Year</Option>
//                   </Select>
//                 </div>
//               }
//             >
//               {chartData && (
//                 <div className="h-64">
//                   <Line
//                     data={chartData.activity}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: { display: false },
//                       },
//                       scales: {
//                         y: {
//                           beginAtZero: true,
//                           grid: { color: isDark ? '#374151' : '#e5e7eb' }
//                         },
//                         x: {
//                           grid: { color: isDark ? '#374151' : '#e5e7eb' }
//                         }
//                       },
//                       interaction: {
//                         intersect: false,
//                         mode: 'index'
//                       }
//                     }}
//                   />
//                 </div>
//               )}
//             </Card>
//           </Col>
//           <Col xs={24} lg={8}>
//             <Card
//               className={cardClassName}
//               title={<span className={textColorClass}>User Distribution</span>}
//             >
//               {chartData && (
//                 <div className="h-64">
//                   <Doughnut
//                     data={chartData.distribution}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: { position: 'bottom' }
//                       }
//                     }}
//                   />
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>

//         {/* Recent Activity & Quick Stats */}
//         <Row gutter={[16, 16]}>
//           <Col xs={24} lg={16}>
//             <Card
//               className={cardClassName}
//               title={<span className={textColorClass}>Recent Activity</span>}
//               extra={<Button type="link" size="small">View All</Button>}
//             >
//               {recentActivity && recentActivity.length > 0 ? (
//                 <Timeline mode="alternate">
//                   {recentActivity.slice(0, 5).map((activity, index) => (
//                     <Timeline.Item
//                       key={index}
//                       color={index === 0 ? token.colorPrimary : token.colorBlue}
//                       dot={index === 0 ? <FireOutlined /> : <ClockCircleOutlined />}
//                     >
//                       <Card size="small" className={`mb-2 ${bgHoverClass}`}>
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <div className={`font-semibold ${textColorClass}`}>
//                               {activity.action}
//                             </div>
//                             <div className={`text-sm ${textMutedClass}`}>
//                               {activity.description}
//                             </div>
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {dayjs(activity.time).fromNow()}
//                           </div>
//                         </div>
//                       </Card>
//                     </Timeline.Item>
//                   ))}
//                 </Timeline>
//               ) : (
//                 <Empty description="No recent activity" />
//               )}
//             </Card>
//           </Col>
//           <Col xs={24} lg={8}>
//             <Card
//               className={cardClassName}
//               title={<span className={textColorClass}>Quick Stats</span>}
//             >
//               <Space direction="vertical" className="w-full">
//                 {profileStats.map((stat, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <Space>
//                       <div style={{ color: stat.color }}>{stat.icon}</div>
//                       <div>
//                         <div className={`font-medium ${textColorClass}`}>{stat.title}</div>
//                         <div className={`text-xs ${textMutedClass}`}>Updated today</div>
//                       </div>
//                     </Space>
//                     <div className="text-right">
//                       <div className={`font-bold ${textColorClass}`}>
//                         {stat.value}{stat.suffix}
//                       </div>
//                       {stat.progress && (
//                         <Progress
//                           percent={stat.value}
//                           size="small"
//                           strokeColor={stat.color}
//                           showInfo={false}
//                           className="mt-1"
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </Space>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     );
//   };

//   // Personal Tab Component
//   const PersonalTab = () => {
//     const EditProfileForm = () => {
//       return (
//         <motion.div
//           key="edit-form"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -20 }}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleSave}
//             disabled={updating}
//             size="large"
//           >
//             <Steps
//               current={0}
//               items={[
//                 { title: 'Basic Info' },
//                 { title: 'Contact' },
//                 { title: 'Professional' },
//                 { title: 'Additional' },
//               ]}
//               className="mb-8"
//             />

//             <Row gutter={16}>
//               <Col xs={24} md={12}>
//                 <Form.Item
//                   name="firstName"
//                   label="First Name"
//                   rules={[{ required: true, message: "First name is required" }]}
//                 >
//                   <Input
//                     prefix={<UserOutlined />}
//                     placeholder="John"
//                     size="large"
//                     className="rounded-lg"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} md={12}>
//                 <Form.Item
//                   name="lastName"
//                   label="Last Name"
//                   rules={[{ required: true, message: "Last name is required" }]}
//                 >
//                   <Input
//                     prefix={<UserOutlined />}
//                     placeholder="Doe"
//                     size="large"
//                     className="rounded-lg"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col xs={24} md={12}>
//                 <Form.Item
//                   name="email"
//                   label="Email"
//                   rules={[
//                     { required: true, message: "Email is required" },
//                     { type: "email", message: "Invalid email" }
//                   ]}
//                 >
//                   <Input
//                     prefix={<MailOutlined />}
//                     disabled
//                     size="large"
//                     className="rounded-lg"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} md={12}>
//                 <Form.Item
//                   name="phone"
//                   label="Phone"
//                   rules={[
//                     { pattern: /^[+]?[0-9\s\-()]+$/, message: "Invalid phone number" }
//                   ]}
//                 >
//                   <Input
//                     prefix={<PhoneOutlined />}
//                     placeholder="+880 1XXX XXXXXX"
//                     size="large"
//                     className="rounded-lg"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item name="address" label="Address">
//               <TextArea
//                 rows={2}
//                 placeholder="Enter your address"
//                 size="large"
//                 className="rounded-lg"
//                 showCount
//                 maxLength={200}
//               />
//             </Form.Item>

//             <Row gutter={16}>
//               <Col xs={24} md={8}>
//                 <Form.Item name="dob" label="Date of Birth">
//                   <DatePicker
//                     className="w-full rounded-lg"
//                     format="YYYY-MM-DD"
//                     size="large"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} md={8}>
//                 <Form.Item name="gender" label="Gender">
//                   <Select
//                     placeholder="Select gender"
//                     size="large"
//                     className="rounded-lg"
//                   >
//                     <Option value="male">Male</Option>
//                     <Option value="female">Female</Option>
//                     <Option value="other">Other</Option>
//                     <Option value="prefer-not-to-say">Prefer not to say</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col xs={24} md={8}>
//                 <Form.Item name="nidNumber" label="NID Number">
//                   <Input
//                     placeholder="Enter NID"
//                     size="large"
//                     className="rounded-lg"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col xs={24} md={8}>
//                 <Form.Item name="joinDate" label="Join Date">
//                   <DatePicker
//                     className="w-full rounded-lg"
//                     format="YYYY-MM-DD"
//                     size="large"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} md={8}>
//                 <Form.Item name="division" label="Division">
//                   <Input
//                     placeholder="Enter division"
//                     size="large"
//                     className="rounded-lg"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} md={8}>
//                 <Form.Item name="district" label="District">
//                   <Input
//                     placeholder="Enter district"
//                     size="large"
//                     className="rounded-lg"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item name="committeePosition" label="Committee Position">
//               <Select
//                 placeholder="Select position"
//                 size="large"
//                 className="rounded-lg"
//               >
//                 <Option value="President">President</Option>
//                 <Option value="General Secretary">General Secretary</Option>
//                 <Option value="Member">Member</Option>
//                 <Option value="Executive Member">Executive Member</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item name="bio" label="Bio">
//               <TextArea
//                 rows={3}
//                 placeholder="Tell us about yourself"
//                 size="large"
//                 className="rounded-lg"
//                 showCount
//                 maxLength={500}
//               />
//             </Form.Item>

//             <Divider />

//             <div className="flex justify-end space-x-3">
//               <Button
//                 onClick={handleCancel}
//                 disabled={updating}
//                 size="large"
//                 className="rounded-lg"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={updating}
//                 icon={<SaveOutlined />}
//                 size="large"
//                 className="rounded-lg shadow-lg"
//               >
//                 Save Changes
//               </Button>
//             </div>
//           </Form>
//         </motion.div>
//       );
//     };

//     const ProfileView = () => {
//       return (
//         <motion.div
//           key="view-mode"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 20 }}
//         >
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//             <div>
//               <Title level={3} className={textColorClass}>Personal Information</Title>
//               <Text className={textMutedClass}>View and manage your profile details</Text>
//             </div>
//             <Button
//               type="primary"
//               icon={<EditOutlined />}
//               onClick={() => setEditMode(true)}
//               size="large"
//               className="rounded-lg shadow-lg"
//             >
//               Edit Profile
//             </Button>
//           </div>

//           <Descriptions
//             column={{ xs: 1, sm: 2 }}
//             bordered
//             size="middle"
//             className="rounded-xl overflow-hidden shadow-sm"
//             labelStyle={{
//               fontWeight: 600,
//               backgroundColor: isDark ? '#374151' : '#f8fafc',
//               width: '160px'
//             }}
//             contentStyle={{
//               backgroundColor: isDark ? '#1f2937' : '#ffffff'
//             }}
//           >
//             <Descriptions.Item label="Full Name">
//               <Text strong className={`${textColorClass} text-lg`}>
//                 {user?.firstName} {user?.lastName}
//               </Text>
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               <div className="flex items-center gap-2">
//                 <MailOutlined />
//                 <Text className={textColorClass}>{user?.email}</Text>
//               </div>
//             </Descriptions.Item>
//             <Descriptions.Item label="Phone">
//               <div className="flex items-center gap-2">
//                 <PhoneOutlined />
//                 <Text className={textColorClass}>{user?.phone || "N/A"}</Text>
//               </div>
//             </Descriptions.Item>
//             <Descriptions.Item label="Gender">
//               <Tag color={user?.gender === 'male' ? 'blue' : user?.gender === 'female' ? 'pink' : 'default'}>
//                 {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "N/A"}
//               </Tag>
//             </Descriptions.Item>
//             <Descriptions.Item label="Date of Birth">
//               <div className="flex items-center gap-2">
//                 <CalendarOutlined />
//                 <Text className={textColorClass}>
//                   {user?.dob ? dayjs(user.dob).format("DD MMMM YYYY") : "N/A"}
//                 </Text>
//               </div>
//             </Descriptions.Item>
//             <Descriptions.Item label="NID Number">
//               <Text className={textColorClass}>{user?.nidNumber || "N/A"}</Text>
//             </Descriptions.Item>
//             <Descriptions.Item label="Address" span={2}>
//               <div className="flex items-start gap-2">
//                 <EnvironmentOutlined className="mt-1" />
//                 <Text className={textColorClass}>{user?.addressDisplay || user?.address || "N/A"}</Text>
//               </div>
//             </Descriptions.Item>
//             <Descriptions.Item label="Join Date">
//               <div className="flex items-center gap-2">
//                 <CalendarOutlined />
//                 <Text className={textColorClass}>
//                   {user?.joinDate ? dayjs(user.joinDate).format("DD MMMM YYYY") : "N/A"}
//                 </Text>
//               </div>
//             </Descriptions.Item>
//             <Descriptions.Item label="Division">
//               <Tag color="blue">{user?.division || "N/A"}</Tag>
//             </Descriptions.Item>
//             <Descriptions.Item label="District">
//               <Tag color="green">{user?.district || "N/A"}</Tag>
//             </Descriptions.Item>
//             <Descriptions.Item label="Committee Position" span={2}>
//               <Badge
//                 status="processing"
//                 text={
//                   <Text strong className={textColorClass}>
//                     {user?.committeePosition || "N/A"}
//                   </Text>
//                 }
//               />
//             </Descriptions.Item>
//           </Descriptions>
//         </motion.div>
//       );
//     };

//     return (
//       <Card className={cardClassName}>
//         <Row gutter={[32, 32]}>
//           {/* Profile Sidebar */}
//           <Col xs={24} md={8}>
//             <div className="text-center space-y-6">
//               {/* Profile Image */}
//               <motion.div
//                 className="relative inline-block"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <Tooltip title="Change Profile Photo">
//                   <Upload
//                     showUploadList={false}
//                     beforeUpload={handleImageUpload}
//                     disabled={uploading}
//                   >
//                     <Badge
//                       count={
//                         <CameraOutlined className="text-white bg-blue-500 p-2 rounded-full shadow-lg" />
//                       }
//                       offset={[-10, 100]}
//                     >
//                       <Avatar
//                         size={140}
//                         src={displayImage}
//                         icon={<UserOutlined />}
//                         className="border-4 border-white shadow-2xl cursor-pointer"
//                       />
//                     </Badge>
//                   </Upload>
//                 </Tooltip>
//               </motion.div>

//               {/* User Info */}
//               <div>
//                 <Title level={3} className={`!mb-2 ${textColorClass}`}>
//                   {user?.firstName} {user?.lastName}
//                 </Title>
//                 <Text className={`${textMutedClass} block`}>{user?.email}</Text>
//                 <Text className={`${textMutedClass} text-sm block mt-1`}>
//                   {user?.phone || "No phone number"}
//                 </Text>

//                 <div className="flex flex-wrap justify-center gap-2 mt-4">
//                   {getRoleTag()}
//                   {getStatusTag()}
//                 </div>
//               </div>

//               {/* Stats Card */}
//               <Card className={`${isDark ? 'bg-gray-700/50' : 'bg-gray-50/80'} backdrop-blur-sm`}>
//                 <Space direction="vertical" className="w-full">
//                   {[
//                     { label: "Member Since", value: user?.joinDate ? dayjs(user.joinDate).format("MMM YYYY") : "N/A" },
//                     { label: "Last Login", value: user?.lastLogin ? dayjs(user.lastLogin).fromNow() : "Never" },
//                     { label: "Profile Views", value: "1,234" },
//                     { label: "Completed Tasks", value: "89%" },
//                   ].map((item, index) => (
//                     <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
//                       <Text className={textMutedClass}>{item.label}</Text>
//                       <Text strong className={textColorClass}>{item.value}</Text>
//                     </div>
//                   ))}
//                 </Space>
//               </Card>

//               {/* Quick Actions */}
//               <div className="grid grid-cols-2 gap-2">
//                 {quickActions.map((action, index) => (
//                   <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                     <Button
//                       type="default"
//                       icon={action.icon}
//                       block
//                       onClick={action.action}
//                       className="flex items-center justify-center gap-2"
//                     >
//                       <span className="hidden sm:inline">{action.label}</span>
//                     </Button>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </Col>

//           {/* Main Content */}
//           <Col xs={24} md={16}>
//             <AnimatePresence mode="wait">
//               {editMode ? (
//                 <EditProfileForm />
//               ) : (
//                 <ProfileView />
//               )}
//             </AnimatePresence>
//           </Col>
//         </Row>
//       </Card>
//     );
//   };

//   // Security Tab Component
//   const SecurityTab = () => {
//     return (
//       <Card className={cardClassName}>
//         <Title level={3} className={`${textColorClass} mb-6`}>Security & Privacy</Title>

//         {/* Security Cards Grid */}
//         <Row gutter={[16, 16]} className="mb-8">
//           {securityItems.map((item, index) => (
//             <Col xs={24} sm={12} lg={6} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
//               >
//                 <Card
//                   className={`cursor-pointer transition-all ${bgHoverClass} border h-full rounded-xl`}
//                   onClick={item.action}
//                   hoverable
//                 >
//                   <div className="flex flex-col h-full">
//                     <div className="flex items-center mb-4">
//                       <div className="p-3 rounded-lg mr-3" style={{ backgroundColor: `${item.color}20` }}>
//                         {item.icon}
//                       </div>
//                       <div>
//                         <div className={`font-semibold ${textColorClass}`}>{item.title}</div>
//                         <div className={`text-xs ${textMutedClass}`}>{item.description}</div>
//                       </div>
//                     </div>
//                     <div className="mt-auto">
//                       <div className="flex justify-between items-center">
//                         <Tag
//                           color={item.priority === 'high' ? 'red' : item.priority === 'medium' ? 'orange' : 'blue'}
//                           className="text-xs"
//                         >
//                           {item.priority} priority
//                         </Tag>
//                         <Badge
//                           status={item.status === 'enabled' || item.status === 'active' ? 'success' : 'default'}
//                           text={
//                             <span className={`text-xs ${item.status === 'enabled' || item.status === 'active' ? 'text-green-600' : textMutedClass}`}>
//                               {item.status}
//                             </span>
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </motion.div>
//             </Col>
//           ))}
//         </Row>

//         {/* Two-Factor Authentication */}
//         <Card className={`mb-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-blue-50/50'}`}>
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="flex-1">
//               <Title level={4} className={textColorClass}>Two-Factor Authentication</Title>
//               <Text className={textMutedClass}>
//                 Add an extra layer of security to your account. When enabled, you'll need to enter both your password and a verification code.
//               </Text>
//               <div className="mt-3">
//                 <Tag icon={<InfoCircleOutlined />} color="blue" className="mr-2">
//                   Recommended
//                 </Tag>
//                 <Tag icon={<SafetyCertificateOutlined />} color="green">
//                   Secure
//                 </Tag>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Switch
//                 checked={twoFactorEnabled}
//                 onChange={setTwoFactorEnabled}
//                 checkedChildren="ON"
//                 unCheckedChildren="OFF"
//                 size="large"
//               />
//               <Button
//                 type="link"
//                 onClick={() => message.info('2FA Setup Guide')}
//               >
//                 Setup Guide
//               </Button>
//             </div>
//           </div>
//         </Card>

//         {/* Login History */}
//         <Card
//           title={
//             <div className="flex items-center justify-between">
//               <span className={textColorClass}>Recent Login History</span>
//               <Button
//                 type="link"
//                 size="small"
//                 icon={<DownloadOutlined />}
//                 onClick={() => message.info('Exporting login history...')}
//               >
//                 Export
//               </Button>
//             </div>
//           }
//           className="mb-6"
//         >
//           {loginHistory && loginHistory.length > 0 ? (
//             <Table
//               dataSource={loginHistory}
//               columns={[
//                 {
//                   title: 'Device & Location',
//                   dataIndex: 'device',
//                   key: 'device',
//                   render: (text, record) => (
//                     <div className="flex items-center gap-3">
//                       <Avatar size="small" icon={<TabletOutlined />} />
//                       <div>
//                         <div className={`font-medium ${textColorClass}`}>{text}</div>
//                         <div className={`text-xs ${textMutedClass}`}>
//                           <GlobalOutlined className="mr-1" />
//                           {record.location || 'Unknown'}
//                         </div>
//                       </div>
//                     </div>
//                   ),
//                 },
//                 {
//                   title: 'IP Address',
//                   dataIndex: 'ip',
//                   key: 'ip',
//                   render: (text) => (
//                     <Tag color="blue" className="font-mono">
//                       {text}
//                     </Tag>
//                   ),
//                 },
//                 {
//                   title: 'Time',
//                   dataIndex: 'time',
//                   key: 'time',
//                   render: (text) => (
//                     <Tooltip title={dayjs(text).format('DD MMM YYYY HH:mm:ss')}>
//                       <div className="flex items-center gap-2">
//                         <ClockCircleOutlined />
//                         <Text className={textMutedClass}>{dayjs(text).fromNow()}</Text>
//                       </div>
//                     </Tooltip>
//                   ),
//                 },
//                 {
//                   title: 'Status',
//                   dataIndex: 'status',
//                   key: 'status',
//                   render: (text) => (
//                     <Badge
//                       status={text === 'success' ? 'success' : 'error'}
//                       text={
//                         <Text className={text === 'success' ? 'text-green-600' : 'text-red-600'}>
//                           {text.charAt(0).toUpperCase() + text.slice(1)}
//                         </Text>
//                       }
//                     />
//                   ),
//                 },
//               ]}
//               pagination={{ pageSize: 5 }}
//               size="middle"
//               scroll={{ x: true }}
//               rowClassName={() => 'hover:bg-gray-50 dark:hover:bg-gray-700'}
//             />
//           ) : (
//             <Empty description="No login history available" />
//           )}
//         </Card>
//       </Card>
//     );
//   };

//   // Analytics Tab Component
//   const AnalyticsTab = () => {
//     return (
//       <Card className={cardClassName}>
//         <Title level={3} className={`${textColorClass} mb-6`}>Analytics Dashboard</Title>

//         <Row gutter={[16, 16]} className="mb-8">
//           <Col xs={24} lg={12}>
//             <Card title="Performance Trends">
//               {chartData && (
//                 <div className="h-64">
//                   <Line
//                     data={chartData.performance}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: { display: false }
//                       }
//                     }}
//                   />
//                 </div>
//               )}
//             </Card>
//           </Col>
//           <Col xs={24} lg={12}>
//             <Card title="Activity Distribution">
//               {chartData && (
//                 <div className="h-64">
//                   <Pie
//                     data={chartData.distribution}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: { position: 'right' }
//                       }
//                     }}
//                   />
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>

//         <Card title="Detailed Statistics">
//           <Row gutter={[16, 16]}>
//             {profileStats.map((stat, index) => (
//               <Col xs={24} sm={12} md={6} key={index}>
//                 <Card size="small" className={bgHoverClass}>
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
//                       {stat.icon}
//                     </div>
//                     <div>
//                       <div className={`text-sm ${textMutedClass}`}>{stat.title}</div>
//                       <div className={`text-xl font-bold ${textColorClass}`}>
//                         {stat.value}{stat.suffix}
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Card>
//       </Card>
//     );
//   };

//   // Settings Tab Component
//   const SettingsTab = () => {
//     return (
//       <Card className={cardClassName}>
//         <Title level={3} className={`${textColorClass} mb-6`}>Settings</Title>

//         <Row gutter={[24, 24]}>
//           <Col xs={24} lg={12}>
//             <Card title="Appearance">
//               <Space direction="vertical" className="w-full">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className={`font-medium ${textColorClass}`}>Dark Mode</div>
//                     <div className={`text-xs ${textMutedClass}`}>Switch between light and dark themes</div>
//                   </div>
//                   <Switch
//                     checked={darkMode}
//                     onChange={setDarkMode}
//                     checkedChildren="Dark"
//                     unCheckedChildren="Light"
//                   />
//                 </div>

//                 <Divider />

//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className={`font-medium ${textColorClass}`}>Notifications</div>
//                     <div className={`text-xs ${textMutedClass}`}>Receive system notifications</div>
//                   </div>
//                   <Switch defaultChecked />
//                 </div>
//               </Space>
//             </Card>
//           </Col>

//           <Col xs={24} lg={12}>
//             <Card title="Preferences">
//               <Space direction="vertical" className="w-full">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className={`font-medium ${textColorClass}`}>View Mode</div>
//                     <div className={`text-xs ${textMutedClass}`}>Choose your preferred layout</div>
//                   </div>
//                   <Segmented
//                     options={[
//                       { label: 'Grid', value: 'grid', icon: <AppstoreOutlined /> },
//                       { label: 'List', value: 'list', icon: <BarsOutlined /> },
//                       { label: 'Compact', value: 'compact', icon: <LayoutOutlined /> },
//                     ]}
//                     value={viewMode}
//                     onChange={setViewMode}
//                   />
//                 </div>

//                 <Divider />

//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className={`font-medium ${textColorClass}`}>Quick Actions</div>
//                     <div className={`text-xs ${textMutedClass}`}>Show quick action buttons</div>
//                   </div>
//                   <Switch
//                     checked={quickActionsVisible}
//                     onChange={setQuickActionsVisible}
//                   />
//                 </div>
//               </Space>
//             </Card>
//           </Col>
//         </Row>
//       </Card>
//     );
//   };

//   // Enhanced tabs with icons and animations
//   const tabItems = [
//     {
//       key: "overview",
//       label: (
//         <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
//           <DashboardOutlined className="text-lg" />
//           <span className="hidden md:inline">Dashboard</span>
//         </motion.div>
//       ),
//       children: <DashboardTab />,
//     },
//     {
//       key: "personal",
//       label: (
//         <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
//           <UserOutlined className="text-lg" />
//           <span className="hidden md:inline">Profile</span>
//         </motion.div>
//       ),
//       children: <PersonalTab />,
//     },
//     {
//       key: "security",
//       label: (
//         <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
//           <SecurityScanOutlined className="text-lg" />
//           <span className="hidden md:inline">Security</span>
//         </motion.div>
//       ),
//       children: <SecurityTab />,
//     },
//     {
//       key: "analytics",
//       label: (
//         <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
//           <BarChartOutlined className="text-lg" />
//           <span className="hidden md:inline">Analytics</span>
//         </motion.div>
//       ),
//       children: <AnalyticsTab />,
//     },
//     {
//       key: "settings",
//       label: (
//         <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
//           <SettingOutlined className="text-lg" />
//           <span className="hidden md:inline">Settings</span>
//         </motion.div>
//       ),
//       children: <SettingsTab />,
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className={`min-h-screen transition-all duration-300 ${gradientBg}`}
//     >
//       {/* Header */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className={`sticky top-0 z-50 backdrop-blur-lg ${isDark ? 'bg-gray-900/90' : 'bg-white/90'} shadow-xl border-b ${borderColorClass}`}
//       >
//         <div className="px-4 py-3 flex justify-between items-center max-w-7xl mx-auto">
//           <div className="flex items-center space-x-4">
//             {isMobile && (
//               <Button
//                 type="text"
//                 icon={<MenuOutlined />}
//                 onClick={() => setDrawerVisible(true)}
//                 size="large"
//               />
//             )}

//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Space>
//                 <DashboardOutlined className={`text-2xl ${textColorClass}`} />
//                 <Title level={4} className={`!mb-0 ${textColorClass} hidden sm:block`}>
//                   Admin Dashboard
//                 </Title>
//               </Space>
//             </motion.div>

//             {/* Search Bar */}
//             {!isMobile && (
//               <motion.div initial={{ width: 0 }} animate={{ width: 200 }}>
//                 <Input
//                   prefix={<SearchOutlined />}
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="rounded-full"
//                   size="middle"
//                 />
//               </motion.div>
//             )}
//           </div>

//           <Space size="middle">
//             {/* Theme Toggle */}
//             <Tooltip title={isDark ? "Light Mode" : "Dark Mode"}>
//               <Button
//                 type="text"
//                 icon={isDark ? <SunOutlined /> : <MoonOutlined />}
//                 onClick={() => setDarkMode(!darkMode)}
//                 size="large"
//               />
//             </Tooltip>

//             {/* Notifications */}
//             <Dropdown
//               overlay={
//                 <Menu className="w-80">
//                   <div className="p-3 border-b">
//                     <Text strong>Notifications</Text>
//                     <Badge count={notifications.filter(n => !n.read).length} />
//                   </div>
//                   {notifications.map(notification => (
//                     <Menu.Item key={notification.id}>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <Text strong>{notification.title}</Text>
//                           <div className="text-xs text-gray-500">{notification.time}</div>
//                         </div>
//                         {!notification.read && <Badge dot />}
//                       </div>
//                     </Menu.Item>
//                   ))}
//                 </Menu>
//               }
//               trigger={['click']}
//               placement="bottomRight"
//             >
//               <Badge count={notifications.filter(n => !n.read).length}>
//                 <Button
//                   type="text"
//                   icon={<BellOutlined />}
//                   size="large"
//                 />
//               </Badge>
//             </Dropdown>

//             {/* User Menu */}
//             <Dropdown
//               overlay={
//                 <Menu>
//                   <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => setActiveTab('personal')}>
//                     My Profile
//                   </Menu.Item>
//                   <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => setActiveTab('settings')}>
//                     Settings
//                   </Menu.Item>
//                   <Menu.Divider />
//                   <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={() => {
//                     localStorage.removeItem('token');
//                     navigate('/login');
//                   }}>
//                     Logout
//                   </Menu.Item>
//                 </Menu>
//               }
//               trigger={['click']}
//               placement="bottomRight"
//             >
//               <Space className="cursor-pointer">
//                 <Avatar size="large" src={displayImage} />
//                 {!isMobile && (
//                   <div className="text-left">
//                     <div className={`font-medium ${textColorClass}`}>
//                       {user?.firstName} {user?.lastName}
//                     </div>
//                     <div className={`text-xs ${textMutedClass}`}>
//                       {getRoleTag(user?.role)}
//                     </div>
//                   </div>
//                 )}
//               </Space>
//             </Dropdown>
//           </Space>
//         </div>
//       </motion.div>

//       {/* Main Content */}
//       <div className="p-4 max-w-7xl mx-auto">
//         {/* Welcome Banner */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-6"
//         >
//           <Card className={`${cardClassName} bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden`}>
//             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
//             <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

//             <Row align="middle" justify="space-between" className="relative">
//               <Col xs={24} md={16}>
//                 <motion.div
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <Title level={2} className="!mb-3 !text-white">
//                     Welcome back, {user?.firstName}! 👋
//                   </Title>
//                   <Paragraph className="text-blue-100 text-lg mb-4">
//                     {user?.role === 'admin' ? 'Administrator Dashboard' : 'User Profile'}
//                     <br />
//                     <Text className="text-sm opacity-80">
//                       Last login: {user?.lastLogin ? dayjs(user.lastLogin).fromNow() : 'Never'}
//                     </Text>
//                   </Paragraph>
//                   <Space wrap>
//                     <Tag color="white" className="text-blue-600 font-semibold px-3 py-1">
//                       ID: {user?.membershipId || 'N/A'}
//                     </Tag>
//                     <Tag color="white" className="text-purple-600 font-semibold px-3 py-1">
//                       {user?.committeePosition || 'Member'}
//                     </Tag>
//                     <Tag color="white" className="text-pink-600 font-semibold px-3 py-1">
//                       {user?.division || 'No Division'}
//                     </Tag>
//                   </Space>
//                 </motion.div>
//               </Col>
//               <Col xs={24} md={8} className="text-center md:text-right mt-6 md:mt-0">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                 >
//                   <Avatar
//                     size={100}
//                     src={displayImage}
//                     className="border-4 border-white shadow-2xl"
//                   />
//                   <div className="mt-4">
//                     <Rate disabled defaultValue={4.5} allowHalf />
//                   </div>
//                 </motion.div>
//               </Col>
//             </Row>
//           </Card>
//         </motion.div>

//         {/* Profile Completeness Alert */}
//         {profileCompleteness < 100 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "spring" }}
//             className="mb-6"
//           >
//             <Alert
//               message="Complete Your Profile"
//               description={
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div>
//                     <Progress
//                       percent={profileCompleteness}
//                       size="small"
//                       strokeColor={profileCompleteness === 100 ? token.colorSuccess : token.colorPrimary}
//                       strokeWidth={6}
//                       showInfo={false}
//                       className="max-w-md"
//                     />
//                     <Text className={`${textMutedClass} text-sm mt-1`}>
//                       Your profile is {profileCompleteness}% complete. Complete all fields to unlock full features.
//                     </Text>
//                   </div>
//                   <Space>
//                     <Button
//                       type="primary"
//                       size="small"
//                       onClick={() => setEditMode(true)}
//                       className="rounded-full"
//                     >
//                       Complete Now
//                     </Button>
//                     <Button
//                       type="link"
//                       size="small"
//                       onClick={() => setQuickActionsVisible(!quickActionsVisible)}
//                     >
//                       {quickActionsVisible ? 'Hide Tips' : 'Show Tips'}
//                     </Button>
//                   </Space>
//                 </div>
//               }
//               type="warning"
//               showIcon
//               icon={<InfoCircleOutlined />}
//               className={`${cardClassName} rounded-xl`}
//               closable
//               onClose={() => {}}
//             />
//           </motion.div>
//         )}

//         {/* Stats Cards */}
//         <Row gutter={[16, 16]} className="mb-8">
//           {profileStats.map((stat, index) => (
//             <Col xs={24} sm={12} md={6} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{
//                   scale: 1.05,
//                   y: -4,
//                   transition: { type: "spring", stiffness: 300 }
//                 }}
//               >
//                 <Card className={`${cardClassName} h-full`}>
//                   <div className="flex flex-col h-full">
//                     <div className="flex items-center justify-between mb-3">
//                       <div
//                         className="p-3 rounded-xl shadow-lg"
//                         style={{
//                           backgroundColor: `${stat.color}20`,
//                           color: stat.color
//                         }}
//                       >
//                         {stat.icon}
//                       </div>
//                       {stat.progress && (
//                         <Progress
//                           percent={stat.value}
//                           size="small"
//                           strokeColor={stat.color}
//                           showInfo={false}
//                           style={{ width: 60 }}
//                         />
//                       )}
//                     </div>

//                     <div className="flex-grow">
//                       <Statistic
//                         value={stat.value}
//                         suffix={stat.suffix}
//                         valueStyle={{
//                           color: stat.color,
//                           fontSize: '24px',
//                           fontWeight: 700,
//                         }}
//                       />
//                       <div className={`text-sm ${textMutedClass} mt-2`}>
//                         {stat.title}
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </motion.div>
//             </Col>
//           ))}
//         </Row>

//         {/* Main Tabs */}
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Tabs
//             activeKey={activeTab}
//             onChange={setActiveTab}
//             type={isMobile ? "line" : "card"}
//             size="large"
//             items={tabItems}
//             className="rounded-xl"
//             tabBarStyle={{
//               marginBottom: 24,
//               backgroundColor: isDark ? token.colorBgContainer : '#ffffff',
//               padding: '8px 8px 0 8px',
//               borderRadius: '12px 12px 0 0',
//             }}
//             tabBarExtraContent={
//               !isMobile && (
//                 <Space>
//                   <Tooltip title="Refresh">
//                     <Button
//                       icon={<ReloadOutlined spin={refreshing} />}
//                       onClick={loadData}
//                       loading={refreshing}
//                       shape="circle"
//                     />
//                   </Tooltip>
//                   <Tooltip title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}>
//                     <Button
//                       icon={fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
//                       onClick={() => setFullscreen(!fullscreen)}
//                       shape="circle"
//                     />
//                   </Tooltip>
//                 </Space>
//               )
//             }
//           />
//         </motion.div>

//         {/* Quick Actions Menu */}
//         {quickActionsVisible && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="fixed bottom-24 right-6 z-40"
//           >
//             <Card className={`${cardClassName} w-64 shadow-2xl`}>
//               <div className="text-center mb-4">
//                 <Title level={5} className={textColorClass}>Quick Actions</Title>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 {quickActions.map((action, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Button
//                       type="default"
//                       icon={action.icon}
//                       onClick={action.action}
//                       className="w-full h-12 flex items-center justify-center"
//                       style={{ borderColor: action.color }}
//                     >
//                       <span className="text-xs">{action.label}</span>
//                     </Button>
//                   </motion.div>
//                 ))}
//               </div>
//             </Card>
//           </motion.div>
//         )}

//         {/* Floating Actions */}
//         <FloatButton.Group
//           shape="circle"
//           style={{ right: 24, bottom: 24 }}
//           trigger="hover"
//           icon={<PlusOutlined />}
//         >
//           <FloatButton
//             icon={<QrcodeOutlined />}
//             tooltip="QR Code"
//             onClick={() => setQrModalVisible(true)}
//           />
//           <FloatButton
//             icon={<EditOutlined />}
//             tooltip="Edit Profile"
//             onClick={() => setEditMode(true)}
//           />
//           <FloatButton
//             icon={<SettingOutlined />}
//             tooltip="Settings"
//             onClick={() => setActiveTab('security')}
//           />
//           <FloatButton.BackTop visibilityHeight={100} />
//         </FloatButton.Group>
//       </div>

//       {/* Change Password Modal */}
//       <Modal
//         title={
//           <div className="flex items-center gap-3">
//             <KeyOutlined className="text-blue-500 text-xl" />
//             <span>Change Password</span>
//           </div>
//         }
//         open={securityModalVisible}
//         onCancel={() => setSecurityModalVisible(false)}
//         footer={null}
//         centered
//         width={500}
//         className="rounded-2xl"
//         styles={{
//           header: { borderBottom: `1px solid ${borderColorClass}`, padding: '24px' },
//           body: { padding: '24px' }
//         }}
//       >
//         <Form
//           layout="vertical"
//           form={passwordForm}
//           onFinish={handlePasswordChange}
//           size="large"
//         >
//           <Form.Item
//             name="currentPassword"
//             label="Current Password"
//             rules={[{ required: true, message: "Please enter current password" }]}
//           >
//             <Password
//               placeholder="Enter current password"
//               iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
//               className="rounded-lg h-12"
//             />
//           </Form.Item>

//           <Form.Item
//             name="newPassword"
//             label="New Password"
//             rules={[
//               { required: true, message: "Please enter new password" },
//               { min: 8, message: "Minimum 8 characters" },
//               { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: "Include uppercase, lowercase & number" }
//             ]}
//           >
//             <Password
//               placeholder="Enter new password"
//               iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
//               className="rounded-lg h-12"
//             />
//           </Form.Item>

//           <Form.Item
//             name="confirmPassword"
//             label="Confirm Password"
//             dependencies={['newPassword']}
//             rules={[
//               { required: true, message: "Please confirm password" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('newPassword') === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error('Passwords do not match'));
//                 },
//               }),
//             ]}
//           >
//             <Password
//               placeholder="Confirm new password"
//               iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
//               className="rounded-lg h-12"
//             />
//           </Form.Item>

//           <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
//             <Button
//               onClick={() => setSecurityModalVisible(false)}
//               className="rounded-lg"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={changingPassword}
//               className="rounded-lg shadow-lg"
//             >
//               Update Password
//             </Button>
//           </div>
//         </Form>
//       </Modal>

//       {/* QR Code Modal */}
//       <Modal
//         title={
//           <div className="flex items-center gap-3">
//             <QrcodeOutlined className="text-purple-500 text-xl" />
//             <span>Profile QR Code</span>
//           </div>
//         }
//         open={qrModalVisible}
//         onCancel={() => setQrModalVisible(false)}
//         footer={[
//           <Button
//             key="download"
//             icon={<DownloadOutlined />}
//             type="primary"
//             className="rounded-lg"
//           >
//             Download QR
//           </Button>,
//           <Button
//             key="close"
//             onClick={() => setQrModalVisible(false)}
//             className="rounded-lg"
//           >
//             Close
//           </Button>,
//         ]}
//         centered
//         width={400}
//         className="rounded-2xl"
//       >
//         <div className="text-center space-y-6 py-4">
//           <motion.div
//             animate={{
//               scale: [1, 1.05, 1],
//               rotate: [0, 5, -5, 0]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatType: "reverse"
//             }}
//           >
//             <QRCode
//               value={`${window.location.origin}/profile/${user?.membershipId || user?.id}`}
//               size={220}
//               iconSize={40}
//               icon={displayImage}
//               errorLevel="H"
//               className="shadow-2xl rounded-2xl p-4 bg-white"
//             />
//           </motion.div>

//           <div className="space-y-3">
//             <div>
//               <Text strong className={`${textColorClass} text-xl`}>
//                 {user?.firstName} {user?.lastName}
//               </Text>
//               <br />
//               <Text className={textMutedClass}>
//                 {user?.email}
//               </Text>
//             </div>

//             <div className="flex flex-wrap justify-center gap-2">
//               {getRoleTag()}
//               {getStatusTag()}
//               {user?.membershipId && (
//                 <Tag color="green" className="px-3 py-1">
//                   ID: {user.membershipId}
//                 </Tag>
//               )}
//             </div>

//             <div className={`text-xs ${textMutedClass} pt-4 border-t ${borderColorClass}`}>
//               Scan this QR code to view the profile
//               <br />
//               <Text type="secondary">Generated: {dayjs().format("DD MMM YYYY HH:mm")}</Text>
//             </div>
//           </div>
//         </div>
//       </Modal>

//       {/* Mobile Drawer */}
//       <Drawer
//         title={
//           <div className="flex items-center gap-3">
//             <Avatar src={displayImage} size="small" />
//             <div>
//               <div className={`font-semibold ${textColorClass}`}>
//                 {user?.firstName} {user?.lastName}
//               </div>
//               <div className={`text-xs ${textMutedClass}`}>
//                 {user?.email}
//               </div>
//             </div>
//           </div>
//         }
//         placement="left"
//         onClose={() => setDrawerVisible(false)}
//         open={drawerVisible}
//         width={280}
//         className="rounded-r-2xl"
//       >
//         <Menu
//           mode="inline"
//           selectedKeys={[activeTab]}
//           onSelect={({ key }) => {
//             setActiveTab(key);
//             setDrawerVisible(false);
//           }}
//           items={tabItems.map(tab => ({
//             key: tab.key,
//             icon: tab.label.props.children[0],
//             label: tab.key.charAt(0).toUpperCase() + tab.key.slice(1),
//           }))}
//           className="border-0"
//         />

//         <Divider />

//         <Space direction="vertical" className="w-full px-2">
//           <Button
//             icon={<LogoutOutlined />}
//             danger
//             block
//             onClick={() => {
//               localStorage.removeItem('token');
//               navigate('/login');
//             }}
//           >
//             Logout
//           </Button>
//         </Space>
//       </Drawer>
//     </motion.div>
//   );
// };

// export default AdminDashboard;

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
