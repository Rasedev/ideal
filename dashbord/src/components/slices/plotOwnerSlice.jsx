// // store/slices/plotOwnerSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api/v1';

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Async thunks - DIRECTLY calling your plot-owner routes
// export const fetchAllPlotOwners = createAsyncThunk(
//   'plotOwners/fetchAll',
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const response = await api.get('/plot-owner', { params });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to fetch plot owners'
//       );
//     }
//   }
// );

// export const fetchPlotOwnerById = createAsyncThunk(
//   'plotOwners/fetchById',
//   async (ownerId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/plot-owner/${ownerId}`);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to fetch plot owner details'
//       );
//     }
//   }
// );

// export const createPlotOwner = createAsyncThunk(
//   'plotOwners/create',
//   async (ownerData, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/plot-owner', ownerData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to create plot owner'
//       );
//     }
//   }
// );

// export const updatePlotOwner = createAsyncThunk(
//   'plotOwners/update',
//   async ({ id, ownerData }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`/plot-owner/${id}`, ownerData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to update plot owner'
//       );
//     }
//   }
// );

// export const deletePlotOwner = createAsyncThunk(
//   'plotOwners/delete',
//   async (ownerId, { rejectWithValue }) => {
//     try {
//       await api.delete(`/plot-owner/${ownerId}`);
//       return ownerId;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to delete plot owner'
//       );
//     }
//   }
// );

// export const assignPlot = createAsyncThunk(
//   'plotOwners/assignPlot',
//   async ({ ownerId, plotData }, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`/plot-owner/${ownerId}/plots`, plotData);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to assign plot'
//       );
//     }
//   }
// );

// export const fetchPlotOwnerStats = createAsyncThunk(
//   'plotOwners/fetchStats',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get('/plot-owner/stats');
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || 
//         'Failed to fetch plot owner statistics'
//       );
//     }
//   }
// );

// // Initial state
// const initialState = {
//   list: {
//     data: [],
//     pagination: {
//       current: 1,
//       pageSize: 10,
//       total: 0,
//     },
//     filters: {
//       search: '',
//       status: 'all',
//     },
//     loading: false,
//     error: null
//   },
  
//   current: {
//     data: null,
//     loading: false,
//     error: null
//   },
  
//   stats: {
//     total: 0,
//     active: 0,
//     totalPlots: 0,
//     allocatedPlots: 0,
//     loading: false,
//     error: null
//   },
  
//   form: {
//     loading: false,
//     error: null,
//     success: false
//   },
  
//   plotOperations: {
//     loading: false,
//     error: null,
//     success: false
//   },
  
//   lastUpdated: null
// };

// const plotOwnerSlice = createSlice({
//   name: 'plotOwners',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.list.error = null;
//       state.current.error = null;
//       state.stats.error = null;
//       state.form.error = null;
//       state.plotOperations.error = null;
//     },
    
//     clearSuccess: (state) => {
//       state.form.success = false;
//       state.plotOperations.success = false;
//     },
    
//     updateFilters: (state, action) => {
//       state.list.filters = { ...state.list.filters, ...action.payload };
//       state.list.pagination.current = 1;
//     },
    
//     updatePagination: (state, action) => {
//       state.list.pagination = { ...state.list.pagination, ...action.payload };
//     },
    
//     clearFilters: (state) => {
//       state.list.filters = initialState.list.filters;
//     },
    
//     updatePlotOwnerLocal: (state, action) => {
//       const updatedOwner = action.payload;
//       const index = state.list.data.findIndex(owner => owner._id === updatedOwner._id);
//       if (index !== -1) {
//         state.list.data[index] = { ...state.list.data[index], ...updatedOwner };
//       }
//       if (state.current.data && state.current.data._id === updatedOwner._id) {
//         state.current.data = { ...state.current.data, ...updatedOwner };
//       }
//     },
    
