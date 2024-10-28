import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Game} from "../types";

const WaitingRoom: React.FC = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        // Fetch games here and setGames
    }, []);

    const joinGame = (gameId: string) => {
        navigate(`/game/${gameId}`);
    };

    const createGame = () => {
        navigate("/create-game");
    };

    return (
        <div>
            <h1>Waiting Room</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        {game.name} by {game.creator}
                        <button onClick={() => joinGame(game.id)}>Join</button>
                    </li>
                ))}
            </ul>
            <button onClick={createGame}>Create New Game</button>
        </div>
    );
};

export default WaitingRoom;
