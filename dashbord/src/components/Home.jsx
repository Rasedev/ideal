import { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  LockOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  TeamOutlined,
  SwapOutlined,
  CheckCircleOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  CalendarOutlined,
  FileTextOutlined,
  DollarOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import { MdOutlineBorderColor, MdOutlineGppMaybe } from "react-icons/md";
import { PiUserSwitchThin } from "react-icons/pi";
import { Layout, Menu, Button, Spin, Card, Row, Col, Avatar, Badge, Input, Typography, Tag, List } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Sider, Content, Header } = Layout;
const { Meta } = Card;

const Home = () => {
  const data = useSelector((state) => state.user?.value);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  console.log("Home component rendered. Redux user (data):", data);

  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  // Mock data for dashboard - replace with actual API data
  const userData = {
    name: data?.firstName + " " + data?.lastName || "User",
    email: data?.email || "user@example.com",
    role: data?.role || "member",
    membershipId: "Membership_03:1034:001",
    memberSince: "04/2025",
    status: "Active"
  };

  const quickActions = [
    {
      title: "New Application",
      description: "Submit pilot transfer application",
      icon: <FileTextOutlined className="text-blue-600" />,
      color: "blue"
    },
    {
      title: "View Plots",
      description: "Check your pilot details",
      icon: <EnvironmentOutlined className="text-green-600" />,
      color: "green"
    },
    {
      title: "Make Payment",
      description: "Pay subscription fees",
      icon: <DollarOutlined className="text-orange-600" />,
      color: "orange"
    },
    {
      title: "Update Profile",
      description: "Manage your information",
      icon: <ProfileOutlined className="text-purple-600" />,
      color: "purple"
    }
  ];

  const recentActivities = [
    {
      title: "Application Approved",
      description: "First transfer application #PT-2024-001 has been approved",
      time: "2 hours ago",
      type: "success"
    },
    {
      title: "Payment Received",
      description: "Monthly subscription payment confirmed",
      time: "1 day ago",
      type: "info"
    },
    {
      title: "Application Submitted",
      description: "New pilot registration application submitted",
      time: "3 days ago",
      type: "warning"
    }
  ];

  const upcomingEvents = [
    {
      title: "Monthly General Meeting",
      date: "Dec 15, 2024 at 14:00",
      location: "Main Conference Hall"
    },
    {
      title: "Infrastructure Development Discussion",
      date: "Dec 20, 2024 at 10:00",
      location: "Committee Room"
    }
  ];

  const menuItems = [
    {
      key: "/dashboard",
      label: (
        <span className="flex items-center w-full">
          <DashboardOutlined style={{ marginRight: 8 }} />
          {!collapsed && <span className="font-semibold">Dashboard</span>}
        </span>
      ),
    },
    { type: "divider" },

    ...(data?.role === "admin"
      ? [
          {
            key: "usersSubmenu",
            label: (
              <span className="flex items-center justify-between w-full">
                <span className="flex items-center">
                  <UsergroupAddOutlined style={{ marginRight: 8 }} />
                  {!collapsed && <span className="font-semibold">Users</span>}
                </span>
                {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
              </span>
            ),
            children: [
              { key: "/login", label: "HR Login" },
              { key: "/hr", label: "HR Management" },
            ],
          },
        ]
      : []),
    { type: "divider" },
    
    ...(data?.role === "admin" || data?.role === "hr"
      ? [
          {
            key: "employeesSubmenu",
            label: (
              <span className="flex items-center justify-between w-full">
                <span className="flex items-center">
                  <TeamOutlined style={{ marginRight: 8 }} />
                  {!collapsed && <span className="font-semibold">Employees</span>}
                </span>
                {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
              </span>
            ),
            children: [
              { key: "/addemployee", label: "Add Employee" },
              { key: "/allemployee", label: "All Employees" },
            ],
          },
        ]
      : []),

    { type: "divider" },
    {
      key: "ordersSubmenu",
      label: (
        <span className="flex items-center justify-between w-full">
          <span className="flex items-center mt-1">
            <MdOutlineBorderColor style={{ marginRight: 8, fontSize: '18px' }} />
            {!collapsed && <span className="font-semibold ml-2">Orders</span>}
          </span>
          {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
        </span>
      ),
      children: [
        { key: "/addtransferorder", label: "Add Transfer Order" },
        { key: "/alltransferorders", label: "All Transfer Orders" },
      ],
    },
    { type: "divider" },
    
    {
      key: "ApproveStatus",
      label: (
        <span className="flex items-center justify-between w-full">
          <span className="flex items-center mt-1">
            <CheckCircleOutlined style={{ marginRight: 8, fontSize: '14px' }} />
            {!collapsed && <span className="font-semibold ml-2">Approve Status</span>}
          </span>
          {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
        </span>
      ),
      children: [
        { key: "/ApproveCategoryStatus", label: "Approve Category Status" },
        { key: "/approvesubcategorystatus", label: "Approve SubCategory Status" },
      ],
    },

    { type: "divider" },
    {
      key: "authenticationSubmenu",
      label: (
        <span className="flex items-center justify-between w-full">
          <span className="flex items-center mt-1">
            <MdOutlineGppMaybe style={{ marginRight: 8, fontSize: '18px' }} />
            {!collapsed && <span className="font-semibold ml-2">Authentication</span>}
          </span>
          {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
        </span>
      ),
      children: [
        { key: "/users", label: "Manage Users" },
        { key: "/auth/roles", label: "User Roles" },
      ],
    },
    { type: "divider" },
    
    {
      key: "mapSubmenu",
      label: (
        <span className="flex items-center justify-between w-full">
          <span className="flex items-center">
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            {!collapsed && <span className="font-semibold">Map</span>}
          </span>
          {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
        </span>
      ),
      children: [
        { key: "/viewmap", label: "View Map" },
      ],
    },
    { type: "divider" },
    
    {
      key: "settingsSubmenu",
      label: (
        <span className="flex items-center justify-between w-full">
          <span className="flex items-center">
            <SettingOutlined style={{ marginRight: 8 }} />
            {!collapsed && <span className="font-semibold">Settings</span>}
          </span>
          {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
        </span>
      ),
      children: [
        { key: "/generalsettings", label: "General Settings" },
        { key: "/securitysettings", label: "Security" },
      ],
    },
  ];

  const DashboardContent = () => (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <Title level={2} className="!mb-2">
            Welcome back, {userData.name}!
          </Title>
          <Text type="secondary" className="text-lg">
            Here's your membership overview and recent activities.
          </Text>
        </div>
        
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-64 rounded-lg"
            size="large"
          />
          <Badge count={5} size="small">
            <Button 
              type="text" 
              icon={<BellOutlined className="text-xl" />} 
              size="large"
              className="flex items-center justify-center"
            />
          </Badge>
          <Avatar 
            size="large" 
            icon={<UserOutlined />}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>
      </div>

      {/* Membership Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 border-0 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Text strong className="text-lg">{userData.membershipId}</Text>
              <Tag color="green" className="text-sm">{userData.status}</Tag>
            </div>
            <Text type="secondary">Member since {userData.memberSince}</Text>
          </div>
          <div className="mt-4 lg:mt-0">
            <Tag color="blue" icon={<UserOutlined />} className="text-sm">
              {userData.role.toUpperCase()}
            </Tag>
          </div>
        </div>
      </Card>

      <Row gutter={[16, 16]}>
        {/* Quick Actions */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center">
                <AppstoreOutlined className="text-blue-600 mr-2" />
                <span className="font-semibold">Quick Actions</span>
              </div>
            }
            className="h-full shadow-sm border-0"
          >
            <Row gutter={[16, 16]}>
              {quickActions.map((action, index) => (
                <Col xs={12} key={index}>
                  <Card 
                    className="text-center cursor-pointer hover:shadow-md transition-all duration-300 border-0 bg-gray-50 h-full"
                    onClick={() => console.log(action.title)}
                  >
                    <div className={`text-2xl mb-3`}>
                      {action.icon}
                    </div>
                    <Text strong className="block mb-1">{action.title}</Text>
                    <Text type="secondary" className="text-xs">{action.description}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center">
                <BellOutlined className="text-green-600 mr-2" />
                <span className="font-semibold">Recent Activities</span>
              </div>
            }
            className="h-full shadow-sm border-0"
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item className="!px-0 !py-3 border-b border-gray-100 last:border-b-0">
                  <List.Item.Meta
                    avatar={
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        item.type === 'success' ? 'bg-green-500' :
                        item.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'
                      }`} />
                    }
                    title={
                      <Text strong className="text-sm">{item.title}</Text>
                    }
                    description={
                      <div>
                        <Text type="secondary" className="text-xs">{item.description}</Text>
                        <div>
                          <Text type="secondary" className="text-xs">{item.time}</Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Upcoming Events */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center">
                <CalendarOutlined className="text-purple-600 mr-2" />
                <span className="font-semibold">Upcoming Events</span>
              </div>
            }
            className="h-full shadow-sm border-0"
          >
            <List
              dataSource={upcomingEvents}
              renderItem={(item) => (
                <List.Item className="!px-0 !py-3 border-b border-gray-100 last:border-b-0">
                  <List.Item.Meta
                    avatar={<CalendarOutlined className="text-purple-500" />}
                    title={<Text strong className="text-sm">{item.title}</Text>}
                    description={
                      <div>
                        <Text type="secondary" className="text-xs block">{item.date}</Text>
                        <Text type="secondary" className="text-xs">{item.location}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Membership Information */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center">
                <ProfileOutlined className="text-orange-600 mr-2" />
                <span className="font-semibold">Membership Information</span>
              </div>
            }
            className="h-full shadow-sm border-0"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Text type="secondary">Membership Type</Text>
                <Text strong>Premium</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text type="secondary">Subscription</Text>
                <Tag color="green">Active</Tag>
              </div>
              <div className="flex justify-between items-center">
                <Text type="secondary">Next Payment</Text>
                <Text strong>Jan 15, 2025</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text type="secondary">Total Applications</Text>
                <Text strong>12</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        className="bg-white shadow-lg transition-all border-r border-gray-200"
        width={260}
        collapsedWidth={80}
      >
        {/* Logo Section */}
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800 font-railway">Alamgir Hossain</h2>
                <p className="text-xs text-gray-500">City Welfare Association</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">AS</span>
            </div>
          )}
          <Button 
            type="text" 
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </div>

        {/* User Profile Section */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar 
                size="large" 
                src="/api/placeholder/40/40" 
                icon={<UserOutlined />}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              />
              <div className="flex-1 min-w-0">
                <Text strong className="block text-gray-800 truncate">
                  {userData.name}
                </Text>
                <Text type="secondary" className="text-xs block truncate">
                  {userData.email}
                </Text>
                <Tag color="blue" className="text-xs mt-1">
                  {userData.role}
                </Tag>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <Menu
          onClick={(e) => navigate(e.key)}
          mode="inline"
          items={menuItems}
          className="border-none mt-2"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['dashboard']}
        />
      </Sider>

      {/* Main Content Area */}
      <Layout>
        {/* Conditionally render content based on route */}
        <Content className="bg-gray-50 min-h-screen">
          {location.pathname === '/dashboard' ? <DashboardContent /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;



///////////////////////////////////////////////////////////////////

// import { useState } from "react";
// import {AppstoreOutlined,MailOutlined,UsergroupAddOutlined, MenuFoldOutlined,MenuUnfoldOutlined,DownOutlined,DashboardOutlined,ShoppingCartOutlined, LockOutlined,EnvironmentOutlined,SettingOutlined, TeamOutlined,SwapOutlined,CheckCircleOutlined} from "@ant-design/icons";
// import { MdOutlineBorderColor } from "react-icons/md";
// //import GppMaybeIcon from '@mui/icons-material/GppMaybe';
// import { MdOutlineGppMaybe } from "react-icons/md";
// import { PiUserSwitchThin } from "react-icons/pi";
// import { Layout, Menu, Button, Spin } from "antd";
// import { Outlet, useLocation, useNavigate } from "react-router-dom"; 
// import { useSelector } from "react-redux"; 


// const { Sider, Content } = Layout;

// const Home = () => {
//   const data = useSelector((state) => state.user?.value);
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false); 
//   const location = useLocation();

//   console.log("Home component rendered. Redux user (data):", data);

//   if (!data) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

// const items = [
   
//     {
//       key: "/dashboard", // Assuming a dashboard route
//       label: (
//         <span className="flex items-center w-full">
//           <DashboardOutlined style={{ marginRight: 8 }} />
//           {!collapsed && <span className="font-semibold">Dashboard</span>}
//         </span>
//       ),
//       // No children here if it's a direct link
//     },
//     { type: "divider" }, 

//     ...(data?.role === "admin"
//       ? [
//           {
//             key: "usersSubmenu",
//             label: (
//               <span className="flex items-center justify-between w-full">
//                 <span className="flex items-center">
//                   <UsergroupAddOutlined style={{ marginRight: 8 }} />
//                   {!collapsed && <span className="font-semibold">Users</span>}
//                 </span>
//                 {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
//               </span>
//             ),
//             children: [
//               { key: "/login", label: "HR Login" },
//               { key: "/hr", label: "HR Management" },
//             ],
//           },
//         ]
//       : []),
//  { type: "divider" }, 
//     ...(data?.role === "admin" || data?.role === "hr"
//       ? [
//           {
//             key: "employeesSubmenu",
//             label: (
//               <span className="flex items-center justify-between w-full">
//                 <span className="flex items-center">
//                   <TeamOutlined style={{ marginRight: 8 }} /> {/* Changed to TeamOutlined */}
//                   {!collapsed && <span className="font-semibold">Employees</span>}
//                 </span>
//                 {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
//               </span>
//             ),
//             children: [
//               { key: "/addemployee", label: "Add Employee" },
//               { key: "/allemployee", label: "All Employees" },
//             ],
//           },
//         ]
//       : []),

//     { type: "divider" },
//     {
//       key: "ordersSubmenu",
//       label: (
//         <span className="flex items-center justify-between w-full">
//           <span className="flex items-center mt-1">
//             <MdOutlineBorderColor style={{ marginRight: 8,fontSize: '18px' }} /> {/* Changed to ShoppingCartOutlined */}
//             {!collapsed && <span className="font-semibold ml-2 ">Orders</span>}
//           </span>
//           {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
//         </span>
//       ),
//       children: [
//         { key: "/addtransferorder", label: "Add Transfer Order" },
//         { key: "/alltransferorders", label: "All Transfer Orders" },
//       ],
//     },
//      { type: "divider" },
//     {
//       key: "ApproveStatus",
//       label: (
//         <span className="flex items-center justify-between w-full">
//           <span className="flex items-center mt-1">
//             <CheckCircleOutlined style={{ marginRight: 8,fontSize: '14px' }} /> {/* Changed to ShoppingCartOutlined */}
//             {!collapsed && <span className="font-semibold ml-2 ">Approve Status</span>}
//           </span>
//           {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
//         </span>
//       ),
//       children: [
//         { key: "/ApproveCategoryStatus", label: "Approve Category Status" },
//          { key: "/approvesubcategorystatus", label: "Approve SubCategory Status" },
//       ],
//     },
    
//   //  {
//   //     key: "sub5",
//   //     label: "Approve Status",
//   //     icon: <CheckCircleOutlined />,
//   //     children: [
//   //       { key: "/categorystatus", label: "Category Status" },
//   //       { key: "/subcategorystatus", label: "SubCategory Status" },
//   //     ],
//   //   },




//     { type: "divider" },
//     {
//       key: "authenticationSubmenu",
//       label: (
//         <span className="flex items-center justify-between w-full">
//           <span className="flex items-center mt-1">
//             <MdOutlineGppMaybe style={{ marginRight: 8, fontSize: '18px' }} /> 
//             {/* <GppMaybeIcon/> */}
//             {!collapsed && <span className="font-semibold ml-2">Authentication</span>}
//           </span>
//           {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
//         </span>
//       ),
//       children: [
//         { key: "/users", label: "Manage Users" },
//         { key: "/auth/roles", label: "User Roles" },
//       ],
//     },
//     { type: "divider" },
//     {
//       key: "mapSubmenu",
//       label: (
//         <span className="flex items-center justify-between w-full">
//           <span className="flex items-center">
//             <EnvironmentOutlined style={{ marginRight: 8 }} /> {/* Changed to EnvironmentOutlined */}
//             {!collapsed && <span className="font-semibold">Map</span>}
//           </span>
//           {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
//         </span>
//       ),
//       children: [
//         { key: "/viewmap", label: "View Map" },
//         // { key: "/mapsettings", label: "Map Settings" },
//       ],
//     },
//     { type: "divider" },
//     {
//       key: "settingsSubmenu",
//       label: (
//         <span className="flex items-center justify-between w-full">
//           <span className="flex items-center">
//             <SettingOutlined style={{ marginRight: 8 }} /> {/* Changed to SettingOutlined */}
//             {!collapsed && <span className="font-semibold">Settings</span>}
//           </span>
//           {!collapsed && <DownOutlined style={{ fontSize: '10px' }} />}
//         </span>
//       ),
//       children: [
//          { key: "/generalsettings", label: "General Settings" },
//          { key: "/securitysettings", label: "Security" },
//       ],
//     },
//   ];

//   return (
//     <Layout className="h-full">
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         breakpoint="md"
//         className="bg-white shadow-lg transition-all"
//         width={220} 
//         collapsedWidth={100} 
//       >
//         <div className="p-4 flex justify-between items-center border-b ml-3">
//           {!collapsed && <h2 className="text-lg font-semibold font-railway">Admin Panel</h2>}
//           <Button type="text" onClick={() => setCollapsed(!collapsed)}>
//             {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           </Button>
//         </div>

//         <Menu
//           onClick={(e) => navigate(e.key)}
//           mode="inline"
//           items={items}
//           className="h-full"
//           selectedKeys={[location.pathname]}
//         />
//       </Sider>

//       <Layout.Content>
//         <div className="bg-gray-100 min-h-screen ">
//           <Outlet />{" "}
//         </div>
//       </Layout.Content>
//     </Layout>
//   );
// };
// export default Home;

