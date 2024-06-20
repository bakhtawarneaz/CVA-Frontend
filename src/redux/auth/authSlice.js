import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { loginUser } from '../../services/api';

export const login = createAsyncThunk('/auth/login', async ({ email, password }) => {
    const response = await loginUser(email, password);
    if (response.token) {
        localStorage.setItem('token', response.token);
    }
    return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token');
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        checkAuth(state) {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwt_decode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp > currentTime) {
                    state.user = decoded;
                    state.isAuthenticated = true;
                } else {
                    localStorage.removeItem('token');
                    state.user = null;
                    state.isAuthenticated = false;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = jwt_decode(action.payload.token);
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { checkAuth } = authSlice.actions;

export default authSlice.reducer;
