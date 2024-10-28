import axiosInstance from "./axiosInstance";

export const gameApi = {
    fetchGames: async () => {
        const response = await axiosInstance.get(`/games`);
        return response.data;
    },
    createGame: async (gameName: string) => {
        try {
            const response = await axiosInstance.post(
                `http://localhost:8080/games/create`,
                null, // No request body, so we use `null`
                {
                    params: {
                        gameName: gameName,
                    },
                }
            );
            console.log("Game created successfully:", response.data);
            return response.data; // Handle the response data as needed
        } catch (error) {
            console.error("Error creating game:", error);
            // Add error handling logic, such as showing an error message
            throw error;
        }
    }
};