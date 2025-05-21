// components/Board.jsx
import React from "react";

const Board = ({ square, playing }) => {
  return (
    <div className="board">
      {square.map((value, i) => (
        <button key={i} className="box" onClick={() => playing(i)}>
          {value}
        </button>
      ))}
    </div>
  );
};

export default Board;
