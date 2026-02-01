// import { createSlice } from "@reduxjs/toolkit";

// const loadFromStorage = (key, defaultValue = []) => {
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

// const storedMembers = loadFromStorage("members", []);
// const storedSelectedMember = loadFromStorage("selectedMember", null);

// export const memberSlice = createSlice({
//   name: "members",
//   initialState: {
//     value: storedMembers,
//     selected: storedSelectedMember,
//     loading: false,
//     error: null,
//     filters: {
//       search: "",
//       status: "all",
//       membershipType: "all"
//     }
//   },
//   reducers: {
//     // Set loading state
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },

//     // Set error state
//     setError: (state, action) => {
//       state.error = action.payload;
//     },

//     // Clear error
//     clearError: (state) => {
//       state.error = null;
//     },

//     // Add new member
//     addMember: (state, action) => {
//       const newMember = {
//         _id: Date.now().toString(),
//         membershipId: `MEM-${Date.now()}`,
//         createdAt: new Date().toISOString(),
//         status: "pending",
//         ...action.payload
//       };

//       state.value.push(newMember);
//       localStorage.setItem("members", JSON.stringify(state.value));
//     },

//     // Update existing member
//     updateMember: (state, action) => {
//       const { _id, ...updatedData } = action.payload;
//       const index = state.value.findIndex(member => member._id === _id);

//       if (index !== -1) {
//         state.value[index] = {
//           ...state.value[index],
//           ...updatedData,
//           updatedAt: new Date().toISOString()
//         };
//         localStorage.setItem("members", JSON.stringify(state.value));

//         // Update selected member if it's the same
//         if (state.selected && state.selected._id === _id) {
//           state.selected = state.value[index];
//           localStorage.setItem("selectedMember", JSON.stringify(state.selected));
//         }
//       }
//     },

//     // Delete member
//     deleteMember: (state, action) => {
//       state.value = state.value.filter(member => member._id !== action.payload);
//       localStorage.setItem("members", JSON.stringify(state.value));

//       // Clear selected if it's the deleted member
//       if (state.selected && state.selected._id === action.payload) {
//         state.selected = null;
//         localStorage.removeItem("selectedMember");
//       }
//     },

//     // Set all members (for bulk operations)
//     setMembers: (state, action) => {
//       state.value = action.payload;
//       localStorage.setItem("members", JSON.stringify(state.value));
//     },

//     // Set selected member
//     setSelectedMember: (state, action) => {
//       state.selected = action.payload;
//       localStorage.setItem("selectedMember", JSON.stringify(action.payload));
//     },

//     // Clear selected member
//     clearSelectedMember: (state) => {
//       state.selected = null;
//       localStorage.removeItem("selectedMember");
//     },

//     // Update filters
//     updateFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },

//     // Clear filters
//     clearFilters: (state) => {
//       state.filters = {
//         search: "",
//         status: "all",
//         membershipType: "all"
//       };
//     },

//     // Approve member
//     approveMember: (state, action) => {
//       const memberId = action.payload;
//       const index = state.value.findIndex(member => member._id === memberId);

//       if (index !== -1) {
//         state.value[index] = {
//           ...state.value[index],
//           status: "active",
//           approvedAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString()
//         };
//         localStorage.setItem("members", JSON.stringify(state.value));
//       }
//     },

//     // Suspend member
//     suspendMember: (state, action) => {
//       const memberId = action.payload;
//       const index = state.value.findIndex(member => member._id === memberId);

//       if (index !== -1) {
//         state.value[index] = {
//           ...state.value[index],
//           status: "suspended",
//           updatedAt: new Date().toISOString()
//         };
//         localStorage.setItem("members", JSON.stringify(state.value));
//       }
//     },

//     // Reset members state
//     resetMembers: (state) => {
//       state.value = [];
//       state.selected = null;
//       state.loading = false;
//       state.error = null;
//       state.filters = {
//         search: "",
//         status: "all",
//         membershipType: "all"
//       };
//       localStorage.removeItem("members");
//       localStorage.removeItem("selectedMember");
//     }
//   },
// });

// export const {
//   setLoading,
//   setError,
//   clearError,
//   addMember,
//   updateMember,
//   deleteMember,
//   setMembers,
//   setSelectedMember,
//   clearSelectedMember,
//   updateFilters,
//   clearFilters,
//   approveMember,
//   suspendMember,
//   resetMembers
// } = memberSlice.actions;

// export default memberSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/apiService";

