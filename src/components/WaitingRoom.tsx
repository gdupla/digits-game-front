import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Game} from "../types";
import {gameApi} from "../api/GameApi";

const WaitingRoom: React.FC = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGames = async () => {
            try {
                const data = await gameApi.fetchGames();
                setGames(data);
            } catch (err) {
                setError('Failed to load games');
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, []);

    const joinGame = (gameId: string) => {
        navigate(`/game/${gameId}`);
    };

    const createGame = () => {
        navigate("/game-setup");
    };

    return (
        <div>
            <h1>Waiting Room</h1>
            {loading && <p>Loading games...</p>}
            {error && <p>{error}</p>}
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
