import React from "react";
import { Player } from "./types";
import "./Board.css";

interface BoardProps {
  board: (Player | null)[];
  onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick }) => (
  <div className="board">
    {board.map((cell, index) => (
      <button
        key={index}
        className="cell"
        onClick={() => onClick(index)}
        style={{
          color: cell === "X" ? "red" : cell === "O" ? "blue" : "black",
        }}
      >
        {cell}
      </button>
    ))}
  </div>
);

export default Board;
