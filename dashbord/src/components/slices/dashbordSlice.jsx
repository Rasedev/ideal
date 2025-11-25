// // store/slices/dashboardSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api/v1';

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Async thunks - DIRECTLY calling your dashboard routes
// export const fetchDashboardOverview = createAsyncThunk(
//   'dashboard/fetchOverview',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get('/dashboard/overview');
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to fetch dashboard overview'
//       );
//     }
//   }
// );

// export const fetchDashboardStats = createAsyncThunk(
//   'dashboard/fetchStats',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get('/dashboard/stats');
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to fetch dashboard statistics'
//       );
//     }
//   }
// );

// export const fetchRecentActivities = createAsyncThunk(
//   'dashboard/fetchRecentActivities',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get('/dashboard/activities');
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to fetch recent activities'
//       );
//     }
//   }
// );

// export const fetchAllDashboardData = createAsyncThunk(
//   'dashboard/fetchAllData',
//   async (_, { rejectWithValue }) => {
//     try {
//       const [overview, stats, activities] = await Promise.all([
//         api.get('/dashboard/overview'),
//         api.get('/dashboard/stats'),
//         api.get('/dashboard/activities'),
//       ]);

//       return {
//         overview: overview.data.data,
//         stats: stats.data.data,
//         activities: activities.data.data,
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to fetch dashboard data'
//       );
//     }
//   }
// );

// // Initial state
// const initialState = {
//   overview: {
//     welcomeMessage: '',
//     totalMembers: 0,
//     totalEmployees: 0,
//     pendingApprovals: 0,
//     loading: false,
//     error: null
//   },
  
//   stats: {
//     totalMembers: 0,
//     totalEmployees: 0,
//     totalApplications: 0,
//     pendingApprovals: 0,
//     availablePlots: 0,
//     loading: false,
//     error: null
//   },
  
//   activities: {
//     data: [],
//     loading: false,
//     error: null
//   },
  
//   loading: false,
//   error: null,
//   lastUpdated: null
// };

// const dashboardSlice = createSlice({
//   name: 'dashboard',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//       state.overview.error = null;
//       state.stats.error = null;
//       state.activities.error = null;
//     },
    
//     updateLastUpdated: (state) => {
//       state.lastUpdated = new Date().toISOString();
//     },
    
//     addActivity: (state, action) => {
//       state.activities.data.unshift({
//         id: Date.now().toString(),
//         timestamp: new Date().toISOString(),
//         ...action.payload
//       });
//       if (state.activities.data.length > 20) {
//         state.activities.data = state.activities.data.slice(0, 20);
//       }
//     },
    
//     resetDashboard: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch All Dashboard Data
//       .addCase(fetchAllDashboardData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllDashboardData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.overview = { ...state.overview, ...action.payload.overview };
//         state.stats = { ...state.stats, ...action.payload.stats };
//         state.activities.data = action.payload.activities;
//         state.lastUpdated = new Date().toISOString();
//         state.error = null;
//       })
//       .addCase(fetchAllDashboardData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Fetch Dashboard Overview
//       .addCase(fetchDashboardOverview.pending, (state) => {
//         state.overview.loading = true;
//         state.overview.error = null;
//       })
//       .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
//         state.overview.loading = false;
//         state.overview = { ...state.overview, ...action.payload };
//       })
//       .addCase(fetchDashboardOverview.rejected, (state, action) => {
//         state.overview.loading = false;
//         state.overview.error = action.payload;
//       })
      
//       // Fetch Dashboard Stats
//       .addCase(fetchDashboardStats.pending, (state) => {
//         state.stats.loading = true;
//         state.stats.error = null;
//       })
//       .addCase(fetchDashboardStats.fulfilled, (state, action) => {
//         state.stats.loading = false;
//         state.stats = { ...state.stats, ...action.payload };
//       })
//       .addCase(fetchDashboardStats.rejected, (state, action) => {
//         state.stats.loading = false;
//         state.stats.error = action.payload;
//       })
      
//       // Fetch Recent Activities
//       .addCase(fetchRecentActivities.pending, (state) => {
//         state.activities.loading = true;
//         state.activities.error = null;
//       })
//       .addCase(fetchRecentActivities.fulfilled, (state, action) => {
//         state.activities.loading = false;
//         state.activities.data = action.payload;
//       })
//       .addCase(fetchRecentActivities.rejected, (state, action) => {
//         state.activities.loading = false;
//         state.activities.error = action.payload;
//       });
//   },
// });

// export const {
//   clearError,
//   updateLastUpdated,
//   addActivity,
//   resetDashboard
// } = dashboardSlice.actions;

