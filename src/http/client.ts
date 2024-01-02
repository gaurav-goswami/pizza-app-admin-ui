import axios from 'axios';
import { useAuthStore } from '../store';

const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const refreshToken = async () => {
    await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
        {},
        {
            withCredentials: true,
        }
    );
};

httpInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._isRetry) {
            try {
                originalRequest._isRetry = true;
                const headers = { ...originalRequest.headers };
                await refreshToken();
                return httpInstance.request({ ...originalRequest, headers });
            } catch (err) {
                // console.error('Refresh Token Error', err);
                useAuthStore.getState().logout();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default httpInstance;