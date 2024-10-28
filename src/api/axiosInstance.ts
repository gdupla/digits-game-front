import axios, {AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {BASE_API} from "../config/config";

const axiosInstance = axios.create({
    baseURL: BASE_API,
});

// Function to set up interceptors without directly relying on React Router
export const setupInterceptors = (onForbiddenError: () => void) => {
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = sessionStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            if (error.response?.status === 403) {
                sessionStorage.removeItem('authToken');
                onForbiddenError(); // Call the provided function on 403 error
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
