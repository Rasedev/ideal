// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { apiService } from '../../services/apiService';

// // Async thunks
// export const fetchPendingRegistrations = createAsyncThunk(
//   'memberApproval/fetchPendingRegistrations',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await apiService.memberApproval.getPendingRegistrations(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const approveMemberRegistration = createAsyncThunk(
//   'memberApproval/approveMemberRegistration',
//   async (memberId, { rejectWithValue }) => {
//     try {
//       const response = await apiService.memberApproval.approveRegistration(memberId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const rejectMemberRegistration = createAsyncThunk(
//   'memberApproval/rejectMemberRegistration',
//   async ({ memberId, reason }, { rejectWithValue }) => {
//     try {
//       const response = await apiService.memberApproval.rejectRegistration(memberId, reason);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const memberApprovalSlice = createSlice({
//   name: 'memberApproval',
//   initialState: {
//     pendingRegistrations: [],
//     loading: false,
//     error: null,
//     filters: {
//       search: ''
//     }
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     clearFilters: (state) => {
//       state.filters = { search: '' };
//     },
//     removeRegistration: (state, action) => {
//       state.pendingRegistrations = state.pendingRegistrations.filter(
//         reg => reg._id !== action.payload
//       );
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Pending Registrations
//       .addCase(fetchPendingRegistrations.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPendingRegistrations.fulfilled, (state, action) => {
//         state.loading = false;
//         state.pendingRegistrations = action.payload.registrations || [];
//       })
//       .addCase(fetchPendingRegistrations.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Approve Member Registration
//       .addCase(approveMemberRegistration.fulfilled, (state, action) => {
//         state.pendingRegistrations = state.pendingRegistrations.filter(
//           reg => reg._id !== action.meta.arg
//         );
//       })
//       // Reject Member Registration
//       .addCase(rejectMemberRegistration.fulfilled, (state, action) => {
//         state.pendingRegistrations = state.pendingRegistrations.filter(
//           reg => reg._id !== action.meta.arg.memberId
//         );
//       });
//   }
// });

// export const { clearError, setFilters, clearFilters, removeRegistration } = memberApprovalSlice.actions;
// export default memberApprovalSlice.reducer;







import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPendingRegistrations,
  approveMemberRegistration,
  rejectMemberRegistration
} from './memberApprovalThunks';

const initialState = {
  pendingRegistrations: [],
  loading: false,
  error: null,
  filters: { search: '' },
};

const memberApprovalSlice = createSlice({
  name: 'memberApproval',
  initialState,
  reducers: {
    clearError: state => { state.error = null; },
    setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPendingRegistrations.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchPendingRegistrations.fulfilled, (state, action) => { state.loading = false; state.pendingRegistrations = action.payload; })
      .addCase(fetchPendingRegistrations.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(approveMemberRegistration.fulfilled, (state, action) => { state.pendingRegistrations = state.pendingRegistrations.filter(reg => reg._id !== action.payload); })
      .addCase(rejectMemberRegistration.fulfilled, (state, action) => { state.pendingRegistrations = state.pendingRegistrations.filter(reg => reg._id !== action.payload); });
  }
});

export const { clearError, setFilters } = memberApprovalSlice.actions;
export default memberApprovalSlice.reducer;










