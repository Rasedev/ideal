/////////////////TOp Final version of the code/////////////////

// import { useState } from 'react';
// import { Layout, Drawer, Button } from 'antd';
// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleSidebar } from '../../components/slices/sidebarSlice';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import MobileDrawer from "./MobileDrawer";
// import DashboardContent from "./DashboardContent";
//  import ChatWidget from "../common/ChatWidget";
// import { Outlet } from 'react-router-dom';

// const { Sider, Content } = Layout;

// const RootLayout = ({ children }) => {
//   const dispatch = useDispatch();
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);

//   const isMobile = window.innerWidth < 768;

//   const handleToggle = () => {
//     if (isMobile) {
//       setMobileDrawerVisible(!mobileDrawerVisible);
//     } else {
//       dispatch(toggleSidebar());
//     }
//   };

//   const sidebarContent = <Sidebar />;

//   return (
//     <Layout className="h-screen">
//       {/* Desktop Sidebar */}
//       {!isMobile && (
//         <Sider
//           trigger={null}
//           collapsible
//           collapsed={collapsed}
//           className="shadow-lg border-r border-gray-200 dark:border-gray-700"
//           width={256}
//           collapsedWidth={80}
//           theme="light"
//         >
//           {sidebarContent}
//         </Sider>
//       )}

//       {/* Mobile Drawer */}
//       {isMobile && (
//         <Drawer
//           placement="left"
//           onClose={() => setMobileDrawerVisible(false)}
//           open={mobileDrawerVisible}
//           styles={{ padding: 0 }}
//           width={280}
//         >
//           {sidebarContent}
//         </Drawer>
//       )}

//       <Layout>
//         <Header
//           onToggle={handleToggle}
//           isMobile={isMobile}
//         />
//         <Content className="overflow-auto bg-gray-50 dark:bg-gray-900 p-4">
//           <div className="min-h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
//             {children} {location.pathname === "/" ? <DashboardContent /> : <Outlet />}
//           </div>
//         </Content>
//       </Layout>
//             {/* Chat Widget - Fixed on right side like screenshot */}
//        <div className="fixed bottom-6 right-6 z-50">
//          <ChatWidget />
//        </div>

//     </Layout>
//   );
// };

// export default RootLayout;

///////////////////FINAL3////////////////////////

import { useState, useEffect } from "react";
import { Layout, Drawer, Spin, Alert, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../components/slices/sidebarSlice";
import {
  setCurrentUser,
  clearCurrentUser,
  refreshUserData,
} from "../../components/slices/userSlice";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ChatWidget from "../common/ChatWidget";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Sider, Content } = Layout;

