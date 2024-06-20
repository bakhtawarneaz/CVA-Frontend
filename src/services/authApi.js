import api from './axiosConfig';


export const login = async (credentials) => {
    const response = await api.post('/api/login', credentials);
    return response.data;
};

export default api;