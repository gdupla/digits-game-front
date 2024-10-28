import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import CreateUser from './CreateUser';
import WaitingRoom from './WaitingRoom';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';

const AppRoutes: React.FC = () => {
    const location = useLocation();
    const [gameId, setGameId] = useState<string | null>(null);

    useEffect(() => {
        if (location.state?.gameId) {
            setGameId(location.state.gameId);
        }
    }, [location.state]);

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/waiting-room" element={<WaitingRoom />} />
            <Route path="/game-setup" element={<GameSetup />} />
            <Route path="/game" element={
                gameId ? (
                    <GameBoard gameId={gameId} />
                ) : (
                    <div>Loading...</div>
                )
            } />
        </Routes>
    );
};

export default AppRoutes;
