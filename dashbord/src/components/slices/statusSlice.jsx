import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const storedStatusData = JSON.parse(localStorage.getItem('statusData')) || [];

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    statusData: storedStatusData, // Initialize with data from localStorage
  },
  reducers: {
    setStatusData: (state, action) => {
      state.statusData = action.payload;
      localStorage.setItem('statusData', JSON.stringify(action.payload)); // Save to localStorage
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.statusData.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.statusData[index].status = status; // Update specific status
      }
      localStorage.setItem('statusData', JSON.stringify(state.statusData)); // Save to localStorage
    },
  },
});

export const { setStatusData, updateStatus } = statusSlice.actions;
export default statusSlice.reducer;