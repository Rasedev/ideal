// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const user = useSelector((state) => state.user?.value);
  const token = localStorage.getItem('token');

  console.log("PrivateRoute - User:", user);
  console.log("PrivateRoute - Token:", token);
  console.log("PrivateRoute - Allowed Roles:", allowedRoles);

  if (!token || !user) {
    console.log("No token or user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log("Role not allowed, redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;