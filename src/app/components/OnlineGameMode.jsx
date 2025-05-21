
"use client";

import React, { useState, useEffect } from "react";
import GameTemplate from "./GameTemplate";
import { io } from "socket.io-client";
import { checkWinner, resetGame } from './gameParts/gameUtils';

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const OnlineGameMode = ({ roomId }) => {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [P1score, setP1score] = useState(0);
  const [P2score, setP2score] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState('');

  useEffect(() => {
    if (roomId) {
      
      const test = (response) => {
        const { success, playerSymbol, message } = response;
        console.log("Joined room:", success, playerSymbol);

        if (success) {
          setPlayerSymbol(playerSymbol);
          setIsMyTurn(playerSymbol === 'X'); // X starts first
        } else {
          
          console.error("Error joining room:", message);
        }
      };

      socket.emit('test', roomId, test);

      
      
      // Listen for updates to the board
      socket.on('update-board', ({ board, nextTurn }) => {
        setSquare(board); // Update the game board for both players
        setIsMyTurn(playerSymbol === nextTurn); // Set turn based on server's nextTurn
      });

      return () => {
        socket.off('test', test);
        socket.off('update-board'); // Clean up listener on unmount
      };
    }
  }, [roomId]);

  const playing = (i) => {
    if (!gameOver && square[i] === null && isMyTurn) {
      const newSquares = [...square];
      newSquares[i] = playerSymbol;
      setSquare(newSquares);
      console.log("Player's move:", newSquares);
      // Check for a winner and update scores
      checkWinner(newSquares, setP1score, setP2score, setGameOver, P1score, P2score);
      console.info("playin now ", roomId ,playerSymbol);
      
      socket.emit('move', {
        board: newSquares,
        roomId,
        nextTurn: playerSymbol === 'X' ? 'O' : 'X',
      });
    }
  };

  const reset = () => {
    resetGame(setSquare, setIsMyTurn, setGameOver);
    setIsMyTurn(playerSymbol === 'X');
  };

  return (
    <GameTemplate 
      square={square} 
      playing={playing} 
      P1score={P1score} 
      P2score={P2score} 
      reset={reset} 
    />
  );
};

export default OnlineGameMode;