// export const selectDashboard = (state) => state.dashboard;
// export const selectDashboardLoading = (state) => state.dashboard.loading;
// export const selectDashboardError = (state) => state.dashboard.error;
// export const selectDashboardOverview = (state) => state.dashboard.overview;
// export const selectDashboardStats = (state) => state.dashboard.stats;
// export const selectRecentActivities = (state) => state.dashboard.activities;
// export const selectLastUpdated = (state) => state.dashboard.lastUpdated;

// export default dashboardSlice.reducer;





// import { createSlice } from "@reduxjs/toolkit";

// const loadFromStorage = (key, defaultValue = null) => {
//   try {
//     const item = localStorage.getItem(key);
//     if (item && item !== "undefined" && item !== "null") {
//       return JSON.parse(item);
//     }
//   } catch (err) {
//     console.error(`Error parsing ${key} from localStorage:`, err);
//   }
//   return defaultValue;
// };

// const storedDashboardData = loadFromStorage("dashboardData", {
//   stats: {},
//   recentActivities: [],
//   upcomingEvents: []
// });

// export const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState: {
//     data: storedDashboardData,
//     loading: false,
//     error: null,
//     lastUpdated: loadFromStorage("dashboardLastUpdated")
//   },
//   reducers: {
//     // Set loading state
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
    
//     // Set error state
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
    
//     // Clear error
//     clearError: (state) => {
//       state.error = null;
//     },
    
//     // Set dashboard data
//     setDashboardData: (state, action) => {
//       state.data = action.payload;
//       state.lastUpdated = new Date().toISOString();
//       localStorage.setItem("dashboardData", JSON.stringify(action.payload));
//       localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
//     },
    
//     // Update dashboard stats
//     updateStats: (state, action) => {
//       state.data.stats = { ...state.data.stats, ...action.payload };
//       state.lastUpdated = new Date().toISOString();
//       localStorage.setItem("dashboardData", JSON.stringify(state.data));
//       localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
//     },
    
//     // Add recent activity
//     addActivity: (state, action) => {
//       const newActivity = {
//         id: Date.now().toString(),
//         timestamp: new Date().toISOString(),
//         ...action.payload
//       };
      
//       if (!state.data.recentActivities) {
//         state.data.recentActivities = [];
//       }
      
//       state.data.recentActivities.unshift(newActivity);
      
//       // Keep only last 10 activities
//       if (state.data.recentActivities.length > 10) {
//         state.data.recentActivities = state.data.recentActivities.slice(0, 10);
//       }
      
//       state.lastUpdated = new Date().toISOString();
//       localStorage.setItem("dashboardData", JSON.stringify(state.data));
//       localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
//     },
    
//     // Add upcoming event
//     addEvent: (state, action) => {
//       const newEvent = {
//         id: Date.now().toString(),
//         createdAt: new Date().toISOString(),
//         ...action.payload
//       };
      
//       if (!state.data.upcomingEvents) {
//         state.data.upcomingEvents = [];
//       }
      
//       state.data.upcomingEvents.push(newEvent);
//       state.lastUpdated = new Date().toISOString();
//       localStorage.setItem("dashboardData", JSON.stringify(state.data));
//       localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
//     },
    
//     // Remove activity
//     removeActivity: (state, action) => {
//       if (state.data.recentActivities) {
//         state.data.recentActivities = state.data.recentActivities.filter(
//           activity => activity.id !== action.payload
//         );
//         state.lastUpdated = new Date().toISOString();
//         localStorage.setItem("dashboardData", JSON.stringify(state.data));
//         localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
//       }
//     },
    
//     // Remove event
//     removeEvent: (state, action) => {
//       if (state.data.upcomingEvents) {
//         state.data.upcomingEvents = state.data.upcomingEvents.filter(
//           event => event.id !== action.payload
//         );
//         state.lastUpdated = new Date().toISOString();
//         localStorage.setItem("dashboardData", JSON.stringify(state.data));
//         localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
//       }
//     },
    
//     // Clear all dashboard data
//     clearDashboard: (state) => {
//       state.data = {
//         stats: {},
//         recentActivities: [],
//         upcomingEvents: []
//       };
//       state.loading = false;
//       state.error = null;
//       state.lastUpdated = null;
//       localStorage.removeItem("dashboardData");
//       localStorage.removeItem("dashboardLastUpdated");
//     },
    
//     // Refresh dashboard (update timestamp)
//     refreshDashboard: (state) => {
//       state.lastUpdated = new Date().toISOString();
//       localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
//     }
//   },
// });

// export const { 
//   setLoading,
//   setError,
//   clearError,
//   setDashboardData,
//   updateStats,
//   addActivity,
//   addEvent,
//   removeActivity,
//   removeEvent,
//   clearDashboard,
//   refreshDashboard
// } = dashboardSlice.actions;

