import React, { useState } from 'react';
import CreateGame from './components/CreateGame';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string>('');  // Assuming player 1 for now

  const handleGameCreated = (id: string) => {
    setGameId(id);
  };

  return (
      <div>
        <h1>Multiplayer Number Game</h1>
        {!gameId && <CreateGame onGameCreated={handleGameCreated} />}
        {gameId && <GameBoard gameId={gameId} playerId={playerId} />}
      </div>
  );
};

export default App;
