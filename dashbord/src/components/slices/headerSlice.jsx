import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  notifications: [],
  unreadCount: 0,
  userStats: {
    bugsFixed: '0',
    performance: '0%',
    activity: 'Low'
  },
  loading: false,
  error: null
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(notif => !notif.read).length;
    },
    setUserStats: (state, action) => {
      state.userStats = action.payload;
    },
    markNotificationAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(notif => notif.id === notificationId);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notif => notif.read = true);
      state.unreadCount = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setSearchQuery,
  setNotifications,
  setUserStats,
  markNotificationAsRead,
  markAllAsRead,
  setLoading,
  setError,
  clearError
} = headerSlice.actions;

export default headerSlice.reducer;