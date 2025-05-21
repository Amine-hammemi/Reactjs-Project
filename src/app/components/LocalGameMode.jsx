"use client"

import React, { useState } from "react";
import GameTemplate from "./GameTemplate";
import { checkWinner, resetGame } from './gameParts/gameUtils';

const LocalGameMode = () => {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [test, setTest] = useState(0);
  const [P1score, setP1score] = useState(0);
  const [P2score, setP2score] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const playing = (i) => {
    if (!gameOver && square[i] === null) {
      const newSquares = [...square];
      newSquares[i] = test === 0 ? 'X' : 'O';
      setSquare(newSquares);
      setTest(test === 0 ? 1 : 0);
      checkWinner(newSquares, setP1score, setP2score, setGameOver, P1score, P2score);
    }
  };

  const reset = () => {
    resetGame(setSquare, setTest, setGameOver);
  };

  return <GameTemplate square={square} playing={playing} P1score={P1score} P2score={P2score} reset={reset} />;
};

export default LocalGameMode;
