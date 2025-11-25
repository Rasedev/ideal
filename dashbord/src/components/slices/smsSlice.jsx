import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';

// Async thunks
export const sendSMS = createAsyncThunk(
  'sms/sendSMS',
  async (smsData, { rejectWithValue }) => {
    try {
      const response = await apiService.sms.sendSMS(smsData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const sendBulkSMS = createAsyncThunk(
  'sms/sendBulkSMS',
  async (bulkData, { rejectWithValue }) => {
    try {
      const response = await apiService.sms.sendBulkSMS(bulkData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSMSHistory = createAsyncThunk(
  'sms/fetchSMSHistory',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.sms.getSMSHistory(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSMSStats = createAsyncThunk(
  'sms/fetchSMSStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.sms.getSMSStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createSMSCampaign = createAsyncThunk(
  'sms/createCampaign',
  async (campaignData, { rejectWithValue }) => {
    try {
      const response = await apiService.sms.createCampaign(campaignData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSMSCampaigns = createAsyncThunk(
  'sms/fetchCampaigns',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.sms.getCampaigns(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const smsSlice = createSlice({
  name: 'sms',
  initialState: {
    history: [],
    campaigns: [],
    stats: null,
    loading: false,
    error: null,
    filters: {
      status: '',
      messageType: '',
      startDate: '',
      endDate: ''
    }
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        messageType: '',
        startDate: '',
        endDate: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Send SMS
      .addCase(sendSMS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendSMS.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendSMS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Bulk SMS
      .addCase(sendBulkSMS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendBulkSMS.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendBulkSMS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch SMS History
      .addCase(fetchSMSHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSMSHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.data || [];
      })
      .addCase(fetchSMSHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch SMS Stats
      .addCase(fetchSMSStats.fulfilled, (state, action) => {
        state.stats = action.payload.data;
      })
      // Create SMS Campaign
      .addCase(createSMSCampaign.fulfilled, (state, action) => {
        state.campaigns.unshift(action.payload.data);
      })
      // Fetch SMS Campaigns
      .addCase(fetchSMSCampaigns.fulfilled, (state, action) => {
        state.campaigns = action.payload.data || [];
      });
  }
});

export const { clearError, setFilters, clearFilters } = smsSlice.actions;
export default smsSlice.reducer;