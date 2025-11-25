
//////////////////Final Version///////////////////////


// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// // Create axios instance
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 15000,
// });

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     console.log('🔐 API Request - Token:', token ? 'Present' : 'Missing');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.status, error.config?.url);
    
//     if (error.response?.status === 401) {
//        console.log('🚨 Authentication failed, redirecting to login');
//       localStorage.removeItem('token');
//       localStorage.removeItem('currentUser');
//       window.location.href = '/login';
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Complete API Service with all methods
// export const apiService = {
//   // 🔹 Auth - CORRECTED ENDPOINTS
// //  authentication: {
// //   registration: (data) =>apiClient.post("/authentication/registration", data),
// //   login: (data) =>apiClient.post("/authentication/login", data),
// //   forgotPassword: (data) =>apiClient.post("/authentication/forgot-password", data),
// //   resetPassword: (data) =>apiClient.post("/authentication/reset-password", data),
// //   emailVerification: (token) =>apiClient.get(`/authentication/emailverification/${token}`),
// //   refreshToken: () =>apiClient.post("/authentication/refresh-token"),
// //   },



//   // User API methods
//   user: {
//     getUserStats: () => apiClient.get('/user/stats'),
//     getUserProfile: (userId) => apiClient.get(`/user/${userId}`),
//     getCurrentUser: () => apiClient.get('/user/me'),
//     updateProfile: (data) => apiClient.put('/user/profile', data),
//     changePassword: (data) => apiClient.put('/user/change-password', data),
//     uploadPhoto: (data) => apiClient.put('/user/profile/photo', data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }),
//     createUser: (data) => apiClient.post('/user/createuser', data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }),
//     getAllUsers: (params = {}) => apiClient.get('/user/alluser', { params }),
//     updateUser: (id, data) => apiClient.put(`/user/userupdate/${id}`, data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }),
//     deleteUser: (id) => apiClient.delete(`/user/userdelete/${id}`),
//     updateUserStatus: (data) => apiClient.patch('/user/userstatus', data),
//     getUserReport: (params = {}) => apiClient.get('/user/userreport', { params }),
//   },

//   // Notification API methods
//   notification: {
//     getNotifications: (params = {}) => apiClient.get('/notifications', { params }),
//     markAsRead: (notificationId) => apiClient.patch(`/notifications/${notificationId}/read`),
//     markAllAsRead: () => apiClient.patch('/notifications/mark-all-read'),
//     getUnreadCount: () => apiClient.get('/notifications/unread-count'),
//   },

//   // Search API methods
//   search: {
//     globalSearch: (query, filters = {}) => apiClient.post('/search/global', { query, filters }),
//     getSuggestions: (query) => apiClient.get('/search/suggestions', { params: { q: query } }),
//   },

//   // Chat API methods
//   chat: {
//     getUserChats: (params = {}) => apiClient.get('/chat/chats', { params }),
//     getOrCreateChat: (receiverId) => apiClient.post('/chat/open', { receiverId }),
//     getChatMessages: (chatId, params = {}) => apiClient.get(`/chat/${chatId}/messages`, { params }),
//     sendMessage: (chatId, data) => apiClient.post(`/chat/${chatId}/send`, data),
//   },

//   // Employee API methods
//   // employee: {
//   //   create: (data) => apiClient.post('/employee/createemployee', data, {
//   //     headers: { 'Content-Type': 'multipart/form-data' }
//   //   }),
//   //   getAll: (params = {}) => apiClient.get('/employee/allemployee', { params }),
//   //   getById: (id) => apiClient.get(`/employee/${id}`),
//   //   update: (id, data) => apiClient.put(`/employee/update/${id}`, data, {
//   //     headers: { 'Content-Type': 'multipart/form-data' }
//   //   }),
//   //   delete: (id) => apiClient.delete(`/employee/delete/${id}`),
//   //   updateStatus: (id, status) => apiClient.patch(`/employee/status/${id}`, { status }),
//   //   getStats: () => apiClient.get('/employee/stats'),
//   //   search: (query) => apiClient.get('/employee/search', { params: query }),
//   //   export: () => apiClient.get('/employee/export'),
//   //   uploadDocument: (id, data) => apiClient.post(`/employee/${id}/documents`, data, {
//   //     headers: { 'Content-Type': 'multipart/form-data' }
//   //   }),
//   // },
// employee: {
//   create: (formData) => api.post('/employee/createemployee', formData, {headers: { 'Content-Type': 'multipart/form-data' }}),
//   getAll: () => api.get('/employee/allemployee'),  
//   getById: (id) => api.get(`/employee/${id}`),
//   update: (id, formData) => api.put(`/employee/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }}), 
//   delete: (id) => api.delete(`/employee/delete/${id}`),
//   updateStatus: (id, status) => api.patch(`/employee/status/${id}`, { status }),  
//   getStats: () => api.get('/employee/stats'),
// },




