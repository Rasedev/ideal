// import { createSlice } from "@reduxjs/toolkit";

// const sidebarSlice = createSlice({
//   name: "sidebar",
//   initialState: { collapsed: false },
//   reducers: {
//     toggleSidebar: (state) => {
//       state.collapsed = !state.collapsed;
//     },
//     setSidebarState: (state, action) => {
//       state.collapsed = action.payload;
//     },
//   },
// });

// export const { toggleSidebar, setSidebarState } = sidebarSlice.actions;
// export default sidebarSlice.reducer;






import { createSlice } from '@reduxjs/toolkit';

// Load sidebar state from localStorage
const loadSidebarFromStorage = () => {
  try {
    const storedSidebar = localStorage.getItem('sidebar-state');
    return storedSidebar ? JSON.parse(storedSidebar) : { collapsed: false };
  } catch (error) {
    return { collapsed: false };
  }
};

const initialState = {
  ...loadSidebarFromStorage(),
  selectedKey: '/',
  openKeys: [],
  searchTerm: '',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
      // Save to localStorage
      localStorage.setItem('sidebar-state', JSON.stringify({ collapsed: state.collapsed }));
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
      localStorage.setItem('sidebar-state', JSON.stringify({ collapsed: state.collapsed }));
    },
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setOpenKeys: (state, action) => {
      state.openKeys = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { toggleSidebar, setCollapsed, setSelectedKey, setOpenKeys, setSearchTerm } = sidebarSlice.actions;
export default sidebarSlice.reducer;










