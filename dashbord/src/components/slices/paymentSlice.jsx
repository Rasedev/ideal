// slices/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks with CORRECT endpoints
export const fetchAllPayments = createAsyncThunk(
  'payment/fetchAllPayments',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/payment', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

export const fetchMyPayments = createAsyncThunk(
  'payment/fetchMyPayments',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/payment/my-payments', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

export const submitNewPayment = createAsyncThunk(
  'payment/submitNewPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append all fields to formData
      Object.keys(paymentData).forEach(key => {
        if (key === 'paymentProof' && paymentData[key]) {
          formData.append('paymentProof', paymentData[key]);
        } else if (typeof paymentData[key] === 'object') {
          formData.append(key, JSON.stringify(paymentData[key]));
        } else {
          formData.append(key, paymentData[key]);
        }
      });

      const response = await axios.post(
        'http://localhost:3000/api/v1/payment/submit',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

export const verifyPaymentStatus = createAsyncThunk(
  'payment/verifyPaymentStatus',
  async ({ paymentId, status, rejectionReason = '' }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:3000/api/v1/payment/verify/${paymentId}`,
        { status, rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

export const fetchPaymentStats = createAsyncThunk(
  'payment/fetchPaymentStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/payment/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

export const fetchPaymentOverview = createAsyncThunk(
  'payment/fetchPaymentOverview',
  async ({ paymentMonth, paymentYear }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/payment/overview', {
        headers: { Authorization: `Bearer ${token}` },
        params: { paymentMonth, paymentYear }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    payments: [],
    myPayments: [],
    overview: [],
    stats: {},
    loading: false,
    overviewLoading: false,
    error: null,
    submitLoading: false,
    filters: {
      status: '',
      paymentMethod: '',
      paymentMonth: '',
      paymentYear: new Date().getFullYear().toString(),
      role: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearPayments: (state) => {
      state.payments = [];
      state.myPayments = [];
      state.overview = [];
    },
    resetPaymentState: (state) => {
      state.payments = [];
      state.myPayments = [];
      state.overview = [];
      state.stats = {};
      state.error = null;
      state.loading = false;
      state.submitLoading = false;
      state.overviewLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all payments
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.payments || [];
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch payments';
      })
      // Fetch my payments
      .addCase(fetchMyPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.myPayments = action.payload.payments || [];
      })
      .addCase(fetchMyPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch payments';
      })
      // Submit payment
      .addCase(submitNewPayment.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(submitNewPayment.fulfilled, (state, action) => {
        state.submitLoading = false;
        if (action.payload.payment) {
          state.myPayments.unshift(action.payload.payment);
        }
      })
      .addCase(submitNewPayment.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload?.message || 'Failed to submit payment';
      })
      // Verify payment
      .addCase(verifyPaymentStatus.fulfilled, (state, action) => {
        const updatedPayment = action.payload.payment;
        if (updatedPayment) {
          // Update in payments array
          const paymentIndex = state.payments.findIndex(p => p._id === updatedPayment._id);
          if (paymentIndex !== -1) {
            state.payments[paymentIndex] = updatedPayment;
          }
          
          // Update in myPayments array
          const myPaymentIndex = state.myPayments.findIndex(p => p._id === updatedPayment._id);
          if (myPaymentIndex !== -1) {
            state.myPayments[myPaymentIndex] = updatedPayment;
          }
        }
      })
      // Fetch stats
      .addCase(fetchPaymentStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats || {};
      })
      // Fetch overview
      .addCase(fetchPaymentOverview.pending, (state) => {
        state.overviewLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentOverview.fulfilled, (state, action) => {
        state.overviewLoading = false;
        state.overview = action.payload.overview || [];
      })
      .addCase(fetchPaymentOverview.rejected, (state, action) => {
        state.overviewLoading = false;
        state.error = action.payload?.message || 'Failed to fetch payment overview';
      });
  }
});

export const { setFilters, clearError, clearPayments, resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
