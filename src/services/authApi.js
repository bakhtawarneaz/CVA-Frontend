import api from './axiosConfig';
import { setToken, login as loginAction } from '../features/auth/authSlice';
import store from '/src/features/store';

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        const { data } = response;
    
        if (response.status === 200) {
          const token = data.data.token;
          const user = data.data.user;
          store.dispatch(setToken(token));
          store.dispatch(loginAction(user)); 
          return data; 
        } else {
          console.error('Login failed:', data.message);
          throw new Error('Login failed'); 
        }
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login error'); 
      }
};

export default api;