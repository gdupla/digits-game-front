import React, {useEffect, useState} from 'react';
import {getGame, placeNumber} from '../services/GameService';

interface GameBoardProps {
    gameId: string
}

const GameBoard: React.FC<GameBoardProps> = ({gameId}) => {
    const [gameState, setGameState] = useState<any>(null);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [row, setRow] = useState<number>(0);
    const [col, setCol] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchGameState();
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, [gameId]);

    const fetchGameState = async () => {
        try {
            const response = await getGame(gameId);
            setGameState(response.data);
        } catch (error) {
            console.error('Failed to fetch game state:', error);
        }
    };

    const handlePlaceNumber = async (playerId: string, row: number, col: number, number: number) => {
        if (number !== null) {
            try {
                await placeNumber(gameId, playerId, row, col, number);
                await fetchGameState();  // Refresh the game state after placing the number
            } catch (error) {
                console.error('Failed to place number:', error);
            }
        }
    };

    const handleDrop = (playerId: string, row: number, col: number, event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const number = parseInt(event.dataTransfer.getData('text/plain'), 10);
        handlePlaceNumber(playerId, row, col, number);
    };

    const handleDragStart = (event: React.DragEvent<HTMLSpanElement>, number: number) => {
        event.dataTransfer.setData('text/plain', number.toString());
    };

    if (!gameState) return <div>Loading game...</div>;

    if (gameState.status == "CREATED") return <div>Waiting for another player...</div>;

    return (
        <div>
            <h2>Game Board</h2>
            <div style={{display: 'flex'}}>
                <div style={{marginRight: '20px'}}>
                    <h3>Your Score: {gameState.playerOneScore}</h3>
                    <h4>Your Board</h4>
                    {gameState.playerOneBoard && Array.isArray(gameState.playerOneBoard) ? (
                        gameState.playerOneBoard.map((row: number[], rowIndex: number) => (
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
                                        onDrop={(e) => handleDrop(gameState.players[0], rowIndex, colIndex, e)}
                                        onDragOver={(e) => e.preventDefault()} // Allow dropping
                                    >
                                        {col !== 0 ? col : ''} {/* Only display if not zero */}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>Invalid board data</div>
                    )}
                </div>

                <div style={{
                    display: 'flex',
                    margin: '25px',
                    padding: '15px'
                }}>
                    {/* Show "Game Finished" if the game is finished */}
                    {gameState.finished ? (
                        <div>
                            <h4>Game Finished</h4>
                            {gameState.playerOneScore > gameState.playerTwoScore ? (
                                <h3>You win!</h3>
                            ) : (
                                <h3>You lose!</h3>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div>Next
                                Player: {gameState.nextPlayerId === gameState.players[0] ? 'You' : 'Rival'}</div>
                            <h4>Available Numbers:</h4>
                            <div>
                                {gameState.commonNumbers.map((num: number) => (
                                    <span
                                        key={num}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, num)}
                                        style={{
                                            margin: '5px',
                                            padding: '5px',
                                            border: '1px solid black',
                                            cursor: 'grab'
                                        }}
                                    >
                        {num}
                    </span>
                                ))}
                            </div>
                            <h4>Next Number: {gameState.nextNumber}</h4>
                        </div>
                    )}
                </div>

                <div>
                    <h3>Rival Score: {gameState.playerTwoScore}</h3>
                    <h4>Rival Board</h4>
                    {gameState.playerTwoBoard && Array.isArray(gameState.playerTwoBoard) ? (
                        gameState.playerTwoBoard.map((row: number[], rowIndex: number) => (
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
                                        onDrop={(e) => handleDrop(gameState.players[1], rowIndex, colIndex, e)}
                                        onDragOver={(e) => e.preventDefault()} // Allow dropping
                                    >
                                        {col !== 0 ? col : ''} {/* Only display if not zero */}
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
