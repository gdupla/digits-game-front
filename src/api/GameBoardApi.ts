import axios from "axios";
import {BASE_API} from "../config/config";

export const gameBoardApi = {
    placeNumber: async (gameId: string, playerId: string, row: number, col: number, number: number)=> {
        return axios.post(
            `${BASE_API}/${gameId}/placeNumber`,
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