const RootLayout = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.sidebar);
  const user = useSelector((state) => state.user.value); // ✅ Now this is the CURRENT user object

  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ FIXED: Single source of truth - Only RootLayout fetches data
  useEffect(() => {
    const fetchFreshUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("🔄 Fetching fresh user data from API...");

        const response = await axios.get(
          "http://localhost:3000/api/v1/user/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          console.log("✅ Fresh user data loaded:", response.data.user);
          const freshUser = response.data.user;
          console.log("✅ API returned user with role:", freshUser.role);

          // ✅ CORRECT: Update Redux with fresh data
          dispatch(setCurrentUser(freshUser));
          console.log("✅ Redux updated with role:", freshUser.role);

          // Also update localStorage for persistence
          localStorage.setItem("currentUser", JSON.stringify(freshUser));
          //     // After successful login, make sure you store:
          //  localStorage.setItem('token', response.data.token);
          //  localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        }
      } catch (err) {
        console.error("❌ Failed to load fresh user data:", err);
        setError("Failed to load user data");

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          dispatch(clearCurrentUser());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFreshUserData();
  }, [dispatch]);

  const handleRetry = async () => {
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const freshUser = response.data.user;
        console.log("🔄 Retry successful - Role:", freshUser.role);

        // ✅ Use refreshUserData for force updates
        dispatch(refreshUserData(freshUser));
        localStorage.setItem("currentUser", JSON.stringify(freshUser));
      }
    } catch (err) {
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ NUCLEAR OPTION: Force complete refresh
  const forceNuclearRefresh = () => {
    console.log("💥 Nuclear refresh initiated");
    // localStorage.removeItem('user');
    localStorage.removeItem("currentUser");
    dispatch(clearCurrentUser());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleToggle = () => {
    if (isMobile) {
      setMobileDrawerVisible(!mobileDrawerVisible);
    } else {
      dispatch(toggleSidebar());
    }
  };

  const sidebarContent = <Sidebar />;

  // Show loading while fetching fresh data
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        {/* <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          size="large"
          tip="Loading your dashboard..."
        /> */}

        <Spin
          spinning={loading}
          size="large"
          tip="Loading fresh data..."
          indicator={antIcon}
        >
          <div
            style={{
              background: loading ? "#f5f5f5" : "transparent",
              padding: "10px",
            }}
          >
            <h2>Data Status: {loading ? "Loading..." : "Loaded"}</h2>

            {!loading && data && (
              <div style={{ marginTop: "15px" }}>
                <p>
                  <strong>ID:</strong> {data.id}
                </p>
                <p>
                  <strong>Value:</strong> {data.value}
                </p>
                <p>
                  <strong>Fetched At:</strong> {data.timestamp}
                </p>
              </div>
            )}
          </div>
        </Spin>
      </div>
    );
  }

  // Show error with retry option
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <Alert
          message="Failed to Load Dashboard"
          description={error}
          type="error"
          showIcon
          action={
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={handleRetry}
            >
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <Layout className="h-screen">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="shadow-lg border-r border-gray-200 dark:border-gray-700"
          width={256}
          collapsedWidth={80}
          theme="light"
        >
          {sidebarContent}
        </Sider>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          styles={{ padding: 0 }}
          width={280}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Layout>
        <Header onToggle={handleToggle} isMobile={isMobile} user={user} />
        <Content className="overflow-auto p-2">

          <div className="min-h-full rounded-lg shadow-sm p-1">
   
            <Outlet />
          </div>
        </Content>
      </Layout>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatWidget />
      </div>

      {/* ✅ FIXED Debug Info */}

      {/* <div
        style={{
          position: "fixed",
          bottom: 10,
          left: 10,
          background: "rgba(0,0,0,0.9)",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          fontSize: "12px",
          zIndex: 9999,
          maxWidth: "400px", 
          fontFamily: "monospace",
          border:
            user?.role === "Admin" ? "2px solid #52c41a" : "2px solid #ff4d4f",
        }}
      >
        <div
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#52c41a",
            fontSize: "14px",
          }}
        >
          🔧 REDUX & TOKEN DEBUG PANEL
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: "4px",
            marginBottom: "8px",
          }}
        >
          <div>API Role:</div>
          <div style={{ color: "#52c41a", fontWeight: "bold" }}>Admin ✅</div>

          <div>Redux Role:</div>
          <div
            style={{
              color: user?.role === "Admin" ? "#52c41a" : "#ff4d4f",
              fontWeight: "bold",
              background:
                user?.role === "Admin"
                  ? "rgba(82,196,26,0.2)"
                  : "rgba(255,77,79,0.2)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            {user?.role || "No role"}
          </div>

          <div>User ID:</div>
          <div>{user?.id ? user.id.substring(0, 8) + "..." : "No ID"}</div>

          <div>Email:</div>
          <div>{user?.email || "No email"}</div>

          <div>Source:</div>
          <div>{user?.role ? "Fresh API Data" : "Token Only"}</div>

          
          <div>Token:</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span
              style={{
                color: "#ffa940",
                cursor: "pointer",
              }}
              onClick={() => {
                const token = localStorage.getItem("token");
                console.log("🔐 Full Token:", token);
                navigator.clipboard.writeText(token);
                alert("Token copied to console and clipboard!");
              }}
            >
              {localStorage.getItem("token")
                ? localStorage.getItem("token").substring(0, 20) + "..."
                : "No token"}
            </span>
            <span
              style={{
                fontSize: "10px",
                background: "#722ed1",
                padding: "1px 4px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={() => {
                const token = localStorage.getItem("token");
                if (token) {
                  navigator.clipboard.writeText(token);
                  alert("Token copied to clipboard!");
                }
              }}
            >
              COPY
            </span>
          </div>

          <div>Token Len:</div>
          <div style={{ color: "#ffa940" }}>
            {localStorage.getItem("token")
              ? localStorage.getItem("token").length + " chars"
              : "0"}
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <Button
            size="small"
            type="primary"
            onClick={handleRetry}
            style={{
              fontSize: "10px",
              background: "#1890ff",
              flex: 1,
            }}
          >
            🔄 Refresh
          </Button>

          <Button
            size="small"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                
                try {
                  const payload = JSON.parse(atob(token.split(".")[1]));
                  console.log("🔍 Decoded Token:", payload);
                  alert("Token decoded in console!");
                } catch (e) {
                  console.error("Token decode error:", e);
                }
              }
            }}
            style={{
              fontSize: "10px",
              background: "#722ed1",
              borderColor: "#722ed1",
              flex: 1,
            }}
          >
            🔍 Decode
          </Button>

          <Button
            size="small"
            danger
            onClick={forceNuclearRefresh}
            style={{
              fontSize: "10px",
              flex: 1,
            }}
          >
            💥 Nuclear
          </Button>
        </div>

        {user && (
          <div
            style={{
              marginTop: "6px",
              fontSize: "10px",
              opacity: 0.7,
              borderTop: "1px solid #333",
              paddingTop: "4px",
              color: user?.role === "Admin" ? "#52c41a" : "#ff4d4f",
            }}
          >
            Status:{" "}
            {user?.role === "Admin" ? "✅ SYNCED WITH API" : "❌ OUT OF SYNC"}
          </div>
        )}
      </div> */}
      
    </Layout>
  );
};