// Async thunks
export const createMember = createAsyncThunk(
  "members/createMember",
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await apiService.member.create(memberData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllMembers = createAsyncThunk(
  "members/fetchAllMembers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.member.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// export const fetchAllMembers = createAsyncThunk(
//   'members/fetchAllMembers',
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       console.log('Fetching members with params:', params);
//       const response = await axios.get(`${API_URL}/member/allmember`, {
//         params,
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       console.log('API Response:', response.data);

//       // Check the structure of response
//       if (response.data && response.data.members) {
//         return response.data;
//       } else {
//         console.warn('Unexpected response structure:', response.data);
//         return { members: response.data || [] };
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       console.error('Error response:', error.response?.data);
//       return rejectWithValue(
//         error.response?.data?.message ||
//         error.message ||
//         'Failed to fetch members'
//       );
//     }
//   }
// );

export const fetchMemberById = createAsyncThunk(
  "members/fetchMemberById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.member.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // If country is an object with name property, extract just the name
      const processedData = {
        ...data,
        country: data.country?.name || data.country,
      };

      const response = await apiService.member.update(id, processedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.member.delete(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchMemberStats = createAsyncThunk(
  "members/fetchMemberStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.member.getStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchPendingRegistrations = createAsyncThunk(
  'members/fetchPendingRegistrations',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.member.getPendingRegistrations(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const approveMember = createAsyncThunk(
  'members/approveMember',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.member.approveRegistration(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const rejectMember = createAsyncThunk(
  'members/rejectMember',
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const response = await apiService.member.rejectRegistration(id, { reason });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const memberSlice = createSlice({
  name: "members",
  initialState: {
    items: [],
     pendingRegistrations: [],
    currentMember: null,
    stats: null,
    loading: false,
    error: null,
    filters: {
      search: "",
      status: "",
      role: "",
    },
    approvalLoading: false,
    approvalError: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.approvalError = null;
    },
    clearCurrentMember: (state) => {
      state.currentMember = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        status: "",
        role: "",
      };
    },
    clearPendingRegistrations: (state) => {
      state.pendingRegistrations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Member
      .addCase(createMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload.employee || action.payload.member);
      })
      .addCase(createMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Members
      .addCase(fetchAllMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.members || [];
      })
      .addCase(fetchAllMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Member by ID
      .addCase(fetchMemberById.fulfilled, (state, action) => {
        state.currentMember = action.payload.member;
      })
      // Update Member

      // .addCase(updateMember.fulfilled, (state, action) => {
      //   const updatedMember = action.payload.member;
      //   const index = state.items.findIndex(item => item._id === updatedMember._id);
      //   if (index !== -1) {
      //     state.items[index] = updatedMember;
      //   }
      //   if (state.currentMember && state.currentMember._id === updatedMember._id) {
      //     state.currentMember = updatedMember;
      //   }
      // })

      .addCase(updateMember.fulfilled, (state, action) => {
        const updatedMember = action.payload.member || action.payload;

        // Update in items array
        const index = state.items.findIndex(
          (item) => item._id === updatedMember._id
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedMember };
        }

        // CRITICAL: Update currentMember if it's the same member
        if (
          state.currentMember &&
          state.currentMember._id === updatedMember._id
        ) {
          state.currentMember = { ...state.currentMember, ...updatedMember };
        }
      })

      // Delete Member
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.meta.arg
        );
      })
      // Fetch Member Stats
      .addCase(fetchMemberStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
      })
      // Fetch Pending Registrations
      .addCase(fetchPendingRegistrations.pending, (state) => {
        state.approvalLoading = true;
        state.approvalError = null;
      })
      .addCase(fetchPendingRegistrations.fulfilled, (state, action) => {
        state.approvalLoading = false;
        state.pendingRegistrations = action.payload.pendingRegistrations || 
                                     action.payload.members || 
                                     action.payload.data || 
                                     [];
      })
      .addCase(fetchPendingRegistrations.rejected, (state, action) => {
        state.approvalLoading = false;
        state.approvalError = action.payload;
      })
       // Approve Member
      .addCase(approveMember.pending, (state) => {
        state.approvalLoading = true;
        state.approvalError = null;
      })
      .addCase(approveMember.fulfilled, (state, action) => {
        state.approvalLoading = false;
        
        // Remove from pending registrations
        const approvedMemberId = action.payload.member?._id || action.meta.arg;
        state.pendingRegistrations = state.pendingRegistrations.filter(
          member => member._id !== approvedMemberId
        );

        // Also update in main items array if exists
        const index = state.items.findIndex(item => item._id === approvedMemberId);
        if (index !== -1) {
          state.items[index] = { 
            ...state.items[index], 
            membershipStatus: 'active',
            isActive: true 
          };
        }
      })
      .addCase(approveMember.rejected, (state, action) => {
        state.approvalLoading = false;
        state.approvalError = action.payload;
      })

      // Reject Member
      .addCase(rejectMember.pending, (state) => {
        state.approvalLoading = true;
        state.approvalError = null;
      })
      .addCase(rejectMember.fulfilled, (state, action) => {
        state.approvalLoading = false;
        
        // Remove from pending registrations
        const rejectedMemberId = action.payload.member?._id || action.meta.arg.id;
        state.pendingRegistrations = state.pendingRegistrations.filter(
          member => member._id !== rejectedMemberId
        );

        // Also update in main items array if exists
        const index = state.items.findIndex(item => item._id === rejectedMemberId);
        if (index !== -1) {
          state.items[index] = { 
            ...state.items[index], 
            membershipStatus: 'rejected',
            isActive: false,
            rejectionReason: action.meta.arg.reason 
          };
        }
      })
      .addCase(rejectMember.rejected, (state, action) => {
        state.approvalLoading = false;
        state.approvalError = action.payload;
      });   
      
  },
});

export const { clearError, clearCurrentMember, setFilters, clearFilters,clearPendingRegistrations  } =
  memberSlice.actions;
export default memberSlice.reducer;
