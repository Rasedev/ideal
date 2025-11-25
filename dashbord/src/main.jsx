
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { App as AntdApp } from "antd";
import store from './store.jsx'
// import { App as AntApp } from "antd";


const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
     <AntdApp>
    <App />
  </AntdApp>
    </Provider>
  </React.StrictMode>,
)








