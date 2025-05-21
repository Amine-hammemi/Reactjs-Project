"use client"

import React from "react";
import Board from "./gameParts/Board";
import ScoreBoard from "./gameParts/ScoreBoard";
import '../index.css';

const GameTemplate = ({ square, playing, P1score, P2score, reset }) => {
  //console.log("square: ", square);
  return (
    <div className="game">
      <Board square={square} playing={playing} />
      <ScoreBoard P1score={P1score} P2score={P2score} />
      <button className="reset" onClick={reset}>PLAY AGAIN!!</button>
    </div>
  );
};

export default GameTemplate;