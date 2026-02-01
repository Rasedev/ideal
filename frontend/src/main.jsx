


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { ConfigProvider } from 'antd';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './Store.jsx'; // Import from current project, not dashboard
// import App from './App.jsx';
// import './index.css';

// // Ant Design theme configuration
// const theme = {
//   token: {
//     colorPrimary: '#1890ff',
//     borderRadius: 8,
//     fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//   },
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <ConfigProvider theme={theme}>
//           <App />
//         </ConfigProvider>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );




import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store.jsx';
import { AuthProvider } from './components/contexts/AuthContext.jsx';
import App from './App.jsx';
import './index.css';

// Ant Design theme configuration
// const theme = {
//   token: {
//     colorPrimary: '#1890ff',
//     borderRadius: 8,
//     fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//   },
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>

);



