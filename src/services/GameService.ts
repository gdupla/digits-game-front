import axios from 'axios';

const API_URL = 'http://localhost:8080/game';  // URL of the Spring Boot backend

export const createGame = (playerOneId: string, playerTwoId: string) => {
    return axios.post(`${API_URL}/create`, null, {
        params: {playerOneId, playerTwoId}
    });
};

export const getGame = (gameId: string) => {
    return axios.get(`${API_URL}/${gameId}`);
};

export const placeNumber = (gameId: string, playerId: string, row: number, col: number, number: number) => {
    console.log(playerId)
    return axios.post(
        `${API_URL}/${gameId}/placeNumber`,
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
};