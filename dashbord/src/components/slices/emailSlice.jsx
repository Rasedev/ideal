import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunks
export const fetchEmails = createAsyncThunk(
  "email/fetchEmails",
  async ({ folder = 'inbox', search = '', filters = {} }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        folder,
        search,
        ...filters
      });
      
      const response = await fetch(`/api/emails?${queryParams}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch emails');
      }
      
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }
      
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmail = createAsyncThunk(
  "email/deleteEmail",
  async (emailId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/emails/${emailId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete email');
      }
      
      return emailId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const bulkDeleteEmails = createAsyncThunk(
  "email/bulkDeleteEmails",
  async (emailIds, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/emails/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailIds }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete emails');
      }
      
      return emailIds;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmailStats = createAsyncThunk(
  "email/fetchEmailStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/emails/stats');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch email stats');
      }
      
      return data.data || {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmailUsers = createAsyncThunk(
  "email/fetchEmailUsers",
  async ({ search = '', role = '' }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (role) queryParams.append('role', role);
      
      const response = await fetch(`/api/users/email-recipients?${queryParams}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users');
      }
      
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const testEmailSystem = createAsyncThunk(
  "email/testEmailSystem",
  async (testData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/emails/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Email system test failed');
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  emails: [],
  emailUsers: [],
  selectedEmails: [],
  stats: {
    totalSent: 0,
    delivered: 0,
    failed: 0,
    openRate: 0,
    inbox: 0,
    sent: 0,
    drafts: 0,
    important: 0
  },
  filters: {
    search: '',
    priority: '',
    status: '',
    dateRange: ''
  },
  loading: false,
  sending: false,
  deleting: false,
  testing: false,
  error: null,
  success: null
};

// Slice
const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSelectedEmails: (state, action) => {
      state.selectedEmails = action.payload;
    },
    toggleEmailSelection: (state, action) => {
      const emailId = action.payload;
      const index = state.selectedEmails.indexOf(emailId);
      if (index > -1) {
        state.selectedEmails.splice(index, 1);
      } else {
        state.selectedEmails.push(emailId);
      }
    },
    selectAllEmails: (state) => {
      state.selectedEmails = state.emails.map(email => email._id);
    },
    clearSelection: (state) => {
      state.selectedEmails = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    resetEmailState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Fetch Emails
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Send Email
      .addCase(sendEmail.pending, (state) => {
        state.sending = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.sending = false;
        state.emails.unshift(action.payload);
        state.success = 'Email sent successfully';
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      })
      
      // Delete Email
      .addCase(deleteEmail.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteEmail.fulfilled, (state, action) => {
        state.deleting = false;
        state.emails = state.emails.filter(email => email._id !== action.payload);
        state.selectedEmails = state.selectedEmails.filter(id => id !== action.payload);
        state.success = 'Email deleted successfully';
      })
      .addCase(deleteEmail.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })
      
      // Bulk Delete Emails
      .addCase(bulkDeleteEmails.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(bulkDeleteEmails.fulfilled, (state, action) => {
        state.deleting = false;
        state.emails = state.emails.filter(email => !action.payload.includes(email._id));
        state.selectedEmails = [];
        state.success = `${action.payload.length} email(s) deleted successfully`;
      })
      .addCase(bulkDeleteEmails.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })
      
      // Fetch Email Stats
      .addCase(fetchEmailStats.fulfilled, (state, action) => {
        state.stats = { ...state.stats, ...action.payload };
      })
      .addCase(fetchEmailStats.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Fetch Email Users
      .addCase(fetchEmailUsers.fulfilled, (state, action) => {
        state.emailUsers = action.payload;
      })
      
      // Test Email System
      .addCase(testEmailSystem.pending, (state) => {
        state.testing = true;
        state.error = null;
      })
      .addCase(testEmailSystem.fulfilled, (state, action) => {
        state.testing = false;
        state.success = action.payload.message || 'Email system test completed successfully';
      })
      .addCase(testEmailSystem.rejected, (state, action) => {
        state.testing = false;
        state.error = action.payload;
      });
  }
});

// Export Actions
export const {
  setFilters,
  setSelectedEmails,
  toggleEmailSelection,
  selectAllEmails,
  clearSelection,
  clearError,
  clearSuccess,
  resetEmailState
} = emailSlice.actions;

// Export Selectors
export const selectEmails = (state) => state.email.emails;
export const selectEmailUsers = (state) => state.email.emailUsers;
export const selectedEmails = (state) => state.email.selectedEmails;
export const selectEmailStats = (state) => state.email.stats;
export const selectEmailFilters = (state) => state.email.filters;
export const selectEmailLoading = (state) => state.email.loading;
export const selectEmailSending = (state) => state.email.sending;
export const selectEmailDeleting = (state) => state.email.deleting;
export const selectEmailTesting = (state) => state.email.testing;
export const selectEmailError = (state) => state.email.error;
export const selectEmailSuccess = (state) => state.email.success;

export default emailSlice.reducer;