import axios from 'axios';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

// Add token to all requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh on 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshResponse = await axios.post(
          'http://localhost:3000/api/v1/authentication/refresh-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (refreshResponse.data.success) {
          const newToken = refreshResponse.data.token;
          const newUser = refreshResponse.data.user;
          
          // Update storage
          localStorage.setItem('token', newToken);
          localStorage.setItem('user', JSON.stringify(newUser));
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Refresh user data from backend
export const refreshUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('❌ No token found');
      return null;
    }

    console.log('🔄 Refreshing user data with token:', token.substring(0, 20) + '...');

    const response = await api.get('/user/me');
    
    if (response.data.success) {
      const freshUser = response.data.user;
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(freshUser));
      
      console.log('✅ User data refreshed:', {
        role: freshUser.role,
        email: freshUser.email
      });
      
      return freshUser;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Failed to refresh user data:', error);
    
    if (error.response?.status === 401) {
      console.log('🔄 Token expired, attempting refresh...');
      try {
        // Try to refresh token
        const refreshResponse = await axios.post(
          'http://localhost:3000/api/v1/authentication/refresh-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (refreshResponse.data.success) {
          // Update token and retry
          localStorage.setItem('token', refreshResponse.data.token);
          localStorage.setItem('user', JSON.stringify(refreshResponse.data.user));
          return refreshResponse.data.user;
        }
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        // Clear invalid tokens
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return null;
  }
};

// Force refresh after role update (call this after updating user role)
export const refreshAfterRoleUpdate = async (userId) => {
  try {
    console.log('🔄 Force refreshing role for user:', userId);
    
    const response = await api.post(`/user/${userId}/refresh-role`);
    
    if (response.data.success) {
      // Update token and user data
      localStorage.setItem('token', response.data.newToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      console.log('✅ Role refreshed successfully:', response.data.user.role);
      return response.data.user;
    }
  } catch (error) {
    console.error('❌ Failed to refresh role:', error);
    // Fallback to normal refresh
    return await refreshUserData();
  }
};

// Check if user needs data refresh
export const shouldRefreshUserData = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  
  if (!user || !token) {
    return true;
  }
  
  // Refresh if user data is more than 5 minutes old
  const lastRefresh = localStorage.getItem('lastUserRefresh');
  if (!lastRefresh) return true;
  
  return (Date.now() - parseInt(lastRefresh)) > 5 * 60 * 1000; // 5 minutes
};

export default api;