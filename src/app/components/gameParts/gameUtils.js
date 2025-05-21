// gameUtils.js

// Function to check the winner of the game
export const checkWinner = (square, setP1score, setP2score, setGameOver, P1score, P2score) => {
    const list = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    
    for (let i of list) {
      const [a, b, c] = i;
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        if (square[a] === "X") {
          setP1score(P1score + 1);
          setGameOver(true);
        } else if (square[a] === "O") {
          setP2score(P2score + 1);
          setGameOver(true);
        }
      }
    }
  };
  
  // Function to reset the game
  export const resetGame = (setSquare, setTest, setGameOver) => {
    setSquare(Array(9).fill(null));
    setTest(0);
    setGameOver(false);
  };
  