



// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';


// import Home from './components/Pages/Home';
// import Login from './components/Encrayption/Login';
// import Register from './components/Encrayption/Register';
// import ForgotPassword from './components/Encrayption/ForgotPassword';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
        
//         {/* Catch all route - redirect to home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;




import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Encrayption/Login';
import Register from './components/Encrayption/Register';
import ForgotPassword from './components/Encrayption/ForgotPassword';
import AuthLayout from '../src/layouts/AuthLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Auth Routes with AuthLayout */}
        <Route 
          path="/login" 
          element={
            <AuthLayout 
              title="Welcome Back" 
              subtitle="Sign in to your account to continue"
            >
              <Login />
            </AuthLayout>
          } 
        />
        
        <Route 
          path="/register" 
          element={
            <AuthLayout 
              title="Create Account" 
              subtitle="Join us today! Get started with your account."
            >
              <Register />
            </AuthLayout>
          } 
        />
        
        <Route 
          path="/forgot-password" 
          element={
            <AuthLayout 
              title="Reset Password" 
              subtitle="Enter your email to reset your password" 
              sideImage={false}
            >
              <ForgotPassword />
            </AuthLayout>
          } 
        />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;


