import axios from 'axios';
import store from '/src/features/store';


const api = axios.create({
  baseURL: 'http://localhost:3055/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: true,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    console.log('first',token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.request.use((config) => {
//   const token = useTokenStore.getState().token;
//   if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;