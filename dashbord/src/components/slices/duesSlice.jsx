// slices/duesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchAllDues = createAsyncThunk(
  'dues/fetchAllDues',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/dues', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMyDues = createAsyncThunk(
  'dues/fetchMyDues',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/dues/my-dues', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewDues = createAsyncThunk(
  'dues/createNewDues',
  async (duesData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/dues',
        duesData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDues = createAsyncThunk(
  'dues/updateDues',
  async ({ duesId, updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:3000/api/v1/dues/${duesId}/status`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendReminder = createAsyncThunk(
  'dues/sendReminder',
  async ({ duesId, reminderData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/v1/dues/${duesId}/reminder`,
        reminderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDuesStats = createAsyncThunk(
  'dues/fetchDuesStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/dues/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDuesRecord = createAsyncThunk(
  'dues/deleteDuesRecord',
  async (duesId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/api/v1/dues/${duesId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const duesSlice = createSlice({
  name: 'dues',
  initialState: {
    dues: [],
    myDues: [],
    stats: {},
    loading: false,
    error: null,
    filters: {
      status: '',
      dueType: '',
      memberId: '',
      overdueOnly: false
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearDues: (state) => {
      state.dues = [];
      state.myDues = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all dues
      .addCase(fetchAllDues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDues.fulfilled, (state, action) => {
        state.loading = false;
        state.dues = action.payload.dues;
      })
      .addCase(fetchAllDues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch dues';
      })
      // Fetch my dues
      .addCase(fetchMyDues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyDues.fulfilled, (state, action) => {
        state.loading = false;
        state.myDues = action.payload.dues;
      })
      .addCase(fetchMyDues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch dues';
      })
      // Create dues
      .addCase(createNewDues.fulfilled, (state, action) => {
        state.dues.unshift(action.payload.dues);
      })
      // Update dues
      .addCase(updateDues.fulfilled, (state, action) => {
        const updatedDues = action.payload.dues;
        const index = state.dues.findIndex(d => d._id === updatedDues._id);
        if (index !== -1) {
          state.dues[index] = updatedDues;
        }
      })
      // Send reminder
      .addCase(sendReminder.fulfilled, (state, action) => {
        const duesId = action.meta.arg.duesId;
        const index = state.dues.findIndex(d => d._id === duesId);
        if (index !== -1) {
          state.dues[index].reminderCount = action.payload.reminderCount;
          state.dues[index].lastReminderSent = new Date().toISOString();
        }
      })
      // Fetch stats
      .addCase(fetchDuesStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
      })
      // Delete dues
      .addCase(deleteDuesRecord.fulfilled, (state, action) => {
        state.dues = state.dues.filter(d => d._id !== action.meta.arg);
      });
  }
});

export const { setFilters, clearError, clearDues } = duesSlice.actions;
export default duesSlice.reducer;