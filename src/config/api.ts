const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://gnss-app-api.onrender.com/api'
  : 'http://localhost:3000/api';

export { API_URL };