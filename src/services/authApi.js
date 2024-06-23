import api from './axiosConfig';
import { setToken, login as loginAction, setIsAuthenticated } from '../redux/authSlice';
import {store} from '../redux/store';

export const login = async (credentials) => {

    try {
        const response = await api.post('/auth/login', credentials);
        const { data } = response;

        if (data?.data?.token && data?.data?.user) {
          store.dispatch(setIsAuthenticated(true));
          store.dispatch(setToken(data.data.token));
          store.dispatch(loginAction(data.data.user));
      } else {
          console.error('Invalid response data', data);
      }

      } catch (error) {
        console.error('Login error:', error);
      }
};

export default api;