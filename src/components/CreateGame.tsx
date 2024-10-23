import React, { useState } from 'react';
import { createGame } from '../services/GameService';

const CreateGame = ({ onGameCreated }: { onGameCreated: (gameId: string) => void }) => {
    const [playerOneId, setPlayer1] = useState('');
    const [playerTwoId, setPlayer2] = useState('');

    const handleCreateGame = async () => {
        try {
            const response = await createGame(playerOneId, playerTwoId);
            onGameCreated(response.data.id.value);  // Pass the game ID back to parent component
        } catch (error) {
            console.error('Failed to create game:', error);
        }
    };

    return (
        <div>
            <h2>Create a New Game</h2>
            <input
                type="text"
                placeholder="Player 1 Id"
                value={playerOneId}
                onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
                type="text"
                placeholder="Player 2 Id"
                value={playerTwoId}
                onChange={(e) => setPlayer2(e.target.value)}
            />
            <button onClick={handleCreateGame}>Create Game</button>
        </div>
    );
};

export default CreateGame;
