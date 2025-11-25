


// // src/redux/slices/associationSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // LocalStorage helpers
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

// const saveToStorage = (key, value) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch (err) {
//     console.error(`Error saving ${key} to localStorage:`, err);
//   }
// };

// // Load persisted association
// const storedAssociation = loadFromStorage("association");

// // ======================
// // Async Thunk
// // ======================
// export const fetchAssociation = createAsyncThunk(
//   "association/fetchAssociation",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/v1/association/getassociation"
//       );
//       return response.data.data; // backend returns { success, data }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch association"
//       );
//     }
//   }
// );

// // ======================
// // Slice
// // ======================
// const associationSlice = createSlice({
//   name: "association",
//   initialState: {
//     data: storedAssociation,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // Set association manually
//     setAssociation: (state, action) => {
//       state.data = action.payload;
//       saveToStorage("association", action.payload);
//     },
//     // Update specific fields in association
//     updateAssociation: (state, action) => {
//       if (state.data) {
//         state.data = { ...state.data, ...action.payload };
//         saveToStorage("association", state.data);
//       }
//     },
//     // Clear association
//     clearAssociation: (state) => {
//       state.data = null;
//       state.loading = false;
//       state.error = null;
//       localStorage.removeItem("association");
//     },
//     // Loading and error setters (optional)
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAssociation.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAssociation.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//         saveToStorage("association", action.payload);
//       })
//       .addCase(fetchAssociation.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.data = null;
//       });
//   },
// });

// export const {
//   setAssociation,
//   updateAssociation,
//   clearAssociation,
//   setLoading,
//   setError,
//   clearError,
// } = associationSlice.actions;

// export default associationSlice.reducer;





/////////Deepseek////////////

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// LocalStorage helpers
const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item && item !== "undefined" && item !== "null") {
      return JSON.parse(item);
    }
  } catch (err) {
    console.error(`Error parsing ${key} from localStorage:`, err);
  }
  return defaultValue;
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
};

// Load persisted association
const storedAssociation = loadFromStorage("association");

// ======================
// Async Thunk - FIXED ENDPOINT
// ======================
export const fetchAssociation = createAsyncThunk(
  "association/fetchAssociation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/association/getassociation" // ✅ Fixed endpoint
      );
      console.log("Association API Response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Association fetch error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch association"
      );
    }
  }
);

// ======================
// Slice
// ======================
const associationSlice = createSlice({
  name: "association",
  initialState: {
    data: storedAssociation,
    loading: false,
    error: null,
  },
  reducers: {
    // Set association manually
    setAssociation: (state, action) => {
      state.data = action.payload;
      saveToStorage("association", action.payload);
    },
    // Update specific fields in association
    updateAssociation: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
        saveToStorage("association", state.data);
      }
    },
    // Clear association
    clearAssociation: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("association");
    },
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
        saveToStorage("association", action.payload);
        console.log("Association stored in Redux:", action.payload);
      })
      .addCase(fetchAssociation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Don't set data to null on error, keep existing data
        console.error("Association fetch failed:", action.payload);
      });
  },
});

export const {
  setAssociation,
  updateAssociation,
  clearAssociation,
} = associationSlice.actions;

export default associationSlice.reducer;







