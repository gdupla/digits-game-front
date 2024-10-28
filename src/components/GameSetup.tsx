import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {gameApi} from "../api/GameApi";

const GameSetup: React.FC = () => {
    const [gameName, setGameName] = useState("");
    const navigate = useNavigate();

    const createGame = async () => {
        const newGame = await gameApi.createGame(gameName);
        console.log(newGame.id);
        navigate(`/game`, { state: { gameId: newGame.id } });
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
            <button onClick={createGame}>Create Game</button>
        </div>
    );
};

export default GameSetup;
