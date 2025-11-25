
//////////////////////////////////////////FINAL333333333333333333/////////////////////////////////

// import { useSelector, useDispatch } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { setCurrentUser } from "../../components/slices/userSlice";
// import { Spin, Alert, Button } from "antd";
// import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
// import axios from "axios";

// const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.value);
//   const location = useLocation();
//   const token = localStorage.getItem("token");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Load fresh user data on route change
//   const loadFreshUserData = async () => {
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/v1/user/me",
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (response.data.success) {
//         dispatch(setCurrentUser(response.data.user));
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//         setError(null);
//       }
//     } catch (err) {
//       console.error("Failed to load fresh user data:", err);
//       setError("Failed to verify user permissions");
      
//       // Try to refresh token if this fails
//       if (err.response?.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initializeUser = async () => {
//       // Load from localStorage first for immediate UI
//       if (!user && token) {
//         try {
//           const storedUser = JSON.parse(localStorage.getItem("user"));
//           if (storedUser) {
//             dispatch(setCurrentUser(storedUser));
//           }
//         } catch (error) {
//           console.error("Error parsing stored user:", error);
//         }
//       }

//       // Then load fresh data from API
//       await loadFreshUserData();
//     };

//     initializeUser();
//   }, [token, location.pathname]); // Reload when route changes

//   const handleRetry = () => {
//     setLoading(true);
//     setError(null);
//     loadFreshUserData();
//   };

//   // Show loading while initializing
//   // if (loading) {
//   //   return (
//   //     <div className="flex justify-center items-center min-h-64">
//   //       <Spin 
//   //         indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
//   //         tip="Verifying permissions..."
//   //       />
//   //     </div>
//   //   );
//   // }
//   // Show loading while initializing
// if (loading) {
//   return (
//     // You can keep the div for basic centering or remove it if 'fullscreen' is used
//     <div className="flex justify-center items-center min-h-screen">
//       <Spin 
//         indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
//         tip="Verifying permissions..."
//         // ✅ FIX 1: Add the fullscreen prop
//         fullscreen 
//       />
//     </div>
//   );
// }

//   // Show error with retry option
//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <Alert
//           message="Permission Check Failed"
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

//   // 🧩 1. No token or user → redirect to login
//   if (!token || !user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // 🧩 2. If no specific roles required, allow access
//   if (allowedRoles.length === 0) {
//     return children;
//   }

//   // 🧩 3. User logged in but not allowed → show access denied
//   if (!allowedRoles.includes(user.role)) {
//     return (
//       <div className="p-6">
//         <Alert
//           message="Access Denied"
//           description={
//             <div>
//               <p>Your role <strong>"{user.role}"</strong> does not have access to this page.</p>
//               <p>Required roles: <strong>{allowedRoles.join(", ")}</strong></p>
//               <p className="text-sm text-gray-600 mt-2">
//                 If your role was recently updated, try refreshing the page or contact administrator.
//               </p>
//             </div>
//           }
//           type="error"
//           showIcon
//           action={
//             <Button 
//               size="small" 
//               icon={<ReloadOutlined />} 
//               onClick={() => window.location.reload()}
//             >
//               Refresh
//             </Button>
//           }
//         />
//       </div>

      
//     );
//   }

//   // 🧩 4. Otherwise → render child route
//   return children;


  



// };

// export default RoleBasedRoute;





//////////////////////////////////////////FINAL333333333333333333/////////////////////////////////



// import { useSelector,useDispatch } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import { Spin, Alert, Button } from "antd";
// import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";

// const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
//   const user = useSelector((state) => state.user.value);
//    const dispatch = useDispatch();
//   const location = useLocation();
//   const token = localStorage.getItem("token");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Small delay to ensure Redux state is updated
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const initializeUser = async () => {
//       const token = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('currentUser');

//       if (token && storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
//           console.log("🔄 Initializing user from localStorage:", userData);

//           if (!userData.role || !userData.id) {
//             // Fetch fresh data if missing
//             const response = await axios.get(
//               "http://localhost:3000/api/v1/user/me",
//               { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (response.data.success) {
//               dispatch(setCurrentUser(response.data.user)); // ✅ use dispatch
//               localStorage.setItem('currentUser', JSON.stringify(response.data.user));
//             }
//           } else {
//             dispatch(setCurrentUser(userData)); // ✅ use dispatch
//           }
//         } catch (error) {
//           console.error("Error initializing user:", error);
//         }
//       }
//       setLoading(false);
//     };

//     initializeUser();
//   }, [dispatch]);
   
  
  
// //   useEffect(() => {
// //   const initializeUser = async () => {
// //     const token = localStorage.getItem('token');
// //     const storedUser = localStorage.getItem('currentUser');

// //     if (token && storedUser) {
// //       try {
// //         const userData = JSON.parse(storedUser);
// //         console.log("🔄 Initializing user from localStorage:", userData);
        
// //         // Only fetch fresh data if we don't have user data
// //         if (!userData.role || !userData.id) {
// //           await fetchFreshUserData();
// //         } else {
// //           dispatch(setCurrentUser(userData));
// //         }
// //       } catch (error) {
// //         console.error("Error initializing user:", error);
// //         await fetchFreshUserData();
// //       }
// //     }
// //     setLoading(false);
// //   };

// //   initializeUser();
// // }, [dispatch]);


//   console.log("🎭 RoleBasedRoute Check:", {
//     userRole: user?.role,
//     allowedRoles,
//     hasToken: !!token,
//     path: location.pathname
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <Spin 
//           indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
//           tip="Checking permissions..."
//         />
//       </div>
//     );
//   }

//   // No token or user - redirect to login
//   if (!token || !user) {
//     console.log("🔐 Redirecting to login from RoleBasedRoute");
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // If no specific roles required, allow access
//   if (allowedRoles.length === 0) {
//     console.log("✅ No role restrictions - Access granted");
//     return children;
//   }

//   // Check if user's role is in allowed roles
//   const userRole = user.role?.toLowerCase();
//   const isAllowed = allowedRoles.some(role => 
//     role.toLowerCase() === userRole
//   );

//   console.log("🔍 Role Check:", {
//     userRole,
//     allowedRoles,
//     isAllowed
//   });

//   if (!isAllowed) {
//     return (
//       <div className="p-6">
//         <Alert
//           message="Access Denied"
//           description={
//             <div>
//               <p>Your role <strong>"{user.role}"</strong> does not have access to this page.</p>
//               <p>Required roles: <strong>{allowedRoles.join(", ")}</strong></p>
//               <p className="text-sm text-gray-600 mt-2">
//                 If you believe this is an error, please contact your administrator.
//               </p>
//             </div>
//           }
//           type="error"
//           showIcon
//           action={
//             <Button 
//               size="small" 
//               icon={<ReloadOutlined />} 
//               onClick={() => window.location.reload()}
//             >
//               Refresh
//             </Button>
//           }
//         />
//       </div>
//     );
//   }

//   console.log("✅ Role-based access granted for:", user.role);
//   return children;
// };

// export default RoleBasedRoute;



import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Spin, Alert, Button } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls
// 🚨 IMPORTANT: I am assuming the userSlice action is available at the relative path below.
// If this path is still incorrect, please provide the file contents of userSlice.js.
import { setCurrentUser } from "../slices/userSlice"; 

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  // Initial loading delay (kept for state sync)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only run this initialization if we haven't determined the user role yet
    if (user?.role || !token) {
        setLoading(false);
        return;
    }
    
    const initializeUser = async () => {
      const storedUser = localStorage.getItem('currentUser');

      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log("🔄 Initializing user from localStorage:", userData);

          // If we have an ID but not a role, or if data seems stale, fetch fresh data
          if (!userData.role || !userData.id) {
            console.log("⏳ Fetching fresh user data...");
            const response = await axios.get(
              "http://localhost:3000/api/v1/user/me",
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
              dispatch(setCurrentUser(response.data.user)); 
              localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            } else {
                console.warn("API call failed to fetch user data.");
            }
          } else {
            dispatch(setCurrentUser(userData)); 
          }
        } catch (error) {
          console.error("Error initializing user or parsing data:", error);
          // If the token is bad, or API fails, let the check below handle redirection.
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, [dispatch, token, user?.role]);
   
  
  console.log("🎭 RoleBasedRoute Check:", {
    userRole: user?.role,
    allowedRoles,
    hasToken: !!token,
    path: location.pathname
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          tip="Checking permissions..."
        />
      </div>
    );
  }

  // No token or user (after loading finishes) - redirect to login
  if (!token || !user?.role) { 
    console.log("🔐 Redirecting to login from RoleBasedRoute");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles required, allow access
  if (allowedRoles.length === 0) {
    console.log("✅ No role restrictions - Access granted");
    return children;
  }

  // Check if user's role is in allowed roles
  const userRole = user.role?.toLowerCase();
  const isAllowed = allowedRoles.some(role => 
    role.toLowerCase() === userRole
  );

  console.log("🔍 Role Check:", {
    userRole,
    allowedRoles,
    isAllowed
  });

  if (!isAllowed) {
    return (
      <div className="p-6 max-w-lg mx-auto mt-10">
        <Alert
          message="Access Denied"
          description={
            <div>
              <p>Your role <strong>"{user.role}"</strong> does not have access to this page.</p>
              <p>Required roles: <strong>{allowedRoles.join(", ")}</strong></p>
              <p className="text-sm text-gray-600 mt-2">
                If you believe this is an error, please contact your administrator.
              </p>
            </div>
          }
          type="error"
          showIcon
          action={
            <Button 
              size="small" 
              icon={<ReloadOutlined />} 
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          }
        />
      </div>
    );
  }

  console.log("✅ Role-based access granted for:", user.role);
  return children;
};

export default RoleBasedRoute;



