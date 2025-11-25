import axios from 'axios';

// Add to your Axios setup file
axios.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    window.location = "/login";
  }
  return Promise.reject(error);
});