


////////////Final Version/////////////////////


// import {Layout,Menu,Button,Avatar,Typography,Tag,} from "antd";
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getMenuItems } from "../../utils/menuItems"; // extracted from your code

// const { Sider } = Layout;
// const { Text } = Typography;

// const Sidebar = () => {
  
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const data = useSelector((state) => state.user?.value);
//   const menuItems = getMenuItems(data, collapsed);

//   const handleMenuClick = ({ key }) => navigate(key);

//   return (
//     <Sider
//       collapsible
//       collapsed={collapsed}
//       onCollapse={setCollapsed}
//       width={280}
//       collapsedWidth={80}
//       trigger={null}
//       className="bg-white shadow-md border-r border-gray-200 hidden md:block"
//     >

//       {/* <div className="p-4 flex justify-between items-center border-b border-gray-200">
//         {!collapsed ? (
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//               <span className="text-white font-bold text-lg">AH</span>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">Alamgir Hossain</h2>
//               <p className="text-xs text-gray-500">City Welfare Association</p>
//             </div>
//           </div>
//         ) : (
//           <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
//             <span className="text-white font-bold text-lg">AH</span>
//           </div>
//         )}
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={() => setCollapsed(!collapsed)}
//         />
//       </div>

//       {!collapsed && (
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <Avatar
//               size="large"
//               icon={<UserOutlined />}
//               src={data.profilePicture}
//               className="bg-gradient-to-r from-blue-500 to-purple-600"
//             />
//             <div className="min-w-0">
//               <Text strong className="block">{data.firstName} {data.lastName}</Text>
//               <Text type="secondary" className="text-xs">{data.email}</Text>
//               <div className="flex space-x-1 mt-1">
//                 <Tag color="blue">{data.role}</Tag>
//                 <Tag color="green">{data.status || 'Active'}</Tag>
//               </div>
//             </div>
//           </div>
//         </div>
//       )} */}

//      {/* Logo (Organization only) */}
// <div className="p-4 flex justify-between items-center border-b border-gray-200">
//   <div className="flex items-center space-x-3">
//     <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//       <span className="text-white font-bold text-lg">AH</span>
//     </div>
//     {!collapsed && (
//       <div>
//         <h2 className="text-lg font-bold text-gray-800">Alamgir Hossain</h2>
//         <p className="text-xs text-gray-500">City Welfare Association</p>
//       </div>
//     )}
//   </div>
//   <Button
//     type="text"
//     icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//     onClick={() => setCollapsed(!collapsed)}
//   />
// </div>

// {/* User info (below logo) */}
// {!collapsed && (
//   <div className="p-4 border-b border-gray-200">
//     <div className="flex items-center space-x-3">
//       <Avatar size="large" icon={<UserOutlined />} src={data.profilePicture} />
//       <div>
//         <Text strong>{data.firstName} {data.lastName}</Text>
//         <Text type="secondary" className="block text-xs">{data.email}</Text>
//         <Tag color="blue" className="mt-1">{data.role}</Tag>
//       </div>
//     </div>
//   </div>
// )}



//       {/* Menu */}
//       <Menu
//         mode="inline"
//         items={menuItems}
//         selectedKeys={[location.pathname]}
//         onClick={handleMenuClick}
//         className="border-none mt-2"
//       />
//     </Sider>
//   );
// };

// export default Sidebar;



///////////////clean version/////////

// import { useEffect, useState } from "react";
// import {
//   Menu,
//   Avatar,
//   Typography,
//   Tag,
//   Badge,
//   Dropdown,
//   Spin,
// } from "antd";
// import {
//   UserOutlined,
//   ProfileOutlined,
//   LogoutOutlined,
//   DownOutlined,
// } from "@ant-design/icons";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   setSelectedKey,
//   setOpenKeys,
// } from "../../components/slices/sidebarSlice";
// import { clearCurrentUser } from "../../components/slices/userSlice";
// import { fetchAssociation } from "../../components/slices/associationSlice";
// import { getAllMenuItems } from "../../utils/menuItems";
// import "./Sidebar.css";

// const { Text } = Typography;

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   // Redux state
//   const userData = useSelector((state) => state.user.value);
//   const { data: association, loading: associationLoading, error: associationError } =
//     useSelector((state) => state.association);
//   const { collapsed, selectedKey, openKeys } = useSelector(
//     (state) => state.sidebar
//   );

//   // ✅ Fetch menu items and remove duplicates
//   const menuItems = getAllMenuItems();
//   const uniqueMenuItems = Array.from(
//     new Map(menuItems.map((item) => [item.key, item])).values()
//   );
  
