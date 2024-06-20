import axios from 'axios';



const api = axios.create({
    baseURL: 'https://yourapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

// Add other API methods here

export default api;