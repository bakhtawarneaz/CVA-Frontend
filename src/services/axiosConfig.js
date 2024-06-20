import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yourapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;