export default RootLayout;

// import { useEffect, useState } from 'react';
// import { Layout, Spin } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setCurrentUser } from '../slices/userSlice';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import { Outlet } from 'react-router-dom';
// import { authStorage } from '../../utils/authStorage';

// const { Sider, Content } = Layout;

// const RootLayout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.value);
//   const [loading, setLoading] = useState(true);

//   // 🎯 PERFECT AUTH CHECK - NO ERRORS
//   useEffect(() => {
//     const checkAuth = () => {
//       console.log("🔐 ROOTLAYOUT AUTH CHECK");

//       // 1. CHECK STORAGE
//       const session = authStorage.getSession();

//       if (!session) {
//         console.log("❌ NO SESSION - REDIRECT TO LOGIN");
//         navigate('/login', { replace: true });
//         return;
//       }

//       // 2. UPDATE REDUX
//       console.log("✅ SESSION FOUND - USER:", session.user.role);
//       dispatch(setCurrentUser(session.user));
//       setLoading(false);
//     };

//     checkAuth();
//   }, [dispatch, navigate]);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <Spin size="large" tip="Loading..." />
//       </div>
//     );
//   }

//   return (
//     <Layout className="h-screen">
//       <Sider>
//         <Sidebar />
//       </Sider>

//       <Layout>
//         <Header />
//         <Content className="p-4">
//           <div className="bg-white rounded-lg p-6">
//             <Outlet />
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default RootLayout;

// import { useState, useEffect } from 'react';
// import { Layout, Drawer, Spin, Alert, Button } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toggleSidebar } from '../slices/sidebarSlice';
// import { setCurrentUser, clearCurrentUser } from '../slices/userSlice';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import { Outlet } from 'react-router-dom';
// import axios from 'axios';
// import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
// import { authStorage } from '../../utils/authStorage';

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
// const { Sider, Content } = Layout;

// const RootLayout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const user = useSelector((state) => state.user.value);

