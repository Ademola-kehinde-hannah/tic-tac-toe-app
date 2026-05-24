import "./index.css";
import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  function handleClick(index) {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";

    setBoard(newBoard);
    setXTurn(!xTurn);
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  }

  const winner = calculateWinner(board);

  return (
    <div className="app">
      <div className="game-card">
        <h1>Tic Tac Toe</h1>

        <p className="status">
          {winner ? `Winner: ${winner}` : `Turn: ${xTurn ? "X" : "O"}`}
        </p>

        <div className="board">
          {board.map((square, index) => (
            <Square
              key={index}
              value={square}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>

        <button className="restart-btn" onClick={restartGame}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
