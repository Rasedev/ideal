// utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const verifyToken = async (token) => {
  try {
    if (!token) return false;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

export const getUserRole = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const user = JSON.parse(userInfo);
      return user.role;
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const hasPermission = (requiredRole) => {
  const userRole = getUserRole();
  const roleHierarchy = {
    member: 1,
    employee: 2,
    hr: 3,
    admin: 4,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};