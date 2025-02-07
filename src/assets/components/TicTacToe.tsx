import React, { useState } from "react";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import { checkWinner } from "./utils";
import { Player } from "./types";

type GameState = {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | "Draw" | null;
  score: { X: number; O: number; draws: 0 };
};

const TicTacToe: React.FC = () => {
  const [state, setState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    score: { X: 0, O: 0, draws: 0 },
  });

  const handleClick = (index: number) => {
    if (state.board[index] || state.winner) return;

    const newBoard = [...state.board];
    newBoard[index] = state.currentPlayer;

    const winner = checkWinner(newBoard);
    const isDraw = newBoard.every((cell) => cell !== null);
    const newScore = { ...state.score };

    if (winner) {
      newScore[winner]++;
    } else if (isDraw) {
      newScore.draws++; // Tăng số trận hòa
    }

    setState({
      board: newBoard,
      currentPlayer:
        winner || isDraw
          ? state.currentPlayer
          : state.currentPlayer === "X"
          ? "O"
          : "X",
      winner: winner || (isDraw ? "Draw" : null),
      score: newScore,
    });
  };

  const resetGame = () => {
    setState({
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      score: state.score,
    });
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      {state.winner ? (
        state.winner === "Draw" ? (
          <h2 className="m-2 text-secondary">Game is a Draw!</h2>
        ) : (
          <h2 className="m-2">Winner: {state.winner}</h2>
        )
      ) : (
        <h2>
          Player:{" "}
          <span
            style={{
              color:
                state.currentPlayer === "X"
                  ? "red"
                  : state.currentPlayer === "O"
                  ? "blue"
                  : "black",
            }}
          >
            {state.currentPlayer}
          </span>
        </h2>
      )}
      <Board board={state.board} onClick={handleClick} />
      <button className="reset btn btn-primary m-2" onClick={resetGame}>
        Restart
      </button>
      <ScoreBoard score={state.score} />
    </div>
  );
};

export default TicTacToe;
