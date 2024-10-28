import axiosInstance from "./axiosInstance";

export const authApi = {
    login: async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post(`/auth/login`, {username, password}, {
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
        const response = await axiosInstance.get(`/auth/google-login`);
        return response.data;
    },
    createUser: async (username: string, email: string, password: string) => {
        try {
            const response = await axiosInstance.post(`/auth/register`, {username, email, password}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
