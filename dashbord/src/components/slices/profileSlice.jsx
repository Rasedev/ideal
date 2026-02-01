

/////////////////////////FINAL/////////////////////////



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Async thunks for API calls
// export const fetchUserProfile = createAsyncThunk(
//   'profile/fetchUserProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         return rejectWithValue('No authentication token found');
//       }

//       const response = await axios.get(`${BASE_URL}/user/profile`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       console.log('Profile API Response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Fetch profile error:', error);
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch profile'
//       );
//     }
//   }
// );
// Update the fetchUserProfile thunk
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axios.get(`${BASE_URL}/user/profile`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      
      console.log('✅ Profile API Response:', response.data);
      
      // Transform the response
      const userData = response.data.user;
      
      // Ensure joinDate is properly formatted
      if (userData.joinDate) {
        userData.joinDate = new Date(userData.joinDate).toISOString();
      }
      
      // Format address for display
      if (userData.address) {
        if (typeof userData.address === 'string') {
          userData.addressDisplay = userData.address;
        } else if (typeof userData.address === 'object') {
          userData.addressDisplay = [
            userData.address.street,
            userData.address.city,
            userData.address.state,
            userData.address.country,
            userData.address.postalCode
          ]
            .filter(Boolean)
            .join(', ');
        }
      }
      
      return { ...response.data, user: userData };
    } catch (error) {
      console.error('❌ Fetch profile error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

// Add helper for date formatting
const formatDateForForm = (dateString) => {
  if (!dateString) return null;
  try {
    return dayjs(dateString);
  } catch (error) {
    console.error('Date formatting error:', error);
    return null;
  }
};

// export const updateUserProfile = createAsyncThunk(
//   'profile/updateUserProfile',
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         return rejectWithValue('No authentication token found');
//       }

//       const response = await axios.put(`${BASE_URL}/user/profile`, profileData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Update profile error:', error);
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update profile'
//       );
//     }
//   }
// );

// In profileSlice.jsx, update the updateUserProfile thunk
export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      // Transform the data to match backend expectations
      const transformedData = {
        ...profileData,
        // Ensure address is sent as a string, not an object
        address: typeof profileData.address === 'string' 
          ? profileData.address 
          : JSON.stringify(profileData.address),
        // Convert dayjs object to string if it's a dayjs instance
        dob: profileData.dob && typeof profileData.dob === 'object' && profileData.dob.format
          ? profileData.dob.format('YYYY-MM-DD')
          : profileData.dob,
      };

      console.log('Sending update data:', transformedData); // Debug log

      const response = await axios.put(`${BASE_URL}/user/profile`, transformedData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      
      // Log detailed error information
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        
        // Extract validation errors if they exist
        const validationErrors = error.response.data?.errors || error.response.data?.message;
        return rejectWithValue(
          validationErrors || 'Failed to update profile'
        );
      }
      
      return rejectWithValue(
        error.message || 'Failed to update profile'
      );
    }
  }
);


export const uploadProfilePhoto = createAsyncThunk(
  'profile/uploadProfilePhoto',
  async (file, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const formData = new FormData();
      formData.append('profilePhoto', file);

      const response = await axios.put(`${BASE_URL}/user/profile/photo`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Upload photo error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to upload photo'
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axios.put(`${BASE_URL}/user/change-password`, passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to change password'
      );
    }
  }
);