//   // Member API methods
//   member: {
//     create: (data) => apiClient.post('/member/createmember', data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }),
//     getAll: (params = {}) => apiClient.get('/member/allmember', { params }),
//     getById: (id) => apiClient.get(`/member/Memberid/${id}`),
//     update: (id, data) => apiClient.put(`/member/updatemember/${id}`, data),
//     delete: (id) => apiClient.delete(`/member/deletemember/${id}`),
//     getStats: () => apiClient.get('/member/memberstats/overview'),
//   },

//   memberApproval: {
//     getPendingRegistrations: (params = {}) => apiClient.get('/member/registrations', { params }),
//     approveRegistration: (id) => apiClient.put(`/member/approve/${id}`),
//     rejectRegistration: (id, reason) => apiClient.put(`/member/reject/${id}`, { reason }),
//   },

//   // Contact API methods
//   contact: {
//     getContacts: (params = {}) => apiClient.get('/contact/contacts', { params }),
//     createContact: (data) => apiClient.post('/contact/contacts', data),
//     getContactDetails: (userId) => apiClient.get(`/contact/contacts/${userId}`),
//     updateContact: (userId, data) => apiClient.put(`/contact/contacts/${userId}`, data),
//     deleteContact: (userId) => apiClient.delete(`/contact/contacts/${userId}`),
//     getUsersByRole: (role, params = {}) => apiClient.get(`/contact/users/${role}`, { params }),
//     updateContactPreferences: (userId, preferences) => 
//       apiClient.put(`/contact/contact-preferences/${userId}`, preferences),
//   },

//   // Email API methods
//   email: {
//     send: (data) => apiClient.post('/email/send', data),
//     getEmails: (params = {}) => apiClient.get('/email', { params }),
//     getStats: () => apiClient.get('/email/stats'),
//   },

//   // SMS API methods
//   sms: {
//     sendSMS: (data) => apiClient.post('/sms/send', data),
//     sendBulkSMS: (data) => apiClient.post('/sms/bulk-send', data),
//     getSMSHistory: (params = {}) => apiClient.get('/sms/history', { params }),
//     getSMSStats: () => apiClient.get('/sms/stats'),
//     createCampaign: (data) => apiClient.post('/sms/campaign', data),
//     getCampaigns: (params = {}) => apiClient.get('/sms/campaigns', { params }),
//     getCampaignDetails: (id) => apiClient.get(`/sms/campaign/${id}`),
//   },

//   // Application API methods
//   application: {
//     create: (data) => apiClient.post('/application/create', data),
//     getMyApplications: (params = {}) => apiClient.get('/application/my-applications', { params }),
//     getAllApplications: (params = {}) => apiClient.get('/application/all', { params }),
//     getApplicationById: (id) => apiClient.get(`/application/${id}`),
//     updateStatus: (id, data) => apiClient.put(`/application/update-status/${id}`, data),
//     getStats: () => apiClient.get('/application/stats/overview'),
//   },

//   // Health check utility
//   health: {
//     check: async () => {
//       try {
//         const baseURL = API_BASE_URL.replace('/api/v1', '');
//         const response = await axios.get(`${baseURL}/api/v1/health`, { timeout: 5000 });
//         return { online: true, data: response.data };
//       } catch (error) {
//         return { online: false, error: error.message };
//       }
//     }
//   }
// };

// // Export individual APIs for backward compatibility
// // export const authAPI = apiService.authentication;
// export const userAPI = apiService.user;
// export const employeeAPI = apiService.employee;
// export const memberAPI = apiService.member;
// export const emailAPI = apiService.email;
// export const chatAPI = apiService.chat;
// export const contactAPI = apiService.contact;
// export const smsAPI = apiService.sms;
// export const searchAPI = apiService.search;
// export const notificationAPI = apiService.notification;

// export default apiClient;







