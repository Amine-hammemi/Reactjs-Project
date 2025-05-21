// components/ScoreBoard.jsx
import React from "react";

const ScoreBoard = ({ P1score, P2score }) => {
  return (
    <h3>P1: {P1score} VS P2: {P2score}</h3>
  );
};

export default ScoreBoard;
