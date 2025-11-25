import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';

export const fetchPendingRegistrations = createAsyncThunk(
  'memberApproval/fetchPendingRegistrations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.memberApproval.getPendingRegistrations();
      return response.data.registrations || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const approveMemberRegistration = createAsyncThunk(
  'memberApproval/approveMemberRegistration',
  async (memberId, { rejectWithValue }) => {
    try {
      const response = await apiService.memberApproval.approveRegistration(memberId);
      return memberId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const rejectMemberRegistration = createAsyncThunk(
  'memberApproval/rejectMemberRegistration',
  async ({ memberId, reason }, { rejectWithValue }) => {
    try {
      const response = await apiService.memberApproval.rejectRegistration(memberId, reason);
      return memberId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