//    useEffect(() => {
//       const fetchFreshUserData = async () => {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           setLoading(false);
//           return;
//         }
  
//         try {
//           setLoading(true);
//           setError(null);
  
//           // Try to get fresh user data from API
//           const response = await axios.get(
//             "http://localhost:3000/api/v1/user/me",
//             {
//               headers: { Authorization: `Bearer ${token}` }
//             }
//           );
  
//           if (response.data.success) {
//             console.log("✅ Fresh user data loaded:", response.data.user);
//             dispatch(setCurrentUser(response.data.user));
//             localStorage.setItem('user', JSON.stringify(response.data.user));
//           }
//         } catch (err) {
//           console.error("❌ Failed to load fresh user data:", err);
//           setError("Failed to load user data");
          
//           // If token is invalid, clear everything
//           if (err.response?.status === 401) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             dispatch(clearCurrentUser());
//           }
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchFreshUserData();
//     }, [dispatch]);


//   // Log current user for debugging
//   useEffect(() => {
//     console.log("🧑‍💻 Current user data:", userData);
//   }, [userData]);

//   // Sync selected menu with route
//   useEffect(() => {
//     dispatch(setSelectedKey(location.pathname));
//   }, [location.pathname, dispatch]);

//   // Fetch association on mount
//   useEffect(() => {
//     dispatch(fetchAssociation());
//   }, [dispatch]);

//   // Handle menu item click
//   const handleMenuClick = ({ key }) => {
//     dispatch(setSelectedKey(key));
//     navigate(key);
//   };

//   const handleOpenChange = (keys) => {
//     dispatch(setOpenKeys(keys));
//   };

//   const handleLogout = () => {
//     dispatch(clearCurrentUser());
//     navigate("/login");
//   };

//   // User dropdown menu
//   const userMenuItems = [
//     {
//       key: "profile",
//       icon: <ProfileOutlined />,
//       label: "My Profile",
//       onClick: () => navigate("/settings/profile"),
//     },
//     { type: "divider" },
//     {
//       key: "logout",
//       icon: <LogoutOutlined />,
//       label: "Logout",
//       onClick: handleLogout,
//     },
//   ];

//   return (
//     <div
//       className={`h-full flex flex-col transition-all duration-300 font-Lato ${
//         collapsed ? "w-20" : "w-64"
//       } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg`}
//     >
//       {/* ===== HEADER ===== */}
//       <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
//         <Badge dot color="green" offset={[-2, 32]}>
//           {associationLoading ? (
//             <Spin size="small" />
//           ) : (
//             <Avatar
//               size="large"
//               src={association?.logo || "/default-logo.png"}
//               alt="Association Logo"
//               onError={(e) => {
//                 e.target.src = "/default-logo.png";
//               }}
//               className="shadow-md border-2 border-white dark:border-gray-700"
//             />
//           )}
//         </Badge>

//         {!collapsed && (
//           <div className="min-w-0 flex-1">
//             <Text
//               strong
//               className="text-gray-800 dark:text-white block truncate text-sm"
//             >
//               {userData?.firstName} {userData?.lastName}
//             </Text>

//             <div className="flex space-x-1 mt-1">
//               <Tag
//                 color={
//                   userData?.role === "admin"
//                     ? "red"
//                     : userData?.role === "hr"
//                     ? "blue"
//                     : "green"
//                 }
//                 className="text-xs px-1 py-0 border-0 capitalize"
//               >
//                 {userData?.role}
//               </Tag>
//               <Tag color="green" className="text-xs px-1 py-0 border-0">
//                 {userData?.membershipId}
//               </Tag>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ===== ERROR NOTICE ===== */}
//       {associationError && !collapsed && (
//         <div className="m-2 p-2 bg-red-100 border border-red-300 text-xs text-red-700 rounded-md">
//           Failed to load association data
//         </div>
//       )}

//       {/* ===== NAVIGATION MENU ===== */}
//       <div className="flex-1 overflow-y-auto custom-scrollbar">
//         <Menu
//           mode="inline"
//           items={uniqueMenuItems}
//           selectedKeys={[selectedKey]}
//           openKeys={openKeys}
//           onOpenChange={handleOpenChange}
//           onClick={handleMenuClick}
//           className="sidebar-menu border-none px-2 min-h-screen"
//           inlineIndent={16}
//         />
//       </div>

