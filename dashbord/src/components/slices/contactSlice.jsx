
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { contactAPI } from '../../services/contactAPI';

// // Async thunks
// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContacts',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await contactAPI.getContacts(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const fetchContactDetails = createAsyncThunk(
//   'contacts/fetchContactDetails',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await contactAPI.getContactDetails(userId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (contactData, { rejectWithValue }) => {
//     try {
//       const response = await contactAPI.createContact(contactData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateContact = createAsyncThunk(
//   'contacts/updateContact',
//   async ({ userId, updates }, { rejectWithValue }) => {
//     try {
//       const response = await contactAPI.updateContact(userId, updates);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const syncGlobalContacts = createAsyncThunk(
//   'contacts/syncGlobalContacts',
//   async (filters, { rejectWithValue }) => {
//     try {
//       const response = await contactAPI.syncGlobalContacts(filters);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     items: [],
//     currentContact: null,
//     globalContacts: [],
//     loading: false,
//     error: null,
//     pagination: {
//       page: 1,
//       limit: 50,
//       total: 0,
//       pages: 0
//     },
//     filters: {
//       search: '',
//       role: '',
//       status: '',
//       country: ''
//     }
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearCurrentContact: (state) => {
//       state.currentContact = null;
//     },
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     clearFilters: (state) => {
//       state.filters = {
//         search: '',
//         role: '',
//         status: '',
//         country: ''
//       };
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Contacts
//       .addCase(fetchContacts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload.data;
//         state.pagination = action.payload.pagination;
//       })
//       .addCase(fetchContacts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch Contact Details
//       .addCase(fetchContactDetails.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchContactDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentContact = action.payload.data;
//       })
//       .addCase(fetchContactDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Add Contact
//       .addCase(addContact.fulfilled, (state, action) => {
//         state.items.unshift(action.payload.data);
//       })
//       // Update Contact
//       .addCase(updateContact.fulfilled, (state, action) => {
//         const index = state.items.findIndex(item => item._id === action.payload.data._id);
//         if (index !== -1) {
//           state.items[index] = action.payload.data;
//         }
//         if (state.currentContact && state.currentContact._id === action.payload.data._id) {
//           state.currentContact = action.payload.data;
//         }
//       })
//       // Sync Global Contacts
//       .addCase(syncGlobalContacts.fulfilled, (state, action) => {
//         state.globalContacts = action.payload.data;
//       });
//   }
// });

// export const { clearError, clearCurrentContact, setFilters, clearFilters } = contactSlice.actions;
// export default contactSlice.reducer;







import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.contact.getContacts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchContactDetails = createAsyncThunk(
  'contacts/fetchContactDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiService.contact.getContactDetails(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await apiService.contact.createContact(contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiService.contact.deleteContact(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    currentContact: null,
    loading: false,
    error: null,
    filters: {
      search: '',
      role: '',
      status: ''
    }
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentContact: (state) => {
      state.currentContact = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { search: '', role: '', status: '' };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContactDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContactDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContact = action.payload.data;
      })
      .addCase(fetchContactDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.meta.arg);
      });
  }
});

export const { clearError, clearCurrentContact, setFilters, clearFilters } = contactSlice.actions;
export default contactSlice.reducer;






