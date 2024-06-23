import axios from 'axios';
import {store} from '../redux/store';


const BASE_URL = 'http://localhost:3055/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

api.interceptors.request.use(
	async (request) => {
		// get user data from redux --> active account
		const account = await store.getState().auth;

		// get variables isLoggedIn and token from redux
		const isAuthenticated = account?.isAuthenticated;
		const token = account?.token;

		// testing
		// console.log('checking data -----------', account?.token);

		// if token and isLoggedIn true then it fetch the data
		if (token && isAuthenticated) {
			request.headers.Authorization = `Bearer ${token}`;
		}

		return request;
	},
	(error) => Promise.reject(error),
);



export default api;