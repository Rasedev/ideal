import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';

// Async thunks
export const createApplication = createAsyncThunk(
  'applications/createApplication',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await apiService.application.create(applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMyApplications',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.application.getMyApplications(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllApplications = createAsyncThunk(
  'applications/fetchAllApplications',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.application.getAllApplications(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchApplicationById = createAsyncThunk(
  'applications/fetchApplicationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.application.getApplicationById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateApplicationStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await apiService.application.updateStatus(id, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchApplicationStats = createAsyncThunk(
  'applications/fetchApplicationStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.application.getStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    myApplications: [],
    allApplications: [],
    currentApplication: null,
    stats: null,
    loading: false,
    error: null,
    filters: {
      status: '',
      type: '',
      search: ''
    }
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentApplication: (state) => {
      state.currentApplication = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        type: '',
        search: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Application
      .addCase(createApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications.unshift(action.payload.application);
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch My Applications
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications = action.payload.applications || [];
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Applications
      .addCase(fetchAllApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.allApplications = action.payload.applications || [];
      })
      .addCase(fetchAllApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Application by ID
      .addCase(fetchApplicationById.fulfilled, (state, action) => {
        state.currentApplication = action.payload.application;
      })
      // Update Application Status
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const updatedApp = action.payload.application;
        // Update in myApplications
        const myAppIndex = state.myApplications.findIndex(app => app._id === updatedApp._id);
        if (myAppIndex !== -1) {
          state.myApplications[myAppIndex] = updatedApp;
        }
        // Update in allApplications
        const allAppIndex = state.allApplications.findIndex(app => app._id === updatedApp._id);
        if (allAppIndex !== -1) {
          state.allApplications[allAppIndex] = updatedApp;
        }
        // Update current application
        if (state.currentApplication && state.currentApplication._id === updatedApp._id) {
          state.currentApplication = updatedApp;
        }
      })
      // Fetch Application Stats
      .addCase(fetchApplicationStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
      });
  }
});

export const { clearError, clearCurrentApplication, setFilters, clearFilters } = applicationSlice.actions;
export default applicationSlice.reducer;