//     resetPlotOwners: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch All Plot Owners
//       .addCase(fetchAllPlotOwners.pending, (state) => {
//         state.list.loading = true;
//         state.list.error = null;
//       })
//       .addCase(fetchAllPlotOwners.fulfilled, (state, action) => {
//         state.list.loading = false;
//         state.list.data = action.payload.data || action.payload.plotOwners || [];
//         state.list.pagination.total = action.payload.total || action.payload.data?.length || 0;
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(fetchAllPlotOwners.rejected, (state, action) => {
//         state.list.loading = false;
//         state.list.error = action.payload;
//       })
      
//       // Fetch Plot Owner By ID
//       .addCase(fetchPlotOwnerById.pending, (state) => {
//         state.current.loading = true;
//         state.current.error = null;
//       })
//       .addCase(fetchPlotOwnerById.fulfilled, (state, action) => {
//         state.current.loading = false;
//         state.current.data = action.payload;
//       })
//       .addCase(fetchPlotOwnerById.rejected, (state, action) => {
//         state.current.loading = false;
//         state.current.error = action.payload;
//       })
      
//       // Create Plot Owner
//       .addCase(createPlotOwner.pending, (state) => {
//         state.form.loading = true;
//         state.form.error = null;
//         state.form.success = false;
//       })
//       .addCase(createPlotOwner.fulfilled, (state, action) => {
//         state.form.loading = false;
//         state.form.success = true;
//         state.list.data.unshift(action.payload.data);
//         state.list.pagination.total += 1;
//       })
//       .addCase(createPlotOwner.rejected, (state, action) => {
//         state.form.loading = false;
//         state.form.error = action.payload;
//       })
      
//       // Update Plot Owner
//       .addCase(updatePlotOwner.pending, (state) => {
//         state.form.loading = true;
//         state.form.error = null;
//         state.form.success = false;
//       })
//       .addCase(updatePlotOwner.fulfilled, (state, action) => {
//         state.form.loading = false;
//         state.form.success = true;
        
//         const updatedOwner = action.payload.data;
//         const index = state.list.data.findIndex(owner => owner._id === updatedOwner._id);
        
//         if (index !== -1) {
//           state.list.data[index] = updatedOwner;
//         }
        
//         if (state.current.data && state.current.data._id === updatedOwner._id) {
//           state.current.data = updatedOwner;
//         }
//       })
//       .addCase(updatePlotOwner.rejected, (state, action) => {
//         state.form.loading = false;
//         state.form.error = action.payload;
//       })
      
//       // Assign Plot
//       .addCase(assignPlot.pending, (state) => {
//         state.plotOperations.loading = true;
//         state.plotOperations.error = null;
//         state.plotOperations.success = false;
//       })
//       .addCase(assignPlot.fulfilled, (state, action) => {
//         state.plotOperations.loading = false;
//         state.plotOperations.success = true;
        
//         const updatedOwner = action.payload;
//         const index = state.list.data.findIndex(owner => owner._id === updatedOwner._id);
        
//         if (index !== -1) {
//           state.list.data[index] = updatedOwner;
//         }
        
//         if (state.current.data && state.current.data._id === updatedOwner._id) {
//           state.current.data = updatedOwner;
//         }
//       })
//       .addCase(assignPlot.rejected, (state, action) => {
//         state.plotOperations.loading = false;
//         state.plotOperations.error = action.payload;
//       })
      
//       // Fetch Plot Owner Statistics
//       .addCase(fetchPlotOwnerStats.pending, (state) => {
//         state.stats.loading = true;
//         state.stats.error = null;
//       })
//       .addCase(fetchPlotOwnerStats.fulfilled, (state, action) => {
//         state.stats.loading = false;
//         state.stats = { ...state.stats, ...action.payload };
//       })
//       .addCase(fetchPlotOwnerStats.rejected, (state, action) => {
//         state.stats.loading = false;
//         state.stats.error = action.payload;
//       });
//   },
// });

// export const {
//   clearError,
//   clearSuccess,
//   updateFilters,
//   updatePagination,
//   clearFilters,
//   updatePlotOwnerLocal,
//   resetPlotOwners
// } = plotOwnerSlice.actions;

// export const selectPlotOwnersList = (state) => state.plotOwners.list;
// export const selectCurrentPlotOwner = (state) => state.plotOwners.current;
// export const selectPlotOwnerStats = (state) => state.plotOwners.stats;
// export const selectPlotOwnerForm = (state) => state.plotOwners.form;
// export const selectPlotOperations = (state) => state.plotOwners.plotOperations;
// export const selectPlotOwnerLastUpdated = (state) => state.plotOwners.lastUpdated;

// export default plotOwnerSlice.reducer;







// store/slices/plotOwnerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = (key, defaultValue = []) => {
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

const storedPlotOwners = loadFromStorage("plotOwners", []);
const storedSelectedPlotOwner = loadFromStorage("selectedPlotOwner", null);

export const plotOwnerSlice = createSlice({
  name: "plotOwners",
  initialState: {
    value: storedPlotOwners,
    selected: storedSelectedPlotOwner,
    loading: false,
    error: null,
    filters: {
      search: "",
      status: "all",
      plotType: "all"
    }
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
    
    // Add new plot owner
    addPlotOwner: (state, action) => {
      const newPlotOwner = {
        _id: Date.now().toString(),
        ownerId: `OWNER-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "active",
        plots: [],
        ...action.payload
      };
      
      state.value.push(newPlotOwner);
      localStorage.setItem("plotOwners", JSON.stringify(state.value));
    },
    
    // Update existing plot owner
    updatePlotOwner: (state, action) => {
      const { _id, ...updatedData } = action.payload;
      const index = state.value.findIndex(owner => owner._id === _id);
      
      if (index !== -1) {
        state.value[index] = { 
          ...state.value[index], 
          ...updatedData,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem("plotOwners", JSON.stringify(state.value));
        
        // Update selected plot owner if it's the same
        if (state.selected && state.selected._id === _id) {
          state.selected = state.value[index];
          localStorage.setItem("selectedPlotOwner", JSON.stringify(state.selected));
        }
      }
    },
    
    // Delete plot owner
    deletePlotOwner: (state, action) => {
      state.value = state.value.filter(owner => owner._id !== action.payload);
      localStorage.setItem("plotOwners", JSON.stringify(state.value));
      
      // Clear selected if it's the deleted owner
      if (state.selected && state.selected._id === action.payload) {
        state.selected = null;
        localStorage.removeItem("selectedPlotOwner");
      }
    },
    
    // Set all plot owners
    setPlotOwners: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("plotOwners", JSON.stringify(state.value));
    },
    
    // Set selected plot owner
    setSelectedPlotOwner: (state, action) => {
      state.selected = action.payload;
      localStorage.setItem("selectedPlotOwner", JSON.stringify(action.payload));
    },
    
    // Clear selected plot owner
    clearSelectedPlotOwner: (state) => {
      state.selected = null;
      localStorage.removeItem("selectedPlotOwner");
    },
    
    // Add plot to owner
    addPlotToOwner: (state, action) => {
      const { ownerId, plot } = action.payload;
      const ownerIndex = state.value.findIndex(owner => owner._id === ownerId);
      
      if (ownerIndex !== -1) {
        const newPlot = {
          _id: Date.now().toString(),
          plotId: `PLOT-${Date.now()}`,
          assignedAt: new Date().toISOString(),
          ...plot
        };
        
        if (!state.value[ownerIndex].plots) {
          state.value[ownerIndex].plots = [];
        }
        
        state.value[ownerIndex].plots.push(newPlot);
        state.value[ownerIndex].updatedAt = new Date().toISOString();
        localStorage.setItem("plotOwners", JSON.stringify(state.value));
        
        // Update selected owner if it's the same
        if (state.selected && state.selected._id === ownerId) {
          state.selected = state.value[ownerIndex];
          localStorage.setItem("selectedPlotOwner", JSON.stringify(state.selected));
        }
      }
    },
    
    // Remove plot from owner
    removePlotFromOwner: (state, action) => {
      const { ownerId, plotId } = action.payload;
      const ownerIndex = state.value.findIndex(owner => owner._id === ownerId);
      
      if (ownerIndex !== -1 && state.value[ownerIndex].plots) {
        state.value[ownerIndex].plots = state.value[ownerIndex].plots.filter(
          plot => plot._id !== plotId
        );
        state.value[ownerIndex].updatedAt = new Date().toISOString();
        localStorage.setItem("plotOwners", JSON.stringify(state.value));
        
        // Update selected owner if it's the same
        if (state.selected && state.selected._id === ownerId) {
          state.selected = state.value[ownerIndex];
          localStorage.setItem("selectedPlotOwner", JSON.stringify(state.selected));
        }
      }
    },
    
    // Update filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        search: "",
        status: "all",
        plotType: "all"
      };
    },
    
    // Reset plot owners state
    resetPlotOwners: (state) => {
      state.value = [];
      state.selected = null;
      state.loading = false;
      state.error = null;
      state.filters = {
        search: "",
        status: "all",
        plotType: "all"
      };
      localStorage.removeItem("plotOwners");
      localStorage.removeItem("selectedPlotOwner");
    }
  },
});

export const { 
  setLoading,
  setError,
  clearError,
  addPlotOwner,
  updatePlotOwner,
  deletePlotOwner,
  setPlotOwners,
  setSelectedPlotOwner,
  clearSelectedPlotOwner,
  addPlotToOwner,
  removePlotFromOwner,
  updateFilters,
  clearFilters,
  resetPlotOwners
} = plotOwnerSlice.actions;

export default plotOwnerSlice.reducer;






