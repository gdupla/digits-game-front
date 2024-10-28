import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {gameApi} from "../api/GameApi";

const GameSetup: React.FC = () => {
    const [gameName, setGameName] = useState("");
    const navigate = useNavigate();

    const startGame = () => {
        const newGameId = gameApi.createGame(gameName); // Placeholder for game creation logic
        navigate(`/game/${newGameId}`);
    };

    return (
        <div>
            <h1>Create Game</h1>
            <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Enter game name"
            />
            <button onClick={startGame}>Start Game</button>
        </div>
    );
};

export default GameSetup;