//   const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // ✅ ENHANCED: Better authentication check
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = authStorage.getToken();
//       const storedUser = authStorage.getUser();

//       console.log("🔄 RootLayout Auth Initialization:", {
//         hasToken: !!token,
//         hasStoredUser: !!storedUser,
//         hasReduxUser: !!user
//       });

//       // If no token, redirect to login
//       if (!token) {
//         console.log("❌ No token found, redirecting to login");
//         navigate('/login');
//         return;
//       }

//       try {
//         setLoading(true);

//         // If we have stored user data, use it immediately for faster UI
//         if (storedUser) {
//           console.log("📦 Using stored user data:", storedUser.role);
//           dispatch(setCurrentUser(storedUser));
//         }

//         // Then fetch fresh data from API
//         console.log('🔄 Fetching fresh user data from API...');
//         const response = await axios.get(
//           "http://localhost:3000/api/v1/user/me",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             timeout: 10000
//           }
//         );

//         if (response.data.success) {
//           console.log("✅ Fresh user data loaded:", response.data.user);
//           const freshUser = response.data.user;

//           // Update both Redux and localStorage
//           dispatch(setCurrentUser(freshUser));
//           authStorage.saveSession(token, freshUser); // Update storage with fresh data

//           console.log("✅ Auth initialization complete");
//         }
//       } catch (err) {
//         console.error("❌ Failed to initialize auth:", err);

//         if (err.response?.status === 401) {
//           // Token is invalid, clear everything and redirect
//           authStorage.clear();
//           dispatch(clearCurrentUser());
//           navigate('/login');
//         } else {
//           setError("Failed to load user data. Please try refreshing.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, [dispatch, navigate]);

//   const handleRetry = async () => {
//     setError(null);
//     await initializeAuth();
//   };

//   const handleToggle = () => {
//     if (isMobile) {
//       setMobileDrawerVisible(!mobileDrawerVisible);
//     } else {
//       dispatch(toggleSidebar());
//     }
//   };

//   const sidebarContent = <Sidebar />;

//   // Show loading while initializing
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <Spin
//           indicator={antIcon}
//           size="large"
//           tip="Loading your dashboard..."
//         />
//       </div>
//     );
//   }

//   // Show error with retry option
//   if (error) {
//     return (
//       <div className="h-screen flex items-center justify-center p-4">
//         <Alert
//           message="Failed to Load Dashboard"
//           description={error}
//           type="error"
//           showIcon
//           action={
//             <Button size="small" icon={<ReloadOutlined />} onClick={handleRetry}>
//               Retry
//             </Button>
//           }
//         />
//       </div>
//     );
//   }

//   // If no user data but we have token, something went wrong
//   if (!user) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <Alert
//           message="Authentication Error"
//           description="Please log in again."
//           type="error"
//           showIcon
//           action={
//             <Button size="small" onClick={() => navigate('/login')}>
//               Go to Login
//             </Button>
//           }
//         />
//       </div>
//     );
//   }

//   return (
//     <Layout className="h-screen">
//       {/* Desktop Sidebar */}
//       {!isMobile && (
//         <Sider
//           trigger={null}
//           collapsible
//           collapsed={collapsed}
//           className="shadow-lg border-r border-gray-200 dark:border-gray-700"
//           width={256}
//           collapsedWidth={80}
//           theme="light"
//         >
//           {sidebarContent}
//         </Sider>
//       )}

//       {/* Mobile Drawer */}
//       {isMobile && (
//         <Drawer
//           placement="left"
//           onClose={() => setMobileDrawerVisible(false)}
//           open={mobileDrawerVisible}
//           styles={{ padding: 0 }}
//           width={280}
//         >
//           {sidebarContent}
//         </Drawer>
//       )}

//       {/* Main Content */}
//       <Layout>
//         <Header onToggle={handleToggle} isMobile={isMobile} />
//         <Content className="overflow-auto bg-gray-50 dark:bg-gray-900 p-4">
//           <div className="min-h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
//             <Outlet />
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default RootLayout;
