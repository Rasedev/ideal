// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import associationReducer from "./components/Slices/associationSlice";
import sectionsReducer from './components/Slices/sectionsSlice';

// Optional: Add theme slice if needed
const themeSlice = (state = { currentTheme: 'light' }, action) => {
  switch (action.type) {
    case 'theme/setTheme':
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
      }
      return { currentTheme: action.payload };
    default:
      return state;
  }
};

// Helper function to get initial theme
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  }
  return 'light';
};

export const store = configureStore({
  reducer: {
    association: associationReducer,
    sections: sectionsReducer,
    theme: themeSlice,
  },
  preloadedState: {
    theme: {
      currentTheme: getInitialTheme(),
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'theme/setTheme'],
        ignoredPaths: ['theme.currentTheme'],
      },
    }),
});

// Optional: Export theme actions
export const setTheme = (theme) => ({
  type: 'theme/setTheme',
  payload: theme,
});

export default store;