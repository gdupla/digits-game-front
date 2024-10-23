import React, {useEffect, useState} from 'react';
import {getGame, placeNumber} from '../services/GameService';

interface GameBoardProps {
    gameId: string;
    playerId: string;
}

const GameBoard: React.FC<GameBoardProps> = ({gameId, playerId}) => {
    const [gameState, setGameState] = useState<any>(null);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [row, setRow] = useState<number>(0);
    const [col, setCol] = useState<number>(0);

    useEffect(() => {
        fetchGameState();
    }, [gameId]);

    const fetchGameState = async () => {
        try {
            console.log(gameId);
            const response = await getGame(gameId);
            console.log(response);
            setGameState(response.data);
        } catch (error) {
            console.error('Failed to fetch game state:', error);
        }
    };

    const handlePlaceNumber = async (row: number, col: number, number: number) => {
        if (number !== null) {
            try {
                await placeNumber(gameId, playerId, row, col, number);
                await fetchGameState();  // Refresh the game state after placing the number
            } catch (error) {
                console.error('Failed to place number:', error);
            }
        }
    };

    if (!gameState) return <div>Loading game...</div>;

    const handleDrop = (row: number, col: number, event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const number = parseInt(event.dataTransfer.getData('text/plain'), 10);
        handlePlaceNumber(row, col, number);
    };

    const handleDragStart = (event: React.DragEvent<HTMLSpanElement>, number: number) => {
        event.dataTransfer.setData('text/plain', number.toString());
    };

    if (!gameState) return <div>Loading game...</div>;

    return (
        <div>
            <h2>Game Board</h2>
            <div>Player 1 Score: {gameState.playerOneScore}</div>
            <div>Player 2 Score: {gameState.playerTwoScore}</div>
            <div>Next Player: {gameState.nextPlayerId.value === playerId ? 'Your turn!' : 'Waiting for opponent'}</div>
            <h3>Next Number: {gameState.nextNumber}</h3>

            <h3>Available Numbers:</h3>
            <div>
                {gameState.commonNumbers.map((num: number) => (
                    <span
                        key={num}
                        draggable
                        onDragStart={(e) => handleDragStart(e, num)}
                        style={{margin: '5px', padding: '5px', border: '1px solid black', cursor: 'grab'}}
                    >
                        {num}
                    </span>
                ))}
            </div>

            <h3>Player Boards:</h3>
            <div style={{display: 'flex'}}>
                <div style={{marginRight: '20px'}}>
                    <h4>Player 1 Board</h4>
                    {gameState.playerOneBoard && Array.isArray(gameState.playerOneBoard.cells) ? (
                        gameState.playerOneBoard.cells.map((row: number[], rowIndex: number) => (
                            <div key={rowIndex} style={{display: 'flex'}}>
                                {row.map((col: number, colIndex: number) => (
                                    <div
                                        key={colIndex}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            border: '1px solid black',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onDrop={(e) => handleDrop(rowIndex, colIndex, e)}
                                        onDragOver={(e) => e.preventDefault()} // Allow dropping
                                    >
                                        {col}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>Invalid board data</div>
                    )}
                </div>

                <div>
                    <h4>Player 2 Board</h4>
                    {gameState.playerTwoBoard && Array.isArray(gameState.playerTwoBoard.cells) ? (
                        gameState.playerTwoBoard.cells.map((row: number[], rowIndex: number) => (
                            <div key={rowIndex} style={{display: 'flex'}}>
                                {row.map((col: number, colIndex: number) => (
                                    <div
                                        key={colIndex}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            border: '1px solid black',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {col}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>Invalid board data</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