export const fetchLoginHistory = createAsyncThunk(
  'profile/fetchLoginHistory',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axios.get(`${BASE_URL}/user/login-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch (error) {
      console.error('Fetch login history error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch login history'
      );
    }
  }
);

export const fetchRecentActivity = createAsyncThunk(
  'profile/fetchRecentActivity',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axios.get(`${BASE_URL}/user/recent-activity`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch (error) {
      console.error('Fetch recent activity error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch recent activity'
      );
    }
  }
);

// Helper function to calculate profile completeness (renamed to avoid conflict with action name)
const calculateProfileCompletenessFromUser = (user) => {
  if (!user) return 0;

  const fields = [
    'firstName', 'lastName', 'email', 'phone', 'address', 
    'dob', 'gender', 'profilePhoto', 'nidNumber'
  ];
  
  const completedFields = fields.filter(field => {
    let value = user[field];
    
    // Handle alternative field names
    if (!value && field === 'phone') value = user.telephone;
    if (!value && field === 'profilePhoto') {
      value = user.image || user.profilePicture;
    }
    
    return value && value.toString().trim() !== '';
  }).length;
  
  return Math.round((completedFields / fields.length) * 100);
};

// Helper function to map activity types to display text
const mapActivityTypeToDisplay = (activityType, details) => {
  const activityMap = {
    'LOGIN': { 
      action: 'Login', 
      description: 'User logged into the system',
      icon: 'LoginOutlined'
    },
    'LOGOUT': { 
      action: 'Logout', 
      description: 'User logged out of the system',
      icon: 'LogoutOutlined'
    },
    'USER_CREATED': { 
      action: 'User Created', 
      description: 'New user account was created',
      icon: 'UserAddOutlined'
    },
    'USER_UPDATED': { 
      action: 'Profile Updated', 
      description: 'User profile information was updated',
      icon: 'EditOutlined'
    },
    'STATUS_CHANGE': { 
      action: 'Status Changed', 
      description: 'User status was modified',
      icon: 'SafetyCertificateOutlined'
    },
    'ROLE_CHANGE': { 
      action: 'Role Changed', 
      description: 'User role was updated',
      icon: 'TeamOutlined'
    },
    'REPORT_GEN': { 
      action: 'Report Generated', 
      description: 'System report was generated',
      icon: 'FileTextOutlined'
    }
  };

  const mapped = activityMap[activityType] || { 
    action: activityType, 
    description: details || 'Activity performed',
    icon: 'InfoOutlined'
  };

  // Parse details if available
  try {
    const parsedDetails = details ? JSON.parse(details) : {};
    if (parsedDetails.additionalInfo) {
      mapped.description = parsedDetails.additionalInfo;
    }
  } catch (e) {
    // If details is not JSON, use it as is
    if (details && details !== 'No additional details.') {
      mapped.description = details;
    }
  }

  return mapped;
};

// Initial state
const initialState = {
  user: null,
  loginHistory: [],
  recentActivity: [],
  loading: false,
  updating: false,
  uploading: false,
  changingPassword: false,
  error: null,
  success: null,
  profileCompleteness: 0,
  lastUpdated: null
};

// Profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    resetProfile: (state) => {
      return { ...initialState };
    },
    updateUserData: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.lastUpdated = new Date().toISOString();
        state.profileCompleteness = calculateProfileCompletenessFromUser(state.user);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    calculateProfileCompleteness: (state) => {
      state.profileCompleteness = calculateProfileCompletenessFromUser(state.user);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.profileCompleteness = calculateProfileCompletenessFromUser(action.payload);
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(fetchUserProfile.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.user;
      //   state.lastUpdated = new Date().toISOString();
      //   state.error = null;
      //   state.profileCompleteness = calculateProfileCompletenessFromUser(state.user);
      // })


      .addCase(fetchUserProfile.fulfilled, (state, action) => {
  state.loading = false;
  
  // Transform the user data to handle address properly
  const userData = action.payload.user;
  
  // Ensure address is properly formatted
  if (userData.address && typeof userData.address === 'object') {
    // If address is an object, create a display string
    userData.addressDisplay = [
      userData.address.street,
      userData.address.city,
      userData.address.state,
      userData.address.country,
      userData.address.postalCode
    ]
      .filter(Boolean)
      .join(', ');
  } else {
    // If address is a string or doesn't exist
    userData.addressDisplay = userData.address || '';
  }
  
  state.user = userData;
  state.lastUpdated = new Date().toISOString();
  state.error = null;
  state.profileCompleteness = calculateProfileCompletenessFromUser(state.user);
})




      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.user = action.payload.user;
        state.success = action.payload.message;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
        state.profileCompleteness = calculateProfileCompletenessFromUser(state.user);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
        state.success = null;
      })
      
      // Upload Profile Photo
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.uploading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        state.uploading = false;
        if (state.user) {
          state.user.profilePhoto = action.payload.profilePhoto || action.payload.imageUrl;
          state.user.image = action.payload.profilePhoto || action.payload.imageUrl;
          state.user.profilePicture = action.payload.profilePhoto || action.payload.imageUrl;
        }
        state.success = action.payload.message;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
        state.profileCompleteness = calculateProfileCompletenessFromUser(state.user);
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
        state.success = null;
      })
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.changingPassword = true;
        state.error = null;
        state.success = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changingPassword = false;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changingPassword = false;
        state.error = action.payload;
        state.success = null;
      })
      
      // Fetch Login History
      .addCase(fetchLoginHistory.fulfilled, (state, action) => {
        // Map the login history data to match the expected format
        const loginData = action.payload.data || [];
        state.loginHistory = loginData.map(item => ({
          id: item._id,
          device: 'Web Browser', // You can enhance this with user-agent parsing
          location: item.ipAddress ? `IP: ${item.ipAddress}` : 'Unknown Location',
          ip: item.ipAddress || 'N/A',
          time: item.timestamp || item.createdAt,
          status: 'success'
        }));
      })
      .addCase(fetchLoginHistory.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Fetch Recent Activity
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        // Map the recent activity data to match the expected format
        const activityData = action.payload.data || [];
        state.recentActivity = activityData.map(item => {
          const mapped = mapActivityTypeToDisplay(item.activityType, item.details);
          return {
            id: item._id,
            action: mapped.action,
            description: mapped.description,
            time: item.timestamp || item.createdAt,
            icon: mapped.icon,
            activityType: item.activityType,
            details: item.details
          };
        });
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

// Export actions and selectors
export const { 
  clearError, 
  clearSuccess, 
  resetProfile, 
  updateUserData, 
  setLoading,
  calculateProfileCompleteness,
  setUser
} = profileSlice.actions;

export const selectProfile = (state) => state.profile;
export const selectUser = (state) => state.profile.user;
export const selectLoginHistory = (state) => state.profile.loginHistory;
export const selectRecentActivity = (state) => state.profile.recentActivity;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileUpdating = (state) => state.profile.updating;
export const selectProfileUploading = (state) => state.profile.uploading;
export const selectChangingPassword = (state) => state.profile.changingPassword;
export const selectProfileError = (state) => state.profile.error;
export const selectProfileSuccess = (state) => state.profile.success;
export const selectProfileCompleteness = (state) => state.profile.profileCompleteness;
export const selectLastUpdated = (state) => state.profile.lastUpdated;

export default profileSlice.reducer;

