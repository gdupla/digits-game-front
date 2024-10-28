import axios from 'axios';
import {BASE_API} from "../config/config";

export const authApi = {
    login: async (username: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_API}/auth/login`, {username, password}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const token = response.data;

            // Store the token in local storage (or session storage)
            sessionStorage.setItem('authToken', token);
            return true;

        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    },
    loginWithGoogle: async () => {
        const response = await axios.get(`${BASE_API}/auth/google-login`);
        return response.data;
    },
    createUser: async (username: string, email: string, password: string) => {
        try {
            console.log(`Calling endpoint \`${BASE_API}/api/auth/register\` with ${username}, ${email}, ${password}`)
            const response = await axios.post(`${BASE_API}/auth/register`, {username, email, password}, {
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if needed
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error during registration:", error);
            throw error;
        }
    }
};
