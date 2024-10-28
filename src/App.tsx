import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import WaitingRoom from './components/WaitingRoom';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
    const [gameId, setGameId] = useState<string | null>(null);

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
};

export default App;
