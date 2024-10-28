import axiosInstance from "./axiosInstance";

export const gameBoardApi = {
    placeNumber: async (gameId: string, playerId: string, row: number, col: number, number: number)=> {
        return axiosInstance.post(
            `/${gameId}/placeNumber`,
            {
                playerId,
                row,
                col,
                number
            },
            {
                headers: {
                    'Content-Type': 'application/json'  // Ensure you are sending JSON
                }
            }
        );
    }
};