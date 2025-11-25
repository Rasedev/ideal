import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Use relative URL or environment variable with fallback
const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:3000/api/v1";

export const fetchAssociation = createAsyncThunk(
  "association/fetchAssociation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/association/getassociation`);
      return response.data.data;
    } catch (error) {
      console.error("Association fetch error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch association"
      );
    }
  }
);

const associationSlice = createSlice({
  name: "association",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    updateAssociation: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    clearAssociation: (state) => {
      state.data = null;
      state.error = null;
    },
    resetAssociationError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssociation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssociation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAssociation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateAssociation, clearAssociation, resetAssociationError } = associationSlice.actions;
export default associationSlice.reducer;