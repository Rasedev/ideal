// features/sections/sectionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for fetching all section data
export const fetchServices = createAsyncThunk(
  'sections/fetchServices',
  async () => {
    const response = await fetch('/api/services');
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    return response.json();
  }
);

export const fetchHeroData = createAsyncThunk(
  'sections/fetchHeroData',
  async () => {
    const response = await fetch('/api/hero');
    if (!response.ok) {
      throw new Error('Failed to fetch hero data');
    }
    return response.json();
  }
);

export const fetchAboutData = createAsyncThunk(
  'sections/fetchAboutData',
  async () => {
    const response = await fetch('/api/about');
    if (!response.ok) {
      throw new Error('Failed to fetch about data');
    }
    return response.json();
  }
);

export const fetchStats = createAsyncThunk(
  'sections/fetchStats',
  async () => {
    const response = await fetch('/api/stats');
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return response.json();
  }
);

export const fetchFeatures = createAsyncThunk(
  'sections/fetchFeatures',
  async () => {
    const response = await fetch('/api/features');
    if (!response.ok) {
      throw new Error('Failed to fetch features');
    }
    return response.json();
  }
);

export const fetchTeam = createAsyncThunk(
  'sections/fetchTeam',
  async () => {
    const response = await fetch('/api/team');
    if (!response.ok) {
      throw new Error('Failed to fetch team data');
    }
    return response.json();
  }
);

export const fetchTestimonials = createAsyncThunk(
  'sections/fetchTestimonials',
  async () => {
    const response = await fetch('/api/testimonials');
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    return response.json();
  }
);

export const fetchNews = createAsyncThunk(
  'sections/fetchNews',
  async () => {
    const response = await fetch('/api/news');
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return response.json();
  }
);

export const fetchFinanceData = createAsyncThunk(
  'sections/fetchFinanceData',
  async () => {
    const response = await fetch('/api/finance');
    if (!response.ok) {
      throw new Error('Failed to fetch finance data');
    }
    return response.json();
  }
);

export const fetchContactData = createAsyncThunk(
  'sections/fetchContactData',
  async () => {
    const response = await fetch('/api/contact');
    if (!response.ok) {
      throw new Error('Failed to fetch contact data');
    }
    return response.json();
  }
);

// Submit contact form
export const submitContactForm = createAsyncThunk(
  'sections/submitContactForm',
  async (formData) => {
    const response = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    return response.json();
  }
);

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    // Data
    services: [],
    heroData: null,
    aboutData: null,
    stats: [],
    features: [],
    team: [],
    testimonials: [],
    news: [],
    financeData: null,
    contactData: null,
    
    // Loading states
    loading: {
      services: false,
      hero: false,
      about: false,
      stats: false,
      features: false,
      team: false,
      testimonials: false,
      news: false,
      finance: false,
      contact: false,
      contactSubmit: false
    },
    
    // Errors
    error: null,
    contactSubmitError: null,
    contactSubmitSuccess: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.contactSubmitError = null;
    },
    clearContactSubmitStatus: (state) => {
      state.contactSubmitSuccess = false;
      state.contactSubmitError = null;
    },
    // Manual data updates if needed
    updateServices: (state, action) => {
      state.services = action.payload;
    },
    updateHeroData: (state, action) => {
      state.heroData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Services
      .addCase(fetchServices.pending, (state) => {
        state.loading.services = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading.services = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading.services = false;
        state.error = action.error.message;
      })
      
      // Hero Data
      .addCase(fetchHeroData.pending, (state) => {
        state.loading.hero = true;
        state.error = null;
      })
      .addCase(fetchHeroData.fulfilled, (state, action) => {
        state.loading.hero = false;
        state.heroData = action.payload;
      })
      .addCase(fetchHeroData.rejected, (state, action) => {
        state.loading.hero = false;
        state.error = action.error.message;
      })
      
      // About Data
      .addCase(fetchAboutData.pending, (state) => {
        state.loading.about = true;
        state.error = null;
      })
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.loading.about = false;
        state.aboutData = action.payload;
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        state.loading.about = false;
        state.error = action.error.message;
      })
      
      // Stats
      .addCase(fetchStats.pending, (state) => {
        state.loading.stats = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error = action.error.message;
      })
      
      // Features
      .addCase(fetchFeatures.pending, (state) => {
        state.loading.features = true;
        state.error = null;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading.features = false;
        state.features = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.loading.features = false;
        state.error = action.error.message;
      })
      
      // Team
      .addCase(fetchTeam.pending, (state) => {
        state.loading.team = true;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading.team = false;
        state.team = action.payload;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading.team = false;
        state.error = action.error.message;
      })
      
      // Testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading.testimonials = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading.testimonials = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading.testimonials = false;
        state.error = action.error.message;
      })
      
      // News
      .addCase(fetchNews.pending, (state) => {
        state.loading.news = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading.news = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading.news = false;
        state.error = action.error.message;
      })
      
      // Finance Data
      .addCase(fetchFinanceData.pending, (state) => {
        state.loading.finance = true;
        state.error = null;
      })
      .addCase(fetchFinanceData.fulfilled, (state, action) => {
        state.loading.finance = false;
        state.financeData = action.payload;
      })
      .addCase(fetchFinanceData.rejected, (state, action) => {
        state.loading.finance = false;
        state.error = action.error.message;
      })
      
      // Contact Data
      .addCase(fetchContactData.pending, (state) => {
        state.loading.contact = true;
        state.error = null;
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.loading.contact = false;
        state.contactData = action.payload;
      })
      .addCase(fetchContactData.rejected, (state, action) => {
        state.loading.contact = false;
        state.error = action.error.message;
      })
      
      // Contact Form Submission
      .addCase(submitContactForm.pending, (state) => {
        state.loading.contactSubmit = true;
        state.contactSubmitError = null;
        state.contactSubmitSuccess = false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading.contactSubmit = false;
        state.contactSubmitSuccess = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading.contactSubmit = false;
        state.contactSubmitError = action.error.message;
      });
  }
});

export const { 
  clearError, 
  clearContactSubmitStatus, 
  updateServices, 
  updateHeroData 
} = sectionsSlice.actions;

export default sectionsSlice.reducer;