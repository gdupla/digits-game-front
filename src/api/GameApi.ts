import axios from "axios";
import {BASE_API} from "../config/config";

export const gameApi = {
    fetchGames: async () => {
        const response = await axios.get(`${BASE_API}/api/games`);
        return response.data;
    },
    createGame: async (gameName: string) => {
        const response = await axios.post(`${BASE_API}/api/games`, { name: gameName });
        return response.data;
    }
};