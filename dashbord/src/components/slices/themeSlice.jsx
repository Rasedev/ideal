
// import { createSlice } from '@reduxjs/toolkit';

// const themeSlice = createSlice({
//   name: 'theme',
//   initialState: {
//     currentTheme: 'light',
//   },
//   reducers: {
//     toggleTheme: (state, action) => {
//       state.currentTheme = action.payload;
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('theme', action.payload);
//       }
//     },
//     setTheme: (state, action) => {
//       state.currentTheme = action.payload;
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('theme', action.payload);
//       }
//     },
//   },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;
// export default themeSlice.reducer;





import { createSlice } from '@reduxjs/toolkit';

// Load theme from localStorage
const loadThemeFromStorage = () => {
  try {
    const storedTheme = localStorage.getItem('app-theme');
    return storedTheme || 'light';
  } catch (error) {
    return 'light';
  }
};

const initialState = {
  currentTheme: loadThemeFromStorage(),
  compactMode: false,
  primaryColor: '#1890ff',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      // Save to localStorage
      localStorage.setItem('app-theme', state.currentTheme);
    },
    setCompactMode: (state, action) => {
      state.compactMode = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      localStorage.setItem('primary-color', action.payload);
    },
  },
});

export const { toggleTheme, setCompactMode, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;