// export default dashboardSlice.reducer;




// store/slices/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item && item !== "undefined" && item !== "null") {
      return JSON.parse(item);
    }
  } catch (err) {
    console.error(`Error parsing ${key} from localStorage:`, err);
    // Clear invalid data
    localStorage.removeItem(key);
  }
  return defaultValue;
};

// Safe date parsing for lastUpdated
const loadLastUpdated = () => {
  try {
    const item = localStorage.getItem("dashboardLastUpdated");
    if (item && item !== "undefined" && item !== "null") {
      // Check if it's a valid date string
      const date = new Date(item);
      return !isNaN(date.getTime()) ? item : null;
    }
  } catch (err) {
    console.error(`Error parsing dashboardLastUpdated from localStorage:`, err);
    localStorage.removeItem("dashboardLastUpdated");
  }
  return null;
};

const storedDashboardData = loadFromStorage("dashboardData", {
  stats: {},
  recentActivities: [],
  upcomingEvents: []
});

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: storedDashboardData,
    loading: false,
    error: null,
    lastUpdated: loadLastUpdated()
  },
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set dashboard data
    setDashboardData: (state, action) => {
      state.data = action.payload;
      state.lastUpdated = new Date().toISOString();
      try {
        localStorage.setItem("dashboardData", JSON.stringify(action.payload));
        localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
      } catch (err) {
        console.error("Error saving to localStorage:", err);
      }
    },
    
    // Update dashboard stats
    updateStats: (state, action) => {
      state.data.stats = { ...state.data.stats, ...action.payload };
      state.lastUpdated = new Date().toISOString();
      try {
        localStorage.setItem("dashboardData", JSON.stringify(state.data));
        localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
      } catch (err) {
        console.error("Error saving to localStorage:", err);
      }
    },
    
    // Add recent activity
    addActivity: (state, action) => {
      const newActivity = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      
      if (!state.data.recentActivities) {
        state.data.recentActivities = [];
      }
      
      state.data.recentActivities.unshift(newActivity);
      
      // Keep only last 10 activities
      if (state.data.recentActivities.length > 10) {
        state.data.recentActivities = state.data.recentActivities.slice(0, 10);
      }
      
      state.lastUpdated = new Date().toISOString();
      try {
        localStorage.setItem("dashboardData", JSON.stringify(state.data));
        localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
      } catch (err) {
        console.error("Error saving to localStorage:", err);
      }
    },
    
    // Add upcoming event
    addEvent: (state, action) => {
      const newEvent = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...action.payload
      };
      
      if (!state.data.upcomingEvents) {
        state.data.upcomingEvents = [];
      }
      
      state.data.upcomingEvents.push(newEvent);
      state.lastUpdated = new Date().toISOString();
      try {
        localStorage.setItem("dashboardData", JSON.stringify(state.data));
        localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
      } catch (err) {
        console.error("Error saving to localStorage:", err);
      }
    },
    
    // Remove activity
    removeActivity: (state, action) => {
      if (state.data.recentActivities) {
        state.data.recentActivities = state.data.recentActivities.filter(
          activity => activity.id !== action.payload
        );
        state.lastUpdated = new Date().toISOString();
        try {
          localStorage.setItem("dashboardData", JSON.stringify(state.data));
          localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
        } catch (err) {
          console.error("Error saving to localStorage:", err);
        }
      }
    },
    
    // Remove event
    removeEvent: (state, action) => {
      if (state.data.upcomingEvents) {
        state.data.upcomingEvents = state.data.upcomingEvents.filter(
          event => event.id !== action.payload
        );
        state.lastUpdated = new Date().toISOString();
        try {
          localStorage.setItem("dashboardData", JSON.stringify(state.data));
          localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
        } catch (err) {
          console.error("Error saving to localStorage:", err);
        }
      }
    },
    
    // Clear all dashboard data
    clearDashboard: (state) => {
      state.data = {
        stats: {},
        recentActivities: [],
        upcomingEvents: []
      };
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
      try {
        localStorage.removeItem("dashboardData");
        localStorage.removeItem("dashboardLastUpdated");
      } catch (err) {
        console.error("Error clearing localStorage:", err);
      }
    },
    
    // Refresh dashboard (update timestamp)
    refreshDashboard: (state) => {
      state.lastUpdated = new Date().toISOString();
      try {
        localStorage.setItem("dashboardLastUpdated", state.lastUpdated);
      } catch (err) {
        console.error("Error saving to localStorage:", err);
      }
    }
  },
});

export const { 
  setLoading,
  setError,
  clearError,
  setDashboardData,
  updateStats,
  addActivity,
  addEvent,
  removeActivity,
  removeEvent,
  clearDashboard,
  refreshDashboard
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

