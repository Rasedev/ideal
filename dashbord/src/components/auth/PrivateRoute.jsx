
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';

// /**
//  * PrivateRoute Component
//  * Protects routes that require authentication
//  * 
//  * @param {Object} props
//  * @param {ReactNode} props.children - The child components to render if authenticated
//  * @param {Array} props.allowedRoles - Array of roles that are allowed to access the route
//  * @param {boolean} props.requireAuth - Whether authentication is required (default: true)
//  * @param {string} props.redirectPath - Path to redirect if not authenticated (default: '/login')
//  */
// const PrivateRoute = ({ 
//   children, 
//   allowedRoles = [], 
//   requireAuth = true,
//   redirectPath = '/login'
// }) => {
//   const user = useSelector((state) => state.user?.value);
//   const location = useLocation();
//   const token = localStorage.getItem('token');
//   // const token = authStorage.getToken();

//   // const user = authStorage.getUser();

  

//   // Show loading spinner while checking authentication
//   if (user === undefined) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Spin 
//           indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
//           size="large"
//           tip="Checking authentication..."
//         />
//       </div>
//     );
//   }

//   // If authentication is not required, render children
//   if (!requireAuth) {
//     return children;
//   }

//   // Redirect to login if no token or user data
//   if (!token || !user) {
//     return (
//       <Navigate 
//         to={redirectPath} 
//         state={{ from: location }} 
//         replace 
//       />
//     );
//   }

//   // Check if user role is allowed
//   if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//     return (
//       <Navigate 
//         to="/unauthorized" 
//         state={{ 
//           from: location,
//           requiredRole: allowedRoles,
//           currentRole: user.role
//         }} 
//         replace 
//       />
//     );
//   }

//   // User is authenticated and has required role, render children
//   return children;
// };

// /**
//  * RoleBasedRoute Component
//  * Higher-order component for role-based access control
//  */
// export const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
//   return (
//     <PrivateRoute allowedRoles={allowedRoles}>
//       {children}
//     </PrivateRoute>
//   );
// };

// /**
//  * AdminRoute Component
//  * Only allows users with admin role
//  */
// export const AdminRoute = ({ children }) => {
//   return (
//     <PrivateRoute allowedRoles={['admin']}>
//       {children}
//     </PrivateRoute>
//   );
// };

// /**
//  * HRRoute Component
//  * Only allows users with hr or admin role
//  */
// export const HRRoute = ({ children }) => {
//   return (
//     <PrivateRoute allowedRoles={['admin', 'hr']}>
//       {children}
//     </PrivateRoute>
//   );
// };

// /**
//  * EmployeeRoute Component
//  * Only allows users with employee, hr, or admin role
//  */
// export const EmployeeRoute = ({ children }) => {
//   return (
//     <PrivateRoute allowedRoles={['admin', 'hr', 'employee']}>
//       {children}
//     </PrivateRoute>
//   );
// };

// /**
//  * MemberRoute Component
//  * Only allows users with member role and above
//  */
// export const MemberRoute = ({ children }) => {
//   return (
//     <PrivateRoute allowedRoles={['admin', 'hr', 'employee', 'member']}>
//       {children}
//     </PrivateRoute>
//   );
// };

// /**
//  * PublicRoute Component
//  * Only allows unauthenticated users (for login, register pages)
//  */
// export const PublicRoute = ({ children, redirectPath = '/' }) => {
//   const user = useSelector((state) => state.user?.value);
//   const token = localStorage.getItem('token');
//   const location = useLocation();

//   // Show loading spinner while checking authentication
//   if (user === undefined) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Spin 
//           indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
//           size="large"
//           tip="Checking authentication..."
//         />
//       </div>
//     );
//   }

//   // Redirect to home if already authenticated
//   if (token && user) {
//     const from = location.state?.from?.pathname || redirectPath;
//     return <Navigate to={from} replace />;
//   }

//   // User is not authenticated, render public content
//   return children;
// };

// export default PrivateRoute;




 


/////////////////////Corrected Final/////////////////////


import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const PrivateRoute = ({ 
  children, 
  allowedRoles = [], 
  requireAuth = true,
  redirectPath = '/login'
}) => {
  const user = useSelector((state) => state.user?.value);
  const location = useLocation();
  const token = localStorage.getItem('token');

  console.log("🛡️ PrivateRoute Check:", {
    hasToken: !!token,
    hasUser: !!user,
    userRole: user?.role,
    currentPath: location.pathname,
    allowedRoles
  });

  // In your PrivateRoute.jsx, add this debugging:
useEffect(() => {
  console.log('🔐 PrivateRoute Debug:', {
    hasToken: !!localStorage.getItem('token'),
    user: user, // Your Redux user state
    userRole: user?.role,
    currentPath: location.pathname
  });
}, [user, location.pathname]);

  // Show loading while checking (user might be undefined initially)
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          size="large"
          tip="Checking authentication..."
        />
      </div>
    );
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return children;
  }

  // Redirect to login if no token or user data
  if (!token || !user) {
    console.log("🛡️ Redirecting to login - No token or user");
    return (
      <Navigate 
        to={redirectPath} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check if user role is allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log("🛡️ Redirecting to unauthorized - Role not allowed");
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ 
          from: location,
          requiredRole: allowedRoles,
          currentRole: user.role
        }} 
        replace 
      />
    );
  }

  console.log("🛡️ Access granted to:", location.pathname);
  // User is authenticated and has required role, render children
  return children;
};

export default PrivateRoute;