import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔐 API Request - Token:', token ? 'Present' : 'Missing');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.config?.url);
    
    if (error.response?.status === 401) {
       console.log('🚨 Authentication failed, redirecting to login');
       localStorage.removeItem('token');
       localStorage.removeItem('currentUser');
       window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Complete API Service with all methods
export const apiService = {
  // User API methods
  user: {
    getUserStats: () => apiClient.get('/user/stats'),
    getUserProfile: (userId) => apiClient.get(`/user/${userId}`),
    getCurrentUser: () => apiClient.get('/user/me'),
    updateProfile: (data) => apiClient.put('/user/profile', data),
    changePassword: (data) => apiClient.put('/user/change-password', data),
    uploadPhoto: (data) => apiClient.put('/user/profile/photo', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    createUser: (data) => apiClient.post('/user/createuser', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getAllUsers: (params = {}) => apiClient.get('/user/alluser', { params }),
    updateUser: (id, data) => apiClient.put(`/user/userupdate/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    deleteUser: (id) => apiClient.delete(`/user/userdelete/${id}`),
    updateUserStatus: (data) => apiClient.patch('/user/userstatus', data),
    getUserReport: (params = {}) => apiClient.get('/user/userreport', { params }),
  },

  // Notification API methods
  notification: {
    getNotifications: (params = {}) => apiClient.get('/notifications', { params }),
    markAsRead: (notificationId) => apiClient.patch(`/notifications/${notificationId}/read`),
    markAllAsRead: () => apiClient.patch('/notifications/mark-all-read'),
    getUnreadCount: () => apiClient.get('/notifications/unread-count'),
  },

  // Search API methods
  search: {
    globalSearch: (query, filters = {}) => apiClient.post('/search/global', { query, filters }),
    getSuggestions: (query) => apiClient.get('/search/suggestions', { params: { q: query } }),
  },

  // Chat API methods
  chat: {
    getUserChats: (params = {}) => apiClient.get('/chat/chats', { params }),
    getOrCreateChat: (receiverId) => apiClient.post('/chat/open', { receiverId }),
    getChatMessages: (chatId, params = {}) => apiClient.get(`/chat/${chatId}/messages`, { params }),
    sendMessage: (chatId, data) => apiClient.post(`/chat/${chatId}/send`, data),
  },

  // Employee API methods
  employee: {
    // 🚩 FIX: Changed 'api' to 'apiClient'
    create: (formData) => apiClient.post('/employee/createemployee', formData, {headers: { 'Content-Type': 'multipart/form-data' }}),
    // 🚩 FIX: Changed 'api' to 'apiClient'
    getAll: () => apiClient.get('/employee/allemployee'),  
    getById: (id) => apiClient.get(`/employee/${id}`),
    // 🚩 FIX: Changed 'api' to 'apiClient'
    update: (id, formData) => apiClient.put(`/employee/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }}), 
    delete: (id) => apiClient.delete(`/employee/delete/${id}`),
    // 🚩 FIX: Changed 'api' to 'apiClient'
    updateStatus: (id, status) => apiClient.patch(`/employee/status/${id}`, { status }),  
    // 🚩 FIX: Changed 'api' to 'apiClient'
    getStats: () => apiClient.get('/employee/stats'),
  },

  // Member API methods
  member: {
    create: (data) => apiClient.post('/member/createmember', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getAll: (params = {}) => apiClient.get('/member/allmember', { params }),
    getById: (id) => apiClient.get(`/member/Memberid/${id}`),
    update: (id, data) => apiClient.put(`/member/updatemember/${id}`, data),
    delete: (id) => apiClient.delete(`/member/deletemember/${id}`),
    getStats: () => apiClient.get('/member/memberstats/overview'),
  },

  memberApproval: {
    getPendingRegistrations: (params = {}) => apiClient.get('/member/registrations', { params }),
    approveRegistration: (id) => apiClient.put(`/member/approve/${id}`),
    rejectRegistration: (id, reason) => apiClient.put(`/member/reject/${id}`, { reason }),
  },

  // Contact API methods
  contact: {
    getContacts: (params = {}) => apiClient.get('/contact/contacts', { params }),
    createContact: (data) => apiClient.post('/contact/contacts', data),
    getContactDetails: (userId) => apiClient.get(`/contact/contacts/${userId}`),
    updateContact: (userId, data) => apiClient.put(`/contact/contacts/${userId}`, data),
    deleteContact: (userId) => apiClient.delete(`/contact/contacts/${userId}`),
    getUsersByRole: (role, params = {}) => apiClient.get(`/contact/users/${role}`, { params }),
    updateContactPreferences: (userId, preferences) => 
      apiClient.put(`/contact/contact-preferences/${userId}`, preferences),
  },

  // Email API methods
  email: {
    send: (data) => apiClient.post('/email/send', data),
    getEmails: (params = {}) => apiClient.get('/email', { params }),
    getStats: () => apiClient.get('/email/stats'),
  },

  // SMS API methods
  sms: {
    sendSMS: (data) => apiClient.post('/sms/send', data),
    sendBulkSMS: (data) => apiClient.post('/sms/bulk-send', data),
    getSMSHistory: (params = {}) => apiClient.get('/sms/history', { params }),
    getSMSStats: () => apiClient.get('/sms/stats'),
    createCampaign: (data) => apiClient.post('/sms/campaign', data),
    getCampaigns: (params = {}) => apiClient.get('/sms/campaigns', { params }),
    getCampaignDetails: (id) => apiClient.get(`/sms/campaign/${id}`),
  },

  // Application API methods
  application: {
    create: (data) => apiClient.post('/application/create', data),
    getMyApplications: (params = {}) => apiClient.get('/application/my-applications', { params }),
    getAllApplications: (params = {}) => apiClient.get('/application/all', { params }),
    getApplicationById: (id) => apiClient.get(`/application/${id}`),
    updateStatus: (id, data) => apiClient.put(`/application/update-status/${id}`, data),
    getStats: () => apiClient.get('/application/stats/overview'),
  },

  // Health check utility
  health: {
    check: async () => {
      try {
        const baseURL = API_BASE_URL.replace('/api/v1', '');
        const response = await axios.get(`${baseURL}/api/v1/health`, { timeout: 5000 });
        return { online: true, data: response.data };
      } catch (error) {
        return { online: false, error: error.message };
      }
    }
  }
};

// Export individual APIs for backward compatibility
export const userAPI = apiService.user;
export const employeeAPI = apiService.employee;
export const memberAPI = apiService.member;
export const emailAPI = apiService.email;
export const chatAPI = apiService.chat;
export const contactAPI = apiService.contact;
export const smsAPI = apiService.sms;
export const searchAPI = apiService.search;
export const notificationAPI = apiService.notification;

export default apiClient;









///////////////////////22222222222222222/////////////////////////



// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// // Create axios instance with better configuration
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000, // Increased timeout for file uploads
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     // Log request for debugging
//     console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request interceptor error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor with enhanced error handling
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log(`✅ API Response: ${response.status} ${response.config.url}`, response.data);
//     return response;
//   },
//   (error) => {
//     const { response, config, code } = error;
    
//     console.error('❌ API Error:', {
//       url: config?.url,
//       method: config?.method,
//       status: response?.status,
//       code: code,
//       message: error.message
//     });

//     // Handle network errors
//     if (code === 'ERR_NETWORK' || code === 'ECONNREFUSED') {
//       console.error('🌐 Network Error: Backend server might be down');
//       error.message = 'Cannot connect to server. Please make sure the backend is running on http://localhost:3000';
//     }
    
//     // Handle timeout errors
//     if (code === 'ECONNABORTED') {
//       console.error('⏰ Request timeout');
//       error.message = 'Request timeout. The server is taking too long to respond.';
//     }
    
//     // Handle HTTP errors
//     if (response) {
//       switch (response.status) {
//         case 401:
//           console.warn('🔐 Unauthorized - Redirecting to login');
//           localStorage.removeItem('token');
//           localStorage.removeItem('currentUser');
//           // Use window.location for reliable redirect
//           setTimeout(() => {
//             window.location.href = '/login';
//           }, 1000);
//           break;
          
//         case 403:
//           console.warn('🚫 Forbidden - Insufficient permissions');
//           error.message = response.data?.error || 'Access denied. Insufficient permissions.';
//           break;
          
//         case 404:
//           console.warn('🔍 Not Found - API endpoint does not exist');
//           error.message = response.data?.message || 'API endpoint not found.';
//           break;
          
//         case 500:
//           console.error('💥 Server Error');
//           error.message = response.data?.message || 'Internal server error. Please try again later.';
//           break;
          
//         default:
//           error.message = response.data?.message || `HTTP Error: ${response.status}`;
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Health check function
// export const checkServerHealth = async () => {
//   try {
//     const baseURL = API_BASE_URL.replace('/api/v1', '');
//     const response = await axios.get(`${baseURL}/api/health`, {
//       timeout: 5000,
//     });
//     return {
//       online: true,
//       data: response.data,
//       timestamp: new Date().toISOString()
//     };
//   } catch (error) {
//     return {
//       online: false,
//       error: error.message,
//       timestamp: new Date().toISOString()
//     };
//   }
// };

// // Enhanced API service with better error handling
// export const apiService = {
//   // Health check
//   health: {
//     check: checkServerHealth
//   },
  
//   // Employee API methods
//   employee: {
//     create: (data) => apiClient.post('/employee/createemployee', data, {
//       headers: { 
//         'Content-Type': 'multipart/form-data',
//       },
//       timeout: 45000, // Longer timeout for file uploads
//       onUploadProgress: (progressEvent) => {
//         if (progressEvent.lengthComputable) {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           console.log(`Upload Progress: ${percentCompleted}%`);
//         }
//       }
//     }),
    
//     getAll: (params = {}) => apiClient.get('/employee/allemployee', { 
//       params,
//       timeout: 15000 
//     }),
    
//     getById: (id) => apiClient.get(`/employee/${id}`, {
//       timeout: 10000
//     }),
    
//     update: (id, data) => apiClient.put(`/employee/update/${id}`, data, {
//       headers: { 
//         'Content-Type': 'multipart/form-data' 
//       },
//       timeout: 30000
//     }),
    
//     delete: (id) => apiClient.delete(`/employee/delete/${id}`, {
//       timeout: 10000
//     }),
    
//     updateStatus: (id, status) => apiClient.patch(`/employee/status/${id}`, { status }, {
//       timeout: 10000
//     }),
    
//     getStats: () => apiClient.get('/employee/stats', {
//       timeout: 10000
//     }),
    
//     search: (query) => apiClient.get('/employee/search', { 
//       params: query,
//       timeout: 10000 
//     }),
    
//     export: () => apiClient.get('/employee/export', {
//       timeout: 30000,
//       responseType: 'blob' // Important for file downloads
//     }),
    
//     uploadDocument: (id, data) => apiClient.post(`/employee/${id}/documents`, data, {
//       headers: { 
//         'Content-Type': 'multipart/form-data' 
//       },
//       timeout: 30000
//     }),
//   },

//   // Member API methods
//   member: {
//     create: (data) => apiClient.post('/member/createmember', data, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       timeout: 30000
//     }),
//     getAll: (params = {}) => apiClient.get('/member/allmember', { 
//       params,
//       timeout: 15000 
//     }),
//     getById: (id) => apiClient.get(`/member/Memberid/${id}`, {
//       timeout: 10000
//     }),
//     update: (id, data) => apiClient.put(`/member/updatemember/${id}`, data, {
//       timeout: 15000
//     }),
//     delete: (id) => apiClient.delete(`/member/deletemember/${id}`, {
//       timeout: 10000
//     }),
//     getStats: () => apiClient.get('/member/memberstats/overview', {
//       timeout: 10000
//     }),
//   },
  
//   memberApproval: {
//     getPendingRegistrations: (params = {}) => apiClient.get('/member/registrations', { 
//       params,
//       timeout: 15000 
//     }),
//     approveRegistration: (id) => apiClient.put(`/member/approve/${id}`, {}, {
//       timeout: 10000
//     }),
//     rejectRegistration: (id, reason) => apiClient.put(`/member/reject/${id}`, { reason }, {
//       timeout: 10000
//     }),
//   },

//   // Contact API methods
//   contact: {
//     getContacts: (params = {}) => apiClient.get('/contact/contacts', { 
//       params,
//       timeout: 15000 
//     }),
//     createContact: (data) => apiClient.post('/contact/contacts', data, {
//       timeout: 15000
//     }),
//     getContactDetails: (userId) => apiClient.get(`/contact/contacts/${userId}`, {
//       timeout: 10000
//     }),
//     updateContact: (userId, data) => apiClient.put(`/contact/contacts/${userId}`, data, {
//       timeout: 15000
//     }),
//     deleteContact: (userId) => apiClient.delete(`/contact/contacts/${userId}`, {
//       timeout: 10000
//     }),
//     getUsersByRole: (role, params = {}) => apiClient.get(`/contact/users/${role}`, { 
//       params,
//       timeout: 15000 
//     }),
//     updateContactPreferences: (userId, preferences) => 
//       apiClient.put(`/contact/contact-preferences/${userId}`, preferences, {
//         timeout: 10000
//       }),
//   },

//   // Email API methods
//   email: {
//     send: (data) => apiClient.post('/email/send', data, {
//       timeout: 20000
//     }),
//     getEmails: (params = {}) => apiClient.get('/email', { 
//       params,
//       timeout: 15000 
//     }),
//     getStats: () => apiClient.get('/email/stats', {
//       timeout: 10000
//     }),
//   },

//   // Chat API methods
//   chat: {
//     getUserChats: (params = {}) => apiClient.get('/chat/chats', { 
//       params,
//       timeout: 15000 
//     }),
//     getOrCreateChat: (receiverId) => apiClient.post('/chat/open', { receiverId }, {
//       timeout: 10000
//     }),
//   },

//   // SMS API methods
//   sms: {
//     sendSMS: (data) => apiClient.post('/sms/send', data, {
//       timeout: 15000
//     }),
//     sendBulkSMS: (data) => apiClient.post('/sms/bulk-send', data, {
//       timeout: 30000
//     }),
//     getSMSHistory: (params = {}) => apiClient.get('/sms/history', { 
//       params,
//       timeout: 15000 
//     }),
//     getSMSStats: () => apiClient.get('/sms/stats', {
//       timeout: 10000
//     }),
//     createCampaign: (data) => apiClient.post('/sms/campaign', data, {
//       timeout: 15000
//     }),
//     getCampaigns: (params = {}) => apiClient.get('/sms/campaigns', { 
//       params,
//       timeout: 15000 
//     }),
//     getCampaignDetails: (id) => apiClient.get(`/sms/campaign/${id}`, {
//       timeout: 10000
//     }),
//   },

//   // Application API methods
//   application: {
//     create: (data) => apiClient.post('/application/create', data, {
//       timeout: 15000
//     }),
//     getMyApplications: (params = {}) => apiClient.get('/application/my-applications', { 
//       params,
//       timeout: 15000 
//     }),
//     getAllApplications: (params = {}) => apiClient.get('/application/all', { 
//       params,
//       timeout: 15000 
//     }),
//     getApplicationById: (id) => apiClient.get(`/application/${id}`, {
//       timeout: 10000
//     }),
//     updateStatus: (id, data) => apiClient.put(`/application/update-status/${id}`, data, {
//       timeout: 10000
//     }),
//     getStats: () => apiClient.get('/application/stats/overview', {
//       timeout: 10000
//     }),
//   },

//   // Search API methods
//   search: {
//     globalSearch: (query, filters = {}) => apiClient.post('/search/global', { query, filters }, {
//       timeout: 15000
//     }),
//   },

//   // Notification API methods
//   notification: {
//     getNotifications: (params = {}) => apiClient.get('/notifications', { 
//       params,
//       timeout: 15000 
//     }),
//     markAsRead: (notificationId) => apiClient.patch(`/notifications/${notificationId}/read`, {}, {
//       timeout: 10000
//     }),
//   },

//   // User API methods
//   user: {
//     getUserStats: () => apiClient.get('/user/stats', {
//       timeout: 10000
//     }),
//     getUserProfile: (userId) => apiClient.get(`/user/${userId}`, {
//       timeout: 10000
//     }),
//   }
// };

// // Export individual APIs for backward compatibility
// export const employeeAPI = apiService.employee;
// export const memberAPI = apiService.member;
// export const emailAPI = apiService.email;
// export const chatAPI = apiService.chat;
// export const contactAPI = apiService.contact;
// export const smsAPI = apiService.sms;
// export const searchAPI = apiService.search;
// export const notificationAPI = apiService.notification;
// export const userAPI = apiService.user;

// // Utility function to test backend connection
// export const testBackendConnection = async () => {
//   console.log('🔍 Testing backend connection...');
//   const health = await checkServerHealth();
  
//   if (health.online) {
//     console.log('✅ Backend is online:', health.data);
//     return true;
//   } else {
//     console.log('❌ Backend is offline:', health.error);
//     return false;
//   }
// };

// export default apiClient;