//       {/* ===== FOOTER (USER DROPDOWN) ===== */}
//       {!collapsed && userData && (
//         <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//           <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="topRight">
//             <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
//               <Avatar
//                 size="small"
//                 icon={<UserOutlined />}
//                 src={userData?.profilePicture}
//                 className="bg-gradient-to-r from-blue-500 to-purple-500"
//               />
//               <div className="min-w-0 flex-1">
//                 <Text className="text-xs text-gray-800 dark:text-gray-300 block truncate font-medium">
//                   {userData?.firstName} {userData?.lastName}
//                 </Text>
//                 <Text className="text-xs text-gray-500 dark:text-gray-400 block truncate">
//                   {userData?.email}
//                 </Text>
//               </div>
//               <DownOutlined className="text-gray-400 text-xs transition-transform hover:rotate-180" />
//             </div>
//           </Dropdown>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;



import { useEffect } from "react";
import {
  Menu,
  Avatar,
  Typography,
  Tag,
  Badge,
  Dropdown,
  Spin,
} from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  DownOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setSelectedKey,
  setOpenKeys,
} from "../../components/slices/sidebarSlice";
import { clearCurrentUser } from "../../components/slices/userSlice";
import { fetchAssociation } from "../../components/slices/associationSlice";
import { getAllMenuItems } from "../../utils/menuItems";
import "./Sidebar.css";

const { Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux state
  const userData = useSelector((state) => state.user.value);
  const { data: association, loading: associationLoading, error: associationError } =
    useSelector((state) => state.association);
  const { collapsed, selectedKey, openKeys } = useSelector(
    (state) => state.sidebar
  );

  // Get menu items based on user role
  const menuItems = getAllMenuItems(userData?.role);
  const uniqueMenuItems = Array.from(
    new Map(menuItems.map((item) => [item.key, item])).values()
  );

  useEffect(() => {
    console.log("🧑‍💻 Sidebar - Current user data:", userData);
  }, [userData]);

  useEffect(() => {
    dispatch(setSelectedKey(location.pathname));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    dispatch(fetchAssociation());
  }, [dispatch]);

  const handleMenuClick = ({ key }) => {
    dispatch(setSelectedKey(key));
    navigate(key);
  };

  const handleOpenChange = (keys) => {
    dispatch(setOpenKeys(keys));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(clearCurrentUser());
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "My Profile",
      onClick: () => navigate("/settings/profile"),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  if (!userData) {
    return (
      <div className="h-full flex items-center justify-center border-r w-20 transition-all duration-300">
        <Spin indicator={antIcon} size="large" />
      </div>
    );
  }

  return (
    <div
      className={`sidebar-container h-full flex flex-col transition-all duration-300 font-Lato ${
        collapsed ? "sidebar-collapsed w-20" : "sidebar-expanded w-64"
      } shadow-lg`}
    >
      {/* Header Section */}
      <div className="p-2.5 border-b flex items-center space-x-1">
        <Badge dot color="green" offset={[-2, 32]}>
          {associationLoading ? (
            <Spin size="small" />
          ) : (
            <Avatar
              // size="large"
               size={50}
              src={association?.logo || "/default-logo.png"}
              alt="Association Logo"
              onError={(e) => {
                e.target.src = "/default-logo.png";
              }}
              className="shadow-md border-2"
            />
          )}
        </Badge>

        {!collapsed && (
          <div className="min-w-0 flex-1 p-3">
            <Text strong className="block truncate text-base leading-tight">
               {association?.associationName || "AH City Kollan Somiti"} 
            </Text>
            <Text className="block truncate text-sm text-gray-500 mt-1">
              Es:: {association?.established
                ? new Date(association.established).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "January 1, 2019"}
            </Text>
          </div>
        )}
      </div>

      {/* Error Notice */}
      {associationError && !collapsed && (
        <div className="m-2 p-2 bg-red-100 border border-red-300 text-xs text-red-700 rounded-md">
          Failed to load association data
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Menu
          mode="inline"
          items={uniqueMenuItems}
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          className="sidebar-menu border-none px-2 min-h-screen"
          inlineIndent={16}
          inlineCollapsed={collapsed}
        />
      </div>

      {/* Footer - User Dropdown */}
      {!collapsed && userData && (
        <div className="p-3 border-t bg-gray-50 dark:bg-gray-800">
          <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="topRight">
            <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <Avatar
                size="small"
                icon={<UserOutlined />}
                src={userData?.profilePhoto}
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              />
              <div className="min-w-0 flex-1">
                <Text className="text-xs block truncate font-medium">
                  {userData?.firstName} {userData?.lastName}
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 block truncate">
                  {userData?.email}
                </Text>
              </div>
              <DownOutlined className="text-gray-400 text-xs transition-transform hover:rotate-180" />
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Sidebar;