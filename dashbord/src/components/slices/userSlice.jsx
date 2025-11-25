import { createSlice } from "@reduxjs/toolkit";

// Safe load from localStorage
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

// ✅ CORRECT: Only store CURRENT user in Redux
const storedCurrentUser = loadFromStorage("currentUser", null);

export const userSlice = createSlice({
  name: "user", // ✅ Changed from "users" to "user"
  initialState: {
    value: storedCurrentUser, // ✅ This should be the CURRENT user object
    loading: false,
    error: null
  },
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // ✅ CORRECT: Set current logged in user
    setCurrentUser: (state, action) => {
      console.log("🔄 userSlice: Setting current user with role:", action.payload?.role);
      state.value = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    
    // ✅ CORRECT: Clear current user (logout)
    clearCurrentUser: (state) => {
      console.log("🚪 userSlice: Clearing current user");
      state.value = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    },
    
    // ✅ CORRECT: Update current user profile
    updateCurrentUser: (state, action) => {
      if (state.value) {
        console.log("✏️ userSlice: Updating current user with:", action.payload);
        state.value = { 
          ...state.value, 
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem("currentUser", JSON.stringify(state.value));
      }
    },
    
    // ✅ CORRECT: Force refresh user data
    refreshUserData: (state, action) => {
      console.log("🔄 userSlice: Force refreshing user data with:", action.payload?.role);
      state.value = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    
    // Reset user state
    resetUser: (state) => {
      state.value = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    }
  },
});

export const { 
  setLoading,
  setError,
  clearError,
  setCurrentUser,
  clearCurrentUser,
  updateCurrentUser,
  refreshUserData,
  resetUser
} = userSlice.actions;

export default userSlice.reducer;






// // src/components/slices/userSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:3000/api/v1/users"; // your backend base route

// // ✅ Fetch all users
// export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, thunkAPI) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.get(`${API_URL}/all`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data.data || [];
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
//   }
// });

// // ✅ Create user
// export const createUser = createAsyncThunk("users/create", async (formData, thunkAPI) => {
//   try {
//     const token = localStorage.getItem("token");
//     await axios.post(`${API_URL}/create`, formData, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
//     });
//     thunkAPI.dispatch(fetchUsers());
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || "Create failed");
//   }
// });

// // ✅ Update user
// export const updateUser = createAsyncThunk("users/update", async ({ id, formData }, thunkAPI) => {
//   try {
//     const token = localStorage.getItem("token");
//     await axios.put(`${API_URL}/update/${id}`, formData, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
//     });
//     thunkAPI.dispatch(fetchUsers());
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
//   }
// });

// // ✅ Delete user
// export const deleteUser = createAsyncThunk("users/delete", async (id, thunkAPI) => {
//   try {
//     const token = localStorage.getItem("token");
//     await axios.delete(`${API_URL}/delete/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     thunkAPI.dispatch(fetchUsers());
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
//   }
// });

// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     list: [],
//     current: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setCurrentUser: (state, action) => {
//       state.current = action.payload;
//       localStorage.setItem("currentUser", JSON.stringify(action.payload));
//     },
//     clearCurrentUser: (state) => {
//       state.current = null;
//       localStorage.removeItem("currentUser");
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => { state.loading = true; })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
// export default userSlice.reducer;










