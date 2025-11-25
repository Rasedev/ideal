


// import { configureStore } from '@reduxjs/toolkit';

// // import userReducer from './components/slices/userSlice'; // ✅ This should point to the FIXED userSlice
// // import dashboardReducer from './components/slices/dashbordSlice';
// // import membersReducer from './components/slices/memberSlice';
// // import memberApprovalReducer from './components/slices/memberApprovalSlice';
// // import themeReducer from './components/slices/themeSlice';
// // import sidebarReducer from "./components/slices/sidebarSlice";
// import associationReducer from "./components/Slices/associationSlice";
// // import profileReducer from './components/slices/profileSlice';
// // import headerSlice from './components/slices/headerSlice';
// // import emailSlice from './components/slices/emailSlice';
// // // import chatSlice from './components/slices/chatSlice';
// // import contactReducer from './components/slices/contactSlice';
// // import smsReducer from './components/slices/smsSlice';
// // import applicationReducer from './components/slices/applicationSlice';
// // import employeeReducer from './components/slices/employeeSlice';
// // // import attendanceReducer from './components/slices/attendanceSlice';
// //  import paymentReducer from './components/slices/paymentSlice';


// // Get initial theme from localStorage or default to 'light'
// // const getInitialTheme = () => {
// //   if (typeof window !== 'undefined') {
// //     const savedTheme = localStorage.getItem('theme');
// //     return savedTheme || 'light';
// //   }
// //   return 'light';
// // };

// export const store = configureStore({
//   reducer: {
//     // user: userReducer, // ✅ This now stores ONLY current user
//     // dashboard: dashboardReducer,
//     // members: membersReducer, 
//     // memberApproval: memberApprovalReducer,
//     // theme: themeReducer,
//     // sidebar: sidebarReducer,
//     association: associationReducer,
//     // profile: profileReducer,
//     // header: headerSlice,
//     // email: emailSlice,
//     // // chat: chatSlice,
//     // contacts: contactReducer,
//     // sms: smsReducer,
//     // applications: applicationReducer,
//     // employees: employeeReducer,
//     // // attendance: attendanceReducer,
//     // payment:paymentReducer,
//   },
//   preloadedState: {
//     theme: {
//       currentTheme: getInitialTheme(),
//     },
//   },
//   // ✅ Add middleware for better debugging
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST'],
//       },
//     }),
// });

// export default store;







import { configureStore } from '@reduxjs/toolkit';
import associationReducer from "./components/Slices/associationSlice";

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
  },
  preloadedState: {
    // If you have theme reducer, uncomment this and add themeReducer to imports
    // theme: {
    //   currentTheme: getInitialTheme(),
    // },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;











